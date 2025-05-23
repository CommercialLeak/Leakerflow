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
    <div className="character-hero relative h-[45vh] md:h-[55vh] lg:h-[60vh] rounded-t-xl overflow-hidden">
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
      
      {/* Character Info Overlay - More compact and better organized */}
      <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6 md:p-8 z-30">
        <div className="max-w-xl">
          {/* Character Name - Tamanho mais apropriado */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-2"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight drop-shadow-md">
              {info.name}
            </h2>
            
            {/* Sleek underline element */}
            <div className="h-1 w-12 bg-white/80 mt-2 mb-3"></div>
          </motion.div>

          {/* Character Tagline - First line of description - Tamanho mais apropriado */}
          {officialDesc.length > 0 && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-sm sm:text-base text-white/90 mb-2 font-medium tracking-tight"
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
              className="text-xs sm:text-sm text-white/80 mb-3 font-medium italic tracking-tight"
            >
              {quote.startsWith('"') ? quote : `"${quote}"`}
            </motion.p>
          )}
        </div>
      </div>
    </div>
  );
} 