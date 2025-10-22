import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ImageSlider } from './components/ImageSlider';
import { WardrobeBuilder } from './components/WardrobeBuilder';
import { ErrorDisplay } from './components/ErrorDisplay';
import { Loader } from './components/Loader';
import { ImageModal } from './components/ImageModal';
import { editImageWithGemini, tryOnClothingWithGemini } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';
import {
  WardrobeSelections,
  generatePromptFromSelections,
  areSelectionsEmpty,
} from './utils/wardrobeUtils';
import { ModeSelector } from './components/ModeSelector';

const initialSelections: WardrobeSelections = {
  visualStyle: '',
  hair: { length: '', style: '', color: '' },
  clothing: {
    onePiece: { type: '', style: '', fabric: '', color: '', pattern: '' },
    tops: { type: '', style: '', fabric: '', color: '', pattern: '' },
    bottoms: { type: '', style: '', fabric: '', color: '', pattern: '' },
    stockings: { type: '', style: '', fabric: '', color: '', pattern: '' },
    outerwear: { type: '', style: '', fabric: '', color: '', pattern: '' },
  },
  footwear: { type: '', material: '', color: '' },
  accessories: { 
    head: { type: '', material: '' }, 
    neck: { type: '', material: '' }, 
    ears: { type: '', material: '' }, 
    wrists: { type: '', material: '' },
    other: { type: '', material: '' }
  },
  pose: '',
  lighting: '',
  background: '',
  fineTuning: '',
};

type AppMode = 'SELECT' | 'STYLE_EDITOR' | 'VIRTUAL_TRY_ON';

function App() {
  const [appMode, setAppMode] = useState<AppMode>('SELECT');

  // State for Style Editor mode
  const [originalImage, setOriginalImage] = useState<{ file: File; url: string } | null>(null);
  const [selections, setSelections] = useState<WardrobeSelections>(initialSelections);
  const [prompt, setPrompt] = useState<string>('');
  
  // State for Virtual Try-On mode
  const [personImage, setPersonImage] = useState<{ file: File; url: string } | null>(null);
  const [clothingImage, setClothingImage] = useState<{ file: File; url: string } | null>(null);

  // Shared State
  const [editedImage, setEditedImage] = useState<{ url: string; description: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPromptCopied, setIsPromptCopied] = useState(false);

  // --- Mode Switching ---
  const handleModeSelect = (mode: Exclude<AppMode, 'SELECT'>) => {
    // Reset all state to ensure a clean slate when switching modes
    setOriginalImage(null);
    setPersonImage(null);
    setClothingImage(null);
    setEditedImage(null);
    setError(null);
    setSelections(initialSelections);
    setPrompt('');
    setIsLoading(false);
    setAppMode(mode);
  };

  const handleBackToSelect = () => {
    setAppMode('SELECT');
  };

  // --- Handlers for STYLE EDITOR mode ---
  const handleImageUpload = (file: File) => {
    setOriginalImage({ file, url: URL.createObjectURL(file) });
    setEditedImage(null);
    setError(null);
    setPrompt('');
  };

  const handleGeneratePrompt = () => {
    if (!originalImage) {
      setError('Please upload an image first.');
      return;
    }
    if (areSelectionsEmpty(selections)) {
        setError('Please select at least one style option to change.');
        return;
    }
    setError(null);
    setEditedImage(null);
    const generatedPrompt = generatePromptFromSelections(selections);
    setPrompt(generatedPrompt);
  };

  const handleSendPrompt = async () => {
    if (!originalImage || !prompt) {
      setError('Cannot generate without an image and a prompt.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setEditedImage(null);
    try {
      const { base64, mimeType } = await fileToBase64(originalImage.file);
      const result = await editImageWithGemini(base64, mimeType, prompt);
      setEditedImage({
        url: `data:image/png;base64,${result.imageBase64}`,
        description: result.description,
      });
      setPrompt('');
    } catch (e: any) {
      setError(e.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleClearSelections = () => {
    setSelections(initialSelections);
    setPrompt('');
  }
  
  const handleCopyPrompt = () => {
    if (!prompt) return;
    navigator.clipboard.writeText(prompt).then(() => {
      setIsPromptCopied(true);
      setTimeout(() => setIsPromptCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy prompt: ', err);
    });
  };

  // --- Handlers for VIRTUAL TRY-ON mode ---
  const handlePersonImageUpload = (file: File) => {
    setPersonImage({ file, url: URL.createObjectURL(file) });
    setEditedImage(null);
    setError(null);
  };

  const handleClothingImageUpload = (file: File) => {
    setClothingImage({ file, url: URL.createObjectURL(file) });
    setEditedImage(null);
    setError(null);
  };

  const handleTryOnGenerate = async () => {
    if (!personImage || !clothingImage) {
      setError('Please upload a photo of a person and a photo of the clothing item.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setEditedImage(null);
    try {
      const { base64: personBase64, mimeType: personMimeType } = await fileToBase64(personImage.file);
      const { base64: clothingBase64, mimeType: clothingMimeType } = await fileToBase64(clothingImage.file);
      const result = await tryOnClothingWithGemini(personBase64, personMimeType, clothingBase64, clothingMimeType);
      setEditedImage({
        url: `data:image/png;base64,${result.imageBase64}`,
        description: result.description,
      });
    } catch (e: any) {
      setError(e.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // --- Shared Handlers ---
  const handleDownloadImage = () => {
    if (!editedImage) return;
    const link = document.createElement('a');
    link.href = editedImage.url;
    link.download = `your-style-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Reset the current mode to its initial state
    setEditedImage(null);
    setError(null);
    if(appMode === 'STYLE_EDITOR') {
      setOriginalImage(null);
      setSelections(initialSelections);
      setPrompt('');
    } else if (appMode === 'VIRTUAL_TRY_ON') {
      setPersonImage(null);
      setClothingImage(null);
    }
  }

  // Memoized handlers for Style Editor
  const onVisualStyleChange = useCallback((value: string) => setSelections(prev => ({ ...prev, visualStyle: value })), []);
  const onHairChange = useCallback((field: string, value: string) => setSelections(prev => ({ ...prev, hair: { ...prev.hair, [field]: value } })), []);
  const onClothingChange = useCallback((category: 'onePiece' | 'tops' | 'bottoms' | 'stockings' | 'outerwear', field: string, value: string) => setSelections(prev => ({ ...prev, clothing: { ...prev.clothing, [category]: { ...prev.clothing[category], [field]: value } } })), []);
  const onFootwearChange = useCallback((field: string, value: string) => setSelections(prev => ({ ...prev, footwear: { ...prev.footwear, [field]: value } })), []);
  const onAccessoriesChange = useCallback((category: 'head' | 'neck' | 'ears' | 'wrists' | 'other', field: string, value: string) => setSelections(prev => ({ ...prev, accessories: { ...prev.accessories, [category]: { ...prev.accessories[category], [field]: value } } })), []);
  const onPoseChange = useCallback((value: string) => setSelections(prev => ({ ...prev, pose: value })), []);
  const onLightingChange = useCallback((value: string) => setSelections(prev => ({ ...prev, lighting: value })), []);
  const onBackgroundChange = useCallback((value: string) => setSelections(prev => ({ ...prev, background: value })), []);
  const onFineTuningChange = useCallback((value: string) => setSelections(prev => ({ ...prev, fineTuning: value })), []);
  
  const renderContent = () => {
    switch (appMode) {
      case 'SELECT':
        return <ModeSelector onSelectMode={handleModeSelect} />;
      
      case 'STYLE_EDITOR':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex flex-col gap-6">
              <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold mb-4 text-yellow-400">1. Upload Your Photo</h3>
                  <ImageUploader onImageUpload={handleImageUpload} />
              </div>
              <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
                  <div className="flex justify-between items-center mb-4">
                      <h3 className="text-2xl font-bold text-yellow-400">2. Customize Your Style</h3>
                      <button onClick={handleClearSelections} className="text-sm text-gray-400 hover:text-white transition">Clear All</button>
                  </div>
                  <WardrobeBuilder selections={selections} onVisualStyleChange={onVisualStyleChange} onHairChange={onHairChange} onClothingChange={onClothingChange} onFootwearChange={onFootwearChange} onAccessoriesChange={onAccessoriesChange} onPoseChange={onPoseChange} onLightingChange={onLightingChange} onBackgroundChange={onBackgroundChange} onFineTuningChange={onFineTuningChange} />
              </div>
            </div>
            <div className="flex flex-col gap-6 lg:sticky top-8 self-start">
              <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold mb-4 text-yellow-400">3. See The Result</h3>
                  <ImageSlider beforeSrc={originalImage?.url || null} afterSrc={editedImage?.url || null} isLoading={isLoading} />
                  {editedImage && (
                    <div className="text-center mt-4">
                      <p className="text-gray-300 italic">"{editedImage.description}"</p>
                      <div className="flex justify-center gap-4 mt-3">
                          <button onClick={handleDownloadImage} className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors" aria-label="Download generated image and start over">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                              Download & Reset
                          </button>
                          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors" aria-label="Zoom in on generated image">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                             Zoom
                          </button>
                      </div>
                    </div>
                  )}
              </div>
              {!prompt && ( <button onClick={handleGeneratePrompt} disabled={isLoading || !originalImage} className="w-full flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-gray-900 font-bold py-4 px-6 rounded-lg text-xl transition-colors shadow-lg">✨ Generate Editable Prompt</button>)}
              {prompt && !isLoading && (
                <div className="p-6 bg-gray-800 rounded-lg shadow-lg animate-fade-in">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold text-yellow-400">4. Edit & Send Prompt</h3>
                    <div className="flex items-center gap-4">
                      <button onClick={handleCopyPrompt} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition disabled:text-gray-600 disabled:cursor-not-allowed" disabled={isPromptCopied}>
                        {isPromptCopied ? (<><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Copied!</>) : (<><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>Copy</>)}
                      </button>
                      <button onClick={() => setPrompt('')} className="text-sm text-gray-400 hover:text-white transition">Cancel</button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">You can manually edit the prompt below before sending it to the AI.</p>
                  <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} className="w-full p-3 bg-gray-900 rounded-lg border border-gray-600 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition text-sm font-mono whitespace-pre-wrap" rows={15} aria-label="Editable prompt for the AI model" />
                  <button onClick={handleSendPrompt} disabled={isLoading} className="w-full mt-4 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors shadow-lg">
                    {isLoading ? <><Loader /> Sending to AI...</> : '🚀 Send & Generate Image'}
                  </button>
                </div>
              )}
              <ErrorDisplay error={error} />
            </div>
          </div>
        );

      case 'VIRTUAL_TRY_ON':
        return (
          <div className="flex flex-col gap-8 items-center">
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 bg-gray-800 rounded-lg shadow-lg flex flex-col items-center">
                    <h3 className="text-2xl font-bold mb-4 text-yellow-400">1. Upload Your Photo</h3>
                    <ImageUploader onImageUpload={handlePersonImageUpload} title="Upload a photo of yourself" description="(or a model)" />
                    {personImage && <img src={personImage.url} alt="Person" className="mt-4 w-32 h-32 object-cover rounded-lg"/>}
                </div>
                <div className="p-6 bg-gray-800 rounded-lg shadow-lg flex flex-col items-center">
                    <h3 className="text-2xl font-bold mb-4 text-yellow-400">2. Upload Clothing Photo</h3>
                    <ImageUploader onImageUpload={handleClothingImageUpload} title="Upload a photo of a garment" description="(e.g., from a store)" />
                    {clothingImage && <img src={clothingImage.url} alt="Clothing item" className="mt-4 w-32 h-32 object-cover rounded-lg"/>}
                </div>
            </div>

            <button onClick={handleTryOnGenerate} disabled={isLoading || !personImage || !clothingImage} className="w-full max-w-md flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-gray-900 font-bold py-4 px-6 rounded-lg text-xl transition-colors shadow-lg">
              {isLoading ? <><Loader /> Generating Image...</> : '✨ Try It On!'}
            </button>
            
            <ErrorDisplay error={error} />

            <div className="w-full max-w-2xl p-6 bg-gray-800 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-yellow-400 text-center">3. See The Result</h3>
                <ImageSlider beforeSrc={personImage?.url || null} afterSrc={editedImage?.url || null} isLoading={isLoading} />
                 {editedImage && (
                  <div className="text-center mt-4">
                     <p className="text-gray-300 italic">"{editedImage.description}"</p>
                     <div className="flex justify-center gap-4 mt-3">
                        <button onClick={handleDownloadImage} className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors" aria-label="Download generated image and start over">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                            Download & Reset
                        </button>
                        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors" aria-label="Zoom in on generated image">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                           Zoom
                        </button>
                     </div>
                  </div>
                 )}
            </div>

          </div>
        )
    }
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      <Header showBackButton={appMode !== 'SELECT'} onBack={handleBackToSelect}/>
      <main className="container mx-auto p-4 md:p-8">
        {renderContent()}
      </main>
      {isModalOpen && editedImage && (
        <ImageModal imageUrl={editedImage.url} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}

export default App;
