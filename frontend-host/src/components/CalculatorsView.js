import React, { useState } from 'react';

const CROP_CALCULATOR_DATA = {
  'Wheat (गेहूं)': { urea: 28, dap: 20, mop: 10, zinc: 5, expectedYield: 12, costPerBigha: 4500, pricePerQ: 2480 },
  'Mustard (सरसों)': { urea: 18, dap: 15, mop: 8, zinc: 4, expectedYield: 7.5, costPerBigha: 3200, pricePerQ: 5720 },
  'Bajra (बाजरा)': { urea: 20, dap: 12, mop: 5, zinc: 3, expectedYield: 9, costPerBigha: 2800, pricePerQ: 2250 },
  'Chana / Chickpeas (चना)': { urea: 8, dap: 25, mop: 10, zinc: 4, expectedYield: 6, costPerBigha: 3000, pricePerQ: 6180 },
  'Moong (मूंग)': { urea: 6, dap: 20, mop: 8, zinc: 3, expectedYield: 4, costPerBigha: 2500, pricePerQ: 7900 },
  'Groundnut / Moongfali (मूंगफली)': { urea: 15, dap: 25, mop: 15, zinc: 6, expectedYield: 9, costPerBigha: 5200, pricePerQ: 6450 },
  'Soybean (सोयाबीन)': { urea: 10, dap: 22, mop: 12, zinc: 4, expectedYield: 6.5, costPerBigha: 3400, pricePerQ: 4480 },
  'Cotton / Kapas (कपास)': { urea: 32, dap: 25, mop: 18, zinc: 6, expectedYield: 6, costPerBigha: 5800, pricePerQ: 7150 },
  'Cumin / Jeera (जीरा)': { urea: 12, dap: 15, mop: 10, zinc: 3, expectedYield: 2.8, costPerBigha: 6500, pricePerQ: 24500 },
  'Garlic / Lahsun (लहसुन)': { urea: 35, dap: 30, mop: 25, zinc: 8, expectedYield: 15, costPerBigha: 12000, pricePerQ: 16500 },
  'Onion / Pyaz (प्याज)': { urea: 30, dap: 25, mop: 20, zinc: 6, expectedYield: 45, costPerBigha: 14000, pricePerQ: 2400 },
  'Barley / Jau (जौ)': { urea: 22, dap: 16, mop: 8, zinc: 4, expectedYield: 11, costPerBigha: 3800, pricePerQ: 1980 },
  'Paddy / Dhan (धान)': { urea: 35, dap: 25, mop: 15, zinc: 8, expectedYield: 14, costPerBigha: 6000, pricePerQ: 3850 }
};

const CalculatorsView = () => {
  // Fertilizer & Yield Calculator
  const [crop, setCrop] = useState('Wheat (गेहूं)');
  const [area, setArea] = useState(2);
  const [unit, setUnit] = useState('Bigha');

  // Land Converter
  const [inputValue, setInputValue] = useState(1);
  const [fromUnit, setFromUnit] = useState('Bigha');

  const cropInfo = CROP_CALCULATOR_DATA[crop] || CROP_CALCULATOR_DATA['Wheat (गेहूं)'];
  const multiplier = unit === 'Acre' ? area * 1.6 : unit === 'Hectare' ? area * 3.95 : area;

  // Fertilizer dosage estimation
  const fert = {
    urea: Math.round(cropInfo.urea * multiplier),
    dap: Math.round(cropInfo.dap * multiplier),
    mop: Math.round(cropInfo.mop * multiplier),
    zinc: Math.round(cropInfo.zinc * multiplier)
  };

  // Yield and Income projection ranges
  const yieldQ = Number((cropInfo.expectedYield * multiplier).toFixed(1));
  const minYieldQ = Number((yieldQ * 0.85).toFixed(1));
  const maxYieldQ = Number((yieldQ * 1.20).toFixed(1));

  const revenue = Math.round(yieldQ * cropInfo.pricePerQ);
  const minRevenue = Math.round(minYieldQ * cropInfo.pricePerQ);
  const maxRevenue = Math.round(maxYieldQ * cropInfo.pricePerQ);

  const cost = Math.round(cropInfo.costPerBigha * multiplier);
  const profit = revenue - cost;
  const minProfit = minRevenue - cost;
  const maxProfit = maxRevenue - cost;

  // Unit conversion
  const convertLand = () => {
    const val = Number(inputValue) || 0;
    if (fromUnit === 'Bigha') {
      return {
        acre: (val * 0.625).toFixed(2),
        hectare: (val * 0.253).toFixed(3),
        sqYards: Math.round(val * 3025),
        bigha: val
      };
    } else if (fromUnit === 'Acre') {
      return {
        bigha: (val * 1.6).toFixed(2),
        hectare: (val * 0.404).toFixed(3),
        sqYards: Math.round(val * 4840),
        acre: val
      };
    } else {
      return {
        bigha: (val * 3.95).toFixed(2),
        acre: (val * 2.47).toFixed(2),
        sqYards: Math.round(val * 11960),
        hectare: val
      };
    }
  };

  const conv = convertLand();

  return (
    <div>
      <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '16px', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, fontSize: '22px', color: '#0f172a' }}>🧮 Smart Krishi Tools, Yield Predictor & Calculators</h2>
        <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#64748b' }}>
          Crop production yield estimations, fertilizer dosages & agricultural land unit conversions
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        
        {/* Fertilizer & Production Estimator Card */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <h3 style={{ margin: '0 0 16px', color: '#0f766e', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🌱 Fertilizer & Yield Predictor (पैदावार एवं खाद)
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Select Crop (फसल)</label>
              <select 
                value={crop} 
                onChange={(e) => setCrop(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', background: '#fff', fontWeight: '500' }}
              >
                {Object.keys(CROP_CALCULATOR_DATA).map(k => (
                  <option key={k} value={k}>{k}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Land Area</label>
                <input 
                  type="number" 
                  value={area} 
                  min="0.25"
                  step="0.5"
                  onChange={(e) => setArea(Number(e.target.value) || 1)}
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Unit</label>
                <select 
                  value={unit} 
                  onChange={(e) => setUnit(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', background: '#fff' }}
                >
                  <option value="Bigha">Bigha (बीघा)</option>
                  <option value="Acre">Acre (एकड़)</option>
                  <option value="Hectare">Hectare (हेक्टेयर)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Expected Yield Output Box with Min/Max Range */}
          <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '10px', padding: '16px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '11px', color: '#047857', fontWeight: 'bold', textTransform: 'uppercase' }}>Estimated Production Range (Min — Max)</div>
                <div style={{ fontSize: '22px', fontWeight: '800', color: '#065f46', marginTop: '2px' }}>
                  {minYieldQ} — {maxYieldQ} Quintals
                </div>
                <div style={{ fontSize: '12px', color: '#059669' }}>Avg Expected: ~{yieldQ} Q ({Math.round(yieldQ * 100).toLocaleString()} kg)</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '11px', color: '#047857', fontWeight: 'bold' }}>NET PROFIT RANGE</div>
                <div style={{ fontSize: '18px', fontWeight: '800', color: '#047857' }}>
                  ₹{minProfit.toLocaleString()} — ₹{maxProfit.toLocaleString()}
                </div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Rev: ₹{minRevenue.toLocaleString()} - ₹{maxRevenue.toLocaleString()}</div>
              </div>
            </div>
          </div>

          {/* Fertilizer Results Box */}
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px' }}>
            <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#334155', marginBottom: '10px' }}>
              Required Fertilizer Dosage for {area} {unit}:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div style={{ background: '#ffffff', padding: '10px', borderRadius: '6px', border: '1px solid #f1f5f9' }}>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Urea (यूरिया)</div>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#0f766e' }}>{fert.urea} kg</div>
              </div>
              <div style={{ background: '#ffffff', padding: '10px', borderRadius: '6px', border: '1px solid #f1f5f9' }}>
                <div style={{ fontSize: '11px', color: '#64748b' }}>DAP (डीएपी)</div>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#0f766e' }}>{fert.dap} kg</div>
              </div>
              <div style={{ background: '#ffffff', padding: '10px', borderRadius: '6px', border: '1px solid #f1f5f9' }}>
                <div style={{ fontSize: '11px', color: '#64748b' }}>MOP (पोटाश)</div>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#0f766e' }}>{fert.mop} kg</div>
              </div>
              <div style={{ background: '#ffffff', padding: '10px', borderRadius: '6px', border: '1px solid #f1f5f9' }}>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Zinc Sulphate</div>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#0f766e' }}>{fert.zinc} kg</div>
              </div>
            </div>
          </div>
        </div>

        {/* Land Converter */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <h3 style={{ margin: '0 0 16px', color: '#0284c7', display: 'flex', alignItems: 'center', gap: '8px' }}>
            📐 Land Measurement Converter
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Value to Convert</label>
              <input 
                type="number" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>From</label>
              <select 
                value={fromUnit} 
                onChange={(e) => setFromUnit(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', background: '#fff' }}
              >
                <option value="Bigha">Bigha (बीघा)</option>
                <option value="Acre">Acre (एकड़)</option>
                <option value="Hectare">Hectare (हेक्टेयर)</option>
              </select>
            </div>
          </div>

          {/* Results Box */}
          <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '10px', padding: '16px' }}>
            <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#0369a1', marginBottom: '10px' }}>
              Equivalent Values (Rajasthan Standard):
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', background: '#ffffff', padding: '10px 14px', borderRadius: '6px' }}>
                <span style={{ fontSize: '13px', color: '#64748b' }}>Bigha (बीघा):</span>
                <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#0369a1' }}>{conv.bigha || inputValue} Bigha</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', background: '#ffffff', padding: '10px 14px', borderRadius: '6px' }}>
                <span style={{ fontSize: '13px', color: '#64748b' }}>Acre (एकड़):</span>
                <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#0369a1' }}>{conv.acre || inputValue} Acre</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', background: '#ffffff', padding: '10px 14px', borderRadius: '6px' }}>
                <span style={{ fontSize: '13px', color: '#64748b' }}>Hectare (हेक्टेयर):</span>
                <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#0369a1' }}>{conv.hectare || inputValue} Ha</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', background: '#ffffff', padding: '10px 14px', borderRadius: '6px' }}>
                <span style={{ fontSize: '13px', color: '#64748b' }}>Square Yards (वर्ग गज):</span>
                <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#0369a1' }}>{conv.sqYards} Sq. Yards</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default CalculatorsView;
