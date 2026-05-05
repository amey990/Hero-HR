"use client";

import Link from "next/link";
import {
 Clock, MapPin, CalendarCheck, CalendarX, AlertTriangle, Home,
 Timer, Award, TrendingUp, FileText, Shield, ChevronDown
} from "lucide-react";

const recentLogs = [
 { date: "30 Apr 2026", clockIn: "09:04 AM", clockOut: "-", hours: "4h 32m", status: "Present", remarks: "In progress" },
 { date: "29 Apr 2026", clockIn: "09:02 AM", clockOut: "06:31 PM", hours: "8h 42m", status: "Present", remarks: "On time" },
 { date: "28 Apr 2026", clockIn: "10:12 AM", clockOut: "07:01 PM", hours: "7h 49m", status: "Late", remarks: "Late arrival" },
 { date: "27 Apr 2026", clockIn: "-", clockOut: "-", hours: "-", status: "Weekend", remarks: "Weekly off" },
 { date: "26 Apr 2026", clockIn: "-", clockOut: "-", hours: "-", status: "Weekend", remarks: "Weekly off" },
 { date: "25 Apr 2026", clockIn: "09:15 AM", clockOut: "06:45 PM", hours: "8h 30m", status: "Present", remarks: "On time" },
];

const regularizations = [
 { date: "22 Apr 2026", reason: "Forgot to clock out", status: "Approved" },
 { date: "18 Apr 2026", reason: "System error - missed punch", status: "Pending" },
 { date: "10 Apr 2026", reason: "Biometric not working", status: "Rejected" },
];

const logStatusStyle: Record<string, string> = {
 Present: "bg-green-50 dark:bg-green-500/10 text-green-700 border-green-200 dark:border-green-500/30",
 Late: "bg-orange-50 dark:bg-orange-500/10 text-orange-700 border-orange-200 dark:border-orange-500/30",
 Absent: "bg-red-50 dark:bg-red-500/10 text-red-700 border-red-200 dark:border-red-500/30",
 Weekend: "bg-gray-50 dark:bg-[#111111] text-gray-500 dark:text-[#a1a1aa] border-gray-200 dark:border-[#262626]",
};

const regStatusStyle: Record<string, string> = {
 Approved: "bg-green-50 dark:bg-green-500/10 text-green-700 border-green-200 dark:border-green-500/30",
 Pending: "bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 border-yellow-200 dark:border-yellow-500/30",
 Rejected: "bg-red-50 dark:bg-red-500/10 text-red-700 border-red-200 dark:border-red-500/30",
};

const weeklyHours = [
 { day: "Mon", hours: 8, max: 10 },
 { day: "Tue", hours: 7.5, max: 10 },
 { day: "Wed", hours: 9, max: 10 },
 { day: "Thu", hours: 8.2, max: 10 },
 { day: "Fri", hours: 6.5, max: 10 },
 { day: "Sat", hours: 0, max: 10 },
 { day: "Sun", hours: 0, max: 10 },
];

export default function AttendancePage() {
 return (
 <div className="space-y-6 pb-12">
 {/* Header */}
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
 <div>
 <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Attendance Overview</h1>
 <p className="text-gray-500 dark:text-[#a1a1aa] mt-1 text-sm font-medium">Track your daily attendance, work hours and monthly consistency.</p>
 </div>
 <Link href="/attendance/regularization" className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#262626] text-sm font-semibold text-gray-700 dark:text-[#cbd5e1] bg-white dark:bg-[#111111] hover:bg-gray-50 dark:bg-[#111111] dark:hover:bg-[#181818] transition-colors">
 <FileText size={16} /> Request Regularization
 </Link>
 </div>

 {/* Today's Attendance + Attendance Score */}
 <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5">
 {/* Today's Card */}
 <div className="bg-white dark:bg-[#111111] rounded-2xl p-6 border border-gray-100 dark:border-[#262626] shadow-sm">
 <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-100 dark:border-[#262626]">
 <h3 className="font-bold text-gray-900 dark:text-white text-lg">Today&apos;s Attendance</h3>
 <span className="text-[11px] font-semibold px-3 py-1 rounded-full border bg-green-50 dark:bg-green-500/10 text-green-700 border-green-200 dark:border-green-500/30">Present</span>
 </div>
 <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 mb-5">
 <div>
 <p className="text-[11px] text-gray-400 dark:text-[#737373] font-medium uppercase mb-1">Clock In</p>
 <p className="text-lg font-bold text-gray-900 dark:text-white">09:04 AM</p>
 </div>
 <div>
 <p className="text-[11px] text-gray-400 dark:text-[#737373] font-medium uppercase mb-1">Clock Out</p>
 <p className="text-lg font-bold text-gray-400 dark:text-[#737373] italic">Not yet</p>
 </div>
 <div>
 <p className="text-[11px] text-gray-400 dark:text-[#737373] font-medium uppercase mb-1">Worked Today</p>
 <p className="text-lg font-bold text-blue-600">4h 32m</p>
 </div>
 <div>
 <p className="text-[11px] text-gray-400 dark:text-[#737373] font-medium uppercase mb-1">Shift</p>
 <p className="text-sm font-semibold text-gray-700 dark:text-[#cbd5e1]">General Shift</p>
 </div>
 <div>
 <p className="text-[11px] text-gray-400 dark:text-[#737373] font-medium uppercase mb-1">Location</p>
 <p className="text-sm font-semibold text-gray-700 dark:text-[#cbd5e1] flex items-center gap-1"><MapPin size={13} /> Office — HQ</p>
 </div>
 </div>
 <div className="flex items-center justify-between">
 <p className="text-[12px] text-green-600 font-medium flex items-center gap-1.5">
 <span className="w-2 h-2 rounded-full bg-green-50 dark:bg-green-500/100 animate-pulse" /> You are currently checked in.
 </p>
 <button className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm">
 Clock Out
 </button>
 </div>
 </div>

 {/* Attendance Score */}
 <div className="bg-white dark:bg-[#111111] rounded-2xl p-6 border border-gray-100 dark:border-[#262626] shadow-sm flex flex-col">
 <h3 className="font-bold text-gray-900 dark:text-white mb-4">Attendance Score</h3>
 <div className="flex-1 flex flex-col items-center justify-center">
 <div className="relative w-28 h-28 mb-4">
 <svg className="w-full h-full" viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)" }}>
 <circle cx="50" cy="50" r="42" stroke="#f3f4f6" strokeWidth="8" fill="none" />
 <circle cx="50" cy="50" r="42" stroke="#3b82f6" strokeWidth="8" fill="none" strokeDasharray="263.9" strokeDashoffset="21.1" strokeLinecap="round" />
 </svg>
 <div className="absolute inset-0 flex flex-col items-center justify-center">
 <span className="text-2xl font-bold text-gray-900 dark:text-white">92%</span>
 </div>
 </div>
 <div className="space-y-2 w-full">
 <div className="flex items-center justify-between text-[12px]">
 <span className="text-gray-500 dark:text-[#a1a1aa]">On-time rate</span>
 <span className="font-bold text-gray-900 dark:text-white">88%</span>
 </div>
 <div className="flex items-center justify-between text-[12px]">
 <span className="text-gray-500 dark:text-[#a1a1aa]">Consistency</span>
 <span className="font-bold text-green-600">Good</span>
 </div>
 </div>
 </div>
 </div>
 </div>

 {/* Monthly Summary Cards */}
 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
 {[
 { icon: CalendarCheck, label: "Present Days", value: "22", color: "bg-green-50 dark:bg-green-500/10 text-green-600" },
 { icon: CalendarX, label: "Absent Days", value: "1", color: "bg-red-50 dark:bg-red-500/10 text-red-600" },
 { icon: AlertTriangle, label: "Late Arrivals", value: "3", color: "bg-orange-50 dark:bg-orange-500/10 text-orange-600" },
 { icon: CalendarX, label: "Leaves Taken", value: "2", color: "bg-purple-50 dark:bg-purple-500/10 text-purple-600" },
 { icon: Home, label: "Work From Home", value: "4", color: "bg-indigo-50 text-indigo-600" },
 { icon: Timer, label: "Total Hours", value: "168h", color: "bg-blue-50 dark:bg-blue-500/10 text-blue-600" },
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

 {/* Weekly Work Hours + Policy */}
 <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5">
 {/* Weekly Hours */}
 <div className="bg-white dark:bg-[#111111] rounded-2xl p-5 border border-gray-100 dark:border-[#262626] shadow-sm">
 <h3 className="font-bold text-gray-900 dark:text-white mb-4">Weekly Work Hours</h3>
 <div className="flex items-end gap-3 h-40">
 {weeklyHours.map((d) => (
 <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
 <div className="w-full bg-gray-50 dark:bg-[#111111] rounded-lg relative" style={{ height: "120px" }}>
 <div
 className={`absolute bottom-0 left-0 right-0 rounded-lg transition-all ${d.hours > 0 ? (d.hours >= 8 ? "bg-blue-50 dark:bg-blue-500/100" : "bg-blue-300") : "bg-gray-100 dark:bg-[#111111]"}`}
 style={{ height: d.hours > 0 ? `${(d.hours / d.max) * 100}%` : "4px" }}
 />
 </div>
 <span className="text-[11px] font-bold text-gray-600 dark:text-[#a1a1aa]">{d.hours > 0 ? `${d.hours}h` : "Off"}</span>
 <span className="text-[10px] text-gray-400 dark:text-[#737373] font-medium">{d.day}</span>
 </div>
 ))}
 </div>
 </div>

 {/* Attendance Policy */}
 <div className="bg-white dark:bg-[#111111] rounded-2xl p-5 border border-gray-100 dark:border-[#262626] shadow-sm">
 <div className="flex items-center gap-2 mb-4">
 <Shield size={18} className="text-blue-600" />
 <h3 className="font-bold text-gray-900 dark:text-white">Attendance Policy</h3>
 </div>
 <div className="space-y-3">
 {[
 { label: "Grace period", value: "10 minutes" },
 { label: "Full-day hours", value: "8 hours minimum" },
 { label: "Half-day threshold", value: "4 hours" },
 { label: "Weekly off", value: "Saturday, Sunday" },
 ].map((r) => (
 <div key={r.label} className="flex items-center justify-between text-[13px] py-2 border-b border-gray-50 dark:border-[#262626] last:border-0">
 <span className="text-gray-500 dark:text-[#a1a1aa]">{r.label}</span>
 <span className="font-semibold text-gray-800 dark:text-[#e2e8f0]">{r.value}</span>
 </div>
 ))}
 </div>
 </div>
 </div>

 {/* Recent Logs + Regularizations */}
 <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5">
 {/* Recent Logs */}
 <div className="bg-white dark:bg-[#111111] rounded-2xl p-5 border border-gray-100 dark:border-[#262626] shadow-sm">
 <h3 className="font-bold text-gray-900 dark:text-white mb-4">Recent Attendance Logs</h3>
 <div className="overflow-x-auto">
 <table className="w-full text-left border-collapse min-w-[520px]">
 <thead>
 <tr className="bg-gray-50 dark:bg-[#111111]/80 border-b border-gray-100 dark:border-[#262626]">
 {["Date", "Clock In", "Clock Out", "Total Hours", "Status", "Remarks"].map((h) => (
 <th key={h} className="py-2.5 px-3 text-[11px] font-semibold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider">{h}</th>
 ))}
 </tr>
 </thead>
 <tbody className="divide-y divide-gray-50 dark:divide-[#262626]">
 {recentLogs.map((log) => (
 <tr key={log.date} className="hover:bg-gray-50 dark:hover:bg-[#181818] transition-colors">
 <td className="py-3 px-3 text-[13px] font-medium text-gray-900 dark:text-white">{log.date}</td>
 <td className="py-3 px-3 text-[13px] text-gray-600 dark:text-[#a1a1aa]">{log.clockIn}</td>
 <td className="py-3 px-3 text-[13px] text-gray-600 dark:text-[#a1a1aa]">{log.clockOut}</td>
 <td className="py-3 px-3 text-[13px] font-semibold text-gray-800 dark:text-[#e2e8f0]">{log.hours}</td>
 <td className="py-3 px-3">
 <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${logStatusStyle[log.status] || logStatusStyle.Present}`}>{log.status}</span>
 </td>
 <td className="py-3 px-3 text-[12px] text-gray-500 dark:text-[#a1a1aa]">{log.remarks}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>

 {/* Regularizations */}
 <div className="bg-white dark:bg-[#111111] rounded-2xl p-5 border border-gray-100 dark:border-[#262626] shadow-sm">
 <h3 className="font-bold text-gray-900 dark:text-white mb-4">Regularization Requests</h3>
 <div className="space-y-3">
 {regularizations.map((r) => (
 <div key={r.date} className="flex items-start justify-between p-3 rounded-xl bg-gray-50 dark:bg-[#111111]/50 border border-gray-100 dark:border-[#262626] hover:bg-gray-50 dark:bg-[#111111] dark:hover:bg-[#181818] transition-colors">
 <div>
 <p className="text-[13px] font-semibold text-gray-800 dark:text-[#e2e8f0]">{r.date}</p>
 <p className="text-[11px] text-gray-500 dark:text-[#a1a1aa] mt-0.5">{r.reason}</p>
 </div>
 <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border shrink-0 ${regStatusStyle[r.status]}`}>{r.status}</span>
 </div>
 ))}
 </div>
 </div>
 </div>
 </div>
 );
}
