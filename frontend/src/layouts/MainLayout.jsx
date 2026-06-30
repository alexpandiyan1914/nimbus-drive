import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen bg-slate-950 text-white">
      <Navbar
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex h-[calc(100vh-64px)]">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="
          flex-1
          overflow-auto
          p-4
          md:p-6
          ">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;