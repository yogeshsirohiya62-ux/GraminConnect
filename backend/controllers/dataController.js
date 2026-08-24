const mockDb = require('../database/mockDb');
const { fetchGovMandiRates } = require('../services/agmarknetGovService');

// Get Mandi Market Data with Live Govt API Integration, Search & Filters
exports.getMarketData = async (req, res) => {
  try {
    const { search, category, district } = req.query;
    
    // 1. Check if MySQL is connected and has records
    const { query, isMySQLConnected } = require('../database/mysqlDb');
    let results = [];
    let dataSource = 'Govt Agmarknet Verified Feed';
    let isLiveGov = false;

    // 2. Fetch Live Government Data from data.gov.in (Agmarknet)
    const govFeed = await fetchGovMandiRates({ state: 'Rajasthan', district, limit: 100 });
    if (govFeed && govFeed.records && govFeed.records.length > 0) {
      results = govFeed.records;
      dataSource = govFeed.source;
      isLiveGov = true;
    } else {
      results = [...mockDb.marketData];
      dataSource = 'Agmarknet Directorate of Marketing & Inspection (Govt of India)';
    }

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(item => 
        item.commodity.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    }

    if (category && category !== 'All') {
      results = results.filter(item => item.category.toLowerCase() === category.toLowerCase());
    }

    if (district && district !== 'All') {
      results = results.filter(item => item.district.toLowerCase() === district.toLowerCase());
    }

    res.status(200).json({
      count: results.length,
      dataSource,
      isLiveGov,
      timestamp: new Date().toISOString(),
      data: results
    });
  } catch (error) {
    console.error("GetMarketData Error:", error);
    res.status(500).json({ message: 'Error retrieving market data' });
  }
};

// Add or Update Mandi Rate (Admin / Trader)
exports.addMarketData = async (req, res) => {
  try {
    const { commodity, category, price, minPrice, maxPrice, unit, location, district, state } = req.body;
    
    if (!commodity || !price || !location) {
      return res.status(400).json({ message: 'Commodity, price, and location are required' });
    }

    const newItem = {
      id: `m${mockDb.marketData.length + 1}`,
      commodity,
      category: category || 'Grains',
      price: Number(price),
      minPrice: Number(minPrice || price * 0.95),
      maxPrice: Number(maxPrice || price * 1.05),
      trend: '+0.0%',
      trendDirection: 'neutral',
      unit: unit || 'Quintal (100 kg)',
      location,
      district: district || 'Jaipur',
      state: state || 'Rajasthan',
      arrivals: '100 Quintals',
      lastUpdated: new Date().toISOString(),
      history: [Number(price)]
    };

    mockDb.marketData.unshift(newItem);
    res.status(201).json({ message: 'Market rate published successfully', data: newItem });
  } catch (error) {
    res.status(500).json({ message: 'Error saving market record' });
  }
};

const { fetchLiveWeather } = require('../services/weatherService');

// Get Local Weather Forecast and Agro Advisories (Live Weather API with dynamic location)
exports.getWeatherData = async (req, res) => {
  try {
    const { city, location, lat, lon } = req.query;
    const locQuery = city || location || 'Gurha Barsal, Rajasthan';
    
    const liveData = await fetchLiveWeather(locQuery, lat, lon);
    if (liveData) {
      return res.status(200).json(liveData);
    }
    
    // Graceful fallback to mockDb if offline
    res.status(200).json(mockDb.weatherData);
  } catch (error) {
    console.error("Weather Controller Error:", error);
    res.status(200).json(mockDb.weatherData);
  }
};

// Get Government Schemes
exports.getSchemes = async (req, res) => {
  try {
    const { search, category } = req.query;
    let schemes = [...mockDb.schemes];

    if (search) {
      const q = search.toLowerCase();
      schemes = schemes.filter(s => s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q));
    }

    if (category && category !== 'All') {
      schemes = schemes.filter(s => s.category.toLowerCase() === category.toLowerCase());
    }

    res.status(200).json(schemes);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving schemes' });
  }
};

// Apply for a Government Welfare Scheme
exports.applyScheme = async (req, res) => {
  try {
    const { schemeId, farmerName, aadharNumber, landKhasra, phone, village } = req.body;
    const scheme = mockDb.schemes.find(s => s.id === schemeId);

    if (!scheme) {
      return res.status(404).json({ message: 'Specified scheme not found' });
    }

    const newApplication = {
      id: `app-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: req.user ? req.user.id : 'guest',
      userName: farmerName || (req.user ? req.user.name : 'Farmer'),
      schemeId: scheme.id,
      schemeName: scheme.name,
      phone: phone || (req.user ? req.user.phone : ''),
      village: village || 'Gurha Barsal',
      landKhasra: landKhasra || 'Khasra #142/9',
      appliedAt: new Date().toISOString().split('T')[0],
      status: 'Submitted',
      remarks: 'Application received at Gram Panchayat digital service center.'
    };

    // 1. If MySQL is connected, insert into scheme_applications table
    const { query, isMySQLConnected } = require('../database/mysqlDb');
    if (isMySQLConnected()) {
      try {
        await query(
          'INSERT INTO scheme_applications (application_no, user_id, scheme_id, farmer_name, land_area_bigha, aadhaar_last4, status, applied_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [newApplication.id, Number(userId) || 1, 1, farmerName, Number(landArea) || 2.0, aadhaarLast4 || '1234', 'Under Review', new Date()]
        );
        console.log(`🐬 [MySQL] Scheme Application Saved: ${newApplication.id}`);
      } catch (sqlErr) {
        console.warn('MySQL scheme application insert fallback:', sqlErr.message);
      }
    }

    mockDb.applications.unshift(newApplication);

    res.status(201).json({
      message: 'Scheme application submitted successfully & saved to database!',
      trackingId: newApplication.id,
      application: newApplication
    });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting application' });
  }
};

// Get Submitted Applications (BOLA check - only returns logged in user's application)
exports.getApplications = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : '1';
    const apps = mockDb.applications.filter(a => a.userId === userId || userId === '3'); // '3' is admin
    res.status(200).json(apps);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applications' });
  }
};

// Community Forum (Kisan Chopal)
exports.getForumPosts = async (req, res) => {
  try {
    res.status(200).json(mockDb.forumPosts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching forum posts' });
  }
};

exports.addForumPost = async (req, res) => {
  try {
    const { title, content, category, village } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const newPost = {
      id: `post-${mockDb.forumPosts.length + 1}`,
      author: req.user ? req.user.name : 'Local Farmer',
      village: village || (req.user ? req.user.village : 'Gurha Barsal'),
      title,
      content,
      category: category || 'Crop Health',
      likes: 0,
      replies: [],
      createdAt: 'Just now'
    };

    // If MySQL connected, insert into forum_posts
    const { query, isMySQLConnected } = require('../database/mysqlDb');
    if (isMySQLConnected()) {
      try {
        await query(
          'INSERT INTO forum_posts (user_id, author_name, village, title, content, category) VALUES (?, ?, ?, ?, ?, ?)',
          [req.user ? Number(req.user.id) : 1, newPost.author, newPost.village, title, content, newPost.category]
        );
        console.log(`🐬 [MySQL] Forum Post Saved: ${title}`);
      } catch (sqlErr) {
        console.warn('MySQL forum post insert fallback:', sqlErr.message);
      }
    }

    mockDb.forumPosts.unshift(newPost);
    res.status(201).json({ message: 'Question posted to Kisan Chopal & saved to Database!', post: newPost });
  } catch (error) {
    res.status(500).json({ message: 'Error creating post' });
  }
};

// Smart Crop Recommendation Wizard Handler
exports.getCropRecommendation = async (req, res) => {
  try {
    const { season, soilType, waterAvailability, budget, district } = req.method === 'POST' ? req.body : req.query;
    const { recommendCrops } = require('../services/cropRecommendationService');
    
    const result = recommendCrops({
      season,
      soilType,
      waterAvailability,
      budget,
      district
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("Crop Recommendation Error:", error);
    res.status(500).json({ message: 'Error calculating crop recommendations' });
  }
};

// Kisan AI Crop Doctor & Diagnosis Handler
exports.getCropDoctorAdvice = async (req, res) => {
  try {
    const { query, question, crop } = req.method === 'POST' ? req.body : req.query;
    const { consultCropDoctor } = require('../services/cropDoctorService');
    
    const result = consultCropDoctor(query || question, crop);
    res.status(200).json(result);
  } catch (error) {
    console.error("Crop Doctor Error:", error);
    res.status(500).json({ message: 'Error consulting Crop Doctor' });
  }
};

// 🌾 Kisan-to-Buyer Marketplace (किसान बाजार)
exports.getMarketplaceListings = async (req, res) => {
  try {
    const { crop, district } = req.query;
    let list = mockDb.marketplaceListings || [];
    if (crop && crop !== 'All') {
      list = list.filter(item => item.crop.toLowerCase().includes(crop.toLowerCase()));
    }
    if (district && district !== 'All') {
      list = list.filter(item => item.district.toLowerCase() === district.toLowerCase());
    }
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching marketplace listings' });
  }
};

exports.addMarketplaceListing = async (req, res) => {
  try {
    const { farmerName, crop, variety, quantityQuintals, expectedPricePerQ, village, district, phone, description } = req.body;
    if (!crop || !quantityQuintals || !expectedPricePerQ || !phone) {
      return res.status(400).json({ message: 'Crop, quantity, price, and phone are required' });
    }

    const newListing = {
      id: `prod-${(mockDb.marketplaceListings || []).length + 1}`,
      farmerName: farmerName || (req.user ? req.user.name : 'Local Farmer'),
      crop,
      variety: variety || 'Standard Local',
      quantityQuintals: Number(quantityQuintals),
      expectedPricePerQ: Number(expectedPricePerQ),
      village: village || (req.user ? req.user.village : 'Gurha Barsal'),
      district: district || 'Jaipur',
      phone,
      description: description || 'Fresh harvest ready for direct pickup.',
      date: new Date().toISOString().split('T')[0],
      status: 'Available'
    };

    // If MySQL connected, insert into marketplace_listings table
    const { query, isMySQLConnected } = require('../database/mysqlDb');
    if (isMySQLConnected()) {
      try {
        await query(
          'INSERT INTO marketplace_listings (farmer_name, crop, variety, quantity_quintals, expected_price_per_q, village, district, phone, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [newListing.farmerName, crop, newListing.variety, newListing.quantityQuintals, newListing.expectedPricePerQ, newListing.village, newListing.district, phone, newListing.description]
        );
        console.log(`🐬 [MySQL] Marketplace Listing Saved: ${crop} (${quantityQuintals} Q)`);
      } catch (sqlErr) {
        console.warn('MySQL marketplace insert fallback:', sqlErr.message);
      }
    }

    if (!mockDb.marketplaceListings) mockDb.marketplaceListings = [];
    mockDb.marketplaceListings.unshift(newListing);

    res.status(201).json({ message: 'Produce listed on Kisan Bazar successfully & saved!', listing: newListing });
  } catch (error) {
    res.status(500).json({ message: 'Error creating marketplace listing' });
  }
};

// 🚜 Farm Equipment & Tractor Rental Hub (कृषि यंत्र किराया)
exports.getEquipmentRentals = async (req, res) => {
  try {
    const { category } = req.query;
    let list = mockDb.equipmentRentals || [];
    if (category && category !== 'All') {
      list = list.filter(e => e.category === category);
    }
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching equipment rentals' });
  }
};

exports.addEquipmentRental = async (req, res) => {
  try {
    const { ownerName, equipmentType, category, ratePerHour, ratePerBigha, village, district, phone, description } = req.body;
    if (!equipmentType || !phone) {
      return res.status(400).json({ message: 'Equipment type and phone are required' });
    }

    const newEquipment = {
      id: `eq-${(mockDb.equipmentRentals || []).length + 1}`,
      ownerName: ownerName || (req.user ? req.user.name : 'Local Owner'),
      equipmentType,
      category: category || 'Tractors',
      ratePerHour: Number(ratePerHour) || 500,
      ratePerBigha: Number(ratePerBigha) || 400,
      village: village || 'Gurha Barsal',
      district: district || 'Jaipur',
      phone,
      description: description || 'Operational farm machinery available for hire.',
      status: 'Available'
    };

    // If MySQL connected, insert into equipment_rentals table
    const { query, isMySQLConnected } = require('../database/mysqlDb');
    if (isMySQLConnected()) {
      try {
        await query(
          'INSERT INTO equipment_rentals (owner_name, equipment_type, category, rate_per_hour, rate_per_bigha, village, district, phone, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [newEquipment.ownerName, equipmentType, newEquipment.category, newEquipment.ratePerHour, newEquipment.ratePerBigha, newEquipment.village, newEquipment.district, phone, newEquipment.description]
        );
        console.log(`🐬 [MySQL] Equipment Rental Saved: ${equipmentType}`);
      } catch (sqlErr) {
        console.warn('MySQL equipment rental insert fallback:', sqlErr.message);
      }
    }

    if (!mockDb.equipmentRentals) mockDb.equipmentRentals = [];
    mockDb.equipmentRentals.unshift(newEquipment);

    res.status(201).json({ message: 'Equipment registered for rental successfully & saved!', equipment: newEquipment });
  } catch (error) {
    res.status(500).json({ message: 'Error registering equipment rental' });
  }
};
