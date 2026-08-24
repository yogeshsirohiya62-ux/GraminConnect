import React, { useState, useEffect } from 'react';

const CropMatchmakerView = ({ onSelectCropForCalculator }) => {
  const [season, setSeason] = useState('rabi');
  const [soilType, setSoilType] = useState('loamy');
  const [waterAvailability, setWaterAvailability] = useState('semi');
  const [budget, setBudget] = useState('low');
  const [district, setDistrict] = useState('Jaipur');
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/data/crop-recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ season, soilType, waterAvailability, budget, district })
      });

      if (res.ok) {
        const data = await res.json();
        setRecommendations(data);
      }
    } catch (err) {
      console.error("Matchmaker fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const handleRecommendSubmit = (e) => {
    e.preventDefault();
    fetchRecommendations();
  };

  const districtsList = ['Jaipur', 'Kota', 'Jodhpur', 'Bikaner', 'Alwar', 'Ganganagar', 'Nagaur', 'Bharatpur', 'Pali', 'Barmer', 'Udaipur'];

  return (
    <div>
      {/* Header */}
      <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '16px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '28px' }}>🌱</span>
          <h2 style={{ margin: 0, fontSize: '22px', color: '#0f172a' }}>Smart Crop Matchmaker (खेत अनुसार सर्वोत्तम फसल चयन)</h2>
        </div>
        <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#64748b' }}>
          Tell us about your soil, water availability, and budget — our agronomic engine finds the top 3 highest profit crops for your specific field.
        </p>
      </div>

      {/* Main Parameters Wizard Form */}
      <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '16px', padding: '24px', marginBottom: '24px', boxShadow: '0 2px 4px rgba(0,0,0,0.03)' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', color: '#0f766e' }}>
          🌾 Select Your Field Conditions (अपने खेत की जानकारी भरें)
        </h3>

        <form onSubmit={handleRecommendSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', alignItems: 'end' }}>
          
          {/* Season */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#334155', marginBottom: '6px' }}>1. Season (मौसम / ऋतु)</label>
            <select 
              value={season} 
              onChange={(e) => setSeason(e.target.value)}
              style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', background: '#fff' }}
            >
              <option value="rabi">❄️ Rabi (रबी / सर्दियों की फसल - गेहूं, सरसों, चना)</option>
              <option value="kharif">🌧️ Kharif (खरीफ / मॉनसून की फसल - बाजरा, मूंगफली, मूंग)</option>
              <option value="zaid">☀️ Zaid (जायद / गर्मी की फसल - तरबूज, मूंग, सब्जियां)</option>
            </select>
          </div>

          {/* Soil Type */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#334155', marginBottom: '6px' }}>2. Soil Type (खेत की मिट्टी)</label>
            <select 
              value={soilType} 
              onChange={(e) => setSoilType(e.target.value)}
              style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', background: '#fff' }}
            >
              <option value="loamy">🌾 Loamy Soil / Domat (दोमट / उपजाऊ मिट्टी)</option>
              <option value="sandy">🏜️ Sandy / Balui (बलुई / रेतीली मिट्टी)</option>
              <option value="clay">🌱 Clay / Black Soil (काली / चिकनी मिट्टी)</option>
              <option value="red">🧱 Red Soil (लाल मिट्टी)</option>
            </select>
          </div>

          {/* Water Availability */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#334155', marginBottom: '6px' }}>3. Water Availability (पानी की सुविधा)</label>
            <select 
              value={waterAvailability} 
              onChange={(e) => setWaterAvailability(e.target.value)}
              style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', background: '#fff' }}
            >
              <option value="semi">⛅ Limited Water (2-3 सिंचाई उपलब्ध - सरसों/चना)</option>
              <option value="full">💧 Full Irrigation (ट्यूबवेल/नहर - गेहूं/लहसुन/कपास)</option>
              <option value="rainfed">🏜️ Rainfed / Barani (सिर्फ बारिश का पानी - बाजरा/ग्वार/ईसबगोल)</option>
            </select>
          </div>

          {/* Budget / Investment */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#334155', marginBottom: '6px' }}>4. Budget Level (लागत क्षमता)</label>
            <select 
              value={budget} 
              onChange={(e) => setBudget(e.target.value)}
              style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', background: '#fff' }}
            >
              <option value="low">💰 Low Budget (कम खर्च: ₹2,000 - ₹3,500/बीघा)</option>
              <option value="medium">💰 Medium Budget (मध्यम: ₹4,000 - ₹6,000/बीघा)</option>
              <option value="high">💰 High Cash Commercial (अधिक: ₹8,000+/बीघा)</option>
            </select>
          </div>

          {/* District */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#334155', marginBottom: '6px' }}>5. District (जिला)</label>
            <select 
              value={district} 
              onChange={(e) => setDistrict(e.target.value)}
              style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', background: '#fff' }}
            >
              {districtsList.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div>
            <button 
              type="submit" 
              disabled={loading}
              style={{ width: '100%', padding: '12px', background: '#0f766e', color: '#ffffff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}
            >
              {loading ? 'Analyzing Soils...' : '🔍 Find Best Crops'}
            </button>
          </div>

        </form>
      </div>

      {/* Recommendations Cards Results */}
      {loading ? (
        <div style={{ padding: '60px', textAlign: 'center', color: '#0f766e' }}>
          <div style={{ fontSize: '36px', marginBottom: '12px' }}>🔄</div>
          <strong>Matching your field parameters against 20+ Rajasthan crop models...</strong>
        </div>
      ) : recommendations && recommendations.topRecommendations ? (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '18px', color: '#0f172a' }}>
              🏆 Top 3 Recommended Crops for Your Field Conditions
            </h3>
            <span style={{ fontSize: '12px', color: '#64748b' }}>
              Based on {recommendations.queriedParameters.soilType} soil, {recommendations.queriedParameters.waterAvailability} water in {recommendations.queriedParameters.district}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '18px' }}>
            {recommendations.topRecommendations.map((crop, idx) => (
              <div 
                key={idx}
                style={{ 
                  background: '#ffffff', 
                  border: idx === 0 ? '2px solid #10b981' : '1px solid #e2e8f0', 
                  borderRadius: '16px', 
                  padding: '22px', 
                  boxShadow: idx === 0 ? '0 4px 14px rgba(16, 185, 129, 0.12)' : '0 2px 4px rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative'
                }}
              >
                {/* Rank Badge */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <span style={{ 
                    fontSize: '12px', 
                    fontWeight: '800', 
                    padding: '4px 10px', 
                    borderRadius: '12px', 
                    background: idx === 0 ? '#dcfce7' : '#f1f5f9', 
                    color: idx === 0 ? '#166534' : '#475569' 
                  }}>
                    {idx === 0 ? '🥇 #1 BEST MATCH' : idx === 1 ? '🥈 #2 EXCELLENT CHOICE' : '🥉 #3 ALTERNATIVE'}
                  </span>

                  <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#0f766e', background: '#ecfdf5', padding: '3px 8px', borderRadius: '6px' }}>
                    {crop.score}% Match
                  </span>
                </div>

                <div>
                  <h3 style={{ margin: '0 0 4px', fontSize: '19px', color: '#0f172a' }}>{crop.hindiName}</h3>
                  <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '12px' }}>Maturity: <strong>{crop.duration}</strong> • Risk: <strong>{crop.riskLevel}</strong></div>

                  {/* Financial & Yield Metric Box */}
                  <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', marginBottom: '14px', border: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '12px', color: '#64748b' }}>Expected Net Profit:</span>
                      <strong style={{ color: '#166534', fontSize: '15px' }}>{crop.profitPerBigha} / Bigha</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '12px', color: '#64748b' }}>Expected Yield:</span>
                      <strong style={{ color: '#0f172a', fontSize: '13px' }}>{crop.expectedYieldPerBigha}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '12px', color: '#64748b' }}>Water Needed:</span>
                      <strong style={{ color: '#0284c7', fontSize: '13px' }}>{crop.minWaterings}</strong>
                    </div>
                  </div>

                  {/* Agronomic Why Reason */}
                  <div style={{ fontSize: '13px', color: '#334155', lineHeight: '1.5', background: '#f0fdf4', padding: '12px', borderRadius: '8px', borderLeft: '4px solid #10b981', marginBottom: '14px' }}>
                    💡 <strong>क्यों चुने (Why this fits):</strong> {crop.reasonHi}
                  </div>
                </div>

                {/* Action button */}
                <div style={{ marginTop: '10px' }}>
                  <div style={{ fontSize: '12px', color: '#94a3b8', textAlign: 'center' }}>
                    Market Rate: ₹{crop.pricePerQuintal.toLocaleString()}/Quintal
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CropMatchmakerView;
