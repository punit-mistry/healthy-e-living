'use client'

import Header from '@/components/header'
import Hero from '@/components/hero'
import About from '@/components/about'
import Services from '@/components/services'
import Approach from '@/components/approach'
import Credentials from '@/components/credentials'
import Benefits from '@/components/benefits'
import Testimonials from '@/components/testimonials'
import Reels from '@/components/reels'
import FAQ from '@/components/faq'
import CTA from '@/components/cta'
import Contact from '@/components/contact'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Approach />
        <Credentials />
        <Benefits />
        <Testimonials />
        <Reels />
        <FAQ />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
