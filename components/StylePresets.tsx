import React from 'react';
import { StylePreset } from '../data/stylePresets';
import { I18n } from '../i18n/strings';

interface StylePresetsProps {
  presets: StylePreset[];
  onSelectPreset: (presetSelections: StylePreset['selections']) => void;
  t: I18n;
}

export const StylePresets: React.FC<StylePresetsProps> = ({ presets, onSelectPreset, t }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {presets.map((preset) => (
            <button
                key={preset.id}
                onClick={() => onSelectPreset(preset.selections)}
                className="p-3 bg-gray-700 rounded-lg text-left hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500"
                aria-label={`Apply ${preset.name} preset`}
            >
                <p className="font-bold text-sm text-yellow-400">{preset.name}</p>
                <p className="text-xs text-gray-400 mt-1">{preset.description}</p>
            </button>
        ))}
    </div>
  );
};
