'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface GenreSelectorProps {
  value: string
  subGenre: string
  onChange: (genre: string, subGenre: string) => void
}

const GENRES = {
  'Rap': ['Trap', 'Boom Bap', 'Drill', 'Mumble', 'Conscious', 'Old School'],
  'Love': ['Romantic Ballad', 'R&B Love', 'Acoustic Love', 'Pop Love', 'Soul'],
  'Rock': ['Alternative', 'Classic Rock', 'Indie', 'Metal', 'Punk', 'Progressive'],
  'Pop': ['Dance Pop', 'Synth Pop', 'Indie Pop', 'K-Pop Style', 'Teen Pop'],
  'Electronic': ['EDM', 'House', 'Techno', 'Dubstep', 'Ambient', 'Trance'],
  'Classical': ['Symphony', 'Chamber', 'Opera', 'Baroque', 'Romantic Era'],
  'Jazz': ['Smooth Jazz', 'Bebop', 'Fusion', 'Latin Jazz', 'Free Jazz'],
  'Country': ['Traditional', 'Modern Country', 'Country Rock', 'Bluegrass'],
  'Hip-Hop': ['East Coast', 'West Coast', 'Southern', 'Alternative Hip-Hop'],
  'Folk': ['Traditional Folk', 'Contemporary', 'Folk Rock', 'World Folk']
}

export default function GenreSelector({ value, subGenre, onChange }: GenreSelectorProps) {
  const [selectedSubGenre, setSelectedSubGenre] = useState(subGenre)

  const handleGenreSelect = (genre: string) => {
    onChange(genre, '')
    setSelectedSubGenre('')
  }

  const handleSubGenreSelect = (subGenre: string) => {
    setSelectedSubGenre(subGenre)
    onChange(value, subGenre)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Choose Your Music Genre</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {Object.keys(GENRES).map((genre) => (
            <Button
              key={genre}
              variant={value === genre ? "default" : "outline"}
              onClick={() => handleGenreSelect(genre)}
              className="h-auto p-4 flex flex-col items-center space-y-2"
            >
              <span className="font-medium">{genre}</span>
            </Button>
          ))}
        </div>
      </div>

      {value && (
        <div>
          <h4 className="text-md font-medium mb-3">Select Sub-Genre (Optional)</h4>
          <div className="flex flex-wrap gap-2">
            {GENRES[value as keyof typeof GENRES].map((sub) => (
              <Badge
                key={sub}
                variant={selectedSubGenre === sub ? "default" : "outline"}
                className="cursor-pointer px-3 py-1"
                onClick={() => handleSubGenreSelect(sub)}
              >
                {sub}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {value && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-sm">Selected Genre</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">{value}</Badge>
              {selectedSubGenre && (
                <>
                  <span className="text-muted-foreground">•</span>
                  <Badge variant="outline">{selectedSubGenre}</Badge>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
