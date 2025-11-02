import React from 'react';
import { I18n } from '../i18n/strings';
import { CustomPreset as CustomPresetType } from '../App';

export interface CustomPreset {
  id: string;
  name: string;
}

interface CustomPresetsProps {
  presets: CustomPresetType[];
  onSelect: (preset: CustomPresetType) => void;
  onDelete: (id: string) => void;
  t: I18n;
}

export const CustomPresets: React.FC<CustomPresetsProps> = ({ presets, onSelect, onDelete, t }) => {
  if (presets.length === 0) {
    return (
      <div className="p-3 text-sm text-center text-gray-500 bg-gray-800 rounded-lg">
        {t.wardrobe.noCustomPresets}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {presets.map((preset) => (
            <div key={preset.id} className="group relative">
                <button
                    onClick={() => onSelect(preset)}
                    className="w-full p-3 bg-gray-700 rounded-lg text-left hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    aria-label={`Apply ${preset.name} preset`}
                >
                    <p className="font-bold text-sm text-yellow-400">{preset.name}</p>
                </button>
                <button 
                    onClick={() => onDelete(preset.id)}
                    className="absolute top-1/2 -translate-y-1/2 right-2 p-1.5 rounded-full text-gray-500 hover:text-red-400 hover:bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label={`${t.wardrobe.deletePreset} ${preset.name}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
            </div>
        ))}
    </div>
  );
};
