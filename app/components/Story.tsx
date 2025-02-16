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
  udaipur: "/images/ud2.png"
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
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <motion.div
      ref={ref}
      className="relative w-full max-w-full overflow-hidden px-4 md:px-8 py-12 md:py-24"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="relative max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="w-full md:w-1/2 space-y-4">
            <motion.div
              className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-xl"
              style={{
                maxWidth: '100%'
              }}
            >
              <Image
                src={event.illustration}
                alt={event.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </div>
          
          <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
            <div className="space-y-2">
              <h3 className="text-2xl md:text-3xl font-playfair font-bold">{event.title}</h3>
              <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2">
                <Calendar className="w-4 h-4" />
                {event.date}
              </p>
              {event.location && (
                <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2">
                  <MapPin className="w-4 h-4" />
                  {event.location}
                </p>
              )}
            </div>
            
            <p className="text-gray-700 leading-relaxed">{event.description}</p>
            
            {event.quote && (
              <p className="italic text-gray-600">{event.quote}</p>
            )}
          </div>
        </div>
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