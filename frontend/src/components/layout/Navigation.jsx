import Button from "daisyui/components/button";
import React from "react";
import { FaLeaf } from "react-icons/fa";

const Navigation = () => {
  return (
    <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="font-bold text-black text-lg flex items-center gap-2">
        <FaLeaf className="text-black" /> FitMeal Planner
      </div>
      <div className="space-x-6 text-black hidden md:flex">
        <a href="#" className="hover:text-cyan-500">
          Personalized
        </a>
        <a href="#" className="hover:text-cyan-500">
          Fitness Goals
        </a>
        <a href="#" className="hover:text-cyan-500">
          Healthy
        </a>
        <a href="#" className="hover:text-cyan-500">
          Dietary
        </a>
      </div>
      <div className="space-x-2">
        <button className="btn btn-neutral btn-outline">Log in</button>
        <button className="btn btn-info">Get Started</button>
      </div>
    </div>
  );
};

export default Navigation;
