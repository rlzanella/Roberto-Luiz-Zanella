import { GoogleGenAI, Modality, HarmCategory, HarmBlockThreshold, Chat } from "@google/genai";
import { I18n, strings } from '../i18n/strings';

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const safetySettings = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
];

export async function translateText(text: string, targetLang: string = 'en'): Promise<string> {
    if (!text.trim()) {
        return text;
    }
    try {
        const translateModel = 'gemini-2.5-flash';
        const prompt = `Translate the following text to ${targetLang}. Only return the translated text, without any additional explanation or quotation marks: "${text}"`;
        
        const response = await ai.models.generateContent({
            model: translateModel,
            contents: prompt,
            config: {
                safetySettings,
            }
        });
        
        const translation = response.text;
        
        if (translation && translation.trim()) {
            return translation.trim().replace(/^"|"$/g, '');
        }
        return text;
    } catch (error) {
        console.error("Error calling Gemini API for translation:", error);
        throw new Error('api.translation');
    }
}

export async function generateDescriptionForImage(base64Image: string, t: I18n): Promise<string> {
   try {
    const descriptionModel = 'gemini-2.5-flash';
    
    const response = await ai.models.generateContent({
      model: descriptionModel,
      contents: {
        parts: [
          { inlineData: { data: base64Image, mimeType: 'image/png' } },
          { text: strings.en.prompt.describeImage },
        ],
      },
      config: {
        safetySettings,
      },
    });

    const description = response.text;
    
    if (description && description.trim()) {
      return description.trim();
    }
    return t.prompt.describeImageFallback;

  } catch (error) {
    console.error("Error calling Gemini API for image description:", error);
    return t.prompt.describeImageError;
  }
}

export async function detectGenderInImage(base64Image: string): Promise<'Male' | 'Female' | 'Uncertain'> {
   try {
    const model = 'gemini-2.5-flash';
    const prompt = "Analyze the person in this image. Respond with only one word: 'Male', 'Female', or 'Uncertain'. Do not add any other text or punctuation.";
    
    const response = await ai.models.generateContent({
      model,
      contents: {
        parts: [
          { inlineData: { data: base64Image, mimeType: 'image/png' } },
          { text: prompt },
        ],
      },
      config: { safetySettings },
    });

    const text = response.text.trim().toLowerCase();
    
    if (text.includes('female')) {
      return 'Female';
    } else if (text.includes('male')) {
      return 'Male';
    }
    return 'Uncertain';

  } catch (error) {
    console.error("Error calling Gemini API for gender detection:", error);
    // It's safer to return 'Uncertain' on error than to block generation.
    return 'Uncertain';
  }
}

function handleImageGenerationError(response: any): string {
    const candidate = response.candidates?.[0];
    const finishReason = candidate?.finishReason;
    
    let errorKey = 'api.noImage';
    if (finishReason === 'SAFETY' || finishReason === 'PROHIBITED_CONTENT') {
        errorKey = "api.safety";
    } else if (finishReason === 'IMAGE_SAFETY') {
        errorKey = "api.imageSafety";
    } else if (finishReason === 'NO_IMAGE') {
        errorKey = 'api.noImageProcess';
    } else if (finishReason === 'IMAGE_OTHER') {
        errorKey = "api.imageOther";
    } else if (finishReason && finishReason !== 'STOP') {
        errorKey = `api.reason|${finishReason}`; // Special format for interpolation
    }
    return errorKey;
}

// --- NEW CHAT-BASED IMAGE EDITING ---

export async function createImageChat(): Promise<Chat> {
  const chat = ai.chats.create({
      model: 'gemini-2.5-flash-image',
      config: { 
        safetySettings,
        responseModalities: [Modality.IMAGE],
      }
  });
  return chat;
}

export async function sendMessageToImageChat(
  chat: Chat,
  base64ImageData: string,
  mimeType: string,
  prompt: string
): Promise<string> {
  const imagePart = { inlineData: { data: base64ImageData, mimeType } };
  const textPart = { text: prompt };

  try {
    const response = await chat.sendMessage({ message: [imagePart, textPart] });

    const imagePartResponse = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData);

    if (imagePartResponse?.inlineData?.data) {
      return imagePartResponse.inlineData.data;
    } else {
      throw new Error(handleImageGenerationError(response));
    }
  } catch (error) {
    console.error("Error calling Gemini API for image generation:", error);
    if (error instanceof Error) {
        if (error.message.toLowerCase().includes('network') || error.message.toLowerCase().includes('failed to fetch')) {
          throw new Error(`api.network`);
        }
        if(error.message.startsWith('api.')) {
            throw error;
        }
        throw new Error(`api.gemini|${error.message}`);
    }
    throw new Error("api.unknown");
  }
}


// --- VIRTUAL TRY-ON ---

async function callGeminiForImage(
  parts: ({ text: string } | { inlineData: { data: string, mimeType: string } })[]
): Promise<string> {
  let editedImageBase64: string;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts },
      config: {
        responseModalities: [Modality.IMAGE],
        safetySettings
      },
    });

    const imagePart = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData);

    if (imagePart?.inlineData?.data) {
      editedImageBase64 = imagePart.inlineData.data;
    } else {
      throw new Error(handleImageGenerationError(response));
    }
  } catch (error) {
    console.error("Error calling Gemini API for image generation:", error);
    if (error instanceof Error) {
        if (error.message.toLowerCase().includes('network') || error.message.toLowerCase().includes('failed to fetch')) {
          throw new Error(`api.network`);
        }
        if(error.message.startsWith('api.')) {
            throw error;
        }
        throw new Error(`api.gemini|${error.message}`);
    }
    throw new Error("api.unknown");
  }
  return editedImageBase64;
}

export async function tryOnClothingWithGemini(
  personBase64: string,
  personMimeType: string,
  clothingBase64: string,
  clothingMimeType: string
): Promise<string> {
  const parts = [
    { inlineData: { data: personBase64, mimeType: personMimeType } },
    { inlineData: { data: clothingBase64, mimeType: clothingMimeType } },
    { text: strings.en.prompt.tryOnInstruction },
  ];
  return await callGeminiForImage(parts);
}