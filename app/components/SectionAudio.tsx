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
  const [isPlaying, setIsPlaying] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const playerRef = useRef<any>(null);

  // Indian music track
  const videoId = 'TXuJcO5G6TA';

  useEffect(() => {
    let isMounted = true;

    const initializePlayer = () => {
      if (!isMounted) return;
      
      try {
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
            playsinline: 1,
            origin: window.location.origin,
            enablejsapi: 1,
            loop: 1,
            playlist: videoId,
            mute: 0
          },
          events: {
            onReady: (event: any) => {
              if (!isMounted) return;
              console.log('Player ready');
              setIsReady(true);
              try {
                event.target.playVideo();
                setIsPlaying(true);
              } catch (err) {
                console.error('Error in onReady:', err);
                setIsPlaying(false);
              }
            },
            onStateChange: (event: any) => {
              if (!isMounted) return;
              console.log('Player state changed:', event.data);
              
              switch (event.data) {
                case window.YT.PlayerState.PLAYING:
                  console.log('Video is now playing');
                  setIsPlaying(true);
                  break;
                case window.YT.PlayerState.PAUSED:
                case window.YT.PlayerState.ENDED:
                case window.YT.PlayerState.UNSTARTED:
                  console.log('Video is now paused/ended/unstarted');
                  setIsPlaying(false);
                  if (event.data === window.YT.PlayerState.UNSTARTED) {
                    event.target.playVideo();
                  }
                  break;
              }
            },
            onError: (event: any) => {
              console.error('YouTube player error:', event.data);
              setIsPlaying(false);
            }
          }
        });
      } catch (err) {
        console.error('Error initializing YouTube player:', err);
        setIsPlaying(false);
      }
    };

    if (!apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        console.log('YouTube API ready');
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
    if (!playerRef.current || !isReady) {
      console.log('Player not ready for toggle');
      return;
    }

    console.log('Toggling music, current state:', isPlaying);
    try {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
    } catch (err) {
      console.error('Error toggling music:', err);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
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
    </div>
  );
};

export default SectionAudio; 