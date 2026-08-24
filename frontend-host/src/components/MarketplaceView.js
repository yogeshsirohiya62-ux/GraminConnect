import React, { useState, useEffect } from 'react';
import useStore from '../store';

const MarketplaceView = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCrop, setFilterCrop] = useState('All');
  const [filterDistrict, setFilterDistrict] = useState('All');
  const [showPostModal, setShowPostModal] = useState(false);

  // New Listing Form State
  const [crop, setCrop] = useState('Wheat (गेहूं - Sharbati)');
  const [variety, setVariety] = useState('');
  const [quantityQuintals, setQuantityQuintals] = useState('');
  const [expectedPricePerQ, setExpectedPricePerQ] = useState('');
  const [village, setVillage] = useState('Gurha Barsal');
  const [district, setDistrict] = useState('Jaipur');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [postSuccess, setPostSuccess] = useState('');

  const { user } = useStore();

  const fetchListings = async () => {
    try {
      let url = `/api/data/marketplace?`;
      if (filterCrop !== 'All') url += `crop=${encodeURIComponent(filterCrop)}&`;
      if (filterDistrict !== 'All') url += `district=${encodeURIComponent(filterDistrict)}&`;
      const res = await fetch(url);
      if (res.ok) {
        setListings(await res.json());
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [filterCrop, filterDistrict]);

  const handlePostListing = async (e) => {
    e.preventDefault();
    if (!quantityQuintals || !expectedPricePerQ || !phone) return;

    try {
      const res = await fetch('/api/data/marketplace', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          farmerName: user ? user.name : 'Local Farmer',
          crop,
          variety,
          quantityQuintals,
          expectedPricePerQ,
          village,
          district,
          phone,
          description
        })
      });

      if (res.ok) {
        setPostSuccess('🎉 Your crop produce has been listed on Kisan Bazar successfully!');
        fetchListings();
        setTimeout(() => {
          setPostSuccess('');
          setShowPostModal(false);
          setQuantityQuintals('');
          setExpectedPricePerQ('');
          setDescription('');
        }, 2000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleContactWhatsApp = (item) => {
    const text = `नमस्ते ${item.farmerName} जी, मैंने ग्रामिन-कनेक्ट किसान बाजार पर आपकी फसल *${item.crop}* (${item.quantityQuintals} क्विंटल @ ₹${item.expectedPricePerQ}/क्विंटल) की लिस्टिंग देखी। क्या यह अभी उपलब्ध है?`;
    window.open(`https://api.whatsapp.com/send?phone=91${item.phone}&text=${encodeURIComponent(text)}`, '_blank');
  };

  const popularCrops = ['All', 'Wheat', 'Mustard', 'Jeera', 'Garlic', 'Chana', 'Groundnut', 'Cotton'];
  const districts = ['All', 'Jaipur', 'Kota', 'Jodhpur', 'Bikaner', 'Alwar', 'Nagaur'];

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #f1f5f9', paddingBottom: '16px', marginBottom: '20px', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '28px' }}>🌾</span>
            <h2 style={{ margin: 0, fontSize: '22px', color: '#0f172a' }}>Kisan Direct Marketplace (किसान बाजार)</h2>
          </div>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#64748b' }}>
            Sell your harvested crops directly to millers, bulk buyers & traders without paying middlemen commission fees.
          </p>
        </div>

        <button 
          onClick={() => setShowPostModal(true)}
          style={{ padding: '10px 20px', background: '#0f766e', color: '#ffffff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 2px 4px rgba(15,118,110,0.2)' }}
        >
          ➕ Sell My Crop Produce (फसल बेचने हेतु डाले)
        </button>
      </div>

      {/* Filter Bar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {popularCrops.map(c => (
            <button
              key={c}
              onClick={() => setFilterCrop(c)}
              style={{ padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', border: '1px solid #cbd5e1', background: filterCrop === c ? '#0f766e' : '#ffffff', color: filterCrop === c ? '#ffffff' : '#475569' }}
            >
              {c}
            </button>
          ))}
        </div>

        <select
          value={filterDistrict}
          onChange={(e) => setFilterDistrict(e.target.value)}
          style={{ padding: '7px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', background: '#fff' }}
        >
          {districts.map(d => (
            <option key={d} value={d}>{d === 'All' ? 'All Districts' : d}</option>
          ))}
        </select>
      </div>

      {/* Produce Listings Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px', color: '#64748b' }}>Loading marketplace listings...</div>
      ) : listings.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', background: '#f8fafc', borderRadius: '12px' }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>📦</div>
          <p style={{ color: '#64748b', margin: 0 }}>No produce listings found matching filters.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {listings.map((item) => (
            <div 
              key={item.id}
              style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 2px 4px rgba(0,0,0,0.03)' }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '11px', background: '#dcfce7', color: '#166534', padding: '3px 8px', borderRadius: '6px', fontWeight: 'bold' }}>
                    ● Verified Stock
                  </span>
                  <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                    {item.date}
                  </span>
                </div>

                <h3 style={{ margin: '6px 0 4px', fontSize: '18px', color: '#0f172a' }}>{item.crop}</h3>
                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '12px' }}>Variety: <strong>{item.variety}</strong></div>

                {/* Pricing & Volume Box */}
                <div style={{ background: '#f8fafc', padding: '12px 14px', borderRadius: '10px', marginBottom: '12px', border: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>Available Stock:</span>
                    <strong style={{ color: '#0f172a', fontSize: '14px' }}>{item.quantityQuintals} Quintals</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>Expected Rate:</span>
                    <strong style={{ color: '#0f766e', fontSize: '16px' }}>₹{item.expectedPricePerQ.toLocaleString()} / Q</strong>
                  </div>
                </div>

                <p style={{ margin: '0 0 12px', fontSize: '13px', color: '#475569', lineHeight: '1.4' }}>
                  {item.description}
                </p>

                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '14px' }}>
                  📍 Farmer: <strong>{item.farmerName}</strong> • {item.village} ({item.district})
                </div>
              </div>

              {/* Action Contact Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', paddingTop: '12px', borderTop: '1px solid #f1f5f9' }}>
                <a
                  href={`tel:${item.phone}`}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '9px', background: '#0f766e', color: '#fff', textDecoration: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold' }}
                >
                  📞 Call Farmer
                </a>

                <button
                  onClick={() => handleContactWhatsApp(item)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '9px', background: '#22c55e', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  💬 WhatsApp
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Post Produce Modal */}
      {showPostModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: '#ffffff', borderRadius: '16px', maxWidth: '500px', width: '100%', padding: '28px', maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
            <button 
              onClick={() => setShowPostModal(false)}
              style={{ position: 'absolute', right: '16px', top: '16px', background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#94a3b8' }}
            >
              ✕
            </button>

            <h3 style={{ margin: '0 0 6px', fontSize: '18px', color: '#0f172a' }}>List Your Harvest on Kisan Bazar</h3>
            <p style={{ margin: '0 0 16px', fontSize: '13px', color: '#64748b' }}>
              Buyers across Rajasthan will be able to contact you directly.
            </p>

            {postSuccess ? (
              <div style={{ background: '#dcfce7', color: '#166534', padding: '16px', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold' }}>
                {postSuccess}
              </div>
            ) : (
              <form onSubmit={handlePostListing} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>Crop (फसल) *</label>
                  <select 
                    value={crop}
                    onChange={(e) => setCrop(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', background: '#fff' }}
                  >
                    <option value="Wheat (गेहूं - Sharbati)">Wheat (गेहूं - Sharbati)</option>
                    <option value="Mustard (सरसों - Black 42% Oil)">Mustard (सरसों - Black 42% Oil)</option>
                    <option value="Cumin Seed / Jeera (जीरा)">Cumin Seed / Jeera (जीरा)</option>
                    <option value="Garlic / Lahsun (लहसुन - Ooty Variety)">Garlic / Lahsun (लहसुन - Ooty Variety)</option>
                    <option value="Chickpeas / Desi Chana (चना)">Chickpeas / Desi Chana (चना)</option>
                    <option value="Groundnut / Moongfali (मूंगफली)">Groundnut / Moongfali (मूंगफली)</option>
                    <option value="Cotton / Kapas (कपास)">Cotton / Kapas (कपास)</option>
                    <option value="Onion / Pyaz (लाल प्याज)">Onion / Pyaz (लाल प्याज)</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>Total Stock (Quintals) *</label>
                    <input 
                      type="number"
                      placeholder="e.g. 50"
                      value={quantityQuintals}
                      onChange={(e) => setQuantityQuintals(e.target.value)}
                      required
                      style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>Expected Rate (₹/Q) *</label>
                    <input 
                      type="number"
                      placeholder="e.g. 2600"
                      value={expectedPricePerQ}
                      onChange={(e) => setExpectedPricePerQ(e.target.value)}
                      required
                      style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>Village *</label>
                    <input 
                      type="text"
                      value={village}
                      onChange={(e) => setVillage(e.target.value)}
                      required
                      style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>Phone Number *</label>
                    <input 
                      type="tel"
                      placeholder="9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>Quality / Notes (विवरण)</label>
                  <textarea 
                    placeholder="e.g., Organic harvest, dry clean grain, ready for transport..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={2}
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                  />
                </div>

                <button 
                  type="submit"
                  style={{ marginTop: '6px', padding: '12px', background: '#0f766e', color: '#ffffff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}
                >
                  🚀 Publish Listing to Kisan Bazar
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketplaceView;
