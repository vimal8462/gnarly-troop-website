"use client";
import { useState, useEffect } from "react";

interface HeaderProps {
  username: string;
  openSidebar: () => void;
}

export default function AdminHeader({ username, openSidebar }: HeaderProps) {
    const [user, setUser] = useState([]);

  const handleLogout = () => {
        localStorage.removeItem("user");  // Clear logged user
        window.location.href = "/login";  // Redirect
    };
    useEffect(() => {
            const savedUser = localStorage.getItem("user");
            setUser(JSON.parse(savedUser));
    
            if (!savedUser) {
                window.location.href = "/login";
            }
            
    
        }, []);
  return (
    <header className="w-full bg-white shadow px-4 py-3 flex justify-between items-center">
      
      {/* Mobile menu button */}
      <button
        className="lg:hidden p-2 bg-gray-200 rounded"
        onClick={openSidebar}
      >
        ☰
      </button>

      <div className="text-xl font-bold hidden lg:block">Admin Panel</div>

      <div className="flex items-center gap-4">
        <span className="font-medium">{username}</span>
        <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={()=>handleLogout()}> 
          Logout
        </button>
      </div>
    </header>
  );
}
