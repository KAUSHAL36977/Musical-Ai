import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getAudioBuffer } from '@/lib/storage/audioStorage'

export async function GET(
  req: NextRequest,
  { params }: { params: { trackId: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const track = await prisma.track.findFirst({
      where: {
        id: params.trackId,
        userId: session.user.id
      }
    })

    if (!track) {
      return NextResponse.json({ error: 'Track not found' }, { status: 404 })
    }

    // Get audio buffer from storage
    const audioBuffer = await getAudioBuffer(track.audioUrl)

    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Disposition': `attachment; filename="${track.title}.mp3"`
      }
    })
  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json(
      { error: 'Failed to download track' },
      { status: 500 }
    )
  }
}
