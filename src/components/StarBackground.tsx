import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface StarBackgroundProps {
  className?: string;
}

// 生成随机星星
const generateStars = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    opacity: Math.random() * 0.8 + 0.2,
    twinkleRate: Math.random() * 3 + 2,
  }));
};

export const StarBackground: React.FC<StarBackgroundProps> = ({ className }) => {
  const controls = useAnimation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stars = generateStars(200); // 生成200颗背景星星
  
  // 创建更动态的背景效果
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // 设置canvas尺寸
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // 绘制星云效果
    const drawNebula = () => {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 创建渐变背景
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#0a0a1a');
      gradient.addColorStop(0.5, '#1a0a2a');
      gradient.addColorStop(1, '#0a0a1a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // 绘制几个大的星云团
      const drawCloud = (x: number, y: number, size: number, opacity: number) => {
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 100, 200, ${opacity})`;
        ctx.fill();
      };
      
      // 随机位置的星云
      for (let i = 0; i < 5; i++) {
        drawCloud(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          Math.random() * 100 + 50,
          Math.random() * 0.1 + 0.02
        );
      }
    };
    
    drawNebula();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* 画布背景（星云效果） */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full z-0"
      />
      
      {/* 动态星星 */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            boxShadow: `0 0 ${star.size * 2}px ${star.size}px rgba(255, 255, 255, ${star.opacity / 2})`,
          }}
          animate={{
            opacity: [star.opacity * 0.7, star.opacity, star.opacity * 0.7],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: star.twinkleRate,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.5, 1],
          }}
        />
      ))}
      
      {/* 银河效果 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/5 to-transparent z-0 pointer-events-none"></div>
    </div>
  );
};