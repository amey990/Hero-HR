"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, Check, Upload, User, Briefcase, FileText, 
  CreditCard, ShieldCheck, Camera, Save, X, RotateCcw
} from "lucide-react";
import clsx from "clsx";

export default function AdminAddEmployeePage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { name: "Personal Details", icon: User },
    { name: "Work Details", icon: Briefcase },
    { name: "Compensation", icon: CreditCard },
    { name: "Documents", icon: FileText }
  ];

  const handleSave = () => {
    alert("Employee saved successfully! (Mock Action)");
    router.push("/admin/employees");
  };

  const [formData, setFormData] = useState({
    fullName: "", email: "", phone: "", dob: "", gender: "",
    empId: "", dept: "", designation: "", empType: "", location: "", joinDate: "", manager: "", role: "", status: "",
  });

  const updateForm = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isStepDone = (index: number) => {
    if (index === 0) {
      return !!(formData.fullName && formData.email && formData.phone && formData.dob && formData.gender);
    }
    if (index === 1) {
      return !!(formData.empId && formData.dept && formData.designation && formData.empType && formData.location && formData.joinDate && formData.manager && formData.role && formData.status);
    }
    return false; // Compensation and Documents don't have strict required tracking in this mock
  };

  // Removed scroll spy as per user request to tick based on data filling

  const docs = [
    { name: "Aadhaar / ID Proof", type: "PDF, JPG (Max 5MB)" },
    { name: "PAN / Tax Document", type: "PDF, JPG (Max 5MB)" },
    { name: "Address Proof", type: "PDF, JPG (Max 5MB)" },
    { name: "Offer Letter", type: "PDF (Max 5MB)" },
    { name: "Joining Form", type: "PDF (Max 5MB)" },
    { name: "Resume", type: "PDF, DOCX (Max 5MB)" },
  ];

  const InputField = ({ label, placeholder, type = "text", required = false, value, onChange }: any) => (
    <div>
      <label className="block text-[13px] font-semibold text-gray-700 dark:text-[#a1a1aa] mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-[#f9fafb] dark:bg-[#181818] border border-[#e5e7eb] dark:border-[#262626] focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 focus:bg-[#ffffff] dark:focus:bg-[#111111] rounded-xl px-4 py-2.5 text-sm font-medium outline-none transition-all duration-200 text-[#0f172a] dark:text-[#f8fafc] placeholder:text-gray-400 dark:placeholder:text-[#737373]"
      />
    </div>
  );

  const SelectField = ({ label, options, required = false, value, onChange }: any) => (
    <div>
      <label className="block text-[13px] font-semibold text-gray-700 dark:text-[#a1a1aa] mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select 
        value={value}
        onChange={onChange}
        className="w-full bg-[#f9fafb] dark:bg-[#181818] border border-[#e5e7eb] dark:border-[#262626] focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 focus:bg-[#ffffff] dark:focus:bg-[#111111] rounded-xl px-4 py-2.5 text-sm font-medium outline-none transition-all duration-200 text-[#0f172a] dark:text-[#f8fafc]"
      >
        <option value="">Select option</option>
        {options.map((opt: string, idx: number) => (
          <option key={idx} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="space-y-6 pb-20">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-transparent py-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <button 
              onClick={() => router.push("/admin/employees")}
              className="p-1.5 rounded-lg text-gray-400 hover:text-[#0f172a] dark:hover:text-[#f8fafc] hover:bg-white dark:hover:bg-[#111111] border border-transparent hover:border-[#e5e7eb] dark:hover:border-[#262626] transition-all"
            >
              <ArrowLeft size={18} />
            </button>
            <h1 className="text-2xl font-bold text-[#0f172a] dark:text-[#f8fafc] tracking-tight">Add Employee</h1>
          </div>
          <p className="text-[#64748b] dark:text-[#a1a1aa] text-[14px] ml-9">Onboard a new employee and assign their work details.</p>
        </div>
        <div className="flex items-center gap-3 ml-9 md:ml-0">
          <button 
            onClick={() => router.push("/admin/employees")}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#ffffff] dark:bg-[#111111] border border-[#e5e7eb] dark:border-[#262626] rounded-xl text-sm font-semibold text-[#0f172a] dark:text-[#f8fafc] hover:bg-gray-50 dark:hover:bg-[#181818] transition-colors shadow-sm"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm shadow-blue-500/20"
          >
            <Check size={16} /> Save Employee
          </button>
        </div>
      </div>

      {/* 2. Step Indicator */}
      <div className="bg-[#ffffff] dark:bg-[#111111] border border-[#e5e7eb] dark:border-[#262626] rounded-2xl p-6 shadow-sm overflow-x-auto mb-6">
        <div className="flex items-center justify-between min-w-[600px] relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-100 dark:bg-[#181818] rounded-full z-0">
            {/* Active progress line based on manual step clicking for now */}
            <div 
              className="absolute left-0 top-0 h-full bg-blue-600 rounded-full transition-all duration-300" 
              style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            />
          </div>
          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center gap-3">
              <button 
                onClick={() => setActiveStep(idx)}
                className={clsx(
                  "w-12 h-12 rounded-full flex items-center justify-center border-4 transition-colors duration-300",
                  isStepDone(idx) || activeStep >= idx
                    ? "bg-blue-600 border-blue-100 dark:border-blue-900 text-white" 
                    : "bg-white dark:bg-[#111111] border-gray-100 dark:border-[#181818] text-gray-400 dark:text-[#737373]"
                )}
              >
                {isStepDone(idx) ? (
                  <Check size={20} strokeWidth={2.5} />
                ) : (
                  <step.icon size={20} strokeWidth={activeStep >= idx ? 2.5 : 2} />
                )}
              </button>
              <span className={clsx(
                "text-[13px] font-bold whitespace-nowrap",
                activeStep >= idx ? "text-[#0f172a] dark:text-[#f8fafc]" : "text-gray-400 dark:text-[#737373]"
              )}>{step.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        <div className="xl:col-span-2 space-y-6">
          
          {/* 3. Personal Details */}
          <div id="step-0" className="bg-[#ffffff] dark:bg-[#111111] border border-[#e5e7eb] dark:border-[#262626] rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <h2 className="text-[16px] font-bold text-[#0f172a] dark:text-[#f8fafc] mb-6 flex items-center gap-2">
              <User size={18} className="text-blue-500" /> Personal Details
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-8 mb-6">
              <div className="flex flex-col items-center gap-3 shrink-0">
                <div className="w-28 h-28 rounded-full border-2 border-dashed border-[#e5e7eb] dark:border-[#262626] flex items-center justify-center bg-gray-50 dark:bg-[#181818] text-gray-400 group cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors">
                  <Camera size={28} className="group-hover:text-blue-500 transition-colors" />
                </div>
                <div className="text-center">
                  <p className="text-[12px] font-bold text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">Upload Photo</p>
                  <p className="text-[11px] text-gray-500 dark:text-[#a1a1aa] mt-0.5">JPG, PNG, WEBP</p>
                </div>
              </div>
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <InputField label="Full Name" placeholder="e.g. Rahul Sharma" required value={formData.fullName} onChange={(e: any) => updateForm('fullName', e.target.value)} />
                <InputField label="Email Address" type="email" placeholder="e.g. rahul@company.com" required value={formData.email} onChange={(e: any) => updateForm('email', e.target.value)} />
                <InputField label="Phone Number" placeholder="+91 98765 43210" required value={formData.phone} onChange={(e: any) => updateForm('phone', e.target.value)} />
                <InputField label="Date of Birth" type="date" required value={formData.dob} onChange={(e: any) => updateForm('dob', e.target.value)} />
                <SelectField label="Gender" options={["Male", "Female", "Non-binary", "Other"]} required value={formData.gender} onChange={(e: any) => updateForm('gender', e.target.value)} />
                <SelectField label="Blood Group" options={["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]} />
              </div>
            </div>

            <div className="pt-6 border-t border-[#e5e7eb] dark:border-[#262626]">
              <h3 className="text-[14px] font-bold text-gray-700 dark:text-[#a1a1aa] mb-4">Current Address</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <InputField label="Street Address" placeholder="Flat No, Building Name, Street" />
                </div>
                <InputField label="City" placeholder="e.g. Mumbai" />
                <InputField label="State" placeholder="e.g. Maharashtra" />
                <SelectField label="Country" options={["India", "United States", "United Kingdom", "Canada"]} />
                <InputField label="PIN / ZIP Code" placeholder="e.g. 400001" />
              </div>
            </div>
          </div>

          {/* 4. Work Details */}
          <div id="step-1" className="bg-[#ffffff] dark:bg-[#111111] border border-[#e5e7eb] dark:border-[#262626] rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <h2 className="text-[16px] font-bold text-[#0f172a] dark:text-[#f8fafc] mb-6 flex items-center gap-2">
              <Briefcase size={18} className="text-purple-500" /> Work Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <InputField label="Employee ID" placeholder="e.g. EMP-1042" required value={formData.empId} onChange={(e: any) => updateForm('empId', e.target.value)} />
              <SelectField label="Department" options={["Human Resources", "Engineering", "Sales", "Finance", "Operations", "Support"]} required value={formData.dept} onChange={(e: any) => updateForm('dept', e.target.value)} />
              <SelectField label="Designation" options={["HR Executive", "HR Manager", "Frontend Developer", "Backend Developer", "Sales Executive", "Accountant", "Operations Executive"]} required value={formData.designation} onChange={(e: any) => updateForm('designation', e.target.value)} />
              <SelectField label="Employment Type" options={["Full-time", "Contract", "Intern", "Consultant"]} required value={formData.empType} onChange={(e: any) => updateForm('empType', e.target.value)} />
              <SelectField label="Work Location" options={["HQ Office", "Remote", "Mumbai Branch", "Pune Branch", "Client Location"]} required value={formData.location} onChange={(e: any) => updateForm('location', e.target.value)} />
              <InputField label="Joining Date" type="date" required value={formData.joinDate} onChange={(e: any) => updateForm('joinDate', e.target.value)} />
              <SelectField label="Reporting Manager" options={["Sunita Verma", "Vikram Singh", "Arjun Reddy", "Rajesh Kumar"]} required value={formData.manager} onChange={(e: any) => updateForm('manager', e.target.value)} />
              <SelectField label="System Role" options={["Employee", "Manager", "HR Admin", "Finance Admin"]} required value={formData.role} onChange={(e: any) => updateForm('role', e.target.value)} />
              <SelectField label="Employment Status" options={["Active", "Probation", "Inactive"]} required value={formData.status} onChange={(e: any) => updateForm('status', e.target.value)} />
            </div>
          </div>

          {/* 5. Compensation */}
          <div id="step-2" className="bg-[#ffffff] dark:bg-[#111111] border border-[#e5e7eb] dark:border-[#262626] rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-6">
              <h2 className="text-[16px] font-bold text-[#0f172a] dark:text-[#f8fafc] flex items-center gap-2">
                <CreditCard size={18} className="text-emerald-500" /> Compensation Setup
              </h2>
            </div>
            <p className="text-[13px] font-medium text-amber-600 dark:text-amber-500 bg-amber-50 dark:bg-amber-500/10 px-4 py-3 rounded-xl mb-6">
              💡 Payroll calculations and detailed salary slips will be configured in the Payroll module later. Enter initial setup info below.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <InputField label="Annual CTC (₹)" placeholder="e.g. 12,00,000" type="number" />
              <InputField label="Monthly Gross (₹)" placeholder="e.g. 1,00,000" type="number" />
              <InputField label="Basic Salary (₹)" placeholder="e.g. 40,000" type="number" />
              <InputField label="HRA (₹)" placeholder="e.g. 20,000" type="number" />
              <InputField label="Special Allowance (₹)" placeholder="e.g. 40,000" type="number" />
              <SelectField label="PF Applicable" options={["Yes - 12% of Basic", "No"]} />
              <SelectField label="Professional Tax" options={["Yes - Standard State Rates", "No"]} />
              <SelectField label="Payroll Group" options={["Monthly Staff", "Daily Wages", "Consultant Retainer"]} />
              <div className="sm:col-span-2">
                <InputField label="Effective From" type="date" />
              </div>
            </div>
          </div>

        </div>

        <div className="xl:col-span-1 space-y-6">
          
          {/* 6. Leave Allocation */}
          <div className="bg-[#ffffff] dark:bg-[#111111] border border-[#e5e7eb] dark:border-[#262626] rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <h2 className="text-[16px] font-bold text-[#0f172a] dark:text-[#f8fafc] mb-6 flex items-center gap-2">
              <Check size={18} className="text-orange-500" /> Leave Allocation
            </h2>
            <div className="space-y-5">
              <SelectField label="Weekly Off Pattern" options={["Saturday-Sunday", "Sunday Only", "Custom"]} required />
              <div className="grid grid-cols-2 gap-4">
                <InputField label="Casual Leave" placeholder="e.g. 12" type="number" />
                <InputField label="Sick Leave" placeholder="e.g. 12" type="number" />
                <InputField label="Earned Leave" placeholder="e.g. 15" type="number" />
                <InputField label="Comp Off" placeholder="e.g. 0" type="number" />
              </div>
            </div>
          </div>

          {/* 7. Document Upload */}
          <div id="step-3" className="bg-[#ffffff] dark:bg-[#111111] border border-[#e5e7eb] dark:border-[#262626] rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <h2 className="text-[16px] font-bold text-[#0f172a] dark:text-[#f8fafc] mb-6 flex items-center gap-2">
              <FileText size={18} className="text-indigo-500" /> Document Upload
            </h2>
            <div className="space-y-4">
              {docs.map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border border-[#e5e7eb] dark:border-[#262626] rounded-xl hover:bg-gray-50 dark:hover:bg-[#181818] transition-colors group">
                  <div>
                    <p className="text-[13px] font-bold text-[#0f172a] dark:text-[#f8fafc]">{doc.name}</p>
                    <p className="text-[11px] text-gray-500 dark:text-[#a1a1aa] mt-0.5">{doc.type}</p>
                  </div>
                  <button className="p-2 bg-[#f5f7fb] dark:bg-[#262626] text-gray-500 dark:text-[#a1a1aa] rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors" title="Upload Document">
                    <Upload size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 8. Login Access */}
          <div className="bg-[#ffffff] dark:bg-[#111111] border border-[#e5e7eb] dark:border-[#262626] rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <h2 className="text-[16px] font-bold text-[#0f172a] dark:text-[#f8fafc] mb-6 flex items-center gap-2">
              <ShieldCheck size={18} className="text-red-500" /> Login Access
            </h2>
            <div className="space-y-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <div>
                  <p className="text-[13px] font-bold text-[#0f172a] dark:text-[#f8fafc]">Create login account</p>
                  <p className="text-[12px] text-gray-500 dark:text-[#a1a1aa]">Allows employee to access the Hero HR portal.</p>
                </div>
              </label>

              <div className="pl-7 space-y-4">
                <InputField label="Temporary Password" type="password" placeholder="••••••••" />
                <label className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="mt-0.5 w-3.5 h-3.5 rounded border-gray-300 text-blue-600" />
                  <p className="text-[12px] font-medium text-[#0f172a] dark:text-[#f8fafc]">Force password reset on first login</p>
                </label>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="mt-0.5 w-3.5 h-3.5 rounded border-gray-300 text-blue-600" />
                  <p className="text-[12px] font-medium text-[#0f172a] dark:text-[#f8fafc]">Send welcome email with login details</p>
                </label>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 9. Form Actions (Bottom) */}
      <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-6 border-t border-[#e5e7eb] dark:border-[#262626]">
        <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-white dark:bg-[#111111] hover:bg-red-50 dark:hover:bg-red-500/10 border border-[#e5e7eb] dark:border-[#262626] hover:border-red-200 dark:hover:border-red-500/30 text-gray-700 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-400 rounded-xl text-sm font-semibold transition-colors">
          <RotateCcw size={16} /> Reset Form
        </button>
        <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-white dark:bg-[#111111] hover:bg-gray-50 dark:hover:bg-[#181818] border border-[#e5e7eb] dark:border-[#262626] text-[#0f172a] dark:text-[#f8fafc] rounded-xl text-sm font-semibold transition-colors">
          <Save size={16} /> Save as Draft
        </button>
        <button 
          onClick={handleSave}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm shadow-blue-500/20"
        >
          <Check size={16} /> Save Employee
        </button>
      </div>

    </div>
  );
}
