"use client";

import { useState } from "react";
import { 
  FileClock, CheckCircle, XCircle, Clock, Search, Filter, 
  RefreshCw, Download, MoreVertical, Eye, Check, X,
  Calendar, FileText, AlertCircle, CalendarClock, User
} from "lucide-react";
import clsx from "clsx";

const mockRequests = [
  { id: "REQ-2041", empName: "Priya Desai", empId: "EMP-1001", dept: "Human Resources", attendanceDate: "28 Apr 2026", requestType: "Forgot Clock In", requestedTime: "In: 09:00 AM", reason: "Biometric machine was not reading my fingerprint.", appliedOn: "28 Apr 2026", status: "Pending", currentRecord: "In: --:--, Out: 18:05 PM", attachment: false },
  { id: "REQ-2042", empName: "Rahul Sharma", empId: "EMP-1002", dept: "Engineering", attendanceDate: "27 Apr 2026", requestType: "Forgot Clock Out", requestedTime: "Out: 19:30 PM", reason: "Working late on release, forgot to punch out.", appliedOn: "28 Apr 2026", status: "Approved", currentRecord: "In: 09:15 AM, Out: --:--", attachment: false },
  { id: "REQ-2043", empName: "Neha Patel", empId: "EMP-1003", dept: "Finance", attendanceDate: "26 Apr 2026", requestType: "Outdoor Duty", requestedTime: "Full Day", reason: "Bank visit for corporate account KYC.", appliedOn: "26 Apr 2026", status: "Pending", currentRecord: "Absent", attachment: true },
  { id: "REQ-2044", empName: "Rohan Verma", empId: "EMP-1004", dept: "Sales", attendanceDate: "25 Apr 2026", requestType: "Client Visit", requestedTime: "14:00 PM - 18:00 PM", reason: "Met with TechCorp for Q3 renewal negotiation.", appliedOn: "26 Apr 2026", status: "Rejected", currentRecord: "In: 09:00 AM, Out: 14:00 PM", attachment: false },
  { id: "REQ-2045", empName: "Sneha Iyer", empId: "EMP-1005", dept: "Engineering", attendanceDate: "28 Apr 2026", requestType: "System Issue", requestedTime: "In: 09:10 AM", reason: "Portal login was down.", appliedOn: "28 Apr 2026", status: "Pending", currentRecord: "In: 10:45 AM, Out: 18:00 PM", attachment: true },
  { id: "REQ-2046", empName: "Karan Singh", empId: "EMP-1006", dept: "Operations", attendanceDate: "24 Apr 2026", requestType: "Half-day Correction", requestedTime: "Out: 14:00 PM", reason: "Left early due to medical emergency.", appliedOn: "25 Apr 2026", status: "Approved", currentRecord: "In: 08:50 AM, Out: --:--", attachment: true },
  { id: "REQ-2047", empName: "Anjali Gupta", empId: "EMP-1007", dept: "Sales", attendanceDate: "22 Apr 2026", requestType: "WFH Correction", requestedTime: "Full Day", reason: "Worked from home due to heavy rain, forgot to apply.", appliedOn: "23 Apr 2026", status: "Cancelled", currentRecord: "Absent", attachment: false },
  { id: "REQ-2048", empName: "Vikram Singh", empId: "EMP-1008", dept: "Finance", attendanceDate: "28 Apr 2026", requestType: "Forgot Clock In", requestedTime: "In: 08:45 AM", reason: "Punched in but system didn't sync.", appliedOn: "28 Apr 2026", status: "Pending", currentRecord: "In: --:--, Out: 17:30 PM", attachment: false },
  { id: "REQ-2049", empName: "Miracle Vetrovs", empId: "EMP-1009", dept: "Support", attendanceDate: "27 Apr 2026", requestType: "Forgot Clock Out", requestedTime: "Out: 23:00 PM", reason: "Shift ended, forgot to punch out.", appliedOn: "28 Apr 2026", status: "Approved", currentRecord: "In: 14:00 PM, Out: --:--", attachment: false },
  { id: "REQ-2050", empName: "Alena Gouse", empId: "EMP-1010", dept: "Engineering", attendanceDate: "26 Apr 2026", requestType: "Incorrect Punch", requestedTime: "In: 10:00 AM", reason: "Accidentally punched out instead of in.", appliedOn: "26 Apr 2026", status: "Pending", currentRecord: "In: 13:00 PM, Out: 19:00 PM", attachment: false },
];

export default function RegularizationPage() {
  const [selectedReq, setSelectedReq] = useState(mockRequests[0]);

  const kpis = [
    { label: "Pending Requests", value: "8", sub: "Require action", icon: FileClock, color: "text-orange-600 dark:text-orange-400", bg: "bg-orange-50 dark:bg-orange-500/10" },
    { label: "Approved This Month", value: "24", sub: "Processed successfully", icon: CheckCircle, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
    { label: "Rejected This Month", value: "3", sub: "Declined requests", icon: XCircle, color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-500/10" },
    { label: "Avg. Approval Time", value: "1.2d", sub: "SLA: 2 days", icon: Clock, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-500/10" },
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
    alert(`${action} request ${selectedReq.id}`);
  };

  return (
    <div className="space-y-6 pb-10">
      
      {/* 1. Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0f172a] dark:text-[#f8fafc] tracking-tight">Regularization Requests</h1>
          <p className="text-[#64748b] dark:text-[#a1a1aa] mt-1 text-[14px]">Review missed punch and attendance correction requests.</p>
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

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        
        {/* Left Side: Toolbar + Table */}
        <div className="xl:col-span-3 space-y-6">
          
          {/* 3. Filters toolbar */}
          <div className="bg-[#ffffff] dark:bg-[#111111] border border-[#e5e7eb] dark:border-[#262626] rounded-2xl p-4 shadow-sm">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative group">
                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Search employee, request ID or reason..."
                  className="w-full bg-gray-50 dark:bg-[#181818] border border-transparent focus:border-blue-500/30 focus:bg-[#ffffff] dark:focus:bg-[#111111] rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none transition-all duration-200 text-[#0f172a] dark:text-[#f8fafc] placeholder:text-gray-400 dark:placeholder:text-[#737373]"
                />
              </div>
              <div className="flex flex-wrap lg:flex-nowrap gap-3">
                <select className="bg-gray-50 dark:bg-[#181818] border border-transparent focus:border-blue-500/30 focus:bg-[#ffffff] dark:focus:bg-[#111111] rounded-xl px-4 py-2.5 text-sm font-medium outline-none transition-all duration-200 text-[#0f172a] dark:text-[#f8fafc]">
                  <option value="">Department</option>
                  <option value="hr">Human Resources</option>
                  <option value="eng">Engineering</option>
                  <option value="sales">Sales</option>
                </select>
                <select className="bg-gray-50 dark:bg-[#181818] border border-transparent focus:border-blue-500/30 focus:bg-[#ffffff] dark:focus:bg-[#111111] rounded-xl px-4 py-2.5 text-sm font-medium outline-none transition-all duration-200 text-[#0f172a] dark:text-[#f8fafc]">
                  <option value="">Request Type</option>
                  <option value="forgot_in">Forgot Clock In</option>
                  <option value="forgot_out">Forgot Clock Out</option>
                  <option value="incorrect">Incorrect Punch Time</option>
                  <option value="wfh">Work From Home Correction</option>
                  <option value="outdoor">Outdoor Duty / Client Visit</option>
                  <option value="system">Biometric/System Issue</option>
                  <option value="halfday">Half-day Correction</option>
                  <option value="other">Other</option>
                </select>
                <select className="bg-gray-50 dark:bg-[#181818] border border-transparent focus:border-blue-500/30 focus:bg-[#ffffff] dark:focus:bg-[#111111] rounded-xl px-4 py-2.5 text-sm font-medium outline-none transition-all duration-200 text-[#0f172a] dark:text-[#f8fafc]">
                  <option value="">Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
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

          {/* 4. Requests Table */}
          <div className="bg-[#ffffff] dark:bg-[#111111] border border-[#e5e7eb] dark:border-[#262626] rounded-2xl shadow-sm overflow-hidden flex flex-col">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-[#181818] border-b border-[#e5e7eb] dark:border-[#262626]">
                    <th className="py-4 px-5 text-[12px] font-bold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider whitespace-nowrap">Employee</th>
                    <th className="py-4 px-5 text-[12px] font-bold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider whitespace-nowrap">Request Info</th>
                    <th className="py-4 px-5 text-[12px] font-bold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider whitespace-nowrap">Reason & Date</th>
                    <th className="py-4 px-5 text-[12px] font-bold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider whitespace-nowrap">Status</th>
                    <th className="py-4 px-5 text-[12px] font-bold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider text-right whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e5e7eb] dark:divide-[#262626]">
                  {mockRequests.map((req) => (
                    <tr 
                      key={req.id} 
                      onClick={() => setSelectedReq(req)}
                      className={clsx(
                        "transition-colors cursor-pointer",
                        selectedReq.id === req.id 
                          ? "bg-blue-50/50 dark:bg-blue-500/10" 
                          : "hover:bg-gray-50/50 dark:hover:bg-[#141414]"
                      )}
                    >
                      <td className="py-3 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                            {getInitials(req.empName)}
                          </div>
                          <div>
                            <p className="text-[14px] font-semibold text-[#0f172a] dark:text-[#f8fafc] whitespace-nowrap">{req.empName}</p>
                            <p className="text-[12px] text-gray-500 dark:text-[#a1a1aa]">{req.empId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-5">
                        <p className="text-[13px] font-bold text-[#0f172a] dark:text-[#f8fafc] whitespace-nowrap">{req.requestType}</p>
                        <p className="text-[12px] text-gray-500 dark:text-[#a1a1aa] whitespace-nowrap">{req.id} • {req.attendanceDate}</p>
                      </td>
                      <td className="py-3 px-5 max-w-[200px]">
                        <p className="text-[13px] text-[#0f172a] dark:text-[#f8fafc] truncate" title={req.reason}>{req.reason}</p>
                        <p className="text-[12px] text-gray-500 dark:text-[#a1a1aa] whitespace-nowrap">Req: {req.requestedTime}</p>
                      </td>
                      <td className="py-3 px-5">
                        <span className={clsx("inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold whitespace-nowrap", getStatusColor(req.status))}>
                          {req.status}
                        </span>
                        <p className="text-[11px] text-gray-400 dark:text-[#737373] mt-1 whitespace-nowrap">On {req.appliedOn}</p>
                      </td>
                      <td className="py-3 px-5 text-right">
                        <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                          <button className="p-1.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors" title="View"><Eye size={16} /></button>
                          {req.status === "Pending" && (
                            <>
                              <button onClick={() => alert(`Approve ${req.id}`)} className="p-1.5 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-lg transition-colors" title="Approve"><Check size={16} /></button>
                              <button onClick={() => alert(`Reject ${req.id}`)} className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors" title="Reject"><X size={16} /></button>
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

        {/* Right Side: Details & Timeline */}
        <div className="xl:col-span-1 space-y-6">
          
          {/* 5. Request detail review panel */}
          <div className="bg-[#ffffff] dark:bg-[#111111] border border-[#e5e7eb] dark:border-[#262626] rounded-2xl shadow-sm p-6 sticky top-20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[16px] font-bold text-[#0f172a] dark:text-[#f8fafc]">Request Review</h2>
              <span className={clsx("inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold", getStatusColor(selectedReq.status))}>
                {selectedReq.status}
              </span>
            </div>

            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[#e5e7eb] dark:border-[#262626]">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
                {getInitials(selectedReq.empName)}
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-[#0f172a] dark:text-[#f8fafc]">{selectedReq.empName}</h3>
                <p className="text-[12px] text-gray-500 dark:text-[#a1a1aa]">{selectedReq.empId} • {selectedReq.dept}</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <p className="text-[12px] text-gray-500 dark:text-[#a1a1aa] font-medium mb-0.5">Request Type</p>
                <p className="text-[14px] font-semibold text-[#0f172a] dark:text-[#f8fafc]">{selectedReq.requestType} <span className="text-gray-400 dark:text-[#737373] text-[12px] font-normal ml-1">({selectedReq.id})</span></p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-[#181818] p-3 rounded-xl border border-[#e5e7eb] dark:border-[#262626]">
                  <p className="text-[11px] text-gray-500 dark:text-[#a1a1aa] font-medium mb-1 flex items-center gap-1.5"><Calendar size={12} /> Date</p>
                  <p className="text-[13px] font-bold text-[#0f172a] dark:text-[#f8fafc]">{selectedReq.attendanceDate}</p>
                </div>
                <div className="bg-gray-50 dark:bg-[#181818] p-3 rounded-xl border border-[#e5e7eb] dark:border-[#262626]">
                  <p className="text-[11px] text-gray-500 dark:text-[#a1a1aa] font-medium mb-1 flex items-center gap-1.5"><Clock size={12} /> Record</p>
                  <p className="text-[13px] font-bold text-[#0f172a] dark:text-[#f8fafc] truncate" title={selectedReq.currentRecord}>{selectedReq.currentRecord}</p>
                </div>
              </div>

              <div>
                <p className="text-[12px] text-gray-500 dark:text-[#a1a1aa] font-medium mb-1">Requested Correction</p>
                <div className="px-3 py-2 bg-blue-50/50 dark:bg-blue-500/5 border border-blue-100 dark:border-blue-500/20 rounded-lg">
                  <p className="text-[13px] font-bold text-blue-700 dark:text-blue-400">{selectedReq.requestedTime}</p>
                </div>
              </div>

              <div>
                <p className="text-[12px] text-gray-500 dark:text-[#a1a1aa] font-medium mb-1">Reason</p>
                <p className="text-[13px] text-[#0f172a] dark:text-[#f8fafc] bg-gray-50 dark:bg-[#181818] border border-[#e5e7eb] dark:border-[#262626] p-3 rounded-lg leading-relaxed">
                  {selectedReq.reason}
                </p>
              </div>

              {selectedReq.attachment && (
                <div>
                  <p className="text-[12px] text-gray-500 dark:text-[#a1a1aa] font-medium mb-1">Attachment</p>
                  <button className="flex items-center gap-2 px-3 py-2 bg-[#ffffff] dark:bg-[#111111] border border-[#e5e7eb] dark:border-[#262626] rounded-lg text-[13px] font-semibold text-blue-600 dark:text-blue-400 hover:bg-gray-50 dark:hover:bg-[#181818] transition-colors w-full">
                    <FileText size={14} /> view_evidence.jpg
                  </button>
                </div>
              )}

              {selectedReq.status === "Pending" && (
                <div>
                  <p className="text-[12px] text-gray-500 dark:text-[#a1a1aa] font-medium mb-1">HR Comment (Optional)</p>
                  <textarea 
                    placeholder="Add a comment before approving/rejecting..."
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
                  <X size={16} /> Reject
                </button>
                <button 
                  onClick={() => handleAction("Approve")}
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm shadow-emerald-500/20"
                >
                  <Check size={16} /> Approve
                </button>
              </div>
            )}

            {/* 6. Approval timeline (Simplified) */}
            <div className="mt-8 pt-6 border-t border-[#e5e7eb] dark:border-[#262626]">
              <h3 className="text-[13px] font-bold text-[#0f172a] dark:text-[#f8fafc] mb-4">Request Timeline</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <User size={12} />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-[#0f172a] dark:text-[#f8fafc] leading-none mb-1">Submitted by {selectedReq.empName}</p>
                    <p className="text-[11px] text-gray-500 dark:text-[#a1a1aa] leading-none">{selectedReq.appliedOn}</p>
                  </div>
                </div>
                <div className="flex gap-3 relative">
                  <div className="absolute left-[11px] top-[-16px] bottom-6 w-px bg-[#e5e7eb] dark:bg-[#262626]" />
                  <div className={clsx("w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10", 
                    selectedReq.status === "Pending" ? "bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400" :
                    selectedReq.status === "Approved" ? "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400" :
                    selectedReq.status === "Rejected" ? "bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400" :
                    "bg-gray-100 dark:bg-[#262626] text-gray-500 dark:text-gray-400"
                  )}>
                    <CheckCircle size={12} />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-[#0f172a] dark:text-[#f8fafc] leading-none mb-1">
                      {selectedReq.status === "Pending" ? "Pending HR Review" : `${selectedReq.status} by HR Admin`}
                    </p>
                    {selectedReq.status !== "Pending" && <p className="text-[11px] text-gray-500 dark:text-[#a1a1aa] leading-none">Completed</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 7. Policy reminder card */}
          <div className="bg-blue-50 dark:bg-blue-500/5 border border-blue-100 dark:border-blue-500/20 rounded-2xl p-5">
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 font-bold text-[14px] mb-3">
              <AlertCircle size={16} /> Policy Reminders
            </div>
            <ul className="space-y-2 text-[12px] text-blue-800/80 dark:text-blue-300/80 font-medium">
              <li className="flex gap-2"><span>•</span> Regularizations must be submitted within 7 days of the attendance anomaly.</li>
              <li className="flex gap-2"><span>•</span> Maximum of 6 requests allowed per employee per month.</li>
              <li className="flex gap-2"><span>•</span> Approving a request will automatically correct the attendance record and update payroll.</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
