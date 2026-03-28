"use client"

import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from "lucide-react"

const services = [
  "Hair Styling",
  "Color & Highlights",
  "Keratin Treatments",
  "Bridal Packages",
  "Nail Artistry",
  "Facial Treatments",
]

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
]

export function Footer() {
  return (
    <footer id="contact" className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <h2 className="font-serif text-3xl font-medium tracking-tight mb-4">
              VELORA
            </h2>
            <p className="text-background/70 text-sm leading-relaxed mb-6">
              Where beauty meets artistry. Experience premium salon services in the heart of Dubai Marina.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors duration-200"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6">
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-background/70 hover:text-primary transition-colors duration-200 text-sm"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-background/70 text-sm">
                  Marina Plaza, Tower B<br />
                  Dubai Marina, UAE
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a 
                  href="tel:+97145551234" 
                  className="text-background/70 hover:text-primary transition-colors text-sm"
                >
                  +971 4 555 1234
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a 
                  href="mailto:hello@velora.ae" 
                  className="text-background/70 hover:text-primary transition-colors text-sm"
                >
                  hello@velora.ae
                </a>
              </li>
            </ul>
          </div>

          {/* Hours Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6">
              Hours
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-background/70">Monday - Saturday</p>
                  <p className="text-background font-medium">10:00 AM - 9:00 PM</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-background/70">Sunday</p>
                  <p className="text-background font-medium">12:00 PM - 7:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-background/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-background/50 text-sm">
              2024 VELORA Beauty Salon. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-background/50 hover:text-primary text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-background/50 hover:text-primary text-sm transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
