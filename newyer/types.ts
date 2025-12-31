export interface Wish {
  id: string;
  sender: string;
  recipient: string;
  message: string;
  image?: string; // Optional image URL
  color: string; // Tailwind color class for glow/accents
  theme?: 'gold' | 'red' | 'pink' | 'cyan';
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
}

export type AppState = 'login' | 'generating' | 'slideshow' | 'end';