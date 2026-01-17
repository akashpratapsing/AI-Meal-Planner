import {
  Brain,
  CalendarCheck,
  Flame,
  Sparkles,
  Heart,
  TrendingUp,
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <Brain className="w-7 h-7" />,
      title: "AI Meal Planning",
      description:
        "Smart meal plans generated instantly based on your goals, diet, and lifestyle.",
      accent: "from-primary to-accent",
    },
    {
      icon: <CalendarCheck className="w-7 h-7" />,
      title: "Weekly Meal Schedules",
      description:
        "Get structured weekly plans so you never wonder what to eat next.",
      accent: "from-info to-primary",
    },
    {
      icon: <Flame className="w-7 h-7" />,
      title: "Macro & Calorie Tracking",
      description:
        "Stay on target with precise calories, protein, carbs, and fats.",
      accent: "from-warning to-error",
    },
    {
      icon: <Sparkles className="w-7 h-7" />,
      title: "Smart Meal Suggestions",
      description:
        "Instant meal ideas when you’re bored, busy, or out of inspiration.",
      accent: "from-accent to-secondary",
    },
    {
      icon: <Heart className="w-7 h-7" />,
      title: "Favorite Your Meals",
      description:
        "Save meals you love and reuse them anytime with one click.",
      accent: "from-error to-pink-500",
    },
    {
      icon: <TrendingUp className="w-7 h-7" />,
      title: "Real Progress",
      description:
        "Eat better consistently and see measurable results over time.",
      accent: "from-success to-info",
    },
  ];

  return (
    <section className="py-24 bg-base-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              eat better
            </span>
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto text-lg">
            Designed to remove guesswork, save time, and help you stay consistent.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group bg-base-100 border border-base-300 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${feature.accent} text-white mb-6 group-hover:scale-110 transition-transform`}
              >
                {feature.icon}
              </div>

              {/* Text */}
              <h3 className="text-xl font-semibold mb-3">
                {feature.title}
              </h3>
              <p className="text-base-content/70 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
