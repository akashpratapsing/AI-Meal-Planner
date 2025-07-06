import React from "react";
import { FaLeaf } from "react-icons/fa";

const Navigation = () => {
  return (
    <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <div className="font-bold text-black text-lg flex items-center gap-2">
        <FaLeaf className="text-black" /> FitMeal Planner
      </div>

      {/* Navigation Links */}
      <div className="space-x-6 text-black hidden md:flex">
        <a href="#hero" className="hover:text-cyan-500">
          Home
        </a>
        <a href="#features" className="hover:text-cyan-500">
          Features
        </a>
        <a href="#testimonials" className="hover:text-cyan-500">
          Testimonials
        </a>
        <a href="#pricing" className="hover:text-cyan-500">
          Pricing
        </a>
      </div>

      {/* Action Buttons */}
      <div className="space-x-2">
        <a href="/auth">
          <button className="btn btn-neutral btn-outline">Log in</button>
        </a>
        {/* <button className="btn btn-info">Get Started</button> */}
      </div>
    </div>
  );
};

export default Navigation;
