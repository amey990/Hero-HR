"use client";

import { useState } from "react";
import { 
  Users, UserCheck, UserX, Clock, Home, Search, Filter, 
  RefreshCw, Download, Plus, Calendar as CalendarIcon, 
  MoreVertical, Eye, Edit, FileClock, Bell, X, Check
} from "lucide-react";
import clsx from "clsx";

const mockAttendance = [
  { id: "EMP-1001", name: "Priya Desai", dept: "Human Resources", shift: "Morning (09:00 - 18:00)", location: "Mumbai HQ", clockIn: "08:55 AM", clockOut: "--:--", hours: "--:--", status: "Present", remarks: "On time" },
  { id: "EMP-1002", name: "Rahul Sharma", dept: "Engineering", shift: "Morning (09:00 - 18:00)", location: "Bangalore", clockIn: "--:--", clockOut: "--:--", hours: "--:--", status: "Absent", remarks: "Uninformed" },
  { id: "EMP-1003", name: "Neha Patel", dept: "Finance", shift: "Morning (09:00 - 18:00)", location: "Mumbai HQ", clockIn: "09:45 AM", clockOut: "--:--", hours: "--:--", status: "Late", remarks: "Traffic delay" },
  { id: "EMP-1004", name: "Rohan Verma", dept: "Sales", shift: "General (10:00 - 19:00)", location: "Delhi", clockIn: "09:50 AM", clockOut: "--:--", hours: "--:--", status: "Work From Home", remarks: "Approved WFH" },
  { id: "EMP-1005", name: "Sneha Iyer", dept: "Engineering", shift: "Morning (09:00 - 18:00)", location: "Bangalore", clockIn: "--:--", clockOut: "--:--", hours: "--:--", status: "On Leave", remarks: "Sick Leave" },
  { id: "EMP-1006", name: "Karan Singh", dept: "Operations", shift: "Morning (09:00 - 18:00)", location: "Pune", clockIn: "08:50 AM", clockOut: "01:00 PM", hours: "04:10", status: "Half Day", remarks: "Personal emergency" },
  { id: "EMP-1007", name: "Anjali Gupta", dept: "Sales", shift: "General (10:00 - 19:00)", location: "Delhi", clockIn: "--:--", clockOut: "--:--", hours: "--:--", status: "Absent", remarks: "Uninformed" },
  { id: "EMP-1008", name: "Vikram Singh", dept: "Finance", shift: "Morning (09:00 - 18:00)", location: "Mumbai HQ", clockIn: "08:45 AM", clockOut: "--:--", hours: "--:--", status: "Present", remarks: "On time" },
  { id: "EMP-1009", name: "Miracle Vetrovs", dept: "Support", shift: "Evening (14:00 - 23:00)", location: "Remote", clockIn: "--:--", clockOut: "--:--", hours: "--:--", status: "Present", remarks: "Shift not started" },
  { id: "EMP-1010", name: "Alena Gouse", dept: "Engineering", shift: "Morning (09:00 - 18:00)", location: "Bangalore", clockIn: "10:15 AM", clockOut: "--:--", hours: "--:--", status: "Late", remarks: "No reason provided" },
  { id: "EMP-1011", name: "Aman Gupta", dept: "Operations", shift: "Morning (09:00 - 18:00)", location: "Pune", clockIn: "09:00 AM", clockOut: "--:--", hours: "--:--", status: "Present", remarks: "On time" },
  { id: "EMP-1012", name: "Sara Khan", dept: "Human Resources", shift: "Morning (09:00 - 18:00)", location: "Mumbai HQ", clockIn: "09:05 AM", clockOut: "--:--", hours: "--:--", status: "Work From Home", remarks: "Approved WFH" },
];

const lateArrivals = [
  { name: "Alena Gouse", dept: "Engineering", clockIn: "10:15 AM", lateBy: "1 hr 15 mins" },
  { name: "Neha Patel", dept: "Finance", clockIn: "09:45 AM", lateBy: "45 mins" },
];

const absentEmployees = [
  { name: "Rahul Sharma", dept: "Engineering", manager: "Anita Singh" },
  { name: "Anjali Gupta", dept: "Sales", manager: "Deepak Mehta" },
];

export default function AdminAttendancePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const kpis = [
    { label: "Total Employees", value: "248", sub: "Company wide", icon: Users, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-500/10" },
    { label: "Present Today", value: "213", sub: "86% attendance rate", icon: UserCheck, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
    { label: "Absent", value: "17", sub: "Not logged in", icon: UserX, color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-500/10" },
    { label: "Late Arrivals", value: "21", sub: "Past grace period", icon: Clock, color: "text-orange-600 dark:text-orange-400", bg: "bg-orange-50 dark:bg-orange-500/10" },
    { label: "Work From Home", value: "32", sub: "Remote approved", icon: Home, color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-50 dark:bg-indigo-500/10" },
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Present": return "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400";
      case "Absent": return "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400";
      case "Late": return "bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400";
      case "Work From Home": return "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400";
      case "On Leave": return "bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400";
      case "Half Day": return "bg-yellow-50 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-500";
      default: return "bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2);
  };

  // For stacked progress bar
  const total = 248;
  const progressData = [
    { label: "Present", value: 160, color: "bg-emerald-500" },
    { label: "Late", value: 21, color: "bg-orange-500" },
    { label: "WFH", value: 32, color: "bg-blue-500" },
    { label: "On Leave", value: 18, color: "bg-purple-500" },
    { label: "Absent", value: 17, color: "bg-red-500" },
  ];

  return (
    <div className="space-y-6 pb-10">
      
      {/* 1. Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0f172a] dark:text-[#f8fafc] tracking-tight">Daily Attendance</h1>
          <p className="text-[#64748b] dark:text-[#a1a1aa] mt-1 text-[14px]">Track company-wide attendance and workforce availability.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative group">
            <CalendarIcon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors" />
            <input 
              type="date" 
              defaultValue="2026-04-29"
              className="bg-[#ffffff] dark:bg-[#111111] border border-[#e5e7eb] dark:border-[#262626] rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold text-[#0f172a] dark:text-[#f8fafc] hover:bg-gray-50 dark:hover:bg-[#181818] transition-colors shadow-sm outline-none cursor-pointer [color-scheme:light] dark:[color-scheme:dark]"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#ffffff] dark:bg-[#111111] border border-[#e5e7eb] dark:border-[#262626] rounded-xl text-sm font-semibold text-[#0f172a] dark:text-[#f8fafc] hover:bg-gray-50 dark:hover:bg-[#181818] transition-colors shadow-sm">
            <Download size={16} /> Export
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm shadow-blue-500/20"
          >
            <Plus size={16} /> Manual Entry
          </button>
        </div>
      </div>

      {/* 2. KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="bg-[#ffffff] dark:bg-[#111111] border border-[#e5e7eb] dark:border-[#262626] rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between h-full">
            <div className="flex items-start justify-between mb-2">
              <div className={clsx("w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 duration-300", kpi.bg, kpi.color)}>
                <kpi.icon size={18} strokeWidth={2.5} />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#0f172a] dark:text-[#f8fafc] mb-0.5">{kpi.value}</h3>
              <p className="text-[13px] font-semibold text-gray-700 dark:text-[#f8fafc] mb-0.5">{kpi.label}</p>
              <p className="text-[11px] font-medium text-gray-500 dark:text-[#a1a1aa]">{kpi.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        
        {/* Left Side: Overview + Table + Filters */}
        <div className="xl:col-span-3 space-y-6">
          
          {/* 3. Attendance Status Overview */}
          <div className="bg-[#ffffff] dark:bg-[#111111] border border-[#e5e7eb] dark:border-[#262626] rounded-2xl shadow-sm p-6 flex flex-col justify-center">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[16px] font-bold text-[#0f172a] dark:text-[#f8fafc]">Attendance Overview</h2>
            </div>
            
            {/* Progress Bar Visual */}
            <div className="w-full h-4 rounded-full overflow-hidden flex mb-5">
              {progressData.map((data, idx) => (
                <div key={idx} style={{ width: `${(data.value / total) * 100}%` }} className={clsx("h-full", data.color)} />
              ))}
            </div>
            
            {/* Legend */}
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {progressData.map((data, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className={clsx("w-3 h-3 rounded-full shrink-0", data.color)} />
                  <p className="text-[13px] font-semibold text-[#0f172a] dark:text-[#f8fafc]">{data.value}</p>
                  <p className="text-[12px] text-gray-500 dark:text-[#a1a1aa] font-medium">{data.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Filters toolbar */}
          <div className="bg-[#ffffff] dark:bg-[#111111] border border-[#e5e7eb] dark:border-[#262626] rounded-2xl p-4 shadow-sm">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative group">
                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Search employee, ID or department..."
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
                  <option value="">Status</option>
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                  <option value="late">Late</option>
                  <option value="wfh">Work From Home</option>
                </select>
                <select className="bg-gray-50 dark:bg-[#181818] border border-transparent focus:border-blue-500/30 focus:bg-[#ffffff] dark:focus:bg-[#111111] rounded-xl px-4 py-2.5 text-sm font-medium outline-none transition-all duration-200 text-[#0f172a] dark:text-[#f8fafc] hidden sm:block">
                  <option value="">Shift</option>
                  <option value="morning">Morning</option>
                  <option value="general">General</option>
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

          {/* 5. Attendance Table */}
          <div className="bg-[#ffffff] dark:bg-[#111111] border border-[#e5e7eb] dark:border-[#262626] rounded-2xl shadow-sm overflow-hidden flex flex-col">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-[#181818] border-b border-[#e5e7eb] dark:border-[#262626]">
                    <th className="py-4 px-5 text-[12px] font-bold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider whitespace-nowrap">Employee</th>
                    <th className="py-4 px-5 text-[12px] font-bold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider whitespace-nowrap">Dept & Shift</th>
                    <th className="py-4 px-5 text-[12px] font-bold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider whitespace-nowrap">Timing</th>
                    <th className="py-4 px-5 text-[12px] font-bold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider whitespace-nowrap">Status & Remarks</th>
                    <th className="py-4 px-5 text-[12px] font-bold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider text-right whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e5e7eb] dark:divide-[#262626]">
                  {mockAttendance.map((record, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-[#141414] transition-colors">
                      <td className="py-3 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                            {getInitials(record.name)}
                          </div>
                          <div>
                            <p className="text-[14px] font-semibold text-[#0f172a] dark:text-[#f8fafc] whitespace-nowrap">{record.name}</p>
                            <p className="text-[12px] text-gray-500 dark:text-[#a1a1aa]">{record.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-5">
                        <p className="text-[13px] font-semibold text-[#0f172a] dark:text-[#f8fafc] whitespace-nowrap">{record.dept}</p>
                        <p className="text-[12px] text-gray-500 dark:text-[#a1a1aa] whitespace-nowrap">{record.shift}</p>
                      </td>
                      <td className="py-3 px-5">
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="text-[12px] text-gray-500 dark:text-[#a1a1aa] leading-none mb-1">In</p>
                            <p className="text-[13px] font-bold text-[#0f172a] dark:text-[#f8fafc] leading-none whitespace-nowrap">{record.clockIn}</p>
                          </div>
                          <div>
                            <p className="text-[12px] text-gray-500 dark:text-[#a1a1aa] leading-none mb-1">Out</p>
                            <p className="text-[13px] font-bold text-[#0f172a] dark:text-[#f8fafc] leading-none whitespace-nowrap">{record.clockOut}</p>
                          </div>
                          <div className="hidden md:block border-l border-[#e5e7eb] dark:border-[#262626] pl-4">
                            <p className="text-[12px] text-gray-500 dark:text-[#a1a1aa] leading-none mb-1">Total</p>
                            <p className="text-[13px] font-bold text-[#0f172a] dark:text-[#f8fafc] leading-none whitespace-nowrap">{record.hours}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-5">
                        <div className="flex flex-col items-start gap-1">
                          <span className={clsx("inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold whitespace-nowrap", getStatusColor(record.status))}>
                            {record.status}
                          </span>
                          <span className="text-[12px] text-gray-500 dark:text-[#a1a1aa] truncate max-w-[120px]" title={record.remarks}>{record.remarks}</span>
                        </div>
                      </td>
                      <td className="py-3 px-5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-1.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors" title="View"><Eye size={16} /></button>
                          <button className="p-1.5 text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-500/10 rounded-lg transition-colors" title="Edit Attendance"><Edit size={16} /></button>
                          <button className="p-1.5 text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-500/10 rounded-lg transition-colors" title="Regularize"><FileClock size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Side: Side cards */}
        <div className="xl:col-span-1 space-y-6">
          
          {/* 6. Late Arrival List */}
          <div className="bg-[#ffffff] dark:bg-[#111111] border border-[#e5e7eb] dark:border-[#262626] rounded-2xl shadow-sm p-5">
            <h2 className="text-[16px] font-bold text-[#0f172a] dark:text-[#f8fafc] mb-4">Late Arrivals Today</h2>
            <div className="space-y-4">
              {lateArrivals.map((late, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 border border-orange-100 dark:border-orange-500/20 bg-orange-50/50 dark:bg-orange-500/5 rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock size={14} strokeWidth={3} />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-[#0f172a] dark:text-[#f8fafc]">{late.name}</p>
                    <p className="text-[12px] text-gray-500 dark:text-[#a1a1aa]">{late.dept}</p>
                    <div className="flex flex-wrap items-center gap-2 mt-1.5">
                      <span className="text-[11px] font-semibold bg-white dark:bg-[#111111] border border-orange-100 dark:border-orange-500/30 text-orange-600 dark:text-orange-400 px-1.5 py-0.5 rounded whitespace-nowrap">In at {late.clockIn}</span>
                      <span className="text-[11px] font-bold text-red-500 whitespace-nowrap">{late.lateBy} late</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 7. Absent Employees Card */}
          <div className="bg-[#ffffff] dark:bg-[#111111] border border-[#e5e7eb] dark:border-[#262626] rounded-2xl shadow-sm p-5">
            <h2 className="text-[16px] font-bold text-[#0f172a] dark:text-[#f8fafc] mb-4">Absent Today</h2>
            <div className="space-y-4">
              {absentEmployees.map((absent, idx) => (
                <div key={idx} className="flex items-center justify-between pb-3 border-b border-[#e5e7eb] dark:border-[#262626] last:border-0 last:pb-0">
                  <div>
                    <p className="text-[13px] font-bold text-[#0f172a] dark:text-[#f8fafc]">{absent.name}</p>
                    <p className="text-[12px] text-gray-500 dark:text-[#a1a1aa]">{absent.dept}</p>
                    <p className="text-[11px] text-gray-400 dark:text-[#737373] mt-0.5">Mgr: {absent.manager}</p>
                  </div>
                  <button className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-50 dark:bg-[#181818] hover:bg-blue-50 dark:hover:bg-blue-500/10 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 border border-[#e5e7eb] dark:border-[#262626] hover:border-blue-200 dark:hover:border-blue-500/30 rounded-lg text-[11px] font-bold transition-colors">
                    <Bell size={12} /> Notify
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* 8. Manual Entry Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#111111] rounded-2xl shadow-xl border border-[#e5e7eb] dark:border-[#262626] w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-5 border-b border-[#e5e7eb] dark:border-[#262626]">
              <h2 className="text-[18px] font-bold text-[#0f172a] dark:text-[#f8fafc]">Manual Attendance Entry</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-[#0f172a] dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-[#181818] transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-[13px] font-semibold text-gray-700 dark:text-[#a1a1aa] mb-1.5">Employee</label>
                <select className="w-full bg-[#f9fafb] dark:bg-[#181818] border border-[#e5e7eb] dark:border-[#262626] focus:border-blue-500/50 rounded-xl px-4 py-2.5 text-sm font-medium outline-none text-[#0f172a] dark:text-[#f8fafc]">
                  <option>Select Employee</option>
                  <option>Rahul Sharma (EMP-1002)</option>
                  <option>Anjali Gupta (EMP-1007)</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-gray-700 dark:text-[#a1a1aa] mb-1.5">Date</label>
                  <input type="date" defaultValue="2026-04-29" className="w-full bg-[#f9fafb] dark:bg-[#181818] border border-[#e5e7eb] dark:border-[#262626] focus:border-blue-500/50 rounded-xl px-4 py-2.5 text-sm font-medium outline-none text-[#0f172a] dark:text-[#f8fafc] [color-scheme:light] dark:[color-scheme:dark]" />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-gray-700 dark:text-[#a1a1aa] mb-1.5">Status</label>
                  <select className="w-full bg-[#f9fafb] dark:bg-[#181818] border border-[#e5e7eb] dark:border-[#262626] focus:border-blue-500/50 rounded-xl px-4 py-2.5 text-sm font-medium outline-none text-[#0f172a] dark:text-[#f8fafc]">
                    <option>Present</option>
                    <option>Late</option>
                    <option>Half Day</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-gray-700 dark:text-[#a1a1aa] mb-1.5">Clock In</label>
                  <input type="time" className="w-full bg-[#f9fafb] dark:bg-[#181818] border border-[#e5e7eb] dark:border-[#262626] focus:border-blue-500/50 rounded-xl px-4 py-2.5 text-sm font-medium outline-none text-[#0f172a] dark:text-[#f8fafc] [color-scheme:light] dark:[color-scheme:dark]" />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-gray-700 dark:text-[#a1a1aa] mb-1.5">Clock Out</label>
                  <input type="time" className="w-full bg-[#f9fafb] dark:bg-[#181818] border border-[#e5e7eb] dark:border-[#262626] focus:border-blue-500/50 rounded-xl px-4 py-2.5 text-sm font-medium outline-none text-[#0f172a] dark:text-[#f8fafc] [color-scheme:light] dark:[color-scheme:dark]" />
                </div>
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-gray-700 dark:text-[#a1a1aa] mb-1.5">Reason / Remarks</label>
                <input type="text" placeholder="e.g. Forgot to punch in" className="w-full bg-[#f9fafb] dark:bg-[#181818] border border-[#e5e7eb] dark:border-[#262626] focus:border-blue-500/50 rounded-xl px-4 py-2.5 text-sm font-medium outline-none text-[#0f172a] dark:text-[#f8fafc] placeholder:text-gray-400" />
              </div>
            </div>
            <div className="p-5 border-t border-[#e5e7eb] dark:border-[#262626] flex items-center justify-end gap-3 bg-gray-50/50 dark:bg-[#141414]">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2.5 bg-white dark:bg-[#181818] border border-[#e5e7eb] dark:border-[#262626] hover:bg-gray-50 dark:hover:bg-[#262626] text-[#0f172a] dark:text-[#f8fafc] rounded-xl text-sm font-semibold transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors"
              >
                <Check size={16} /> Save Entry
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
