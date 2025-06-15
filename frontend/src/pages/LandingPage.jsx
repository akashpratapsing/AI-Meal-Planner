import React from 'react'
import Header from '../components/layout/Header'
import Navigation from '../components/layout/Navigation'
import HeroSection from '../components/sections/HeroSection'
import FeaturesSection from '../components/sections/FeaturesSection'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import PricingSection from '../components/sections/PricingSection'
import Footer from '../components/layout/Footer'

const LandingPage = () => {
  return (
      <div className="bg-blue-100 min-h-screen font-sans">
        <Header />
        <Navigation />
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
        <Footer />
      </div>
  )
}

export default LandingPage
