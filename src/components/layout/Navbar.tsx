"use client";

import { Bell, Search } from "lucide-react";

export default function Navbar() {
  return (
    <div className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 z-10 sticky top-0 shadow-sm">
      {/* Left: Search Bar */}
      <div className="relative group flex items-center max-w-md w-full">
        <div className="absolute left-3.5 text-gray-400 group-focus-within:text-blue-500 transition-colors pointer-events-none">
          <Search size={18} strokeWidth={2.5} />
        </div>
        <input
          type="text"
          placeholder="Search anything..."
          className="w-full bg-gray-50 hover:bg-gray-100 focus:bg-white border border-transparent focus:border-blue-200 focus:ring-4 focus:ring-blue-50 outline-none text-sm font-medium text-gray-700 rounded-2xl py-2.5 pl-11 pr-12 transition-all duration-200"
        />
        <div className="absolute right-3 px-2 py-0.5 rounded-md bg-white border border-gray-200 shadow-sm text-[10px] font-bold text-gray-400 pointer-events-none">
          ⌘ F
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <button className="relative p-2 rounded-full text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer">
          <Bell size={20} strokeWidth={2.5} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
        </button>

        {/* Divider */}
        <div className="h-8 w-px bg-gray-200 mx-1" />

        {/* Profile */}
        <button className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
              Amey M.
            </p>
            <p className="text-[11px] font-medium text-gray-400">Admin</p>
          </div>
          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-gray-100 group-hover:border-blue-200 transition-colors shadow-sm">
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
              AM
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}