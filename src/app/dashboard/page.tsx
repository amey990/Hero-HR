"use client";

import { 
 Clock, LogIn, LogOut, CheckCircle2, Fingerprint, CheckCircle, ChevronDown
} from "lucide-react";

export default function DashboardPage() {
 return (
 <div className="space-y-6 pb-12">
 {/* SECTION 1: Header */}
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
 <div>
 <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
 Good afternoon, Amey!
 </h1>
 <p className="text-gray-500 dark:text-[#a1a1aa] mt-1 text-sm font-medium">
 You have 2 leave request pending.
 </p>
 </div>
 <div className="bg-white dark:bg-[#111111] rounded-2xl px-5 py-3 border border-gray-100 dark:border-[#262626] shadow-sm flex items-center gap-4">
 <div>
 <p className="text-[11px] font-medium text-gray-400 dark:text-[#737373] uppercase tracking-wider">Current time</p>
 <p className="text-sm font-bold text-gray-800 dark:text-[#e2e8f0]">26 Sept 2023, 12:10 PM</p>
 </div>
 <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600">
 <Clock size={20} strokeWidth={2.5} />
 </div>
 </div>
 </div>

 {/* SECTION 2: Top Cards - 4 col grid, row1+row2 */}
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[3fr_2fr_2fr_3fr] grid-rows-[auto_auto] gap-5">

 {/* Today Card - col1, spans 2 rows, HORIZONTAL layout */}
 <div className="lg:row-span-2 bg-white dark:bg-[#111111] rounded-2xl p-5 border border-gray-100 dark:border-[#262626] shadow-sm transition-shadow">
 <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100 dark:border-[#262626]">
 <h3 className="font-bold text-gray-900 dark:text-white">Today</h3>
 <span className="bg-red-50 dark:bg-red-500/100 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">Absent</span>
 </div>
 {/* Horizontal: text left, circle right */}
 <div className="flex items-center gap-4 mb-4">
 <div className="flex-1">
 <div className="w-9 h-9 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-500 mb-3">
 <Fingerprint size={18} strokeWidth={2} />
 </div>
 <p className="text-[13px] text-gray-600 dark:text-[#a1a1aa] font-medium leading-snug mb-3">
 You have not marked yourself as present today!
 </p>
 <div className="flex items-center gap-2 border-l-2 border-red-500 pl-3">
 <span className="text-[13px] text-gray-500 dark:text-[#a1a1aa]">Time left :</span>
 <span className="text-[13px] font-bold text-red-500">56m 44s</span>
 </div>
 </div>
 <div className="relative w-28 h-28 shrink-0">
 <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
 <circle cx="50" cy="50" r="40" className="stroke-gray-100" strokeWidth="8" fill="none" />
 <circle cx="50" cy="50" r="40" className="stroke-yellow-400" strokeWidth="8" fill="none" strokeDasharray="251.2" strokeDashoffset="82.89" strokeLinecap="round" />
 </svg>
 <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
 <span className="text-lg font-bold text-gray-800 dark:text-[#e2e8f0]">67%</span>
 <span className="text-[9px] text-gray-400 dark:text-[#737373] font-medium uppercase">in office</span>
 <span className="text-[9px] text-yellow-500 font-bold uppercase">Poor</span>
 </div>
 </div>
 </div>
 <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all text-sm">
 Mark Present
 </button>
 </div>

 {/* Average Hours - col2, row1 */}
 <div className="bg-white dark:bg-[#111111] rounded-2xl p-5 border border-gray-100 dark:border-[#262626] shadow-sm transition-shadow group">
 <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-500 mb-3 transition-transform">
 <Clock size={20} strokeWidth={2.5} />
 </div>
 <p className="text-[13px] text-gray-500 dark:text-[#a1a1aa] font-medium mb-0.5">Average hours</p>
 <h4 className="text-xl font-bold text-gray-900 dark:text-white">7h 17mins</h4>
 </div>

 {/* Average Check-in - col3, row1 */}
 <div className="bg-white dark:bg-[#111111] rounded-2xl p-5 border border-gray-100 dark:border-[#262626] shadow-sm transition-shadow group">
 <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500 mb-3 transition-transform">
 <LogIn size={20} strokeWidth={2.5} />
 </div>
 <p className="text-[13px] text-gray-500 dark:text-[#a1a1aa] font-medium mb-0.5">Average check-in</p>
 <h4 className="text-xl font-bold text-gray-900 dark:text-white">10:33 AM</h4>
 </div>

 {/* My Attendance - col4, spans 2 rows, HORIZONTAL layout */}
 <div className="lg:row-span-2 bg-white dark:bg-[#111111] rounded-2xl p-5 border border-gray-100 dark:border-[#262626] shadow-sm transition-shadow flex flex-col">
 <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100 dark:border-[#262626]">
 <h3 className="font-bold text-gray-900 dark:text-white">My Attendance</h3>
 <button className="text-[13px] text-blue-600 font-semibold hover:text-blue-700 transition-colors">View Stats</button>
 </div>
 {/* Horizontal: stats left, donut right */}
 <div className="flex items-center gap-4 flex-1">
 <div className="flex-1 space-y-3">
 <div className="flex items-center gap-2.5">
 <span className="w-2 h-2 rounded-full bg-green-50 dark:bg-green-500/100 shrink-0" />
 <span className="text-[13px] font-bold text-gray-900 dark:text-white w-10">1,031</span>
 <span className="text-[13px] text-gray-500 dark:text-[#a1a1aa]">on time</span>
 </div>
 <div className="flex items-center gap-2.5">
 <span className="w-2 h-2 rounded-full bg-yellow-400 shrink-0" />
 <span className="text-[13px] font-bold text-gray-900 dark:text-white w-10">191</span>
 <span className="text-[13px] text-gray-500 dark:text-[#a1a1aa]">work from home</span>
 </div>
 <div className="flex items-center gap-2.5">
 <span className="w-2 h-2 rounded-full bg-red-50 dark:bg-red-500/100 shrink-0" />
 <span className="text-[13px] font-bold text-gray-900 dark:text-white w-10">212</span>
 <span className="text-[13px] text-gray-500 dark:text-[#a1a1aa]">late attendance</span>
 </div>
 <div className="flex items-center gap-2.5">
 <span className="w-2 h-2 rounded-full bg-gray-400 shrink-0" />
 <span className="text-[13px] font-bold text-gray-900 dark:text-white w-10">66</span>
 <span className="text-[13px] text-gray-500 dark:text-[#a1a1aa]">absent</span>
 </div>
 </div>
 <div className="relative w-32 h-32 shrink-0">
 <svg viewBox="0 0 100 100" className="w-full h-full" style={{ transform: 'rotate(-90deg)' }}>
 {/* Background track */}
 <circle cx="50" cy="50" r="40" stroke="#f3f4f6" strokeWidth="10" fill="none" />
 {/* Green segment: 1031/1500 = 68.7% of 251.2 = 172.6 */}
 <circle cx="50" cy="50" r="40" stroke="#22c55e" strokeWidth="10" fill="none"
 strokeDasharray="172.6 78.6" strokeDashoffset="0" />
 {/* Yellow segment: 191/1500 = 12.7% of 251.2 = 31.9 */}
 <circle cx="50" cy="50" r="40" stroke="#facc15" strokeWidth="10" fill="none"
 strokeDasharray="31.9 219.3" strokeDashoffset="-172.6" />
 {/* Red segment: 212/1500 = 14.1% of 251.2 = 35.4 */}
 <circle cx="50" cy="50" r="40" stroke="#ef4444" strokeWidth="10" fill="none"
 strokeDasharray="35.4 215.8" strokeDashoffset="-204.5" />
 {/* Gray segment: 66/1500 = 4.4% of 251.2 = 11.1 */}
 <circle cx="50" cy="50" r="40" stroke="#9ca3af" strokeWidth="10" fill="none"
 strokeDasharray="11.1 240.1" strokeDashoffset="-239.9" />
 </svg>
 <div className="absolute inset-0 flex flex-col items-center justify-center">
 <span className="text-lg font-bold text-gray-900 dark:text-white">1,434</span>
 <span className="text-[10px] font-medium text-gray-400 dark:text-[#737373]">/1500</span>
 </div>
 </div>
 </div>
 <div className="mt-4 bg-green-50 dark:bg-green-500/10 rounded-xl p-2.5 flex items-center gap-2 border border-green-100">
 <CheckCircle2 size={16} className="text-green-600 shrink-0" />
 <p className="text-[13px] font-medium text-green-800">Better than <span className="font-bold">91.3%</span> employees!</p>
 </div>
 </div>

 {/* On-time Arrival - col2, row2 */}
 <div className="bg-white dark:bg-[#111111] rounded-2xl p-5 border border-gray-100 dark:border-[#262626] shadow-sm transition-shadow group">
 <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-500/10 flex items-center justify-center text-green-500 mb-3 transition-transform">
 <CheckCircle size={20} strokeWidth={2.5} />
 </div>
 <p className="text-[13px] text-gray-500 dark:text-[#a1a1aa] font-medium mb-0.5">On-time arrival</p>
 <h4 className="text-xl font-bold text-green-600">98.56 %</h4>
 </div>

 {/* Average Check-out - col3, row2 */}
 <div className="bg-white dark:bg-[#111111] rounded-2xl p-5 border border-gray-100 dark:border-[#262626] shadow-sm transition-shadow group">
 <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center text-orange-500 mb-3 transition-transform">
 <LogOut size={20} strokeWidth={2.5} />
 </div>
 <p className="text-[13px] text-gray-500 dark:text-[#a1a1aa] font-medium mb-0.5">Average check-out</p>
 <h4 className="text-xl font-bold text-gray-900 dark:text-white">19:12 PM</h4>
 </div>
 </div>

 {/* SECTION 3: Bottom Tables */}
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
 {/* My Team */}
 <div className="bg-white dark:bg-[#111111] rounded-2xl p-5 border border-gray-100 dark:border-[#262626] shadow-sm transition-shadow">
 <h3 className="font-bold text-gray-900 dark:text-white mb-3">My Team</h3>
 <div className="flex flex-wrap items-center gap-3 mb-4">
 <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-50 dark:bg-blue-500/100" /><span className="text-[10px] font-medium text-gray-500 dark:text-[#a1a1aa] uppercase">in office</span></div>
 <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-yellow-400" /><span className="text-[10px] font-medium text-gray-500 dark:text-[#a1a1aa] uppercase">work from home</span></div>
 <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-50 dark:bg-red-500/100" /><span className="text-[10px] font-medium text-gray-500 dark:text-[#a1a1aa] uppercase">on leave</span></div>
 <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-gray-600" /><span className="text-[10px] font-medium text-gray-500 dark:text-[#a1a1aa] uppercase">absent</span></div>
 <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-gray-300" /><span className="text-[10px] font-medium text-gray-500 dark:text-[#a1a1aa] uppercase">holiday</span></div>
 </div>
 <div className="overflow-x-auto">
 <table className="w-full text-left border-collapse min-w-[480px]">
 <thead>
 <tr className="bg-gray-50 dark:bg-[#111111] border-b border-gray-100 dark:border-[#262626]">
 <th className="py-2.5 px-3 text-[11px] font-semibold text-gray-500 dark:text-[#a1a1aa] rounded-l-lg">Members</th>
 <th className="py-2.5 px-3 text-[11px] font-semibold text-gray-500 dark:text-[#a1a1aa]">Today</th>
 <th className="py-2.5 px-3 text-[11px] font-semibold text-gray-500 dark:text-[#a1a1aa]">25/9</th>
 <th className="py-2.5 px-3 text-[11px] font-semibold text-gray-500 dark:text-[#a1a1aa]">24/9</th>
 <th className="py-2.5 px-3 text-[11px] font-semibold text-gray-500 dark:text-[#a1a1aa] rounded-r-lg">23/9</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-gray-50 dark:divide-[#262626]">
 <tr className="hover:bg-gray-50 dark:bg-[#111111] dark:hover:bg-[#181818]/50 transition-colors">
 <td className="py-3 px-3">
 <div className="flex items-center gap-2.5">
 <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-[10px] shrink-0">AG</div>
 <div><p className="text-[13px] font-semibold text-gray-900 dark:text-white">Alena Gouse</p><p className="text-[10px] text-gray-500 dark:text-[#a1a1aa]">UI Designer - UID1</p></div>
 </div>
 </td>
 <td className="py-3 px-3"><div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-50 dark:bg-blue-500/100" /><span className="text-[11px] font-medium text-blue-600">11:56 AM</span></div></td>
 <td className="py-3 px-3"><div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-50 dark:bg-blue-500/100" /><span className="text-[11px] font-medium text-gray-600 dark:text-[#a1a1aa]">12:45 AM</span></div></td>
 <td className="py-3 px-3"><div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-50 dark:bg-blue-500/100" /><span className="text-[11px] font-medium text-gray-600 dark:text-[#a1a1aa]">10:44 AM</span></div></td>
 <td className="py-3 px-3"><div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-gray-300" /><span className="text-[11px] font-medium text-gray-400 dark:text-[#737373]">weekend</span></div></td>
 </tr>
 <tr className="hover:bg-gray-50 dark:bg-[#111111] dark:hover:bg-[#181818]/50 transition-colors">
 <td className="py-3 px-3">
 <div className="flex items-center gap-2.5">
 <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-[10px] shrink-0">MV</div>
 <div><p className="text-[13px] font-semibold text-gray-900 dark:text-white">Miracle Vetrovs</p><p className="text-[10px] text-gray-500 dark:text-[#a1a1aa]">UX Designer - UXD2</p></div>
 </div>
 </td>
 <td className="py-3 px-3"><div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-gray-600" /><span className="text-[11px] font-medium text-gray-500 dark:text-[#a1a1aa]">-</span></div></td>
 <td className="py-3 px-3"><div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-50 dark:bg-blue-500/100" /><span className="text-[11px] font-medium text-gray-600 dark:text-[#a1a1aa]">10:33 AM</span></div></td>
 <td className="py-3 px-3"><div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-red-50 dark:bg-red-500/100" /><span className="text-[11px] font-medium text-red-500">on leave</span></div></td>
 <td className="py-3 px-3"><div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-gray-300" /><span className="text-[11px] font-medium text-gray-400 dark:text-[#737373]">weekend</span></div></td>
 </tr>
 <tr className="hover:bg-gray-50 dark:bg-[#111111] dark:hover:bg-[#181818]/50 transition-colors">
 <td className="py-3 px-3">
 <div className="flex items-center gap-2.5">
 <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-[10px] shrink-0">AA</div>
 <div><p className="text-[13px] font-semibold text-gray-900 dark:text-white">Avery Arwood</p><p className="text-[10px] text-gray-500 dark:text-[#a1a1aa]">UI Designer - UID2</p></div>
 </div>
 </td>
 <td className="py-3 px-3"><div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-yellow-400" /><span className="text-[11px] font-medium text-yellow-600">wfh</span></div></td>
 <td className="py-3 px-3"><div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-50 dark:bg-blue-500/100" /><span className="text-[11px] font-medium text-gray-600 dark:text-[#a1a1aa]">10:21 AM</span></div></td>
 <td className="py-3 px-3"><div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-yellow-400" /><span className="text-[11px] font-medium text-gray-600 dark:text-[#a1a1aa]">wfh</span></div></td>
 <td className="py-3 px-3"><div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-gray-300" /><span className="text-[11px] font-medium text-gray-400 dark:text-[#737373]">weekend</span></div></td>
 </tr>
 </tbody>
 </table>
 </div>
 </div>

 {/* Working History */}
 <div className="bg-white dark:bg-[#111111] rounded-2xl p-5 border border-gray-100 dark:border-[#262626] shadow-sm transition-shadow">
 <div className="flex items-center justify-between mb-3">
 <h3 className="font-bold text-gray-900 dark:text-white">Working History</h3>
 <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-[#262626] text-[11px] font-semibold text-gray-600 dark:text-[#a1a1aa] hover:bg-gray-50 dark:bg-[#111111] dark:hover:bg-[#181818] transition-colors">
 Show all <ChevronDown size={12} />
 </button>
 </div>
 <div className="flex flex-wrap items-center gap-3 mb-4">
 <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-50 dark:bg-green-500/100" /><span className="text-[10px] font-medium text-gray-500 dark:text-[#a1a1aa] uppercase">meeting criteria</span></div>
 <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-yellow-400" /><span className="text-[10px] font-medium text-gray-500 dark:text-[#a1a1aa] uppercase">criteria unmet</span></div>
 <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-50 dark:bg-red-500/100" /><span className="text-[10px] font-medium text-gray-500 dark:text-[#a1a1aa] uppercase">action needed</span></div>
 <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-gray-400" /><span className="text-[10px] font-medium text-gray-500 dark:text-[#a1a1aa] uppercase">overtime</span></div>
 </div>
 <div className="overflow-x-auto">
 <table className="w-full text-left border-collapse min-w-[480px]">
 <thead>
 <tr className="bg-gray-50 dark:bg-[#111111] border-b border-gray-100 dark:border-[#262626]">
 <th className="py-2.5 px-3 text-[11px] font-semibold text-gray-500 dark:text-[#a1a1aa] rounded-l-lg">Date</th>
 <th className="py-2.5 px-3 text-[11px] font-semibold text-gray-500 dark:text-[#a1a1aa]">Arrival</th>
 <th className="py-2.5 px-3 text-[11px] font-semibold text-gray-500 dark:text-[#a1a1aa]">Departure</th>
 <th className="py-2.5 px-3 text-[11px] font-semibold text-gray-500 dark:text-[#a1a1aa] text-right rounded-r-lg">Effective time</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-gray-50 dark:divide-[#262626]">
 <tr className="hover:bg-gray-50 dark:bg-[#111111] dark:hover:bg-[#181818]/50 transition-colors">
 <td className="py-3 px-3"><div className="flex items-center gap-2"><div className="w-6 h-6 rounded bg-gray-100 dark:bg-[#111111] flex items-center justify-center text-[10px] font-bold text-gray-600 dark:text-[#a1a1aa]">26</div><span className="text-[13px] font-semibold text-blue-600">Today</span></div></td>
 <td className="py-3 px-3"><span className="text-[13px] font-medium text-gray-900 dark:text-white">11:19 AM</span></td>
 <td className="py-3 px-3"><span className="text-[13px] font-medium text-gray-500 dark:text-[#a1a1aa] italic">- Still in office -</span></td>
 <td className="py-3 px-3 text-right"><div className="flex items-center justify-end gap-2"><div className="text-right"><p className="text-[13px] font-semibold text-gray-900 dark:text-white">6:27 hours</p><p className="text-[9px] text-gray-400 dark:text-[#737373]">/ 9 hours</p></div><div className="w-4 h-4 rounded-full border-2 border-yellow-400" /></div></td>
 </tr>
 <tr className="hover:bg-gray-50 dark:bg-[#111111] dark:hover:bg-[#181818]/50 transition-colors">
 <td className="py-3 px-3"><div className="flex items-center gap-2"><div className="w-6 h-6 rounded bg-gray-100 dark:bg-[#111111] flex items-center justify-center text-[10px] font-bold text-gray-600 dark:text-[#a1a1aa]">25</div><span className="text-[13px] font-medium text-gray-600 dark:text-[#a1a1aa]">25/9/23</span></div></td>
 <td className="py-3 px-3"><span className="text-[13px] font-medium text-gray-600 dark:text-[#a1a1aa]">11:56 AM</span></td>
 <td className="py-3 px-3"><span className="text-[13px] font-medium text-gray-600 dark:text-[#a1a1aa]">6:01 PM</span></td>
 <td className="py-3 px-3 text-right"><div className="flex items-center justify-end gap-2"><div className="text-right"><p className="text-[13px] font-medium text-gray-700 dark:text-[#cbd5e1]">6:05 hours</p><p className="text-[9px] text-gray-400 dark:text-[#737373]">/ 9 hours</p></div><div className="w-4 h-4 rounded-full border-2 border-yellow-400" /></div></td>
 </tr>
 <tr className="hover:bg-gray-50 dark:bg-[#111111] dark:hover:bg-[#181818]/50 transition-colors">
 <td className="py-3 px-3"><div className="flex items-center gap-2"><div className="w-6 h-6 rounded bg-gray-100 dark:bg-[#111111] flex items-center justify-center text-[10px] font-bold text-gray-600 dark:text-[#a1a1aa]">24</div><span className="text-[13px] font-medium text-gray-600 dark:text-[#a1a1aa]">24/9/23</span></div></td>
 <td className="py-3 px-3"><span className="text-[13px] font-medium text-gray-600 dark:text-[#a1a1aa]">10:11 AM</span></td>
 <td className="py-3 px-3"><span className="text-[13px] font-medium text-gray-600 dark:text-[#a1a1aa]">8:53 PM</span></td>
 <td className="py-3 px-3 text-right"><div className="flex items-center justify-end gap-2"><div className="text-right"><p className="text-[13px] font-medium text-gray-700 dark:text-[#cbd5e1]">10:42 hours</p><p className="text-[9px] text-gray-400 dark:text-[#737373]">/ 9 hours</p></div><div className="w-4 h-4 rounded-full border-2 border-green-500" /></div></td>
 </tr>
 <tr className="hover:bg-gray-50 dark:bg-[#111111] dark:hover:bg-[#181818]/50 transition-colors">
 <td className="py-3 px-3"><div className="flex items-center gap-2"><div className="w-6 h-6 rounded bg-gray-100 dark:bg-[#111111] flex items-center justify-center text-[10px] font-bold text-gray-600 dark:text-[#a1a1aa]">23</div><span className="text-[13px] font-medium text-gray-600 dark:text-[#a1a1aa]">23/9/23</span></div></td>
 <td className="py-3 px-3"><span className="text-[13px] font-medium text-gray-600 dark:text-[#a1a1aa]">12:45 AM</span></td>
 <td className="py-3 px-3"><span className="text-[13px] font-medium text-gray-600 dark:text-[#a1a1aa]">4:03 PM</span></td>
 <td className="py-3 px-3 text-right"><div className="flex items-center justify-end gap-2"><div className="text-right"><p className="text-[13px] font-medium text-gray-700 dark:text-[#cbd5e1]">3:18 hours</p><p className="text-[9px] text-gray-400 dark:text-[#737373]">/ 9 hours</p></div><div className="w-4 h-4 rounded-full border-2 border-red-500" /></div></td>
 </tr>
 </tbody>
 </table>
 </div>
 </div>
 </div>
 </div>
 );
}
