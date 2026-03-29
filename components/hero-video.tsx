"use client"

import Image from "next/image"

export function HeroVideo() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Background Video - Using premium stock salon footage */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover brightness-50"
        poster="/images/hero-salon.jpg"
      >
        {/* Premium salon ambiance video from free stock video providers */}
        <source src="https://videos.pexels.com/video-files/3571264/3571264-hd_1920_1080_25fps.mp4" type="video/mp4" />
        {/* Fallback to static image if video fails to load */}
        <Image
          src="/images/hero-salon.jpg"
          alt="Luxury salon interior"
          fill
          priority
          className="object-cover"
        />
      </video>

      {/* Gradient Overlay for Text Legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
    </div>
  )
}
