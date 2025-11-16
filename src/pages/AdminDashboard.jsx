import React, { useState } from "react";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 m-5 bg-black/50 text-white rounded-lg border border-gray-600 shadow-lg absolute top-0 left-0 z-20"
      >
        {isOpen ? (
          // Close Icon
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor">
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          // Menu Icon
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out z-10 
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Sidebar Menu</h2>
          <nav className="flex flex-col space-y-2">
            <a href="#" className="hover:bg-gray-700 p-2 rounded">Dashboard</a>
            <a href="#" className="hover:bg-gray-700 p-2 rounded">Reports</a>
            <a href="#" className="hover:bg-gray-700 p-2 rounded">Settings</a>
          </nav>
        </div>
      </aside>
    </div>
  );
};

export default SideBar;
