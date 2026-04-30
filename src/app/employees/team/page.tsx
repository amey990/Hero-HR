"use client";

import {
 Users, UserCheck, Home, CalendarOff, Mail, Video,
 MapPin, Eye, MessageSquare
} from "lucide-react";

const manager = {
 initials: "AM", name: "Amey Muley", role: "HR Manager", dept: "Human Resources",
 teamSize: 8, location: "HQ Office", reportingTo: "HR Head",
};

const teamMembers = [
 { id: "EMP001", name: "Alena Gouse", designation: "UI Designer", dept: "Design", initials: "AG", color: "bg-blue-100 dark:bg-blue-50 text-blue-600", status: "Present", checkin: "10:02 AM", location: "HQ Office" },
 { id: "EMP002", name: "Miracle Vetrovs", designation: "UX Designer", dept: "Design", initials: "MV", color: "bg-purple-100 text-purple-600", status: "On Leave", checkin: "-", location: "-" },
 { id: "EMP003", name: "Avery Arwood", designation: "UI Designer", dept: "Design", initials: "AA", color: "bg-orange-100 text-orange-600", status: "WFH", checkin: "09:45 AM", location: "Remote" },
 { id: "EMP004", name: "Priya Desai", designation: "HR Executive", dept: "HR", initials: "PD", color: "bg-pink-100 text-pink-600", status: "Present", checkin: "09:30 AM", location: "HQ Office" },
 { id: "EMP005", name: "Rohit Sharma", designation: "Frontend Dev", dept: "Engineering", initials: "RS", color: "bg-green-100 text-green-600", status: "Present", checkin: "10:15 AM", location: "HQ Office" },
 { id: "EMP006", name: "Neha Singh", designation: "Sales Executive", dept: "Sales", initials: "NS", color: "bg-teal-100 text-teal-600", status: "Present", checkin: "09:50 AM", location: "HQ Office" },
 { id: "EMP007", name: "Karan Patel", designation: "Tech Lead", dept: "Engineering", initials: "KP", color: "bg-indigo-100 text-indigo-600", status: "Present", checkin: "09:20 AM", location: "HQ Office" },
 { id: "EMP008", name: "John Erikwood", designation: "Marketing Lead", dept: "Marketing", initials: "JE", color: "bg-amber-100 text-amber-600", status: "Present", checkin: "10:30 AM", location: "HQ Office" },
];

const statusStyle: Record<string, string> = {
 Present: "bg-green-50 dark:bg-green-500/10 text-green-700 border-green-200 dark:border-green-500/30",
 "On Leave": "bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 border-yellow-200 dark:border-yellow-500/30",
 WFH: "bg-blue-50 dark:bg-blue-500/10 text-blue-700 border-blue-200 dark:border-blue-500/30",
 Absent: "bg-gray-100 dark:bg-[#111111] text-gray-500 dark:text-[#a1a1aa] border-gray-200 dark:border-[#262626]",
};

const statusDot: Record<string, string> = {
 Present: "bg-green-50 dark:bg-green-500/100",
 "On Leave": "bg-yellow-400",
 WFH: "bg-blue-50 dark:bg-blue-500/100",
 Absent: "bg-gray-400",
};

const availability = [
 { label: "Present", count: 6, color: "bg-green-50 dark:bg-green-500/100" },
 { label: "Work From Home", count: 1, color: "bg-blue-50 dark:bg-blue-500/100" },
 { label: "On Leave", count: 1, color: "bg-yellow-400" },
 { label: "Absent", count: 0, color: "bg-gray-400" },
];

export default function MyTeamPage() {
 return (
 <div className="space-y-6 pb-12">
 {/* Header */}
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
 <div>
 <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">My Team</h1>
 <p className="text-gray-500 dark:text-[#a1a1aa] mt-1 text-sm font-medium">View your reporting team, availability and work status.</p>
 </div>
 <div className="flex items-center gap-3">
 <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#262626] text-sm font-semibold text-gray-700 dark:text-[#cbd5e1] bg-white dark:bg-[#111111] hover:bg-gray-50 dark:bg-[#111111] dark:hover:bg-[#181818] transition-colors">
 <Mail size={16} /> Message Team
 </button>
 <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm">
 <Video size={16} /> Schedule Meeting
 </button>
 </div>
 </div>

 {/* Manager Card + Stats */}
 <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-5">
 {/* Manager Summary */}
 <div className="bg-white dark:bg-[#111111] rounded-2xl p-6 border border-gray-100 dark:border-[#262626] shadow-sm flex items-center gap-5">
 <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shrink-0">
 {manager.initials}
 </div>
 <div className="flex-1 min-w-0">
 <h3 className="text-lg font-bold text-gray-900 dark:text-white">{manager.name}</h3>
 <p className="text-sm text-gray-500 dark:text-[#a1a1aa]">{manager.role} · {manager.dept}</p>
 <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-[12px] text-gray-500 dark:text-[#a1a1aa]">
 <span className="flex items-center gap-1"><Users size={13} /> {manager.teamSize} members</span>
 <span className="flex items-center gap-1"><MapPin size={13} /> {manager.location}</span>
 <span>Reports to: <span className="font-semibold text-gray-700 dark:text-[#cbd5e1]">{manager.reportingTo}</span></span>
 </div>
 </div>
 </div>

 {/* Stats Cards */}
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
 {[
 { icon: Users, label: "Total Members", value: "8", color: "bg-blue-50 dark:bg-blue-500/10 text-blue-600" },
 { icon: UserCheck, label: "Present Today", value: "6", color: "bg-green-50 dark:bg-green-500/10 text-green-600" },
 { icon: Home, label: "Work From Home", value: "1", color: "bg-indigo-50 text-indigo-600" },
 { icon: CalendarOff, label: "On Leave", value: "1", color: "bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600" },
 ].map((s) => (
 <div key={s.label} className="bg-white dark:bg-[#111111] rounded-2xl p-4 border border-gray-100 dark:border-[#262626] shadow-sm transition-shadow group">
 <div className={`w-9 h-9 rounded-xl ${s.color} flex items-center justify-center mb-2 transition-transform`}>
 <s.icon size={18} strokeWidth={2.5} />
 </div>
 <p className="text-[11px] text-gray-500 dark:text-[#a1a1aa] font-medium">{s.label}</p>
 <h4 className="text-lg font-bold text-gray-900 dark:text-white">{s.value}</h4>
 </div>
 ))}
 </div>
 </div>

 {/* Team Member Grid */}
 <div>
 <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Team Members</h2>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
 {teamMembers.map((m) => (
 <div key={m.id} className="bg-white dark:bg-[#111111] rounded-2xl p-5 border border-gray-100 dark:border-[#262626] shadow-sm hover:border-blue-100 transition-all group">
 {/* Avatar + Name + Status dot */}
 <div className="flex items-center gap-3 mb-4">
 <div className="relative shrink-0">
 <div className={`w-11 h-11 rounded-full ${m.color} flex items-center justify-center font-bold text-xs`}>{m.initials}</div>
 <span className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${statusDot[m.status]}`} />
 </div>
 <div className="min-w-0">
 <p className="text-[13px] font-bold text-gray-900 dark:text-white truncate">{m.name}</p>
 <p className="text-[11px] text-gray-500 dark:text-[#a1a1aa] truncate">{m.designation}</p>
 </div>
 </div>

 {/* Details */}
 <div className="space-y-2.5 mb-4">
 <div className="flex items-center justify-between text-[12px]">
 <span className="text-gray-400 dark:text-[#737373]">ID</span>
 <span className="font-medium text-gray-700 dark:text-[#cbd5e1]">{m.id}</span>
 </div>
 <div className="flex items-center justify-between text-[12px]">
 <span className="text-gray-400 dark:text-[#737373]">Department</span>
 <span className="font-medium text-gray-700 dark:text-[#cbd5e1]">{m.dept}</span>
 </div>
 <div className="flex items-center justify-between text-[12px]">
 <span className="text-gray-400 dark:text-[#737373]">Status</span>
 <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${statusStyle[m.status]}`}>{m.status}</span>
 </div>
 <div className="flex items-center justify-between text-[12px]">
 <span className="text-gray-400 dark:text-[#737373]">Check-in</span>
 <span className="font-medium text-gray-700 dark:text-[#cbd5e1]">{m.checkin}</span>
 </div>
 <div className="flex items-center justify-between text-[12px]">
 <span className="text-gray-400 dark:text-[#737373]">Location</span>
 <span className="font-medium text-gray-700 dark:text-[#cbd5e1]">{m.location}</span>
 </div>
 </div>

 {/* Actions */}
 <div className="flex items-center gap-2 pt-3 border-t border-gray-100 dark:border-[#262626]">
 <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[12px] font-semibold text-blue-600 bg-blue-50 dark:bg-blue-500/10 hover:bg-blue-100 dark:bg-blue-50 transition-colors">
 <Eye size={13} /> View Profile
 </button>
 <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[12px] font-semibold text-gray-600 dark:text-[#a1a1aa] bg-gray-50 dark:bg-[#111111] hover:bg-gray-100 dark:bg-[#111111] dark:hover:bg-[#181818] transition-colors">
 <MessageSquare size={13} /> Message
 </button>
 </div>
 </div>
 ))}
 </div>
 </div>

 {/* Team Availability */}
 <div className="bg-white dark:bg-[#111111] rounded-2xl p-5 border border-gray-100 dark:border-[#262626] shadow-sm">
 <h3 className="font-bold text-gray-900 dark:text-white mb-4">Today&apos;s Team Availability</h3>
 <div className="flex flex-wrap items-center gap-6">
 {availability.map((a) => (
 <div key={a.label} className="flex items-center gap-2.5">
 <span className={`w-3 h-3 rounded-full ${a.color}`} />
 <span className="text-sm text-gray-700 dark:text-[#cbd5e1] font-medium">{a.label}</span>
 <span className="text-sm font-bold text-gray-900 dark:text-white">{a.count}</span>
 </div>
 ))}
 </div>
 <div className="flex mt-4 h-2.5 rounded-full overflow-hidden bg-gray-100 dark:bg-[#111111]">
 <div className="bg-green-50 dark:bg-green-500/100 transition-all" style={{ width: "75%" }} />
 <div className="bg-blue-50 dark:bg-blue-500/100 transition-all" style={{ width: "12.5%" }} />
 <div className="bg-yellow-400 transition-all" style={{ width: "12.5%" }} />
 </div>
 </div>
 </div>
 );
}
