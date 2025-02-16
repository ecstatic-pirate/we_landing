'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import ConceptNavigation from '../components/ConceptNavigation';
import WeddingProgram from '../components/WeddingProgram';
import { ProgramEvent } from '../components/WeddingProgram';
import FallingElements from '../components/FallingElements';
import SectionAudio from '../components/SectionAudio';
import ContactDetails from '../components/ContactDetails';
import dynamic from 'next/dynamic';

const YouTubeBackground = dynamic(() => import('../components/YouTubeBackground'), { ssr: false });

interface PageProps {
  params: {
    lang: string;
  };
}

const spanishProgram: ProgramEvent[] = [
  {
    time: {
      en: "July 4th - 18:00",
      es: "4 de julio - 18:00"
    },
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
    time: {
      en: "July 4th - 19:00 - 23:00",
      es: "4 de julio - 19:00 - 23:00"
    },
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
    time: {
      en: "July 5th - 12:45",
      es: "5 de julio - 12:45"
    },
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
    time: {
      en: "July 5th - 13:00 - 02:00",
      es: "5 de julio - 13:00 - 02:00"
    },
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
    time: {
      en: "July 5th - 14:30 - 16:30",
      es: "5 de julio - 14:30 - 16:30"
    },
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
    time: {
      en: "July 5th - 16:45 - 18:40",
      es: "5 de julio - 16:45 - 18:40"
    },
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
    time: {
      en: "July 5th - 19:00 - 21:00",
      es: "5 de julio - 19:00 - 21:00"
    },
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
    time: {
      en: "July 5th - 21:00 - 02:00",
      es: "5 de julio - 21:00 - 02:00"
    },
    title: {
      en: "After Party",
      es: "Fiesta"
    },
    description: {
      en: "Celebration continues with DJ",
      es: "La celebración continúa con DJ"
    },
    icon: "night"
  },
  {
    time: {
      en: "July 5th - 22:00",
      es: "5 de julio - 22:00"
    },
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
    time: {
      en: "July 6th - 02:00",
      es: "6 de julio - 02:00"
    },
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
  {
    time: {
      en: "August 29th - 19:00",
      es: "29 de agosto - 19:00"
    },
    title: {
      en: "Pre-Wedding Dinner",
      es: "Cena Pre-boda"
    },
    description: {
      en: "A relaxed evening by the serene Lake Pichola, where friends and family gather to kick off the wedding celebrations with delicious food, heartfelt conversations, and breathtaking sunset views",
      es: "Una velada relajada junto al sereno Lago Pichola, donde amigos y familiares se reúnen para comenzar las celebraciones de la boda"
    },
    icon: "dinner"
  },
  {
    time: {
      en: "August 30th - 10:30",
      es: "30 de agosto - 10:30"
    },
    title: {
      en: "Check-in at Wedding Venue",
      es: "Check-in en el Lugar de la Boda"
    },
    description: {
      en: "Guests arrive at the wedding venue, nestled in the picturesque mountains surrounding Udaipur",
      es: "Los invitados llegan al lugar de la boda, ubicado en las pintorescas montañas que rodean Udaipur"
    },
    icon: "welcome"
  },
  {
    time: {
      en: "August 30th - 11:00",
      es: "30 de agosto - 11:00"
    },
    title: {
      en: "Ganesh Puja",
      es: "Puja de Ganesh"
    },
    description: {
      en: "A sacred ritual invoking Lord Ganesha, the remover of obstacles, to bless the wedding with happiness and prosperity",
      es: "Un ritual sagrado invocando al Señor Ganesha para bendecir la boda con felicidad y prosperidad"
    },
    icon: "ritual"
  },
  {
    time: {
      en: "August 30th - 13:00",
      es: "30 de agosto - 13:00"
    },
    title: {
      en: "Welcome Lunch",
      es: "Almuerzo de Bienvenida"
    },
    description: {
      en: "A lavish spread of traditional Indian cuisine, offering guests a taste of regional flavors and delicacies",
      es: "Un suntuoso banquete de cocina india tradicional, ofreciendo a los invitados sabores y delicias regionales"
    },
    icon: "dinner"
  },
  {
    time: {
      en: "August 30th - 15:00",
      es: "30 de agosto - 15:00"
    },
    title: {
      en: "Bhat & Mehndi Ceremony",
      es: "Ceremonia de Bhat y Mehndi"
    },
    description: {
      en: "Traditional family ritual where the maternal uncle blesses the couple, followed by intricate henna designs application for good luck and prosperity",
      es: "Ritual familiar tradicional donde el tío materno bendice a la pareja, seguido de la aplicación de diseños de henna"
    },
    icon: "decoration"
  },
  {
    time: {
      en: "August 30th - 16:00",
      es: "30 de agosto - 16:00"
    },
    title: {
      en: "Garba Celebration",
      es: "Celebración de Garba"
    },
    description: {
      en: "An energetic and colorful Gujarati folk dance where guests dance in rhythmic circles, celebrating love and togetherness",
      es: "Una enérgica y colorida danza folclórica Gujarati donde los invitados bailan en círculos rítmicos"
    },
    icon: "garba"
  },
  {
    time: {
      en: "August 30th - 18:30",
      es: "30 de agosto - 18:30"
    },
    title: {
      en: "Sangeet Night",
      es: "Noche de Sangeet"
    },
    description: {
      en: "A spectacular evening of music and dance performances by family and friends, showcasing their love through song and dance",
      es: "Una espectacular noche de música y actuaciones de baile por familiares y amigos"
    },
    icon: "sangeet"
  },
  {
    time: {
      en: "August 30th - 22:30",
      es: "30 de agosto - 22:30"
    },
    title: {
      en: "Dinner Under the Stars",
      es: "Cena Bajo las Estrellas"
    },
    description: {
      en: "A grand buffet featuring a selection of traditional Indian dishes from across India",
      es: "Un gran buffet con una selección de platos tradicionales indios de toda la India"
    },
    icon: "dinner"
  },
  {
    time: {
      en: "August 30th - 23:30",
      es: "30 de agosto - 23:30"
    },
    title: {
      en: "After Party",
      es: "Fiesta"
    },
    description: {
      en: "The celebration continues late into the night with music, dancing, and cocktails under the starlit sky",
      es: "La celebración continúa hasta altas horas de la noche con música, baile y cócteles bajo el cielo estrellado"
    },
    icon: "party"
  },
  {
    time: {
      en: "August 31st - 11:00",
      es: "31 de agosto - 11:00"
    },
    title: {
      en: "Haldi Ceremony",
      es: "Ceremonia de Haldi"
    },
    description: {
      en: "A joyful ritual where turmeric paste is applied to the bride and groom by family and friends for purification and natural glow",
      es: "Un alegre ritual donde la pasta de cúrcuma es aplicada a los novios por familiares y amigos"
    },
    icon: "ritual"
  },
  {
    time: {
      en: "August 31st - 13:00",
      es: "31 de agosto - 13:00"
    },
    title: {
      en: "Traditional Indian Feast",
      es: "Banquete Tradicional Indio"
    },
    description: {
      en: "A sumptuous lunch featuring an assortment of Indian specialties, from fragrant biryanis to rich curries",
      es: "Un suntuoso almuerzo con una variedad de especialidades indias, desde aromáticos biryanis hasta ricos currys"
    },
    icon: "dinner"
  },
  {
    time: {
      en: "August 31st - 16:00",
      es: "31 de agosto - 16:00"
    },
    title: {
      en: "Baraat - The Groom's Procession",
      es: "Baraat - La Procesión del Novio"
    },
    description: {
      en: "The groom arrives in style, leading a lively wedding procession with music, dancing, and celebration",
      es: "El novio llega con estilo, liderando una animada procesión nupcial con música, baile y celebración"
    },
    icon: "baraat"
  },
  {
    time: {
      en: "August 31st - 18:00",
      es: "31 de agosto - 18:00"
    },
    title: {
      en: "Wedding Ceremony",
      es: "Ceremonia de Boda"
    },
    description: {
      en: "The main ceremony including Varmala (garland exchange) and Pheras (seven sacred vows around the fire)",
      es: "La ceremonia principal incluyendo Varmala (intercambio de guirnaldas) y Pheras (siete votos sagrados alrededor del fuego)"
    },
    icon: "ceremony"
  },
  {
    time: {
      en: "August 31st - 22:00",
      es: "31 de agosto - 22:00"
    },
    title: {
      en: "Reception Dinner & Celebrations",
      es: "Cena de Recepción y Celebraciones"
    },
    description: {
      en: "A grand post-wedding reception with fine dining, drinks, heartfelt speeches, and plenty of dancing",
      es: "Una gran recepción post-boda con cena fina, bebidas, discursos emotivos y mucho baile"
    },
    icon: "party"
  },
  {
    time: {
      en: "September 1st - 11:00",
      es: "1 de septiembre - 11:00"
    },
    title: {
      en: "Check-out & Farewell",
      es: "Check-out y Despedida"
    },
    description: {
      en: "With hearts full of memories, guests bid farewell as they check out from the venue",
      es: "Con corazones llenos de recuerdos, los invitados se despiden mientras hacen el check-out del lugar"
    },
    icon: "gathering"
  }
] as const;

const Page = ({ params: { lang } }: PageProps) => {
  const translations = {
    en: {
      title: "We Are Getting Married",
      dates: {
        spanish: "July 5, 2025, Segovia, España",
        indian: "August 30-31, 2025, Udaipur, India"
      },
      spanish: {
        title: "Segovia, Spain",
        coordinates: "40.9429° N, 4.1088° W",
        description: "Segovia, the city where Laura was born and raised, is a magical place filled with history in every street and square, making it the perfect setting for our Spanish wedding."
      },
      indian: {
        title: "Udaipur, India",
        coordinates: "24.5854° N, 73.7125° E",
        description: "Udaipur has become a special part of our love story. On our first trip to India together, we lost ourselves in its vibrant streets, mesmerized by the blend of chaos and serenity. That journey led us to this moment, and now, we return to this magical city to celebrate our Indian wedding amidst its palaces, lakes, and timeless charm."
      }
    },
    es: {
      title: "Nos Casamos",
      dates: {
        spanish: "5 de julio 2025, Segovia, España",
        indian: "30-31 de agosto 2025, Udaipur, India"
      },
      spanish: {
        title: "Segovia, España",
        coordinates: "40.9429° N, 4.1088° O",
        description: "Segovia, la ciudad donde nació y creció Laura, es un lugar mágico, lleno de historia en cada una de sus calles y plazas, y el escenario perfecto para nuestra boda española."
      },
      indian: {
        title: "Udaipur, India",
        coordinates: "24.5854° N, 73.7125° E",
        description: "Udaipur se ha convertido en una parte especial de nuestra historia de amor. En nuestro primer viaje juntos a la India, nos perdimos en sus vibrantes calles, fascinados por la fusión de caos y serenidad. Ese viaje nos llevó hasta este momento, y ahora regresamos a esta ciudad mágica para celebrar nuestra boda india entre sus palacios, lagos y encanto atemporal."
      }
    }
  };

  const t = translations[lang as keyof typeof translations];

  return (
    <main className="relative w-full overflow-hidden">
      <SectionAudio />
      {/* Navigation Container - adjusted z-index */}
      <div className="fixed top-0 left-0 right-0 z-40 w-full">
        <ConceptNavigation />
      </div>
      
      {/* Hero Section - added overflow-hidden */}
      <section id="hero" className="relative min-h-screen w-full flex flex-col items-center justify-center bg-black overflow-hidden">
        {/* Video Background Container */}
        <div className="absolute inset-0 w-full h-full">
          {/* <YouTubeBackground videoId="wmsWZjUZh5I" /> */}
          <div className="relative w-full h-full">
            <Image
              src="/images/mountain.jpg"
              alt="Wedding Background"
              fill
              className="object-cover object-[center_10%]"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/50" /> {/* Overlay for text readability */}
          </div>
        </div>

        {/* Content Container - adjusted max-width and padding */}
        <div className="relative z-30 w-full max-w-7xl mx-auto px-4 text-center" style={{ marginTop: '-25vh' }}>
          <motion.h1 
            className="font-serif text-4xl md:text-7xl lg:text-8xl text-white mb-8 break-words"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {t.title}
          </motion.h1>
          
          <motion.div 
            className="text-white space-y-2 md:space-y-4 text-sm md:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <p className="font-mono tracking-[0.15em] text-white/90">{t.dates.spanish}</p>
            <p className="font-mono tracking-[0.15em] text-white/90">{t.dates.indian}</p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section id="story" className="w-full bg-white py-16 md:py-24">
        <div className="w-full px-4">
          <h2 className="font-playfair text-2xl md:text-3xl text-black leading-tight text-center mb-12">
            {lang === 'es' ? 'Nuestra Historia' : 'Our Story'}
          </h2>
          <div className="relative w-full aspect-[16/17.575] mx-auto">
            <Image
              src={lang === 'es' ? '/images/es_story.png' : '/images/en_story.png'}
              alt={lang === 'es' ? 'Nuestra Historia' : 'Our Story'}
              fill
              className="object-contain"
              priority
              sizes="100vw"
            />
          </div>
        </div>
      </section>

      {/* Spanish Wedding Section */}
      <section id="spanish" className="w-full min-h-screen py-12 bg-white relative overflow-hidden">
        {/* <div className="absolute inset-0">
          <FallingElements type="confetti" />
        </div> */}
        {/* <SectionAudio section="spanish" /> */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 w-full">
          <motion.article 
            className="text-center max-w-4xl mx-auto mb-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <header className="space-y-1 mb-3">
              <div className="flex items-center justify-center gap-1 text-black">
                <MapPin size={14} />
                <span className="font-mono text-xs sm:text-sm">{t.spanish.coordinates}</span>
              </div>
              <h2 className="font-playfair text-2xl md:text-3xl text-black leading-tight">{lang === 'es' ? 'Boda Española' : 'Spanish Wedding'}</h2>
              <p className="font-mono text-xs sm:text-sm text-black">
                {lang === 'es' ? "4-5 de julio 2025" : "JULY 4-5, 2025"}
              </p>
            </header>

            <div className="relative max-w-3xl mx-auto aspect-[16/9] mb-3">
              <div className="absolute inset-0 bg-white">
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src="/images/aqueduct.png"
                    alt="Segovia Aqueduct"
                    fill
                    className="w-full h-full object-contain"
                    sizes="(max-width: 768px) 100vw, 66vw"
                  />
                </div>
              </div>
            </div>

            <div className="max-w-2xl mx-auto mb-8">
              <p className="font-lora text-base md:text-lg leading-relaxed text-black">
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
      <section id="indian" className="w-full min-h-screen py-12 bg-stone-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <FallingElements type="marigold" />
        </div>
        {/* <SectionAudio section="indian" /> */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 w-full">
          <motion.article 
            className="text-center max-w-4xl mx-auto mb-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <header className="space-y-1 mb-3">
              <div className="flex items-center justify-center gap-1 text-black">
                <MapPin size={14} />
                <span className="font-mono text-xs sm:text-sm">{t.indian.coordinates}</span>
              </div>
              <h2 className="font-playfair text-2xl md:text-3xl text-black leading-tight">{lang === 'es' ? 'Boda India' : 'Indian Wedding'}</h2>
              <p className="font-mono text-xs sm:text-sm text-black">
                {lang === 'es' ? "30-31 de agosto 2025" : "AUGUST 30-31, 2025"}
              </p>
            </header>

            <div className="relative w-full max-w-3xl mx-auto">
              <Image
                src="/images/ud2.png"
                alt="Udaipur"
                width={1200}
                height={675}
                className="w-full h-auto"
                sizes="(max-width: 768px) 100vw, 66vw"
              />
            </div>

            <div className="max-w-2xl mx-auto mb-8">
              <p className="font-lora text-base md:text-lg leading-relaxed text-black">
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
      <section id="rsvp" className="w-full min-h-screen py-12 bg-white relative overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto px-4 w-full">
          <motion.article 
            className="text-center max-w-4xl mx-auto mb-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <header className="space-y-3 mb-12">
              <h2 className="font-playfair text-3xl md:text-5xl text-black leading-tight">
                {lang === 'es' ? 'RSVP' : 'RSVP'}
              </h2>
              <p className="font-mono text-sm md:text-base text-black">
                {lang === 'es' ? 'CONFIRMA TU ASISTENCIA' : 'CONFIRM YOUR ATTENDANCE'}
              </p>
            </header>

            <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl bg-white border border-neutral-200">
              <div className="p-1 bg-gradient-to-b from-neutral-50/50 to-white">
                <iframe 
                  src="https://app.youform.com/forms/qet2ivzx" 
                  loading="lazy" 
                  width="100%" 
                  height="700" 
                  frameBorder="0" 
                  className="w-full rounded-xl"
                  title="RSVP Form"
                />
              </div>
            </div>
          </motion.article>
        </div>
      </section>
      <ContactDetails />
    </main>
  );
};

export default Page; 