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

export default function LayoutCybercrime({ children }: { children: React.ReactNode }) {
  const { t, i18n } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const langMenuRef = useRef<HTMLDivElement>(null);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLangMenuOpen(false);
  };

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

  const menuItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Risk Heatmap', path: '/risk-map', icon: Map },
    { label: 'Alerts', path: '/alerts', icon: Bell },
    { label: 'Cases', path: '/cases', icon: Briefcase },
    { label: 'Complaints', path: '/complaints', icon: FileText },
    { label: 'Intelligence', path: '/intelligence', icon: Brain },
    { label: 'Models', path: '/models', icon: Brain },
    { label: 'Banks', path: '/banks', icon: Building2 },
    { label: 'Reports', path: '/reports', icon: BarChart3 },
    { label: 'Admin', path: '/admin', icon: Settings },
    { label: 'Audit', path: '/audit', icon: FileCheck },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 lg:hidden ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="h-full flex flex-col">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800">Navigation</h2>
            <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto p-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                    isActive ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Top Bar - Government Info */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1920px] mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-4 text-gray-700">
              <span className="font-semibold">भारत सरकार</span>
              <span className="text-gray-400">|</span>
              <span className="font-semibold">गृह मंत्रालय</span>
              <span className="hidden md:flex items-center gap-4">
                <span className="text-gray-400">|</span>
                <span>GOVERNMENT OF INDIA</span>
                <span className="text-gray-400">|</span>
                <span>MINISTRY OF HOME AFFAIRS</span>
              </span>
            </div>
            
            {/* Language Switcher */}
            <div className="relative" ref={langMenuRef}>
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded transition-colors text-gray-700"
              >
                <Languages className="w-3 h-3" />
                <span className="text-sm">Language</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {langMenuOpen && (
                <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[140px] z-50">
                  <button
                    onClick={() => changeLanguage('en')}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-blue-50 ${
                      i18n.language === 'en' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-700'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => changeLanguage('hi')}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-blue-50 ${
                      i18n.language === 'hi' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-700'
                    }`}
                  >
                    हिन्दी
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header with Logos */}
      <header className="bg-white shadow-sm">
        <div className="max-w-[1920px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Ashoka Emblem & I4C */}
            <div className="flex items-center gap-6">
              {/* Ashoka Emblem */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-16 flex items-center justify-center">
                  <svg viewBox="0 0 100 120" className="w-full h-full" fill="currentColor">
                    <g className="text-gray-800">
                      <circle cx="50" cy="25" r="8"/>
                      <rect x="42" y="30" width="16" height="25"/>
                      <path d="M35 55 L50 70 L65 55 Z"/>
                      <circle cx="50" cy="85" r="15" fill="none" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="50" cy="85" r="3"/>
                      <path d="M50 70 L50 100 M35 85 L65 85 M39 74 L61 96 M39 96 L61 74" stroke="currentColor" strokeWidth="1.5"/>
                    </g>
                  </svg>
                </div>
                <div className="text-xs font-semibold text-gray-700">सत्यमेव जयते</div>
              </div>

              {/* I4C Logo */}
              <div className="border-l-2 border-gray-300 pl-4">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-700 text-white px-3 py-2 rounded font-bold text-lg">I4C</div>
                  <div>
                    <div className="text-xs text-gray-600">Indian Cyber Crime</div>
                    <div className="text-xs text-gray-600">Coordination Centre</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Center: Portal Title */}
            <div className="flex-1 text-center">
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                राष्ट्रीय साइबर अपराध रिपोर्टिंग पोर्टल
              </h1>
              <h2 className="text-lg md:text-xl font-semibold text-gray-700">
                National Cyber Crime Reporting Portal
              </h2>
            </div>

            {/* Right: Azadi Ka Amrit Mahotsav */}
            <div className="hidden lg:block">
              <div className="flex items-center">
                <div className="relative w-20 h-20">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="50" r="48" fill="#f0f0f0" stroke="#ddd" strokeWidth="1"/>
                    <path d="M 50 2 A 48 48 0 0 1 98 50 L 50 50 Z" fill="#FF9933"/>
                    <path d="M 98 50 A 48 48 0 0 1 50 98 L 50 50 Z" fill="#FFFFFF"/>
                    <path d="M 50 98 A 48 48 0 0 1 2 50 L 50 50 Z" fill="#138808"/>
                    <path d="M 2 50 A 48 48 0 0 1 50 2 L 50 50 Z" fill="#000080" opacity="0.2"/>
                    <circle cx="50" cy="50" r="10" fill="none" stroke="#000080" strokeWidth="1"/>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-orange-600">75</span>
                  </div>
                </div>
                <div className="ml-2">
                  <div className="text-xs font-bold text-orange-600">आज़ादी का</div>
                  <div className="text-xs font-bold text-green-700">अमृत महोत्सव</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="max-w-[1920px] mx-auto px-6">
            <div className="flex items-center justify-between">
              <nav className="flex items-center">
                {/* Mobile Menu Button */}
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-3 hover:bg-white/10 transition-colors"
                >
                  <Menu className="w-5 h-5" />
                </button>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center">
                  <Link to="/" className="px-4 py-3 hover:bg-white/10 transition-colors flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    <span className="text-sm font-medium">Home</span>
                  </Link>
                  <Link to="/complaints" className="px-4 py-3 hover:bg-white/10 transition-colors text-sm font-medium border-l border-white/20">
                    Register a Complaint
                  </Link>
                  <Link to="/complaints" className="px-4 py-3 hover:bg-white/10 transition-colors text-sm font-medium border-l border-white/20">
                    Track your Complaint
                  </Link>
                  <Link to="/alerts" className="px-4 py-3 hover:bg-white/10 transition-colors text-sm font-medium border-l border-white/20">
                    Report & Check Suspect
                  </Link>
                  <Link to="/dashboard" className="px-4 py-3 hover:bg-white/10 transition-colors text-sm font-medium border-l border-white/20">
                    Dashboard
                  </Link>
                  <Link to="/reports" className="px-4 py-3 hover:bg-white/10 transition-colors text-sm font-medium border-l border-white/20">
                    Learning Corner
                  </Link>
                  <Link to="/dashboard" className="px-4 py-3 hover:bg-white/10 transition-colors text-sm font-medium border-l border-white/20">
                    Contact Us
                  </Link>
                </div>
              </nav>

              {/* User Menu */}
              <div className="flex items-center gap-3">
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
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
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
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-[1920px] mx-auto w-full px-6 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-auto">
        <div className="max-w-[1920px] mx-auto px-6 py-6">
          <div className="text-center text-sm">
            © 2025 Ministry of Home Affairs, Government of India. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}