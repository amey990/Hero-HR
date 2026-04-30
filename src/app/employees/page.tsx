"use client";

import { useState } from "react";
import {
 Search, Download, Users, UserCheck, CalendarOff, UserPlus,
 Eye, MessageSquare, Users2, Filter, ChevronDown
} from "lucide-react";

const employees = [
 { id: "EMP001", name: "Alena Gouse", email: "alena.g@herohr.com", initials: "AG", color: "bg-blue-100 dark:bg-blue-50 text-blue-600", dept: "Design", designation: "UI Designer", manager: "Amey M.", location: "HQ Office", status: "Active", joined: "12 Jan 2023" },
 { id: "EMP002", name: "Miracle Vetrovs", email: "miracle.v@herohr.com", initials: "MV", color: "bg-purple-100 text-purple-600", dept: "Design", designation: "UX Designer", manager: "Amey M.", location: "HQ Office", status: "On Leave", joined: "03 Mar 2022" },
 { id: "EMP003", name: "Avery Arwood", email: "avery.a@herohr.com", initials: "AA", color: "bg-orange-100 text-orange-600", dept: "Design", designation: "UI Designer", manager: "Amey M.", location: "Remote", status: "Active", joined: "18 Jul 2023" },
 { id: "EMP004", name: "Rohit Sharma", email: "rohit.s@herohr.com", initials: "RS", color: "bg-green-100 text-green-600", dept: "Engineering", designation: "Frontend Dev", manager: "Karan P.", location: "HQ Office", status: "Active", joined: "01 Feb 2022" },
 { id: "EMP005", name: "Priya Desai", email: "priya.d@herohr.com", initials: "PD", color: "bg-pink-100 text-pink-600", dept: "HR", designation: "HR Executive", manager: "Amey M.", location: "HQ Office", status: "Active", joined: "15 Jun 2023" },
 { id: "EMP006", name: "Karan Patel", email: "karan.p@herohr.com", initials: "KP", color: "bg-indigo-100 text-indigo-600", dept: "Engineering", designation: "Tech Lead", manager: "CTO", location: "HQ Office", status: "Active", joined: "10 Jan 2021" },
 { id: "EMP007", name: "Neha Singh", email: "neha.s@herohr.com", initials: "NS", color: "bg-teal-100 text-teal-600", dept: "Sales", designation: "Sales Executive", manager: "Vikram R.", location: "Mumbai", status: "Inactive", joined: "20 Aug 2022" },
 { id: "EMP008", name: "John Erikwood", email: "john.e@herohr.com", initials: "JE", color: "bg-amber-100 text-amber-600", dept: "Marketing", designation: "Marketing Lead", manager: "CMO", location: "Remote", status: "Active", joined: "05 Nov 2021" },
];

const statusStyle: Record<string, string> = {
 Active: "bg-green-50 dark:bg-green-500/10 text-green-700 border-green-200 dark:border-green-500/30",
 "On Leave": "bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 border-yellow-200 dark:border-yellow-500/30",
 Inactive: "bg-gray-100 dark:bg-[#111111] text-gray-500 dark:text-[#a1a1aa] border-gray-200 dark:border-[#262626]",
};

export default function EmployeesPage() {
 const [search, setSearch] = useState("");
 const [openActions, setOpenActions] = useState<string | null>(null);

 const filtered = employees.filter(
 (e) =>
 e.name.toLowerCase().includes(search.toLowerCase()) ||
 e.email.toLowerCase().includes(search.toLowerCase()) ||
 e.id.toLowerCase().includes(search.toLowerCase())
 );

 return (
 <div className="space-y-6 pb-12">
 {/* Header */}
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
 <div>
 <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">All Employees</h1>
 <p className="text-gray-500 dark:text-[#a1a1aa] mt-1 text-sm font-medium">Browse the employee directory across all departments.</p>
 </div>
 <div className="flex items-center gap-3">
 <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#262626] text-sm font-semibold text-gray-700 dark:text-[#cbd5e1] bg-white dark:bg-[#111111] hover:bg-gray-50 dark:bg-[#111111] dark:hover:bg-[#181818] transition-colors">
 <Download size={16} /> Export
 </button>
 </div>
 </div>

 {/* Summary Cards */}
 <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
 {[
 { icon: Users, label: "Total Employees", value: "248", sub: "across all departments", color: "bg-blue-50 dark:bg-blue-500/10 text-blue-600" },
 { icon: UserCheck, label: "Active Employees", value: "231", sub: "currently active", color: "bg-green-50 dark:bg-green-500/10 text-green-600" },
 { icon: CalendarOff, label: "On Leave Today", value: "12", sub: "approved leaves", color: "bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600" },
 { icon: UserPlus, label: "New Joiners", value: "5", sub: "this month", color: "bg-purple-50 dark:bg-purple-500/10 text-purple-600" },
 ].map((card) => (
 <div key={card.label} className="bg-white dark:bg-[#111111] rounded-2xl p-5 border border-gray-100 dark:border-[#262626] shadow-sm transition-shadow group">
 <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center mb-3 transition-transform`}>
 <card.icon size={20} strokeWidth={2.5} />
 </div>
 <p className="text-[13px] text-gray-500 dark:text-[#a1a1aa] font-medium mb-0.5">{card.label}</p>
 <h4 className="text-xl font-bold text-gray-900 dark:text-white">{card.value}</h4>
 <p className="text-[11px] text-gray-400 dark:text-[#737373] mt-1">{card.sub}</p>
 </div>
 ))}
 </div>

 {/* Filter Toolbar */}
 <div className="bg-white dark:bg-[#111111] rounded-2xl p-4 border border-gray-100 dark:border-[#262626] shadow-sm flex flex-col md:flex-row items-stretch md:items-center gap-3">
 <div className="relative flex-1 min-w-0">
 <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-[#a1a1aa] dark:text-[#737373]" />
 <input
 type="text"
 placeholder="Search by name, email or employee ID..."
 value={search}
 onChange={(e) => setSearch(e.target.value)}
 className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#262626] text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:text-[#737373] dark:placeholder:text-[#737373] dark:text-[#a1a1aa] dark:text-[#737373] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all bg-white dark:bg-[#111111]"
 />
 </div>
 {["Department", "Role", "Status"].map((f) => (
 <button key={f} className="flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#262626] text-sm font-medium text-gray-600 dark:text-[#a1a1aa] bg-white dark:bg-[#111111] hover:bg-gray-50 dark:bg-[#111111] dark:hover:bg-[#181818] transition-colors min-w-[130px]">
 {f} <ChevronDown size={14} />
 </button>
 ))}
 <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors">
 <Filter size={14} /> Filter
 </button>
 </div>

 {/* Employee Table */}
 <div className="bg-white dark:bg-[#111111] rounded-2xl border border-gray-100 dark:border-[#262626] shadow-sm overflow-hidden">
 <div className="overflow-x-auto">
 <table className="w-full text-left border-collapse min-w-[900px]">
 <thead>
 <tr className="bg-gray-50 dark:bg-[#111111]/80 border-b border-gray-100 dark:border-[#262626]">
 {["Employee", "Employee ID", "Department", "Designation", "Manager", "Location", "Status", "Joining Date", ""].map((h) => (
 <th key={h} className="py-3 px-4 text-[11px] font-semibold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider whitespace-nowrap">{h}</th>
 ))}
 </tr>
 </thead>
 <tbody className="divide-y divide-gray-50 dark:divide-[#262626]">
 {filtered.map((emp) => (
 <tr key={emp.id} className="hover:bg-gray-50 dark:hover:bg-[#181818] transition-colors group">
 <td className="py-3.5 px-4">
 <div className="flex items-center gap-3">
 <div className={`w-9 h-9 rounded-full ${emp.color} flex items-center justify-center font-bold text-[11px] shrink-0`}>{emp.initials}</div>
 <div>
 <p className="text-[13px] font-semibold text-gray-900 dark:text-white">{emp.name}</p>
 <p className="text-[11px] text-gray-500 dark:text-[#a1a1aa]">{emp.email}</p>
 </div>
 </div>
 </td>
 <td className="py-3.5 px-4 text-[13px] font-medium text-gray-700 dark:text-[#cbd5e1]">{emp.id}</td>
 <td className="py-3.5 px-4 text-[13px] text-gray-600 dark:text-[#a1a1aa]">{emp.dept}</td>
 <td className="py-3.5 px-4 text-[13px] text-gray-600 dark:text-[#a1a1aa]">{emp.designation}</td>
 <td className="py-3.5 px-4 text-[13px] text-gray-600 dark:text-[#a1a1aa]">{emp.manager}</td>
 <td className="py-3.5 px-4 text-[13px] text-gray-600 dark:text-[#a1a1aa]">{emp.location}</td>
 <td className="py-3.5 px-4">
 <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${statusStyle[emp.status]}`}>{emp.status}</span>
 </td>
 <td className="py-3.5 px-4 text-[13px] text-gray-500 dark:text-[#a1a1aa]">{emp.joined}</td>
 <td className="py-3.5 px-4 relative">
 <button
 onClick={() => setOpenActions(openActions === emp.id ? null : emp.id)}
 className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 dark:text-[#737373] hover:bg-gray-100 dark:bg-[#111111] dark:hover:bg-[#181818] hover:text-gray-700 dark:text-[#cbd5e1] transition-colors"
 >
 <ChevronDown size={16} />
 </button>
 {openActions === emp.id && (
 <div className="absolute right-4 top-full mt-1 z-20 bg-white dark:bg-[#111111] border border-gray-100 dark:border-[#262626] rounded-xl shadow-lg py-1 w-40">
 <button className="flex items-center gap-2 w-full px-3 py-2 text-[13px] text-gray-700 dark:text-[#cbd5e1] hover:bg-gray-50 dark:hover:bg-[#181818] hover:text-blue-600 transition-colors">
 <Eye size={14} /> View Profile
 </button>
 <button className="flex items-center gap-2 w-full px-3 py-2 text-[13px] text-gray-700 dark:text-[#cbd5e1] hover:bg-gray-50 dark:hover:bg-[#181818] hover:text-blue-600 transition-colors">
 <MessageSquare size={14} /> Message
 </button>
 <button className="flex items-center gap-2 w-full px-3 py-2 text-[13px] text-gray-700 dark:text-[#cbd5e1] hover:bg-gray-50 dark:hover:bg-[#181818] hover:text-blue-600 transition-colors">
 <Users2 size={14} /> View Team
 </button>
 </div>
 )}
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 </div>
 );
}
