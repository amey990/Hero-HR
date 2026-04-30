"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  CalendarOff,
  Banknote,
  Files,
  PieChart,
  ChevronDown,
  ChevronRight,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

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
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  {
    name: "Employees",
    icon: Users,
    submenu: [
      { name: "All Employees", path: "/employees" },
      { name: "My Team", path: "/employees/team" },
      { name: "Organization Chart", path: "/employees/org-chart" },
    ],
  },
  {
    name: "Attendance",
    icon: CalendarCheck,
    submenu: [
      { name: "Overview", path: "/attendance" },
      { name: "Calendar", path: "/attendance/calendar" },
    ],
  },
  {
    name: "Leave",
    icon: CalendarOff,
    submenu: [
      { name: "Apply Leave", path: "/leave/apply" },
      { name: "Leave Balance", path: "/leave" },
      { name: "Leave Calendar", path: "/leave/calendar" },
      { name: "Holiday Calendar", path: "/holidays" },
      { name: "Team on Leave", path: "/leave/team" },
    ],
  },
  {
    name: "Salary",
    icon: Banknote,
    submenu: [
      { name: "Payslips", path: "/salary/payslips" },
      { name: "Loans & Advances", path: "/salary/loans" },
      { name: "Reimbursements", path: "/salary/reimbursements" },
      { name: "Salary Revision", path: "/salary/revision" },
    ],
  },
  { name: "Document Center", icon: Files, path: "/documents" },
  { name: "Analytics", icon: PieChart, path: "/analytics" },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    Attendance: true, // Expand attendance by default for demo
  });
  const pathname = usePathname();

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
    <div
      className={clsx(
        "h-screen bg-white border-r border-gray-100 flex flex-col shrink-0 z-20 transition-all duration-300 shadow-[2px_0_8px_rgba(0,0,0,0.02)]",
        isCollapsed ? "w-[80px]" : "w-[240px]"
      )}
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-gray-50 shrink-0">
        {!isCollapsed && (
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shrink-0">
              H
            </div>
            <span className="font-bold text-lg text-gray-900 tracking-tight whitespace-nowrap">
              Hero HR
            </span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={clsx(
            "p-2 rounded-xl text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors",
            isCollapsed && "mx-auto"
          )}
        >
          {isCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
        </button>
      </div>

      {/* Menu List */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 overflow-x-hidden scrollbar-hide">
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
                    "flex items-center justify-between px-3.5 py-3 rounded-xl transition-all duration-200 group cursor-pointer w-full",
                    isActive && !isExpanded
                      ? "bg-blue-50 text-blue-700 font-semibold"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                  title={isCollapsed ? item.name : undefined}
                >
                  <div className="flex items-center gap-3.5">
                    <Icon
                      size={20}
                      className={clsx(
                        "shrink-0 transition-colors",
                        isActive && !isExpanded
                          ? "text-blue-600"
                          : "text-gray-400 group-hover:text-gray-600"
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
                    <div className="text-gray-400">
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
                    "flex items-center gap-3.5 px-3.5 py-3 rounded-xl transition-all duration-200 group w-full",
                    isActive
                      ? "bg-blue-50 text-blue-700 font-semibold"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                  title={isCollapsed ? item.name : undefined}
                >
                  <Icon
                    size={20}
                    className={clsx(
                      "shrink-0 transition-colors",
                      isActive
                        ? "text-blue-600"
                        : "text-gray-400 group-hover:text-gray-600"
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
                <div className="mt-1 mb-2 ml-[22px] border-l-2 border-gray-100 pl-4 space-y-1">
                  {item.submenu!.map((sub) => {
                    const isSubActive = pathname === sub.path;
                    return (
                      <Link
                        key={sub.name}
                        href={sub.path}
                        className={clsx(
                          "block py-2 px-3 rounded-lg text-[13px] transition-all duration-200",
                          isSubActive
                            ? "bg-blue-50/50 text-blue-700 font-semibold"
                            : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
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
    </div>
  );
}