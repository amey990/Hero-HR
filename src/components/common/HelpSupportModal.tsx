"use client";

import { useState } from "react";
import { X, UploadCloud, File, AlertCircle } from "lucide-react";

interface HelpSupportModalProps {
 isOpen: boolean;
 onClose: () => void;
}

const CATEGORIES = [
 "Dashboard",
 "Employees - All Employees",
 "Employees - My Team",
 "Employees - Organization Chart",
 "Attendance - Overview",
 "Attendance - Calendar",
 "Leave - Apply Leave",
 "Leave - Leave Balance",
 "Leave - Leave Calendar",
 "Leave - Holiday Calendar",
 "Leave - Team on Leave",
 "Salary - Payslips",
 "Salary - Loans & Advances",
 "Salary - Reimbursements",
 "Salary - Salary Revision",
 "Document Center",
 "Analytics",
 "General / Other",
];

const PRIORITIES = ["Low", "Medium", "High", "Critical"];

export default function HelpSupportModal({ isOpen, onClose }: HelpSupportModalProps) {
 const [formData, setFormData] = useState({
 category: "",
 subject: "",
 description: "",
 priority: "Medium",
 });

 if (!isOpen) return null;

 const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault();
 console.log("Support Request Submitted:", formData);
 onClose();
 };

 return (
 <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
 {/* Backdrop */}
 <div 
 className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity"
 onClick={onClose}
 />

 {/* Modal */}
 <div className="relative w-full max-w-lg bg-white dark:bg-[#111111] rounded-2xl shadow-xl border border-gray-100 dark:border-[#262626] overflow-hidden">
 {/* Header */}
 <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-[#262626]">
 <div>
 <h2 className="text-lg font-bold text-gray-900 dark:text-white">Raise Support Request</h2>
 <p className="text-sm text-gray-500 dark:text-[#a1a1aa] mt-0.5">Tell us what you need help with.</p>
 </div>
 <button 
 onClick={onClose}
 className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-slate-300 hover:bg-gray-50 dark:hover:bg-[#181818] rounded-xl transition-colors"
 >
 <X size={20} />
 </button>
 </div>

 {/* Form */}
 <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
 {/* Category */}
 <div>
 <label className="block text-sm font-semibold text-gray-700 dark:text-[#cbd5e1] mb-1.5">
 Category <span className="text-red-500">*</span>
 </label>
 <select
 required
 value={formData.category}
 onChange={(e) => setFormData({ ...formData, category: e.target.value })}
 className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#111111] border border-transparent focus:border-blue-200 dark:focus:border-blue-500/50 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-blue-50 dark:focus:ring-blue-500/10 rounded-xl text-sm text-gray-900 dark:text-white outline-none transition-all cursor-pointer"
 >
 <option value="" disabled className="text-gray-400">Select a category...</option>
 {CATEGORIES.map((c) => (
 <option key={c} value={c}>{c}</option>
 ))}
 </select>
 </div>

 {/* Subject */}
 <div>
 <label className="block text-sm font-semibold text-gray-700 dark:text-[#cbd5e1] mb-1.5">
 Subject <span className="text-red-500">*</span>
 </label>
 <input
 required
 type="text"
 placeholder="Brief summary of the issue"
 value={formData.subject}
 onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
 className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#111111] border border-transparent focus:border-blue-200 dark:focus:border-blue-500/50 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-blue-50 dark:focus:ring-blue-500/10 rounded-xl text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-[#737373] outline-none transition-all"
 />
 </div>

 {/* Priority */}
 <div>
 <label className="block text-sm font-semibold text-gray-700 dark:text-[#cbd5e1] mb-1.5">
 Priority <span className="text-red-500">*</span>
 </label>
 <select
 required
 value={formData.priority}
 onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
 className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#111111] border border-transparent focus:border-blue-200 dark:focus:border-blue-500/50 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-blue-50 dark:focus:ring-blue-500/10 rounded-xl text-sm text-gray-900 dark:text-white outline-none transition-all cursor-pointer"
 >
 {PRIORITIES.map((p) => (
 <option key={p} value={p}>{p}</option>
 ))}
 </select>
 </div>

 {/* Description */}
 <div>
 <label className="block text-sm font-semibold text-gray-700 dark:text-[#cbd5e1] mb-1.5">
 Description <span className="text-red-500">*</span>
 </label>
 <textarea
 required
 rows={4}
 placeholder="Provide details about your issue or request..."
 value={formData.description}
 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
 className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#111111] border border-transparent focus:border-blue-200 dark:focus:border-blue-500/50 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-blue-50 dark:focus:ring-blue-500/10 rounded-xl text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-[#737373] outline-none transition-all resize-none"
 />
 </div>

 {/* Attachments */}
 <div>
 <label className="block text-sm font-semibold text-gray-700 dark:text-[#cbd5e1] mb-1.5">
 Attachments
 </label>
 <div className="w-full border-2 border-dashed border-gray-200 dark:border-[#262626] rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 dark:hover:bg-[#181818]/50 transition-colors cursor-pointer">
 <div className="w-10 h-10 bg-blue-50 dark:bg-blue-500/10 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mb-3">
 <UploadCloud size={20} />
 </div>
 <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">Click to upload or drag and drop</p>
 <p className="text-xs text-gray-500 dark:text-[#a1a1aa]">Attach up to 3 files. PDF, PNG, JPG or DOCX supported.</p>
 </div>
 </div>
 </form>

 {/* Footer */}
 <div className="px-6 py-4 border-t border-gray-100 dark:border-[#262626] flex items-center justify-end gap-3 bg-gray-50/50 dark:bg-[#0a0a0a]/50">
 <button 
 type="button" 
 onClick={onClose}
 className="px-5 py-2.5 text-sm font-semibold text-gray-700 dark:text-[#cbd5e1] hover:bg-gray-100 dark:hover:bg-[#181818] rounded-xl transition-colors"
 >
 Cancel
 </button>
 <button 
 type="submit"
 onClick={handleSubmit}
 className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-colors"
 >
 Submit Request
 </button>
 </div>
 </div>
 </div>
 );
}
