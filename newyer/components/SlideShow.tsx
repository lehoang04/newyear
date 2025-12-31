import React, { useState, useEffect, useRef } from 'react';
import { Wish } from '../types';
import { ChevronRight, ChevronLeft, Quote, Sparkles, Hand, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { FestiveBranch, CornerOrnament, Flower } from './Decorations';

interface SlideShowProps {
  wishes: Wish[];
  userName: string;
  onComplete: () => void;
}

const SlideShow: React.FC<SlideShowProps> = ({ wishes, userName, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  const changeSlide = (direction: 'next' | 'prev') => {
    if (direction === 'next' && currentIndex === wishes.length - 1) {
       gsap.to(slideRef.current, {
         scale: 1.5,
         opacity: 0,
         filter: 'blur(20px)',
         duration: 0.8,
         ease: 'power2.in',
         onComplete: onComplete
       });
       return;
    }

    const nextIndex = direction === 'next' 
      ? (currentIndex + 1) % wishes.length 
      : (currentIndex - 1 + wishes.length) % wishes.length;

    const tl = gsap.timeline({
      onComplete: () => setCurrentIndex(nextIndex)
    });

    if (direction === 'next') {
        tl.to(slideRef.current, {
            scale: 1.2,
            opacity: 0,
            filter: 'blur(10px)',
            duration: 0.5,
            ease: 'power1.in'
        });
    } else {
        tl.to(slideRef.current, {
            scale: 0.8,
            opacity: 0,
            filter: 'blur(10px)',
            duration: 0.5,
            ease: 'power1.in'
        });
    }
  };

  useEffect(() => {
    const tl = gsap.timeline();
    
    gsap.set(slideRef.current, { 
        scale: 0.8, 
        opacity: 0, 
        filter: 'blur(20px)' 
    });
    
    gsap.set(textRef.current, { opacity: 0, y: 20 });

    tl.to(slideRef.current, {
        scale: 1,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: 'power3.out'
    })
    .to(textRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out'
    }, "-=0.4");

    if (bgRef.current) {
      gsap.fromTo(bgRef.current, 
        { scale: 1.1 }, 
        { scale: 1, duration: 6, ease: 'none' }
      );
    }
  }, [currentIndex]);

  const currentWish = wishes[currentIndex];
  const isLastSlide = currentIndex === wishes.length - 1;

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center p-0 md:p-4 overflow-hidden perspective-[1000px]">
      
      {/* DECORATIONS - CORNERS OF SCREEN */}
      <div className="absolute top-0 left-0 z-20 pointer-events-none w-64 h-64 md:w-96 md:h-96">
         <FestiveBranch position="top-left" type="apricot" className="w-full h-full" />
      </div>
      <div className="absolute top-0 right-0 z-20 pointer-events-none w-64 h-64 md:w-96 md:h-96">
         <FestiveBranch position="top-right" type="apricot" className="w-full h-full" />
      </div>
      <div className="absolute bottom-0 left-0 z-40 pointer-events-none w-64 h-64 md:w-96 md:h-96">
         <FestiveBranch position="bottom-left" type="peach" className="w-full h-full" />
      </div>

      {/* Navigation Buttons */}
      <button 
        onClick={(e) => { e.stopPropagation(); changeSlide('prev'); }}
        className="hidden md:block absolute left-4 lg:left-8 z-50 p-4 rounded-full bg-red-950/40 border border-yellow-500/30 hover:bg-red-900 text-yellow-400 backdrop-blur-md transition-all hover:scale-110 shadow-lg"
      >
        <ChevronLeft size={32} />
      </button>

      <button 
        onClick={(e) => { e.stopPropagation(); changeSlide('next'); }}
        className="hidden md:block absolute right-4 lg:right-8 z-50 p-4 rounded-full bg-red-950/40 border border-yellow-500/30 hover:bg-red-900 text-yellow-400 backdrop-blur-md transition-all hover:scale-110 shadow-lg"
      >
        {isLastSlide ? <CheckCircle2 size={32} /> : <ChevronRight size={32} />}
      </button>

      {/* Main Slide Card */}
      <div 
        className="relative w-full h-full md:h-auto md:w-[85%] md:max-w-5xl md:aspect-[16/9] flex items-center justify-center cursor-pointer z-30"
        onClick={() => changeSlide('next')}
      >
        <div 
          ref={slideRef}
          className="relative w-full h-full md:rounded-[40px] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col md:flex-row bg-red-950/90 backdrop-blur-md md:border border-yellow-500/20"
        >
          {/* Decorative Corner Patterns - LEFT SIDE */}
          <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-yellow-500/50 rounded-tl-xl z-20 pointer-events-none opacity-50"></div>
          
          {/* NEW DECORATION: TOP RIGHT CORNER (Requested) */}
          <div className="absolute top-4 right-4 z-20 pointer-events-none flex flex-col items-end">
              <div className="w-16 h-16 opacity-80 mb-[-10px]">
                  <CornerOrnament rotate={90} />
              </div>
              <div className="mr-2 animate-wiggle-slow">
                  <Flower type="apricot" size={30} />
              </div>
          </div>

          <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-yellow-500/50 rounded-br-xl z-20 pointer-events-none opacity-50"></div>

          {/* Background Image Layer */}
          <div className="absolute inset-0 z-0">
             <div ref={bgRef} className="w-full h-full origin-center">
                <img 
                  src={currentWish.image} 
                  alt="Background" 
                  className="w-full h-full object-cover opacity-30 mix-blend-overlay" 
                />
             </div>
             <div className="absolute inset-0 bg-gradient-to-b from-red-950/40 via-red-900/80 to-red-950 md:bg-gradient-to-r md:from-red-950 md:via-red-900/70 md:to-transparent" />
          </div>

          {/* Text Content */}
          <div ref={textRef} className="relative z-10 w-full h-full flex flex-col justify-center items-center md:items-start text-center md:text-left p-12 pb-24 md:p-20 lg:p-24">
            
            {/* Minimal Badge (No box) */}
            <div className="inline-flex items-center gap-2 mb-4 md:mb-8 text-yellow-300/80 uppercase tracking-[0.2em] font-bold text-xs">
              <Sparkles size={14} className="animate-spin-slow text-yellow-500" />
              <span>Lời chúc số {currentIndex + 1}</span>
            </div>

            <Quote className="text-yellow-500/20 w-10 h-10 md:w-20 md:h-20 mb-2 md:mb-6 transform -scale-x-100" />
            
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-dancing font-bold text-yellow-100 leading-relaxed md:leading-tight mb-6 md:mb-10 drop-shadow-lg max-w-2xl px-2">
              {currentWish.message}
            </h2>

            <div className="w-24 md:w-32 h-1 bg-gradient-to-r from-yellow-500 to-transparent mb-6 md:mb-8 mx-auto md:mx-0" />

            <div className="flex flex-col">
              <span className="text-yellow-500 text-xs md:text-sm font-bold uppercase tracking-widest mb-1">Thân gửi</span>
              <span className="text-white text-xl md:text-3xl font-playfair font-bold">{currentWish.recipient}</span>
            </div>
            
            <div className="absolute bottom-6 left-0 w-full text-center md:text-left md:left-auto md:w-auto md:relative md:bottom-auto md:mt-auto">
               <span className="text-white/30 text-xs flex items-center justify-center md:justify-start gap-2">
                 {isLastSlide ? (
                   <> <CheckCircle2 size={14} /> Chạm để kết thúc </>
                 ) : (
                   <> <Hand size={14} className="animate-bounce" /> Chạm bất kỳ để xem tiếp </>
                 )}
               </span>
            </div>

            <div className="hidden md:block absolute bottom-8 right-8 text-yellow-500/30 text-lg font-mono font-bold">
              0{currentIndex + 1} / 0{wishes.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideShow;