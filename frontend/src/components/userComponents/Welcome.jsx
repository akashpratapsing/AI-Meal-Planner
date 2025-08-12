import React, { useState, useEffect } from "react";
import { ChefHat, Clock, Sparkles } from "lucide-react";

const Welcome = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Trigger animation on load
    setAnimationClass("animate-pulse");
    const animationTimer = setTimeout(() => {
      setAnimationClass("");
    }, 2000);

    return () => {
      clearInterval(timer);
      clearTimeout(animationTimer);
    };
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-base-200 via-base-100 to-base-200 flex flex-col items-center justify-center p-6">
      {/* Main Welcome Section */}
      <div className="text-center mb-8">
        <div className={`mb-6 ${animationClass}`}>
          <div className="w-32 h-32 mx-auto mb-4 relative">
            <div className="w-full h-full bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-2xl">
              <ChefHat size={48} className="text-primary-content" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
              <Sparkles size={16} className="text-white" />
            </div>
          </div>
        </div>

        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
          {getGreeting()}!
        </h1>
        <h2 className="text-2xl font-semibold text-base-content mb-2">
          Welcome to FitMeal Planner
        </h2>
        <p className="text-base-content/70 max-w-md mx-auto">
          Your personalized journey to better health and nutrition starts here.
          Let's make every meal count!
        </p>

        <div className="flex items-center justify-center gap-2 mt-4 text-sm text-base-content/60">
          <Clock size={16} />
          <span>{currentTime.toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
