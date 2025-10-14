'use client'

import { useEffect, useRef, useState } from 'react'

interface WaveformVisualizerProps {
  audioUrl: string
  isPlaying: boolean
}

export default function WaveformVisualizer({ audioUrl, isPlaying }: WaveformVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null)
  const [dataArray, setDataArray] = useState<Uint8Array | null>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const initAudioContext = async () => {
      try {
        const audio = new Audio(audioUrl)
        const context = new (window.AudioContext || (window as any).webkitAudioContext)()
        const source = context.createMediaElementSource(audio)
        const analyserNode = context.createAnalyser()
        
        analyserNode.fftSize = 256
        const bufferLength = analyserNode.frequencyBinCount
        const dataArray = new Uint8Array(bufferLength)
        
        source.connect(analyserNode)
        analyserNode.connect(context.destination)
        
        setAudioContext(context)
        setAnalyser(analyserNode)
        setDataArray(dataArray)
      } catch (error) {
        console.error('Error initializing audio context:', error)
      }
    }

    initAudioContext()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (audioContext) {
        audioContext.close()
      }
    }
  }, [audioUrl])

  useEffect(() => {
    if (!analyser || !dataArray) return

    const draw = () => {
      if (!canvasRef.current || !analyser || !dataArray) return

      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      analyser.getByteFrequencyData(dataArray)

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const barWidth = (canvas.width / dataArray.length) * 2.5
      let barHeight
      let x = 0

      for (let i = 0; i < dataArray.length; i++) {
        barHeight = (dataArray[i] / 255) * canvas.height * 0.8

        const gradient = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - barHeight)
        gradient.addColorStop(0, '#3b82f6')
        gradient.addColorStop(1, '#8b5cf6')

        ctx.fillStyle = gradient
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight)

        x += barWidth + 1
      }

      if (isPlaying) {
        animationRef.current = requestAnimationFrame(draw)
      }
    }

    if (isPlaying) {
      draw()
    } else {
      // Draw static waveform when not playing
      if (canvasRef.current) {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        
        // Draw a simple static waveform
        ctx.strokeStyle = '#e5e7eb'
        ctx.lineWidth = 2
        ctx.beginPath()
        
        const centerY = canvas.height / 2
        const amplitude = 20
        
        for (let x = 0; x < canvas.width; x += 4) {
          const y = centerY + Math.sin(x * 0.02) * amplitude
          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        
        ctx.stroke()
      }
    }
  }, [analyser, dataArray, isPlaying])

  return (
    <div className="w-full h-24 bg-muted rounded-lg overflow-hidden">
      <canvas
        ref={canvasRef}
        width={800}
        height={96}
        className="w-full h-full"
      />
    </div>
  )
}
