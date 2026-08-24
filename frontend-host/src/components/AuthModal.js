import React, { useState } from 'react';
import useStore from '../store';

const AuthModal = ({ onClose }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [selectedRole, setSelectedRole] = useState('farmer'); // 'farmer' | 'trader'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [village, setVillage] = useState('Gurha Barsal');
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register } = useStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (isRegister) {
      const res = await register({
        username,
        password,
        name: selectedRole === 'trader' && businessName ? `${name} (${businessName})` : name,
        village: selectedRole === 'trader' ? (village || 'Jaipur Mandi') : village,
        role: selectedRole,
        phone,
        district: 'Jaipur',
        state: 'Rajasthan'
      });
      setLoading(false);
      if (res.success) {
        onClose();
      } else {
        setError(res.message);
      }
    } else {
      const res = await login(username, password);
      setLoading(false);
      if (res.success) {
        onClose();
      } else {
        setError(res.message);
      }
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px' }}>
      <div style={{ background: '#ffffff', borderRadius: '18px', maxWidth: '460px', width: '100%', padding: '28px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15)', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
        
        <button 
          onClick={onClose}
          style={{ position: 'absolute', right: '16px', top: '16px', background: 'transparent', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#94a3b8' }}
        >
          ✕
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: '18px' }}>
          <div style={{ fontSize: '32px', marginBottom: '4px' }}>
            {selectedRole === 'farmer' ? '🌾' : '🏢'}
          </div>
          <h3 style={{ margin: 0, fontSize: '20px', color: '#0f172a' }}>
            {isRegister 
              ? (selectedRole === 'farmer' ? 'Register as Farmer (किसान पंजीकरण)' : 'Register as Buyer / Trader (व्यापारी पंजीकरण)') 
              : (selectedRole === 'farmer' ? 'Kisan Portal Login (किसान लॉगिन)' : 'Buyer & Trader Login (व्यापारी लॉगिन)')
            }
          </h3>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#64748b' }}>
            {selectedRole === 'farmer' 
              ? 'Direct access to Mandi Bhav, AI Doctor & Kisan Bazar' 
              : 'Direct procurement of farm harvest & bulk bidding'
            }
          </p>
        </div>

        {/* Dedicated Role Switcher Tabs */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', background: '#f1f5f9', padding: '5px', borderRadius: '12px', marginBottom: '18px' }}>
          <button
            type="button"
            onClick={() => { setSelectedRole('farmer'); setError(''); }}
            style={{
              padding: '10px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              background: selectedRole === 'farmer' ? '#0f766e' : 'transparent',
              color: selectedRole === 'farmer' ? '#ffffff' : '#475569',
              boxShadow: selectedRole === 'farmer' ? '0 2px 4px rgba(15,118,110,0.2)' : 'none',
              transition: '0.2s'
            }}
          >
            <span>🌾</span>
            <span>Farmer (किसान)</span>
          </button>

          <button
            type="button"
            onClick={() => { setSelectedRole('trader'); setError(''); }}
            style={{
              padding: '10px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              background: selectedRole === 'trader' ? '#0284c7' : 'transparent',
              color: selectedRole === 'trader' ? '#ffffff' : '#475569',
              boxShadow: selectedRole === 'trader' ? '0 2px 4px rgba(2,132,199,0.2)' : 'none',
              transition: '0.2s'
            }}
          >
            <span>🏢</span>
            <span>Buyer / Trader (व्यापारी)</span>
          </button>
        </div>

        {error && (
          <div style={{ background: '#fee2e2', color: '#991b1b', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', marginBottom: '16px', fontWeight: '500' }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {isRegister && (
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#334155', marginBottom: '4px' }}>
                {selectedRole === 'farmer' ? 'Farmer Full Name (किसान का नाम) *' : 'Proprietor / Representative Name *'}
              </label>
              <input 
                type="text" 
                placeholder={selectedRole === 'farmer' ? "e.g., Ram Singh" : "e.g., Suresh Sharma"} 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
              />
            </div>
          )}

          {isRegister && selectedRole === 'trader' && (
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#334155', marginBottom: '4px' }}>
                Firm / Mandi Agency Name (फर्म/दुकान का नाम) *
              </label>
              <input 
                type="text" 
                placeholder="e.g., Shree Ram Trading Company" 
                value={businessName} 
                onChange={(e) => setBusinessName(e.target.value)} 
                required
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
              />
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#334155', marginBottom: '4px' }}>
              {selectedRole === 'farmer' ? 'Mobile Number / Username (मोबाइल नं.) *' : 'Trader ID / Registered Mobile *'}
            </label>
            <input 
              type="text" 
              placeholder={selectedRole === 'farmer' ? "e.g., 9876543210 or ram_kisan" : "e.g., 9876543211 or trader_jaipur"} 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#334155', marginBottom: '4px' }}>Password (पासवर्ड) *</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
            />
          </div>

          {isRegister && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#334155', marginBottom: '4px' }}>
                  {selectedRole === 'farmer' ? 'Village / Gram' : 'Mandi / City'}
                </label>
                <input 
                  type="text" 
                  value={village} 
                  onChange={(e) => setVillage(e.target.value)}
                  placeholder={selectedRole === 'farmer' ? "Gurha Barsal" : "Jaipur Mandi"}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#334155', marginBottom: '4px' }}>Phone Number</label>
                <input 
                  type="tel" 
                  value={phone} 
                  placeholder="9876543210"
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                />
              </div>
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              marginTop: '6px', 
              padding: '12px', 
              background: selectedRole === 'farmer' ? '#0f766e' : '#0284c7', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '8px', 
              cursor: 'pointer', 
              fontWeight: 'bold', 
              fontSize: '15px',
              boxShadow: selectedRole === 'farmer' ? '0 2px 4px rgba(15,118,110,0.2)' : '0 2px 4px rgba(2,132,199,0.2)'
            }}
          >
            {loading ? 'Processing...' : isRegister ? (selectedRole === 'farmer' ? '🌾 Register as Farmer' : '🏢 Register as Trader') : (selectedRole === 'farmer' ? '🌾 Login as Farmer' : '🏢 Login as Trader')}
          </button>
        </form>

        <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '13px', color: '#64748b' }}>
          {isRegister ? (
            <span>Already have an account? <button onClick={() => setIsRegister(false)} style={{ background: 'none', border: 'none', color: selectedRole === 'farmer' ? '#0f766e' : '#0284c7', fontWeight: 'bold', cursor: 'pointer', padding: 0 }}>Login here</button></span>
          ) : (
            <span>New user? <button onClick={() => setIsRegister(true)} style={{ background: 'none', border: 'none', color: selectedRole === 'farmer' ? '#0f766e' : '#0284c7', fontWeight: 'bold', cursor: 'pointer', padding: 0 }}>Create {selectedRole === 'farmer' ? 'Farmer' : 'Trader'} account</button></span>
          )}
        </div>

      </div>
    </div>
  );
};

export default AuthModal;
