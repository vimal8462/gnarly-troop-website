"use client";

import { useState } from "react";
import AdminHeader from "@/components/AdminHeader";
import AdminSidebar from "@/components/AdminSidebar";
import AdminFooter from "@/components/AdminFooter";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <AdminSidebar 
        isOpen={sidebarOpen} 
        closeSidebar={() => setSidebarOpen(false)} 
      />

      {/* Right section */}
      <div className="flex flex-col flex-1">

        {/* Header */}
        <AdminHeader 
          username="Anoop Singh" 
          openSidebar={() => setSidebarOpen(true)} 
        />

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          {children}
        </main>

        {/* Footer */}
        <AdminFooter />
      </div>
    </div>
  );
}
