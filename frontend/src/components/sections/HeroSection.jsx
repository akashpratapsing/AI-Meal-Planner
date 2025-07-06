import React from 'react';
import { FaAppleAlt} from "react-icons/fa";

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center text-center py-40">
        <FaAppleAlt className="text-black text-9xl mb-4" />
        <h1 className="text-3xl text-black font-bold">Transform your meals<br />and achieve your goals</h1>
        <button className="bg-cyan-500 mt-6 p-4 rounded-full">Create Plan</button>
      </div>
  );
};

export default HeroSection;