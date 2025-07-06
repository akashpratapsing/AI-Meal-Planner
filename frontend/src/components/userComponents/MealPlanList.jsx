import React, { useState } from 'react';
import { Calendar, User, Clock, Search, Filter } from 'lucide-react';

const MealPlanList = ({ mealPlans }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const defaultMealPlans = [
    {
      id: 1,
      name: "Mediterranean Week",
      dateCreated: "2024-12-15",
      dietaryType: "vegetarian",
      totalMeals: 21,
      description: "Fresh Mediterranean flavors with olive oil, herbs, and vegetables"
    },
    {
      id: 2,
      name: "Protein Power Plan",
      dateCreated: "2024-12-10",
      dietaryType: "non-vegetarian",
      totalMeals: 21,
      description: "High-protein meals for muscle building and recovery"
    },
    {
      id: 3,
      name: "Plant-Based Paradise",
      dateCreated: "2024-12-08",
      dietaryType: "vegan",
      totalMeals: 21,
      description: "100% plant-based meals packed with nutrients"
    },
    {
      id: 4,
      name: "Keto Kickstart",
      dateCreated: "2024-12-05",
      dietaryType: "non-vegetarian",
      totalMeals: 21,
      description: "Low-carb, high-fat meals for ketogenic lifestyle"
    },
    {
      id: 5,
      name: "Balanced Family Plan",
      dateCreated: "2024-12-01",
      dietaryType: "vegetarian",
      totalMeals: 21,
      description: "Family-friendly meals with balanced nutrition"
    },
    {
      id: 6,
      name: "Quick & Easy Vegan",
      dateCreated: "2024-11-28",
      dietaryType: "vegan",
      totalMeals: 21,
      description: "Simple vegan meals that can be prepared in 30 minutes"
    },
    {
      id: 7,
      name: "Gluten-Free Gourmet",
      dateCreated: "2024-11-25",
      dietaryType: "gluten-free",
      totalMeals: 21,
      description: "Delicious gluten-free meals without compromising on taste"
    },
    {
      id: 8,
      name: "Pescatarian Delights",
      dateCreated: "2024-11-20",
      dietaryType: "pescatarian",
      totalMeals: 21,
      description: "Fish and seafood-based meals with vegetables"
    }
  ];

  const plans = mealPlans || defaultMealPlans;

  const dietaryTypes = {
    vegetarian: {
      label: "Vegetarian",
      icon: "🥬",
      className: "badge badge-success"
    },
    vegan: {
      label: "Vegan",
      icon: "🌱",
      className: "badge badge-accent"
    },
    "non-vegetarian": {
      label: "Non-Veg",
      icon: "🍗",
      className: "badge badge-error"
    },
    pescatarian: {
      label: "Pescatarian",
      icon: "🐟",
      className: "badge badge-info"
    },
    "gluten-free": {
      label: "Gluten-Free",
      icon: "🌾",
      className: "badge badge-warning w-40"
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  const filteredPlans = plans.filter(plan => {
    const matchesSearch =
      plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterType === 'all' || plan.dietaryType === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-base-100 min-h-screen py-10 px-4 text-base-content">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-1">📋 My Meal Plans</h2>
          <p className="text-opacity-70">Browse and manage your saved meal plans</p>
        </div>

        {/* Filters */}
        <div className="bg-base-200 rounded-xl p-6 shadow mb-6 border border-base-300">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <label className="input input-bordered flex items-center gap-2 w-full md:w-2/3">
              <Search className="w-4 h-4" />
              <input
                type="text"
                className="grow"
                placeholder="Search meal plans"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </label>

            {/* Filter Dropdown */}
            <label className="input input-bordered flex items-center gap-2 w-full md:w-1/3">
              <Filter className="w-4 h-4" />
              <select
                className="select select-bordered w-full"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Types</option>
                {Object.entries(dietaryTypes).map(([key, val]) => (
                  <option value={key} key={key}>{val.label}</option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {/* Plan Count */}
        <div className="mb-4 text-sm opacity-70">
          Showing {filteredPlans.length} plan{filteredPlans.length !== 1 ? 's' : ''}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlans.map(plan => {
            const badge = dietaryTypes[plan.dietaryType] || {};
            return (
              <div
                key={plan.id}
                className="card bg-base-200 shadow-md hover:shadow-lg transition border border-base-300"
              >
                <div className="card-body space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <div className={badge.className}>
                      {badge.icon} {badge.label}
                    </div>
                  </div>

                  <p className="text-sm opacity-80">{plan.description}</p>

                  <div className="text-sm opacity-70 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {plan.totalMeals} meals
                  </div>

                  <div className="text-sm opacity-70 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {formatDate(plan.dateCreated)}
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button className="btn btn-primary btn-sm flex-1">
                      View Plan
                    </button>
                    <button className="btn btn-outline btn-sm">
                      <Clock className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredPlans.length === 0 && (
          <div className="text-center mt-16">
            <p className="text-4xl">🍽️</p>
            <h3 className="text-xl font-bold mt-2">No meal plans found</h3>
            <p className="opacity-70">
              Try adjusting your search or filter to see results.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MealPlanList;