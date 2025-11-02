import React from 'react';
import { I18n } from '../i18n/strings';

interface ImageDisplayProps {
  src: string | null;
  alt: string;
  description?: string;
  t: I18n;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ src, alt, description, t }) => {
  if (!src) {
    return (
      <div className="w-full aspect-square bg-gray-700 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">{t.noImageToDisplay}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <img src={src} alt={alt} className="w-full h-auto object-contain rounded-lg shadow-lg" />
      {description && <p className="text-center text-gray-300 italic">"{description}"</p>}
    </div>
  );
};
