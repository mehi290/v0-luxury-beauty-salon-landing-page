'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorFollower() {
  const [isMounted, setIsMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the "luxury" lag feel
  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const dotSpringConfig = { damping: 40, stiffness: 800 };
  const dotX = useSpring(mouseX, dotSpringConfig);
  const dotY = useSpring(mouseY, dotSpringConfig);

  useEffect(() => {
    setIsMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.getAttribute('role') === 'button';
      
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] hidden lg:block">
      {/* Large Ambient Glow */}
      <motion.div
        className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full opacity-20"
        style={{
          x: smoothX,
          y: smoothY,
          left: -200,
          top: -200,
          background: 'radial-gradient(circle, rgba(201, 169, 110, 0.4) 0%, rgba(201, 169, 110, 0) 70%)',
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: 'spring', damping: 20 }}
      />

      {/* Outer Ring */}
      <motion.div
        className="absolute top-0 left-0 border border-primary/30 rounded-full flex items-center justify-center translate-gpu"
        style={{
          x: smoothX,
          y: smoothY,
          left: -20,
          top: -20,
          width: 40,
          height: 40,
          scale: isHovering ? 2 : 1,
          backgroundColor: isHovering ? 'rgba(201, 169, 110, 0.1)' : 'transparent',
          mixBlendMode: isHovering ? 'difference' : 'normal',
        }}
      />

      {/* Sharp Center Dot */}
      <motion.div
        className="absolute top-0 left-0 w-1.5 h-1.5 bg-primary rounded-full translate-gpu"
        style={{
          x: dotX,
          y: dotY,
          left: -3,
          top: -3,
        }}
      />
    </div>
  );
}
