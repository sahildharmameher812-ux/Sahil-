import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Map, Bell, Briefcase, FileText, Brain, Building2, 
  BarChart3, Settings, FileCheck, Search, User, LogOut, Shield,
  Menu, X, ChevronDown, Globe, Phone, Mail, Activity, Languages,
  ChevronRight, Home, Sparkles, Zap, Award
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useTranslation } from 'react-i18next';

const getMenuItems = (t: any) => [
  { icon: Home, label: t('home') || 'Home', path: '/', badge: null, color: 'from-blue-500 to-indigo-600' },
  { icon: LayoutDashboard, label: t('dashboard'), path: '/dashboard', badge: null, color: 'from-purple-500 to-pink-600' },
  { icon: Map, label: t('riskHeatmap'), path: '/risk-map', badge: 'LIVE', color: 'from-green-500 to-emerald-600' },
  { icon: Bell, label: t('alerts'), path: '/alerts', badge: '47', color: 'from-red-500 to-orange-600' },
  { icon: Brain, label: t('aiModels'), path: '/models', badge: 'AI', color: 'from-indigo-500 to-purple-600' },
  { icon: Brain, label: t('intelligence'), path: '/intelligence', badge: null, color: 'from-cyan-500 to-blue-600' },
  { icon: Briefcase, label: t('cases'), path: '/cases', badge: null, color: 'from-amber-500 to-orange-600' },
  { icon: FileText, label: t('complaints'), path: '/complaints', badge: null, color: 'from-teal-500 to-green-600' },
  { icon: Building2, label: t('banks'), path: '/banks', badge: null, color: 'from-slate-500 to-gray-600' },
  { icon: BarChart3, label: t('reports'), path: '/reports', badge: null, color: 'from-violet-500 to-purple-600' },
  { icon: Settings, label: t('admin'), path: '/admin', badge: null, color: 'from-gray-500 to-slate-600' },
  { icon: FileCheck, label: t('audit'), path: '/audit', badge: null, color: 'from-rose-500 to-pink-600' },
];

export default function LayoutPremium({ children }: { children: React.ReactNode }) {
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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Premium Sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`fixed top-0 left-0 h-full w-80 bg-gradient-to-b from-white via-blue-50/50 to-white shadow-2xl z-50 transform transition-all duration-500 ease-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="h-full flex flex-col">
          <div className="p-6 bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-700 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M0%2040L40%200H20L0%2020M40%2040V20L20%2040%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
            <div className="flex items-center justify-between relative">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 backdrop-blur-xl p-3 rounded-2xl shadow-2xl">
                  <Shield className="w-8 h-8 text-white drop-shadow-lg" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Navigation</h2>
                  <p className="text-sm text-white/80">Control Panel</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 hover:bg-white/20 rounded-xl transition-all hover:rotate-90 duration-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`relative group flex items-center gap-3 px-4 py-3 rounded-2xl font-medium text-sm transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r ' + item.color + ' text-white shadow-lg scale-[1.02]'
                      : 'text-gray-700 hover:bg-gradient-to-r hover:' + item.color + ' hover:text-white hover:shadow-lg hover:scale-[1.02]'
                  }`}
                  style={{
                    animation: sidebarOpen ? `slideInLeft 0.3s ease-out ${index * 0.05}s forwards` : 'none',
                    opacity: sidebarOpen ? 1 : 0
                  }}
                >
                  <div className={`p-2 rounded-xl ${isActive ? 'bg-white/20' : 'bg-gray-100 group-hover:bg-white/20'}`}>
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-600 group-hover:text-white'}`} />
                  </div>
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : item.badge === 'LIVE' ? 'bg-green-100 text-green-700 animate-pulse' 
                        : item.badge === 'AI' ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  {!isActive && (
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-200 bg-gradient-to-b from-gray-50 to-white">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-900">{user?.name || 'Admin User'}</p>
                <p className="text-xs text-gray-500">{user?.role || 'Administrator'}</p>
              </div>
            </div>
            <button
              onClick={() => {
                logout();
                setSidebarOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all font-semibold shadow-lg hover:shadow-xl"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Premium Navbar */}
      <header className="bg-gradient-to-r from-sky-100 to-blue-100 backdrop-blur-xl shadow-xl sticky top-0 z-30 border-b border-blue-200">
        <div className="relative">
          {/* Decorative gradient line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-white to-green-600"></div>
          
          <div className="max-w-[1920px] mx-auto px-6 py-4">
            <div className="flex items-center justify-between gap-6">
              {/* Left Section - Menu & Ashoka Emblem */}
              <div className="flex items-center gap-4">
                {/* Premium Menu Button */}
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="relative group p-3 bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  title="Open Menu"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <Menu className="w-6 h-6 relative z-10" />
                </button>

                {/* Ashoka Emblem with Satyameva Jayate */}
                <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-orange-200 shadow-md">
                  <div className="flex flex-col items-center">
                    <div className="relative w-14 h-16">
                      {/* Ashoka Emblem SVG */}
                      <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-lg" fill="currentColor">
                        <defs>
                          <linearGradient id="emblemGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#B45309" />
                            <stop offset="100%" stopColor="#92400E" />
                          </linearGradient>
                        </defs>
                        <g fill="url(#emblemGradient)">
                          {/* Lions */}
                          <circle cx="50" cy="20" r="6"/>
                          <circle cx="35" cy="22" r="5"/>
                          <circle cx="65" cy="22" r="5"/>
                          {/* Pillar */}
                          <rect x="44" y="28" width="12" height="30" rx="2"/>
                          {/* Base */}
                          <path d="M30 58 L70 58 L65 68 L35 68 Z"/>
                          {/* Dharma Chakra */}
                          <circle cx="50" cy="85" r="18" fill="none" stroke="url(#emblemGradient)" strokeWidth="2"/>
                          <circle cx="50" cy="85" r="3" fill="url(#emblemGradient)"/>
                          {/* Spokes */}
                          <g stroke="url(#emblemGradient)" strokeWidth="1.5">
                            <line x1="50" y1="67" x2="50" y2="103"/>
                            <line x1="32" y1="85" x2="68" y2="85"/>
                            <line x1="37" y1="72" x2="63" y2="98"/>
                            <line x1="63" y1="72" x2="37" y2="98"/>
                          </g>
                        </g>
                      </svg>
                    </div>
                    <div className="text-xs font-bold bg-gradient-to-r from-amber-700 to-orange-800 bg-clip-text text-transparent mt-1">
                      सत्यमेव जयते
                    </div>
                  </div>
                </div>

                {/* Portal Title */}
                <div className="hidden lg:block">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    CWRI Portal
                  </h1>
                  <p className="text-xs text-gray-600 font-medium">Cash Withdrawal Risk Intelligence</p>
                </div>
              </div>

              {/* Center - Premium Search */}
              <div className="flex-1 max-w-2xl mx-auto hidden md:block">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-500" />
                  <input
                    type="text"
                    placeholder="Search anything..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="relative w-full pl-12 pr-4 py-3.5 bg-white border-2 border-indigo-100 rounded-2xl focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none transition-all text-sm font-medium placeholder:text-gray-400"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Right Section - Azadi Ka Amrit Mahotsav & Actions */}
              <div className="flex items-center gap-4">
                {/* Azadi Ka Amrit Mahotsav */}
                <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-50 via-white to-green-50 rounded-2xl border border-transparent shadow-md" 
                     style={{borderImage: 'linear-gradient(90deg, #FF9933, #FFFFFF, #138808) 1'}}>
                  <div className="relative">
                    {/* 75 with Tricolor Circle */}
                    <div className="relative w-16 h-16">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <defs>
                          <linearGradient id="tricolor" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#FF9933" />
                            <stop offset="33%" stopColor="#FF9933" />
                            <stop offset="33%" stopColor="#FFFFFF" />
                            <stop offset="66%" stopColor="#FFFFFF" />
                            <stop offset="66%" stopColor="#138808" />
                            <stop offset="100%" stopColor="#138808" />
                          </linearGradient>
                        </defs>
                        <circle cx="50" cy="50" r="48" fill="url(#tricolor)" opacity="0.2"/>
                        <circle cx="50" cy="50" r="48" fill="none" stroke="url(#tricolor)" strokeWidth="2"/>
                        {/* Ashoka Chakra */}
                        <circle cx="50" cy="50" r="15" fill="none" stroke="#000080" strokeWidth="1.5" opacity="0.7"/>
                        <circle cx="50" cy="50" r="2" fill="#000080"/>
                        {/* Spokes */}
                        <g stroke="#000080" strokeWidth="1" opacity="0.5">
                          {[...Array(24)].map((_, i) => (
                            <line 
                              key={i}
                              x1="50" 
                              y1="35" 
                              x2="50" 
                              y2="42"
                              transform={`rotate(${i * 15} 50 50)`}
                            />
                          ))}
                        </g>
                      </svg>
                      {/* 75 Text */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-black bg-gradient-to-b from-orange-600 to-green-700 bg-clip-text text-transparent">75</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-black text-orange-600">आज़ादी का</div>
                    <div className="text-xs font-black text-green-700">अमृत महोत्सव</div>
                  </div>
                </div>

                {/* Live Indicator */}
                <div className="hidden lg:flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <div className="relative">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-ping absolute"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-xs font-bold text-green-700">LIVE</span>
                </div>

                {/* Notifications */}
                <button className="relative p-3 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl hover:from-indigo-100 hover:to-purple-100 transition-all group">
                  <Bell className="w-5 h-5 text-indigo-600 group-hover:scale-110 transition-transform" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                </button>

                {/* Language Switcher */}
                <div className="relative" ref={langMenuRef}>
                  <button
                    onClick={() => setLangMenuOpen(!langMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl hover:from-blue-100 hover:to-indigo-100 transition-all"
                  >
                    <Languages className="w-4 h-4 text-indigo-600" />
                    <span className="text-sm font-medium text-gray-700">{i18n.language === 'hi' ? 'हिन्दी' : 'English'}</span>
                    <ChevronDown className={`w-3 h-3 text-gray-500 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {langMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 min-w-[140px] z-50 overflow-hidden">
                      <button
                        onClick={() => changeLanguage('en')}
                        className={`w-full px-4 py-2.5 text-left text-sm hover:bg-indigo-50 transition-colors ${
                          i18n.language === 'en' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-gray-700'
                        }`}
                      >
                        🇬🇧 English
                      </button>
                      <button
                        onClick={() => changeLanguage('hi')}
                        className={`w-full px-4 py-2.5 text-left text-sm hover:bg-indigo-50 transition-colors ${
                          i18n.language === 'hi' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-gray-700'
                        }`}
                      >
                        🇮🇳 हिन्दी
                      </button>
                    </div>
                  )}
                </div>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
                  >
                    <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
                      <User className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-semibold hidden md:block">{user?.name || 'User'}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                      <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                        <p className="font-bold text-lg">{user?.name || 'Admin User'}</p>
                        <p className="text-sm opacity-90">{user?.email || 'admin@cwri.gov.in'}</p>
                      </div>
                      <div className="p-2">
                        <Link to="/admin" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors">
                          <Settings className="w-5 h-5 text-gray-600" />
                          <span className="font-medium text-gray-700">Settings</span>
                        </Link>
                        <button
                          onClick={logout}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 rounded-xl transition-colors text-red-600"
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

          {/* Decorative gradient line bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-30"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-[1920px] mx-auto w-full px-6 py-8">
        {children}
      </main>

      {/* Premium Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white mt-auto">
        <div className="max-w-[1920px] mx-auto px-6 py-8">
          <div className="text-center">
            <p className="text-sm opacity-90">© 2025 Ministry of Home Affairs, Government of India</p>
            <p className="text-xs mt-2 opacity-70">Indian Cyber Crime Coordination Centre (I4C) • Version 1.0.0</p>
          </div>
        </div>
      </footer>
    </div>
  );
}