import React, { Suspense, useState, useEffect } from 'react';
import useStore from './store';
import AuthModal from './components/AuthModal';
import SchemesView from './components/SchemesView';
import ForumView from './components/ForumView';
import CalculatorsView from './components/CalculatorsView';
import CropMatchmakerView from './components/CropMatchmakerView';
import CropDoctorView from './components/CropDoctorView';
import MarketplaceView from './components/MarketplaceView';
import EquipmentRentalView from './components/EquipmentRentalView';
import HelplineDialer from './components/HelplineDialer';
import DashboardView from './components/DashboardView';

// Dynamically import the federated Remote Dashboard Module with local DashboardView fallback
const RemoteDashboard = React.lazy(() => 
  import('dashboard/Dashboard').catch((err) => {
    console.warn("Module federation remote on 3001 not detected, using integrated DashboardView component.");
    return { default: DashboardView };
  })
);

const App = () => {
  const { user, logout, isOffline, setOfflineStatus, language, setLanguage } = useStore();
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'marketplace' | 'rentals' | 'matchmaker' | 'doctor' | 'schemes' | 'forum' | 'tools'
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [sunlightMode, setSunlightMode] = useState(false);

  // Monitor Online/Offline Network Status (PWA)
  useEffect(() => {
    const handleOnline = () => setOfflineStatus(false);
    const handleOffline = () => setOfflineStatus(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div style={{ 
      maxWidth: '1380px', 
      margin: '0 auto', 
      padding: 'clamp(10px, 2.5vw, 20px)', 
      color: sunlightMode ? '#000000' : '#1e293b', 
      background: sunlightMode ? '#fef08a' : '#f8fafc', 
      minHeight: '100vh', 
      width: '100%',
      fontWeight: sunlightMode ? '600' : 'normal'
    }}>
      
      {/* Offline Status Banner */}
      {isOffline && (
        <div style={{ background: '#f59e0b', color: '#ffffff', padding: '10px 14px', borderRadius: '10px', marginBottom: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px', fontWeight: 'bold', flexWrap: 'wrap', gap: '8px' }}>
          <span>📡 Offline Mode Active: Serving cached rural data via Service Worker</span>
          <span style={{ fontSize: '11px', background: 'rgba(0,0,0,0.2)', padding: '2px 8px', borderRadius: '4px' }}>Cache First</span>
        </div>
      )}

      {/* Main Responsive Header */}
      <header style={{ 
        background: sunlightMode ? '#ffffff' : '#ffffff', 
        border: sunlightMode ? '2px solid #000000' : 'none',
        borderRadius: '16px', 
        padding: 'clamp(12px, 2vw, 18px) clamp(14px, 2.5vw, 24px)', 
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)', 
        marginBottom: '16px', 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        gap: '12px' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ fontSize: '28px', background: '#ecfdf5', width: '46px', height: '46px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '10px', flexShrink: 0 }}>
            🌱
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: 'clamp(18px, 2.5vw, 22px)', color: '#0f766e', fontWeight: '800', letterSpacing: '-0.5px' }}>
              GraminConnect
            </h1>
            <p style={{ margin: '1px 0 0', fontSize: '11px', color: '#64748b' }}>
              Digital Agriculture & Rural Commercial Ecosystem Hub
            </p>
          </div>
        </div>

        {/* Header Right Actions: Sunlight Mode + Language Switcher + User Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          
          {/* ☀️ High-Contrast Sunlight Field Mode Button */}
          <button
            onClick={() => setSunlightMode(!sunlightMode)}
            title="Toggle High-Contrast Sunlight Mode for Outdoor Reading"
            style={{ 
              padding: '6px 12px', 
              borderRadius: '8px', 
              border: sunlightMode ? '2px solid #000' : '1px solid #cbd5e1', 
              background: sunlightMode ? '#f59e0b' : '#ffffff', 
              color: sunlightMode ? '#ffffff' : '#334155', 
              cursor: 'pointer', 
              fontSize: '12px', 
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            {sunlightMode ? '☀️ Sunlight Mode: ON' : '☀️ Sunlight Mode'}
          </button>

          {/* Language Switch */}
          <div style={{ display: 'flex', background: '#f1f5f9', padding: '3px', borderRadius: '8px' }}>
            <button 
              onClick={() => setLanguage('en')}
              style={{ padding: '5px 10px', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', background: language === 'en' ? '#ffffff' : 'transparent', color: language === 'en' ? '#0f766e' : '#64748b', boxShadow: language === 'en' ? '0 1px 2px rgba(0,0,0,0.08)' : 'none' }}
            >
              EN
            </button>
            <button 
              onClick={() => setLanguage('hi')}
              style={{ padding: '5px 10px', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', background: language === 'hi' ? '#ffffff' : 'transparent', color: language === 'hi' ? '#0f766e' : '#64748b', boxShadow: language === 'hi' ? '0 1px 2px rgba(0,0,0,0.08)' : 'none' }}
            >
              हिन्दी
            </button>
          </div>

          {/* User Profile Button */}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '5px 12px', borderRadius: '8px' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#166534' }}>{user.name}</div>
                <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'capitalize' }}>{user.role} • {user.village}</div>
              </div>
              <button 
                onClick={logout}
                title="Logout"
                style={{ background: '#fee2e2', color: '#991b1b', border: 'none', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' }}
              >
                Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setAuthModalOpen(true)}
              style={{ padding: '8px 16px', background: '#0f766e', color: '#ffffff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', boxShadow: '0 2px 4px rgba(15,118,110,0.2)' }}
            >
              👤 Sign In / Register
            </button>
          )}
        </div>
      </header>

      {/* Main Navigation Tabs with Smooth Horizontal Touch Drag */}
      <nav 
        className="no-scrollbar"
        style={{ 
          display: 'flex', 
          gap: '6px', 
          overflowX: 'auto', 
          marginBottom: '16px', 
          paddingBottom: '4px',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <button
          onClick={() => setActiveTab('dashboard')}
          style={{ padding: '9px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', background: activeTab === 'dashboard' ? '#0f766e' : '#ffffff', color: activeTab === 'dashboard' ? '#ffffff' : '#64748b', boxShadow: '0 1px 2px rgba(0,0,0,0.03)', transition: '0.2s', whiteSpace: 'nowrap', flexShrink: 0 }}
        >
          🌾 Mandi & Weather
        </button>

        <button
          onClick={() => setActiveTab('marketplace')}
          style={{ padding: '9px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', background: activeTab === 'marketplace' ? '#0f766e' : '#ffffff', color: activeTab === 'marketplace' ? '#ffffff' : '#0f766e', border: activeTab === 'marketplace' ? 'none' : '1px solid #99f6e4', boxShadow: '0 1px 2px rgba(0,0,0,0.03)', transition: '0.2s', whiteSpace: 'nowrap', flexShrink: 0 }}
        >
          🛒 Kisan Bazar (फसल क्रय-विक्रय)
        </button>

        <button
          onClick={() => setActiveTab('rentals')}
          style={{ padding: '9px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', background: activeTab === 'rentals' ? '#0284c7' : '#ffffff', color: activeTab === 'rentals' ? '#ffffff' : '#0284c7', border: activeTab === 'rentals' ? 'none' : '1px solid #bae6fd', boxShadow: '0 1px 2px rgba(0,0,0,0.03)', transition: '0.2s', whiteSpace: 'nowrap', flexShrink: 0 }}
        >
          🚜 Tractor & Machinery Rental (किराया)
        </button>

        <button
          onClick={() => setActiveTab('matchmaker')}
          style={{ padding: '9px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', background: activeTab === 'matchmaker' ? '#0f766e' : '#ffffff', color: activeTab === 'matchmaker' ? '#ffffff' : '#64748b', boxShadow: '0 1px 2px rgba(0,0,0,0.03)', transition: '0.2s', whiteSpace: 'nowrap', flexShrink: 0 }}
        >
          🌱 Best Crop Matchmaker (फसल चयन)
        </button>

        <button
          onClick={() => setActiveTab('doctor')}
          style={{ padding: '9px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', background: activeTab === 'doctor' ? '#0f766e' : '#ffffff', color: activeTab === 'doctor' ? '#ffffff' : '#64748b', boxShadow: '0 1px 2px rgba(0,0,0,0.03)', transition: '0.2s', whiteSpace: 'nowrap', flexShrink: 0 }}
        >
          🩺 Kisan AI Doctor (फसल डॉक्टर)
        </button>

        <button
          onClick={() => setActiveTab('schemes')}
          style={{ padding: '9px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', background: activeTab === 'schemes' ? '#0f766e' : '#ffffff', color: activeTab === 'schemes' ? '#ffffff' : '#64748b', boxShadow: '0 1px 2px rgba(0,0,0,0.03)', transition: '0.2s', whiteSpace: 'nowrap', flexShrink: 0 }}
        >
          🏛️ Government Schemes
        </button>

        <button
          onClick={() => setActiveTab('forum')}
          style={{ padding: '9px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', background: activeTab === 'forum' ? '#0f766e' : '#ffffff', color: activeTab === 'forum' ? '#ffffff' : '#64748b', boxShadow: '0 1px 2px rgba(0,0,0,0.03)', transition: '0.2s', whiteSpace: 'nowrap', flexShrink: 0 }}
        >
          💬 Kisan Chopal
        </button>

        <button
          onClick={() => setActiveTab('tools')}
          style={{ padding: '9px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', background: activeTab === 'tools' ? '#0f766e' : '#ffffff', color: activeTab === 'tools' ? '#ffffff' : '#64748b', boxShadow: '0 1px 2px rgba(0,0,0,0.03)', transition: '0.2s', whiteSpace: 'nowrap', flexShrink: 0 }}
        >
          🧮 Krishi Calculators
        </button>
      </nav>

      {/* Main Fluid Responsive Card */}
      <main style={{ 
        background: '#ffffff', 
        border: sunlightMode ? '2px solid #000000' : '1px solid #e2e8f0', 
        borderRadius: '16px', 
        padding: 'clamp(14px, 2.5vw, 24px)', 
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)', 
        minHeight: '520px', 
        width: '100%', 
        overflowX: 'hidden' 
      }}>
        {activeTab === 'dashboard' && (
          <Suspense fallback={<div style={{ padding: '60px', textAlign: 'center', color: '#64748b' }}>⏳ Loading Rural Intelligence Hub...</div>}>
            <RemoteDashboard user={user} />
          </Suspense>
        )}

        {activeTab === 'marketplace' && <MarketplaceView />}
        {activeTab === 'rentals' && <EquipmentRentalView />}
        {activeTab === 'matchmaker' && <CropMatchmakerView />}
        {activeTab === 'doctor' && <CropDoctorView />}
        {activeTab === 'schemes' && <SchemesView />}
        {activeTab === 'forum' && <ForumView />}
        {activeTab === 'tools' && <CalculatorsView />}
      </main>

      {/* Footer */}
      <footer style={{ marginTop: '24px', textAlign: 'center', fontSize: '11px', color: '#94a3b8', padding: '12px' }}>
        GraminConnect • Progressive Web Application for Rural Ecosystems • Fully Responsive Mobile & Field-Ready Platform
      </footer>

      {/* Auth Modal */}
      {authModalOpen && <AuthModal onClose={() => setAuthModalOpen(false)} />}

      {/* 24/7 Emergency Kisan Helpline Speed-Dialer */}
      <HelplineDialer />
    </div>
  );
};

export default App;
