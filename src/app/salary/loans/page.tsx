"use client";

import { Plus, Eye, Download, ChevronDown, Upload, Wallet, Calendar, TrendingDown, Clock } from "lucide-react";

const repaymentSchedule = [
 { month: "Jan 2026", amount: "₹7,500", remaining: "₹45,000", status: "Paid" },
 { month: "Feb 2026", amount: "₹7,500", remaining: "₹37,500", status: "Paid" },
 { month: "Mar 2026", amount: "₹7,500", remaining: "₹30,000", status: "Paid" },
 { month: "Apr 2026", amount: "₹7,500", remaining: "₹22,500", status: "Paid" },
 { month: "May 2026", amount: "₹7,500", remaining: "₹15,000", status: "Upcoming" },
 { month: "Jun 2026", amount: "₹7,500", remaining: "₹7,500", status: "Upcoming" },
 { month: "Jul 2026", amount: "₹7,500", remaining: "₹0", status: "Upcoming" },
];

const loans = [
 { id: "LN001", type: "Salary Advance", approved: "₹60,000", outstanding: "₹22,500", emi: "₹7,500", tenure: "8 months", start: "Jan 2026", status: "Active" },
 { id: "LN002", type: "Emergency Advance", approved: "₹15,000", outstanding: "₹0", emi: "₹5,000", tenure: "3 months", start: "Jun 2025", status: "Completed" },
];

const recentRequests = [
 { type: "Salary Advance", amount: "₹60,000", applied: "20 Dec 2025", status: "Active" },
 { type: "Emergency Advance", amount: "₹15,000", applied: "15 May 2025", status: "Completed" },
 { type: "Personal Loan", amount: "₹1,00,000", applied: "10 Jan 2025", status: "Rejected" },
];

const statusStyle: Record<string, string> = {
 Active: "bg-blue-50 dark:bg-blue-500/10 text-blue-700 border-blue-200 dark:border-blue-500/30",
 Pending: "bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 border-yellow-200 dark:border-yellow-500/30",
 Completed: "bg-green-50 dark:bg-green-500/10 text-green-700 border-green-200 dark:border-green-500/30",
 Rejected: "bg-red-50 dark:bg-red-500/10 text-red-700 border-red-200 dark:border-red-500/30",
 Paid: "bg-green-50 dark:bg-green-500/10 text-green-700 border-green-200 dark:border-green-500/30",
 Upcoming: "bg-gray-100 dark:bg-[#111111] text-gray-500 dark:text-[#a1a1aa] border-gray-200 dark:border-[#262626]",
};

export default function LoansPage() {
 return (
 <div className="space-y-6 pb-12">
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
 <div>
 <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Loans &amp; Advances</h1>
 <p className="text-gray-500 dark:text-[#a1a1aa] mt-1 text-sm font-medium">Request salary advances and track repayment schedules.</p>
 </div>
 <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 shadow-sm"><Plus size={16} /> Apply for Advance</button>
 </div>

 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
 {[
 { icon: Wallet, label: "Active Loans", value: "1", color: "bg-blue-50 dark:bg-blue-500/10 text-blue-600" },
 { icon: TrendingDown, label: "Outstanding", value: "₹22,500", color: "bg-orange-50 dark:bg-orange-500/10 text-orange-600" },
 { icon: Calendar, label: "Monthly EMI", value: "₹7,500", color: "bg-purple-50 dark:bg-purple-500/10 text-purple-600" },
 { icon: Clock, label: "Next Deduction", value: "30 May", color: "bg-green-50 dark:bg-green-500/10 text-green-600" },
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
 <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-5">Apply for Advance</h3>
 <div className="space-y-4">
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div>
 <label className="block text-[13px] font-semibold text-gray-700 dark:text-[#cbd5e1] mb-1.5">Request Type</label>
 <div className="relative">
 <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#262626] text-sm text-slate-900 dark:text-white bg-white dark:bg-[#111111] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 appearance-none cursor-pointer">
 <option>Salary Advance</option><option>Personal Loan</option><option>Emergency Advance</option>
 </select>
 <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-[#737373] pointer-events-none" />
 </div>
 </div>
 <div>
 <label className="block text-[13px] font-semibold text-gray-700 dark:text-[#cbd5e1] mb-1.5">Amount (₹)</label>
 <input type="number" placeholder="Enter amount..." className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#262626] text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:text-[#737373] dark:placeholder:text-[#737373] dark:text-[#a1a1aa] dark:text-[#737373] bg-white dark:bg-[#111111] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400" />
 </div>
 </div>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div>
 <label className="block text-[13px] font-semibold text-gray-700 dark:text-[#cbd5e1] mb-1.5">Repayment Tenure</label>
 <div className="relative">
 <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#262626] text-sm text-slate-900 dark:text-white bg-white dark:bg-[#111111] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 appearance-none cursor-pointer">
 <option>3 months</option><option>6 months</option><option>9 months</option><option>12 months</option>
 </select>
 <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-[#737373] pointer-events-none" />
 </div>
 </div>
 <div>
 <label className="block text-[13px] font-semibold text-gray-700 dark:text-[#cbd5e1] mb-1.5">Expected Disbursement</label>
 <input type="date" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#262626] text-sm text-slate-900 dark:text-white bg-white dark:bg-[#111111] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400" />
 </div>
 </div>
 <div>
 <label className="block text-[13px] font-semibold text-gray-700 dark:text-[#cbd5e1] mb-1.5">Reason</label>
 <textarea rows={2} placeholder="Why do you need this advance..." className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#262626] text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:text-[#737373] dark:placeholder:text-[#737373] dark:text-[#a1a1aa] dark:text-[#737373] bg-white dark:bg-[#111111] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 resize-none" />
 </div>
 <div className="flex items-center gap-3 pt-1">
 <button className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 shadow-sm">Submit Request</button>
 <button className="px-6 py-2.5 rounded-xl border border-gray-200 dark:border-[#262626] text-sm font-semibold text-gray-700 dark:text-[#cbd5e1] bg-white dark:bg-[#111111] hover:bg-gray-50 dark:bg-[#111111] dark:hover:bg-[#181818]">Reset</button>
 </div>
 </div>
 </div>

 {/* Recent + Repayment Progress */}
 <div className="space-y-5">
 <div className="bg-white dark:bg-[#111111] rounded-2xl p-5 border border-gray-100 dark:border-[#262626] shadow-sm">
 <h4 className="font-bold text-gray-900 dark:text-white text-[13px] mb-3">Recent Requests</h4>
 <div className="space-y-2.5">
 {recentRequests.map((r, i) => (
 <div key={i} className="flex items-start justify-between p-3 rounded-xl bg-gray-50 dark:bg-[#111111]/50 border border-gray-100 dark:border-[#262626] hover:bg-gray-50 dark:bg-[#111111] dark:hover:bg-[#181818] transition-colors">
 <div><p className="text-[12px] font-semibold text-gray-800 dark:text-[#e2e8f0]">{r.type}</p><p className="text-[10px] text-gray-500 dark:text-[#a1a1aa]">{r.amount} · {r.applied}</p></div>
 <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full border ${statusStyle[r.status]}`}>{r.status}</span>
 </div>
 ))}
 </div>
 </div>
 <div className="bg-white dark:bg-[#111111] rounded-2xl p-5 border border-gray-100 dark:border-[#262626] shadow-sm">
 <h4 className="font-bold text-gray-900 dark:text-white text-[13px] mb-3">Repayment Progress (LN001)</h4>
 <div className="mb-3">
 <div className="flex justify-between text-[12px] mb-1"><span className="text-gray-500 dark:text-[#a1a1aa]">₹37,500 paid of ₹60,000</span><span className="font-bold text-gray-800 dark:text-[#e2e8f0]">62.5%</span></div>
 <div className="h-2 bg-gray-100 dark:bg-[#111111] rounded-full overflow-hidden"><div className="h-full bg-blue-50 dark:bg-blue-500/100 rounded-full" style={{ width: "62.5%" }} /></div>
 </div>
 <p className="text-[11px] text-gray-500 dark:text-[#a1a1aa]">3 installments remaining</p>
 </div>
 </div>
 </div>

 {/* Active Loans */}
 <div className="bg-white dark:bg-[#111111] rounded-2xl border border-gray-100 dark:border-[#262626] shadow-sm overflow-hidden">
 <div className="p-5 border-b border-gray-100 dark:border-[#262626]"><h3 className="font-bold text-gray-900 dark:text-white">Active Loans</h3></div>
 <div className="overflow-x-auto">
 <table className="w-full text-left border-collapse min-w-[700px]">
 <thead><tr className="bg-gray-50 dark:bg-[#111111]/80 border-b border-gray-100 dark:border-[#262626]">
 {["Loan ID","Type","Approved","Outstanding","EMI","Tenure","Start Date","Status",""].map((h) => (
 <th key={h} className="py-2.5 px-4 text-[11px] font-semibold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider">{h}</th>
 ))}
 </tr></thead>
 <tbody className="divide-y divide-gray-50 dark:divide-[#262626]">
 {loans.map((l) => (
 <tr key={l.id} className="hover:bg-gray-50 dark:hover:bg-[#181818] transition-colors">
 <td className="py-3.5 px-4 text-[13px] font-semibold text-blue-600">{l.id}</td>
 <td className="py-3.5 px-4 text-[13px] text-gray-600 dark:text-[#a1a1aa]">{l.type}</td>
 <td className="py-3.5 px-4 text-[13px] font-medium text-gray-900 dark:text-white">{l.approved}</td>
 <td className="py-3.5 px-4 text-[13px] font-bold text-orange-600">{l.outstanding}</td>
 <td className="py-3.5 px-4 text-[13px] text-gray-600 dark:text-[#a1a1aa]">{l.emi}</td>
 <td className="py-3.5 px-4 text-[13px] text-gray-600 dark:text-[#a1a1aa]">{l.tenure}</td>
 <td className="py-3.5 px-4 text-[12px] text-gray-500 dark:text-[#a1a1aa]">{l.start}</td>
 <td className="py-3.5 px-4"><span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${statusStyle[l.status]}`}>{l.status}</span></td>
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

 {/* Repayment Schedule */}
 <div className="bg-white dark:bg-[#111111] rounded-2xl border border-gray-100 dark:border-[#262626] shadow-sm overflow-hidden">
 <div className="p-5 border-b border-gray-100 dark:border-[#262626]"><h3 className="font-bold text-gray-900 dark:text-white">Repayment Schedule — LN001</h3></div>
 <div className="overflow-x-auto">
 <table className="w-full text-left border-collapse">
 <thead><tr className="bg-gray-50 dark:bg-[#111111]/80 border-b border-gray-100 dark:border-[#262626]">
 {["Month","Deduction","Remaining Balance","Status"].map((h) => (
 <th key={h} className="py-2.5 px-4 text-[11px] font-semibold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider">{h}</th>
 ))}
 </tr></thead>
 <tbody className="divide-y divide-gray-50 dark:divide-[#262626]">
 {repaymentSchedule.map((r) => (
 <tr key={r.month} className="hover:bg-gray-50 dark:hover:bg-[#181818] transition-colors">
 <td className="py-3 px-4 text-[13px] font-medium text-gray-900 dark:text-white">{r.month}</td>
 <td className="py-3 px-4 text-[13px] text-gray-600 dark:text-[#a1a1aa]">{r.amount}</td>
 <td className="py-3 px-4 text-[13px] font-semibold text-gray-800 dark:text-[#e2e8f0]">{r.remaining}</td>
 <td className="py-3 px-4"><span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${statusStyle[r.status]}`}>{r.status}</span></td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 </div>
 );
}
