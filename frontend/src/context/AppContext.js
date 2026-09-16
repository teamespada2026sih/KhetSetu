import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "@/constants/translations";
import {
  INITIAL_PRODUCE,
  INITIAL_OFFERS,
  INITIAL_ORDERS,
  INITIAL_CONSIGNMENTS,
  DEMO_MARKET_PRICES,
  INITIAL_NOTIFICATIONS
} from "@/constants/mockData";

const AppContext = createContext();

export const DEMO_FARMER_USER = {
  id: "usr-farmer-1",
  name: "Rameshwar Singh",
  email: "farmer@khetsetu.demo",
  phone: "+91 98765 43210",
  role: "Farmer",
  state: "Punjab",
  district: "Ludhiana",
  avatar: null,
  memberSince: "2024"
};

export const DEMO_BUYER_USER = {
  id: "usr-buyer-1",
  name: "Ananya Sharma",
  email: "buyer@khetsetu.demo",
  phone: "+91 91234 56789",
  role: "Buyer",
  organization: "Delhi Mandi Procurement Corp",
  state: "West Bengal",
  district: "Kolkata",
  avatar: null,
  memberSince: "2024"
};

const safeGetStorage = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.warn(`Error reading ${key} from localStorage, using fallback:`, e);
    return fallback;
  }
};

const safeSetStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Error writing ${key} to localStorage:`, e);
  }
};

export const AppProvider = ({ children }) => {
  // Theme: light | dark (default: light)
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem("khetsetu-theme") || localStorage.getItem("khetsetu_theme");
      return savedTheme === "dark" ? "dark" : "light";
    } catch {
      return "light";
    }
  });

  // Language: en | hi | bn
  const [language, setLanguage] = useState(() => {
    try {
      return localStorage.getItem("khetsetu_language") || "en";
    } catch {
      return "en";
    }
  });

  // Active View / Route
  const [currentView, setCurrentView] = useState("landing");

  // User Session: null | DEMO_FARMER_USER | DEMO_BUYER_USER | Custom User
  const [currentUser, setCurrentUser] = useState(() =>
    safeGetStorage("khetsetu_session", null)
  );

  // Produce Listings (Persistent)
  const [listings, setListings] = useState(() =>
    safeGetStorage("khetsetu_listings", INITIAL_PRODUCE)
  );

  // Offers (Persistent)
  const [offers, setOffers] = useState(() =>
    safeGetStorage("khetsetu_offers", INITIAL_OFFERS)
  );

  // Orders (Persistent)
  const [orders, setOrders] = useState(() =>
    safeGetStorage("khetsetu_orders", INITIAL_ORDERS)
  );

  // Consignments (Persistent)
  const [consignments, setConsignments] = useState(() =>
    safeGetStorage("khetsetu_consignments", INITIAL_CONSIGNMENTS)
  );

  // Saved produce IDs by buyer (Persistent)
  const [savedProduceIds, setSavedProduceIds] = useState(() =>
    safeGetStorage("khetsetu_saved", ["prod-1", "prod-8"])
  );

  // Notifications (Persistent)
  const [notifications, setNotifications] = useState(() =>
    safeGetStorage("khetsetu_notifications", INITIAL_NOTIFICATIONS)
  );

  // Active Selected Product for Detail Modal
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [offerProductTarget, setOfferProductTarget] = useState(null);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Voice integration bridge state
  const [marketplaceVoiceSearch, setMarketplaceVoiceSearch] = useState(null);
  const [marketPricesFocus, setMarketPricesFocus] = useState(null);

  // Apply Theme to documentElement
  useEffect(() => {
    try {
      localStorage.setItem("khetsetu-theme", theme);
      localStorage.setItem("khetsetu_theme", theme);
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } catch (e) {
      console.error(e);
    }
  }, [theme]);

  // Apply Language to storage
  useEffect(() => {
    try {
      localStorage.setItem("khetsetu_language", language);
    } catch (e) {
      console.error(e);
    }
  }, [language]);

  // Save changes to storage
  useEffect(() => {
    safeSetStorage("khetsetu_session", currentUser);
  }, [currentUser]);

  useEffect(() => {
    safeSetStorage("khetsetu_listings", listings);
  }, [listings]);

  useEffect(() => {
    safeSetStorage("khetsetu_offers", offers);
  }, [offers]);

  useEffect(() => {
    safeSetStorage("khetsetu_orders", orders);
  }, [orders]);

  useEffect(() => {
    safeSetStorage("khetsetu_consignments", consignments);
  }, [consignments]);

  useEffect(() => {
    safeSetStorage("khetsetu_saved", savedProduceIds);
  }, [savedProduceIds]);

  useEffect(() => {
    safeSetStorage("khetsetu_notifications", notifications);
  }, [notifications]);

  // Theme Toggler
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Language translation helper
  const t = translations[language] || translations.en;

  // Authentication Helpers
  const login = (user) => {
    setCurrentUser(user);
    if (user.role === "Farmer") {
      setCurrentView("farmer-dashboard");
    } else {
      setCurrentView("buyer-dashboard");
    }
  };

  const loginDemoFarmer = () => {
    login(DEMO_FARMER_USER);
  };

  const loginDemoBuyer = () => {
    login(DEMO_BUYER_USER);
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentView("landing");
  };

  // Saved Produce Toggle
  const toggleSaveProduce = (productId) => {
    setSavedProduceIds((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  // Add Produce Listing
  const addListing = (newListing) => {
    const item = {
      ...newListing,
      id: `prod-${Date.now()}`,
      farmer: currentUser ? currentUser.name : "KhetSetu Producer",
      state: newListing.state || (currentUser ? currentUser.state : "West Bengal"),
      district: newListing.district || (currentUser ? currentUser.district : "Nadia"),
      status: "Active"
    };
    setListings((prev) => [item, ...prev]);

    // Push notification
    addNotification({
      title: "Listing Published",
      message: `Your ${item.name} listing is now live on KhetSetu Marketplace.`,
      type: "offer"
    });
  };

  // Update Produce Listing
  const updateListing = (id, updatedFields) => {
    setListings((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  // Delete Produce Listing
  const deleteListing = (id) => {
    setListings((prev) => prev.filter((item) => item.id !== id));
  };

  // Toggle Pause Listing
  const togglePauseListing = (id) => {
    setListings((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: item.status === "Paused" ? "Active" : "Paused" }
          : item
      )
    );
  };

  // Submit Offer
  const submitOffer = ({ produceId, produceName, quantity, offerPrice, message }) => {
    const newOffer = {
      id: `off-${Date.now()}`,
      buyer: currentUser ? currentUser.name : "Wholesale Trader",
      buyerEmail: currentUser ? currentUser.email : "trader@khetsetu.demo",
      produceId,
      produceName,
      farmer: "Registered Farmer",
      quantity: Number(quantity),
      unit: "kg",
      offerPrice: Number(offerPrice),
      originalPrice: Number(offerPrice) + 2,
      message,
      date: new Date().toISOString().split("T")[0],
      status: "Pending"
    };
    setOffers((prev) => [newOffer, ...prev]);

    addNotification({
      title: "Offer Submitted",
      message: `Offer of ₹${offerPrice}/kg submitted for ${produceName}.`,
      type: "offer"
    });
  };

  // Accept Offer (Farmer Action -> automatically create active Order)
  const acceptOffer = (offerId) => {
    const offer = offers.find((o) => o.id === offerId);
    if (!offer) return;

    setOffers((prev) =>
      prev.map((o) => (o.id === offerId ? { ...o, status: "Accepted" } : o))
    );

    // Create an Order
    const newOrder = {
      id: `KS-ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      produce: `${offer.produceName} (${offer.quantity}kg)`,
      farmer: currentUser ? currentUser.name : offer.farmer,
      buyer: offer.buyer,
      quantity: `${offer.quantity.toLocaleString()} kg`,
      price: `₹${offer.offerPrice} / kg`,
      total: `₹${(offer.quantity * offer.offerPrice).toLocaleString()}`,
      status: "Offer Accepted",
      date: new Date().toISOString().split("T")[0],
      eta: "Within 3 Days"
    };

    setOrders((prev) => [newOrder, ...prev]);

    addNotification({
      title: "Offer Accepted!",
      message: `Order #${newOrder.id} created for ${offer.produceName}. Total value: ${newOrder.total}.`,
      type: "order"
    });
  };

  // Reject Offer
  const rejectOffer = (offerId) => {
    setOffers((prev) =>
      prev.map((o) => (o.id === offerId ? { ...o, status: "Rejected" } : o))
    );
  };

  // Counter Offer
  const counterOffer = (offerId, counterPrice) => {
    setOffers((prev) =>
      prev.map((o) =>
        o.id === offerId
          ? { ...o, status: "Countered", counterPrice: Number(counterPrice) }
          : o
      )
    );
  };

  // Add Notification
  const addNotification = ({ title, message, type = "offer" }) => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      title,
      message,
      time: "Just now",
      read: false,
      type
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Update Profile
  const updateProfile = (profileData) => {
    const updated = { ...currentUser, ...profileData };
    setCurrentUser(updated);
  };

  // Reset Demo Data (safely preserves active session, theme, language)
  const resetDemoData = () => {
    setListings(INITIAL_PRODUCE);
    setOffers(INITIAL_OFFERS);
    setOrders(INITIAL_ORDERS);
    setConsignments(INITIAL_CONSIGNMENTS);
    setSavedProduceIds(["prod-1", "prod-8"]);
    setNotifications(INITIAL_NOTIFICATIONS);
    safeSetStorage("khetsetu_listings", INITIAL_PRODUCE);
    safeSetStorage("khetsetu_offers", INITIAL_OFFERS);
    safeSetStorage("khetsetu_orders", INITIAL_ORDERS);
    safeSetStorage("khetsetu_consignments", INITIAL_CONSIGNMENTS);
    safeSetStorage("khetsetu_saved", ["prod-1", "prod-8"]);
    safeSetStorage("khetsetu_notifications", INITIAL_NOTIFICATIONS);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        language,
        setLanguage,
        t,
        currentView,
        setCurrentView,
        currentUser,
        setCurrentUser,
        login,
        loginDemoFarmer,
        loginDemoBuyer,
        logout,
        listings,
        addListing,
        updateListing,
        deleteListing,
        togglePauseListing,
        offers,
        submitOffer,
        acceptOffer,
        rejectOffer,
        counterOffer,
        orders,
        consignments,
        savedProduceIds,
        toggleSaveProduce,
        notifications,
        addNotification,
        markAllNotificationsAsRead,
        selectedProduct,
        setSelectedProduct,
        isOfferModalOpen,
        setIsOfferModalOpen,
        offerProductTarget,
        setOfferProductTarget,
        isNotificationOpen,
        setIsNotificationOpen,
        updateProfile,
        resetDemoData,
        marketPrices: DEMO_MARKET_PRICES,
        marketplaceVoiceSearch,
        setMarketplaceVoiceSearch,
        marketPricesFocus,
        setMarketPricesFocus
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
