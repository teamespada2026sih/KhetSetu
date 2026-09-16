import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  TrendingUp,
  BarChart3,
  PieChart,
  MapPin,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  Calendar,
  Layers
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const MarketIntelligenceView = () => {
  const { t, setCurrentView } = useApp();
  const [selectedCrop, setSelectedCrop] = useState("Tomatoes");

  const cropTrendData = {
    Tomatoes: [
      { month: "Jan", price: 18, arrival: 420 },
      { month: "Feb", price: 21, arrival: 380 },
      { month: "Mar", price: 26, arrival: 310 },
      { month: "Apr", price: 29, arrival: 290 },
      { month: "May", price: 22, arrival: 450 },
      { month: "Jun", price: 24, arrival: 480 }
    ],
    Onions: [
      { month: "Jan", price: 22, arrival: 910 },
      { month: "Feb", price: 24, arrival: 880 },
      { month: "Mar", price: 25, arrival: 860 },
      { month: "Apr", price: 27, arrival: 820 },
      { month: "May", price: 26.5, arrival: 870 },
      { month: "Jun", price: 28, arrival: 890 }
    ],
    Mangoes: [
      { month: "Jan", price: 0, arrival: 0 },
      { month: "Feb", price: 0, arrival: 0 },
      { month: "Mar", price: 140, arrival: 40 },
      { month: "Apr", price: 110, arrival: 120 },
      { month: "May", price: 90, arrival: 280 },
      { month: "Jun", price: 85, arrival: 340 }
    ],
    Potatoes: [
      { month: "Jan", price: 14, arrival: 1400 },
      { month: "Feb", price: 15, arrival: 1550 },
      { month: "Mar", price: 16, arrival: 1420 },
      { month: "Apr", price: 17, arrival: 1300 },
      { month: "May", price: 19, arrival: 1210 },
      { month: "Jun", price: 18, arrival: 1250 }
    ]
  };

  const currentTrends = cropTrendData[selectedCrop] || cropTrendData.Tomatoes;
  const maxPrice = Math.max(...currentTrends.map((d) => d.price), 35);

  const topDemanded = [
    { crop: "Malda Himsagar Mangoes", demandIndex: 96, state: "West Bengal", trend: "+18%" },
    { crop: "Nashik Red Onions", demandIndex: 91, state: "Maharashtra", trend: "+12%" },
    { crop: "Guntur Hot Chillies (G4)", demandIndex: 88, state: "Andhra Pradesh", trend: "+8%" },
    { crop: "Shimla Royal Apples", demandIndex: 85, state: "Himachal Pradesh", trend: "+14%" },
    { crop: "Nadia Table Tomatoes", demandIndex: 82, state: "West Bengal", trend: "+6%" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Header */}
      <div className="space-y-2 text-left">
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Agricultural Data Science & Analytics</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-serif">
          {t.marketIntelligence.title}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          {t.marketIntelligence.subtitle}
        </p>
      </div>

      {/* Interactive Price Trend Chart (Pure SVG / HTML for zero crash guarantee) */}
      <div className="p-6 rounded-3xl bg-card border border-border shadow-xs space-y-6 text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
          <div>
            <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              6-Month Mandi Price Movement (₹ / kg)
            </h3>
            <p className="text-xs text-muted-foreground">Benchmark rates across major wholesale yards</p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {Object.keys(cropTrendData).map((crop) => (
              <Button
                key={crop}
                variant={selectedCrop === crop ? "default" : "outline"}
                size="sm"
                data-testid={`intel-crop-tab-${crop.toLowerCase()}`}
                onClick={() => setSelectedCrop(crop)}
                className={`text-xs font-semibold rounded-xl h-8 px-3 ${
                  selectedCrop === crop
                    ? "bg-emerald-600 text-white"
                    : "border-border text-foreground"
                }`}
              >
                {crop}
              </Button>
            ))}
          </div>
        </div>

        {/* Visual Bar & Line Visualization */}
        <div className="grid grid-cols-6 gap-3 sm:gap-6 pt-6 pb-2 items-end h-56 border-b border-border">
          {currentTrends.map((d, i) => {
            const heightPercent = d.price > 0 ? (d.price / maxPrice) * 100 : 8;
            return (
              <div key={i} className="flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-xs font-bold text-foreground opacity-90 group-hover:text-emerald-600">
                  ₹{d.price}
                </span>
                <div
                  style={{ height: `${heightPercent}%` }}
                  className="w-full max-w-[48px] rounded-t-xl bg-gradient-to-t from-emerald-600 to-emerald-400 group-hover:from-emerald-500 group-hover:to-emerald-300 transition-all shadow-md shadow-emerald-900/10"
                />
                <span className="text-xs font-semibold text-muted-foreground pt-1">
                  {d.month}
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
          <span>* Arrival index: Measured in Metric Tonnes / day</span>
          <span className="font-semibold text-emerald-600">Source: KhetSetu APMC Data Feed</span>
        </div>
      </div>

      {/* Two Column Analytics: Regional Demand Index & Price Disparity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Top Demanded Produce */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-card border border-border shadow-xs text-left space-y-4">
          <div className="pb-3 border-b border-border">
            <h3 className="font-bold text-base text-foreground flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-600" />
              {t.marketIntelligence.regionalDemand}
            </h3>
            <p className="text-xs text-muted-foreground">Buyer demand velocity score (0 - 100)</p>
          </div>

          <div className="space-y-4">
            {topDemanded.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-foreground">{item.crop}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">{item.trend}</span>
                    <Badge variant="outline" className="text-[10px] font-semibold text-muted-foreground">
                      {item.state}
                    </Badge>
                  </div>
                </div>
                {/* Progress Bar */}
                <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    style={{ width: `${item.demandIndex}%` }}
                    className="h-full bg-emerald-600 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Mandi Inter-state Price Disparity Index */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-card border border-border shadow-xs text-left space-y-4">
          <div className="pb-3 border-b border-border">
            <h3 className="font-bold text-base text-foreground flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-600" />
              {t.marketIntelligence.priceDisparity}
            </h3>
            <p className="text-xs text-muted-foreground">Arbitrage potential across state borders</p>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-muted/20 border border-border space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground">Tomatoes (WB vs Delhi)</span>
                <span className="text-emerald-600 font-bold">+28% Margin</span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Ranaghat (₹24/kg) ➔ Azadpur Mandi (₹31/kg). High inter-state arbitrage opportunity.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-muted/20 border border-border space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground">Onions (Nashik vs Kolkata)</span>
                <span className="text-emerald-600 font-bold">+22% Margin</span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Lasalgaon Yard (₹28/kg) ➔ Mechua Bazar (₹34/kg). Direct freight consignment recommended.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-muted/20 border border-border space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground">Potatoes (Punjab vs Siliguri)</span>
                <span className="text-emerald-600 font-bold">+19% Margin</span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Jalandhar Gate (₹18/kg) ➔ Siliguri Hub (₹21.5/kg).
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
