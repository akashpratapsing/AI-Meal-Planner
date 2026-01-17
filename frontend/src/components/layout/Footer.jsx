import React from "react";
import logo from "../../assets/logo.svg";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content border-t border-base-300 py-10 sm:py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Logo and Tagline */}
          <div>
            <div className="flex items-center mb-4 space-x-2">
              <img src={logo} alt="FitMeal Planner" className="h-20 w-auto" />
            </div>
            <p className="text-sm opacity-70">
              Plan your meals. Nourish your life.
            </p>
          </div>

          {/* Learn More */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Learn More</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><a href="#" className="hover:text-primary">About Us</a></li>
              <li><a href="#" className="hover:text-primary">Careers</a></li>
              <li><a href="#" className="hover:text-primary">Press</a></li>
              <li><a href="#" className="hover:text-primary">Subscriptions</a></li>
            </ul>
          </div>

          {/* Help Center */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Help Center</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><a href="#" className="hover:text-primary">Customer Support</a></li>
              <li><a href="#" className="hover:text-primary">FAQs</a></li>
              <li><a href="#" className="hover:text-primary">Contact Us</a></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Community</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><a href="#" className="hover:text-primary">Facebook</a></li>
              <li><a href="#" className="hover:text-primary">Instagram</a></li>
              <li><a href="#" className="hover:text-primary">Twitter</a></li>
              <li><a href="#" className="hover:text-primary">Discord</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-base-300 text-center text-sm opacity-60">
          © {new Date().getFullYear()} FitMeal Planner. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
