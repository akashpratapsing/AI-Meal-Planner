import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Leaf, Dumbbell, Heart, Users, Target, TrendingUp } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      icon: <Leaf className="w-8 h-8" />,
      title: "Healthy Eating",
      description: "Discover meals that energize your body",
      color: "bg-green-500"
    },
    {
      id: 2,
      icon: <Dumbbell className="w-8 h-8" />,
      title: "Better Nutrition",
      description: "Fuel your workouts with nutritious meals",
      color: "bg-blue-500"
    },
    {
      id: 3,
      icon: <Heart className="w-8 h-8" />,
      title: "Less Stress",
      description: "Enjoy balanced meals for a happier life",
      color: "bg-red-500"
    },
    {
      id: 4,
      icon: <Users className="w-8 h-8" />,
      title: "Community Support",
      description: "Join thousands of health enthusiasts",
      color: "bg-purple-500"
    },
    {
      id: 5,
      icon: <Target className="w-8 h-8" />,
      title: "Goal Achievement",
      description: "Track progress and reach your targets",
      color: "bg-orange-500"
    },
    {
      id: 6,
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Proven Results",
      description: "See real transformation in weeks",
      color: "bg-cyan-500"
    }
  ];

  return (
    <div className="bg-cyan-500 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {features.slice(0, 3).map((feature) => (
            <div key={feature.id} className="flex items-center gap-4 text-white">
              <div className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center flex-shrink-0 shadow-lg`}>
                {feature.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-cyan-100 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;

