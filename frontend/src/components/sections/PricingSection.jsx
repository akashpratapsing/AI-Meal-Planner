
import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Leaf, Dumbbell, Heart, Users, Target, TrendingUp, Check, X, Star, Crown, Camera } from 'lucide-react';

const PricingSection = () => {
  const plans = [
    {
      id: 1,
      name: "Free",
      price: 0,
      period: "month",
      icon: <Camera className="w-6 h-6" />,
      features: [
        { name: "5 meal plans monthly", included: true },
        { name: "Recipe library", included: true },
        { name: "Join the community", included: false }
      ],
      buttonText: "Default",
      buttonStyle: "btn-outline text-black bg-white",
      popular: false
    },
    {
      id: 2,
      name: "Pro",
      price: 29,
      period: "month",
      icon: <Star className="w-6 h-6" />,
      features: [
        { name: "10 meal plans monthly", included: true },
        { name: "Recipe library", included: true },
        { name: "Join the community", included: true }
      ],
      buttonText: "Select Pro",
      buttonStyle: "bg-cyan-500 hover:bg-cyan-600 text-white border-none",
      popular: true
    },
    {
      id: 3,
      name: "Premium",
      price: 49,
      period: "month",
      icon: <Crown className="w-6 h-6" />,
      features: [
        { name: "Unlimited meal plans", included: true },
        { name: "Recipe library", included: true },
        { name: "Join the community", included: true }
      ],
      buttonText: "Select Premium",
      buttonStyle: "btn-outline text-black bg-white",
      popular: false
    }
  ];

  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Choose your plan
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Select the perfect plan for your health journey
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-cyan-50 rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                plan.popular 
                  ? 'border-cyan-500 bg-gradient-to-br from-cyan-50 to-cyan-100' 
                  : 'border-cyan-50 hover:border-gray-300'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-cyan-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Plan Icon & Name */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    plan.popular ? 'bg-cyan-500 text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{plan.name}</h3>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-gray-800">${plan.price}</span>
                    <span className="text-gray-500">/ {plan.period}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      )}
                      <span className={`text-sm ${
                        feature.included ? 'text-gray-700' : 'text-gray-400'
                      }`}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button className={`btn w-full ${plan.buttonStyle} text-base font-semibold py-3 rounded-xl transition-all duration-300`}>
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm mb-4">
            All plans include 7-day free trial • Cancel anytime
          </p>
          <div className="flex justify-center gap-6 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Check className="w-4 h-4 text-green-500" />
              No setup fees
            </span>
            <span className="flex items-center gap-1">
              <Check className="w-4 h-4 text-green-500" />
              24/7 support
            </span>
            <span className="flex items-center gap-1">
              <Check className="w-4 h-4 text-green-500" />
              Secure payment
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PricingSection;

