import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { BeforeAfter } from "@/components/before-after"
import { Membership } from "@/components/membership"
import { Testimonials } from "@/components/testimonials"
import { BookingFlow } from "@/components/booking-flow"
import { Footer } from "@/components/footer"
import { StickyCta } from "@/components/sticky-cta"

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <Services />
        <BeforeAfter />
        <Membership />
        <Testimonials />
        <BookingFlow />
      </main>
      <Footer />
      <StickyCta />
    </>
  )
}
