import React from 'react';
import { Wish } from '../types';
import { Gift } from 'lucide-react';

interface WishCardProps {
  wish: Wish;
  onClick: (wish: Wish) => void;
}

const WishCard: React.FC<WishCardProps> = ({ wish, onClick }) => {
  return (
    <div
      onClick={() => onClick(wish)}
      className={`
        relative group cursor-pointer 
        backdrop-blur-md bg-white/5 
        border border-white/10 hover:border-white/40 
        rounded-2xl p-6 transition-all duration-300 
        hover:transform hover:-translate-y-2 hover:shadow-2xl 
        hover:${wish.color} flex flex-col items-center justify-center
        w-full aspect-[4/5] max-w-sm
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="bg-white/10 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
        <Gift className="w-8 h-8 text-white" />
      </div>
      
      <h3 className="text-xl font-bold text-white mb-2 font-playfair">{wish.recipient}</h3>
      <p className="text-sm text-gray-400 font-light">Từ: {wish.sender}</p>
      
      <div className="mt-4 px-3 py-1 rounded-full border border-white/20 text-xs text-cyan-300 opacity-50 group-hover:opacity-100 transition-opacity">
        Nhấn để mở
      </div>
    </div>
  );
};

export default WishCard;
