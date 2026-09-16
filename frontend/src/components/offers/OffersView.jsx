import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  ShoppingBag,
  CheckCircle2,
  XCircle,
  ArrowRightLeft,
  Clock,
  Sparkles,
  MessageSquare,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const OffersView = () => {
  const {
    t,
    offers,
    acceptOffer,
    rejectOffer,
    counterOffer,
    currentUser
  } = useApp();

  const [counterTarget, setCounterTarget] = useState(null);
  const [counterPrice, setCounterPrice] = useState(20);

  const handleOpenCounter = (offer) => {
    setCounterTarget(offer);
    setCounterPrice(offer.originalPrice || offer.offerPrice + 1);
  };

  const handleSendCounter = (e) => {
    e.preventDefault();
    if (counterTarget) {
      counterOffer(counterTarget.id, counterPrice);
      setCounterTarget(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Header */}
      <div className="space-y-2 text-left">
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Real-time Crop Bidding System</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-serif">
          {t.offers.title}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          {t.offers.subtitle}
        </p>
      </div>

      {/* Offers Table / Cards */}
      {offers.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-card border border-border space-y-3">
          <ShoppingBag className="w-12 h-12 mx-auto text-muted-foreground" />
          <h3 className="font-bold text-lg text-foreground">No Offers Received Yet</h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            When wholesale buyers submit bids on your listed produce, they will appear here with accept and counter options.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {offers.map((offer) => (
            <div
              key={offer.id}
              data-testid={`offer-card-${offer.id}`}
              className="p-5 sm:p-6 rounded-3xl bg-card border border-border shadow-xs hover:shadow-md transition-all text-left space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-sm">
                    {offer.produceName ? offer.produceName.charAt(0) : "P"}
                  </div>
                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-foreground">
                      {offer.produceName}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      From: <strong className="text-foreground">{offer.buyer}</strong> ({offer.buyerEmail})
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{offer.date}</span>
                  <Badge
                    data-testid={`offer-status-badge-${offer.id}`}
                    className={
                      offer.status === "Accepted"
                        ? "bg-emerald-600 text-white font-bold"
                        : offer.status === "Rejected"
                        ? "bg-rose-600 text-white font-bold"
                        : offer.status === "Countered"
                        ? "bg-blue-600 text-white font-bold"
                        : "bg-amber-500 text-white font-bold"
                    }
                  >
                    {offer.status}
                  </Badge>
                </div>
              </div>

              {/* Offer Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-muted/30 border border-border/50 text-xs">
                <div>
                  <span className="text-muted-foreground block text-[11px] uppercase font-bold">Quantity</span>
                  <span className="font-bold text-foreground text-sm">{offer.quantity.toLocaleString()} {offer.unit || "kg"}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[11px] uppercase font-bold">Offer Price</span>
                  <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">₹{offer.offerPrice} / kg</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[11px] uppercase font-bold">Original Price</span>
                  <span className="font-semibold text-muted-foreground text-sm">₹{offer.originalPrice || offer.offerPrice + 2} / kg</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[11px] uppercase font-bold">Total Bid Value</span>
                  <span className="font-extrabold text-foreground text-sm">
                    ₹{(offer.quantity * offer.offerPrice).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Message Note */}
              {offer.message && (
                <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/20 p-3 rounded-xl border border-border/50">
                  <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="italic leading-relaxed">"{offer.message}"</p>
                </div>
              )}

              {offer.status === "Countered" && offer.counterPrice && (
                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-200">
                  <p className="font-bold">Counter Offer Active: ₹{offer.counterPrice} / kg</p>
                  <p className="text-[11px]">Awaiting buyer confirmation.</p>
                </div>
              )}

              {/* Actions for Farmer */}
              {offer.status === "Pending" && (
                <div className="flex flex-wrap items-center justify-end gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    data-testid={`offer-reject-btn-${offer.id}`}
                    onClick={() => rejectOffer(offer.id)}
                    className="text-xs rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 border-rose-200 dark:border-rose-900"
                  >
                    <XCircle className="w-4 h-4 mr-1" />
                    {t.offers.reject}
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    data-testid={`offer-counter-btn-${offer.id}`}
                    onClick={() => handleOpenCounter(offer)}
                    className="text-xs rounded-xl border-border text-foreground"
                  >
                    <ArrowRightLeft className="w-4 h-4 mr-1 text-blue-600" />
                    {t.offers.counter}
                  </Button>

                  <Button
                    size="sm"
                    data-testid={`offer-accept-btn-${offer.id}`}
                    onClick={() => acceptOffer(offer.id)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl px-5 shadow-sm shadow-emerald-600/20"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-1" />
                    {t.offers.accept}
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Counter Offer Dialog */}
      {counterTarget && (
        <div
          data-testid="counter-offer-modal-backdrop"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in-50"
          onClick={() => setCounterTarget(null)}
        >
          <div
            data-testid="counter-offer-modal"
            className="w-full max-w-md bg-card border border-border rounded-3xl shadow-2xl p-6 text-left space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-bold text-lg text-foreground">
              Send Counter Offer for {counterTarget.produceName}
            </h3>
            <p className="text-xs text-muted-foreground">
              Buyer proposed ₹{counterTarget.offerPrice}/kg. What is your revised price?
            </p>

            <form onSubmit={handleSendCounter} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-foreground block mb-1">
                  Counter Rate (₹ / kg)
                </label>
                <input
                  type="number"
                  min="1"
                  step="0.5"
                  data-testid="counter-price-input"
                  value={counterPrice}
                  onChange={(e) => setCounterPrice(Number(e.target.value))}
                  required
                  className="w-full py-2 px-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  data-testid="cancel-counter-btn"
                  onClick={() => setCounterTarget(null)}
                  className="text-xs rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  data-testid="submit-counter-btn"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5 rounded-xl shadow-md"
                >
                  Submit Counter Offer
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
