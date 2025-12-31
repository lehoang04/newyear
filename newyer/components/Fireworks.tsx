import React, { useEffect, useRef } from 'react';

// Cấu hình pháo hoa
const PARTICLE_COUNT = 150; 
const GRAVITY = 0.04; 
const FRICTION = 0.97;
const COLORS = ['#d946ef', '#22d3ee', '#facc15', '#ffffff', '#ff0000', '#00ff00', '#ffaa00'];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  decay: number;
}

interface FireworksProps {
  intensity?: 'low' | 'high';
}

const Fireworks: React.FC<FireworksProps> = ({ intensity = 'low' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);

  // Hàm tạo pháo hoa
  const createExplosion = (x: number, y: number, isBig = false) => {
    // Nếu là chế độ big (finale), tăng số lượng hạt gấp đôi
    const count = isBig ? PARTICLE_COUNT * 2 : PARTICLE_COUNT;
    
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const speed = Math.random() * (isBig ? 12 : 6) + 2; 
      
      particles.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed * Math.random(),
        vy: Math.sin(angle) * speed * Math.random(),
        alpha: 1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        decay: Math.random() * 0.01 + 0.005 
      });
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let autoLaunchInterval: NodeJS.Timeout;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const startAutoLaunch = () => {
      if (autoLaunchInterval) clearInterval(autoLaunchInterval);

      if (intensity === 'high') {
        // SUPER MASSIVE MODE
        autoLaunchInterval = setInterval(() => {
          // Bắn chùm 3-5 quả cùng lúc
          const shots = Math.floor(Math.random() * 3) + 3;
          for(let i=0; i<shots; i++) {
             createExplosion(
              Math.random() * canvas.width,
              Math.random() * (canvas.height * 0.7), // Nổ cao hơn chút
              true // Big explosion
            );
          }
        }, 300); // Tốc độ bắn cực nhanh
      } else {
        // LOW MODE
        autoLaunchInterval = setInterval(() => {
          if (Math.random() > 0.7) {
            createExplosion(
              Math.random() * canvas.width,
              Math.random() * (canvas.height * 0.5)
            );
          }
        }, 1000);
      }
    };

    startAutoLaunch();

    const loop = () => {
      // Trail effect
      ctx.fillStyle = 'rgba(20, 5, 5, 0.2)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        p.vx *= FRICTION;
        p.vy *= FRICTION;
        p.vy += GRAVITY;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.current.splice(i, 1);
        } else {
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, intensity === 'high' ? 3 : 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      clearInterval(autoLaunchInterval);
    };
  }, [intensity]); 

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    createExplosion(e.clientX, e.clientY, true);
  };

  return (
    <canvas
      ref={canvasRef}
      onClick={handleClick}
      className="fixed top-0 left-0 w-full h-full pointer-events-auto z-0 cursor-crosshair"
      style={{ touchAction: 'none' }}
    />
  );
};

export default Fireworks;