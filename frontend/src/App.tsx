import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import LayoutPremium from './components/LayoutPremium';
import './i18n/config';
import LoginNew from './pages/LoginNew';
import Home from './pages/Home';
import DashboardNew from './pages/DashboardNew';
import RiskMapFinal from './pages/RiskMapFinal';
import Alerts from './pages/Alerts';
import Cases from './pages/Cases';
import Complaints from './pages/Complaints';
import Intelligence from './pages/Intelligence';
import Models from './pages/Models';
import Banks from './pages/Banks';
import Reports from './pages/Reports';
import Admin from './pages/Admin';
import Audit from './pages/Audit';
import apiClient from './api/client';

function App() {
  const { isAuthenticated, isTokenValid, logout, token } = useAuthStore();
  const [isValidating, setIsValidating] = useState(true);

  useEffect(() => {
    const validateAuth = async () => {
      if (isAuthenticated && token) {
        // Check if token is still valid
        if (!isTokenValid()) {
          try {
            // Try to verify with backend
            const response = await apiClient.post('/auth/verify');
            if (!response.data.valid) {
              logout();
            }
          } catch (error) {
            console.error('Token validation failed:', error);
            logout();
          }
        }
      }
      setIsValidating(false);
    };

    validateAuth();
  }, []);

  if (isValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Validating session...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginNew />;
  }

  return (
    <LayoutPremium>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashboardNew />} />
        <Route path="/risk-map" element={<RiskMapFinal />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/cases" element={<Cases />} />
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/intelligence" element={<Intelligence />} />
        <Route path="/models" element={<Models />} />
        <Route path="/banks" element={<Banks />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/audit" element={<Audit />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </LayoutPremium>
  );
}

export default App;
