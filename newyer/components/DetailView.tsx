import React, { useEffect, useRef } from 'react';
import { Wish } from '../types';
import { X, Quote } from 'lucide-react';
import gsap from 'gsap';

interface DetailViewProps {
  wish: Wish;
  onClose: () => void;
}

const DetailView: React.FC<DetailViewProps> = ({ wish, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animation entry sequence
      gsap.fromTo(containerRef.current, 
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' }
      );

      gsap.fromTo(contentRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.2, ease: 'back.out(1.2)' }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleClose = () => {
    // Animation exit sequence
    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.4,
      ease: 'power3.in',
      onComplete: onClose
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
        onClick={handleClose}
      ></div>

      {/* Main Content Card */}
      <div 
        ref={containerRef}
        className={`
          relative w-full max-w-2xl bg-slate-900/50 
          border border-white/20 rounded-3xl p-1 
          ${wish.color} shadow-[0_0_100px_-20px_rgba(0,0,0,0.5)]
        `}
      >
        <div className="relative bg-slate-950/80 rounded-[22px] overflow-hidden">
           {/* Background Image decoration */}
           {wish.image && (
             <div className="absolute inset-0 opacity-20">
               <img src={wish.image} alt="bg" className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>
             </div>
           )}

          <div ref={contentRef} className="relative p-8 md:p-12 flex flex-col items-center text-center">
            {/* Close Button */}
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            >
              <X size={24} />
            </button>

            <h2 className="text-3xl md:text-5xl font-bold font-playfair text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-yellow-200 to-cyan-400 mb-2">
              Chúc Mừng Năm Mới
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent mb-8"></div>

            <div className="mb-8 relative">
              <Quote className="absolute -top-6 -left-6 text-white/10 w-12 h-12" />
              <p className="text-xl md:text-2xl text-white font-light leading-relaxed font-playfair italic px-6">
                "{wish.message}"
              </p>
              <Quote className="absolute -bottom-6 -right-6 text-white/10 w-12 h-12 rotate-180" />
            </div>

            <div className="flex flex-col items-center space-y-2 mt-4">
               <span className="text-sm text-cyan-400 uppercase tracking-widest font-bold">Gửi tới</span>
               <span className="text-2xl text-white font-bold">{wish.recipient}</span>
               
               <div className="h-8 w-[1px] bg-white/20 my-2"></div>
               
               <span className="text-sm text-pink-400 uppercase tracking-widest font-bold">Từ</span>
               <span className="text-xl text-white">{wish.sender}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailView;
