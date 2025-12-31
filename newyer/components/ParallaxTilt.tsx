import React, { useRef, useState, MouseEvent } from 'react';
import gsap from 'gsap';

interface ParallaxTiltProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

const ParallaxTilt: React.FC<ParallaxTiltProps> = ({ children, className = "", intensity = 15 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    setActive(true);

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left; // Mouse position inside element
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -intensity; // Invert Y for tilt
    const rotateY = ((x - centerX) / centerX) * intensity;

    gsap.to(ref.current, {
      rotateX: rotateX,
      rotateY: rotateY,
      scale: 1.02,
      duration: 0.5,
      ease: 'power2.out',
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = () => {
    setActive(false);
    if (!ref.current) return;
    
    gsap.to(ref.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.8,
      ease: 'elastic.out(1, 0.5)',
    });
  };

  return (
    <div 
      className={`perspective-[1000px] ${className}`} // Preserve 3D space
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={ref} className="transform-style-3d transition-shadow duration-300">
         {/* Glossy Reflection Overlay */}
         {active && (
             <div 
                className="absolute inset-0 z-50 pointer-events-none rounded-[inherit] bg-gradient-to-tr from-transparent via-white/10 to-transparent mix-blend-overlay"
                style={{ transform: 'translateZ(1px)' }} // Float above
             ></div>
         )}
         {children}
      </div>
    </div>
  );
};

export default ParallaxTilt;