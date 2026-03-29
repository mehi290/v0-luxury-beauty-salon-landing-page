"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import { Star, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { cn } from "@/lib/utils"

interface VideoTestimonial {
  id: number
  name: string
  role: string
  avatar: string
  rating: number
  text: string
  videoUrl: string
}

const videoTestimonials: VideoTestimonial[] = [
  {
    id: 1,
    name: "Lina Al-Rashid",
    role: "Diamond Member",
    avatar: "/images/testimonials/avatar-1.jpg",
    rating: 5,
    text: "VELORA has completely transformed my hair care routine. The attention to detail and personalized service is unmatched in Dubai.",
    videoUrl: "https://videos.pexels.com/video-files/5502320/5502320-hd_1920_1080_30fps.mp4",
  },
  {
    id: 2,
    name: "Elena Petrova",
    role: "Platinum Member",
    avatar: "/images/testimonials/avatar-2.jpg",
    rating: 5,
    text: "As someone who has tried many salons in Dubai Marina, VELORA is in a league of its own. The service quality is exceptional.",
    videoUrl: "https://videos.pexels.com/video-files/5502320/5502320-hd_1920_1080_30fps.mp4",
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "Gold Member",
    avatar: "/images/testimonials/avatar-3.jpg",
    rating: 5,
    text: "The bridal package was absolutely perfect. Every detail was handled with such elegance and professionalism.",
    videoUrl: "https://videos.pexels.com/video-files/5502320/5502320-hd_1920_1080_30fps.mp4",
  },
  {
    id: 4,
    name: "Sophie Laurent",
    role: "Diamond Member",
    avatar: "/images/testimonials/avatar-4.jpg",
    rating: 5,
    text: "I came for a keratin treatment and left feeling like a completely new person. Highly recommend VELORA to anyone.",
    videoUrl: "https://videos.pexels.com/video-files/5502320/5502320-hd_1920_1080_30fps.mp4",
  },
  {
    id: 5,
    name: "Amira Al-Mansoori",
    role: "Platinum Member",
    avatar: "/images/testimonials/avatar-5.jpg",
    rating: 5,
    text: "The best salon experience I've had in Dubai. The stylists truly understand their craft and it shows in the results.",
    videoUrl: "https://videos.pexels.com/video-files/5502320/5502320-hd_1920_1080_30fps.mp4",
  },
]

export function VideoTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const autoplayRef = useRef<NodeJS.Timeout>()

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === 0 ? videoTestimonials.length - 1 : prev - 1
    )
  }, [])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === videoTestimonials.length - 1 ? 0 : prev + 1
    )
  }, [])

  // Auto-advance carousel
  useEffect(() => {
    if (!isPlaying || isVideoPlaying) {
      if (autoplayRef.current) clearTimeout(autoplayRef.current)
      return
    }

    autoplayRef.current = setTimeout(() => {
      goToNext()
    }, 5000)

    return () => {
      if (autoplayRef.current) clearTimeout(autoplayRef.current)
    }
  }, [isPlaying, isVideoPlaying, goToNext])

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsVideoPlaying(!isVideoPlaying)
    }
  }

  const currentTestimonial = videoTestimonials[currentIndex]

  return (
    <div
      ref={containerRef}
      className="space-y-8"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Video Player */}
      <div className="relative bg-black rounded-2xl overflow-hidden aspect-video group">
        <video
          ref={videoRef}
          src={currentTestimonial.videoUrl}
          className="w-full h-full object-cover"
          muted
          loop
          onPlay={() => setIsVideoPlaying(true)}
          onPause={() => setIsVideoPlaying(false)}
        />

        {/* Play/Pause Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors duration-300">
          <button
            onClick={toggleVideoPlay}
            className="w-16 h-16 rounded-full bg-primary/90 hover:bg-primary flex items-center justify-center transition-all duration-300 transform hover:scale-110"
            aria-label={isVideoPlaying ? "Pause testimonial video" : "Play testimonial video"}
          >
            {isVideoPlaying ? (
              <Pause className="w-6 h-6 text-foreground fill-foreground ml-0.5" />
            ) : (
              <Play className="w-6 h-6 text-foreground fill-foreground ml-1" />
            )}
          </button>
        </div>

        {/* Video Duration/Progress Indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <div className="h-full bg-primary w-1/3 transition-all duration-300" />
        </div>
      </div>

      {/* Testimonial Info */}
      <div className="space-y-4">
        {/* Rating */}
        <div className="flex items-center gap-1">
          {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
            <Star
              key={i}
              className="w-5 h-5 fill-primary text-primary"
            />
          ))}
        </div>

        {/* Quote */}
        <p className="text-lg md:text-xl text-foreground/80 italic leading-relaxed">
          &quot;{currentTestimonial.text}&quot;
        </p>

        {/* Author Info */}
        <div className="flex items-center gap-4">
          <Image
            src={currentTestimonial.avatar}
            alt={currentTestimonial.name}
            width={56}
            height={56}
            className="w-14 h-14 rounded-full object-cover"
          />
          <div>
            <p className="font-serif text-lg font-medium text-foreground">
              {currentTestimonial.name}
            </p>
            <p className="text-sm text-muted-foreground">
              {currentTestimonial.role}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={goToPrevious}
          className="w-12 h-12 rounded-full border border-border hover:border-primary hover:bg-primary/10 flex items-center justify-center transition-all duration-300"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Dot Indicators */}
        <div className="flex items-center gap-2">
          {videoTestimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                index === currentIndex
                  ? "w-8 bg-primary"
                  : "w-2 bg-border hover:bg-primary/50"
              )}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          className="w-12 h-12 rounded-full border border-border hover:border-primary hover:bg-primary/10 flex items-center justify-center transition-all duration-300"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
