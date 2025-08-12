import React, { useState, useEffect } from "react";
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
import { Rocket } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const ProfileSidebar = ({ onToggle }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(true);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/");
  };

  const toggleSidebar = () => {
    const newExpanded = !expanded;
    setExpanded(newExpanded);
    if (onToggle) {
      onToggle(newExpanded);
    }
  };

  // Notify parent component of initial state
  useEffect(() => {
    if (onToggle) {
      onToggle(expanded);
    }
  }, []);

  return (
    <div className="h-full bg-base-300 rounded-xl shadow-xl flex flex-col">
      <div className="flex justify-end p-2">
        <button 
          onClick={toggleSidebar} 
          className="btn btn-ghost btn-sm btn-circle"
        >
          {expanded ? '←' : '→'}
        </button>
      </div>

      {/* Profile Info */}
      <div className={`flex flex-col items-center text-center mb-6 ${expanded ? 'px-6' : 'px-2'}`}>
        <img
          src="https://randomuser.me/api/portraits/men/44.jpg"
          className={`${expanded ? 'w-20 h-20' : 'w-10 h-10'} rounded-full mb-2 border-2 border-primary`}
          alt="profile"
        />
        {expanded && (
          <>
            <h2 className="text-lg font-bold text-gray-800">Jhon Doe</h2>
            <p className="text-sm text-gray-500">Transform your diet</p>
          </>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className={`flex flex-col gap-2 text-sm text-gray-700 ${expanded ? 'px-4' : 'px-1'} flex-1 overflow-y-auto`}>
        <SidebarLink icon={<FaUser />} label="My Details" to="/dashboard/me" expanded={expanded} />
        <SidebarLink
          icon={<FaPlus />}
          label="Create Meal Plan"
          to="/dashboard/create-meal-plan"
          expanded={expanded}
        />
        <SidebarLink
          icon={<FaClipboardList />}
          label="My Meal Plans"
          to="/dashboard/mealPlans"
          expanded={expanded}
        />
        <SidebarLink
          icon={<FaLightbulb />}
          label="Suggest a Meal"
          to="/dashboard/random"
          expanded={expanded}
        />
        <SidebarLink
          icon={<FaUtensils />}
          label="Create Your Own Meal Plan"
          to="/dashboard/build"
          expanded={expanded}
        />
        <SidebarLink
          icon={<FaHeart />}
          label="Favorite Meals"
          to="/dashboard/favorite-meal"
          expanded={expanded}
        />
        <SidebarLink
          icon={<Rocket />}
          label="Upgrade"
          to="/dashboard/pricing"
          expanded={expanded}
        />
      </nav>
      
      {/* Logout button at bottom */}
      <div className={`p-2 ${expanded ? 'px-4' : 'px-1'} mt-auto`}>
        <button
          onClick={handleLogout}
          className={`flex items-center ${expanded ? 'justify-start space-x-2 px-4' : 'justify-center'} py-2 hover:bg-gray-100 w-full rounded-lg`}
        >
          <FaSignOutAlt />
          {expanded && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

// Reusable sidebar link
const SidebarLink = ({ icon, label, to, expanded }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center ${expanded ? 'justify-start gap-3 px-3' : 'justify-center'} py-2 rounded-lg transition ${
        isActive ? "bg-white font-semibold" : "hover:bg-blue-100"
      }`
    }
  >
    <span className="text-base">{icon}</span>
    {expanded && <span>{label}</span>}
  </NavLink>
);

export default ProfileSidebar;
