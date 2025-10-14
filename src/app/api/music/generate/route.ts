import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateMusic, buildMusicPrompt } from '@/lib/ai/musicGenerator'
import { uploadAudio } from '@/lib/storage/audioStorage'
import { MusicConfig } from '@/types'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const config: MusicConfig = await req.json()

  // Check credits
  const user = await prisma.user.findUnique({
    where: { email: session.user.email! }
  })

  if (!user || user.credits < 5) {
    return NextResponse.json({ error: 'Insufficient credits' }, { status: 402 })
  }

  try {
    // Build detailed prompt
    const prompt = buildMusicPrompt(config)

    // Generate music using AI
    const { audioBuffer, metadata } = await generateMusic(config)

    // Upload to storage
    const audioUrl = await uploadAudio(audioBuffer, `${user.id}/${Date.now()}.mp3`)

    // Save to database
    const track = await prisma.track.create({
      data: {
        userId: user.id,
        title: metadata.title || 'Untitled Track',
        genre: config.genre,
        subGenre: config.subGenre,
        language: config.language,
        vibe: config.vibe,
        duration: config.duration,
        lyrics: config.lyricsPrompt,
        audioUrl,
        prompt: config,
        metadata
      }
    })

    // Deduct credits
    await prisma.user.update({
      where: { id: user.id },
      data: { credits: { decrement: 5 } }
    })

    // Log credit transaction
    await prisma.credit.create({
      data: {
        userId: user.id,
        amount: -5,
        type: 'generation',
        description: `Generated track: ${track.title}`
      }
    })

    return NextResponse.json({
      trackId: track.id,
      audioUrl: track.audioUrl,
      title: track.title
    })
  } catch (error) {
    console.error('Generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate music' },
      { status: 500 }
    )
  }
}
