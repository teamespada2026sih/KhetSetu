import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  Sprout,
  Sun,
  Moon,
  Globe,
  Bell,
  User,
  ShoppingBag,
  TrendingUp,
  Package,
  FileText,
  PlusCircle,
  Menu,
  X,
  ShieldCheck,
  LogOut,
  ChevronDown
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VoiceMicButton } from "@/voice/VoiceMicButton";

export const Navbar = () => {
  const {
    theme,
    toggleTheme,
    language,
    setLanguage,
    t,
    currentView,
    setCurrentView,
    currentUser,
    loginDemoFarmer,
    loginDemoBuyer,
    logout,
    notifications,
    setIsNotificationOpen
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const navigateTo = (view) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo */}
          <div
            data-testid="navbar-brand-logo"
            onClick={() => navigateTo("landing")}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6 text-emerald-100" />
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-foreground font-serif">
                  {t.brand}
                </span>
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  {language === "en" ? "खेतसेतु" : language === "hi" ? "খেতসেতু" : "KhetSetu"}
                </span>
              </div>
              <p className="hidden sm:block text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                Direct Agri Exchange
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <Button
              variant={currentView === "landing" ? "secondary" : "ghost"}
              size="sm"
              data-testid="nav-home-btn"
              onClick={() => navigateTo("landing")}
              className="text-sm font-medium rounded-lg"
            >
              {t.nav.home}
            </Button>
            <Button
              variant={currentView === "marketplace" ? "secondary" : "ghost"}
              size="sm"
              data-testid="nav-marketplace-btn"
              onClick={() => navigateTo("marketplace")}
              className="text-sm font-medium rounded-lg"
            >
              <ShoppingBag className="w-4 h-4 mr-1.5 text-emerald-600" />
              {t.nav.marketplace}
            </Button>
            <Button
              variant={currentView === "market-prices" ? "secondary" : "ghost"}
              size="sm"
              data-testid="nav-market-prices-btn"
              onClick={() => navigateTo("market-prices")}
              className="text-sm font-medium rounded-lg"
            >
              <TrendingUp className="w-4 h-4 mr-1.5 text-amber-600" />
              {t.nav.marketPrices}
            </Button>
            <Button
              variant={currentView === "market-intelligence" ? "secondary" : "ghost"}
              size="sm"
              data-testid="nav-market-intelligence-btn"
              onClick={() => navigateTo("market-intelligence")}
              className="text-sm font-medium rounded-lg"
            >
              {t.nav.marketIntelligence}
            </Button>
            <Button
              variant={currentView === "consignments" ? "secondary" : "ghost"}
              size="sm"
              data-testid="nav-consignments-btn"
              onClick={() => navigateTo("consignments")}
              className="text-sm font-medium rounded-lg"
            >
              <ShieldCheck className="w-4 h-4 mr-1.5 text-emerald-600" />
              {t.nav.consignments}
            </Button>
          </nav>

          {/* Right Controls: Language, Theme, Notifications, User */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Language Selector Dropdown */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                data-testid="language-toggle-btn"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="h-9 px-2.5 sm:px-3 text-xs font-semibold rounded-lg flex items-center gap-1.5 border-border"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="hidden sm:inline">
                  {language === "en" ? "English" : language === "hi" ? "हिन्दी" : "বাংলা"}
                </span>
                <span className="sm:hidden uppercase">{language}</span>
                <ChevronDown className="w-3 h-3 text-muted-foreground" />
              </Button>

              {langDropdownOpen && (
                <div
                  data-testid="language-dropdown-menu"
                  className="absolute right-0 mt-2 w-36 rounded-xl border border-border bg-card shadow-lg py-1 z-50 animate-in fade-in-50 zoom-in-95"
                >
                  <button
                    data-testid="lang-select-en"
                    onClick={() => {
                      setLanguage("en");
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-xs sm:text-sm font-medium flex items-center justify-between hover:bg-muted ${
                      language === "en" ? "text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/30" : ""
                    }`}
                  >
                    <span>English</span>
                    {language === "en" && <span className="text-xs">✓</span>}
                  </button>
                  <button
                    data-testid="lang-select-hi"
                    onClick={() => {
                      setLanguage("hi");
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-xs sm:text-sm font-medium flex items-center justify-between hover:bg-muted ${
                      language === "hi" ? "text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/30" : ""
                    }`}
                  >
                    <span>हिन्दी</span>
                    {language === "hi" && <span className="text-xs">✓</span>}
                  </button>
                  <button
                    data-testid="lang-select-bn"
                    onClick={() => {
                      setLanguage("bn");
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-xs sm:text-sm font-medium flex items-center justify-between hover:bg-muted ${
                      language === "bn" ? "text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/30" : ""
                    }`}
                  >
                    <span>বাংলা</span>
                    {language === "bn" && <span className="text-xs">✓</span>}
                  </button>
                </div>
              )}
            </div>

            {/* Voice Assistant Mic Button */}
            <VoiceMicButton />

            {/* Theme Toggle Button */}
            <Button
              variant="outline"
              size="icon"
              data-testid="theme-toggle-btn"
              onClick={toggleTheme}
              className="h-9 w-9 rounded-lg border-border"
              title="Toggle Theme (Light / Dark)"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-4 h-4 text-emerald-800 hover:-rotate-12 transition-transform" />
              )}
            </Button>

            {/* Notification Bell */}
            <Button
              variant="outline"
              size="icon"
              data-testid="notification-bell-btn"
              onClick={() => setIsNotificationOpen(true)}
              className="relative h-9 w-9 rounded-lg border-border"
              title="Notifications"
            >
              <Bell className="w-4 h-4 text-foreground" />
              {unreadCount > 0 && (
                <span
                  data-testid="notification-badge"
                  className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-600 text-[10px] font-bold text-white rounded-full flex items-center justify-center animate-pulse"
                >
                  {unreadCount}
                </span>
              )}
            </Button>

            {/* User Session or Login / Demo Portals */}
            {currentUser ? (
              <div className="relative">
                <Button
                  variant="outline"
                  data-testid="user-profile-menu-btn"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="h-9 px-2.5 sm:px-3 text-xs sm:text-sm font-medium rounded-lg flex items-center gap-2 border-emerald-600/30 bg-emerald-50/50 dark:bg-emerald-950/20"
                >
                  {currentUser.avatar ? (
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">
                      {currentUser.name ? currentUser.name.charAt(0) : "U"}
                    </div>
                  )}
                  <span className="max-w-[100px] truncate hidden sm:inline">
                    {currentUser.name}
                  </span>
                  <Badge
                    variant="secondary"
                    className="text-[10px] px-1.5 py-0 bg-emerald-600 text-white font-semibold"
                  >
                    {currentUser.role}
                  </Badge>
                  <ChevronDown className="w-3 h-3 text-muted-foreground" />
                </Button>

                {userDropdownOpen && (
                  <div
                    data-testid="user-dropdown-menu"
                    className="absolute right-0 mt-2 w-56 rounded-xl border border-border bg-card shadow-xl py-2 z-50 animate-in fade-in-50 zoom-in-95"
                  >
                    <div className="px-4 py-2 border-b border-border">
                      <p className="text-sm font-bold text-foreground truncate">{currentUser.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{currentUser.email}</p>
                    </div>

                    {currentUser.role === "Farmer" ? (
                      <>
                        <button
                          data-testid="menu-farmer-dashboard"
                          onClick={() => navigateTo("farmer-dashboard")}
                          className="w-full px-4 py-2 text-left text-xs sm:text-sm font-medium hover:bg-muted flex items-center gap-2"
                        >
                          <Package className="w-4 h-4 text-emerald-600" />
                          {t.nav.farmerDashboard}
                        </button>
                        <button
                          data-testid="menu-create-listing"
                          onClick={() => navigateTo("create-listing")}
                          className="w-full px-4 py-2 text-left text-xs sm:text-sm font-medium hover:bg-muted flex items-center gap-2"
                        >
                          <PlusCircle className="w-4 h-4 text-emerald-600" />
                          {t.nav.createListing}
                        </button>
                        <button
                          data-testid="menu-my-produce"
                          onClick={() => navigateTo("my-produce")}
                          className="w-full px-4 py-2 text-left text-xs sm:text-sm font-medium hover:bg-muted flex items-center gap-2"
                        >
                          <FileText className="w-4 h-4 text-emerald-600" />
                          {t.nav.myProduce}
                        </button>
                        <button
                          data-testid="menu-offers"
                          onClick={() => navigateTo("offers")}
                          className="w-full px-4 py-2 text-left text-xs sm:text-sm font-medium hover:bg-muted flex items-center gap-2"
                        >
                          <ShoppingBag className="w-4 h-4 text-emerald-600" />
                          {t.nav.offers}
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          data-testid="menu-buyer-dashboard"
                          onClick={() => navigateTo("buyer-dashboard")}
                          className="w-full px-4 py-2 text-left text-xs sm:text-sm font-medium hover:bg-muted flex items-center gap-2"
                        >
                          <Package className="w-4 h-4 text-emerald-600" />
                          {t.nav.buyerDashboard}
                        </button>
                        <button
                          data-testid="menu-orders"
                          onClick={() => navigateTo("orders")}
                          className="w-full px-4 py-2 text-left text-xs sm:text-sm font-medium hover:bg-muted flex items-center gap-2"
                        >
                          <FileText className="w-4 h-4 text-emerald-600" />
                          {t.nav.orders}
                        </button>
                      </>
                    )}

                    <div className="border-t border-border my-1" />

                    <button
                      data-testid="menu-profile"
                      onClick={() => navigateTo("profile")}
                      className="w-full px-4 py-2 text-left text-xs sm:text-sm font-medium hover:bg-muted flex items-center gap-2"
                    >
                      <User className="w-4 h-4 text-muted-foreground" />
                      {t.nav.profile}
                    </button>
                    <button
                      data-testid="menu-settings"
                      onClick={() => navigateTo("settings")}
                      className="w-full px-4 py-2 text-left text-xs sm:text-sm font-medium hover:bg-muted flex items-center gap-2"
                    >
                      <Globe className="w-4 h-4 text-muted-foreground" />
                      {t.nav.settings}
                    </button>
                    <button
                      data-testid="menu-support"
                      onClick={() => navigateTo("support")}
                      className="w-full px-4 py-2 text-left text-xs sm:text-sm font-medium hover:bg-muted flex items-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4 text-muted-foreground" />
                      {t.nav.support}
                    </button>

                    <div className="border-t border-border my-1" />

                    <button
                      data-testid="menu-logout"
                      onClick={logout}
                      className="w-full px-4 py-2 text-left text-xs sm:text-sm font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      {t.nav.logout}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  data-testid="nav-login-btn"
                  onClick={() => navigateTo("login")}
                  className="text-xs sm:text-sm font-medium rounded-lg px-2.5 sm:px-3"
                >
                  {t.nav.login}
                </Button>
                <Button
                  size="sm"
                  data-testid="nav-signup-btn"
                  onClick={() => navigateTo("signup")}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-medium rounded-lg px-3 sm:px-4 shadow-sm shadow-emerald-600/20"
                >
                  {t.nav.signup}
                </Button>
              </div>
            )}

            {/* Mobile Hamburger Menu Toggle */}
            <Button
              variant="outline"
              size="icon"
              data-testid="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden h-9 w-9 rounded-lg border-border"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          data-testid="mobile-nav-drawer"
          className="md:hidden border-b border-border bg-card px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4"
        >
          <div className="grid grid-cols-2 gap-2 mb-3">
            <Button
              variant="outline"
              size="sm"
              data-testid="mobile-demo-farmer-btn"
              onClick={() => {
                loginDemoFarmer();
                setMobileMenuOpen(false);
              }}
              className="text-xs font-semibold border-emerald-600/40 text-emerald-700 dark:text-emerald-300"
            >
              🌾 {t.nav.demoFarmer}
            </Button>
            <Button
              variant="outline"
              size="sm"
              data-testid="mobile-demo-buyer-btn"
              onClick={() => {
                loginDemoBuyer();
                setMobileMenuOpen(false);
              }}
              className="text-xs font-semibold border-amber-600/40 text-amber-700 dark:text-amber-300"
            >
              🏢 {t.nav.demoBuyer}
            </Button>
          </div>

          <button
            data-testid="mobile-nav-home"
            onClick={() => navigateTo("landing")}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium hover:bg-muted"
          >
            {t.nav.home}
          </button>
          <button
            data-testid="mobile-nav-marketplace"
            onClick={() => navigateTo("marketplace")}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium hover:bg-muted"
          >
            {t.nav.marketplace}
          </button>
          <button
            data-testid="mobile-nav-prices"
            onClick={() => navigateTo("market-prices")}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium hover:bg-muted"
          >
            {t.nav.marketPrices}
          </button>
          <button
            data-testid="mobile-nav-intelligence"
            onClick={() => navigateTo("market-intelligence")}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium hover:bg-muted"
          >
            {t.nav.marketIntelligence}
          </button>
          <button
            data-testid="mobile-nav-consignments"
            onClick={() => navigateTo("consignments")}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium hover:bg-muted"
          >
            {t.nav.consignments}
          </button>

          {currentUser && (
            <div className="pt-2 border-t border-border space-y-1">
              <button
                data-testid="mobile-nav-dashboard"
                onClick={() =>
                  navigateTo(currentUser.role === "Farmer" ? "farmer-dashboard" : "buyer-dashboard")
                }
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-bold text-emerald-600 hover:bg-muted"
              >
                {currentUser.role === "Farmer" ? t.nav.farmerDashboard : t.nav.buyerDashboard}
              </button>
              {currentUser.role === "Farmer" && (
                <>
                  <button
                    data-testid="mobile-nav-create-listing"
                    onClick={() => navigateTo("create-listing")}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium hover:bg-muted"
                  >
                    {t.nav.createListing}
                  </button>
                  <button
                    data-testid="mobile-nav-my-produce"
                    onClick={() => navigateTo("my-produce")}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium hover:bg-muted"
                  >
                    {t.nav.myProduce}
                  </button>
                  <button
                    data-testid="mobile-nav-offers"
                    onClick={() => navigateTo("offers")}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium hover:bg-muted"
                  >
                    {t.nav.offers}
                  </button>
                </>
              )}
              <button
                data-testid="mobile-nav-orders"
                onClick={() => navigateTo("orders")}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium hover:bg-muted"
              >
                {t.nav.orders}
              </button>
              <button
                data-testid="mobile-nav-profile"
                onClick={() => navigateTo("profile")}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium hover:bg-muted"
              >
                {t.nav.profile}
              </button>
              <button
                data-testid="mobile-nav-settings"
                onClick={() => navigateTo("settings")}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium hover:bg-muted"
              >
                {t.nav.settings}
              </button>
              <button
                data-testid="mobile-nav-support"
                onClick={() => navigateTo("support")}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium hover:bg-muted"
              >
                {t.nav.support}
              </button>
              <button
                data-testid="mobile-nav-logout"
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30"
              >
                {t.nav.logout}
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
