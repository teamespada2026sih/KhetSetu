import React from "react";
import { useApp } from "@/context/AppContext";
import {
  X,
  MapPin,
  Calendar,
  ShieldCheck,
  Scale,
  Award,
  Heart,
  MessageSquare,
  User,
  ShoppingBag,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SpeakButton } from "@/voice/SpeakButton";

export const ProductDetailsModal = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    savedProduceIds,
    toggleSaveProduce,
    setIsOfferModalOpen,
    setOfferProductTarget,
    language,
    t
  } = useApp();

  if (!selectedProduct) return null;

  const isSaved = savedProduceIds.includes(selectedProduct.id);

  const handleMakeOfferClick = () => {
    setOfferProductTarget(selectedProduct);
    setIsOfferModalOpen(true);
  };

  // Localized read-aloud narration: farmer, location, price, quality
  const speakText =
    language === "hi"
      ? `${selectedProduct.hindiName || selectedProduct.name}, किसान ${selectedProduct.farmer}, स्थान ${selectedProduct.district}, ${selectedProduct.state}। भाव ₹${selectedProduct.price} प्रति ${selectedProduct.unit || "किलोग्राम"}। गुणवत्ता ${selectedProduct.quality}।`
      : language === "bn"
      ? `${selectedProduct.bengaliName || selectedProduct.name}, কৃষক ${selectedProduct.farmer}, অবস্থান ${selectedProduct.district}, ${selectedProduct.state}। দাম ${selectedProduct.price} টাকা প্রতি ${selectedProduct.unit || "কেজি"}। গুণমান ${selectedProduct.quality}।`
      : `${selectedProduct.name}. Farmer ${selectedProduct.farmer}. Location ${selectedProduct.district}, ${selectedProduct.state}. Price ${selectedProduct.price} rupees per ${selectedProduct.unit || "kilogram"}. Quality ${selectedProduct.quality}.`;

  return (
    <div
      data-testid="product-details-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in-50"
      onClick={() => setSelectedProduct(null)}
    >
      <div
        data-testid="product-details-modal"
        className="w-full max-w-3xl bg-card border border-border rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Bar */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-muted/30">
          <div className="flex items-center gap-2">
            <Badge className="bg-emerald-600 text-white font-bold text-xs">
              {selectedProduct.quality}
            </Badge>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {selectedProduct.category}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            data-testid="close-product-modal-btn"
            onClick={() => setSelectedProduct(null)}
            className="h-8 w-8 rounded-full"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Modal Content Scrollable Area */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            
            {/* Left: Crop Photography */}
            <div className="relative rounded-2xl overflow-hidden bg-muted border border-border h-64 sm:h-80 shadow-inner">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3">
                <button
                  data-testid="modal-save-product-btn"
                  onClick={() => toggleSaveProduce(selectedProduct.id)}
                  className="p-2.5 rounded-full bg-background/90 hover:bg-background shadow-md backdrop-blur-xs text-foreground transition-transform active:scale-90"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isSaved ? "fill-rose-500 text-rose-500" : "text-muted-foreground"
                    }`}
                  />
                </button>
              </div>
              <div className="absolute bottom-3 left-3 right-3 bg-black/70 backdrop-blur-xs text-white p-2.5 rounded-xl text-xs flex items-center justify-between">
                <span className="flex items-center gap-1 font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  {selectedProduct.district}, {selectedProduct.state}
                </span>
                <span className="text-amber-300 font-semibold">
                  Harvest: {selectedProduct.harvestDate}
                </span>
              </div>
            </div>

            {/* Right: Specifications & Pricing */}
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground font-serif flex items-center gap-2">
                  <span>{selectedProduct.name}</span>
                  <SpeakButton
                    text={speakText}
                    testId="modal-speak-product-btn"
                    label={
                      language === "hi"
                        ? "उत्पाद विवरण पढ़कर सुनाओ"
                        : language === "bn"
                        ? "পণ্যের বিবরণ পড়ে শোনাও"
                        : "Read product details aloud"
                    }
                    className="h-8 w-8"
                  />
                </h2>
                {selectedProduct.hindiName && (
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
                    {selectedProduct.hindiName} / {selectedProduct.bengaliName}
                  </p>
                )}
              </div>

              {/* Price Callout */}
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-baseline justify-between">
                <div>
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
                    Spot Rate
                  </span>
                  <span className="text-3xl font-extrabold text-emerald-700 dark:text-emerald-300">
                    ₹{selectedProduct.price}
                  </span>
                  <span className="text-xs text-muted-foreground font-semibold"> / {selectedProduct.unit || "kg"}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
                    Available Stock
                  </span>
                  <span className="text-xl font-bold text-foreground">
                    {selectedProduct.quantity.toLocaleString()} {selectedProduct.unit || "kg"}
                  </span>
                </div>
              </div>

              {/* Farmer and Location Info */}
              <div className="p-3.5 rounded-xl border border-border bg-card space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-1.5 font-medium">
                    <User className="w-3.5 h-3.5 text-emerald-600" /> Farmer:
                  </span>
                  <span className="font-bold text-foreground">{selectedProduct.farmer}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-1.5 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" /> Mandi / Hub:
                  </span>
                  <span className="font-semibold text-foreground">{selectedProduct.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-1.5 font-medium">
                    <Scale className="w-3.5 h-3.5 text-emerald-600" /> Min Order Qty:
                  </span>
                  <span className="font-semibold text-foreground">{selectedProduct.minOrder || 300} kg</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                  Farm Notes & Description
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {selectedProduct.description}
                </p>
              </div>

            </div>

          </div>

          {/* Quality & Escrow Guarantee Box */}
          <div className="p-4 rounded-2xl bg-muted/40 border border-border flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <p className="font-bold text-foreground">KhetSetu Verified Consignment Assurance</p>
              <p className="text-muted-foreground leading-relaxed">
                All lots listed on KhetSetu are verified for moisture grading and organic residue compliance. Your offer goes directly to the farmer without commission cuts.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Action Buttons Footer */}
        <div className="px-6 py-4 border-t border-border bg-muted/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Button
            variant="outline"
            data-testid="modal-save-toggle-btn"
            onClick={() => toggleSaveProduce(selectedProduct.id)}
            className="w-full sm:w-auto text-xs font-semibold rounded-xl"
          >
            <Heart className={`w-4 h-4 mr-1.5 ${isSaved ? "fill-rose-500 text-rose-500" : ""}`} />
            {isSaved ? "Saved to Shortlist" : "Save Produce"}
          </Button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              data-testid="modal-cancel-btn"
              onClick={() => setSelectedProduct(null)}
              className="flex-1 sm:flex-none text-xs rounded-xl"
            >
              Close
            </Button>
            <Button
              data-testid="modal-make-offer-btn"
              onClick={handleMakeOfferClick}
              className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-6 rounded-xl shadow-md shadow-emerald-600/20"
            >
              <ShoppingBag className="w-4 h-4 mr-1.5" />
              Make Purchase Offer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
