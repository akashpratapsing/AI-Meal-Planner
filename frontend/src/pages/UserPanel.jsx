// DashboardLayout.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import UserNavbar from "../components/layout/UserNavbar";
import ProfileSidebar from "../components/userComponents/ProfileSidebar";

const UserPanel = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleSidebarToggle = (isExpanded) => {
    setSidebarExpanded(isExpanded);
  };

  return (
    <div className="h-screen w-full flex flex-col">
      {/* Navbar (Only for small screens) */}
      <header className="h-16 shadow bg-white z-10 flex items-center px-4 lg:hidden">
        {/* Mobile sidebar toggle button */}
        <button
          className="btn btn-ghost"
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Navbar content (user avatar, etc.) */}
        <div className="flex-1">
          <UserNavbar />
        </div>
      </header>

      {/* Main Content Section */}
      <div className="flex flex-1 overflow-hidden bg-[#d2f0f8]">
        {/* Sidebar for large screens */}
        <aside
          className={`hidden lg:block transition-all duration-300 ${
            sidebarExpanded ? "w-64" : "w-16"
          }`}
        >
          <ProfileSidebar onToggle={handleSidebarToggle} />
        </aside>

        {/* Sidebar as drawer for mobile screens */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden flex">
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={() => setMobileSidebarOpen(false)}
            ></div>

            {/* Drawer */}
            <aside className="relative w-64 bg-white shadow-lg h-full z-50">
              <ProfileSidebar onToggle={handleSidebarToggle} />
            </aside>
          </div>
        )}

        {/* Outlet (Main Section) */}
        <section className="flex-1 p-2 sm:p-4">
          <div className="h-full bg-base-300 rounded-xl shadow px-3 sm:px-6 py-4 sm:py-6 overflow-y-auto">
            <Outlet />
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserPanel;
