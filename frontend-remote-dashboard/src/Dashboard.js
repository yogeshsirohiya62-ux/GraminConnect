import React, { useEffect, useState } from 'react';

// Comprehensive Agronomic Yield Reference Dataset (Average Yields per Bigha in Rajasthan)
const CROP_YIELD_DATA = {
  'Wheat (गेहूं - Sharbati)': { baseYield: 12, unit: 'Quintals', costPerBigha: 4500, strawMultiplier: 1.2, strawPricePerQ: 600, seedRate: '25-30 kg/Bigha', duration: '120-130 Days' },
  'Mustard (सरसों - Black 42% Oil)': { baseYield: 7.5, unit: 'Quintals', costPerBigha: 3200, strawMultiplier: 0.8, strawPricePerQ: 250, seedRate: '1.2-1.5 kg/Bigha', duration: '110-125 Days' },
  'Bajra / Pearl Millet (बाजरा)': { baseYield: 9, unit: 'Quintals', costPerBigha: 2800, strawMultiplier: 1.5, strawPricePerQ: 450, seedRate: '1.5-2.0 kg/Bigha', duration: '80-90 Days' },
  'Chickpeas / Desi Chana (चना)': { baseYield: 6, unit: 'Quintals', costPerBigha: 3000, strawMultiplier: 0.7, strawPricePerQ: 500, seedRate: '15-18 kg/Bigha', duration: '100-115 Days' },
  'Green Gram / Moong (मूंग - Shining)': { baseYield: 4, unit: 'Quintals', costPerBigha: 2500, strawMultiplier: 0.5, strawPricePerQ: 400, seedRate: '4-5 kg/Bigha', duration: '65-75 Days' },
  'Soybean (सोयाबीन - Yellow)': { baseYield: 6.5, unit: 'Quintals', costPerBigha: 3400, strawMultiplier: 0.6, strawPricePerQ: 300, seedRate: '18-20 kg/Bigha', duration: '90-100 Days' },
  'Groundnut / Moongfali (मूंगफली)': { baseYield: 9, unit: 'Quintals', costPerBigha: 5200, strawMultiplier: 1.0, strawPricePerQ: 700, seedRate: '25-30 kg/Bigha', duration: '115-125 Days' },
  'Cumin Seed / Jeera (जीरा)': { baseYield: 2.8, unit: 'Quintals', costPerBigha: 6500, strawMultiplier: 0.2, strawPricePerQ: 200, seedRate: '3-4 kg/Bigha', duration: '105-115 Days' },
  'Guar Seed (ग्वार बीज)': { baseYield: 4.5, unit: 'Quintals', costPerBigha: 2200, strawMultiplier: 0.9, strawPricePerQ: 350, seedRate: '4-5 kg/Bigha', duration: '85-95 Days' },
  'Cotton / Kapas (कपास - Medium Staple)': { baseYield: 6, unit: 'Quintals', costPerBigha: 5800, strawMultiplier: 0.4, strawPricePerQ: 200, seedRate: '1 Packet Hybrid/Bigha', duration: '150-165 Days' },
  'Isabgol / Psyllium Husk (ईसबगोल)': { baseYield: 3.0, unit: 'Quintals', costPerBigha: 3800, strawMultiplier: 0.3, strawPricePerQ: 200, seedRate: '1.5-2 kg/Bigha', duration: '110-120 Days' },
  'Fennel / Saunf (सौंफ)': { baseYield: 3.5, unit: 'Quintals', costPerBigha: 4200, strawMultiplier: 0.4, strawPricePerQ: 250, seedRate: '1.5 kg/Bigha', duration: '140-150 Days' },
  'Coriander / Dhaniya (धनिया - Green)': { baseYield: 5.0, unit: 'Quintals', costPerBigha: 3500, strawMultiplier: 0.4, strawPricePerQ: 250, seedRate: '4-5 kg/Bigha', duration: '90-100 Days' },
  'Garlic / Lahsun (लहसुन - Ooty Grade)': { baseYield: 15.0, unit: 'Quintals', costPerBigha: 12000, strawMultiplier: 0.1, strawPricePerQ: 100, seedRate: '100-120 kg/Bigha', duration: '130-145 Days' },
  'Onion / Pyaz (लाल प्याज)': { baseYield: 45.0, unit: 'Quintals', costPerBigha: 14000, strawMultiplier: 0.1, strawPricePerQ: 100, seedRate: '2.5 kg Seedlings/Bigha', duration: '110-125 Days' },
  'Barley / Jau (जौ)': { baseYield: 11, unit: 'Quintals', costPerBigha: 3800, strawMultiplier: 1.1, strawPricePerQ: 550, seedRate: '22-25 kg/Bigha', duration: '115-125 Days' },
  'Maize / Makka (मक्का - Desi)': { baseYield: 10, unit: 'Quintals', costPerBigha: 3600, strawMultiplier: 1.3, strawPricePerQ: 400, seedRate: '5-6 kg/Bigha', duration: '85-95 Days' },
  'Paddy / Basmati Dhan (धान)': { baseYield: 14, unit: 'Quintals', costPerBigha: 6000, strawMultiplier: 1.4, strawPricePerQ: 350, seedRate: '8-10 kg/Bigha', duration: '120-135 Days' }
};

// 📈 Interactive SVG Sparkline Price Trend Graph Component
const Sparkline = ({ data, isUp }) => {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const width = 110;
  const height = 30;
  const points = data
    .map((val, idx) => {
      const x = (idx / (data.length - 1)) * (width - 4) + 2;
      const y = height - 4 - ((val - min) / range) * (height - 8);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  const strokeColor = isUp ? '#16a34a' : '#dc2626';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      <svg width={width} height={height} style={{ overflow: 'visible' }}>
        <polyline
          fill="none"
          stroke={strokeColor}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
      </svg>
    </div>
  );
};

const Dashboard = ({ user }) => {
  const [marketData, setMarketData] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weatherLoading, setWeatherLoading] = useState(false);
  
  // Market Filters & Voice Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [activeTab, setActiveTab] = useState('market'); // 'market' | 'yieldPredictor' | 'weather' | 'addPrice'
  const [isListening, setIsListening] = useState(false);
  
  // Weather Location State
  const [weatherLocation, setWeatherLocation] = useState('Gurha Barsal, Rajasthan');
  const [weatherSearchInput, setWeatherSearchInput] = useState('');
  const [geoLocating, setGeoLocating] = useState(false);

  // Yield & Production Estimator State
  const [estCrop, setEstCrop] = useState('Wheat (गेहूं - Sharbati)');
  const [estArea, setEstArea] = useState(2.0);
  const [estUnit, setEstUnit] = useState('Bigha'); // 'Bigha' | 'Acre' | 'Hectare'
  const [estMethod, setEstMethod] = useState('hybrid'); // 'standard' | 'hybrid' | 'organic'
  const [estIrrigation, setEstIrrigation] = useState('full'); // 'full' | 'semi' | 'rainfed'

  // Form State for Adding Mandi Price
  const [newCommodity, setNewCommodity] = useState('');
  const [newCategory, setNewCategory] = useState('Grains');
  const [newPrice, setNewPrice] = useState('');
  const [newLocation, setNewLocation] = useState('Gurha Barsal Mandi');
  const [govSourceInfo, setGovSourceInfo] = useState('Agmarknet Directorate of Marketing & Inspection');
  const [isLiveGovFeed, setIsLiveGovFeed] = useState(false);

  const fetchMarket = async () => {
    try {
      let url = `/api/data/market?`;
      if (searchQuery) url += `search=${encodeURIComponent(searchQuery)}&`;
      if (selectedCategory !== 'All') url += `category=${encodeURIComponent(selectedCategory)}&`;
      if (selectedDistrict !== 'All') url += `district=${encodeURIComponent(selectedDistrict)}&`;

      const res = await fetch(url);
      if (res.ok) {
        const json = await res.json();
        const items = json.data ? json.data : (Array.isArray(json) ? json : []);
        setMarketData(items);
        if (json.dataSource) setGovSourceInfo(json.dataSource);
        if (json.isLiveGov !== undefined) setIsLiveGovFeed(json.isLiveGov);
      }
    } catch (err) {
      console.error("Market fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeather = async (locQuery = null, lat = null, lon = null) => {
    setWeatherLoading(true);
    try {
      let url = `/api/data/weather?`;
      if (lat && lon) {
        url += `lat=${lat}&lon=${lon}&`;
      } else {
        const target = locQuery || weatherLocation;
        url += `city=${encodeURIComponent(target)}&`;
      }

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setWeatherData(data);
        if (data.current && data.current.location) {
          setWeatherLocation(data.current.location);
        }
      }
    } catch (err) {
      console.error("Weather fetch error:", err);
    } finally {
      setWeatherLoading(false);
      setGeoLocating(false);
    }
  };

  useEffect(() => {
    fetchMarket();
  }, [searchQuery, selectedCategory, selectedDistrict]);

  useEffect(() => {
    fetchWeather('Gurha Barsal, Rajasthan');
  }, []);

  // 🎙️ Voice Search Handler (Web Speech API)
  const handleVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice search is not supported in this browser. Please use Chrome or Edge.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'hi-IN';
    recognition.start();
    setIsListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
  };

  // 📲 WhatsApp Share Mandi Bhav Handler
  const handleShareWhatsApp = (item) => {
    const text = `🌾 *GraminConnect Mandi Bhav Alert* 🌾\n*फसल:* ${item.commodity}\n*मंडी:* ${item.location} (${item.district})\n*भाव:* ₹${item.price.toLocaleString()} / Quintal\n*रेंज:* ₹${item.minPrice} - ₹${item.maxPrice}\n*ट्रेंड:* ${item.trend}\n\n📲 लाइव भाव और पैदावार कैलकुलेटर: ${window.location.origin}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  // 📄 1-Click Print Official Estimate Sheet
  const handlePrintReport = () => {
    window.print();
  };

  const handleWeatherSearch = (e) => {
    e.preventDefault();
    if (weatherSearchInput.trim()) {
      fetchWeather(weatherSearchInput);
      setWeatherSearchInput('');
    }
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    setGeoLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather(null, latitude, longitude);
      },
      (error) => {
        console.warn("Geolocation denied or error:", error);
        setGeoLocating(false);
        fetchWeather('Gurha Barsal, Rajasthan');
      },
      { timeout: 8000 }
    );
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchMarket();
  };

  const handleAddPriceSubmit = async (e) => {
    e.preventDefault();
    if (!newCommodity || !newPrice) return;

    try {
      const res = await fetch('/api/data/market', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          commodity: newCommodity,
          category: newCategory,
          price: Number(newPrice),
          location: newLocation
        })
      });

      if (res.ok) {
        setSubmitSuccess('Price reported successfully!');
        setNewCommodity('');
        setNewPrice('');
        fetchMarket();
        setTimeout(() => setSubmitSuccess(''), 4000);
      }
    } catch (err) {
      console.error("Submit price error:", err);
    }
  };

  const openYieldPredictor = (cropName) => {
    setEstCrop(cropName);
    setActiveTab('yieldPredictor');
  };

  const calculateProduction = () => {
    const cropConfig = CROP_YIELD_DATA[estCrop] || { baseYield: 10, unit: 'Quintals', costPerBigha: 4000, strawMultiplier: 1.0, strawPricePerQ: 400, seedRate: '20 kg', duration: '110 Days' };
    const matchedItem = marketData.find(m => m.commodity.toLowerCase().includes(estCrop.split('(')[0].trim().toLowerCase()) || estCrop.includes(m.commodity.split('(')[0].trim()));
    const mandiPrice = matchedItem ? matchedItem.price : 2500;
    const bighaEquiv = estUnit === 'Acre' ? estArea * 1.6 : estUnit === 'Hectare' ? estArea * 3.95 : estArea;

    const methodMult = estMethod === 'hybrid' ? 1.25 : estMethod === 'organic' ? 0.92 : 1.0;
    const priceMult = estMethod === 'organic' ? 1.30 : 1.0;
    const irrMult = estIrrigation === 'full' ? 1.0 : estIrrigation === 'semi' ? 0.75 : 0.50;

    const totalYieldQuintals = Number((cropConfig.baseYield * bighaEquiv * methodMult * irrMult).toFixed(1));
    const totalYieldKg = Math.round(totalYieldQuintals * 100);

    const minYieldQuintals = Number((totalYieldQuintals * 0.85).toFixed(1));
    const maxYieldQuintals = Number((totalYieldQuintals * 1.20).toFixed(1));
    const minYieldKg = Math.round(minYieldQuintals * 100);
    const maxYieldKg = Math.round(maxYieldQuintals * 100);

    const effectivePrice = Math.round(mandiPrice * priceMult);
    const mainCropRevenue = Math.round(totalYieldQuintals * effectivePrice);
    
    const strawYieldQuintals = Number((totalYieldQuintals * cropConfig.strawMultiplier).toFixed(1));
    const minStrawQ = Number((minYieldQuintals * cropConfig.strawMultiplier).toFixed(1));
    const maxStrawQ = Number((maxYieldQuintals * cropConfig.strawMultiplier).toFixed(1));
    const strawRevenue = Math.round(strawYieldQuintals * cropConfig.strawPricePerQ);

    const grossRevenue = mainCropRevenue + strawRevenue;
    const minGrossRevenue = Math.round(minYieldQuintals * effectivePrice + minStrawQ * cropConfig.strawPricePerQ);
    const maxGrossRevenue = Math.round(maxYieldQuintals * effectivePrice + maxStrawQ * cropConfig.strawPricePerQ);

    const totalCost = Math.round(cropConfig.costPerBigha * bighaEquiv * (estMethod === 'hybrid' ? 1.2 : 1.0));
    const netProfit = grossRevenue - totalCost;
    const minNetProfit = minGrossRevenue - totalCost;
    const maxNetProfit = maxGrossRevenue - totalCost;

    return {
      cropConfig,
      mandiPrice: effectivePrice,
      totalYieldQuintals,
      totalYieldKg,
      minYieldQuintals,
      maxYieldQuintals,
      minYieldKg,
      maxYieldKg,
      mainCropRevenue,
      strawYieldQuintals,
      minStrawQ,
      maxStrawQ,
      strawRevenue,
      grossRevenue,
      minGrossRevenue,
      maxGrossRevenue,
      totalCost,
      netProfit,
      minNetProfit,
      maxNetProfit,
      bighaEquiv
    };
  };

  const productionResult = calculateProduction();
  const categories = ['All', 'Grains', 'Oilseeds', 'Pulses', 'Cash Crops'];
  const districts = ['All', 'Jaipur', 'Kota', 'Alwar', 'Bikaner', 'Jodhpur', 'Nagaur', 'Bharatpur'];
  const popularLocations = ['Gurha Barsal, Rajasthan', 'Jaipur', 'Kota', 'Jodhpur', 'Bikaner', 'Alwar', 'Udaipur', 'Delhi', 'Lucknow', 'Indore'];

  return (
    <div>
      {/* Top Header of Remote Module */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px', borderBottom: '2px solid #f1f5f9', paddingBottom: '16px', marginBottom: '20px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '22px', color: '#0f172a' }}>🌾 Rural Intelligence Hub</h2>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#64748b' }}>
            23+ Live Mandi Bhav Commodities, Real-time Production Yield Estimator & Live Weather Stream
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '6px', background: '#f1f5f9', padding: '4px', borderRadius: '10px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setActiveTab('market')}
            style={{ padding: '8px 14px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '13px', background: activeTab === 'market' ? '#0f766e' : 'transparent', color: activeTab === 'market' ? '#ffffff' : '#475569', transition: '0.2s' }}
          >
            🌾 Mandi Rates ({marketData.length})
          </button>
          
          <button 
            onClick={() => setActiveTab('yieldPredictor')}
            style={{ padding: '8px 14px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', background: activeTab === 'yieldPredictor' ? '#0f766e' : 'transparent', color: activeTab === 'yieldPredictor' ? '#ffffff' : '#0f766e', border: activeTab === 'yieldPredictor' ? 'none' : '1px solid #99f6e4', transition: '0.2s' }}
          >
            📈 Crop Production Estimator
          </button>

          <button 
            onClick={() => setActiveTab('weather')}
            style={{ padding: '8px 14px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '13px', background: activeTab === 'weather' ? '#0f766e' : 'transparent', color: activeTab === 'weather' ? '#ffffff' : '#475569', transition: '0.2s' }}
          >
            ⛅ Live Weather & Radar
          </button>
          
          <button 
            onClick={() => setActiveTab('addPrice')}
            style={{ padding: '8px 14px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '13px', background: activeTab === 'addPrice' ? '#0f766e' : 'transparent', color: activeTab === 'addPrice' ? '#ffffff' : '#475569', transition: '0.2s' }}
          >
            ➕ Report Rate
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ padding: '60px', textAlign: 'center', color: '#64748b' }}>
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>🔄</div>
          <strong>Synchronizing live crop data with Node.js backend...</strong>
        </div>
      ) : (
        <>
          {/* TAB 1: MANDI MARKET RATES */}
          {activeTab === 'market' && (
            <div>
              {/* Quick Yield Predictor Banner */}
              <div style={{ background: 'linear-gradient(135deg, #0f766e 0%, #115e59 100%)', color: '#ffffff', borderRadius: '14px', padding: '18px 22px', marginBottom: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '14px', boxShadow: '0 4px 10px rgba(15, 118, 110, 0.15)' }}>
                <div>
                  <h3 style={{ margin: '0 0 4px', fontSize: '17px' }}>🌾 Know Your Expected Harvest & Income (फसल पैदावार एवं मुनाफा जाने)</h3>
                  <p style={{ margin: 0, fontSize: '13px', opacity: 0.9 }}>
                    Select any crop below or click our smart calculator to estimate total Quintals, Byproduct straw & net profit per Bigha.
                  </p>
                </div>
                <button 
                  onClick={() => setActiveTab('yieldPredictor')}
                  style={{ padding: '10px 18px', background: '#f59e0b', color: '#ffffff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                >
                  🚀 Open Production Calculator
                </button>
              </div>

              {/* Official Govt API Data Source Status Badge */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '8px 14px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '11px', background: '#166534', color: '#ffffff', padding: '3px 8px', borderRadius: '6px', fontWeight: 'bold' }}>
                    🏛️ GOVT OF INDIA (data.gov.in)
                  </span>
                  <span style={{ fontSize: '12px', color: '#166534', fontWeight: '600' }}>
                    Agmarknet National Agriculture Market Live Feed
                  </span>
                </div>
                <div style={{ fontSize: '11px', color: '#15803d', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }}></span>
                  <span>{govSourceInfo}</span>
                </div>
              </div>

              {/* Search, Voice Mic & Filters Bar */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', marginBottom: '20px' }}>
                <form onSubmit={handleSearchSubmit} style={{ display: 'flex', flex: '1', minWidth: '260px', gap: '8px' }}>
                  <div style={{ position: 'relative', flex: 1 }}>
                    <input 
                      type="text" 
                      placeholder="Search 23+ crops (Wheat, Mustard, Jeera, Chana, Garlic)..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{ width: '100%', padding: '10px 42px 10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                    />
                    {/* 🎙️ Voice Search Mic Button */}
                    <button
                      type="button"
                      onClick={handleVoiceSearch}
                      title="बोलकर खोजें (Voice Search)"
                      style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', background: isListening ? '#fee2e2' : 'transparent', border: 'none', borderRadius: '20px', cursor: 'pointer', padding: '4px 6px', fontSize: '16px' }}
                    >
                      {isListening ? '🔴' : '🎙️'}
                    </button>
                  </div>
                  <button type="submit" style={{ padding: '10px 18px', background: '#0f766e', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
                    Search
                  </button>
                </form>

                {/* Category Pills */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      style={{ padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '500', cursor: 'pointer', border: '1px solid #cbd5e1', background: selectedCategory === cat ? '#0f766e' : '#ffffff', color: selectedCategory === cat ? '#ffffff' : '#475569' }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* District Filter */}
                <select 
                  value={selectedDistrict} 
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', background: '#fff' }}
                >
                  <option value="All">All Districts</option>
                  {districts.filter(d => d !== 'All').map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              {/* Mandi Rates Grid with Visual 7-Day Sparkline Price Graphs */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '18px' }}>
                {marketData.length === 0 ? (
                  <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: '#64748b' }}>
                    No commodities found matching your filters.
                  </div>
                ) : (
                  marketData.map((item) => (
                    <div 
                      key={item.id} 
                      style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '18px', boxShadow: '0 2px 4px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: '0.2s' }}
                    >
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                          <div>
                            <span style={{ fontSize: '11px', background: '#f1f5f9', color: '#475569', padding: '2px 8px', borderRadius: '4px', fontWeight: '600' }}>
                              {item.category}
                            </span>
                            <h4 style={{ margin: '6px 0 0', fontSize: '16px', color: '#0f172a' }}>{item.commodity}</h4>
                          </div>
                          <span style={{ 
                            fontSize: '12px', 
                            fontWeight: 'bold', 
                            padding: '3px 8px', 
                            borderRadius: '6px', 
                            background: item.trendDirection === 'up' ? '#dcfce7' : item.trendDirection === 'down' ? '#fee2e2' : '#f1f5f9', 
                            color: item.trendDirection === 'up' ? '#166534' : item.trendDirection === 'down' ? '#991b1b' : '#475569' 
                          }}>
                            {item.trendDirection === 'up' ? '▲ ' : item.trendDirection === 'down' ? '▼ ' : '• '}{item.trend}
                          </span>
                        </div>

                        <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '12px' }}>
                          📍 <strong>{item.location}</strong> ({item.district})
                        </div>

                        {/* Price Callout & Sparkline Graph */}
                        <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', border: '1px solid #f1f5f9' }}>
                          <div>
                            <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>Modal Mandi Rate</div>
                            <div style={{ fontSize: '20px', fontWeight: '800', color: '#0f766e' }}>
                              ₹{item.price.toLocaleString()}
                            </div>
                            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>Min: ₹{item.minPrice} | Max: ₹{item.maxPrice}</div>
                          </div>

                          {/* 📈 7-Day Sparkline Curve */}
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '10px', color: '#94a3b8', marginBottom: '2px' }}>7-Day Trend</div>
                            <Sparkline data={item.history} isUp={item.trendDirection === 'up'} />
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '8px', marginBottom: '6px' }}>
                          <button
                            onClick={() => openYieldPredictor(item.commodity)}
                            style={{ padding: '8px', background: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
                          >
                            📊 Estimate Yield & Profit ➔
                          </button>

                          {/* 📲 WhatsApp Share */}
                          <button
                            onClick={() => handleShareWhatsApp(item)}
                            title="Share Mandi Rate on WhatsApp"
                            style={{ padding: '8px 12px', background: '#22c55e', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}
                          >
                            💬
                          </button>
                        </div>
                      </div>

                      <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8' }}>
                        <span>Arrivals: <strong>{item.arrivals || 'Active'}</strong></span>
                        <span>Avg Yield: <strong>{item.avgYieldPerBigha || 8} Q/Bigha</strong></span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 2: SMART CROP PRODUCTION & YIELD PREDICTOR */}
          {activeTab === 'yieldPredictor' && (
            <div>
              <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '14px', marginBottom: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '20px', color: '#0f172a' }}>
                    📊 Smart Crop Production & Profit Estimator (पैदावार एवं आय कैलकुलेटर)
                  </h3>
                  <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#64748b' }}>
                    Calculates total harvest quantity in Quintals, straw byproduct, gross market revenue, and expected net profit based on your land area and farming inputs.
                  </p>
                </div>

                {/* 📄 Printable PDF Report Button */}
                <button
                  onClick={handlePrintReport}
                  style={{ padding: '8px 16px', background: '#0284c7', color: '#ffffff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  📄 Print / PDF Estimate Report
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                
                {/* Inputs Form Box */}
                <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '14px', padding: '22px', boxShadow: '0 2px 4px rgba(0,0,0,0.03)' }}>
                  <h4 style={{ margin: '0 0 16px', color: '#0f766e', fontSize: '16px' }}>⚙️ Enter Your Farm Parameters</h4>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* Crop Selector */}
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#334155', marginBottom: '6px' }}>Select Crop (फसल चुने)</label>
                      <select 
                        value={estCrop} 
                        onChange={(e) => setEstCrop(e.target.value)}
                        style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', background: '#fff', fontWeight: '500' }}
                      >
                        {Object.keys(CROP_YIELD_DATA).map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    {/* Land Area & Unit */}
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#334155', marginBottom: '6px' }}>Land Area (खेत का रकबा)</label>
                        <input 
                          type="number" 
                          value={estArea} 
                          min="0.25"
                          step="0.5"
                          onChange={(e) => setEstArea(Number(e.target.value) || 1)}
                          style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#334155', marginBottom: '6px' }}>Unit</label>
                        <select 
                          value={estUnit} 
                          onChange={(e) => setEstUnit(e.target.value)}
                          style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', background: '#fff' }}
                        >
                          <option value="Bigha">Bigha (बीघा)</option>
                          <option value="Acre">Acre (एकड़)</option>
                          <option value="Hectare">Hectare (हेक्टेयर)</option>
                        </select>
                      </div>
                    </div>

                    {/* Farming Method */}
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#334155', marginBottom: '6px' }}>Farming Technique (कृषि तकनीक)</label>
                      <select 
                        value={estMethod} 
                        onChange={(e) => setEstMethod(e.target.value)}
                        style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', background: '#fff' }}
                      >
                        <option value="hybrid">🚀 High-Yield Hybrid Seed + Balanced NPK (+25% Yield)</option>
                        <option value="standard">🚜 Standard / Traditional Local Practice (Baseline)</option>
                        <option value="organic">🌿 Organic Farming / ZBNF (+30% Organic Mandi Price)</option>
                      </select>
                    </div>

                    {/* Irrigation Availability */}
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#334155', marginBottom: '6px' }}>Water / Irrigation Facility (सिंचाई व्यवस्था)</label>
                      <select 
                        value={estIrrigation} 
                        onChange={(e) => setEstIrrigation(e.target.value)}
                        style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', background: '#fff' }}
                      >
                        <option value="full">💧 Full Irrigation (Tube-well / Canal - 100% Potential)</option>
                        <option value="semi">⛅ Semi-Irrigated (2-3 Waterings - 75% Potential)</option>
                        <option value="rainfed">🏜️ Rainfed / Barani (Monsoon Dependent - 50% Potential)</option>
                      </select>
                    </div>

                    {/* Agronomy Quick Info */}
                    <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', fontSize: '12px', color: '#475569' }}>
                      <div>🌱 <strong>Recommended Seed Rate:</strong> {productionResult.cropConfig.seedRate}</div>
                      <div style={{ marginTop: '4px' }}>⏱️ <strong>Maturity Duration:</strong> {productionResult.cropConfig.duration}</div>
                    </div>

                  </div>
                </div>

                {/* Calculation Output Box */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  
                  {/* Total Harvest Output Card with Min/Max Range */}
                  <div style={{ background: 'linear-gradient(135deg, #0f766e 0%, #115e59 100%)', color: '#ffffff', borderRadius: '14px', padding: '22px', boxShadow: '0 4px 12px rgba(15, 118, 110, 0.2)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', background: 'rgba(255,255,255,0.2)', padding: '4px 10px', borderRadius: '16px', fontWeight: 'bold' }}>
                        🌾 ESTIMATED HARVEST PRODUCTION RANGE
                      </span>
                      <span style={{ fontSize: '11px', background: '#f59e0b', color: '#fff', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold' }}>
                        MIN — MAX
                      </span>
                    </div>

                    <div style={{ margin: '14px 0 6px' }}>
                      <div style={{ fontSize: '13px', opacity: 0.9 }}>Expected Production Span:</div>
                      <h2 style={{ fontSize: '32px', margin: '4px 0', fontWeight: '800', letterSpacing: '-0.5px' }}>
                        {productionResult.minYieldQuintals} — {productionResult.maxYieldQuintals} <span style={{ fontSize: '20px', fontWeight: '500' }}>Quintals</span>
                      </h2>
                      <div style={{ fontSize: '14px', opacity: 0.95 }}>
                        ({productionResult.minYieldKg.toLocaleString()} kg to {productionResult.maxYieldKg.toLocaleString()} kg)
                      </div>
                    </div>

                    {/* Visual Yield Range Indicator */}
                    <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '10px', padding: '10px 14px', marginTop: '14px', backdropFilter: 'blur(4px)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                        <span>📉 Min: <strong>{productionResult.minYieldQuintals} Q</strong></span>
                        <span>⭐ Avg Expected: <strong>~{productionResult.totalYieldQuintals} Q</strong></span>
                        <span>🚀 Max Bumper: <strong>{productionResult.maxYieldQuintals} Q</strong></span>
                      </div>
                      <div style={{ height: '6px', background: 'rgba(255,255,255,0.25)', borderRadius: '3px', position: 'relative' }}>
                        <div style={{ position: 'absolute', left: '10%', right: '10%', height: '100%', background: '#34d399', borderRadius: '3px' }}></div>
                      </div>
                    </div>

                    <div style={{ marginTop: '12px', fontSize: '12px', opacity: 0.85 }}>
                      📍 For <strong>{estArea} {estUnit}</strong> ({productionResult.bighaEquiv.toFixed(1)} Bigha equiv) at prevailing Mandi rate: <strong>₹{productionResult.mandiPrice}/Q</strong>
                    </div>
                  </div>

                  {/* Financial Breakdown Card with Revenue & Profit Ranges */}
                  <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                    <h4 style={{ margin: '0 0 14px', fontSize: '16px', color: '#0f172a' }}>💰 Financial Estimates & Profit Range</h4>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                        <span style={{ color: '#64748b' }}>Main Crop Revenue Range:</span>
                        <strong style={{ color: '#0f172a' }}>
                          ₹{Math.round(productionResult.minYieldQuintals * productionResult.mandiPrice).toLocaleString()} — ₹{Math.round(productionResult.maxYieldQuintals * productionResult.mandiPrice).toLocaleString()}
                        </strong>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                        <span style={{ color: '#64748b' }}>Straw / By-product ({productionResult.minStrawQ} to {productionResult.maxStrawQ} Q):</span>
                        <strong style={{ color: '#0f172a' }}>
                          + ₹{Math.round(productionResult.minStrawQ * productionResult.cropConfig.strawPricePerQ).toLocaleString()} — ₹{Math.round(productionResult.maxStrawQ * productionResult.cropConfig.strawPricePerQ).toLocaleString()}
                        </strong>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', borderTop: '1px dashed #cbd5e1', paddingTop: '8px' }}>
                        <span style={{ color: '#64748b', fontWeight: 'bold' }}>Gross Revenue Range (कुल आय सीमा):</span>
                        <strong style={{ color: '#0f766e', fontSize: '15px' }}>
                          ₹{productionResult.minGrossRevenue.toLocaleString()} — ₹{productionResult.maxGrossRevenue.toLocaleString()}
                        </strong>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#ef4444' }}>
                        <span>Cultivation Cost (लागत खर्च):</span>
                        <strong>- ₹{productionResult.totalCost.toLocaleString()}</strong>
                      </div>

                      {/* Net Profit Range Box */}
                      <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '10px', padding: '14px', marginTop: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontSize: '12px', color: '#166534', fontWeight: 'bold', textTransform: 'uppercase' }}>Estimated Net Profit Range (शुद्ध मुनाफा)</div>
                          <div style={{ fontSize: '11px', color: '#15803d' }}>Average expected: ~₹{productionResult.netProfit.toLocaleString()}</div>
                        </div>
                        <div style={{ fontSize: '20px', fontWeight: '800', color: '#166534', textAlign: 'right' }}>
                          ₹{productionResult.minNetProfit.toLocaleString()} — ₹{productionResult.maxNetProfit.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* TAB 3: LIVE WEATHER & AGRO ADVISORY (Google Weather API Integrated) */}
          {activeTab === 'weather' && (
            <div>
              {/* Dynamic Location Search Bar & Quick Switcher */}
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '18px', marginBottom: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', marginBottom: '14px' }}>
                  <form onSubmit={handleWeatherSearch} style={{ display: 'flex', flex: '1', minWidth: '260px', gap: '8px' }}>
                    <input 
                      type="text" 
                      placeholder="Search any village/city (e.g., Jaipur, Kota, Jodhpur, Delhi)..." 
                      value={weatherSearchInput}
                      onChange={(e) => setWeatherSearchInput(e.target.value)}
                      style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                    />
                    <button 
                      type="submit" 
                      disabled={weatherLoading}
                      style={{ padding: '10px 18px', background: '#0284c7', color: '#ffffff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      {weatherLoading ? 'Updating...' : 'Search Weather'}
                    </button>
                  </form>

                  {/* Auto-detect Location Button */}
                  <button 
                    onClick={handleUseCurrentLocation}
                    disabled={geoLocating || weatherLoading}
                    style={{ padding: '10px 16px', background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    📍 {geoLocating ? 'Detecting GPS...' : 'Detect My Live Location'}
                  </button>
                </div>

                {/* Popular Location Chips */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#64748b' }}>Quick Select:</span>
                  {popularLocations.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => fetchWeather(loc)}
                      style={{ padding: '4px 10px', borderRadius: '16px', fontSize: '12px', cursor: 'pointer', border: '1px solid #e2e8f0', background: weatherLocation.includes(loc.split(',')[0]) ? '#0284c7' : '#f8fafc', color: weatherLocation.includes(loc.split(',')[0]) ? '#ffffff' : '#475569', fontWeight: '500' }}
                    >
                      {loc.split(',')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {weatherLoading ? (
                <div style={{ padding: '60px', textAlign: 'center', color: '#0284c7' }}>
                  <div style={{ fontSize: '36px', marginBottom: '12px' }}>🛰️</div>
                  <strong>Connecting to Live Meteorological Satellite & Radar Stream...</strong>
                </div>
              ) : weatherData ? (
                <>
                  {/* Current Weather Card */}
                  <div style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', borderRadius: '16px', padding: '24px', marginBottom: '24px', boxShadow: '0 4px 14px rgba(2, 132, 199, 0.25)' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                          <span style={{ fontSize: '13px', background: 'rgba(255,255,255,0.25)', padding: '4px 12px', borderRadius: '20px', fontWeight: '600' }}>
                            📍 {weatherData.current.location}
                          </span>
                          <span style={{ fontSize: '11px', background: '#22c55e', color: '#fff', padding: '3px 8px', borderRadius: '12px', fontWeight: 'bold' }}>
                            ● LIVE SATELLITE
                          </span>
                        </div>
                        <h2 style={{ fontSize: '48px', margin: '8px 0 4px', fontWeight: '800' }}>
                          {weatherData.current.temperature}°C
                        </h2>
                        <p style={{ margin: 0, fontSize: '16px', opacity: 0.95, fontWeight: '500' }}>
                          {weatherData.current.icon} {weatherData.current.condition} • Feels like {weatherData.current.feelsLike}°C
                        </p>
                      </div>

                      {/* Weather Metrics Grid */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', background: 'rgba(255,255,255,0.15)', padding: '16px 20px', borderRadius: '14px', backdropFilter: 'blur(4px)' }}>
                        <div>
                          <div style={{ fontSize: '12px', opacity: 0.85 }}>Relative Humidity</div>
                          <div style={{ fontSize: '17px', fontWeight: 'bold' }}>{weatherData.current.humidity}%</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '12px', opacity: 0.85 }}>Wind Speed</div>
                          <div style={{ fontSize: '17px', fontWeight: 'bold' }}>{weatherData.current.windSpeed}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '12px', opacity: 0.85 }}>Precipitation Chance</div>
                          <div style={{ fontSize: '17px', fontWeight: 'bold' }}>{weatherData.current.rainProbability}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '12px', opacity: 0.85 }}>Soil Moisture State</div>
                          <div style={{ fontSize: '17px', fontWeight: 'bold' }}>{weatherData.current.soilMoisture}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 5-Day Forecast Grid */}
                  <h3 style={{ fontSize: '18px', color: '#1e293b', marginBottom: '14px' }}>📅 5-Day Meteorological Forecast</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '24px' }}>
                    {weatherData.forecast.map((f, idx) => (
                      <div key={idx} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', textAlign: 'center', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
                        <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#334155', marginBottom: '6px' }}>{f.day}</div>
                        <div style={{ fontSize: '28px', margin: '6px 0' }}>{f.icon}</div>
                        <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#0f172a' }}>{f.temp}</div>
                        <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{f.condition}</div>
                        <div style={{ fontSize: '11px', color: '#0284c7', marginTop: '6px', fontWeight: 'bold' }}>💧 Rain: {f.rain}</div>
                      </div>
                    ))}
                  </div>

                  {/* Location-Specific Intelligent Agro Advisories */}
                  <h3 style={{ fontSize: '18px', color: '#1e293b', marginBottom: '14px' }}>💡 Localized Farming Advisories for {weatherData.current.location.split(',')[0]}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {weatherData.advisories.map((adv) => (
                      <div 
                        key={adv.id}
                        style={{ 
                          padding: '16px', 
                          borderRadius: '12px', 
                          borderLeft: '5px solid',
                          borderColor: adv.severity === 'alert' ? '#ef4444' : adv.severity === 'warning' ? '#f59e0b' : '#0284c7',
                          background: adv.severity === 'alert' ? '#fef2f2' : adv.severity === 'warning' ? '#fffbeb' : '#f0f9ff',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
                        }}
                      >
                        <h4 style={{ margin: '0 0 6px', color: '#1e293b', fontSize: '15px' }}>{adv.title}</h4>
                        <p style={{ margin: 0, fontSize: '13px', color: '#475569', lineHeight: '1.5' }}>{adv.text}</p>
                      </div>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
          )}

          {/* TAB 4: ADD NEW MANDI RATE */}
          {activeTab === 'addPrice' && (
            <div style={{ maxWidth: '600px', margin: '0 auto', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '28px', boxShadow: '0 2px 4px rgba(0,0,0,0.03)' }}>
              <h3 style={{ margin: '0 0 8px', fontSize: '18px', color: '#0f172a' }}>➕ Report Mandi Rate</h3>
              <p style={{ margin: '0 0 20px', fontSize: '13px', color: '#64748b' }}>
                Empower local farmers by contributing current mandi transaction prices from your district.
              </p>

              {submitSuccess && (
                <div style={{ background: '#dcfce7', color: '#166534', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px', fontWeight: 'bold' }}>
                  ✓ {submitSuccess}
                </div>
              )}

              <form onSubmit={handleAddPriceSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#334155', marginBottom: '6px' }}>Commodity / Crop Name *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Barley / Jau" 
                    value={newCommodity} 
                    onChange={(e) => setNewCommodity(e.target.value)}
                    required
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#334155', marginBottom: '6px' }}>Category *</label>
                    <select 
                      value={newCategory} 
                      onChange={(e) => setNewCategory(e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', background: '#fff' }}
                    >
                      <option value="Grains">Grains (अनाज)</option>
                      <option value="Oilseeds">Oilseeds (तिलहन)</option>
                      <option value="Pulses">Pulses (दालें)</option>
                      <option value="Cash Crops">Cash Crops (नकदी फसल)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#334155', marginBottom: '6px' }}>Modal Price (₹/Quintal) *</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 2450" 
                      value={newPrice} 
                      onChange={(e) => setNewPrice(e.target.value)}
                      required
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#334155', marginBottom: '6px' }}>Mandi / Location Name *</label>
                  <input 
                    type="text" 
                    value={newLocation} 
                    onChange={(e) => setNewLocation(e.target.value)}
                    required
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                  />
                </div>

                <button 
                  type="submit" 
                  style={{ marginTop: '8px', padding: '12px', background: '#0f766e', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}
                >
                  🚀 Publish Mandi Rate
                </button>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
