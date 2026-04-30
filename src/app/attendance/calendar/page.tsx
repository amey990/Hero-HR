"use client";

import { useState, useMemo } from "react";
import {
 ChevronLeft, ChevronRight, CalendarCheck, CalendarX, AlertTriangle,
 Calendar, Home, Clock, FileText
} from "lucide-react";

// --- Types ---
type Status = "P" | "A" | "L" | "La" | "H" | "W" | "WFH" | "HD";

interface DayData {
 date: number;
 status: Status;
 note?: string;
 clockIn?: string;
 clockOut?: string;
 hours?: string;
}

// --- Status config ---
const statusConfig: Record<Status, { label: string; letter: string; bg: string; text: string; cellBg: string }> = {
 P: { label: "Present", letter: "P", bg: "bg-green-100", text: "text-green-700", cellBg: "" },
 A: { label: "Absent", letter: "A", bg: "bg-red-100", text: "text-red-600", cellBg: "" },
 L: { label: "Leave", letter: "L", bg: "bg-purple-100", text: "text-purple-700", cellBg: "" },
 La: { label: "Late", letter: "La", bg: "bg-orange-100", text: "text-orange-700", cellBg: "" },
 H: { label: "Holiday", letter: "H", bg: "bg-blue-100 dark:bg-blue-500/10", text: "text-blue-700", cellBg: "" },
 W: { label: "Weekly Off", letter: "W", bg: "bg-gray-100 dark:bg-[#111111]", text: "text-gray-500 dark:text-[#a1a1aa]", cellBg: "bg-gray-50 dark:bg-[#111111]" },
 WFH: { label: "WFH", letter: "R", bg: "bg-indigo-100", text: "text-indigo-700", cellBg: "" },
 HD: { label: "Half Day", letter: "½", bg: "bg-yellow-100", text: "text-yellow-700", cellBg: "" },
};

// --- Generate mock data for any month ---
function generateMonthData(year: number, month: number): Record<number, DayData> {
 const daysInMonth = new Date(year, month + 1, 0).getDate();
 const data: Record<number, DayData> = {};

 for (let d = 1; d <= daysInMonth; d++) {
 const dayOfWeek = new Date(year, month, d).getDay();
 const now = new Date();
 const isCurrentMonth = year === now.getFullYear() && month === now.getMonth();
 const isFuture = isCurrentMonth && d > now.getDate();

 if (isFuture) continue; // no data for future dates

 if (dayOfWeek === 0 || dayOfWeek === 6) {
 data[d] = { date: d, status: "W", note: "Weekend" };
 } else {
 // Deterministic mock based on date
 const seed = (year * 400 + month * 31 + d) % 20;
 if (seed === 0) {
 data[d] = { date: d, status: "A", note: "No punch" };
 } else if (seed === 1) {
 data[d] = { date: d, status: "L", note: "Casual Leave", };
 } else if (seed === 2 || seed === 7) {
 data[d] = { date: d, status: "La", note: "Late arrival", clockIn: "10:15 AM", clockOut: "07:05 PM", hours: "7h 50m" };
 } else if (seed === 3) {
 data[d] = { date: d, status: "H", note: "Company Holiday" };
 } else if (seed === 5) {
 data[d] = { date: d, status: "WFH", note: "Remote", clockIn: "09:30 AM", clockOut: "06:00 PM", hours: "7h 30m" };
 } else if (seed === 9) {
 data[d] = { date: d, status: "HD", note: "Half Day", clockIn: "09:00 AM", clockOut: "01:00 PM", hours: "4h 00m" };
 } else {
 data[d] = { date: d, status: "P", clockIn: `09:0${d % 10} AM`, clockOut: `06:${20 + (d % 20)} PM`, hours: `8h ${15 + (d % 30)}m` };
 }
 }
 }
 return data;
}

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const legend: { letter: string; label: string; bg: string; text: string }[] = [
 { letter: "P", label: "Present", bg: "bg-green-100", text: "text-green-700" },
 { letter: "A", label: "Absent", bg: "bg-red-100", text: "text-red-600" },
 { letter: "La", label: "Late", bg: "bg-orange-100", text: "text-orange-700" },
 { letter: "L", label: "Leave", bg: "bg-purple-100", text: "text-purple-700" },
 { letter: "H", label: "Holiday", bg: "bg-blue-100 dark:bg-blue-500/10", text: "text-blue-700" },
 { letter: "W", label: "Weekly Off", bg: "bg-gray-100 dark:bg-[#111111]", text: "text-gray-500 dark:text-[#a1a1aa]" },
 { letter: "R", label: "WFH", bg: "bg-indigo-100", text: "text-indigo-700" },
 { letter: "½", label: "Half Day", bg: "bg-yellow-100", text: "text-yellow-700" },
];

export default function AttendanceCalendarPage() {
 const now = new Date();
 const [year, setYear] = useState(now.getFullYear());
 const [month, setMonth] = useState(now.getMonth());
 const [selectedDate, setSelectedDate] = useState<number | null>(now.getDate());

 const monthData = useMemo(() => generateMonthData(year, month), [year, month]);

 const daysInMonth = new Date(year, month + 1, 0).getDate();
 const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0=Sun

 const isCurrentMonth = year === now.getFullYear() && month === now.getMonth();

 // Build calendar grid cells
 const cells: (DayData | null)[] = [];
 for (let i = 0; i < firstDayOfWeek; i++) cells.push(null);
 for (let d = 1; d <= daysInMonth; d++) {
 cells.push(monthData[d] || { date: d, status: "P" as Status });
 }
 // Pad end
 while (cells.length % 7 !== 0) cells.push(null);

 const goToPrev = () => {
 if (month === 0) { setMonth(11); setYear(year - 1); }
 else setMonth(month - 1);
 setSelectedDate(null);
 };
 const goToNext = () => {
 if (month === 11) { setMonth(0); setYear(year + 1); }
 else setMonth(month + 1);
 setSelectedDate(null);
 };
 const goToToday = () => {
 setYear(now.getFullYear());
 setMonth(now.getMonth());
 setSelectedDate(now.getDate());
 };

 const selectedDay = selectedDate ? monthData[selectedDate] || null : null;

 // Count stats
 const stats = { P: 0, A: 0, La: 0, L: 0, H: 0, W: 0, WFH: 0, HD: 0 };
 Object.values(monthData).forEach((d) => { if (stats[d.status] !== undefined) stats[d.status]++; });

 return (
 <div className="space-y-6 pb-12">
 {/* Header */}
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
 <div>
 <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Attendance Calendar</h1>
 <p className="text-gray-500 dark:text-[#a1a1aa] mt-1 text-sm font-medium">View your present, absent, leave, holiday and weekly off records.</p>
 </div>
 <div className="flex items-center gap-2">
 <button onClick={goToPrev} className="w-9 h-9 rounded-xl border border-gray-200 dark:border-[#262626] flex items-center justify-center text-gray-600 dark:text-[#a1a1aa] hover:bg-gray-50 dark:bg-[#111111] dark:hover:bg-[#181818] transition-colors bg-white dark:bg-[#111111]">
 <ChevronLeft size={16} />
 </button>
 <span className="px-5 py-2 rounded-xl border border-gray-200 dark:border-[#262626] text-sm font-bold text-gray-800 dark:text-[#e2e8f0] bg-white dark:bg-[#111111] min-w-[160px] text-center select-none">
 {MONTH_NAMES[month]} {year}
 </span>
 <button onClick={goToNext} className="w-9 h-9 rounded-xl border border-gray-200 dark:border-[#262626] flex items-center justify-center text-gray-600 dark:text-[#a1a1aa] hover:bg-gray-50 dark:bg-[#111111] dark:hover:bg-[#181818] transition-colors bg-white dark:bg-[#111111]">
 <ChevronRight size={16} />
 </button>
 <button onClick={goToToday} className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors ml-1">
 Today
 </button>
 </div>
 </div>

 {/* Summary Cards */}
 <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
 {[
 { icon: CalendarCheck, label: "Present", value: stats.P, color: "bg-green-50 dark:bg-green-500/10 text-green-600" },
 { icon: CalendarX, label: "Absent", value: stats.A, color: "bg-red-50 dark:bg-red-500/10 text-red-600" },
 { icon: AlertTriangle, label: "Late", value: stats.La, color: "bg-orange-50 dark:bg-orange-500/10 text-orange-600" },
 { icon: Calendar, label: "Leave", value: stats.L, color: "bg-purple-50 dark:bg-purple-500/10 text-purple-600" },
 { icon: Calendar, label: "Holiday", value: stats.H, color: "bg-blue-50 dark:bg-blue-500/10 text-blue-600" },
 { icon: Home, label: "Weekly Off", value: stats.W, color: "bg-gray-50 dark:bg-[#111111] text-gray-600 dark:text-[#a1a1aa]" },
 ].map((c) => (
 <div key={c.label} className="bg-white dark:bg-[#111111] rounded-2xl p-4 border border-gray-100 dark:border-[#262626] shadow-sm transition-shadow group">
 <div className={`w-8 h-8 rounded-lg ${c.color} flex items-center justify-center mb-2 transition-transform`}>
 <c.icon size={16} strokeWidth={2.5} />
 </div>
 <p className="text-[10px] text-gray-500 dark:text-[#a1a1aa] font-medium">{c.label}</p>
 <h4 className="text-lg font-bold text-gray-900 dark:text-white">{c.value}</h4>
 </div>
 ))}
 </div>

 {/* Legend */}
 <div className="bg-white dark:bg-[#111111] rounded-2xl p-4 border border-gray-100 dark:border-[#262626] shadow-sm flex flex-wrap items-center gap-4">
 {legend.map((l) => (
 <div key={l.letter} className="flex items-center gap-1.5">
 <span className={`w-6 h-6 rounded-md ${l.bg} ${l.text} flex items-center justify-center text-[10px] font-bold`}>{l.letter}</span>
 <span className="text-[11px] font-medium text-gray-600 dark:text-[#a1a1aa]">{l.label}</span>
 </div>
 ))}
 </div>

 {/* Calendar + Detail */}
 <div className="flex flex-col lg:flex-row gap-5">
 {/* Calendar */}
 <div className="flex-1 bg-white dark:bg-[#111111] rounded-2xl border border-gray-200 dark:border-[#262626] shadow-sm overflow-hidden">
 {/* Day headers */}
 <div className="grid grid-cols-7 border-b-2 border-gray-200 dark:border-[#262626] bg-gray-50 dark:bg-[#111111]">
 {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
 <div key={d} className="py-3 text-center text-[11px] font-bold text-gray-600 dark:text-[#a1a1aa] uppercase tracking-wider border-r border-gray-200 dark:border-[#262626] last:border-r-0">{d}</div>
 ))}
 </div>
 {/* Cells */}
 <div className="grid grid-cols-7">
 {cells.map((day, i) => {
 if (!day) {
 return <div key={`e-${i}`} className="min-h-[90px] border-b border-r border-gray-200 dark:border-[#262626] last:border-r-0 bg-gray-50 dark:bg-[#111111]/30" />;
 }

 const isFuture = isCurrentMonth && day.date > now.getDate();
 const sc = isFuture ? null : statusConfig[day.status];
 const isToday = isCurrentMonth && day.date === now.getDate();
 const isSelected = day.date === selectedDate;

 return (
 <div
 key={day.date}
 onClick={() => !isFuture && setSelectedDate(day.date)}
 className={`min-h-[90px] p-2.5 border-b border-r border-gray-200 dark:border-[#262626] transition-all relative
 ${isFuture ? "bg-gray-50 dark:bg-[#111111] cursor-default" : `cursor-pointer hover:bg-gray-50 dark:hover:bg-[#181818] ${sc?.cellBg || ""}`}
 ${isSelected && !isFuture ? "ring-2 ring-blue-500 ring-inset z-10" : ""}
 `}
 >
 {/* Date number */}
 <div className="flex items-start justify-between mb-2">
 <span className={`text-[14px] font-bold ${isToday ? "w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center" : isFuture ? "text-gray-300" : "text-gray-800 dark:text-[#e2e8f0]"}`}>
 {day.date}
 </span>
 </div>

 {/* Status letter badge */}
 {sc && !isFuture && (
 <div className="flex justify-center">
 <span className={`w-8 h-8 rounded-lg ${sc.bg} ${sc.text} flex items-center justify-center text-[13px] font-bold`}>
 {sc.letter}
 </span>
 </div>
 )}

 {/* Note for special days */}
 {day.note && !isFuture && (day.status === "H" || day.status === "L") && (
 <p className="text-[8px] text-gray-400 dark:text-[#737373] text-center mt-1 truncate">{day.note}</p>
 )}
 </div>
 );
 })}
 </div>
 </div>

 {/* Selected Day Details */}
 <div className="lg:w-[300px] shrink-0">
 {selectedDay ? (
 <div className="bg-white dark:bg-[#111111] rounded-2xl border border-gray-100 dark:border-[#262626] shadow-sm p-5 sticky top-20">
 <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-100 dark:border-[#262626]">
 <div>
 <h3 className="font-bold text-gray-900 dark:text-white text-[15px]">{selectedDate} {MONTH_NAMES[month]} {year}</h3>
 <p className="text-[12px] text-gray-500 dark:text-[#a1a1aa] mt-0.5">
 {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][new Date(year, month, selectedDate!).getDay()]}
 </p>
 </div>
 {(() => {
 const sc = statusConfig[selectedDay.status];
 return (
 <span className={`text-[11px] font-bold px-3 py-1 rounded-lg ${sc.bg} ${sc.text}`}>
 {sc.label}
 </span>
 );
 })()}
 </div>
 <div className="space-y-4 mb-5">
 {[
 { icon: Clock, label: "Clock In", value: selectedDay.clockIn || "—" },
 { icon: Clock, label: "Clock Out", value: selectedDay.clockOut || "—" },
 { icon: Clock, label: "Total Hours", value: selectedDay.hours || "—" },
 ].map((item) => (
 <div key={item.label} className="flex items-center gap-3">
 <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-[#111111] flex items-center justify-center text-gray-400 dark:text-[#737373] shrink-0">
 <item.icon size={14} />
 </div>
 <div>
 <p className="text-[11px] text-gray-400 dark:text-[#737373] font-medium">{item.label}</p>
 <p className="text-[13px] font-semibold text-gray-800 dark:text-[#e2e8f0]">{item.value}</p>
 </div>
 </div>
 ))}
 {selectedDay.note && (
 <div className="text-[12px] text-gray-500 dark:text-[#a1a1aa] bg-gray-50 dark:bg-[#111111] rounded-lg p-2.5">{selectedDay.note}</div>
 )}
 </div>
 <div className="flex flex-col gap-2">
 <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 dark:border-[#262626] text-sm font-semibold text-gray-700 dark:text-[#cbd5e1] bg-white dark:bg-[#111111] hover:bg-gray-50 dark:bg-[#111111] dark:hover:bg-[#181818] transition-colors">
 <FileText size={14} /> Request Regularization
 </button>
 <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors">
 <Calendar size={14} /> Apply Leave
 </button>
 </div>
 </div>
 ) : (
 <div className="bg-white dark:bg-[#111111] rounded-2xl border border-gray-100 dark:border-[#262626] shadow-sm p-8 text-center text-gray-400 dark:text-[#737373] text-sm">
 Select a date to see details
 </div>
 )}
 </div>
 </div>
 </div>
 );
}
