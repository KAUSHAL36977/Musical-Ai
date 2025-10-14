export interface MusicConfig {
  genre: string
  subGenre: string
  language: string
  vibe: string
  duration: number
  lyricsPrompt: string
  additionalPrompts: string[]
}

export interface Track {
  id: string
  userId: string
  title: string
  genre: string
  subGenre?: string
  language: string
  vibe: string
  duration: number
  lyrics?: string
  audioUrl: string
  prompt: MusicConfig
  metadata?: any
  createdAt: string
  updatedAt: string
}

export interface LanguagePack {
  id: string
  language: string
  displayName: string
  installed: boolean
  modelUrl?: string
}

export interface User {
  id: string
  name?: string
  email: string
  credits: number
  createdAt: string
  updatedAt: string
}

export interface Credit {
  id: string
  userId: string
  amount: number
  type: 'purchase' | 'generation' | 'bonus'
  description?: string
  createdAt: string
}

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name?: string
      credits: number
    }
  }

  interface User {
    id: string
    email: string
    name?: string
    credits: number
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    credits: number
  }
}
