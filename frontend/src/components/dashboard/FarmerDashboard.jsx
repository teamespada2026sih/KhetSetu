import React from "react";
import { useApp } from "@/context/AppContext";
import {
  Package,
  FileText,
  ShoppingBag,
  TrendingUp,
  PlusCircle,
  IndianRupee,
  ShieldCheck,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  MapPin,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const FarmerDashboard = () => {
  const {
    t,
    currentUser,
    setCurrentView,
    listings,
    offers,
    orders,
    acceptOffer,
    rejectOffer
  } = useApp();

  const farmerListings = listings.filter(
    (l) => !currentUser || l.farmer === currentUser.name || l.farmer.includes("Rameshwar") || l.farmer.includes("Mondal")
  );

  const activeListingsCount = farmerListings.filter((l) => l.status !== "Paused").length;
  const totalVolumeKg = farmerListings.reduce((sum, l) => sum + (Number(l.quantity) || 0), 0);
  const pendingOffers = offers.filter((o) => o.status === "Pending");
  const completedSales = orders.filter((o) => o.status === "Completed" || o.status === "Delivered").length;
  const estimatedRevenue = farmerListings.reduce((sum, l) => sum + (Number(l.quantity) || 0) * (Number(l.price) || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-800 to-emerald-950 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 text-left">
          <div className="flex items-center gap-2">
            <Badge className="bg-emerald-500/30 text-emerald-200 border-emerald-400/40 text-xs font-bold">
              🌾 Verified Kisan Portal
            </Badge>
            <span className="text-xs text-emerald-200 font-semibold">
              {currentUser?.state || "Punjab"}, {currentUser?.district || "Ludhiana"}
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-serif">
            {t.farmerDashboard.welcome},{" "}
            <span className="text-emerald-300">{currentUser?.name || "Rameshwar Singh"}</span>
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl">
            Manage your crop inventory, respond to wholesale buyer bids, and track consignment payouts directly.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 shrink-0">
          <Button
            data-testid="farmer-quick-create-listing-btn"
            onClick={() => setCurrentView("create-listing")}
            className="bg-white hover:bg-emerald-50 text-emerald-900 font-bold px-5 rounded-xl shadow-sm text-xs sm:text-sm"
          >
            <PlusCircle className="w-4 h-4 mr-1.5" />
            {t.createListing.title}
          </Button>
          <Button
            variant="outline"
            data-testid="farmer-quick-my-produce-btn"
            onClick={() => setCurrentView("my-produce")}
            className="border-white/40 text-white hover:bg-white/10 text-xs sm:text-sm font-semibold rounded-xl"
          >
            <Package className="w-4 h-4 mr-1.5" />
            {t.nav.myProduce}
          </Button>
        </div>
      </div>

      {/* 5 Key Statistics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        
        <div data-testid="stat-total-produce" className="p-4 rounded-2xl bg-card border border-border shadow-xs text-left">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
            {t.farmerDashboard.stats.totalProduce}
          </p>
          <p className="text-2xl font-extrabold text-foreground mt-1">
            {totalVolumeKg.toLocaleString()} <span className="text-xs font-semibold text-muted-foreground">kg</span>
          </p>
          <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
            <ArrowUpRight className="w-3 h-3" /> Across {farmerListings.length} crops
          </span>
        </div>

        <div data-testid="stat-active-listings" className="p-4 rounded-2xl bg-card border border-border shadow-xs text-left">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
            {t.farmerDashboard.stats.activeListings}
          </p>
          <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
            {activeListingsCount}
          </p>
          <span className="text-[10px] text-muted-foreground font-semibold mt-1 block">
            Live in marketplace
          </span>
        </div>

        <div data-testid="stat-offers-received" className="p-4 rounded-2xl bg-card border border-border shadow-xs text-left">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
            {t.farmerDashboard.stats.offersReceived}
          </p>
          <p className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">
            {offers.length}
          </p>
          <span className="text-[10px] text-amber-600 font-semibold flex items-center gap-1 mt-1">
            {pendingOffers.length} pending action
          </span>
        </div>

        <div data-testid="stat-completed-sales" className="p-4 rounded-2xl bg-card border border-border shadow-xs text-left">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
            {t.farmerDashboard.stats.completedSales}
          </p>
          <p className="text-2xl font-extrabold text-foreground mt-1">
            {completedSales}
          </p>
          <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">
            Verified payouts
          </span>
        </div>

        <div data-testid="stat-estimated-revenue" className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-card border border-border shadow-xs text-left">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
            {t.farmerDashboard.stats.estimatedRevenue}
          </p>
          <p className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-300 mt-1">
            ₹{(estimatedRevenue / 1000).toFixed(1)}k
          </p>
          <span className="text-[10px] text-muted-foreground font-semibold mt-1 block">
            Inventory value
          </span>
        </div>

      </div>

      {/* Quick Action Hub */}
      <div className="p-5 rounded-2xl bg-card border border-border shadow-xs text-left space-y-3">
        <h3 className="font-bold text-base text-foreground">
          {t.farmerDashboard.quickActions}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Button
            variant="outline"
            data-testid="quick-action-create-listing"
            onClick={() => setCurrentView("create-listing")}
            className="h-auto py-3 px-3 rounded-xl border-border flex flex-col items-start gap-1 text-left"
          >
            <PlusCircle className="w-5 h-5 text-emerald-600" />
            <span className="text-xs font-bold text-foreground">{t.createListing.title}</span>
            <span className="text-[10px] text-muted-foreground">List new harvest</span>
          </Button>

          <Button
            variant="outline"
            data-testid="quick-action-my-produce"
            onClick={() => setCurrentView("my-produce")}
            className="h-auto py-3 px-3 rounded-xl border-border flex flex-col items-start gap-1 text-left"
          >
            <Package className="w-5 h-5 text-emerald-600" />
            <span className="text-xs font-bold text-foreground">{t.nav.myProduce}</span>
            <span className="text-[10px] text-muted-foreground">Manage active lots</span>
          </Button>

          <Button
            variant="outline"
            data-testid="quick-action-view-offers"
            onClick={() => setCurrentView("offers")}
            className="h-auto py-3 px-3 rounded-xl border-border flex flex-col items-start gap-1 text-left"
          >
            <ShoppingBag className="w-5 h-5 text-amber-600" />
            <span className="text-xs font-bold text-foreground">View Offers ({pendingOffers.length})</span>
            <span className="text-[10px] text-muted-foreground">Accept or counter bids</span>
          </Button>

          <Button
            variant="outline"
            data-testid="quick-action-market-prices"
            onClick={() => setCurrentView("market-prices")}
            className="h-auto py-3 px-3 rounded-xl border-border flex flex-col items-start gap-1 text-left"
          >
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            <span className="text-xs font-bold text-foreground">{t.nav.marketPrices}</span>
            <span className="text-[10px] text-muted-foreground">Check APMC mandi rates</span>
          </Button>
        </div>
      </div>

      {/* 2 Column Section: Pending Offers & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Pending Offers Table */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-card border border-border shadow-xs text-left space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div>
              <h3 className="font-bold text-base text-foreground">Incoming Buyer Bids</h3>
              <p className="text-xs text-muted-foreground">Review direct purchase proposals</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              data-testid="dashboard-view-all-offers-btn"
              onClick={() => setCurrentView("offers")}
              className="text-xs text-emerald-600 font-semibold"
            >
              All Offers ({offers.length}) <ChevronRight className="w-3 h-3 inline" />
            </Button>
          </div>

          <div className="space-y-3">
            {offers.slice(0, 3).map((offer) => (
              <div
                key={offer.id}
                data-testid={`dashboard-offer-row-${offer.id}`}
                className="p-3.5 rounded-xl border border-border bg-muted/20 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-foreground text-sm">{offer.produceName}</span>
                    <span className="text-muted-foreground ml-2">({offer.quantity} kg)</span>
                  </div>
                  <Badge
                    className={
                      offer.status === "Accepted"
                        ? "bg-emerald-600 text-white"
                        : offer.status === "Pending"
                        ? "bg-amber-500 text-white"
                        : "bg-muted text-muted-foreground"
                    }
                  >
                    {offer.status}
                  </Badge>
                </div>

                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Buyer: <strong className="text-foreground">{offer.buyer}</strong></span>
                  <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                    ₹{offer.offerPrice}/kg
                  </span>
                </div>

                <p className="text-[11px] text-muted-foreground italic bg-background p-2 rounded-lg border border-border/50">
                  "{offer.message}"
                </p>

                {offer.status === "Pending" && (
                  <div className="flex items-center justify-end gap-2 pt-1">
                    <Button
                      variant="outline"
                      size="sm"
                      data-testid={`dashboard-reject-btn-${offer.id}`}
                      onClick={() => rejectOffer(offer.id)}
                      className="text-xs h-7 rounded-lg text-rose-600"
                    >
                      Reject
                    </Button>
                    <Button
                      size="sm"
                      data-testid={`dashboard-accept-btn-${offer.id}`}
                      onClick={() => acceptOffer(offer.id)}
                      className="text-xs h-7 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                    >
                      Accept Bid
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Recent Mandi & Order Milestones */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-card border border-border shadow-xs text-left space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div>
              <h3 className="font-bold text-base text-foreground">{t.farmerDashboard.recentActivity}</h3>
              <p className="text-xs text-muted-foreground">Consignments and order updates</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              data-testid="dashboard-view-all-orders-btn"
              onClick={() => setCurrentView("orders")}
              className="text-xs text-emerald-600 font-semibold"
            >
              Orders <ChevronRight className="w-3 h-3 inline" />
            </Button>
          </div>

          <div className="space-y-3">
            {orders.slice(0, 3).map((order) => (
              <div
                key={order.id}
                data-testid={`dashboard-order-item-${order.id}`}
                className="p-3 rounded-xl border border-border bg-muted/20 space-y-1.5 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground">{order.id}</span>
                  <Badge variant="outline" className="text-[10px] font-semibold text-emerald-700 border-emerald-300">
                    {order.status}
                  </Badge>
                </div>
                <p className="font-medium text-foreground">{order.produce}</p>
                <div className="flex items-center justify-between text-muted-foreground text-[11px]">
                  <span>Total: <strong className="text-foreground">{order.total}</strong></span>
                  <span>ETA: {order.eta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
