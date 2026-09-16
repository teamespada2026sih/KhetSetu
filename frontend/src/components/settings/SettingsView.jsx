import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  Sun,
  Moon,
  Globe,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  UserCheck,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const SettingsView = () => {
  const {
    t,
    theme,
    toggleTheme,
    language,
    setLanguage,
    resetDemoData,
    currentUser,
    loginDemoFarmer,
    loginDemoBuyer,
    logout
  } = useApp();

  const [resetDone, setResetDone] = useState(false);

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all demo listings, offers, and orders to default?")) {
      resetDemoData();
      setResetDone(true);
      setTimeout(() => setResetDone(false), 2500);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Header */}
      <div className="space-y-2 text-left">
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Platform Preferences</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-serif">
          {t.settings.title}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          {t.settings.subtitle}
        </p>
      </div>

      {resetDone && (
        <div
          data-testid="reset-success-alert"
          className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 flex items-center gap-3 animate-in fade-in-50"
        >
          <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
          <div>
            <p className="font-bold text-sm">Demo Data Restored Successfully!</p>
            <p className="text-xs">Fresh default produce, prices, and sample consignments loaded.</p>
          </div>
        </div>
      )}

      <div className="space-y-6 text-left">
        
        {/* 1. Theme Setting Card */}
        <div className="p-6 rounded-3xl bg-card border border-border shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div>
              <h3 className="font-bold text-base text-foreground flex items-center gap-2">
                {theme === "dark" ? <Moon className="w-5 h-5 text-amber-400" /> : <Sun className="w-5 h-5 text-emerald-600" />}
                {t.settings.theme}
              </h3>
              <p className="text-xs text-muted-foreground">{t.settings.themeDesc}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-1">
            <button
              type="button"
              data-testid="settings-theme-light-btn"
              onClick={() => {
                if (theme === "dark") toggleTheme();
              }}
              className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                theme === "light"
                  ? "border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/20 ring-2 ring-emerald-500/20"
                  : "border-border bg-background hover:bg-muted/40"
              }`}
            >
              <div className="flex items-center gap-3">
                <Sun className="w-5 h-5 text-amber-500" />
                <div>
                  <p className="text-sm font-bold text-foreground">{t.settings.light}</p>
                  <p className="text-[11px] text-muted-foreground">Crisp daylight palette</p>
                </div>
              </div>
              {theme === "light" && <span className="text-emerald-600 font-bold">✓</span>}
            </button>

            <button
              type="button"
              data-testid="settings-theme-dark-btn"
              onClick={() => {
                if (theme === "light") toggleTheme();
              }}
              className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                theme === "dark"
                  ? "border-emerald-600 bg-emerald-950/40 ring-2 ring-emerald-500/20"
                  : "border-border bg-background hover:bg-muted/40"
              }`}
            >
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-emerald-400" />
                <div>
                  <p className="text-sm font-bold text-foreground">{t.settings.dark}</p>
                  <p className="text-[11px] text-muted-foreground">Earthy night tones</p>
                </div>
              </div>
              {theme === "dark" && <span className="text-emerald-400 font-bold">✓</span>}
            </button>
          </div>
        </div>

        {/* 2. Language Selector Card */}
        <div className="p-6 rounded-3xl bg-card border border-border shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div>
              <h3 className="font-bold text-base text-foreground flex items-center gap-2">
                <Globe className="w-5 h-5 text-emerald-600" />
                {t.settings.language}
              </h3>
              <p className="text-xs text-muted-foreground">{t.settings.languageDesc}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            {[
              { code: "en", label: "English", sub: "English" },
              { code: "hi", label: "हिन्दी", sub: "Hindi" },
              { code: "bn", label: "বাংলা", sub: "Bengali" }
            ].map((lang) => (
              <button
                key={lang.code}
                type="button"
                data-testid={`settings-lang-${lang.code}`}
                onClick={() => setLanguage(lang.code)}
                className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                  language === lang.code
                    ? "border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/20 ring-2 ring-emerald-500/20"
                    : "border-border bg-background hover:bg-muted/40"
                }`}
              >
                <div>
                  <p className="text-base font-bold text-foreground">{lang.label}</p>
                  <p className="text-[11px] text-muted-foreground">{lang.sub}</p>
                </div>
                {language === lang.code && <span className="text-emerald-600 font-bold">✓</span>}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Demo Role Switcher */}
        <div className="p-6 rounded-3xl bg-card border border-border shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div>
              <h3 className="font-bold text-base text-foreground flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-emerald-600" />
                Demo Account Switcher
              </h3>
              <p className="text-xs text-muted-foreground">
                Currently Active: <strong className="text-foreground">{currentUser ? `${currentUser.name} (${currentUser.role})` : "Guest / Not signed in"}</strong>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Button
              variant="outline"
              data-testid="settings-switch-farmer-btn"
              onClick={loginDemoFarmer}
              className="text-xs font-semibold rounded-xl border-emerald-600/40 text-emerald-800 dark:text-emerald-300"
            >
              🌾 Switch to Demo Farmer (Rameshwar Singh)
            </Button>
            <Button
              variant="outline"
              data-testid="settings-switch-buyer-btn"
              onClick={loginDemoBuyer}
              className="text-xs font-semibold rounded-xl border-amber-600/40 text-amber-800 dark:text-amber-300"
            >
              🏢 Switch to Demo Buyer (Ananya Sharma)
            </Button>
            {currentUser && (
              <Button
                variant="ghost"
                data-testid="settings-logout-btn"
                onClick={logout}
                className="text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl"
              >
                <LogOut className="w-3.5 h-3.5 mr-1" />
                {t.nav.logout}
              </Button>
            )}
          </div>
        </div>

        {/* 4. Reset Demo Data Card */}
        <div className="p-6 rounded-3xl bg-card border border-border shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div>
              <h3 className="font-bold text-base text-foreground flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-amber-600" />
                {t.settings.demoData}
              </h3>
              <p className="text-xs text-muted-foreground">{t.settings.demoDataDesc}</p>
            </div>
          </div>

          <div className="pt-1">
            <Button
              variant="outline"
              data-testid="reset-demo-data-btn"
              onClick={handleReset}
              className="text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 border-rose-300 rounded-xl"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
              {t.settings.resetBtn}
            </Button>
          </div>
        </div>

      </div>

    </div>
  );
};
