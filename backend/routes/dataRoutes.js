const express = require('express');
const router = express.Router();
const { 
  getMarketData, 
  addMarketData, 
  getWeatherData, 
  getSchemes, 
  applyScheme, 
  getApplications,
  getForumPosts,
  addForumPost,
  getCropRecommendation,
  getCropDoctorAdvice,
  getMarketplaceListings,
  addMarketplaceListing,
  getEquipmentRentals,
  addEquipmentRental
} = require('../controllers/dataController');
const { protect } = require('../middleware/authMiddleware');

// Public Data Endpoints (PWA Cacheable)
router.get('/market', getMarketData);
router.get('/weather', getWeatherData);
router.get('/schemes', getSchemes);
router.get('/forum', getForumPosts);

// Smart Crop Matchmaker & AI Doctor
router.get('/crop-recommend', getCropRecommendation);
router.post('/crop-recommend', getCropRecommendation);
router.get('/crop-doctor', getCropDoctorAdvice);
router.post('/crop-doctor', getCropDoctorAdvice);

// 🌾 Kisan Marketplace
router.get('/marketplace', getMarketplaceListings);
router.post('/marketplace', addMarketplaceListing);

// 🚜 Equipment Rentals
router.get('/rentals', getEquipmentRentals);
router.post('/rentals', addEquipmentRental);

// Protected or Interactive Endpoints
router.post('/market', addMarketData);
router.post('/schemes/apply', applyScheme);
router.get('/applications', getApplications);
router.post('/forum', addForumPost);

module.exports = router;
