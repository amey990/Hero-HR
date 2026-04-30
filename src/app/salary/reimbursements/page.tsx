"use client";

import { Plus, Eye, Download, Upload, Wallet, CheckCircle, Clock, XCircle, ChevronDown, ChevronRight } from "lucide-react";

const claims = [
 { id: "RMB001", type: "Travel", date: "25 Apr 2026", amount: "₹4,500", submitted: "26 Apr 2026", status: "Pending", receipt: true },
 { id: "RMB002", type: "Food", date: "22 Apr 2026", amount: "₹1,200", submitted: "23 Apr 2026", status: "Approved", receipt: true },
 { id: "RMB003", type: "Internet", date: "01 Apr 2026", amount: "₹1,500", submitted: "02 Apr 2026", status: "Paid", receipt: true },
 { id: "RMB004", type: "Medical", date: "18 Mar 2026", amount: "₹8,500", submitted: "19 Mar 2026", status: "Approved", receipt: true },
 { id: "RMB005", type: "Fuel", date: "10 Mar 2026", amount: "₹3,200", submitted: "11 Mar 2026", status: "Paid", receipt: true },
 { id: "RMB006", type: "Travel", date: "28 Feb 2026", amount: "₹12,000", submitted: "01 Mar 2026", status: "Rejected", receipt: false },
 { id: "RMB007", type: "Office Supplies", date: "15 Feb 2026", amount: "₹2,100", submitted: "16 Feb 2026", status: "Paid", receipt: true },
 { id: "RMB008", type: "Internet", date: "01 Feb 2026", amount: "₹1,500", submitted: "02 Feb 2026", status: "Paid", receipt: true },
];

const statusStyle: Record<string, string> = {
 Approved: "bg-green-50 dark:bg-green-500/10 text-green-700 border-green-200 dark:border-green-500/30",
 Pending: "bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 border-yellow-200 dark:border-yellow-500/30",
 Rejected: "bg-red-50 dark:bg-red-500/10 text-red-700 border-red-200 dark:border-red-500/30",
 Paid: "bg-blue-50 dark:bg-blue-500/10 text-blue-700 border-blue-200 dark:border-blue-500/30",
};

const timeline = [
 { step: "Submitted", done: true },
 { step: "Under Review", done: true },
 { step: "Approved", done: true },
 { step: "Paid", done: false },
];

export default function ReimbursementsPage() {
 return (
 <div className="space-y-6 pb-12">
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
 <div>
 <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Reimbursements</h1>
 <p className="text-gray-500 dark:text-[#a1a1aa] mt-1 text-sm font-medium">Submit expense claims and track reimbursement status.</p>
 </div>
 <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 shadow-sm"><Plus size={16} /> New Claim</button>
 </div>

 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
 {[
 { icon: Wallet, label: "Total Claimed", value: "₹42,500", color: "bg-blue-50 dark:bg-blue-500/10 text-blue-600" },
 { icon: CheckCircle, label: "Approved", value: "₹31,000", color: "bg-green-50 dark:bg-green-500/10 text-green-600" },
 { icon: Clock, label: "Pending", value: "3", color: "bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600" },
 { icon: XCircle, label: "Rejected", value: "1", color: "bg-red-50 dark:bg-red-500/10 text-red-600" },
 ].map((c) => (
 <div key={c.label} className="bg-white dark:bg-[#111111] rounded-2xl p-4 border border-gray-100 dark:border-[#262626] shadow-sm transition-shadow group">
 <div className={`w-9 h-9 rounded-xl ${c.color} flex items-center justify-center mb-2 transition-transform`}><c.icon size={18} strokeWidth={2.5} /></div>
 <p className="text-[11px] text-gray-500 dark:text-[#a1a1aa] font-medium">{c.label}</p>
 <h4 className="text-lg font-bold text-gray-900 dark:text-white">{c.value}</h4>
 </div>
 ))}
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5">
 {/* Form */}
 <div className="bg-white dark:bg-[#111111] rounded-2xl p-6 border border-gray-100 dark:border-[#262626] shadow-sm">
 <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-5">New Reimbursement Claim</h3>
 <div className="space-y-4">
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div>
 <label className="block text-[13px] font-semibold text-gray-700 dark:text-[#cbd5e1] mb-1.5">Claim Type</label>
 <div className="relative">
 <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#262626] text-sm text-slate-900 dark:text-white bg-white dark:bg-[#111111] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 appearance-none cursor-pointer">
 <option>Travel</option><option>Food</option><option>Internet</option><option>Medical</option><option>Fuel</option><option>Office Supplies</option><option>Other</option>
 </select>
 <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-[#737373] pointer-events-none" />
 </div>
 </div>
 <div>
 <label className="block text-[13px] font-semibold text-gray-700 dark:text-[#cbd5e1] mb-1.5">Expense Date</label>
 <input type="date" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#262626] text-sm text-slate-900 dark:text-white bg-white dark:bg-[#111111] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400" />
 </div>
 </div>
 <div>
 <label className="block text-[13px] font-semibold text-gray-700 dark:text-[#cbd5e1] mb-1.5">Amount (₹)</label>
 <input type="number" placeholder="Enter amount..." className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#262626] text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:text-[#737373] dark:placeholder:text-[#737373] dark:text-[#a1a1aa] dark:text-[#737373] bg-white dark:bg-[#111111] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400" />
 </div>
 <div>
 <label className="block text-[13px] font-semibold text-gray-700 dark:text-[#cbd5e1] mb-1.5">Description</label>
 <textarea rows={2} placeholder="Describe the expense..." className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#262626] text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:text-[#737373] dark:placeholder:text-[#737373] dark:text-[#a1a1aa] dark:text-[#737373] bg-white dark:bg-[#111111] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 resize-none" />
 </div>
 <div>
 <label className="block text-[13px] font-semibold text-gray-700 dark:text-[#cbd5e1] mb-1.5">Upload Receipt</label>
 <div className="flex items-center gap-3 p-3 rounded-xl border border-dashed border-gray-300 bg-gray-50 dark:bg-[#111111]/50 cursor-pointer hover:bg-gray-50 dark:bg-[#111111] dark:hover:bg-[#181818] transition-colors">
 <Upload size={18} className="text-gray-400 dark:text-[#737373]" /><p className="text-[12px] text-gray-500 dark:text-[#a1a1aa]">Click to upload or drag file here</p>
 </div>
 </div>
 <div className="flex items-center gap-3 pt-1">
 <button className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 shadow-sm">Submit Claim</button>
 <button className="px-6 py-2.5 rounded-xl border border-gray-200 dark:border-[#262626] text-sm font-semibold text-gray-700 dark:text-[#cbd5e1] bg-white dark:bg-[#111111] hover:bg-gray-50 dark:bg-[#111111] dark:hover:bg-[#181818]">Reset</button>
 </div>
 </div>
 </div>

 {/* Timeline */}
 <div className="bg-white dark:bg-[#111111] rounded-2xl p-5 border border-gray-100 dark:border-[#262626] shadow-sm">
 <h4 className="font-bold text-gray-900 dark:text-white text-[13px] mb-4">Claim Flow (RMB002)</h4>
 <div className="space-y-0">
 {timeline.map((t, i) => (
 <div key={t.step} className="flex items-start gap-3">
 <div className="flex flex-col items-center">
 <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${t.done ? "bg-green-50 dark:bg-green-500/100 text-white" : "bg-gray-200 text-gray-500 dark:text-[#a1a1aa]"}`}>
 {t.done ? "✓" : i + 1}
 </div>
 {i < timeline.length - 1 && <div className={`w-0.5 h-8 ${t.done ? "bg-green-300" : "bg-gray-200"}`} />}
 </div>
 <div className="pt-0.5">
 <p className={`text-[13px] font-semibold ${t.done ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-[#737373]"}`}>{t.step}</p>
 </div>
 </div>
 ))}
 </div>
 </div>
 </div>

 {/* Claims Table */}
 <div className="bg-white dark:bg-[#111111] rounded-2xl border border-gray-100 dark:border-[#262626] shadow-sm overflow-hidden">
 <div className="p-5 border-b border-gray-100 dark:border-[#262626]"><h3 className="font-bold text-gray-900 dark:text-white">All Claims</h3></div>
 <div className="overflow-x-auto">
 <table className="w-full text-left border-collapse min-w-[700px]">
 <thead>
 <tr className="bg-gray-50 dark:bg-[#111111]/80 border-b border-gray-100 dark:border-[#262626]">
 {["Claim ID", "Type", "Expense Date", "Amount", "Submitted On", "Status", "Receipt", ""].map((h) => (
 <th key={h} className="py-2.5 px-4 text-[11px] font-semibold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider">{h}</th>
 ))}
 </tr>
 </thead>
 <tbody className="divide-y divide-gray-50 dark:divide-[#262626]">
 {claims.map((c) => (
 <tr key={c.id} className="hover:bg-gray-50 dark:hover:bg-[#181818] transition-colors">
 <td className="py-3.5 px-4 text-[13px] font-semibold text-blue-600">{c.id}</td>
 <td className="py-3.5 px-4 text-[13px] text-gray-600 dark:text-[#a1a1aa]">{c.type}</td>
 <td className="py-3.5 px-4 text-[13px] text-gray-600 dark:text-[#a1a1aa]">{c.date}</td>
 <td className="py-3.5 px-4 text-[13px] font-bold text-gray-900 dark:text-white">{c.amount}</td>
 <td className="py-3.5 px-4 text-[12px] text-gray-500 dark:text-[#a1a1aa]">{c.submitted}</td>
 <td className="py-3.5 px-4"><span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${statusStyle[c.status]}`}>{c.status}</span></td>
 <td className="py-3.5 px-4 text-[12px] text-gray-500 dark:text-[#a1a1aa]">{c.receipt ? "✓" : "—"}</td>
 <td className="py-3.5 px-4">
 <div className="flex items-center gap-1">
 <button className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 dark:text-[#737373] hover:bg-gray-50 dark:hover:bg-[#181818] hover:text-blue-600"><Eye size={14} /></button>
 <button className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 dark:text-[#737373] hover:bg-gray-50 dark:hover:bg-[#181818] hover:text-blue-600"><Download size={14} /></button>
 </div>
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
