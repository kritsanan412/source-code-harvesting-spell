
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

interface Sparkle {
  id: string;
  createdAt: number;
  color: string;
  size: number;
  style: {
    top: string;
    left: string;
    zIndex: number;
  };
}

interface MagicSparklesProps {
  children?: React.ReactNode;
  className?: string;
}

const generateSparkle = (): Sparkle => {
  const colors = [
    '#9b87f5', // Magic Primary
    '#7E69AB', // Magic Secondary
    '#D6BCFA', // Magic Light
  ];
  
  return {
    id: String(Math.random()),
    createdAt: Date.now(),
    color: colors[Math.floor(Math.random() * colors.length)],
    size: Math.random() * 10 + 5,
    style: {
      top: Math.random() * 100 + '%',
      left: Math.random() * 100 + '%',
      zIndex: 1,
    },
  };
};

const MagicSparkles: React.FC<MagicSparklesProps> = ({ children, className }) => {
  const [sparkles, setSparkles] = useState<Sparkle[]>(() => {
    return Array.from({ length: 10 }, () => generateSparkle());
  });
  
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const nextSparkles = sparkles.filter(sparkle => {
        const delta = now - sparkle.createdAt;
        return delta < 1000;
      });
      
      nextSparkles.push(generateSparkle());
      setSparkles(nextSparkles);
    }, 100);
    
    return () => clearInterval(interval);
  }, [sparkles]);
  
  return (
    <div className={cn("relative inline-block", className)}>
      {sparkles.map(sparkle => (
        <svg
          key={sparkle.id}
          width={sparkle.size}
          height={sparkle.size}
          viewBox="0 0 160 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute animate-ping"
          style={sparkle.style}
        >
          <path
            d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
            fill={sparkle.color}
          />
        </svg>
      ))}
      {children}
    </div>
  );
};

export default MagicSparkles;
