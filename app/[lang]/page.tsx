'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import ConceptNavigation from '../components/ConceptNavigation';
import AudioPlayer from '../components/AudioPlayer';
import WeddingProgram from '../components/WeddingProgram';
import { ProgramEvent } from '../components/WeddingProgram';
import FallingElements from '../components/FallingElements';

interface PageProps {
  params: {
    lang: string;
  };
}

const spanishProgram: ProgramEvent[] = [
  {
    time: "July 4th - 18:00",
    title: {
      en: "Civil Ceremony",
      es: "Ceremonia Civil"
    },
    description: {
      en: "Civil ceremony at Segovia Townhall",
      es: "Ceremonia civil en el Ayuntamiento de Segovia"
    },
    icon: "ceremony"
  },
  {
    time: "July 4th - 19:00 - 23:00",
    title: {
      en: "Pre-wedding Event",
      es: "Evento Pre-boda"
    },
    description: {
      en: "Pre-wedding celebration at Palacio Episcopal, Segovia",
      es: "Celebración pre-boda en el Palacio Episcopal, Segovia"
    },
    icon: "party"
  },
  {
    time: "July 5th - 12:45",
    title: {
      en: "Bus Departure",
      es: "Salida del Autobús"
    },
    description: {
      en: "Bus leaves from Aqueduct to Finca El Bosque de Cati, Brieva (15 min drive)",
      es: "El autobús sale del Acueducto hacia Finca El Bosque de Cati, Brieva (15 min en coche)"
    },
    icon: "day"
  },
  {
    time: "July 5th - 13:00 - 02:00",
    title: {
      en: "Wedding Ceremony & Celebration",
      es: "Ceremonia de Boda y Celebración"
    },
    description: {
      en: "Main wedding ceremony and celebration",
      es: "Ceremonia principal de boda y celebración"
    },
    icon: "ceremony"
  },
  {
    time: "July 5th - 14:30 - 16:30",
    title: {
      en: "Cocktail Reception",
      es: "Cóctel de Bienvenida"
    },
    description: {
      en: "Welcome drinks and appetizers",
      es: "Bebidas de bienvenida y aperitivos"
    },
    icon: "party"
  },
  {
    time: "July 5th - 16:45 - 18:40",
    title: {
      en: "Wedding Lunch",
      es: "Almuerzo de Boda"
    },
    description: {
      en: "Traditional Spanish wedding feast",
      es: "Banquete tradicional de boda española"
    },
    icon: "dinner"
  },
  {
    time: "July 5th - 19:00 - 21:00",
    title: {
      en: "Live Band & First Dance",
      es: "Banda en Vivo y Primer Baile"
    },
    description: {
      en: "Live music performance and the couple's first dance",
      es: "Actuación de música en vivo y primer baile de los novios"
    },
    icon: "party"
  },
  {
    time: "July 5th - 21:00 - 02:00",
    title: {
      en: "After Party",
      es: "Fiesta"
    },
    description: {
      en: "Celebration continues with DJ and drinks",
      es: "La celebración continúa con DJ y bebidas"
    },
    icon: "night"
  },
  {
    time: "July 5th - 22:30 - 23:30",
    title: {
      en: "Late Night Snacks",
      es: "Recena"
    },
    description: {
      en: "Evening snacks and refreshments",
      es: "Aperitivos nocturnos y refrescos"
    },
    icon: "cake"
  },
  {
    time: "July 6th - 02:30",
    title: {
      en: "Return Bus",
      es: "Autobús de Regreso"
    },
    description: {
      en: "Last bus departs for Segovia City Center",
      es: "Último autobús sale hacia el Centro de Segovia"
    },
    icon: "night"
  }
] as const;

const indianProgram: ProgramEvent[] = [
  // Day 1 Events
  {
    time: "August 30th - 11:00 AM",
    title: {
      en: "Ganesh Puja",
      es: "Puja de Ganesh"
    },
    description: {
      en: "Traditional ceremony seeking Lord Ganesh's blessings for a successful wedding celebration",
      es: "Ceremonia tradicional pidiendo las bendiciones del Señor Ganesh para una celebración exitosa"
    },
    icon: "ceremony"
  },
  {
    time: "August 30th - 13:00",
    title: {
      en: "Welcome Lunch",
      es: "Almuerzo de Bienvenida"
    },
    description: {
      en: "Traditional Indian lunch for all guests",
      es: "Almuerzo tradicional indio para todos los invitados"
    },
    icon: "dinner"
  },
  {
    time: "August 30th - 15:00",
    title: {
      en: "Bhat & Mehndi Ceremony",
      es: "Ceremonia de Bhat y Mehndi"
    },
    description: {
      en: "Traditional rituals followed by intricate henna application for the bride and guests",
      es: "Rituales tradicionales seguidos de la aplicación de henna para la novia e invitados"
    },
    icon: "party"
  },
  {
    time: "August 30th - 16:00",
    title: {
      en: "Garba",
      es: "Garba"
    },
    description: {
      en: "Traditional Gujarati folk dance celebration",
      es: "Celebración de danza folclórica tradicional Gujarati"
    },
    icon: "party"
  },
  {
    time: "August 30th - 18:30",
    title: {
      en: "Sangeet Night",
      es: "Noche de Sangeet"
    },
    description: {
      en: "Musical evening with performances by family and friends",
      es: "Noche musical con actuaciones de familiares y amigos"
    },
    icon: "night"
  },
  {
    time: "August 30th - 22:30",
    title: {
      en: "Dinner",
      es: "Cena"
    },
    description: {
      en: "Traditional Indian dinner buffet",
      es: "Buffet de cena tradicional india"
    },
    icon: "dinner"
  },
  {
    time: "August 30th - 23:30",
    title: {
      en: "After Party",
      es: "Fiesta"
    },
    description: {
      en: "Celebration continues with music and dancing",
      es: "La celebración continúa con música y baile"
    },
    icon: "night"
  },
  // Day 2 Events
  {
    time: "August 31st - 11:00",
    title: {
      en: "Haldi Ceremony",
      es: "Ceremonia Haldi"
    },
    description: {
      en: "Traditional ceremony where turmeric paste is applied to the bride and groom",
      es: "Ceremonia tradicional donde se aplica pasta de cúrcuma a los novios"
    },
    icon: "day"
  },
  {
    time: "August 31st - 13:00",
    title: {
      en: "Lunch",
      es: "Almuerzo"
    },
    description: {
      en: "Traditional Indian lunch buffet",
      es: "Buffet de almuerzo tradicional indio"
    },
    icon: "dinner"
  },
  {
    time: "August 31st - 16:00",
    title: {
      en: "Baraat",
      es: "Baraat"
    },
    description: {
      en: "Groom's wedding procession with music and dancing",
      es: "Procesión nupcial del novio con música y baile"
    },
    icon: "party"
  },
  {
    time: "August 31st - 18:00",
    title: {
      en: "Varmala & Pheras",
      es: "Varmala y Pheras"
    },
    description: {
      en: "Exchange of garlands followed by the main wedding ceremony around the sacred fire",
      es: "Intercambio de guirnaldas seguido de la ceremonia principal alrededor del fuego sagrado"
    },
    icon: "ceremony"
  },
  {
    time: "August 31st - 22:00",
    title: {
      en: "Reception Dinner",
      es: "Cena de Recepción"
    },
    description: {
      en: "Grand celebration dinner with traditional Indian cuisine",
      es: "Gran cena de celebración con cocina tradicional india"
    },
    icon: "dinner"
  }
] as const;

const Page = ({ params: { lang } }: PageProps) => {
  const translations = {
    en: {
      title: "We Are Getting Married",
      dates: {
        spanish: "JULY 5, 2025, SEGOVIA, ESPAÑA",
        indian: "AUGUST 30-31, 2025, UDAIPUR, INDIA"
      },
      spanish: {
        title: "Segovia, Spain",
        coordinates: "40.9429° N, 4.1088° W",
        description: "A celebration in the heart of historic Segovia, where ancient aqueducts and medieval architecture create a timeless backdrop for our Spanish wedding."
      },
      indian: {
        title: "Udaipur, India",
        coordinates: "24.5854° N, 73.7125° E",
        description: "A traditional celebration in the Venice of the East, where palace-lined lakes and rich cultural heritage set the stage for our Indian wedding."
      }
    },
    es: {
      title: "Nos Casamos",
      dates: {
        spanish: "5 DE JULIO 2025, SEGOVIA, ESPAÑA",
        indian: "30-31 DE AGOSTO 2025, UDAIPUR, INDIA"
      },
      spanish: {
        title: "Segovia, España",
        coordinates: "40.9429° N, 4.1088° O",
        description: "Una celebración en el corazón de la histórica Segovia, donde los antiguos acueductos y la arquitectura medieval crean un escenario atemporal para nuestra boda española."
      },
      indian: {
        title: "Udaipur, India",
        coordinates: "24.5854° N, 73.7125° E",
        description: "Una celebración tradicional en la Venecia del Este, donde los lagos bordeados de palacios y el rico patrimonio cultural crean el escenario para nuestra boda india."
      }
    }
  };

  const t = translations[lang as keyof typeof translations];

  return (
    <main className="min-h-screen bg-white">
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center">
        <ConceptNavigation />
      </div>
      <AudioPlayer />
      
      {/* Hero Section */}
      <div className="h-screen relative flex flex-col items-center">
        {/* Hero Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/mountain.jpg"
            alt="Mountain landscape representing our journey"
            fill
            className="object-cover object-[center_15%]"
            priority
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Content Overlay */}
        <motion.div 
          className="relative z-10 max-w-7xl mx-auto text-center px-4 mt-[20vh]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <h1 className="font-playfair text-5xl md:text-[90px] text-white leading-none tracking-wide drop-shadow-2xl whitespace-nowrap">
            {t.title}
          </h1>
          <motion.div 
            className="mt-16 space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <p className="font-mono text-sm md:text-base text-white/90 tracking-[0.15em] drop-shadow-lg whitespace-nowrap">
              {t.dates.spanish}
            </p>
            <p className="font-mono text-sm md:text-base text-white/90 tracking-[0.15em] drop-shadow-lg whitespace-nowrap">
              {t.dates.indian}
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Our Story Section */}
      <section id="story" className="min-h-screen py-20 bg-stone-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="font-playfair text-5xl">Our Story</h2>
            <p className="font-lora text-xl leading-relaxed">
              [Your story content here]
            </p>
          </motion.div>
        </div>
      </section>

      {/* Spanish Wedding Section */}
      <section id="spanish" className="min-h-screen py-20 relative">
        <FallingElements type="rice" />
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <motion.article 
            className="text-center max-w-4xl mx-auto mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <header className="space-y-3 mb-8">
              <div className="flex items-center justify-center gap-2 text-amber-600">
                <MapPin size={14} />
                <span className="font-mono text-xs sm:text-sm">{t.spanish.coordinates}</span>
              </div>
              <h2 className="font-playfair text-2xl md:text-3xl text-amber-900">{t.spanish.title}</h2>
              <p className="font-mono text-xs sm:text-sm text-amber-700">JULY 4-5, 2025</p>
            </header>

            <div className="relative max-w-3xl mx-auto aspect-[16/9] mb-8">
              <div className="absolute inset-0 bg-white p-2">
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src="/images/aqueduct.png"
                    alt="Segovia Aqueduct"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 66vw"
                  />
                </div>
              </div>
            </div>

            <div className="max-w-2xl mx-auto">
              <p className="font-lora text-base md:text-lg leading-relaxed text-amber-800">
                {t.spanish.description}
              </p>
            </div>

            <WeddingProgram 
              events={spanishProgram} 
              title={lang === 'es' ? "Programa de la Boda Española" : "Spanish Wedding Program"}
              theme="spanish"
              lang={lang as 'en' | 'es'}
            />
          </motion.article>
        </div>
      </section>

      {/* Indian Wedding Section */}
      <section id="indian" className="min-h-screen py-20 bg-stone-50 relative">
        <FallingElements type="marigold" />
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <motion.article 
            className="text-center max-w-4xl mx-auto mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <header className="space-y-3 mb-8">
              <div className="flex items-center justify-center gap-2 text-fuchsia-600">
                <MapPin size={14} />
                <span className="font-mono text-xs sm:text-sm">{t.indian.coordinates}</span>
              </div>
              <h2 className="font-playfair text-2xl md:text-3xl text-fuchsia-900">{t.indian.title}</h2>
              <p className="font-mono text-xs sm:text-sm text-fuchsia-700">AUGUST 30-31, 2025</p>
            </header>

            <div className="relative max-w-3xl mx-auto aspect-[16/9] mb-8">
              <div className="absolute inset-0 bg-white p-2">
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src="/images/ud2.png"
                    alt="Udaipur"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 66vw"
                  />
                </div>
              </div>
            </div>

            <div className="max-w-2xl mx-auto">
              <p className="font-lora text-base md:text-lg leading-relaxed text-fuchsia-800">
                {t.indian.description}
              </p>
            </div>

            <WeddingProgram 
              events={indianProgram} 
              title={lang === 'es' ? "Programa de la Boda India" : "Indian Wedding Program"}
              theme="indian"
              lang={lang as 'en' | 'es'}
            />
          </motion.article>
        </div>
      </section>

      {/* RSVP Section */}
      <section id="rsvp" className="min-h-screen py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="font-playfair text-5xl">RSVP</h2>
            <p className="font-lora text-xl">
              [RSVP form or content here]
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Page; 