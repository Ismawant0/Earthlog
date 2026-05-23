'use client';

import React, { useState, useEffect } from 'react';
import { ZoomIn, X } from 'lucide-react';

interface FigureProps {
  src: string;
  alt?: string;
  caption?: string;
}

export default function Figure({ src, alt = 'Technical Diagram', caption }: FigureProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  // Close lightbox on Escape key
  useEffect(() => {
    if (!isZoomed) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsZoomed(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isZoomed]);

  // Lock body scroll when zoomed
  useEffect(() => {
    if (isZoomed) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isZoomed]);

  return (
    <figure className="my-8 space-y-3 group select-none">
      {/* Image container with subtle styling & hover effects */}
      <div 
        onClick={() => setIsZoomed(true)}
        className="relative overflow-hidden rounded-xl border border-border/60 bg-muted/30 hover:border-primary/30 transition-all duration-300 cursor-zoom-in group shadow-sm hover:shadow-md"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={src} 
          alt={alt} 
          loading="lazy"
          className="w-full h-auto max-h-[550px] object-contain mx-auto transition-transform duration-500 group-hover:scale-[1.01]"
        />

        {/* Hover zoom overlay indicator */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 dark:group-hover:bg-white/5 transition-colors duration-300 flex items-center justify-center">
          <div className="bg-background/90 backdrop-blur-md text-foreground p-2.5 rounded-full shadow-lg border border-border/50 scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
            <ZoomIn className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Caption text */}
      {caption && caption.trim() !== '' && (
        <figcaption className="text-center text-xs md:text-sm text-muted font-medium italic px-4 select-text selection:bg-primary/10">
          {caption}
        </figcaption>
      )}

      {/* Lightbox / Zoom Portal */}
      {isZoomed && (
        <div 
          onClick={() => setIsZoomed(false)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200 cursor-zoom-out"
        >
          {/* Close button */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsZoomed(false);
            }}
            className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition duration-150 border border-white/10"
            aria-label="Close lightbox"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Fullscreen image container */}
          <div className="relative max-w-full max-h-full flex flex-col items-center justify-center animate-in zoom-in-95 duration-300">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={src} 
              alt={alt} 
              className="max-w-[95vw] max-h-[85vh] object-contain rounded-lg shadow-2xl select-text"
              onClick={(e) => e.stopPropagation()} // Prevent click-through close
            />
            {caption && caption.trim() !== '' && (
              <p className="text-white/90 text-sm md:text-base font-medium mt-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-center max-w-[90vw] select-text">
                {caption}
              </p>
            )}
          </div>
        </div>
      )}
    </figure>
  );
}
