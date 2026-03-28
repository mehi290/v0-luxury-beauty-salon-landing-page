"use client"

import { useState, useEffect } from "react"
import { Phone, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function StickyCta() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero section (approximately viewport height)
      setIsVisible(window.scrollY > window.innerHeight * 0.5)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleBookClick = () => {
    const bookingSection = document.querySelector("#booking")
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 transform transition-transform duration-300 ease-out",
        isVisible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="bg-background border-t border-border shadow-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Left side - Contact icons (mobile/tablet) */}
            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href="tel:+97145551234"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                aria-label="Call us"
              >
                <Phone className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/97145551234"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-colors duration-200"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>

            {/* Right side - Book button */}
            <Button
              onClick={handleBookClick}
              className="bg-primary text-primary-foreground hover:bg-primary/90 btn-hover flex-1 sm:flex-none sm:min-w-[200px] py-5"
            >
              Book Your Experience
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
