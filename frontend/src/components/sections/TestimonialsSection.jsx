import React from "react";


const TestimonialsSection = () => {
  return (
    <div className="py-10 text-black text-center">
      <h2 className="font-bold text-lg mb-6">
        Join our community of health enthusiasts
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-6">
        {[
          {
            text: "I feel more energetic and focused.",
            name: "Sarah T.",
            role: "Fitness Coach",
          },
          {
            text: "This planner changed my eating habits!",
            name: "James R.",
            role: "Nutritionist",
          },
          {
            text: "Meal plans made my life easier.",
            name: "Emma L.",
            role: "Athlete",
          },
          {
            text: "I lost weight and feel fantastic!",
            name: "Michael B.",
            role: "Software Developer",
          },
        ].map((item, idx) => (
          <div key={idx} className="bg-[#d4cdc3] p-4 rounded-lg">
            <p className="text-3xl">“</p>
            <p className="mb-2">{item.text}</p>
            <div className="text-sm font-semibold">{item.name}</div>
            <div className="text-xs">{item.role}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
