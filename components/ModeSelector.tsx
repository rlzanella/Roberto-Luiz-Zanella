import React from 'react';

interface ModeSelectorProps {
  onSelectMode: (mode: 'STYLE_EDITOR' | 'VIRTUAL_TRY_ON') => void;
}

const ModeCard: React.FC<{
    title: string;
    description: string;
    icon: string;
    onClick: () => void;
}> = ({ title, description, icon, onClick }) => (
  <div 
    onClick={onClick}
    className="bg-gray-800 p-8 rounded-lg shadow-lg hover:bg-gray-700 hover:shadow-yellow-500/10 border border-transparent hover:border-yellow-500/30 transition-all cursor-pointer transform hover:-translate-y-1"
  >
    <div className="flex flex-col items-center text-center">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-2xl font-bold text-yellow-400 mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  </div>
);

export const ModeSelector: React.FC<ModeSelectorProps> = ({ onSelectMode }) => {
  return (
    <div className="text-center animate-fade-in">
      <h2 className="text-3xl font-bold mb-2 text-yellow-400">How would you like to use Your Wardrobe?</h2>
      <p className="text-lg text-gray-400 mb-8">Choose an option to get started.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <ModeCard 
            title="Style Editor"
            description="Upload a photo and use guided menus to change hairstyle, clothing, accessories, background, and more."
            icon="🎨"
            onClick={() => onSelectMode('STYLE_EDITOR')}
        />
        <ModeCard 
            title="Virtual Try-On"
            description="Take a selfie, snap a picture of a clothing item you like, and see how it looks on you instantly."
            icon="📸"
            onClick={() => onSelectMode('VIRTUAL_TRY_ON')}
        />
      </div>
    </div>
  );
};
