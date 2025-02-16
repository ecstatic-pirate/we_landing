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
  FireSimple,
  Microphone,
  Users,
  PaintBrush,
  Bandaids,
  Horse
} from "@phosphor-icons/react";

export interface ProgramEvent {
  time: string;
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

const getIcon = (iconName: string, color: string) => {
  const iconProps: IconProps = { 
    size: 32,
    color: color,
    weight: "duotone" as IconWeight
  };
  
  switch (iconName) {
    // Ceremony related
    case 'ceremony':
      return <DiamondsFour {...iconProps} />; // Main wedding ceremony
    case 'civil':
      return <Church {...iconProps} />; // Civil ceremony
    case 'ritual':
      return <FireSimple {...iconProps} />; // Indian rituals like Haldi, Ganesh Puja
      
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
      return <Users {...iconProps} />; // Garba dance (group dance)
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
      return <PaintBrush {...iconProps} />; // Mehndi and decoration events
    case 'welcome':
      return <DoorOpen {...iconProps} />; // Welcome events
    case 'gathering':
      return <Users {...iconProps} />; // Group events
      
    // Default and special cases
    case 'love':
      return <Heart {...iconProps} />;
    default:
      return <Flower {...iconProps} />;
  }
};

const themeColors = {
  spanish: {
    line: 'bg-amber-200',
    icon: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-500'
    },
    time: 'text-amber-600',
    title: 'text-amber-900',
    description: 'text-amber-700'
  },
  indian: {
    line: 'bg-fuchsia-200',
    icon: {
      bg: 'bg-fuchsia-50',
      border: 'border-fuchsia-200',
      text: 'text-fuchsia-500'
    },
    time: 'text-fuchsia-600',
    title: 'text-fuchsia-900',
    description: 'text-fuchsia-700'
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
                key={event.time}
                className={`flex items-center gap-8 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                {/* Content */}
                <div className={`flex-1 ${isLeft ? 'text-right' : 'text-left'}`}>
                  <div className={`space-y-3 ${isLeft ? 'pr-8' : 'pl-8'}`}>
                    <p className={`font-mono text-sm ${colors.time}`}>{event.time}</p>
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
                    {getIcon(event.icon, colors.icon.text.replace('text-', ''))}
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