import React from "react";
import { useApp } from "@/context/AppContext";
import {
  ShoppingBag,
  TrendingUp,
  Heart,
  Truck,
  IndianRupee,
  Search,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  PackageCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const BuyerDashboard = () => {
  const {
    t,
    currentUser,
    setCurrentView,
    listings,
    orders,
    offers,
    savedProduceIds,
    setSelectedProduct
  } = useApp();

  const savedListings = listings.filter((l) => savedProduceIds.includes(l.id));
  const activeConsignments = orders.filter((o) => o.status === "In Transit" || o.status === "Processing" || o.status === "Offer Accepted");
  const pendingOffers = offers.filter((o) => o.status === "Pending");
  const totalVolumeBought = orders.reduce((sum, o) => sum + (parseInt(o.quantity) || 1500), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-800 to-amber-950 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 text-left">
          <div className="flex items-center gap-2">
            <Badge className="bg-amber-500/30 text-amber-200 border-amber-400/40 text-xs font-bold">
              🏢 Wholesale Procurement Portal
            </Badge>
            <span className="text-xs text-amber-200 font-semibold">
              {currentUser?.organization || "Delhi Mandi Procurement Corp"}
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-serif">
            {t.buyerDashboard.welcome},{" "}
            <span className="text-amber-300">{currentUser?.name || "Ananya Sharma"}</span>
          </h1>
          <p className="text-xs sm:text-sm text-amber-100 max-w-xl">
            Procure fresh farm harvest directly, monitor live transit checkpoints, and inspect verified quality certificates.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 shrink-0">
          <Button
            data-testid="buyer-quick-marketplace-btn"
            onClick={() => setCurrentView("marketplace")}
            className="bg-white hover:bg-amber-50 text-amber-900 font-bold px-5 rounded-xl shadow-sm text-xs sm:text-sm"
          >
            <ShoppingBag className="w-4 h-4 mr-1.5" />
            {t.hero.exploreMarketplace}
          </Button>
          <Button
            variant="outline"
            data-testid="buyer-quick-prices-btn"
            onClick={() => setCurrentView("market-prices")}
            className="border-white/40 text-white hover:bg-white/10 text-xs sm:text-sm font-semibold rounded-xl"
          >
            <TrendingUp className="w-4 h-4 mr-1.5" />
            {t.nav.marketPrices}
          </Button>
        </div>
      </div>

      {/* 5 Key Procurement Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        
        <div data-testid="buyer-stat-active-orders" className="p-4 rounded-2xl bg-card border border-border shadow-xs text-left">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
            {t.buyerDashboard.stats.activeOrders}
          </p>
          <p className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">
            {activeConsignments.length}
          </p>
          <span className="text-[10px] text-muted-foreground font-semibold mt-1 block">
            In transit & processing
          </span>
        </div>

        <div data-testid="buyer-stat-pending-offers" className="p-4 rounded-2xl bg-card border border-border shadow-xs text-left">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
            {t.buyerDashboard.stats.pendingOffers}
          </p>
          <p className="text-2xl font-extrabold text-foreground mt-1">
            {pendingOffers.length}
          </p>
          <span className="text-[10px] text-amber-600 font-semibold mt-1 block">
            Awaiting farmer response
          </span>
        </div>

        <div data-testid="buyer-stat-purchased" className="p-4 rounded-2xl bg-card border border-border shadow-xs text-left">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
            {t.buyerDashboard.stats.purchasedProduce}
          </p>
          <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
            {totalVolumeBought.toLocaleString()} <span className="text-xs font-semibold text-muted-foreground">kg</span>
          </p>
          <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">
            Across 4 shipments
          </span>
        </div>

        <div data-testid="buyer-stat-total-spend" className="p-4 rounded-2xl bg-card border border-border shadow-xs text-left">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
            {t.buyerDashboard.stats.totalSpend}
          </p>
          <p className="text-2xl font-extrabold text-foreground mt-1">
            ₹516.6k
          </p>
          <span className="text-[10px] text-muted-foreground font-semibold mt-1 block">
            Through Demo Escrow
          </span>
        </div>

        <div data-testid="buyer-stat-saved" className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-card border border-border shadow-xs text-left">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
            {t.buyerDashboard.stats.savedProduce}
          </p>
          <p className="text-2xl font-extrabold text-rose-500 mt-1">
            {savedProduceIds.length}
          </p>
          <span className="text-[10px] text-muted-foreground font-semibold mt-1 block">
            Bookmarked crops
          </span>
        </div>

      </div>

      {/* Quick Actions Hub */}
      <div className="p-5 rounded-2xl bg-card border border-border shadow-xs text-left space-y-3">
        <h3 className="font-bold text-base text-foreground">
          {t.buyerDashboard.quickActions}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Button
            variant="outline"
            data-testid="buyer-action-marketplace"
            onClick={() => setCurrentView("marketplace")}
            className="h-auto py-3 px-3 rounded-xl border-border flex flex-col items-start gap-1 text-left"
          >
            <ShoppingBag className="w-5 h-5 text-emerald-600" />
            <span className="text-xs font-bold text-foreground">Browse Marketplace</span>
            <span className="text-[10px] text-muted-foreground">Search 15+ verified crops</span>
          </Button>

          <Button
            variant="outline"
            data-testid="buyer-action-compare-prices"
            onClick={() => setCurrentView("market-prices")}
            className="h-auto py-3 px-3 rounded-xl border-border flex flex-col items-start gap-1 text-left"
          >
            <TrendingUp className="w-5 h-5 text-amber-600" />
            <span className="text-xs font-bold text-foreground">Compare Mandi Prices</span>
            <span className="text-[10px] text-muted-foreground">Lasalgaon, Ranaghat & Azadpur</span>
          </Button>

          <Button
            variant="outline"
            data-testid="buyer-action-consignments"
            onClick={() => setCurrentView("consignments")}
            className="h-auto py-3 px-3 rounded-xl border-border flex flex-col items-start gap-1 text-left"
          >
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span className="text-xs font-bold text-foreground">Escrow Consignments</span>
            <span className="text-[10px] text-muted-foreground">Milestone payment clearance</span>
          </Button>
        </div>
      </div>

      {/* Active Consignments Tracking & Saved Produce Shelf */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Active Consignment Milestones */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-card border border-border shadow-xs text-left space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div>
              <h3 className="font-bold text-base text-foreground">Live Consignment Tracking</h3>
              <p className="text-xs text-muted-foreground">Inward shipments with stage verification</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              data-testid="buyer-view-all-orders-btn"
              onClick={() => setCurrentView("orders")}
              className="text-xs text-emerald-600 font-semibold"
            >
              All Orders <ChevronRight className="w-3 h-3 inline" />
            </Button>
          </div>

          <div className="space-y-3">
            {orders.map((order) => (
              <div
                key={order.id}
                data-testid={`buyer-order-item-${order.id}`}
                className="p-3.5 rounded-xl border border-border bg-muted/20 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground text-sm">{order.produce}</span>
                  <Badge
                    className={
                      order.status === "Delivered" || order.status === "Completed"
                        ? "bg-emerald-600 text-white"
                        : "bg-amber-500 text-white"
                    }
                  >
                    {order.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 text-muted-foreground text-[11px]">
                  <span>Order ID: <strong className="text-foreground">{order.id}</strong></span>
                  <span>Quantity: <strong className="text-foreground">{order.quantity}</strong></span>
                  <span>Farmer: <strong className="text-foreground">{order.farmer}</strong></span>
                  <span>Total: <strong className="text-foreground">{order.total}</strong></span>
                </div>

                <div className="p-2 rounded-lg bg-background border border-border flex items-center justify-between text-[11px]">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-emerald-600" /> Expected Delivery:
                  </span>
                  <span className="font-bold text-emerald-600">{order.eta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Saved Produce Quick Shortlist */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-card border border-border shadow-xs text-left space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div>
              <h3 className="font-bold text-base text-foreground">Saved Produce</h3>
              <p className="text-xs text-muted-foreground">{savedListings.length} short-listed crops</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              data-testid="buyer-browse-more-saved-btn"
              onClick={() => setCurrentView("marketplace")}
              className="text-xs text-emerald-600 font-semibold"
            >
              Marketplace <ChevronRight className="w-3 h-3 inline" />
            </Button>
          </div>

          {savedListings.length === 0 ? (
            <div className="py-8 text-center text-xs text-muted-foreground space-y-2">
              <Heart className="w-6 h-6 mx-auto text-muted-foreground/50" />
              <p>No produce saved yet. Click the heart icon on any crop in the marketplace.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {savedListings.map((product) => (
                <div
                  key={product.id}
                  data-testid={`saved-produce-item-${product.id}`}
                  onClick={() => setSelectedProduct(product)}
                  className="p-2.5 rounded-xl border border-border bg-muted/20 hover:bg-muted cursor-pointer transition-colors flex items-center gap-3"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs text-foreground truncate">{product.name}</h4>
                    <p className="text-[11px] text-muted-foreground truncate">
                      {product.farmer} • {product.district}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-extrabold text-sm text-emerald-600">₹{product.price}</span>
                    <span className="text-[10px] text-muted-foreground block">/kg</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
