"use client";

// Declaração global para o timeout do dropdown
declare global {
  interface Window {
    closeDropdownTimeout: NodeJS.Timeout | undefined;
  }
}

import Image from 'next/image';
import { Calendar, MapPin, ChevronUp, Home, ChevronRight, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

import CharacterSection from './components/CharacterSection';
import SafeImage from './components/SafeImage';
import { characters } from './data/characterData';

export default function GTA6Page() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showCharactersDropdown, setShowCharactersDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Mostrar o botão quando rolar mais que 300px
      setShowBackToTop(window.scrollY > 300);
    };

    // Adicionar event listener
    window.addEventListener('scroll', handleScroll);
    
    // Verificar posição inicial
    handleScroll();
    
    // Limpar event listener ao desmontar o componente
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToCharacter = (characterId: string) => {
    const element = document.getElementById(`character-${characterId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setShowCharactersDropdown(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">

      {/* Fixed Navigation Menu */}
      <nav className="fixed top-4 right-4 z-50 flex flex-col space-y-2">
        <div className="bg-black/70 backdrop-blur-md shadow-lg rounded-full p-2 border border-white/10">
          <ul className="flex items-center space-x-2">
            <li>
              <a 
                href="#trailers" 
                className="px-3 py-1.5 text-sm text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-colors flex items-center"
              >
                Trailers
              </a>
            </li>
            <li className="relative group">
              <button 
                onClick={() => {
                  setShowCharactersDropdown(!showCharactersDropdown);
                }}
                onMouseEnter={() => {
                  clearTimeout(window.closeDropdownTimeout);
                  setShowCharactersDropdown(true);
                }}
                onMouseLeave={() => {
                  window.closeDropdownTimeout = setTimeout(() => {
                    setShowCharactersDropdown(false);
                  }, 300);
                }}
                className="px-4 py-2 text-sm text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-colors flex items-center justify-between gap-2 min-w-[120px]"
              >
                <span>Characters</span>
                <ChevronDown 
                  size={16} 
                  className={`transition-transform duration-300 ${showCharactersDropdown ? 'rotate-180' : ''}`} 
                />
              </button>
              
              {showCharactersDropdown && (
                <div 
                  className="absolute top-full right-0 mt-2 w-60 bg-black/90 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl overflow-hidden py-2 character-dropdown"
                  onMouseEnter={() => {
                    clearTimeout(window.closeDropdownTimeout);
                    setShowCharactersDropdown(true);
                  }}
                  onMouseLeave={() => {
                    window.closeDropdownTimeout = setTimeout(() => {
                      setShowCharactersDropdown(false);
                    }, 300);
                  }}
                >
                  <div className="max-h-[70vh] overflow-y-auto custom-scrollbar p-1">
                    {characters.map(character => (
                      <button
                        key={character.id}
                        onClick={() => scrollToCharacter(character.id)}
                        className="character-item w-full text-left px-4 py-3 text-sm text-white/80 hover:text-white transition-colors flex items-center gap-3 rounded-lg mb-1"
                      >
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-black/50 flex-shrink-0 border border-white/10">
                          <Image 
                            src={`/gta6/characters/${character.mainImage}`} 
                            alt={character.info.name} 
                            width={40} 
                            height={40} 
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <span className="font-medium">
                          {character.info.name}
                          {(character.id === 'lucia' || character.id === 'jason') && (
                            <span className="ml-2 text-primary">★</span>
                          )}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </li>
            {/* Links removidos */}
          </ul>
        </div>
      </nav>

      {/* Back to Top Button */}
      {showBackToTop && (
        <div className="fixed bottom-4 right-4 z-50">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center justify-center w-10 h-10 bg-primary/80 hover:bg-primary text-white rounded-full shadow-lg transition-all transform hover:scale-110"
            aria-label="Back to top"
          >
            <ChevronUp size={20} />
          </a>
        </div>
      )}

      {/* Hero Section */}
      <section id="hero" className="relative h-[85vh] w-full overflow-hidden rounded-xl mb-16 border border-white/10 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40 z-10"></div>
        <SafeImage 
          src="/gta6/jason_and_lucia.jpeg" 
          alt="Grand Theft Auto VI" 
          fill 
          sizes="100vw"
          className="object-cover object-center"
          priority={true}
          encodeSrc={false}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <Image 
            src="/gta6/vi.png" 
            alt="GTA VI Logo" 
            width={400} 
            height={240} 
            className="mb-8 h-auto" 
            priority
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-20 p-8 md:p-12">
          <div className="container mx-auto max-w-screen-xl">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tighter">
              Grand Theft Auto VI
            </h1>
            <div className="h-1 w-24 bg-white/80 mt-1 mb-6"></div>
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <span className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
                <Calendar size={20} className="text-primary" />
                Expected: Fall 2025
              </span>
              <span className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
                <MapPin size={20} className="text-primary" />
                Leonida, Vice City
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Trailers Section - Nova seção de trailers */}
      <section id="trailers" className="gta-section w-full max-w-screen-xl mx-auto mb-16">
        <div className="gta-card">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Trailer 1 - Embedded YouTube player */}
            <div className="relative aspect-video rounded-lg overflow-hidden border border-white/20 shadow-lg">
              <iframe 
                src="https://www.youtube.com/embed/QdBZY2fkU-0?si=i-8BmWJVNl7hu0Xk" 
                title="GTA VI Trailer 1"
                className="absolute top-0 left-0 w-full h-full" 
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            </div>
            
            {/* Trailer 2 - Embedded YouTube player */}
            <div className="relative aspect-video rounded-lg overflow-hidden border border-primary/40 shadow-lg">
              <iframe 
                src="https://www.youtube.com/embed/VQRLujxTm3c?si=E9tGXjzPgaD5KS9Y" 
                title="GTA VI Trailer 2"
                className="absolute top-0 left-0 w-full h-full" 
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
              <div className="absolute top-4 right-4 z-20 pointer-events-none">
                <span className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">NEW</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="w-full max-w-screen-xl mx-auto">
        {/* Characters Section */}
        <div id="characters" className="gta-section">
          <CharacterSection />
        </div>
        
        {/* Seções About e Timeline removidas conforme solicitado */}
      </div>

      {/* Footer */}
      <footer className="mt-24 py-6 text-center text-sm text-muted-foreground border-t border-white/10">
        <p>This is an unofficial fan page for Grand Theft Auto VI. All images and information are property of Rockstar Games.</p>
      </footer>
    </div>
  );
} 