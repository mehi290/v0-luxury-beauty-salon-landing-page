"use client"

import { BackgroundVideo } from "./video-player"

export function HeroVideo() {
  // Premium stock salon video URLs (from free stock video sites like Pexels, Pixabay)
  // These are example placeholders - replace with actual premium salon footage URLs
  const videoSources = [
    "https://media.istockphoto.com/videos/beauty-salon-interior-with-luxury-lighting-video-id1234567890", // Premium salon ambiance
    "https://videos.pexels.com/video-files/luxury-salon-setup.mp4", // Alternate source
  ]

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Background Video Layer */}
      <BackgroundVideo
        src="https://videos.pexels.com/video-files/3583797/3583797-hd_1920_1080_25fps.mp4"
        poster="/images/hero-salon.jpg"
        className="brightness-50"
      />

      {/* Gradient Overlay for Text Legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
    </div>
  )
}
