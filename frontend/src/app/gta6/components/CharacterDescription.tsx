"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { CharacterInfo } from '../data/characterData';

interface CharacterDescriptionProps {
  info: CharacterInfo;
}

export default function CharacterDescription({ info }: CharacterDescriptionProps) {
  const officialDesc = info.officialDescription || [];
  
  // Função para determinar se um parágrafo é uma citação
  const isQuote = (text: string, index: number) => {
    return text.startsWith('"') || 
           text.endsWith('"') || 
           text.length < 60 || 
           (index > 1 && index < officialDesc.length - 1);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="md:col-span-7 lg:col-span-8 relative px-2"
    >
      {/* Character description paragraphs */}
      <div className="space-y-8">
        {officialDesc.map((paragraph, index) => {
          // Skip the first paragraph as it's already shown in the hero component
          if (index === 0) return null;
          
          // Determine if it should be rendered as a quote
          const renderAsQuote = isQuote(paragraph, index);
          
          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
              className={`
                ${renderAsQuote ? 'my-8' : 'text-muted-foreground'}
              `}
            >
              {renderAsQuote ? (
                <div className="relative">
                  <Quote className="absolute -left-6 -top-2 text-primary/30 h-12 w-12" />
                  <p className="text-2xl sm:text-3xl font-medium text-white/90 italic leading-relaxed tracking-tight">
                    {paragraph.startsWith('"') ? paragraph : `"${paragraph}"`}
                  </p>
                </div>
              ) : (
                <p className="text-lg leading-relaxed">
                  {paragraph}
                </p>
              )}
            </motion.div>
          );
        })}
      </div>
      
      {/* Final paragraph with distinctive styling */}
      {officialDesc.length > 0 && (
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-lg font-medium text-white/90 mt-10 italic"
        >
          {officialDesc[officialDesc.length - 1]}
        </motion.p>
      )}
      
      {/* Minimal decorative elements */}
      <div className="mt-10 h-0.5 w-full bg-gradient-to-r from-white/10 via-white/20 to-transparent"></div>
    </motion.div>
  );
} 