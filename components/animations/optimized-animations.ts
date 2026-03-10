// Optimized animation variants for better mobile performance
export const optimizedContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }, // Reduced from 0.15-0.2
  },
};

export const optimizedItemVariants = {
  hidden: { opacity: 0, y: 15 }, // Reduced from 25
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 }, // Reduced from 0.6-0.8
  },
};

export const optimizedFadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

// Lightweight background animation for mobile
export const optimizedBackgroundAnimation = {
  animate: {
    y: [0, -15, 0], // Reduced movement
    x: [0, 10, 0],  // Reduced movement
  },
  transition: {
    duration: 20, // Slower duration for better performance
    repeat: Infinity,
    ease: "easeInOut",
  },
};

// Disable complex animations on mobile
export const shouldReduceMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};
