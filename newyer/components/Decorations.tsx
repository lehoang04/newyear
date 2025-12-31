import React from 'react';

// ==========================================
// SAO BĂNG (SHOOTING STARS)
// ==========================================
export const ShootingStar: React.FC = () => {
  const top = Math.random() * 50; 
  const left = Math.random() * 100; 
  const delay = Math.random() * 5; 
  const duration = 2 + Math.random() * 2; 

  return (
    <div 
      className="shooting-star pointer-events-none" 
      style={{ 
        top: `${top}%`, 
        left: `${left}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`
      }} 
    />
  );
};

// ==========================================
// THẦN MÃ XUẤT THẾ (SPIRIT HORSE RUN)
// ==========================================
export const SpiritHorseRun: React.FC = () => {
  return (
    <div className="absolute top-[15%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] z-0 pointer-events-none animate-spirit-run opacity-0 mix-blend-screen">
       {/* Glowing Horse Silhouette */}
       <img 
        src="https://cdn-icons-png.flaticon.com/512/2313/2313327.png" 
        alt="Spirit Horse" 
        className="w-full h-full object-contain filter brightness-0 invert drop-shadow-[0_0_30px_rgba(252,211,77,0.8)] animate-gallop"
       />
       {/* Motion Trails */}
       <div className="absolute top-0 left-0 w-full h-full opacity-50 translate-x-[-20px] filter blur-sm">
          <img src="https://cdn-icons-png.flaticon.com/512/2313/2313327.png" className="w-full h-full object-contain filter brightness-0 invert" alt="" />
       </div>
       
       <style>{`
         @keyframes spirit-run {
            0% { left: -500px; opacity: 0; transform: scale(0.5); }
            10% { opacity: 0.8; }
            90% { opacity: 0.8; }
            100% { left: 100vw; opacity: 0; transform: scale(0.8); }
         }
         .animate-spirit-run {
            animation: spirit-run 15s linear infinite;
            animation-delay: 5s; /* Wait before starting */
         }
         @keyframes gallop {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
         }
         .animate-gallop {
            animation: gallop 0.4s ease-in-out infinite;
         }
       `}</style>
    </div>
  );
};

// ==========================================
// 1. ĐÈN LỒNG (LANTERN)
// ==========================================
export const Lantern: React.FC<{ className?: string; delay?: string; color?: string }> = ({ className, delay = "0s", color = "#DC2626" }) => (
  <div className={`absolute origin-top animate-[swing_4s_infinite_ease-in-out] ${className}`} style={{ animationDelay: delay }}>
    <svg width="40" height="60" viewBox="0 0 40 60" fill="none" className="drop-shadow-lg">
      <line x1="20" y1="0" x2="20" y2="10" stroke="#FCD34D" strokeWidth="1.5" />
      <path d="M10 10 L30 10 L35 20 L35 40 L30 50 L10 50 L5 40 L5 20 Z" fill={color} stroke="#FCD34D" strokeWidth="1" />
      <path d="M5 20 Q 20 15 35 20" stroke="#7f1d1d" strokeWidth="0.5" opacity="0.5" />
      <path d="M5 30 Q 20 25 35 30" stroke="#7f1d1d" strokeWidth="0.5" opacity="0.5" />
      <path d="M5 40 Q 20 35 35 40" stroke="#7f1d1d" strokeWidth="0.5" opacity="0.5" />
      <line x1="20" y1="50" x2="20" y2="60" stroke="#FCD34D" strokeWidth="1.5" />
      <line x1="15" y1="50" x2="15" y2="58" stroke="#FCD34D" strokeWidth="1" opacity="0.8" />
      <line x1="25" y1="50" x2="25" y2="58" stroke="#FCD34D" strokeWidth="1" opacity="0.8" />
      <rect x="15" y="25" width="10" height="10" transform="rotate(45 20 30)" fill="#FCD34D" />
    </svg>
    <style>{`@keyframes swing { 0%, 100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg); } }`}</style>
  </div>
);

// ==========================================
// 2. BAO LÌ XÌ (RED ENVELOPE)
// ==========================================
export const RedEnvelope: React.FC<{ className?: string; delay?: string }> = ({ className, delay = "0s" }) => (
  <div className={`absolute origin-top animate-[swing_3s_infinite_ease-in-out] ${className}`} style={{ animationDelay: delay }}>
    <svg width="24" height="36" viewBox="0 0 24 36" fill="none" className="drop-shadow-md">
      <line x1="12" y1="0" x2="12" y2="4" stroke="#FCD34D" strokeWidth="1" />
      <rect x="2" y="4" width="20" height="28" rx="2" fill="#DC2626" stroke="#B91C1C" />
      <path d="M2 8 L12 16 L22 8" stroke="#FCD34D" strokeWidth="1" fill="none" opacity="0.8"/>
      <rect x="8" y="14" width="8" height="8" transform="rotate(45 12 18)" fill="#FCD34D" />
      <line x1="12" y1="32" x2="12" y2="36" stroke="#FCD34D" strokeWidth="1.5" />
    </svg>
  </div>
);

// ==========================================
// 3. HOA (Flower Base)
// ==========================================
interface FlowerProps {
  className?: string;
  size?: number;
  opacity?: number;
  delay?: string;
  type?: 'apricot' | 'peach'; 
}

export const Flower: React.FC<FlowerProps> = ({ className, size = 40, opacity = 1, delay = '0s', type = 'apricot' }) => {
  const petalColorStart = type === 'apricot' ? '#FACC15' : '#F472B6'; 
  const petalColorEnd = type === 'apricot' ? '#F59E0B' : '#DB2777';   
  const centerColor = type === 'apricot' ? '#B45309' : '#831843';     
  
  const uniqueId = `grad-${type}-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      className={`drop-shadow-sm ${className}`}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity, animationDelay: delay }}
    >
      <defs>
        <radialGradient id={uniqueId} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(50 50) rotate(90) scale(50)">
          <stop stopColor={petalColorStart} />
          <stop offset="1" stopColor={petalColorEnd} />
        </radialGradient>
      </defs>
      <g>
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <path 
            key={i}
            d="M50 50 Q30 20 50 5 Q70 20 50 50" 
            fill={`url(#${uniqueId})`}
            stroke={centerColor} 
            strokeWidth="0.5"
            transform={`rotate(${angle} 50 50)`}
          />
        ))}
      </g>
      <circle cx="50" cy="50" r="8" fill={centerColor} />
      <circle cx="45" cy="45" r="2.5" fill="#FEF3C7" />
      <circle cx="55" cy="45" r="2.5" fill="#FEF3C7" />
      <circle cx="50" cy="55" r="2.5" fill="#FEF3C7" />
    </svg>
  );
};

export const Bud: React.FC<{ className?: string; size?: number; type?: 'apricot' | 'peach' }> = ({ className, size = 20, type = 'apricot' }) => {
  const fillColor = type === 'apricot' ? '#FBBF24' : '#F687B3';
  const strokeColor = type === 'apricot' ? '#B45309' : '#831843';
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
        <path d="M50 90 Q20 50 50 10 Q80 50 50 90" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
    </svg>
  );
};

// ==========================================
// 4. CÀNH HOA XUM XUÊ (Dense Festive Branch)
// ==========================================
interface BranchProps {
    className?: string;
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    type: 'apricot' | 'peach'; 
}

export const FestiveBranch: React.FC<BranchProps> = ({ className, position, type }) => {
  let transformClass = '';
  switch(position) {
      case 'top-left': transformClass = ''; break; 
      case 'top-right': transformClass = '-scale-x-100'; break; 
      case 'bottom-left': transformClass = '-scale-y-100'; break; 
      case 'bottom-right': transformClass = 'rotate-180'; break; 
  }

  return (
    <div className={`relative w-[300px] h-[300px] md:w-[600px] md:h-[600px] pointer-events-none ${transformClass} ${className}`}>
       <svg viewBox="0 0 600 600" className="absolute inset-0 w-full h-full overflow-visible">
           <g>
               <path d="M-10 -10 Q 150 80 280 180 T 500 400" stroke="#3F1908" strokeWidth="16" fill="none" strokeLinecap="round" />
               <path d="M120 70 Q 200 40 320 60" stroke="#4A1D0A" strokeWidth="10" fill="none" strokeLinecap="round" />
               <path d="M220 50 Q 250 10 300 20" stroke="#5D2610" strokeWidth="5" fill="none" strokeLinecap="round" />
               <path d="M200 140 Q 220 250 180 350" stroke="#4A1D0A" strokeWidth="9" fill="none" strokeLinecap="round" />
               <path d="M200 240 Q 260 280 300 290" stroke="#5D2610" strokeWidth="6" fill="none" strokeLinecap="round" />
               <path d="M280 180 Q 400 150 550 180" stroke="#4A1D0A" strokeWidth="8" fill="none" strokeLinecap="round" />
               <path d="M400 160 Q 450 120 500 130" stroke="#5D2610" strokeWidth="5" fill="none" strokeLinecap="round" />
               <path d="M350 250 Q 380 350 450 450" stroke="#4A1D0A" strokeWidth="7" fill="none" strokeLinecap="round" />
           </g>
       </svg>
       {/* Khu vực Gốc */}
       <div className="absolute top-[5%] left-[10%] animate-wiggle"><Bud type={type} size={25} /></div>
       <div className="absolute top-[8%] left-[20%] animate-wiggle-slow"><Flower type={type} size={45} /></div>
       {/* Khu vực Nhánh 1 */}
       <div className="absolute top-[5%] left-[35%] animate-wiggle"><Flower type={type} size={60} /></div>
       <div className="absolute top-[10%] left-[45%] animate-wiggle-reverse"><Flower type={type} size={40} /></div>
       <div className="absolute top-[2%] left-[50%] animate-wiggle"><Bud type={type} size={20} /></div>
       <div className="absolute top-[8%] left-[28%] animate-wiggle-slow"><Flower type={type} size={30} /></div>
       {/* Khu vực Nhánh 2 */}
       <div className="absolute top-[25%] left-[30%] animate-wiggle-slow"><Flower type={type} size={65} /></div>
       <div className="absolute top-[35%] left-[28%] animate-wiggle"><Flower type={type} size={50} /></div>
       <div className="absolute top-[45%] left-[32%] animate-wiggle-reverse"><Flower type={type} size={40} /></div>
       <div className="absolute top-[55%] left-[30%] animate-wiggle"><Bud type={type} size={25} /></div>
       <div className="absolute top-[40%] left-[40%] animate-wiggle-slow"><Flower type={type} size={35} /></div>
       {/* Khu vực Nhánh 3 */}
       <div className="absolute top-[25%] left-[55%] animate-wiggle"><Flower type={type} size={55} /></div>
       <div className="absolute top-[20%] left-[65%] animate-wiggle-reverse"><Flower type={type} size={45} /></div>
       <div className="absolute top-[28%] left-[75%] animate-wiggle"><Flower type={type} size={50} /></div>
       <div className="absolute top-[18%] left-[80%] animate-wiggle-slow"><Bud type={type} size={22} /></div>
       <div className="absolute top-[30%] left-[50%] animate-wiggle"><Flower type={type} size={35} /></div>
       {/* Khu vực Nhánh 4 */}
       <div className="absolute top-[50%] left-[60%] animate-wiggle-slow"><Flower type={type} size={60} /></div>
       <div className="absolute top-[60%] left-[70%] animate-wiggle"><Flower type={type} size={40} /></div>
       <div className="absolute top-[68%] left-[75%] animate-wiggle-reverse"><Bud type={type} size={20} /></div>
       {/* Cụm hoa nhỏ đan xen */}
       <div className="absolute top-[15%] left-[40%] animate-wiggle"><Flower type={type} size={25} opacity={0.8} /></div>
       <div className="absolute top-[30%] left-[60%] animate-wiggle-reverse"><Flower type={type} size={28} opacity={0.9} /></div>
       <div className="absolute top-[55%] left-[50%] animate-wiggle"><Flower type={type} size={30} opacity={0.8} /></div>

       <Lantern className="top-[40%] left-[30%]" delay="0.5s" />
       <RedEnvelope className="top-[30%] left-[70%]" delay="1.2s" />
       <Lantern className="top-[10%] left-[55%] scale-75" delay="2.0s" color="#B91C1C" />
       <RedEnvelope className="top-[60%] left-[65%]" delay="0.8s" />
    </div>
  );
};

export const OchnaBranch: React.FC<{ className?: string; position: 'top-left' | 'bottom-right' }> = (props) => (
    <FestiveBranch {...props} type="apricot" position={props.position === 'top-left' ? 'top-left' : 'bottom-right'} />
);

export const StylizedHorse: React.FC<{ className?: string }> = ({ className }) => (
    <div className={`relative group ${className} flex items-center justify-center`}>
        <img src="./1.png" alt="Mã Đáo Thành Công" className="w-full h-full object-contain drop-shadow-[0_10px_30px_rgba(234,179,8,0.6)] animate-[float_4s_ease-in-out_infinite] transition-transform duration-300 group-hover:scale-110 filter hue-rotate-15 contrast-125" />
    </div>
);

export const CornerOrnament: React.FC<{ className?: string; rotate?: number }> = ({ className, rotate = 0 }) => (
  <svg viewBox="0 0 100 100" className={className} style={{ transform: `rotate(${rotate}deg)` }} width="100%" height="100%">
    <path d="M10 10 L40 10 L40 14 L14 14 L14 40 L10 40 Z" fill="#FCD34D" />
    <path d="M18 18 L35 18 L35 20 L20 20 L20 35 L18 35 Z" fill="#B45309" opacity="0.6" />
    <circle cx="10" cy="10" r="3" fill="#FCD34D" />
  </svg>
);

export const GodRays: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
    <div className="w-[200vmax] h-[200vmax] animate-[spin_60s_linear_infinite] opacity-20">
      <div style={{ width: '100%', height: '100%', background: 'conic-gradient(from 0deg, transparent 0deg, #FCD34D 20deg, transparent 40deg, #FCD34D 60deg, transparent 80deg, #FCD34D 100deg, transparent 120deg, transparent 360deg)', maskImage: 'radial-gradient(circle, transparent 10%, black 80%)', WebkitMaskImage: 'radial-gradient(circle, transparent 10%, black 80%)' }} />
    </div>
  </div>
);

// NEW: Asian Cloud for Background
export const AsianCloud: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 60" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M10 50 C 0 50, 0 30, 10 30 C 10 15, 30 10, 40 20 C 45 5, 65 5, 75 20 C 90 15, 100 30, 95 45 C 90 55, 80 50, 80 50 H 10" />
    <path d="M20 50 Q 30 40 40 50" opacity="0.5" />
    <path d="M60 50 Q 70 40 80 50" opacity="0.5" />
  </svg>
);

// NEW: Lucky Coin for Background
export const LuckyCoin: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 40 40" className={className}>
        <circle cx="20" cy="20" r="18" fill="#FCD34D" stroke="#B45309" strokeWidth="2" />
        <rect x="12" y="12" width="16" height="16" fill="none" stroke="#B45309" strokeWidth="2" />
        <circle cx="20" cy="20" r="14" fill="none" stroke="#B45309" strokeWidth="1" opacity="0.5" />
        <path d="M20 5 L20 12 M20 28 L20 35 M5 20 L12 20 M28 20 L35 20" stroke="#B45309" strokeWidth="2" />
    </svg>
);