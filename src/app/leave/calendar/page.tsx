"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, CalendarCheck, Clock, CalendarX, Calendar, FileText } from "lucide-react";

type LStatus = "approved" | "pending" | "rejected" | "holiday" | "weekoff" | "none";

interface DayInfo { date: number; status: LStatus; type?: string; note?: string; duration?: string; reason?: string; approvedBy?: string; comment?: string; }

const statusCfg: Record<LStatus, { label: string; letter: string; bg: string; text: string; cellBg: string }> = {
 approved: { label: "Approved Leave", letter: "A", bg: "bg-green-100", text: "text-green-700", cellBg: "bg-green-50 dark:bg-green-500/10/40" },
 pending: { label: "Pending Leave", letter: "P", bg: "bg-yellow-100", text: "text-yellow-700", cellBg: "bg-yellow-50 dark:bg-yellow-500/10/40" },
 rejected: { label: "Rejected", letter: "R", bg: "bg-red-100", text: "text-red-600", cellBg: "bg-red-50 dark:bg-red-500/10/30" },
 holiday: { label: "Holiday", letter: "H", bg: "bg-blue-100 dark:bg-blue-50 ", text: "text-blue-700", cellBg: "bg-blue-50 dark:bg-blue-500/10/40" },
 weekoff: { label: "Weekly Off", letter: "W", bg: "bg-gray-100 dark:bg-[#111111]", text: "text-gray-500 dark:text-[#a1a1aa]", cellBg: "bg-gray-50 dark:bg-[#111111]/40" },
 none: { label: "—", letter: "", bg: "", text: "", cellBg: "" },
};

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function genLeaveData(year: number, month: number): Record<number, DayInfo> {
 const days = new Date(year, month + 1, 0).getDate();
 const now = new Date();
 const isCurr = year === now.getFullYear() && month === now.getMonth();
 const data: Record<number, DayInfo> = {};
 for (let d = 1; d <= days; d++) {
 const dow = new Date(year, month, d).getDay();
 if (isCurr && d > now.getDate()) continue;
 if (dow === 0 || dow === 6) { data[d] = { date: d, status: "weekoff", note: "Weekend" }; continue; }
 const seed = (year * 400 + month * 31 + d) % 30;
 if (seed === 3) data[d] = { date: d, status: "holiday", type: "Company Holiday", note: "Public Holiday" };
 else if (seed === 5 || seed === 6) data[d] = { date: d, status: "approved", type: "Casual Leave", duration: "Full Day", reason: "Personal work", approvedBy: "Sunita Verma", comment: "Approved" };
 else if (seed === 10) data[d] = { date: d, status: "pending", type: "Earned Leave", duration: "Full Day", reason: "Family event" };
 else if (seed === 15) data[d] = { date: d, status: "rejected", type: "Sick Leave", duration: "Full Day", reason: "Not feeling well", approvedBy: "Sunita Verma", comment: "Insufficient balance" };
 else data[d] = { date: d, status: "none" };
 }
 return data;
}

const upcoming = [
 { type: "Casual Leave", dates: "5 May - 6 May 2026", days: "2 days", status: "Approved" },
 { type: "Earned Leave", dates: "20 - 23 May 2026", days: "4 days", status: "Pending" },
 { type: "Sick Leave", dates: "10 Jun 2026", days: "1 day", status: "Approved" },
];

export default function LeaveCalendarPage() {
 const now = new Date();
 const [year, setYear] = useState(now.getFullYear());
 const [month, setMonth] = useState(now.getMonth());
 const [selDate, setSelDate] = useState<number | null>(null);

 const data = useMemo(() => genLeaveData(year, month), [year, month]);
 const daysInMonth = new Date(year, month + 1, 0).getDate();
 const firstDow = new Date(year, month, 1).getDay();
 const isCurr = year === now.getFullYear() && month === now.getMonth();

 const cells: (DayInfo | null)[] = [];
 for (let i = 0; i < firstDow; i++) cells.push(null);
 for (let d = 1; d <= daysInMonth; d++) cells.push(data[d] || { date: d, status: "none" });
 while (cells.length % 7 !== 0) cells.push(null);

 const prev = () => { if (month === 0) { setMonth(11); setYear(year - 1); } else setMonth(month - 1); setSelDate(null); };
 const next = () => { if (month === 11) { setMonth(0); setYear(year + 1); } else setMonth(month + 1); setSelDate(null); };

 const stats = { approved: 0, pending: 0, rejected: 0, holiday: 0 };
 Object.values(data).forEach((d) => { if (d.status in stats) (stats as any)[d.status]++; });

 const sel = selDate ? data[selDate] || null : null;

 return (
 <div className="space-y-6 pb-12">
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
 <div>
 <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Leave Calendar</h1>
 <p className="text-gray-500 dark:text-[#a1a1aa] mt-1 text-sm font-medium">View your approved, pending and rejected leave dates.</p>
 </div>
 <div className="flex items-center gap-2">
 <button onClick={prev} className="w-9 h-9 rounded-xl border border-gray-200 dark:border-[#262626] flex items-center justify-center text-gray-600 dark:text-[#a1a1aa] hover:bg-gray-50 dark:bg-[#111111] dark:hover:bg-[#181818] bg-white dark:bg-[#111111]"><ChevronLeft size={16} /></button>
 <span className="px-5 py-2 rounded-xl border border-gray-200 dark:border-[#262626] text-sm font-bold text-gray-800 dark:text-[#e2e8f0] bg-white dark:bg-[#111111] min-w-[160px] text-center">{MONTHS[month]} {year}</span>
 <button onClick={next} className="w-9 h-9 rounded-xl border border-gray-200 dark:border-[#262626] flex items-center justify-center text-gray-600 dark:text-[#a1a1aa] hover:bg-gray-50 dark:bg-[#111111] dark:hover:bg-[#181818] bg-white dark:bg-[#111111]"><ChevronRight size={16} /></button>
 <button onClick={() => { setYear(now.getFullYear()); setMonth(now.getMonth()); setSelDate(now.getDate()); }} className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 ml-1">Today</button>
 </div>
 </div>

 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
 {[
 { icon: CalendarCheck, label: "Approved", value: stats.approved, color: "bg-green-50 dark:bg-green-500/10 text-green-600" },
 { icon: Clock, label: "Pending", value: stats.pending, color: "bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600" },
 { icon: CalendarX, label: "Rejected", value: stats.rejected, color: "bg-red-50 dark:bg-red-500/10 text-red-600" },
 { icon: Calendar, label: "Holidays", value: stats.holiday, color: "bg-blue-50 dark:bg-blue-500/10 text-blue-600" },
 ].map((c) => (
 <div key={c.label} className="bg-white dark:bg-[#111111] rounded-2xl p-4 border border-gray-100 dark:border-[#262626] shadow-sm transition-shadow group">
 <div className={`w-8 h-8 rounded-lg ${c.color} flex items-center justify-center mb-2 transition-transform`}><c.icon size={16} strokeWidth={2.5} /></div>
 <p className="text-[10px] text-gray-500 dark:text-[#a1a1aa] font-medium">{c.label}</p>
 <h4 className="text-lg font-bold text-gray-900 dark:text-white">{c.value}</h4>
 </div>
 ))}
 </div>

 <div className="bg-white dark:bg-[#111111] rounded-2xl p-4 border border-gray-100 dark:border-[#262626] shadow-sm flex flex-wrap items-center gap-4">
 {([["approved","Approved Leave"],["pending","Pending Leave"],["rejected","Rejected"],["holiday","Holiday"],["weekoff","Weekly Off"]] as [LStatus,string][]).map(([k,l]) => (
 <div key={k} className="flex items-center gap-1.5">
 <span className={`w-6 h-6 rounded-md ${statusCfg[k].bg} ${statusCfg[k].text} flex items-center justify-center text-[10px] font-bold`}>{statusCfg[k].letter}</span>
 <span className="text-[11px] font-medium text-gray-600 dark:text-[#a1a1aa]">{l}</span>
 </div>
 ))}
 </div>

 <div className="flex flex-col lg:flex-row gap-5">
 <div className="flex-1 bg-white dark:bg-[#111111] rounded-2xl border border-gray-200 dark:border-[#262626] shadow-sm overflow-hidden">
 <div className="grid grid-cols-7 border-b-2 border-gray-200 dark:border-[#262626] bg-gray-50 dark:bg-[#111111]">
 {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
 <div key={d} className="py-3 text-center text-[11px] font-bold text-gray-600 dark:text-[#a1a1aa] uppercase tracking-wider border-r border-gray-200 dark:border-[#262626] last:border-r-0">{d}</div>
 ))}
 </div>
 <div className="grid grid-cols-7">
 {cells.map((day, i) => {
 if (!day) return <div key={`e-${i}`} className="min-h-[90px] border-b border-r border-gray-200 dark:border-[#262626] bg-gray-50 dark:bg-[#111111]/30" />;
 const isFuture = isCurr && day.date > now.getDate();
 const sc = day.status !== "none" && !isFuture ? statusCfg[day.status] : null;
 const isToday = isCurr && day.date === now.getDate();
 const isSel = day.date === selDate;
 return (
 <div key={day.date} onClick={() => !isFuture && setSelDate(day.date)}
 className={`min-h-[90px] p-2.5 border-b border-r border-gray-200 dark:border-[#262626] transition-all ${isFuture ? "bg-gray-50 dark:bg-[#111111]/30 cursor-default" : `cursor-pointer hover:bg-gray-50 dark:hover:bg-[#181818]/40 ${sc?.cellBg || ""}`} ${isSel && !isFuture ? "ring-2 ring-blue-500 ring-inset z-10" : ""}`}>
 <div className="flex items-start justify-between mb-2">
 <span className={`text-[14px] font-bold ${isToday ? "w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center" : isFuture ? "text-gray-300" : "text-gray-800 dark:text-[#e2e8f0]"}`}>{day.date}</span>
 </div>
 {sc && !isFuture && (
 <div className="flex justify-center">
 <span className={`w-8 h-8 rounded-lg ${sc.bg} ${sc.text} flex items-center justify-center text-[13px] font-bold`}>{sc.letter}</span>
 </div>
 )}
 {day.type && !isFuture && <p className="text-[8px] text-gray-400 dark:text-[#737373] text-center mt-1 truncate">{day.type}</p>}
 </div>
 );
 })}
 </div>
 </div>

 <div className="lg:w-[300px] shrink-0 space-y-5">
 {sel && sel.status !== "none" ? (
 <div className="bg-white dark:bg-[#111111] rounded-2xl border border-gray-100 dark:border-[#262626] shadow-sm p-5">
 <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100 dark:border-[#262626]">
 <div>
 <h3 className="font-bold text-gray-900 dark:text-white text-[15px]">{selDate} {MONTHS[month]} {year}</h3>
 <p className="text-[12px] text-gray-500 dark:text-[#a1a1aa] mt-0.5">{["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][new Date(year, month, selDate!).getDay()]}</p>
 </div>
 <span className={`text-[11px] font-bold px-3 py-1 rounded-lg ${statusCfg[sel.status].bg} ${statusCfg[sel.status].text}`}>{statusCfg[sel.status].label}</span>
 </div>
 <div className="space-y-3 mb-4">
 {sel.type && <div className="flex justify-between text-[12px]"><span className="text-gray-500 dark:text-[#a1a1aa]">Leave Type</span><span className="font-semibold text-gray-800 dark:text-[#e2e8f0]">{sel.type}</span></div>}
 {sel.duration && <div className="flex justify-between text-[12px]"><span className="text-gray-500 dark:text-[#a1a1aa]">Duration</span><span className="font-semibold text-gray-800 dark:text-[#e2e8f0]">{sel.duration}</span></div>}
 {sel.reason && <div className="flex justify-between text-[12px]"><span className="text-gray-500 dark:text-[#a1a1aa]">Reason</span><span className="font-semibold text-gray-800 dark:text-[#e2e8f0]">{sel.reason}</span></div>}
 {sel.approvedBy && <div className="flex justify-between text-[12px]"><span className="text-gray-500 dark:text-[#a1a1aa]">Approved By</span><span className="font-semibold text-gray-800 dark:text-[#e2e8f0]">{sel.approvedBy}</span></div>}
 {sel.comment && <div className="flex justify-between text-[12px]"><span className="text-gray-500 dark:text-[#a1a1aa]">Comment</span><span className="font-semibold text-gray-800 dark:text-[#e2e8f0]">{sel.comment}</span></div>}
 {sel.note && <div className="text-[12px] text-gray-500 dark:text-[#a1a1aa] bg-gray-50 dark:bg-[#111111] rounded-lg p-2.5">{sel.note}</div>}
 </div>
 <div className="flex flex-col gap-2">
 <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 dark:border-[#262626] text-sm font-semibold text-gray-700 dark:text-[#cbd5e1] bg-white dark:bg-[#111111] hover:bg-gray-50 dark:bg-[#111111] dark:hover:bg-[#181818]"><FileText size={14} /> Request Regularization</button>
 <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700"><Calendar size={14} /> Apply Leave</button>
 </div>
 </div>
 ) : (
 <div className="bg-white dark:bg-[#111111] rounded-2xl border border-gray-100 dark:border-[#262626] shadow-sm p-8 text-center text-gray-400 dark:text-[#737373] text-sm">Select a date to see details</div>
 )}

 <div className="bg-white dark:bg-[#111111] rounded-2xl p-5 border border-gray-100 dark:border-[#262626] shadow-sm">
 <h4 className="font-bold text-gray-900 dark:text-white text-[13px] mb-3">Upcoming Leaves</h4>
 <div className="space-y-2.5">
 {upcoming.map((u, i) => (
 <div key={i} className="flex items-start justify-between p-2.5 rounded-lg bg-gray-50 dark:bg-[#111111]/50 border border-gray-100 dark:border-[#262626]">
 <div><p className="text-[12px] font-semibold text-gray-800 dark:text-[#e2e8f0]">{u.type}</p><p className="text-[10px] text-gray-500 dark:text-[#a1a1aa]">{u.dates} · {u.days}</p></div>
 <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full border ${u.status === "Approved" ? "bg-green-50 dark:bg-green-500/10 text-green-700 border-green-200 dark:border-green-500/30" : "bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 border-yellow-200 dark:border-yellow-500/30"}`}>{u.status}</span>
 </div>
 ))}
 </div>
 </div>
 </div>
 </div>
 </div>
 );
}
