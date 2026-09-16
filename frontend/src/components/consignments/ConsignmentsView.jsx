import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  ShieldCheck,
  Search,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  AlertCircle,
  FileCheck2,
  Truck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const ConsignmentsView = () => {
  const { t, consignments } = useApp();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredConsignments = consignments.filter((c) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchId = c.id.toLowerCase().includes(q);
      const matchCrop = c.crop.toLowerCase().includes(q);
      const matchBuyer = c.buyer.toLowerCase().includes(q);
      const matchFarmer = c.farmer.toLowerCase().includes(q);
      if (!matchId && !matchCrop && !matchBuyer && !matchFarmer) return false;
    }
    if (statusFilter !== "All" && c.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Header */}
      <div className="space-y-2 text-left">
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Institutional Agri-Trade Settlement</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-serif">
          {t.consignments.title}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          {t.consignments.subtitle}
        </p>
      </div>

      {/* Visual Demo Escrow Showcase Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-900 to-emerald-950 text-white shadow-xl space-y-6 text-left relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-800 pb-4">
          <div className="flex items-center gap-2">
            <Badge className="bg-emerald-500 text-white font-extrabold text-xs">
              {t.consignments.escrowBadge}
            </Badge>
            <span className="text-xs text-emerald-200">Milestone Stage-Gated Protection</span>
          </div>
          <p className="text-xs text-emerald-300/90 italic">
            ⚠️ {t.consignments.escrowNote}
          </p>
        </div>

        {/* 3 Step Interactive Escrow Pathway */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          
          <div className="p-4 rounded-2xl bg-emerald-800/50 border border-emerald-700/50 space-y-2">
            <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
              <Lock className="w-4 h-4" />
              <span>{t.consignments.steps.step1}</span>
            </div>
            <p className="text-xs text-emerald-100 leading-relaxed">
              Institutional buyer deposits full invoice or 40% initial margin into secure simulated escrow vault before truck loading.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-800/50 border border-emerald-700/50 space-y-2">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
              <FileCheck2 className="w-4 h-4" />
              <span>{t.consignments.steps.step2}</span>
            </div>
            <p className="text-xs text-emerald-100 leading-relaxed">
              Farm-gate moisture, sizing, and quality certificates uploaded and GPS seal locked at mandi dispatch gate.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-800/50 border border-emerald-700/50 space-y-2">
            <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>{t.consignments.steps.step3}</span>
            </div>
            <p className="text-xs text-emerald-100 leading-relaxed">
              Inward weighbridge slip verified at receiving warehouse. Instant direct digital payout settlement to farmer's account.
            </p>
          </div>

        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-card border border-border shadow-xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-muted-foreground" />
          <input
            type="text"
            data-testid="consignments-search-input"
            placeholder={t.consignments.searchTxn}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          />
        </div>

        <div className="w-full sm:w-auto">
          <select
            data-testid="consignments-status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full py-2 px-3 text-xs sm:text-sm font-semibold rounded-xl border border-border bg-background text-foreground focus:outline-none"
          >
            <option value="All">{t.consignments.filterStatus} (All)</option>
            <option value="In Transit">In Transit</option>
            <option value="Offer Received">Offer Received</option>
            <option value="Quality Check">Quality Check</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      </div>

      {/* Consignments List */}
      <div className="space-y-4">
        {filteredConsignments.map((item) => (
          <div
            key={item.id}
            data-testid={`consignment-row-${item.id}`}
            className="p-5 sm:p-6 rounded-3xl bg-card border border-border shadow-xs hover:shadow-md transition-all text-left space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base sm:text-lg text-emerald-600 dark:text-emerald-400">
                    {item.id}
                  </span>
                  <span className="text-xs text-muted-foreground">• {item.date}</span>
                </div>
                <h3 className="font-bold text-base text-foreground mt-0.5">{item.crop}</h3>
              </div>

              <div className="flex items-center gap-2">
                <Badge
                  className={
                    item.status === "Delivered"
                      ? "bg-emerald-600 text-white font-bold"
                      : item.status === "In Transit"
                      ? "bg-amber-500 text-white font-bold"
                      : "bg-blue-600 text-white font-bold"
                  }
                >
                  {item.status}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-muted/30 border border-border/50 text-xs">
              <div>
                <span className="text-muted-foreground block text-[11px] uppercase font-bold">Procurement Buyer</span>
                <span className="font-bold text-foreground text-sm">{item.buyer}</span>
              </div>
              <div>
                <span className="text-muted-foreground block text-[11px] uppercase font-bold">Farmer / Supplier</span>
                <span className="font-bold text-foreground text-sm">{item.farmer}</span>
              </div>
              <div>
                <span className="text-muted-foreground block text-[11px] uppercase font-bold">Quantity</span>
                <span className="font-semibold text-foreground text-sm">{item.quantity}</span>
              </div>
              <div>
                <span className="text-muted-foreground block text-[11px] uppercase font-bold">Consignment Total</span>
                <span className="font-extrabold text-emerald-700 dark:text-emerald-300 text-base">{item.value}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between text-xs">
              <span className="font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                {item.escrowStage}
              </span>
              <span className="text-muted-foreground">
                Escrow Advance: <strong className="text-foreground">{item.advancePaid}</strong>
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
