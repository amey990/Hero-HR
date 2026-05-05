"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Users, UserCheck, UserX, UserPlus, Search, Filter, RefreshCw,
  Download, Plus, MoreVertical, Eye, Edit, FileText, Ban, Mail, Phone, Briefcase
} from "lucide-react";
import clsx from "clsx";

const mockEmployees = [
  { id: "EMP-1001", name: "Priya Desai", email: "priya.d@herohr.com", department: "Human Resources", designation: "HR Manager", manager: "Ravi Kumar", location: "Mumbai", type: "Full-time", status: "Active", joinDate: "12 Jan 2024", phone: "+91 98765 43210" },
  { id: "EMP-1002", name: "Rahul Sharma", email: "rahul.s@herohr.com", department: "Engineering", designation: "Senior Developer", manager: "Anita Singh", location: "Bangalore", type: "Full-time", status: "On Leave", joinDate: "05 Mar 2022", phone: "+91 98765 43211" },
  { id: "EMP-1003", name: "Neha Patel", email: "neha.p@herohr.com", department: "Finance", designation: "Financial Analyst", manager: "Vikram Iyer", location: "Mumbai", type: "Full-time", status: "Active", joinDate: "18 Aug 2023", phone: "+91 98765 43212" },
  { id: "EMP-1004", name: "Rohan Verma", email: "rohan.v@herohr.com", department: "Sales", designation: "Sales Executive", manager: "Deepak Mehta", location: "Delhi", type: "Contract", status: "Active", joinDate: "22 Nov 2024", phone: "+91 98765 43213" },
  { id: "EMP-1005", name: "Sneha Iyer", email: "sneha.i@herohr.com", department: "Engineering", designation: "Frontend Engineer", manager: "Rahul Sharma", location: "Bangalore", type: "Full-time", status: "Probation", joinDate: "01 Oct 2024", phone: "+91 98765 43214" },
  { id: "EMP-1006", name: "Karan Singh", email: "karan.s@herohr.com", department: "Operations", designation: "Operations Lead", manager: "Sunita Roy", location: "Pune", type: "Full-time", status: "Inactive", joinDate: "14 Feb 2021", phone: "+91 98765 43215" },
  { id: "EMP-1007", name: "Anjali Gupta", email: "anjali.g@herohr.com", department: "Sales", designation: "Account Manager", manager: "Deepak Mehta", location: "Delhi", type: "Full-time", status: "Active", joinDate: "09 Sep 2022", phone: "+91 98765 43216" },
  { id: "EMP-1008", name: "Vikram Singh", email: "vikram.s@herohr.com", department: "Finance", designation: "Finance Director", manager: "CEO", location: "Mumbai", type: "Full-time", status: "Active", joinDate: "01 Jan 2019", phone: "+91 98765 43217" },
  { id: "EMP-1009", name: "Miracle Vetrovs", email: "miracle.v@herohr.com", department: "Support", designation: "Support Specialist", manager: "Amit Patel", location: "Remote", type: "Intern", status: "Active", joinDate: "15 Oct 2024", phone: "+91 98765 43218" },
  { id: "EMP-1010", name: "Alena Gouse", email: "alena.g@herohr.com", department: "Engineering", designation: "QA Engineer", manager: "Anita Singh", location: "Bangalore", type: "Full-time", status: "Active", joinDate: "20 May 2023", phone: "+91 98765 43219" },
];

export default function AdminEmployeesPage() {
  const router = useRouter();
  const [selectedEmp, setSelectedEmp] = useState(mockEmployees[0]);

  const kpis = [
    { label: "Total Employees", value: "248", sub: "Company wide", icon: Users, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-500/10" },
    { label: "Active Employees", value: "231", sub: "Currently working", icon: UserCheck, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
    { label: "Inactive Employees", value: "9", sub: "Past 30 days", icon: UserX, color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-500/10" },
    { label: "New Joiners", value: "8", sub: "This month", icon: UserPlus, color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-500/10" },
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Active": return "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400";
      case "On Leave": return "bg-yellow-50 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-500";
      case "Inactive": return "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400";
      case "Probation": return "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400";
      default: return "bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2);
  };

  return (
    <div className="space-y-6 pb-10">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0f172a] dark:text-[#f8fafc] tracking-tight">Employee Management</h1>
          <p className="text-[#64748b] dark:text-[#a1a1aa] mt-1 text-[14px]">Manage employee records, roles, departments and employment status.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#ffffff] dark:bg-[#111111] border border-[#e5e7eb] dark:border-[#262626] rounded-xl text-sm font-semibold text-[#0f172a] dark:text-[#f8fafc] hover:bg-gray-50 dark:hover:bg-[#181818] transition-colors shadow-sm">
            <Download size={16} /> Export
          </button>
          <button 
            onClick={() => router.push("/admin/employees/add")}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm shadow-blue-500/20"
          >
            <Plus size={16} /> Add Employee
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

      {/* 3. Search and filters toolbar */}
      <div className="bg-[#ffffff] dark:bg-[#111111] border border-[#e5e7eb] dark:border-[#262626] rounded-2xl p-4 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative group">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Search by name, email, employee ID..."
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
              <option value="">Role</option>
              <option value="manager">Manager</option>
              <option value="dev">Developer</option>
              <option value="exec">Executive</option>
            </select>
            <select className="bg-gray-50 dark:bg-[#181818] border border-transparent focus:border-blue-500/30 focus:bg-[#ffffff] dark:focus:bg-[#111111] rounded-xl px-4 py-2.5 text-sm font-medium outline-none transition-all duration-200 text-[#0f172a] dark:text-[#f8fafc]">
              <option value="">Status</option>
              <option value="active">Active</option>
              <option value="leave">On Leave</option>
              <option value="inactive">Inactive</option>
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

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        
        {/* 4. Employee Table */}
        <div className="xl:col-span-3 bg-[#ffffff] dark:bg-[#111111] border border-[#e5e7eb] dark:border-[#262626] rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-[#181818] border-b border-[#e5e7eb] dark:border-[#262626]">
                  <th className="py-4 px-5 text-[12px] font-bold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider whitespace-nowrap">Employee</th>
                  <th className="py-4 px-5 text-[12px] font-bold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider whitespace-nowrap">ID & Status</th>
                  <th className="py-4 px-5 text-[12px] font-bold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider whitespace-nowrap">Role & Dept</th>
                  <th className="py-4 px-5 text-[12px] font-bold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider whitespace-nowrap">Employment</th>
                  <th className="py-4 px-5 text-[12px] font-bold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider text-right whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e5e7eb] dark:divide-[#262626]">
                {mockEmployees.map((emp) => (
                  <tr 
                    key={emp.id} 
                    onClick={() => setSelectedEmp(emp)}
                    className={clsx(
                      "transition-colors cursor-pointer",
                      selectedEmp.id === emp.id 
                        ? "bg-blue-50/50 dark:bg-blue-500/10" 
                        : "hover:bg-gray-50/50 dark:hover:bg-[#141414]"
                    )}
                  >
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                          {getInitials(emp.name)}
                        </div>
                        <div>
                          <p className="text-[14px] font-semibold text-[#0f172a] dark:text-[#f8fafc] whitespace-nowrap">{emp.name}</p>
                          <p className="text-[12px] text-gray-500 dark:text-[#a1a1aa]">{emp.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-5">
                      <p className="text-[13px] font-bold text-[#0f172a] dark:text-[#f8fafc] whitespace-nowrap">{emp.id}</p>
                      <span className={clsx("inline-flex items-center px-2 py-0.5 mt-1 rounded-md text-[11px] font-bold", getStatusColor(emp.status))}>
                        {emp.status}
                      </span>
                    </td>
                    <td className="py-3 px-5">
                      <p className="text-[13px] font-semibold text-[#0f172a] dark:text-[#f8fafc] whitespace-nowrap">{emp.designation}</p>
                      <p className="text-[12px] text-gray-500 dark:text-[#a1a1aa] whitespace-nowrap">{emp.department}</p>
                    </td>
                    <td className="py-3 px-5">
                      <p className="text-[13px] font-medium text-gray-700 dark:text-[#f8fafc] whitespace-nowrap">{emp.type}</p>
                      <p className="text-[12px] text-gray-500 dark:text-[#a1a1aa] whitespace-nowrap">{emp.location}</p>
                    </td>
                    <td className="py-3 px-5 text-right">
                      <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                        <button className="p-1.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors" title="View"><Eye size={16} /></button>
                        <button className="p-1.5 text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-500/10 rounded-lg transition-colors" title="Edit"><Edit size={16} /></button>
                        <button className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors" title="Deactivate"><Ban size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 8. Employee detail preview */}
        <div className="xl:col-span-1">
          <div className="bg-[#ffffff] dark:bg-[#111111] border border-[#e5e7eb] dark:border-[#262626] rounded-2xl shadow-sm p-6 sticky top-20">
            <h2 className="text-[14px] font-bold text-gray-400 dark:text-[#737373] uppercase tracking-wider mb-6">Selected Employee</h2>
            
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-2xl shadow-md mb-4">
                {getInitials(selectedEmp.name)}
              </div>
              <h3 className="text-xl font-bold text-[#0f172a] dark:text-[#f8fafc]">{selectedEmp.name}</h3>
              <p className="text-[13px] font-semibold text-gray-500 dark:text-[#a1a1aa]">{selectedEmp.designation}</p>
              <span className={clsx("inline-flex items-center px-2.5 py-1 mt-3 rounded-md text-[12px] font-bold", getStatusColor(selectedEmp.status))}>
                {selectedEmp.status}
              </span>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <Briefcase size={16} className="text-gray-400 mt-0.5" />
                <div>
                  <p className="text-[12px] text-gray-500 dark:text-[#a1a1aa] font-medium">Department & ID</p>
                  <p className="text-[14px] font-semibold text-[#0f172a] dark:text-[#f8fafc]">{selectedEmp.department} • {selectedEmp.id}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users size={16} className="text-gray-400 mt-0.5" />
                <div>
                  <p className="text-[12px] text-gray-500 dark:text-[#a1a1aa] font-medium">Manager</p>
                  <p className="text-[14px] font-semibold text-[#0f172a] dark:text-[#f8fafc]">{selectedEmp.manager}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={16} className="text-gray-400 mt-0.5" />
                <div>
                  <p className="text-[12px] text-gray-500 dark:text-[#a1a1aa] font-medium">Email</p>
                  <p className="text-[14px] font-semibold text-[#0f172a] dark:text-[#f8fafc] break-all">{selectedEmp.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={16} className="text-gray-400 mt-0.5" />
                <div>
                  <p className="text-[12px] text-gray-500 dark:text-[#a1a1aa] font-medium">Phone</p>
                  <p className="text-[14px] font-semibold text-[#0f172a] dark:text-[#f8fafc]">{selectedEmp.phone}</p>
                </div>
              </div>
            </div>

            <div className="pt-5 border-t border-[#e5e7eb] dark:border-[#262626] space-y-2">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 dark:bg-blue-500/10 dark:hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-xl text-sm font-semibold transition-colors">
                <Eye size={16} /> View Full Profile
              </button>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-[#e5e7eb] dark:border-[#262626] hover:bg-gray-50 dark:hover:bg-[#181818] text-[#0f172a] dark:text-[#f8fafc] rounded-xl text-sm font-semibold transition-colors">
                <Edit size={16} /> Edit Details
              </button>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-[#e5e7eb] dark:border-[#262626] hover:bg-gray-50 dark:hover:bg-[#181818] text-[#0f172a] dark:text-[#f8fafc] rounded-xl text-sm font-semibold transition-colors">
                <FileText size={16} /> Manage Documents
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
