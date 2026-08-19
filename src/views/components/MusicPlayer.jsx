import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Auto-play workaround: Browsers often block auto-play until user interaction.
  // We can attempt to play it on mount, and if blocked, we wait for a user click anywhere on the document.
  useEffect(() => {
    const playAudio = async () => {
      try {
        if (audioRef.current) {
          await audioRef.current.play();
          setIsPlaying(true);
        }
      } catch (err) {
        // Auto-play was blocked. We can listen for the first user interaction to start it.
        const handleFirstInteraction = async () => {
          try {
            if (audioRef.current && !isPlaying) {
              await audioRef.current.play();
              setIsPlaying(true);
            }
          } catch (e) {
            console.warn('Playback failed:', e);
          }
          // Remove listener after first interaction
          document.removeEventListener('click', handleFirstInteraction);
          document.removeEventListener('touchstart', handleFirstInteraction);
        };

        document.addEventListener('click', handleFirstInteraction);
        document.addEventListener('touchstart', handleFirstInteraction);
        
        return () => {
          document.removeEventListener('click', handleFirstInteraction);
          document.removeEventListener('touchstart', handleFirstInteraction);
        };
      }
    };

    // Delay auto-play slightly to allow page load
    const timeout = setTimeout(() => {
      playAudio();
    }, 1000);

    return () => clearTimeout(timeout);
  }, []); // Run once on mount

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((e) => console.warn('Playback failed:', e));
      }
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/assets/music.mp3" loop preload="auto" />
      
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        onClick={togglePlay}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full shadow-lg"
        style={{
          background: 'var(--aof-gold)',
          color: 'white',
          boxShadow: '0 4px 20px rgba(201, 168, 76, 0.4)',
        }}
      >
        <motion.div
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
          className="flex items-center justify-center"
        >
          {isPlaying ? (
            // Pause icon
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            // Play icon
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </motion.div>

        {/* Note particles effect when playing */}
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 0, x: -10 }}
            animate={{ opacity: [0, 1, 0], y: -30, x: 10 }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
            className="absolute top-0 right-0 pointer-events-none"
            style={{ color: 'var(--aof-gold)' }}
          >
            ♪
          </motion.div>
        )}
      </motion.button>
    </>
  );
};

export default MusicPlayer;
