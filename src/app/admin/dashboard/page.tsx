"use client";

import {
  Users,
  UserCheck,
  CalendarOff,
  Clock,
  ChevronDown,
  Download,
  CalendarClock,
  FileCheck,
  CreditCard,
  UserPlus,
  ShieldCheck,
  Bell,
  Eye,
  Check,
  X,
  Upload,
  Calendar,
  Ticket,
  MoreVertical,
  ArrowRight
} from "lucide-react";
import clsx from "clsx";

export default function AdminDashboardPage() {
  const topKPIs = [
    { title: "Total Employees", value: "248", sub: "+12 this month", icon: Users, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-500/10" },
    { title: "Present Today", value: "213", sub: "86% attendance rate", icon: UserCheck, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
    { title: "On Leave Today", value: "18", sub: "7 departments affected", icon: CalendarOff, color: "text-orange-600 dark:text-orange-400", bg: "bg-orange-50 dark:bg-orange-500/10" },
    { title: "Pending Approvals", value: "27", sub: "Requires HR action", icon: Clock, color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-500/10" },
  ];

  const approvals = [
    { label: "Leave Requests", count: 12, action: "Review Leaves" },
    { label: "Regularization Requests", count: 8, action: "Review Regularizations" },
    { label: "Reimbursements", count: 5, action: "Review Claims" },
    { label: "Document Acknowledgements", count: 38, action: "View Acknowledgements" },
  ];

  const attendanceData = [
    { label: "Present", value: 213, color: "bg-emerald-500" },
    { label: "Absent", value: 17, color: "bg-red-500" },
    { label: "Late Arrivals", value: 21, color: "bg-orange-500" },
    { label: "Work From Home", value: 32, color: "bg-blue-500" },
  ];
  const totalAttendance = attendanceData.reduce((acc, curr) => acc + curr.value, 0);

  const departments = [
    { name: "Human Resources", count: 28, total: 248 },
    { name: "Engineering", count: 86, total: 248 },
    { name: "Sales", count: 42, total: 248 },
    { name: "Finance", count: 18, total: 248 },
    { name: "Operations", count: 52, total: 248 },
    { name: "Support", count: 22, total: 248 },
  ];

  const activities = [
    { title: "New employee added", desc: "Priya Desai", time: "2h ago", icon: UserPlus, color: "text-blue-500 bg-blue-100 dark:bg-blue-500/20" },
    { title: "Leave approved", desc: "Miracle Vetrovs", time: "3h ago", icon: Check, color: "text-emerald-500 bg-emerald-100 dark:bg-emerald-500/20" },
    { title: "Attendance regularization", desc: "Submitted by Alena Gouse", time: "5h ago", icon: Clock, color: "text-orange-500 bg-orange-100 dark:bg-orange-500/20" },
    { title: "Payroll policy updated", desc: "System update", time: "1d ago", icon: ShieldCheck, color: "text-purple-500 bg-purple-100 dark:bg-purple-500/20" },
    { title: "Acknowledgement reminder", desc: "Code of Conduct", time: "1d ago", icon: Bell, color: "text-indigo-500 bg-indigo-100 dark:bg-indigo-500/20" },
  ];

  const leaveRequests = [
    { employee: "Rahul Sharma", type: "Sick Leave", date: "Oct 12 - Oct 14", days: 3, dept: "Engineering" },
    { employee: "Anjali Gupta", type: "Casual Leave", date: "Oct 15", days: 1, dept: "Sales" },
    { employee: "Vikram Singh", type: "Paid Leave", date: "Oct 20 - Oct 24", days: 5, dept: "Finance" },
    { employee: "Sneha Iyer", type: "Maternity Leave", date: "Nov 1 - Feb 1", days: 90, dept: "Human Resources" },
  ];

  const tickets = [
    { id: "HR-1042", employee: "Neha Patel", category: "Payroll", priority: "High", status: "Open" },
    { id: "HR-1043", employee: "Rohan Verma", category: "Hardware", priority: "Medium", status: "In Progress" },
    { id: "HR-1044", employee: "Sneha Iyer", category: "Software Access", priority: "Low", status: "Open" },
    { id: "HR-1045", employee: "Karan Singh", category: "Policy Query", priority: "Critical", status: "Open" },
  ];

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case "Low": return "bg-gray-100 text-gray-700 dark:bg-[#262626] dark:text-gray-300";
      case "Medium": return "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400";
      case "High": return "bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400";
      case "Critical": return "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6 pb-10">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0f172a] dark:text-[#f8fafc] tracking-tight">Admin Dashboard</h1>
          <p className="text-[#64748b] dark:text-[#a1a1aa] mt-1 text-[14px]">Monitor HR operations, approvals and company-wide activities.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#ffffff] dark:bg-[#111111] border border-[#e5e7eb] dark:border-[#262626] rounded-xl text-sm font-semibold text-[#0f172a] dark:text-[#f8fafc] hover:bg-gray-50 dark:hover:bg-[#181818] transition-colors shadow-sm">
            This Month <ChevronDown size={16} className="text-gray-400" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm shadow-blue-500/20">
            <Download size={16} /> Export Report
          </button>
        </div>
      </div>

      {/* 2. Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {topKPIs.map((kpi, idx) => (
          <div key={idx} className="bg-[#ffffff] dark:bg-[#111111] border border-[#e5e7eb] dark:border-[#262626] rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[13px] font-medium text-gray-500 dark:text-[#a1a1aa] mb-1">{kpi.title}</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 3. Approval Queue Summary */}
        <div className="bg-[#ffffff] dark:bg-[#111111] border border-[#e5e7eb] dark:border-[#262626] rounded-2xl shadow-sm flex flex-col">
          <div className="p-5 border-b border-[#e5e7eb] dark:border-[#262626]">
            <h2 className="text-[16px] font-bold text-[#0f172a] dark:text-[#f8fafc]">Approval Queue</h2>
          </div>
          <div className="p-2 flex-1">
            {approvals.map((app, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-[#181818] rounded-xl transition-colors group">
                <div>
                  <p className="text-[14px] font-semibold text-[#0f172a] dark:text-[#f8fafc]">{app.label}</p>
                  <p className="text-[13px] text-gray-500 dark:text-[#a1a1aa] mt-0.5">{app.count} pending</p>
                </div>
                <button className="text-[12px] font-semibold text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  {app.action} <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Attendance Overview */}
        <div className="bg-[#ffffff] dark:bg-[#111111] border border-[#e5e7eb] dark:border-[#262626] rounded-2xl shadow-sm flex flex-col">
          <div className="p-5 border-b border-[#e5e7eb] dark:border-[#262626] flex items-center justify-between">
            <h2 className="text-[16px] font-bold text-[#0f172a] dark:text-[#f8fafc]">Attendance Overview</h2>
            <button className="text-gray-400 hover:text-[#0f172a] dark:hover:text-white transition-colors"><MoreVertical size={16} /></button>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-center">
            {/* Progress Bar Visual */}
            <div className="w-full h-4 rounded-full overflow-hidden flex mb-6">
              {attendanceData.map((data, idx) => (
                <div key={idx} style={{ width: `${(data.value / totalAttendance) * 100}%` }} className={clsx("h-full", data.color)} />
              ))}
            </div>
            {/* Legend */}
            <div className="grid grid-cols-2 gap-y-4 gap-x-2">
              {attendanceData.map((data, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className={clsx("w-3 h-3 rounded-full shrink-0", data.color)} />
                  <div>
                    <p className="text-[12px] text-gray-500 dark:text-[#a1a1aa] font-medium leading-none mb-1">{data.label}</p>
                    <p className="text-[15px] font-bold text-[#0f172a] dark:text-[#f8fafc] leading-none">{data.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 5. Department Workforce Summary */}
        <div className="bg-[#ffffff] dark:bg-[#111111] border border-[#e5e7eb] dark:border-[#262626] rounded-2xl shadow-sm flex flex-col">
          <div className="p-5 border-b border-[#e5e7eb] dark:border-[#262626] flex items-center justify-between">
            <h2 className="text-[16px] font-bold text-[#0f172a] dark:text-[#f8fafc]">Workforce Summary</h2>
            <span className="text-[12px] font-medium text-gray-500 dark:text-[#a1a1aa]">By Dept</span>
          </div>
          <div className="p-5 space-y-4 flex-1">
            {departments.map((dept, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[13px] font-semibold text-[#0f172a] dark:text-[#f8fafc]">{dept.name}</span>
                  <span className="text-[13px] font-medium text-gray-500 dark:text-[#a1a1aa]">{dept.count}</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-[#262626] rounded-full h-1.5">
                  <div className="bg-blue-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${(dept.count / dept.total) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 7. Pending Leave Requests table */}
        <div className="lg:col-span-2 bg-[#ffffff] dark:bg-[#111111] border border-[#e5e7eb] dark:border-[#262626] rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-[#e5e7eb] dark:border-[#262626] flex items-center justify-between">
            <h2 className="text-[16px] font-bold text-[#0f172a] dark:text-[#f8fafc]">Pending Leave Requests</h2>
            <button className="text-[13px] font-semibold text-blue-600 dark:text-blue-400 hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-[#181818] border-b border-[#e5e7eb] dark:border-[#262626]">
                  <th className="py-3 px-5 text-[12px] font-bold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider">Employee</th>
                  <th className="py-3 px-5 text-[12px] font-bold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider">Leave Type</th>
                  <th className="py-3 px-5 text-[12px] font-bold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider">Date & Days</th>
                  <th className="py-3 px-5 text-[12px] font-bold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider">Status</th>
                  <th className="py-3 px-5 text-[12px] font-bold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e5e7eb] dark:divide-[#262626]">
                {leaveRequests.map((req, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-[#141414] transition-colors">
                    <td className="py-3.5 px-5">
                      <p className="text-[14px] font-semibold text-[#0f172a] dark:text-[#f8fafc]">{req.employee}</p>
                      <p className="text-[12px] text-gray-500 dark:text-[#a1a1aa]">{req.dept}</p>
                    </td>
                    <td className="py-3.5 px-5 text-[14px] text-gray-700 dark:text-gray-300 font-medium">{req.type}</td>
                    <td className="py-3.5 px-5">
                      <p className="text-[13px] text-[#0f172a] dark:text-[#f8fafc] font-medium">{req.date}</p>
                      <p className="text-[12px] text-gray-500 dark:text-[#a1a1aa]">{req.days} days</p>
                    </td>
                    <td className="py-3.5 px-5">
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-[11px] font-bold bg-yellow-50 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-500">
                        Pending
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-right space-x-2">
                      <button className="p-1.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors" title="View"><Eye size={16} /></button>
                      <button className="p-1.5 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-lg transition-colors" title="Approve"><Check size={16} /></button>
                      <button className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors" title="Reject"><X size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 6. Recent HR Activities */}
        <div className="bg-[#ffffff] dark:bg-[#111111] border border-[#e5e7eb] dark:border-[#262626] rounded-2xl shadow-sm flex flex-col">
          <div className="p-5 border-b border-[#e5e7eb] dark:border-[#262626] flex items-center justify-between">
            <h2 className="text-[16px] font-bold text-[#0f172a] dark:text-[#f8fafc]">Recent Activities</h2>
          </div>
          <div className="p-5 flex-1">
            <div className="relative border-l border-gray-100 dark:border-[#262626] ml-3 space-y-6">
              {activities.map((act, idx) => (
                <div key={idx} className="relative pl-6">
                  <div className={clsx("absolute -left-[14px] top-0.5 w-7 h-7 rounded-full flex items-center justify-center ring-4 ring-white dark:ring-[#111111]", act.color)}>
                    <act.icon size={12} strokeWidth={3} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-[14px] font-semibold text-[#0f172a] dark:text-[#f8fafc]">{act.title}</p>
                      <span className="text-[11px] font-medium text-gray-400">{act.time}</span>
                    </div>
                    <p className="text-[13px] text-gray-500 dark:text-[#a1a1aa] mt-0.5">{act.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 8. Support Tickets Preview */}
        <div className="lg:col-span-2 bg-[#ffffff] dark:bg-[#111111] border border-[#e5e7eb] dark:border-[#262626] rounded-2xl shadow-sm flex flex-col">
          <div className="p-5 border-b border-[#e5e7eb] dark:border-[#262626] flex items-center justify-between">
            <h2 className="text-[16px] font-bold text-[#0f172a] dark:text-[#f8fafc]">Support Tickets</h2>
            <button className="text-[13px] font-semibold text-blue-600 dark:text-blue-400 hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-[#181818] border-b border-[#e5e7eb] dark:border-[#262626]">
                  <th className="py-3 px-5 text-[12px] font-bold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider">Ticket</th>
                  <th className="py-3 px-5 text-[12px] font-bold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider">Category</th>
                  <th className="py-3 px-5 text-[12px] font-bold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider">Priority</th>
                  <th className="py-3 px-5 text-[12px] font-bold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e5e7eb] dark:divide-[#262626]">
                {tickets.map((t, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-[#141414] transition-colors cursor-pointer">
                    <td className="py-3.5 px-5">
                      <p className="text-[13px] font-bold text-[#0f172a] dark:text-[#f8fafc]">{t.id}</p>
                      <p className="text-[12px] text-gray-500 dark:text-[#a1a1aa]">{t.employee}</p>
                    </td>
                    <td className="py-3.5 px-5 text-[14px] text-gray-700 dark:text-gray-300 font-medium">{t.category}</td>
                    <td className="py-3.5 px-5">
                      <span className={clsx("inline-flex items-center px-2 py-1 rounded-md text-[11px] font-bold", getPriorityColor(t.priority))}>
                        {t.priority}
                      </span>
                    </td>
                    <td className="py-3.5 px-5">
                      <span className="text-[13px] font-semibold text-gray-700 dark:text-gray-300">{t.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {/* 9. Document Compliance */}
          <div className="bg-[#ffffff] dark:bg-[#111111] border border-[#e5e7eb] dark:border-[#262626] rounded-2xl shadow-sm p-5">
            <h2 className="text-[16px] font-bold text-[#0f172a] dark:text-[#f8fafc] mb-4">Document Compliance</h2>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-3xl font-bold text-[#0f172a] dark:text-[#f8fafc]">79%</span>
              <span className="text-[13px] font-medium text-emerald-600 dark:text-emerald-400 mb-1">+2% this week</span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-[#262626] rounded-full h-2 mb-5">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: "79%" }}></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[12px] text-gray-500 dark:text-[#a1a1aa] font-medium mb-0.5">Published</p>
                <p className="text-[15px] font-bold text-[#0f172a] dark:text-[#f8fafc]">24</p>
              </div>
              <div>
                <p className="text-[12px] text-gray-500 dark:text-[#a1a1aa] font-medium mb-0.5">Acknowledged</p>
                <p className="text-[15px] font-bold text-[#0f172a] dark:text-[#f8fafc]">142</p>
              </div>
            </div>
          </div>

          {/* 10. Quick Actions */}
          <div className="bg-[#ffffff] dark:bg-[#111111] border border-[#e5e7eb] dark:border-[#262626] rounded-2xl shadow-sm p-5">
            <h2 className="text-[16px] font-bold text-[#0f172a] dark:text-[#f8fafc] mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-[#181818] border border-transparent hover:border-gray-200 dark:hover:border-[#262626] transition-all group text-left">
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0"><UserPlus size={16} /></div>
                <span className="text-[14px] font-semibold text-[#0f172a] dark:text-[#f8fafc] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Add Employee</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-[#181818] border border-transparent hover:border-gray-200 dark:hover:border-[#262626] transition-all group text-left">
                <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0"><Upload size={16} /></div>
                <span className="text-[14px] font-semibold text-[#0f172a] dark:text-[#f8fafc] group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Upload Document</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-[#181818] border border-transparent hover:border-gray-200 dark:hover:border-[#262626] transition-all group text-left">
                <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0"><Calendar size={16} /></div>
                <span className="text-[14px] font-semibold text-[#0f172a] dark:text-[#f8fafc] group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">Review Leave Requests</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
