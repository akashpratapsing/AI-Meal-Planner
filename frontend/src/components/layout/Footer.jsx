import React from "react";
import { FaSmile } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-10 sm:py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Logo and Tagline */}
          <div>
            <div className="flex items-center mb-4 space-x-2">
              <FaSmile className="text-4xl text-black" />
              <span className="text-xl font-bold text-gray-800">FitMeal Planner</span>
            </div>
            <p className="text-sm text-gray-500">
              Plan your meals. Nourish your life.
            </p>
          </div>

          {/* Learn More */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Learn More</h4>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li><a href="#" className="hover:text-primary">About Us</a></li>
              <li><a href="#" className="hover:text-primary">Careers</a></li>
              <li><a href="#" className="hover:text-primary">Press</a></li>
              <li><a href="#" className="hover:text-primary">Subscriptions</a></li>
            </ul>
          </div>

          {/* Help Center */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Help Center</h4>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li><a href="#" className="hover:text-primary">Customer Support</a></li>
              <li><a href="#" className="hover:text-primary">FAQs</a></li>
              <li><a href="#" className="hover:text-primary">Contact Us</a></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Community</h4>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li><a href="#" className="hover:text-primary">Facebook</a></li>
              <li><a href="#" className="hover:text-primary">Instagram</a></li>
              <li><a href="#" className="hover:text-primary">Twitter</a></li>
              <li><a href="#" className="hover:text-primary">Discord</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 my-6"></div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
          <div>
            <h4 className="text-gray-800 font-bold text-lg mb-1">HEALTHY</h4>
            <h4 className="text-gray-800 font-bold text-lg">EATING</h4>
          </div>

          <div>
            <h5 className="font-semibold text-gray-800 mb-2">Connect with Us</h5>
            <ul className="space-y-1 text-gray-600">
              <li><a href="#" className="hover:text-primary">Facebook</a></li>
              <li><a href="#" className="hover:text-primary">Instagram</a></li>
              <li><a href="#" className="hover:text-primary">LinkedIn</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-gray-800 mb-2">Get Support</h5>
            <ul className="space-y-1 text-gray-600">
              <li><a href="#" className="hover:text-primary">Join our community</a></li>
              <li><a href="#" className="hover:text-primary">Share your recipe</a></li>
              <li><a href="#" className="hover:text-primary">Sign up for tips</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-gray-800 mb-2">Inspiration</h5>
            <ul className="space-y-1 text-gray-600">
              <li><a href="#" className="hover:text-primary">Gift a meal plan</a></li>
              <li><a href="#" className="hover:text-primary">Explore healthy meals</a></li>
              <li><a href="#" className="hover:text-primary">Save on your first plan</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} FitMeal Planner. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
