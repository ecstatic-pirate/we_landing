'use client';

import { motion } from 'framer-motion';
import {
  DiamondsFour,
  Church,
  Wine,
  Bus,
  Confetti,
  MusicNotes,
  ForkKnife,
  Moon,
  Cake,
  Heart,
  Sun,
  Flower,
  HandsClapping,
  IconProps,
  IconWeight,
  Champagne,
  DoorOpen,
  Users,
  Palette,
  Horse,
  Sparkle,
  Hand,
  House,
  Microphone,
  FlowerLotus
} from "@phosphor-icons/react";

// Import Indian ceremony specific icons
import { GiFlowerPot, GiIndianPalace, GiPeaceDove, GiSunflower, GiDrum } from 'react-icons/gi';
import { FaPrayingHands, FaHandsWash } from 'react-icons/fa';
import { SiYamahamotorcorporation } from 'react-icons/si';
import { IoMusicalNotes } from 'react-icons/io5';

export interface ProgramEvent {
  time: {
    en: string;
    es: string;
  };
  title: {
    en: string;
    es: string;
  };
  description: {
    en: string;
    es: string;
  };
  icon: string;
}

interface WeddingProgramProps {
  events: ProgramEvent[];
  title: string;
  theme: 'spanish' | 'indian';
  lang?: 'en' | 'es';
}

const getIcon = (iconName: string, color: string, theme: 'spanish' | 'indian') => {
  const iconProps: IconProps = { 
    size: 32,
    color: color,
    weight: "duotone" as IconWeight
  };
  
  switch (iconName) {
    // Ceremony related
    case 'ceremony':
      return theme === 'indian' ? <House {...iconProps} /> : <DiamondsFour {...iconProps} />; // Main wedding ceremony
    case 'civil':
      return <Church {...iconProps} />; // Civil ceremony
    case 'ritual':
      return <FlowerLotus {...iconProps} />; // Indian rituals like Haldi, Ganesh Puja
      
    // Food and drinks related
    case 'dinner':
      return <ForkKnife {...iconProps} />; // Main meals
    case 'drinks':
      return <Wine {...iconProps} />; // Welcome drinks and cocktails
    case 'cake':
      return <Cake {...iconProps} />; // Late night snacks
      
    // Entertainment related
    case 'party':
      return <Confetti {...iconProps} />; // General celebrations
    case 'music':
      return <MusicNotes {...iconProps} />; // Live band & first dance
    case 'garba':
      return <HandsClapping {...iconProps} />; // Garba dance (group dance)
    case 'sangeet':
      return <Microphone {...iconProps} />; // Sangeet performances
    case 'baraat':
      return <Horse {...iconProps} />; // Baraat procession
      
    // Time related
    case 'day':
      return <Sun {...iconProps} />; // Daytime events
    case 'night':
      return <Moon {...iconProps} />; // Night events
      
    // Transportation
    case 'transport':
      return <Bus {...iconProps} />; // Bus transfers
      
    // Decoration and preparation
    case 'decoration':
      return <Palette {...iconProps} />; // Mehndi and decoration events
    case 'welcome':
      return <DoorOpen {...iconProps} />; // Welcome events
    case 'gathering':
      return <Users {...iconProps} />; // Group events
    case 'haldi':
      return <Hand {...iconProps} />; // Haldi ceremony
      
    // Default and special cases
    case 'love':
      return <Heart {...iconProps} />;
    default:
      return <Sparkle {...iconProps} />;
  }
};

const themeColors = {
  spanish: {
    line: 'bg-black/20',
    icon: {
      bg: 'bg-white',
      border: 'border-black/20',
      text: 'text-black'
    },
    time: 'text-black',
    title: 'text-black',
    description: 'text-black/80'
  },
  indian: {
    line: 'bg-black/20',
    icon: {
      bg: 'bg-white',
      border: 'border-black/20',
      text: 'text-black'
    },
    time: 'text-black',
    title: 'text-black',
    description: 'text-black/80'
  }
};

const WeddingProgram = ({ events, title, theme, lang = 'en' }: WeddingProgramProps) => {
  const colors = themeColors[theme];

  return (
    <div className="py-16 md:py-24">
      <h3 className={`text-2xl font-playfair text-center mb-16 ${colors.title}`}>{title}</h3>
      <div className="relative max-w-4xl mx-auto">
        {/* Journey Line */}
        <motion.div 
          className={`absolute left-1/2 top-0 bottom-0 w-px ${colors.line} origin-top`}
          initial={{ scaleY: 0, transformOrigin: "top" }}
          whileInView={{ scaleY: 1, transformOrigin: "top" }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* Events */}
        <div className="relative space-y-24">
          {events.map((event, index) => {
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={event.time.en}
                className={`flex items-center gap-8 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                {/* Content */}
                <div className={`flex-1 ${isLeft ? 'text-right' : 'text-left'}`}>
                  <div className={`space-y-3 ${isLeft ? 'pr-8' : 'pl-8'}`}>
                    <p className={`font-mono text-sm ${colors.time}`}>{event.time[lang]}</p>
                    <h4 className={`font-playfair text-xl ${colors.title}`}>{event.title[lang]}</h4>
                    <p className={`font-lora text-sm italic ${colors.description}`}>{event.description[lang]}</p>
                  </div>
                </div>

                {/* Icon */}
                <div className="relative z-10">
                  <motion.div
                    className={`w-16 h-16 rounded-full ${colors.icon.bg} border ${colors.icon.border} flex items-center justify-center shadow-lg`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {getIcon(event.icon, colors.icon.text.replace('text-', ''), theme)}
                  </motion.div>
                </div>

                <div className="flex-1" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeddingProgram; 