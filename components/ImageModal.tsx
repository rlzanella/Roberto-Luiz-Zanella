import React, { useState, useEffect, useRef } from 'react';
import { I18n } from '../i18n/strings';

interface ImageModalProps {
  imageUrl: string;
  onClose: () => void;
  t: I18n;
}

export const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, onClose, t }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const clickStartPos = useRef({ x: 0, y: 0 });
  
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    setIsZoomed(false);
    setIsPanning(false);
    setTranslate({ x: 0, y: 0 });
  }, [imageUrl]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    clickStartPos.current = { x: e.clientX, y: e.clientY };
    if (isZoomed) {
      setIsPanning(true);
      setStartPos({ x: e.clientX - translate.x, y: e.clientY - translate.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning || !isZoomed) return;
    e.preventDefault();
    
    let newX = e.clientX - startPos.x;
    let newY = e.clientY - startPos.y;

    const container = containerRef.current;
    const image = imageRef.current;

    if (container && image && image.naturalWidth > 0) {
      const scale = 2; // Current zoom scale
      const containerRatio = container.clientWidth / container.clientHeight;
      const imageRatio = image.naturalWidth / image.naturalHeight;
      
      let renderedWidth, renderedHeight;
      if (containerRatio > imageRatio) {
        renderedHeight = container.clientHeight;
        renderedWidth = renderedHeight * imageRatio;
      } else {
        renderedWidth = container.clientWidth;
        renderedHeight = renderedWidth / imageRatio;
      }
      
      const maxX = Math.max(0, (renderedWidth * scale - container.clientWidth) / 2);
      const maxY = Math.max(0, (renderedHeight * scale - container.clientHeight) / 2);
      
      newX = Math.max(-maxX, Math.min(maxX, newX));
      newY = Math.max(-maxY, Math.min(maxY, newY));
    }
    
    setTranslate({ x: newX, y: newY });
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    const endPos = { x: e.clientX, y: e.clientY };
    const moveDistance = Math.sqrt(
      Math.pow(endPos.x - clickStartPos.current.x, 2) +
      Math.pow(endPos.y - clickStartPos.current.y, 2)
    );

    if (moveDistance < 5) {
      if (isZoomed) {
        setIsZoomed(false);
        setTranslate({ x: 0, y: 0 });
      } else {
        setIsZoomed(true);
      }
    }
    
    setIsPanning(false);
  };
  
  const handleMouseLeave = () => {
    if(isPanning) {
      setIsPanning(false);
    }
  };

  const cursorClass = isZoomed
    ? (isPanning ? 'cursor-grabbing' : 'cursor-zoom-out')
    : 'cursor-zoom-in';

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={t.imageViewer}
    >
      <div
        ref={containerRef}
        className={`relative max-w-4xl max-h-full overflow-hidden ${cursorClass}`}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <img
          ref={imageRef}
          src={imageUrl}
          alt={t.enlargedView}
          className="object-contain w-full h-full max-w-full max-h-[90vh] rounded-lg shadow-2xl transition-transform duration-200 ease-in-out pointer-events-none"
          style={{
            transform: `translate(${translate.x}px, ${translate.y}px) scale(${isZoomed ? 2 : 1})`,
          }}
        />
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
          aria-label={t.closeImageViewer}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
