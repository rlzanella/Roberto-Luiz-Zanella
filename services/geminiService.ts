import { GoogleGenAI, Modality, HarmCategory, HarmBlockThreshold } from "@google/genai";

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

// Define safety settings to be more permissive, preventing false positives
// for a virtual wardrobe use case.
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];


async function generateDescriptionForImage(base64Image: string): Promise<string> {
   try {
    const descriptionModel = 'gemini-2.5-flash';
    const descriptionPrompt = "Describe this image in one short, creative sentence.";

    const response = await ai.models.generateContent({
      model: descriptionModel,
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: 'image/png', // The generated image is a PNG
            },
          },
          {
            text: descriptionPrompt,
          },
        ],
      },
      safetySettings,
    });

    const description = response.text;
    
    if (description && description.trim()) {
      return description.trim();
    }
    return "The AI did not provide a description for this image.";

  } catch (error) {
    console.error("Error calling Gemini API for image description:", error);
    return "Your image was created, but we couldn't generate a description for it.";
  }
}

function handleImageGenerationError(response: any): string {
    const candidate = response.candidates?.[0];
    const finishReason = candidate?.finishReason;
    
    let errorMessage = 'The API response did not contain an image.';
    if (finishReason === 'SAFETY') {
        errorMessage = "Your request was blocked as it might violate Google's safety policies. This can happen with prompts that are ambiguous or touch on sensitive topics. Please rephrase your prompt to be more specific and try again.";
    } else if (finishReason === 'IMAGE_SAFETY') {
        errorMessage = "The uploaded image was blocked as it might violate Google's safety policies. Please try using a different image.";
    } else if (finishReason === 'NO_IMAGE') {
        errorMessage = 'The model was unable to process the uploaded image. Please try using a different image or re-saving your current one in a standard format like PNG or JPG.';
    } else if (finishReason === 'IMAGE_OTHER') {
        errorMessage = "The model couldn't complete your request. This can sometimes happen with very complex or ambiguous edits. Please try simplifying your request (e.g., change fewer items at once) and try again.";
    } else if (finishReason && finishReason !== 'STOP') {
        errorMessage = `Image generation failed. Reason: ${finishReason}. Please try again.`;
    }
    return errorMessage;
}

export async function editImageWithGemini(
  base64ImageData: string,
  mimeType: string,
  prompt: string
): Promise<{ imageBase64: string; description: string }> {
  
  let editedImageBase64: string;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { inlineData: { data: base64ImageData, mimeType: mimeType } },
          { text: prompt },
        ],
      },
      config: { responseModalities: [Modality.IMAGE] },
      safetySettings,
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
          throw new Error(`Network Error: Please check your internet connection.`);
        }
        throw new Error(`Gemini API Error: ${error.message}`);
    }
    throw new Error("An unexpected error occurred during image generation.");
  }

  const description = await generateDescriptionForImage(editedImageBase64);
  return { imageBase64: editedImageBase64, description };
}


export async function tryOnClothingWithGemini(
  personBase64: string,
  personMimeType: string,
  clothingBase64: string,
  clothingMimeType: string
): Promise<{ imageBase64: string; description: string }> {

  const prompt = `
    INSTRUCTION: Your task is to perform a virtual try-on.
    1.  Analyze the first image, which contains a person.
    2.  Analyze the second image, which contains a single clothing item.
    3.  Generate a new, photorealistic image where the person from the first image is wearing the clothing item from the second image.
    
    CRITICAL RULES:
    - You MUST perfectly preserve the person's identity. Do NOT change their face, facial features, skin tone, hair, or body shape.
    - The person's pose and the background from the first image should be maintained as closely as possible.
    - The clothing must be realistically adapted to fit the person's body and pose. Discard the background from the clothing image.
    - The final output must be a single, cohesive, high-quality photograph.
  `;
  
  let editedImageBase64: string;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { inlineData: { data: personBase64, mimeType: personMimeType } },
          { inlineData: { data: clothingBase64, mimeType: clothingMimeType } },
          { text: prompt },
        ],
      },
      config: { responseModalities: [Modality.IMAGE] },
      safetySettings,
    });

    const imagePart = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData);

    if (imagePart?.inlineData?.data) {
      editedImageBase64 = imagePart.inlineData.data;
    } else {
       throw new Error(handleImageGenerationError(response));
    }
  } catch (error) {
    console.error("Error calling Gemini API for virtual try-on:", error);
     if (error instanceof Error) {
        if (error.message.toLowerCase().includes('network') || error.message.toLowerCase().includes('failed to fetch')) {
          throw new Error(`Network Error: Please check your internet connection.`);
        }
        throw new Error(`Gemini API Error: ${error.message}`);
    }
    throw new Error("An unexpected error occurred during image generation.");
  }

  const description = await generateDescriptionForImage(editedImageBase64);
  return { imageBase64: editedImageBase64, description };
}
