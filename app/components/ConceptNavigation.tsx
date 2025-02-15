'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav>
      <div className="px-4 sm:px-6 py-2 sm:py-3 bg-black/40 backdrop-blur-sm rounded-full border border-white/10">
        <ul className="flex gap-4 sm:gap-8 text-xs sm:text-sm font-mono tracking-wider">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => scrollToSection(section.id)}
                className="relative text-stone-200 transition-all duration-300
                  hover:text-white group whitespace-nowrap"
              >
                <span>{section.name[lang as keyof typeof section.name].toUpperCase()}</span>
                <span className="absolute bottom-0 left-0 w-0 h-px bg-white/60 
                  transition-all duration-300 group-hover:w-full"></span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
} 