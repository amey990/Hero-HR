"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  CalendarOff,
  Files,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
} from "lucide-react";
import HelpSupportModal from "../common/HelpSupportModal";

type SubMenuItem = {
  name: string;
  path: string;
};

type MenuItem = {
  name: string;
  icon: any;
  path?: string;
  submenu?: SubMenuItem[];
};

const menuItems: MenuItem[] = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
  {
    name: "Employees",
    icon: Users,
    submenu: [
      { name: "All Employees", path: "/admin/employees" },
      { name: "Add Employee", path: "/admin/employees/add" },
    ],
  },
  {
    name: "Attendance",
    icon: CalendarCheck,
    submenu: [
      { name: "Daily Attendance", path: "/admin/attendance" },
      { name: "Regularization Requests", path: "/admin/attendance/regularization" },
    ],
  },
  {
    name: "Leave",
    icon: CalendarOff,
    submenu: [
      { name: "Leave Requests", path: "/admin/leave/requests" },
    ],
  },
  { name: "Documents", icon: Files, path: "/admin/documents" },
  { name: "Support Requests", icon: HelpCircle, path: "/admin/support" },
];

export default function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const toggleSubmenu = (name: string) => {
    if (isCollapsed) {
      setIsCollapsed(false); // Auto-expand sidebar if trying to open a submenu
      setExpandedMenus({ [name]: true });
    } else {
      setExpandedMenus((prev) => ({ ...prev, [name]: !prev[name] }));
    }
  };

  const isRouteActive = (item: MenuItem) => {
    if (item.path && pathname === item.path) return true;
    if (item.submenu) {
      return item.submenu.some((sub) => pathname === sub.path);
    }
    return false;
  };

  return (
    <>
      <div
        className={clsx(
          "h-screen bg-white dark:bg-[#0b0b0b] border-r border-gray-100 dark:border-[#262626] flex flex-col shrink-0 z-20 transition-all duration-300",
          isCollapsed ? "w-[70px]" : "w-[240px]"
        )}
      >
        {/* Header */}
        <div className="h-14 flex items-center justify-between px-6 border-b border-gray-50 dark:border-[#262626] shrink-0 transition-colors">
          {!isCollapsed && (
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shrink-0">
                H
              </div>
              <span className="font-bold text-lg text-gray-900 dark:text-white tracking-tight whitespace-nowrap transition-colors">
                Hero HR Admin
              </span>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={clsx(
              "p-2 rounded-xl text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-500/10 transition-colors",
              isCollapsed && "mx-auto"
            )}
          >
            {isCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
          </button>
        </div>

        {/* Menu List */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 overflow-x-hidden custom-scrollbar">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = isRouteActive(item);
            const isExpanded = expandedMenus[item.name];
            const hasSubmenu = !!item.submenu;

            return (
              <div key={item.name} className="flex flex-col">
                {hasSubmenu ? (
                  // Expandable Menu Item
                  <button
                    onClick={() => toggleSubmenu(item.name)}
                    className={clsx(
                      "flex items-center justify-between transition-all duration-200 group cursor-pointer w-full",
                      isCollapsed ? "justify-center h-12 w-12 px-0 mx-auto rounded-xl" : "px-3.5 py-3 rounded-xl",
                      isActive && !isExpanded
                        ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold"
                        : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#181818] hover:text-gray-900 dark:hover:text-slate-100"
                    )}
                    title={isCollapsed ? item.name : undefined}
                  >
                    <div className="flex items-center gap-3.5">
                      <Icon
                        size={20}
                        className={clsx(
                          "shrink-0 transition-colors",
                          isActive && !isExpanded
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-gray-400 dark:text-[#737373] group-hover:text-gray-600 dark:group-hover:text-[#f8fafc]"
                        )}
                        strokeWidth={isActive ? 2.5 : 2}
                      />
                      {!isCollapsed && (
                        <span className="text-[14px] whitespace-nowrap">
                          {item.name}
                        </span>
                      )}
                    </div>
                    {!isCollapsed && (
                      <div className="text-gray-400 dark:text-[#737373]">
                        {isExpanded ? (
                          <ChevronDown size={16} />
                        ) : (
                          <ChevronRight size={16} />
                        )}
                      </div>
                    )}
                  </button>
                ) : (
                  // Single Menu Item
                  <Link
                    href={item.path!}
                    className={clsx(
                      "flex items-center gap-3.5 transition-all duration-200 group w-full",
                      isCollapsed ? "justify-center h-12 w-12 px-0 mx-auto rounded-xl" : "px-3.5 py-3 rounded-xl",
                      isActive
                        ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold"
                        : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#181818] hover:text-gray-900 dark:hover:text-slate-100"
                    )}
                    title={isCollapsed ? item.name : undefined}
                  >
                    <Icon
                      size={20}
                      className={clsx(
                        "shrink-0 transition-colors",
                        isActive
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-400 dark:text-[#737373] group-hover:text-gray-600 dark:group-hover:text-[#f8fafc]"
                      )}
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                    {!isCollapsed && (
                      <span className="text-[14px] whitespace-nowrap">
                        {item.name}
                      </span>
                    )}
                  </Link>
                )}

                {/* Submenu Items */}
                {hasSubmenu && isExpanded && !isCollapsed && (
                  <div className="mt-1 mb-2 ml-[22px] border-l-2 border-gray-100 dark:border-[#262626] pl-4 space-y-1">
                    {item.submenu!.map((sub) => {
                      const isSubActive = pathname === sub.path;
                      return (
                        <Link
                          key={sub.name}
                          href={sub.path}
                          className={clsx(
                            "block py-2 px-3 rounded-lg text-[13px] transition-all duration-200",
                            isSubActive
                              ? "bg-blue-50/50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 font-semibold"
                              : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-slate-100 hover:bg-gray-50 dark:hover:bg-[#181818]"
                          )}
                        >
                          {sub.name}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-gray-100 dark:border-[#262626] space-y-1 shrink-0 transition-colors">
          <button
            onClick={() => setIsHelpOpen(true)}
            className={clsx(
              "flex items-center gap-3.5 transition-all duration-200 group w-full text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#181818] hover:text-gray-900 dark:hover:text-slate-100",
              isCollapsed ? "justify-center h-12 w-12 px-0 mx-auto rounded-xl" : "px-3.5 py-3 rounded-xl"
            )}
            title={isCollapsed ? "Help" : undefined}
          >
            <HelpCircle size={20} className="shrink-0 text-gray-400 dark:text-[#737373] group-hover:text-gray-600 dark:group-hover:text-[#f8fafc] transition-colors" strokeWidth={2} />
            {!isCollapsed && <span className="text-[14px] whitespace-nowrap">Help</span>}
          </button>
          <button
            onClick={() => router.push("/login")}
            className={clsx(
              "flex items-center gap-3.5 transition-all duration-200 group w-full text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400",
              isCollapsed ? "justify-center h-12 w-12 px-0 mx-auto rounded-xl" : "px-3.5 py-3 rounded-xl"
            )}
            title={isCollapsed ? "Logout" : undefined}
          >
            <LogOut size={20} className="shrink-0 text-gray-400 dark:text-[#737373] group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors" strokeWidth={2} />
            {!isCollapsed && <span className="text-[14px] whitespace-nowrap font-medium">Logout</span>}
          </button>
        </div>
      </div>
      <HelpSupportModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </>
  );
}
