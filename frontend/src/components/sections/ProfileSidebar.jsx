import React from "react";
import {
  FaUser,
  FaPlus,
  FaClipboardList,
  FaLightbulb,
  FaHeart,
  FaCog,
  FaSignOutAlt,
  FaUtensils,
} from "react-icons/fa";
import { Rocket } from 'lucide-react';
<Rocket className="w-6 h-6 text-indigo-500" />

import { NavLink } from "react-router-dom";

const ProfileSidebar = () => {
  return (
    <aside className="bg-base-300 w-full md:w-64 h-full p-6 shadow-xl rounded-xl sticky top-20">
      {/* Profile Info */}
      <div className="flex flex-col items-center text-center mb-8">
        <img
          src="https://randomuser.me/api/portraits/men/44.jpg"
          className="w-24 h-24 rounded-full mb-2 border-2 border-primary"
          alt="profile"
        />
        <h2 className="text-lg font-bold text-gray-800">Jhon Doe</h2>
        <p className="text-sm text-gray-500">Transform your diet</p>
      </div>

      {/* Navigation Menu */}
      <nav className="flex flex-col gap-2 text-sm text-gray-700">
        <SidebarLink icon={<FaUser />} label="My Details" to="/dashboard/me"/>
        <SidebarLink icon={<FaPlus />} label="Create Meal Plan" to="/dashboard/create-meal-plan" />
        <SidebarLink icon={<FaClipboardList />} label="My Meal Plans" to="/dashboard/mealPlans"/>
        <SidebarLink icon={<FaLightbulb />} label="Suggest a Meal" to="/dashboard/random"/>
        <SidebarLink icon={<FaUtensils />} label="Create Your Own Meal Plan" to="/dashboard/build" />
        <SidebarLink icon={<FaHeart />} label="Favorite Meals" to="/dashboard/favorite-meal" />
        <SidebarLink icon={<Rocket />} label="Upgrade" to="/dashboard/pricing" />
        <SidebarLink icon={<FaSignOutAlt />} label="Logout" to="/"/>
      </nav>
    </aside>
  );
};

// Reusable sidebar link
const SidebarLink = ({ icon, label, to }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
        isActive ? "bg-white font-semibold" : "hover:bg-blue-100"
      }`
    }
  >
    <span className="text-base">{icon}</span>
    <span>{label}</span>
  </NavLink>
);

export default ProfileSidebar;
