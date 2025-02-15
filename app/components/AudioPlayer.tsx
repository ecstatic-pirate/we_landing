'use client';

import React from 'react';
import { Music, VolumeX } from 'lucide-react';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [audioError, setAudioError] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setAudioError(false);
          })
          .catch((error) => {
            console.error('Playback failed:', error);
            setAudioError(true);
          });
      }
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <audio
        ref={audioRef}
        src="/lver.mp3"
        preload="auto"
        loop
      />
      <button
        onClick={toggleMusic}
        className="px-4 py-2 bg-black/40 backdrop-blur-sm rounded-full border border-white/10 text-white hover:bg-black/60 transition-colors duration-300"
      >
        <div className="flex items-center gap-2">
          {isPlaying ? (
            <>
              <VolumeX className="w-4 h-4" />
              <span className="text-xs font-mono tracking-wider">MUTE</span>
            </>
          ) : (
            <>
              <Music className="w-4 h-4" />
              <span className="text-xs font-mono tracking-wider">PLAY</span>
            </>
          )}
        </div>
      </button>
      {audioError && (
        <div className="absolute bottom-16 right-0 bg-black/80 backdrop-blur-sm text-red-200 px-4 py-2 rounded-lg text-xs font-mono">
          Unable to play music
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;