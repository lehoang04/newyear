import React, { useState, useEffect } from 'react';
import { TARGET_DATE } from '../constants';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown: React.FC = () => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +TARGET_DATE - +new Date();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit: React.FC<{ value: number; label: string; }> = ({ value, label }) => (
    <div className="flex flex-col items-center mx-2 md:mx-4">
      <span className="text-2xl md:text-4xl font-black font-orbitron text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600 drop-shadow-[0_2px_10px_rgba(234,179,8,0.5)]">
        {value < 10 ? `0${value}` : value}
      </span>
      <span className="text-[10px] md:text-xs text-yellow-100/70 font-bold mt-1 uppercase tracking-widest">{label}</span>
    </div>
  );

  return (
    <div className="flex items-center justify-center mt-0 z-10 relative">
      <TimeUnit value={timeLeft.days} label="Ngày" />
      <div className="text-yellow-600/50 text-2xl pb-4 font-light">:</div>
      <TimeUnit value={timeLeft.hours} label="Giờ" />
      <div className="text-yellow-600/50 text-2xl pb-4 font-light">:</div>
      <TimeUnit value={timeLeft.minutes} label="Phút" />
      <div className="text-yellow-600/50 text-2xl pb-4 font-light">:</div>
      <TimeUnit value={timeLeft.seconds} label="Giây" />
    </div>
  );
};

export default Countdown;