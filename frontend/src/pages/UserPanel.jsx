// DashboardLayout.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import UserNavbar from "../components/layout/UserNavbar";
import ProfileSidebar from "../components/userComponents/ProfileSidebar";

const UserPanel = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  const handleSidebarToggle = (isExpanded) => {
    setSidebarExpanded(isExpanded);
  };

  return (
    <div className="h-screen w-full flex flex-col">
      {/* Navbar */}
      {/* <header className="h-16 shadow bg-white z-10">
        <UserNavbar />
      </header> */}

      {/* Main Content Section */}
      <div className="flex flex-1 overflow-hidden bg-[#d2f0f8]">
        {/* Sidebar - Dynamic width based on expanded state */}
        <aside className={`transition-all duration-300 ${sidebarExpanded ? 'w-64' : 'w-16'}`}>
          <ProfileSidebar onToggle={handleSidebarToggle} />
        </aside>

        {/* Outlet (Main Section) */}
        <section className="flex-1 p-4">
          <div className="h-full bg-base-300 rounded-xl shadow px-6 py-6 overflow-y-auto">
            <Outlet />
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserPanel;
