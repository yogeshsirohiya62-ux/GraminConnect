const pptxgen = require('pptxgenjs');
const path = require('path');

async function createCollegeProjectPresentation() {
  const pres = new pptxgen();

  // Configure Presentation Dimensions (16:9 Widescreen)
  pres.layout = 'LAYOUT_16x9';
  pres.title = 'GraminConnect - College Project Presentation (IDT)';
  pres.author = 'Yogesh Sirohiya';
  pres.company = 'Department of Information & Digital Technology';

  // Professional Academic & Engineering Theme
  const THEME = {
    primary: '0F766E',      // Emerald Green
    primaryDark: '0A4E48',  // Deep Forest Teal
    accent: 'D97706',       // Amber Bronze
    accentBlue: '0369A1',   // Academic Sky Blue
    danger: 'B91C1C',       // Crimson Red (Problems)
    success: '15803D',      // Forest Green (Solutions)
    bgLight: 'F8FAFC',      // Crisp Off-White
    textDark: '0F172A',     // Slate Black
    textMuted: '475569',    // Slate Gray
    white: 'FFFFFF',
    cardBorder: 'CBD5E1'
  };

  // Helper: Create Standard Content Slide with Header & Footer
  function addHeaderFooter(slide, title, slideNumberText, category = 'B.TECH / IDT PROJECT EVALUATION') {
    // Header Bar
    slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 13.33, h: 1.1, fill: { color: THEME.primary } });
    slide.addText(category.toUpperCase(), { x: 0.8, y: 0.15, w: 10, h: 0.25, fontSize: 10, color: '99F6E4', bold: true });
    slide.addText(title, { x: 0.8, y: 0.45, w: 11.5, h: 0.55, fontSize: 22, color: THEME.white, bold: true });

    // Footer Bar
    slide.addShape(pres.ShapeType.rect, { x: 0, y: 7.15, w: 13.33, h: 0.35, fill: { color: 'F1F5F9' } });
    slide.addText('GraminConnect: Digital Agriculture Platform • Engineering Implementation', { x: 0.8, y: 7.2, w: 9, h: 0.25, fontSize: 10, color: THEME.textMuted });
    slide.addText(slideNumberText || 'Slide', { x: 10.5, y: 7.2, w: 2.0, h: 0.25, fontSize: 10, color: THEME.primary, align: 'right', bold: true });
  }

  // ==========================================
  // SLIDE 1: TITLE & CANDIDATE DETAILS
  // ==========================================
  {
    const slide = pres.addSlide();
    slide.background = { color: THEME.primaryDark };

    slide.addShape(pres.ShapeType.roundRect, { x: 1.0, y: 0.7, w: 11.33, h: 5.9, fill: { color: '073632' }, line: { color: '14B8A6', width: 1.5 } });

    slide.addText('PROJECT PRESENTATION & VIVA', { x: 1.5, y: 1.0, w: 10.33, h: 0.3, fontSize: 13, color: '2DD4BF', bold: true, align: 'center' });
    slide.addText('🌱 GRAMINCONNECT (ग्रामीण कनेक्ट)', { x: 1.5, y: 1.4, w: 10.33, h: 0.8, fontSize: 34, color: 'FDE047', bold: true, align: 'center' });
    slide.addText('Design & Implementation of a Micro-Frontend Digital Agriculture & Rural Marketplace Platform', { x: 1.5, y: 2.2, w: 10.33, h: 0.6, fontSize: 18, color: THEME.white, align: 'center' });

    // Academic Metadata Grid
    slide.addShape(pres.ShapeType.roundRect, { x: 1.5, y: 3.2, w: 10.33, h: 3.0, fill: { color: THEME.primary }, line: { color: '2DD4BF', width: 1 } });
    
    // Left Box: Student & Branch Info
    slide.addText([
      { text: '👨‍🎓 Candidate Details:\n', options: { bold: true, color: 'FDE047', fontSize: 13 } },
      { text: '• Student Name: ', options: { bold: true, color: THEME.white } },
      { text: 'Yogesh Sirohiya\n', options: { color: THEME.white } },
      { text: '• Semester / Branch: ', options: { bold: true, color: THEME.white } },
      { text: 'V Semester, Information & Digital Technology (IDT)\n', options: { color: THEME.white } },
      { text: '• Project Category: ', options: { bold: true, color: THEME.white } },
      { text: 'Full-Stack Web Engineering & Distributed Systems\n', options: { color: THEME.white } }
    ], { x: 1.8, y: 3.4, w: 5.0, h: 2.6, fontSize: 12 });

    // Right Box: Tech Stack Summary
    slide.addText([
      { text: '🛠️ Implementation Tech Stack:\n', options: { bold: true, color: 'FDE047', fontSize: 13 } },
      { text: '• Architecture: ', options: { bold: true, color: THEME.white } },
      { text: 'Webpack 5 Module Federation Micro-Frontends\n', options: { color: THEME.white } },
      { text: '• Backend API: ', options: { bold: true, color: THEME.white } },
      { text: 'Node.js Express REST (MVC Pattern)\n', options: { color: THEME.white } },
      { text: '• Database: ', options: { bold: true, color: THEME.white } },
      { text: 'MySQL 8.0 Workbench (Normalized Schema)\n', options: { color: THEME.white } },
      { text: '• Real Govt API: ', options: { bold: true, color: THEME.white } },
      { text: 'data.gov.in (National Agmarknet Live Feed)\n', options: { color: THEME.white } }
    ], { x: 6.8, y: 3.4, w: 4.8, h: 2.6, fontSize: 12 });
  }

  // ==========================================
  // SLIDE 2: PROJECT MOTIVATION & REQUIREMENT ANALYSIS
  // ==========================================
  {
    const slide = pres.addSlide();
    addHeaderFooter(slide, 'Project Motivation: Why Was GraminConnect Needed?', '1 / 11');

    slide.addShape(pres.ShapeType.roundRect, { x: 0.8, y: 1.4, w: 11.73, h: 0.9, fill: { color: 'FEF3C7' }, line: { color: 'F59E0B', width: 1 } });
    slide.addText('🎯 Ground Reality: Over 65% of rural Indian farmers struggle with three critical structural bottlenecks: Middlemen exploitation in Mandis, lack of real-time disease diagnosis, and unaffordable farm machinery.', {
      x: 1.0, y: 1.5, w: 11.33, h: 0.7, fontSize: 13, bold: true, color: '92400E'
    });

    const reqs = [
      {
        num: '01',
        title: 'Mandi Rate Asymmetry',
        desc: 'Farmers sell produce at local villages without knowing official APMC rates. Middlemen take 15-25% undue commission margin.'
      },
      {
        num: '02',
        title: 'Delayed Disease Detection',
        desc: 'Lack of timely agronomic advice causes 30-40% harvest loss due to fungal, viral, or pest attacks before reaching KVK scientists.'
      },
      {
        num: '03',
        title: 'High Machinery CapEx',
        desc: 'Small farmers cannot invest ₹8-10 Lakhs in tractors and laser levelers, leading to inefficient manual farming and lower yields.'
      },
      {
        num: '04',
        title: 'Digital & Literacy Barrier',
        desc: 'Most existing government portals are complex, text-heavy, not mobile-responsive, and completely unsuited for rural field conditions.'
      }
    ];

    reqs.forEach((r, idx) => {
      const x = 0.8 + idx * 3.0;
      slide.addShape(pres.ShapeType.roundRect, { x, y: 2.5, w: 2.75, h: 4.3, fill: { color: THEME.white }, line: { color: THEME.cardBorder, width: 1 } });
      
      slide.addShape(pres.ShapeType.rect, { x, y: 2.5, w: 2.75, h: 0.6, fill: { color: THEME.primary } });
      slide.addText(`${r.num}. ${r.title}`, { x: x + 0.1, y: 2.6, w: 2.55, h: 0.4, fontSize: 12, bold: true, color: THEME.white, align: 'center' });

      slide.addText(r.desc, { x: x + 0.2, y: 3.3, w: 2.35, h: 3.2, fontSize: 12, color: THEME.textDark });
    });
  }

  // ==========================================
  // SLIDE 3: SYSTEM ARCHITECTURE & HOW IT WAS BUILT
  // ==========================================
  {
    const slide = pres.addSlide();
    addHeaderFooter(slide, 'System Architecture: How The Project Was Built', '2 / 11');

    // 3 Architecture Columns
    // Col 1: Frontend Host
    slide.addShape(pres.ShapeType.roundRect, { x: 0.8, y: 1.5, w: 3.7, h: 5.3, fill: { color: THEME.white }, line: { color: THEME.primary, width: 1.5 } });
    slide.addText('1. Host Application Shell\n(Port 3000)', { x: 1.0, y: 1.7, w: 3.3, h: 0.6, fontSize: 14, bold: true, color: THEME.primary });
    slide.addText('• Webpack 5 Host Shell\n• Schemes Portal with direct official links\n• Kisan AI Crop Doctor & Prescription Engine\n• Crop Matchmaker 4-step wizard\n• Kisan Bazar & Tractor Rental Views\n• Role-based Farmer/Trader AuthModal\n• Zustand Global State Store', {
      x: 1.0, y: 2.4, w: 3.3, h: 4.2, fontSize: 11.5, color: THEME.textDark
    });

    // Col 2: Remote Dashboard (Federated)
    slide.addShape(pres.ShapeType.roundRect, { x: 4.8, y: 1.5, w: 3.7, h: 5.3, fill: { color: THEME.white }, line: { color: THEME.accentBlue, width: 1.5 } });
    slide.addText('2. Remote Dashboard Module\n(Port 3001 - Micro-Frontend)', { x: 5.0, y: 1.7, w: 3.3, h: 0.6, fontSize: 14, bold: true, color: THEME.accentBlue });
    slide.addText('• Webpack 5 Module Federation (`dashboard/Dashboard`)\n• 23+ Live Mandi Commodity Cards\n• 7-Day SVG Sparkline Trend Curves\n• Voice Search ("बोलकर खोजें") via Web Speech API\n• 1-Click WhatsApp Community Sharing\n• Smart Production & Profit Estimator\n• 1-Click Printable PDF / Estimate Export', {
      x: 5.0, y: 2.4, w: 3.3, h: 4.2, fontSize: 11.5, color: THEME.textDark
    });

    // Col 3: Backend & Database
    slide.addShape(pres.ShapeType.roundRect, { x: 8.8, y: 1.5, w: 3.7, h: 5.3, fill: { color: THEME.white }, line: { color: THEME.accent, width: 1.5 } });
    slide.addText('3. Backend REST API & DB\n(Port 5000)', { x: 9.0, y: 1.7, w: 3.3, h: 0.6, fontSize: 14, bold: true, color: THEME.accent });
    slide.addText('• Node.js & Express REST API (MVC Pattern)\n• Official `data.gov.in` Agmarknet Integration\n• 15-min In-Memory TTL Cache & Fallback\n• OWASP Security: Helmet.js & Rate Limiter\n• MySQL 8.0 Workbench Relational DB\n• Separate `farmers` and `traders` tables\n• Dual-Engine fallback to in-memory store', {
      x: 9.0, y: 2.4, w: 3.3, h: 4.2, fontSize: 11.5, color: THEME.textDark
    });
  }

  // ==========================================
  // SLIDE 4: TECHNICAL CHALLENGES FACED DURING DEVELOPMENT
  // ==========================================
  {
    const slide = pres.addSlide();
    addHeaderFooter(slide, 'Engineering Challenges Faced During Development', '3 / 11');

    const challenges = [
      {
        tag: 'CHALLENGE 1 (EXTERNAL API BOTTLENECK)',
        title: 'Govt API Rate Limiting (HTTP 429) & Latency',
        desc: 'The official Government Agmarknet API (data.gov.in) experiences frequent downtime, network latency (>3 seconds), and strict rate-limiting (HTTP 429 Too Many Requests), causing frontend UI freeze.'
      },
      {
        tag: 'CHALLENGE 2 (MICRO-FRONTEND ORCHESTRATION)',
        title: 'CORS & Module Federation Dependency Clashes',
        desc: 'Running Host Shell on Port 3000 and Remote Dashboard on Port 3001 caused Cross-Origin Resource Sharing (CORS) errors, duplicated React instances, and state desynchronization across federated remotes.'
      },
      {
        tag: 'CHALLENGE 3 (DATABASE NORMALIZATION CONFLICT)',
        title: 'Single Users Table Violating 3NF Normalization',
        desc: 'Initially, combining Farmers and Traders into a single `users` table created sparse null columns because farmers have land/khasra attributes while traders possess GST/APMC license attributes.'
      },
      {
        tag: 'CHALLENGE 4 (FIELD USABILITY & ACCESSIBILITY)',
        title: 'Illiteracy & Harsh Outdoor Sunlight In Khet',
        desc: 'Farmers working under bright sunlight could not read low-contrast UI screens, and typing complex Hindi commodity names on mobile keyboards was a major barrier for semi-literate users.'
      }
    ];

    challenges.forEach((ch, idx) => {
      const row = Math.floor(idx / 2);
      const col = idx % 2;
      const x = 0.8 + col * 6.0;
      const y = 1.5 + row * 2.7;

      slide.addShape(pres.ShapeType.roundRect, { x, y, w: 5.73, h: 2.4, fill: { color: 'FEF2F2' }, line: { color: THEME.danger, width: 1.5 } });
      
      slide.addText(ch.tag, { x: x + 0.2, y: y + 0.15, w: 5.3, h: 0.25, fontSize: 10, bold: true, color: THEME.danger });
      slide.addText(`⚠️ ${ch.title}`, { x: x + 0.2, y: y + 0.45, w: 5.3, h: 0.4, fontSize: 13, bold: true, color: '7F1D1D' });
      slide.addText(ch.desc, { x: x + 0.2, y: y + 0.9, w: 5.3, h: 1.4, fontSize: 11.5, color: THEME.textDark });
    });
  }

  // ==========================================
  // SLIDE 5: HOW WE SOLVED EACH CHALLENGE
  // ==========================================
  {
    const slide = pres.addSlide();
    addHeaderFooter(slide, 'Engineering Solutions: How We Solved The Challenges', '4 / 11');

    const solutions = [
      {
        num: 'SOLUTION 1',
        title: '15-Min TTL In-Memory Cache + Fallback Engine',
        desc: 'Engineered a caching proxy layer in `agmarknetGovService.js` with 15-minute Time-To-Live (TTL). Reduced API calls by 95%, cut response latency from 3000ms to <30ms, and added auto-fallback to benchmark data.'
      },
      {
        num: 'SOLUTION 2',
        title: 'Webpack 5 Shared Singletons & Dynamic CORS Proxy',
        desc: 'Configured `singleton: true, requiredVersion: "^19.2.8"` for React and ReactDOM in `webpack.config.js` to ensure single shared instance. Added dynamic Express CORS middleware allowing all origins with credentials.'
      },
      {
        num: 'SOLUTION 3',
        title: 'Schema Partitioning: Dedicated Farmers & Traders Tables',
        desc: 'Refactored database schema into two specialized tables: `farmers` (storing land area, khasra, village) and `traders` (storing firm name, mandi license, GSTIN). Restored 3NF relational integrity.'
      },
      {
        num: 'SOLUTION 4',
        title: 'Web Speech API Voice Search + Sunlight Contrast Mode',
        desc: 'Integrated browser-native `SpeechRecognition` in Hindi & English for hands-free voice search. Implemented 1-click High-Contrast Sunlight Mode with enhanced brightness & dark borders for outdoor field use.'
      }
    ];

    solutions.forEach((sol, idx) => {
      const row = Math.floor(idx / 2);
      const col = idx % 2;
      const x = 0.8 + col * 6.0;
      const y = 1.5 + row * 2.7;

      slide.addShape(pres.ShapeType.roundRect, { x, y, w: 5.73, h: 2.4, fill: { color: 'F0FDF4' }, line: { color: THEME.success, width: 1.5 } });
      
      slide.addText(sol.num, { x: x + 0.2, y: y + 0.15, w: 5.3, h: 0.25, fontSize: 10, bold: true, color: THEME.success });
      slide.addText(`✅ ${sol.title}`, { x: x + 0.2, y: y + 0.45, w: 5.3, h: 0.4, fontSize: 13, bold: true, color: '14532D' });
      slide.addText(sol.desc, { x: x + 0.2, y: y + 0.9, w: 5.3, h: 1.4, fontSize: 11.5, color: THEME.textDark });
    });
  }

  // ==========================================
  // SLIDE 6: CORE MODULES & WORKING
  // ==========================================
  {
    const slide = pres.addSlide();
    addHeaderFooter(slide, 'Key Functional Modules of GraminConnect', '5 / 11');

    const modules = [
      {
        icon: '🌾',
        title: 'Mandi Hub & Sparklines',
        desc: '23+ Real-time Mandi rates with 7-day SVG trajectory curves, 1-click WhatsApp share & voice search.'
      },
      {
        icon: '🩺',
        title: 'Kisan AI Crop Doctor',
        desc: 'Diagnoses 50+ crop diseases with Chemical & Organic remedies and Hindi voice speech output.'
      },
      {
        icon: '🌱',
        title: 'Crop Matchmaker Wizard',
        desc: 'Multi-factor plot scoring (Season, Soil, Water, Budget) ranking Top 3 optimal crops for maximum ROI.'
      },
      {
        icon: '🛒',
        title: 'Kisan Bazar (Direct Sale)',
        desc: 'Commission-free crop listing with direct 1-tap Phone Call and WhatsApp Buyer connection.'
      },
      {
        icon: '🚜',
        title: 'Machinery Rental Hub',
        desc: 'Tractor, Harvester & Laser Leveler sharing with transparent Hourly and Per-Bigha rental rates.'
      },
      {
        icon: '🏛️',
        title: 'Govt Schemes Portal',
        desc: 'Direct 1-click application form links to PM-Kisan, PMFBY Insurance, PM-Kusum Solar, and Tarbandi.'
      }
    ];

    modules.forEach((m, idx) => {
      const row = Math.floor(idx / 3);
      const col = idx % 3;
      const x = 0.8 + col * 4.0;
      const y = 1.5 + row * 2.7;

      slide.addShape(pres.ShapeType.roundRect, { x, y, w: 3.73, h: 2.4, fill: { color: THEME.white }, line: { color: THEME.cardBorder, width: 1 } });
      
      slide.addText(`${m.icon} ${m.title}`, { x: x + 0.2, y: y + 0.2, w: 3.33, h: 0.4, fontSize: 13.5, bold: true, color: THEME.primary });
      slide.addText(m.desc, { x: x + 0.2, y: y + 0.7, w: 3.33, h: 1.5, fontSize: 11.5, color: THEME.textDark });
    });
  }

  // ==========================================
  // SLIDE 7: DATABASE SCHEMA & RELATIONAL MODEL
  // ==========================================
  {
    const slide = pres.addSlide();
    addHeaderFooter(slide, 'Relational Database Design (MySQL Workbench)', '6 / 11');

    // Left Table: Farmers
    slide.addShape(pres.ShapeType.roundRect, { x: 0.8, y: 1.5, w: 5.6, h: 5.2, fill: { color: THEME.white }, line: { color: THEME.primary, width: 1.5 } });
    slide.addText('🌾 Table: `farmers` (किसान खाता)', { x: 1.0, y: 1.7, w: 5.2, h: 0.4, fontSize: 14, bold: true, color: THEME.primary });
    slide.addText([
      { text: 'Column Name\tData Type\tKey / Constraints\n', options: { bold: true, color: THEME.primaryDark } },
      { text: 'id\tINT\tPRIMARY KEY (AUTO_INC)\n' },
      { text: 'name\tVARCHAR(100)\tNOT NULL\n' },
      { text: 'phone\tVARCHAR(20)\tUNIQUE, NOT NULL\n' },
      { text: 'password_hash\tVARCHAR(255)\tNOT NULL\n' },
      { text: 'village\tVARCHAR(100)\tNOT NULL\n' },
      { text: 'district\tVARCHAR(100)\tDEFAULT "Jaipur"\n' },
      { text: 'land_area_bigha\tDECIMAL(6,2)\tDEFAULT 2.00\n' },
      { text: 'khasra_no\tVARCHAR(50)\tLand Revenue Khasra\n' },
      { text: 'created_at\tTIMESTAMP\tDEFAULT CURRENT_TIME\n' }
    ], { x: 1.0, y: 2.3, w: 5.2, h: 4.2, fontSize: 11.5, color: THEME.textDark });

    // Right Table: Traders & Marketplace
    slide.addShape(pres.ShapeType.roundRect, { x: 6.9, y: 1.5, w: 5.6, h: 5.2, fill: { color: THEME.white }, line: { color: THEME.accentBlue, width: 1.5 } });
    slide.addText('🏢 Table: `traders` & `marketplace_listings`', { x: 7.1, y: 1.7, w: 5.2, h: 0.4, fontSize: 14, bold: true, color: THEME.accentBlue });
    slide.addText([
      { text: 'Traders Table Columns:\n', options: { bold: true, color: THEME.accentBlue } },
      { text: '• id (PK), name, phone (UNIQUE), password_hash\n• firm_name, mandi_name, mandi_license_no, gst_no\n\n' },
      { text: 'Marketplace Listings Table Columns:\n', options: { bold: true, color: THEME.accent } },
      { text: '• id (PK), farmer_name, crop, variety\n• quantity_quintals, expected_price_per_q\n• village, district, phone, description, status\n\n' },
      { text: 'Equipment Rentals Table Columns:\n', options: { bold: true, color: THEME.success } },
      { text: '• id (PK), owner_name, equipment_type, category\n• rate_per_hour, rate_per_bigha, village, phone\n' }
    ], { x: 7.1, y: 2.3, w: 5.2, h: 4.2, fontSize: 11.5, color: THEME.textDark });
  }

  // ==========================================
  // SLIDE 8: HOW THIS HELPS FARMERS (FARMER IMPACT)
  // ==========================================
  {
    const slide = pres.addSlide();
    addHeaderFooter(slide, 'Real-World Impact: How GraminConnect Helps Farmers', '7 / 11');

    const benefits = [
      {
        metric: '+15% to 20%',
        title: 'Higher Price Realization',
        desc: 'Direct Kisan Bazar selling eliminates traditional mandi middlemen, passing full profit to the farmer.'
      },
      {
        metric: '30% Crop Saved',
        title: 'Crop Loss Mitigation',
        desc: 'Kisan AI Doctor identifies fungal and pest attacks early with exact chemical dosages and desi remedies.'
      },
      {
        metric: '₹8 Lakhs Saved',
        title: 'Zero Machinery CapEx',
        desc: 'Small farmers can rent modern tractors, combine harvesters, and laser levelers per hour/bigha.'
      },
      {
        metric: '100% Transparency',
        title: 'Official Govt Subsidies',
        desc: 'Direct links ensure farmers apply on authentic portals (PM-Kisan, PMFBY) without getting scammed by cyber cafes.'
      }
    ];

    benefits.forEach((b, idx) => {
      const x = 0.8 + idx * 3.0;
      slide.addShape(pres.ShapeType.roundRect, { x, y: 1.6, w: 2.75, h: 5.1, fill: { color: THEME.white }, line: { color: THEME.primary, width: 1.5 } });
      
      slide.addShape(pres.ShapeType.rect, { x, y: 1.6, w: 2.75, h: 1.1, fill: { color: THEME.primary } });
      slide.addText(b.metric, { x, y: 1.7, w: 2.75, h: 0.5, fontSize: 20, bold: true, color: 'FDE047', align: 'center' });
      slide.addText(b.title, { x, y: 2.2, w: 2.75, h: 0.4, fontSize: 11, bold: true, color: THEME.white, align: 'center' });

      slide.addText(b.desc, { x: x + 0.2, y: 3.0, w: 2.35, h: 3.4, fontSize: 12, color: THEME.textDark });
    });
  }

  // ==========================================
  // SLIDE 9: TESTING, PERFORMANCE & SECURITY
  // ==========================================
  {
    const slide = pres.addSlide();
    addHeaderFooter(slide, 'Testing, Verification & Security Validations', '8 / 11');

    const tests = [
      {
        title: '⚡ API Latency & Caching Test',
        desc: 'Verified `GET /api/data/market` with Postman/PowerShell. Initial Govt fetch took 2.8s; subsequent cached responses served in <25ms with `isLiveGov: true` badge.'
      },
      {
        title: '🔒 OWASP Security & JWT Authentication',
        desc: 'Configured HTTP-Only cookies, Helmet.js header protection, SQL parameterization (`?`), and Express rate limiting (300 requests/15 mins per IP).'
      },
      {
        title: '📱 100% Mobile Responsive Viewport',
        desc: 'Tested across Desktop (1920x1080), Tablet (768px) and Mobile (375px). Converted all grids to `clamp()` and touch horizontal scrolling.'
      },
      {
        title: '🛡️ Dual-Engine Failover Test',
        desc: 'Simulated MySQL server offline state. Backend automatically fell back to High-Speed In-Memory Mock Store with 0 downtime for live demonstrations.'
      }
    ];

    tests.forEach((t, idx) => {
      const row = Math.floor(idx / 2);
      const col = idx % 2;
      const x = 0.8 + col * 6.0;
      const y = 1.5 + row * 2.7;

      slide.addShape(pres.ShapeType.roundRect, { x, y, w: 5.73, h: 2.4, fill: { color: THEME.white }, line: { color: THEME.cardBorder, width: 1 } });
      
      slide.addText(t.title, { x: x + 0.2, y: y + 0.2, w: 5.3, h: 0.4, fontSize: 13.5, bold: true, color: THEME.accentBlue });
      slide.addText(t.desc, { x: x + 0.2, y: y + 0.7, w: 5.3, h: 1.5, fontSize: 11.5, color: THEME.textDark });
    });
  }

  // ==========================================
  // SLIDE 10: FUTURE SCOPE & ENHANCEMENTS
  // ==========================================
  {
    const slide = pres.addSlide();
    addHeaderFooter(slide, 'Future Scope & Academic Extensions', '9 / 11');

    const roadmap = [
      { num: '1', title: 'Computer Vision Leaf Disease Scanner', desc: 'Deploying a Convolutional Neural Network (CNN) deep-learning model for instant crop disease classification via smartphone camera leaf photo.' },
      { num: '2', title: 'UPI Escrow Payment Gateway', desc: 'Integrating RBI-compliant Escrow payment system holding buyer token money until crop physical delivery and quality verification.' },
      { num: '3', title: 'Satellite NDVI & Soil Radar Scan', desc: 'Integrating ISRO Bhuvan / Sentinel-2 radar data for automated regional soil moisture, vegetation index (NDVI), and drought alerts.' },
      { num: '4', title: 'Multi-Lingual Dialect Expansion', desc: 'Voice model extension for local dialects including Marwari, Bhojpuri, Gujarati, and Punjabi for pan-India rural reach.' }
    ];

    roadmap.forEach((r, idx) => {
      const y = 1.5 + idx * 1.35;
      slide.addShape(pres.ShapeType.roundRect, { x: 0.8, y, w: 11.73, h: 1.2, fill: { color: THEME.white }, line: { color: THEME.cardBorder, width: 1 } });
      
      slide.addShape(pres.ShapeType.rect, { x: 0.8, y, w: 1.1, h: 1.2, fill: { color: THEME.primary } });
      slide.addText(`Phase ${r.num}`, { x: 0.8, y: y + 0.4, w: 1.1, h: 0.4, fontSize: 13, bold: true, color: THEME.white, align: 'center' });

      slide.addText(r.title, { x: 2.1, y: y + 0.15, w: 10.2, h: 0.35, fontSize: 13.5, bold: true, color: THEME.primaryDark });
      slide.addText(r.desc, { x: 2.1, y: y + 0.5, w: 10.2, h: 0.6, fontSize: 11.5, color: THEME.textDark });
    });
  }

  // ==========================================
  // SLIDE 11: CONCLUSION & REFERENCES
  // ==========================================
  {
    const slide = pres.addSlide();
    slide.background = { color: THEME.primaryDark };

    slide.addShape(pres.ShapeType.roundRect, { x: 1.0, y: 0.8, w: 11.33, h: 5.8, fill: { color: '073632' }, line: { color: '14B8A6', width: 1.5 } });

    slide.addText('🎓 PROJECT CONCLUSION & VIVA Q&A', { x: 1.5, y: 1.1, w: 10.33, h: 0.4, fontSize: 14, color: '2DD4BF', bold: true, align: 'center' });
    slide.addText('GraminConnect successfully bridges the rural digital divide by combining Micro-Frontend Webpack 5 architecture, Real Government Agmarknet APIs, AI agronomics, and a commission-free local marketplace.', {
      x: 1.8, y: 1.6, w: 9.73, h: 0.8, fontSize: 15, color: THEME.white, align: 'center'
    });

    slide.addShape(pres.ShapeType.roundRect, { x: 1.5, y: 2.6, w: 10.33, h: 3.7, fill: { color: THEME.primary }, line: { color: '2DD4BF', width: 1 } });
    
    // Left Box: Key Achievements
    slide.addText([
      { text: '🏆 Key Technical Achievements:\n', options: { bold: true, color: 'FDE047', fontSize: 13 } },
      { text: '• 100% Micro-Frontend Decoupled Architecture\n' },
      { text: '• Real Govt API Integration with 15-min Caching\n' },
      { text: '• 3NF Normalized MySQL Relational Schema\n' },
      { text: '• Web Speech API Voice Search & Text-to-Speech\n' },
      { text: '• 100% Mobile Responsive & Field-Ready PWA\n' }
    ], { x: 1.8, y: 2.8, w: 5.0, h: 3.3, fontSize: 12, color: THEME.white });

    // Right Box: GitHub Repo & Q&A
    slide.addText([
      { text: '📂 Open-Source GitHub Repository:\n', options: { bold: true, color: 'FDE047', fontSize: 13 } },
      { text: 'https://github.com/yogeshsirohiya62-ux/GraminConnect\n\n' },
      { text: '💬 Ready for Faculty & Evaluator Questions:\n', options: { bold: true, color: 'FDE047', fontSize: 13 } },
      { text: 'Thank you for your valuable time and mentorship.\n' }
    ], { x: 6.8, y: 2.8, w: 4.8, h: 3.3, fontSize: 12, color: THEME.white });
  }

  // Save presentation
  const outputPath = path.resolve(__dirname, '../GraminConnect_College_Project_Presentation.pptx');
  await pres.writeFile({ fileName: outputPath });
  console.log(`🎉 College Project PPTX successfully generated at: ${outputPath}`);
}

createCollegeProjectPresentation().catch(err => {
  console.error("Error generating PPT:", err);
});
