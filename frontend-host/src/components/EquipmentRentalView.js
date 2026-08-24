import React, { useState, useEffect } from 'react';
import useStore from '../store';

const EquipmentRentalView = () => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [showModal, setShowModal] = useState(false);

  // New Equipment Form
  const [equipmentType, setEquipmentType] = useState('');
  const [eqCategory, setEqCategory] = useState('Tractors');
  const [ratePerHour, setRatePerHour] = useState('');
  const [ratePerBigha, setRatePerBigha] = useState('');
  const [village, setVillage] = useState('Gurha Barsal');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const { user } = useStore();

  const fetchRentals = async () => {
    try {
      let url = `/api/data/rentals?`;
      if (category !== 'All') url += `category=${encodeURIComponent(category)}&`;
      const res = await fetch(url);
      if (res.ok) setRentals(await res.json());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRentals();
  }, [category]);

  const handlePostEquipment = async (e) => {
    e.preventDefault();
    if (!equipmentType || !phone) return;

    try {
      const res = await fetch('/api/data/rentals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ownerName: user ? user.name : 'Equipment Owner',
          equipmentType,
          category: eqCategory,
          ratePerHour,
          ratePerBigha,
          village,
          phone,
          description
        })
      });

      if (res.ok) {
        setSuccessMsg('🎉 Equipment registered for local farmer rental successfully!');
        fetchRentals();
        setTimeout(() => {
          setSuccessMsg('');
          setShowModal(false);
          setEquipmentType('');
          setRatePerHour('');
          setRatePerBigha('');
        }, 2000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const categories = ['All', 'Tractors', 'Harvesters', 'Land Preparation', 'Sowing Implements'];

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #f1f5f9', paddingBottom: '16px', marginBottom: '20px', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '28px' }}>🚜</span>
            <h2 style={{ margin: 0, fontSize: '22px', color: '#0f172a' }}>Farm Machinery & Tractor Rental (कृषि यंत्र किराया)</h2>
          </div>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#64748b' }}>
            Rent tractors, laser levelers, harvesters & seed drills locally by hour or per Bigha without huge equipment investment.
          </p>
        </div>

        <button 
          onClick={() => setShowModal(true)}
          style={{ padding: '10px 20px', background: '#0284c7', color: '#ffffff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          ➕ List My Tractor / Machinery for Rent
        </button>
      </div>

      {/* Category Pills */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px' }}>
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            style={{ padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', border: '1px solid #cbd5e1', background: category === c ? '#0284c7' : '#ffffff', color: category === c ? '#ffffff' : '#475569' }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Equipment Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px', color: '#64748b' }}>Loading farm machinery...</div>
      ) : rentals.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', background: '#f8fafc', borderRadius: '12px' }}>
          <p style={{ color: '#64748b', margin: 0 }}>No machinery listed in this category yet.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {rentals.map((item) => (
            <div 
              key={item.id}
              style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 2px 4px rgba(0,0,0,0.03)' }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '11px', background: '#e0f2fe', color: '#0369a1', padding: '3px 8px', borderRadius: '6px', fontWeight: 'bold' }}>
                    {item.category}
                  </span>
                  <span style={{ fontSize: '11px', background: '#dcfce7', color: '#166534', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold' }}>
                    ● Available Now
                  </span>
                </div>

                <h3 style={{ margin: '6px 0 6px', fontSize: '18px', color: '#0f172a' }}>{item.equipmentType}</h3>
                
                {/* Rates Callout */}
                <div style={{ background: '#f0f9ff', padding: '12px', borderRadius: '10px', marginBottom: '12px', border: '1px solid #bae6fd' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>Hourly Rate:</span>
                    <strong style={{ color: '#0369a1', fontSize: '15px' }}>₹{item.ratePerHour} / Hour</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>Per Bigha Rate:</span>
                    <strong style={{ color: '#0f766e', fontSize: '15px' }}>₹{item.ratePerBigha} / Bigha</strong>
                  </div>
                </div>

                <p style={{ margin: '0 0 12px', fontSize: '13px', color: '#475569', lineHeight: '1.4' }}>
                  {item.description}
                </p>

                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '14px' }}>
                  📍 Owner: <strong>{item.ownerName}</strong> • {item.village} ({item.district})
                </div>
              </div>

              {/* Action Contact Button */}
              <div style={{ paddingTop: '12px', borderTop: '1px solid #f1f5f9' }}>
                <a
                  href={`tel:${item.phone}`}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '10px', background: '#0284c7', color: '#fff', textDecoration: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold' }}
                >
                  📞 Call to Book / Rent (किराये पर ले)
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List Equipment Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: '#ffffff', borderRadius: '16px', maxWidth: '500px', width: '100%', padding: '28px', maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
            <button 
              onClick={() => setShowModal(false)}
              style={{ position: 'absolute', right: '16px', top: '16px', background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#94a3b8' }}
            >
              ✕
            </button>

            <h3 style={{ margin: '0 0 6px', fontSize: '18px', color: '#0f172a' }}>List Machinery for Rental</h3>
            <p style={{ margin: '0 0 16px', fontSize: '13px', color: '#64748b' }}>
              Earn extra income from your tractor and agricultural implements.
            </p>

            {successMsg ? (
              <div style={{ background: '#dcfce7', color: '#166534', padding: '16px', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold' }}>
                {successMsg}
              </div>
            ) : (
              <form onSubmit={handlePostEquipment} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>Equipment Model & Name *</label>
                  <input 
                    type="text"
                    placeholder="e.g. Swaraj 744 FE 48HP / Combine Harvester"
                    value={equipmentType}
                    onChange={(e) => setEquipmentType(e.target.value)}
                    required
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>Category *</label>
                  <select
                    value={eqCategory}
                    onChange={(e) => setEqCategory(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', background: '#fff' }}
                  >
                    <option value="Tractors">Tractor & Trolley (ट्रैक्टर)</option>
                    <option value="Harvesters">Combine Harvester (कंबाइन हार्वेस्टर)</option>
                    <option value="Land Preparation">Laser Leveler / Rotavator (लेजर लेवलर/रोटावेटर)</option>
                    <option value="Sowing Implements">Seed Drill / Planter (सीड ड्रिल)</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>Rate (₹ / Hour)</label>
                    <input 
                      type="number"
                      placeholder="e.g. 600"
                      value={ratePerHour}
                      onChange={(e) => setRatePerHour(e.target.value)}
                      style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>Rate (₹ / Bigha)</label>
                    <input 
                      type="number"
                      placeholder="e.g. 450"
                      value={ratePerBigha}
                      onChange={(e) => setRatePerBigha(e.target.value)}
                      style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>Village / Location *</label>
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
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>Description / Availability Notes</label>
                  <textarea 
                    placeholder="e.g., Driver included, fuel conditions, flexible timing..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={2}
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                  />
                </div>

                <button 
                  type="submit"
                  style={{ marginTop: '6px', padding: '12px', background: '#0284c7', color: '#ffffff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}
                >
                  🚀 Register Machinery for Rent
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EquipmentRentalView;
