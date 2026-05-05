"use client";

import { useState } from "react";
import { 
  FileText, CheckCircle, FileClock, Clock, Search, Filter, 
  RefreshCw, Download, Plus, Upload, UploadCloud, MoreVertical, 
  Eye, Edit, Archive, Bell, File, FileCode, FileSpreadsheet,
  AlertCircle, ShieldCheck, ChevronDown, RotateCcw, Save, Check
} from "lucide-react";
import clsx from "clsx";

const mockDocuments = [
  { id: "DOC-1001", title: "Employee Handbook 2026", desc: "Comprehensive guide to company policies, benefits, and workplace rules.", category: "HR Policies", type: "PDF", version: "v2.0", assignedTo: "All Employees", publishedBy: "Priya Desai", lastUpdated: "01 May 2026", status: "Published", ack: "Required" },
  { id: "DOC-1002", title: "Q1 Financial Report", desc: "Internal financial summary and metrics for Q1 2026.", category: "Finance", type: "XLSX", version: "v1.1", assignedTo: "Department", publishedBy: "Vikram Singh", lastUpdated: "15 Apr 2026", status: "Published", ack: "Not Required" },
  { id: "DOC-1003", title: "Draft: Remote Work Policy", desc: "Updated guidelines for hybrid and remote work.", category: "HR Policies", type: "DOCX", version: "v1.0", assignedTo: "Specific Employees", publishedBy: "Priya Desai", lastUpdated: "04 May 2026", status: "Draft", ack: "Not Required" },
  { id: "DOC-1004", title: "Code of Conduct", desc: "Mandatory workplace ethics and behavior guidelines.", category: "Compliance", type: "PDF", version: "v2.1", assignedTo: "All Employees", publishedBy: "Legal Team", lastUpdated: "10 Jan 2026", status: "Updated", ack: "Pending" },
  { id: "DOC-1005", title: "Leave Application Form", desc: "Standard form for manual leave requests.", category: "Forms", type: "PDF", version: "v1.0", assignedTo: "All Employees", publishedBy: "HR Admin", lastUpdated: "12 Feb 2025", status: "Published", ack: "Not Required" },
  { id: "DOC-1006", title: "IT Security Policy", desc: "Data protection, password rules, and device management.", category: "IT & Security", type: "PDF", version: "v1.8", assignedTo: "All Employees", publishedBy: "IT Admin", lastUpdated: "05 Mar 2026", status: "Updated", ack: "Pending" },
  { id: "DOC-1007", title: "Old Travel Policy 2023", desc: "Outdated business travel reimbursement guidelines.", category: "HR Policies", type: "PDF", version: "v1.0", assignedTo: "All Employees", publishedBy: "Priya Desai", lastUpdated: "01 Jan 2023", status: "Archived", ack: "Not Required" },
  { id: "DOC-1008", title: "Data Privacy Guidelines", desc: "GDPR and local compliance rules for handling data.", category: "Compliance", type: "PDF", version: "v1.3", assignedTo: "All Employees", publishedBy: "Legal Team", lastUpdated: "20 Feb 2026", status: "Published", ack: "Pending" },
  { id: "DOC-1009", title: "Q2 Sales Targets", desc: "Sales department goals and commission structures.", category: "Sales", type: "XLSX", version: "v1.0", assignedTo: "Department", publishedBy: "Deepak Mehta", lastUpdated: "02 May 2026", status: "Published", ack: "Completed" },
  { id: "DOC-1010", title: "Onboarding Checklist", desc: "Required steps for new hires and managers.", category: "Onboarding", type: "DOCX", version: "v3.0", assignedTo: "HR Team", publishedBy: "Priya Desai", lastUpdated: "28 Apr 2026", status: "Published", ack: "Not Required" },
];

export default function DocumentManagementPage() {
  const kpis = [
    { label: "Total Documents", value: "86", sub: "Active in system", icon: FileText, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-500/10" },
    { label: "Published Policies", value: "24", sub: "Company-wide rules", icon: ShieldCheck, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
    { label: "Pending Ack.", value: "38", sub: "Employee signatures missing", icon: FileClock, color: "text-orange-600 dark:text-orange-400", bg: "bg-orange-50 dark:bg-orange-500/10" },
    { label: "Recently Updated", value: "7", sub: "Past 30 days", icon: Clock, color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-500/10" },
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Published": return "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400";
      case "Draft": return "bg-yellow-50 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-500";
      case "Archived": return "bg-gray-100 text-gray-700 dark:bg-[#262626] dark:text-gray-300";
      case "Updated": return "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400";
      default: return "bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getAckColor = (ack: string) => {
    switch(ack) {
      case "Required": return "bg-yellow-50 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-500 border border-yellow-200 dark:border-yellow-500/30";
      case "Completed": return "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30";
      case "Not Required": return "bg-gray-50 text-gray-600 dark:bg-[#181818] dark:text-gray-400 border border-gray-200 dark:border-[#262626]";
      case "Pending": return "bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400 border border-orange-200 dark:border-orange-500/30";
      default: return "bg-gray-50 text-gray-700 border border-gray-200";
    }
  };

  const getDocIcon = (type: string) => {
    switch(type) {
      case "PDF": return <File size={18} className="text-red-500" />;
      case "DOCX": return <FileText size={18} className="text-blue-500" />;
      case "XLSX": return <FileSpreadsheet size={18} className="text-emerald-500" />;
      default: return <File size={18} className="text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6 pb-10">
      
      {/* 1. Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0f172a] dark:text-[#f8fafc] tracking-tight">Document Management</h1>
          <p className="text-[#64748b] dark:text-[#a1a1aa] mt-1 text-[14px]">Upload, publish and track company documents and policy acknowledgements.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#ffffff] dark:bg-[#111111] border border-[#e5e7eb] dark:border-[#262626] rounded-xl text-sm font-semibold text-[#0f172a] dark:text-[#f8fafc] hover:bg-gray-50 dark:hover:bg-[#181818] transition-colors shadow-sm">
            <Download size={16} /> Export
          </button>
          <button 
            onClick={() => {
              const el = document.getElementById('upload-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm shadow-blue-500/20"
          >
            <Upload size={16} /> Upload Document
          </button>
        </div>
      </div>

      {/* 2. KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="bg-[#ffffff] dark:bg-[#111111] border border-[#e5e7eb] dark:border-[#262626] rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[13px] font-medium text-gray-500 dark:text-[#a1a1aa] mb-1">{kpi.label}</p>
                <h3 className="text-2xl font-bold text-[#0f172a] dark:text-[#f8fafc]">{kpi.value}</h3>
              </div>
              <div className={clsx("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 duration-300", kpi.bg, kpi.color)}>
                <kpi.icon size={20} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-[12px] font-medium text-gray-500 dark:text-gray-400">
              <span>{kpi.sub}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start">
        
        {/* Left Side: Upload + Filters + Table */}
        <div className="xl:col-span-3 space-y-6">
          
          {/* 3. Upload / Publish Document card */}
          <div id="upload-section" className="bg-[#ffffff] dark:bg-[#111111] border border-[#e5e7eb] dark:border-[#262626] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#e5e7eb] dark:border-[#262626]">
              <h2 className="text-[16px] font-bold text-[#0f172a] dark:text-[#f8fafc] flex items-center gap-2">
                <UploadCloud size={18} className="text-blue-500" /> Publish New Document
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-[13px] font-semibold text-gray-700 dark:text-[#a1a1aa] mb-1.5">Document Title <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="e.g. Employee Handbook 2026" className="w-full bg-[#f9fafb] dark:bg-[#181818] border border-[#e5e7eb] dark:border-[#262626] focus:border-blue-500/50 rounded-xl px-4 py-2.5 text-sm outline-none transition-all text-[#0f172a] dark:text-[#f8fafc] placeholder:text-gray-400" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-semibold text-gray-700 dark:text-[#a1a1aa] mb-1.5">Category <span className="text-red-500">*</span></label>
                    <select className="w-full bg-[#f9fafb] dark:bg-[#181818] border border-[#e5e7eb] dark:border-[#262626] focus:border-blue-500/50 rounded-xl px-4 py-2.5 text-sm font-medium outline-none text-[#0f172a] dark:text-[#f8fafc]">
                      <option value="">Select</option>
                      <option>HR Policies</option>
                      <option>Payroll</option>
                      <option>Attendance</option>
                      <option>Leave</option>
                      <option>IT & Security</option>
                      <option>Compliance</option>
                      <option>Onboarding</option>
                      <option>Forms</option>
                      <option>Announcements</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-gray-700 dark:text-[#a1a1aa] mb-1.5">Type & Version</label>
                    <div className="flex gap-2">
                      <select className="flex-1 bg-[#f9fafb] dark:bg-[#181818] border border-[#e5e7eb] dark:border-[#262626] focus:border-blue-500/50 rounded-xl px-2 py-2.5 text-sm font-medium outline-none text-[#0f172a] dark:text-[#f8fafc]">
                        <option>PDF</option>
                        <option>DOCX</option>
                        <option>XLSX</option>
                        <option>Link</option>
                      </select>
                      <input type="text" defaultValue="v1.0" className="w-16 bg-[#f9fafb] dark:bg-[#181818] border border-[#e5e7eb] dark:border-[#262626] focus:border-blue-500/50 rounded-xl px-2 py-2.5 text-sm font-medium outline-none text-center text-[#0f172a] dark:text-[#f8fafc]" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-semibold text-gray-700 dark:text-[#a1a1aa] mb-1.5">Assign To <span className="text-red-500">*</span></label>
                    <select className="w-full bg-[#f9fafb] dark:bg-[#181818] border border-[#e5e7eb] dark:border-[#262626] focus:border-blue-500/50 rounded-xl px-4 py-2.5 text-sm font-medium outline-none text-[#0f172a] dark:text-[#f8fafc]">
                      <option>All Employees</option>
                      <option>Department</option>
                      <option>Specific Employees</option>
                      <option>Location</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-gray-700 dark:text-[#a1a1aa] mb-1.5">Department</label>
                    <select className="w-full bg-[#f9fafb] dark:bg-[#181818] border border-[#e5e7eb] dark:border-[#262626] focus:border-blue-500/50 rounded-xl px-4 py-2.5 text-sm font-medium outline-none text-[#0f172a] dark:text-[#f8fafc]">
                      <option>All Departments</option>
                      <option>Human Resources</option>
                      <option>Engineering</option>
                      <option>Sales</option>
                      <option>Finance</option>
                      <option>Operations</option>
                      <option>Support</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 items-end">
                  <label className="flex items-start gap-2 cursor-pointer pt-3">
                    <input type="checkbox" className="mt-0.5 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <div>
                      <p className="text-[13px] font-bold text-[#0f172a] dark:text-[#f8fafc]">Acknowledgement Required</p>
                      <p className="text-[11px] text-gray-500 dark:text-[#a1a1aa]">Employees must sign.</p>
                    </div>
                  </label>
                  <div>
                    <label className="block text-[12px] font-medium text-gray-500 dark:text-[#a1a1aa] mb-1.5">Due Date (Optional)</label>
                    <input type="date" className="w-full bg-[#f9fafb] dark:bg-[#181818] border border-[#e5e7eb] dark:border-[#262626] focus:border-blue-500/50 rounded-xl px-4 py-2 text-sm outline-none text-[#0f172a] dark:text-[#f8fafc] [color-scheme:light] dark:[color-scheme:dark]" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[13px] font-semibold text-gray-700 dark:text-[#a1a1aa] mb-1.5">Description</label>
                  <textarea placeholder="Briefly describe the document contents..." className="w-full bg-[#f9fafb] dark:bg-[#181818] border border-[#e5e7eb] dark:border-[#262626] focus:border-blue-500/50 rounded-xl px-4 py-2.5 text-sm outline-none transition-all text-[#0f172a] dark:text-[#f8fafc] placeholder:text-gray-400 min-h-[80px] resize-none"></textarea>
                </div>
                
                <div>
                  <label className="block text-[13px] font-semibold text-gray-700 dark:text-[#a1a1aa] mb-1.5">File Upload</label>
                  <div className="border-2 border-dashed border-[#e5e7eb] dark:border-[#262626] bg-gray-50 dark:bg-[#181818] hover:bg-blue-50 dark:hover:bg-blue-500/5 hover:border-blue-300 dark:hover:border-blue-500/30 transition-colors rounded-xl flex flex-col items-center justify-center py-6 cursor-pointer">
                    <UploadCloud size={28} className="text-blue-500 mb-2" />
                    <p className="text-[13px] font-bold text-[#0f172a] dark:text-[#f8fafc]">Click or drag file to this area to upload</p>
                    <p className="text-[11px] text-gray-500 dark:text-[#a1a1aa] mt-1 text-center px-4">Upload PDF, DOCX, XLSX, PNG or JPG.<br/>Max file size will be configured later.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-5 border-t border-[#e5e7eb] dark:border-[#262626]">
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-white dark:bg-[#111111] hover:bg-gray-50 dark:hover:bg-[#181818] border border-[#e5e7eb] dark:border-[#262626] text-gray-700 dark:text-gray-300 rounded-xl text-sm font-semibold transition-colors">
                <RotateCcw size={16} /> Reset
              </button>
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-white dark:bg-[#111111] hover:bg-gray-50 dark:hover:bg-[#181818] border border-[#e5e7eb] dark:border-[#262626] text-[#0f172a] dark:text-[#f8fafc] rounded-xl text-sm font-semibold transition-colors">
                <Save size={16} /> Save as Draft
              </button>
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm shadow-blue-500/20">
                <Check size={16} /> Publish Document
              </button>
            </div>
          </div>

          {/* 4. Filters toolbar */}
          <div className="bg-[#ffffff] dark:bg-[#111111] border border-[#e5e7eb] dark:border-[#262626] rounded-2xl p-4 shadow-sm">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative group">
                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Search documents, policies or forms..."
                  className="w-full bg-gray-50 dark:bg-[#181818] border border-transparent focus:border-blue-500/30 focus:bg-[#ffffff] dark:focus:bg-[#111111] rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none transition-all duration-200 text-[#0f172a] dark:text-[#f8fafc] placeholder:text-gray-400 dark:placeholder:text-[#737373]"
                />
              </div>
              <div className="flex flex-wrap xl:flex-nowrap gap-3">
                <select className="bg-gray-50 dark:bg-[#181818] border border-transparent focus:border-blue-500/30 focus:bg-[#ffffff] dark:focus:bg-[#111111] rounded-xl px-4 py-2.5 text-sm font-medium outline-none transition-all duration-200 text-[#0f172a] dark:text-[#f8fafc] w-32">
                  <option value="">Category</option>
                  <option>HR Policies</option>
                  <option>Compliance</option>
                  <option>IT & Security</option>
                </select>
                <select className="bg-gray-50 dark:bg-[#181818] border border-transparent focus:border-blue-500/30 focus:bg-[#ffffff] dark:focus:bg-[#111111] rounded-xl px-4 py-2.5 text-sm font-medium outline-none transition-all duration-200 text-[#0f172a] dark:text-[#f8fafc] w-24 hidden sm:block">
                  <option value="">Type</option>
                  <option>PDF</option>
                  <option>DOCX</option>
                  <option>XLSX</option>
                </select>
                <select className="bg-gray-50 dark:bg-[#181818] border border-transparent focus:border-blue-500/30 focus:bg-[#ffffff] dark:focus:bg-[#111111] rounded-xl px-4 py-2.5 text-sm font-medium outline-none transition-all duration-200 text-[#0f172a] dark:text-[#f8fafc] w-28">
                  <option value="">Status</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                  <option value="updated">Updated</option>
                </select>
                <select className="bg-gray-50 dark:bg-[#181818] border border-transparent focus:border-blue-500/30 focus:bg-[#ffffff] dark:focus:bg-[#111111] rounded-xl px-4 py-2.5 text-sm font-medium outline-none transition-all duration-200 text-[#0f172a] dark:text-[#f8fafc] w-40">
                  <option value="">Acknowledgement</option>
                  <option value="req">Required</option>
                  <option value="not">Not Required</option>
                  <option value="pending">Pending</option>
                  <option value="comp">Completed</option>
                </select>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-[#262626] dark:hover:bg-[#333333] rounded-xl text-sm font-semibold text-[#0f172a] dark:text-[#f8fafc] transition-colors">
                  <Filter size={16} /> Filter
                </button>
                <button className="flex items-center justify-center w-10 py-2.5 hover:bg-gray-100 dark:hover:bg-[#262626] rounded-xl text-gray-500 dark:text-[#a1a1aa] transition-colors" title="Reset">
                  <RefreshCw size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* 5. Documents table */}
          <div className="bg-[#ffffff] dark:bg-[#111111] border border-[#e5e7eb] dark:border-[#262626] rounded-2xl shadow-sm overflow-hidden flex flex-col">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-[#181818] border-b border-[#e5e7eb] dark:border-[#262626]">
                    <th className="py-4 px-5 text-[12px] font-bold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider whitespace-nowrap min-w-[250px]">Document Info</th>
                    <th className="py-4 px-5 text-[12px] font-bold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider whitespace-nowrap">Category & Assigned</th>
                    <th className="py-4 px-5 text-[12px] font-bold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider whitespace-nowrap">Status & Update</th>
                    <th className="py-4 px-5 text-[12px] font-bold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider whitespace-nowrap">Acknowledgement</th>
                    <th className="py-4 px-5 text-[12px] font-bold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider text-right whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e5e7eb] dark:divide-[#262626]">
                  {mockDocuments.map((doc, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-[#141414] transition-colors">
                      <td className="py-4 px-5">
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 shrink-0">
                            {getDocIcon(doc.type)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-0.5">
                              <p className="text-[14px] font-semibold text-[#0f172a] dark:text-[#f8fafc]">{doc.title}</p>
                              <span className="text-[10px] font-bold text-gray-400 bg-gray-100 dark:bg-[#262626] dark:text-gray-300 px-1.5 py-0.5 rounded">{doc.version}</span>
                            </div>
                            <p className="text-[12px] text-gray-500 dark:text-[#a1a1aa] line-clamp-1" title={doc.desc}>{doc.desc}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-5">
                        <p className="text-[13px] font-semibold text-[#0f172a] dark:text-[#f8fafc] whitespace-nowrap">{doc.category}</p>
                        <p className="text-[12px] text-gray-500 dark:text-[#a1a1aa] whitespace-nowrap">To: {doc.assignedTo}</p>
                      </td>
                      <td className="py-4 px-5">
                        <div className="flex flex-col items-start gap-1.5">
                          <span className={clsx("inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold whitespace-nowrap", getStatusColor(doc.status))}>
                            {doc.status}
                          </span>
                          <p className="text-[11px] text-gray-500 dark:text-[#a1a1aa] whitespace-nowrap">Upd: {doc.lastUpdated}</p>
                        </div>
                      </td>
                      <td className="py-4 px-5">
                        <span className={clsx("inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold whitespace-nowrap", getAckColor(doc.ack))}>
                          {doc.ack}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-1.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors" title="View/Download"><Eye size={16} /></button>
                          <button className="p-1.5 text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-500/10 rounded-lg transition-colors" title="Edit Properties"><Edit size={16} /></button>
                          <button className="p-1.5 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-lg transition-colors" title="Replace Version"><UploadCloud size={16} /></button>
                          <button className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors" title="Archive"><Archive size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Side: Tracking, Updates, Categories */}
        <div className="xl:col-span-1 space-y-6">
          
          {/* 6. Acknowledgement tracking card */}
          <div className="bg-[#ffffff] dark:bg-[#111111] border border-[#e5e7eb] dark:border-[#262626] rounded-2xl shadow-sm p-5">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
                <FileClock size={16} />
              </div>
              <h2 className="text-[16px] font-bold text-[#0f172a] dark:text-[#f8fafc]">Acknowledgement Progress</h2>
            </div>
            
            <div className="space-y-5">
              {/* Doc 1 */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <p className="text-[13px] font-bold text-[#0f172a] dark:text-[#f8fafc] leading-tight">Code of Conduct v2.1</p>
                    <p className="text-[11px] text-gray-500 dark:text-[#a1a1aa] mt-0.5">38 Pending / 180 Assigned</p>
                  </div>
                  <p className="text-[13px] font-bold text-emerald-600 dark:text-emerald-400">78%</p>
                </div>
                <div className="w-full h-1.5 bg-gray-100 dark:bg-[#262626] rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>

              {/* Doc 2 */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <p className="text-[13px] font-bold text-[#0f172a] dark:text-[#f8fafc] leading-tight">IT Security Policy v1.8</p>
                    <p className="text-[11px] text-gray-500 dark:text-[#a1a1aa] mt-0.5">29 Pending / 180 Assigned</p>
                  </div>
                  <p className="text-[13px] font-bold text-emerald-600 dark:text-emerald-400">83%</p>
                </div>
                <div className="w-full h-1.5 bg-gray-100 dark:bg-[#262626] rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '83%' }}></div>
                </div>
              </div>

              {/* Doc 3 */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <p className="text-[13px] font-bold text-[#0f172a] dark:text-[#f8fafc] leading-tight">Data Privacy Guidelines v1.3</p>
                    <p className="text-[11px] text-gray-500 dark:text-[#a1a1aa] mt-0.5">50 Pending / 180 Assigned</p>
                  </div>
                  <p className="text-[13px] font-bold text-orange-500 dark:text-orange-400">72%</p>
                </div>
                <div className="w-full h-1.5 bg-gray-100 dark:bg-[#262626] rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: '72%' }}></div>
                </div>
              </div>
            </div>

            <div className="pt-5 mt-5 border-t border-[#e5e7eb] dark:border-[#262626]">
              <button 
                onClick={() => alert("Reminders sent to all pending employees.")}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-50 dark:bg-blue-500/10 hover:bg-blue-100 dark:hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-xl text-sm font-semibold transition-colors"
              >
                <Bell size={16} /> Send Reminders
              </button>
            </div>
          </div>

          {/* 7. Recently updated documents card */}
          <div className="bg-[#ffffff] dark:bg-[#111111] border border-[#e5e7eb] dark:border-[#262626] rounded-2xl shadow-sm p-5">
            <h2 className="text-[14px] font-bold text-[#0f172a] dark:text-[#f8fafc] mb-4 flex items-center gap-2">
              <Clock size={16} className="text-gray-400" /> Recently Updated
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                <div>
                  <p className="text-[13px] font-bold text-[#0f172a] dark:text-[#f8fafc] leading-tight">Leave Policy</p>
                  <p className="text-[11px] text-gray-500 dark:text-[#a1a1aa] mt-0.5">Updated 2 days ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 mt-1.5 shrink-0" />
                <div>
                  <p className="text-[13px] font-bold text-[#0f172a] dark:text-[#f8fafc] leading-tight">Payroll Policy</p>
                  <p className="text-[11px] text-gray-500 dark:text-[#a1a1aa] mt-0.5">Updated 1 week ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 mt-1.5 shrink-0" />
                <div>
                  <p className="text-[13px] font-bold text-[#0f172a] dark:text-[#f8fafc] leading-tight">Remote Work Guidelines</p>
                  <p className="text-[11px] text-gray-500 dark:text-[#a1a1aa] mt-0.5">Updated 3 weeks ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 mt-1.5 shrink-0" />
                <div>
                  <p className="text-[13px] font-bold text-[#0f172a] dark:text-[#f8fafc] leading-tight">Employee Handbook</p>
                  <p className="text-[11px] text-gray-500 dark:text-[#a1a1aa] mt-0.5">Updated 1 month ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* 8. Document categories card */}
          <div className="bg-[#ffffff] dark:bg-[#111111] border border-[#e5e7eb] dark:border-[#262626] rounded-2xl shadow-sm p-5">
            <h2 className="text-[14px] font-bold text-[#0f172a] dark:text-[#f8fafc] mb-4 flex items-center gap-2">
              <FileText size={16} className="text-gray-400" /> Categories Overview
            </h2>
            <div className="space-y-3">
              {[
                { label: "HR Policies", count: 18 },
                { label: "Compliance", count: 15 },
                { label: "Forms", count: 14 },
                { label: "IT & Security", count: 12 },
                { label: "Leave", count: 10 },
                { label: "Payroll", count: 9 },
                { label: "Attendance", count: 8 },
              ].map((cat, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-[#181818] transition-colors group cursor-pointer">
                  <p className="text-[13px] font-semibold text-gray-700 dark:text-[#a1a1aa] group-hover:text-[#0f172a] dark:group-hover:text-[#f8fafc] transition-colors">{cat.label}</p>
                  <span className="text-[11px] font-bold text-gray-500 bg-gray-100 dark:bg-[#262626] px-2 py-0.5 rounded-full">{cat.count}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
