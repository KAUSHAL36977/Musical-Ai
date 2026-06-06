'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { animationVariants, motionTokens } from '@/styles/motion'

// Animated container for staggered children
export const AnimatedContainer = ({
  children,
  staggerDelay = motionTokens.stagger.default,
  variant = 'staggerContainer',
  className = '',
}: {
  children: React.ReactNode
  staggerDelay?: number
  variant?: keyof typeof animationVariants
  className?: string
}) => {
  const vars = animationVariants[variant as keyof typeof animationVariants] || animationVariants.staggerContainer
  return (
    <motion.div
      variants={vars as any}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Animated item (for use inside AnimatedContainer)
export const AnimatedItem = ({
  children,
  variant = 'staggerItem',
  className = '',
}: {
  children: React.ReactNode
  variant?: keyof typeof animationVariants
  className?: string
}) => {
  const vars = animationVariants[variant as keyof typeof animationVariants] || animationVariants.staggerItem
  return (
    <motion.div
      variants={vars as any}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Animated card with glass effect
export const AnimatedCard = ({
  children,
  className = '',
  delay = 0,
  onClick,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  onClick?: () => void
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.4,
        delay,
        ease: 'easeOut',
      }}
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`cursor-pointer transition-all ${className}`}
    >
      {children}
    </motion.div>
  )
}

// Ambient particles background effect
export const AmbientParticles = ({
  count = 20,
  duration = 20,
}: {
  count?: number
  duration?: number
}) => {
  const particles = Array.from({ length: count }).map((_, i) => ({
    id: i,
    delay: (i * duration) / count,
    duration,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }))

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full opacity-20"
          style={{
            width: particle.size,
            height: particle.size,
            background: `radial-gradient(circle, var(--brand-400), var(--brand-600))`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            boxShadow: '0 0 20px var(--brand-500)',
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.sin(particle.delay) * 50, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

// Gradient pulse background effect
export const AmbientGradient = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(circle at 50% 50%, var(--brand-500) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(circle at 80% 20%, var(--brand-600) 0%, transparent 60%)',
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />
    </div>
  )
}

// Floating label effect
export const FloatingLabel = ({
  text,
  className = '',
}: {
  text: string
  className?: string
}) => {
  return (
    <motion.span
      className={className}
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: -25, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {text}
    </motion.span>
  )
}

// Page transition wrapper
export const PageTransition = ({
  children,
  variant = 'fadeInUp',
}: {
  children: React.ReactNode
  variant?: keyof typeof animationVariants
}) => {
  const vars = animationVariants[variant as keyof typeof animationVariants] || animationVariants.fadeInUp
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={vars as any}
    >
      {children}
    </motion.div>
  )
}
