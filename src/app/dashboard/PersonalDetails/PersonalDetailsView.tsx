import React from "react";
import { Home, Search, Pencil, CheckCircle2, User, Bell, Loader2 } from "lucide-react";
import Image from "next/image";

interface PersonalDetailsViewProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    whatsapp: string;
    nationalId: string;
    city: string;
    district: string;
    bio: string;
  };
  notifications: {
    email: boolean;
    whatsapp: boolean;
    inApp: boolean;
  };
  activeMode: "landlord" | "tenant";
  isSaving: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onToggleNotification: (key: keyof PersonalDetailsViewProps["notifications"]) => void;
  onSwitchMode: (mode: "landlord" | "tenant") => void;
  onSave: () => void;
  onDelete: () => void;
}

export default function PersonalDetailsView({
  formData,
  notifications,
  activeMode,
  isSaving,
  onChange,
  onToggleNotification,
  onSwitchMode,
  onSave,
  onDelete,
}: PersonalDetailsViewProps) {
  const disabledInputClass = "w-full px-3 py-2.5 rounded-lg bg-slate-100 border border-slate-200 text-sm text-slate-400 cursor-not-allowed focus:outline-none";
  const activeInputClass = "w-full px-3 py-2.5 rounded-lg bg-slate-50 border border-transparent focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm text-slate-700 transition-all";

  return (
    <main className="flex-1 min-h-screen bg-slate-50 p-8 md:p-10 font-sans overflow-y-auto">
      <div className="max-w-4xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-1">Personal Details</h1>
            <p className="text-sm text-slate-500">Manage your profile, identity, and account settings</p>
          </div>
          <button
            onClick={onSave}
            disabled={isSaving}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg shadow-sm transition-colors shrink-0 min-w-[140px]">
            {isSaving ? <Loader2 size={16} className="animate-spin" /> : null}
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center text-xl font-bold text-slate-400">
                {formData.firstName?.charAt(0) || ""}{formData.lastName?.charAt(0) || ""}
              </div>
              <button className="absolute bottom-0 right-0 p-1 bg-blue-600 text-white rounded-full border-2 border-white hover:bg-blue-700">
                <Pencil size={12} />
              </button>
            </div>
            <div>
              <h3 className="font-bold text-slate-900">
                {formData.firstName} {formData.lastName}
              </h3>
              <p className="text-sm text-slate-500 mb-2">{formData.email}</p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-600">
                  <Home size={10} /> {activeMode === 'landlord' ? 'Landlord' : 'Tenant'}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-green-50 text-green-600">
                  <CheckCircle2 size={10} /> Verified
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 mb-6 p-6">
          <div className="flex items-center gap-2 mb-6 text-slate-800 font-semibold">
            <User size={18} />
            <h2>Personal Information</h2>
          </div>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">First Name</label>
              <input 
                type="text" 
                name="firstName" 
                value={formData.firstName} 
                onChange={onChange} 
                placeholder={formData.firstName || "Enter First Name"}
                className={activeInputClass} 
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">Last Name</label>
              <input 
                type="text" 
                name="lastName" 
                value={formData.lastName} 
                onChange={onChange} 
                placeholder={formData.lastName || "Enter Last Name"}
                className={activeInputClass} 
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">Whatsapp Number (Phone)</label>
              <input 
                type="tel" 
                name="whatsapp" 
                value={formData.whatsapp} 
                onChange={onChange} 
                placeholder={formData.whatsapp || "Enter Phone Number"}
                className={activeInputClass} 
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">Email Address <span className="text-red-400">*</span></label>
              <input type="email" name="email" value={formData.email} disabled className={disabledInputClass} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">National ID <span className="text-red-400">*</span></label>
              <input type="text" name="nationalId" value={formData.nationalId} disabled className={disabledInputClass} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">City <span className="text-red-400">*</span></label>
              <input type="text" name="city" value={formData.city} disabled className={disabledInputClass} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">District <span className="text-red-400">*</span></label>
              <input type="text" name="district" value={formData.district} disabled className={disabledInputClass} />
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2 mt-2">
              <label className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">Bio <span className="text-red-400">*</span></label>
              <textarea name="bio" value={formData.bio} disabled rows={3} className={`${disabledInputClass} resize-none`}></textarea>
              <span className="text-[10px] text-slate-400">Locked fields can only be changed by contacting support.</span>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 mb-6 p-6">
          <div className="flex items-center gap-2 mb-6 text-slate-800 font-semibold">
            <Bell size={18} />
            <h2>Notification Preferences</h2>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between pb-6 border-b border-slate-100">
              <div>
                <h4 className="text-sm font-semibold text-slate-900">Email Notifications</h4>
                <p className="text-xs text-slate-500">Booking requests, messages, and reports sent to your email</p>
              </div>
              <button
                onClick={() => onToggleNotification("email")}
                className={`w-11 h-6 rounded-full transition-colors relative ${notifications.email ? "bg-blue-600" : "bg-slate-200"}`}>
                <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${notifications.email ? "translate-x-5" : ""}`} />
              </button>
            </div>

            <div className="flex items-center justify-between pb-6 border-b border-slate-100">
              <div>
                <h4 className="text-sm font-semibold text-slate-900">Whatsapp Alerts</h4>
                <p className="text-xs text-slate-500">Urgent alerts and one-time codes via Whatsapp</p>
              </div>
              <button
                onClick={() => onToggleNotification("whatsapp")}
                className={`w-11 h-6 rounded-full transition-colors relative ${notifications.whatsapp ? "bg-blue-600" : "bg-slate-200"}`}>
                <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${notifications.whatsapp ? "translate-x-5" : ""}`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-slate-900">In-App Notifications</h4>
                <p className="text-xs text-slate-500">Real-time updates within the platform</p>
              </div>
              <button
                onClick={() => onToggleNotification("inApp")}
                className={`w-11 h-6 rounded-full transition-colors relative ${notifications.inApp ? "bg-blue-600" : "bg-slate-200"}`}>
                <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${notifications.inApp ? "translate-x-5" : ""}`} />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-red-50/30 rounded-xl border border-red-200 p-6">
          <h3 className="text-sm font-semibold text-red-600 mb-1">Danger Zone</h3>
          <p className="text-xs text-red-500/80 mb-4">
            Permanently delete your account and all associated listings. This action cannot be undone.
          </p>
          <button
            onClick={onDelete}
            className="px-4 py-2 border border-red-200 text-red-600 text-xs font-semibold rounded-lg hover:bg-red-50 transition-colors">
            Delete Account
          </button>
        </div>
      </div>
    </main>
  );
}