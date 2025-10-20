import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Map, Bell, Briefcase, FileText, Brain, Building2, 
  BarChart3, Settings, FileCheck, Search, User, LogOut, Shield,
  Menu, X, ChevronDown, Globe, Phone, Mail, Activity, MoreVertical, Languages,
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

export default function LayoutFinal({ children }: { children: React.ReactNode }) {
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLangMenuOpen(false);
  };

  const menuItems = getMenuItems(t);
  const langMenuRef = useRef<HTMLDivElement>(null);

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
    <div className="flex flex-col min-h-screen" style={{background: 'transparent'}}>
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

      {/* Navigation Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-[1920px] mx-auto px-6">
          <div className="flex items-center justify-between">
              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-1">
                <Link to="/" className="px-4 py-3 hover:bg-white/10 transition-colors flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  <span className="text-sm font-medium">Home</span>
                </Link>
                
                <Link to="/complaints" className="px-4 py-3 hover:bg-white/10 transition-colors flex items-center gap-2 border-l border-white/20">
                  <FileText className="w-4 h-4" />
                  <span className="text-sm font-medium">Register a Complaint</span>
                </Link>
                
                <Link to="/complaints" className="px-4 py-3 hover:bg-white/10 transition-colors text-sm font-medium border-l border-white/20">
                  Track your Complaint
                </Link>
                
                <Link to="/alerts" className="px-4 py-3 hover:bg-white/10 transition-colors text-sm font-medium border-l border-white/20">
                  Report & Check Suspect
                </Link>
                
                <Link to="/intelligence" className="px-4 py-3 hover:bg-white/10 transition-colors text-sm font-medium border-l border-white/20">
                  Cyber Volunteers
                </Link>
                
                <Link to="/reports" className="px-4 py-3 hover:bg-white/10 transition-colors text-sm font-medium border-l border-white/20">
                  Learning Corner
                </Link>
                
                <Link to="/dashboard" className="px-4 py-3 hover:bg-white/10 transition-colors text-sm font-medium border-l border-white/20">
                  Contact Us
                </Link>
              </nav>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-3 text-white"
              >
                <Menu className="w-6 h-6" />
              </button>

              {/* User Actions */}
              <div className="flex items-center gap-4">
                <button className="relative p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <span className="text-sm hidden md:block">{user?.name || 'User'}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
                      <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        Settings
                      </Link>
                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1920px] mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-6 text-gray-700">
              <span className="font-semibold">भारत सरकार</span>
              <span className="text-gray-500">|</span>
              <span className="font-semibold">गृह मंत्रालय</span>
              <span className="hidden md:block text-gray-500">|</span>
              <span className="hidden md:block">GOVERNMENT OF INDIA</span>
              <span className="hidden md:block text-gray-500">|</span>
              <span className="hidden md:block">MINISTRY OF HOME AFFAIRS</span>
            </div>
            
            {/* Language Switcher */}
            <div className="flex items-center gap-4">
              <div className="relative" ref={langMenuRef}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLangMenuOpen(!langMenuOpen);
                  }}
                  className="flex items-center gap-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded transition-all cursor-pointer text-gray-700"
                >
                  <span className="font-medium text-sm">Language</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {langMenuOpen && (
                  <div 
                    className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-2xl border border-gray-200 py-2 min-w-[160px] z-[9999] animate-fade-in"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        changeLanguage('en');
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm hover:bg-blue-50 transition-colors flex items-center gap-2 ${
                        i18n.language === 'en' ? 'bg-blue-50 text-primary-600 font-bold' : 'text-gray-700 font-medium'
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
                        i18n.language === 'hi' ? 'bg-blue-50 text-primary-600 font-bold' : 'text-gray-700 font-medium'
                      }`}
                    >
                      <span className="text-lg">🇮🇳</span>
                      <span>हिन्दी</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header with Logos and Title - Cybercrime Portal Style */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-[1920px] mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Left Section with Government Emblem */}
            <div className="flex items-center gap-6">
              {/* Menu Button */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
                title="Open Navigation Menu"
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>

              {/* Ashoka Emblem */}
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-20 flex items-center justify-center">
                    {/* Ashoka Emblem SVG */}
                    <svg viewBox="0 0 100 120" className="w-full h-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <g className="text-gray-800">
                        {/* Lion Capital */}
                        <circle cx="50" cy="25" r="8" fill="currentColor"/>
                        <rect x="42" y="30" width="16" height="25" fill="currentColor"/>
                        <path d="M35 55 L50 70 L65 55 Z" fill="currentColor"/>
                        {/* Dharma Chakra */}
                        <circle cx="50" cy="85" r="15" fill="none" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="50" cy="85" r="3" fill="currentColor"/>
                        {/* Spokes */}
                        <path d="M50 70 L50 100 M35 85 L65 85 M39 74 L61 96 M39 96 L61 74" stroke="currentColor" strokeWidth="1.5"/>
                      </g>
                    </svg>
                  </div>
                  <div className="text-xs font-semibold text-gray-700 text-center mt-1">
                    सत्यमेव जयते
                  </div>
                </div>

                {/* I4C Logo */}
                <div className="border-l-2 border-gray-300 pl-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white px-3 py-2 rounded-lg font-bold text-lg">
                      I4C
                    </div>
                    <div>
                      <div className="text-xs text-gray-600">Indian Cyber Crime</div>
                      <div className="text-xs text-gray-600">Coordination Centre</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Center Section with Portal Title */}
            <div className="flex-1 text-center">
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                {i18n.language === 'hi' ? 'राष्ट्रीय साइबर अपराध रिपोर्टिंग पोर्टल' : 'राष्ट्रीय साइबर अपराध रिपोर्टिंग पोर्टल'}
              </h1>
              <h2 className="text-lg md:text-xl font-semibold text-gray-700 mt-1">
                National Cyber Crime Reporting Portal
              </h2>
            </div>

            {/* Right Section with Azadi Ka Amrit Mahotsav */}
            <div className="flex items-center gap-4">
              {/* Azadi Ka Amrit Mahotsav Logo */}
              <div className="hidden lg:block">
                <div className="flex items-center">
                  <div className="relative">
                    {/* Tricolor Circle with 75 */}
                    <div className="relative w-24 h-24">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        {/* Background Circle */}
                        <circle cx="50" cy="50" r="48" fill="#f0f0f0" stroke="#ddd" strokeWidth="1"/>
                        {/* Orange Section */}
                        <path d="M 50 2 A 48 48 0 0 1 98 50 L 50 50 Z" fill="#FF9933"/>
                        {/* White Section */}
                        <path d="M 98 50 A 48 48 0 0 1 50 98 L 50 50 Z" fill="#FFFFFF"/>
                        {/* Green Section */}
                        <path d="M 50 98 A 48 48 0 0 1 2 50 L 50 50 Z" fill="#138808"/>
                        {/* Blue Section */}
                        <path d="M 2 50 A 48 48 0 0 1 50 2 L 50 50 Z" fill="#000080" opacity="0.3"/>
                        {/* Ashoka Chakra */}
                        <circle cx="50" cy="50" r="12" fill="none" stroke="#000080" strokeWidth="1"/>
                        <circle cx="50" cy="50" r="2" fill="#000080"/>
                      </svg>
                      {/* 75 Text */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold text-orange-600">75</span>
                      </div>
                    </div>
                    {/* Text */}
                    <div className="text-center mt-1">
                      <div className="text-sm font-bold text-orange-600">आज़ादी का</div>
                      <div className="text-sm font-bold text-green-700">अमृत महोत्सव</div>
                    </div>
                  </div>
                </div>
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
