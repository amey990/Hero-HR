"use client";

import { Users, UserCheck, CalendarX, Home, Eye, MessageSquare, AlertTriangle, ChevronDown } from "lucide-react";

const teamOnLeave = [
 { name: "Miracle Vetrovs", designation: "UX Designer", initials: "MV", color: "bg-purple-100 text-purple-600", leaveType: "Casual Leave", dates: "30 Apr - 2 May", days: "3 days", backup: "Alena Gouse", status: "Approved" },
 { name: "Raj Mehta", designation: "Frontend Dev", initials: "RM", color: "bg-emerald-100 text-emerald-600", leaveType: "Sick Leave", dates: "30 Apr", days: "1 day", backup: "Rohit Sharma", status: "Approved" },
 { name: "Neha Rao", designation: "HR Executive", initials: "NR", color: "bg-rose-100 text-rose-600", leaveType: "Earned Leave", dates: "29 Apr - 1 May", days: "3 days", backup: "Priya Desai", status: "Approved" },
];

const upcomingLeaves = [
 { name: "Alena Gouse", initials: "AG", color: "bg-blue-100 dark:bg-blue-50 text-blue-600", type: "Casual Leave", from: "5 May", to: "6 May", days: 2, backup: "Avery Arwood", status: "Approved" },
 { name: "Karan Patel", initials: "KP", color: "bg-indigo-100 text-indigo-600", type: "Earned Leave", from: "12 May", to: "15 May", days: 4, backup: "Rohit Sharma", status: "Pending" },
 { name: "John Erikwood", initials: "JE", color: "bg-amber-100 text-amber-600", type: "Comp Off", from: "8 May", to: "8 May", days: 1, backup: "Priya Desai", status: "Approved" },
 { name: "Priya Desai", initials: "PD", color: "bg-pink-100 text-pink-600", type: "Sick Leave", from: "15 May", to: "15 May", days: 1, backup: "Neha Rao", status: "Pending" },
];

const weekDays = ["Mon 28", "Tue 29", "Wed 30", "Thu 1", "Fri 2"];
const weeklyTimeline = [
 { name: "Miracle V.", days: [false, false, true, true, true] },
 { name: "Raj M.", days: [false, false, true, false, false] },
 { name: "Neha R.", days: [false, true, true, true, false] },
 { name: "Alena G.", days: [false, false, false, false, false] },
 { name: "Karan P.", days: [false, false, false, false, false] },
];

const statusStyle: Record<string, string> = {
 Approved: "bg-green-50 dark:bg-green-500/10 text-green-700 border-green-200 dark:border-green-500/30",
 Pending: "bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 border-yellow-200 dark:border-yellow-500/30",
};

export default function TeamOnLeavePage() {
 return (
 <div className="space-y-6 pb-12">
 {/* Header */}
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
 <div>
 <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Team on Leave</h1>
 <p className="text-gray-500 dark:text-[#a1a1aa] mt-1 text-sm font-medium">See who is away today, this week and upcoming.</p>
 </div>
 <div className="flex items-center gap-3">
 <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#262626] text-sm font-medium text-gray-700 dark:text-[#cbd5e1] bg-white dark:bg-[#111111] hover:bg-gray-50 dark:bg-[#111111] dark:hover:bg-[#181818]">
 Today <ChevronDown size={14} />
 </button>
 <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#262626] text-sm font-medium text-gray-700 dark:text-[#cbd5e1] bg-white dark:bg-[#111111] hover:bg-gray-50 dark:bg-[#111111] dark:hover:bg-[#181818]">
 All Departments <ChevronDown size={14} />
 </button>
 </div>
 </div>

 {/* Availability Summary */}
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
 {[
 { icon: Users, label: "Team Members", value: "12", color: "bg-blue-50 dark:bg-blue-500/10 text-blue-600" },
 { icon: UserCheck, label: "Present", value: "8", color: "bg-green-50 dark:bg-green-500/10 text-green-600" },
 { icon: CalendarX, label: "On Leave", value: "3", color: "bg-red-50 dark:bg-red-500/10 text-red-600" },
 { icon: Home, label: "Work From Home", value: "1", color: "bg-indigo-50 text-indigo-600" },
 ].map((c) => (
 <div key={c.label} className="bg-white dark:bg-[#111111] rounded-2xl p-4 border border-gray-100 dark:border-[#262626] shadow-sm transition-shadow group">
 <div className={`w-9 h-9 rounded-xl ${c.color} flex items-center justify-center mb-2 transition-transform`}>
 <c.icon size={18} strokeWidth={2.5} />
 </div>
 <p className="text-[11px] text-gray-500 dark:text-[#a1a1aa] font-medium">{c.label}</p>
 <h4 className="text-lg font-bold text-gray-900 dark:text-white">{c.value}</h4>
 </div>
 ))}
 </div>

 {/* On Leave Today */}
 <div>
 <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">On Leave Today</h2>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
 {teamOnLeave.map((m) => (
 <div key={m.name} className="bg-white dark:bg-[#111111] rounded-2xl p-5 border border-gray-100 dark:border-[#262626] shadow-sm hover:border-blue-100 transition-all">
 <div className="flex items-center gap-3 mb-4">
 <div className={`w-11 h-11 rounded-full ${m.color} flex items-center justify-center font-bold text-xs shrink-0`}>{m.initials}</div>
 <div className="min-w-0">
 <p className="text-[13px] font-bold text-gray-900 dark:text-white truncate">{m.name}</p>
 <p className="text-[11px] text-gray-500 dark:text-[#a1a1aa] truncate">{m.designation}</p>
 </div>
 </div>
 <div className="space-y-2 mb-4">
 <div className="flex justify-between text-[12px]"><span className="text-gray-400 dark:text-[#737373]">Leave Type</span><span className="font-medium text-gray-700 dark:text-[#cbd5e1]">{m.leaveType}</span></div>
 <div className="flex justify-between text-[12px]"><span className="text-gray-400 dark:text-[#737373]">Dates</span><span className="font-medium text-gray-700 dark:text-[#cbd5e1]">{m.dates}</span></div>
 <div className="flex justify-between text-[12px]"><span className="text-gray-400 dark:text-[#737373]">Duration</span><span className="font-medium text-gray-700 dark:text-[#cbd5e1]">{m.days}</span></div>
 <div className="flex justify-between text-[12px]"><span className="text-gray-400 dark:text-[#737373]">Backup</span><span className="font-medium text-gray-700 dark:text-[#cbd5e1]">{m.backup}</span></div>
 <div className="flex justify-between text-[12px]"><span className="text-gray-400 dark:text-[#737373]">Status</span><span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${statusStyle[m.status]}`}>{m.status}</span></div>
 </div>
 <div className="flex items-center gap-2 pt-3 border-t border-gray-100 dark:border-[#262626]">
 <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[12px] font-semibold text-blue-600 bg-blue-50 dark:bg-blue-500/10 hover:bg-blue-100 dark:bg-blue-50 transition-colors"><Eye size={13} /> View Profile</button>
 <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[12px] font-semibold text-gray-600 dark:text-[#a1a1aa] bg-gray-50 dark:bg-[#111111] hover:bg-gray-100 dark:bg-[#111111] dark:hover:bg-[#181818] transition-colors"><MessageSquare size={13} /> Message</button>
 </div>
 </div>
 ))}
 </div>
 </div>

 {/* Weekly Timeline + Overlap */}
 <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5">
 {/* Timeline */}
 <div className="bg-white dark:bg-[#111111] rounded-2xl p-5 border border-gray-100 dark:border-[#262626] shadow-sm">
 <h3 className="font-bold text-gray-900 dark:text-white mb-4">This Week&apos;s Leave Timeline</h3>
 <div className="overflow-x-auto">
 <table className="w-full text-left border-collapse min-w-[400px]">
 <thead>
 <tr className="border-b border-gray-100 dark:border-[#262626]">
 <th className="py-2 px-3 text-[11px] font-semibold text-gray-500 dark:text-[#a1a1aa] w-28">Member</th>
 {weekDays.map((d) => (
 <th key={d} className="py-2 px-2 text-[10px] font-semibold text-gray-500 dark:text-[#a1a1aa] text-center">{d}</th>
 ))}
 </tr>
 </thead>
 <tbody className="divide-y divide-gray-50 dark:divide-[#262626]">
 {weeklyTimeline.map((row) => (
 <tr key={row.name} className="hover:bg-gray-50 dark:bg-[#111111] dark:hover:bg-[#181818]/50">
 <td className="py-2.5 px-3 text-[12px] font-medium text-gray-800 dark:text-[#e2e8f0]">{row.name}</td>
 {row.days.map((on, i) => (
 <td key={i} className="py-2.5 px-2 text-center">
 {on ? <span className="inline-block w-6 h-6 rounded-md bg-red-100 text-red-600 text-[10px] font-bold leading-6">L</span> : <span className="inline-block w-6 h-6 rounded-md bg-green-50 dark:bg-green-500/10 text-green-500 text-[10px] font-bold leading-6">✓</span>}
 </td>
 ))}
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>

 {/* Overlap Warning */}
 <div className="bg-white dark:bg-[#111111] rounded-2xl p-5 border border-gray-100 dark:border-[#262626] shadow-sm">
 <div className="flex items-center gap-2 mb-3">
 <AlertTriangle size={16} className="text-orange-500" />
 <h4 className="font-bold text-gray-900 dark:text-white text-[13px]">Overlap Warning</h4>
 </div>
 <div className="space-y-3">
 <div className="p-3 rounded-xl bg-orange-50 dark:bg-orange-500/10 border border-orange-100">
 <p className="text-[12px] font-semibold text-orange-800">3 members on leave on 30 Apr</p>
 <p className="text-[11px] text-orange-600 mt-1">Consider planning coverage for Design and HR teams.</p>
 </div>
 <div className="p-3 rounded-xl bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-100">
 <p className="text-[12px] font-semibold text-yellow-800">2 members on leave on 1 May</p>
 <p className="text-[11px] text-yellow-600 mt-1">Labour Day holiday — limited impact.</p>
 </div>
 </div>
 </div>
 </div>

 {/* Upcoming Table */}
 <div className="bg-white dark:bg-[#111111] rounded-2xl p-5 border border-gray-100 dark:border-[#262626] shadow-sm">
 <h3 className="font-bold text-gray-900 dark:text-white mb-4">Upcoming Team Leaves</h3>
 <div className="overflow-x-auto">
 <table className="w-full text-left border-collapse min-w-[600px]">
 <thead>
 <tr className="bg-gray-50 dark:bg-[#111111]/80 border-b border-gray-100 dark:border-[#262626]">
 {["Employee", "Leave Type", "From", "To", "Days", "Backup", "Status"].map((h) => (
 <th key={h} className="py-2.5 px-3 text-[11px] font-semibold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider">{h}</th>
 ))}
 </tr>
 </thead>
 <tbody className="divide-y divide-gray-50 dark:divide-[#262626]">
 {upcomingLeaves.map((l, i) => (
 <tr key={i} className="hover:bg-gray-50 dark:hover:bg-[#181818] transition-colors">
 <td className="py-3 px-3">
 <div className="flex items-center gap-2.5">
 <div className={`w-8 h-8 rounded-full ${l.color} flex items-center justify-center font-bold text-[10px] shrink-0`}>{l.initials}</div>
 <span className="text-[13px] font-semibold text-gray-900 dark:text-white">{l.name}</span>
 </div>
 </td>
 <td className="py-3 px-3 text-[13px] text-gray-600 dark:text-[#a1a1aa]">{l.type}</td>
 <td className="py-3 px-3 text-[13px] text-gray-600 dark:text-[#a1a1aa]">{l.from}</td>
 <td className="py-3 px-3 text-[13px] text-gray-600 dark:text-[#a1a1aa]">{l.to}</td>
 <td className="py-3 px-3 text-[13px] font-semibold text-gray-800 dark:text-[#e2e8f0]">{l.days}</td>
 <td className="py-3 px-3 text-[12px] text-gray-500 dark:text-[#a1a1aa]">{l.backup}</td>
 <td className="py-3 px-3"><span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${statusStyle[l.status]}`}>{l.status}</span></td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 </div>
 );
}
