import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, AlertCircle, Scan, Aperture } from 'lucide-react';
import gsap from 'gsap';
import { FestiveBranch, CornerOrnament, StylizedHorse, AsianCloud } from './Decorations';
import ParallaxTilt from './ParallaxTilt';
import LightningStrike from './LightningStrike';

interface LoginViewProps {
  onNameSubmit: (name: string) => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onNameSubmit }) => {
  const [name, setName] = useState('');
  const [isScanning, setIsScanning] = useState(true);
  const [triggerLightning, setTriggerLightning] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Sequence: Scan Effect -> Reveal Form
    const tl = gsap.timeline();

    // 1. Initial State
    gsap.set(containerRef.current, { opacity: 0, scale: 0.8 });

    // 2. Scanning Text Animation
    if (textRef.current) {
        tl.to(textRef.current, {
            duration: 1.5,
            text: {
                value: "ĐANG KẾT NỐI VŨ TRỤ 2026...",
                delimiter: "" 
            },
            ease: "none",
        });
    }

    // 3. Scan Complete & Reveal
    setTimeout(() => {
        setIsScanning(false);
        gsap.to(containerRef.current, { 
            opacity: 1, 
            scale: 1, 
            duration: 0.8, 
            ease: 'elastic.out(1, 0.7)' 
        });
    }, 2000);

  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    val = val.replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());
    setName(val);
  };

  const isValidFullName = name.trim().includes(' ') && name.trim().length > 3;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidFullName) {
      // TRIGGER LIGHTNING FIRST
      setTriggerLightning(true);
    }
  };

  const handleLightningComplete = () => {
      // After lightning, suck into warp
      gsap.to(containerRef.current, {
        scale: 0,
        opacity: 0,
        rotate: 360,
        duration: 0.5,
        ease: 'back.in(1.7)',
        onComplete: () => onNameSubmit(name)
      });
  };

  if (isScanning) {
      return (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 text-yellow-500 font-mono">
              <div className="relative w-32 h-32 mb-8">
                  <div className="absolute inset-0 border-4 border-yellow-500/30 rounded-full animate-ping"></div>
                  <div className="absolute inset-0 border-t-4 border-yellow-500 rounded-full animate-spin"></div>
                  <Scan size={48} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-yellow-400 animate-pulse" />
              </div>
              <div className="text-xl tracking-[0.2em] animate-pulse">SYSTEM INITIALIZING</div>
              <div className="text-xs text-yellow-500/50 mt-2">v.2026.0.1_BETA</div>
          </div>
      )
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center z-40 p-4 overflow-hidden">
      
      {/* BACKGROUND DECORATIONS */}
      <div className="absolute top-0 left-0 z-10 w-64 h-64 md:w-[500px] md:h-[500px]">
         <FestiveBranch position="top-left" type="apricot" className="w-full h-full" />
      </div>
      <div className="absolute bottom-0 right-0 z-10 w-64 h-64 md:w-[500px] md:h-[500px]">
         <FestiveBranch position="bottom-right" type="apricot" className="w-full h-full" />
      </div>
      <div className="absolute top-1/3 right-10 opacity-20 md:opacity-40 animate-pulse pointer-events-none">
         <AsianCloud className="w-32 h-20 text-yellow-500" />
      </div>

      <LightningStrike trigger={triggerLightning} onComplete={handleLightningComplete} />

      {/* PARALLAX TILT WRAPPER */}
      <ParallaxTilt intensity={20} className="w-full max-w-md md:max-w-lg mt-10 md:mt-0 z-50">
        <div 
            ref={containerRef}
            className="relative w-full"
        >
            {/* Holographic Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-red-500 to-yellow-400 rounded-[2.2rem] blur opacity-30 animate-pulse"></div>

            {/* Card Body */}
            <div className="relative bg-[#5a0c0c]/90 backdrop-blur-xl border-[1px] border-[#FCD34D]/50 p-1 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
            
            {/* Tech Grid Background */}
            <div className="absolute inset-0 opacity-10" 
                style={{ 
                    backgroundImage: 'linear-gradient(rgba(252, 211, 77, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(252, 211, 77, 0.5) 1px, transparent 1px)', 
                    backgroundSize: '30px 30px' 
                }}>
            </div>
            
            <div className="relative bg-gradient-to-b from-[#7f1d1d]/80 to-[#450a0a]/90 rounded-[1.8rem] p-8 md:p-12 flex flex-col items-center">
                
                {/* HUD Corners */}
                <div className="absolute top-6 left-6 w-4 h-4 border-t-2 border-l-2 border-yellow-400"></div>
                <div className="absolute top-6 right-6 w-4 h-4 border-t-2 border-r-2 border-yellow-400"></div>
                <div className="absolute bottom-6 right-6 w-4 h-4 border-b-2 border-r-2 border-yellow-400"></div>
                <div className="absolute bottom-6 left-6 w-4 h-4 border-b-2 border-l-2 border-yellow-400"></div>

                {/* HORSE HOLOGRAM */}
                <div className="mb-4 relative group">
                    <div className="absolute inset-0 bg-yellow-400/20 blur-xl rounded-full group-hover:bg-yellow-400/40 transition-all"></div>
                    <div className="w-40 h-40 md:w-48 md:h-48 z-20 relative animate-[float_6s_ease-in-out_infinite]">
                        <StylizedHorse />
                    </div>
                </div>

                <div className="flex items-center gap-2 mb-2">
                    <Aperture size={16} className="text-yellow-400 animate-spin-slow" />
                    <span className="text-yellow-400 font-mono text-xs tracking-widest">ACCESS GRANTED</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-orbitron font-black text-white mb-2 text-center drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                    2026
                </h2>
                
                <p className="text-yellow-100/70 font-quicksand text-sm text-center mb-8 px-4">
                    Nhập định danh để kích hoạt cổng thời gian.
                </p>

                <form onSubmit={handleSubmit} className="w-full relative z-20 flex flex-col gap-6">
                
                <div className="group relative">
                    <input
                    type="text"
                    value={name}
                    onChange={handleInputChange}
                    placeholder="NHẬP TÊN CỦA BẠN"
                    className="w-full bg-black/20 border-b-2 border-yellow-500/30 py-3 text-center text-xl font-bold text-yellow-100 placeholder-white/10 focus:outline-none focus:border-yellow-400 transition-all font-mono tracking-wider uppercase"
                    autoFocus
                    />
                    
                    <div className={`absolute -bottom-6 left-0 w-full text-center transition-opacity duration-300 ${name.length > 0 && !isValidFullName ? 'opacity-100' : 'opacity-0'}`}>
                        <span className="text-red-400 text-[10px] font-mono flex items-center justify-center gap-1 bg-black/50 py-1 px-2 rounded inline-block">
                            <AlertCircle size={10} /> ERROR: FULL NAME REQUIRED
                        </span>
                    </div>
                </div>
                
                <button 
                    type="submit"
                    disabled={!isValidFullName}
                    className={`
                    relative overflow-hidden w-full py-4 rounded-lg font-bold text-lg font-mono tracking-widest shadow-lg transition-all duration-300
                    flex items-center justify-center gap-3 border border-yellow-500/50
                    ${isValidFullName 
                        ? 'bg-yellow-500 text-red-900 hover:bg-yellow-400 hover:shadow-[0_0_30px_rgba(234,179,8,0.6)]' 
                        : 'bg-white/5 text-white/20 cursor-not-allowed'}
                    `}
                >
                    <span>KHỞI ĐỘNG</span>
                    {isValidFullName && <ArrowRight size={20} className="animate-bounce-x" />}
                </button>
                </form>

            </div>
            </div>
        </div>
      </ParallaxTilt>
    </div>
  );
};

export default LoginView;