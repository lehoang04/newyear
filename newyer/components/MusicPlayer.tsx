import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Disc } from 'lucide-react';
import { BACKGROUND_MUSIC } from '../data/music';
import gsap from 'gsap';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create audio element
    const audio = new Audio(BACKGROUND_MUSIC.source); 
    audio.loop = true;
    audio.volume = 0.6; // Tăng âm lượng lên một chút
    audioRef.current = audio;

    const startAudio = () => {
      if (audioRef.current) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              setShowInfo(true);
              setTimeout(() => setShowInfo(false), 5000);
            })
            .catch((error) => {
              // Silent fail: Không làm phiền người dùng
              // Chờ người dùng click vào bất cứ đâu để bật
              console.log("Autoplay waiting for interaction");
            });
        }
      }
    };

    startAudio();

    // Global listener: Bất kỳ tương tác nào cũng sẽ kích hoạt nhạc
    const handleGlobalInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          setShowInfo(true);
          setTimeout(() => setShowInfo(false), 4000);
        }).catch(() => {});
      }
    };

    // Lắng nghe cả click và touch
    document.addEventListener('click', handleGlobalInteraction, { once: true });
    document.addEventListener('touchstart', handleGlobalInteraction, { once: true });

    return () => {
      audio.pause();
      audioRef.current = null;
      document.removeEventListener('click', handleGlobalInteraction);
      document.removeEventListener('touchstart', handleGlobalInteraction);
    };
  }, []);

  useEffect(() => {
    if (showInfo && infoRef.current) {
      gsap.fromTo(infoRef.current, 
        { width: 0, opacity: 0, x: 20 },
        { width: 'auto', opacity: 1, x: 0, duration: 0.5, ease: 'back.out(1.2)' }
      );
    }
  }, [showInfo]);

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setShowInfo(false);
    } else {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      setShowInfo(true);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex items-center gap-3">
        {/* Song Info Panel */}
        {isPlaying && (
          <div 
            ref={infoRef}
            className="hidden md:flex overflow-hidden bg-black/40 backdrop-blur-md border border-yellow-500/20 rounded-full py-2 pl-4 pr-12 relative items-center gap-3 shadow-lg"
          >
            <div className="animate-[spin_3s_linear_infinite]">
              <Disc size={18} className="text-yellow-400" />
            </div>
            
            <div className="flex flex-col justify-center min-w-[100px]">
              <span className="text-yellow-100 text-xs font-bold font-playfair whitespace-nowrap">
                  {BACKGROUND_MUSIC.title}
              </span>
              <span className="text-white/50 text-[10px] uppercase tracking-wider whitespace-nowrap">
                  {BACKGROUND_MUSIC.artist}
              </span>
            </div>
            
            {/* Visualizer */}
            <div className="flex gap-[2px] items-end h-3 ml-2">
              <div className="w-[2px] bg-yellow-500 animate-[bounce_0.5s_infinite] h-full"></div>
              <div className="w-[2px] bg-yellow-500 animate-[bounce_0.7s_infinite] h-2/3"></div>
              <div className="w-[2px] bg-yellow-500 animate-[bounce_0.4s_infinite] h-full"></div>
              <div className="w-[2px] bg-yellow-500 animate-[bounce_0.6s_infinite] h-1/2"></div>
            </div>
          </div>
        )}

        {/* Toggle Button */}
        <button 
          onClick={toggleMusic}
          className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-red-950/80 backdrop-blur-md border border-yellow-500/30 hover:bg-red-900 transition-all shadow-lg group hover:scale-110 relative"
          aria-label="Toggle Music"
        >
          {isPlaying ? (
            <div className="relative flex items-center justify-center">
                <span className="absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-20 animate-ping"></span>
                <Volume2 size={20} className="text-yellow-400" />
            </div>
          ) : (
            <VolumeX size={20} className="text-white/50" />
          )}
        </button>
      </div>
  );
};

export default MusicPlayer;