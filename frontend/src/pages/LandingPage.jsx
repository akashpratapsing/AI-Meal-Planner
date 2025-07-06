import React from "react";
import Header from "../components/layout/Header";
import Navigation from "../components/layout/Navigation";
import HeroSection from "../components/sections/HeroSection";
import FeaturesSection from "../components/sections/FeaturesSection";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import PricingSection from "../components/sections/PricingSection";
import Footer from "../components/layout/Footer";

const LandingPage = () => {
  return (
    <div className="bg-base-100 min-h-screen font-sans scroll-smooth">
      <Header />
      <Navigation />

      <div id="hero">
        <HeroSection />
      </div>

      <div id="features">
        <FeaturesSection />
      </div>

      <div id="testimonials">
        <TestimonialsSection />
      </div>

      <div id="pricing">
        <PricingSection />
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;
