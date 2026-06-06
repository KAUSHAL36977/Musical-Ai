'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Download, Check } from 'lucide-react'
import { toast } from 'sonner'

interface LanguageSelectorProps {
  value: string
  onChange: (language: string) => void
}

const LANGUAGES = [
  { code: 'en', name: 'English', installed: true, size: '0MB' },
  { code: 'hi', name: 'Hindi', installed: false, size: '150MB' },
  { code: 'hi-en', name: 'Hinglish', installed: false, size: '120MB' },
  { code: 'hr', name: 'Haryanvi', installed: false, size: '180MB' },
  { code: 'pa', name: 'Punjabi', installed: false, size: '160MB' },
  { code: 'es', name: 'Spanish', installed: false, size: '140MB' },
  { code: 'fr', name: 'French', installed: false, size: '145MB' },
  { code: 'de', name: 'German', installed: false, size: '155MB' }
]

export default function LanguageSelector({ value, onChange }: LanguageSelectorProps) {
  const [installing, setInstalling] = useState<string | null>(null)
  const [installedLanguages, setInstalledLanguages] = useState<Set<string>>(new Set(['en']))

  const handleLanguageSelect = (languageCode: string) => {
    const language = LANGUAGES.find(l => l.code === languageCode)
    if (!language) return

    if (language.installed || installedLanguages.has(languageCode)) {
      onChange(languageCode)
    } else {
      toast.error('Please install the language pack first')
    }
  }

  const handleInstall = async (languageCode: string) => {
    setInstalling(languageCode)
    
    try {
      const response = await fetch('/api/music/languages/install', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ languageCode })
      })

      if (!response.ok) {
        throw new Error('Installation failed')
      }

      setInstalledLanguages(prev => new Set([...prev, languageCode]))
      toast.success('Language pack installed successfully!')
    } catch (error) {
      toast.error('Failed to install language pack')
      console.error(error)
    } finally {
      setInstalling(null)
    }
  }

  const isInstalled = (languageCode: string) => {
    return LANGUAGES.find(l => l.code === languageCode)?.installed || 
           installedLanguages.has(languageCode)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Choose Your Language</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {LANGUAGES.map((language) => (
            <Card 
              key={language.code}
              className={`cursor-pointer transition-all ${
                value === language.code ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => handleLanguageSelect(language.code)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{language.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {language.size} • {isInstalled(language.code) ? 'Installed' : 'Not installed'}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {isInstalled(language.code) ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleInstall(language.code)
                        }}
                        disabled={installing === language.code}
                      >
                        {installing === language.code ? (
                          'Installing...'
                        ) : (
                          <>
                            <Download className="h-4 w-4 mr-1" />
                            Install
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {value && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-sm">Selected Language</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="secondary">
              {LANGUAGES.find(l => l.code === value)?.name}
            </Badge>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
