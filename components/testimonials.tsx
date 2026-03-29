"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { VideoTestimonials } from "./video-testimonials"

const testimonials = [
  {
    id: 1,
    name: "Lina Al-Rashid",
    role: "Diamond Member",
    avatar: "/images/testimonials/avatar-1.jpg",
    rating: 5,
    text: "VELORA has completely transformed my hair care routine. The attention to detail and personalized service is unmatched in Dubai. My balayage has never looked better!",
  },
  {
    id: 2,
    name: "Elena Petrova",
    role: "Platinum Member",
    avatar: "/images/testimonials/avatar-2.jpg",
    rating: 5,
    text: "As someone who has tried many salons in Dubai Marina, I can confidently say VELORA is in a league of its own. The keratin treatment lasted months longer than anywhere else.",
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "Gold Member",
    avatar: "/images/testimonials/avatar-3.jpg",
    rating: 5,
    text: "The bridal package exceeded all my expectations. The team understood exactly what I wanted and made me feel like a princess on my special day. Highly recommend!",
  },
  {
    id: 4,
    name: "Natalia Volkov",
    role: "Diamond Member",
    avatar: "/images/testimonials/avatar-4.jpg",
    rating: 5,
    text: "The membership benefits are incredible value. I love having priority booking and the complimentary treatments. It is my favorite self-care destination.",
  },
  {
    id: 5,
    name: "Maya Khoury",
    role: "Platinum Member",
    avatar: "/images/testimonials/avatar-5.jpg",
    rating: 5,
    text: "From the moment you walk in, you feel the luxury. The stylists are true artists and the products they use are top-tier. My hair has never been healthier.",
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(nextSlide, 5000)
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPaused, nextSlide])

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="py-20 lg:py-28 bg-muted overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={cn(
          "text-center mb-16 transition-all duration-500",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <p className="text-primary font-medium text-sm tracking-widest uppercase mb-4">
            Testimonials
          </p>
          <h2 id="testimonials-heading" className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground mb-6">
            What Our Clients Say
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-foreground font-medium">4.9</span>
            <span className="text-muted-foreground text-sm">on Google Reviews</span>
          </div>
        </div>

        {/* Video Testimonials Section */}
        <div className={cn(
          "mb-16 transition-all duration-500 delay-200",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="mb-8">
            <p className="text-center text-muted-foreground text-sm uppercase tracking-widest mb-3">
              Client Experiences
            </p>
            <h3 className="text-center font-serif text-2xl text-foreground mb-6">
              Watch What Our Clients Say
            </h3>
          </div>
          <VideoTestimonials />
        </div>

        {/* Carousel */}
        <div
          className={cn(
            "relative max-w-4xl mx-auto transition-all duration-500 delay-200",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Testimonial Cards */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-card rounded-xl p-8 lg:p-12 shadow-sm text-center">
                    {/* Avatar */}
                    <div className="relative w-20 h-20 mx-auto mb-6">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        fill
                        className="object-cover rounded-full"
                      />
                      <div className="absolute inset-0 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-card" />
                    </div>

                    {/* Rating */}
                    <div className="flex justify-center gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-foreground text-lg lg:text-xl leading-relaxed mb-6">
                      &ldquo;{testimonial.text}&rdquo;
                    </blockquote>

                    {/* Author */}
                    <div>
                      <p className="font-serif text-lg text-foreground font-medium">
                        {testimonial.name}
                      </p>
                      <p className="text-primary text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === currentIndex
                    ? "w-8 bg-primary"
                    : "bg-border hover:bg-primary/50"
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Google Reviews Badge */}
        <div className={cn(
          "mt-12 flex justify-center transition-all duration-500 delay-300",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="inline-flex items-center gap-3 bg-card rounded-full px-6 py-3 shadow-sm border border-border">
            <svg className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="text-sm font-medium text-foreground">
              Verified Reviews
            </span>
            <div className="flex items-center gap-1 pl-3 border-l border-border">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="text-sm font-semibold text-foreground">4.9</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
