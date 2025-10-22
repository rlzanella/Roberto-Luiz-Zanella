import React, { useState } from 'react';
import { Loader } from './Loader';

interface ImageSliderProps {
  beforeSrc: string | null;
  afterSrc: string | null;
  isLoading?: boolean;
  rotation?: number;
}

export const ImageSlider: React.FC<ImageSliderProps> = ({ beforeSrc, afterSrc, isLoading = false, rotation = 0 }) => {
  const [sliderPos, setSliderPos] = useState(50);

  const finalBeforeSrc = beforeSrc || "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
  const finalAfterSrc = afterSrc || "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
  
  const showSlider = beforeSrc && afterSrc && !isLoading;

  return (
    <div className="flex flex-col gap-2">
      <div 
        className="relative w-full aspect-square bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden border-2 border-gray-600 select-none"
        style={{ touchAction: 'none' }}
      >
        {isLoading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-20">
            <Loader />
            <p className="text-gray-300 mt-2">Generating your image...</p>
          </div>
        )}
        
        {!beforeSrc && !isLoading && (
          <div className="text-gray-500 flex flex-col items-center text-center p-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Your images will appear here</span>
          </div>
        )}

        {beforeSrc && (
           <img
            src={finalBeforeSrc}
            alt="Original"
            className="absolute top-0 left-0 object-contain w-full h-full transition-transform duration-300 ease-in-out"
            style={{ transform: `rotate(${rotation}deg)` }}
            draggable={false}
          />
        )}
       
        {afterSrc && (
          <img
            src={finalAfterSrc}
            alt="Edited"
            className="absolute top-0 left-0 object-contain w-full h-full transition-transform duration-300 ease-in-out"
            style={{ 
              clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
              transform: `rotate(${rotation}deg)`
            }}
            draggable={false}
          />
        )}

        {showSlider && (
          <>
            <div 
              className="absolute top-0 bottom-0 w-1 bg-yellow-400 cursor-ew-resize z-10 pointer-events-none"
              style={{ left: `calc(${sliderPos}% - 2px)` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -left-4 w-9 h-9 rounded-full bg-yellow-400 flex items-center justify-center text-gray-900 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" /></svg>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              className="absolute inset-0 w-full h-full cursor-ew-resize opacity-0 z-10"
              aria-label="Before and after image slider"
            />
          </>
        )}
      </div>
    </div>
  );
};
