"use client";

import {
 Download, ChevronDown, TrendingUp, TrendingDown, Clock, CalendarCheck,
 CalendarX, FileText, AlertCircle, CheckCircle, Zap, BarChart3
} from "lucide-react";
import {
 BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
 LineChart, Line, PieChart, Pie, Cell, Legend, AreaChart, Area,
} from "recharts";

// --- Data ---
const attendanceMonthly = [
 { month: "Jan", Present: 20, Absent: 1, Late: 2, WFH: 3, Leave: 1 },
 { month: "Feb", Present: 18, Absent: 0, Late: 3, WFH: 2, Leave: 2 },
 { month: "Mar", Present: 21, Absent: 1, Late: 1, WFH: 4, Leave: 0 },
 { month: "Apr", Present: 22, Absent: 1, Late: 3, WFH: 2, Leave: 2 },
 { month: "May", Present: 19, Absent: 0, Late: 2, WFH: 5, Leave: 1 },
 { month: "Jun", Present: 20, Absent: 2, Late: 1, WFH: 3, Leave: 2 },
];

const workHoursWeekly = [
 { day: "Mon", hours: 8 },
 { day: "Tue", hours: 7.5 },
 { day: "Wed", hours: 9 },
 { day: "Thu", hours: 8.2 },
 { day: "Fri", hours: 6.5 },
 { day: "Sat", hours: 0 },
 { day: "Sun", hours: 0 },
];

const leaveUsage = [
 { name: "Casual", value: 5, color: "#3b82f6" },
 { name: "Sick", value: 3, color: "#ef4444" },
 { name: "Earned", value: 6, color: "#22c55e" },
 { name: "Comp Off", value: 1, color: "#a855f7" },
 { name: "Unpaid", value: 2, color: "#6b7280" },
];

const netPayTrend = [
 { month: "Nov", pay: 63000 },
 { month: "Dec", pay: 63000 },
 { month: "Jan", pay: 68500 },
 { month: "Feb", pay: 68500 },
 { month: "Mar", pay: 68500 },
 { month: "Apr", pay: 68500 },
];

const insights = [
 { icon: CheckCircle, text: "You were on time 88% of days this month.", color: "text-green-600 bg-green-50 dark:bg-green-500/10" },
 { icon: TrendingUp, text: "Your average work hours improved by 6% vs last month.", color: "text-blue-600 bg-blue-50 dark:bg-blue-500/10" },
 { icon: AlertCircle, text: "You have 3 pending document acknowledgements.", color: "text-yellow-600 bg-yellow-50 dark:bg-yellow-500/10" },
 { icon: Zap, text: "Your leave usage is within normal range.", color: "text-purple-600 bg-purple-50 dark:bg-purple-500/10" },
];

const activity = [
 { text: "Checked in late on 22 Apr", time: "2 days ago", dot: "bg-orange-50 dark:bg-orange-500/100" },
 { text: "Leave approved for 15 Apr", time: "5 days ago", dot: "bg-green-50 dark:bg-green-500/100" },
 { text: "Payslip downloaded for March", time: "1 week ago", dot: "bg-blue-50 dark:bg-blue-500/100" },
 { text: "Code of Conduct acknowledgement pending", time: "2 weeks ago", dot: "bg-yellow-50 dark:bg-yellow-500/100" },
];

export default function AnalyticsPage() {
 return (
 <div className="space-y-6 pb-12">
 {/* Header */}
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
 <div>
 <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Analytics</h1>
 <p className="text-gray-500 dark:text-[#a1a1aa] mt-1 text-sm font-medium">View your attendance, leave, work hours and salary insights.</p>
 </div>
 <div className="flex items-center gap-2">
 <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#262626] text-sm font-medium text-gray-700 dark:text-[#cbd5e1] bg-white dark:bg-[#111111] hover:bg-gray-50 dark:bg-[#111111] dark:hover:bg-[#181818]">April 2026 <ChevronDown size={14} /></button>
 <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 shadow-sm"><Download size={16} /> Export Report</button>
 </div>
 </div>

 {/* Summary Cards */}
 <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
 {[
 { icon: CalendarCheck, label: "Attendance Score", value: "92%", trend: "+6% from last month", up: true, color: "bg-green-50 dark:bg-green-500/10 text-green-600" },
 { icon: Clock, label: "Avg Work Hours", value: "7h 48m", trend: "+12min vs last week", up: true, color: "bg-blue-50 dark:bg-blue-500/10 text-blue-600" },
 { icon: CalendarX, label: "Leave Used", value: "17 days", trend: "3 more than last year", up: false, color: "bg-orange-50 dark:bg-orange-500/10 text-orange-600" },
 { icon: FileText, label: "Pending Requests", value: "3", trend: "2 leave, 1 document", up: false, color: "bg-purple-50 dark:bg-purple-500/10 text-purple-600" },
 ].map((c) => (
 <div key={c.label} className="bg-white dark:bg-[#111111] rounded-2xl p-5 border border-gray-100 dark:border-[#262626] shadow-sm transition-shadow group">
 <div className="flex items-center justify-between mb-3">
 <div className={`w-10 h-10 rounded-xl ${c.color} flex items-center justify-center transition-transform`}>
 <c.icon size={20} strokeWidth={2.5} />
 </div>
 <div className={`flex items-center gap-0.5 text-[10px] font-semibold ${c.up ? "text-green-600" : "text-orange-500"}`}>
 {c.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
 <span>{c.trend.split(" ")[0]}</span>
 </div>
 </div>
 <h4 className="text-xl font-bold text-gray-900 dark:text-white">{c.value}</h4>
 <p className="text-[11px] text-gray-500 dark:text-[#a1a1aa] font-medium mt-0.5">{c.label}</p>
 <p className="text-[10px] text-gray-400 dark:text-[#737373] mt-1">{c.trend}</p>
 </div>
 ))}
 </div>

 {/* Attendance Chart + Work Hours */}
 <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-5">
 {/* Attendance Monthly */}
 <div className="bg-white dark:bg-[#111111] rounded-2xl p-5 border border-gray-100 dark:border-[#262626] shadow-sm">
 <div className="flex items-center gap-2 mb-4">
 <BarChart3 size={16} className="text-blue-600" />
 <h3 className="font-bold text-gray-900 dark:text-white">Monthly Attendance Breakdown</h3>
 </div>
 <ResponsiveContainer width="100%" height={260}>
 <BarChart data={attendanceMonthly} barGap={2} barSize={14}>
 <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
 <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
 <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
 <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb", fontSize: 12 }} labelStyle={{ color: '#111827', fontWeight: 'bold', marginBottom: '4px' }} />
 <Bar dataKey="Present" fill="#22c55e" radius={[3, 3, 0, 0]} />
 <Bar dataKey="Late" fill="#f97316" radius={[3, 3, 0, 0]} />
 <Bar dataKey="WFH" fill="#6366f1" radius={[3, 3, 0, 0]} />
 <Bar dataKey="Leave" fill="#a855f7" radius={[3, 3, 0, 0]} />
 <Bar dataKey="Absent" fill="#ef4444" radius={[3, 3, 0, 0]} />
 </BarChart>
 </ResponsiveContainer>
 </div>

 {/* Work Hours */}
 <div className="bg-white dark:bg-[#111111] rounded-2xl p-5 border border-gray-100 dark:border-[#262626] shadow-sm">
 <h3 className="font-bold text-gray-900 dark:text-white mb-1">Weekly Work Hours</h3>
 <p className="text-[11px] text-gray-400 dark:text-[#737373] mb-4">Average: 7h 48m / day</p>
 <ResponsiveContainer width="100%" height={220}>
 <LineChart data={workHoursWeekly} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
 <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
 <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
 <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} domain={[0, 10]} />
 <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb", fontSize: 12 }} labelStyle={{ color: '#111827', fontWeight: 'bold', marginBottom: '4px' }} />
 <Line type="monotone" dataKey="hours" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 4, fill: "#3b82f6" }} activeDot={{ r: 6 }} />
 </LineChart>
 </ResponsiveContainer>
 </div>
 </div>

 {/* Leave Usage + Salary Snapshot */}
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
 {/* Leave Pie */}
 <div className="bg-white dark:bg-[#111111] rounded-2xl p-5 border border-gray-100 dark:border-[#262626] shadow-sm">
 <h3 className="font-bold text-gray-900 dark:text-white mb-4">Leave Usage Breakdown</h3>
 <div className="flex flex-col sm:flex-row items-center gap-4">
 <ResponsiveContainer width={180} height={180}>
 <PieChart>
 <Pie data={leaveUsage} dataKey="value" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} strokeWidth={0}>
 {leaveUsage.map((entry) => (
 <Cell key={entry.name} fill={entry.color} />
 ))}
 </Pie>
 <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb", fontSize: 12 }} />
 </PieChart>
 </ResponsiveContainer>
 <div className="flex-1 space-y-2.5">
 {leaveUsage.map((l) => (
 <div key={l.name} className="flex items-center justify-between">
 <div className="flex items-center gap-2">
 <span className="w-3 h-3 rounded-full" style={{ backgroundColor: l.color }} />
 <span className="text-[12px] text-gray-600 dark:text-[#a1a1aa] font-medium">{l.name}</span>
 </div>
 <span className="text-[13px] font-bold text-gray-900 dark:text-white">{l.value} days</span>
 </div>
 ))}
 <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-[#262626]">
 <span className="text-[12px] font-semibold text-gray-800 dark:text-[#e2e8f0]">Total</span>
 <span className="text-[13px] font-bold text-gray-900 dark:text-white">17 days</span>
 </div>
 </div>
 </div>
 </div>

 {/* Salary Snapshot */}
 <div className="bg-white dark:bg-[#111111] rounded-2xl p-5 border border-gray-100 dark:border-[#262626] shadow-sm">
 <h3 className="font-bold text-gray-900 dark:text-white mb-4">Salary Snapshot</h3>
 <div className="grid grid-cols-2 gap-4 mb-4">
 <div className="p-3 rounded-xl bg-green-50 dark:bg-green-500/10/50 border border-green-100">
 <p className="text-[10px] text-gray-500 dark:text-[#a1a1aa] font-medium mb-0.5">Net Pay</p>
 <p className="text-lg font-bold text-green-600">₹68,500</p>
 </div>
 <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#111111] border border-gray-100 dark:border-[#262626]">
 <p className="text-[10px] text-gray-500 dark:text-[#a1a1aa] font-medium mb-0.5">Gross Pay</p>
 <p className="text-lg font-bold text-gray-900 dark:text-white">₹82,000</p>
 </div>
 <div className="p-3 rounded-xl bg-red-50 dark:bg-red-500/10/50 border border-red-100">
 <p className="text-[10px] text-gray-500 dark:text-[#a1a1aa] font-medium mb-0.5">Deductions</p>
 <p className="text-lg font-bold text-red-500">₹13,500</p>
 </div>
 <div className="p-3 rounded-xl bg-yellow-50 dark:bg-yellow-500/10/50 border border-yellow-100">
 <p className="text-[10px] text-gray-500 dark:text-[#a1a1aa] font-medium mb-0.5">Reimb. Pending</p>
 <p className="text-lg font-bold text-yellow-600">₹7,500</p>
 </div>
 </div>
 <p className="text-[11px] font-semibold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider mb-2">Net Pay Trend</p>
 <ResponsiveContainer width="100%" height={100}>
 <AreaChart data={netPayTrend}>
 <defs>
 <linearGradient id="payGrad" x1="0" y1="0" x2="0" y2="1">
 <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
 <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
 </linearGradient>
 </defs>
 <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
 <YAxis hide domain={[55000, 75000]} />
 <Area type="monotone" dataKey="pay" stroke="#3b82f6" strokeWidth={2} fill="url(#payGrad)" dot={{ r: 3, fill: "#3b82f6" }} />
 </AreaChart>
 </ResponsiveContainer>
 </div>
 </div>

 {/* Document Compliance + Smart Insights */}
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
 {/* Compliance */}
 <div className="bg-white dark:bg-[#111111] rounded-2xl p-5 border border-gray-100 dark:border-[#262626] shadow-sm">
 <h3 className="font-bold text-gray-900 dark:text-white mb-4">Document Compliance</h3>
 <div className="flex items-center gap-4 mb-4">
 <div className="relative w-20 h-20 shrink-0">
 <svg className="w-full h-full" viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)" }}>
 <circle cx="50" cy="50" r="40" stroke="#f3f4f6" strokeWidth="8" fill="none" />
 <circle cx="50" cy="50" r="40" stroke="#3b82f6" strokeWidth="8" fill="none" strokeDasharray="251.3" strokeDashoffset="22.6" strokeLinecap="round" />
 </svg>
 <div className="absolute inset-0 flex items-center justify-center">
 <span className="text-lg font-bold text-gray-900 dark:text-white">91%</span>
 </div>
 </div>
 <div className="flex-1 space-y-2">
 {[
 { label: "Documents Read", value: "32", color: "text-green-600" },
 { label: "Pending Ack.", value: "3", color: "text-yellow-600" },
 { label: "Recently Updated", value: "7", color: "text-blue-600" },
 ].map((s) => (
 <div key={s.label} className="flex items-center justify-between text-[12px]">
 <span className="text-gray-500 dark:text-[#a1a1aa]">{s.label}</span>
 <span className={`font-bold ${s.color}`}>{s.value}</span>
 </div>
 ))}
 </div>
 </div>
 <div className="h-2 bg-gray-100 dark:bg-[#111111] rounded-full overflow-hidden">
 <div className="h-full bg-blue-50 dark:bg-blue-500/100 rounded-full" style={{ width: "91%" }} />
 </div>
 <p className="text-[10px] text-gray-400 dark:text-[#737373] mt-1.5">Compliance score based on document reads and acknowledgements</p>
 </div>

 {/* Smart Insights */}
 <div className="bg-white dark:bg-[#111111] rounded-2xl p-5 border border-gray-100 dark:border-[#262626] shadow-sm">
 <div className="flex items-center gap-2 mb-4">
 <Zap size={16} className="text-purple-600" />
 <h3 className="font-bold text-gray-900 dark:text-white">Smart Insights</h3>
 </div>
 <div className="space-y-3">
 {insights.map((ins, i) => (
 <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-[#111111]/50 border border-gray-100 dark:border-[#262626] hover:bg-gray-50 dark:bg-[#111111] dark:hover:bg-[#181818] transition-colors">
 <div className={`w-8 h-8 rounded-lg ${ins.color} flex items-center justify-center shrink-0`}>
 <ins.icon size={14} />
 </div>
 <p className="text-[12px] text-gray-700 dark:text-[#cbd5e1] font-medium pt-1">{ins.text}</p>
 </div>
 ))}
 </div>
 </div>
 </div>

 {/* Recent Activity */}
 <div className="bg-white dark:bg-[#111111] rounded-2xl p-5 border border-gray-100 dark:border-[#262626] shadow-sm">
 <h3 className="font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
 <div className="space-y-0">
 {activity.map((a, i) => (
 <div key={i} className="flex items-start gap-3">
 <div className="flex flex-col items-center">
 <div className={`w-3 h-3 rounded-full ${a.dot} shrink-0 mt-1`} />
 {i < activity.length - 1 && <div className="w-0.5 h-8 bg-gray-200" />}
 </div>
 <div className="pb-2">
 <p className="text-[12px] font-medium text-gray-800 dark:text-[#e2e8f0]">{a.text}</p>
 <p className="text-[10px] text-gray-400 dark:text-[#737373]">{a.time}</p>
 </div>
 </div>
 ))}
 </div>
 </div>
 </div>
 );
}
