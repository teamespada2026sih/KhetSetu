import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  TrendingUp,
  TrendingDown,
  Search,
  MapPin,
  Sparkles,
  ArrowUpDown,
  Scale,
  Calendar
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const MarketPricesView = () => {
  const { t, marketPrices, setCurrentView } = useApp();
  const [search, setSearch] = useState("");

  const filteredPrices = marketPrices.filter((p) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchName = p.commodity.toLowerCase().includes(q);
      const matchHindi = (p.hindiName || "").toLowerCase().includes(q);
      const matchBengali = (p.bengaliName || "").toLowerCase().includes(q);
      const matchMandi = p.mandi.toLowerCase().includes(q);
      const matchState = p.state.toLowerCase().includes(q);
      if (!matchName && !matchHindi && !matchBengali && !matchMandi && !matchState) return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Header */}
      <div className="space-y-2 text-left">
        <div className="flex items-center gap-2">
          <Badge className="bg-amber-500 text-white font-extrabold text-xs">
            {t.marketPrices.badge}
          </Badge>
          <span className="text-xs text-muted-foreground font-semibold">
            Updated Hourly Benchmark
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-serif">
          {t.marketPrices.title}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          {t.marketPrices.disclaimer}
        </p>
      </div>

      {/* Search Bar */}
      <div className="p-4 rounded-2xl bg-card border border-border shadow-xs">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-muted-foreground" />
          <input
            type="text"
            data-testid="market-prices-search-input"
            placeholder={t.marketPrices.searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          />
        </div>
      </div>

      {/* Prices Table / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredPrices.map((p, idx) => (
          <div
            key={idx}
            data-testid={`market-price-card-${p.commodity.toLowerCase()}`}
            className="p-5 rounded-3xl bg-card border border-border shadow-xs hover:shadow-md transition-all text-left flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-baseline justify-between">
                <div>
                  <h3 className="font-bold text-lg text-foreground">{p.commodity}</h3>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    {p.hindiName} • {p.bengaliName}
                  </p>
                </div>
                <Badge
                  className={`text-xs font-bold ${
                    p.trend === "up"
                      ? "bg-emerald-600 text-white"
                      : "bg-rose-500 text-white"
                  }`}
                >
                  {p.trend === "up" ? <TrendingUp className="w-3 h-3 mr-1 inline" /> : <TrendingDown className="w-3 h-3 mr-1 inline" />}
                  {p.change}
                </Badge>
              </div>

              {/* Price Callout */}
              <div className="mt-4 p-3 rounded-2xl bg-muted/40 border border-border/60">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                  Current Spot Rate
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-3xl font-extrabold text-foreground">₹{p.currentPrice}</span>
                  <span className="text-xs text-muted-foreground font-semibold">/ kg</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-muted-foreground mt-2 pt-2 border-t border-border">
                  <span>Prev Day: <strong>₹{p.prevPrice}</strong></span>
                  <span>Range: <strong>₹{p.low} - ₹{p.high}</strong></span>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">{p.mandi}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] pt-1">
                <span>Arrival Volume:</span>
                <strong className="text-foreground">{p.arrivalVolume}</strong>
              </div>
              <Button
                variant="outline"
                size="sm"
                data-testid={`btn-trade-${p.commodity.toLowerCase()}`}
                onClick={() => setCurrentView("marketplace")}
                className="w-full text-xs font-semibold rounded-xl h-8 mt-2"
              >
                Find {p.commodity} on Marketplace
              </Button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
