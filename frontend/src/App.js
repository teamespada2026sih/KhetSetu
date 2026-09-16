import React from "react";
import "@/App.css";
import { AppProvider, useApp } from "@/context/AppContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NotificationDrawer } from "@/components/layout/NotificationDrawer";
import { LandingPage } from "@/components/home/LandingPage";
import { MarketplaceView } from "@/components/marketplace/MarketplaceView";
import { ProductDetailsModal } from "@/components/marketplace/ProductDetailsModal";
import { MakeOfferModal } from "@/components/marketplace/MakeOfferModal";
import { FarmerDashboard } from "@/components/dashboard/FarmerDashboard";
import { BuyerDashboard } from "@/components/dashboard/BuyerDashboard";
import { CreateListingView } from "@/components/produce/CreateListingView";
import { MyProduceView } from "@/components/produce/MyProduceView";
import { OffersView } from "@/components/offers/OffersView";
import { OrdersView } from "@/components/orders/OrdersView";
import { ConsignmentsView } from "@/components/consignments/ConsignmentsView";
import { MarketPricesView } from "@/components/market/MarketPricesView";
import { MarketIntelligenceView } from "@/components/market/MarketIntelligenceView";
import { ProfileView } from "@/components/profile/ProfileView";
import { SettingsView } from "@/components/settings/SettingsView";
import { SupportView } from "@/components/support/SupportView";
import { LoginView, SignupView } from "@/components/auth/AuthViews";

const MainContent = () => {
  const { currentView } = useApp();

  const renderView = () => {
    switch (currentView) {
      case "landing":
        return <LandingPage />;
      case "marketplace":
      case "saved":
        return <MarketplaceView />;
      case "farmer-dashboard":
        return <FarmerDashboard />;
      case "buyer-dashboard":
        return <BuyerDashboard />;
      case "create-listing":
        return <CreateListingView />;
      case "my-produce":
        return <MyProduceView />;
      case "offers":
        return <OffersView />;
      case "orders":
        return <OrdersView />;
      case "consignments":
        return <ConsignmentsView />;
      case "market-prices":
        return <MarketPricesView />;
      case "market-intelligence":
        return <MarketIntelligenceView />;
      case "profile":
        return <ProfileView />;
      case "settings":
        return <SettingsView />;
      case "support":
        return <SupportView />;
      case "login":
        return <LoginView />;
      case "signup":
        return <SignupView />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
      <Navbar />
      <main className="flex-1 animate-in fade-in-50 duration-150">
        {renderView()}
      </main>
      <Footer />
      
      {/* Global Interactive Modals */}
      <ProductDetailsModal />
      <MakeOfferModal />
      <NotificationDrawer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
