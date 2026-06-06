import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { languageCode } = await req.json()

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email! }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check if language pack exists
    let languagePack = await prisma.languagePack.findUnique({
      where: { language: languageCode }
    })

    if (!languagePack) {
      // Create language pack if it doesn't exist
      languagePack = await prisma.languagePack.create({
        data: {
          language: languageCode,
          displayName: getLanguageDisplayName(languageCode),
          installed: false,
          modelUrl: `https://models.example.com/${languageCode}.bin`
        }
      })
    }

    // Connect user to language pack
    await prisma.user.update({
      where: { id: user.id },
      data: {
        languagePacks: {
          connect: { id: languagePack.id }
        }
      }
    })

    // Simulate installation process
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Mark as installed
    await prisma.languagePack.update({
      where: { id: languagePack.id },
      data: { installed: true }
    })

    return NextResponse.json({
      success: true,
      languagePack: {
        id: languagePack.id,
        language: languagePack.language,
        displayName: languagePack.displayName,
        installed: true
      }
    })
  } catch (error) {
    console.error('Installation error:', error)
    return NextResponse.json(
      { error: 'Failed to install language pack' },
      { status: 500 }
    )
  }
}

function getLanguageDisplayName(code: string): string {
  const names: Record<string, string> = {
    'en': 'English',
    'hi': 'Hindi',
    'hi-en': 'Hinglish',
    'hr': 'Haryanvi',
    'pa': 'Punjabi',
    'es': 'Spanish',
    'fr': 'French',
    'de': 'German'
  }
  return names[code] || code
}
