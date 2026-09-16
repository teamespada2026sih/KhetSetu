import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  Package,
  PlusCircle,
  Eye,
  Edit2,
  Trash2,
  Pause,
  Play,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const MyProduceView = () => {
  const {
    t,
    listings,
    deleteListing,
    togglePauseListing,
    updateListing,
    setSelectedProduct,
    setCurrentView
  } = useApp();

  const [editingItem, setEditingItem] = useState(null);
  const [editPrice, setEditPrice] = useState(0);
  const [editQuantity, setEditQuantity] = useState(0);

  const handleStartEdit = (item) => {
    setEditingItem(item);
    setEditPrice(item.price);
    setEditQuantity(item.quantity);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (editingItem) {
      updateListing(editingItem.id, {
        price: Number(editPrice),
        quantity: Number(editQuantity)
      });
      setEditingItem(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Kisan Inventory Management</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-serif mt-1">
            {t.nav.myProduce}
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your active harvest listings, update spot prices, or pause lots.
          </p>
        </div>

        <Button
          data-testid="my-produce-create-new-btn"
          onClick={() => setCurrentView("create-listing")}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm px-4 shadow-sm shadow-emerald-600/20 shrink-0"
        >
          <PlusCircle className="w-4 h-4 mr-1.5" />
          {t.createListing.title}
        </Button>
      </div>

      {/* Produce Inventory Grid/Table */}
      {listings.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-card border border-border space-y-4">
          <Package className="w-12 h-12 mx-auto text-muted-foreground" />
          <h3 className="font-bold text-lg text-foreground">No Produce Listed Yet</h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            List your freshly harvested tomatoes, potatoes, onions, or fruits to receive direct wholesale bids.
          </p>
          <Button
            data-testid="empty-create-produce-btn"
            onClick={() => setCurrentView("create-listing")}
            className="bg-emerald-600 text-white text-xs font-semibold rounded-xl"
          >
            Create Your First Listing
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((item) => (
            <div
              key={item.id}
              data-testid={`my-produce-card-${item.id}`}
              className="rounded-3xl bg-card border border-border overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              {/* Top Photo & Status */}
              <div>
                <div className="relative h-44 w-full bg-muted">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <Badge
                      className={
                        item.status === "Paused"
                          ? "bg-amber-600 text-white font-bold text-xs"
                          : "bg-emerald-600 text-white font-bold text-xs"
                      }
                    >
                      {item.status || "Active"}
                    </Badge>
                    <Badge variant="secondary" className="bg-background/90 text-xs">
                      {item.quality}
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-xs text-white p-2 rounded-lg text-xs flex items-center justify-between">
                    <span className="flex items-center gap-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      {item.district}, {item.state}
                    </span>
                    <span className="text-amber-300 font-semibold">{item.harvestDate}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 text-left space-y-3">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-bold text-lg text-foreground">{item.name}</h3>
                    <div className="text-right">
                      <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
                        ₹{item.price}
                      </span>
                      <span className="text-xs text-muted-foreground"> / kg</span>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {item.description}
                  </p>

                  <div className="pt-2 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                    <span>Stock: <strong className="text-foreground">{item.quantity.toLocaleString()} {item.unit || "kg"}</strong></span>
                    <span>Min Order: <strong className="text-foreground">{item.minOrder || 300} kg</strong></span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 bg-muted/20 border-t border-border grid grid-cols-4 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  data-testid={`action-view-${item.id}`}
                  onClick={() => setSelectedProduct(item)}
                  className="text-xs rounded-xl h-8 px-1"
                  title="View Details"
                >
                  <Eye className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                  View
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  data-testid={`action-edit-${item.id}`}
                  onClick={() => handleStartEdit(item)}
                  className="text-xs rounded-xl h-8 px-1"
                  title="Edit Price & Quantity"
                >
                  <Edit2 className="w-3.5 h-3.5 mr-1 text-amber-600" />
                  Edit
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  data-testid={`action-pause-${item.id}`}
                  onClick={() => togglePauseListing(item.id)}
                  className="text-xs rounded-xl h-8 px-1"
                  title={item.status === "Paused" ? "Resume" : "Pause"}
                >
                  {item.status === "Paused" ? (
                    <>
                      <Play className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                      Live
                    </>
                  ) : (
                    <>
                      <Pause className="w-3.5 h-3.5 mr-1 text-amber-600" />
                      Pause
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  data-testid={`action-delete-${item.id}`}
                  onClick={() => deleteListing(item.id)}
                  className="text-xs rounded-xl h-8 px-1 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                  title="Delete Listing"
                >
                  <Trash2 className="w-3.5 h-3.5 mr-1" />
                  Del
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Edit Price / Quantity Modal */}
      {editingItem && (
        <div
          data-testid="edit-produce-modal-backdrop"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in-50"
          onClick={() => setEditingItem(null)}
        >
          <div
            data-testid="edit-produce-modal"
            className="w-full max-w-md bg-card border border-border rounded-3xl shadow-2xl p-6 text-left space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-bold text-lg text-foreground">
              Update {editingItem.name} Listing
            </h3>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-foreground block mb-1">
                  Spot Price (₹ / kg)
                </label>
                <input
                  type="number"
                  min="1"
                  step="0.5"
                  data-testid="edit-price-input"
                  value={editPrice}
                  onChange={(e) => setEditPrice(Number(e.target.value))}
                  required
                  className="w-full py-2 px-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-foreground block mb-1">
                  Available Quantity ({editingItem.unit || "kg"})
                </label>
                <input
                  type="number"
                  min="10"
                  data-testid="edit-quantity-input"
                  value={editQuantity}
                  onChange={(e) => setEditQuantity(Number(e.target.value))}
                  required
                  className="w-full py-2 px-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  data-testid="cancel-edit-btn"
                  onClick={() => setEditingItem(null)}
                  className="text-xs rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  data-testid="save-edit-btn"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5 rounded-xl shadow-md"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
