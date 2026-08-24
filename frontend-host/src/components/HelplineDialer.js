import React, { useState } from 'react';

const HelplineDialer = () => {
  const [open, setOpen] = useState(false);

  const helplines = [
    {
      title: '📞 Kisan Call Center (Govt of India)',
      subtitle: '24x7 Toll-Free Agri Expert Advisory',
      number: '18001801551',
      displayNumber: '1800-180-1551',
      badge: 'Free Toll-Free'
    },
    {
      title: '🏛️ Rajasthan Krishi Control Room',
      subtitle: 'State Pest & Subsidy Helpline',
      number: '01412227608',
      displayNumber: '0141-2227608',
      badge: 'State Govt'
    },
    {
      title: '⚡ PM-Kisan Samman Nidhi Helpline',
      subtitle: 'Installment & Payment Issues',
      number: '155261',
      displayNumber: '155261 / 1800115526',
      badge: 'Direct Income'
    }
  ];

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 999, fontFamily: 'system-ui, sans-serif' }}>
      
      {/* Expanded Popup Menu */}
      {open && (
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '18px', width: '320px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.15)', marginBottom: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px', marginBottom: '12px' }}>
            <h4 style={{ margin: 0, fontSize: '15px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
              🚨 Emergency Kisan Helplines
            </h4>
            <button 
              onClick={() => setOpen(false)}
              style={{ background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer', color: '#94a3b8' }}
            >
              ✕
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {helplines.map((h, idx) => (
              <a
                key={idx}
                href={`tel:${h.number}`}
                style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px', textDecoration: 'none', color: '#1e293b', display: 'flex', flexDirection: 'column', gap: '4px', transition: '0.2s' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '13px', color: '#0f766e' }}>{h.title}</strong>
                  <span style={{ fontSize: '10px', background: '#dcfce7', color: '#166534', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>
                    {h.badge}
                  </span>
                </div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>{h.subtitle}</div>
                <div style={{ fontSize: '13px', fontWeight: '800', color: '#0284c7', marginTop: '2px' }}>
                  📞 {h.displayNumber}
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          background: 'linear-gradient(135deg, #0f766e 0%, #047857 100%)',
          color: '#ffffff',
          border: 'none',
          borderRadius: '50px',
          padding: '12px 20px',
          boxShadow: '0 4px 14px rgba(15, 118, 110, 0.4)',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <span style={{ fontSize: '18px' }}>📞</span>
        <span>Kisan Helpline (1800-180-1551)</span>
      </button>

    </div>
  );
};

export default HelplineDialer;
