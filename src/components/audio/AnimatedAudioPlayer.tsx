'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'

interface AudioPlayerProps {
  src?: string
  title?: string
  artist?: string
  onPlay?: () => void
  onPause?: () => void
}

export const AnimatedAudioPlayer: React.FC<AudioPlayerProps> = ({
  src = '',
  title = 'Untitled Track',
  artist = 'AI Generated',
  onPlay,
  onPause,
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.8)
  const audioRef = useRef<HTMLAudioElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const dataArrayRef = useRef<Uint8Array | null>(null)

  // Initialize Web Audio API
  useEffect(() => {
    if (!audioRef.current) return

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const analyser = audioContext.createAnalyser()
    const source = audioContext.createMediaElementAudioSource(audioRef.current)

    analyser.fftSize = 256
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    source.connect(analyser)
    analyser.connect(audioContext.destination)

    analyserRef.current = analyser
    dataArrayRef.current = dataArray

    return () => {
      try {
        audioContext.close()
      } catch (e) {
        // Context might already be closed
      }
    }
  }, [])

  // Draw waveform
  const drawWaveform = () => {
    if (!canvasRef.current || !analyserRef.current || !dataArrayRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    analyserRef.current.getByteFrequencyData(dataArrayRef.current)

    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const barWidth = (canvas.width / dataArrayRef.current.length) * 2.5
    let x = 0

    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    gradient.addColorStop(0, 'var(--brand-400)')
    gradient.addColorStop(0.5, 'var(--brand-500)')
    gradient.addColorStop(1, 'var(--brand-600)')

    ctx.fillStyle = gradient
    ctx.globalAlpha = 0.8

    for (let i = 0; i < dataArrayRef.current.length; i++) {
      const barHeight = (dataArrayRef.current[i] / 255) * canvas.height

      ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight)
      x += barWidth + 1
    }

    if (isPlaying) {
      requestAnimationFrame(drawWaveform)
    }
  }

  // Play/Pause
  const togglePlayPause = () => {
    if (!audioRef.current || !src) return

    if (isPlaying) {
      audioRef.current.pause()
      onPause?.()
    } else {
      audioRef.current.play()
      onPlay?.()
      drawWaveform()
    }
    setIsPlaying(!isPlaying)
  }

  // Update time
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  // Update duration
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  // Format time
  const formatTime = (time: number) => {
    if (!time) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-lg p-6 space-y-4 backdrop-blur-xl"
    >
      {/* Waveform Visualization */}
      <motion.canvas
        ref={canvasRef}
        width={400}
        height={80}
        className="w-full rounded-lg border border-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
      />

      {/* Track Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm text-white/60">{artist}</p>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-2"
      >
        <Slider
          value={currentTime}
          min={0}
          max={duration || 0}
          step={0.1}
          onValueChange={(value) => {
            if (audioRef.current) {
              audioRef.current.currentTime = value[0]
              setCurrentTime(value[0])
            }
          }}
        />
        <div className="flex justify-between text-xs text-white/60">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex items-center justify-center gap-4"
      >
        <Button variant="ghost" size="sm" disabled>
          <SkipBack className="w-5 h-5" />
        </Button>

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={togglePlayPause}
            className="rounded-full w-12 h-12 flex items-center justify-center"
            disabled={!src}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6 ml-1" />
            )}
          </Button>
        </motion.div>

        <Button variant="ghost" size="sm" disabled>
          <SkipForward className="w-5 h-5" />
        </Button>
      </motion.div>

      {/* Volume Control */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center gap-2"
      >
        <Volume2 className="w-4 h-4 text-white/60" />
        <Slider
          value={volume * 100}
          min={0}
          max={100}
          step={1}
          onValueChange={(value) => {
            const vol = value[0] / 100
            setVolume(vol)
            if (audioRef.current) {
              audioRef.current.volume = vol
            }
          }}
        />
      </motion.div>

      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        crossOrigin="anonymous"
      />
    </motion.div>
  )
}

export default AnimatedAudioPlayer
