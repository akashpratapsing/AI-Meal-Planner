// DashboardLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import ProfileSidebar from "../components/sections/ProfileSidebar";
import UserNavbar from "../components/layout/UserNavbar";

const UserPanel = () => {
  return (
     <div className="h-screen w-full flex flex-col">
      {/* Navbar */}
      <header className="h-16 shadow bg-white z-10">
        <UserNavbar />
      </header>

      {/* Main Content Section */}
      <div className="flex flex-1 overflow-hidden bg-[#d2f0f8]">
        {/* Sidebar */}
        <aside className="w-[289px] p-4">
          <div className="h-full bg-base-100 rounded-xl shadow overflow-y-auto">
            <ProfileSidebar />
          </div>
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
