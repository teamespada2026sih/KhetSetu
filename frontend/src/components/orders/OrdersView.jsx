import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  FileText,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Sparkles,
  Search,
  Filter,
  ShieldCheck
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const OrdersView = () => {
  const { t, orders } = useApp();
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const filteredOrders = orders.filter((o) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchId = o.id.toLowerCase().includes(q);
      const matchCrop = o.produce.toLowerCase().includes(q);
      const matchFarmer = o.farmer.toLowerCase().includes(q);
      const matchBuyer = o.buyer.toLowerCase().includes(q);
      if (!matchId && !matchCrop && !matchFarmer && !matchBuyer) return false;
    }
    if (selectedStatus !== "All" && o.status !== selectedStatus) return false;
    return true;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "Completed":
      case "Delivered":
        return <Badge className="bg-emerald-600 text-white font-bold">{status}</Badge>;
      case "In Transit":
      case "Processing":
        return <Badge className="bg-amber-500 text-white font-bold">{status}</Badge>;
      default:
        return <Badge className="bg-blue-600 text-white font-bold">{status}</Badge>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Header */}
      <div className="space-y-2 text-left">
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Farm-to-Gate Shipment Pipeline</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-serif">
          {t.orders.title}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          {t.orders.subtitle}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-card border border-border shadow-xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-muted-foreground" />
          <input
            type="text"
            data-testid="orders-search-input"
            placeholder="Search Order ID, crop, or trading partner..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            data-testid="orders-status-filter"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="py-2 px-3 text-xs sm:text-sm font-semibold rounded-xl border border-border bg-background text-foreground focus:outline-none"
          >
            <option value="All">{t.orders.filterAll}</option>
            <option value="Offer Accepted">Offer Accepted</option>
            <option value="Processing">Processing</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-card border border-border space-y-3">
            <Truck className="w-12 h-12 mx-auto text-muted-foreground" />
            <h3 className="font-bold text-lg text-foreground">No Orders Matching Filters</h3>
            <p className="text-xs text-muted-foreground">Try clearing your search term or status filter.</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              data-testid={`order-row-${order.id}`}
              className="p-5 sm:p-6 rounded-3xl bg-card border border-border shadow-xs hover:shadow-md transition-all text-left space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-xs">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-base text-foreground">{order.id}</span>
                      <span className="text-xs text-muted-foreground">• {order.date}</span>
                    </div>
                    <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                      {order.produce}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {getStatusBadge(order.status)}
                </div>
              </div>

              {/* Order Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-muted/30 border border-border/50 text-xs">
                <div>
                  <span className="text-muted-foreground block text-[11px] uppercase font-bold">Farmer / Origin</span>
                  <span className="font-bold text-foreground text-sm">{order.farmer}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[11px] uppercase font-bold">Buyer / Destination</span>
                  <span className="font-bold text-foreground text-sm">{order.buyer}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[11px] uppercase font-bold">Quantity & Rate</span>
                  <span className="font-semibold text-foreground text-sm">{order.quantity} @ {order.price}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[11px] uppercase font-bold">Consignment Total</span>
                  <span className="font-extrabold text-emerald-700 dark:text-emerald-300 text-sm">{order.total}</span>
                </div>
              </div>

              {/* 4-Stage Progress Pipeline */}
              <div className="pt-2">
                <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-bold">
                  <div className={`p-2 rounded-lg ${order.status ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 border border-emerald-300" : "bg-muted text-muted-foreground"}`}>
                    1. Accepted
                  </div>
                  <div className={`p-2 rounded-lg ${order.status === "Processing" || order.status === "In Transit" || order.status === "Delivered" || order.status === "Completed" ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 border border-emerald-300" : "bg-muted text-muted-foreground"}`}>
                    2. Loading & Weighing
                  </div>
                  <div className={`p-2 rounded-lg ${order.status === "In Transit" || order.status === "Delivered" || order.status === "Completed" ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 border border-emerald-300" : "bg-muted text-muted-foreground"}`}>
                    3. In Transit
                  </div>
                  <div className={`p-2 rounded-lg ${order.status === "Delivered" || order.status === "Completed" ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 border border-emerald-300" : "bg-muted text-muted-foreground"}`}>
                    4. Received & Settled
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
