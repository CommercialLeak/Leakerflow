"use client";

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import CharacterCard from './CharacterCard';
import { characters } from '../data/characterData';

export default function CharacterSection() {
  const [activeCharacterId, setActiveCharacterId] = useState<string | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  // Função para navegar para um personagem específico
  const scrollToCharacter = (characterId: string) => {
    setActiveCharacterId(characterId);
    const element = document.getElementById(`character-${characterId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  // Funções para navegação do slider
  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };
  
  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="mt-8 mb-16">
      {/* Character Navigation Slider */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16 relative"
      >
        {/* Slider de navegação dos personagens */}
        <div className="relative w-full mb-8">
          <button 
            onClick={slideLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white"
            aria-label="Scroll left"
          >
            <ChevronLeft size={18} />
          </button>
          
          <div 
            ref={sliderRef}
            className="flex overflow-x-auto scrollbar-hide gap-2 py-2 px-6 max-w-full snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {characters.map((character) => (
              <button
                key={character.id}
                onClick={() => scrollToCharacter(character.id)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 snap-start
                  ${activeCharacterId === character.id 
                    ? 'bg-primary/20 text-white' 
                    : 'bg-black/20 text-muted-foreground hover:bg-black/40 hover:text-white'}
                  ${character.id === 'lucia' || character.id === 'jason' ? 'border border-primary/40' : 'border border-white/10'}
                `}
              >
                <span className="flex items-center gap-1">
                  {character.info.name}
                  <ChevronRight size={14} className="opacity-70" />
                </span>
              </button>
            ))}
          </div>
          
          <button 
            onClick={slideRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white"
            aria-label="Scroll right"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Character Cards */}
        <div className="space-y-24">
          {characters.map((character) => (
            <CharacterCard 
              key={character.id}
              characterId={character.id}
              mainImage={character.mainImage}
              bgImagePath={character.bgImagePath}
              fgImagePath={character.fgImagePath}
              additionalImages={character.additionalImages}
              info={character.info}
              isPrimary={character.id === 'lucia' || character.id === 'jason'}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
} 