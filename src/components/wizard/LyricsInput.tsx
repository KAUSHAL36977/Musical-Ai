'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Plus, X } from 'lucide-react'

interface LyricsInputProps {
  value: string
  additionalPrompts: string[]
  onChange: (lyricsPrompt: string, additionalPrompts: string[]) => void
}

const LYRIC_PROMPTS = [
  'Tell a story about overcoming challenges',
  'Express feelings of love and romance',
  'Describe a journey or adventure',
  'Share thoughts about friendship',
  'Reflect on life experiences',
  'Celebrate success and achievement',
  'Express hope for the future',
  'Describe nature and beauty'
]

export default function LyricsInput({ value, additionalPrompts, onChange }: LyricsInputProps) {
  const [newPrompt, setNewPrompt] = useState('')

  const handleAddPrompt = () => {
    if (newPrompt.trim() && !additionalPrompts.includes(newPrompt.trim())) {
      onChange(value, [...additionalPrompts, newPrompt.trim()])
      setNewPrompt('')
    }
  }

  const handleRemovePrompt = (index: number) => {
    onChange(value, additionalPrompts.filter((_, i) => i !== index))
  }

  const handlePromptSelect = (prompt: string) => {
    onChange(prompt, additionalPrompts)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Lyrics & Details</h3>
        <p className="text-muted-foreground mb-6">
          Describe what you want your music to be about
        </p>

        {/* Lyrics prompt */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              What should your music be about?
            </label>
            <Textarea
              placeholder="Describe the theme, story, or message you want in your music..."
              value={value}
              onChange={(e) => onChange(e.target.value, additionalPrompts)}
              className="min-h-[100px]"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {value.length}/500 characters
            </p>
          </div>

          {/* Quick prompts */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Quick Prompts (Click to use)
            </label>
            <div className="flex flex-wrap gap-2">
              {LYRIC_PROMPTS.map((prompt) => (
                <Badge
                  key={prompt}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => handlePromptSelect(prompt)}
                >
                  {prompt}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Additional prompts */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Additional Requirements
            </label>
            <div className="flex space-x-2">
              <Input
                placeholder="Add specific requirements (e.g., 'include guitar solo', 'add harmonies')"
                value={newPrompt}
                onChange={(e) => setNewPrompt(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddPrompt()}
              />
              <Button onClick={handleAddPrompt} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {additionalPrompts.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Current Requirements:</label>
              <div className="flex flex-wrap gap-2">
                {additionalPrompts.map((prompt, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center space-x-1"
                  >
                    <span>{prompt}</span>
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-destructive"
                      onClick={() => handleRemovePrompt(index)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {(value || additionalPrompts.length > 0) && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-sm">Your Music Description</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {value && (
              <div>
                <span className="text-sm font-medium">Theme: </span>
                <span className="text-sm">{value}</span>
              </div>
            )}
            {additionalPrompts.length > 0 && (
              <div>
                <span className="text-sm font-medium">Requirements: </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {additionalPrompts.map((prompt, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {prompt}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
