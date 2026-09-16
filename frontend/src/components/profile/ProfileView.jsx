import React, { useState, useRef } from "react";
import { useApp } from "@/context/AppContext";
import { INDIAN_STATES_DISTRICTS } from "@/constants/mockData";
import {
  User,
  Upload,
  Trash2,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const ProfileView = () => {
  const { t, currentUser, updateProfile } = useApp();
  const fileInputRef = useRef(null);

  const [name, setName] = useState(currentUser?.name || "Rameshwar Singh");
  const [email, setEmail] = useState(currentUser?.email || "farmer@khetsetu.demo");
  const [phone, setPhone] = useState(currentUser?.phone || "+91 98765 43210");
  const [state, setState] = useState(currentUser?.state || "Punjab");
  const [district, setDistrict] = useState(currentUser?.district || "Ludhiana");
  const [avatar, setAvatar] = useState(currentUser?.avatar || null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const availableDistricts = INDIAN_STATES_DISTRICTS[state] || [];

  // Local Image Upload via Browser File Picker (FileReader Data URL)
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setAvatar(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile({
      name,
      email,
      phone,
      state,
      district,
      avatar
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Header */}
      <div className="space-y-2 text-left">
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Kisan & Procurement Identity</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-serif">
          {t.profile.title}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          {t.profile.subtitle}
        </p>
      </div>

      {savedSuccess && (
        <div
          data-testid="profile-saved-toast"
          className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 flex items-center gap-3 animate-in fade-in-50"
        >
          <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
          <div>
            <p className="font-bold text-sm">{t.profile.savedToast}</p>
            <p className="text-xs">Your farm profile details are saved locally.</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-card border border-border shadow-xs text-left space-y-8">
        
        {/* Profile Picture Upload Section */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-border">
          <div className="relative">
            {avatar ? (
              <img
                data-testid="profile-avatar-image"
                src={avatar}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-emerald-500/20 shadow-md"
              />
            ) : (
              <div
                data-testid="profile-avatar-initials"
                className="w-24 h-24 rounded-full bg-emerald-600 text-white text-2xl font-bold flex items-center justify-center border-4 border-emerald-500/20 shadow-md"
              >
                {name ? name.charAt(0).toUpperCase() : "K"}
              </div>
            )}
          </div>

          <div className="space-y-2 text-center sm:text-left">
            <h3 className="font-bold text-base text-foreground">
              Custom Profile Photo
            </h3>
            <p className="text-xs text-muted-foreground max-w-sm">
              Choose an image from your local computer. Stored in local browser session.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1 justify-center sm:justify-start">
              <input
                type="file"
                ref={fileInputRef}
                data-testid="profile-file-input"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                data-testid="profile-upload-btn"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs font-semibold rounded-xl border-border"
              >
                <Upload className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
                {t.profile.changePhoto}
              </Button>

              {avatar && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  data-testid="profile-remove-photo-btn"
                  onClick={handleRemovePhoto}
                  className="text-xs font-semibold rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 border-rose-200"
                >
                  <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                  {t.profile.removePhoto}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Profile Information Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          <div>
            <label className="text-xs font-bold text-foreground block mb-1">
              {t.profile.fullName} *
            </label>
            <input
              type="text"
              data-testid="profile-name-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full py-2.5 px-3.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-foreground block mb-1">
              {t.profile.email} *
            </label>
            <input
              type="email"
              data-testid="profile-email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full py-2.5 px-3.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-foreground block mb-1">
              {t.profile.phone} *
            </label>
            <input
              type="tel"
              data-testid="profile-phone-input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full py-2.5 px-3.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-foreground block mb-1">
              {t.profile.role}
            </label>
            <input
              type="text"
              readOnly
              value={currentUser?.role || "Farmer (Kisan)"}
              className="w-full py-2.5 px-3.5 rounded-xl border border-border bg-muted/50 text-foreground text-sm cursor-not-allowed font-semibold"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-foreground block mb-1">
              {t.profile.state} *
            </label>
            <select
              data-testid="profile-state-select"
              value={state}
              onChange={(e) => {
                const st = e.target.value;
                const firstD = INDIAN_STATES_DISTRICTS[st]?.[0] || "";
                setState(st);
                setDistrict(firstD);
              }}
              className="w-full py-2.5 px-3.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            >
              {Object.keys(INDIAN_STATES_DISTRICTS).map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-foreground block mb-1">
              {t.profile.district} *
            </label>
            <select
              data-testid="profile-district-select"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full py-2.5 px-3.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            >
              {availableDistricts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

        </div>

        <div className="pt-4 border-t border-border flex items-center justify-end gap-3">
          <Button
            type="submit"
            data-testid="save-profile-btn"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm shadow-md shadow-emerald-600/20"
          >
            {t.profile.saveChanges}
          </Button>
        </div>

      </form>

    </div>
  );
};
