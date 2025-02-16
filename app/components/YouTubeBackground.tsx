import { useEffect, useRef } from 'react';
import YouTube from 'react-youtube';
import type { YouTubeEvent, YouTubePlayer } from 'react-youtube';

interface YouTubeBackgroundProps {
  videoId: string;
}

const YouTubeBackground = ({ videoId }: YouTubeBackgroundProps) => {
  const playerRef = useRef<YouTubePlayer | null>(null);

  useEffect(() => {
    // Ensure video keeps playing and stays muted
    if (playerRef.current) {
      playerRef.current.mute(); // Always ensure video is muted
      playerRef.current.playVideo();
    }
  }, []);

  const onReady = (event: YouTubeEvent) => {
    playerRef.current = event.target;
    event.target.mute(); // Ensure video is muted first
    event.target.playVideo();
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="absolute inset-0">
        <div className="relative w-[300%] md:w-full h-full left-1/2 -translate-x-1/2">
          <YouTube
            videoId={videoId}
            opts={{
              playerVars: {
                autoplay: 1,
                controls: 0,
                rel: 0,
                showinfo: 0,
                mute: 1,
                loop: 1,
                playlist: videoId,
                playsinline: 1,
                modestbranding: 1,
                iv_load_policy: 3,
                fs: 0,
                disablekb: 1,
                origin: window.location.origin,
                enablejsapi: 1,
                cc_load_policy: 0,
                annotations: 0,
                autohide: 1,
                volume: 0, // Ensure volume is 0
              },
              width: '100%',
              height: '100%',
            }}
            className="absolute inset-0 w-full h-full"
            onReady={onReady}
            style={{ 
              position: 'absolute', 
              width: '100%', 
              height: '100%',
              pointerEvents: 'none',
            }}
            iframeClassName="absolute top-0 left-0 w-full h-full"
          />
        </div>
      </div>
      <div className="absolute inset-0 bg-black/50" /> {/* Overlay to ensure text readability */}
    </div>
  );
};

export default YouTubeBackground; 