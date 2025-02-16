'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const sections = [
  {
    id: 'hero',
    name: {
      en: 'Start',
      es: 'Inicio'
    }
  },
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
      es: 'Formulario'
    }
  },
  {
    id: 'details',
    name: {
      en: 'Contact',
      es: 'Contacto'
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
    <nav className="w-full flex justify-center px-4 pt-6">
      {/* Desktop Navigation */}
      <div className="hidden sm:block w-full max-w-screen-xl mx-auto">
        <div className="flex justify-center space-x-4">
          <div className="inline-flex bg-neutral-600/90 backdrop-blur-sm rounded-full">
            <ul className="flex items-center px-4 py-2">
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
      <div className="sm:hidden w-full px-4 max-w-screen-xl">
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
        {isMenuOpen && (
          <div 
            className="fixed inset-0 bg-neutral-600/90 backdrop-blur-sm z-50"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="p-4">
              <div className="bg-neutral-600/90 backdrop-blur-sm rounded-2xl overflow-hidden">
                <ul className="flex flex-col text-xs font-mono tracking-wider divide-y divide-white/10">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          scrollToSection(section.id);
                        }}
                        className="w-full text-left px-6 py-4 text-white/90 hover:text-white hover:bg-white/10"
                      >
                        {section.name[lang as keyof typeof section.name].toUpperCase()}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 