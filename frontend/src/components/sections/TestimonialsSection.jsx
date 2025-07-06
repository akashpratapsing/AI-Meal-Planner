import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TestimonialsSection = () => {
  const scrollContainerRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      quote: "I feel more energetic and focused.",
      name: "Sarah T.",
      role: "Fitness Coach",
      avatar: "ST",
      color: "bg-pink-500",
    },
    {
      id: 2,
      quote: "This planner changed my eating habits!",
      name: "James R.",
      role: "Nutritionist",
      avatar: "JR",
      color: "bg-blue-500",
    },
    {
      id: 3,
      quote: "Meal plans made my life easier.",
      name: "Emma L.",
      role: "Athlete",
      avatar: "EL",
      color: "bg-green-500",
    },
    {
      id: 4,
      quote: "I lost weight and feel fantastic!",
      name: "Michael B.",
      role: "Software Developer",
      avatar: "MB",
      color: "bg-purple-500",
    },
    {
      id: 5,
      quote: "The recipes are delicious and healthy!",
      name: "Lisa K.",
      role: "Yoga Instructor",
      avatar: "LK",
      color: "bg-orange-500",
    },
    {
      id: 6,
      quote: "Amazing support from the community!",
      name: "David M.",
      role: "Personal Trainer",
      avatar: "DM",
      color: "bg-red-500",
    },
  ];

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    const scrollAmount = 320; // Width of card + gap

    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Join our community of health enthusiasts
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            See what our members are saying about their transformation journey
          </p>
        </div>

        {/* Testimonials Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => scroll("left")}
              className="btn btn-circle btn-outline hover:bg-cyan-500 hover:border-cyan-500 hover:text-white transition-all duration-300"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="btn btn-circle btn-outline hover:bg-cyan-500 hover:border-cyan-500 hover:text-white transition-all duration-300"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex-shrink-0 w-80 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 p-6"
              >
                {/* Quote Icon */}
                <div className="mb-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-2xl text-gray-500">"</span>
                  </div>
                </div>

                {/* Quote Text */}
                <div className="mb-6">
                  <p className="text-gray-700 text-lg leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 ${testimonial.color} rounded-full flex items-center justify-center text-white font-semibold`}
                  >
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-base">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>

                {/* Rating Stars */}
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">
                      ★
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: Math.ceil(testimonials.length / 2) }).map(
              (_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-gray-300 hover:bg-cyan-500 cursor-pointer transition-colors duration-300"
                />
              )
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default TestimonialsSection;
