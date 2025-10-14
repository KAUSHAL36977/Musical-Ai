// Mock music generation service
// In production, integrate with actual AI services like Replicate, OpenAI, or Stability AI

export interface MusicGenerationConfig {
  genre: string
  subGenre?: string
  language: string
  vibe: string
  duration: number
  lyricsPrompt: string
  additionalPrompts: string[]
}

export interface GeneratedMusic {
  audioBuffer: Buffer
  metadata: {
    title: string
    bpm?: number
    key?: string
    generatedAt: string
  }
}

export async function generateMusic(config: MusicGenerationConfig): Promise<GeneratedMusic> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 3000))

  // Mock audio generation - in production, this would call actual AI service
  const mockAudioBuffer = Buffer.from('mock-audio-data')
  
  const metadata = {
    title: generateTitle(config),
    bpm: getRandomBPM(config.genre),
    key: getRandomKey(),
    generatedAt: new Date().toISOString()
  }

  return {
    audioBuffer: mockAudioBuffer,
    metadata
  }
}

function generateTitle(config: MusicGenerationConfig): string {
  const keywords = config.lyricsPrompt.split(' ').filter(word => word.length > 3).slice(0, 3)
  return keywords.join(' ') || `${config.genre} Track`
}

function getRandomBPM(genre: string): number {
  const bpmRanges: Record<string, [number, number]> = {
    'Rap': [70, 140],
    'Love': [60, 120],
    'Rock': [120, 160],
    'Pop': [100, 130],
    'Electronic': [120, 180],
    'Classical': [60, 120],
    'Jazz': [80, 160],
    'Country': [80, 140],
    'Hip-Hop': [70, 140],
    'Folk': [60, 120]
  }
  
  const range = bpmRanges[genre] || [80, 140]
  return Math.floor(Math.random() * (range[1] - range[0]) + range[0])
}

function getRandomKey(): string {
  const keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
  const modes = ['major', 'minor']
  const key = keys[Math.floor(Math.random() * keys.length)]
  const mode = modes[Math.floor(Math.random() * modes.length)]
  return `${key} ${mode}`
}

export function buildMusicPrompt(config: MusicGenerationConfig): string {
  return `
    Create a ${config.duration} second ${config.genre} track
    ${config.subGenre ? `Sub-genre: ${config.subGenre}` : ''}
    Language: ${config.language}
    Vibe: ${config.vibe}
    Lyrics theme: ${config.lyricsPrompt}
    ${config.additionalPrompts.length > 0 ? `Additional requirements: ${config.additionalPrompts.join(', ')}` : ''}

    The track should have professional production quality with:
    - Clear structure (intro, verse, chorus, outro)
    - Appropriate tempo and rhythm for the genre
    - Emotional resonance matching the vibe
    - Language-appropriate vocals and pronunciation
  `.trim()
}
