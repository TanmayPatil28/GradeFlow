"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";

interface ThreeDProgressProps {
  progress?: number;
  size?: number;
  strokeWidth?: number;
}

export default function ThreeDProgress({
  progress = 75,
  size = 140,
  strokeWidth = 10,
}: ThreeDProgressProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  // Mouse position relative to center of the ring
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for rotation
  const rotateXRaw = useTransform(y, [-0.5, 0.5], [20, -20]);
  const rotateYRaw = useTransform(x, [-0.5, 0.5], [-20, 20]);
  const rotateX = useSpring(rotateXRaw, { stiffness: 100, damping: 15 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 100, damping: 15 });

  // Pre-compute orbital particle transforms (Rules of Hooks)
  const orbitalXRaw = useTransform(rotateY, [20, -20], [-radius, radius]);
  const orbitalYRaw = useTransform(rotateX, [20, -20], [-radius, radius]);
  const orbitalX = useSpring(orbitalXRaw);
  const orbitalY = useSpring(orbitalYRaw);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((event.clientX - centerX) / rect.width);
    y.set((event.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center justify-center cursor-default group"
      style={{ width: size, height: size, perspective: "800px" }}
    >
      {/* 3D Container */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* Shadow Ring (Z Offset) */}
        <svg
          width={size}
          height={size}
          className="absolute inset-0 m-auto"
          style={{ transform: "translateZ(-15px)", opacity: 0.2 }}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="black"
            strokeWidth={strokeWidth}
            className="blur-md"
          />
        </svg>

        {/* Track Ring */}
        <svg 
          width={size} 
          height={size} 
          className="absolute inset-0 m-auto overflow-visible"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-surface-container-highest opacity-30"
          />
        </svg>

        {/* Progress Ring (Glowing) */}
        <svg 
          width={size} 
          height={size} 
          className="absolute inset-0 m-auto overflow-visible"
          style={{ 
            transform: "translateZ(5px) rotate(-90deg)",
            transformOrigin: "center"
          }}
        >
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="url(#progressGradient)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#acc7ff" />
              <stop offset="100%" stopColor="#d6baff" />
            </linearGradient>
          </defs>
        </svg>

        {/* Orbital Particle (Mouse Tracking) */}
        <motion.div
          className="absolute w-3 h-3 bg-white rounded-full blur-[0.5px] shadow-[0_0_15px_#fff,0_0_5px_#acc7ff]"
          style={{
            x: orbitalX,
            y: orbitalY,
            zIndex: 10,
            transform: "translate(-50%, -50%)"
          }}
        />
        
        {/* Orbital Path Dot (Continuous Rotation) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            className="absolute w-2.5 h-2.5 bg-secondary rounded-full shadow-[0_0_12px_#d6baff]"
            style={{
              y: -radius,
              transformOrigin: `50% ${radius}px`,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Text Center */}
        <div 
          className="absolute inset-0 flex items-center justify-center font-headline font-bold text-2xl text-on-surface"
          style={{ transform: "translateZ(20px)" }}
        >
          {progress}%
        </div>
      </motion.div>
      
      {/* Decorative Outer Glow */}
      <div className="absolute inset-0 rounded-full bg-secondary/5 blur-3xl -z-10 group-hover:bg-secondary/15 transition-colors duration-500" />
    </div>
  );
}
