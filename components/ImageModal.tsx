import React, { useState, useEffect, useRef } from 'react';

interface ImageModalProps {
  imageUrl: string;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, onClose }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  // startPos is for calculating pan delta relative to the initial click
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  // clickStartPos is a ref to differentiate a click from a drag action
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

  // Reset zoom state when the image changes or modal is re-opened
  useEffect(() => {
    setIsZoomed(false);
    setIsPanning(false);
    setTranslate({ x: 0, y: 0 });
  }, [imageUrl]);

  const handleMouseDown = (e: React.MouseEvent) => {
    // Prevent default browser image drag behavior
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

    // Constrain panning to keep the image within the viewport
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
      
      // Calculate how much "extra" image there is to pan around
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

    // If the mouse moved less than a 5px threshold, treat it as a click
    if (moveDistance < 5) {
      if (isZoomed) {
        // Zoom out
        setIsZoomed(false);
        setTranslate({ x: 0, y: 0 });
      } else {
        // Zoom in
        setIsZoomed(true);
      }
    }
    
    setIsPanning(false);
  };
  
  const handleMouseLeave = () => {
    // Stop panning if the cursor leaves the container
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
      aria-label="Image viewer"
    >
      <div
        ref={containerRef}
        className={`relative max-w-4xl max-h-full overflow-hidden ${cursorClass}`}
        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <img
          ref={imageRef}
          src={imageUrl}
          alt="Enlarged edited view"
          className="object-contain w-full h-full max-w-full max-h-[90vh] rounded-lg shadow-2xl transition-transform duration-200 ease-in-out pointer-events-none"
          style={{
            transform: `translate(${translate.x}px, ${translate.y}px) scale(${isZoomed ? 2 : 1})`,
          }}
        />
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Close image viewer"
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
