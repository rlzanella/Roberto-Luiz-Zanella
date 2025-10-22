
import React from 'react';

interface ImageDisplayProps {
  src: string | null;
  alt: string;
  description?: string;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ src, alt, description }) => {
  if (!src) {
    return (
      <div className="w-full aspect-square bg-gray-700 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">No image to display</p>
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
