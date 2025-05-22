"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CharacterCard from './CharacterCard';
import { characters } from '../data/characterData';

export default function CharacterSection() {
  const [activeCharacterId, setActiveCharacterId] = useState<string | null>(null);
  
  // Função para navegar para um personagem específico
  const scrollToCharacter = (characterId: string) => {
    setActiveCharacterId(characterId);
    const element = document.getElementById(`character-${characterId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="mt-8 mb-16">
      {/* Character Navigation Slider foi removido conforme solicitado */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
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