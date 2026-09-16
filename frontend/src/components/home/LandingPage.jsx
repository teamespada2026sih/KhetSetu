import React from "react";
import { useApp } from "@/context/AppContext";
import { HeroSection } from "@/components/home/HeroSection";
import {
  TrendingUp,
  ShieldCheck,
  Truck,
  Scale,
  Award,
  ArrowRight,
  Heart,
  ChevronRight,
  Sparkles,
  MapPin,
  Clock,
  Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const LandingPage = () => {
  const {
    t,
    setCurrentView,
    listings,
    savedProduceIds,
    toggleSaveProduce,
    setSelectedProduct,
    setIsOfferModalOpen,
    setOfferProductTarget,
    marketPrices,
    loginDemoFarmer,
    loginDemoBuyer
  } = useApp();

  const featuredProduce = listings.slice(0, 6);

  const handleOpenProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleMakeOffer = (product, e) => {
    e.stopPropagation();
    setOfferProductTarget(product);
    setIsOfferModalOpen(true);
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      
      {/* 1. Interactive Hero Section with Subtle Cursor Parallax */}
      <HeroSection />

      {/* 2. Live Mandi Ticker Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border shadow-xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-3 border-b border-border">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="font-bold text-sm sm:text-base text-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                Live Mandi Benchmarks (₹ / kg)
              </h3>
              <Badge variant="outline" className="text-[10px] font-bold text-amber-600 border-amber-400">
                DEMO DATA
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              data-testid="ticker-view-all-prices-btn"
              onClick={() => setCurrentView("market-prices")}
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 p-0 h-auto"
            >
              View all 20+ Mandi Rates <ChevronRight className="w-3.5 h-3.5 inline" />
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 pt-3">
            {marketPrices.slice(0, 8).map((p, idx) => (
              <div
                key={idx}
                data-testid={`mandi-ticker-item-${p.commodity.toLowerCase()}`}
                onClick={() => setCurrentView("market-prices")}
                className="p-2.5 rounded-xl bg-muted/40 hover:bg-muted cursor-pointer transition-colors border border-border/50 text-left"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-foreground truncate">{p.commodity}</span>
                  <span
                    className={`text-[10px] font-bold ${
                      p.trend === "up" ? "text-emerald-600" : "text-rose-500"
                    }`}
                  >
                    {p.change}
                  </span>
                </div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-sm font-extrabold text-foreground">₹{p.currentPrice}</span>
                  <span className="text-[10px] text-muted-foreground">/kg</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Fresh Harvest Marketplace Shelf */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Direct From Indian Farms</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-serif mt-1">
              Featured Farm Produce
            </h2>
          </div>
          <Button
            data-testid="landing-view-full-marketplace-btn"
            onClick={() => setCurrentView("marketplace")}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-xs sm:text-sm px-4"
          >
            Browse Full Marketplace ({listings.length} crops)
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProduce.map((product) => {
            const isSaved = savedProduceIds.includes(product.id);
            return (
              <div
                key={product.id}
                data-testid={`featured-product-card-${product.id}`}
                onClick={() => handleOpenProduct(product)}
                className="group rounded-2xl bg-card border border-border overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col cursor-pointer"
              >
                {/* Crop Photo with badges */}
                <div className="relative h-48 w-full bg-muted overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <Badge className="bg-emerald-600 text-white font-bold text-xs">
                      {product.quality}
                    </Badge>
                    <Badge variant="secondary" className="bg-background/90 backdrop-blur-xs text-xs font-semibold">
                      {product.category}
                    </Badge>
                  </div>
                  
                  {/* Save Heart Button */}
                  <button
                    data-testid={`save-product-btn-${product.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaveProduce(product.id);
                    }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-background/90 hover:bg-background shadow-md backdrop-blur-xs text-foreground transition-transform active:scale-90"
                    title={isSaved ? "Saved" : "Save"}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isSaved ? "fill-rose-500 text-rose-500" : "text-muted-foreground"
                      }`}
                    />
                  </button>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white bg-black/60 backdrop-blur-xs px-2.5 py-1.5 rounded-lg">
                    <span className="flex items-center gap-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      {product.district}, {product.state}
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-amber-300" />
                      {product.harvestDate}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-bold text-lg text-foreground group-hover:text-emerald-600 transition-colors">
                        {product.name}
                      </h3>
                      <div className="text-right">
                        <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
                          ₹{product.price}
                        </span>
                        <span className="text-xs text-muted-foreground"> / kg</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                    <div>
                      <p className="font-semibold text-foreground">{product.farmer}</p>
                      <p className="text-[11px]">{product.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">
                        {product.quantity.toLocaleString()} {product.unit}
                      </p>
                      <p className="text-[11px]">Available</p>
                    </div>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <Button
                      variant="outline"
                      size="sm"
                      data-testid={`card-view-details-btn-${product.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenProduct(product);
                      }}
                      className="text-xs font-semibold rounded-xl"
                    >
                      {t.marketplace.viewDetails}
                    </Button>
                    <Button
                      size="sm"
                      data-testid={`card-make-offer-btn-${product.id}`}
                      onClick={(e) => handleMakeOffer(product, e)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl"
                    >
                      {t.marketplace.makeOffer}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Why KhetSetu: 4 Pillar Features */}
      <section className="bg-emerald-50/50 dark:bg-emerald-950/20 py-12 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-serif">
              Transforming Agricultural Trade in India
            </h2>
            <p className="text-sm text-muted-foreground">
              Direct farmer-to-buyer transactions backed by transparent quality verification and secure demo escrow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-card border border-border shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-foreground">Zero Middlemen</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Connect directly with institutional buyers, supermarkets, and verified traders to retain maximum harvest margins.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-foreground">Real-time Mandi Rates</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Track live wholesale price trends across Lasalgaon, Azadpur, Ranaghat, and 120+ APMC mandis.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-foreground">Demo Escrow Protection</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Stage-gated payments held securely until quality inspection and weighment clearance at the delivery terminal.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-foreground">Pan-India Logistics</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Integrated consignment monitoring from farm-gate loading to interstate border checkposts and final receiving.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Demo Portal Fast Access CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-emerald-800 to-emerald-950 text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl space-y-4 relative z-10 text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-300 bg-white/10 px-3 py-1 rounded-full">
              Interactive Prototype
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-serif leading-tight">
              Ready to experience modern agricultural commerce?
            </h2>
            <p className="text-sm sm:text-base text-emerald-100 leading-relaxed">
              Explore farmer listing forms, buyer offer negotiation, live consignment tracking, and market intelligence with one click.
            </p>
            
            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                size="lg"
                data-testid="cta-demo-farmer-login"
                onClick={loginDemoFarmer}
                className="bg-white hover:bg-emerald-50 text-emerald-900 font-bold px-6 rounded-xl shadow-md"
              >
                🌾 Launch Farmer Portal
              </Button>
              <Button
                size="lg"
                variant="outline"
                data-testid="cta-demo-buyer-login"
                onClick={loginDemoBuyer}
                className="border-white/40 text-white hover:bg-white/10 font-bold px-6 rounded-xl"
              >
                🏢 Launch Buyer Portal
              </Button>
              <Button
                size="lg"
                variant="ghost"
                data-testid="cta-support-btn"
                onClick={() => setCurrentView("support")}
                className="text-emerald-200 hover:text-white hover:bg-white/5 font-semibold text-xs"
              >
                <Phone className="w-4 h-4 mr-1.5" /> Kisan Helpline FAQ
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
