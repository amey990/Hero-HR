"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { useTheme } from "next-themes";
import {
 ReactFlow, Controls, Background,
 type Node, type Edge, type NodeProps, Handle, Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Search, ChevronDown, ChevronRight, Users, MapPin, Mail, User } from "lucide-react";

// --- Types ---
interface OrgPerson {
 id: string; name: string; designation: string; dept: string; empId: string;
 email: string; manager: string | null; initials: string; color: string;
 status: "Active" | "On Leave"; children: string[];
}

// --- Helper to create person entries ---
function p(id: string, name: string, designation: string, dept: string, empId: string, email: string, manager: string | null, initials: string, color: string, status: "Active" | "On Leave", children: string[]): OrgPerson {
 return { id, name, designation, dept, empId, email, manager, initials, color, status, children };
}

// --- Mock Hierarchy (~55 people) ---
const orgData: Record<string, OrgPerson> = {};
const people: OrgPerson[] = [
 // CEO
 p("ceo", "Rajesh Kumar", "CEO", "Executive", "EMP000", "rajesh@herohr.com", null, "RK", "bg-blue-600", "Active", ["hr-head", "eng-head", "sales-head", "fin-head", "ops-head"]),
 // --- HR ---
 p("hr-head", "Sunita Verma", "HR Head", "Human Resources", "EMP010", "sunita@herohr.com", "Rajesh Kumar", "SV", "bg-purple-600", "Active", ["hr-mgr", "payroll-mgr"]),
 p("hr-mgr", "Amey Muley", "HR Manager", "Human Resources", "EMP011", "amey@herohr.com", "Sunita Verma", "AM", "bg-indigo-600", "Active", ["hr-exec1", "hr-exec2", "recruiter1", "recruiter2"]),
 p("hr-exec1", "Priya Desai", "HR Executive", "Human Resources", "EMP012", "priya@herohr.com", "Amey Muley", "PD", "bg-pink-600", "Active", []),
 p("hr-exec2", "Neha Rao", "HR Executive", "Human Resources", "EMP013", "neha.r@herohr.com", "Amey Muley", "NR", "bg-rose-600", "On Leave", []),
 p("recruiter1", "Sonia Gupta", "Recruiter", "Human Resources", "EMP014", "sonia@herohr.com", "Amey Muley", "SG", "bg-fuchsia-600", "Active", []),
 p("recruiter2", "Deepak Nair", "Recruiter", "Human Resources", "EMP015", "deepak@herohr.com", "Amey Muley", "DN", "bg-violet-600", "Active", []),
 p("payroll-mgr", "Ritu Sharma", "Payroll Manager", "Human Resources", "EMP016", "ritu@herohr.com", "Sunita Verma", "RS", "bg-purple-50 dark:bg-purple-500/100", "Active", ["payroll-exec1", "payroll-exec2"]),
 p("payroll-exec1", "Manoj Tiwari", "Payroll Executive", "Human Resources", "EMP017", "manoj@herohr.com", "Ritu Sharma", "MT", "bg-purple-400", "Active", []),
 p("payroll-exec2", "Kavita Jain", "Payroll Executive", "Human Resources", "EMP018", "kavita@herohr.com", "Ritu Sharma", "KJ", "bg-purple-400", "Active", []),
 // --- Engineering ---
 p("eng-head", "Vikram Singh", "Engineering Head", "Engineering", "EMP020", "vikram@herohr.com", "Rajesh Kumar", "VS", "bg-green-600", "Active", ["fe-lead", "be-lead", "qa-lead", "devops-lead"]),
 p("fe-lead", "Karan Patel", "Frontend Lead", "Engineering", "EMP021", "karan@herohr.com", "Vikram Singh", "KP", "bg-teal-600", "Active", ["fe-dev1", "fe-dev2", "fe-dev3"]),
 p("fe-dev1", "Rohit Sharma", "Frontend Developer", "Engineering", "EMP022", "rohit@herohr.com", "Karan Patel", "RS", "bg-emerald-500", "Active", []),
 p("fe-dev2", "Aisha Khan", "Frontend Developer", "Engineering", "EMP023", "aisha@herohr.com", "Karan Patel", "AK", "bg-emerald-500", "Active", []),
 p("fe-dev3", "Raj Mehta", "Frontend Developer", "Engineering", "EMP024", "raj.m@herohr.com", "Karan Patel", "RM", "bg-emerald-500", "On Leave", []),
 p("be-lead", "Ankit Joshi", "Backend Lead", "Engineering", "EMP025", "ankit@herohr.com", "Vikram Singh", "AJ", "bg-cyan-600", "Active", ["be-dev1", "be-dev2", "be-dev3"]),
 p("be-dev1", "Meera Nair", "Backend Developer", "Engineering", "EMP026", "meera@herohr.com", "Ankit Joshi", "MN", "bg-sky-500", "Active", []),
 p("be-dev2", "Suresh Babu", "Backend Developer", "Engineering", "EMP027", "suresh@herohr.com", "Ankit Joshi", "SB", "bg-sky-500", "Active", []),
 p("be-dev3", "Tanya Roy", "Backend Developer", "Engineering", "EMP028", "tanya@herohr.com", "Ankit Joshi", "TR", "bg-sky-500", "Active", []),
 p("qa-lead", "Poornima Das", "QA Lead", "Engineering", "EMP029", "poornima@herohr.com", "Vikram Singh", "PD", "bg-lime-600", "Active", ["qa-eng1", "qa-eng2"]),
 p("qa-eng1", "Ajay Mishra", "QA Engineer", "Engineering", "EMP030", "ajay@herohr.com", "Poornima Das", "AM", "bg-lime-500", "Active", []),
 p("qa-eng2", "Sneha Patil", "QA Engineer", "Engineering", "EMP031", "sneha@herohr.com", "Poornima Das", "SP", "bg-lime-500", "Active", []),
 p("devops-lead", "Rahul Menon", "DevOps Lead", "Engineering", "EMP032", "rahul@herohr.com", "Vikram Singh", "RM", "bg-yellow-600", "Active", ["devops-eng1", "devops-eng2"]),
 p("devops-eng1", "Vivek Iyer", "DevOps Engineer", "Engineering", "EMP033", "vivek@herohr.com", "Rahul Menon", "VI", "bg-yellow-50 dark:bg-yellow-500/100", "Active", []),
 p("devops-eng2", "Nisha Reddy", "DevOps Engineer", "Engineering", "EMP034", "nisha@herohr.com", "Rahul Menon", "NR", "bg-yellow-50 dark:bg-yellow-500/100", "Active", []),
 // --- Sales ---
 p("sales-head", "Arjun Reddy", "Sales Head", "Sales", "EMP040", "arjun@herohr.com", "Rajesh Kumar", "AR", "bg-orange-600", "Active", ["sales-mgr", "bd-mgr"]),
 p("sales-mgr", "Pooja Mehta", "Sales Manager", "Sales", "EMP041", "pooja@herohr.com", "Arjun Reddy", "PM", "bg-orange-50 dark:bg-orange-500/100", "Active", ["sales-exec1", "sales-exec2", "sales-exec3"]),
 p("sales-exec1", "Ravi Kumar", "Sales Executive", "Sales", "EMP042", "ravi@herohr.com", "Pooja Mehta", "RK", "bg-amber-500", "Active", []),
 p("sales-exec2", "Divya Pillai", "Sales Executive", "Sales", "EMP043", "divya@herohr.com", "Pooja Mehta", "DP", "bg-amber-500", "Active", []),
 p("sales-exec3", "Nitin Agarwal", "Sales Executive", "Sales", "EMP044", "nitin@herohr.com", "Pooja Mehta", "NA", "bg-amber-500", "On Leave", []),
 p("bd-mgr", "Swati Kapoor", "BD Manager", "Sales", "EMP045", "swati@herohr.com", "Arjun Reddy", "SK", "bg-orange-50 dark:bg-orange-500/100", "Active", ["bde1", "bde2"]),
 p("bde1", "Amit Saxena", "BDE", "Sales", "EMP046", "amit@herohr.com", "Swati Kapoor", "AS", "bg-amber-400", "Active", []),
 p("bde2", "Kriti Bose", "BDE", "Sales", "EMP047", "kriti@herohr.com", "Swati Kapoor", "KB", "bg-amber-400", "Active", []),
 // --- Finance ---
 p("fin-head", "Lakshmi Iyer", "Finance Head", "Finance", "EMP050", "lakshmi@herohr.com", "Rajesh Kumar", "LI", "bg-red-600", "Active", ["accountant1", "accountant2"]),
 p("accountant1", "Ramesh Gupta", "Accountant", "Finance", "EMP051", "ramesh@herohr.com", "Lakshmi Iyer", "RG", "bg-red-50 dark:bg-red-500/100", "Active", []),
 p("accountant2", "Preeti Bhatia", "Accountant", "Finance", "EMP052", "preeti@herohr.com", "Lakshmi Iyer", "PB", "bg-red-50 dark:bg-red-500/100", "Active", []),
 // --- Operations ---
 p("ops-head", "Sandeep Rao", "Operations Head", "Operations", "EMP060", "sandeep@herohr.com", "Rajesh Kumar", "SR", "bg-slate-600", "Active", ["ops-mgr"]),
 p("ops-mgr", "Ananya Chatterjee", "Ops Manager", "Operations", "EMP061", "ananya@herohr.com", "Sandeep Rao", "AC", "bg-slate-500", "Active", ["ops-exec1", "ops-exec2"]),
 p("ops-exec1", "Varun Thakur", "Ops Executive", "Operations", "EMP062", "varun@herohr.com", "Ananya Chatterjee", "VT", "bg-slate-400", "Active", []),
 p("ops-exec2", "Megha Dubey", "Ops Executive", "Operations", "EMP063", "megha@herohr.com", "Ananya Chatterjee", "MD", "bg-slate-400", "Active", []),
];
people.forEach((pp) => { orgData[pp.id] = pp; });

// --- Custom Node ---
function EmployeeNode({ data }: NodeProps) {
 const person = data.person as OrgPerson;
 const isSelected = data.isSelected as boolean;
 const isExpanded = data.isExpanded as boolean;
 const hasChildren = person.children.length > 0;
 const onToggle = data.onToggle as (id: string) => void;
 const onSelect = data.onSelect as (id: string) => void;

 return (
 <div
 onClick={() => onSelect(person.id)}
 className={`bg-white dark:bg-[#111111] rounded-xl border-2 p-3 w-[210px] cursor-pointer transition-all ${isSelected ? "border-blue-500 shadow-lg ring-2 ring-blue-100" : "border-gray-100 dark:border-[#262626] shadow-sm"}`}
 >
 <Handle type="target" position={Position.Top} className="!bg-gray-300 !w-2 !h-2 !border-0" />
 <div className="flex items-center gap-2.5">
 <div className={`w-9 h-9 rounded-full ${person.color} flex items-center justify-center text-white font-bold text-[10px] shrink-0`}>
 {person.initials}
 </div>
 <div className="min-w-0 flex-1">
 <p className="text-[12px] font-bold text-gray-900 dark:text-white truncate">{person.name}</p>
 <p className="text-[10px] text-gray-500 dark:text-[#a1a1aa] truncate">{person.designation}</p>
 </div>
 <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${person.status === "Active" ? "bg-green-50 dark:bg-green-500/100" : "bg-yellow-400"}`} />
 </div>
 <div className="mt-2 flex items-center justify-between">
 <span className="text-[9px] font-medium text-gray-400 dark:text-[#737373] uppercase tracking-wide">{person.dept}</span>
 {hasChildren && (
 <button
 onClick={(e) => { e.stopPropagation(); onToggle(person.id); }}
 className={`w-5 h-5 rounded flex items-center justify-center transition-all ${isExpanded ? "bg-blue-100 dark:bg-blue-50 text-blue-600 rotate-90" : "bg-gray-100 dark:bg-[#111111] text-gray-500 dark:text-[#a1a1aa] hover:bg-gray-50 dark:hover:bg-[#181818] hover:text-blue-500"}`}
 >
 <ChevronRight size={12} />
 </button>
 )}
 </div>
 <Handle type="source" position={Position.Bottom} className="!bg-gray-300 !w-2 !h-2 !border-0" />
 </div>
 );
}

const nodeTypes = { employee: EmployeeNode };

// --- Deterministic tree layout ---
const X_GAP = 230;
const Y_GAP = 110;

function getVisibleIds(expanded: Set<string>): string[] {
 const visible: string[] = ["ceo"];
 const queue = ["ceo"];
 while (queue.length) {
 const cur = queue.shift()!;
 if (expanded.has(cur) && orgData[cur]) {
 for (const ch of orgData[cur].children) {
 visible.push(ch);
 queue.push(ch);
 }
 }
 }
 return visible;
}

function buildTree(visibleIds: string[], expanded: Set<string>, selectedId: string | null, onToggle: (id: string) => void, onSelect: (id: string) => void) {
 const visibleSet = new Set(visibleIds);

 // Get visible children for each node
 const childrenOf = (id: string) => orgData[id]?.children.filter((c) => visibleSet.has(c)) || [];

 // Compute level for each node
 const level: Record<string, number> = {};
 level["ceo"] = 0;
 const q = ["ceo"];
 while (q.length) {
 const cur = q.shift()!;
 for (const ch of childrenOf(cur)) {
 level[ch] = (level[cur] ?? 0) + 1;
 q.push(ch);
 }
 }

 // Bottom-up width assignment: each leaf takes 1 slot
 const width: Record<string, number> = {};
 function calcWidth(id: string): number {
 const kids = childrenOf(id);
 if (kids.length === 0) { width[id] = 1; return 1; }
 const total = kids.reduce((sum, k) => sum + calcWidth(k), 0);
 width[id] = total;
 return total;
 }
 calcWidth("ceo");

 // Assign x positions based on slot ranges
 const pos: Record<string, { x: number; y: number }> = {};
 function assignPos(id: string, slotStart: number) {
 const w = width[id] ?? 1;
 const centerX = (slotStart + w / 2) * X_GAP;
 pos[id] = { x: centerX - 105, y: (level[id] ?? 0) * Y_GAP };
 const kids = childrenOf(id);
 let offset = slotStart;
 for (const kid of kids) {
 assignPos(kid, offset);
 offset += width[kid] ?? 1;
 }
 }
 assignPos("ceo", 0);

 const nodes: Node[] = visibleIds.map((id) => ({
 id,
 type: "employee",
 position: pos[id] || { x: 0, y: 0 },
 data: {
 person: orgData[id],
 isSelected: selectedId === id,
 isExpanded: expanded.has(id),
 onToggle,
 onSelect,
 },
 }));

 const edges: Edge[] = [];
 for (const id of visibleIds) {
 for (const ch of childrenOf(id)) {
 edges.push({
 id: `${id}-${ch}`,
 source: id,
 target: ch,
 type: "smoothstep",
 style: { stroke: "#d1d5db", strokeWidth: 2 },
 });
 }
 }

 return { nodes, edges };
}

// --- Page ---
export default function OrgChartPage() {
 const [expanded, setExpanded] = useState<Set<string>>(new Set(["ceo"]));
 const [selectedId, setSelectedId] = useState<string | null>("ceo");
 const { resolvedTheme } = useTheme();
 const [mounted, setMounted] = useState(false);

 useEffect(() => {
 setMounted(true);
 }, []);

 const toggleExpand = useCallback((id: string) => {
 setExpanded((prev) => {
 const next = new Set(prev);
 if (next.has(id)) {
 // Collapse: remove this node and all its descendants from expanded
 const collapse = (nodeId: string) => {
 next.delete(nodeId);
 orgData[nodeId]?.children.forEach(collapse);
 };
 next.delete(id);
 orgData[id]?.children.forEach((ch) => collapse(ch));
 } else {
 next.add(id);
 }
 return next;
 });
 }, []);

 const selectNode = useCallback((id: string) => setSelectedId(id), []);

 const visibleIds = useMemo(() => getVisibleIds(expanded), [expanded]);
 const { nodes, edges } = useMemo(() => buildTree(visibleIds, expanded, selectedId, toggleExpand, selectNode), [visibleIds, expanded, selectedId, toggleExpand, selectNode]);

 const selected = selectedId ? orgData[selectedId] : null;

 return (
 <div className="space-y-6 pb-12">
 {/* Header */}
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
 <div>
 <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Organization Chart</h1>
 <p className="text-gray-500 dark:text-[#a1a1aa] mt-1 text-sm font-medium">Visualize reporting structure, teams and hierarchy.</p>
 </div>
 <div className="flex items-center gap-3">
 <div className="relative">
 <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-[#a1a1aa] dark:text-[#737373]" />
 <input type="text" placeholder="Search employee..." className="pl-8 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#262626] text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:text-[#737373] dark:placeholder:text-[#737373] dark:text-[#a1a1aa] dark:text-[#737373] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white dark:bg-[#111111] w-48" />
 </div>
 <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#262626] text-sm font-medium text-gray-700 dark:text-[#cbd5e1] bg-white dark:bg-[#111111] hover:bg-gray-50 dark:bg-[#111111] dark:hover:bg-[#181818] transition-colors">
 Department <ChevronDown size={14} />
 </button>
 </div>
 </div>

 {/* Main Layout */}
 <div className="flex flex-col lg:flex-row gap-5">
 {/* Chart Canvas */}
 <div className="flex-1 bg-white dark:bg-[#111111] rounded-2xl border border-gray-100 dark:border-[#262626] shadow-sm overflow-hidden" style={{ height: 600 }}>
 <ReactFlow
 nodes={nodes}
 edges={edges}
 nodeTypes={nodeTypes}
 fitView
 fitViewOptions={{ padding: 0.2 }}
 minZoom={0.2}
 maxZoom={1.5}
 proOptions={{ hideAttribution: true }}
 >
 <Controls
 showInteractive={false}
 position="top-right"
 className="!bg-white dark:!bg-[#111111] !border !border-gray-200 dark:!border-[#262626] !rounded-2xl !shadow-sm [&>button]:!bg-white dark:[&>button]:!bg-[#111111] [&>button]:!border-gray-100 dark:[&>button]:!border-[#262626] [&>button]:!rounded-lg [&>button:hover]:!bg-gray-50 dark:[&>button:hover]:!bg-[#181818] [&>button>svg]:!fill-gray-800 dark:[&>button>svg]:!fill-gray-300"
 />
 {mounted && <Background color={resolvedTheme === "dark" ? "#262626" : "#e5e7eb"} gap={20} size={1} />}
 </ReactFlow>
 </div>

 {/* Details Panel */}
 <div className="lg:w-[300px] shrink-0">
 {selected ? (
 <div className="bg-white dark:bg-[#111111] rounded-2xl border border-gray-100 dark:border-[#262626] shadow-sm p-5 sticky top-20">
 <div className="flex items-center gap-3 mb-5 pb-5 border-b border-gray-100 dark:border-[#262626]">
 <div className={`w-12 h-12 rounded-full ${selected.color} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
 {selected.initials}
 </div>
 <div>
 <h3 className="font-bold text-gray-900 dark:text-white text-[15px]">{selected.name}</h3>
 <p className="text-[12px] text-gray-500 dark:text-[#a1a1aa]">{selected.designation}</p>
 </div>
 </div>
 <div className="space-y-4">
 {[
 { icon: User, label: "Employee ID", value: selected.empId },
 { icon: Users, label: "Department", value: selected.dept },
 { icon: Mail, label: "Email", value: selected.email },
 { icon: MapPin, label: "Manager", value: selected.manager || "—" },
 { icon: Users, label: "Direct Reports", value: String(selected.children.length) },
 ].map((item) => (
 <div key={item.label} className="flex items-start gap-3">
 <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-[#111111] flex items-center justify-center text-gray-400 dark:text-[#737373] shrink-0 mt-0.5">
 <item.icon size={14} />
 </div>
 <div>
 <p className="text-[11px] text-gray-400 dark:text-[#737373] font-medium">{item.label}</p>
 <p className="text-[13px] font-semibold text-gray-800 dark:text-[#e2e8f0] break-all">{item.value}</p>
 </div>
 </div>
 ))}
 <div className="flex items-start gap-3">
 <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-[#111111] flex items-center justify-center shrink-0 mt-0.5">
 <span className={`w-2.5 h-2.5 rounded-full ${selected.status === "Active" ? "bg-green-50 dark:bg-green-500/100" : "bg-yellow-400"}`} />
 </div>
 <div>
 <p className="text-[11px] text-gray-400 dark:text-[#737373] font-medium">Status</p>
 <p className="text-[13px] font-semibold text-gray-800 dark:text-[#e2e8f0]">{selected.status}</p>
 </div>
 </div>
 </div>
 </div>
 ) : (
 <div className="bg-white dark:bg-[#111111] rounded-2xl border border-gray-100 dark:border-[#262626] shadow-sm p-8 text-center text-gray-400 dark:text-[#737373] text-sm">
 Click a node to see details
 </div>
 )}
 </div>
 </div>
 </div>
 );
}
