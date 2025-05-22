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
    if (officialDesc.length >= 4 && officialDesc[3].startsWith('"') || officialDesc[3].length < 60) {
      return officialDesc[3];
    } else if (officialDesc.length >= 3 && officialDesc[2].startsWith('"') || officialDesc[2].length < 60) {
      return officialDesc[2];
    }
    // Default to empty if no suitable quote found
    return '';
  };

  const quote = getCharacterQuote();

  return (
    <div className="character-hero">
      {/* Background Overlay - Darker gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/50 z-10"></div>
      
      {/* Background Image */}
      <SafeImage 
        src={bgImagePath} 
        alt={`${info.name} background`} 
        fill 
        sizes="100vw"
        className="object-cover"
        priority={true}
        encodeSrc={false}
      />
      
      {/* Foreground Character Image (render for all characters) */}
      {fgImagePath && (
        <div className="absolute bottom-0 right-0 h-full w-full md:w-1/2 lg:w-2/5 z-20">
          <SafeImage 
            src={fgImagePath} 
            alt={`${info.name} portrait`} 
            fill 
            sizes="50vw"
            className="object-contain object-bottom"
            priority={false}
            encodeSrc={false}
          />
        </div>
      )}
      
      {/* Character Info Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 md:p-10 z-30">
        <div className="container mx-auto max-w-screen-xl">
          {/* Character Name - Larger and more impactful */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tighter drop-shadow-xl">
              {info.name}
            </h2>
            
            {/* Sleek underline element */}
            <div className="h-1 w-24 bg-white/80 mt-3 mb-6"></div>
          </motion.div>

          {/* Character Tagline - First line of description */}
          {officialDesc.length > 0 && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-xl sm:text-2xl text-white/90 max-w-xl mb-3 font-medium tracking-tight"
            >
              {officialDesc[0]}
            </motion.p>
          )}
          
          {/* Character Quote - Shown as a prominent element if available */}
          {quote && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-xl sm:text-3xl text-white/80 max-w-xl mb-10 font-bold italic tracking-tight"
            >
              {quote.startsWith('"') ? quote : `"${quote}"`}
            </motion.p>
          )}
        </div>
      </div>
    </div>
  );
} 