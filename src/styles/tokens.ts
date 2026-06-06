// Design tokens (TypeScript + CSS variables)
export const tokens = {
  colors: {
    primary: '#7c3aed',
    'primary-foreground': '#ffffff',
    muted: '#6b7280',
    'muted-foreground': '#9ca3af',
    background: '#ffffff',
    foreground: '#171717',
  },
  space: {
    '1': '4px',
    '2': '8px',
    '3': '12px',
    '4': '16px',
    '5': '24px',
    '6': '32px',
  },
  radii: {
    sm: '6px',
    md: '8px',
    lg: '12px',
  },
  motion: {
    fast: '100ms',
    medium: '250ms',
    long: '500ms',
  },
  typography: {
    h1: '36px',
    h2: '28px',
    h3: '20px',
    body: '16px',
    caption: '12px',
  },
}

export const cssVars = `:root {
  --brand-500: ${tokens.colors.primary};
  --primary: ${tokens.colors.primary};
  --primary-foreground: ${tokens.colors['primary-foreground']};
  --muted-foreground: ${tokens.colors['muted-foreground']};
  --space-1: ${tokens.space['1']};
  --space-2: ${tokens.space['2']};
  --space-3: ${tokens.space['3']};
  --space-4: ${tokens.space['4']};
  --radius-md: ${tokens.radii.md};
  --motion-fast: ${tokens.motion.fast};
}`

export default tokens
