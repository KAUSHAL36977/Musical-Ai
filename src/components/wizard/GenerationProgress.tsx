'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { MusicConfig } from '@/types'
import { Music, Sparkles, Zap } from 'lucide-react'

interface GenerationProgressProps {
  config: MusicConfig
}

const PROGRESS_STEPS = [
  { id: 'analyzing', label: 'Analyzing your preferences', duration: 2000 },
  { id: 'composing', label: 'Composing musical structure', duration: 3000 },
  { id: 'generating', label: 'Generating audio', duration: 4000 },
  { id: 'polishing', label: 'Polishing the final track', duration: 2000 }
]

export default function GenerationProgress({ config }: GenerationProgressProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let stepIndex = 0
    let stepProgress = 0
    const totalDuration = PROGRESS_STEPS.reduce((sum, step) => sum + step.duration, 0)

    const interval = setInterval(() => {
      stepProgress += 50
      
      if (stepProgress >= PROGRESS_STEPS[stepIndex].duration) {
        stepIndex++
        stepProgress = 0
        if (stepIndex < PROGRESS_STEPS.length) {
          setCurrentStep(stepIndex)
        }
      }

      const currentStepProgress = (stepProgress / PROGRESS_STEPS[stepIndex]?.duration || 1) * 100
      const overallProgress = ((stepIndex * 100) + currentStepProgress) / PROGRESS_STEPS.length
      
      setProgress(overallProgress)

      if (stepIndex >= PROGRESS_STEPS.length) {
        clearInterval(interval)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-primary animate-pulse" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <Zap className="h-3 w-3 text-primary-foreground" />
            </div>
          </div>
        </div>
        <CardTitle>Generating Your Music</CardTitle>
        <p className="text-muted-foreground">
          Creating your {config.genre.toLowerCase()} track with {config.vibe} vibes...
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Current step */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
              {currentStep + 1}
            </div>
            <div>
              <p className="font-medium">
                {PROGRESS_STEPS[currentStep]?.label || 'Finalizing...'}
              </p>
              <p className="text-sm text-muted-foreground">
                {currentStep + 1} of {PROGRESS_STEPS.length} steps
              </p>
            </div>
          </div>
        </div>

        {/* Track details */}
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Music className="h-4 w-4 text-primary" />
              <span className="font-medium text-sm">Track Details</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <div>
                <span className="font-medium">Genre:</span> {config.genre}
                {config.subGenre && ` (${config.subGenre})`}
              </div>
              <div>
                <span className="font-medium">Duration:</span> {config.duration}s
              </div>
              <div>
                <span className="font-medium">Language:</span> {config.language}
              </div>
              <div>
                <span className="font-medium">Vibe:</span> {config.vibe}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fun facts */}
        <div className="text-center text-sm text-muted-foreground">
          <p>💡 Did you know? AI music generation uses advanced neural networks</p>
          <p>to create unique compositions tailored to your preferences!</p>
        </div>
      </CardContent>
    </Card>
  )
}
