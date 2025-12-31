import React, { useEffect, useRef } from 'react';

const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Characters: Mix of Binary and Vietnamese/Chinese Lucky Characters
    const chars = "012026PHUCLOCTHOTAIXUANVANSUNHUYABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const charArray = chars.split("");
    
    const fontSize = 16;
    const columns = width / fontSize;

    // An array of drops - one per column
    const drops: number[] = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * height; // Start at random positions
    }

    const draw = () => {
      // Black BG for the trail effect
      ctx.fillStyle = "rgba(69, 10, 10, 0.05)"; // Deep red fade
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px 'Orbitron', monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Random Lucky Colors: Gold, Red, Cyan
        const colors = ["#FCD34D", "#F59E0B", "#DC2626", "#EF4444", "#22D3EE"];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        
        // Glow effect
        ctx.shadowBlur = 5;
        ctx.shadowColor = color;
        ctx.fillStyle = color;
        
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to top randomly after it has crossed the screen
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Increment Y coordinate
        drops[i]++;
      }
      ctx.shadowBlur = 0; // Reset glow for performance
    };

    const interval = setInterval(draw, 33); // ~30FPS

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none opacity-30 mix-blend-screen"
    />
  );
};

export default MatrixRain;