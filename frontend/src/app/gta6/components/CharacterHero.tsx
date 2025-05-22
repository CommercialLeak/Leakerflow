"use client";

import React from 'react';
import { motion } from 'framer-motion';
import SafeImage from './SafeImage';
import { CharacterInfo } from '../data/characterData';

interface CharacterHeroProps {
  bgImagePath: string;
  fgImagePath: string;
  info: CharacterInfo;
}

export default function CharacterHero({ bgImagePath, fgImagePath, info }: CharacterHeroProps) {
  const officialDesc = info.officialDescription || [];
  
  // Get character quotes (usually the 3rd or 4th paragraph if available)
  const getCharacterQuote = () => {
    if (officialDesc.length >= 4 && officialDesc[3].startsWith('"') || officialDesc[3]?.length < 60) {
      return officialDesc[3];
    } else if (officialDesc.length >= 3 && officialDesc[2].startsWith('"') || officialDesc[2]?.length < 60) {
      return officialDesc[2];
    }
    // Default to empty if no suitable quote found
    return '';
  };

  const quote = getCharacterQuote();

  return (
    <div className="character-hero relative h-[60vh] md:h-[70vh] lg:h-[80vh] rounded-t-xl overflow-hidden">
      {/* Background Overlay - Darker gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40 z-10"></div>
      
      {/* Background Image */}
      <div className="absolute inset-0 z-5">
        <SafeImage 
          src={bgImagePath} 
          alt={`${info.name} background`} 
          fill 
          sizes="100vw"
          className="object-cover"
          priority={true}
          encodeSrc={false}
        />
      </div>
      
      {/* Foreground Character Image - Melhor posicionamento e tamanho */}
      {fgImagePath && (
        <div className="absolute bottom-0 right-0 h-full w-full md:w-1/2 lg:w-2/5 z-20 overflow-hidden">
          <div className="absolute bottom-0 right-0 w-full h-full">
            <SafeImage 
              src={fgImagePath} 
              alt={`${info.name} portrait`} 
              fill 
              sizes="50vw"
              className="object-contain object-bottom"
              priority={true}
              encodeSrc={false}
            />
          </div>
        </div>
      )}
      
      {/* Character Info Overlay - Melhor organização e tamanho de texto */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 md:p-10 z-30">
        <div className="max-w-xl">
          {/* Character Name - Tamanho mais apropriado */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-2"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight drop-shadow-md">
              {info.name}
            </h2>
            
            {/* Sleek underline element */}
            <div className="h-1 w-16 bg-white/80 mt-2 mb-4"></div>
          </motion.div>

          {/* Character Tagline - First line of description - Tamanho mais apropriado */}
          {officialDesc.length > 0 && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-base sm:text-lg text-white/90 mb-2 font-medium tracking-tight"
            >
              {officialDesc[0]}
            </motion.p>
          )}
          
          {/* Character Quote - Shown as a prominent element if available - Tamanho mais apropriado */}
          {quote && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-sm sm:text-base text-white/80 mb-4 font-medium italic tracking-tight"
            >
              {quote.startsWith('"') ? quote : `"${quote}"`}
            </motion.p>
          )}
        </div>
      </div>
    </div>
  );
} 