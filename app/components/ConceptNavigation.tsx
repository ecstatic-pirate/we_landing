'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const sections = [
  {
    id: 'story',
    name: {
      en: 'Our Story',
      es: 'Nuestra Historia'
    }
  },
  {
    id: 'spanish',
    name: {
      en: 'Spanish Wedding',
      es: 'Boda Española'
    }
  },
  {
    id: 'indian',
    name: {
      en: 'Indian Wedding',
      es: 'Boda India'
    }
  },
  {
    id: 'rsvp',
    name: {
      en: 'RSVP',
      es: 'RSVP'
    }
  }
];

export default function ConceptNavigation() {
  const params = useParams();
  const lang = (params?.lang as string) || 'en';
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-4 left-0 right-0 z-50">
      {/* Desktop Navigation */}
      <div className="hidden sm:block">
        <div className="flex justify-center space-x-4">
          <div className="inline-flex bg-neutral-600/90 backdrop-blur-sm rounded-full">
            <ul className="flex items-center px-4 py-1.5">
              {sections.map((section, index) => (
                <li key={section.id} className="flex items-center">
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className="text-white/90 hover:text-white text-xs font-mono tracking-wider px-3"
                  >
                    {section.name[lang as keyof typeof section.name].toUpperCase()}
                  </button>
                  {index < sections.length - 1 && (
                    <span className="text-white/20">•</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Language Switcher */}
          <div className="inline-flex bg-neutral-600/90 backdrop-blur-sm rounded-full px-3 py-1.5">
            <div className="flex items-center gap-2 text-xs font-mono tracking-wider">
              <Link 
                href="/en" 
                className={`${lang === 'en' ? 'text-white' : 'text-white/70 hover:text-white'}`}
              >
                EN
              </Link>
              <span className="text-white/20">|</span>
              <Link 
                href="/es" 
                className={`${lang === 'es' ? 'text-white' : 'text-white/70 hover:text-white'}`}
              >
                ES
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden px-4">
        <div className="flex justify-between items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="bg-neutral-600/90 backdrop-blur-sm p-2 rounded-full text-white"
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          {/* Mobile Language Switcher */}
          <div className="bg-neutral-600/90 backdrop-blur-sm rounded-full px-3 py-1.5">
            <div className="flex items-center gap-2 text-xs font-mono tracking-wider">
              <Link 
                href="/en" 
                className={`${lang === 'en' ? 'text-white' : 'text-white/70 hover:text-white'}`}
              >
                EN
              </Link>
              <span className="text-white/20">|</span>
              <Link 
                href="/es" 
                className={`${lang === 'es' ? 'text-white' : 'text-white/70 hover:text-white'}`}
              >
                ES
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div 
          className={`${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} 
          fixed inset-0 bg-neutral-600/90 backdrop-blur-sm transition-opacity duration-300 mt-4`}
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="p-2">
            <div className="bg-neutral-600/90 backdrop-blur-sm rounded-2xl overflow-hidden relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMenuOpen(false);
                }}
                className="absolute top-2 right-2 p-2 text-white/90 hover:text-white rounded-full hover:bg-white/10"
              >
                <X size={18} />
              </button>
              <ul className="flex flex-col text-xs font-mono tracking-wider divide-y divide-white/10 pt-4">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        scrollToSection(section.id);
                      }}
                      className="w-full text-left text-white/90 hover:text-white py-2 px-2 hover:bg-white/10 transition-colors"
                    >
                      {section.name[lang as keyof typeof section.name].toUpperCase()}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 