/**
 * GradeFlow Physics System (Optimized for Instant Response)
 * These values eliminate perceived 'lag' by increasing response speed and reducing inertia.
 */

export const SNAPPY_SPRING = {
  type: "spring",
  stiffness: 600, // Instant snap
  damping: 38,    
  mass: 0.5,      // Ultra-light feel
} as const;

export const FLOATING_SPRING = {
  type: "spring",
  stiffness: 300, // Faster entry
  damping: 30,
  mass: 0.6,      // Much lighter for 'instant' appearance
} as const;

export const SOFT_SPRING = {
  type: "spring",
  stiffness: 150,
  damping: 25,
  mass: 0.6,
} as const;

/**
 * Premium Button Physics (Directly from Framer Source)
 * Optimized for high-inertia bouncy feedback.
 */
export const BOUNCY_SPRING = {
  type: "spring",
  stiffness: 231,
  damping: 18,
  mass: 1,
  bounce: 0.5
} as const;

export const MAGNETIC_HOVER = {
  scale: 1.05,
  y: -8,
  transition: SNAPPY_SPRING,
} as const;

export const STAGGER_TRANSITION = (delay: number = 0.05) => ({
  staggerChildren: delay,
  delayChildren: 0.05, // Faster reveal
});
