import React, { useState, useEffect } from 'react';
import { X, Gift } from 'lucide-react';
import gsap from 'gsap';

interface LuckyMoneyPopupProps {
  onClose: () => void;
}

const FORTUNES = [
  { title: "ĐẠI CÁT", text: "Năm nay tiền vào như nước, tình duyên phơi phới.", },
  { title: "TẤN TÀI", text: "Công danh thăng tiến vượt bậc, sếp quý đồng nghiệp thương.",},
  { title: "BÌNH AN", text: "Sức khỏe dồi dào, tâm hồn an yên, vạn sự như ý.",},
  { title: "NHƯ Ý", text: "Cầu được ước thấy, mọi dự định đều thành công rực rỡ.",},
  { title: "PHÚ QUÝ", text: "Lộc lá đầy nhà, ra ngõ gặp quý nhân.",}
];

const LuckyMoneyPopup: React.FC<LuckyMoneyPopupProps> = ({ onClose }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [result, setResult] = useState<typeof FORTUNES[0] | null>(null);
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    // Entrance animation
    gsap.fromTo(".lucky-overlay", { opacity: 0 }, { opacity: 1, duration: 0.5 });
    gsap.fromTo(".lucky-container", 
      { scale: 0.5, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.5)" }
    );
  }, []);

  const handleSelect = (index: number) => {
    if (selected !== null) return;
    
    setSelected(index);
    setIsShaking(true);

    // Simulate opening delay
    setTimeout(() => {
      setIsShaking(false);
      const randomFortune = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
      setResult(randomFortune);
      
      // Explosion animation
      gsap.fromTo(".result-content", 
        { scale: 0, rotation: -180 }, 
        { scale: 1, rotation: 0, duration: 0.8, ease: "elastic.out(1, 0.5)" }
      );
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 lucky-overlay bg-black/80 backdrop-blur-md">
      <div className="lucky-container relative w-full max-w-2xl bg-[#5a0c0c] border-2 border-yellow-500 rounded-3xl p-8 md:p-12 text-center shadow-[0_0_50px_rgba(234,179,8,0.5)] overflow-hidden">
        
        {/* Background rays */}
        <div className="absolute inset-0 animate-[spin_10s_linear_infinite] opacity-20 pointer-events-none">
           <div style={{ width: '200%', height: '200%', marginLeft: '-50%', marginTop: '-50%', background: 'conic-gradient(from 0deg, transparent 0deg, #FCD34D 20deg, transparent 40deg, #FCD34D 60deg, transparent 80deg, #FCD34D 100deg, transparent 120deg, transparent 360deg)' }}></div>
        </div>

        <button onClick={onClose} className="absolute top-4 right-4 text-yellow-500 hover:text-white transition-colors z-20">
          <X size={32} />
        </button>

        {!result ? (
          <>
            <h2 className="text-3xl md:text-5xl font-dancing font-bold text-yellow-400 mb-2 drop-shadow-md">Gieo Quẻ Đầu Năm</h2>
            <p className="text-yellow-100/80 mb-8 font-quicksand">Chọn một bao lì xì để nhận lộc may mắn nhé!</p>
            
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              {[0, 1, 2].map((idx) => (
                <div 
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={`relative cursor-pointer transition-all duration-300 transform 
                    ${selected === null ? 'hover:scale-110 hover:-rotate-3' : ''}
                    ${selected === idx && isShaking ? 'animate-shake-hard scale-110' : ''}
                    ${selected !== null && selected !== idx ? 'opacity-0 scale-0' : ''}
                  `}
                >
                   {/* Custom Big Envelope SVG */}
                   <div className="w-24 h-32 md:w-32 md:h-44 bg-red-600 border-2 border-yellow-400 rounded-lg flex items-center justify-center shadow-xl relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-tr from-red-800 to-red-500"></div>
                      <div className="absolute top-0 w-full h-1/3 bg-red-700 rounded-b-full border-b border-yellow-400/50"></div>
                      <div className="z-10 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-yellow-400/50 transition-shadow">
                         <span className="font-serif font-bold text-red-800 text-xl">Lộc</span>
                      </div>
                   </div>
                </div>
              ))}
            </div>
            <style>{`
              @keyframes shake-hard {
                0% { transform: translate(1px, 1px) rotate(0deg); }
                10% { transform: translate(-1px, -2px) rotate(-10deg); }
                20% { transform: translate(-3px, 0px) rotate(10deg); }
                30% { transform: translate(3px, 2px) rotate(0deg); }
                40% { transform: translate(1px, -1px) rotate(10deg); }
                50% { transform: translate(-1px, 2px) rotate(-10deg); }
                60% { transform: translate(-3px, 1px) rotate(0deg); }
                70% { transform: translate(3px, 1px) rotate(-10deg); }
                80% { transform: translate(-1px, -1px) rotate(10deg); }
                90% { transform: translate(1px, 2px) rotate(0deg); }
                100% { transform: translate(1px, -2px) rotate(-10deg); }
              }
              .animate-shake-hard { animation: shake-hard 0.5s infinite; }
            `}</style>
          </>
        ) : (
          <div className="result-content relative z-10">
            <div className="w-20 h-20 mx-auto bg-yellow-400 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_#FCD34D] animate-pulse">
               <Gift size={40} className="text-red-600" />
            </div>
            
            <h3 className="text-4xl md:text-6xl font-black font-orbitron text-transparent bg-clip-text bg-gradient-to-b from-white via-yellow-200 to-yellow-500 mb-4 drop-shadow-lg">
              {result.title}
            </h3>
            
            <div className="w-full h-[1px] bg-yellow-500/50 mb-6"></div>
            
            <p className="text-xl md:text-2xl text-white font-playfair italic mb-6">
              "{result.text}"
            </p>
            
            <div className="bg-black/30 rounded-xl p-4 border border-yellow-500/30 inline-block">
               <p className="text-sm text-yellow-500/70 uppercase tracking-widest mb-1">Tài lộc tượng trưng</p>
               <p className="text-2xl font-bold text-yellow-300 font-mono">{result.money}</p>
            </div>
            
            <div className="mt-8">
               <button onClick={onClose} className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-red-900 font-bold rounded-full shadow-lg hover:scale-105 transition-transform">
                 Nhận Lộc
               </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LuckyMoneyPopup;