'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Music, Plus, Search, Play, Download, Calendar, Clock, Globe } from 'lucide-react'
import { Track } from '@/types'

export default function MyCreationsPage() {
  const router = useRouter()
  const [tracks, setTracks] = useState<Track[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // Mock tracks data - in production, fetch from API
    const mockTracks: Track[] = [
      {
        id: '1',
        userId: 'user-1',
        title: 'Energetic Rap Track',
        genre: 'Rap',
        subGenre: 'Trap',
        language: 'English',
        vibe: 'energetic',
        duration: 30,
        lyrics: 'High energy rap track with trap beats',
        audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
        prompt: {
          genre: 'Rap',
          subGenre: 'Trap',
          language: 'English',
          vibe: 'energetic',
          duration: 30,
          lyricsPrompt: 'Create an energetic rap track',
          additionalPrompts: ['Include trap beats']
        },
        metadata: { title: 'Energetic Rap Track', bpm: 140, key: 'C minor' },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '2',
        userId: 'user-1',
        title: 'Chill Love Song',
        genre: 'Love',
        subGenre: 'Romantic Ballad',
        language: 'English',
        vibe: 'romantic',
        duration: 60,
        lyrics: 'A romantic ballad about love and relationships',
        audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
        prompt: {
          genre: 'Love',
          subGenre: 'Romantic Ballad',
          language: 'English',
          vibe: 'romantic',
          duration: 60,
          lyricsPrompt: 'Create a romantic ballad',
          additionalPrompts: ['Include acoustic guitar']
        },
        metadata: { title: 'Chill Love Song', bpm: 80, key: 'G major' },
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date(Date.now() - 86400000).toISOString()
      }
    ]

    setTimeout(() => {
      setTracks(mockTracks)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredTracks = tracks.filter(track =>
    track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    track.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    track.language.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handlePlayTrack = (trackId: string) => {
    router.push(`/my-creations/${trackId}`)
  }

  const handleDownloadTrack = async (trackId: string, title: string) => {
    try {
      const response = await fetch(`/api/music/download/${trackId}`)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${title}.mp3`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Music className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Musical AI
              </h1>
            </div>
            <Button onClick={() => router.push('/')}>
              <Plus className="h-4 w-4 mr-2" />
              Create New Track
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Page Header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">My Creations</h2>
            <p className="text-muted-foreground">
              Manage and listen to your AI-generated music tracks
            </p>
          </div>

          {/* Search */}
          <Card>
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tracks by title, genre, or language..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Music className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Tracks</p>
                    <p className="text-2xl font-bold">{tracks.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Duration</p>
                    <p className="text-2xl font-bold">
                      {Math.round(tracks.reduce((sum, track) => sum + track.duration, 0) / 60)}m
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Languages</p>
                    <p className="text-2xl font-bold">
                      {new Set(tracks.map(t => t.language)).size}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tracks Grid */}
          {filteredTracks.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Music className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  {searchTerm ? 'No tracks found' : 'No tracks yet'}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm 
                    ? 'Try adjusting your search terms'
                    : 'Create your first AI-generated music track'
                  }
                </p>
                {!searchTerm && (
                  <Button onClick={() => router.push('/')}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Track
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTracks.map((track) => (
                <Card key={track.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg truncate">{track.title}</CardTitle>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="secondary" className="text-xs">{track.genre}</Badge>
                      {track.subGenre && (
                        <Badge variant="outline" className="text-xs">{track.subGenre}</Badge>
                      )}
                      <Badge variant="outline" className="text-xs">{track.language}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-3 w-3" />
                        <span>{track.duration}s</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(track.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {track.lyrics && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {track.lyrics}
                      </p>
                    )}

                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => handlePlayTrack(track.id)}
                        className="flex-1"
                      >
                        <Play className="h-3 w-3 mr-1" />
                        Play
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownloadTrack(track.id, track.title)}
                      >
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
