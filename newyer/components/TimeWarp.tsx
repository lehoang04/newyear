import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  z: number;
  pz: number;
}

interface TimeWarpProps {
  active: boolean; // True triggers the warp speed
  onWarpComplete?: () => void;
}

const TimeWarp: React.FC<TimeWarpProps> = ({ active, onWarpComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const speedRef = useRef(0.1); // Base speed
  const warpFactorRef = useRef(0);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let cx = 0;
    let cy = 0;

    const initStars = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      cx = width / 2;
      cy = height / 2;

      starsRef.current = [];
      for (let i = 0; i < 800; i++) {
        starsRef.current.push({
          x: Math.random() * width - cx,
          y: Math.random() * height - cy,
          z: Math.random() * width,
          pz: Math.random() * width
        });
      }
    };

    initStars();
    window.addEventListener('resize', initStars);

    const animate = () => {
      // Clear with trail effect during warp
      if (active) {
          ctx.fillStyle = 'rgba(69, 10, 10, 0.3)'; // Reddish trail
      } else {
          ctx.fillStyle = '#450a0a'; // Solid background
      }
      ctx.fillRect(0, 0, width, height);

      // Handle Warp Speed Physics
      if (active) {
        if (speedRef.current < 50) speedRef.current += 1; // Accelerate
        warpFactorRef.current += 0.02;
      } else {
         speedRef.current = 0.5; // Idle speed
         warpFactorRef.current = 0;
      }

      const speed = speedRef.current;

      for (let i = 0; i < starsRef.current.length; i++) {
        const star = starsRef.current[i];
        
        // Update Z
        star.z -= speed;

        // Reset star if it passes camera
        if (star.z <= 0) {
          star.z = width;
          star.x = Math.random() * width - cx;
          star.y = Math.random() * height - cy;
          star.pz = width;
        }

        // Project 3D to 2D
        const x = cx + star.x / (star.z * 0.001); // Perspective math
        const y = cy + star.y / (star.z * 0.001);

        // Previous position for trails
        const px = cx + star.x / (star.pz * 0.001);
        const py = cy + star.y / (star.pz * 0.001);

        star.pz = star.z;

        // Draw
        const s = (1 - star.z / width); // Size based on depth
        const size = s * 3;
        
        ctx.beginPath();
        
        if (active) {
             // Warp Lines
             ctx.strokeStyle = `rgba(252, 211, 77, ${s})`; // Gold lines
             ctx.lineWidth = size;
             ctx.moveTo(px, py);
             ctx.lineTo(x, y);
             ctx.stroke();
        } else {
             // Idle Stars
             ctx.fillStyle = `rgba(255, 255, 255, ${s})`;
             ctx.arc(x, y, size, 0, Math.PI * 2);
             ctx.fill();
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Trigger complete callback after some time if active
    if (active && onWarpComplete) {
        const timer = setTimeout(onWarpComplete, 2500); // 2.5s warp duration
        return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener('resize', initStars);
      cancelAnimationFrame(animationRef.current);
    };
  }, [active, onWarpComplete]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`fixed inset-0 z-[5] transition-opacity duration-1000 pointer-events-none ${active ? 'opacity-100' : 'opacity-60'}`}
    />
  );
};

export default TimeWarp;