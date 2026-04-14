"use client";

import { motion, Variants } from "framer-motion";
import React from "react";

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
  as?: "div" | "section" | "ul";
}

import { FLOATING_SPRING } from "@/lib/animation-constants";

const containerVariants = (stagger: number): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: stagger,
      delayChildren: 0.1,
    },
  },
});

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 }, // Reduced travel distance for snappier feel
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...FLOATING_SPRING, stiffness: 250 }, // Snappier item entry
  },
};

export default function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.05, // Halved default stagger delay
  once = true,
  as = "div",
}: StaggerContainerProps) {
  const Component = motion[as] as typeof motion.div;

  return (
    <Component
      variants={containerVariants(staggerDelay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
      className={className}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div 
      variants={staggerItemVariants} 
      className={className}
      style={{ willChange: "transform, opacity" }} // Force GPU layering
    >
      {children}
    </motion.div>
  );
}
