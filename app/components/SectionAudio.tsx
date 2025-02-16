import { useEffect, useRef, useState } from 'react';
import { Music } from 'lucide-react';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

let apiLoaded = false;

const SectionAudio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Indian music track
  const videoId = 'TXuJcO5G6TA';

  useEffect(() => {
    let isMounted = true;

    const initializePlayer = () => {
      if (!isMounted) return;
      
      try {
        if (!document.getElementById('youtube-player')) {
          console.error('Player element not found');
          return;
        }

        playerRef.current = new window.YT.Player('youtube-player', {
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
            enablejsapi: 1,
            loop: 1,
            playlist: videoId
          },
          events: {
            onReady: (event: any) => {
              if (!isMounted) return;
              setIsReady(true);
              // Try to play immediately
              try {
                event.target.unMute();
                event.target.setVolume(100);
                event.target.playVideo();
              } catch (err) {
                console.error('Error in onReady:', err);
              }
            },
            onStateChange: (event: any) => {
              if (!isMounted) return;
              
              try {
                switch (event.data) {
                  case window.YT.PlayerState.PLAYING:
                    event.target.unMute();
                    event.target.setVolume(100);
                    setIsPlaying(true);
                    break;
                  case window.YT.PlayerState.ENDED:
                  case window.YT.PlayerState.PAUSED:
                    setIsPlaying(false);
                    break;
                }
              } catch (err) {
                console.error('Error in onStateChange:', err);
              }
            },
            onError: (error: any) => {
              if (!isMounted) return;
              console.error('YouTube player error:', error);
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

    if (!apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        apiLoaded = true;
        initializePlayer();
      };
    } else {
      initializePlayer();
    }

    return () => {
      isMounted = false;
      if (playerRef.current?.destroy) {
        try {
          playerRef.current.destroy();
        } catch (err) {
          console.error('Error destroying YouTube player:', err);
        }
      }
    };
  }, [videoId]);

  const toggleMusic = () => {
    if (!playerRef.current || !isReady) return;

    try {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.unMute();
        playerRef.current.setVolume(100);
        playerRef.current.playVideo();
      }
    } catch (err) {
      console.error('Error controlling YouTube player:', err);
      setError('Unable to control audio playback');
    }
  };

  return (
    <div ref={containerRef} className="fixed bottom-8 right-8 z-50 max-w-[calc(100vw-2rem)] flex gap-2">
      <div 
        id="youtube-player" 
        className="absolute"
        style={{ width: '1px', height: '1px', opacity: 0, pointerEvents: 'none' }} 
      />
      
      <button
        onClick={toggleMusic}
        className={`bg-neutral-600/90 backdrop-blur-sm px-4 py-2 rounded-full text-white hover:bg-neutral-500/90 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300 ease-in-out disabled:opacity-50 font-mono text-xs tracking-wider whitespace-nowrap flex items-center gap-2 ${!isReady ? 'animate-pulse' : ''}`}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        disabled={!isReady}
      >
        <Music className={`w-4 h-4 ${!isPlaying && isReady ? 'animate-bounce' : ''}`} />
        {isPlaying ? 'PAUSE' : 'PLAY'}
      </button>

      {error && error !== 'Unable to control volume' && (
        <div className="absolute bottom-16 right-0 bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm max-w-[200px] break-words">
          {error}
        </div>
      )}
    </div>
  );
};

export default SectionAudio; 