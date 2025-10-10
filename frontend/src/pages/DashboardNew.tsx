import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, AlertTriangle, Briefcase, DollarSign, Map as MapIcon, Bell, 
  FileText, ArrowRight, Activity, Shield, Target, Clock, ChevronRight,
  MapPin, Users, Database, Zap, Eye, CheckCircle, XCircle, BarChart3, PieChart, TrendingDown
} from 'lucide-react';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPie, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadialBarChart, RadialBar,
  ComposedChart, Scatter, ScatterChart, ZAxis
} from 'recharts';
import apiClient from '../api/client';
import { useAuthStore } from '../store/authStore';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { formatNumber, toHindiNumber } from '../i18n/config';

export default function DashboardNew() {
  const { t, i18n } = useTranslation();
  const { user } = useAuthStore();
  const currentLanguage = i18n.language;
  
  // Compute display name honoring language
  const rawName = (user?.name || '').trim();
  const isSystemAdminName = rawName.toLowerCase() === 'system administrator' || rawName.toLowerCase() === 'administrator' || rawName.toLowerCase() === 'admin';
  const displayName = currentLanguage === 'hi' && (isSystemAdminName || !rawName)
    ? t('systemAdministrator')
    : (rawName || t('systemAdministrator'));
  
  // Debug log to verify translation
  console.log('Current Language:', currentLanguage);
  console.log('System Administrator Translation:', t('systemAdministrator'));
  console.log('User rawName:', rawName, 'displayName:', displayName);
  const [stats, setStats] = useState<any>(null);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [activity, setActivity] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, alertsRes, activityRes] = await Promise.all([
        apiClient.get('/dashboard/stats'),
        apiClient.get('/dashboard/alerts/preview'),
        apiClient.get('/dashboard/activity'),
      ]);
      
      const hasData = statsRes.data?.todayComplaints > 0 || alertsRes.data?.length > 0;
      
      if (!hasData) {
        // Demo data
        setStats({
          todayComplaints: 8247,
          predictedHotspots: 23,
          activeAlerts: 47,
          fundBlockRequests: 12,
          totalRecoveredToday: 8500000,
          avgResponseTime: '3.8 min',
          successRate: 89,
          activeCases: 156
        });
        setAlerts([
          {
            _id: '1',
            title: 'Critical: High-value withdrawal predicted',
            location: { district: 'Mumbai - Andheri East' },
            severity: 'critical',
            predictedAmount: 285000,
            confidence: 96,
            timeWindow: '2-4 hours',
            atmId: 'HDFC-MUM-00234'
          },
          {
            _id: '2',
            title: 'Urgent: UPI fraud pattern detected',
            location: { district: 'Delhi - Connaught Place' },
            severity: 'critical',
            predictedAmount: 195000,
            confidence: 92,
            timeWindow: '1-3 hours',
            atmId: 'ICICI-DEL-00567'
          },
          {
            _id: '3',
            title: 'High Risk: Card cloning activity',
            location: { district: 'Bangalore - MG Road' },
            severity: 'high',
            predictedAmount: 125000,
            confidence: 84,
            timeWindow: '4-6 hours',
            atmId: 'SBI-BLR-00891'
          },
          {
            _id: '4',
            title: 'Alert: Suspicious account activity',
            location: { district: 'Hyderabad - Banjara Hills' },
            severity: 'high',
            predictedAmount: 145000,
            confidence: 78,
            timeWindow: '3-5 hours',
            atmId: 'AXIS-HYD-00123'
          }
        ]);
        setActivity([
          {
            _id: '1',
            action: 'Fund Block Approved',
            user: 'Inspector Rajesh Kumar',
            timestamp: new Date(Date.now() - 8 * 60000),
            details: 'HDFC Bank - ₹2,45,000',
            status: 'success'
          },
          {
            _id: '2',
            action: 'Case Created',
            user: 'Inspector Priya Sharma',
            timestamp: new Date(Date.now() - 25 * 60000),
            details: 'CASE-2025-0847 - Mumbai ATM Fraud',
            status: 'success'
          },
          {
            _id: '3',
            action: 'Alert Acknowledged',
            user: 'SI Mohammed Ali',
            timestamp: new Date(Date.now() - 45 * 60000),
            details: 'ALT-2025-0156 - High Risk Zone',
            status: 'info'
          },
          {
            _id: '4',
            action: 'Evidence Uploaded',
            user: 'Constable Ravi Kumar',
            timestamp: new Date(Date.now() - 1.5 * 3600000),
            details: 'CCTV Footage - CASE-2025-0845',
            status: 'success'
          },
          {
            _id: '5',
            action: 'Fraud Prevented',
            user: 'System Automated',
            timestamp: new Date(Date.now() - 2 * 3600000),
            details: 'ATM Withdrawal Blocked - ₹1,85,000',
            status: 'success'
          }
        ]);
      } else {
        setStats(statsRes.data);
        setAlerts(alertsRes.data);
        setActivity(activityRes.data);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data', error);
      setStats({
        todayComplaints: 8247,
        predictedHotspots: 23,
        activeAlerts: 47,
        fundBlockRequests: 12,
        totalRecoveredToday: 8500000,
        avgResponseTime: '3.8 min',
        successRate: 89,
        activeCases: 156
      });
    }
  };

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'critical': return 'from-danger to-red-700';
      case 'high': return 'from-accent-500 to-accent-700';
      case 'medium': return 'from-yellow-500 to-yellow-700';
      default: return 'from-primary-500 to-primary-700';
    }
  };

  // Chart Data
  const weeklyData = [
    { day: 'Mon', complaints: 1200, resolved: 980, prevented: 45 },
    { day: 'Tue', complaints: 1450, resolved: 1100, prevented: 52 },
    { day: 'Wed', complaints: 1680, resolved: 1250, prevented: 63 },
    { day: 'Thu', complaints: 1890, resolved: 1420, prevented: 71 },
    { day: 'Fri', complaints: 2100, resolved: 1650, prevented: 85 },
    { day: 'Sat', complaints: 1850, resolved: 1480, prevented: 68 },
    { day: 'Sun', complaints: 1580, resolved: 1290, prevented: 58 },
  ];

  const crimeTypeData = [
    { name: 'UPI Fraud', value: 35, color: '#ef4444' },
    { name: 'ATM Fraud', value: 28, color: '#f97316' },
    { name: 'Card Cloning', value: 18, color: '#f59e0b' },
    { name: 'Phishing', value: 12, color: '#3b82f6' },
    { name: 'Others', value: 7, color: '#8b5cf6' },
  ];

  const stateWiseData = [
    { state: 'Maharashtra', cases: 2890 },
    { state: 'Delhi', cases: 2456 },
    { state: 'Karnataka', cases: 2134 },
    { state: 'Tamil Nadu', cases: 1876 },
    { state: 'Telangana', cases: 1654 },
    { state: 'Gujarat', cases: 1432 },
  ];

  const monthlyTrendData = [
    { month: 'Jan', amount: 42, cases: 1200 },
    { month: 'Feb', amount: 48, cases: 1350 },
    { month: 'Mar', amount: 56, cases: 1580 },
    { month: 'Apr', amount: 52, cases: 1420 },
    { month: 'May', amount: 61, cases: 1680 },
    { month: 'Jun', amount: 58, cases: 1590 },
    { month: 'Jul', amount: 67, cases: 1820 },
    { month: 'Aug', amount: 73, cases: 1950 },
    { month: 'Sep', amount: 85, cases: 2240 },
    { month: 'Oct', amount: 78, cases: 2080 },
  ];

  // Additional Chart Data
  const fraudPreventionData = [
    { time: '00:00', prevented: 12, failed: 3, intervened: 15 },
    { time: '04:00', prevented: 8, failed: 2, intervened: 10 },
    { time: '08:00', prevented: 25, failed: 5, intervened: 30 },
    { time: '12:00', prevented: 38, failed: 7, intervened: 45 },
    { time: '16:00', prevented: 42, failed: 6, intervened: 48 },
    { time: '20:00', prevented: 35, failed: 8, intervened: 43 },
  ];

  // Response time data with translation key references
  const getResponseTimeData = () => [
    { categoryKey: 'criticalAlertsText', avgTime: 2.3, target: 3, fill: '#ef4444' },
    { categoryKey: 'highPriority', avgTime: 5.8, target: 8, fill: '#f97316' },
    { categoryKey: 'mediumPriority', avgTime: 12.4, target: 15, fill: '#f59e0b' },
    { categoryKey: 'standard', avgTime: 24.6, target: 30, fill: '#3b82f6' },
  ];
  
  const responseTimeData = getResponseTimeData().map(item => ({
    ...item,
    category: t(item.categoryKey)
  }));

  const predictiveAccuracyData = [
    { month: 'May', accuracy: 78, predictions: 145 },
    { month: 'Jun', accuracy: 82, predictions: 167 },
    { month: 'Jul', accuracy: 85, predictions: 189 },
    { month: 'Aug', accuracy: 88, predictions: 203 },
    { month: 'Sep', accuracy: 91, predictions: 225 },
    { month: 'Oct', accuracy: 94, predictions: 248 },
  ];

  // Funnel data with translation key references
  const getFunnelData = () => [
    { stageKey: 'complaintsStage', value: 8247, percentage: 100, fill: '#3b82f6' },
    { stageKey: 'alertsGeneratedStage', value: 6598, percentage: 80, fill: '#8b5cf6' },
    { stageKey: 'fundsBlockedStage', value: 4948, percentage: 60, fill: '#f59e0b' },
    { stageKey: 'investigationsStage', value: 3299, percentage: 40, fill: '#f97316' },
    { stageKey: 'recoveredStage', value: 1649, percentage: 20, fill: '#10b981' },
  ];

  const fundRecoveryFunnelData = getFunnelData();

  const hourlyAlertPatternData = [
    { hour: '00', Mon: 5, Tue: 7, Wed: 6, Thu: 8, Fri: 10, Sat: 12, Sun: 9 },
    { hour: '04', Mon: 3, Tue: 4, Wed: 3, Thu: 5, Fri: 6, Sat: 8, Sun: 7 },
    { hour: '08', Mon: 15, Tue: 18, Wed: 20, Thu: 22, Fri: 25, Sat: 20, Sun: 16 },
    { hour: '12', Mon: 28, Tue: 32, Wed: 35, Thu: 38, Fri: 42, Sat: 35, Sun: 30 },
    { hour: '16', Mon: 35, Tue: 40, Wed: 42, Thu: 45, Fri: 48, Sat: 40, Sun: 35 },
    { hour: '20', Mon: 25, Tue: 30, Wed: 32, Thu: 35, Fri: 38, Sat: 45, Sun: 42 },
  ];

  const performanceGaugeData = [
    { name: 'Prevention Rate', value: 89, fill: '#10b981' },
    { name: 'Remaining', value: 11, fill: '#e5e7eb' },
  ];

  return (
    <div className="min-h-screen" style={{background: 'transparent'}}>
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500 text-white p-8 rounded-2xl shadow-2xl mb-6 relative overflow-hidden animate-slide-in-up">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2 font-['Poppins']">
                {t('welcomeBack')}, {displayName}!
              </h1>
              <p className="text-primary-100 text-lg flex items-center gap-2">
                <Shield className="w-5 h-5" />
                {t('commandCenter')}
              </p>
            </div>
            <div className="text-right">
              <p className="text-primary-200 text-sm mb-1">{t('lastSync')}</p>
              <p className="text-white font-semibold flex items-center gap-2 justify-end">
                <Clock className="w-4 h-4" />
                {new Date().toLocaleTimeString()}
              </p>
              <div className="mt-2 inline-flex items-center gap-2 bg-success/20 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">{t('systemOperational')}</span>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-4 gap-4 mt-8">
            <Link to="/risk-map" className="bg-white/10 backdrop-blur-lg hover:bg-white/20 p-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl group">
              <MapIcon className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
              <p className="font-semibold">{t('riskMap')}</p>
              <p className="text-xs text-primary-200">{t('viewHeatmap')}</p>
            </Link>
            <Link to="/alerts" className="bg-white/10 backdrop-blur-lg hover:bg-white/20 p-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl group">
              <Bell className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
              <p className="font-semibold">{t('activeAlerts')}</p>
              <p className="text-xs text-primary-200">{toHindiNumber(stats?.activeAlerts || 0, currentLanguage)} {t('active')}</p>
            </Link>
            <Link to="/cases" className="bg-white/10 backdrop-blur-lg hover:bg-white/20 p-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl group">
              <Briefcase className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
              <p className="font-semibold">{t('cases')}</p>
              <p className="text-xs text-primary-200">{toHindiNumber(stats?.activeCases || 0, currentLanguage)} {t('active')}</p>
            </Link>
            <Link to="/reports" className="bg-white/10 backdrop-blur-lg hover:bg-white/20 p-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl group">
              <FileText className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
              <p className="font-semibold">{t('reports')}</p>
              <p className="text-xs text-primary-200">{t('generate')}</p>
            </Link>
          </div>
        </div>
      </div>

      {/* Enhanced Key Statistics - Gradient Cards with Icons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Today's Complaints - Enhanced */}
        <div className="relative bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 rounded-3xl shadow-card hover:shadow-card-hover transition-all duration-500 p-6 border border-blue-300 group hover:scale-105 animate-slide-in-up overflow-hidden" style={{animationDelay: '0.1s'}}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-4 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl shadow-glow-primary group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div className="text-right">
                <p className="text-xs text-neutral-500 font-semibold uppercase tracking-wide mb-1">{t('todayComplaints')}</p>
                <p className="text-4xl font-black bg-gradient-to-r from-primary-700 to-primary-900 bg-clip-text text-transparent">{formatNumber(stats?.todayComplaints || 0, currentLanguage)}</p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-primary-100">
              <span className="text-success flex items-center gap-1.5 font-bold text-sm">
                <TrendingUp className="w-4 h-4" />
                +{toHindiNumber('12.5', currentLanguage)}%
              </span>
              <span className="text-neutral-500 text-xs">{t('vsYesterday')}</span>
            </div>
          </div>
        </div>

        {/* Predicted Hotspots - Enhanced */}
        <div className="relative bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 rounded-3xl shadow-card hover:shadow-card-hover transition-all duration-500 p-6 border border-blue-300 group hover:scale-105 animate-slide-in-up overflow-hidden" style={{animationDelay: '0.2s'}}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent-500/5 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-4 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl shadow-glow-accent group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 relative">
                <Target className="w-8 h-8 text-white" />
                <div className="absolute inset-0 bg-white/20 rounded-2xl animate-pulse"></div>
              </div>
              <div className="text-right">
                <p className="text-xs text-neutral-500 font-semibold uppercase tracking-wide mb-1">{t('predictedHotspots')}</p>
                <p className="text-4xl font-black bg-gradient-to-r from-accent-600 to-accent-800 bg-clip-text text-transparent">{toHindiNumber(stats?.predictedHotspots || 0, currentLanguage)}</p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-accent-100">
              <span className="text-accent-600 flex items-center gap-1.5 font-bold text-sm">
                <Zap className="w-4 h-4" />
                {t('aiPowered')}
              </span>
              <span className="text-neutral-500 text-xs">{t('next24h')}</span>
            </div>
          </div>
        </div>

        {/* Active Alerts - Enhanced */}
        <div className="relative bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 rounded-3xl shadow-card hover:shadow-card-hover transition-all duration-500 p-6 border border-blue-300 group hover:scale-105 animate-slide-in-up overflow-hidden" style={{animationDelay: '0.3s'}}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-danger/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-4 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl shadow-glow-primary group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 relative">
                <Bell className="w-8 h-8 text-white animate-pulse" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent-400 rounded-full animate-ping"></div>
              </div>
              <div className="text-right">
                <p className="text-xs text-neutral-500 font-semibold uppercase tracking-wide mb-1">{t('activeAlerts')}</p>
                <p className="text-4xl font-black bg-gradient-to-r from-primary-700 to-primary-900 bg-clip-text text-transparent">{toHindiNumber(stats?.activeAlerts || 0, currentLanguage)}</p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-red-100">
              <span className="text-danger flex items-center gap-1.5 font-bold text-sm">
                <AlertTriangle className="w-4 h-4" />
                {t('urgent')}
              </span>
              <span className="text-neutral-500 text-xs">{t('needsAction')}</span>
            </div>
          </div>
        </div>

        {/* Total Recovered - Enhanced */}
        <div className="relative bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 rounded-3xl shadow-card hover:shadow-card-hover transition-all duration-500 p-6 border border-blue-300 group hover:scale-105 animate-slide-in-up overflow-hidden" style={{animationDelay: '0.4s'}}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-success/5 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-4 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl shadow-glow-accent group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <div className="text-right">
                <p className="text-xs text-neutral-500 font-semibold uppercase tracking-wide mb-1">{t('recoveredToday')}</p>
                <p className="text-4xl font-black bg-gradient-to-r from-accent-600 to-accent-800 bg-clip-text text-transparent">₹{toHindiNumber(((stats?.totalRecoveredToday || 0) / 100000).toFixed(1), currentLanguage)}L</p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-green-100">
              <span className="text-success flex items-center gap-1.5 font-bold text-sm">
                <CheckCircle className="w-4 h-4" />
                {toHindiNumber(stats?.successRate || 0, currentLanguage)}% {t('success')}
              </span>
              <span className="text-neutral-500 text-xs">{t('recoveryRate')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Critical Alerts - 2 columns */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6 animate-slide-in-left">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-primary-900 flex items-center gap-3">
              <div className="p-2 bg-danger/10 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-danger" />
              </div>
              {t('criticalAlerts')}
            </h2>
            <Link to="/alerts" className="text-primary-600 hover:text-primary-800 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
              {t('viewAll')}
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="space-y-4">
            {alerts.slice(0, 4).map((alert, index) => (
              <div 
                key={alert._id} 
                className="bg-gradient-to-r from-white to-neutral-50 border-l-4 border-danger rounded-xl p-5 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
                style={{animation: `fadeIn 0.5s ease-out ${index * 0.1}s forwards`, opacity: 0}}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getSeverityColor(alert.severity)}`}>
                        {alert.severity?.toUpperCase()}
                      </span>
                      <span className="text-xs text-neutral-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {alert.timeWindow}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-primary-900 mb-1 group-hover:text-accent-600 transition-colors">
                      {alert.title}
                    </h3>
                    <p className="text-sm text-neutral-600 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-accent-500" />
                      {alert.location?.district} • ATM: {alert.atmId}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-neutral-500 mb-1">{t('predictedAmount')}</p>
                    <p className="text-2xl font-bold text-danger">₹{toHindiNumber((alert.predictedAmount / 1000).toFixed(0), currentLanguage)}K</p>
                    <div className="mt-2 inline-flex items-center gap-1 bg-success/10 px-2 py-1 rounded-full">
                      <Eye className="w-3 h-3 text-success" />
                      <span className="text-xs text-success font-semibold">{toHindiNumber(alert.confidence, currentLanguage)}% {t('confidence')}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:shadow-lg">
                    {t('acknowledge')}
                  </button>
                  <button className="flex-1 bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:shadow-lg">
                    {t('deployTeam')}
                  </button>
                  <button className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg text-sm font-semibold transition-all">
                    {t('details')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Activity Feed - 1 column */}
        <div className="bg-white rounded-2xl shadow-xl p-6 animate-slide-in-right">
          <h2 className="text-xl font-bold text-primary-900 mb-6 flex items-center gap-3">
            <div className="p-2 bg-success/10 rounded-lg">
              <Activity className="w-6 h-6 text-success" />
            </div>
            {t('liveActivityFeed')}
          </h2>

          <div className="space-y-4">
            {activity.map((item, index) => (
              <div 
                key={item._id} 
                className="relative pl-6 pb-4 border-l-2 border-neutral-200 last:border-l-0 last:pb-0"
                style={{animation: `slideInRight 0.5s ease-out ${index * 0.1}s forwards`, opacity: 0}}
              >
                <div className={`absolute left-[-9px] top-0 w-4 h-4 rounded-full ${
                  item.status === 'success' ? 'bg-success' : 
                  item.status === 'info' ? 'bg-primary-500' : 'bg-neutral-400'
                } border-4 border-white`}></div>
                
                <div>
                  <p className="font-semibold text-primary-900 text-sm mb-1">{item.action}</p>
                  <p className="text-xs text-neutral-600 mb-1">{item.details}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-neutral-500">{item.user}</p>
                    <p className="text-xs text-neutral-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {format(new Date(item.timestamp), 'HH:mm')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-4 py-3 rounded-lg font-semibold transition-all hover:shadow-md flex items-center justify-center gap-2">
            {t('viewFullHistory')}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl shadow-xl p-6 text-white animate-slide-in-up">
          <Database className="w-10 h-10 mb-3 opacity-80" />
          <p className="text-primary-200 text-sm mb-1">{t('casesResolvedToday')}</p>
          <p className="text-4xl font-bold">{toHindiNumber(34, currentLanguage)}</p>
          <p className="text-sm text-primary-200 mt-2">+{toHindiNumber(18, currentLanguage)}% {t('fromYesterday')}</p>
        </div>

        <div className="bg-gradient-to-br from-accent-500 to-accent-700 rounded-2xl shadow-xl p-6 text-white animate-slide-in-up" style={{animationDelay: '0.1s'}}>
          <Users className="w-10 h-10 mb-3 opacity-80" />
          <p className="text-accent-100 text-sm mb-1">{t('activeLEAOfficers')}</p>
          <p className="text-4xl font-bold">{toHindiNumber(127, currentLanguage)}</p>
          <p className="text-sm text-accent-100 mt-2">{t('acrossStates')}</p>
        </div>

        <div className="bg-gradient-to-br from-success to-green-700 rounded-2xl shadow-xl p-6 text-white animate-slide-in-up" style={{animationDelay: '0.2s'}}>
          <Zap className="w-10 h-10 mb-3 opacity-80" />
          <p className="text-green-100 text-sm mb-1">{t('avgResponseTime')}</p>
          <p className="text-4xl font-bold">{stats?.avgResponseTime ? toHindiNumber(stats.avgResponseTime, currentLanguage) : toHindiNumber('0', currentLanguage) + ' min'}</p>
          <p className="text-sm text-green-100 mt-2">-{toHindiNumber(22, currentLanguage)}% {t('improvement')}</p>
        </div>
      </div>

      {/* Analytics & Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Weekly Trend Chart */}
        <div className="bg-white rounded-3xl shadow-xl p-6 animate-fade-in border border-primary-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-primary-600 to-cyber-600 rounded-2xl shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary-900">{t('weeklyTrendAnalysis')}</h3>
                <p className="text-sm text-neutral-600">{t('complaintsVsResolved')}</p>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={weeklyData}>
              <defs>
                <linearGradient id="colorComplaints" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" stroke="#6b7280" style={{ fontSize: '12px', fontWeight: 600 }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px', fontWeight: 600 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '2px solid #e5e7eb', 
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px', fontWeight: 600 }} />
              <Area type="monotone" dataKey="complaints" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorComplaints)" />
              <Area type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorResolved)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Crime Type Distribution */}
        <div className="bg-white rounded-3xl shadow-xl p-6 animate-fade-in border border-accent-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-accent-500 to-orange-600 rounded-2xl shadow-lg">
                <PieChart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary-900">{t('crimeTypeDistribution')}</h3>
                <p className="text-sm text-neutral-600">{t('byCategory')}</p>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPie>
              <Pie
                data={crimeTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {crimeTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '2px solid #e5e7eb', 
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
              />
            </RechartsPie>
          </ResponsiveContainer>
        </div>

        {/* State-wise Cases */}
        <div className="bg-white rounded-3xl shadow-xl p-6 animate-fade-in border border-success/20">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-success to-green-700 rounded-2xl shadow-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary-900">{t('topStatesByCases')}</h3>
                <p className="text-sm text-neutral-600">{t('currentMonth')}</p>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stateWiseData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="state" stroke="#6b7280" style={{ fontSize: '11px', fontWeight: 600 }} angle={-15} textAnchor="end" height={80} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px', fontWeight: 600 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '2px solid #e5e7eb', 
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="cases" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#14b8a6" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Recovery Trend */}
        <div className="bg-white rounded-3xl shadow-xl p-6 animate-fade-in border border-danger/20">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-danger to-red-700 rounded-2xl shadow-lg">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary-900">{t('recoveryTrend')}</h3>
                <p className="text-sm text-neutral-600">{t('amountInLakhs')}</p>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px', fontWeight: 600 }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px', fontWeight: 600 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '2px solid #e5e7eb', 
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px', fontWeight: 600 }} />
              <Line type="monotone" dataKey="amount" name="Recovered (₹L)" stroke="#ef4444" strokeWidth={3} dot={{ fill: '#ef4444', r: 6 }} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="cases" name="Cases" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', r: 6 }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Advanced Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Real-time Fraud Prevention Performance */}
        <div className="bg-white rounded-3xl shadow-xl p-6 animate-fade-in border border-purple-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-purple-600 to-violet-700 rounded-2xl shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary-900">{t('realTimeFraudPrevention')}</h3>
                <p className="text-sm text-neutral-600">{t('24HourPerformance')}</p>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={fraudPreventionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="time" stroke="#6b7280" style={{ fontSize: '12px', fontWeight: 600 }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px', fontWeight: 600 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '2px solid #e5e7eb', 
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px', fontWeight: 600 }} />
              <Bar dataKey="prevented" fill="#10b981" radius={[8, 8, 0, 0]} name={t('prevented')} />
              <Bar dataKey="failed" fill="#ef4444" radius={[8, 8, 0, 0]} name={t('failed')} />
              <Line type="monotone" dataKey="intervened" stroke="#8b5cf6" strokeWidth={3} name={t('intervened')} dot={{ fill: '#8b5cf6', r: 5 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Predictive Accuracy Over Time */}
        <div className="bg-white rounded-3xl shadow-xl p-6 animate-fade-in border border-cyan-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-cyan-600 to-blue-700 rounded-2xl shadow-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary-900">{t('aiPredictiveAccuracy')}</h3>
                <p className="text-sm text-neutral-600">{t('mlModelPerformance')}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-black text-cyan-600">{toHindiNumber(94, currentLanguage)}%</p>
              <p className="text-xs text-neutral-500">{t('current')}</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={predictiveAccuracyData}>
              <defs>
                <linearGradient id="accuracyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px', fontWeight: 600 }} />
              <YAxis yAxisId="left" stroke="#6b7280" style={{ fontSize: '12px', fontWeight: 600 }} />
              <YAxis yAxisId="right" orientation="right" stroke="#6b7280" style={{ fontSize: '12px', fontWeight: 600 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '2px solid #e5e7eb', 
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px', fontWeight: 600 }} />
              <Area yAxisId="left" type="monotone" dataKey="accuracy" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#accuracyGradient)" name={t('accuracy')} />
              <Bar yAxisId="right" dataKey="predictions" fill="#3b82f6" radius={[8, 8, 0, 0]} name={t('predictionsMade')} opacity={0.6} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Fund Recovery Funnel */}
        <div className="bg-white rounded-3xl shadow-xl p-6 animate-fade-in border border-emerald-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl shadow-lg">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary-900">{t('fundRecoveryPipeline')}</h3>
                <p className="text-sm text-neutral-600">{t('todaysFunnelAnalysis')}</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            {fundRecoveryFunnelData.map((item, index) => (
              <div key={index} className="relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-neutral-700">{t(item.stageKey)}</span>
                  <span className="text-sm font-bold" style={{ color: item.fill }}>
                    {formatNumber(item.value, currentLanguage)} ({toHindiNumber(item.percentage, currentLanguage)}%)
                  </span>
                </div>
                <div className="w-full bg-neutral-100 rounded-full h-8 overflow-hidden">
                  <div 
                    className="h-full rounded-full flex items-center justify-end px-3 text-white font-semibold text-xs transition-all duration-1000 ease-out"
                    style={{ 
                      width: `${item.percentage}%`, 
                      background: `linear-gradient(90deg, ${item.fill} 0%, ${item.fill}dd 100%)`,
                      animation: `expandWidth 1s ease-out ${index * 0.1}s forwards`
                    }}
                  >
                    {item.percentage >= 30 && `${toHindiNumber(item.percentage, currentLanguage)}%`}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-neutral-700">{t('conversionRate')}</span>
              <span className="text-2xl font-black text-emerald-600">{toHindiNumber(20, currentLanguage)}%</span>
            </div>
            <p className="text-xs text-neutral-500 mt-1">{t('fromComplaintToRecovery')}</p>
          </div>
        </div>

        {/* Response Time Performance Gauge */}
        <div className="bg-white rounded-3xl shadow-xl p-6 animate-fade-in border border-amber-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl shadow-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary-900">{t('responseTimeAnalysis')}</h3>
                <p className="text-sm text-neutral-600">{t('avgVsTarget')}</p>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={responseTimeData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" stroke="#6b7280" style={{ fontSize: '12px', fontWeight: 600 }} />
              <YAxis dataKey="category" type="category" stroke="#6b7280" style={{ fontSize: '11px', fontWeight: 600 }} width={120} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '2px solid #e5e7eb', 
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px', fontWeight: 600 }} />
              <Bar dataKey="avgTime" name="Average Time" fill="#06b6d4" radius={[0, 8, 8, 0]} />
              <Bar dataKey="target" name="Target Time" fill="#d1d5db" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="p-3 bg-emerald-50 rounded-xl">
              <p className="text-xs text-neutral-600 mb-1">{t('avgResponse')}</p>
              <p className="text-2xl font-bold text-emerald-600">{stats?.avgResponseTime || '3.8 min'}</p>
            </div>
            <div className="p-3 bg-amber-50 rounded-xl">
              <p className="text-xs text-neutral-600 mb-1">{t('target')}</p>
              <p className="text-2xl font-bold text-amber-600">5.0 min</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hourly Alert Pattern Heatmap Style */}
      <div className="mt-6 bg-white rounded-3xl shadow-xl p-6 animate-fade-in border border-indigo-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl shadow-lg">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-primary-900">Hourly Alert Pattern Analysis</h3>
              <p className="text-sm text-neutral-600">Weekly Distribution by Time of Day</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-gradient-to-r from-blue-200 to-blue-300 rounded"></div>
              <span className="text-neutral-600">Low</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-purple-500 rounded"></div>
              <span className="text-neutral-600">Medium</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-red-600 rounded"></div>
              <span className="text-neutral-600">High</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart data={hourlyAlertPatternData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="hour" stroke="#6b7280" style={{ fontSize: '12px', fontWeight: 600 }} label={{ value: 'Hour of Day', position: 'insideBottom', offset: -5 }} />
            <YAxis stroke="#6b7280" style={{ fontSize: '12px', fontWeight: 600 }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '2px solid #e5e7eb', 
                borderRadius: '12px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px', fontWeight: 600 }} />
            <Line type="monotone" dataKey="Mon" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="Tue" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="Wed" stroke="#06b6d4" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="Thu" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="Fri" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="Sat" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="Sun" stroke="#ec4899" strokeWidth={2} dot={{ r: 4 }} />
          </ComposedChart>
          </ResponsiveContainer>
        <div className="mt-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-neutral-600 mb-1">Peak Hour</p>
              <p className="text-lg font-bold text-indigo-600">16:00</p>
            </div>
            <div>
              <p className="text-xs text-neutral-600 mb-1">Peak Day</p>
              <p className="text-lg font-bold text-purple-600">Friday</p>
            </div>
            <div>
              <p className="text-xs text-neutral-600 mb-1">Avg Alerts/Hour</p>
              <p className="text-lg font-bold text-pink-600">27.3</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Gauge & Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Prevention Success Rate Gauge */}
        <div className="bg-gradient-to-br from-white to-emerald-50 rounded-3xl shadow-xl p-6 border border-emerald-200 animate-fade-in">
          <div className="text-center mb-4">
            <h3 className="text-lg font-bold text-primary-900 mb-2">Prevention Success Rate</h3>
            <div className="relative inline-flex items-center justify-center">
              <svg className="transform -rotate-90 w-40 h-40">
                <circle cx="80" cy="80" r="70" stroke="#e5e7eb" strokeWidth="12" fill="transparent" />
                <circle 
                  cx="80" 
                  cy="80" 
                  r="70" 
                  stroke="url(#gaugeGradient)" 
                  strokeWidth="12" 
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 70}`}
                  strokeDashoffset={`${2 * Math.PI * 70 * (1 - 0.89)}`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#14b8a6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-black text-emerald-600">89%</span>
                <span className="text-xs text-neutral-500 mt-1">Success</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <p className="text-xs text-neutral-600 mb-1">Prevented</p>
              <p className="text-xl font-bold text-emerald-600">1,847</p>
            </div>
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <p className="text-xs text-neutral-600 mb-1">Failed</p>
              <p className="text-xl font-bold text-red-500">228</p>
            </div>
          </div>
        </div>

        {/* Geographic Coverage */}
        <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-xl p-6 border border-blue-200 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-lg">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-primary-900">Geographic Coverage</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm">
              <span className="text-sm font-semibold text-neutral-700">Active States</span>
              <span className="text-2xl font-bold text-blue-600">28</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm">
              <span className="text-sm font-semibold text-neutral-700">Covered Districts</span>
              <span className="text-2xl font-bold text-indigo-600">542</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm">
              <span className="text-sm font-semibold text-neutral-700">Monitored ATMs</span>
              <span className="text-2xl font-bold text-purple-600">12.4K</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm">
              <span className="text-sm font-semibold text-neutral-700">Bank Partners</span>
              <span className="text-2xl font-bold text-cyan-600">47</span>
            </div>
          </div>
        </div>

        {/* System Health Indicators */}
        <div className="bg-gradient-to-br from-white to-purple-50 rounded-3xl shadow-xl p-6 border border-purple-200 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-700 rounded-2xl shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-primary-900">System Health</h3>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-neutral-700">API Uptime</span>
                <span className="text-sm font-bold text-green-600">99.98%</span>
              </div>
              <div className="w-full bg-neutral-100 rounded-full h-3">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full" style={{ width: '99.98%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-neutral-700">ML Model Health</span>
                <span className="text-sm font-bold text-blue-600">Excellent</span>
              </div>
              <div className="w-full bg-neutral-100 rounded-full h-3">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-600 h-3 rounded-full" style={{ width: '96%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-neutral-700">Data Sync</span>
                <span className="text-sm font-bold text-purple-600">Real-time</span>
              </div>
              <div className="w-full bg-neutral-100 rounded-full h-3">
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 h-3 rounded-full animate-pulse" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-neutral-700">All Systems Operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
