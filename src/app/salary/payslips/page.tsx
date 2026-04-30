"use client";

import { Download, Eye, ChevronDown, Wallet, TrendingDown, Receipt, Gift } from "lucide-react";

const payslips = [
 { month: "April 2026", gross: "₹82,000", deductions: "₹13,500", net: "₹68,500", paid: "30 Apr 2026", status: "Paid" },
 { month: "March 2026", gross: "₹82,000", deductions: "₹13,500", net: "₹68,500", paid: "31 Mar 2026", status: "Paid" },
 { month: "February 2026", gross: "₹82,000", deductions: "₹13,500", net: "₹68,500", paid: "28 Feb 2026", status: "Paid" },
 { month: "January 2026", gross: "₹82,000", deductions: "₹13,500", net: "₹68,500", paid: "31 Jan 2026", status: "Paid" },
 { month: "December 2025", gross: "₹75,000", deductions: "₹12,000", net: "₹63,000", paid: "31 Dec 2025", status: "Paid" },
 { month: "November 2025", gross: "₹75,000", deductions: "₹12,000", net: "₹63,000", paid: "30 Nov 2025", status: "Paid" },
 { month: "October 2025", gross: "₹75,000", deductions: "₹12,000", net: "₹63,000", paid: "31 Oct 2025", status: "Paid" },
 { month: "September 2025", gross: "₹75,000", deductions: "₹12,000", net: "₹63,000", paid: "30 Sep 2025", status: "Paid" },
];

const earnings = [
 { label: "Basic Salary", amount: "₹35,000" },
 { label: "HRA", amount: "₹14,000" },
 { label: "Special Allowance", amount: "₹18,000" },
 { label: "Performance Bonus", amount: "₹15,000" },
];

const deductions = [
 { label: "Provident Fund", amount: "₹4,200" },
 { label: "Professional Tax", amount: "₹200" },
 { label: "Income Tax", amount: "₹8,000" },
 { label: "Loan Deduction", amount: "₹1,100" },
];

export default function PayslipsPage() {
 return (
 <div className="space-y-6 pb-12">
 {/* Header */}
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
 <div>
 <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Payslips</h1>
 <p className="text-gray-500 dark:text-[#a1a1aa] mt-1 text-sm font-medium">View, download and track your monthly salary slips.</p>
 </div>
 <div className="flex items-center gap-3">
 <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#262626] text-sm font-medium text-gray-700 dark:text-[#cbd5e1] bg-white dark:bg-[#111111] hover:bg-gray-50 dark:bg-[#111111] dark:hover:bg-[#181818]">2026 <ChevronDown size={14} /></button>
 <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 shadow-sm"><Download size={16} /> Download All</button>
 </div>
 </div>

 {/* Current Month Summary */}
 <div className="bg-white dark:bg-[#111111] rounded-2xl p-6 border border-gray-100 dark:border-[#262626] shadow-sm">
 <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-100 dark:border-[#262626]">
 <div>
 <p className="text-[11px] text-gray-400 dark:text-[#737373] font-medium uppercase tracking-wider">Current Month</p>
 <h3 className="text-lg font-bold text-gray-900 dark:text-white">April 2026</h3>
 </div>
 <span className="text-[11px] font-semibold px-3 py-1 rounded-full border bg-green-50 dark:bg-green-500/10 text-green-700 border-green-200 dark:border-green-500/30">Paid</span>
 </div>
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
 <div>
 <p className="text-[11px] text-gray-400 dark:text-[#737373] font-medium uppercase mb-1">Net Pay</p>
 <p className="text-2xl font-bold text-green-600">₹68,500</p>
 </div>
 <div>
 <p className="text-[11px] text-gray-400 dark:text-[#737373] font-medium uppercase mb-1">Gross Pay</p>
 <p className="text-xl font-bold text-gray-900 dark:text-white">₹82,000</p>
 </div>
 <div>
 <p className="text-[11px] text-gray-400 dark:text-[#737373] font-medium uppercase mb-1">Deductions</p>
 <p className="text-xl font-bold text-red-500">₹13,500</p>
 </div>
 <div>
 <p className="text-[11px] text-gray-400 dark:text-[#737373] font-medium uppercase mb-1">Paid On</p>
 <p className="text-sm font-semibold text-gray-700 dark:text-[#cbd5e1]">30 April 2026</p>
 </div>
 </div>
 </div>

 {/* Breakdown Cards */}
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
 {[
 { icon: Wallet, label: "Earnings", value: "₹82,000", color: "bg-green-50 dark:bg-green-500/10 text-green-600" },
 { icon: TrendingDown, label: "Deductions", value: "₹13,500", color: "bg-red-50 dark:bg-red-500/10 text-red-600" },
 { icon: Receipt, label: "Tax Deducted", value: "₹8,000", color: "bg-orange-50 dark:bg-orange-500/10 text-orange-600" },
 { icon: Gift, label: "Benefits", value: "₹6,500", color: "bg-purple-50 dark:bg-purple-500/10 text-purple-600" },
 ].map((c) => (
 <div key={c.label} className="bg-white dark:bg-[#111111] rounded-2xl p-4 border border-gray-100 dark:border-[#262626] shadow-sm transition-shadow group">
 <div className={`w-9 h-9 rounded-xl ${c.color} flex items-center justify-center mb-2 transition-transform`}><c.icon size={18} strokeWidth={2.5} /></div>
 <p className="text-[11px] text-gray-500 dark:text-[#a1a1aa] font-medium">{c.label}</p>
 <h4 className="text-lg font-bold text-gray-900 dark:text-white">{c.value}</h4>
 </div>
 ))}
 </div>

 {/* Payslip Table + Detail */}
 <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5">
 {/* Table */}
 <div className="bg-white dark:bg-[#111111] rounded-2xl border border-gray-100 dark:border-[#262626] shadow-sm overflow-hidden">
 <div className="p-5 border-b border-gray-100 dark:border-[#262626]"><h3 className="font-bold text-gray-900 dark:text-white">Payslip History</h3></div>
 <div className="overflow-x-auto">
 <table className="w-full text-left border-collapse min-w-[600px]">
 <thead>
 <tr className="bg-gray-50 dark:bg-[#111111]/80 border-b border-gray-100 dark:border-[#262626]">
 {["Month", "Gross Pay", "Deductions", "Net Pay", "Paid On", "Status", ""].map((h) => (
 <th key={h} className="py-2.5 px-4 text-[11px] font-semibold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider">{h}</th>
 ))}
 </tr>
 </thead>
 <tbody className="divide-y divide-gray-50 dark:divide-[#262626]">
 {payslips.map((p) => (
 <tr key={p.month} className="hover:bg-gray-50 dark:hover:bg-[#181818] transition-colors">
 <td className="py-3.5 px-4 text-[13px] font-semibold text-gray-900 dark:text-white">{p.month}</td>
 <td className="py-3.5 px-4 text-[13px] text-gray-600 dark:text-[#a1a1aa]">{p.gross}</td>
 <td className="py-3.5 px-4 text-[13px] text-red-500">{p.deductions}</td>
 <td className="py-3.5 px-4 text-[13px] font-bold text-green-600">{p.net}</td>
 <td className="py-3.5 px-4 text-[12px] text-gray-500 dark:text-[#a1a1aa]">{p.paid}</td>
 <td className="py-3.5 px-4"><span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full border bg-green-50 dark:bg-green-500/10 text-green-700 border-green-200 dark:border-green-500/30">{p.status}</span></td>
 <td className="py-3.5 px-4">
 <div className="flex items-center gap-1">
 <button className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 dark:text-[#737373] hover:bg-gray-50 dark:hover:bg-[#181818] hover:text-blue-600 transition-colors"><Eye size={14} /></button>
 <button className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 dark:text-[#737373] hover:bg-gray-50 dark:hover:bg-[#181818] hover:text-blue-600 transition-colors"><Download size={14} /></button>
 </div>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>

 {/* Detail */}
 <div className="bg-white dark:bg-[#111111] rounded-2xl p-5 border border-gray-100 dark:border-[#262626] shadow-sm">
 <h3 className="font-bold text-gray-900 dark:text-white mb-4">April 2026 Breakdown</h3>
 <div className="mb-4">
 <p className="text-[11px] font-semibold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider mb-2">Earnings</p>
 <div className="space-y-2">
 {earnings.map((e) => (
 <div key={e.label} className="flex justify-between text-[13px]">
 <span className="text-gray-600 dark:text-[#a1a1aa]">{e.label}</span>
 <span className="font-semibold text-gray-900 dark:text-white">{e.amount}</span>
 </div>
 ))}
 <div className="flex justify-between text-[13px] pt-2 border-t border-gray-100 dark:border-[#262626] font-bold">
 <span className="text-gray-800 dark:text-[#e2e8f0]">Total Earnings</span>
 <span className="text-green-600">₹82,000</span>
 </div>
 </div>
 </div>
 <div>
 <p className="text-[11px] font-semibold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider mb-2">Deductions</p>
 <div className="space-y-2">
 {deductions.map((d) => (
 <div key={d.label} className="flex justify-between text-[13px]">
 <span className="text-gray-600 dark:text-[#a1a1aa]">{d.label}</span>
 <span className="font-semibold text-red-500">{d.amount}</span>
 </div>
 ))}
 <div className="flex justify-between text-[13px] pt-2 border-t border-gray-100 dark:border-[#262626] font-bold">
 <span className="text-gray-800 dark:text-[#e2e8f0]">Total Deductions</span>
 <span className="text-red-500">₹13,500</span>
 </div>
 </div>
 </div>
 <div className="flex justify-between text-[15px] mt-4 pt-4 border-t-2 border-gray-200 dark:border-[#262626] font-bold">
 <span className="text-gray-900 dark:text-white">Net Pay</span>
 <span className="text-green-600">₹68,500</span>
 </div>
 </div>
 </div>
 </div>
 );
}
