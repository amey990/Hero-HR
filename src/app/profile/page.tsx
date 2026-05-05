"use client";

import { useState, useEffect, useRef } from "react";
import { Upload, Trash2, Save, RotateCcw, CheckCircle2, User, Building2, MapPin, Phone, Camera } from "lucide-react";

const defaultMock = {
  fullName: "Amey Muley",
  email: "amey@herohr.com",
  phone: "+91 98765 43210",
  dob: "1990-01-01",
  gender: "Male",
  bloodGroup: "O+",
  
  employeeId: "EMP001",
  department: "Human Resources",
  designation: "HR Manager",
  reportingManager: "Sunita Verma",
  workLocation: "HQ Office",
  joiningDate: "2023-01-12",

  currentAddress: "123 Smart City Layout",
  city: "Pune",
  state: "Maharashtra",
  country: "India",
  pinCode: "411057",

  emergencyName: "Rohan Muley",
  emergencyRelation: "Brother",
  emergencyContact: "+91 98765 43211",
  emergencyAlt: "",
  
  photo: "",
  role: "Admin"
};

export default function ProfilePage() {
  const [formData, setFormData] = useState(defaultMock);
  const [showToast, setShowToast] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedName = localStorage.getItem("herohr_profile_name");
    const savedEmail = localStorage.getItem("herohr_profile_email");
    const savedPhone = localStorage.getItem("herohr_profile_phone");
    const savedRole = localStorage.getItem("herohr_profile_role");
    const savedDept = localStorage.getItem("herohr_profile_department");
    const savedDesig = localStorage.getItem("herohr_profile_designation");
    const savedPhoto = localStorage.getItem("herohr_profile_photo");

    setFormData(prev => ({
      ...prev,
      fullName: savedName || prev.fullName,
      email: savedEmail || prev.email,
      phone: savedPhone || prev.phone,
      role: savedRole || prev.role,
      department: savedDept || prev.department,
      designation: savedDesig || prev.designation,
      photo: savedPhoto || prev.photo,
    }));
  }, []);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setFormData(prev => ({ ...prev, photo: "" }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSave = () => {
    localStorage.setItem("herohr_profile_name", formData.fullName);
    localStorage.setItem("herohr_profile_email", formData.email);
    localStorage.setItem("herohr_profile_phone", formData.phone);
    localStorage.setItem("herohr_profile_role", formData.role);
    localStorage.setItem("herohr_profile_department", formData.department);
    localStorage.setItem("herohr_profile_designation", formData.designation);
    localStorage.setItem("herohr_profile_photo", formData.photo);
    
    window.dispatchEvent(new Event("herohr-profile-updated"));
    
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleReset = () => {
    setFormData(defaultMock);
  };

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2);
  };

  const InputField = ({ label, value, field, type = "text", readOnly = false }: any) => (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-gray-700 dark:text-[#e2e8f0]">{label}</label>
      <input 
        type={type} 
        value={value} 
        onChange={(e) => handleChange(field, e.target.value)}
        readOnly={readOnly}
        className={`w-full border border-gray-200 dark:border-[#262626] rounded-xl px-4 py-2.5 text-sm outline-none transition-all ${readOnly ? 'bg-gray-100 dark:bg-[#111111] text-gray-500 dark:text-[#a1a1aa] cursor-not-allowed' : 'bg-gray-50 dark:bg-[#181818] text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'}`}
      />
    </div>
  );

  return (
    <div className="space-y-6 pb-12 relative">
      {/* Toast */}
      {showToast && (
        <div className="fixed top-20 right-8 bg-green-500 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 z-50 animate-in fade-in slide-in-from-top-5">
          <CheckCircle2 size={18} />
          <span className="font-medium text-sm">Profile updated successfully.</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">My Profile</h1>
          <p className="text-gray-500 dark:text-[#a1a1aa] mt-1 text-sm font-medium">Manage your personal details, contact information and profile photo.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleReset} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#262626] text-sm font-semibold text-gray-700 dark:text-[#cbd5e1] hover:bg-gray-50 dark:hover:bg-[#181818] transition-colors bg-white dark:bg-[#111111]">
            <RotateCcw size={16} /> Reset
          </button>
          <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm">
            <Save size={16} /> Save Changes
          </button>
        </div>
      </div>

      {/* Profile Summary Card */}
      <div className="bg-white dark:bg-[#111111] rounded-2xl border border-gray-100 dark:border-[#262626] shadow-sm p-6 flex flex-col md:flex-row gap-8 items-start md:items-center">
        <div className="flex items-center gap-6">
          <div className="relative w-28 h-28 shrink-0 rounded-full overflow-hidden border-4 border-white dark:border-[#0a0a0a] shadow-lg bg-gray-100 dark:bg-[#181818]">
            {formData.photo ? (
              <img src={formData.photo} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold">
                {getInitials(formData.fullName)}
              </div>
            )}
          </div>
          <div className="space-y-3">
            <div className="flex gap-3">
              <input type="file" accept="image/png, image/jpeg, image/webp" ref={fileInputRef} className="hidden" onChange={handlePhotoUpload} />
              <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-[#262626] text-xs font-semibold text-gray-700 dark:text-[#cbd5e1] hover:bg-gray-50 dark:hover:bg-[#181818] transition-colors">
                <Upload size={14} /> Upload Photo
              </button>
              <button onClick={removePhoto} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-red-100 dark:border-red-500/20 text-xs font-semibold text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                <Trash2 size={14} /> Remove
              </button>
            </div>
            <p className="text-[11px] text-gray-500 dark:text-[#a1a1aa]">Recommended size: 400x400px. JPG, PNG or WEBP.</p>
          </div>
        </div>
        <div className="h-px w-full md:w-px md:h-20 bg-gray-100 dark:bg-[#262626]" />
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{formData.fullName}</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-500 text-[10px] font-bold uppercase tracking-wider border border-green-200 dark:border-green-500/20">Active</span>
          </div>
          <p className="text-sm text-blue-600 dark:text-blue-500 font-medium">{formData.designation}</p>
          <div className="flex flex-wrap gap-4 text-xs text-gray-500 dark:text-[#a1a1aa] mt-2 pt-2">
            <span className="flex items-center gap-1.5"><Building2 size={14} /> {formData.department}</span>
            <span className="flex items-center gap-1.5"><User size={14} /> {formData.employeeId}</span>
            <span className="flex items-center gap-1.5"><MapPin size={14} /> {formData.workLocation}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="bg-white dark:bg-[#111111] rounded-2xl border border-gray-100 dark:border-[#262626] shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-50 dark:border-[#262626] flex items-center gap-2">
            <User size={18} className="text-gray-400" />
            <h3 className="font-bold text-gray-900 dark:text-white">Personal Information</h3>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <InputField label="Full Name" value={formData.fullName} field="fullName" />
            <InputField label="Email Address" value={formData.email} field="email" type="email" />
            <InputField label="Phone Number" value={formData.phone} field="phone" />
            <InputField label="Date of Birth" value={formData.dob} field="dob" type="date" />
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 dark:text-[#e2e8f0]">Gender</label>
              <select value={formData.gender} onChange={(e) => handleChange("gender", e.target.value)} className="w-full bg-gray-50 dark:bg-[#181818] border border-gray-200 dark:border-[#262626] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white outline-none transition-all">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 dark:text-[#e2e8f0]">Blood Group</label>
              <select value={formData.bloodGroup} onChange={(e) => handleChange("bloodGroup", e.target.value)} className="w-full bg-gray-50 dark:bg-[#181818] border border-gray-200 dark:border-[#262626] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white outline-none transition-all">
                <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
                <option>AB+</option><option>AB-</option><option>O+</option><option>O-</option>
              </select>
            </div>
          </div>
        </div>

        {/* Work Information */}
        <div className="bg-white dark:bg-[#111111] rounded-2xl border border-gray-100 dark:border-[#262626] shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-50 dark:border-[#262626] flex items-center gap-2">
            <Building2 size={18} className="text-gray-400" />
            <h3 className="font-bold text-gray-900 dark:text-white">Work Information</h3>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <InputField label="Employee ID" value={formData.employeeId} field="employeeId" readOnly={true} />
            <InputField label="Department" value={formData.department} field="department" readOnly={true} />
            <InputField label="Designation" value={formData.designation} field="designation" readOnly={true} />
            <InputField label="Reporting Manager" value={formData.reportingManager} field="reportingManager" readOnly={true} />
            <InputField label="Work Location" value={formData.workLocation} field="workLocation" />
            <InputField label="Joining Date" value={formData.joiningDate} field="joiningDate" type="date" readOnly={true} />
          </div>
        </div>

        {/* Address Information */}
        <div className="bg-white dark:bg-[#111111] rounded-2xl border border-gray-100 dark:border-[#262626] shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-50 dark:border-[#262626] flex items-center gap-2">
            <MapPin size={18} className="text-gray-400" />
            <h3 className="font-bold text-gray-900 dark:text-white">Address Information</h3>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <InputField label="Current Address" value={formData.currentAddress} field="currentAddress" />
            </div>
            <InputField label="City" value={formData.city} field="city" />
            <InputField label="State" value={formData.state} field="state" />
            <InputField label="Country" value={formData.country} field="country" />
            <InputField label="PIN Code" value={formData.pinCode} field="pinCode" />
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-white dark:bg-[#111111] rounded-2xl border border-gray-100 dark:border-[#262626] shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-50 dark:border-[#262626] flex items-center gap-2">
            <Phone size={18} className="text-gray-400" />
            <h3 className="font-bold text-gray-900 dark:text-white">Emergency Contact</h3>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <InputField label="Contact Person Name" value={formData.emergencyName} field="emergencyName" />
            <InputField label="Relationship" value={formData.emergencyRelation} field="emergencyRelation" />
            <InputField label="Contact Number" value={formData.emergencyContact} field="emergencyContact" />
            <InputField label="Alternate Number" value={formData.emergencyAlt} field="emergencyAlt" />
          </div>
        </div>
      </div>
    </div>
  );
}
