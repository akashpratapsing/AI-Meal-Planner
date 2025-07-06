import React, { useState, useEffect } from 'react';
import { 
  Utensils, 
  Target, 
  Calendar, 
  User, 
  TrendingUp, 
  Apple, 
  Dumbbell, 
  Heart,
  ChefHat,
  Clock,
  Award,
  Sparkles
} from 'lucide-react';

const Welcome = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Trigger animation on load
    setAnimationClass('animate-pulse');
    const animationTimer = setTimeout(() => {
      setAnimationClass('');
    }, 2000);

    return () => {
      clearInterval(timer);
      clearTimeout(animationTimer);
    };
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const quickActions = [
    {
      icon: Utensils,
      title: 'Meal Planning',
      description: 'Create your weekly meal plan',
      color: 'bg-gradient-to-br from-orange-400 to-red-500',
      iconColor: 'text-white'
    },
    {
      icon: Target,
      title: 'Set Goals',
      description: 'Define your fitness objectives',
      color: 'bg-gradient-to-br from-blue-400 to-purple-500',
      iconColor: 'text-white'
    },
    {
      icon: User,
      title: 'Profile',
      description: 'Update your personal information',
      color: 'bg-gradient-to-br from-green-400 to-teal-500',
      iconColor: 'text-white'
    },
    {
      icon: TrendingUp,
      title: 'Progress',
      description: 'Track your fitness journey',
      color: 'bg-gradient-to-br from-pink-400 to-rose-500',
      iconColor: 'text-white'
    }
  ];

  const stats = [
    { icon: Apple, value: '1,247', label: 'Calories Today', color: 'text-success' },
    { icon: Dumbbell, value: '5', label: 'Workouts This Week', color: 'text-info' },
    { icon: Heart, value: '98%', label: 'Health Score', color: 'text-error' },
    { icon: Award, value: '12', label: 'Goals Achieved', color: 'text-warning' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200 flex flex-col items-center justify-center p-6">
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

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 w-full max-w-4xl">
        {stats.map((stat, index) => (
          <div key={index} className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="card-body items-center text-center p-4">
              <stat.icon size={24} className={stat.color} />
              <h3 className="font-bold text-lg">{stat.value}</h3>
              <p className="text-xs text-base-content/60">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="w-full max-w-4xl">
        <h3 className="text-xl font-semibold text-center mb-6 text-base-content">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <div 
              key={index}
              className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group"
            >
              <div className="card-body items-center text-center p-6">
                <div className={`w-16 h-16 rounded-full ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <action.icon size={24} className={action.iconColor} />
                </div>
                <h4 className="font-semibold text-base-content mb-2">
                  {action.title}
                </h4>
                <p className="text-sm text-base-content/60">
                  {action.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Getting Started Hint
      <div className="mt-8 text-center">
        <div className="alert alert-info shadow-lg max-w-md">
          <div className="flex items-center gap-2">
            <Sparkles size={20} />
            <span className="text-sm">
              Select a section from the sidebar to get started on your fitness journey!
            </span>
          </div>
        </div>
      </div> */}

      {/* Floating Elements */}
      {/* <div className="fixed top-10 right-10 opacity-20 animate-bounce">
        <Apple size={32} className="text-primary" />
      </div> */}
      {/* <div className="fixed bottom-10 left-10 opacity-20 animate-pulse">
        <Heart size={28} className="text-error" />
      </div>
      <div className="fixed top-1/2 left-10 opacity-20 animate-spin" style={{ animationDuration: '8s' }}>
        <Target size={24} className="text-secondary" />
      </div> */}
    </div>
  );
};

export default Welcome;