'use client';

import { motion } from 'framer-motion';
import { Heart, Utensils, Camera, Cake, Music, Coffee, Sun, Moon } from 'lucide-react';

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
  icon: "ceremony" | "dinner" | "photos" | "cake" | "party" | "night" | "day" | "breakfast";
}

interface WeddingProgramProps {
  events: ProgramEvent[];
  title: string;
  theme: 'spanish' | 'indian';
  lang?: 'en' | 'es';
}

const icons = {
  ceremony: Heart,
  dinner: Utensils,
  photos: Camera,
  cake: Cake,
  party: Music,
  breakfast: Coffee,
  day: Sun,
  night: Moon,
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
            const Icon = icons[event.icon];
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
                    <Icon className={`w-8 h-8 ${colors.icon.text}`} />
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