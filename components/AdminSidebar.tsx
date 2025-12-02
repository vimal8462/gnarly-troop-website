"use client";

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

export default function AdminSidebar({ isOpen, closeSidebar }: SidebarProps) {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-gray-900 text-white px-4 py-6
          transform z-50 transition-transform duration-300 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:static lg:block
        `}
      >
        <h2 className="text-lg font-semibold mb-4">Admin Menu</h2>

        <nav className="flex flex-col gap-3">
          <a href="/admin" className="hover:text-gray-300">Dashboard</a>
          <a href="/admin/users" className="hover:text-gray-300">Users</a>
          <a href="/admin/timeline" className="hover:text-gray-300">Timeline</a>
          <a href="/admin/visions" className="hover:text-gray-300">4C's Vision</a>
          <a href="/admin/letters" className="hover:text-gray-300">Letters</a>
          <a href="/admin/teams" className="hover:text-gray-300">Teams</a>
          <a href="/admin/settings" className="hover:text-gray-300">Settings</a>
        </nav>
      </aside>
    </>
  );
}
