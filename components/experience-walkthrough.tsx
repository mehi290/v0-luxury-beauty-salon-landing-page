"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

const steps = [
  {
    id: 1,
    title: "Warm Welcome",
    description: "Your journey starts with a personalized greeting and a signature wellness beverage in our luxury lounge.",
    video: "https://assets.mixkit.co/videos/preview/mixkit-woman-smiling-while-getting-her-hair-washed-42860-large.mp4",
  },
  {
    id: 2,
    title: "Expert Consultation",
    description: "Collaborate with our master artisans to design a look that perfectly complements your features and lifestyle.",
    video: "https://assets.mixkit.co/videos/preview/mixkit-stylist-washing-a-clients-hair-in-a-salon-43405-large.mp4",
  },
  {
    id: 3,
    title: "The Art of Service",
    description: "Relax as we apply the world's finest products using techniques honed in the fashion capitals of the world.",
    video: "https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-hair-stylist-working-on-a-client-43403-large.mp4",
  },
  {
    id: 4,
    title: "The Reveal",
    description: "Experience the VELORA signature finish—a moment of pure transformation and renewed confidence.",
    video: "https://assets.mixkit.co/videos/preview/mixkit-woman-getting-her-hair-done-at-a-salon-42861-large.mp4",
  },
]

export function ExperienceWalkthrough() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  return (
    <section 
      ref={containerRef}
      id="experience" 
      className="py-24 lg:py-32 bg-foreground text-background overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20 lg:mb-32">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-primary font-medium text-sm tracking-[0.3em] uppercase mb-6"
          >
            Your Journey
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-serif text-4xl sm:text-5xl lg:text-7xl mb-8 leading-tight"
          >
            The VELORA Experience
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="h-px bg-primary/30 w-32 mx-auto"
          />
        </div>

        {/* Steps Grid */}
        <div className="space-y-24 lg:space-y-48">
          {steps.map((step, index) => (
            <div 
              key={step.id}
              className={cn(
                "flex flex-col lg:flex-row items-center gap-12 lg:gap-24",
                index % 2 !== 0 && "lg:flex-row-reverse"
              )}
            >
              {/* Media Container */}
              <motion.div 
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full lg:w-3/5"
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl group border border-white/10">
                  <video
                    autoPlay
                    muted
                    loop
                    playsinline
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  >
                    <source src={step.video} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-primary/10 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-700" />
                </div>
              </motion.div>

              {/* Text Content */}
              <motion.div 
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="w-full lg:w-2/5"
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-serif text-5xl lg:text-6xl text-primary/40 leading-none">
                    0{step.id}
                  </span>
                  <div className="h-px bg-primary/40 flex-grow" />
                </div>
                <h3 className="font-serif text-3xl lg:text-5xl mb-6">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-lg lg:text-xl leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
