"use client"

import { useEffect, useRef, useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const tiers = [
  {
    id: "gold",
    name: "Gold",
    price: "500",
    description: "Perfect for regular salon visitors",
    features: [
      "10% off all services",
      "Priority booking",
      "Complimentary blowout monthly",
      "Birthday special treatment",
      "Member-only promotions",
    ],
    highlighted: false,
  },
  {
    id: "platinum",
    name: "Platinum",
    price: "900",
    description: "Our most popular membership",
    features: [
      "20% off all services",
      "Same-day booking priority",
      "2 complimentary blowouts monthly",
      "Free deep conditioning treatment",
      "Birthday luxury package",
      "Exclusive events access",
      "Complimentary drinks",
    ],
    highlighted: true,
  },
  {
    id: "diamond",
    name: "Diamond",
    price: "1,500",
    description: "The ultimate luxury experience",
    features: [
      "30% off all services",
      "VIP priority booking 24/7",
      "Unlimited blowouts",
      "Monthly signature treatment",
      "Private suite access",
      "Personal stylist consultation",
      "Exclusive brand gifts",
      "Complimentary valet parking",
    ],
    highlighted: false,
  },
]

function TierCard({ tier, index }: { tier: typeof tiers[0]; index: number }) {
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

  const handleJoin = () => {
    const bookingSection = document.querySelector("#booking")
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative rounded-xl p-8 transition-all duration-500 card-hover",
        tier.highlighted
          ? "bg-foreground text-background border-2 border-primary scale-105 shadow-xl z-10"
          : "bg-card border border-border",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Popular Badge */}
      {tier.highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-primary text-primary-foreground text-xs font-semibold px-4 py-1.5 rounded-full">
            Most Popular
          </span>
        </div>
      )}

      {/* Tier Info */}
      <div className="text-center mb-8">
        <h3 className={cn(
          "font-serif text-2xl mb-2",
          tier.highlighted ? "text-primary" : "text-foreground"
        )}>
          {tier.name}
        </h3>
        <p className={cn(
          "text-sm mb-4",
          tier.highlighted ? "text-background/70" : "text-muted-foreground"
        )}>
          {tier.description}
        </p>
        <div className="flex items-baseline justify-center gap-1">
          <span className={cn(
            "text-sm",
            tier.highlighted ? "text-background/70" : "text-muted-foreground"
          )}>
            AED
          </span>
          <span className={cn(
            "font-serif text-5xl font-medium",
            tier.highlighted ? "text-background" : "text-foreground"
          )}>
            {tier.price}
          </span>
          <span className={cn(
            "text-sm",
            tier.highlighted ? "text-background/70" : "text-muted-foreground"
          )}>
            /month
          </span>
        </div>
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-8">
        {tier.features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <Check className={cn(
              "w-5 h-5 flex-shrink-0 mt-0.5",
              tier.highlighted ? "text-primary" : "text-primary"
            )} />
            <span className={cn(
              "text-sm",
              tier.highlighted ? "text-background/90" : "text-foreground/80"
            )}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Button
        onClick={handleJoin}
        className={cn(
          "w-full btn-hover py-5",
          tier.highlighted
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "bg-foreground text-background hover:bg-foreground/90"
        )}
      >
        Join {tier.name}
      </Button>
    </div>
  )
}

export function Membership() {
  return (
    <section id="membership" className="py-20 lg:py-28 bg-background" aria-labelledby="membership-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-medium text-sm tracking-widest uppercase mb-4">
            Membership
          </p>
          <h2 id="membership-heading" className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground mb-6">
            Join the VELORA Circle
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base lg:text-lg">
            Unlock exclusive benefits, priority booking, and special discounts with our membership tiers.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6 items-start max-w-5xl mx-auto">
          {tiers.map((tier, index) => (
            <TierCard key={tier.id} tier={tier} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
