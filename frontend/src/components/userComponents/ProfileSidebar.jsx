import { useState, useEffect } from "react";
import {
  FaUser,
  FaPlus,
  FaClipboardList,
  FaLightbulb,
  FaHeart,
  FaSignOutAlt,
  FaUtensils,
} from "react-icons/fa";
import { Rocket } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import icon from "../../assets/icon.svg";
import miniIcon from "../../assets/miniIcon.svg";

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
    <div
      className={`
    h-full bg-base-300 rounded-xl shadow-xl flex flex-col
    transition-all duration-300 ease-in-out
    ${expanded ? "w-64" : "w-20"}
  `}
    >
      {/* Toggle button → only visible on large screens */}
      <div className="hidden lg:flex justify-end p-2">
        <button
          onClick={toggleSidebar}
          className="btn btn-ghost btn-sm btn-circle transition-transform duration-300"
        >
          <span className={expanded ? "rotate-180" : ""}>➤</span>
        </button>
      </div>

      {/* Website Logo */}
      <div className="flex items-center justify-center mb-6 transition-all duration-300">
        <img
          src={expanded ? icon : miniIcon}
          className={`
      transition-all duration-300 ease-in-out
      ${expanded ? "w-40 opacity-100" : "w-10 opacity-80"}
    `}
          alt="Website Logo"
        />
      </div>

      {/* Navigation Menu */}
      <nav
        className={`flex flex-col gap-2 text-sm text-base-content/70 ${
          expanded ? "px-4" : "px-1"
        } flex-1 overflow-y-auto`}
      >
        <SidebarLink
          icon={<FaUser />}
          label="My Details"
          to="/dashboard/me"
          expanded={expanded}
        />
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
          label="Browse Meals"
          to="/dashboard/browse"
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
      <div className={`p-2 ${expanded ? "px-4" : "px-1"} mt-auto`}>
        <button
          onClick={handleLogout}
          className={`flex items-center ${
            expanded ? "justify-start space-x-2 px-4" : "justify-center"
          } py-2 hover:bg-base-200 w-full rounded-lg`}
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
      `
      flex items-center rounded-lg py-2 transition-all duration-300
      ${expanded ? "gap-3 px-4" : "justify-center px-0"}
      ${isActive ? "bg-accent font-semibold shadow-sm" : "hover:bg-base-200"}
      `
    }
  >
    <span className="text-base">{icon}</span>

    <span
      className={`
        whitespace-nowrap overflow-hidden transition-all duration-300
        ${expanded ? "opacity-100 w-auto" : "opacity-0 w-0"}
      `}
    >
      {label}
    </span>
  </NavLink>
);

export default ProfileSidebar;
