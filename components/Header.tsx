import React from 'react';

interface HeaderProps {
    showBackButton?: boolean;
    onBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ showBackButton = false, onBack }) => {
  return (
    <header className="py-6 text-center border-b border-gray-700 relative">
      {showBackButton && (
        <button 
            onClick={onBack} 
            className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
            aria-label="Go back to mode selection"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Change Mode
        </button>
      )}
      <div className="flex items-center justify-center gap-4">
        <span className="text-5xl">👗</span>
        <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">
                Your Wardrobe
            </h1>
            <h2 className="text-xl md:text-2xl font-light text-gray-300">Virtual Style Assistant</h2>
        </div>
      </div>
    </header>
  );
};
