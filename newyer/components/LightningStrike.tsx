import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

interface LightningStrikeProps {
  trigger: boolean;
  onComplete: () => void;
}

const LightningStrike: React.FC<LightningStrikeProps> = ({ trigger, onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (!trigger) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Flash Effect
    setFlash(true);
    setTimeout(() => setFlash(false), 150); // Quick flash

    // Shake Screen
    gsap.to("body", { 
        x: "random(-20, 20)", 
        y: "random(-20, 20)", 
        duration: 0.1, 
        repeat: 5, 
        yoyo: true, 
        onComplete: () => gsap.set("body", { x: 0, y: 0 }) 
    });

    // Generate Lightning Path
    const drawLightning = (x1: number, y1: number, x2: number, y2: number, displace: number) => {
      if (displace < 1) {
        ctx.lineTo(x2, y2);
        return;
      }
      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2;
      const midX_displaced = midX + (Math.random() - 0.5) * displace;
      const midY_displaced = midY + (Math.random() - 0.5) * displace;
      
      drawLightning(x1, y1, midX_displaced, midY_displaced, displace / 2);
      drawLightning(midX_displaced, midY_displaced, x2, y2, displace / 2);
    };

    const animateBolt = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Main Bolt
        ctx.beginPath();
        ctx.strokeStyle = "#FCD34D"; // Gold Lightning
        ctx.lineWidth = 4;
        ctx.shadowBlur = 20;
        ctx.shadowColor = "#FFFFFF";
        ctx.moveTo(canvas.width / 2, 0); // Start from top center
        
        // Strike to random bottom point
        drawLightning(canvas.width / 2, 0, Math.random() * canvas.width, canvas.height, 300);
        ctx.stroke();

        // Secondary Branches
        for(let i=0; i<3; i++) {
             ctx.beginPath();
             ctx.lineWidth = 2;
             ctx.moveTo(canvas.width / 2, 0);
             drawLightning(canvas.width / 2, 0, Math.random() * canvas.width, canvas.height * 0.8, 200);
             ctx.stroke();
        }

        // Fade out
        gsap.to(canvas, { opacity: 0, duration: 0.5, onComplete });
    };

    animateBolt();

  }, [trigger, onComplete]);

  if (!trigger) return null;

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 z-[100] pointer-events-none" />
      <div className={`fixed inset-0 z-[101] bg-white pointer-events-none transition-opacity duration-100 ${flash ? 'opacity-80' : 'opacity-0'}`}></div>
    </>
  );
};

export default LightningStrike;