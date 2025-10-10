import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import LayoutFinal from './components/LayoutFinal';
import './i18n/config';
import LoginNew from './pages/LoginNew';
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

function App() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <LoginNew />;
  }

  return (
    <LayoutFinal>
      <Routes>
        <Route path="/" element={<DashboardNew />} />
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
    </LayoutFinal>
  );
}

export default App;
