"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function FounderSpotlight() {
  return (
    <section className="py-24 lg:py-40 bg-background relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          {/* Media: Cinematic Spotlight Video */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative aspect-[3/4] rounded-full overflow-hidden border-[12px] border-secondary/50 shadow-3xl"
          >
            <video
              autoPlay
              muted
              loop
              playsinline
              className="w-full h-full object-cover"
            >
              <source src="https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-hair-stylist-working-on-a-client-43403-large.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
          </motion.div>

          {/* Content */}
          <div className="flex flex-col justify-center">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-primary font-medium text-sm tracking-[0.4em] uppercase mb-8"
            >
              The Visionary
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-serif text-5xl lg:text-7xl mb-10 leading-tight"
            >
              Artistry with <br />a Soul
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-muted-foreground text-xl lg:text-2xl leading-relaxed mb-12 font-serif italic"
            >
              "True beauty isn't about transformation—it's about magnification. At VELORA, we believe in unveiling the masterpiece that already exists within you through artistry and unhurried care."
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center gap-6"
            >
              <div className="w-16 h-px bg-primary" />
              <div>
                <p className="font-serif text-2xl text-foreground">Anya Volkov</p>
                <p className="text-primary text-sm uppercase tracking-widest font-medium">Founder & Master Stylist</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-radial from-primary/5 to-transparent blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-radial from-secondary/40 to-transparent blur-3xl -z-10" />
    </section>
  )
}
