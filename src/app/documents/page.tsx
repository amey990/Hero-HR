"use client";

import { useState } from "react";
import {
 Search, FileText, Download, Eye, Bookmark, ChevronDown, Filter,
 FolderOpen, AlertCircle, Clock, CheckCircle, File, FileSpreadsheet, Link2
} from "lucide-react";

const featuredDocs = [
 { title: "Employee Handbook", category: "HR Policies", version: "v3.2", updated: "15 Apr 2026", status: "Read", icon: "📘" },
 { title: "Leave Policy", category: "Leave", version: "v2.5", updated: "28 Apr 2026", status: "Updated", icon: "🏖️" },
 { title: "Attendance Policy", category: "Attendance", version: "v1.9", updated: "10 Apr 2026", status: "Read", icon: "⏰" },
 { title: "Code of Conduct", category: "Compliance", version: "v2.1", updated: "22 Apr 2026", status: "Pending", icon: "📜" },
 { title: "Payroll Policy", category: "Payroll", version: "v1.6", updated: "23 Apr 2026", status: "Updated", icon: "💰" },
 { title: "IT Security Policy", category: "IT & Security", version: "v1.8", updated: "20 Apr 2026", status: "Pending", icon: "🔒" },
];

const pendingAck = [
 { title: "Code of Conduct v2.1", due: "5 May 2026", category: "Compliance" },
 { title: "IT Security Policy v1.8", due: "8 May 2026", category: "IT & Security" },
 { title: "Data Privacy Guidelines v1.3", due: "10 May 2026", category: "Compliance" },
];

const allDocuments = [
 { name: "Employee Handbook", desc: "Company culture, policies and guidelines", category: "HR Policies", type: "PDF", version: "v3.2", updated: "15 Apr 2026", publisher: "HR Team", status: "Read" },
 { name: "Leave Policy", desc: "Leave types, quotas and application rules", category: "Leave", type: "PDF", version: "v2.5", updated: "28 Apr 2026", publisher: "HR Team", status: "Updated" },
 { name: "Attendance Policy", desc: "Clock-in rules, grace period, WFH policy", category: "Attendance", type: "PDF", version: "v1.9", updated: "10 Apr 2026", publisher: "HR Team", status: "Read" },
 { name: "Code of Conduct", desc: "Workplace behavior and ethics guidelines", category: "Compliance", type: "PDF", version: "v2.1", updated: "22 Apr 2026", publisher: "Legal", status: "Pending" },
 { name: "Payroll Policy", desc: "Salary structure, deductions and disbursement", category: "Payroll", type: "PDF", version: "v1.6", updated: "23 Apr 2026", publisher: "Finance", status: "Updated" },
 { name: "IT Security Policy", desc: "Device usage, VPN and data security rules", category: "IT & Security", type: "PDF", version: "v1.8", updated: "20 Apr 2026", publisher: "IT Team", status: "Pending" },
 { name: "Remote Work Guidelines", desc: "WFH expectations and communication norms", category: "HR Policies", type: "DOCX", version: "v1.2", updated: "7 Apr 2026", publisher: "HR Team", status: "Updated" },
 { name: "Onboarding Checklist", desc: "New joiner tasks and document submission", category: "Onboarding", type: "XLSX", version: "v2.0", updated: "1 Mar 2026", publisher: "HR Team", status: "Read" },
 { name: "Expense Policy", desc: "Reimbursement rules and claim process", category: "Payroll", type: "PDF", version: "v1.4", updated: "15 Mar 2026", publisher: "Finance", status: "Read" },
 { name: "Data Privacy Guidelines", desc: "Employee data handling and GDPR compliance", category: "Compliance", type: "PDF", version: "v1.3", updated: "18 Apr 2026", publisher: "Legal", status: "Pending" },
 { name: "Travel Policy", desc: "Business travel rules and allowances", category: "HR Policies", type: "PDF", version: "v1.1", updated: "20 Feb 2026", publisher: "HR Team", status: "Read" },
 { name: "Performance Review Form", desc: "Self-assessment and manager feedback form", category: "Forms", type: "DOCX", version: "v1.5", updated: "5 Apr 2026", publisher: "HR Team", status: "Unread" },
];

const statusStyle: Record<string, string> = {
 Read: "bg-green-50 dark:bg-green-500/10 text-green-700 border-green-200 dark:border-green-500/30",
 Unread: "bg-gray-100 dark:bg-[#111111] text-gray-500 dark:text-[#a1a1aa] border-gray-200 dark:border-[#262626]",
 Updated: "bg-blue-50 dark:bg-blue-500/10 text-blue-700 border-blue-200 dark:border-blue-500/30",
 Pending: "bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 border-yellow-200 dark:border-yellow-500/30",
};

const typeIcon: Record<string, typeof FileText> = {
 PDF: FileText,
 DOCX: File,
 XLSX: FileSpreadsheet,
 Link: Link2,
};

const recentUpdates = [
 { title: "Leave Policy", time: "2 days ago" },
 { title: "Payroll Policy", time: "1 week ago" },
 { title: "Remote Work Guidelines", time: "3 weeks ago" },
];

export default function DocumentsPage() {
 const [search, setSearch] = useState("");

 const filtered = allDocuments.filter(
 (d) =>
 d.name.toLowerCase().includes(search.toLowerCase()) ||
 d.desc.toLowerCase().includes(search.toLowerCase()) ||
 d.category.toLowerCase().includes(search.toLowerCase())
 );

 return (
 <div className="space-y-6 pb-12">
 {/* Header */}
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
 <div>
 <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Document Center</h1>
 <p className="text-gray-500 dark:text-[#a1a1aa] mt-1 text-sm font-medium">Access company policies, guidelines, forms and HR resources.</p>
 </div>
 <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#262626] text-sm font-semibold text-gray-700 dark:text-[#cbd5e1] bg-white dark:bg-[#111111] hover:bg-gray-50 dark:bg-[#111111] dark:hover:bg-[#181818] transition-colors">
 <FileText size={16} /> Request Document
 </button>
 </div>

 {/* Summary Cards */}
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
 {[
 { icon: FolderOpen, label: "Total Documents", value: "86", color: "bg-blue-50 dark:bg-blue-500/10 text-blue-600" },
 { icon: FileText, label: "Policies", value: "24", color: "bg-green-50 dark:bg-green-500/10 text-green-600" },
 { icon: AlertCircle, label: "Pending Ack.", value: "3", color: "bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600" },
 { icon: Clock, label: "Recently Updated", value: "7", color: "bg-purple-50 dark:bg-purple-500/10 text-purple-600" },
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

 {/* Search + Filters */}
 <div className="bg-white dark:bg-[#111111] rounded-2xl p-4 border border-gray-100 dark:border-[#262626] shadow-sm flex flex-col md:flex-row items-stretch md:items-center gap-3">
 <div className="relative flex-1 min-w-0">
 <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-[#a1a1aa] dark:text-[#737373]" />
 <input
 type="text"
 placeholder="Search documents, policies or forms..."
 value={search}
 onChange={(e) => setSearch(e.target.value)}
 className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#262626] text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:text-[#737373] dark:placeholder:text-[#737373] dark:text-[#a1a1aa] dark:text-[#737373] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white dark:bg-[#111111]"
 />
 </div>
 {["Category", "Type", "Status"].map((f) => (
 <button key={f} className="flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#262626] text-sm font-medium text-gray-600 dark:text-[#a1a1aa] bg-white dark:bg-[#111111] hover:bg-gray-50 dark:bg-[#111111] dark:hover:bg-[#181818] min-w-[120px]">
 {f} <ChevronDown size={14} />
 </button>
 ))}
 <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700">
 <Filter size={14} /> Filter
 </button>
 </div>

 {/* Featured Docs */}
 <div>
 <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Featured Documents</h2>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
 {featuredDocs.map((doc) => (
 <div key={doc.title} className="bg-white dark:bg-[#111111] rounded-2xl p-5 border border-gray-100 dark:border-[#262626] shadow-sm hover:border-blue-100 transition-all group">
 <div className="flex items-center gap-3 mb-3">
 <span className="text-2xl">{doc.icon}</span>
 <div className="min-w-0 flex-1">
 <p className="text-[13px] font-bold text-gray-900 dark:text-white truncate">{doc.title}</p>
 <p className="text-[11px] text-gray-500 dark:text-[#a1a1aa]">{doc.category} · {doc.version}</p>
 </div>
 <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full border shrink-0 ${statusStyle[doc.status]}`}>{doc.status === "Pending" ? "Ack. Pending" : doc.status}</span>
 </div>
 <p className="text-[11px] text-gray-400 dark:text-[#737373] mb-3">Updated {doc.updated}</p>
 <div className="flex items-center gap-2">
 <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[12px] font-semibold text-blue-600 bg-blue-50 dark:bg-blue-500/10 hover:bg-blue-100 dark:bg-blue-50 transition-colors"><Eye size={13} /> View</button>
 <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[12px] font-semibold text-gray-600 dark:text-[#a1a1aa] bg-gray-50 dark:bg-[#111111] hover:bg-gray-100 dark:bg-[#111111] dark:hover:bg-[#181818] transition-colors"><Download size={13} /> Download</button>
 </div>
 </div>
 ))}
 </div>
 </div>

 {/* Pending Ack + Recent Updates */}
 <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5">
 {/* Pending */}
 <div className="bg-white dark:bg-[#111111] rounded-2xl p-5 border border-yellow-100 shadow-sm">
 <div className="flex items-center gap-2 mb-4">
 <AlertCircle size={16} className="text-yellow-600" />
 <h3 className="font-bold text-gray-900 dark:text-white">Acknowledgement Required</h3>
 </div>
 <div className="space-y-3">
 {pendingAck.map((d) => (
 <div key={d.title} className="flex items-center justify-between p-3 rounded-xl bg-yellow-50 dark:bg-yellow-500/10/50 border border-yellow-100 hover:bg-yellow-50 dark:bg-yellow-500/10 dark:hover:bg-yellow-50 dark:bg-yellow-500/100/20 transition-colors">
 <div>
 <p className="text-[13px] font-semibold text-gray-800 dark:text-[#e2e8f0]">{d.title}</p>
 <p className="text-[11px] text-gray-500 dark:text-[#a1a1aa]">{d.category} · Due by {d.due}</p>
 </div>
 <button className="px-3 py-1.5 rounded-lg bg-yellow-50 dark:bg-yellow-500/100 text-white text-[11px] font-semibold hover:bg-yellow-600 transition-colors shrink-0">
 Acknowledge
 </button>
 </div>
 ))}
 </div>
 </div>

 {/* Recent Updates */}
 <div className="bg-white dark:bg-[#111111] rounded-2xl p-5 border border-gray-100 dark:border-[#262626] shadow-sm">
 <h4 className="font-bold text-gray-900 dark:text-white text-[13px] mb-3">Recently Updated</h4>
 <div className="space-y-3">
 {recentUpdates.map((u) => (
 <div key={u.title} className="flex items-center gap-3 p-2.5 rounded-lg bg-gray-50 dark:bg-[#111111]/50 border border-gray-100 dark:border-[#262626]">
 <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 shrink-0"><Clock size={14} /></div>
 <div><p className="text-[12px] font-semibold text-gray-800 dark:text-[#e2e8f0]">{u.title}</p><p className="text-[10px] text-gray-400 dark:text-[#737373]">{u.time}</p></div>
 </div>
 ))}
 </div>
 </div>
 </div>

 {/* Documents Table */}
 <div className="bg-white dark:bg-[#111111] rounded-2xl border border-gray-100 dark:border-[#262626] shadow-sm overflow-hidden">
 <div className="p-5 border-b border-gray-100 dark:border-[#262626]"><h3 className="font-bold text-gray-900 dark:text-white">All Documents</h3></div>
 <div className="overflow-x-auto">
 <table className="w-full text-left border-collapse min-w-[900px]">
 <thead>
 <tr className="bg-gray-50 dark:bg-[#111111]/80 border-b border-gray-100 dark:border-[#262626]">
 {["Document", "Category", "Type", "Version", "Last Updated", "Published By", "Status", ""].map((h) => (
 <th key={h} className="py-2.5 px-4 text-[11px] font-semibold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider">{h}</th>
 ))}
 </tr>
 </thead>
 <tbody className="divide-y divide-gray-50 dark:divide-[#262626]">
 {filtered.map((doc) => {
 const TypeIcon = typeIcon[doc.type] || FileText;
 return (
 <tr key={doc.name} className="hover:bg-gray-50 dark:hover:bg-[#181818] transition-colors">
 <td className="py-3.5 px-4">
 <div className="flex items-center gap-3">
 <div className="w-9 h-9 rounded-lg bg-gray-50 dark:bg-[#111111] flex items-center justify-center text-gray-400 dark:text-[#737373] shrink-0"><TypeIcon size={16} /></div>
 <div className="min-w-0">
 <p className="text-[13px] font-semibold text-gray-900 dark:text-white truncate">{doc.name}</p>
 <p className="text-[10px] text-gray-400 dark:text-[#737373] truncate">{doc.desc}</p>
 </div>
 </div>
 </td>
 <td className="py-3.5 px-4 text-[12px] text-gray-600 dark:text-[#a1a1aa]">{doc.category}</td>
 <td className="py-3.5 px-4"><span className="text-[10px] font-semibold text-gray-500 dark:text-[#a1a1aa] bg-gray-100 dark:bg-[#111111] px-2 py-0.5 rounded">{doc.type}</span></td>
 <td className="py-3.5 px-4 text-[12px] font-medium text-gray-700 dark:text-[#cbd5e1]">{doc.version}</td>
 <td className="py-3.5 px-4 text-[12px] text-gray-500 dark:text-[#a1a1aa]">{doc.updated}</td>
 <td className="py-3.5 px-4 text-[12px] text-gray-500 dark:text-[#a1a1aa]">{doc.publisher}</td>
 <td className="py-3.5 px-4">
 <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${statusStyle[doc.status]}`}>
 {doc.status === "Pending" ? "Ack. Pending" : doc.status}
 </span>
 </td>
 <td className="py-3.5 px-4">
 <div className="flex items-center gap-1">
 <button className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 dark:text-[#737373] hover:bg-gray-50 dark:hover:bg-[#181818] hover:text-blue-600 transition-colors"><Eye size={14} /></button>
 <button className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 dark:text-[#737373] hover:bg-gray-50 dark:hover:bg-[#181818] hover:text-blue-600 transition-colors"><Download size={14} /></button>
 <button className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 dark:text-[#737373] hover:bg-yellow-50 dark:bg-yellow-500/10 dark:hover:bg-yellow-50 dark:bg-yellow-500/100/20 hover:text-yellow-600 transition-colors"><Bookmark size={14} /></button>
 </div>
 </td>
 </tr>
 );
 })}
 </tbody>
 </table>
 </div>
 </div>
 </div>
 );
}
