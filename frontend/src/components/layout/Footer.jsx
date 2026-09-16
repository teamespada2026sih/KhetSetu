import React from "react";
import { useApp } from "@/context/AppContext";
import { Sprout, PhoneCall, ShieldCheck, Heart } from "lucide-react";

export const Footer = () => {
  const { t, setCurrentView } = useApp();

  return (
    <footer className="border-t border-border bg-card text-card-foreground transition-colors mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                <Sprout className="w-5 h-5 text-emerald-100" />
              </div>
              <span className="font-bold text-xl font-serif text-foreground">
                {t.brand}
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.brandSubtitle} — Empowering Indian farmers with transparent mandi price benchmarking, direct wholesale bids, and secure demo escrow protection.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-200 dark:border-emerald-900/50">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Verified Direct Farm-Gate Procurement</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm text-foreground uppercase tracking-wider mb-4">
              Platform Links
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button
                  data-testid="footer-link-marketplace"
                  onClick={() => setCurrentView("marketplace")}
                  className="hover:text-emerald-600 transition-colors"
                >
                  {t.nav.marketplace}
                </button>
              </li>
              <li>
                <button
                  data-testid="footer-link-prices"
                  onClick={() => setCurrentView("market-prices")}
                  className="hover:text-emerald-600 transition-colors"
                >
                  {t.nav.marketPrices}
                </button>
              </li>
              <li>
                <button
                  data-testid="footer-link-intelligence"
                  onClick={() => setCurrentView("market-intelligence")}
                  className="hover:text-emerald-600 transition-colors"
                >
                  {t.nav.marketIntelligence}
                </button>
              </li>
              <li>
                <button
                  data-testid="footer-link-consignments"
                  onClick={() => setCurrentView("consignments")}
                  className="hover:text-emerald-600 transition-colors"
                >
                  {t.nav.consignments}
                </button>
              </li>
              <li>
                <button
                  data-testid="footer-link-support"
                  onClick={() => setCurrentView("support")}
                  className="hover:text-emerald-600 transition-colors"
                >
                  {t.nav.support}
                </button>
              </li>
            </ul>
          </div>

          {/* Key Agricultural States */}
          <div>
            <h4 className="font-semibold text-sm text-foreground uppercase tracking-wider mb-4">
              Regional Coverage
            </h4>
            <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
              Serving active mandis across West Bengal (Kolkata, Nadia, Malda, Hooghly), Punjab, Maharashtra, Haryana, Bihar, Karnataka, and 16+ Indian states.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {["West Bengal", "Punjab", "Maharashtra", "Haryana", "Bihar", "Karnataka", "Andhra Pradesh"].map(
                (st) => (
                  <span
                    key={st}
                    className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-muted text-muted-foreground border border-border"
                  >
                    {st}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Kisan Support & Demo Disclaimer */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-foreground uppercase tracking-wider">
              Kisan Support Desk
            </h4>
            <div className="p-3.5 rounded-xl border border-border bg-muted/40 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                <PhoneCall className="w-4 h-4 text-emerald-600" />
                <span>1800-180-1551 (Toll-Free Helpline)</span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                24/7 agricultural mandi assistance & digital onboarding support.
              </p>
            </div>
            <p className="text-[11px] text-muted-foreground/80 leading-relaxed">
              ⚠️ <span className="font-semibold">Demo Notice:</span> KhetSetu is an interactive prototype application with local browser state persistence.
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} KhetSetu (खेतसेतु / খেতসেতু). All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Indian Farmers & Traders
          </p>
        </div>
      </div>
    </footer>
  );
};
