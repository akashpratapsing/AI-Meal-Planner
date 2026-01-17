import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ProfileSidebar from "../components/userComponents/ProfileSidebar";

const UserPanel = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleSidebarToggle = (isExpanded) => {
    setSidebarExpanded(isExpanded);
  };

  return (
    <div className="h-screen w-full flex flex-col bg-base-200">
      {/* Mobile Header */}
      <header className="lg:hidden flex items-center justify-between px-4 h-16 bg-base-100 shadow-sm z-30 relative">
        <button
          className="btn btn-ghost btn-circle"
          onClick={() => setMobileSidebarOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
        {/* <span className="font-bold text-xl text-primary">FitMeal Planner</span> */}
        <div className="relative">
          <span
            className="text-3xl font-bold"
            style={{
              fontFamily:
                "'Brush Script MT', cursive, 'Comic Sans MS', sans-serif",
              letterSpacing: "-0.05em",
            }}
          >
            FitMeal
          </span>
          <svg
            className="absolute -bottom-1 left-0 w-full"
            height="8"
            viewBox="0 0 100 8"
            preserveAspectRatio="none"
          >
            <path
              d="M 0 4 Q 50 8 100 4"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <span className="sr-only">FitMeal</span>
        <div className="w-10" /> {/* Spacer */}
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Desktop Sidebar */}
        <aside
          className={`hidden lg:block h-full z-20 transition-all duration-300 ease-in-out ${
            sidebarExpanded ? "w-64" : "w-16"
          }`}
        >
          <ProfileSidebar onToggle={handleSidebarToggle} />
        </aside>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileSidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileSidebarOpen(false)}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              />
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 left-0 w-64 h-full z-50 lg:hidden"
              >
                <ProfileSidebar onToggle={() => {}} />
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-base-200 w-full relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserPanel;
