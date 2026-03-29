import type { Metadata, Viewport } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'VELORA Beauty Salon | Premium Hair & Beauty Services in Dubai',
  description: 'Experience luxury beauty services at VELORA Dubai. Expert hair styling, color treatments, bridal packages, and premium skincare. Book your appointment today.',
  keywords: 'Dubai salon, luxury beauty, hair styling Dubai, bridal makeup Dubai, keratin treatment, premium salon Dubai Marina',
  openGraph: {
    title: 'VELORA Beauty Salon | Premium Hair & Beauty Services in Dubai',
    description: 'Experience luxury beauty services at VELORA Dubai. Expert hair styling, color treatments, bridal packages, and premium skincare.',
    type: 'website',
    locale: 'en_AE',
  },
  robots: 'index, follow',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#C9A96E',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="font-sans antialiased">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md">
          Skip to main content
        </a>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
