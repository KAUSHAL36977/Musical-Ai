"use client"

import React from 'react'
import { Toaster as SonnerToaster } from 'sonner'

// Lightweight wrapper to ensure client rendering and allow future theming
export function Toaster(props: any) {
	return <SonnerToaster {...props} />
}

export default Toaster
