import { useEffect, useRef, useState } from 'react';
import { Music, VolumeX } from 'lucide-react';
import { useInView } from 'framer-motion';

interface SectionAudioProps {
  section: 'spanish' | 'indian';
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

let apiLoaded = false;

const SectionAudio = ({ section }: SectionAudioProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const isInView = useInView(containerRef, { amount: 0.3 });

  const videoId = section === 'spanish' 
    ? 'qPU8mENUBXk'  // Spanish music
    : 'TXuJcO5G6TA'; // Indian music

  useEffect(() => {
    let isMounted = true;

    const initializePlayer = () => {
      if (!isMounted) return;
      
      console.log('Initializing YouTube player for section:', section);
      try {
        if (!document.getElementById(`youtube-player-${section}`)) {
          console.error('Player element not found');
          return;
        }

        playerRef.current = new window.YT.Player(`youtube-player-${section}`, {
          height: '1',
          width: '1',
          videoId,
          playerVars: {
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            fs: 0,
            rel: 0,
            modestbranding: 1,
            mute: 0,
            playsinline: 1,
            origin: window.location.origin,
            enablejsapi: 1
          },
          events: {
            onReady: (event: any) => {
              if (!isMounted) return;
              console.log('YouTube player ready for section:', section);
              event.target.setVolume(100);
              event.target.unMute();
              setIsReady(true);
            },
            onStateChange: (event: any) => {
              if (!isMounted) return;
              console.log('Player state changed:', event.data, 'for section:', section);
              
              // Handle different player states
              switch (event.data) {
                case window.YT.PlayerState.PLAYING:
                  setIsPlaying(true);
                  if (!hasPlayed) {
                    setHasPlayed(true);
                    // Set timeout to stop after 15 seconds
                    timeoutRef.current = setTimeout(() => {
                      if (playerRef.current?.stopVideo) {
                        console.log('Stopping video after 15s for section:', section);
                        playerRef.current.stopVideo();
                      }
                    }, 15000);
                  }
                  break;
                case window.YT.PlayerState.ENDED:
                case window.YT.PlayerState.PAUSED:
                  setIsPlaying(false);
                  break;
                case window.YT.PlayerState.BUFFERING:
                  // Ensure volume and unmute when buffering
                  event.target.setVolume(100);
                  event.target.unMute();
                  break;
              }
            },
            onError: (error: any) => {
              if (!isMounted) return;
              console.error('YouTube player error:', error, 'for section:', section);
              setError('Unable to load audio');
            }
          }
        });
      } catch (err) {
        console.error('Error initializing YouTube player:', err);
        if (isMounted) {
          setError('Unable to initialize audio player');
        }
      }
    };

    const loadYouTubeAPI = () => {
      if (apiLoaded) {
        initializePlayer();
        return;
      }

      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        apiLoaded = true;
        initializePlayer();
      };
    };

    loadYouTubeAPI();

    return () => {
      isMounted = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (playerRef.current?.destroy) {
        try {
          playerRef.current.destroy();
        } catch (err) {
          console.error('Error destroying YouTube player:', err);
        }
      }
    };
  }, [videoId, section, hasPlayed]);

  const playVideo = () => {
    if (!playerRef.current?.playVideo || !isReady) return;
    
    try {
      playerRef.current.setVolume(100);
      playerRef.current.unMute();
      playerRef.current.playVideo();
      
      if (!hasPlayed) {
        timeoutRef.current = setTimeout(() => {
          if (playerRef.current?.stopVideo) {
            console.log('Stopping video after 15s for section:', section);
            playerRef.current.stopVideo();
          }
        }, 15000);
      }
    } catch (err) {
      console.error('Error playing video:', err);
      setError('Unable to play audio');
    }
  };

  useEffect(() => {
    // Start playing when section comes into view (only once)
    if (isInView && !hasPlayed && isReady && playerRef.current) {
      console.log('Attempting to play video for section:', section);
      playVideo();
    }
  }, [isInView, hasPlayed, isReady, section]);

  const toggleMusic = () => {
    if (!playerRef.current || !isReady) return;

    console.log('Toggling music for section:', section);
    try {
      if (isPlaying) {
        playerRef.current.stopVideo();
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      } else {
        playVideo();
      }
    } catch (err) {
      console.error('Error controlling YouTube player:', err);
      setError('Unable to control audio playback');
    }
  };

  return (
    <div ref={containerRef} className="fixed bottom-8 right-8 z-50">
      <div 
        id={`youtube-player-${section}`} 
        className="absolute"
        style={{ width: '1px', height: '1px', opacity: 0, pointerEvents: 'none' }} 
      />
      
      <button
        onClick={toggleMusic}
        className="bg-white/80 backdrop-blur-sm p-4 rounded-full shadow-lg hover:bg-white transition-colors disabled:opacity-50"
        aria-label={isPlaying ? 'Stop music' : 'Play music'}
        disabled={!isReady}
      >
        {isPlaying ? <VolumeX className="w-6 h-6" /> : <Music className="w-6 h-6" />}
      </button>

      {error && (
        <div className="absolute bottom-16 right-0 bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm">
          {error}
        </div>
      )}
    </div>
  );
};

export default SectionAudio; 