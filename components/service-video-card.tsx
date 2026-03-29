"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Play } from "lucide-react"

interface ServiceVideoCardProps {
  id: number
  title: string
  description: string
  price: string
  image: string
  videoUrl?: string
  onQuickBook: () => void
}

export function ServiceVideoCard({
  id,
  title,
  description,
  price,
  image,
  videoUrl,
  onQuickBook,
}: ServiceVideoCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (videoRef.current) {
      videoRef.current.play()
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setShowVideo(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  const toggleVideo = () => {
    setShowVideo(!showVideo)
  }

  return (
    <div
      className="group relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-background">
        {/* Main Image/Video Container */}
        {showVideo && videoUrl ? (
          <video
            ref={videoRef}
            src={videoUrl}
            className="w-full h-full object-cover"
            muted
            loop
            autoPlay
          />
        ) : (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}

        {/* Play Button Indicator */}
        {videoUrl && !showVideo && (
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 cursor-pointer",
              isHovered && "bg-black/30"
            )}
            onClick={toggleVideo}
          >
            <div
              className={cn(
                "w-14 h-14 rounded-full bg-primary flex items-center justify-center transition-all duration-300",
                isHovered
                  ? "scale-100 opacity-100"
                  : "scale-75 opacity-0"
              )}
            >
              <Play className="w-6 h-6 text-foreground fill-foreground" />
            </div>
          </div>
        )}

        {/* Hover Overlay with Info */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 transition-all duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="flex flex-col gap-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <div>
              <h3 className="text-white font-serif text-xl font-medium mb-1">
                {title}
              </h3>
              <p className="text-white/80 text-sm">{description}</p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-white/20">
              <span
                className="font-medium text-sm"
                style={{ color: id === 4 ? "#fefbfb" : id === 2 ? "#faf3f3" : "#fefbfb" }}
              >
                {price}
              </span>
              <Button
                size="sm"
                onClick={onQuickBook}
                className={cn(
                  "bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300",
                  isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                Quick Book
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
