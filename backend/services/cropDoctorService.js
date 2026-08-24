// Intelligent Kisan AI Crop Doctor & Agronomic Advisory Service

const DIAGNOSIS_KNOWLEDGE_BASE = [
  {
    keywords: ['peela', 'peelapan', 'yellow', 'yellowing', 'chlorosis', 'leaves turning yellow'],
    cropSpecific: 'Wheat / Gehu',
    problem: 'Nitrogen or Zinc Deficiency / Yellow Rust (नाइट्रोजन/जिंक की कमी या पीला रतुआ)',
    symptoms: 'Older lower leaves turn pale yellow starting from the tips, or parallel yellow stripes appear.',
    chemicalTreatment: 'Spray 2.5 kg Urea + 500g Zinc Sulphate (33% Chelate) dissolved in 100 liters of water per Bigha.',
    organicTreatment: 'Spray enriched Jeevamrit or fermented cow urine (गौमूत्र) diluted 1:10 with water.',
    sprayTiming: 'Spray during morning or late afternoon hours on clear sunny days.',
    precaution: 'Ensure field has adequate soil moisture before spraying foliar fertilizers.'
  },
  {
    keywords: ['aphid', 'chepa', 'mowla', 'sarson keeda', 'mustard bug', 'kala keeda', 'mahu'],
    cropSpecific: 'Mustard / Sarson',
    problem: 'Mustard Aphid Infestation / Mahu / Chepa (सरसों का मोयला / चेपा कीट)',
    symptoms: 'Tiny green/black insects sucking sap from floral twigs, pods, and tender shoots, curling leaves.',
    chemicalTreatment: 'Spray Dimethoate 30% EC @ 1.5 ml/liter OR Imidacloprid 17.8% SL @ 0.5 ml/liter water.',
    organicTreatment: 'Spray 5 ml Neem Oil (1500 PPM) + 2 ml liquid soap per liter of water early in the morning.',
    sprayTiming: 'Spray immediately upon spotting 10-15 aphids per 10 cm twig length.',
    precaution: 'Avoid spraying during peak bee activity hours (10 AM to 2 PM) to protect pollinator honeybees.'
  },
  {
    keywords: ['termite', 'deemak', 'dimak', 'dry roots', 'drying plants'],
    cropSpecific: 'All Crops (Wheat, Gram, Mustard)',
    problem: 'Termite Attack in Roots (दीमक का प्रकोप)',
    symptoms: 'Plants suddenly wilt and dry up; when pulled, damaged roots show termite eating.',
    chemicalTreatment: 'Apply Chlorpyrifos 20% EC @ 1 liter per Bigha mixed with light sand along irrigation water stream.',
    organicTreatment: 'Apply Neem cake (नीम की खली) @ 50 kg per Bigha into the soil before sowing or use Beauveria bassiana.',
    sprayTiming: 'Apply along with light irrigation.',
    precaution: 'Never use un-decomposed raw farmyard manure (कच्चा गोबर) as it attracts termites.'
  },
  {
    keywords: ['pod borer', 'sundi', 'chana keeda', 'caterpillar', 'chana sundi', 'hole in pods'],
    cropSpecific: 'Gram / Chana & Pulses',
    problem: 'Gram Pod Borer / Helicoverpa / Sundi (चने की फली छेदक सुंडी)',
    symptoms: 'Caterpillars bore holes in flowers and developing green pods and eat the seeds inside.',
    chemicalTreatment: 'Spray Emamectin Benzoate 5% SG @ 0.5 gram per liter OR Chlorantraniliprole 18.5% SC (Coragen) @ 0.3 ml/liter.',
    organicTreatment: 'Install T-shaped bird perches (T-खूंटियां) @ 15 per Bigha + spray HaNPV virus solution or Bacillus thuringiensis.',
    sprayTiming: 'Spray at 50% flowering and initial pod formation stage.',
    precaution: 'Rotate insecticide groups to prevent pesticide resistance.'
  },
  {
    keywords: ['kharpatwar', 'weed', 'gulli danda', 'mandusi', 'bathua', 'weedicide'],
    cropSpecific: 'Wheat / Gehu',
    problem: 'Broadleaf & Grassy Weeds (बथुआ, गुल्ली डंडा / मंडूसी खरपतवार)',
    symptoms: 'Weeds competing with wheat plants for sunlight, moisture, and fertilizer.',
    chemicalTreatment: 'For mixed weeds, spray Sulfosulfuron 75% + Metsulfuron 5% WG @ 16g kit in 100L water per Bigha at 30-35 days after sowing (after first irrigation).',
    organicTreatment: 'Hand weeding (खुरपी से निराई-गुड़ाई) at 25-30 days stage.',
    sprayTiming: 'Spray only when soil has optimum moisture (ओट/वतर आने पर) using flat fan nozzle.',
    precaution: 'Do not spray in cloudy, windy or rainy weather.'
  },
  {
    keywords: ['thrips', 'jeera chhaachhya', 'blight', 'jhulsa', 'cumin blight', 'powdery mildew'],
    cropSpecific: 'Cumin / Jeera & Spices',
    problem: 'Cumin Blight / Alternaria Jhulsa & Powdery Mildew (जीरा का झुलसा व छाछ्या रोग)',
    symptoms: 'Dark brown spots on leaves and stems, white powdery coating on green parts, tips bending downward.',
    chemicalTreatment: 'Spray Mancozeb 75% WP @ 2.5 g/L + Wettable Sulphur 80% WP @ 2.0 g/L water.',
    organicTreatment: 'Spray sour buttermilk (खट्टी छाछ) 5 liters + 100 liters water with copper vessel infusion.',
    sprayTiming: 'Preventive spray when humidity rises or clouds appear.',
    precaution: 'Jeera is very sensitive; strictly maintain prescribed fungicide dosages.'
  },
  {
    keywords: ['fertilizer', 'urea timing', 'dap', 'pehli sinchai', 'first irrigation', 'khad'],
    cropSpecific: 'Wheat & Mustard',
    problem: 'Fertilizer & Irrigation Scheduling Advisory (सिंचाई व खाद प्रबंधन)',
    symptoms: 'Guidance on top-dressing and watering stages.',
    chemicalTreatment: 'For Wheat: Apply 1st irrigation at Crown Root stage (21 days) with 25 kg Urea per Bigha. 2nd at Tillering (45 days) with remaining Urea.',
    organicTreatment: 'Apply Vermicompost (केंचुआ खाद) @ 2 Quintals per Bigha before irrigation.',
    sprayTiming: 'Broadcast fertilizer just before evening irrigation.',
    precaution: 'Avoid excess nitrogen which causes crop lodging (फसल गिरना).'
  }
];

function consultCropDoctor(query, cropName) {
  if (!query || query.trim() === '') {
    return {
      found: false,
      message: 'Please describe the symptom, crop issue, or question you would like advice on.'
    };
  }

  const q = query.toLowerCase();
  
  // Score matching diagnoses
  let bestMatch = null;
  let highestScore = 0;

  for (const item of DIAGNOSIS_KNOWLEDGE_BASE) {
    let score = 0;
    for (const kw of item.keywords) {
      if (q.includes(kw)) {
        score += 10;
      }
    }
    if (cropName && item.cropSpecific.toLowerCase().includes(cropName.toLowerCase())) {
      score += 15;
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch && highestScore >= 10) {
    return {
      found: true,
      query: query,
      crop: cropName || bestMatch.cropSpecific,
      diagnosis: bestMatch.problem,
      symptoms: bestMatch.symptoms,
      solutions: {
        chemical: bestMatch.chemicalTreatment,
        organic: bestMatch.organicTreatment,
        timing: bestMatch.sprayTiming,
        precaution: bestMatch.precaution
      },
      audioNarrationHi: `आपकी फसल की समस्या: ${bestMatch.problem} है। समाधान के लिए: ${bestMatch.chemicalTreatment}। जैविक उपचार में ${bestMatch.organicTreatment} का प्रयोग करें। सावधानी: ${bestMatch.precaution}`
    };
  }

  // Fallback intelligent general response for unspecified queries
  return {
    found: true,
    query: query,
    crop: cropName || 'General Agricultural Query',
    diagnosis: 'General Crop Health & Soil Management Advisory (कृषि विशेषज्ञ सलाह)',
    symptoms: `Query regarding: "${query}".`,
    solutions: {
      chemical: 'For specific insect control, use Neem Oil 1500 PPM @ 5ml/L or consult your nearest Krishi Vigyan Kendra (KVK) with a field leaf sample.',
      organic: 'Apply well-decomposed FYM (गोबर की खाद) or Vermicompost and spray 5% Neem extract for general plant immunity.',
      timing: 'Apply foliar sprays in the late afternoon (after 3:30 PM).',
      precaution: 'Always test on a small patch of 4-5 plants before applying to the entire field.'
    },
    audioNarrationHi: `आपके प्रश्न के समाधान के लिए कृषि वैज्ञानिक की सलाह: फसल में किसी भी लक्षण पर जैविक रूप से 5 मिलीलीटर नीम तेल प्रति लीटर पानी का छिड़काव करें एवं उचित नमी बनाए रखें।`
  };
}

module.exports = { consultCropDoctor };
