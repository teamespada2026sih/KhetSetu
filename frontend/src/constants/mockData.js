export const INDIAN_STATES_DISTRICTS = {
  "West Bengal": [
    "Kolkata", "Nadia", "North 24 Parganas", "South 24 Parganas",
    "Hooghly", "Howrah", "Murshidabad", "Malda", "Bardhaman", "Siliguri",
    "Bankura", "Birbhum", "Cooch Behar", "Darjeeling", "Purulia"
  ],
  "Maharashtra": [
    "Nashik", "Pune", "Nagpur", "Ahmednagar", "Solapur", "Kolhapur", "Aurangabad", "Satara"
  ],
  "Punjab": [
    "Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Sangrur", "Hoshiarpur"
  ],
  "Haryana": [
    "Karnal", "Ambala", "Hisar", "Rohtak", "Sirsa", "Kurukshetra", "Panipat"
  ],
  "Uttar Pradesh": [
    "Agra", "Varanasi", "Lucknow", "Kanpur", "Meerut", "Prayagraj", "Bareilly", "Aligarh"
  ],
  "Bihar": [
    "Patna", "Muzaffarpur", "Gaya", "Bhagalpur", "Samastipur", "Darbhanga", "Vaishali"
  ],
  "Karnataka": [
    "Bengaluru Rural", "Kolar", "Belagavi", "Mysuru", "Shivamogga", "Tumakuru", "Hubballi"
  ],
  "Tamil Nadu": [
    "Coimbatore", "Madurai", "Salem", "Tiruchirappalli", "Dindigul", "Erode", "Thanjavur"
  ],
  "Andhra Pradesh": [
    "Guntur", "Krishna", "Kurnool", "Anantapur", "East Godavari", "Chittoor"
  ],
  "Telangana": [
    "Warangal", "Nizamabad", "Khammam", "Karimnagar", "Mahabubnagar", "Nalgonda"
  ],
  "Assam": [
    "Guwahati", "Nagaon", "Sonitpur", "Cachar", "Dibrugarh", "Jorhat"
  ],
  "Gujarat": [
    "Surat", "Rajkot", "Ahmedabad", "Junagadh", "Mehsana", "Vadodara", "Bhavnagar"
  ],
  "Rajasthan": [
    "Jaipur", "Kota", "Jodhpur", "Alwar", "Sri Ganganagar", "Bikaner"
  ],
  "Madhya Pradesh": [
    "Indore", "Ujjain", "Bhopal", "Jabalpur", "Hoshangabad", "Ratlam"
  ],
  "Kerala": [
    "Wayanad", "Idukki", "Palakkad", "Kozhikode", "Ernakulam", "Kottayam"
  ],
  "Jharkhand": [
    "Ranchi", "Hazaribagh", "Dhanbad", "Jamshedpur", "Deoghar"
  ],
  "Chhattisgarh": [
    "Raipur", "Durg", "Bilaspur", "Rajnandgaon"
  ],
  "Uttarakhand": [
    "Dehradun", "Haridwar", "Nainital", "Udham Singh Nagar"
  ],
  "Himachal Pradesh": [
    "Shimla", "Kullu", "Mandi", "Solan", "Kangra"
  ],
  "Goa": [
    "North Goa", "South Goa"
  ],
  "Jammu and Kashmir": [
    "Srinagar", "Baramulla", "Anantnag", "Jammu", "Pulwama"
  ],
  "Odisha": [
    "Bhubaneswar", "Cuttack", "Sambalpur", "Balasore", "Ganjam"
  ]
};

export const INITIAL_PRODUCE = [
  {
    id: "prod-1",
    name: "Tomatoes",
    hindiName: "टमाटर (देसी व हाइब्रिड)",
    bengaliName: "লাল পাকা টমেটো",
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1594057687713-5fd14eed1c17?crop=entropy&cs=srgb&fm=jpg&q=85",
    farmer: "Subhash Mondal",
    farmerRole: "Farmer",
    state: "West Bengal",
    district: "Nadia",
    location: "Ranaghat Krishi Mandi",
    quantity: 4500,
    unit: "kg",
    price: 24,
    quality: "Grade A+",
    harvestDate: "2026-06-02",
    description: "Sun-ripened, firm red table tomatoes with natural sweetness and high shelf-life. Harvested fresh at dawn from organic mulched beds in Nadia.",
    minOrder: 500
  },
  {
    id: "prod-2",
    name: "Potatoes",
    hindiName: "आलू (ज्योति व पुखराज)",
    bengaliName: "নতুন চন্দ্রমুখী আলু",
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1590165482129-1b8b27698780?crop=entropy&cs=srgb&fm=jpg&q=85",
    farmer: "Rameshwar Singh",
    farmerRole: "Farmer",
    state: "Punjab",
    district: "Jalandhar",
    location: "Shahkot Farm Gate",
    quantity: 12000,
    unit: "kg",
    price: 18,
    quality: "Grade A",
    harvestDate: "2026-05-28",
    description: "Jyoti & Pukhraj variety seed-grade and table potatoes. Clean skin, low moisture content, ideal for cold storage and chips processors.",
    minOrder: 1000
  },
  {
    id: "prod-3",
    name: "Onions",
    hindiName: "लाल प्याज (नासिक)",
    bengaliName: "লাল পেঁয়াজ",
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1620574387735-3624d75b2dbc?crop=entropy&cs=srgb&fm=jpg&q=85",
    farmer: "Dnyaneshwar Patil",
    farmerRole: "Farmer",
    state: "Maharashtra",
    district: "Nashik",
    location: "Lasalgaon Mandi Yard",
    quantity: 9500,
    unit: "kg",
    price: 28,
    quality: "Grade A+",
    harvestDate: "2026-06-01",
    description: "Premium pungent red Nashik onions with tight papery skins. Cured naturally in ventilated shade for optimal transit durability across India.",
    minOrder: 1000
  },
  {
    id: "prod-4",
    name: "Carrots",
    hindiName: "ताज़ी लाल गाजर",
    bengaliName: "তাজা মিষ্টি গাজর",
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?crop=entropy&cs=srgb&fm=jpg&q=85",
    farmer: "Harpreet Brar",
    farmerRole: "Farmer",
    state: "Haryana",
    district: "Karnal",
    location: "Taraori Krishi Hub",
    quantity: 3200,
    unit: "kg",
    price: 32,
    quality: "Grade A",
    harvestDate: "2026-06-03",
    description: "Crunchy, sweet deep-orange carrots freshly washed and graded. Zero chemical residue, high beta-carotene content.",
    minOrder: 300
  },
  {
    id: "prod-5",
    name: "Cabbage",
    hindiName: "पत्ता गोभी (हरी)",
    bengaliName: "সবুজ বাঁধাকপি",
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1629681093303-f1b9a9204575?crop=entropy&cs=srgb&fm=jpg&q=85",
    farmer: "Anil Debnath",
    farmerRole: "Farmer",
    state: "West Bengal",
    district: "Hooghly",
    location: "Singur Vegetable Yard",
    quantity: 6000,
    unit: "kg",
    price: 16,
    quality: "Grade A",
    harvestDate: "2026-06-04",
    description: "Compact, crisp heads of green cabbage grown in fertile alluvial soil. Average weight 1.2kg per head with excellent freshness.",
    minOrder: 400
  },
  {
    id: "prod-6",
    name: "Cauliflower",
    hindiName: "सफेद फूलगोभी",
    bengaliName: "তাজা ফুলকপি",
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1744659750204-87034350eec6?crop=entropy&cs=srgb&fm=jpg&q=85",
    farmer: "Rajendra Yadav",
    farmerRole: "Farmer",
    state: "Bihar",
    district: "Vaishali",
    location: "Hajipur Sabzi Mandi",
    quantity: 3800,
    unit: "kg",
    price: 22,
    quality: "Grade A+",
    harvestDate: "2026-06-03",
    description: "Snow-white, tightly packed curd heads protected by lush green outer leaves. Crisp texture, premium restaurant grade.",
    minOrder: 300
  },
  {
    id: "prod-7",
    name: "Green Chilli",
    hindiName: "तीखी हरी मिर्च (G4)",
    bengaliName: "ঝাল কাঁচা লঙ্কা",
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1599987141071-f5810d32e21a?crop=entropy&cs=srgb&fm=jpg&q=85",
    farmer: "Venkat Reddy",
    farmerRole: "Farmer",
    state: "Andhra Pradesh",
    district: "Guntur",
    location: "Guntur Chilli Yard",
    quantity: 2400,
    unit: "kg",
    price: 65,
    quality: "Grade A+",
    harvestDate: "2026-06-02",
    description: "High pungency G4 green chillies with firm green pods and high capsaicin level. Packed in airy mesh sacks for long-distance transport.",
    minOrder: 200
  },
  {
    id: "prod-8",
    name: "Mangoes",
    hindiName: "हिमसागर व दशहरी आम",
    bengaliName: "মালদার সুস্বাদু হিমসাগর আম",
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1669207334420-66d0e3450283?crop=entropy&cs=srgb&fm=jpg&q=85",
    farmer: "Bikash Mukherjee",
    farmerRole: "Farmer",
    state: "West Bengal",
    district: "Malda",
    location: "English Bazar Fruit Hub",
    quantity: 5500,
    unit: "kg",
    price: 85,
    quality: "Certified Organic",
    harvestDate: "2026-06-01",
    description: "Famous Malda Himsagar tree-ripened mangoes. Extremely sweet, fiberless golden pulp with enchanting natural fragrance.",
    minOrder: 250
  },
  {
    id: "prod-9",
    name: "Apples",
    hindiName: "रॉयल डेलिशियस सेब",
    bengaliName: "হিমাচলের লাল আপেল",
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1613061527119-56ad37b8a581?crop=entropy&cs=srgb&fm=jpg&q=85",
    farmer: "Kundan Thakur",
    farmerRole: "Farmer",
    state: "Himachal Pradesh",
    district: "Shimla",
    location: "Kotkhai Orchard Gate",
    quantity: 7000,
    unit: "kg",
    price: 110,
    quality: "Grade A+",
    harvestDate: "2026-05-30",
    description: "Crisp, sweet Royal Delicious high-altitude apples. Handpicked, sorted by size (75-80mm), packed in ventilated corrugated boxes.",
    minOrder: 500
  },
  {
    id: "prod-10",
    name: "Bananas",
    hindiName: "ग्रैंड नैन केला (G9)",
    bengaliName: "মিষ্টি জি-৯ কলা",
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?crop=entropy&cs=srgb&fm=jpg&q=85",
    farmer: "Suresh Shinde",
    farmerRole: "Farmer",
    state: "Maharashtra",
    district: "Jalgaon",
    location: "Raver Banana Market",
    quantity: 14000,
    unit: "kg",
    price: 26,
    quality: "Grade A",
    harvestDate: "2026-06-03",
    description: "Grand Nain (G9) tissue culture export quality bananas. Uniform fingers, unblemished skin, calibrated at 38-42 caliber.",
    minOrder: 1000
  },
  {
    id: "prod-11",
    name: "Watermelon",
    hindiName: "किरण तरबूज (मीठा लाल)",
    bengaliName: "রসালো মিষ্টি তরমুজ",
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?crop=entropy&cs=srgb&fm=jpg&q=85",
    farmer: "Niranjan Halder",
    farmerRole: "Farmer",
    state: "West Bengal",
    district: "South 24 Parganas",
    location: "Kakdwip Riverine Belt",
    quantity: 8500,
    unit: "kg",
    price: 19,
    quality: "Grade A",
    harvestDate: "2026-06-02",
    description: "Sugar-sweet Kiran hybrid watermelons with deep crimson flesh and tiny seeds. Average fruit weight 3.5kg to 5kg.",
    minOrder: 1000
  },
  {
    id: "prod-12",
    name: "Papaya",
    hindiName: "रेड लेडी पपीता (तैवान 786)",
    bengaliName: "রেড লেডি পাকা পেঁপে",
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?crop=entropy&cs=srgb&fm=jpg&q=85",
    farmer: "Balu Naidu",
    farmerRole: "Farmer",
    state: "Karnataka",
    district: "Kolar",
    location: "Kolar Agro Complex",
    quantity: 4200,
    unit: "kg",
    price: 34,
    quality: "Grade A+",
    harvestDate: "2026-06-01",
    description: "Red Lady 786 sweet table papayas. Thick aromatic flesh, rich in natural enzymes, resilient skin for long-distance transport.",
    minOrder: 400
  },
  {
    id: "prod-13",
    name: "Pineapple",
    hindiName: "रानी अनानास (त्रिपुरा व सिलीगुड़ी)",
    bengaliName: "রসালো কুইন আনারস",
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1781292428366-c61960596e2b?crop=entropy&cs=srgb&fm=jpg&q=85",
    farmer: "Pradip Roy",
    farmerRole: "Farmer",
    state: "West Bengal",
    district: "Siliguri",
    location: "Bidhan Nagar Pineapple Hub",
    quantity: 3600,
    unit: "kg",
    price: 42,
    quality: "Certified Organic",
    harvestDate: "2026-06-03",
    description: "Queen variety juicy pineapples with high sugar brix level and golden inner flesh. Organically cultivated in sub-Himalayan foothills.",
    minOrder: 300
  },
  {
    id: "prod-14",
    name: "Grapes",
    hindiName: "थॉमसन सीडलेस अंगूर",
    bengaliName: "মিষ্টি বীজহীন সবুজ আঙুর",
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1598897893004-df11da13128a?crop=entropy&cs=srgb&fm=jpg&q=85",
    farmer: "Vishwas Deshmukh",
    farmerRole: "Farmer",
    state: "Maharashtra",
    district: "Pune",
    location: "Baramati Grape Yard",
    quantity: 5000,
    unit: "kg",
    price: 78,
    quality: "Grade A+",
    harvestDate: "2026-05-31",
    description: "Export-grade Thomson Seedless green grapes. Large elongated berries, crisp crunch, brix sweetness above 18°.",
    minOrder: 300
  },
  {
    id: "prod-15",
    name: "Pomegranate",
    hindiName: "भगवा अनार (सोलापुर)",
    bengaliName: "লাল মিষ্টি বেদানা",
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1574709755254-fcd942d09d5a?crop=entropy&cs=srgb&fm=jpg&q=85",
    farmer: "Pandurang Koli",
    farmerRole: "Farmer",
    state: "Maharashtra",
    district: "Solapur",
    location: "Sangola Mandi",
    quantity: 4800,
    unit: "kg",
    price: 125,
    quality: "Grade A+",
    harvestDate: "2026-06-02",
    description: "Bhagwa ruby-red soft-seeded pomegranates. Deep red arils, rich antioxidant juice content, 250g+ individual fruit weight.",
    minOrder: 250
  }
];

export const INITIAL_OFFERS = [
  {
    id: "off-101",
    buyer: "Ananya Sharma (Delhi Mandi Corp)",
    buyerEmail: "buyer@khetsetu.demo",
    produceId: "prod-1",
    produceName: "Tomatoes",
    farmer: "Subhash Mondal",
    quantity: 2000,
    unit: "kg",
    offerPrice: 22,
    originalPrice: 24,
    message: "Immediate pickup required for Azadpur wholesale distribution. Quality check at gate.",
    date: "2026-06-04",
    status: "Pending"
  },
  {
    id: "off-102",
    buyer: "Kolkata Fresh Retail Ltd",
    buyerEmail: "procure@kolkatafresh.com",
    produceId: "prod-8",
    produceName: "Mangoes",
    farmer: "Bikash Mukherjee",
    quantity: 1500,
    unit: "kg",
    offerPrice: 80,
    originalPrice: 85,
    message: "Ready to take 1500kg Himsagar mangoes for hypermarket chain delivery tomorrow morning.",
    date: "2026-06-03",
    status: "Accepted"
  },
  {
    id: "off-103",
    buyer: "Punjab Agro Processing Hub",
    buyerEmail: "buy@punjabagro.com",
    produceId: "prod-2",
    produceName: "Potatoes",
    farmer: "Rameshwar Singh",
    quantity: 5000,
    unit: "kg",
    offerPrice: 17,
    originalPrice: 18,
    message: "Batch sample approved. Booking 5 Tonnes for processing unit.",
    date: "2026-06-02",
    status: "Countered",
    counterPrice: 17.5
  }
];

export const INITIAL_ORDERS = [
  {
    id: "KS-ORD-9021",
    produce: "Mangoes (Himsagar Malda)",
    farmer: "Bikash Mukherjee (Malda, WB)",
    buyer: "Kolkata Fresh Retail Ltd",
    quantity: "1,500 kg",
    price: "₹80 / kg",
    total: "₹120,000",
    status: "Processing",
    date: "2026-06-03",
    eta: "2026-06-05"
  },
  {
    id: "KS-ORD-9018",
    produce: "Potatoes (Jyoti Grade A)",
    farmer: "Rameshwar Singh (Punjab)",
    buyer: "Ananya Sharma (Delhi Mandi Corp)",
    quantity: "6,000 kg",
    price: "₹17.5 / kg",
    total: "₹105,000",
    status: "In Transit",
    date: "2026-06-01",
    eta: "2026-06-04"
  },
  {
    id: "KS-ORD-9005",
    produce: "Onions (Nashik Red)",
    farmer: "Dnyaneshwar Patil (Nashik)",
    buyer: "Bangalore Mega Superstores",
    quantity: "8,000 kg",
    price: "₹27 / kg",
    total: "₹216,000",
    status: "Delivered",
    date: "2026-05-27",
    eta: "2026-05-30"
  },
  {
    id: "KS-ORD-8992",
    produce: "Green Chilli (G4 Hot)",
    farmer: "Venkat Reddy (Guntur)",
    buyer: "Hyderabad Spice Mart",
    quantity: "1,200 kg",
    price: "₹63 / kg",
    total: "₹75,600",
    status: "Completed",
    date: "2026-05-22",
    eta: "2026-05-24"
  }
];

export const INITIAL_CONSIGNMENTS = [
  {
    id: "TXN-88294",
    crop: "Premium Grade Wheat (Sharbati)",
    buyer: "Global Mills & Foods",
    farmer: "Gurpreet Dhillon (Ludhiana, Punjab)",
    status: "In Transit",
    value: "₹1,285,000",
    quantity: "450 Quintals",
    escrowStage: "Milestone 2 (Dispatched & Seal Verified)",
    advancePaid: "₹514,000 (40%)",
    date: "2026-06-02"
  },
  {
    id: "TXN-88295",
    crop: "Organic Soybeans (High Protein)",
    buyer: "AgriTrade Partners Corp",
    farmer: "Kailash Chandel (Indore, MP)",
    status: "Offer Received",
    value: "₹1,032,000",
    quantity: "240 Quintals",
    escrowStage: "Milestone 1 (Escrow Deposit Pending)",
    advancePaid: "₹0",
    date: "2026-06-03"
  },
  {
    id: "TXN-88292",
    crop: "Malted Barley (Two Row)",
    buyer: "Northern Brewers Consortium",
    farmer: "Rameshwar Singh (Jalandhar, Punjab)",
    status: "Quality Check",
    value: "₹3,740,000",
    quantity: "1,100 Quintals",
    escrowStage: "Milestone 2 (Moisture & Lab Graded)",
    advancePaid: "₹1,870,000 (50%)",
    date: "2026-05-30"
  },
  {
    id: "TXN-88289",
    crop: "Yellow Mustard Seeds (Mustard Oil Grade)",
    buyer: "Rajasthan Oil Extraction Ltd",
    farmer: "Mohan Lal Sharma (Alwar, Rajasthan)",
    status: "Delivered",
    value: "₹2,150,000",
    quantity: "380 Quintals",
    escrowStage: "Milestone 3 (Fully Released to Farmer)",
    advancePaid: "₹2,150,000 (100%)",
    date: "2026-05-25"
  }
];

export const DEMO_MARKET_PRICES = [
  {
    commodity: "Tomato",
    hindiName: "टमाटर",
    bengaliName: "টমেটো",
    mandi: "Ranaghat Mandi (WB) / Azadpur (Delhi)",
    state: "West Bengal / Delhi",
    currentPrice: 24,
    prevPrice: 22,
    change: "+9.1%",
    trend: "up",
    high: 26,
    low: 21,
    arrivalVolume: "480 Tonnes"
  },
  {
    commodity: "Potato",
    hindiName: "आलू",
    bengaliName: "আলু",
    mandi: "Kalyani (WB) / Jalandhar Yard (PB)",
    state: "Punjab / West Bengal",
    currentPrice: 18,
    prevPrice: 19,
    change: "-5.2%",
    trend: "down",
    high: 20,
    low: 17,
    arrivalVolume: "1,250 Tonnes"
  },
  {
    commodity: "Onion",
    hindiName: "प्याज",
    bengaliName: "পেঁয়াজ",
    mandi: "Lasalgaon Mandi (Nashik)",
    state: "Maharashtra",
    currentPrice: 28,
    prevPrice: 26.5,
    change: "+5.6%",
    trend: "up",
    high: 30,
    low: 26,
    arrivalVolume: "890 Tonnes"
  },
  {
    commodity: "Mango",
    hindiName: "आम",
    bengaliName: "আম",
    mandi: "Malda Wholesale (WB) / Ratnagiri",
    state: "West Bengal / Maharashtra",
    currentPrice: 85,
    prevPrice: 90,
    change: "-5.5%",
    trend: "down",
    high: 95,
    low: 78,
    arrivalVolume: "340 Tonnes"
  },
  {
    commodity: "Cauliflower",
    hindiName: "फूलगोभी",
    bengaliName: "ফুলকপি",
    mandi: "Singur Mandi (Hooghly, WB)",
    state: "West Bengal",
    currentPrice: 22,
    prevPrice: 20,
    change: "+10.0%",
    trend: "up",
    high: 25,
    low: 19,
    arrivalVolume: "210 Tonnes"
  },
  {
    commodity: "Green Chilli",
    hindiName: "हरी मिर्च",
    bengaliName: "কাঁচা লঙ্কা",
    mandi: "Guntur Yard (AP) / Bowbazar (Kolkata)",
    state: "Andhra Pradesh / WB",
    currentPrice: 65,
    prevPrice: 62,
    change: "+4.8%",
    trend: "up",
    high: 70,
    low: 60,
    arrivalVolume: "150 Tonnes"
  },
  {
    commodity: "Carrot",
    hindiName: "गाजर",
    bengaliName: "গাজর",
    mandi: "Karnal Mandi (Haryana)",
    state: "Haryana",
    currentPrice: 32,
    prevPrice: 33,
    change: "-3.0%",
    trend: "down",
    high: 35,
    low: 30,
    arrivalVolume: "190 Tonnes"
  },
  {
    commodity: "Banana",
    hindiName: "केला",
    bengaliName: "কলা",
    mandi: "Jalgaon Market (MH) / Nadia",
    state: "Maharashtra / West Bengal",
    currentPrice: 26,
    prevPrice: 25,
    change: "+4.0%",
    trend: "up",
    high: 28,
    low: 24,
    arrivalVolume: "620 Tonnes"
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-1",
    title: "New Buyer Offer Received",
    message: "Delhi Mandi Corp offered ₹22/kg for 2,000kg of your fresh Tomatoes.",
    time: "10 mins ago",
    read: false,
    type: "offer"
  },
  {
    id: "notif-2",
    title: "Consignment Dispatched",
    message: "Order #KS-ORD-9018 (Potatoes 6,000kg) has cleared Punjab border checkpost.",
    time: "1 hour ago",
    read: false,
    type: "order"
  },
  {
    id: "notif-3",
    title: "Mandi Price Alert",
    message: "Lasalgaon onion rates surged by +5.6% today. Great time to list stored stock.",
    time: "3 hours ago",
    read: true,
    type: "price"
  },
  {
    id: "notif-4",
    title: "Produce Listing Viewed",
    message: "Your Himsagar Mango listing was viewed by 14 wholesale buyers this morning.",
    time: "5 hours ago",
    read: true,
    type: "view"
  }
];

export const DEMO_FAQS = [
  {
    q: "How does KhetSetu connect farmers directly with wholesale buyers?",
    a: "Farmers list their harvested produce with quantity, expected price, photos, and quality grade. Verified institutional buyers, supermarkets, and mandi traders view listings and place direct offers with zero broker commissions."
  },
  {
    q: "How does the Demo Escrow and payment protection mechanism work?",
    a: "In commercial consignments, buyer advance funds are placed in a secured escrow holding state. Payment release is staged: 40% upon dispatch inspection, and balance upon inward gate weighing and moisture/quality clearance at the buyer terminal."
  },
  {
    q: "Can I choose my state and district for regional agricultural trade?",
    a: "Yes! KhetSetu supports over 22 Indian states with dedicated regional coverage for West Bengal (Nadia, Kolkata, Malda, Hooghly, etc.), Punjab, Maharashtra, Haryana, and beyond."
  },
  {
    q: "Is any real financial account or payment card required for this demo?",
    a: "No. KhetSetu operates in a simulated interactive environment using browser localStorage. No real bank accounts, real card details, or sensitive credentials are ever requested or stored."
  }
];
