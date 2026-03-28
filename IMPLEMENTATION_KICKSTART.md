# VELORA Beauty Salon - Implementation Plan

## Project Overview

**Type**: Frontend Prototype Only (No Backend Logic)  
**Market**: Dubai, UAE  
**Target Persona**: Lina, 32, Dubai-based professional seeking premium beauty experiences  
**Framework**: Next.js 15 + Tailwind CSS + Shadcn/UI + Framer Motion

---

## Design Token System

### Color Palette (4 Colors Total)

| Token | Hex | Usage |
|-------|-----|-------|
| `--background` | `#FAF8F5` | Soft Ivory - Page background, cards |
| `--foreground` | `#1C1C1C` | Deep Charcoal - Primary text, headings |
| `--primary` | `#C9A96E` | Champagne Gold - Accent, CTAs, highlights |
| `--primary-foreground` | `#FFFFFF` | White text on gold buttons |
| `--muted` | `#F5F0EB` | Warm off-white - Section alternates |
| `--muted-foreground` | `#6B6B6B` | Secondary text, descriptions |
| `--border` | `#E8E2DA` | Subtle warm borders |
| `--ring` | `#C9A96E` | Focus states (matches primary) |

### Typography

| Element | Font | Weight | Size (Desktop) | Size (Mobile) |
|---------|------|--------|----------------|---------------|
| H1 Hero | Cormorant Garamond | 500 | 72px | 40px |
| H2 Section | Cormorant Garamond | 500 | 48px | 32px |
| H3 Card Title | Cormorant Garamond | 500 | 28px | 22px |
| Body | Inter | 400 | 16px | 15px |
| Caption | Inter | 400 | 14px | 13px |
| Button | Inter | 500 | 14px | 14px |
| Nav Links | Inter | 500 | 14px | 14px |

### Spacing Scale

```
--space-xs: 0.5rem (8px)
--space-sm: 1rem (16px)
--space-md: 1.5rem (24px)
--space-lg: 2rem (32px)
--space-xl: 3rem (48px)
--space-2xl: 4rem (64px)
--space-3xl: 6rem (96px)
```

### Border Radius

```
--radius-sm: 4px (subtle rounding)
--radius-md: 8px (cards, buttons)
--radius-lg: 12px (feature cards)
--radius-full: 9999px (pills, avatars)
```

---

## Page Architecture

### Full-Width Single Page Layout

```
┌─────────────────────────────────────────────────┐
│ HEADER (Sticky)                                 │
│ Logo | Nav Links | Book Now CTA                 │
│ [Burger Menu on Mobile/Tablet]                  │
├─────────────────────────────────────────────────┤
│ HERO SECTION                                    │
│ Full-width luxury imagery                       │
│ Headline + Subtext + Dual CTAs                  │
│ "Seen In" Marquee (Vogue, Harper's Bazaar)      │
├─────────────────────────────────────────────────┤
│ SERVICES SECTION                                │
│ Service cards with hover overlays               │
│ Quick Book functionality (UI only)              │
├─────────────────────────────────────────────────┤
│ BEFORE/AFTER GALLERY                            │
│ Slider comparison cards                         │
│ 4 transformation images provided                │
├─────────────────────────────────────────────────┤
│ MEMBERSHIP TIERS                                │
│ 3-column pricing cards                          │
│ Gold, Platinum, Diamond tiers                   │
├─────────────────────────────────────────────────┤
│ TESTIMONIALS                                    │
│ Auto-play carousel                              │
│ Client photos + reviews + Google badge          │
├─────────────────────────────────────────────────┤
│ BOOKING SECTION                                 │
│ Animated multi-step form (UI prototype)         │
│ Service → Stylist → Date/Time → Confirm         │
├─────────────────────────────────────────────────┤
│ FOOTER                                          │
│ Contact info, location, social links            │
│ WhatsApp button (UI only)                       │
├─────────────────────────────────────────────────┤
│ STICKY FOOTER CTA (All Breakpoints)             │
│ "Book Your Experience" + Phone/WhatsApp icons   │
└─────────────────────────────────────────────────┘
```

---

## Component Breakdown

### 1. Header Component
- **Desktop**: Logo left, nav center, CTA right
- **Mobile/Tablet**: Logo left, burger menu right
- **Behavior**: Sticky on scroll with subtle backdrop blur
- **Mobile Menu**: Full-screen overlay with animated links

### 2. Hero Section
- Full-viewport height
- Background: Generated luxury salon imagery or gradient overlay
- Headline: "Where Beauty Meets Artistry"
- CTAs: "Book Your Experience" (primary) + "Explore Services" (outline)
- Marquee: Infinite scroll "As Seen In" logos

### 3. Services Grid
- 6 service cards in responsive grid (3 cols desktop, 2 tablet, 1 mobile)
- Services: Hair Styling, Color & Highlights, Keratin Treatments, Bridal Packages, Nail Artistry, Facial Treatments
- Hover: Overlay with "Quick Book" button + price preview
- Scroll Animation: Fade-up on viewport entry

### 4. Before/After Gallery
- 4 comparison cards using provided images
- Interactive slider (drag to reveal)
- Images provided:
  - Hair: Blonde ombre to ash balayage
  - Hair: Frizzy to sleek straight
  - Hair: Collage of 8 transformations
  - Makeup: Eyebrow and makeup enhancement

### 5. Membership Section
- 3 pricing cards side-by-side
- Tiers: Gold (AED 500/mo), Platinum (AED 900/mo), Diamond (AED 1,500/mo)
- Highlighted "Most Popular" badge on Platinum
- Hover: Subtle lift effect

### 6. Testimonials Carousel
- Auto-play with pause on hover
- 5 testimonial cards
- Avatar images (generated or placeholder)
- Google Reviews badge (static UI)
- Scroll indicators/dots

### 7. Booking Flow (UI Prototype)
- 4-step animated form
- Step 1: Select Service (cards)
- Step 2: Choose Stylist (avatar cards)
- Step 3: Pick Date/Time (calendar UI)
- Step 4: Confirmation screen
- Progress indicator at top

### 8. Footer
- 4-column layout (Logo/About, Services, Contact, Social)
- WhatsApp floating button (links to wa.me)
- Location: Dubai Marina
- Operating hours display

### 9. Sticky Footer CTA
- Fixed bottom bar on all breakpoints
- "Book Your Experience" button
- WhatsApp and Phone icons
- Subtle top border

---

## Animation Specifications

### Micro-Interactions (Framer Motion)

| Element | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Cards on scroll | Fade up + scale | 0.5s | easeOut |
| Buttons hover | Scale 1.02 + shadow | 0.2s | easeInOut |
| Nav links hover | Underline slide | 0.3s | easeOut |
| Service overlay | Fade in | 0.3s | easeOut |
| Carousel slide | Slide + fade | 0.4s | easeInOut |
| Booking steps | Slide left/right | 0.4s | easeInOut |
| Mobile menu | Slide down + stagger | 0.5s | spring |

### Scroll Animations
- Intersection Observer trigger at 20% viewport
- Staggered children (0.1s delay each)
- No heavy parallax effects

---

## Responsive Breakpoints

| Breakpoint | Width | Layout Adjustments |
|------------|-------|-------------------|
| Mobile | < 640px | Single column, burger menu, stacked CTAs |
| Tablet | 640px - 1024px | 2-column grids, burger menu |
| Laptop | 1024px - 1280px | 3-column grids, full nav |
| Desktop | > 1280px | Full layout, max-width containers |

### Container Max Widths
- Content: `max-w-7xl` (1280px)
- Narrow sections: `max-w-4xl` (896px)
- Full-width sections: `w-full` with padded content

---

## SEO Structure

### Meta Tags
```html
<title>VELORA Beauty Salon | Premium Hair & Beauty Services in Dubai</title>
<meta name="description" content="Experience luxury beauty services at VELORA Dubai. Expert hair styling, color treatments, bridal packages, and premium skincare. Book your appointment today." />
<meta name="keywords" content="Dubai salon, luxury beauty, hair styling Dubai, bridal makeup Dubai, keratin treatment" />
```

### Semantic HTML
- `<header>` for navigation
- `<main>` for page content
- `<section>` for each content block with aria-labels
- `<article>` for testimonials
- `<footer>` for footer content
- Proper heading hierarchy (H1 > H2 > H3)

### Accessibility
- Alt text for all images
- Focus-visible states on interactive elements
- Skip-to-content link
- Sufficient color contrast (4.5:1 minimum)
- Screen reader text for icons

---

## File Structure

```
/app
  /page.tsx                 # Main landing page
  /layout.tsx               # Root layout with fonts + meta
  /globals.css              # Design tokens + custom styles

/components
  /header.tsx               # Sticky header with mobile menu
  /hero.tsx                 # Hero section with marquee
  /services.tsx             # Services grid
  /before-after.tsx         # Gallery with sliders
  /membership.tsx           # Pricing tiers
  /testimonials.tsx         # Auto-play carousel
  /booking-flow.tsx         # Multi-step form UI
  /footer.tsx               # Footer with contact
  /sticky-cta.tsx           # Fixed bottom CTA bar
  /ui/                      # Shadcn components (existing)

/public
  /images
    /before-after/          # Provided transformation images
    /testimonials/          # Avatar images
```

---

## Implementation Order

1. **Phase 1: Foundation**
   - Update `globals.css` with design tokens
   - Configure fonts in `layout.tsx`
   - Update metadata for SEO

2. **Phase 2: Layout Components**
   - Header with responsive navigation
   - Footer with contact info
   - Sticky CTA bar

3. **Phase 3: Hero Section**
   - Full-viewport hero with CTAs
   - "Seen In" marquee animation

4. **Phase 4: Content Sections**
   - Services grid with hover effects
   - Before/After gallery with sliders
   - Membership pricing cards

5. **Phase 5: Interactive Elements**
   - Testimonials carousel
   - Booking flow prototype
   - Scroll animations

6. **Phase 6: Polish**
   - Final responsive adjustments
   - Animation timing refinements
   - Accessibility audit

---

## Image Assets

### Provided Before/After Images
1. `before-after-1.png` - Blonde ombre to ash balayage transformation
2. `before-after-2.png` - Frizzy to sleek straight hair treatment
3. `before-after-3.png` - Collage of 8 hair transformations
4. `before-after-4.png` - Eyebrow and makeup enhancement

### To Generate
- Hero background image (luxury salon interior)
- Service card images (6 total)
- Testimonial avatars (5 total)
- Stylist avatars for booking flow (4 total)

---

## Ready for Development

This plan provides complete specifications for building the VELORA luxury beauty salon landing page as a frontend prototype. All interactions are UI-only with no backend dependencies.

**Approval Required**: Please confirm this implementation plan before we proceed with coding.
