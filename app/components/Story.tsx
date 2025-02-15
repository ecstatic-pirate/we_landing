'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Music, VolumeX, MapPin, Calendar, Clock } from 'lucide-react';

const illustrations = {
  paris: "/images/mountain.jpg",
  tokyo: "/images/mountain.jpg",
  proposal: "/images/mountain.jpg",
  wedding: "/images/mountain.jpg",
  segovia: "/images/aqueduct.png",
  udaipur: "/images/udaipur.jpg"
};

interface StoryEvent {
  date: string;
  title: string;
  description: string;
  illustration: string;
  color: string;
  location?: string;
  weather?: string;
  quote?: string;
}

const storyEvents: StoryEvent[] = [
  {
    date: 'September 15, 2020',
    title: 'A Chance Meeting in Paris',
    description: 'Under the twinkling lights of the Eiffel Tower, our paths crossed at a charming café in Montmartre. The city of love had plans for us we never expected...',
    illustration: illustrations.paris,
    color: 'from-rose-100 to-rose-200',
    location: 'Montmartre, Paris',
    weather: 'A mild autumn evening, 18°C',
    quote: '"Sometimes the perfect story begins with a simple bonjour"'
  },
  {
    date: 'December 25, 2020',
    title: 'Love Knows No Distance',
    description: 'Separated by oceans but connected by heart. Late night calls, morning messages, and dreams of reuniting kept our love growing stronger each day.',
    illustration: illustrations.tokyo,
    color: 'from-indigo-100 to-indigo-200',
    quote: '"Distance means so little when someone means so much"'
  },
  {
    date: 'July 7, 2023',
    title: 'The Perfect Moment',
    description: 'Under the cherry blossoms in Tokyo, with Mount Fuji as our witness, our love story reached a new chapter. The answer was always going to be yes!',
    illustration: illustrations.proposal,
    color: 'from-pink-100 to-pink-200',
    location: 'Chureito Pagoda, Japan',
    weather: 'Cherry blossoms in full bloom',
    quote: '"And in that moment, forever didn\'t seem long enough"'
  },
  {
    date: 'July 5, 2025',
    title: 'Spanish Wedding',
    description: 'Join us for a celebration of love at Finca El Bosque Del Cati in beautiful Brieva, Segovia. A day of joy, tradition, and the beginning of our greatest adventure.',
    illustration: illustrations.segovia,
    color: 'from-amber-100 to-amber-200',
    location: 'Finca El Bosque Del Cati, Brieva, Segovia',
    weather: 'Expected: Warm summer day',
  },
  {
    date: 'August 30-31, 2025',
    title: 'Indian Wedding',
    description: 'Two days of vibrant celebrations at Fateh Vilas in Udaipur. Experience the magic of an Indian wedding with its colors, traditions, and endless festivities.',
    illustration: illustrations.udaipur,
    color: 'from-violet-100 to-violet-200',
    location: 'Fateh Vilas, Udaipur',
    weather: 'Expected: Monsoon magic',
  }
];

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [audioError, setAudioError] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  const toggleMusic = () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => setIsPlaying(true))
              .catch(error => {
                console.error("Audio playback failed:", error);
                setAudioError(true);
              });
          }
        }
      } catch (error) {
        console.error("Audio control error:", error);
        setAudioError(true);
      }
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src="https://assets.mixkit.co/music/preview/mixkit-sweet-jazz-492.mp3"
      />
      <button
        onClick={toggleMusic}
        className="bg-white/80 backdrop-blur-sm p-4 rounded-full shadow-lg hover:bg-white transition-colors"
      >
        {isPlaying ? <VolumeX className="w-6 h-6" /> : <Music className="w-6 h-6" />}
      </button>
      {audioError && (
        <div className="absolute bottom-16 right-0 bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm">
          Unable to play background music
        </div>
      )}
    </div>
  );
};

const StoryEvent: React.FC<{ event: StoryEvent; index: number }> = ({ event, index }) => {
  const elementRef = React.useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const { scrollYProgress } = useScroll({
    target: elementRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  React.useEffect(() => {
    if (elementRef.current) {
      ref(elementRef.current);
    }
  }, [ref]);

  return (
    <motion.div
      ref={elementRef}
      className="relative py-12 md:py-16 flex items-center justify-center overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-[#f4f1ea]"
        style={{ 
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat"
        }}
      />
      
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
        <motion.div 
          style={{ opacity }} 
          className="bg-white/95 backdrop-blur-sm p-6 md:p-8 rounded-sm shadow-xl border border-gray-200"
        >
          {/* Newspaper Header */}
          <div className="text-center border-b border-black pb-4 mb-6">
            <p className="font-lora text-xs sm:text-sm uppercase tracking-widest mb-2">Vol. 1 • No. {index + 1}</p>
            <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl mb-3">{event.title}</h2>
            <div className="flex items-center justify-center gap-3 text-gray-600 text-xs sm:text-sm">
              <span>{event.date}</span>
              <span>•</span>
              {event.location && (
                <span className="flex items-center gap-1">
                  <MapPin size={12} />
                  {event.location}
                </span>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            {/* Left Column */}
            <div className="md:col-span-8">
              <div className="relative aspect-[4/3] md:aspect-[16/9] mb-4 overflow-hidden">
                <Image
                  src={event.illustration}
                  alt={event.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 66vw"
                />
              </div>
              
              <div className="space-y-4">
                <p className="font-lora text-base md:text-lg leading-relaxed first-letter:text-4xl first-letter:font-bold first-letter:mr-1 first-letter:float-left">
                  {event.description}
                </p>
                
                {event.quote && (
                  <blockquote className="font-playfair text-xl italic text-gray-700 my-4 px-6 border-l-2 border-gray-300">
                    {event.quote}
                  </blockquote>
                )}
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="md:col-span-4 space-y-4">
              {event.weather && (
                <div className="bg-gray-50 p-4 border border-gray-200">
                  <h4 className="font-playfair text-lg mb-2 border-b border-gray-300 pb-2">Weather Report</h4>
                  <p className="font-lora text-sm leading-relaxed">{event.weather}</p>
                </div>
              )}
              
              <div className="bg-gray-50 p-4 border border-gray-200">
                <h4 className="font-playfair text-lg mb-2 border-b border-gray-300 pb-2">At a Glance</h4>
                <ul className="font-lora text-sm space-y-2">
                  <li className="flex items-center gap-2">
                    <Calendar size={12} />
                    <span>{event.date}</span>
                  </li>
                  {event.location && (
                    <li className="flex items-center gap-2">
                      <MapPin size={12} />
                      <span>{event.location}</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function Story() {
  return (
    <>
      <BackgroundMusic />
      {storyEvents.map((event, index) => (
        <StoryEvent key={event.date} event={event} index={index} />
      ))}
    </>
  );
}