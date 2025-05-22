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
      {/* Main image display with improved styling */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg shadow-xl border border-white/10 bg-black/30">
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
        
        {/* Fullscreen button */}
        <button
          onClick={() => setShowFullGallery(true)}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm hover:bg-black/80 flex items-center justify-center text-white transition-colors border border-white/20"
          aria-label="View fullscreen"
        >
          <Expand size={16} />
        </button>
        
        {/* Navigation controls with improved styling */}
        <div className="absolute inset-x-0 bottom-0 flex justify-between p-3 z-10">
          <button 
            onClick={() => handleImageChange('prev')}
            className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm hover:bg-black/80 flex items-center justify-center text-white transition-colors border border-white/20"
            aria-label="Previous image"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="text-xs bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full">
            {activeImageIndex + 1}/{allImages.length}
          </div>
          <button 
            onClick={() => handleImageChange('next')}
            className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm hover:bg-black/80 flex items-center justify-center text-white transition-colors border border-white/20"
            aria-label="Next image"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      
      {/* Thumbnail gallery */}
      <div className="mt-4 grid grid-cols-4 gap-2">
        {allImages.slice(0, 4).map((img, index) => (
          <button
            key={index}
            onClick={() => setActiveImageIndex(index)}
            className={`relative aspect-square rounded-md overflow-hidden transition transform hover:scale-105 ${
              activeImageIndex === index 
                ? 'ring-2 ring-primary shadow-lg scale-105' 
                : 'opacity-80 hover:opacity-100'
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
      
      {/* Fullscreen gallery modal */}
      {showFullGallery && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onClick={() => setShowFullGallery(false)}
        >
          <div className="absolute top-4 right-4 p-4">
            <button 
              onClick={() => setShowFullGallery(false)}
              className="text-white text-xl"
              aria-label="Close gallery"
            >
              ✕
            </button>
          </div>
          
          <div className="relative w-full max-w-4xl h-[80vh] px-10" onClick={(e) => e.stopPropagation()}>
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
              className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button 
              onClick={() => handleImageChange('next')}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/60 px-4 py-2 rounded-full">
              {activeImageIndex + 1} / {allImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 