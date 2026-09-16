import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { X, ShoppingBag, CheckCircle2, AlertCircle, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";

export const MakeOfferModal = () => {
  const {
    isOfferModalOpen,
    setIsOfferModalOpen,
    offerProductTarget,
    setOfferProductTarget,
    submitOffer,
    t
  } = useApp();

  const [quantity, setQuantity] = useState(500);
  const [offerPrice, setOfferPrice] = useState(20);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (offerProductTarget) {
      setQuantity(offerProductTarget.minOrder || 500);
      setOfferPrice(offerProductTarget.price ? Math.max(1, offerProductTarget.price - 2) : 20);
      setMessage(`Looking to purchase ${offerProductTarget.name} for immediate wholesale dispatch.`);
      setIsSuccess(false);
    }
  }, [offerProductTarget]);

  if (!isOfferModalOpen || !offerProductTarget) return null;

  const totalValue = Number(quantity || 0) * Number(offerPrice || 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    submitOffer({
      produceId: offerProductTarget.id,
      produceName: offerProductTarget.name,
      quantity,
      offerPrice,
      message
    });
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setIsOfferModalOpen(false);
      setOfferProductTarget(null);
    }, 1800);
  };

  return (
    <div
      data-testid="make-offer-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in-50"
      onClick={() => setIsOfferModalOpen(false)}
    >
      <div
        data-testid="make-offer-modal"
        className="w-full max-w-lg bg-card border border-border rounded-3xl shadow-2xl overflow-hidden p-6 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-foreground">Make Purchase Offer</h3>
              <p className="text-xs text-muted-foreground">{offerProductTarget.name} • {offerProductTarget.farmer}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            data-testid="close-offer-modal-btn"
            onClick={() => setIsOfferModalOpen(false)}
            className="h-8 w-8 rounded-full"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {isSuccess ? (
          <div data-testid="offer-success-message" className="py-12 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-foreground">Offer Submitted Successfully!</h4>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              The farmer has received your bid and can accept or counter offer. Check the Offers tab.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            
            {/* Listed Price reference */}
            <div className="p-3 rounded-xl bg-muted/40 border border-border flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Listed Farmer Price:</span>
              <span className="font-bold text-foreground">₹{offerProductTarget.price} / kg</span>
            </div>

            {/* Quantity Input */}
            <div>
              <label className="text-xs font-bold text-foreground block mb-1">
                Requested Quantity (kg)
              </label>
              <input
                type="number"
                min="50"
                max={offerProductTarget.quantity || 100000}
                data-testid="offer-quantity-input"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                required
                className="w-full py-2.5 px-3.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              />
              <p className="text-[11px] text-muted-foreground mt-1">
                Available: {offerProductTarget.quantity?.toLocaleString()} kg
              </p>
            </div>

            {/* Offer Price Input */}
            <div>
              <label className="text-xs font-bold text-foreground block mb-1">
                Your Offer Price (₹ / kg)
              </label>
              <input
                type="number"
                min="1"
                step="0.5"
                data-testid="offer-price-input"
                value={offerPrice}
                onChange={(e) => setOfferPrice(Number(e.target.value))}
                required
                className="w-full py-2.5 px-3.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              />
            </div>

            {/* Computed Total Box */}
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block">
                  Estimated Total
                </span>
                <span className="text-xs text-muted-foreground">
                  {quantity.toLocaleString()} kg × ₹{offerPrice}/kg
                </span>
              </div>
              <span className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-300">
                ₹{totalValue.toLocaleString()}
              </span>
            </div>

            {/* Message to Farmer */}
            <div>
              <label className="text-xs font-bold text-foreground block mb-1">
                Note to Farmer (Pickup schedule, moisture requirements)
              </label>
              <textarea
                rows="2"
                data-testid="offer-message-input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="e.g. Immediate pickup required via refrigerated container..."
                className="w-full py-2 px-3 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2 border-t border-border">
              <Button
                type="button"
                variant="outline"
                data-testid="cancel-offer-btn"
                onClick={() => setIsOfferModalOpen(false)}
                className="text-xs rounded-xl"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                data-testid="submit-offer-btn"
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-6 rounded-xl shadow-md shadow-emerald-600/20"
              >
                Send Offer to Farmer
              </Button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
};
