import React from 'react';

interface LanguageSelectorProps {
  onSelectLanguage: (lang: 'en' | 'pt') => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onSelectLanguage }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white animate-fade-in p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">
          Welcome / Bem-vindo
        </h1>
        <h2 className="text-xl md:text-2xl font-light text-gray-300 mt-2">
          Please select your language / Por favor, selecione seu idioma
        </h2>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <button
          onClick={() => onSelectLanguage('en')}
          className="bg-gray-800 text-white text-2xl font-bold py-6 px-12 rounded-lg shadow-lg hover:bg-gray-700 hover:shadow-yellow-500/10 border border-transparent hover:border-yellow-500/30 transition-all transform hover:-translate-y-1"
        >
          <span className="text-4xl mr-4" role="img" aria-label="USA flag">🇺🇸</span>
          English
        </button>
        <button
          onClick={() => onSelectLanguage('pt')}
          className="bg-gray-800 text-white text-2xl font-bold py-6 px-12 rounded-lg shadow-lg hover:bg-gray-700 hover:shadow-yellow-500/10 border border-transparent hover:border-yellow-500/30 transition-all transform hover:-translate-y-1"
        >
          <span className="text-4xl mr-4" role="img" aria-label="Brazil flag">🇧🇷</span>
          Português (BR)
        </button>
      </div>
    </div>
  );
};
