import React from "react";

const plans = [
  {
    title: "Basic",
    price: "$0",
    icon: "📷",
    features: [
      "✔ 5 meal plans monthly",
      "✔ Recipe library",
      "✘ Join the community",
    ],
    buttonText: "Select Basic",
    bg: "bg-blue-100 text-black",
    highlight: false,
  },
  {
    title: "Pro",
    price: "$29",
    icon: "⭐",
    features: [
      "✔ 10 meal plans monthly",
      "✔ Recipe library",
      "✔ Join the community",
    ],
    buttonText: "Select Pro",
    bg: "bg-primary text-white",
    highlight: true,
  },
  {
    title: "Premium",
    price: "$49",
    icon: "👑",
    features: [
      "✔ Unlimited meal plans",
      "✔ Recipe library",
      "✔ Join the community",
    ],
    buttonText: "Select Premium",
    bg: "bg-blue-100 text-black",
    highlight: false,
  },
];

const PricingSection = () => {
  return (
    <section className="py-16 bg-blue-100" id="pricing">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800">Choose your plan</h2>
        <p className="text-gray-500 mt-2">Simple and affordable pricing</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`card p-6 rounded-xl shadow-md transition-all duration-300 ${
              plan.highlight ? "scale-105 border-primary" : "hover:shadow-xl"
            } ${plan.bg}`}
          >
            <div className="text-5xl mb-4">{plan.icon}</div>
            <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
            <p className="text-xl font-semibold mb-4">{plan.price}/month</p>
            <ul className="text-sm text-left space-y-2">
              {plan.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
            <button
              className={`btn mt-6 w-full ${
                plan.highlight ? "btn-accent text-white" : "bg-white text-gray-700"
              }`}
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingSection;

