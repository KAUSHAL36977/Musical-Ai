// Motion tokens and animation definitions
export const motionTokens = {
  // Durations (ms)
  duration: {
    instant: 0,
    fast: 150,
    normal: 300,
    slow: 500,
    slower: 800,
    slowest: 1200,
  },

  // Easing functions
  easing: {
    smooth: [0.4, 0, 0.2, 1],          // smooth curve
    enter: [0.4, 0, 1, 1],             // enter animation
    exit: [0.4, 0, 0.6, 1],            // exit animation
    bounce: [0.68, -0.55, 0.265, 1.55], // bounce effect
    elastic: [0.34, 1.56, 0.64, 1],    // elastic effect
  },

  // Spring presets
  spring: {
    soft: { stiffness: 100, damping: 30 },
    smooth: { stiffness: 150, damping: 35 },
    bouncy: { stiffness: 200, damping: 10 },
    snappy: { stiffness: 300, damping: 15 },
  },

  // Common transitions
  transition: {
    fast: { duration: 150, ease: 'easeOut' },
    normal: { duration: 300, ease: 'easeInOut' },
    slow: { duration: 500, ease: 'easeInOut' },
  },

  // Stagger delays
  stagger: {
    default: 0.05,
    relaxed: 0.1,
    tight: 0.02,
  },
}

// Animation variants for Framer Motion
export const animationVariants = {
  // Fade animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: motionTokens.transition.normal,
  },
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: motionTokens.transition.normal,
  },
  fadeInDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: motionTokens.transition.normal,
  },

  // Scale animations
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition: motionTokens.transition.normal,
  },
  scaleInUp: {
    initial: { opacity: 0, scale: 0.9, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: 20 },
    transition: motionTokens.transition.normal,
  },

  // Slide animations
  slideInLeft: {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
    transition: motionTokens.transition.normal,
  },
  slideInRight: {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 40 },
    transition: motionTokens.transition.normal,
  },

  // Bouncy entrance
  bounceIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: {
      duration: 500,
      ease: 'easeOut',
    },
  },

  // Stagger container
  staggerContainer: {
    initial: 'initial',
    animate: 'animate',
    exit: 'exit',
    variants: {
      initial: { opacity: 0 },
      animate: {
        opacity: 1,
        transition: {
          staggerChildren: motionTokens.stagger.default,
        },
      },
      exit: {
        opacity: 0,
        transition: {
          staggerChildren: motionTokens.stagger.default,
        },
      },
    },
  },

  // Stagger item
  staggerItem: {
    variants: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 },
    },
    transition: motionTokens.transition.normal,
  },

  // Hover animations
  buttonHover: {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
    transition: motionTokens.transition.fast,
  },

  // Rotate animations
  spin: {
    animate: { rotate: 360 },
    transition: { duration: 2, repeat: Infinity, ease: 'linear' },
  },

  // Pulse animations
  pulse: {
    animate: { opacity: [1, 0.6, 1] },
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  },

  // Float animations
  float: {
    animate: { y: [0, -10, 0] },
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },

  // Shimmer animations (for loading states)
  shimmer: {
    animate: { backgroundPosition: ['200% 0', '-200% 0'] },
    transition: { duration: 2, repeat: Infinity },
  },
}
