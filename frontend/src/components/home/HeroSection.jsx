import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  ArrowRight,
  ShieldCheck,
  Search,
  TrendingUp,
  Award,
  Users,
  MapPin,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const HeroSection = () => {
  const { t, setCurrentView, loginDemoFarmer, loginDemoBuyer } = useApp();
  const [searchQuery, setSearchQuery] = useState("");

  // Subtle cursor parallax offsets using translate3d
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width - 0.5) * 2; // -1 to +1
    const y = ((clientY - rect.top) / rect.height - 0.5) * 2; // -1 to +1
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentView("marketplace");
  };

  return (
    <section
      data-testid="hero-section"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-gradient-to-b from-emerald-50/70 via-background to-background dark:from-emerald-950/20 dark:via-background dark:to-background border-b border-border transition-colors select-none"
    >
      {/* Subtle organic background grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#16a34a15_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headings, Search, CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 dark:bg-emerald-900/40 border border-emerald-300 dark:border-emerald-700/50 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-semibold shadow-xs">
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{t.hero.badge}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground font-serif leading-[1.15]">
                {t.hero.title1}{" "}
                <span className="text-emerald-600 dark:text-emerald-400 block sm:inline">
                  {t.hero.title2}
                </span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl pt-2">
                {t.hero.subtitle}
              </p>
            </div>

            {/* Quick Mandi Search Bar */}
            <form
              onSubmit={handleSearchSubmit}
              className="relative max-w-xl flex items-center shadow-md shadow-emerald-900/5 rounded-2xl bg-card border border-border p-1.5 transition-all focus-within:ring-2 focus-within:ring-emerald-500/30 focus-within:border-emerald-600"
            >
              <Search className="w-5 h-5 ml-3 text-muted-foreground shrink-0" />
              <input
                type="text"
                data-testid="hero-search-input"
                placeholder={t.marketplace.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent px-3 py-2 text-sm text-foreground focus:outline-none placeholder:text-muted-foreground"
              />
              <Button
                type="submit"
                data-testid="hero-search-submit-btn"
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold px-4 sm:px-6 h-10 rounded-xl shrink-0"
              >
                Search
              </Button>
            </form>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
              <Button
                size="lg"
                data-testid="hero-explore-marketplace-btn"
                onClick={() => setCurrentView("marketplace")}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 rounded-xl shadow-lg shadow-emerald-600/25 flex items-center gap-2 group"
              >
                <span>{t.hero.exploreMarketplace}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                data-testid="hero-demo-farmer-btn"
                onClick={loginDemoFarmer}
                className="border-emerald-600/40 text-emerald-800 dark:text-emerald-300 font-semibold px-5 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
              >
                🌾 {t.hero.demoFarmerBtn}
              </Button>

              <Button
                variant="outline"
                size="lg"
                data-testid="hero-demo-buyer-btn"
                onClick={loginDemoBuyer}
                className="border-amber-600/40 text-amber-800 dark:text-amber-300 font-semibold px-5 rounded-xl hover:bg-amber-50 dark:hover:bg-amber-950/40"
              >
                🏢 {t.hero.demoBuyerBtn}
              </Button>
            </div>

            {/* Key Trust Signals */}
            <div className="pt-4 border-t border-border/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="space-y-0.5">
                <p className="text-lg sm:text-xl font-bold text-foreground">50,000+</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Users className="w-3 h-3 text-emerald-600" /> Farmers
                </p>
              </div>
              <div className="space-y-0.5">
                <p className="text-lg sm:text-xl font-bold text-foreground">15+ Daily</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Award className="w-3 h-3 text-amber-500" /> Fresh Crops
                </p>
              </div>
              <div className="space-y-0.5">
                <p className="text-lg sm:text-xl font-bold text-foreground">120+ Mandis</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-emerald-600" /> Live Rates
                </p>
              </div>
              <div className="space-y-0.5">
                <p className="text-lg sm:text-xl font-bold text-foreground">22 States</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-emerald-600" /> Direct Delivery
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Stitch-styled Interactive Produce Parallax Showcase */}
          <div className="lg:col-span-5 relative min-h-[380px] sm:min-h-[460px] flex items-center justify-center">
            
            {/* Background Glow */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-emerald-500/15 dark:bg-emerald-500/10 blur-3xl pointer-events-none" />

            {/* Produce Card 1: Tomatoes (Parallax Strength 18px) */}
            <div
              style={{
                transform: `translate3d(${mousePos.x * 18}px, ${mousePos.y * 18}px, 0)`,
                transition: "transform 0.25s ease-out"
              }}
              data-testid="hero-produce-card-tomatoes"
              onClick={() => setCurrentView("marketplace")}
              className="absolute top-2 left-2 sm:left-4 z-20 w-48 sm:w-56 p-2.5 rounded-2xl bg-card border border-border shadow-xl hover:shadow-2xl cursor-pointer group backdrop-blur-sm"
            >
              <div className="relative h-28 sm:h-32 w-full rounded-xl overflow-hidden mb-2">
                <img
                  src="https://images.unsplash.com/photo-1594057687713-5fd14eed1c17?crop=entropy&cs=srgb&fm=jpg&q=85"
                  alt="Fresh Tomatoes"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-2 right-2 bg-emerald-600 text-white text-[10px] font-bold">
                  ₹24/kg
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-foreground">Nadia Tomatoes</h4>
                  <p className="text-[11px] text-muted-foreground">Grade A+ • 4,500 kg</p>
                </div>
                <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md">
                  WB
                </span>
              </div>
            </div>

            {/* Produce Card 2: Malda Mangoes (Parallax Strength -22px) */}
            <div
              style={{
                transform: `translate3d(${mousePos.x * -22}px, ${mousePos.y * -22}px, 0)`,
                transition: "transform 0.25s ease-out"
              }}
              data-testid="hero-produce-card-mangoes"
              onClick={() => setCurrentView("marketplace")}
              className="absolute bottom-4 right-2 sm:right-4 z-30 w-52 sm:w-60 p-2.5 rounded-2xl bg-card border border-border shadow-2xl hover:shadow-emerald-600/20 cursor-pointer group backdrop-blur-sm"
            >
              <div className="relative h-32 sm:h-36 w-full rounded-xl overflow-hidden mb-2">
                <img
                  src="https://images.unsplash.com/photo-1669207334420-66d0e3450283?crop=entropy&cs=srgb&fm=jpg&q=85"
                  alt="Malda Himsagar Mangoes"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-2 right-2 bg-amber-500 text-white text-[10px] font-bold">
                  ₹85/kg
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-foreground">Himsagar Mangoes</h4>
                  <p className="text-[11px] text-muted-foreground">Malda, West Bengal</p>
                </div>
                <Badge variant="outline" className="text-[10px] font-semibold text-emerald-600 border-emerald-300">
                  Organic
                </Badge>
              </div>
            </div>

            {/* Center Hub: Verified Escrow Shield (Parallax Strength 8px) */}
            <div
              style={{
                transform: `translate3d(${mousePos.x * 8}px, ${mousePos.y * 8}px, 0)`,
                transition: "transform 0.25s ease-out"
              }}
              className="p-4 rounded-2xl bg-emerald-600 text-white shadow-xl max-w-[200px] text-center space-y-1.5 z-10"
            >
              <div className="w-8 h-8 rounded-full bg-white/20 mx-auto flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-100">KhetSetu Escrow</p>
              <p className="text-[11px] text-emerald-50 leading-tight">
                0% Middleman fee • Direct farmer payout upon gate weighment
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
