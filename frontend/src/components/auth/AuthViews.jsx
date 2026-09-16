import React, { useState } from "react";
import { useApp, DEMO_FARMER_USER, DEMO_BUYER_USER } from "@/context/AppContext";
import { INDIAN_STATES_DISTRICTS } from "@/constants/mockData";
import {
  Sprout,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Mail,
  User,
  MapPin,
  ArrowRight,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const LoginView = () => {
  const {
    t,
    login,
    loginDemoFarmer,
    loginDemoBuyer,
    setCurrentView
  } = useApp();

  const [email, setEmail] = useState("farmer@khetsetu.demo");
  const [password, setPassword] = useState("farmer123");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === DEMO_FARMER_USER.email) {
      login(DEMO_FARMER_USER);
    } else if (email === DEMO_BUYER_USER.email) {
      login(DEMO_BUYER_USER);
    } else {
      // Create local session for any email
      login({
        id: `usr-${Date.now()}`,
        name: email.split("@")[0],
        email,
        role: "Farmer",
        state: "West Bengal",
        district: "Kolkata",
        avatar: null
      });
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 sm:py-16 space-y-6">
      
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-600/20">
          <Sprout className="w-7 h-7 text-emerald-100" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground font-serif tracking-tight">
          {t.brand}
        </h1>
        <p className="text-xs text-emerald-600 font-semibold">
          खेतसेतु • খেতসেতু
        </p>
        <p className="text-xs text-muted-foreground">
          {t.auth.loginSubtitle}
        </p>
      </div>

      {/* Demo Fast Login Buttons */}
      <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-2.5">
        <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider block text-left">
          Instant 1-Click Demo Login
        </span>
        <div className="grid grid-cols-2 gap-2">
          <Button
            size="sm"
            data-testid="demo-farmer-login-btn"
            onClick={loginDemoFarmer}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs"
          >
            🌾 {t.auth.demoFarmerBtn}
          </Button>
          <Button
            size="sm"
            data-testid="demo-buyer-login-btn"
            onClick={loginDemoBuyer}
            className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-xs"
          >
            🏢 {t.auth.demoBuyerBtn}
          </Button>
        </div>
      </div>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="p-6 rounded-3xl bg-card border border-border shadow-xs text-left space-y-4"
      >
        <div>
          <label className="text-xs font-bold text-foreground block mb-1">
            {t.auth.email}
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3.5 top-3 text-muted-foreground" />
            <input
              type="email"
              data-testid="login-email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="farmer@khetsetu.demo"
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-foreground block mb-1">
            {t.auth.password}
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 absolute left-3.5 top-3 text-muted-foreground" />
            <input
              type="password"
              data-testid="login-password-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            />
          </div>
        </div>

        <Button
          type="submit"
          data-testid="login-submit-btn"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-sm shadow-md shadow-emerald-600/20"
        >
          {t.auth.signInBtn}
        </Button>

        <div className="pt-2 text-center">
          <button
            type="button"
            data-testid="switch-to-signup-btn"
            onClick={() => setCurrentView("signup")}
            className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
          >
            {t.auth.noAccount}
          </button>
        </div>

        {/* Demo Disclaimer */}
        <div className="pt-3 border-t border-border flex items-start gap-2 text-[11px] text-muted-foreground leading-tight">
          <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <p>{t.auth.demoNotice}</p>
        </div>
      </form>

    </div>
  );
};

export const SignupView = () => {
  const { t, login, setCurrentView } = useApp();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accountType, setAccountType] = useState("Farmer");
  const [state, setState] = useState("West Bengal");
  const [district, setDistrict] = useState("Kolkata");
  const [error, setError] = useState("");

  const availableDistricts = INDIAN_STATES_DISTRICTS[state] || [];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      name: fullName || (accountType === "Farmer" ? "Kisan Mitra" : "Mandi Trader"),
      email: email || `${accountType.toLowerCase()}@khetsetu.demo`,
      role: accountType,
      state,
      district,
      phone: "+91 98765 00000",
      avatar: null,
      memberSince: new Date().getFullYear().toString()
    };

    login(newUser);
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-12 sm:py-16 space-y-6">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-600/20">
          <Sprout className="w-7 h-7 text-emerald-100" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground font-serif tracking-tight">
          {t.auth.signupTitle}
        </h1>
        <p className="text-xs text-muted-foreground">
          {t.auth.signupSubtitle}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-6 sm:p-8 rounded-3xl bg-card border border-border shadow-xs text-left space-y-4"
      >
        {error && (
          <div className="p-3 rounded-xl bg-rose-50 text-rose-700 text-xs font-semibold">
            {error}
          </div>
        )}

        <div>
          <label className="text-xs font-bold text-foreground block mb-1">
            {t.auth.fullName} *
          </label>
          <input
            type="text"
            data-testid="signup-name-input"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            placeholder="Subhash Mondal"
            className="w-full py-2 px-3 text-sm rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold text-foreground block mb-1">
              {t.auth.email} *
            </label>
            <input
              type="email"
              data-testid="signup-email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="subhash@khetsetu.demo"
              className="w-full py-2 px-3 text-sm rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-foreground block mb-1">
              {t.auth.accountType} *
            </label>
            <select
              data-testid="signup-role-select"
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              className="w-full py-2 px-3 text-sm rounded-xl border border-border bg-background text-foreground focus:outline-none"
            >
              <option value="Farmer">{t.auth.farmer}</option>
              <option value="Buyer">{t.auth.buyer}</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold text-foreground block mb-1">
              {t.auth.password} *
            </label>
            <input
              type="password"
              data-testid="signup-password-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full py-2 px-3 text-sm rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-foreground block mb-1">
              {t.auth.confirmPassword} *
            </label>
            <input
              type="password"
              data-testid="signup-confirm-password-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full py-2 px-3 text-sm rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold text-foreground block mb-1">
              {t.auth.state} *
            </label>
            <select
              data-testid="signup-state-select"
              value={state}
              onChange={(e) => {
                const st = e.target.value;
                const firstD = INDIAN_STATES_DISTRICTS[st]?.[0] || "";
                setState(st);
                setDistrict(firstD);
              }}
              className="w-full py-2 px-3 text-sm rounded-xl border border-border bg-background text-foreground focus:outline-none"
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
              {t.auth.district} *
            </label>
            <select
              data-testid="signup-district-select"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full py-2 px-3 text-sm rounded-xl border border-border bg-background text-foreground focus:outline-none"
            >
              {availableDistricts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Button
          type="submit"
          data-testid="signup-submit-btn"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-sm shadow-md shadow-emerald-600/20"
        >
          {t.auth.signUpBtn}
        </Button>

        <div className="pt-2 text-center">
          <button
            type="button"
            data-testid="switch-to-login-btn"
            onClick={() => setCurrentView("login")}
            className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
          >
            {t.auth.haveAccount}
          </button>
        </div>

        <div className="pt-3 border-t border-border flex items-start gap-2 text-[11px] text-muted-foreground leading-tight">
          <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <p>{t.auth.demoNotice}</p>
        </div>
      </form>

    </div>
  );
};
