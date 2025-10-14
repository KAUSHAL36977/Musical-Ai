'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface VibeSelectorProps {
  value: string
  onChange: (vibe: string) => void
}

const VIBES = [
  { id: 'energetic', name: 'Energetic', description: 'High energy, upbeat, motivating' },
  { id: 'chill', name: 'Chill', description: 'Relaxed, mellow, laid-back' },
  { id: 'romantic', name: 'Romantic', description: 'Intimate, loving, emotional' },
  { id: 'melancholic', name: 'Melancholic', description: 'Sad, reflective, nostalgic' },
  { id: 'aggressive', name: 'Aggressive', description: 'Intense, powerful, bold' },
  { id: 'mysterious', name: 'Mysterious', description: 'Dark, enigmatic, intriguing' },
  { id: 'happy', name: 'Happy', description: 'Joyful, cheerful, uplifting' },
  { id: 'dramatic', name: 'Dramatic', description: 'Epic, cinematic, grandiose' },
  { id: 'peaceful', name: 'Peaceful', description: 'Calm, serene, tranquil' },
  { id: 'nostalgic', name: 'Nostalgic', description: 'Retro, vintage, reminiscent' },
  { id: 'futuristic', name: 'Futuristic', description: 'Modern, sci-fi, innovative' },
  { id: 'playful', name: 'Playful', description: 'Fun, lighthearted, whimsical' }
]

export default function VibeSelector({ value, onChange }: VibeSelectorProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Choose Your Vibe</h3>
        <p className="text-muted-foreground mb-6">
          Select the emotional tone and atmosphere you want for your music
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {VIBES.map((vibe) => (
            <Card 
              key={vibe.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                value === vibe.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => onChange(vibe.id)}
            >
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">{vibe.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {vibe.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {value && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-sm">Selected Vibe</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="secondary">
              {VIBES.find(v => v.id === value)?.name}
            </Badge>
            <p className="text-sm text-muted-foreground mt-2">
              {VIBES.find(v => v.id === value)?.description}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
