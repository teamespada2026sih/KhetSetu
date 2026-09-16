import React, { useCallback } from "react";
import { useApp } from "@/context/AppContext";
import { useVoice } from "@/voice/useVoice";
import { parseVoiceCommand, speechLangCode, feedbackMessage } from "@/voice/voiceCommands";
import { Mic, MicOff, Loader2, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const VoiceMicButton = () => {
  const {
    language,
    setLanguage,
    theme,
    toggleTheme,
    currentUser,
    setCurrentView,
    logout,
    setMarketplaceVoiceSearch,
    setMarketPricesFocus
  } = useApp();

  const handleResult = useCallback((rawText) => {
    const parsed = parseVoiceCommand(rawText);
    const msg = feedbackMessage(parsed.intent, language, {
      product: parsed.product,
      query: parsed.query
    });

    // Show toast feedback
    if (parsed.intent === "UNKNOWN") {
      toast.error(msg, { description: `"${rawText}"` });
      return;
    }
    toast.success(msg, { description: `"${rawText}"` });

    switch (parsed.intent) {
      case "OPEN_MARKETPLACE":
        setCurrentView("marketplace");
        break;
      case "OPEN_DASHBOARD":
        if (currentUser?.role === "Farmer") setCurrentView("farmer-dashboard");
        else if (currentUser?.role === "Buyer") setCurrentView("buyer-dashboard");
        else setCurrentView("login");
        break;
      case "OPEN_MY_PRODUCE":
        setCurrentView("my-produce");
        break;
      case "OPEN_CREATE_LISTING":
        setCurrentView("create-listing");
        break;
      case "OPEN_OFFERS":
        setCurrentView("offers");
        break;
      case "OPEN_ORDERS":
        setCurrentView("orders");
        break;
      case "OPEN_CONSIGNMENTS":
        setCurrentView("consignments");
        break;
      case "OPEN_MARKET_INTELLIGENCE":
        setCurrentView("market-intelligence");
        break;
      case "OPEN_SAVED":
        setCurrentView("saved");
        break;
      case "OPEN_PROFILE":
        setCurrentView("profile");
        break;
      case "OPEN_SETTINGS":
        setCurrentView("settings");
        break;
      case "OPEN_SUPPORT":
        setCurrentView("support");
        break;
      case "OPEN_MARKET_PRICES":
        setCurrentView("market-prices");
        break;
      case "DARK_MODE":
        if (theme !== "dark") toggleTheme();
        break;
      case "LIGHT_MODE":
        if (theme !== "light") toggleTheme();
        break;
      case "LANG_HINDI":
        setLanguage("hi");
        break;
      case "LANG_BENGALI":
        setLanguage("bn");
        break;
      case "LANG_ENGLISH":
        setLanguage("en");
        break;
      case "LOGOUT":
        logout();
        break;
      case "GO_BACK":
        setCurrentView("landing");
        break;
      case "MARKET_PRICE_PRODUCT":
        setMarketPricesFocus(parsed.product);
        setCurrentView("market-prices");
        break;
      case "SEARCH_PRODUCT":
        setMarketplaceVoiceSearch(parsed.product);
        setCurrentView("marketplace");
        break;
      case "GENERIC_SEARCH":
        setMarketplaceVoiceSearch(parsed.query);
        setCurrentView("marketplace");
        break;
      default:
        break;
    }
  }, [language, theme, toggleTheme, currentUser, setCurrentView, setLanguage, logout, setMarketplaceVoiceSearch, setMarketPricesFocus]);

  const handleError = useCallback((errorCode) => {
    const messages = {
      "not-allowed": {
        en: "Microphone permission is required for voice commands.",
        hi: "वॉइस कमांड के लिए माइक्रोफ़ोन अनुमति चाहिए।",
        bn: "ভয়েস কমান্ডের জন্য মাইক্রোফোন অনুমতি প্রয়োজন।"
      },
      "no-speech": {
        en: "I didn't hear anything. Please try again.",
        hi: "मुझे कुछ सुनाई नहीं दिया। कृपया पुनः प्रयास करें।",
        bn: "আমি কিছু শুনতে পাইনি। আবার চেষ্টা করুন।"
      },
      "audio-capture": {
        en: "No microphone was found on your device.",
        hi: "आपके डिवाइस पर माइक्रोफ़ोन नहीं मिला।",
        bn: "আপনার ডিভাইসে মাইক্রোফোন পাওয়া যায়নি।"
      }
    };
    const map = messages[errorCode] || {
      en: "Voice recognition error. Please try again.",
      hi: "वॉइस पहचान में त्रुटि। कृपया पुनः प्रयास करें।",
      bn: "ভয়েস স্বীকৃতিতে ত্রুটি। আবার চেষ্টা করুন।"
    };
    toast.error(map[language] || map.en);
  }, [language]);

  const { isSupported, isListening, isProcessing, interim, startListening, stopListening } = useVoice({
    language: speechLangCode(language),
    onResult: handleResult,
    onError: handleError
  });

  const handleClick = () => {
    if (!isSupported) {
      toast.error(
        language === "hi"
          ? "इस ब्राउज़र में वॉइस पहचान समर्थित नहीं है।"
          : language === "bn"
          ? "এই ব্রাউজারে ভয়েস স্বীকৃতি সমর্থিত নয়।"
          : "Voice recognition is not supported in this browser. Please use a supported browser or continue normally."
      );
      return;
    }
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const tooltip = language === "hi" ? "आवाज़ कमांड" : language === "bn" ? "ভয়েস কমান্ড" : "Voice commands";

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        data-testid="voice-mic-btn"
        onClick={handleClick}
        aria-label={tooltip}
        title={tooltip}
        className={`relative h-9 w-9 rounded-lg border-border transition-colors ${
          isListening ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950/30" : ""
        }`}
      >
        {isProcessing ? (
          <Loader2 className="w-4 h-4 text-emerald-600 animate-spin" />
        ) : isListening ? (
          <Mic className="w-4 h-4 text-emerald-600" />
        ) : !isSupported ? (
          <MicOff className="w-4 h-4 text-muted-foreground" />
        ) : (
          <Mic className="w-4 h-4 text-foreground" />
        )}
        {isListening && (
          <span
            className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"
            aria-hidden="true"
          />
        )}
      </Button>

      {/* Floating "Listening..." indicator */}
      {(isListening || (isProcessing && interim)) && (
        <div
          data-testid="voice-listening-indicator"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] px-4 py-2.5 rounded-full bg-card border border-emerald-600/40 shadow-xl flex items-center gap-2.5 animate-in fade-in-50 slide-in-from-bottom-2"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600" />
          </span>
          <span className="text-xs font-semibold text-foreground">
            {isProcessing
              ? (language === "hi" ? "प्रसंस्करण..." : language === "bn" ? "প্রক্রিয়াকরণ..." : "Processing...")
              : (language === "hi" ? "सुन रहा हूँ..." : language === "bn" ? "শুনছি..." : "Listening...")}
          </span>
          {interim && (
            <span className="text-xs text-muted-foreground italic max-w-[240px] truncate">
              "{interim}"
            </span>
          )}
        </div>
      )}
    </>
  );
};
