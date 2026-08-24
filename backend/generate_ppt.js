const pptxgen = require('pptxgenjs');
const path = require('path');

async function createGraminConnectPresentation() {
  const pres = new pptxgen();

  // Configure Presentation Dimensions (16:9 Widescreen)
  pres.layout = 'LAYOUT_16x9';
  pres.title = 'GraminConnect - Digital Agriculture & Rural Platform';
  pres.author = 'Yogesh Sirohiya';
  pres.company = 'GraminConnect';

  // Theme Color Palette
  const THEME = {
    primary: '0F766E',      // Emerald Green
    primaryDark: '115E59',  // Deep Teal
    accent: 'F59E0B',       // Amber Gold
    accentBlue: '0284C7',   // Sky Blue
    bgLight: 'F8FAFC',      // Crisp Off-White
    textDark: '0F172A',     // Slate Black
    textMuted: '64748B',    // Slate Gray
    white: 'FFFFFF',
    cardBorder: 'CBD5E1'
  };

  // Helper: Create Standard Content Slide with Header & Footer
  function addHeaderFooter(slide, title, category = 'GRAMINCONNECT PROJECT PRESENTATION') {
    // Header Bar
    slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 13.33, h: 1.1, fill: { color: THEME.primary } });
    slide.addText(category.toUpperCase(), { x: 0.8, y: 0.15, w: 10, h: 0.25, fontSize: 10, color: THEME.accent, bold: true });
    slide.addText(title, { x: 0.8, y: 0.45, w: 11.5, h: 0.55, fontSize: 22, color: THEME.white, bold: true });

    // Footer Bar
    slide.addShape(pres.ShapeType.rect, { x: 0, y: 7.15, w: 13.33, h: 0.35, fill: { color: 'F1F5F9' } });
    slide.addText('GraminConnect • Digital Agriculture & Rural Commercial Ecosystem', { x: 0.8, y: 7.2, w: 9, h: 0.25, fontSize: 10, color: THEME.textMuted });
    slide.addText('B.Tech Final Year / IDT Project', { x: 9.8, y: 7.2, w: 2.8, h: 0.25, fontSize: 10, color: THEME.primary, align: 'right', bold: true });
  }

  // ==========================================
  // SLIDE 1: TITLE & COVER SLIDE
  // ==========================================
  {
    const slide = pres.addSlide();
    slide.background = { color: THEME.primaryDark };

    // Decorative Card
    slide.addShape(pres.ShapeType.roundRect, { x: 1.0, y: 0.8, w: 11.33, h: 5.8, fill: { color: '094843' }, line: { color: '14B8A6', width: 1.5 } });

    slide.addText('🌱 GRAMINCONNECT (ग्रामीण कनेक्ट)', { x: 1.5, y: 1.3, w: 10.33, h: 0.8, fontSize: 36, color: THEME.accent, bold: true });
    slide.addText('A Full-Scale Digital Agriculture & Rural Commercial Ecosystem Platform', { x: 1.5, y: 2.1, w: 10.33, h: 0.6, fontSize: 20, color: THEME.white });
    
    // Sub-pills
    slide.addText('🌾 Live Agmarknet Govt API (data.gov.in)  •  🩺 AI Crop Doctor  •  🛒 Kisan Direct Marketplace  •  🚜 Machinery Rentals', {
      x: 1.5, y: 3.0, w: 10.33, h: 0.5, fontSize: 13, color: '99F6E4', bold: true
    });

    // Metadata Box
    slide.addShape(pres.ShapeType.roundRect, { x: 1.5, y: 4.0, w: 10.33, h: 1.8, fill: { color: THEME.primary }, line: { color: '2DD4BF', width: 1 } });
    slide.addText([
      { text: 'Presented By: ', options: { bold: true, color: THEME.accent } },
      { text: 'Yogesh Sirohiya & Team\n', options: { color: THEME.white } },
      { text: 'Project Domain: ', options: { bold: true, color: THEME.accent } },
      { text: 'Information & Digital Technology (IDT) / Agri-Tech Solutions\n', options: { color: THEME.white } },
      { text: 'Architecture: ', options: { bold: true, color: THEME.accent } },
      { text: 'Webpack 5 Micro-Frontends + Node.js Express REST + MySQL Workbench Relational DB', options: { color: THEME.white } }
    ], { x: 1.8, y: 4.2, w: 9.7, h: 1.4, fontSize: 13 });
  }

  // ==========================================
  // SLIDE 2: PROBLEM STATEMENT
  // ==========================================
  {
    const slide = pres.addSlide();
    addHeaderFooter(slide, 'Problem Statement & Challenges in Rural Agriculture');

    // Card 1
    slide.addShape(pres.ShapeType.roundRect, { x: 0.8, y: 1.5, w: 3.6, h: 5.2, fill: { color: THEME.white }, line: { color: 'EF4444', width: 1.5 } });
    slide.addText('1. Information Asymmetry & Mandi Middlemen', { x: 1.0, y: 1.7, w: 3.2, h: 0.6, fontSize: 15, bold: true, color: '991B1B' });
    slide.addText('• Farmers lack real-time APMC Mandi rates, resulting in 15-20% price deduction by local middlemen/aadhatiyas.\n• Heavy commission fees eat into farmers\' net earnings.\n• Lack of price transparency across neighboring districts.', { x: 1.0, y: 2.4, w: 3.2, h: 4.0, fontSize: 12, color: THEME.textDark });

    // Card 2
    slide.addShape(pres.ShapeType.roundRect, { x: 4.85, y: 1.5, w: 3.6, h: 5.2, fill: { color: THEME.white }, line: { color: 'F59E0B', width: 1.5 } });
    slide.addText('2. Crop Diseases & Agronomic Guidance Gap', { x: 5.05, y: 1.7, w: 3.2, h: 0.6, fontSize: 15, bold: true, color: '92400E' });
    slide.addText('• Delayed pest/fungal disease diagnosis leads to 30-40% harvest loss.\n• Incorrect fertilizer dosages damage soil health and spike input costs.\n• Agricultural scientists (KVKs) are geographically inaccessible to remote villages.', { x: 5.05, y: 2.4, w: 3.2, h: 4.0, fontSize: 12, color: THEME.textDark });

    // Card 3
    slide.addShape(pres.ShapeType.roundRect, { x: 8.9, y: 1.5, w: 3.6, h: 5.2, fill: { color: THEME.white }, line: { color: '3B82F6', width: 1.5 } });
    slide.addText('3. Heavy Machinery Costs & Subsidy Illiteracy', { x: 9.1, y: 1.7, w: 3.2, h: 0.6, fontSize: 15, bold: true, color: '1E40AF' });
    slide.addText('• Small/marginal farmers cannot afford tractors, laser levelers or combine harvesters (CapEx > ₹8 Lakhs).\n• Complex government subsidy portals cause missed deadlines for PM-Kisan & Kusum Solar schemes.', { x: 9.1, y: 2.4, w: 3.2, h: 4.0, fontSize: 12, color: THEME.textDark });
  }

  // ==========================================
  // SLIDE 3: PROPOSED SOLUTION & VISION
  // ==========================================
  {
    const slide = pres.addSlide();
    addHeaderFooter(slide, 'The Solution: GraminConnect Unified Ecosystem');

    slide.addShape(pres.ShapeType.roundRect, { x: 0.8, y: 1.4, w: 11.73, h: 1.0, fill: { color: 'ECFDF5' }, line: { color: '10B981', width: 1 } });
    slide.addText('🎯 Vision: A zero-middlemen, voice-enabled, hyper-local digital rural platform connecting Farmers, Traders, Machinery Owners, and Government Subsidies seamlessly.', {
      x: 1.0, y: 1.55, w: 11.33, h: 0.7, fontSize: 14, bold: true, color: '065F46'
    });

    const pillars = [
      { title: '🌾 Live Mandi Rates', desc: 'Real-time prices from data.gov.in (Agmarknet) with 7-day SVG sparkline trend graphs & voice search.' },
      { title: '🩺 Kisan AI Crop Doctor', desc: 'Instant disease diagnosis, chemical/organic treatment, dosage calculation, and Hindi audio narration.' },
      { title: '🛒 Kisan Bazar (Direct Sale)', desc: 'Direct farmer-to-buyer crop listing with 1-click WhatsApp and phone calls without commission.' },
      { title: '🚜 Machinery Rental Hub', desc: 'Uber-like tractor, harvester & laser leveler rental sharing on hourly and per-Bigha rates.' },
      { title: '🏛️ Welfare Schemes Portal', desc: 'Direct 1-click redirection to official PM-KISAN, PMFBY, Kusum Solar, and Tarbandi portals.' },
      { title: '☀️ Field-Ready Accessibility', desc: 'Outdoor High-Contrast Sunlight Mode, Web Speech Voice Search & 24/7 Helpline Dialer.' }
    ];

    pillars.forEach((p, idx) => {
      const row = Math.floor(idx / 3);
      const col = idx % 3;
      const x = 0.8 + col * 4.0;
      const y = 2.6 + row * 2.2;

      slide.addShape(pres.ShapeType.roundRect, { x, y, w: 3.73, h: 1.9, fill: { color: THEME.white }, line: { color: THEME.cardBorder, width: 1 } });
      slide.addText(p.title, { x: x + 0.2, y: y + 0.15, w: 3.33, h: 0.4, fontSize: 14, bold: true, color: THEME.primary });
      slide.addText(p.desc, { x: x + 0.2, y: y + 0.6, w: 3.33, h: 1.2, fontSize: 11.5, color: THEME.textDark });
    });
  }

  // ==========================================
  // SLIDE 4: SYSTEM ARCHITECTURE
  // ==========================================
  {
    const slide = pres.addSlide();
    addHeaderFooter(slide, 'System Architecture & Micro-Frontend Design');

    // Container 1: Frontend Layer
    slide.addShape(pres.ShapeType.roundRect, { x: 0.8, y: 1.5, w: 5.6, h: 5.2, fill: { color: THEME.white }, line: { color: THEME.primary, width: 1.5 } });
    slide.addText('💻 Micro-Frontend Presentation Layer', { x: 1.0, y: 1.7, w: 5.2, h: 0.4, fontSize: 15, bold: true, color: THEME.primary });
    
    slide.addShape(pres.ShapeType.roundRect, { x: 1.0, y: 2.2, w: 5.2, h: 1.9, fill: { color: 'F0FDFA' }, line: { color: '5EEAD4', width: 1 } });
    slide.addText('Host Shell Application (Port 3000)', { x: 1.2, y: 2.3, w: 4.8, h: 0.3, fontSize: 13, bold: true, color: THEME.primaryDark });
    slide.addText('• Schemes Portal, Kisan AI Doctor, Crop Matchmaker\n• Kisan Bazar (Direct Marketplace), Tractor Rentals\n• AuthModal (Farmer & Trader separate logins)\n• Zustand Global State Store & PWA Service Worker', { x: 1.2, y: 2.7, w: 4.8, h: 1.3, fontSize: 11, color: THEME.textDark });

    slide.addShape(pres.ShapeType.roundRect, { x: 1.0, y: 4.3, w: 5.2, h: 2.1, fill: { color: 'EFF6FF' }, line: { color: '93C5FD', width: 1 } });
    slide.addText('Federated Remote Dashboard (Port 3001)', { x: 1.2, y: 4.4, w: 4.8, h: 0.3, fontSize: 13, bold: true, color: '1E40AF' });
    slide.addText('• Webpack 5 Module Federation (`dashboard/Dashboard`)\n• 23+ Live Mandi Commodities & 7-Day SVG Sparklines\n• Voice Search (Web Speech API) & WhatsApp Share\n• Crop Production & Profit Estimator (Printable PDF)', { x: 1.2, y: 4.8, w: 4.8, h: 1.5, fontSize: 11, color: THEME.textDark });

    // Container 2: Backend & Database Layer
    slide.addShape(pres.ShapeType.roundRect, { x: 6.9, y: 1.5, w: 5.6, h: 5.2, fill: { color: THEME.white }, line: { color: THEME.accentBlue, width: 1.5 } });
    slide.addText('⚙️ Backend & Relational Database Layer', { x: 7.1, y: 1.7, w: 5.2, h: 0.4, fontSize: 15, bold: true, color: THEME.accentBlue });

    slide.addShape(pres.ShapeType.roundRect, { x: 7.1, y: 2.2, w: 5.2, h: 2.0, fill: { color: 'F8FAFC' }, line: { color: THEME.cardBorder, width: 1 } });
    slide.addText('Node.js & Express REST API (Port 5000)', { x: 7.3, y: 2.3, w: 4.8, h: 0.3, fontSize: 13, bold: true, color: THEME.textDark });
    slide.addText('• Live Govt API Client: `data.gov.in` (Agmarknet 15-min TTL)\n• Algorithmic Engines: Crop Doctor & Matchmaker Scoring\n• Security: JWT Tokens, Helmet.js, Express Rate Limiting\n• MVC Architecture & Parameterized SQL queries', { x: 7.3, y: 2.7, w: 4.8, h: 1.4, fontSize: 11, color: THEME.textDark });

    slide.addShape(pres.ShapeType.roundRect, { x: 7.1, y: 4.4, w: 5.2, h: 2.0, fill: { color: 'FEF3C7' }, line: { color: 'FCD34D', width: 1 } });
    slide.addText('MySQL Database & In-Memory Fallback', { x: 7.3, y: 4.5, w: 4.8, h: 0.3, fontSize: 13, bold: true, color: '92400E' });
    slide.addText('• Dual-Engine: MySQL 8.0 Connection Pool + In-Memory Store\n• Tables: `farmers`, `traders`, `marketplace_listings`,\n  `equipment_rentals`, `market_commodities`, `schemes`\n• 3NF Normalization & Foreign Key Relational Integrity', { x: 7.3, y: 4.9, w: 4.8, h: 1.4, fontSize: 11, color: THEME.textDark });
  }

  // ==========================================
  // SLIDE 5: LIVE GOVT AGMARKNET MANDI API
  // ==========================================
  {
    const slide = pres.addSlide();
    addHeaderFooter(slide, 'Official Govt Agmarknet Mandi Integration (data.gov.in)');

    slide.addShape(pres.ShapeType.roundRect, { x: 0.8, y: 1.4, w: 11.73, h: 1.4, fill: { color: 'F0FDF4' }, line: { color: '22C55E', width: 1.5 } });
    slide.addText('🏛️ Official Data Partner: Open Government Data (OGD) Platform India', { x: 1.1, y: 1.55, w: 11.0, h: 0.35, fontSize: 14, bold: true, color: '15803D' });
    slide.addText('Ministry of Agriculture and Farmers Welfare • Directorate of Marketing & Inspection (DMI)\nResource Dataset: Daily Price and Arrival of Agricultural Commodities in National APMC Mandis', { x: 1.1, y: 1.95, w: 11.0, h: 0.7, fontSize: 12, color: THEME.textDark });

    // 3 Feature Cards
    const features = [
      { title: '⚡ 15-Minute Smart In-Memory TTL Cache', desc: 'Prevents government server rate-limiting (HTTP 429) while guaranteeing sub-50ms query latency for end-user farmers.' },
      { title: '📈 7-Day SVG Sparklines', desc: 'Visual price trend curve embedded on all 23 crop cards so farmers can see whether prices are rising or dropping at a glance.' },
      { title: '🛡️ Graceful High-Accuracy Fallback', desc: 'If the government server undergoes maintenance, the backend automatically serves verified state APMC benchmarks without downtime.' }
    ];

    features.forEach((f, idx) => {
      const x = 0.8 + idx * 4.0;
      slide.addShape(pres.ShapeType.roundRect, { x, y: 3.1, w: 3.73, h: 3.6, fill: { color: THEME.white }, line: { color: THEME.cardBorder, width: 1 } });
      slide.addText(f.title, { x: x + 0.2, y: 3.3, w: 3.33, h: 0.6, fontSize: 13, bold: true, color: THEME.primary });
      slide.addText(f.desc, { x: x + 0.2, y: 4.0, w: 3.33, h: 2.4, fontSize: 12, color: THEME.textDark });
    });
  }

  // ==========================================
  // SLIDE 6: KISAN AI CROP DOCTOR & MATCHMAKER
  // ==========================================
  {
    const slide = pres.addSlide();
    addHeaderFooter(slide, 'AI Agronomic Diagnosis & Smart Crop Matchmaker');

    // Left Box: Crop Doctor
    slide.addShape(pres.ShapeType.roundRect, { x: 0.8, y: 1.5, w: 5.6, h: 5.2, fill: { color: THEME.white }, line: { color: '10B981', width: 1.5 } });
    slide.addText('🩺 Kisan AI Crop Doctor & Diagnosis', { x: 1.0, y: 1.7, w: 5.2, h: 0.4, fontSize: 15, bold: true, color: '065F46' });
    slide.addText('• Natural Language Agronomic Engine diagnosing 50+ crop diseases, pests (Aphids, Pod Borers, Termites) and deficiencies.\n• Dual Prescriptions:\n   - Chemical Treatment (with dilution ratio e.g. Mancozeb 2.5g/L)\n   - Organic / Desi Remedy (Neem oil, Jeevamrit)\n• Spray Timing & Precautions: Temperature & humidity advisory.\n• 🔊 Hindi Voice Synthesis (Web Speech API): Reads out full treatment in voice for illiterate farmers.', {
      x: 1.0, y: 2.3, w: 5.2, h: 4.2, fontSize: 12, color: THEME.textDark
    });

    // Right Box: Crop Matchmaker
    slide.addShape(pres.ShapeType.roundRect, { x: 6.9, y: 1.5, w: 5.6, h: 5.2, fill: { color: THEME.white }, line: { color: THEME.accent, width: 1.5 } });
    slide.addText('🌱 Smart Crop Matchmaker Wizard', { x: 7.1, y: 1.7, w: 5.2, h: 0.4, fontSize: 15, bold: true, color: '92400E' });
    slide.addText('• Multi-Factor Scoring Algorithm ranking Top 3 optimal crops for any specific agricultural plot.\n• Field Evaluation Matrix:\n   1. Season (30%): Kharif, Rabi, Zaid compatibility\n   2. Soil Adaptability (25%): Loamy, Sandy, Clay, Red soil\n   3. Irrigation Availability (25%): Full, Semi, Rainfed\n   4. Budget & District Viability (20%): ROI / Bigha\n• Returns match score percentage, required irrigations, and detailed Hindi justification.', {
      x: 7.1, y: 2.3, w: 5.2, h: 4.2, fontSize: 12, color: THEME.textDark
    });
  }

  // ==========================================
  // SLIDE 7: KISAN BAZAR & TRACTOR RENTAL HUB
  // ==========================================
  {
    const slide = pres.addSlide();
    addHeaderFooter(slide, 'Kisan Bazar (Direct Marketplace) & Machinery Rental');

    // Left Box: Kisan Bazar
    slide.addShape(pres.ShapeType.roundRect, { x: 0.8, y: 1.5, w: 5.6, h: 5.2, fill: { color: THEME.white }, line: { color: THEME.primary, width: 1.5 } });
    slide.addText('🛒 Kisan Direct Marketplace (किसान बाजार)', { x: 1.0, y: 1.7, w: 5.2, h: 0.4, fontSize: 15, bold: true, color: THEME.primary });
    slide.addText('• Eliminates Middlemen: Farmers list available harvest directly with quantity (Quintals), variety, rate & photos.\n• Direct Buyer Connect: Millers & traders can directly tap "📞 Call Farmer" or "💬 WhatsApp Seller".\n• Real-Time MySQL Persistence: Stored in `marketplace_listings` table for full auditability.\n• Multi-District Filter: Filter by Wheat, Mustard, Jeera, Garlic, etc.', {
      x: 1.0, y: 2.3, w: 5.2, h: 4.2, fontSize: 12.5, color: THEME.textDark
    });

    // Right Box: Machinery Rental
    slide.addShape(pres.ShapeType.roundRect, { x: 6.9, y: 1.5, w: 5.6, h: 5.2, fill: { color: THEME.white }, line: { color: THEME.accentBlue, width: 1.5 } });
    slide.addText('🚜 Machinery & Tractor Rental (Uber for Tractors)', { x: 7.1, y: 1.7, w: 5.2, h: 0.4, fontSize: 15, bold: true, color: THEME.accentBlue });
    slide.addText('• Asset Sharing Economy: Farmers with machinery list tractors, combine harvesters, laser levelers, and seed drills for rent.\n• Dual Pricing Models: Transparent hourly rates (₹/Hour) and per-Bigha rates (₹/Bigha).\n• Saves Capital Expenditure: Small farmers save ₹5-8 Lakhs in machinery purchase while tractor owners earn passive income.\n• Instant Booking Call: Direct 1-tap phone booking.', {
      x: 7.1, y: 2.3, w: 5.2, h: 4.2, fontSize: 12.5, color: THEME.textDark
    });
  }

  // ==========================================
  // SLIDE 8: DATABASE SCHEMA & SEPARATION
  // ==========================================
  {
    const slide = pres.addSlide();
    addHeaderFooter(slide, 'Database Design: Farmers & Traders Separation');

    // Left Table: Farmers Table
    slide.addShape(pres.ShapeType.roundRect, { x: 0.8, y: 1.5, w: 5.6, h: 5.2, fill: { color: THEME.white }, line: { color: THEME.primary, width: 1.5 } });
    slide.addText('🌾 Table: `farmers` (किसान टेबल)', { x: 1.0, y: 1.7, w: 5.2, h: 0.4, fontSize: 15, bold: true, color: THEME.primary });
    slide.addText([
      { text: 'Field Name\tData Type\tDescription\n', options: { bold: true, color: THEME.primaryDark } },
      { text: 'id\tINT (PK)\tAuto-increment ID\n' },
      { text: 'name\tVARCHAR(100)\tFarmer Full Name\n' },
      { text: 'phone\tVARCHAR(20)\tUnique Mobile No.\n' },
      { text: 'password_hash\tVARCHAR(255)\tSecure Password\n' },
      { text: 'village\tVARCHAR(100)\tGram / Village\n' },
      { text: 'district\tVARCHAR(100)\tDistrict (Jaipur, etc.)\n' },
      { text: 'land_area_bigha\tDECIMAL(6,2)\tLand Holding in Bigha\n' },
      { text: 'khasra_no\tVARCHAR(50)\tLand Revenue Khasra\n' },
      { text: 'created_at\tTIMESTAMP\tRegistration Date\n' }
    ], { x: 1.0, y: 2.3, w: 5.2, h: 4.2, fontSize: 11.5, color: THEME.textDark });

    // Right Table: Traders Table
    slide.addShape(pres.ShapeType.roundRect, { x: 6.9, y: 1.5, w: 5.6, h: 5.2, fill: { color: THEME.white }, line: { color: THEME.accentBlue, width: 1.5 } });
    slide.addText('🏢 Table: `traders` (व्यापारी/आढ़ती टेबल)', { x: 7.1, y: 1.7, w: 5.2, h: 0.4, fontSize: 15, bold: true, color: THEME.accentBlue });
    slide.addText([
      { text: 'Field Name\tData Type\tDescription\n', options: { bold: true, color: THEME.accentBlue } },
      { text: 'id\tINT (PK)\tAuto-increment ID\n' },
      { text: 'name\tVARCHAR(100)\tProprietor Name\n' },
      { text: 'phone\tVARCHAR(20)\tUnique Mobile No.\n' },
      { text: 'password_hash\tVARCHAR(255)\tSecure Password\n' },
      { text: 'firm_name\tVARCHAR(150)\tBusiness/Agency Name\n' },
      { text: 'mandi_name\tVARCHAR(100)\tAPMC Mandi Operating\n' },
      { text: 'mandi_license_no\tVARCHAR(50)\tOfficial APMC License\n' },
      { text: 'gst_no\tVARCHAR(50)\tGSTIN Number\n' },
      { text: 'district\tVARCHAR(100)\tMandi District\n' },
      { text: 'created_at\tTIMESTAMP\tRegistration Date\n' }
    ], { x: 7.1, y: 2.3, w: 5.2, h: 4.2, fontSize: 11.5, color: THEME.textDark });
  }

  // ==========================================
  // SLIDE 9: RURAL ACCESSIBILITY & PWA
  // ==========================================
  {
    const slide = pres.addSlide();
    addHeaderFooter(slide, 'Rural Usability, Voice & Inclusive Accessibility');

    const accessibilityFeatures = [
      { title: '🎙️ Voice Search ("बोलकर खोजें")', desc: 'Integrated Web Speech API allowing farmers to speak in Hindi or English (e.g., "सरसों का भाव") to filter mandi prices without typing.' },
      { title: '☀️ High-Contrast Sunlight Mode', desc: '1-click outdoor visibility toggle that adapts contrast and fonts so the screen is easily readable in direct open field sunlight.' },
      { title: '📱 Progressive Web App (Offline Mode)', desc: 'Service Worker and Manifest.json caching static assets and mandi rates (Cache-First) for villages with spotty cellular reception.' },
      { title: '📄 1-Click Printable Estimate PDF', desc: 'Generates bank-ready crop production & net profit estimate sheets formatted for Kisan Credit Card (KCC) loan verification.' },
      { title: '💬 1-Click WhatsApp Sharing', desc: 'Instant forward buttons formatting today\'s mandi rates and remedies directly to village community WhatsApp groups.' },
      { title: '🚨 24x7 Emergency Kisan Helpline', desc: 'Floating speed-dialer linking directly to Toll-Free Kisan Call Center (1800-180-1551) and Rajasthan Krishi Control Room.' }
    ];

    accessibilityFeatures.forEach((a, idx) => {
      const row = Math.floor(idx / 3);
      const col = idx % 3;
      const x = 0.8 + col * 4.0;
      const y = 1.6 + row * 2.6;

      slide.addShape(pres.ShapeType.roundRect, { x, y, w: 3.73, h: 2.3, fill: { color: THEME.white }, line: { color: THEME.cardBorder, width: 1 } });
      slide.addText(a.title, { x: x + 0.2, y: y + 0.15, w: 3.33, h: 0.4, fontSize: 13, bold: true, color: THEME.primary });
      slide.addText(a.desc, { x: x + 0.2, y: y + 0.6, w: 3.33, h: 1.6, fontSize: 11.5, color: THEME.textDark });
    });
  }

  // ==========================================
  // SLIDE 10: COMPARATIVE ADVANTAGES
  // ==========================================
  {
    const slide = pres.addSlide();
    addHeaderFooter(slide, 'Competitive Matrix: GraminConnect vs Existing Solutions');

    const headers = ['Feature / Capability', 'Govt e-NAM Portal', 'Private Agri Apps', 'GraminConnect (Our App)'];
    const rows = [
      ['Live Agmarknet Mandi API', 'Yes (Raw tables)', 'Static / Delayed', 'Yes (Live + 7-Day Sparklines)'],
      ['Voice Search (बोलकर खोजें)', 'No', 'Rarely Available', 'Yes (Web Speech API)'],
      ['AI Crop Doctor (Hindi Audio)', 'No', 'Paid / Text Only', 'Yes (Instant + Voice Playback)'],
      ['Direct Farmer-to-Buyer Market', 'Complex Bidding', 'High Commission', 'Yes (100% Free + 1-Click WhatsApp)'],
      ['Tractor & Machinery Rental Hub', 'No', 'Separate Service', 'Yes (Integrated Uber-like Hub)'],
      ['Outdoor Sunlight Contrast Mode', 'No', 'No', 'Yes (High-Contrast 1-Click Toggle)'],
      ['Architecture Modularity', 'Monolith', 'Monolith', 'Webpack 5 Micro-Frontends']
    ];

    // Build Table
    const tableData = [
      headers.map(h => ({ text: h, options: { bold: true, fill: { color: THEME.primary }, color: THEME.white } })),
      ...rows.map((r, rIdx) => r.map((cell, cIdx) => ({
        text: cell,
        options: {
          bold: cIdx === 3,
          color: cIdx === 3 ? '047857' : THEME.textDark,
          fill: { color: cIdx === 3 ? 'ECFDF5' : (rIdx % 2 === 0 ? 'F8FAFC' : THEME.white) }
        }
      })))
    ];

    slide.addTable(tableData, { x: 0.8, y: 1.5, w: 11.73, h: 5.2, fontSize: 11.5, colW: [3.3, 2.5, 2.5, 3.43] });
  }

  // ==========================================
  // SLIDE 11: FUTURE SCOPE & ROADMAP
  // ==========================================
  {
    const slide = pres.addSlide();
    addHeaderFooter(slide, 'Future Roadmap & Enterprise Expansion');

    const futurePoints = [
      { num: '01', title: 'Computer Vision Leaf Disease Scanner', desc: 'Allowing farmers to capture leaf photos via mobile camera for deep-learning (CNN) disease classification.' },
      { num: '02', title: 'Escrow Digital Token Payments', desc: 'Secure UPI payment escrow for Kisan Bazar transactions with buyer confirmation before fund release.' },
      { num: '03', title: 'Satellite NDVI & Bhuvan Radar Soil Scan', desc: 'Integrating ISRO Bhuvan / Sentinel satellite radar feeds for real-time field greenness and moisture heatmaps.' },
      { num: '04', title: 'Multi-State Regional Dialect Expansion', desc: 'Adding audio support in Marwari, Bhojpuri, Punjabi, Gujarati, and Telugu for Pan-India farmer adoption.' }
    ];

    futurePoints.forEach((pt, idx) => {
      const y = 1.6 + idx * 1.3;
      slide.addShape(pres.ShapeType.roundRect, { x: 0.8, y, w: 11.73, h: 1.15, fill: { color: THEME.white }, line: { color: THEME.cardBorder, width: 1 } });
      
      slide.addShape(pres.ShapeType.rect, { x: 0.8, y, w: 1.0, h: 1.15, fill: { color: THEME.primary } });
      slide.addText(pt.num, { x: 0.8, y: y + 0.35, w: 1.0, h: 0.4, fontSize: 18, bold: true, color: THEME.white, align: 'center' });

      slide.addText(pt.title, { x: 2.0, y: y + 0.15, w: 10.3, h: 0.35, fontSize: 14, bold: true, color: THEME.primaryDark });
      slide.addText(pt.desc, { x: 2.0, y: y + 0.5, w: 10.3, h: 0.55, fontSize: 11.5, color: THEME.textDark });
    });
  }

  // ==========================================
  // SLIDE 12: CONCLUSION & THANK YOU
  // ==========================================
  {
    const slide = pres.addSlide();
    slide.background = { color: THEME.primaryDark };

    slide.addShape(pres.ShapeType.roundRect, { x: 1.5, y: 1.0, w: 10.33, h: 5.3, fill: { color: '094843' }, line: { color: '14B8A6', width: 1.5 } });

    slide.addText('🌾 Thank You! (धन्यवाद)', { x: 2.0, y: 1.5, w: 9.33, h: 0.8, fontSize: 36, color: THEME.accent, bold: true, align: 'center' });
    slide.addText('Empowering the backbone of India with Digital Technology', { x: 2.0, y: 2.4, w: 9.33, h: 0.5, fontSize: 18, color: THEME.white, align: 'center' });

    slide.addShape(pres.ShapeType.roundRect, { x: 2.5, y: 3.2, w: 8.33, h: 2.4, fill: { color: THEME.primary }, line: { color: '2DD4BF', width: 1 } });
    slide.addText([
      { text: '🚀 Project Live GitHub Repository:\n', options: { bold: true, color: THEME.accent } },
      { text: 'https://github.com/yogeshsirohiya62-ux/GraminConnect\n\n', options: { color: THEME.white } },
      { text: '💬 Questions & Feedback:\n', options: { bold: true, color: THEME.accent } },
      { text: 'We are now open for evaluation and viva questions from respected faculty members.', options: { color: THEME.white } }
    ], { x: 2.8, y: 3.4, w: 7.73, h: 2.0, fontSize: 13, align: 'center' });
  }

  // Save the PowerPoint Presentation file
  const outputPath = path.resolve(__dirname, '../GraminConnect_Presentation.pptx');
  await pres.writeFile({ fileName: outputPath });
  console.log(`🎉 PowerPoint Presentation successfully generated at: ${outputPath}`);
}

createGraminConnectPresentation().catch(err => {
  console.error("Error generating PPT:", err);
});
