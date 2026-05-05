"use client";

import { useState } from "react";
import { 
  Plus, CheckCircle2, XCircle, AlertCircle, CalendarRange, 
  Upload, Info, Eye, X, CheckSquare, Clock
} from "lucide-react";

const summaryCards = [
  { label: "Pending Requests", value: 2, icon: AlertCircle, color: "text-yellow-600 dark:text-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-500/10" },
  { label: "Approved This Month", value: 4, icon: CheckCircle2, color: "text-green-600 dark:text-green-500", bg: "bg-green-50 dark:bg-green-500/10" },
  { label: "Rejected Requests", value: 1, icon: XCircle, color: "text-red-600 dark:text-red-500", bg: "bg-red-50 dark:bg-red-500/10" },
  { label: "Available Requests", value: 6, icon: CalendarRange, color: "text-blue-600 dark:text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
];

const mockRequests = [
  { id: "REG-001", date: "26 Sep 2023", type: "Forgot Clock In", time: "09:00 AM - 06:00 PM", reason: "System crashed", appliedOn: "27 Sep 2023", status: "Pending", comment: "-" },
  { id: "REG-002", date: "22 Sep 2023", type: "Work From Home", time: "09:30 AM - 06:30 PM", reason: "Fever", appliedOn: "23 Sep 2023", status: "Approved", comment: "Take care" },
  { id: "REG-003", date: "15 Sep 2023", type: "Outdoor Duty", time: "10:00 AM - 04:00 PM", reason: "Client meeting", appliedOn: "16 Sep 2023", status: "Rejected", comment: "Need proof" },
  { id: "REG-004", date: "10 Sep 2023", type: "Forgot Clock Out", time: "09:00 AM - 07:00 PM", reason: "Left in a hurry", appliedOn: "11 Sep 2023", status: "Approved", comment: "Approved" },
  { id: "REG-005", date: "05 Sep 2023", type: "Incorrect Punch", time: "09:15 AM - 06:15 PM", reason: "Punched twice", appliedOn: "06 Sep 2023", status: "Approved", comment: "Fixed" },
  { id: "REG-006", date: "01 Sep 2023", type: "Forgot Clock In", time: "08:45 AM - 05:45 PM", reason: "Forgot", appliedOn: "02 Sep 2023", status: "Cancelled", comment: "-" },
  { id: "REG-007", date: "28 Aug 2023", type: "Half-day Correction", time: "09:00 AM - 01:00 PM", reason: "Doctor appointment", appliedOn: "29 Aug 2023", status: "Approved", comment: "OK" },
  { id: "REG-008", date: "20 Aug 2023", type: "Biometric Issue", time: "09:00 AM - 06:00 PM", reason: "Fingerprint not read", appliedOn: "21 Aug 2023", status: "Approved", comment: "OK" },
];

export default function RegularizationPage() {
  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Attendance Regularization</h1>
          <p className="text-gray-500 dark:text-[#a1a1aa] mt-1 text-sm font-medium">Request corrections for missed or incorrect attendance records.</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card, idx) => (
          <div key={idx} className="bg-white dark:bg-[#111111] p-5 rounded-2xl border border-gray-100 dark:border-[#262626] shadow-sm flex items-center gap-4 transition-transform hover:-translate-y-1">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${card.bg}`}>
              <card.icon className={card.color} size={24} strokeWidth={2} />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-[#a1a1aa] mb-1">{card.label}</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-none">{card.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area: Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-[#111111] rounded-2xl border border-gray-100 dark:border-[#262626] shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-50 dark:border-[#262626]">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">New Regularization Request</h2>
            </div>
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700 dark:text-[#e2e8f0]">Request Type</label>
                  <select className="w-full bg-gray-50 dark:bg-[#181818] border border-gray-200 dark:border-[#262626] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white outline-none transition-all">
                    <option>Forgot Clock In</option>
                    <option>Forgot Clock Out</option>
                    <option>Incorrect Punch Time</option>
                    <option>Work From Home Correction</option>
                    <option>Outdoor Duty / Client Visit</option>
                    <option>Biometric/System Issue</option>
                    <option>Half-day Correction</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700 dark:text-[#e2e8f0]">Attendance Date</label>
                  <input type="date" className="w-full bg-gray-50 dark:bg-[#181818] border border-gray-200 dark:border-[#262626] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white outline-none transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700 dark:text-[#e2e8f0]">Actual Clock In Time</label>
                  <input type="time" className="w-full bg-gray-50 dark:bg-[#181818] border border-gray-200 dark:border-[#262626] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white outline-none transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700 dark:text-[#e2e8f0]">Actual Clock Out Time</label>
                  <input type="time" className="w-full bg-gray-50 dark:bg-[#181818] border border-gray-200 dark:border-[#262626] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white outline-none transition-all" />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700 dark:text-[#e2e8f0]">Work Location</label>
                <select className="w-full bg-gray-50 dark:bg-[#181818] border border-gray-200 dark:border-[#262626] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white outline-none transition-all">
                  <option>Office — HQ</option>
                  <option>Work From Home</option>
                  <option>Client Location</option>
                  <option>Outdoor Duty</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700 dark:text-[#e2e8f0]">Reason</label>
                <textarea rows={3} placeholder="Explain the reason for this request..." className="w-full bg-gray-50 dark:bg-[#181818] border border-gray-200 dark:border-[#262626] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-[#737373] outline-none transition-all resize-none"></textarea>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-[#e2e8f0]">Attachment (Optional)</label>
                <div className="border-2 border-dashed border-gray-200 dark:border-[#262626] rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 dark:hover:bg-[#181818] transition-colors cursor-pointer group">
                  <div className="w-10 h-10 bg-blue-50 dark:bg-blue-500/10 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Upload size={18} className="text-blue-600 dark:text-blue-500" />
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-[#e2e8f0]">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500 dark:text-[#a1a1aa] mt-1">Attach proof if available. PDF, PNG, JPG supported.</p>
                </div>
              </div>

              <label className="flex items-center gap-3 p-3 border border-gray-100 dark:border-[#262626] rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-[#181818] transition-colors">
                <input type="checkbox" className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 bg-gray-100 border-gray-300" defaultChecked />
                <span className="text-sm font-medium text-gray-700 dark:text-[#e2e8f0]">Notify manager via email</span>
              </label>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-50 dark:border-[#262626]">
                <button className="px-5 py-2.5 rounded-xl border border-gray-200 dark:border-[#262626] text-sm font-semibold text-gray-700 dark:text-[#cbd5e1] hover:bg-gray-50 dark:hover:bg-[#181818] transition-colors">
                  Reset
                </button>
                <button className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm">
                  Submit Request
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Cards */}
        <div className="space-y-6">
          {/* Info Card */}
          <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Info size={20} className="text-blue-600 dark:text-blue-500" />
              <h3 className="font-bold text-gray-900 dark:text-white">Policy Guidelines</h3>
            </div>
            <ul className="space-y-3">
              {[
                "Regularization must be submitted within 7 days.",
                "Manager approval is required.",
                "Maximum 6 regularization requests allowed per month.",
                "Attach proof for client visit or outdoor duty.",
                "Approved correction will reflect in attendance and payroll."
              ].map((text, i) => (
                <li key={i} className="text-sm text-gray-700 dark:text-[#cbd5e1] flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                  {text}
                </li>
              ))}
            </ul>
          </div>

          {/* Timeline Card */}
          <div className="bg-white dark:bg-[#111111] rounded-2xl border border-gray-100 dark:border-[#262626] shadow-sm p-5">
            <h3 className="font-bold text-gray-900 dark:text-white mb-5">Sample Timeline</h3>
            <div className="space-y-0">
              {[
                { title: "Submitted", desc: "Request created", icon: CheckSquare, color: "text-blue-500" },
                { title: "Manager Review", desc: "Pending approval", icon: Clock, color: "text-yellow-500" },
                { title: "Approved", desc: "Manager approved", icon: CheckCircle2, color: "text-gray-400 dark:text-[#737373]" },
                { title: "Attendance Updated", desc: "Reflected in payroll", icon: CalendarRange, color: "text-gray-400 dark:text-[#737373]" }
              ].map((step, i, arr) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-[#181818] border border-gray-100 dark:border-[#262626] flex items-center justify-center shrink-0 z-10">
                      <step.icon size={14} className={step.color} strokeWidth={2.5} />
                    </div>
                    {i !== arr.length - 1 && <div className="w-0.5 h-full bg-gray-100 dark:bg-[#262626] -my-1" />}
                  </div>
                  <div className="pb-6 pt-1.5">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{step.title}</p>
                    <p className="text-xs text-gray-500 dark:text-[#a1a1aa] mt-0.5">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Requests Table */}
      <div className="bg-white dark:bg-[#111111] rounded-2xl border border-gray-100 dark:border-[#262626] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 dark:border-[#262626]">
          <h3 className="font-bold text-gray-900 dark:text-white">Recent Regularization Requests</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[1000px]">
            <thead>
              <tr className="bg-gray-50 dark:bg-[#181818] border-b border-gray-100 dark:border-[#262626]">
                <th className="py-3 px-4 text-xs font-semibold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider">Request ID</th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider">Date</th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider">Type</th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider">Requested Time</th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider">Reason</th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider">Applied On</th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider">Status</th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider">Manager Comment</th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-[#262626]">
              {mockRequests.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50 dark:hover:bg-[#181818]/50 transition-colors">
                  <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-white">{req.id}</td>
                  <td className="py-3 px-4 text-sm text-gray-600 dark:text-[#cbd5e1]">{req.date}</td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-800 dark:text-[#e2e8f0]">{req.type}</td>
                  <td className="py-3 px-4 text-sm text-gray-500 dark:text-[#a1a1aa]">{req.time}</td>
                  <td className="py-3 px-4 text-sm text-gray-500 dark:text-[#a1a1aa] max-w-[150px] truncate" title={req.reason}>{req.reason}</td>
                  <td className="py-3 px-4 text-sm text-gray-500 dark:text-[#a1a1aa]">{req.appliedOn}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2.5 py-1 text-[11px] font-bold rounded-full border ${
                      req.status === 'Pending' ? 'bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-500 border-yellow-200 dark:border-yellow-500/30' :
                      req.status === 'Approved' ? 'bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-500 border-green-200 dark:border-green-500/30' :
                      req.status === 'Rejected' ? 'bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-500 border-red-200 dark:border-red-500/30' :
                      'bg-gray-50 dark:bg-[#262626] text-gray-600 dark:text-[#a1a1aa] border-gray-200 dark:border-[#3f3f46]'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500 dark:text-[#a1a1aa] italic">{req.comment}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors" title="View Details">
                        <Eye size={16} />
                      </button>
                      {req.status === "Pending" && (
                        <button className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors" title="Cancel Request">
                          <X size={16} />
                        </button>
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
  );
}
