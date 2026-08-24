import React, { useState } from 'react';

const COMMON_SYMPTOM_CHIPS = [
  { label: '🌾 गेहूं के पत्ते पीले पड़ रहे हैं', query: 'गेहूं में पीलापन आ रहा है', crop: 'Wheat / Gehu' },
  { label: '🐛 सरसों में काला/हरा मोयला या चेपा', query: 'सरसों में मोयला चेपा कीट का प्रकोप', crop: 'Mustard / Sarson' },
  { label: '🐜 पौधों की जड़ें सूखना / दीमक', query: 'खेत में दीमक का प्रकोप और जड़ सूखना', crop: 'All Crops' },
  { label: '🐛 चने की फली में छेद व सुंडी', query: 'चने की फली छेदक सुंडी कीट', crop: 'Gram / Chana' },
  { label: '🌿 गेहूं में बथुआ व गुल्ली डंडा खरपतवार', query: 'गेहूं में खरपतवार नियंत्रण', crop: 'Wheat / Gehu' },
  { label: '🍂 जीरे में झुलसा व छाछ्या रोग', query: 'जीरा में झुलसा और छाछ्या रोग', crop: 'Cumin / Jeera' },
  { label: '💧 गेहूं में पहली सिंचाई व यूरिया खाद', query: 'गेहूं में पहली सिंचाई और यूरिया की मात्रा', crop: 'Wheat / Gehu' }
];

const CropDoctorView = () => {
  const [question, setQuestion] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('');
  const [diagnosis, setDiagnosis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleAskDoctor = async (customQuery = null, customCrop = null) => {
    const q = customQuery || question;
    const c = customCrop || selectedCrop;
    if (!q.trim()) return;

    setLoading(true);
    setDiagnosis(null);

    try {
      const res = await fetch('/api/data/crop-doctor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q, crop: c })
      });

      if (res.ok) {
        const data = await res.json();
        setDiagnosis(data);
      }
    } catch (err) {
      console.error("Doctor fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Text-to-Speech audio reader for rural farmers
  const handleSpeak = (text) => {
    if (!window.speechSynthesis) {
      alert("Audio speech is not supported by your browser");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'hi-IN';
    utterance.rate = 0.9; // clear, comfortable pace
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '16px', marginBottom: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '28px' }}>🩺</span>
            <h2 style={{ margin: 0, fontSize: '22px', color: '#0f172a' }}>Kisan AI Crop Doctor (कृषि मित्र / फसल डॉक्टर)</h2>
          </div>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#64748b' }}>
            Ask any question about your crop illness, pests, weeds, or fertilizer and get instant verified solutions.
          </p>
        </div>

        <span style={{ fontSize: '12px', background: '#dcfce7', color: '#166534', padding: '4px 10px', borderRadius: '14px', fontWeight: 'bold' }}>
          ● 24/7 AI Agronomist Active
        </span>
      </div>

      {/* Main Question Asking Card */}
      <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '16px', padding: '24px', marginBottom: '24px', boxShadow: '0 2px 4px rgba(0,0,0,0.03)' }}>
        <h4 style={{ margin: '0 0 12px', fontSize: '15px', color: '#1e293b' }}>
          ✍️ Type Your Question or Describe Crop Symptoms (अपनी फसल की समस्या बताएं)
        </h4>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
          <input 
            type="text" 
            placeholder="e.g., सरसों में चेपा कीट लगा है, क्या उपाय करें? / Leaves are turning yellow..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAskDoctor()}
            style={{ flex: '1', minWidth: '280px', padding: '12px 16px', borderRadius: '10px', border: '1px solid #94a3b8', fontSize: '15px' }}
          />

          <select 
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            style={{ padding: '12px 14px', borderRadius: '10px', border: '1px solid #94a3b8', fontSize: '14px', background: '#fff', fontWeight: '500' }}
          >
            <option value="">All Crops (सभी फसलें)</option>
            <option value="Wheat">Wheat (गेहूं)</option>
            <option value="Mustard">Mustard (सरसों)</option>
            <option value="Chana">Chickpeas (चना)</option>
            <option value="Cumin">Cumin (जीरा)</option>
            <option value="Bajra">Bajra (बाजरा)</option>
            <option value="Cotton">Cotton (कपास)</option>
            <option value="Garlic">Garlic (लहसुन)</option>
            <option value="Moong">Moong (मूंग)</option>
          </select>

          <button 
            onClick={() => handleAskDoctor()}
            disabled={loading}
            style={{ padding: '12px 24px', background: '#0f766e', color: '#ffffff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            {loading ? 'Diagnosing...' : '🔍 Diagnose & Get Solution'}
          </button>
        </div>

        {/* Quick Symptom Chips */}
        <div>
          <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#64748b', marginBottom: '8px' }}>
            ⚡ Common Problem Quick-Picks (जल्दी पूछने के लिए चुने):
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {COMMON_SYMPTOM_CHIPS.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuestion(chip.query);
                  setSelectedCrop(chip.crop);
                  handleAskDoctor(chip.query, chip.crop);
                }}
                style={{ padding: '6px 12px', borderRadius: '20px', fontSize: '12px', cursor: 'pointer', border: '1px solid #e2e8f0', background: '#f8fafc', color: '#334155', fontWeight: '500', transition: '0.2s' }}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Diagnosis & Solution Output Box */}
      {loading ? (
        <div style={{ padding: '50px', textAlign: 'center', color: '#0f766e' }}>
          <div style={{ fontSize: '36px', marginBottom: '10px' }}>🧬</div>
          <strong>AI Crop Doctor is analyzing symptoms and agricultural remedies...</strong>
        </div>
      ) : diagnosis && diagnosis.found ? (
        <div style={{ background: '#ffffff', border: '1px solid #86efac', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.08)' }}>
          
          {/* Header of Diagnosis */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '14px', marginBottom: '18px', gap: '10px' }}>
            <div>
              <span style={{ fontSize: '11px', background: '#ecfdf5', color: '#047857', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold' }}>
                DIAGNOSIS REPORT • {diagnosis.crop}
              </span>
              <h3 style={{ margin: '6px 0 0', fontSize: '20px', color: '#065f46' }}>
                🩺 {diagnosis.diagnosis}
              </h3>
            </div>

            {/* Audio Readout Button */}
            <button
              onClick={() => handleSpeak(diagnosis.audioNarrationHi || `${diagnosis.diagnosis}. ${diagnosis.solutions.chemical}. ${diagnosis.solutions.organic}`)}
              style={{ padding: '8px 16px', background: isSpeaking ? '#ef4444' : '#0f766e', color: '#ffffff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              {isSpeaking ? '⏹️ Stop Audio' : '🔊 बोलकर सुनाएं (Listen)'}
            </button>
          </div>

          <div style={{ fontSize: '14px', color: '#475569', marginBottom: '20px', background: '#f8fafc', padding: '12px 16px', borderRadius: '8px' }}>
            <strong>🔍 Identified Symptoms:</strong> {diagnosis.symptoms}
          </div>

          {/* Treatments Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '18px' }}>
            
            {/* Chemical Treatment */}
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <span style={{ fontSize: '18px' }}>💊</span>
                <h4 style={{ margin: 0, color: '#166534', fontSize: '16px' }}>Recommended Chemical Treatment (दवा)</h4>
              </div>
              <p style={{ margin: 0, fontSize: '14px', color: '#14532d', lineHeight: '1.5', fontWeight: '500' }}>
                {diagnosis.solutions.chemical}
              </p>
            </div>

            {/* Organic / Desi Treatment */}
            <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '12px', padding: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <span style={{ fontSize: '18px' }}>🌿</span>
                <h4 style={{ margin: 0, color: '#92400e', fontSize: '16px' }}>Organic / Desi Remedy (जैविक उपाय)</h4>
              </div>
              <p style={{ margin: 0, fontSize: '14px', color: '#78350f', lineHeight: '1.5', fontWeight: '500' }}>
                {diagnosis.solutions.organic}
              </p>
            </div>

          </div>

          {/* Spray Timing & Precautions */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px', background: '#f8fafc', padding: '16px', borderRadius: '10px' }}>
            <div style={{ fontSize: '13px', color: '#334155' }}>
              ⏱️ <strong>Spray Timing (छिड़काव का समय):</strong> {diagnosis.solutions.timing}
            </div>
            <div style={{ fontSize: '13px', color: '#b91c1c' }}>
              ⚠️ <strong>Precaution (सावधानी):</strong> {diagnosis.solutions.precaution}
            </div>
          </div>

        </div>
      ) : null}
    </div>
  );
};

export default CropDoctorView;
