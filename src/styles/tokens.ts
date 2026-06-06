// Design tokens (TypeScript + CSS variables)
export const tokens = {
  colors: {
    primary: '#7c3aed',
    'primary-foreground': '#ffffff',
    muted: '#6b7280',
    'muted-foreground': '#9ca3af',
    background: '#ffffff',
    foreground: '#171717',
    // ramps
    'gray-50': '#f9fafb',
    'gray-100': '#f3f4f6',
    'gray-200': '#e5e7eb',
    'gray-300': '#d1d5db',
    'gray-400': '#9ca3af',
    'gray-500': '#6b7280',
    success: '#16a34a',
    danger: '#ef4444',
    // dark mode overrides
    darkBackground: '#0a0a0a',
    darkForeground: '#f3f4f6',
    darkSurface: '#0f1724',
  },
  space: {
    '1': '4px',
    '2': '8px',
    '3': '12px',
    '4': '16px',
    '5': '24px',
    '6': '32px',
    '8': '48px',
  },
  radii: {
    sm: '6px',
    md: '8px',
    lg: '12px',
    full: '9999px',
  },
  motion: {
    fast: '100ms',
    medium: '250ms',
    long: '500ms',
    easing: 'cubic-bezier(0.2, 0.9, 0.2, 1)'
  },
  typography: {
    h1: '36px',
    h2: '28px',
    h3: '20px',
    body: '16px',
    caption: '12px',
  },
  shadows: {
    elevation1: '0 6px 18px rgba(15, 23, 42, 0.08)',
    elevation2: '0 12px 30px rgba(15, 23, 42, 0.12)',
  },
  glass: {
    blurSm: '8px',
    blurMd: '16px',
    opacity: '0.55',
    tint: 'rgba(255,255,255,0.06)'
  }
}

export const cssVars = `:root {
  --brand-500: ${tokens.colors.primary};
  --primary-foreground: ${tokens.colors['primary-foreground']};
  --muted-foreground: ${tokens.colors['muted-foreground']};
  --space-1: ${tokens.space['1']};
  --space-2: ${tokens.space['2']};
  --space-3: ${tokens.space['3']};
  --space-4: ${tokens.space['4']};
  --radius-md: ${tokens.radii.md};
  --motion-fast: ${tokens.motion.fast};
  --glass-blur-sm: ${tokens.glass.blurSm};
  --glass-blur-md: ${tokens.glass.blurMd};
  --glass-opacity: ${tokens.glass.opacity};
}`

export default tokens
