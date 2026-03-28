"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Check, ChevronLeft, ChevronRight, Calendar, Clock, Scissors, User, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const services = [
  { id: 1, name: "Hair Styling", icon: Scissors, price: "From AED 250" },
  { id: 2, name: "Color & Highlights", icon: Sparkles, price: "From AED 450" },
  { id: 3, name: "Keratin Treatment", icon: Sparkles, price: "From AED 800" },
  { id: 4, name: "Bridal Package", icon: Sparkles, price: "From AED 2,500" },
]

const stylists = [
  { id: 1, name: "Sofia Martinez", role: "Senior Stylist", avatar: "/images/stylists/stylist-1.jpg" },
  { id: 2, name: "Marco Rossi", role: "Color Specialist", avatar: "/images/stylists/stylist-2.jpg" },
  { id: 3, name: "Aisha Khan", role: "Makeup Artist", avatar: "/images/stylists/stylist-3.jpg" },
  { id: 4, name: "Nina Chen", role: "Nail Artist", avatar: "/images/stylists/stylist-4.jpg" },
]

const timeSlots = [
  "10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"
]

const steps = [
  { id: 1, label: "Service", icon: Scissors },
  { id: 2, label: "Stylist", icon: User },
  { id: 3, label: "Date & Time", icon: Calendar },
  { id: 4, label: "Confirm", icon: Check },
]

export function BookingFlow() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedService, setSelectedService] = useState<number | null>(null)
  const [selectedStylist, setSelectedStylist] = useState<number | null>(null)
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

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

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedService !== null
      case 2:
        return selectedStylist !== null
      case 3:
        return selectedDate !== null && selectedTime !== null
      case 4:
        return true
      default:
        return false
    }
  }

  const handleNext = () => {
    if (currentStep < 4 && canProceed()) {
      setCurrentStep(currentStep + 1)
    } else if (currentStep === 4) {
      setIsComplete(true)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleReset = () => {
    setCurrentStep(1)
    setSelectedService(null)
    setSelectedStylist(null)
    setSelectedDate(null)
    setSelectedTime(null)
    setIsComplete(false)
  }

  // Generate next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i + 1)
    return {
      day: date.getDate(),
      weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
      month: date.toLocaleDateString("en-US", { month: "short" }),
    }
  })

  return (
    <section
      ref={sectionRef}
      id="booking"
      className="py-20 lg:py-28 bg-background"
      aria-labelledby="booking-heading"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={cn(
          "text-center mb-12 transition-all duration-500",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <p className="text-primary font-medium text-sm tracking-widest uppercase mb-4">
            Book Now
          </p>
          <h2 id="booking-heading" className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground mb-6">
            Reserve Your Experience
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base lg:text-lg">
            Book your appointment in just a few simple steps.
          </p>
        </div>

        {/* Booking Card */}
        <div className={cn(
          "bg-card rounded-2xl shadow-lg border border-border overflow-hidden transition-all duration-500 delay-200",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          {/* Progress Steps */}
          <div className="bg-muted px-6 py-4">
            <div className="flex items-center justify-between max-w-md mx-auto">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300",
                    currentStep > step.id
                      ? "bg-primary text-primary-foreground"
                      : currentStep === step.id
                      ? "bg-foreground text-background"
                      : "bg-border text-muted-foreground"
                  )}>
                    {currentStep > step.id ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={cn(
                      "w-8 sm:w-12 h-0.5 mx-2",
                      currentStep > step.id ? "bg-primary" : "bg-border"
                    )} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="p-6 lg:p-8 min-h-[400px]">
            {isComplete ? (
              /* Confirmation Screen */
              <div className="text-center py-12 animate-fade-up">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-serif text-2xl text-foreground mb-4">
                  Booking Confirmed!
                </h3>
                <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
                  Your appointment has been scheduled. We will send you a confirmation via SMS and email.
                </p>
                <div className="bg-muted rounded-lg p-6 max-w-sm mx-auto mb-8">
                  <div className="space-y-3 text-left">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Service</span>
                      <span className="text-foreground font-medium">
                        {services.find(s => s.id === selectedService)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Stylist</span>
                      <span className="text-foreground font-medium">
                        {stylists.find(s => s.id === selectedStylist)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Date</span>
                      <span className="text-foreground font-medium">
                        {selectedDate && `${dates[selectedDate - 1]?.weekday}, ${dates[selectedDate - 1]?.month} ${dates[selectedDate - 1]?.day}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Time</span>
                      <span className="text-foreground font-medium">{selectedTime}</span>
                    </div>
                  </div>
                </div>
                <Button onClick={handleReset} variant="outline" className="btn-hover">
                  Book Another Appointment
                </Button>
              </div>
            ) : (
              <>
                {/* Step 1: Service Selection */}
                {currentStep === 1 && (
                  <div className="animate-slide-in-right">
                    <h3 className="font-serif text-xl text-foreground mb-6">
                      Select a Service
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {services.map((service) => (
                        <button
                          key={service.id}
                          onClick={() => setSelectedService(service.id)}
                          className={cn(
                            "flex items-center gap-4 p-4 rounded-lg border transition-all duration-200 text-left",
                            selectedService === service.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          )}
                        >
                          <div className={cn(
                            "w-12 h-12 rounded-full flex items-center justify-center",
                            selectedService === service.id
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          )}>
                            <service.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{service.name}</p>
                            <p className="text-sm text-primary">{service.price}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Stylist Selection */}
                {currentStep === 2 && (
                  <div className="animate-slide-in-right">
                    <h3 className="font-serif text-xl text-foreground mb-6">
                      Choose Your Stylist
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {stylists.map((stylist) => (
                        <button
                          key={stylist.id}
                          onClick={() => setSelectedStylist(stylist.id)}
                          className={cn(
                            "flex flex-col items-center p-4 rounded-lg border transition-all duration-200",
                            selectedStylist === stylist.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          )}
                        >
                          <div className="relative w-16 h-16 mb-3">
                            <Image
                              src={stylist.avatar}
                              alt={stylist.name}
                              fill
                              className="object-cover rounded-full"
                            />
                            {selectedStylist === stylist.id && (
                              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                <Check className="w-3 h-3 text-primary-foreground" />
                              </div>
                            )}
                          </div>
                          <p className="font-medium text-foreground text-sm text-center">
                            {stylist.name}
                          </p>
                          <p className="text-xs text-muted-foreground text-center">
                            {stylist.role}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Date & Time Selection */}
                {currentStep === 3 && (
                  <div className="animate-slide-in-right">
                    <h3 className="font-serif text-xl text-foreground mb-6">
                      Select Date & Time
                    </h3>
                    
                    {/* Date Selection */}
                    <div className="mb-8">
                      <div className="flex items-center gap-2 mb-4">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-foreground">Available Dates</span>
                      </div>
                      <div className="flex gap-3 overflow-x-auto pb-2">
                        {dates.map((date, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedDate(index + 1)}
                            className={cn(
                              "flex-shrink-0 flex flex-col items-center px-4 py-3 rounded-lg border transition-all duration-200",
                              selectedDate === index + 1
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border hover:border-primary/50"
                            )}
                          >
                            <span className="text-xs">{date.weekday}</span>
                            <span className="text-lg font-semibold">{date.day}</span>
                            <span className="text-xs">{date.month}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Time Selection */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-foreground">Available Times</span>
                      </div>
                      <div className="grid grid-cols-4 gap-3">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={cn(
                              "px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-200",
                              selectedTime === time
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border hover:border-primary/50 text-foreground"
                            )}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Review */}
                {currentStep === 4 && (
                  <div className="animate-slide-in-right">
                    <h3 className="font-serif text-xl text-foreground mb-6">
                      Review Your Booking
                    </h3>
                    <div className="bg-muted rounded-lg p-6 mb-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between pb-4 border-b border-border">
                          <div className="flex items-center gap-3">
                            <Scissors className="w-5 h-5 text-primary" />
                            <span className="text-muted-foreground">Service</span>
                          </div>
                          <span className="font-medium text-foreground">
                            {services.find(s => s.id === selectedService)?.name}
                          </span>
                        </div>
                        <div className="flex items-center justify-between pb-4 border-b border-border">
                          <div className="flex items-center gap-3">
                            <User className="w-5 h-5 text-primary" />
                            <span className="text-muted-foreground">Stylist</span>
                          </div>
                          <span className="font-medium text-foreground">
                            {stylists.find(s => s.id === selectedStylist)?.name}
                          </span>
                        </div>
                        <div className="flex items-center justify-between pb-4 border-b border-border">
                          <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-primary" />
                            <span className="text-muted-foreground">Date</span>
                          </div>
                          <span className="font-medium text-foreground">
                            {selectedDate && `${dates[selectedDate - 1]?.weekday}, ${dates[selectedDate - 1]?.month} ${dates[selectedDate - 1]?.day}`}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Clock className="w-5 h-5 text-primary" />
                            <span className="text-muted-foreground">Time</span>
                          </div>
                          <span className="font-medium text-foreground">{selectedTime}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground text-center">
                      By confirming, you agree to our booking terms and cancellation policy.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Navigation */}
          {!isComplete && (
            <div className="px-6 lg:px-8 pb-6 flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="bg-primary text-primary-foreground hover:bg-primary/90 btn-hover gap-2"
              >
                {currentStep === 4 ? "Confirm Booking" : "Continue"}
                {currentStep !== 4 && <ChevronRight className="w-4 h-4" />}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
