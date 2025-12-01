"use client";

import { useState, useEffect } from "react";

export default function DashboardPage() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [user, setUser] = useState([]);
    const handleLogout = () => {
        localStorage.removeItem("user");  // Clear logged user
        window.location.href = "/login";  // Redirect
    };

    

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition">

           

            {/* MAIN CONTENT */}
            <main className="ml-[80px] dark:text-white transition w-full"
                style={{ marginLeft: sidebarOpen ? 250 : 80 }}
            >


                {/* Dashboard Content */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <DashboardCard title="Total Users" value="1,240" />
                    <DashboardCard title="New Orders" value="320" />
                    <DashboardCard title="Revenue" value="$8,300" />
                </div>

            </main>
        </div>
    );
}

