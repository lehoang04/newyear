import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  color: string;
}

const MagicMouseTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const points = useRef<Point[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const lastMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const addPoint = (x: number, y: number) => {
      // Create Gold and Red particles
      const colors = ['#FCD34D', '#F59E0B', '#FFFFFF', '#DC2626'];
      const count = Math.random() > 0.5 ? 2 : 1; // Random density

      for (let i = 0; i < count; i++) {
        points.current.push({
          x: x,
          y: y,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 1,
          size: Math.random() * 3 + 1,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      // Interpolate points for smooth trail even when moving fast
      const dist = Math.hypot(mouse.current.x - lastMouse.current.x, mouse.current.y - lastMouse.current.y);
      if (dist > 5) {
         addPoint(mouse.current.x, mouse.current.y);
         lastMouse.current = { ...mouse.current };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
        if(e.touches.length > 0) {
            const t = e.touches[0];
            mouse.current = { x: t.clientX, y: t.clientY };
            addPoint(t.clientX, t.clientY);
        }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = points.current.length - 1; i >= 0; i--) {
        const p = points.current[i];
        p.life -= 0.02; // Fade speed
        p.x += p.vx;
        p.y += p.vy;

        if (p.life <= 0) {
          points.current.splice(i, 1);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.life;
          ctx.fill();
          
          // Optional: Add glow
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.color;
        }
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-[100] pointer-events-none mix-blend-screen"
    />
  );
};

export default MagicMouseTrail;