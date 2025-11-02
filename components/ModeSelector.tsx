import React from 'react';
import { I18n } from '../i18n/strings';

interface ModeSelectorProps {
  onSelectMode: (mode: 'STYLE_EDITOR' | 'VIRTUAL_TRY_ON') => void;
  t: I18n;
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

export const ModeSelector: React.FC<ModeSelectorProps> = ({ onSelectMode, t }) => {
  return (
    <div className="text-center animate-fade-in">
      <h2 className="text-3xl font-bold mb-2 text-yellow-400">{t.modeSelectorTitle}</h2>
      <p className="text-lg text-gray-400 mb-8">{t.modeSelectorSubtitle}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <ModeCard 
            title={t.styleEditorTitle}
            description={t.styleEditorDescription}
            icon="🎨"
            onClick={() => onSelectMode('STYLE_EDITOR')}
        />
        <ModeCard 
            title={t.virtualTryOnTitle}
            description={t.virtualTryOnDescription}
            icon="📸"
            onClick={() => onSelectMode('VIRTUAL_TRY_ON')}
        />
      </div>
    </div>
  );
};
