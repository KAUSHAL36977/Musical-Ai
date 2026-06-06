import { create } from 'zustand'
import { MusicConfig } from '@/types'

interface MusicWizardStore {
  currentStep: number
  config: MusicConfig
  isGenerating: boolean
  setCurrentStep: (step: number) => void
  updateConfig: (config: Partial<MusicConfig>) => void
  setIsGenerating: (generating: boolean) => void
  reset: () => void
}

const initialConfig: MusicConfig = {
  genre: '',
  subGenre: '',
  language: '',
  vibe: '',
  duration: 30,
  lyricsPrompt: '',
  additionalPrompts: []
}

export const useMusicWizardStore = create<MusicWizardStore>((set) => ({
  currentStep: 0,
  config: initialConfig,
  isGenerating: false,
  setCurrentStep: (step) => set({ currentStep: step }),
  updateConfig: (newConfig) => set((state) => ({ 
    config: { ...state.config, ...newConfig } 
  })),
  setIsGenerating: (generating) => set({ isGenerating: generating }),
  reset: () => set({ 
    currentStep: 0, 
    config: initialConfig, 
    isGenerating: false 
  })
}))
