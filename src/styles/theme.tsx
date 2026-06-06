"use client"

import React, { useEffect, useState, createContext, useContext } from 'react'
import tokens from './tokens'

type Theme = 'light' | 'dark'

const ThemeContext = createContext<{ theme: Theme; setTheme: (t: Theme) => void }>({ theme: 'light', setTheme: () => {} })

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('theme') as Theme | null
        if (stored) return stored
      } catch (e) {}
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
    }
    return 'light'
  })

  useEffect(() => {
    const root = document.documentElement
    const setVar = (k: string, v: string) => root.style.setProperty(k, v)

    const baseVars: Record<string, string> = {
      '--brand-500': tokens.colors.primary,
      '--primary-foreground': tokens.colors['primary-foreground'],
      '--muted-foreground': tokens.colors['muted-foreground'],
      '--space-1': tokens.space['1'],
      '--space-2': tokens.space['2'],
      '--space-3': tokens.space['3'],
      '--space-4': tokens.space['4'],
      '--radius-md': tokens.radii.md,
      '--motion-fast': tokens.motion.fast,
      '--glass-blur-sm': tokens.glass.blurSm,
      '--glass-blur-md': tokens.glass.blurMd,
      '--glass-opacity': tokens.glass.opacity,
      '--glass-tint': tokens.glass.tint,
      '--elevation-1': tokens.shadows.elevation1,
      '--elevation-2': tokens.shadows.elevation2,
    }

    const lightVars = {
      ...baseVars,
      '--background': tokens.colors.background,
      '--foreground': tokens.colors.foreground,
    }

    const darkVars = {
      ...baseVars,
      '--background': tokens.colors.darkBackground || '#0a0a0a',
      '--foreground': tokens.colors.darkForeground || '#f3f4f6',
      '--glass-tint': 'rgba(10,12,20,0.45)'
    }

    const vars = theme === 'dark' ? darkVars : lightVars
    Object.entries(vars).forEach(([k, v]) => setVar(k, v))

    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('theme', theme) } catch (e) {}
  }, [theme])

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)

export default ThemeProvider
