import React from "react";
import { useApp } from "@/context/AppContext";
import { Bell, CheckCheck, X, ShoppingBag, Truck, TrendingUp, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

export const NotificationDrawer = () => {
  const {
    notifications,
    isNotificationOpen,
    setIsNotificationOpen,
    markAllNotificationsAsRead,
    setCurrentView
  } = useApp();

  if (!isNotificationOpen) return null;

  const getIcon = (type) => {
    switch (type) {
      case "offer":
        return <ShoppingBag className="w-4 h-4 text-emerald-600" />;
      case "order":
        return <Truck className="w-4 h-4 text-amber-600" />;
      case "price":
        return <TrendingUp className="w-4 h-4 text-emerald-500" />;
      default:
        return <Eye className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <div
      data-testid="notification-drawer-backdrop"
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end animate-in fade-in-50"
      onClick={() => setIsNotificationOpen(false)}
    >
      <div
        data-testid="notification-drawer-panel"
        className="w-full max-w-md h-full bg-card border-l border-border shadow-2xl p-6 flex flex-col overflow-y-auto animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-lg text-foreground">Notifications</h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            data-testid="close-notifications-btn"
            onClick={() => setIsNotificationOpen(false)}
            className="h-8 w-8 rounded-lg"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="py-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>{notifications.filter((n) => !n.read).length} unread updates</span>
          <Button
            variant="ghost"
            size="sm"
            data-testid="mark-all-read-btn"
            onClick={markAllNotificationsAsRead}
            className="h-7 text-xs font-semibold text-emerald-600 hover:text-emerald-700"
          >
            <CheckCheck className="w-3.5 h-3.5 mr-1" />
            Mark all read
          </Button>
        </div>

        <div className="space-y-3 mt-2 flex-1">
          {notifications.map((n) => (
            <div
              key={n.id}
              data-testid={`notification-item-${n.id}`}
              className={`p-3.5 rounded-xl border transition-all ${
                n.read
                  ? "border-border bg-card text-muted-foreground"
                  : "border-emerald-500/30 bg-emerald-50/40 dark:bg-emerald-950/20 text-foreground"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-background border border-border shrink-0 mt-0.5">
                  {getIcon(n.type)}
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-foreground">{n.title}</p>
                    <span className="text-[10px] text-muted-foreground">{n.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{n.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-border mt-4 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            data-testid="drawer-view-offers-btn"
            onClick={() => {
              setCurrentView("offers");
              setIsNotificationOpen(false);
            }}
            className="flex-1 text-xs"
          >
            View Offers
          </Button>
          <Button
            variant="outline"
            size="sm"
            data-testid="drawer-view-orders-btn"
            onClick={() => {
              setCurrentView("orders");
              setIsNotificationOpen(false);
            }}
            className="flex-1 text-xs"
          >
            View Orders
          </Button>
        </div>
      </div>
    </div>
  );
};
