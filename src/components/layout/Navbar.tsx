"use client";

import { useState } from "react";
import { Bell, Search } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
 const [showNotifications, setShowNotifications] = useState(false);

 return (
 <div className="h-14 bg-[#ffffff] dark:bg-[#0a0a0a] border-b border-[#e5e7eb] dark:border-[#262626] flex items-center justify-between px-8 z-10 sticky top-0 transition-colors duration-200">
 {/* Left empty for spacing, as search moved to right */}
 <div />

 {/* Right Section */}
 <div className="flex items-center gap-6">
 {/* Search Bar */}
 <div className="relative group flex items-center max-w-xs w-full">
 <div className="absolute left-3.5 text-gray-400 group-focus-within:text-blue-500 transition-colors pointer-events-none">
 <Search size={18} strokeWidth={2.5} />
 </div>
 <input
 type="text"
 placeholder="Search anything..."
 className="w-full bg-[#ffffff] dark:bg-[#111111] hover:bg-gray-50 dark:hover:bg-[#181818] focus:bg-[#ffffff] dark:focus:bg-[#111111] border border-gray-100 dark:border-[#262626] focus:border-blue-200 dark:focus:border-blue-500/50 focus:ring-4 focus:ring-blue-50 dark:focus:ring-blue-500/10 outline-none text-sm font-medium text-[#0f172a] dark:text-[#f8fafc] placeholder:text-[#64748b] dark:placeholder:text-[#737373] rounded-2xl py-2.5 pl-11 pr-12 transition-colors duration-200"
 />
 <div className="absolute right-3 px-2 py-0.5 rounded-md bg-[#ffffff] dark:bg-[#111111] border border-gray-200 dark:border-[#262626] shadow-sm text-[10px] font-bold text-[#64748b] dark:text-[#a1a1aa] pointer-events-none">
 ⌘ F
 </div>
 </div>

 {/* Notifications */}
 <div className="relative">
 <button 
 onClick={() => setShowNotifications(!showNotifications)}
 className="relative p-2 rounded-full text-gray-400 dark:text-[#737373] hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-[#181818] transition-colors duration-200 cursor-pointer"
 >
 <Bell size={20} strokeWidth={2.5} />
 <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
 </button>
 
 {/* Notification Menu */}
 {showNotifications && (
 <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#111111] rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] border border-gray-100 dark:border-[#262626] overflow-hidden">
 <div className="p-4 border-b border-gray-50 dark:border-[#262626] flex items-center justify-between">
 <h3 className="font-semibold text-gray-900 dark:text-[#f8fafc]">Notifications</h3>
 <span className="text-xs text-blue-600 dark:text-blue-400 font-medium cursor-pointer hover:text-blue-700 dark:hover:text-blue-300 transition-colors">Mark all as read</span>
 </div>
 <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
 <div className="p-4 hover:bg-gray-50 dark:hover:bg-[#181818] transition-colors cursor-pointer border-b border-gray-50/50 dark:border-[#262626]">
 <div className="flex gap-3">
 <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
 <span className="text-xs font-bold">JD</span>
 </div>
 <div>
 <p className="text-sm text-gray-800 dark:text-[#f8fafc]"><span className="font-medium">John Doe</span> requested leave</p>
 <p className="text-xs text-gray-400 dark:text-[#737373] mt-0.5">2 hours ago</p>
 </div>
 </div>
 </div>
 <div className="p-4 hover:bg-gray-50 dark:hover:bg-[#181818] transition-colors cursor-pointer border-b border-gray-50/50 dark:border-[#262626]">
 <div className="flex gap-3">
 <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 flex items-center justify-center shrink-0 mt-0.5">
 <span className="text-xs font-bold">HR</span>
 </div>
 <div>
 <p className="text-sm text-gray-800 dark:text-[#f8fafc]"><span className="font-medium">HR Team</span> updated policy</p>
 <p className="text-xs text-gray-400 dark:text-[#737373] mt-0.5">5 hours ago</p>
 </div>
 </div>
 </div>
 </div>
 <div className="p-3 text-center border-t border-gray-50 dark:border-[#262626]">
 <button className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors">View all notifications</button>
 </div>
 </div>
 )}
 </div>

 {/* Theme Toggle */}
 <ThemeToggle />

 {/* Divider */}
 <div className="h-8 w-px bg-gray-200 dark:bg-[#262626] mx-1 transition-colors duration-200" />

 {/* Profile */}
 <button className="flex items-center gap-3 cursor-pointer group">
 <div className="text-right hidden sm:block">
 <p className="text-sm font-semibold text-gray-700 dark:text-[#f8fafc] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 whitespace-nowrap">
 Amey M.
 </p>
 <p className="text-[11px] font-medium text-gray-400 dark:text-[#737373] whitespace-nowrap">Admin</p>
 </div>
 <div className="relative w-10 h-10 shrink-0 rounded-full overflow-hidden border-2 border-gray-100 dark:border-[#262626] group- transition-colors duration-200">
 <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
 AM
 </div>
 </div>
 </button>
 </div>
 </div>
 );
}