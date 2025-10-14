'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import StepIndicator from './StepIndicator'
import GenreSelector from './GenreSelector'
import LanguageSelector from './LanguageSelector'
import VibeSelector from './VibeSelector'
import DurationSelector from './DurationSelector'
import LyricsInput from './LyricsInput'
import GenerationProgress from './GenerationProgress'
import { MusicConfig } from '@/types'

const STEPS = [
  'Music Type',
  'Language',
  'Vibe',
  'Duration',
  'Lyrics & Details',
  'Generate'
]

export default function MusicWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  const [config, setConfig] = useState<MusicConfig>({
    genre: '',
    subGenre: '',
    language: '',
    vibe: '',
    duration: 30,
    lyricsPrompt: '',
    additionalPrompts: []
  })
  const router = useRouter()

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    setCurrentStep(prev => prev - 1)
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 0:
        return !!config.genre
      case 1:
        return !!config.language
      case 2:
        return !!config.vibe
      case 3:
        return config.duration > 0
      case 4:
        return config.lyricsPrompt.length > 10
      default:
        return true
    }
  }

  const handleGenerate = async () => {
    setIsGenerating(true)

    try {
      const response = await fetch('/api/music/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Generation failed')
      }

      const { trackId, audioUrl } = await response.json()

      toast.success('Music generated successfully!')
      router.push(`/my-creations/${trackId}`)
    } catch (error) {
      toast.error('Failed to generate music. Please try again.')
      console.error(error)
    } finally {
      setIsGenerating(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <GenreSelector
            value={config.genre}
            subGenre={config.subGenre}
            onChange={(genre, subGenre) =>
              setConfig(prev => ({ ...prev, genre, subGenre }))}
          />
        )
      case 1:
        return (
          <LanguageSelector
            value={config.language}
            onChange={(language) =>
              setConfig(prev => ({ ...prev, language }))}
          />
        )
      case 2:
        return (
          <VibeSelector
            value={config.vibe}
            onChange={(vibe) =>
              setConfig(prev => ({ ...prev, vibe }))}
          />
        )
      case 3:
        return (
          <DurationSelector
            value={config.duration}
            onChange={(duration) =>
              setConfig(prev => ({ ...prev, duration }))}
          />
        )
      case 4:
        return (
          <LyricsInput
            value={config.lyricsPrompt}
            additionalPrompts={config.additionalPrompts}
            onChange={(lyricsPrompt, additionalPrompts) =>
              setConfig(prev => ({ ...prev, lyricsPrompt, additionalPrompts }))}
          />
        )
      case 5:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Review Your Choices</h3>
            <div className="space-y-2 p-4 bg-muted rounded-lg">
              <p><strong>Genre:</strong> {config.genre} {config.subGenre && `- ${config.subGenre}`}</p>
              <p><strong>Language:</strong> {config.language}</p>
              <p><strong>Vibe:</strong> {config.vibe}</p>
              <p><strong>Duration:</strong> {config.duration} seconds</p>
              <p><strong>Lyrics Theme:</strong> {config.lyricsPrompt.substring(0, 100)}...</p>
            </div>
            <Button
              onClick={handleGenerate}
              className="w-full"
              size="lg"
              disabled={isGenerating}
            >
              {isGenerating ? 'Generating...' : 'Generate Music'}
            </Button>
          </div>
        )
      default:
        return null
    }
  }

  if (isGenerating) {
    return <GenerationProgress config={config} />
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Music Generation Wizard</CardTitle>
        <StepIndicator steps={STEPS} currentStep={currentStep} />
      </CardHeader>
      <CardContent>
        <div className="min-h-[400px]">
          {renderStep()}
        </div>

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            Back
          </Button>

          {currentStep < STEPS.length - 1 && (
            <Button
              onClick={handleNext}
              disabled={!validateStep(currentStep)}
            >
              Next
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
