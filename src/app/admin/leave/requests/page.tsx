"use client";

import { useState } from "react";
import { 
  FileClock, CheckCircle, XCircle, Users, Search, Filter, 
  RefreshCw, Download, Eye, Check, X,
  Calendar, FileText, AlertCircle, CalendarDays, User, Paperclip, AlertTriangle
} from "lucide-react";
import clsx from "clsx";

const mockLeaves = [
  { id: "LR-3041", empName: "Priya Desai", empId: "EMP-1001", dept: "Human Resources", leaveType: "Sick Leave", dateRange: "29 Apr 2026 - 30 Apr 2026", days: 2, reason: "Viral fever and body ache. Doctor advised 2 days rest.", appliedOn: "28 Apr 2026", status: "Pending", balanceBefore: 8, balanceAfter: 6, handover: "None", attachment: true, conflict: false },
  { id: "LR-3042", empName: "Rahul Sharma", empId: "EMP-1002", dept: "Engineering", leaveType: "Casual Leave", dateRange: "05 May 2026 - 06 May 2026", days: 2, reason: "Attending a family function out of station.", appliedOn: "27 Apr 2026", status: "Approved", balanceBefore: 12, balanceAfter: 10, handover: "Sneha Iyer", attachment: false, conflict: true },
  { id: "LR-3043", empName: "Neha Patel", empId: "EMP-1003", dept: "Finance", leaveType: "Earned Leave", dateRange: "10 May 2026 - 15 May 2026", days: 6, reason: "Pre-planned family vacation.", appliedOn: "25 Apr 2026", status: "Pending", balanceBefore: 15, balanceAfter: 9, handover: "Vikram Singh", attachment: false, conflict: false },
  { id: "LR-3044", empName: "Rohan Verma", empId: "EMP-1004", dept: "Sales", leaveType: "Sick Leave", dateRange: "27 Apr 2026", days: 1, reason: "Severe migraine.", appliedOn: "27 Apr 2026", status: "Approved", balanceBefore: 5, balanceAfter: 4, handover: "Anjali Gupta", attachment: false, conflict: false },
  { id: "LR-3045", empName: "Sneha Iyer", empId: "EMP-1005", dept: "Engineering", leaveType: "Casual Leave", dateRange: "02 May 2026", days: 1, reason: "Personal bank work.", appliedOn: "28 Apr 2026", status: "Pending", balanceBefore: 4, balanceAfter: 3, handover: "Alena Gouse", attachment: false, conflict: false },
  { id: "LR-3046", empName: "Karan Singh", empId: "EMP-1006", dept: "Operations", leaveType: "Unpaid Leave", dateRange: "15 May 2026 - 20 May 2026", days: 6, reason: "Extended leave required for personal reasons, no balance left.", appliedOn: "26 Apr 2026", status: "Rejected", balanceBefore: 0, balanceAfter: 0, handover: "Aman Gupta", attachment: false, conflict: false },
  { id: "LR-3047", empName: "Anjali Gupta", empId: "EMP-1007", dept: "Sales", leaveType: "Comp Off", dateRange: "03 May 2026", days: 1, reason: "Comp off for working on last Saturday.", appliedOn: "28 Apr 2026", status: "Pending", balanceBefore: 2, balanceAfter: 1, handover: "None", attachment: false, conflict: true },
  { id: "LR-3048", empName: "Vikram Singh", empId: "EMP-1008", dept: "Finance", leaveType: "Casual Leave", dateRange: "29 Apr 2026", days: 1, reason: "Attending PTM at child's school.", appliedOn: "28 Apr 2026", status: "Pending", balanceBefore: 7, balanceAfter: 6, handover: "Neha Patel", attachment: false, conflict: false },
  { id: "LR-3049", empName: "Miracle Vetrovs", empId: "EMP-1009", dept: "Support", leaveType: "Sick Leave", dateRange: "24 Apr 2026 - 25 Apr 2026", days: 2, reason: "Food poisoning.", appliedOn: "24 Apr 2026", status: "Approved", balanceBefore: 10, balanceAfter: 8, handover: "Shift Lead", attachment: true, conflict: false },
  { id: "LR-3050", empName: "Alena Gouse", empId: "EMP-1010", dept: "Engineering", leaveType: "Earned Leave", dateRange: "01 Jun 2026 - 10 Jun 2026", days: 10, reason: "Sister's wedding preparations.", appliedOn: "20 Apr 2026", status: "Approved", balanceBefore: 18, balanceAfter: 8, handover: "Rahul Sharma", attachment: false, conflict: false },
];

export default function LeaveRequestsPage() {
  const [selectedReq, setSelectedReq] = useState(mockLeaves[0]);

  const kpis = [
    { label: "Pending Requests", value: "12", sub: "Require action", icon: FileClock, color: "text-orange-600 dark:text-orange-400", bg: "bg-orange-50 dark:bg-orange-500/10" },
    { label: "Approved This Month", value: "36", sub: "Successfully processed", icon: CheckCircle, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
    { label: "Rejected This Month", value: "4", sub: "Declined applications", icon: XCircle, color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-500/10" },
    { label: "On Leave Today", value: "18", sub: "Across all departments", icon: Users, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-500/10" },
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Pending": return "bg-yellow-50 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-500";
      case "Approved": return "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400";
      case "Rejected": return "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400";
      case "Cancelled": return "bg-gray-100 text-gray-700 dark:bg-[#262626] dark:text-gray-300";
      default: return "bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2);
  };

  const handleAction = (action: string) => {
    alert(`${action} leave request ${selectedReq.id}`);
  };

  return (
    <div className="space-y-6 pb-10">
      
      {/* 1. Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0f172a] dark:text-[#f8fafc] tracking-tight">Leave Requests</h1>
          <p className="text-[#64748b] dark:text-[#a1a1aa] mt-1 text-[14px]">Review, approve or reject employee leave applications.</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="bg-[#ffffff] dark:bg-[#111111] border border-[#e5e7eb] dark:border-[#262626] rounded-xl px-4 py-2.5 text-sm font-semibold outline-none transition-all duration-200 text-[#0f172a] dark:text-[#f8fafc] shadow-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-[#181818]">
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Quarter</option>
            <option>Custom Range...</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#ffffff] dark:bg-[#111111] border border-[#e5e7eb] dark:border-[#262626] rounded-xl text-sm font-semibold text-[#0f172a] dark:text-[#f8fafc] hover:bg-gray-50 dark:hover:bg-[#181818] transition-colors shadow-sm">
            <Download size={16} /> Export
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
        
        {/* Left Side: Toolbar + Table */}
        <div className="xl:col-span-3 space-y-6">
          
          {/* 3. Filters toolbar */}
          <div className="bg-[#ffffff] dark:bg-[#111111] border border-[#e5e7eb] dark:border-[#262626] rounded-2xl p-4 shadow-sm">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative group">
                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Search employee, leave type or request ID..."
                  className="w-full bg-gray-50 dark:bg-[#181818] border border-transparent focus:border-blue-500/30 focus:bg-[#ffffff] dark:focus:bg-[#111111] rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none transition-all duration-200 text-[#0f172a] dark:text-[#f8fafc] placeholder:text-gray-400 dark:placeholder:text-[#737373]"
                />
              </div>
              <div className="flex flex-wrap xl:flex-nowrap gap-3">
                <select className="bg-gray-50 dark:bg-[#181818] border border-transparent focus:border-blue-500/30 focus:bg-[#ffffff] dark:focus:bg-[#111111] rounded-xl px-4 py-2.5 text-sm font-medium outline-none transition-all duration-200 text-[#0f172a] dark:text-[#f8fafc]">
                  <option value="">Department</option>
                  <option value="hr">Human Resources</option>
                  <option value="eng">Engineering</option>
                  <option value="sales">Sales</option>
                </select>
                <select className="bg-gray-50 dark:bg-[#181818] border border-transparent focus:border-blue-500/30 focus:bg-[#ffffff] dark:focus:bg-[#111111] rounded-xl px-4 py-2.5 text-sm font-medium outline-none transition-all duration-200 text-[#0f172a] dark:text-[#f8fafc]">
                  <option value="">Leave Type</option>
                  <option value="casual">Casual Leave</option>
                  <option value="sick">Sick Leave</option>
                  <option value="earned">Earned Leave</option>
                  <option value="comp">Comp Off</option>
                  <option value="unpaid">Unpaid Leave</option>
                </select>
                <select className="bg-gray-50 dark:bg-[#181818] border border-transparent focus:border-blue-500/30 focus:bg-[#ffffff] dark:focus:bg-[#111111] rounded-xl px-4 py-2.5 text-sm font-medium outline-none transition-all duration-200 text-[#0f172a] dark:text-[#f8fafc]">
                  <option value="">Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
                <select className="bg-gray-50 dark:bg-[#181818] border border-transparent focus:border-blue-500/30 focus:bg-[#ffffff] dark:focus:bg-[#111111] rounded-xl px-4 py-2.5 text-sm font-medium outline-none transition-all duration-200 text-[#0f172a] dark:text-[#f8fafc] hidden lg:block">
                  <option value="">Date Range</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-[#262626] dark:hover:bg-[#333333] rounded-xl text-sm font-semibold text-[#0f172a] dark:text-[#f8fafc] transition-colors">
                  <Filter size={16} /> Filter
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-[#262626] rounded-xl text-sm font-semibold text-gray-500 dark:text-[#a1a1aa] transition-colors">
                  <RefreshCw size={16} /> Reset
                </button>
              </div>
            </div>
          </div>

          {/* 4. Leave requests table */}
          <div className="bg-[#ffffff] dark:bg-[#111111] border border-[#e5e7eb] dark:border-[#262626] rounded-2xl shadow-sm overflow-hidden flex flex-col">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-[#181818] border-b border-[#e5e7eb] dark:border-[#262626]">
                    <th className="py-4 px-5 text-[12px] font-bold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider whitespace-nowrap">Employee</th>
                    <th className="py-4 px-5 text-[12px] font-bold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider whitespace-nowrap">Leave Details</th>
                    <th className="py-4 px-5 text-[12px] font-bold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider whitespace-nowrap">Duration</th>
                    <th className="py-4 px-5 text-[12px] font-bold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider whitespace-nowrap">Status</th>
                    <th className="py-4 px-5 text-[12px] font-bold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider text-right whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e5e7eb] dark:divide-[#262626]">
                  {mockLeaves.map((leave) => (
                    <tr 
                      key={leave.id} 
                      onClick={() => setSelectedReq(leave)}
                      className={clsx(
                        "transition-colors cursor-pointer",
                        selectedReq.id === leave.id 
                          ? "bg-blue-50/50 dark:bg-blue-500/10" 
                          : "hover:bg-gray-50/50 dark:hover:bg-[#141414]"
                      )}
                    >
                      <td className="py-3 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                            {getInitials(leave.empName)}
                          </div>
                          <div>
                            <p className="text-[14px] font-semibold text-[#0f172a] dark:text-[#f8fafc] whitespace-nowrap">{leave.empName}</p>
                            <p className="text-[12px] text-gray-500 dark:text-[#a1a1aa]">{leave.dept}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-5">
                        <div className="flex items-center gap-2">
                          <p className="text-[13px] font-bold text-[#0f172a] dark:text-[#f8fafc] whitespace-nowrap">{leave.leaveType}</p>
                          {leave.attachment && <Paperclip size={12} className="text-gray-400" />}
                        </div>
                        <p className="text-[12px] text-gray-500 dark:text-[#a1a1aa] whitespace-nowrap">{leave.id}</p>
                      </td>
                      <td className="py-3 px-5">
                        <p className="text-[13px] text-[#0f172a] dark:text-[#f8fafc] whitespace-nowrap">{leave.dateRange}</p>
                        <p className="text-[12px] font-medium text-gray-500 dark:text-[#a1a1aa] whitespace-nowrap">{leave.days} Day{leave.days > 1 ? 's' : ''}</p>
                      </td>
                      <td className="py-3 px-5">
                        <span className={clsx("inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold whitespace-nowrap", getStatusColor(leave.status))}>
                          {leave.status}
                        </span>
                        <p className="text-[11px] text-gray-400 dark:text-[#737373] mt-1 whitespace-nowrap">On {leave.appliedOn}</p>
                      </td>
                      <td className="py-3 px-5 text-right">
                        <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                          <button className="p-1.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors" title="View"><Eye size={16} /></button>
                          {leave.status === "Pending" && (
                            <>
                              <button onClick={() => alert(`Approve ${leave.id}`)} className="p-1.5 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-lg transition-colors" title="Approve"><Check size={16} /></button>
                              <button onClick={() => alert(`Reject ${leave.id}`)} className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors" title="Reject"><X size={16} /></button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Side: Details, Conflict, Calendar, Policy */}
        <div className="xl:col-span-1 space-y-6">
          
          {/* 5. Leave Review Panel */}
          <div className="bg-[#ffffff] dark:bg-[#111111] border border-[#e5e7eb] dark:border-[#262626] rounded-2xl shadow-sm p-6 sticky top-20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[16px] font-bold text-[#0f172a] dark:text-[#f8fafc]">Leave Review</h2>
              <span className={clsx("inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold", getStatusColor(selectedReq.status))}>
                {selectedReq.status}
              </span>
            </div>

            <div className="flex items-center gap-3 mb-5 pb-5 border-b border-[#e5e7eb] dark:border-[#262626]">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
                {getInitials(selectedReq.empName)}
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-[#0f172a] dark:text-[#f8fafc]">{selectedReq.empName}</h3>
                <p className="text-[12px] text-gray-500 dark:text-[#a1a1aa]">{selectedReq.empId} • {selectedReq.dept}</p>
              </div>
            </div>

            {/* 6. Leave Conflict Warning (Conditional) */}
            {selectedReq.conflict && selectedReq.status === "Pending" && (
              <div className="mb-5 p-4 bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/30 rounded-xl flex items-start gap-3">
                <AlertTriangle size={18} className="text-orange-600 dark:text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[13px] font-bold text-orange-800 dark:text-orange-300 mb-1">Scheduling Conflict</p>
                  <p className="text-[12px] text-orange-700 dark:text-orange-400 leading-relaxed mb-2">2 team members in {selectedReq.dept} are already on leave during {selectedReq.dateRange}.</p>
                  <button className="text-[11px] font-bold text-orange-600 dark:text-orange-400 bg-white dark:bg-[#111111] border border-orange-200 dark:border-orange-500/30 px-2 py-1 rounded">Check Team Calendar</button>
                </div>
              </div>
            )}

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[12px] text-gray-500 dark:text-[#a1a1aa] font-medium mb-0.5">Leave Type</p>
                  <p className="text-[14px] font-bold text-[#0f172a] dark:text-[#f8fafc]">{selectedReq.leaveType}</p>
                </div>
                <div className="text-right">
                  <p className="text-[12px] text-gray-500 dark:text-[#a1a1aa] font-medium mb-0.5">Duration</p>
                  <p className="text-[14px] font-bold text-blue-600 dark:text-blue-400">{selectedReq.days} Day{selectedReq.days > 1 ? 's' : ''}</p>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-[#181818] p-3 rounded-xl border border-[#e5e7eb] dark:border-[#262626]">
                <p className="text-[11px] text-gray-500 dark:text-[#a1a1aa] font-medium mb-1 flex items-center gap-1.5"><Calendar size={12} /> Date Range</p>
                <p className="text-[13px] font-bold text-[#0f172a] dark:text-[#f8fafc]">{selectedReq.dateRange}</p>
              </div>

              <div>
                <p className="text-[12px] text-gray-500 dark:text-[#a1a1aa] font-medium mb-1">Reason</p>
                <p className="text-[13px] text-[#0f172a] dark:text-[#f8fafc] bg-gray-50 dark:bg-[#181818] border border-[#e5e7eb] dark:border-[#262626] p-3 rounded-lg leading-relaxed">
                  {selectedReq.reason}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[11px] text-gray-500 dark:text-[#a1a1aa] font-medium mb-0.5">Balance Before</p>
                  <p className="text-[14px] font-bold text-[#0f172a] dark:text-[#f8fafc]">{selectedReq.balanceBefore} Days</p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-500 dark:text-[#a1a1aa] font-medium mb-0.5">Balance After</p>
                  <p className={clsx("text-[14px] font-bold", selectedReq.balanceAfter === 0 ? "text-red-500" : "text-emerald-600 dark:text-emerald-400")}>{selectedReq.balanceAfter} Days</p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-[#e5e7eb] dark:border-[#262626] pt-4">
                <div>
                  <p className="text-[11px] text-gray-500 dark:text-[#a1a1aa] font-medium mb-0.5">Handover / Backup</p>
                  <p className="text-[13px] font-semibold text-[#0f172a] dark:text-[#f8fafc] flex items-center gap-1.5"><User size={14} className="text-gray-400" /> {selectedReq.handover}</p>
                </div>
                {selectedReq.attachment && (
                  <div>
                    <button className="flex items-center gap-1.5 px-2 py-1.5 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg text-[11px] font-bold transition-colors">
                      <Paperclip size={12} /> Medical_Cert.pdf
                    </button>
                  </div>
                )}
              </div>

              {selectedReq.status === "Pending" && (
                <div className="pt-2">
                  <p className="text-[12px] text-gray-500 dark:text-[#a1a1aa] font-medium mb-1">HR Comment (Optional)</p>
                  <textarea 
                    placeholder="Add a note before decision..."
                    className="w-full bg-[#f9fafb] dark:bg-[#181818] border border-[#e5e7eb] dark:border-[#262626] focus:border-blue-500/50 rounded-xl px-3 py-2 text-[13px] outline-none transition-all duration-200 text-[#0f172a] dark:text-[#f8fafc] placeholder:text-gray-400 dark:placeholder:text-[#737373] min-h-[60px] resize-none"
                  ></textarea>
                </div>
              )}
            </div>

            {selectedReq.status === "Pending" && (
              <div className="grid grid-cols-2 gap-3 pt-5 border-t border-[#e5e7eb] dark:border-[#262626]">
                <button 
                  onClick={() => handleAction("Reject")}
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white dark:bg-[#111111] hover:bg-red-50 dark:hover:bg-red-500/10 border border-[#e5e7eb] dark:border-[#262626] hover:border-red-200 dark:hover:border-red-500/30 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 rounded-xl text-sm font-semibold transition-colors"
                >
                  <X size={16} /> Reject Leave
                </button>
                <button 
                  onClick={() => handleAction("Approve")}
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm shadow-emerald-500/20"
                >
                  <Check size={16} /> Approve Leave
                </button>
              </div>
            )}
          </div>

          {/* 7. Upcoming leave calendar preview */}
          <div className="bg-[#ffffff] dark:bg-[#111111] border border-[#e5e7eb] dark:border-[#262626] rounded-2xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[14px] font-bold text-[#0f172a] dark:text-[#f8fafc] flex items-center gap-2"><CalendarDays size={16} className="text-blue-500" /> Upcoming Leaves</h3>
              <button className="text-[12px] font-semibold text-blue-600 dark:text-blue-400 hover:underline">View All</button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-gray-50 dark:bg-[#181818] border border-[#e5e7eb] dark:border-[#262626]">
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <div>
                    <p className="text-[12px] font-bold text-[#0f172a] dark:text-[#f8fafc]">Rohan Verma</p>
                    <p className="text-[11px] text-gray-500 dark:text-[#a1a1aa]">Sales</p>
                  </div>
                </div>
                <p className="text-[11px] font-bold text-gray-600 dark:text-gray-400">Tomorrow</p>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-gray-50 dark:bg-[#181818] border border-[#e5e7eb] dark:border-[#262626]">
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <div>
                    <p className="text-[12px] font-bold text-[#0f172a] dark:text-[#f8fafc]">Alena Gouse</p>
                    <p className="text-[11px] text-gray-500 dark:text-[#a1a1aa]">Engineering</p>
                  </div>
                </div>
                <p className="text-[11px] font-bold text-gray-600 dark:text-gray-400">01 Jun - 10 Jun</p>
              </div>
            </div>
          </div>

          {/* 8. Policy reminder card */}
          <div className="bg-blue-50 dark:bg-blue-500/5 border border-blue-100 dark:border-blue-500/20 rounded-2xl p-5">
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 font-bold text-[14px] mb-3">
              <AlertCircle size={16} /> Leave Policy Reminders
            </div>
            <ul className="space-y-2 text-[12px] text-blue-800/80 dark:text-blue-300/80 font-medium">
              <li className="flex gap-2"><span>•</span> Casual leave requires 2 days prior notice.</li>
              <li className="flex gap-2"><span>•</span> Sick leave can be applied on the same day with proof if &gt; 2 days.</li>
              <li className="flex gap-2"><span>•</span> Earned leave requires reporting manager approval first.</li>
              <li className="flex gap-2"><span>•</span> Leave balance must be available before HR final approval.</li>
              <li className="flex gap-2"><span>•</span> Approved leave automatically syncs with attendance and payroll records.</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
