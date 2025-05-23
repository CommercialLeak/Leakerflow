"use client";

import React from 'react';
import { motion } from 'framer-motion';
import CharacterHero from './CharacterHero';
import CharacterGallery from './CharacterGallery';
import CharacterDescription from './CharacterDescription';
import { CharacterInfo } from '../data/characterData';

interface CharacterCardProps {
  characterId: string;
  mainImage: string;
  bgImagePath: string;
  fgImagePath?: string;
  additionalImages?: string[];
  info: CharacterInfo;
  isPrimary?: boolean;
}

export default function CharacterCard({ 
  characterId, 
  mainImage, 
  bgImagePath,
  fgImagePath = '',
  additionalImages = [], 
  info, 
  isPrimary = false 
}: CharacterCardProps) {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative w-full mb-10 shadow-md"
      id={`character-${characterId}`}
    >
      {/* Character Hero Banner */}
      <CharacterHero 
        bgImagePath={bgImagePath} 
        fgImagePath={fgImagePath} 
        info={info} 
      />

      {/* Character Detail Content */}
      <div className="w-full bg-black/80 backdrop-blur-md rounded-b-xl border-x border-b border-white/10 shadow-md">
        <div className="container mx-auto py-6 px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Image Gallery */}
            <CharacterGallery 
              characterId={characterId} 
              name={info.name} 
              mainImage={mainImage} 
              additionalImages={additionalImages} 
              isPrimary={isPrimary} 
            />
            
            {/* Character Description */}
            <CharacterDescription info={info} />
          </div>
        </div>
      </div>
      
      {/* Character-specific accent color line */}
      <div 
        className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${getCharacterAccentGradient(characterId)}`}
      />
    </motion.section>
  );
}

// Função auxiliar para obter gradiente de cor baseado no personagem
function getCharacterAccentGradient(characterId: string): string {
  switch(characterId) {
    case 'lucia':
      return 'from-pink-500 via-rose-600 to-transparent';
    case 'jason':
      return 'from-blue-500 via-sky-600 to-transparent';
    case 'cal':
      return 'from-green-500 via-emerald-600 to-transparent';
    case 'boobie':
      return 'from-purple-500 via-violet-600 to-transparent';
    case 'dre':
      return 'from-red-500 via-red-600 to-transparent';
    case 'real':
      return 'from-amber-500 via-yellow-600 to-transparent';
    case 'raul':
      return 'from-orange-500 via-amber-600 to-transparent';
    case 'brian':
      return 'from-cyan-500 via-teal-600 to-transparent';
    default:
      return 'from-white/30 via-white/20 to-transparent';
  }
} 