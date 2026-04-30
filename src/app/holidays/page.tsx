"use client";

import { Calendar, MapPin, Clock, Gift, ChevronDown } from "lucide-react";

const holidays = [
 { date: "26 Jan 2026", day: "Monday", name: "Republic Day", type: "Public", location: "All", desc: "National holiday" },
 { date: "14 Mar 2026", day: "Saturday", name: "Holi", type: "Public", location: "All", desc: "Festival of colors" },
 { date: "2 Apr 2026", day: "Thursday", name: "Ram Navami", type: "Regional", location: "North India", desc: "Hindu festival" },
 { date: "14 Apr 2026", day: "Tuesday", name: "Ambedkar Jayanti", type: "Public", location: "All", desc: "National holiday" },
 { date: "1 May 2026", day: "Friday", name: "Labour Day", type: "Public", location: "All", desc: "International Workers Day" },
 { date: "15 Aug 2026", day: "Saturday", name: "Independence Day", type: "Public", location: "All", desc: "National holiday" },
 { date: "2 Oct 2026", day: "Friday", name: "Gandhi Jayanti", type: "Public", location: "All", desc: "National holiday" },
 { date: "15 Oct 2026", day: "Thursday", name: "Dussehra", type: "Company", location: "All", desc: "Festival holiday" },
 { date: "4 Nov 2026", day: "Wednesday", name: "Diwali", type: "Company", location: "All", desc: "Festival of lights" },
 { date: "5 Nov 2026", day: "Thursday", name: "Diwali Holiday", type: "Company", location: "All", desc: "Day after Diwali" },
 { date: "25 Dec 2026", day: "Friday", name: "Christmas", type: "Optional", location: "All", desc: "Festival holiday" },
 { date: "31 Dec 2026", day: "Thursday", name: "New Year Eve", type: "Optional", location: "All", desc: "Company discretion" },
 { date: "12 Jan 2026", day: "Monday", name: "Makar Sankranti", type: "Optional", location: "West/South India", desc: "Harvest festival" },
 { date: "10 Mar 2026", day: "Tuesday", name: "Maha Shivaratri", type: "Optional", location: "All", desc: "Hindu festival" },
 { date: "13 Nov 2026", day: "Friday", name: "Chhath Puja", type: "Regional", location: "Bihar/UP", desc: "Regional festival" },
 { date: "19 Nov 2026", day: "Thursday", name: "Guru Nanak Jayanti", type: "Regional", location: "Punjab", desc: "Sikh festival" },
];

const typeStyle: Record<string, string> = {
 Public: "bg-blue-50 dark:bg-blue-500/10 text-blue-700 border-blue-200 dark:border-blue-500/30",
 Company: "bg-green-50 dark:bg-green-500/10 text-green-700 border-green-200 dark:border-green-500/30",
 Optional: "bg-purple-50 dark:bg-purple-500/10 text-purple-700 border-purple-200 dark:border-purple-500/30",
 Regional: "bg-orange-50 dark:bg-orange-500/10 text-orange-700 border-orange-200 dark:border-orange-500/30",
};

const typeCounts = { Public: 6, Company: 3, Optional: 4, Regional: 3 };

export default function HolidaysPage() {
 const nextHoliday = holidays.find((h) => new Date(h.date) > new Date()) || holidays[4];

 return (
 <div className="space-y-6 pb-12">
 {/* Header */}
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
 <div>
 <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Holiday Calendar</h1>
 <p className="text-gray-500 dark:text-[#a1a1aa] mt-1 text-sm font-medium">View company holidays, optional holidays and regional holidays.</p>
 </div>
 <div className="flex items-center gap-3">
 <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#262626] text-sm font-medium text-gray-700 dark:text-[#cbd5e1] bg-white dark:bg-[#111111] hover:bg-gray-50 dark:bg-[#111111] dark:hover:bg-[#181818]">
 2026 <ChevronDown size={14} />
 </button>
 <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#262626] text-sm font-medium text-gray-700 dark:text-[#cbd5e1] bg-white dark:bg-[#111111] hover:bg-gray-50 dark:bg-[#111111] dark:hover:bg-[#181818]">
 All Locations <ChevronDown size={14} />
 </button>
 </div>
 </div>

 {/* Summary Cards */}
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
 {[
 { icon: Calendar, label: "Total Holidays", value: "16", color: "bg-blue-50 dark:bg-blue-500/10 text-blue-600" },
 { icon: Clock, label: "Upcoming", value: "5", color: "bg-green-50 dark:bg-green-500/10 text-green-600" },
 { icon: Gift, label: "Optional", value: "4", color: "bg-purple-50 dark:bg-purple-500/10 text-purple-600" },
 { icon: MapPin, label: "Regional", value: "3", color: "bg-orange-50 dark:bg-orange-500/10 text-orange-600" },
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

 {/* Next Holiday + Legend */}
 <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5">
 {/* Next Holiday */}
 <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-sm">
 <p className="text-[11px] font-medium text-blue-200 uppercase tracking-wider mb-1">Next Holiday</p>
 <h3 className="text-xl font-bold mb-1">{nextHoliday.name}</h3>
 <p className="text-blue-100 text-sm mb-3">{nextHoliday.day}, {nextHoliday.date}</p>
 <div className="flex items-center gap-4 text-[12px] text-blue-100">
 <span className="bg-white dark:bg-[#111111]/20 px-3 py-1 rounded-full font-medium">{nextHoliday.type} Holiday</span>
 <span>📅 2 days remaining</span>
 </div>
 </div>

 {/* Legend */}
 <div className="bg-white dark:bg-[#111111] rounded-2xl p-5 border border-gray-100 dark:border-[#262626] shadow-sm">
 <h4 className="font-bold text-gray-900 dark:text-white text-[13px] mb-3">Holiday Types</h4>
 <div className="space-y-2.5">
 {Object.entries(typeCounts).map(([type, count]) => (
 <div key={type} className="flex items-center justify-between">
 <div className="flex items-center gap-2">
 <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${typeStyle[type]}`}>{type}</span>
 </div>
 <span className="text-[13px] font-bold text-gray-800 dark:text-[#e2e8f0]">{count}</span>
 </div>
 ))}
 </div>
 </div>
 </div>

 {/* Holiday Table */}
 <div className="bg-white dark:bg-[#111111] rounded-2xl border border-gray-100 dark:border-[#262626] shadow-sm overflow-hidden">
 <div className="p-5 border-b border-gray-100 dark:border-[#262626]">
 <h3 className="font-bold text-gray-900 dark:text-white">All Holidays — 2026</h3>
 </div>
 <div className="overflow-x-auto">
 <table className="w-full text-left border-collapse min-w-[700px]">
 <thead>
 <tr className="bg-gray-50 dark:bg-[#111111]/80 border-b border-gray-100 dark:border-[#262626]">
 {["Date", "Day", "Holiday Name", "Type", "Location", "Description"].map((h) => (
 <th key={h} className="py-3 px-4 text-[11px] font-semibold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider">{h}</th>
 ))}
 </tr>
 </thead>
 <tbody className="divide-y divide-gray-50 dark:divide-[#262626]">
 {holidays.map((h, i) => (
 <tr key={i} className="hover:bg-gray-50 dark:hover:bg-[#181818] transition-colors">
 <td className="py-3.5 px-4 text-[13px] font-semibold text-gray-900 dark:text-white">{h.date}</td>
 <td className="py-3.5 px-4 text-[13px] text-gray-600 dark:text-[#a1a1aa]">{h.day}</td>
 <td className="py-3.5 px-4 text-[13px] font-medium text-gray-900 dark:text-white">{h.name}</td>
 <td className="py-3.5 px-4"><span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${typeStyle[h.type]}`}>{h.type}</span></td>
 <td className="py-3.5 px-4 text-[12px] text-gray-500 dark:text-[#a1a1aa]">{h.location}</td>
 <td className="py-3.5 px-4 text-[12px] text-gray-500 dark:text-[#a1a1aa]">{h.desc}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 </div>
 );
}
