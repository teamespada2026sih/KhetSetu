import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { INDIAN_STATES_DISTRICTS } from "@/constants/mockData";
import { PlusCircle, Image, CheckCircle2, ArrowRight, Eye, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const PRESET_CROPS = [
  { name: "Tomatoes", category: "Vegetables", image: "https://images.unsplash.com/photo-1594057687713-5fd14eed1c17?crop=entropy&cs=srgb&fm=jpg&q=85", price: 24 },
  { name: "Potatoes", category: "Vegetables", image: "https://images.unsplash.com/photo-1590165482129-1b8b27698780?crop=entropy&cs=srgb&fm=jpg&q=85", price: 18 },
  { name: "Onions", category: "Vegetables", image: "https://images.unsplash.com/photo-1620574387735-3624d75b2dbc?crop=entropy&cs=srgb&fm=jpg&q=85", price: 28 },
  { name: "Carrots", category: "Vegetables", image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?crop=entropy&cs=srgb&fm=jpg&q=85", price: 32 },
  { name: "Cabbage", category: "Vegetables", image: "https://images.unsplash.com/photo-1629681093303-f1b9a9204575?crop=entropy&cs=srgb&fm=jpg&q=85", price: 16 },
  { name: "Cauliflower", category: "Vegetables", image: "https://images.unsplash.com/photo-1744659750204-87034350eec6?crop=entropy&cs=srgb&fm=jpg&q=85", price: 22 },
  { name: "Green Chilli", category: "Vegetables", image: "https://images.unsplash.com/photo-1599987141071-f5810d32e21a?crop=entropy&cs=srgb&fm=jpg&q=85", price: 65 },
  { name: "Mangoes", category: "Fruits", image: "https://images.unsplash.com/photo-1669207334420-66d0e3450283?crop=entropy&cs=srgb&fm=jpg&q=85", price: 85 },
  { name: "Apples", category: "Fruits", image: "https://images.unsplash.com/photo-1613061527119-56ad37b8a581?crop=entropy&cs=srgb&fm=jpg&q=85", price: 110 },
  { name: "Bananas", category: "Fruits", image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?crop=entropy&cs=srgb&fm=jpg&q=85", price: 26 },
  { name: "Watermelon", category: "Fruits", image: "https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?crop=entropy&cs=srgb&fm=jpg&q=85", price: 19 },
  { name: "Papaya", category: "Fruits", image: "https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?crop=entropy&cs=srgb&fm=jpg&q=85", price: 34 },
  { name: "Pineapple", category: "Fruits", image: "https://images.unsplash.com/photo-1781292428366-c61960596e2b?crop=entropy&cs=srgb&fm=jpg&q=85", price: 42 },
  { name: "Grapes", category: "Fruits", image: "https://images.unsplash.com/photo-1598897893004-df11da13128a?crop=entropy&cs=srgb&fm=jpg&q=85", price: 78 },
  { name: "Pomegranate", category: "Fruits", image: "https://images.unsplash.com/photo-1574709755254-fcd942d09d5a?crop=entropy&cs=srgb&fm=jpg&q=85", price: 125 }
];

export const CreateListingView = () => {
  const { t, currentUser, addListing, setCurrentView } = useApp();

  const [formData, setFormData] = useState({
    name: "Tomatoes",
    category: "Vegetables",
    quantity: 3000,
    unit: "kg",
    price: 25,
    state: currentUser?.state || "West Bengal",
    district: currentUser?.district || "Nadia",
    location: "Kalyani APMC Yard",
    harvestDate: new Date().toISOString().split("T")[0],
    quality: "Grade A+",
    description: "Farm-fresh organically grown harvest. Properly graded, cleaned, and packed in ventilated mesh bags.",
    image: "https://images.unsplash.com/photo-1594057687713-5fd14eed1c17?crop=entropy&cs=srgb&fm=jpg&q=85",
    minOrder: 300
  });

  const [success, setSuccess] = useState(false);

  const availableDistricts = INDIAN_STATES_DISTRICTS[formData.state] || [];

  const handleSelectPreset = (preset) => {
    setFormData((prev) => ({
      ...prev,
      name: preset.name,
      category: preset.category,
      image: preset.image,
      price: preset.price
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addListing({
      ...formData,
      quantity: Number(formData.quantity),
      price: Number(formData.price),
      minOrder: Number(formData.minOrder)
    });
    setSuccess(true);
    setTimeout(() => {
      setCurrentView("my-produce");
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Header */}
      <div className="space-y-2 text-left">
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Direct Farmer Marketplace Dispatch</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-serif">
          {t.createListing.title}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          {t.createListing.subtitle}
        </p>
      </div>

      {success && (
        <div
          data-testid="create-listing-success-toast"
          className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 flex items-center gap-3 animate-in fade-in-50"
        >
          <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
          <div>
            <p className="font-bold text-sm">{t.createListing.successMsg}</p>
            <p className="text-xs">Redirecting to My Produce dashboard...</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Form Column */}
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-7 p-6 rounded-3xl bg-card border border-border shadow-xs text-left space-y-5"
        >
          {/* Quick Preset Selector */}
          <div>
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-2">
              Quick Crop Presets (Select to auto-fill)
            </label>
            <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto p-1.5 rounded-xl bg-muted/40 border border-border">
              {PRESET_CROPS.map((crop) => (
                <button
                  type="button"
                  key={crop.name}
                  data-testid={`preset-crop-${crop.name.toLowerCase()}`}
                  onClick={() => handleSelectPreset(crop)}
                  className={`text-xs font-medium px-2.5 py-1 rounded-lg transition-all ${
                    formData.name === crop.name
                      ? "bg-emerald-600 text-white font-bold"
                      : "bg-background text-foreground hover:bg-muted"
                  }`}
                >
                  {crop.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Produce Name */}
            <div>
              <label className="text-xs font-bold text-foreground block mb-1">
                {t.createListing.produceName} *
              </label>
              <input
                type="text"
                data-testid="listing-name-input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full py-2 px-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              />
            </div>

            {/* Category */}
            <div>
              <label className="text-xs font-bold text-foreground block mb-1">
                {t.createListing.category} *
              </label>
              <select
                data-testid="listing-category-select"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full py-2 px-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              >
                <option value="Vegetables">{t.marketplace.vegetables}</option>
                <option value="Fruits">{t.marketplace.fruits}</option>
                <option value="Grains">{t.marketplace.grains}</option>
              </select>
            </div>

            {/* Quantity */}
            <div>
              <label className="text-xs font-bold text-foreground block mb-1">
                {t.createListing.quantity} *
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="10"
                  data-testid="listing-quantity-input"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                  required
                  className="w-full py-2 px-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
                <select
                  data-testid="listing-unit-select"
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  className="py-2 px-3 rounded-xl border border-border bg-background text-foreground text-sm"
                >
                  <option value="kg">kg</option>
                  <option value="Quintals">Quintals</option>
                  <option value="Tonnes">Tonnes</option>
                </select>
              </div>
            </div>

            {/* Expected Price */}
            <div>
              <label className="text-xs font-bold text-foreground block mb-1">
                {t.createListing.targetPrice} *
              </label>
              <input
                type="number"
                min="1"
                data-testid="listing-price-input"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                required
                className="w-full py-2 px-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              />
            </div>

            {/* State Selection */}
            <div>
              <label className="text-xs font-bold text-foreground block mb-1">
                {t.createListing.state} *
              </label>
              <select
                data-testid="listing-state-select"
                value={formData.state}
                onChange={(e) => {
                  const st = e.target.value;
                  const firstDist = INDIAN_STATES_DISTRICTS[st]?.[0] || "";
                  setFormData({ ...formData, state: st, district: firstDist });
                }}
                className="w-full py-2 px-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              >
                {Object.keys(INDIAN_STATES_DISTRICTS).map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* District Selection */}
            <div>
              <label className="text-xs font-bold text-foreground block mb-1">
                {t.createListing.district} *
              </label>
              <select
                data-testid="listing-district-select"
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full py-2 px-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              >
                {availableDistricts.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Harvest Date */}
            <div>
              <label className="text-xs font-bold text-foreground block mb-1">
                {t.createListing.harvestDate} *
              </label>
              <input
                type="date"
                data-testid="listing-date-input"
                value={formData.harvestDate}
                onChange={(e) => setFormData({ ...formData, harvestDate: e.target.value })}
                required
                className="w-full py-2 px-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              />
            </div>

            {/* Quality Grade */}
            <div>
              <label className="text-xs font-bold text-foreground block mb-1">
                {t.createListing.quality} *
              </label>
              <select
                data-testid="listing-quality-select"
                value={formData.quality}
                onChange={(e) => setFormData({ ...formData, quality: e.target.value })}
                className="w-full py-2 px-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              >
                <option value="Grade A+">Grade A+ (Export Premium)</option>
                <option value="Grade A">Grade A (Standard Table)</option>
                <option value="Grade B">Grade B (Processing)</option>
                <option value="Certified Organic">Certified Organic</option>
              </select>
            </div>

          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-bold text-foreground block mb-1">
              {t.createListing.description}
            </label>
            <textarea
              rows="3"
              data-testid="listing-description-input"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full py-2 px-3 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="text-xs font-bold text-foreground block mb-1">
              {t.createListing.imageUrl}
            </label>
            <input
              type="url"
              data-testid="listing-image-url-input"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full py-2 px-3 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            />
          </div>

          <Button
            type="submit"
            data-testid="publish-listing-submit-btn"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-sm shadow-md shadow-emerald-600/20"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            {t.createListing.publishBtn}
          </Button>
        </form>

        {/* Live Preview Column */}
        <div className="lg:col-span-5 space-y-4 text-left">
          <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
            <Eye className="w-4 h-4 text-emerald-600" />
            <span>{t.createListing.previewTitle}</span>
          </div>

          <div
            data-testid="listing-card-preview"
            className="rounded-3xl bg-card border border-border overflow-hidden shadow-lg"
          >
            <div className="relative h-52 w-full bg-muted">
              <img
                src={formData.image || PRESET_CROPS[0].image}
                alt={formData.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 flex gap-1.5">
                <Badge className="bg-emerald-600 text-white font-bold text-xs">
                  {formData.quality}
                </Badge>
                <Badge variant="secondary" className="bg-background/90 text-xs">
                  {formData.category}
                </Badge>
              </div>
              <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-xs text-white p-2 rounded-lg text-xs flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  {formData.district}, {formData.state}
                </span>
                <span className="text-amber-300 font-semibold">{formData.harvestDate}</span>
              </div>
            </div>

            <div className="p-5 space-y-3">
              <div className="flex items-baseline justify-between">
                <h3 className="font-bold text-xl text-foreground">{formData.name}</h3>
                <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                  ₹{formData.price}
                  <span className="text-xs font-normal text-muted-foreground"> / kg</span>
                </span>
              </div>

              <p className="text-xs text-muted-foreground line-clamp-3">
                {formData.description}
              </p>

              <div className="pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                <span>Farmer: <strong className="text-foreground">{currentUser?.name || "Rameshwar Singh"}</strong></span>
                <span>Available: <strong className="text-foreground">{formData.quantity} {formData.unit}</strong></span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
