import React from "react";
import { FaLeaf, FaBed, FaSmile } from "react-icons/fa";

const FeaturesSection = () => {
  const features = [
    {
      icon: "🥗",
      title: "Healthy Eating",
      description: "Discover meals that energize your body",
    },
    {
      icon: "💪",
      title: "Better Nutrition",
      description: "Fuel your workouts with nutritious meals",
    },
    {
      icon: "😊",
      title: "Less Stress",
      description: "Enjoy balanced meals for a happier life",
    },
  ];

  return (
    <div className="bg-cyan-500 py-16 flex flex-col md:flex-row justify-around text-white text-sm">
      <div className="flex items-center text-black gap-2">
        <FaLeaf className="text-5xl" />
        <div className="pl-2">
          <strong>Healthy Eating</strong>
          <br />
          Discover meals that energize your body.
        </div>
      </div>
      <div className="flex items-center text-black gap-2">
        <FaBed className="text-5xl"/>
        <div>
          <strong>Better Nutrition</strong>
          <br />
          Fuel your workouts with nutritious meals.
        </div>
      </div>
      <div className="flex items-center text-black gap-2">
        <FaSmile className="text-5xl"/>
        <div>
          <strong>Less Stress</strong>
          <br />
          Enjoy balanced meals for a happier life.
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
