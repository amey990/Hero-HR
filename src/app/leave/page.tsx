"use client";

import {
 Calendar, CalendarCheck, CalendarX, Clock, AlertCircle,
 ChevronDown, Plus, TrendingUp
} from "lucide-react";

const leaveTypes = [
 { type: "Casual Leave", total: 12, used: 5, remaining: 7, color: "bg-blue-50 dark:bg-blue-500/100", lightBg: "bg-blue-50 dark:bg-blue-500/10 text-blue-600" },
 { type: "Sick Leave", total: 10, used: 3, remaining: 7, color: "bg-red-50 dark:bg-red-500/100", lightBg: "bg-red-50 dark:bg-red-500/10 text-red-600" },
 { type: "Earned Leave", total: 18, used: 6, remaining: 12, color: "bg-green-50 dark:bg-green-500/100", lightBg: "bg-green-50 dark:bg-green-500/10 text-green-600" },
 { type: "Comp Off", total: 4, used: 1, remaining: 3, color: "bg-purple-50 dark:bg-purple-500/100", lightBg: "bg-purple-50 dark:bg-purple-500/10 text-purple-600" },
 { type: "Unpaid Leave", total: 0, used: 2, remaining: 0, color: "bg-gray-50 dark:bg-[#111111]0", lightBg: "bg-gray-50 dark:bg-[#111111] text-gray-600 dark:text-[#a1a1aa]" },
];

const monthlyUsage = [
 { month: "Jan", days: 2 }, { month: "Feb", days: 0 }, { month: "Mar", days: 1 },
 { month: "Apr", days: 3 }, { month: "May", days: 1 }, { month: "Jun", days: 2 },
 { month: "Jul", days: 0 }, { month: "Aug", days: 3 }, { month: "Sep", days: 1 },
 { month: "Oct", days: 2 }, { month: "Nov", days: 1 }, { month: "Dec", days: 1 },
];

const upcoming = [
 { type: "Casual Leave", dates: "5 May - 6 May", days: "2 days", status: "Approved" },
 { type: "Earned Leave", dates: "20 May - 23 May", days: "4 days", status: "Pending" },
 { type: "Sick Leave", dates: "10 Jun", days: "1 day", status: "Approved" },
];

const history = [
 { type: "Casual Leave", from: "16 Apr", to: "17 Apr", days: 2, applied: "10 Apr 2026", status: "Approved" },
 { type: "Sick Leave", from: "7 Apr", to: "7 Apr", days: 1, applied: "7 Apr 2026", status: "Approved" },
 { type: "Earned Leave", from: "20 May", to: "23 May", days: 4, applied: "25 Apr 2026", status: "Pending" },
 { type: "Casual Leave", from: "5 May", to: "6 May", days: 2, applied: "28 Apr 2026", status: "Approved" },
 { type: "Comp Off", from: "15 Mar", to: "15 Mar", days: 1, applied: "12 Mar 2026", status: "Approved" },
 { type: "Sick Leave", from: "1 Feb", to: "2 Feb", days: 2, applied: "1 Feb 2026", status: "Approved" },
 { type: "Casual Leave", from: "10 Jan", to: "10 Jan", days: 1, applied: "5 Jan 2026", status: "Rejected" },
 { type: "Unpaid Leave", from: "28 Mar", to: "29 Mar", days: 2, applied: "20 Mar 2026", status: "Cancelled" },
];

const statusStyle: Record<string, string> = {
 Approved: "bg-green-50 dark:bg-green-500/10 text-green-700 border-green-200 dark:border-green-500/30",
 Pending: "bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 border-yellow-200 dark:border-yellow-500/30",
 Rejected: "bg-red-50 dark:bg-red-500/10 text-red-700 border-red-200 dark:border-red-500/30",
 Cancelled: "bg-gray-100 dark:bg-[#111111] text-gray-500 dark:text-[#a1a1aa] border-gray-200 dark:border-[#262626]",
};

export default function LeaveBalancePage() {
 return (
 <div className="space-y-6 pb-12">
 {/* Header */}
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
 <div>
 <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Leave Balance</h1>
 <p className="text-gray-500 dark:text-[#a1a1aa] mt-1 text-sm font-medium">Track your allocated, used and remaining leaves.</p>
 </div>
 <div className="flex items-center gap-3">
 <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#262626] text-sm font-medium text-gray-700 dark:text-[#cbd5e1] bg-white dark:bg-[#111111] hover:bg-gray-50 dark:bg-[#111111] dark:hover:bg-[#181818] transition-colors">
 2026 <ChevronDown size={14} />
 </button>
 <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm">
 <Plus size={16} /> Apply Leave
 </button>
 </div>
 </div>

 {/* Leave Balance Cards */}
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
 {leaveTypes.map((lt) => {
 const pct = lt.total > 0 ? (lt.used / lt.total) * 100 : (lt.used > 0 ? 100 : 0);
 return (
 <div key={lt.type} className="bg-white dark:bg-[#111111] rounded-2xl p-5 border border-gray-100 dark:border-[#262626] shadow-sm transition-shadow">
 <div className="flex items-center gap-2 mb-3">
 <div className={`w-2.5 h-2.5 rounded-full ${lt.color}`} />
 <h4 className="text-[13px] font-bold text-gray-900 dark:text-white">{lt.type}</h4>
 </div>
 <div className="flex items-end justify-between mb-3">
 <div>
 <span className="text-2xl font-bold text-gray-900 dark:text-white">{lt.remaining}</span>
 <span className="text-[12px] text-gray-400 dark:text-[#737373] ml-1">/ {lt.total}</span>
 </div>
 <span className="text-[11px] font-medium text-gray-500 dark:text-[#a1a1aa]">{lt.used} used</span>
 </div>
 <div className="h-1.5 bg-gray-100 dark:bg-[#111111] rounded-full overflow-hidden">
 <div className={`h-full rounded-full ${lt.color} transition-all`} style={{ width: `${Math.min(pct, 100)}%` }} />
 </div>
 </div>
 );
 })}
 </div>

 {/* Summary + Trend */}
 <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-5">
 {/* Year Summary */}
 <div className="grid grid-cols-2 gap-4">
 {[
 { icon: CalendarX, label: "Total Taken", value: "17", color: "bg-blue-50 dark:bg-blue-500/10 text-blue-600" },
 { icon: Clock, label: "Pending", value: "2", color: "bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600" },
 { icon: CalendarCheck, label: "Approved", value: "8", color: "bg-green-50 dark:bg-green-500/10 text-green-600" },
 { icon: Calendar, label: "Upcoming", value: "3", color: "bg-purple-50 dark:bg-purple-500/10 text-purple-600" },
 ].map((s) => (
 <div key={s.label} className="bg-white dark:bg-[#111111] rounded-2xl p-4 border border-gray-100 dark:border-[#262626] shadow-sm transition-shadow group">
 <div className={`w-9 h-9 rounded-xl ${s.color} flex items-center justify-center mb-2 transition-transform`}>
 <s.icon size={18} strokeWidth={2.5} />
 </div>
 <p className="text-[11px] text-gray-500 dark:text-[#a1a1aa] font-medium">{s.label}</p>
 <h4 className="text-lg font-bold text-gray-900 dark:text-white">{s.value}</h4>
 </div>
 ))}
 </div>

 {/* Monthly Usage Trend */}
 <div className="bg-white dark:bg-[#111111] rounded-2xl p-5 border border-gray-100 dark:border-[#262626] shadow-sm">
 <div className="flex items-center gap-2 mb-4">
 <TrendingUp size={16} className="text-blue-600" />
 <h3 className="font-bold text-gray-900 dark:text-white">Monthly Leave Usage</h3>
 </div>
 <div className="flex items-end gap-2 h-32">
 {monthlyUsage.map((m) => (
 <div key={m.month} className="flex-1 flex flex-col items-center gap-1.5">
 <div className="w-full bg-gray-50 dark:bg-[#111111] rounded-md relative" style={{ height: "90px" }}>
 <div className={`absolute bottom-0 left-0 right-0 rounded-md transition-all ${m.days > 0 ? "bg-blue-400" : "bg-gray-100 dark:bg-[#111111]"}`} style={{ height: m.days > 0 ? `${(m.days / 4) * 100}%` : "3px" }} />
 </div>
 <span className="text-[10px] font-bold text-gray-500 dark:text-[#a1a1aa]">{m.days}</span>
 <span className="text-[9px] text-gray-400 dark:text-[#737373] font-medium">{m.month}</span>
 </div>
 ))}
 </div>
 </div>
 </div>

 {/* Upcoming + History */}
 <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-5">
 {/* Upcoming */}
 <div className="bg-white dark:bg-[#111111] rounded-2xl p-5 border border-gray-100 dark:border-[#262626] shadow-sm">
 <h3 className="font-bold text-gray-900 dark:text-white mb-4">Upcoming Leaves</h3>
 <div className="space-y-3">
 {upcoming.map((u, i) => (
 <div key={i} className="flex items-start justify-between p-3 rounded-xl bg-gray-50 dark:bg-[#111111]/50 border border-gray-100 dark:border-[#262626] hover:bg-gray-50 dark:bg-[#111111] dark:hover:bg-[#181818] transition-colors">
 <div>
 <p className="text-[13px] font-semibold text-gray-800 dark:text-[#e2e8f0]">{u.type}</p>
 <p className="text-[11px] text-gray-500 dark:text-[#a1a1aa] mt-0.5">{u.dates} · {u.days}</p>
 </div>
 <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border shrink-0 ${statusStyle[u.status]}`}>{u.status}</span>
 </div>
 ))}
 </div>
 </div>

 {/* History Table */}
 <div className="bg-white dark:bg-[#111111] rounded-2xl p-5 border border-gray-100 dark:border-[#262626] shadow-sm">
 <h3 className="font-bold text-gray-900 dark:text-white mb-4">Leave History</h3>
 <div className="overflow-x-auto">
 <table className="w-full text-left border-collapse min-w-[560px]">
 <thead>
 <tr className="bg-gray-50 dark:bg-[#111111]/80 border-b border-gray-100 dark:border-[#262626]">
 {["Leave Type", "From", "To", "Days", "Applied On", "Status"].map((h) => (
 <th key={h} className="py-2.5 px-3 text-[11px] font-semibold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider">{h}</th>
 ))}
 </tr>
 </thead>
 <tbody className="divide-y divide-gray-50 dark:divide-[#262626]">
 {history.map((h, i) => (
 <tr key={i} className="hover:bg-gray-50 dark:hover:bg-[#181818] transition-colors">
 <td className="py-3 px-3 text-[13px] font-medium text-gray-900 dark:text-white">{h.type}</td>
 <td className="py-3 px-3 text-[13px] text-gray-600 dark:text-[#a1a1aa]">{h.from}</td>
 <td className="py-3 px-3 text-[13px] text-gray-600 dark:text-[#a1a1aa]">{h.to}</td>
 <td className="py-3 px-3 text-[13px] font-semibold text-gray-800 dark:text-[#e2e8f0]">{h.days}</td>
 <td className="py-3 px-3 text-[12px] text-gray-500 dark:text-[#a1a1aa]">{h.applied}</td>
 <td className="py-3 px-3"><span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${statusStyle[h.status]}`}>{h.status}</span></td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 </div>
 </div>
 );
}
