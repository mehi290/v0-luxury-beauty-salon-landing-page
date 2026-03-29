"use client"

import { useRef, useEffect } from "react"

interface VideoPlayerProps {
  src: string
  poster?: string
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  playsInline?: boolean
  className?: string
  onPlay?: () => void
}

export function VideoPlayer({
  src,
  poster,
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  className = "",
  onPlay,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handlePlay = () => {
      onPlay?.()
    }

    video.addEventListener("play", handlePlay)
    return () => video.removeEventListener("play", handlePlay)
  }, [onPlay])

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      className={className}
    />
  )
}

interface BackgroundVideoProps {
  src: string
  poster?: string
  className?: string
}

export function BackgroundVideo({ src, poster, className = "" }: BackgroundVideoProps) {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      poster={poster}
      className={`absolute inset-0 w-full h-full object-cover ${className}`}
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}
