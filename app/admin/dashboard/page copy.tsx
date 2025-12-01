"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Home,
    LogOut,
    ChevronLeft,
    ChevronRight,
    User,
    Moon,
    Sun,
} from "lucide-react";

export default function DashboardPage() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [user, setUser] = useState([]);
    const handleLogout = () => {
        localStorage.removeItem("user");  // Clear logged user
        window.location.href = "/login";  // Redirect
    };

    // Handle Dark Mode
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        setUser(JSON.parse(savedUser));

        if (!savedUser) {
            window.location.href = "/login";
        }
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition">

            {/* SIDEBAR */}
            <motion.aside
                animate={{ width: sidebarOpen ? 250 : 80 }}
                className="bg-white dark:bg-gray-800 shadow-lg h-screen p-4 flex flex-col fixed"
            >
                {/* Logo + Toggle */}
                <div className="flex items-center justify-between mb-6">
                    <motion.div
                        animate={{ opacity: sidebarOpen ? 1 : 0 }}
                        className="flex items-center gap-3 overflow-hidden"
                    >
                        <img src="/logo.png" className="w-12 h-12" />
                        <span className="text-xl font-bold dark:text-white">
                            MyDashboard
                        </span>
                    </motion.div>

                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 rounded bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-gray-300"
                    >
                        {sidebarOpen ? <ChevronLeft /> : <ChevronRight />}
                    </button>
                </div>

                {/* Menu */}
                <nav className="space-y-2">
                    <MenuItem icon={<Home />} text="Dashboard" open={sidebarOpen} />
                    <MenuItem icon={<LogOut />} text="Logout" open={sidebarOpen} onClick={handleLogout} />
                </nav>
            </motion.aside>

            {/* MAIN CONTENT */}
            <main className="ml-[80px] dark:text-white transition w-full"
                style={{ marginLeft: sidebarOpen ? 250 : 80 }}
            >

                {/* Top Navbar */}
                <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow">
                    <h2 className="text-2xl font-semibold">Dashboard</h2>

                    <div className="flex items-center gap-6">

                        {/* Dark Mode Toggle */}
                        <button
                            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
                            onClick={() => setDarkMode(!darkMode)}
                        >
                            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        {/* User Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className="flex items-center gap-3"
                            >
                                <img
                                    src={user.avatar}
                                    className="w-10 h-10 rounded-full border"
                                />
                                <span className="font-medium hidden md:block">{user.name}</span>
                            </button>

                            {userMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md p-3 z-50">
                                    <div className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer flex items-center gap-3">
                                        <User size={18} /> Profile
                                    </div>

                                    <div className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer flex items-center gap-3" onClick={handleLogout}>
                                        <LogOut size={18} /> Logout
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

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

/* Small Components */

function MenuItem({ icon, text, open, onClick }) {
    return (
        <div
            onClick={onClick}   // ⭐ important
            className="flex items-center gap-3 p-3 rounded-md cursor-pointer 
                 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
        >
            <span>{icon}</span>
            {open && <span className="font-medium">{text}</span>}
        </div>
    );
}


function DashboardCard({ title, value }) {
    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
            <h3 className="font-semibold">{title}</h3>
            <p className="text-4xl font-bold mt-2">{value}</p>
        </div>
    );
}
