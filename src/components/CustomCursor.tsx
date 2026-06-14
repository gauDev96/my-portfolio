import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [hoveredType, setHoveredType] = useState<'default' | 'button' | 'card' | 'input' | 'expand'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Position coordinates using Framer Motion values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for trailing effect
  const springConfig = { damping: 30, stiffness: 300, mass: 0.6 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device is touch-first or narrow screen
    const touchQuery = window.matchMedia('(pointer: coarse)');
    const checkDevice = () => {
      setIsMobile(touchQuery.matches || window.innerWidth <= 768);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    touchQuery.addEventListener('change', checkDevice);

    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 16); // Center the 32px circle
      mouseY.set(e.clientY - 16);
      
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Generic selector scanner
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const clickable = target.closest('button, a, [role="button"]');
      const card = target.closest('.glass-card, [data-cursor="card"]');
      const textInput = target.closest('input, textarea, [contenteditable="true"]');
      const expandTarget = target.closest('[data-cursor="expand"]');

      if (expandTarget) {
        setHoveredType('expand');
      } else if (clickable) {
        setHoveredType('button');
      } else if (card) {
        setHoveredType('card');
      } else if (textInput) {
        setHoveredType('input');
      } else {
        setHoveredType('default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('resize', checkDevice);
      touchQuery.removeEventListener('change', checkDevice);
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isMobile, isVisible, mouseX, mouseY]);

  if (isMobile || !isVisible) return null;

  // Render reactive pointer styles
  const getScale = () => {
    switch (hoveredType) {
      case 'button': return 1.6;
      case 'card': return 1.3;
      case 'input': return 0.5;
      case 'expand': return 2.2;
      default: return 1;
    }
  };

  const getBorderColor = () => {
    switch (hoveredType) {
      case 'button': return 'rgba(56, 189, 248, 0.9)'; // Cyan
      case 'card': return 'rgba(168, 85, 247, 0.8)'; // Purple
      case 'expand': return 'rgba(6, 182, 212, 0.9)';
      default: return 'rgba(255, 255, 255, 0.4)';
    }
  };

  const getBgColor = () => {
    switch (hoveredType) {
      case 'button': return 'rgba(56, 189, 248, 0.15)';
      case 'card': return 'rgba(168, 85, 247, 0.08)';
      case 'expand': return 'rgba(6, 182, 212, 0.2)';
      default: return 'rgba(255, 255, 255, 0)';
    }
  };

  return (
    <>
      {/* Glow Trailing Circle */}
      <motion.div
        ref={cursorRef}
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: getScale(),
          borderColor: getBorderColor(),
          backgroundColor: getBgColor(),
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 pointer-events-none z-[9999] pointer-events-none transition-shadow"
        id="custom-cursor-main"
      />

      {/* Internal Dot */}
      <motion.div
        ref={cursorDotRef}
        style={{
          x: mouseX,
          y: mouseY,
          // Shift to center of circle (16px outer - 2px inner half)
          marginLeft: '14px',
          marginTop: '14px',
        }}
        animate={{
          scale: hoveredType === 'input' ? 4 : 1,
          backgroundColor: hoveredType === 'button' ? '#38bdf8' : hoveredType === 'card' ? '#a855f7' : '#ffffff',
        }}
        className="fixed top-0 left-0 w-1 h-1 rounded-full pointer-events-none z-[10000]"
        id="custom-cursor-dot"
      />
    </>
  );
}
