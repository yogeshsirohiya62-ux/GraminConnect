// Intelligent Agronomic Crop Recommendation Engine for Farmers

const CROPS_DATABASE = [
  // RABI CROPS (सर्दियों / रबी)
  {
    name: 'Mustard / Sarson (सरसों)',
    hindiName: 'सरसों (Mustard)',
    season: 'rabi',
    suitableSoils: ['sandy', 'loamy', 'clay', 'all'],
    waterNeed: 'semi', // semi or full
    minWaterings: '2 to 3 irrigations',
    budgetRequired: 'low',
    costPerBigha: 3200,
    expectedYieldPerBigha: '7 - 9 Quintals',
    pricePerQuintal: 5720,
    profitPerBigha: '₹35,000 - ₹45,000',
    riskLevel: 'Low',
    duration: '110-125 Days',
    idealDistricts: ['Jaipur', 'Alwar', 'Bharatpur', 'Kota', 'Nagaur', 'Sikar', 'All'],
    reasonEn: 'Excellent drought tolerance, requires only 2-3 irrigations, high oil content ensures stable mandi market demand.',
    reasonHi: 'कम पानी (सिर्फ 2-3 सिंचाई) में उत्तम पैदावार, कम लागत और तेल मिलों की मजबूत मांग।'
  },
  {
    name: 'Wheat / Gehu (गेहूं - Sharbati)',
    hindiName: 'गेहूं (Wheat)',
    season: 'rabi',
    suitableSoils: ['loamy', 'clay', 'black', 'all'],
    waterNeed: 'full',
    minWaterings: '4 to 6 irrigations',
    budgetRequired: 'medium',
    costPerBigha: 4500,
    expectedYieldPerBigha: '12 - 15 Quintals',
    pricePerQuintal: 2480,
    profitPerBigha: '₹25,000 - ₹32,000 (+ ₹12,000 भूसा)',
    riskLevel: 'Low',
    duration: '120-130 Days',
    idealDistricts: ['Jaipur', 'Ganganagar', 'Kota', 'Alwar', 'Hanumangarh', 'All'],
    reasonEn: 'Guaranteed government MSP procurement, high yield potential with reliable tube-well/canal water, high-value straw byproduct.',
    reasonHi: 'नहर/ट्यूबवेल वाले खेतों के लिए सबसे सुरक्षित फसल, गेहूं के साथ कीमती तूड़ी (भूसा) का अतिरिक्त लाभ।'
  },
  {
    name: 'Chickpeas / Desi Chana (चना)',
    hindiName: 'चना (Desi Chana)',
    season: 'rabi',
    suitableSoils: ['sandy', 'loamy', 'clay', 'all'],
    waterNeed: 'semi',
    minWaterings: '1 to 2 irrigations',
    budgetRequired: 'low',
    costPerBigha: 3000,
    expectedYieldPerBigha: '5 - 7 Quintals',
    pricePerQuintal: 6180,
    profitPerBigha: '₹28,000 - ₹38,000',
    riskLevel: 'Low',
    duration: '100-115 Days',
    idealDistricts: ['Bikaner', 'Jaipur', 'Nagaur', 'Churu', 'Jhunjhunu', 'Jodhpur', 'All'],
    reasonEn: 'Fixes atmospheric nitrogen into soil (improving fertility for next crop), minimal water and fertilizer requirement.',
    reasonHi: 'भूमि में नाइट्रोजन बढ़ाकर जमीन को उपजाऊ बनाता है, कम खाद और सिर्फ 1-2 पानी में तैयार।'
  },
  {
    name: 'Cumin Seed / Jeera (जीरा)',
    hindiName: 'जीरा (Jeera - Cash Crop)',
    season: 'rabi',
    suitableSoils: ['sandy', 'loamy'],
    waterNeed: 'semi',
    minWaterings: '3 to 4 light irrigations',
    budgetRequired: 'medium',
    costPerBigha: 6500,
    expectedYieldPerBigha: '2.5 - 3.5 Quintals',
    pricePerQuintal: 24500,
    profitPerBigha: '₹55,000 - ₹80,000',
    riskLevel: 'Medium',
    duration: '105-115 Days',
    idealDistricts: ['Jodhpur', 'Nagaur', 'Barmer', 'Jalore', 'Bikaner'],
    reasonEn: 'Exceptional profit margins in arid/semi-arid dry climates, high export market value in Unjha/Jodhpur mandis.',
    reasonHi: 'सूखे व बलुई इलाकों में सबसे अधिक मुनाफा (₹24,500/क्विंटल), कम पानी में बंपर कमाई।'
  },
  {
    name: 'Garlic / Lahsun (लहसुन - Commercial)',
    hindiName: 'लहसुन (Garlic)',
    season: 'rabi',
    suitableSoils: ['loamy', 'clay', 'black'],
    waterNeed: 'full',
    minWaterings: '8 to 10 light irrigations',
    budgetRequired: 'high',
    costPerBigha: 12000,
    expectedYieldPerBigha: '14 - 18 Quintals',
    pricePerQuintal: 16500,
    profitPerBigha: '₹1,50,000 - ₹2,20,000',
    riskLevel: 'Medium',
    duration: '130-145 Days',
    idealDistricts: ['Kota', 'Baran', 'Jhalawar', 'Chittorgarh', 'Jaipur'],
    reasonEn: 'High commercial cash returns, outstanding price per quintal (₹16,500+), ideal for fertile well-drained loamy soils.',
    reasonHi: 'लाखों का मुनाफा देने वाली नकदी फसल, कोटा-हाड़ौती और जयपुर संभाग की उपजाऊ मिट्टी के लिए सर्वोत्तम।'
  },
  {
    name: 'Isabgol / Psyllium (ईसबगोल)',
    hindiName: 'ईसबगोल (Isabgol)',
    season: 'rabi',
    suitableSoils: ['sandy', 'loamy'],
    waterNeed: 'rainfed',
    minWaterings: '1 to 2 light irrigations',
    budgetRequired: 'low',
    costPerBigha: 3800,
    expectedYieldPerBigha: '3 - 4 Quintals',
    pricePerQuintal: 14800,
    profitPerBigha: '₹40,000 - ₹55,000',
    riskLevel: 'Low',
    duration: '110-120 Days',
    idealDistricts: ['Barmer', 'Jaisalmer', 'Jalore', 'Jodhpur', 'Bikaner'],
    reasonEn: 'Thrives in desert & low rainfall zones, high medicinal export value, resistant to most pests.',
    reasonHi: 'कम बारिश और रेतीली जमीन के लिए रामबाण, अंतरराष्ट्रीय औषधीय मांग से बेहतरीन भाव।'
  },

  // KHARIF CROPS (मॉनसून / खरीफ)
  {
    name: 'Bajra / Pearl Millet (बाजरा - Hybrid)',
    hindiName: 'बाजरा (Bajra)',
    season: 'kharif',
    suitableSoils: ['sandy', 'loamy', 'all'],
    waterNeed: 'rainfed',
    minWaterings: 'Rainfed / 1-2 irrigations',
    budgetRequired: 'low',
    costPerBigha: 2800,
    expectedYieldPerBigha: '8 - 11 Quintals',
    pricePerQuintal: 2250,
    profitPerBigha: '₹18,000 - ₹25,000 (+ कड़बी चारा)',
    riskLevel: 'Low',
    duration: '80-90 Days',
    idealDistricts: ['Jaipur', 'Alwar', 'Dausa', 'Sikar', 'Jhunjhunu', 'Nagaur', 'All'],
    reasonEn: 'Most resilient monsoon crop for Rajasthan, withstands dry spells, provides nutritious green fodder.',
    reasonHi: 'राजस्थान की सबसे मजबूत खरीफ फसल, कम बारिश में भी बिना नुकसान के बंपर दाना व चारा।'
  },
  {
    name: 'Groundnut / Moongfali (मूंगफली)',
    hindiName: 'मूंगफली (Groundnut)',
    season: 'kharif',
    suitableSoils: ['sandy', 'loamy'],
    waterNeed: 'semi',
    minWaterings: '3 to 4 irrigations',
    budgetRequired: 'medium',
    costPerBigha: 5200,
    expectedYieldPerBigha: '8 - 11 Quintals',
    pricePerQuintal: 6450,
    profitPerBigha: '₹45,000 - ₹62,000',
    riskLevel: 'Low',
    duration: '115-125 Days',
    idealDistricts: ['Bikaner', 'Jaipur', 'Dausa', 'Nagaur', 'Churu'],
    reasonEn: 'Highest returning oilseed in sandy-loam soils, excellent oil content and cattle feed byproduct value.',
    reasonHi: 'रेतीली-दोमट मिट्टी में सबसे ज्यादा मुनाफा देने वाली फसल, बीकानेर व जयपुर क्षेत्र में उच्च मांग।'
  },
  {
    name: 'Green Gram / Moong (मूंग)',
    hindiName: 'मूंग (Moong - Short Duration)',
    season: 'kharif',
    suitableSoils: ['sandy', 'loamy', 'clay', 'all'],
    waterNeed: 'rainfed',
    minWaterings: 'Rainfed / 1 watering',
    budgetRequired: 'low',
    costPerBigha: 2500,
    expectedYieldPerBigha: '3.5 - 5 Quintals',
    pricePerQuintal: 7900,
    profitPerBigha: '₹24,000 - ₹35,000',
    riskLevel: 'Low',
    duration: '65-75 Days',
    idealDistricts: ['Nagaur', 'Jaipur', 'Ajmer', 'Jodhpur', 'Pali', 'All'],
    reasonEn: 'Short duration (harvest in 65-75 days), high MSP, allows early field preparation for Rabi wheat/mustard.',
    reasonHi: 'मात्र 65-75 दिन में तैयार, जमीन की उर्वरता बढ़ाता है और अगली रबी फसल के लिए खेत जल्दी खाली।'
  },
  {
    name: 'Guar Seed (ग्वार बीज)',
    hindiName: 'ग्वार (Guar Seed)',
    season: 'kharif',
    suitableSoils: ['sandy', 'loamy', 'all'],
    waterNeed: 'rainfed',
    minWaterings: 'Rainfed (No extra irrigation)',
    budgetRequired: 'low',
    costPerBigha: 2200,
    expectedYieldPerBigha: '4 - 6 Quintals',
    pricePerQuintal: 5320,
    profitPerBigha: '₹18,000 - ₹28,000',
    riskLevel: 'Low',
    duration: '85-95 Days',
    idealDistricts: ['Barmer', 'Bikaner', 'Jodhpur', 'Jaipur', 'Hanumangarh', 'All'],
    reasonEn: 'Extremely drought tolerant, zero irrigation cost, high industrial gum export value.',
    reasonHi: 'बिना किसी अतिरिक्त पानी के केवल बारिश में उगने वाली सबसे टिकाऊ औद्योगिक फसल।'
  },
  {
    name: 'Cotton / Kapas (कपास - BT Hybrid)',
    hindiName: 'कपास (Cotton)',
    season: 'kharif',
    suitableSoils: ['clay', 'black', 'loamy'],
    waterNeed: 'full',
    minWaterings: '4 to 6 irrigations',
    budgetRequired: 'high',
    costPerBigha: 5800,
    expectedYieldPerBigha: '6 - 8 Quintals',
    pricePerQuintal: 7150,
    profitPerBigha: '₹38,000 - ₹50,000',
    riskLevel: 'Medium',
    duration: '150-165 Days',
    idealDistricts: ['Ganganagar', 'Hanumangarh', 'Kota', 'Alwar'],
    reasonEn: 'Major commercial fiber crop with high textile mill demand, ideal for deep fertile clay & black soils.',
    reasonHi: 'काली व दोमट मिट्टी में सफेद सोना, टेक्सटाइल मिलों की सीधी खरीद से नकद आय।'
  },

  // ZAID CROPS (गर्मी / जायद)
  {
    name: 'Summer Moong (जायद मूंग)',
    hindiName: 'जायद मूंग (Summer Moong)',
    season: 'zaid',
    suitableSoils: ['loamy', 'clay', 'all'],
    waterNeed: 'full',
    minWaterings: '3 to 4 irrigations',
    budgetRequired: 'low',
    costPerBigha: 2400,
    expectedYieldPerBigha: '3.5 - 4.5 Quintals',
    pricePerQuintal: 7900,
    profitPerBigha: '₹22,000 - ₹32,000',
    riskLevel: 'Low',
    duration: '60-70 Days',
    idealDistricts: ['Jaipur', 'Kota', 'Alwar', 'Ganganagar', 'All'],
    reasonEn: 'Grown between March to May after wheat harvest, earns extra income before monsoon and rejuvenates soil.',
    reasonHi: 'गेहूं कटाई के बाद खाली खेत में 60 दिन में अतिरिक्त कमाई और जमीन में नाइट्रोजन खाद की बढ़ोतरी।'
  },
  {
    name: 'Vegetable & Melons / Tarbuj-Kharbuja (तरबूज-खरबूजा)',
    hindiName: 'तरबूज व खरबूजा (Melons & Cucurbits)',
    season: 'zaid',
    suitableSoils: ['sandy', 'loamy'],
    waterNeed: 'full',
    minWaterings: 'Drip / Tube-well required',
    budgetRequired: 'medium',
    costPerBigha: 6000,
    expectedYieldPerBigha: '30 - 45 Quintals',
    pricePerQuintal: 1400,
    profitPerBigha: '₹35,000 - ₹55,000',
    riskLevel: 'Low',
    duration: '70-80 Days',
    idealDistricts: ['Jaipur', 'Tonk', 'Sawai Madhopur', 'Chomu', 'All'],
    reasonEn: 'Summer cash liquidity, rapid high-volume harvest with strong city market demand.',
    reasonHi: 'गर्मियों में शहरों में भारी मांग, 70 दिनों में भारी वजन और नकद मुनाफा।'
  }
];

function recommendCrops({ season, soilType, waterAvailability, budget, district }) {
  const normSeason = (season || 'rabi').toLowerCase();
  const normSoil = (soilType || 'loamy').toLowerCase();
  const normWater = (waterAvailability || 'semi').toLowerCase();
  const normBudget = (budget || 'medium').toLowerCase();
  const normDistrict = (district || 'Jaipur').toLowerCase();

  // Filter and score crops
  const scoredCrops = CROPS_DATABASE.map(crop => {
    let score = 0;
    const matchFactors = [];

    // 1. Season Match (Mandatory, 40 points)
    if (crop.season === normSeason) {
      score += 40;
    } else {
      score -= 50; // Incompatible season
    }

    // 2. Soil Match (25 points)
    if (crop.suitableSoils.includes('all') || crop.suitableSoils.includes(normSoil)) {
      score += 25;
      matchFactors.push(`Soil compatibility: Ideal for ${normSoil} soil`);
    } else {
      score += 5;
    }

    // 3. Water Availability Match (20 points)
    if (normWater === 'full') {
      score += 20;
      matchFactors.push('Water supply: Excellent for full irrigation capacity');
    } else if (normWater === 'semi') {
      if (crop.waterNeed === 'semi' || crop.waterNeed === 'rainfed') {
        score += 20;
        matchFactors.push('Water requirement: Perfectly suited for 2-3 waterings');
      } else {
        score += 5; // Might suffer if full water is needed
      }
    } else if (normWater === 'rainfed') {
      if (crop.waterNeed === 'rainfed') {
        score += 25; // Bonus for drought resilient crops
        matchFactors.push('Drought resilience: Zero extra irrigation required');
      } else if (crop.waterNeed === 'semi') {
        score += 10;
      } else {
        score -= 20; // High water crops will fail in rainfed
      }
    }

    // 4. Budget Match (10 points)
    if (normBudget === 'high' || crop.budgetRequired === normBudget || crop.budgetRequired === 'low') {
      score += 10;
    }

    // 5. District Affinity (5 points)
    const districtMatch = crop.idealDistricts.some(d => d.toLowerCase() === normDistrict || d === 'All');
    if (districtMatch) {
      score += 5;
      matchFactors.push(`Regional proven track record in ${district || 'Rajasthan'}`);
    }

    // Normalize score to percentage (capped at 98%)
    const matchPercentage = Math.min(98, Math.max(50, score));

    return {
      ...crop,
      score: matchPercentage,
      matchFactors
    };
  });

  // Sort descending by score
  scoredCrops.sort((a, b) => b.score - a.score);

  // Return Top 3 Best Recommendation Cards
  return {
    queriedParameters: {
      season: normSeason.toUpperCase(),
      soilType: normSoil,
      waterAvailability: normWater,
      budget: normBudget,
      district: district || 'Jaipur, Rajasthan'
    },
    topRecommendations: scoredCrops.slice(0, 3)
  };
}

module.exports = { recommendCrops, CROPS_DATABASE };
