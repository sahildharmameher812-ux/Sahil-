import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Map, Bell, Briefcase, FileText, Brain, Building2, 
  BarChart3, Settings, FileCheck, Search, User, LogOut, Shield,
  Menu, X, ChevronDown, Globe, Phone, Mail, Activity, Languages,
  ChevronRight, Home
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useTranslation } from 'react-i18next';

const getMenuItems = (t: any) => [
  { icon: Home, label: t('home') || 'Home', path: '/', badge: null },
  { icon: LayoutDashboard, label: t('dashboard'), path: '/dashboard', badge: null },
  { icon: Map, label: t('riskHeatmap'), path: '/risk-map', badge: t('live') },
  { icon: Bell, label: t('alerts'), path: '/alerts', badge: '47' },
  { icon: Brain, label: t('aiModels'), path: '/models', badge: 'AI' },
  { icon: Brain, label: t('intelligence'), path: '/intelligence', badge: null },
  { icon: Briefcase, label: t('cases'), path: '/cases', badge: null },
  { icon: FileText, label: t('complaints'), path: '/complaints', badge: null },
  { icon: Building2, label: t('banks'), path: '/banks', badge: null },
  { icon: BarChart3, label: t('reports'), path: '/reports', badge: null },
  { icon: Settings, label: t('admin'), path: '/admin', badge: null },
  { icon: FileCheck, label: t('audit'), path: '/audit', badge: null },
];

export default function LayoutFinalFixed({ children }: { children: React.ReactNode }) {
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const langMenuRef = useRef<HTMLDivElement>(null);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLangMenuOpen(false);
  };

  const menuItems = getMenuItems(t);

  // Close language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setLangMenuOpen(false);
      }
    };

    if (langMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [langMenuOpen]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 via-white to-orange-50">
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity animate-fade-in"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar Navigation */}
      <aside className={`fixed top-0 left-0 h-full w-80 bg-gradient-to-b from-white to-blue-50 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="p-6 bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            <div className="flex items-center justify-between mb-4 relative">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm shadow-xl">
                  <Shield className="w-7 h-7 text-white drop-shadow-lg" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Navigation Menu</h2>
                  <p className="text-xs text-white/90">CWRI Command Center</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2.5 hover:bg-white/20 rounded-xl transition-all hover:rotate-90 duration-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`relative flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-primary-600 to-accent-500 text-white shadow-lg scale-[1.02]'
                      : 'text-neutral-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-orange-50 hover:text-primary-900 hover:shadow-md'
                  }`}
                  style={{
                    animation: sidebarOpen ? `slideInLeft 0.3s ease-out ${index * 0.05}s forwards` : 'none',
                    opacity: sidebarOpen ? 1 : 0
                  }}
                >
                  <div className={`p-2 rounded-lg ${isActive ? 'bg-white/20' : 'bg-primary-50 group-hover:bg-primary-100'}`}>
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-primary-600 group-hover:text-primary-700 group-hover:scale-110 transition-transform'}`} />
                  </div>
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : item.badge === 'Live' || item.badge === t('live') ? 'bg-success/10 text-success animate-pulse' 
                        : item.badge === 'AI' ? 'bg-gradient-to-r from-primary-100 to-accent-100 text-primary-900'
                        : 'bg-danger/10 text-danger'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  {!isActive && (
                    <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                  )}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full shadow-lg"></div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-neutral-200 bg-neutral-50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-neutral-900 truncate">{user?.name || 'Admin User'}</p>
                <p className="text-xs text-neutral-600 truncate">{user?.role || 'I4C Admin'}</p>
              </div>
            </div>
            <button
              onClick={() => {
                logout();
                setSidebarOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-danger/10 hover:bg-danger/20 text-danger rounded-lg transition-colors font-semibold text-sm"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Top Government Info Bar */}
      <div className="bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 text-white px-6 py-2 text-sm animate-slide-in-down relative z-[100]">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
        <div className="max-w-[1920px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span className="font-medium">{t('ministry') || 'Ministry of Home Affairs, Government of India'}</span>
            </div>
            <div className="hidden lg:flex items-center gap-4 text-xs text-primary-200">
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" />
                <span>{t('helpline')}</span>
              </div>
              <span>|</span>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                <span>{t('email')}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span>{t('systemActive')}</span>
            </div>
            
            {/* Language Switcher */}
            <div className="relative" ref={langMenuRef}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLangMenuOpen(!langMenuOpen);
                }}
                className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg transition-all cursor-pointer"
              >
                <Languages className="w-4 h-4" />
                <span className="font-medium">{i18n.language === 'hi' ? 'हिन्दी' : 'English'}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {langMenuOpen && (
                <div 
                  className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-2xl border border-neutral-200 py-2 min-w-[160px] z-[9999] animate-fade-in"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      changeLanguage('en');
                    }}
                    className={`w-full px-4 py-2.5 text-left text-sm hover:bg-blue-50 transition-colors flex items-center gap-2 ${
                      i18n.language === 'en' ? 'bg-blue-50 text-primary-600 font-bold' : 'text-neutral-700 font-medium'
                    }`}
                  >
                    <span className="text-lg">🇬🇧</span>
                    <span>English</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      changeLanguage('hi');
                    }}
                    className={`w-full px-4 py-2.5 text-left text-sm hover:bg-blue-50 transition-colors flex items-center gap-2 ${
                      i18n.language === 'hi' ? 'bg-blue-50 text-primary-600 font-bold' : 'text-neutral-700 font-medium'
                    }`}
                  >
                    <span className="text-lg">🇮🇳</span>
                    <span>हिन्दी (Hindi)</span>
                  </button>
                </div>
              )}
            </div>
            
            <span className="opacity-75">{new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
          </div>
        </div>
      </div>

      {/* Main Header with Logo and Menu Button */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-[1920px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-8">
            {/* Left Section with Menu Button and Logo */}
            <div className="flex items-center gap-4">
              {/* Three Dot Menu Button for Sidebar */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="relative p-3 bg-gradient-to-br from-primary-600 to-primary-700 hover:from-primary-700 hover:to-accent-600 text-white rounded-xl transition-all duration-300 hover:shadow-2xl hover:scale-110 group overflow-hidden"
                title="Open Navigation Menu"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <div className="relative z-10 flex flex-col gap-1.5 w-6 h-6 justify-center">
                  <span className="block w-1.5 h-1.5 bg-white rounded-full transition-all group-hover:w-6"></span>
                  <span className="block w-1.5 h-1.5 bg-white rounded-full transition-all group-hover:w-6 delay-75"></span>
                  <span className="block w-1.5 h-1.5 bg-white rounded-full transition-all group-hover:w-6 delay-150"></span>
                </div>
              </button>

              {/* Logo Section */}
              <Link to="/" className="flex items-center gap-4 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-cyber blur-2xl opacity-50 group-hover:opacity-80 transition-all duration-500 animate-pulse"></div>
                  <div className="relative bg-gradient-to-r from-primary-600 to-accent-500 p-3 rounded-2xl shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <Shield className="w-10 h-10 text-white drop-shadow-lg" />
                    <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-900 via-primary-600 to-accent-600 bg-clip-text text-transparent font-['Poppins'] group-hover:scale-105 transition-transform duration-300">
                    {t('cwriTitle') || 'CWRI Portal'}
                  </h1>
                  <p className="text-xs font-semibold bg-gradient-to-r from-neutral-600 to-neutral-800 bg-clip-text text-transparent">
                    {t('cwriSubtitle') || 'Cash Withdrawal Risk Intelligence'}
                  </p>
                </div>
              </Link>
            </div>

            {/* Center Search Bar */}
            <div className="flex-1 max-w-2xl mx-auto hidden md:block">
              <div className="relative w-full group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400 group-hover:text-accent-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Search complaints, cases, alerts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-neutral-50 border-2 border-neutral-200 rounded-xl focus:border-accent-500 focus:ring-4 focus:ring-accent-100 focus:bg-white outline-none transition-all text-sm font-medium"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Activity Indicator */}
              <div className="hidden lg:flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-success/10 to-success/20 rounded-xl border border-success/20 shadow-lg shadow-success/10">
                <div className="relative">
                  <Activity className="w-4 h-4 text-success animate-pulse" />
                  <div className="absolute inset-0 bg-success/30 blur-md animate-pulse"></div>
                </div>
                <span className="text-xs font-bold text-success">Live</span>
              </div>

              {/* Notifications */}
              <button className="relative p-3 bg-gradient-to-br from-neutral-50 to-neutral-100 hover:from-accent-50 hover:to-accent-100 rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-110 group border border-neutral-200 hover:border-accent-300">
                <Bell className="w-5 h-5 text-neutral-700 group-hover:text-accent-600 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" />
                <span className="absolute top-1.5 right-1.5 w-3 h-3 bg-gradient-to-br from-danger to-red-600 rounded-full animate-pulse shadow-lg shadow-danger/50"></span>
                <span className="absolute top-1.5 right-1.5 w-3 h-3 bg-danger rounded-full animate-ping"></span>
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-3 px-4 py-2 bg-neutral-100 hover:bg-primary-50 rounded-xl transition-all duration-300 hover:shadow-md"
                >
                  <div className="hidden md:block text-right">
                    <p className="text-sm font-bold text-primary-900">{user?.name || 'Admin User'}</p>
                    <p className="text-xs text-neutral-600">{user?.role || 'I4C Admin'}</p>
                  </div>
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-md">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-neutral-600 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* User Dropdown */}
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden animate-slide-in-up">
                    <div className="p-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white">
                      <p className="font-bold text-lg">{user?.name || 'Admin User'}</p>
                      <p className="text-sm text-primary-100">{user?.email || 'admin@cwri.gov.in'}</p>
                    </div>
                    <div className="p-2">
                      <Link to="/admin" className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 rounded-xl transition-colors">
                        <Settings className="w-5 h-5 text-neutral-600" />
                        <span className="font-medium text-neutral-700">Settings</span>
                      </Link>
                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-danger/10 rounded-xl transition-colors text-danger"
                      >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[1920px] mx-auto px-6 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-primary-900 text-white mt-auto border-t-4 border-accent-500">
        <div className="max-w-[1920px] mx-auto px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* About */}
            <div>
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                CWRI Portal
              </h3>
              <p className="text-primary-200 text-sm leading-relaxed">
                Advanced AI-powered predictive analytics framework for proactive cybercrime intervention. 
                Protecting India's digital economy 24/7.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-3">Quick Links</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <a href="#" className="text-primary-200 hover:text-accent-300 transition-colors">About I4C</a>
                <a href="#" className="text-primary-200 hover:text-accent-300 transition-colors">Privacy Policy</a>
                <a href="#" className="text-primary-200 hover:text-accent-300 transition-colors">User Guide</a>
                <a href="#" className="text-primary-200 hover:text-accent-300 transition-colors">Terms of Service</a>
                <a href="#" className="text-primary-200 hover:text-accent-300 transition-colors">Contact Us</a>
                <a href="#" className="text-primary-200 hover:text-accent-300 transition-colors">Help & Support</a>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-bold mb-3">Contact Information</h3>
              <div className="space-y-2 text-sm text-primary-200">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>1930 (National Cybercrime Helpline)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>support@cybercrime.gov.in</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span>cybercrime.gov.in</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-6 border-t border-primary-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <p className="text-primary-200">
              © 2025 Ministry of Home Affairs, Government of India. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs text-primary-300">
              <span>Indian Cyber Crime Coordination Centre (I4C)</span>
              <span>•</span>
              <span>Version 1.0.0</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                Operational
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}