"use client";

import { Download, ChevronDown, TrendingUp, Award, Calendar, Briefcase, Eye } from "lucide-react";

const salaryStructure = {
 earnings: [
 { label: "Basic Salary", amount: "₹35,000" },
 { label: "HRA", amount: "₹14,000" },
 { label: "Special Allowance", amount: "₹18,000" },
 { label: "Performance Allowance", amount: "₹18,000" },
 ],
 deductions: [
 { label: "Provident Fund", amount: "₹4,200" },
 { label: "Professional Tax", amount: "₹200" },
 { label: "Income Tax", amount: "₹8,000" },
 ],
};

const revisionHistory = [
 { date: "01 Apr 2026", prevCTC: "₹9,12,000", newCTC: "₹10,20,000", pct: "12%", reason: "Annual Appraisal", approver: "Sunita Verma" },
 { date: "01 Apr 2025", prevCTC: "₹7,80,000", newCTC: "₹9,12,000", pct: "17%", reason: "Promotion — L1 to L2", approver: "Rajesh Kumar" },
 { date: "01 Oct 2024", prevCTC: "₹7,20,000", newCTC: "₹7,80,000", pct: "8%", reason: "Mid-year Revision", approver: "Sunita Verma" },
 { date: "01 Apr 2024", prevCTC: "₹6,00,000", newCTC: "₹7,20,000", pct: "20%", reason: "Annual Appraisal", approver: "Sunita Verma" },
 { date: "15 Jul 2023", prevCTC: "₹5,40,000", newCTC: "₹6,00,000", pct: "11%", reason: "Joining Offer", approver: "HR Team" },
];

const timeline = [
 { date: "Jul 2023", title: "Joined", desc: "Joining CTC: ₹5,40,000", color: "bg-blue-50 dark:bg-blue-500/100" },
 { date: "Apr 2024", title: "Annual Increment", desc: "₹6,00,000 → ₹7,20,000 (+20%)", color: "bg-green-50 dark:bg-green-500/100" },
 { date: "Oct 2024", title: "Mid-year Revision", desc: "₹7,20,000 → ₹7,80,000 (+8%)", color: "bg-purple-50 dark:bg-purple-500/100" },
 { date: "Apr 2025", title: "Promotion — L2", desc: "₹7,80,000 → ₹9,12,000 (+17%)", color: "bg-orange-50 dark:bg-orange-500/100" },
 { date: "Apr 2026", title: "Latest Appraisal", desc: "₹9,12,000 → ₹10,20,000 (+12%)", color: "bg-blue-600" },
];

export default function SalaryRevisionPage() {
 return (
 <div className="space-y-6 pb-12">
 {/* Header */}
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
 <div>
 <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Salary Revision</h1>
 <p className="text-gray-500 dark:text-[#a1a1aa] mt-1 text-sm font-medium">View your salary structure, increments and revision history.</p>
 </div>
 <div className="flex items-center gap-3">
 <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#262626] text-sm font-medium text-gray-700 dark:text-[#cbd5e1] bg-white dark:bg-[#111111] hover:bg-gray-50 dark:bg-[#111111] dark:hover:bg-[#181818]">2026 <ChevronDown size={14} /></button>
 <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 shadow-sm"><Download size={16} /> Download Latest Letter</button>
 </div>
 </div>

 {/* Current Summary */}
 <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-sm">
 <p className="text-[11px] font-medium text-blue-200 uppercase tracking-wider mb-1">Current Compensation</p>
 <div className="grid grid-cols-2 sm:grid-cols-5 gap-5 mt-3">
 <div>
 <p className="text-[11px] text-blue-200 mb-0.5">Annual CTC</p>
 <p className="text-2xl font-bold">₹10,20,000</p>
 </div>
 <div>
 <p className="text-[11px] text-blue-200 mb-0.5">Monthly Gross</p>
 <p className="text-xl font-bold">₹85,000</p>
 </div>
 <div>
 <p className="text-[11px] text-blue-200 mb-0.5">Monthly Net</p>
 <p className="text-xl font-bold">₹68,500</p>
 </div>
 <div>
 <p className="text-[11px] text-blue-200 mb-0.5">Last Revision</p>
 <p className="text-sm font-semibold">01 April 2026</p>
 </div>
 <div>
 <p className="text-[11px] text-blue-200 mb-0.5">Increment</p>
 <p className="text-xl font-bold text-green-300">+12%</p>
 </div>
 </div>
 </div>

 {/* Salary Structure + Insights */}
 <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5">
 {/* Structure */}
 <div className="bg-white dark:bg-[#111111] rounded-2xl p-6 border border-gray-100 dark:border-[#262626] shadow-sm">
 <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-5">Current Salary Structure</h3>
 <div className="mb-5">
 <p className="text-[11px] font-semibold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider mb-3">Earnings</p>
 <div className="space-y-2.5">
 {salaryStructure.earnings.map((e) => (
 <div key={e.label} className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-[#262626] last:border-0">
 <span className="text-[13px] text-gray-600 dark:text-[#a1a1aa]">{e.label}</span>
 <span className="text-[13px] font-semibold text-gray-900 dark:text-white">{e.amount}</span>
 </div>
 ))}
 <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-[#262626] font-bold">
 <span className="text-[13px] text-gray-800 dark:text-[#e2e8f0]">Total Earnings</span>
 <span className="text-[14px] text-green-600">₹85,000</span>
 </div>
 </div>
 </div>
 <div>
 <p className="text-[11px] font-semibold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider mb-3">Deductions</p>
 <div className="space-y-2.5">
 {salaryStructure.deductions.map((d) => (
 <div key={d.label} className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-[#262626] last:border-0">
 <span className="text-[13px] text-gray-600 dark:text-[#a1a1aa]">{d.label}</span>
 <span className="text-[13px] font-semibold text-red-500">{d.amount}</span>
 </div>
 ))}
 <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-[#262626] font-bold">
 <span className="text-[13px] text-gray-800 dark:text-[#e2e8f0]">Total Deductions</span>
 <span className="text-[14px] text-red-500">₹12,400</span>
 </div>
 </div>
 </div>
 <div className="flex justify-between items-center mt-5 pt-4 border-t-2 border-gray-200 dark:border-[#262626] font-bold">
 <span className="text-[15px] text-gray-900 dark:text-white">Net Monthly Pay</span>
 <span className="text-[16px] text-green-600">₹68,500</span>
 </div>
 </div>

 {/* Insights + Timeline */}
 <div className="space-y-5">
 {/* Insights */}
 <div className="bg-white dark:bg-[#111111] rounded-2xl p-5 border border-gray-100 dark:border-[#262626] shadow-sm">
 <h4 className="font-bold text-gray-900 dark:text-white text-[13px] mb-3">Insights</h4>
 <div className="space-y-3">
 {[
 { icon: Calendar, label: "Next Appraisal Cycle", value: "April 2027" },
 { icon: Award, label: "Salary Band", value: "L2" },
 { icon: TrendingUp, label: "Variable Pay Eligible", value: "Yes" },
 { icon: Briefcase, label: "Total Experience", value: "2 yrs 9 mos" },
 ].map((item) => (
 <div key={item.label} className="flex items-center gap-3 p-2.5 rounded-lg bg-gray-50 dark:bg-[#111111]/50 border border-gray-100 dark:border-[#262626]">
 <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 shrink-0"><item.icon size={14} /></div>
 <div><p className="text-[11px] text-gray-400 dark:text-[#737373] font-medium">{item.label}</p><p className="text-[13px] font-semibold text-gray-800 dark:text-[#e2e8f0]">{item.value}</p></div>
 </div>
 ))}
 </div>
 </div>

 {/* Revision Timeline */}
 <div className="bg-white dark:bg-[#111111] rounded-2xl p-5 border border-gray-100 dark:border-[#262626] shadow-sm">
 <h4 className="font-bold text-gray-900 dark:text-white text-[13px] mb-4">Revision Timeline</h4>
 <div className="space-y-0">
 {timeline.map((t, i) => (
 <div key={t.date} className="flex items-start gap-3">
 <div className="flex flex-col items-center">
 <div className={`w-3 h-3 rounded-full ${t.color} shrink-0 mt-1`} />
 {i < timeline.length - 1 && <div className="w-0.5 h-10 bg-gray-200" />}
 </div>
 <div className="pb-3">
 <p className="text-[10px] text-gray-400 dark:text-[#737373] font-medium">{t.date}</p>
 <p className="text-[12px] font-bold text-gray-900 dark:text-white">{t.title}</p>
 <p className="text-[11px] text-gray-500 dark:text-[#a1a1aa]">{t.desc}</p>
 </div>
 </div>
 ))}
 </div>
 </div>
 </div>
 </div>

 {/* Revision History Table */}
 <div className="bg-white dark:bg-[#111111] rounded-2xl border border-gray-100 dark:border-[#262626] shadow-sm overflow-hidden">
 <div className="p-5 border-b border-gray-100 dark:border-[#262626]"><h3 className="font-bold text-gray-900 dark:text-white">Revision History</h3></div>
 <div className="overflow-x-auto">
 <table className="w-full text-left border-collapse min-w-[700px]">
 <thead>
 <tr className="bg-gray-50 dark:bg-[#111111]/80 border-b border-gray-100 dark:border-[#262626]">
 {["Effective Date", "Previous CTC", "Revised CTC", "Increment", "Reason", "Approved By", ""].map((h) => (
 <th key={h} className="py-2.5 px-4 text-[11px] font-semibold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider">{h}</th>
 ))}
 </tr>
 </thead>
 <tbody className="divide-y divide-gray-50 dark:divide-[#262626]">
 {revisionHistory.map((r) => (
 <tr key={r.date} className="hover:bg-gray-50 dark:hover:bg-[#181818] transition-colors">
 <td className="py-3.5 px-4 text-[13px] font-semibold text-gray-900 dark:text-white">{r.date}</td>
 <td className="py-3.5 px-4 text-[13px] text-gray-500 dark:text-[#a1a1aa]">{r.prevCTC}</td>
 <td className="py-3.5 px-4 text-[13px] font-bold text-gray-900 dark:text-white">{r.newCTC}</td>
 <td className="py-3.5 px-4"><span className="text-[11px] font-bold text-green-600 bg-green-50 dark:bg-green-500/10 px-2 py-0.5 rounded-full">+{r.pct}</span></td>
 <td className="py-3.5 px-4 text-[13px] text-gray-600 dark:text-[#a1a1aa]">{r.reason}</td>
 <td className="py-3.5 px-4 text-[12px] text-gray-500 dark:text-[#a1a1aa]">{r.approver}</td>
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
