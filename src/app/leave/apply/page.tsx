"use client";

import {
 Calendar, FileText, Upload, ChevronDown, Clock, User, Shield, Info
} from "lucide-react";

const balances = [
 { type: "Casual", remaining: 7, color: "bg-blue-50 dark:bg-blue-500/10 text-blue-600" },
 { type: "Sick", remaining: 7, color: "bg-red-50 dark:bg-red-500/10 text-red-600" },
 { type: "Earned", remaining: 12, color: "bg-green-50 dark:bg-green-500/10 text-green-600" },
 { type: "Comp Off", remaining: 3, color: "bg-purple-50 dark:bg-purple-500/10 text-purple-600" },
];

const recentApps = [
 { type: "Casual Leave", dates: "16 - 17 Apr", status: "Approved" },
 { type: "Sick Leave", dates: "7 Apr", status: "Approved" },
 { type: "Earned Leave", dates: "20 - 23 May", status: "Pending" },
];

const statusStyle: Record<string, string> = {
 Approved: "bg-green-50 dark:bg-green-500/10 text-green-700 border-green-200 dark:border-green-500/30",
 Pending: "bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 border-yellow-200 dark:border-yellow-500/30",
};

export default function ApplyLeavePage() {
 return (
 <div className="space-y-6 pb-12">
 {/* Header */}
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
 <div>
 <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Apply Leave</h1>
 <p className="text-gray-500 dark:text-[#a1a1aa] mt-1 text-sm font-medium">Submit a leave request for approval.</p>
 </div>
 <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#262626] text-sm font-semibold text-gray-700 dark:text-[#cbd5e1] bg-white dark:bg-[#111111] hover:bg-gray-50 dark:bg-[#111111] dark:hover:bg-[#181818] transition-colors">
 <Shield size={16} /> View Leave Policy
 </button>
 </div>

 {/* Balance Preview */}
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
 {balances.map((b) => (
 <div key={b.type} className="bg-white dark:bg-[#111111] rounded-2xl p-4 border border-gray-100 dark:border-[#262626] shadow-sm transition-shadow group">
 <p className="text-[11px] text-gray-500 dark:text-[#a1a1aa] font-medium mb-1">{b.type}</p>
 <div className="flex items-baseline gap-1">
 <span className="text-xl font-bold text-gray-900 dark:text-white">{b.remaining}</span>
 <span className="text-[11px] text-gray-400 dark:text-[#737373]">remaining</span>
 </div>
 </div>
 ))}
 </div>

 {/* Form + Sidebar */}
 <div className="flex flex-col lg:flex-row gap-5">
 {/* Main Form */}
 <div className="flex-1 bg-white dark:bg-[#111111] rounded-2xl p-6 border border-gray-100 dark:border-[#262626] shadow-sm">
 <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-6">Leave Application</h3>
 <div className="space-y-5">
 {/* Leave Type */}
 <div>
 <label className="block text-[13px] font-semibold text-gray-700 dark:text-[#cbd5e1] mb-1.5">Leave Type</label>
 <div className="relative">
 <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#262626] text-sm text-slate-900 dark:text-white bg-white dark:bg-[#111111] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 appearance-none cursor-pointer">
 <option>Casual Leave</option>
 <option>Sick Leave</option>
 <option>Earned Leave</option>
 <option>Comp Off</option>
 <option>Unpaid Leave</option>
 </select>
 <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-[#737373] pointer-events-none" />
 </div>
 </div>

 {/* Dates */}
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div>
 <label className="block text-[13px] font-semibold text-gray-700 dark:text-[#cbd5e1] mb-1.5">From Date</label>
 <input type="date" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#262626] text-sm text-slate-900 dark:text-white bg-white dark:bg-[#111111] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400" />
 </div>
 <div>
 <label className="block text-[13px] font-semibold text-gray-700 dark:text-[#cbd5e1] mb-1.5">To Date</label>
 <input type="date" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#262626] text-sm text-slate-900 dark:text-white bg-white dark:bg-[#111111] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400" />
 </div>
 </div>

 {/* Duration Type */}
 <div>
 <label className="block text-[13px] font-semibold text-gray-700 dark:text-[#cbd5e1] mb-1.5">Duration</label>
 <div className="flex flex-wrap gap-2">
 {["Full Day", "Half Day", "First Half", "Second Half"].map((d, i) => (
 <button key={d} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors border ${i === 0 ? "bg-blue-600 text-white border-blue-600" : "bg-white dark:bg-[#111111] text-gray-700 dark:text-[#cbd5e1] border-gray-200 dark:border-[#262626] hover:bg-gray-50 dark:bg-[#111111] dark:hover:bg-[#181818]"}`}>
 {d}
 </button>
 ))}
 </div>
 </div>

 {/* Duration Preview */}
 <div className="flex items-center gap-2 p-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-100">
 <Info size={14} className="text-blue-600 shrink-0" />
 <p className="text-[12px] text-blue-700 font-medium">Selected duration: <span className="font-bold">3 working days</span>. Weekends and holidays excluded automatically.</p>
 </div>

 {/* Reason */}
 <div>
 <label className="block text-[13px] font-semibold text-gray-700 dark:text-[#cbd5e1] mb-1.5">Reason</label>
 <textarea rows={3} placeholder="Provide a reason for your leave..." className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#262626] text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:text-[#737373] dark:placeholder:text-[#737373] dark:text-[#a1a1aa] dark:text-[#737373] bg-white dark:bg-[#111111] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 resize-none" />
 </div>

 {/* Handover */}
 <div>
 <label className="block text-[13px] font-semibold text-gray-700 dark:text-[#cbd5e1] mb-1.5">Handover Person</label>
 <div className="relative">
 <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#262626] text-sm text-slate-900 dark:text-white bg-white dark:bg-[#111111] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 appearance-none cursor-pointer">
 <option>Select team member...</option>
 <option>Priya Desai</option>
 <option>Rohit Sharma</option>
 <option>Karan Patel</option>
 </select>
 <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-[#737373] pointer-events-none" />
 </div>
 </div>

 {/* Attachment */}
 <div>
 <label className="block text-[13px] font-semibold text-gray-700 dark:text-[#cbd5e1] mb-1.5">Attachment <span className="text-gray-400 dark:text-[#737373] font-normal">(optional)</span></label>
 <div className="flex items-center gap-3 p-3 rounded-xl border border-dashed border-gray-300 bg-gray-50 dark:bg-[#111111]/50 cursor-pointer hover:bg-gray-50 dark:bg-[#111111] dark:hover:bg-[#181818] transition-colors">
 <Upload size={18} className="text-gray-400 dark:text-[#737373]" />
 <p className="text-[12px] text-gray-500 dark:text-[#a1a1aa]">Click to upload or drag file here</p>
 </div>
 </div>

 {/* Notify */}
 <label className="flex items-center gap-2.5 cursor-pointer">
 <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
 <span className="text-[13px] text-gray-700 dark:text-[#cbd5e1] font-medium">Notify reporting manager</span>
 </label>

 {/* Actions */}
 <div className="flex items-center gap-3 pt-2">
 <button className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm">
 Submit Request
 </button>
 <button className="px-6 py-2.5 rounded-xl border border-gray-200 dark:border-[#262626] text-sm font-semibold text-gray-700 dark:text-[#cbd5e1] bg-white dark:bg-[#111111] hover:bg-gray-50 dark:bg-[#111111] dark:hover:bg-[#181818] transition-colors">
 Reset
 </button>
 </div>
 </div>
 </div>

 {/* Sidebar */}
 <div className="lg:w-[300px] shrink-0 space-y-5">
 {/* Manager */}
 <div className="bg-white dark:bg-[#111111] rounded-2xl p-5 border border-gray-100 dark:border-[#262626] shadow-sm">
 <h4 className="text-[13px] font-bold text-gray-900 dark:text-white mb-3">Reporting Manager</h4>
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-[11px] shrink-0">SV</div>
 <div>
 <p className="text-[13px] font-semibold text-gray-900 dark:text-white">Sunita Verma</p>
 <p className="text-[11px] text-gray-500 dark:text-[#a1a1aa]">HR Head</p>
 <p className="text-[10px] text-gray-400 dark:text-[#737373]">sunita@herohr.com</p>
 </div>
 </div>
 </div>

 {/* Policy */}
 <div className="bg-white dark:bg-[#111111] rounded-2xl p-5 border border-gray-100 dark:border-[#262626] shadow-sm">
 <h4 className="text-[13px] font-bold text-gray-900 dark:text-white mb-3">Leave Policy</h4>
 <div className="space-y-2.5">
 {[
 "Apply at least 2 days before planned leave",
 "Sick leave can be applied same day",
 "Half-day threshold: 4 hours",
 "Manager approval required",
 ].map((r, i) => (
 <div key={i} className="flex items-start gap-2">
 <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
 <p className="text-[12px] text-gray-600 dark:text-[#a1a1aa]">{r}</p>
 </div>
 ))}
 </div>
 </div>

 {/* Recent */}
 <div className="bg-white dark:bg-[#111111] rounded-2xl p-5 border border-gray-100 dark:border-[#262626] shadow-sm">
 <h4 className="text-[13px] font-bold text-gray-900 dark:text-white mb-3">Recent Applications</h4>
 <div className="space-y-2.5">
 {recentApps.map((r, i) => (
 <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-gray-50 dark:bg-[#111111]/50 border border-gray-100 dark:border-[#262626]">
 <div>
 <p className="text-[12px] font-semibold text-gray-800 dark:text-[#e2e8f0]">{r.type}</p>
 <p className="text-[10px] text-gray-500 dark:text-[#a1a1aa]">{r.dates}</p>
 </div>
 <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full border ${statusStyle[r.status]}`}>{r.status}</span>
 </div>
 ))}
 </div>
 </div>
 </div>
 </div>
 </div>
 );
}
