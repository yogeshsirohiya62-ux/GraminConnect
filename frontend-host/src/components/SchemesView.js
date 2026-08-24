import React, { useState, useEffect } from 'react';
import useStore from '../store';

const SchemesView = () => {
  const [schemes, setSchemes] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState('browse'); // 'browse' | 'myApps'

  // Application Form State
  const [aadharNumber, setAadharNumber] = useState('');
  const [landKhasra, setLandKhasra] = useState('');
  const [phone, setPhone] = useState('');
  const [applySuccess, setApplySuccess] = useState('');

  const { user } = useStore();

  const fetchSchemes = async () => {
    try {
      const res = await fetch('/api/data/schemes');
      if (res.ok) setSchemes(await res.json());
    } catch (e) {
      console.error(e);
    }
  };

  const fetchApplications = async () => {
    try {
      const res = await fetch('/api/data/applications');
      if (res.ok) setApplications(await res.json());
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    Promise.all([fetchSchemes(), fetchApplications()]).finally(() => setLoading(false));
  }, []);

  const handleApply = async (e) => {
    e.preventDefault();
    if (!selectedScheme) return;

    try {
      const res = await fetch('/api/data/schemes/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          schemeId: selectedScheme.id,
          farmerName: user ? user.name : 'Ram Singh',
          aadharNumber,
          landKhasra,
          phone: phone || (user ? user.phone : '9876543210'),
          village: user ? user.village : 'Gurha Barsal'
        })
      });

      if (res.ok) {
        const data = await res.json();
        setApplySuccess(`Application Submitted! Tracking ID: ${data.trackingId}`);
        fetchApplications();
        setTimeout(() => {
          setApplySuccess('');
          setApplyModalOpen(false);
          setActiveSubTab('myApps');
        }, 2500);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #f1f5f9', paddingBottom: '16px', marginBottom: '20px', gap: '12px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '22px', color: '#0f172a' }}>🏛️ Rural Welfare & Government Schemes</h2>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#64748b' }}>
            Direct access to Central & Rajasthan State Government Agriculture Subsidies with official portal redirection
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', background: '#f1f5f9', padding: '4px', borderRadius: '10px' }}>
          <button 
            onClick={() => setActiveSubTab('browse')}
            style={{ padding: '8px 16px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '13px', background: activeSubTab === 'browse' ? '#0f766e' : 'transparent', color: activeSubTab === 'browse' ? '#ffffff' : '#475569' }}
          >
            📋 All Schemes ({schemes.length})
          </button>
          <button 
            onClick={() => setActiveSubTab('myApps')}
            style={{ padding: '8px 16px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '13px', background: activeSubTab === 'myApps' ? '#0f766e' : 'transparent', color: activeSubTab === 'myApps' ? '#ffffff' : '#475569' }}
          >
            📂 My Applications ({applications.length})
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px', color: '#64748b' }}>Loading welfare schemes...</div>
      ) : (
        <>
          {activeSubTab === 'browse' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
              {schemes.map((sch) => (
                <div key={sch.id} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 2px 4px rgba(0,0,0,0.03)', transition: '0.2s' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '11px', background: '#ecfdf5', color: '#047857', padding: '4px 8px', borderRadius: '6px', fontWeight: 'bold' }}>
                        {sch.category}
                      </span>
                      <span style={{ fontSize: '11px', background: '#e0f2fe', color: '#0369a1', padding: '3px 8px', borderRadius: '10px', fontWeight: '600' }}>
                        Govt Verified
                      </span>
                    </div>

                    <h3 style={{ margin: '8px 0 6px', fontSize: '18px', color: '#0f172a' }}>{sch.name}</h3>
                    
                    <div style={{ background: '#f8fafc', padding: '12px 14px', borderRadius: '8px', margin: '12px 0', border: '1px solid #f1f5f9' }}>
                      <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase' }}>Direct Financial Benefit:</div>
                      <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#0f766e', marginTop: '2px' }}>{sch.benefit}</div>
                    </div>

                    <div style={{ fontSize: '13px', color: '#475569', marginBottom: '8px', lineHeight: '1.4' }}>
                      <strong>Eligibility:</strong> {sch.eligibility}
                    </div>

                    {sch.documents && (
                      <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>
                        <strong>Documents Required:</strong> {Array.isArray(sch.documents) ? sch.documents.join(', ') : sch.documents}
                      </div>
                    )}

                    <div style={{ fontSize: '12px', color: '#64748b' }}>
                      <strong>Department:</strong> {sch.department}
                    </div>
                  </div>

                  <div style={{ marginTop: '18px', paddingTop: '14px', borderTop: '1px solid #f1f5f9' }}>
                    <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '10px' }}>
                      ⏱️ Deadline: <strong>{sch.deadline}</strong>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                      {/* Official Government Portal Apply Redirect Button */}
                      <a
                        href={sch.officialUrl || 'https://rajkisan.rajasthan.gov.in/'}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          gap: '6px', 
                          padding: '11px 16px', 
                          background: '#0f766e', 
                          color: '#ffffff', 
                          textDecoration: 'none', 
                          borderRadius: '8px', 
                          fontWeight: 'bold', 
                          fontSize: '14px',
                          textAlign: 'center',
                          boxShadow: '0 2px 4px rgba(15,118,110,0.2)'
                        }}
                      >
                        🚀 Apply on Official Portal ↗
                      </a>

                      {/* Secondary Quick Tracking Record */}
                      <button 
                        onClick={() => {
                          setSelectedScheme(sch);
                          setApplyModalOpen(true);
                        }}
                        style={{ padding: '8px', background: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '12px' }}
                      >
                        📝 Save / Track Application in GraminConnect
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSubTab === 'myApps' && (
            <div>
              {applications.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '50px', background: '#f8fafc', borderRadius: '12px' }}>
                  <p style={{ color: '#64748b', margin: 0 }}>No scheme applications submitted yet.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {applications.map((app) => (
                    <div key={app.id} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#0f172a' }}>{app.schemeName}</span>
                          <span style={{ fontSize: '11px', background: app.status === 'Approved' ? '#dcfce7' : '#fef3c7', color: app.status === 'Approved' ? '#166534' : '#92400e', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>
                            {app.status}
                          </span>
                        </div>
                        <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
                          Applicant: <strong>{app.userName}</strong> • Applied on: {app.appliedAt} • ID: <code>{app.id}</code>
                        </div>
                        <div style={{ fontSize: '12px', color: '#475569', marginTop: '4px' }}>
                          📝 <em>{app.remarks}</em>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Application Tracking Modal */}
      {applyModalOpen && selectedScheme && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: '#ffffff', borderRadius: '16px', maxWidth: '500px', width: '100%', padding: '28px', position: 'relative' }}>
            <button 
              onClick={() => setApplyModalOpen(false)}
              style={{ position: 'absolute', right: '16px', top: '16px', background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#94a3b8' }}
            >
              ✕
            </button>

            <h3 style={{ margin: '0 0 6px', fontSize: '18px', color: '#0f172a' }}>Apply for {selectedScheme.name}</h3>
            <p style={{ margin: '0 0 16px', fontSize: '13px', color: '#64748b' }}>
              Benefit: <strong>{selectedScheme.benefit}</strong>
            </p>

            {/* Official Portal Banner Link inside Modal */}
            <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '8px', padding: '12px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#166534' }}>Official Government Website:</div>
                <div style={{ fontSize: '11px', color: '#15803d' }}>Direct application registration form</div>
              </div>
              <a 
                href={selectedScheme.officialUrl || 'https://rajkisan.rajasthan.gov.in/'}
                target="_blank"
                rel="noopener noreferrer"
                style={{ padding: '6px 12px', background: '#166534', color: '#fff', textDecoration: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}
              >
                Open Official Form ↗
              </a>
            </div>

            {applySuccess ? (
              <div style={{ background: '#dcfce7', color: '#166534', padding: '16px', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold' }}>
                🎉 {applySuccess}
              </div>
            ) : (
              <form onSubmit={handleApply} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Applicant Name *</label>
                  <input 
                    type="text" 
                    defaultValue={user ? user.name : 'Ram Singh'} 
                    required
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Aadhaar Number (12 Digits) *</label>
                  <input 
                    type="text" 
                    placeholder="XXXX-XXXX-XXXX" 
                    value={aadharNumber}
                    onChange={(e) => setAadharNumber(e.target.value)}
                    required
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Land Record / Khasra No. *</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Khasra #142/9, Gurha Barsal" 
                    value={landKhasra}
                    onChange={(e) => setLandKhasra(e.target.value)}
                    required
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                  />
                </div>

                <button 
                  type="submit"
                  style={{ marginTop: '10px', padding: '12px', background: '#0f766e', color: '#ffffff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}
                >
                  🚀 Save & Track Application
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SchemesView;
