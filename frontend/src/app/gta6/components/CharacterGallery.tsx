"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Expand } from 'lucide-react';
import SafeImage from './SafeImage';

interface CharacterGalleryProps {
  characterId: string;
  name: string;
  mainImage: string;
  additionalImages: string[];
  isPrimary?: boolean;
}

export default function CharacterGallery({ 
  characterId, 
  name, 
  mainImage, 
  additionalImages, 
  isPrimary = false 
}: CharacterGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showFullGallery, setShowFullGallery] = useState(false);
  const folderPath = `/gta6/characters`;
  
  // Use mainImage and additionalImages to create a combined gallery
  const allImages = [mainImage, ...(additionalImages || [])];
  
  // Auto-cycle through character images in secondary showcase
  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      setActiveImageIndex((prevIndex) => 
        prevIndex === allImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, [allImages.length, isHovered]);

  // Change image in the gallery
  const handleImageChange = (direction: 'next' | 'prev') => {    
    if (direction === 'next') {
      setActiveImageIndex((prevIndex) => 
        prevIndex === allImages.length - 1 ? 0 : prevIndex + 1
      );
    } else {
      setActiveImageIndex((prevIndex) => 
        prevIndex === 0 ? allImages.length - 1 : prevIndex - 1
      );
    }
  };

  return (
    <div 
      className="md:col-span-5 lg:col-span-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main image display com altura fixa para consistência */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-md border border-white/10 bg-black/20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <SafeImage 
              src={`${folderPath}/${allImages[activeImageIndex]}`} 
              alt={`${name} - Image ${activeImageIndex + 1}`} 
              fill 
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
              priority={isPrimary && activeImageIndex === 0}
              encodeSrc={false}
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Botão de expandir menor e menos intrusivo */}
        <button
          onClick={() => setShowFullGallery(true)}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white/80 hover:text-white transition-all border border-white/10"
          aria-label="View fullscreen"
        >
          <Expand size={12} />
        </button>
        
        {/* Controles de navegação mais compactos */}
        <div className="absolute inset-x-0 bottom-2 flex justify-between px-2 z-10">
          <button 
            onClick={() => handleImageChange('prev')}
            className="w-7 h-7 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white/80 hover:text-white transition-all border border-white/10"
            aria-label="Previous image"
          >
            <ChevronLeft size={14} />
          </button>
          <div className="text-xs bg-black/50 text-white/90 px-2 py-0.5 rounded-full text-[10px]">
            {activeImageIndex + 1}/{allImages.length}
          </div>
          <button 
            onClick={() => handleImageChange('next')}
            className="w-7 h-7 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white/80 hover:text-white transition-all border border-white/10"
            aria-label="Next image"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
      
      {/* Miniaturas mais compactas e responsivas */}
      <div className="mt-2 grid grid-cols-4 gap-1">
        {allImages.slice(0, 4).map((img, index) => (
          <button
            key={index}
            onClick={() => setActiveImageIndex(index)}
            className={`relative aspect-square rounded overflow-hidden transition transform ${
              activeImageIndex === index 
                ? 'ring-1 ring-primary/70 shadow-md scale-[1.02]' 
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            <SafeImage 
              src={`${folderPath}/${img}`}
              alt={`${name} thumbnail ${index + 1}`}
              fill
              sizes="(max-width: 768px) 25vw, 10vw"
              className="object-cover"
              encodeSrc={false}
            />
          </button>
        ))}
      </div>
      
      {/* Modal de galeria em tela cheia */}
      {showFullGallery && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onClick={() => setShowFullGallery(false)}
        >
          <button 
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white text-sm bg-black/30 hover:bg-black/50 rounded-full w-8 h-8 flex items-center justify-center"
            aria-label="Close gallery"
          >
            ✕
          </button>
          
          <div className="relative w-full max-w-3xl h-[70vh] px-10" onClick={(e) => e.stopPropagation()}>
            <SafeImage 
              src={`${folderPath}/${allImages[activeImageIndex]}`}
              alt={`${name} - Image ${activeImageIndex + 1}`}
              fill
              sizes="80vw"
              className="object-contain"
              encodeSrc={false}
            />
            
            <button 
              onClick={() => handleImageChange('prev')}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center text-white/80 hover:text-white"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            
            <button 
              onClick={() => handleImageChange('next')}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center text-white/80 hover:text-white"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/90 bg-black/40 px-3 py-1 rounded-full text-sm">
              {activeImageIndex + 1} / {allImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 