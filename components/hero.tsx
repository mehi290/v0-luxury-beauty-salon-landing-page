"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import {
  VogueArabiaLogo,
  EmiratesWomanLogo,
  BazaarArabiaLogo,
  GraziaArabiaLogo,
  LonelyPlanetLogo,
  TimeOutLogo,
} from "./logos/publication-logos"

const seenInBrands = [
  { id: "vogue", component: VogueArabiaLogo },
  { id: "emirates", component: EmiratesWomanLogo },
  { id: "bazaar", component: BazaarArabiaLogo },
  { id: "grazia", component: GraziaArabiaLogo },
  { id: "lonelyplanet", component: LonelyPlanetLogo },
  { id: "timeout", component: TimeOutLogo },
]

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const handleScroll = () => {
      const scrollY = window.scrollY
      const heroHeight = hero.offsetHeight
      const opacity = Math.max(0, 1 - scrollY / (heroHeight * 0.6))
      hero.style.setProperty("--hero-opacity", opacity.toString())
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleScrollToServices = () => {
    const servicesSection = document.querySelector("#services")
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleScrollToBooking = () => {
    const bookingSection = document.querySelector("#booking")
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-salon.jpg"
          alt="Luxurious VELORA salon interior"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/30 to-foreground/60" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center pt-0">
        <div className="max-w-4xl mx-auto">
          {/* Tagline */}
          <p className="text-primary font-medium text-sm sm:text-base tracking-widest uppercase mb-6 animate-fade-up">
            Dubai Marina&apos;s Premier Beauty Destination
          </p>

          {/* Main Heading */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white leading-tight mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Where Beauty
            <br />
            <span className="text-primary">Meets Artistry</span>
          </h1>

          {/* Subheading */}
          <p className="text-white/80 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Experience luxury beauty services crafted by internationally trained stylists. Your transformation begins here.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Button
              onClick={handleScrollToBooking}
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 btn-hover px-8 py-6 text-base w-full sm:w-auto"
            >
              Book Your Experience
            </Button>
            <Button
              onClick={handleScrollToServices}
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10 px-8 py-6 text-base w-full sm:w-auto"
            >
              Explore Services
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={handleScrollToServices}
          className="absolute bottom-32 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors animate-bounce"
          aria-label="Scroll to services"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </div>

      {/* Seen In Marquee */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-background/95 backdrop-blur-sm py-6 border-t border-border">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-center text-muted-foreground text-xs uppercase tracking-widest mb-6">
            As Seen In
          </p>
        </div>
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee">
            {/* First set */}
            {seenInBrands.map((brand) => {
              const LogoComponent = brand.component
              return (
                <div
                  key={`brand-1-${brand.id}`}
                  className="flex-shrink-0 px-6 sm:px-10 flex items-center justify-center"
                >
                  <div className="text-foreground/70 hover:text-primary transition-colors duration-300 h-12">
                    <LogoComponent />
                  </div>
                </div>
              )
            })}
            {/* Duplicate for seamless loop */}
            {seenInBrands.map((brand) => {
              const LogoComponent = brand.component
              return (
                <div
                  key={`brand-2-${brand.id}`}
                  className="flex-shrink-0 px-6 sm:px-10 flex items-center justify-center"
                >
                  <div className="text-foreground/70 hover:text-primary transition-colors duration-300 h-12">
                    <LogoComponent />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
