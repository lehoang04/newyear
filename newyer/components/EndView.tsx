import React, { useEffect, useRef, useState } from 'react';
import { RefreshCcw, Home, Star, Zap, Heart, Gift } from 'lucide-react';
import gsap from 'gsap';
import { FestiveBranch, GodRays } from './Decorations';

interface EndViewProps {
  onReplay: () => void;
  onHome: () => void;
  onStartShow: () => void;
  onLuckyMoney?: () => void; // Optional callback for lucky money
}

const EndView: React.FC<EndViewProps> = ({ onReplay, onHome, onStartShow, onLuckyMoney }) => {
  const [phase, setPhase] = useState<'card' | 'finale' | 'show' | 'thankyou'>('card');
  const [progress, setProgress] = useState(0); 
  
  const containerRef = useRef<HTMLDivElement>(null);
  const finaleRef = useRef<HTMLDivElement>(null);
  const showRef = useRef<HTMLDivElement>(null);
  const thankYouRef = useRef<HTMLDivElement>(null);

  const SHOW_DURATION = 12000;
  const PROGRESS_INTERVAL = 100;

  useEffect(() => {
    if (phase === 'card') {
      gsap.fromTo(containerRef.current,
        { opacity: 0, scale: 0.9, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
      const timer = setTimeout(() => {
        gsap.to(containerRef.current, {
          opacity: 0,
          scale: 1.1,
          filter: 'blur(10px)',
          duration: 0.8,
          ease: 'power2.in',
          onComplete: () => setPhase('finale')
        });
      }, 4500);
      return () => clearTimeout(timer);
    } 
    else if (phase === 'finale') {
      gsap.fromTo(finaleRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: 'elastic.out(1, 0.5)' }
      );
    }
    else if (phase === 'show') {
       onStartShow();
       setProgress(0);
       gsap.to(finaleRef.current, { opacity: 0, duration: 0.3 });
       gsap.fromTo(showRef.current,
         { opacity: 0, scale: 2, filter: 'blur(20px)' },
         { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.5, ease: 'expo.out' }
       );
       const interval = setInterval(() => {
         setProgress(prev => {
            const next = prev + (PROGRESS_INTERVAL / SHOW_DURATION) * 100;
            return next >= 100 ? 100 : next;
         });
       }, PROGRESS_INTERVAL);
       const shakeTween = gsap.to(showRef.current, {
          x: "random(-3, 3)",
          y: "random(-3, 3)",
          duration: 0.1,
          repeat: -1,
          yoyo: true,
          ease: "none"
       });
       const showTimer = setTimeout(() => {
          shakeTween.kill();
          clearInterval(interval);
          gsap.to(showRef.current, {
             opacity: 0,
             scale: 1.5,
             filter: 'blur(20px)',
             duration: 1.5,
             onComplete: () => setPhase('thankyou')
          });
       }, SHOW_DURATION);
       return () => {
         clearTimeout(showTimer);
         clearInterval(interval);
         shakeTween.kill();
       };
    }
    else if (phase === 'thankyou') {
        gsap.fromTo(thankYouRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' }
        );
    }
  }, [phase]);

  const handleFinaleClick = () => {
      if (phase === 'finale') {
          setPhase('show');
      }
  };

  return (
    <div 
      onClick={handleFinaleClick}
      className={`absolute inset-0 flex items-center justify-center z-40 overflow-hidden ${phase === 'finale' ? 'cursor-pointer' : ''}`}
    >
      {/* GLOBAL BACKGROUND */}
      {phase !== 'card' && <div className="absolute inset-0 bg-gradient-to-t from-black via-[#450a0a]/50 to-black z-0"></div>}
      {phase === 'show' && (
        <div className="absolute inset-0 z-10 animate-[pulse_0.2s_ease-in-out_infinite] bg-white/5 mix-blend-overlay pointer-events-none"></div>
      )}
      <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${(phase === 'show' || phase === 'thankyou') ? 'opacity-100' : 'opacity-0'}`}>
         <GodRays />
      </div>

      {/* SEARCHLIGHTS */}
      {phase === 'show' && (
        <>
            <div className="absolute bottom-[-10vh] left-[5vw] w-[20vw] h-[150vh] origin-bottom animate-spotlight-left z-0 pointer-events-none mix-blend-plus-lighter opacity-50">
               <div className="w-full h-full bg-gradient-to-t from-white/60 via-yellow-100/10 to-transparent" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 60% 100%, 40% 100%)' }}></div>
            </div>
            <div className="absolute bottom-[-10vh] right-[5vw] w-[20vw] h-[150vh] origin-bottom animate-spotlight-right z-0 pointer-events-none mix-blend-plus-lighter opacity-50">
               <div className="w-full h-full bg-gradient-to-t from-white/60 via-yellow-100/10 to-transparent" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 60% 100%, 40% 100%)' }}></div>
            </div>
            <div className="absolute bottom-[-15vh] left-[40vw] w-[20vw] h-[160vh] origin-bottom animate-spotlight-center z-0 pointer-events-none mix-blend-plus-lighter opacity-30">
               <div className="w-full h-full bg-gradient-to-t from-yellow-200/50 via-white/5 to-transparent" style={{ clipPath: 'polygon(10% 0%, 90% 0%, 55% 100%, 45% 100%)' }}></div>
            </div>
            <style>{`
              @keyframes spotlight-left { 0%, 100% { transform: rotate(-35deg) scaleY(1); } 50% { transform: rotate(15deg) scaleY(1.1); } }
              @keyframes spotlight-right { 0%, 100% { transform: rotate(35deg) scaleY(1); } 50% { transform: rotate(-15deg) scaleY(1.1); } }
              @keyframes spotlight-center { 0%, 100% { transform: rotate(-20deg); } 50% { transform: rotate(20deg); } }
              .animate-spotlight-left { animation: spotlight-left 8s ease-in-out infinite; }
              .animate-spotlight-right { animation: spotlight-right 9s ease-in-out infinite; }
              .animate-spotlight-center { animation: spotlight-center 12s ease-in-out infinite; }
            `}</style>
        </>
      )}

      {/* DECORATIONS */}
      <div className={`absolute top-0 left-0 pointer-events-none transition-all duration-1000 w-48 h-48 md:w-96 md:h-96 ${phase === 'show' ? 'opacity-20 scale-150 blur-sm' : 'opacity-100 scale-100'}`}>
         <FestiveBranch position="top-left" type="apricot" className="w-full h-full" />
      </div>
      <div className={`absolute bottom-0 left-0 pointer-events-none transition-all duration-1000 w-48 h-48 md:w-96 md:h-96 ${phase === 'show' ? 'opacity-20 scale-150 blur-sm' : 'opacity-100 scale-100'}`}>
         <FestiveBranch position="bottom-left" type="peach" className="w-full h-full" />
      </div>

      {/* PHASE 1 */}
      {phase === 'card' && (
        <div ref={containerRef} className="relative z-50 p-1 rounded-[2.5rem] bg-gradient-to-br from-[#cb8d38] via-[#FCD34D] to-[#cb8d38] shadow-[0_0_100px_rgba(252,211,77,0.4)] max-w-xl mx-4">
           <div className="bg-[#5a0c0c] rounded-[2.4rem] px-8 py-12 md:px-12 md:py-16 text-center border border-[#781818] relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
              <div className="relative z-10">
                <div className="mx-auto w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
                    <Star size={32} className="text-[#FCD34D] fill-[#FCD34D]" />
                </div>
                <h2 className="text-4xl md:text-6xl font-dancing font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FCD34D] via-[#fff] to-[#FCD34D] mb-6">Vạn Sự Như Ý</h2>
                <div className="w-20 h-1 bg-[#cb8d38] mx-auto mb-6 rounded-full"></div>
                <p className="text-yellow-100/90 font-playfair text-lg md:text-xl leading-relaxed italic">"Cùng nhau thêm vào một nhịp pháo hoa góp phần thêm vui ngày tết nhé!"</p>
                <div className="mt-6 text-yellow-500/50 text-xs animate-pulse">(Đang chuyển tiếp...)</div>
              </div>
           </div>
        </div>
      )}

      {/* PHASE 2 */}
      {phase === 'finale' && (
        <div ref={finaleRef} className="relative z-50 flex flex-col items-center justify-center w-full text-center px-4">
            <h1 className="text-5xl md:text-8xl font-black font-orbitron text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] mb-4">2026</h1>
            <p className="text-yellow-400 font-dancing text-2xl md:text-4xl animate-bounce">Đã sẵn sàng!</p>
            <div className="mt-12">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/20 backdrop-blur-md animate-pulse cursor-pointer hover:bg-white/20 transition-colors">
                    <Zap size={20} className="text-yellow-300" />
                    <span className="text-white text-sm md:text-base uppercase tracking-widest font-bold">Chạm để khai hỏa</span>
                </div>
            </div>
        </div>
      )}

      {/* PHASE 3 - SUPER MASSIVE SHOW */}
      {phase === 'show' && (
        <div ref={showRef} className="relative z-50 flex flex-col items-center justify-center w-full h-full pb-20">
            {/* Shockwave */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] rounded-full border border-yellow-500/30 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
            
            <div className="relative text-center z-10">
               <h2 className="text-3xl md:text-5xl font-dancing font-bold text-white mb-4 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] animate-pulse">Chúc Mừng Năm Mới</h2>
               
               <div className="relative">
                 {/* LIQUID GOLD TEXT EFFECT */}
                 <h1 className="text-[5rem] md:text-[12rem] font-black font-orbitron leading-none text-transparent bg-clip-text animate-liquid-gold drop-shadow-[0_0_50px_rgba(252,211,77,0.6)]" 
                     style={{ 
                         backgroundImage: 'linear-gradient(to bottom, #FFF 0%, #FCD34D 40%, #B45309 60%, #FFF 100%)',
                         backgroundSize: '100% 200%',
                         WebkitTextStroke: '2px rgba(255,255,255,0.3)'
                     }}
                 >
                    2026
                 </h1>
                 
                 {/* Reflection */}
                 <div className="absolute top-full left-0 w-full h-full transform scale-y-[-0.3] opacity-20 bg-gradient-to-t from-transparent to-yellow-500/50 blur-sm pointer-events-none" style={{ maskImage: 'linear-gradient(to bottom, transparent, black)' }}>
                     <h1 className="text-[5rem] md:text-[12rem] font-black font-orbitron leading-none text-yellow-500">2026</h1>
                 </div>

                 {/* Glitch layers */}
                 <h1 className="absolute top-0 left-0 w-full text-[5rem] md:text-[12rem] font-black font-orbitron leading-none text-red-500/50 mix-blend-screen animate-[pulse_0.1s_infinite] translate-x-[2px]" style={{ zIndex: -1 }}>2026</h1>
                 <h1 className="absolute top-0 left-0 w-full text-[5rem] md:text-[12rem] font-black font-orbitron leading-none text-cyan-500/50 mix-blend-screen animate-[pulse_0.1s_infinite] translate-x-[-2px]" style={{ zIndex: -1 }}>2026</h1>
               </div>

               <p className="mt-8 text-yellow-200 font-bold tracking-[0.5em] uppercase text-sm md:text-xl animate-[bounce_1s_infinite]">Bính Ngọ Đại Cát</p>
            </div>
            
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 md:w-96 h-1 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
               <div className="h-full bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 shadow-[0_0_10px_#FCD34D]" style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}></div>
            </div>
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,rgba(0,0,0,0.8)_0%,transparent_20%,transparent_80%,rgba(0,0,0,0.8)_100%)]"></div>
            
            <style>{`
                @keyframes liquid-gold {
                    0% { background-position: 50% 0%; }
                    50% { background-position: 50% 100%; }
                    100% { background-position: 50% 0%; }
                }
                .animate-liquid-gold {
                    animation: liquid-gold 3s linear infinite;
                }
            `}</style>
        </div>
      )}

      {/* PHASE 4: THANK YOU + LUCKY MONEY */}
      {phase === 'thankyou' && (
        <div ref={thankYouRef} className="relative z-50 flex flex-col items-center justify-center w-full max-w-2xl px-4 text-center">
             <div className="mb-4 animate-bounce">
                <Heart size={48} className="text-red-500 fill-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]" />
             </div>
             
             <h2 className="text-3xl md:text-5xl font-dancing font-bold text-yellow-300 mb-4 drop-shadow-md leading-tight">Cảm ơn đã dành thời gian trải nghiệm</h2>
             <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent mb-6"></div>
             <p className="text-white/80 font-quicksand text-lg mb-8 leading-relaxed">Chúc mọi người và gia đình một năm mới Bình An, Hạnh Phúc và tràn đầy May Mắn.</p>

             <div className="flex flex-wrap gap-3 justify-center">
                  <button onClick={(e) => { e.stopPropagation(); onHome(); }} className="flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 rounded-full text-yellow-300 border border-yellow-500/30 transition-all hover:scale-105 backdrop-blur-md">
                      <Home size={18} /> <span className="font-bold text-sm">Trang chủ</span>
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); onReplay(); }} className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-red-800 to-red-900 hover:from-red-700 hover:to-red-800 rounded-full text-white shadow-lg transition-all hover:scale-105 border border-red-500/30">
                      <RefreshCcw size={18} /> <span className="font-bold text-sm">Xem lại</span>
                  </button>
                  {/* NEW LUCKY MONEY BUTTON */}
                  {onLuckyMoney && (
                      <button onClick={(e) => { e.stopPropagation(); onLuckyMoney(); }} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 rounded-full text-red-900 shadow-[0_0_20px_rgba(234,179,8,0.6)] transition-all hover:scale-110 border-2 border-white/50 animate-pulse">
                          <Gift size={20} /> <span className="font-bold text-sm uppercase">Gieo Quẻ Đầu Năm</span>
                      </button>
                  )}
             </div>
             <div className="mt-12 text-white/20 text-xs font-mono">HAPPY NEW YEAR 2026</div>
        </div>
      )}

    </div>
  );
};

export default EndView;