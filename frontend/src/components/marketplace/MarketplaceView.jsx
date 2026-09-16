import React, { useState, useMemo, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { INDIAN_STATES_DISTRICTS } from "@/constants/mockData";
import {
  Search,
  Filter,
  SlidersHorizontal,
  MapPin,
  Clock,
  Heart,
  Sparkles,
  ArrowUpDown,
  RotateCcw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const MarketplaceView = () => {
  const {
    t,
    listings,
    savedProduceIds,
    toggleSaveProduce,
    setSelectedProduct,
    setIsOfferModalOpen,
    setOfferProductTarget,
    marketplaceVoiceSearch,
    setMarketplaceVoiceSearch
  } = useApp();

  // Filters State
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedState, setSelectedState] = useState("All");
  const [selectedDistrict, setSelectedDistrict] = useState("All");
  const [selectedQuality, setSelectedQuality] = useState("All");
  const [maxPrice, setMaxPrice] = useState(150);
  const [sortBy, setSortBy] = useState("newest");

  // Sync incoming voice search into the marketplace search bar and clear once consumed
  useEffect(() => {
    if (marketplaceVoiceSearch) {
      setSearch(marketplaceVoiceSearch);
      setMarketplaceVoiceSearch(null);
    }
  }, [marketplaceVoiceSearch, setMarketplaceVoiceSearch]);

  // Available districts based on selectedState
  const availableDistricts = useMemo(() => {
    if (selectedState === "All") return [];
    return INDIAN_STATES_DISTRICTS[selectedState] || [];
  }, [selectedState]);

  // Filtered and Sorted Produce List
  const filteredListings = useMemo(() => {
    return listings
      .filter((item) => {
        // Search term in name, description, farmer, district, state
        if (search.trim()) {
          const q = search.toLowerCase();
          const matchName = item.name.toLowerCase().includes(q);
          const matchDesc = (item.description || "").toLowerCase().includes(q);
          const matchFarmer = (item.farmer || "").toLowerCase().includes(q);
          const matchState = (item.state || "").toLowerCase().includes(q);
          const matchDistrict = (item.district || "").toLowerCase().includes(q);
          const matchHindi = (item.hindiName || "").toLowerCase().includes(q);
          const matchBengali = (item.bengaliName || "").toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchFarmer && !matchState && !matchDistrict && !matchHindi && !matchBengali) {
            return false;
          }
        }

        // Category filter
        if (selectedCategory !== "All" && item.category !== selectedCategory) {
          return false;
        }

        // State filter
        if (selectedState !== "All" && item.state !== selectedState) {
          return false;
        }

        // District filter
        if (selectedDistrict !== "All" && item.district !== selectedDistrict) {
          return false;
        }

        // Quality filter
        if (selectedQuality !== "All" && item.quality !== selectedQuality) {
          return false;
        }

        // Price filter
        if (item.price > maxPrice) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "quantity-desc") return b.quantity - a.quantity;
        // Default newest
        return new Date(b.harvestDate || 0) - new Date(a.harvestDate || 0);
      });
  }, [listings, search, selectedCategory, selectedState, selectedDistrict, selectedQuality, maxPrice, sortBy]);

  const resetFilters = () => {
    setSearch("");
    setSelectedCategory("All");
    setSelectedState("All");
    setSelectedDistrict("All");
    setSelectedQuality("All");
    setMaxPrice(150);
    setSortBy("newest");
  };

  const handleOpenProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleMakeOffer = (product, e) => {
    e.stopPropagation();
    setOfferProductTarget(product);
    setIsOfferModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Header Section */}
      <div className="space-y-2 text-left">
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Pan-India Agricultural Spot Exchange</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-serif">
          {t.marketplace.title}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          {t.marketplace.subtitle} • {filteredListings.length} verified listings available
        </p>
      </div>

      {/* Filter and Search Controls Card */}
      <div className="p-5 rounded-2xl bg-card border border-border shadow-xs space-y-4">
        
        {/* Top Row: Search + Sort */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-muted-foreground" />
            <input
              type="text"
              data-testid="marketplace-search-input"
              placeholder={t.marketplace.searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="relative shrink-0">
              <select
                data-testid="marketplace-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="py-2 pl-3 pr-8 text-xs sm:text-sm font-semibold rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              >
                <option value="newest">{t.marketplace.sortNewest}</option>
                <option value="price-asc">{t.marketplace.sortPriceAsc}</option>
                <option value="price-desc">{t.marketplace.sortPriceDesc}</option>
                <option value="quantity-desc">{t.marketplace.sortQuantity}</option>
              </select>
            </div>

            <Button
              variant="outline"
              size="sm"
              data-testid="marketplace-reset-filters-btn"
              onClick={resetFilters}
              className="text-xs rounded-xl border-border h-9"
              title="Reset Filters"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" />
              Reset
            </Button>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-border">
          {["All", "Vegetables", "Fruits", "Grains"].map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              data-testid={`category-filter-btn-${cat.toLowerCase()}`}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs font-semibold rounded-xl h-8 px-3.5 ${
                selectedCategory === cat
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "border-border text-foreground"
              }`}
            >
              {cat === "All"
                ? t.marketplace.allCategories
                : cat === "Vegetables"
                ? t.marketplace.vegetables
                : cat === "Fruits"
                ? t.marketplace.fruits
                : t.marketplace.grains}
            </Button>
          ))}
        </div>

        {/* Deep Dropdown Filters: State, District, Quality, Price */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          
          {/* State Filter */}
          <div>
            <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-1 block">
              {t.marketplace.filterByState}
            </label>
            <select
              data-testid="state-filter-select"
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setSelectedDistrict("All");
              }}
              className="w-full py-2 px-3 text-xs sm:text-sm rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            >
              <option value="All">{t.marketplace.allStates} (22+)</option>
              {Object.keys(INDIAN_STATES_DISTRICTS).map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* District Filter */}
          <div>
            <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-1 block">
              {t.marketplace.filterByDistrict}
            </label>
            <select
              data-testid="district-filter-select"
              value={selectedDistrict}
              disabled={selectedState === "All"}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full py-2 px-3 text-xs sm:text-sm rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/30 disabled:opacity-50"
            >
              <option value="All">{t.marketplace.allDistricts}</option>
              {availableDistricts.map((dst) => (
                <option key={dst} value={dst}>
                  {dst}
                </option>
              ))}
            </select>
          </div>

          {/* Quality Grade Filter */}
          <div>
            <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-1 block">
              {t.marketplace.filterByQuality}
            </label>
            <select
              data-testid="quality-filter-select"
              value={selectedQuality}
              onChange={(e) => setSelectedQuality(e.target.value)}
              className="w-full py-2 px-3 text-xs sm:text-sm rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            >
              <option value="All">{t.marketplace.allQualities}</option>
              <option value="Grade A+">Grade A+ (Premium Export)</option>
              <option value="Grade A">Grade A (Standard Table)</option>
              <option value="Grade B">Grade B (Processing)</option>
              <option value="Certified Organic">Certified Organic</option>
            </select>
          </div>

          {/* Max Price Range Slider */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                Max Price (₹/kg)
              </label>
              <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                ₹{maxPrice} / kg
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="150"
              step="5"
              data-testid="price-range-slider"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-emerald-600 h-2 bg-muted rounded-lg cursor-pointer"
            />
          </div>

        </div>

      </div>

      {/* Produce Grid */}
      {filteredListings.length === 0 ? (
        <div
          data-testid="marketplace-empty-state"
          className="p-12 text-center rounded-2xl bg-card border border-border space-y-4"
        >
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto text-muted-foreground">
            <Filter className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-foreground">No Produce Found</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            {t.marketplace.noResults}
          </p>
          <Button
            data-testid="empty-state-reset-btn"
            onClick={resetFilters}
            className="bg-emerald-600 text-white text-xs font-semibold rounded-xl"
          >
            Clear All Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredListings.map((product) => {
            const isSaved = savedProduceIds.includes(product.id);
            return (
              <div
                key={product.id}
                data-testid={`product-card-${product.id}`}
                onClick={() => handleOpenProduct(product)}
                className="group rounded-2xl bg-card border border-border overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col cursor-pointer"
              >
                {/* Crop Photo */}
                <div className="relative h-44 w-full bg-muted overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 left-2.5 flex gap-1">
                    <Badge className="bg-emerald-600 text-white font-bold text-[10px] px-2 py-0.5">
                      {product.quality}
                    </Badge>
                  </div>

                  {/* Save Heart Button */}
                  <button
                    data-testid={`save-btn-${product.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaveProduce(product.id);
                    }}
                    className="absolute top-2.5 right-2.5 p-2 rounded-full bg-background/90 hover:bg-background shadow-md backdrop-blur-xs text-foreground transition-transform active:scale-90"
                    title={isSaved ? "Saved" : "Save"}
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        isSaved ? "fill-rose-500 text-rose-500" : "text-muted-foreground"
                      }`}
                    />
                  </button>

                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] text-white bg-black/60 backdrop-blur-xs px-2 py-1 rounded-md">
                    <span className="flex items-center gap-1 font-medium truncate">
                      <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                      {product.district}, {product.state}
                    </span>
                    <span className="font-semibold text-amber-300 shrink-0">
                      {product.harvestDate}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-baseline justify-between gap-1">
                      <h3 className="font-bold text-base text-foreground group-hover:text-emerald-600 transition-colors truncate">
                        {product.name}
                      </h3>
                      <div className="text-right shrink-0">
                        <span className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">
                          ₹{product.price}
                        </span>
                        <span className="text-[10px] text-muted-foreground">/kg</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground truncate">{product.farmer}</span>
                    <span className="font-semibold text-foreground shrink-0">
                      {product.quantity.toLocaleString()} {product.unit}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <Button
                      variant="outline"
                      size="sm"
                      data-testid={`btn-view-details-${product.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenProduct(product);
                      }}
                      className="text-xs font-semibold rounded-xl h-8"
                    >
                      {t.marketplace.viewDetails}
                    </Button>
                    <Button
                      size="sm"
                      data-testid={`btn-make-offer-${product.id}`}
                      onClick={(e) => handleMakeOffer(product, e)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl h-8"
                    >
                      {t.marketplace.makeOffer}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
