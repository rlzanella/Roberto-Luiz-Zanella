import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ImageSlider } from './components/ImageSlider';
import { WardrobeBuilder } from './components/WardrobeBuilder';
import { ErrorDisplay } from './components/ErrorDisplay';
import { Loader } from './components/Loader';
import { ImageModal } from './components/ImageModal';
import { tryOnClothingWithGemini, generateDescriptionForImage, translateText, createImageChat, sendMessageToImageChat, detectGenderInImage } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';
import {
  WardrobeSelections,
  generatePromptFromSelections,
  areSelectionsEmpty,
  translateSelectionsToEn,
} from './utils/wardrobeUtils';
import { ModeSelector } from './components/ModeSelector';
import { LanguageSelector } from './components/LanguageSelector';
import { strings, I18n } from './i18n/strings';
import { getWardrobeOptions, WardrobeOptions, ClothingCategory } from './data/wardrobeOptions';
import { MagicChat } from './components/MagicChat';
import type { Chat } from '@google/genai';
import { ImageDisplay } from './components/ImageDisplay';
import { StylePresets } from './components/StylePresets';
import { getStylePresets, StylePreset } from './data/stylePresets';

const emptyClothingItem = { type: '', style: [], color: '', pattern: '', featherColors: [], bodyPaintColors: [], headwear: '', top: '', bottom: '' };

const initialSelections: WardrobeSelections = {
  visualStyle: '',
  imageStyle: { style: '', age: '' },
  decade: '',
  themeCostume: '',
  hair: { length: '', style: '', color: '' },
  clothing: {
    onePiece: { ...emptyClothingItem, fabric: '' },
    tops: { ...emptyClothingItem, fabric: '' },
    bottoms: { ...emptyClothingItem, fabric: '' },
    stockings: { ...emptyClothingItem, fabric: '' },
    outerwear: { ...emptyClothingItem, fabric: '' },
    suits: { ...emptyClothingItem, fabric: '' },
    activewear: { ...emptyClothingItem, fabric: '' },
    sleepwear: { ...emptyClothingItem, fabric: '' },
    fantasy: { ...emptyClothingItem, fabric: '' },
    underwear: { ...emptyClothingItem, fabric: '' },
    swimwear: { ...emptyClothingItem, fabric: '' },
    traditional: { ...emptyClothingItem },
  },
  footwear: { type: '', material: '', color: '' },
  accessories: { 
    head: { type: '', material: '' }, 
    neck: { type: '', material: '' }, 
    ears: { type: '', material: '' }, 
    wrists: { type: '', material: '' },
    hands: { type: '', material: '' },
    fingers: { type: '', material: '' },
    waist: { type: '', material: '' },
    other: { type: '', material: '' }
  },
  pose: '',
  poseDetail: [],
  lighting: '',
  background: '',
  fineTuning: '',
};

export interface CustomPreset {
  id: string;
  name: string;
  selections: WardrobeSelections;
}

type AppMode = 'SELECT' | 'STYLE_EDITOR' | 'VIRTUAL_TRY_ON';
type Language = 'en' | 'pt';
type Gender = 'Male' | 'Female' | 'Uncertain';
type AccessoryCategory = 'head' | 'neck' | 'ears' | 'wrists' | 'hands' | 'fingers' | 'waist' | 'other';


// FIX: Add default export to the App component to resolve import error in index.tsx.
export default function App() {
  const [language, setLanguage] = useState<Language | null>(null);
  const [t, setT] = useState<I18n>(strings.pt);
  const [wardrobeOptions, setWardrobeOptions] = useState<WardrobeOptions>(getWardrobeOptions('pt'));
  const [stylePresets, setStylePresets] = useState<StylePreset[]>(getStylePresets('pt'));
  
  const [appMode, setAppMode] = useState<AppMode>('SELECT');

  // State for Style Editor mode
  const [originalImage, setOriginalImage] = useState<{ file: File; url: string } | null>(null);
  const [selections, setSelections] = useState<WardrobeSelections>(initialSelections);
  const [prompt, setPrompt] = useState<string>('');
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const [isRefining, setIsRefining] = useState(false);
  const [customPresets, setCustomPresets] = useState<CustomPreset[]>([]);
  const [detectedGender, setDetectedGender] = useState<Gender | null>(null);
  const [previousEditedImage, setPreviousEditedImage] = useState<{ url: string; description: string } | null>(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  
  // State for Virtual Try-On mode
  const [personImage, setPersonImage] = useState<{ file: File; url: string } | null>(null);
  const [clothingImage, setClothingImage] = useState<{ file: File; url: string } | null>(null);

  // Shared State
  const [editedImage, setEditedImage] = useState<{ url: string; description: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPromptCopied, setIsPromptCopied] = useState(false);
  const [isGeneratingPrompt, setIsGeneratingPrompt] = useState(false);
  
  // --- Initialization ---
  useEffect(() => {
    if (language) {
      setT(strings[language]);
      setWardrobeOptions(getWardrobeOptions(language));
      setStylePresets(getStylePresets(language));
    }
  }, [language]);

  useEffect(() => {
    try {
      const savedPresets = localStorage.getItem('your_wardrobe_presets');
      if (savedPresets) {
        setCustomPresets(JSON.parse(savedPresets));
      }
    } catch (e) {
      console.error("Failed to load custom presets:", e);
    }
  }, []);

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
  };

  const resetStyleEditor = () => {
    setOriginalImage(null);
    setEditedImage(null);
    setErrorKey(null);
    setSelections(initialSelections);
    setPrompt('');
    setIsLoading(false);
    setChatSession(null);
    setIsRefining(false);
    setDetectedGender(null);
    setPreviousEditedImage(null);
    setRotationAngle(0);
  };

  const resetVirtualTryOn = () => {
    setPersonImage(null);
    setClothingImage(null);
    setEditedImage(null);
    setErrorKey(null);
    setIsLoading(false);
  }
  
  const resetPersonImageForTryOn = () => {
    setPersonImage(null);
    setErrorKey(null);
  };

  // --- Mode Switching ---
  const handleModeSelect = (mode: Exclude<AppMode, 'SELECT'>) => {
    resetStyleEditor();
    resetVirtualTryOn();
    setAppMode(mode);
  };

  const handleBackToSelect = () => {
    setAppMode('SELECT');
  };

  // --- Handlers for STYLE EDITOR mode ---
  const handleImageUpload = (file: File) => {
    resetStyleEditor();
    setOriginalImage({ file, url: URL.createObjectURL(file) });
  };

  const handleGeneratePrompt = async () => {
    if (!originalImage) {
      setErrorKey(t.uploadImageFirst);
      return;
    }
    if (areSelectionsEmpty(selections)) {
        setErrorKey(t.selectOneOption);
        return;
    }
    setErrorKey(null);
    setEditedImage(null);
    setPrompt('');
    setIsGeneratingPrompt(true);
    
    try {
      let gender: Gender = detectedGender || 'Uncertain';
      if (!detectedGender) {
        const { base64 } = await fileToBase64(originalImage.file);
        gender = await detectGenderInImage(base64);
        setDetectedGender(gender);
      }
      
      let selectionsForPrompt = selections;
      if (language === 'pt') {
        const [translatedFineTuning, translatedAge] = await Promise.all([
            translateText(selections.fineTuning, 'en'),
            translateText(selections.imageStyle.age, 'en')
        ]);
        
        const translatedSelections = translateSelectionsToEn(selections);
        selectionsForPrompt = {
            ...translatedSelections,
            fineTuning: translatedFineTuning,
            imageStyle: {
                ...translatedSelections.imageStyle,
                age: translatedAge
            }
        };
      }
      const newPrompt = generatePromptFromSelections(selectionsForPrompt, gender);
      setPrompt(newPrompt);
    } catch (e: any) {
      console.error("Error generating prompt:", e);
      setErrorKey(e.message || 'api.unknown');
    } finally {
      setIsGeneratingPrompt(false);
    }
  };

  const handleImageEdit = useCallback(async () => {
    if (!originalImage || !prompt) {
      setErrorKey(t.noImageAndPrompt);
      return;
    }
    setErrorKey(null);
    setIsLoading(true);
    setEditedImage(null);

    try {
      const { base64, mimeType } = await fileToBase64(originalImage.file);
      const newChat = await createImageChat();
      const newImageBase64 = await sendMessageToImageChat(newChat, base64, mimeType, prompt);
      const description = await generateDescriptionForImage(newImageBase64, t);

      setEditedImage({ url: `data:image/png;base64,${newImageBase64}`, description });
      setChatSession(newChat);
      setPreviousEditedImage({ url: `data:image/png;base64,${newImageBase64}`, description });
    } catch (e: any) {
      console.error("Error editing image:", e);
      setErrorKey(e.message || 'api.unknown');
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, prompt, t]);

  const handleRefineImage = useCallback(async (refinementPrompt: string) => {
    if (!previousEditedImage || !chatSession) {
      setErrorKey(t.unknownError);
      return;
    }
    setErrorKey(null);
    setIsRefining(true);

    try {
        const response = await fetch(previousEditedImage.url);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = async () => {
            const base64data = (reader.result as string).split(',')[1];
            const mimeType = blob.type;

            const finalRefinementPrompt = `${t.prompt.refinementInstruction}: "${refinementPrompt}"`;
            
            const newImageBase64 = await sendMessageToImageChat(chatSession, base64data, mimeType, finalRefinementPrompt);
            const description = await generateDescriptionForImage(newImageBase64, t);

            setEditedImage({ url: `data:image/png;base64,${newImageBase64}`, description });
            setPreviousEditedImage({ url: `data:image/png;base64,${newImageBase64}`, description });
            setIsRefining(false);
        };
    } catch (e: any) {
        console.error("Error refining image:", e);
        setErrorKey(e.message || 'api.unknown');
        setIsRefining(false);
    }
  }, [previousEditedImage, chatSession, t]);
  
  const handleTryOn = useCallback(async () => {
    if (!personImage || !clothingImage) {
      setErrorKey('Please upload both a person and a clothing item.');
      return;
    }
    setErrorKey(null);
    setIsLoading(true);
    setEditedImage(null);

    try {
      const [personData, clothingData] = await Promise.all([
        fileToBase64(personImage.file),
        fileToBase64(clothingImage.file)
      ]);
      
      const resultBase64 = await tryOnClothingWithGemini(
        personData.base64,
        personData.mimeType,
        clothingData.base64,
        clothingData.mimeType
      );
      
      setEditedImage({
        url: `data:image/png;base64,${resultBase64}`,
        description: 'Virtual try-on result'
      });
      
    } catch (e: any) {
      console.error("Error trying on clothing:", e);
      setErrorKey(e.message || 'api.unknown');
    } finally {
      setIsLoading(false);
    }
  }, [personImage, clothingImage]);

  const handlePoseDetailChange = (value: string) => {
    setSelections(p => {
      const currentDetails = p.poseDetail;
      const newDetails = currentDetails.includes(value)
        ? currentDetails.filter(d => d !== value)
        : [...currentDetails, value];
      return { ...p, poseDetail: newDetails };
    });
  };

  const handleRotate = (direction: 'left' | 'right') => {
    setRotationAngle(prev => direction === 'left' ? prev - 45 : prev + 45);
  };

  // --- Preset Handlers ---
  const handleSavePreset = () => {
    const name = window.prompt(t.promptForPresetName);
    if (name) {
      const newPreset: CustomPreset = {
        id: new Date().toISOString(),
        name,
        selections: JSON.parse(JSON.stringify(selections))
      };
      const updatedPresets = [...customPresets, newPreset];
      setCustomPresets(updatedPresets);
      localStorage.setItem('your_wardrobe_presets', JSON.stringify(updatedPresets));
    }
  };

  const handleDeletePreset = (id: string) => {
    const updatedPresets = customPresets.filter((p) => p.id !== id);
    setCustomPresets(updatedPresets);
    localStorage.setItem('your_wardrobe_presets', JSON.stringify(updatedPresets));
  };

  const handleCustomPresetSelect = (preset: CustomPreset) => {
    // Deep copy to avoid unintentional mutation of preset data
    setSelections(JSON.parse(JSON.stringify(preset.selections)));
  };

  const handleClearSelections = () => {
    setSelections(initialSelections);
  };

  const handleStylePresetSelect = (presetSelections: StylePreset['selections']) => {
    setSelections(prev => ({
        ...initialSelections,
        visualStyle: presetSelections.visualStyle,
        imageStyle: { ...prev.imageStyle, ...presetSelections.imageStyle },
        decade: presetSelections.decade,
    }));
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(prompt);
    setIsPromptCopied(true);
    setTimeout(() => setIsPromptCopied(false), 2000);
  };
  
  // FIX: Add return statement with JSX to render the application UI. This resolves the error in index.tsx.
  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      {!language ? (
        <LanguageSelector onSelectLanguage={handleLanguageSelect} />
      ) : (
        <>
          <Header showBackButton={appMode !== 'SELECT'} onBack={handleBackToSelect} t={t} />
          <main className="container mx-auto p-4 md:p-8">
            {appMode === 'SELECT' && (
              <ModeSelector onSelectMode={handleModeSelect} t={t} />
            )}

            {appMode === 'STYLE_EDITOR' && (
              <div className="animate-fade-in">
                {!originalImage ? (
                  <div className="max-w-2xl mx-auto flex flex-col items-center">
                    <h3 className="text-2xl font-bold text-center mb-6">{t.step1}</h3>
                    <ImageUploader onImageUpload={handleImageUpload} t={t} />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    <div className="flex flex-col gap-6 lg:sticky top-8">
                      <ImageSlider beforeSrc={originalImage.url} afterSrc={editedImage?.url} isLoading={isLoading || isRefining} rotation={rotationAngle} t={t} />
                      
                       <div className="flex justify-center gap-4">
                            <button onClick={resetStyleEditor} className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">{t.changePhoto}</button>
                            <button onClick={() => handleRotate('left')} className="bg-gray-700 hover:bg-gray-600 text-white font-semibold p-2 rounded-lg transition-colors" aria-label={t.rotateLeft}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                                </svg>
                            </button>
                            <button onClick={() => handleRotate('right')} className="bg-gray-700 hover:bg-gray-600 text-white font-semibold p-2 rounded-lg transition-colors" aria-label={t.rotateRight}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" />
                                </svg>
                            </button>
                            {editedImage && (
                                <>
                                   <button onClick={() => setIsModalOpen(true)} className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">{t.zoom}</button>
                                   <a href={editedImage.url} download="edited-image.png" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded-lg transition-colors no-underline">{t.download}</a>
                                </>
                            )}
                        </div>

                      {editedImage && <p className="text-center text-gray-300 italic">"{editedImage.description}"</p>}
                      
                       {editedImage && !isLoading && <MagicChat onSendMessage={handleRefineImage} isLoading={isRefining} t={t} />}
                    </div>
                    <div className="flex flex-col gap-8">
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-2xl font-bold">{t.step2}</h3>
                                <button onClick={handleClearSelections} className="text-sm text-gray-400 hover:text-white transition-colors">{t.clearAll}</button>
                            </div>
                            <StylePresets presets={stylePresets} onSelectPreset={handleStylePresetSelect} t={t} />
                            <WardrobeBuilder
                                t={t}
                                options={wardrobeOptions}
                                selections={selections}
                                customPresets={customPresets}
                                onSavePreset={handleSavePreset}
                                onDeletePreset={handleDeletePreset}
                                onCustomPresetSelect={handleCustomPresetSelect}
                                onVisualStyleChange={(value) => setSelections(s => ({ ...s, visualStyle: s.visualStyle === value ? '' : value }))}
                                onImageStyleChange={(field, value) => setSelections(s => ({ ...s, imageStyle: { ...s.imageStyle, [field]: value } }))}
                                onDecadeChange={(value) => setSelections(s => ({ ...s, decade: value, themeCostume: '' }))}
                                onThemeCostumeChange={(value) => setSelections(s => ({ ...s, themeCostume: value }))}
                                onHairChange={(field, value) => setSelections(s => ({ ...s, hair: { ...s.hair, [field]: value } }))}
                                onClothingChange={(category, field, value) => setSelections(s => ({ ...s, clothing: { ...s.clothing, [category]: { ...s.clothing[category], [field]: value } } }))}
                                onFootwearChange={(field, value) => setSelections(s => ({ ...s, footwear: { ...s.footwear, [field]: value } }))}
                                onAccessoriesChange={(category, field, value) => setSelections(s => ({ ...s, accessories: { ...s.accessories, [category]: { ...s.accessories[category], [field]: value } } }))}
                                onPoseChange={(value) => setSelections(s => ({ ...s, pose: value, poseDetail: [] }))}
                                onPoseDetailChange={handlePoseDetailChange}
                                onLightingChange={(value) => setSelections(s => ({ ...s, lighting: value }))}
                                onBackgroundChange={(value) => setSelections(s => ({ ...s, background: value }))}
                                onFineTuningChange={(value) => setSelections(s => ({ ...s, fineTuning: value }))}
                            />
                        </div>
                        <div className="flex flex-col gap-4 p-4 bg-gray-800 rounded-lg">
                           <h3 className="text-xl font-bold">{t.step3}</h3>
                           <ErrorDisplay
                                errorKey={errorKey}
                                t={t}
                                actionText={errorKey === 'api.imageSafety' ? t.changePhoto : undefined}
                                onAction={errorKey === 'api.imageSafety' ? resetStyleEditor : undefined}
                           />
                           <button onClick={handleGeneratePrompt} disabled={isGeneratingPrompt || isLoading} className="w-full flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-600 text-gray-900 font-bold py-2 px-4 rounded-lg transition-colors">
                                {isGeneratingPrompt && <Loader />}
                                {isGeneratingPrompt ? t.generatingPrompt : t.generateEditablePrompt}
                           </button>
                            {prompt && (
                                <div className="flex flex-col gap-2 animate-fade-in">
                                    <label className="text-sm font-medium text-gray-400">{t.editablePromptLabel}</label>
                                    <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={8} className="w-full p-2 bg-gray-900 rounded-lg border border-gray-600 focus:ring-2 focus:ring-yellow-500"/>
                                    <div className="flex gap-2">
                                        <button onClick={handleImageEdit} disabled={isLoading || isGeneratingPrompt || !prompt} className="flex-grow flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                                            {isLoading && !isRefining ? <Loader /> : null}
                                            {isLoading && !isRefining ? t.generatingImage : t.sendToAI}
                                        </button>
                                        <button onClick={copyPrompt} className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">{isPromptCopied ? t.copied : t.copy}</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {appMode === 'VIRTUAL_TRY_ON' && (
                 <div className="animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="flex flex-col gap-4">
                            <h3 className="text-2xl font-bold mb-2 text-center">{t.step1_person}</h3>
                            {!personImage ? (
                                <ImageUploader onImageUpload={(f) => setPersonImage({ file: f, url: URL.createObjectURL(f)})} t={t} title={t.uploadPersonTitle} description={t.uploadPersonDescription} />
                            ) : (
                                <div className="text-center">
                                    <ImageDisplay src={personImage.url} alt={t.personAlt} t={t} />
                                    <button onClick={() => setPersonImage(null)} className="mt-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">{t.changeImage}</button>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col gap-4">
                            <h3 className="text-2xl font-bold mb-2 text-center">{t.step2_clothing}</h3>
                            {!clothingImage ? (
                                <ImageUploader onImageUpload={(f) => setClothingImage({ file: f, url: URL.createObjectURL(f)})} t={t} title={t.uploadClothingTitle} description={t.uploadClothingDescription} />
                            ) : (
                                <div className="text-center">
                                    <ImageDisplay src={clothingImage.url} alt={t.clothingAlt} t={t} />
                                    <button onClick={() => setClothingImage(null)} className="mt-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">{t.changeImage}</button>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col gap-4 md:col-span-2 lg:col-span-1">
                            <h3 className="text-2xl font-bold mb-2 text-center">{t.step4}</h3>
                            <div className="aspect-square bg-gray-800 rounded-lg flex items-center justify-center relative overflow-hidden">
                                {isLoading && (
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-10">
                                        <Loader />
                                        <p className="mt-2 text-gray-300">{t.generatingImage}</p>
                                    </div>
                                )}
                                {editedImage ? (
                                    <ImageDisplay src={editedImage.url} alt={editedImage.description} t={t} />
                                ) : (
                                    <div className="text-gray-500 p-4 text-center">{t.imagesAppearHere}</div>
                                )}
                            </div>
                             <button onClick={handleTryOn} disabled={!personImage || !clothingImage || isLoading} className="w-full flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-600 text-gray-900 font-bold py-2 px-4 rounded-lg transition-colors">
                                {isLoading && <Loader />}
                                {t.tryItOn}
                             </button>
                             <ErrorDisplay
                                errorKey={errorKey}
                                t={t}
                                actionText={errorKey === 'api.imageSafety' ? t.changeImage : undefined}
                                onAction={errorKey === 'api.imageSafety' ? resetPersonImageForTryOn : undefined}
                             />
                             {editedImage && (
                                <div className="flex justify-center gap-4">
                                   <a href={editedImage.url} download="try-on-result.png" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors no-underline">{t.download}</a>
                                </div>
                             )}
                        </div>
                    </div>
                </div>
            )}
          </main>
          {isModalOpen && editedImage && <ImageModal imageUrl={editedImage.url} onClose={() => setIsModalOpen(false)} t={t} />}
        </>
      )}
    </div>
  );
}