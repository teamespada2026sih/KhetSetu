// KhetSetu Voice Command Parser
// Lightweight keyword/intent matching. No AI APIs.
// Supports English (en), Hindi (hi), Bengali (bn).

// Product keyword → canonical commodity name (matches mockData / marketPrices)
const PRODUCT_KEYWORDS = {
  tomato: "Tomato", tomatoes: "Tomato",
  potato: "Potato", potatoes: "Potato",
  onion: "Onion", onions: "Onion",
  carrot: "Carrot", carrots: "Carrot",
  cabbage: "Cabbage",
  cauliflower: "Cauliflower",
  chilli: "Green Chilli", chili: "Green Chilli", chillies: "Green Chilli",
  mango: "Mango", mangoes: "Mango",
  apple: "Apple", apples: "Apple",
  banana: "Banana", bananas: "Banana",
  watermelon: "Watermelon",
  papaya: "Papaya",
  pineapple: "Pineapple",
  grape: "Grapes", grapes: "Grapes",
  pomegranate: "Pomegranate",
  // Hindi (transliterated words the recognizer may return)
  "टमाटर": "Tomato",
  "आलू": "Potato",
  "प्याज": "Onion",
  "गाजर": "Carrot",
  "पत्ता गोभी": "Cabbage",
  "फूल गोभी": "Cauliflower",
  "हरी मिर्च": "Green Chilli",
  "मिर्च": "Green Chilli",
  "आम": "Mango",
  "सेब": "Apple",
  "केला": "Banana",
  "तरबूज": "Watermelon",
  "पपीता": "Papaya",
  "अनानास": "Pineapple",
  "अंगूर": "Grapes",
  "अनार": "Pomegranate",
  // Bengali
  "টমেটো": "Tomato",
  "আলু": "Potato",
  "পেঁয়াজ": "Onion",
  "গাজর": "Carrot",
  "বাঁধাকপি": "Cabbage",
  "ফুলকপি": "Cauliflower",
  "কাঁচা লঙ্কা": "Green Chilli",
  "লঙ্কা": "Green Chilli",
  "আম": "Mango",
  "আপেল": "Apple",
  "কলা": "Banana",
  "তরমুজ": "Watermelon",
  "পেঁপে": "Papaya",
  "আনারস": "Pineapple",
  "আঙ্গুর": "Grapes",
  "ডালিম": "Pomegranate"
};

// Intent keyword sets (case-insensitive)
const INTENT_PATTERNS = [
  // Navigation - Marketplace
  { intent: "OPEN_MARKETPLACE", keys: [
    "open marketplace", "go to marketplace", "show marketplace", "marketplace",
    "मार्केटप्लेस", "बाज़ार खोलो", "बाज़ार दिखाओ",
    "মার্কেটপ্লেস", "বাজার খোলো", "বাজার দেখাও"
  ]},
  // Navigation - Dashboard
  { intent: "OPEN_DASHBOARD", keys: [
    "open dashboard", "go to dashboard", "show dashboard", "dashboard",
    "डैशबोर्ड",
    "ড্যাশবোর্ড"
  ]},
  // Farmer only
  { intent: "OPEN_MY_PRODUCE", keys: [
    "my produce", "show my produce", "show produce", "my crops",
    "मेरी उपज", "मेरी फसल",
    "আমার ফসল", "আমার উৎপাদন"
  ]},
  { intent: "OPEN_CREATE_LISTING", keys: [
    "create listing", "create a listing", "add listing", "new listing", "list produce",
    "लिस्टिंग बनाओ", "नयी लिस्टिंग", "फसल जोड़ो",
    "লিস্টিং তৈরি করো", "নতুন লিস্টিং", "ফসল যোগ করো"
  ]},
  { intent: "OPEN_OFFERS", keys: [
    "offers", "my offers", "show offers", "buyer offers",
    "ऑफर", "बोलियां", "मेरे ऑफर",
    "অফার", "আমার অফার", "প্রস্তাব"
  ]},
  { intent: "OPEN_ORDERS", keys: [
    "orders", "my orders", "show orders",
    "ऑर्डर", "मेरे ऑर्डर",
    "অর্ডার", "আমার অর্ডার"
  ]},
  { intent: "OPEN_CONSIGNMENTS", keys: [
    "consignments", "consignment",
    "कंसाइनमेंट",
    "কনসাইনমেন্ট", "চালান"
  ]},
  { intent: "OPEN_MARKET_INTELLIGENCE", keys: [
    "market intelligence", "intelligence", "analytics",
    "बाजार विश्लेषण", "विश्लेषण",
    "বাজার বিশ্লেষণ", "বিশ্লেষণ"
  ]},
  // Saved / find
  { intent: "OPEN_SAVED", keys: [
    "saved", "saved products", "saved produce", "my saved",
    "पसंदीदा",
    "সংরক্ষিত", "পছন্দের"
  ]},
  // Profile / Settings / Support
  { intent: "OPEN_PROFILE", keys: [
    "profile", "open profile", "my profile",
    "प्रोफ़ाइल", "प्रोफाइल",
    "প্রোফাইল"
  ]},
  { intent: "OPEN_SETTINGS", keys: [
    "settings", "open settings", "preferences",
    "सेटिंग", "सेटिंग्स",
    "সেটিংস"
  ]},
  { intent: "OPEN_SUPPORT", keys: [
    "support", "help", "help center",
    "सहायता", "मदद",
    "সাহায্য", "সহায়তা"
  ]},
  // Market prices
  { intent: "OPEN_MARKET_PRICES", keys: [
    "market prices", "market price", "prices", "mandi price", "mandi bhaav", "mandi rates",
    "बाजार भाव", "मंडी भाव", "भाव",
    "বাজারের দাম", "মণ্ডির দাম", "দাম"
  ]},
  // Theme
  { intent: "DARK_MODE", keys: [
    "dark mode", "turn on dark mode", "enable dark mode", "switch to dark",
    "डार्क मोड", "अंधेरा मोड",
    "ডার্ক মোড", "গাঢ় মোড"
  ]},
  { intent: "LIGHT_MODE", keys: [
    "light mode", "turn on light mode", "enable light mode", "switch to light",
    "लाइट मोड", "उजाला मोड",
    "লাইট মোড", "উজ্জ্বল মোড"
  ]},
  // Language switch
  { intent: "LANG_HINDI", keys: [
    "switch to hindi", "hindi", "change to hindi",
    "हिंदी भाषा", "हिन्दी",
    "হিন্দি"
  ]},
  { intent: "LANG_BENGALI", keys: [
    "switch to bengali", "bengali", "bangla",
    "बंगाली", "बांग्ला",
    "বাংলা"
  ]},
  { intent: "LANG_ENGLISH", keys: [
    "switch to english", "english",
    "अंग्रेजी", "इंग्लिश",
    "ইংরেজি", "ইংলিশ"
  ]},
  // Auth
  { intent: "LOGOUT", keys: [
    "logout", "log out", "sign out",
    "लॉग आउट", "साइन आउट",
    "লগ আউট", "সাইন আউট"
  ]},
  { intent: "GO_BACK", keys: [
    "go back", "back", "go home", "home",
    "वापस", "पीछे", "मुख्य पृष्ठ",
    "ফিরে যাও", "পিছনে", "মূল পাতা"
  ]}
];

// Search / price-lookup patterns
const SEARCH_HINTS = [
  "search", "find", "look for", "show", "show me",
  "खोजो", "ढूंढो", "दिखाओ",
  "খোঁজো", "দেখাও"
];

const PRICE_HINTS = [
  "price", "prices", "rate", "bhaav", "mandi",
  "भाव", "दाम", "मंडी",
  "দাম", "দর"
];

const detectProduct = (text) => {
  const t = text.toLowerCase();
  for (const [kw, canonical] of Object.entries(PRODUCT_KEYWORDS)) {
    if (t.includes(kw.toLowerCase())) return canonical;
  }
  return null;
};

const hasAny = (text, arr) => {
  const t = text.toLowerCase();
  return arr.some((k) => t.includes(k.toLowerCase()));
};

export const parseVoiceCommand = (rawText) => {
  if (!rawText || !rawText.trim()) return { intent: "UNKNOWN", text: rawText };
  const text = rawText.trim();
  const lower = text.toLowerCase();

  // Priority 1: product + price → market prices with focus
  const product = detectProduct(text);
  if (product && hasAny(text, PRICE_HINTS)) {
    return { intent: "MARKET_PRICE_PRODUCT", product, text };
  }

  // Priority 2: product + search verb → marketplace search
  if (product && hasAny(text, SEARCH_HINTS)) {
    return { intent: "SEARCH_PRODUCT", product, text };
  }

  // Priority 3: intent keyword match
  for (const p of INTENT_PATTERNS) {
    if (hasAny(text, p.keys)) {
      return { intent: p.intent, text };
    }
  }

  // Priority 4: bare product name → treat as marketplace search
  if (product) {
    return { intent: "SEARCH_PRODUCT", product, text };
  }

  // Fallback: use whole text as search query
  return { intent: "GENERIC_SEARCH", query: lower, text };
};

// Speech recognition language code from app language
export const speechLangCode = (lang) => {
  switch (lang) {
    case "hi": return "hi-IN";
    case "bn": return "bn-IN";
    default: return "en-IN";
  }
};

// Feedback message per intent, in user's UI language
export const feedbackMessage = (intent, language, extra = {}) => {
  const en = {
    OPEN_MARKETPLACE: "Opening Marketplace",
    OPEN_DASHBOARD: "Opening Dashboard",
    OPEN_MY_PRODUCE: "Opening My Produce",
    OPEN_CREATE_LISTING: "Opening Create Listing",
    OPEN_OFFERS: "Opening Offers",
    OPEN_ORDERS: "Opening Orders",
    OPEN_CONSIGNMENTS: "Opening Consignments",
    OPEN_MARKET_INTELLIGENCE: "Opening Market Intelligence",
    OPEN_SAVED: "Opening Saved Produce",
    OPEN_PROFILE: "Opening Profile",
    OPEN_SETTINGS: "Opening Settings",
    OPEN_SUPPORT: "Opening Support",
    OPEN_MARKET_PRICES: "Opening Market Prices",
    DARK_MODE: "Switching to Dark Mode",
    LIGHT_MODE: "Switching to Light Mode",
    LANG_HINDI: "Switching to Hindi",
    LANG_BENGALI: "Switching to Bengali",
    LANG_ENGLISH: "Switching to English",
    LOGOUT: "Logging out",
    GO_BACK: "Going home",
    MARKET_PRICE_PRODUCT: `Showing ${extra.product || ""} prices`,
    SEARCH_PRODUCT: `Searching for ${extra.product || ""}`,
    GENERIC_SEARCH: `Searching for ${extra.query || ""}`,
    UNKNOWN: "I couldn't understand that. Please try again."
  };
  const hi = {
    OPEN_MARKETPLACE: "बाज़ार खोल रहे हैं",
    OPEN_DASHBOARD: "डैशबोर्ड खोल रहे हैं",
    OPEN_MY_PRODUCE: "आपकी उपज दिखा रहे हैं",
    OPEN_CREATE_LISTING: "नई लिस्टिंग खोल रहे हैं",
    OPEN_OFFERS: "ऑफर दिखा रहे हैं",
    OPEN_ORDERS: "ऑर्डर दिखा रहे हैं",
    OPEN_CONSIGNMENTS: "कंसाइनमेंट खोल रहे हैं",
    OPEN_MARKET_INTELLIGENCE: "बाज़ार विश्लेषण खोल रहे हैं",
    OPEN_SAVED: "पसंदीदा फसलें खोल रहे हैं",
    OPEN_PROFILE: "प्रोफ़ाइल खोल रहे हैं",
    OPEN_SETTINGS: "सेटिंग्स खोल रहे हैं",
    OPEN_SUPPORT: "सहायता खोल रहे हैं",
    OPEN_MARKET_PRICES: "मंडी भाव खोल रहे हैं",
    DARK_MODE: "डार्क मोड चालू",
    LIGHT_MODE: "लाइट मोड चालू",
    LANG_HINDI: "हिंदी भाषा चुनी गई",
    LANG_BENGALI: "बंगाली भाषा चुनी गई",
    LANG_ENGLISH: "अंग्रेजी भाषा चुनी गई",
    LOGOUT: "लॉग आउट हो रहे हैं",
    GO_BACK: "मुख्य पृष्ठ पर वापस",
    MARKET_PRICE_PRODUCT: `${extra.product || ""} का भाव दिखा रहे हैं`,
    SEARCH_PRODUCT: `${extra.product || ""} खोज रहे हैं`,
    GENERIC_SEARCH: `${extra.query || ""} खोज रहे हैं`,
    UNKNOWN: "मुझे समझ नहीं आया, कृपया पुनः प्रयास करें।"
  };
  const bn = {
    OPEN_MARKETPLACE: "বাজার খোলা হচ্ছে",
    OPEN_DASHBOARD: "ড্যাশবোর্ড খোলা হচ্ছে",
    OPEN_MY_PRODUCE: "আপনার ফসল দেখানো হচ্ছে",
    OPEN_CREATE_LISTING: "নতুন লিস্টিং খোলা হচ্ছে",
    OPEN_OFFERS: "অফার দেখানো হচ্ছে",
    OPEN_ORDERS: "অর্ডার দেখানো হচ্ছে",
    OPEN_CONSIGNMENTS: "কনসাইনমেন্ট খোলা হচ্ছে",
    OPEN_MARKET_INTELLIGENCE: "বাজার বিশ্লেষণ খোলা হচ্ছে",
    OPEN_SAVED: "সংরক্ষিত ফসল খোলা হচ্ছে",
    OPEN_PROFILE: "প্রোফাইল খোলা হচ্ছে",
    OPEN_SETTINGS: "সেটিংস খোলা হচ্ছে",
    OPEN_SUPPORT: "সাহায্য খোলা হচ্ছে",
    OPEN_MARKET_PRICES: "মণ্ডির দাম দেখানো হচ্ছে",
    DARK_MODE: "ডার্ক মোড চালু",
    LIGHT_MODE: "লাইট মোড চালু",
    LANG_HINDI: "হিন্দি ভাষা নির্বাচিত",
    LANG_BENGALI: "বাংলা ভাষা নির্বাচিত",
    LANG_ENGLISH: "ইংরেজি ভাষা নির্বাচিত",
    LOGOUT: "লগ আউট হচ্ছে",
    GO_BACK: "মূল পাতায় ফিরে যাচ্ছি",
    MARKET_PRICE_PRODUCT: `${extra.product || ""} এর দাম দেখানো হচ্ছে`,
    SEARCH_PRODUCT: `${extra.product || ""} খোঁজা হচ্ছে`,
    GENERIC_SEARCH: `${extra.query || ""} খোঁজা হচ্ছে`,
    UNKNOWN: "আমি বুঝতে পারিনি, দয়া করে আবার চেষ্টা করুন।"
  };
  const table = language === "hi" ? hi : language === "bn" ? bn : en;
  return table[intent] || en[intent] || "";
};
