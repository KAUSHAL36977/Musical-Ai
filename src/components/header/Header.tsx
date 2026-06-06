'use client'

import React from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'

export default function Header() {
  const { data: session } = useSession()
  const credits = (session?.user as any)?.credits ?? 0

  return (
    <header className="w-full border-b bg-white">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-lg font-semibold">Musical AI</Link>
          <nav className="hidden md:flex space-x-3 text-sm text-muted-foreground">
            <Link href="/">Home</Link>
            <Link href="/my-creations">My Creations</Link>
            <Link href="/music/generate">Create</Link>
          </nav>
        </div>

        <div className="flex items-center space-x-3">
          {session ? (
            <>
              <div className="text-sm text-muted-foreground">Credits: <span className="font-medium">{credits}</span></div>
              <Button variant="ghost" size="sm" onClick={() => signOut()}>Sign out</Button>
            </>
          ) : (
            <Button variant="default" size="sm" onClick={() => signIn()}>Sign in</Button>
          )}
        </div>
      </div>
    </header>
  )
}
