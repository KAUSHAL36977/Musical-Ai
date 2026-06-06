'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'

interface DurationSelectorProps {
  value: number
  onChange: (duration: number) => void
}

const PRESET_DURATIONS = [
  { label: 'Short', value: 15, description: '15 seconds' },
  { label: 'Medium', value: 30, description: '30 seconds' },
  { label: 'Long', value: 60, description: '1 minute' },
  { label: 'Extended', value: 120, description: '2 minutes' }
]

export default function DurationSelector({ value, onChange }: DurationSelectorProps) {
  const formatDuration = (seconds: number) => {
    if (seconds < 60) {
      return `${seconds}s`
    }
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Choose Duration</h3>
        <p className="text-muted-foreground mb-6">
          Select how long you want your music to be
        </p>
        
        {/* Preset buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {PRESET_DURATIONS.map((preset) => (
            <Button
              key={preset.value}
              variant={value === preset.value ? "default" : "outline"}
              onClick={() => onChange(preset.value)}
              className="h-auto p-4 flex flex-col items-center space-y-1"
            >
              <span className="font-medium">{preset.label}</span>
              <span className="text-xs text-muted-foreground">{preset.description}</span>
            </Button>
          ))}
        </div>

        {/* Custom slider */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Custom Duration</span>
            <Badge variant="outline">{formatDuration(value)}</Badge>
          </div>
          
          <Slider
            value={[value]}
            onValueChange={([newValue]) => onChange(newValue)}
            min={10}
            max={300}
            step={5}
            className="w-full"
          />
          
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>10s</span>
            <span>5m</span>
          </div>
        </div>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-sm">Selected Duration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">{formatDuration(value)}</Badge>
            <span className="text-sm text-muted-foreground">
              ({value} seconds)
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
