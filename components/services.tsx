"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Service {
  id: number
  title: string
  description: string
  price: string
  image: string
  video?: string
}

const services: Service[] = [
  {
    id: 1,
    title: "Hair Styling",
    description: "Expert cuts, blowouts, and styling for every occasion",
    price: "From AED 250",
    image: "/images/services/hair-styling.jpg",
    video: "/videos/hair style.mp4",
  },
  {
    id: 2,
    title: "Color & Highlights",
    description: "Balayage, ombre, and custom color transformations",
    price: "From AED 450",
    image: "/images/services/hair-color.jpg",
  },
  {
    id: 3,
    title: "Keratin Treatments",
    description: "Smooth, frizz-free hair that lasts for months",
    price: "From AED 800",
    image: "/images/services/keratin.jpg",
    video: "/videos/keratin.mp4",
  },
  {
    id: 4,
    title: "Bridal Packages",
    description: "Complete wedding day styling and makeup",
    price: "From AED 2,500",
    image: "/images/services/bridal.jpg",
  },
  {
    id: 5,
    title: "Nail Artistry",
    description: "Manicures, pedicures, and custom nail art",
    price: "From AED 150",
    image: "/manipedi.jpg",
  },
  {
    id: 6,
    title: "Facial Treatments",
    description: "Premium skincare and rejuvenating facials",
    price: "From AED 350",
    image: "/images/services/facial.jpg",
  },
]

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
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

  const handleQuickBook = () => {
    const bookingSection = document.querySelector("#booking")
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div
      ref={cardRef}
      className={cn(
        "group relative overflow-hidden rounded-lg bg-card cursor-pointer transition-all duration-500",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden">
        {service.video ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-transform duration-500",
              isHovered && "scale-105"
            )}
          >
            <source src={service.video} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={service.image}
            alt={service.title}
            fill
            className={cn(
              "object-cover transition-transform duration-500",
              isHovered && "scale-105"
            )}
          />
        )}
        
        {/* Gradient Overlay */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent transition-opacity duration-300",
          isHovered ? "opacity-90" : "opacity-70"
        )} />
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <h3 className="font-serif text-xl sm:text-2xl text-white mb-2">
            {service.title}
          </h3>
          <p className={cn(
            "text-white/80 text-sm mb-3 transition-all duration-300",
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          )}>
            {service.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="font-medium text-sm" style={{ color: service.id === 4 ? "#fefbfb" : service.id === 2 ? "#faf3f3" : "#fefbfb" }}>
              {service.price}
            </span>
            <Button
              size="sm"
              onClick={handleQuickBook}
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
  )
}

export function Services() {
  return (
    <section id="services" className="py-20 lg:py-28 bg-background" aria-labelledby="services-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-medium text-sm tracking-widest uppercase mb-4">
            Our Services
          </p>
          <h2 id="services-heading" className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground mb-6">
            Crafted for Excellence
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base lg:text-lg">
            Every service at VELORA is designed to deliver exceptional results, combining artistry with the finest products and techniques.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
