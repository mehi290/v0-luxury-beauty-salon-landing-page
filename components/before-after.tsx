"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

const transformations = [
  {
    id: 1,
    title: "Balayage Transformation",
    description: "From blonde ombre to stunning ash balayage",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Ng6damy2Oi68SizSdUvMFIKFlLBT0Y.png",
  },
  {
    id: 2,
    title: "Keratin Smoothing",
    description: "Frizzy to sleek, silky straight hair",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ymTtQn1JGKauHM1V5bfF9wPkPRueWC.png",
  },
  {
    id: 3,
    title: "Color Collection",
    description: "Our signature hair transformations",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vPIX71vvti7r3OCkZyxihx8U3IUCkO.png",
  },
  {
    id: 4,
    title: "Brow & Makeup Enhancement",
    description: "Professional brow shaping and makeup artistry",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Otnw0leczJ9qLvqHTWTntWm1aYfcYM.png",
  },
]

function BeforeAfterSlider({ transformation }: { transformation: typeof transformations[0] }) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return
    handleMove(e.clientX)
  }, [isDragging, handleMove])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return
    handleMove(e.touches[0].clientX)
  }, [isDragging, handleMove])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
      window.addEventListener("touchmove", handleTouchMove)
      window.addEventListener("touchend", handleMouseUp)
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleMouseUp)
    }
  }, [isDragging, handleMouseMove, handleTouchMove, handleMouseUp])

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-ew-resize select-none"
      onMouseDown={(e) => {
        setIsDragging(true)
        handleMove(e.clientX)
      }}
      onTouchStart={(e) => {
        setIsDragging(true)
        handleMove(e.touches[0].clientX)
      }}
    >
      {/* Full Image (After/Right side) */}
      <Image
        src={transformation.image}
        alt={`${transformation.title} - After`}
        fill
        className="object-cover"
        draggable={false}
      />
      
      {/* Clipped Image (Before/Left side) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          src={transformation.image}
          alt={`${transformation.title} - Before`}
          fill
          className="object-cover grayscale"
          draggable={false}
        />
      </div>

      {/* Slider Line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-primary z-10"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Slider Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg">
          <div className="flex items-center gap-0.5">
            <div className="w-0 h-0 border-y-4 border-y-transparent border-r-4 border-r-primary-foreground" />
            <div className="w-0 h-0 border-y-4 border-y-transparent border-l-4 border-l-primary-foreground" />
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute bottom-4 left-4 bg-foreground/80 text-white px-3 py-1 rounded text-xs font-medium">
        Before
      </div>
      <div className="absolute bottom-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded text-xs font-medium">
        After
      </div>
    </div>
  )
}

function GalleryCard({ transformation, index }: { transformation: typeof transformations[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.2 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={cardRef}
      className={cn(
        "transition-all duration-500",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <BeforeAfterSlider transformation={transformation} />
      <div className="mt-4">
        <h3 className="font-serif text-lg text-foreground mb-1">
          {transformation.title}
        </h3>
        <p className="text-muted-foreground text-sm">
          {transformation.description}
        </p>
      </div>
    </div>
  )
}

export function BeforeAfter() {
  return (
    <section id="gallery" className="py-20 lg:py-28 bg-muted" aria-labelledby="gallery-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-medium text-sm tracking-widest uppercase mb-4">
            Transformations
          </p>
          <h2 id="gallery-heading" className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground mb-6">
            See the Difference
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base lg:text-lg">
            Drag the slider to reveal stunning before and after transformations by our expert stylists.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {transformations.map((transformation, index) => (
            <GalleryCard key={transformation.id} transformation={transformation} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
