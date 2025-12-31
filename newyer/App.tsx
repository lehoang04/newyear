import React, { useState } from 'react';
import Fireworks from './components/Fireworks';
import Countdown from './components/Countdown';
import MusicPlayer from './components/MusicPlayer';
import LoginView from './components/LoginView';
import SlideShow from './components/SlideShow';
import EndView from './components/EndView';
import LuckyMoneyPopup from './components/LuckyMoneyPopup';
import MagicMouseTrail from './components/MagicMouseTrail';
import TimeWarp from './components/TimeWarp';
import MatrixRain from './components/MatrixRain';
import { AppState, Wish } from './types';
import { Sparkles } from 'lucide-react';
import { ROLE_BASED_WISHES, NAME_TO_ROLE_MAPPING, WISH_BACKGROUNDS } from './data/customWishes';
import { AsianCloud, LuckyCoin, ShootingStar, SpiritHorseRun } from './components/Decorations';

// Extend AppState to include 'warping'
type ExtendedAppState = AppState | 'warping';

const App: React.FC = () => {
  const [appState, setAppState] = useState<ExtendedAppState>('login');
  const [userName, setUserName] = useState('');
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [fireworkIntensity, setFireworkIntensity] = useState<'low' | 'high'>('low');
  const [showLuckyMoney, setShowLuckyMoney] = useState(false);

  // Lời chúc chung (General Wishes) dùng để bù vào cho đủ 5 câu nếu thiếu
  const GENERAL_WISHES = [
    { text: "Kính chúc một năm mới An Khang Thịnh Vượng, Vạn Sự Như Ý.", theme: "gold" },
    { text: "Năm Bính Ngọ 2026, chúc bạn sức khỏe dồi dào, tài lộc đầy nhà.", theme: "red" },
    { text: "Chúc năm mới bình an, may mắn và ngập tràn hạnh phúc.", theme: "pink" },
    { text: "Cầu mong năm mới mang lại nhiều niềm vui và thành công rực rỡ.", theme: "cyan" },
    { text: "Chúc một năm mới thắng lợi mới, thành công mới, vinh quang mới.", theme: "gold" },
    { text: "Xuân về mang đến hy vọng và những khởi đầu tốt đẹp nhất.", theme: "red" },
    { text: "Chúc bạn luôn giữ vững niềm tin và gặt hái được nhiều trái ngọt.", theme: "gold" }
  ];

  const generateWishes = (name: string) => {
    // 1. Chuẩn hóa tên nhập vào
    const normalizedInput = name.toLowerCase().trim();
    
    let selectedWishesData: { text: string; theme: string }[] = [];
    let roleKey = '';
    let senderName = 'Lời Chúc Tết';

    // 2. LOGIC TÌM KIẾM THÔNG MINH
    if (NAME_TO_ROLE_MAPPING[normalizedInput]) {
      roleKey = NAME_TO_ROLE_MAPPING[normalizedInput]; 
    } else if (ROLE_BASED_WISHES[normalizedInput]) {
      roleKey = normalizedInput;
    }

    // 3. LẤY DỮ LIỆU
    if (roleKey && ROLE_BASED_WISHES[roleKey]) {
      selectedWishesData = [...ROLE_BASED_WISHES[roleKey]];
      if (NAME_TO_ROLE_MAPPING[normalizedInput]) {
         const capitalizedRole = roleKey.charAt(0).toUpperCase() + roleKey.slice(1);
         senderName = `Gửi ${capitalizedRole} ${name}`; 
      } else {
         senderName = `Dành tặng ${name}`;
      }
    } else {
      selectedWishesData = [];
      senderName = `Gửi ${name}`;
    }

    // 4. LOGIC ĐẢM BẢO ĐỦ 5 CÂU
    if (selectedWishesData.length < 5) {
      const needed = 5 - selectedWishesData.length;
      const shuffledGeneral = [...GENERAL_WISHES].sort(() => 0.5 - Math.random());
      const fillers = shuffledGeneral.slice(0, needed);
      selectedWishesData = [...selectedWishesData, ...fillers];
    }
    
    if (selectedWishesData.length > 5) {
      selectedWishesData = selectedWishesData.slice(0, 5);
    }

    const formattedWishes: Wish[] = selectedWishesData.map((t, index) => ({
      id: index.toString(),
      sender: senderName,
      recipient: name,
      message: t.text,
      color: t.theme === 'red' ? 'shadow-red-500' : 'shadow-yellow-500', 
      image: WISH_BACKGROUNDS[index % WISH_BACKGROUNDS.length],
      theme: t.theme as any
    }));

    setWishes(formattedWishes);
    setUserName(name);
    // TRIGGER THE TIME WARP
    setAppState('warping');
  };

  const handleWarpComplete = () => {
      setAppState('slideshow');
  };

  const handleReplay = () => {
    setAppState('slideshow');
    setFireworkIntensity('low');
  };

  const handleHome = () => {
    setUserName('');
    setWishes([]);
    setAppState('login');
    setFireworkIntensity('low');
  };

  const handleStartFireworksShow = () => {
    setFireworkIntensity('high');
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden text-white selection:bg-yellow-500 selection:text-red-900 bg-[#450a0a]">
      
      {/* TIME WARP LAYER (Above background, below content) */}
      <TimeWarp active={appState === 'warping'} onWarpComplete={handleWarpComplete} />

      {/* MAGIC MOUSE TRAIL */}
      <MagicMouseTrail />
      
      {/* MATRIX RAIN BACKGROUND (NEW) */}
      <MatrixRain />

      {/* LUXURIOUS BACKGROUND (Hidden during Warp to focus on speed lines) */}
      <div className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-500 ${appState === 'warping' ? 'opacity-0' : 'opacity-100'}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#2c0505] via-[#5a0c0c] to-[#2c0505] opacity-90"></div>
        <div className="absolute inset-0 opacity-10" 
             style={{ 
               backgroundImage: `
                 radial-gradient(circle at 50% 50%, #FCD34D 1px, transparent 1px),
                 radial-gradient(circle at 0% 0%, #FCD34D 1px, transparent 1px)
               `,
               backgroundSize: '40px 40px'
             }}>
        </div>
        
        {/* SHOOTING STARS */}
        <div className="absolute inset-0 overflow-hidden">
           <ShootingStar />
           <ShootingStar />
        </div>

        {/* SPIRIT HORSE RUNNING */}
        <SpiritHorseRun />

        {/* Floating Decoration Elements */}
        <div className="absolute top-[10%] left-[5%] text-red-800/20 w-48 h-32 animate-[float_20s_infinite_linear]"><AsianCloud className="w-full h-full" /></div>
        <div className="absolute top-[20%] right-[10%] text-yellow-600/10 w-64 h-40 animate-[float_25s_infinite_reverse_linear]"><AsianCloud className="w-full h-full" /></div>
        <div className="absolute bottom-[15%] left-[15%] text-red-800/20 w-56 h-36 animate-[float_22s_infinite_linear]"><AsianCloud className="w-full h-full" /></div>

        <div className="absolute top-1/4 left-1/3 animate-[spin_8s_infinite_linear] opacity-20"><LuckyCoin className="w-8 h-8 md:w-12 md:h-12" /></div>
        <div className="absolute bottom-1/3 right-1/4 animate-[spin_10s_infinite_reverse_linear] opacity-20"><LuckyCoin className="w-6 h-6 md:w-10 md:h-10" /></div>
      </div>

      {/* Fireworks (Hidden during Warp) */}
      <div className={`transition-opacity duration-1000 ${appState === 'warping' ? 'opacity-0' : (appState === 'slideshow' || appState === 'end' ? 'opacity-40' : 'opacity-80')}`}>
        <Fireworks intensity={fireworkIntensity} />
      </div>

      <div className="relative z-10 w-full min-h-screen flex flex-col items-center">
        
        {/* Header */}
        <header className={`absolute top-0 left-0 w-full p-4 md:p-6 flex flex-col md:flex-row justify-between items-center z-50 transition-all duration-700 ${appState !== 'login' ? 'opacity-0 -translate-y-full md:opacity-100 md:translate-y-0 pointer-events-none md:pointer-events-auto' : 'opacity-100'}`}>
          <div className="flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 font-dancing text-2xl md:text-3xl font-bold drop-shadow-md mb-2 md:mb-0">
            <Sparkles size={24} className="text-yellow-400" />
            <span>Tết Bính Ngọ 2026</span>
          </div>
          <Countdown />
        </header>

        {/* View Routing */}
        {appState === 'login' && <LoginView onNameSubmit={generateWishes} />}

        {appState === 'warping' && (
            <div className="flex items-center justify-center h-screen z-50">
                <div className="text-4xl md:text-6xl font-black font-orbitron text-white animate-pulse tracking-[0.5em] text-center drop-shadow-[0_0_30px_#FCD34D]">
                    TIME WARP<br/>
                    <span className="text-xl md:text-2xl text-yellow-400 block mt-4 tracking-normal font-mono">DESTINATION: 2026</span>
                </div>
            </div>
        )}

        {appState === 'slideshow' && (
          <div className="w-full h-screen flex flex-col">
            <div className="flex-1 relative">
              <SlideShow wishes={wishes} userName={userName} onComplete={() => setAppState('end')} />
            </div>
          </div>
        )}

        {appState === 'end' && (
          <EndView 
            onReplay={handleReplay} 
            onHome={handleHome} 
            onStartShow={handleStartFireworksShow} 
            onLuckyMoney={() => setShowLuckyMoney(true)}
          />
        )}

      </div>
      
      {/* Lucky Money Overlay */}
      {showLuckyMoney && <LuckyMoneyPopup onClose={() => setShowLuckyMoney(false)} />}
      
      <MusicPlayer />
    </div>
  );
};

export default App;