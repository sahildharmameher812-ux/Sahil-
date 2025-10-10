import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Map, Bell, Briefcase, FileText, Brain, Building2, 
  BarChart3, Settings, FileCheck, Search, HelpCircle, User, LogOut, Shield 
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Map, label: 'Risk Map', path: '/risk-map' },
  { icon: Bell, label: 'Alerts', path: '/alerts' },
  { icon: Briefcase, label: 'Cases', path: '/cases' },
  { icon: FileText, label: 'Complaints', path: '/complaints' },
  { icon: Brain, label: 'Intelligence', path: '/intelligence' },
  { icon: Brain, label: 'Models', path: '/models' },
  { icon: Building2, label: 'Banks & ATMs', path: '/banks' },
  { icon: BarChart3, label: 'Reports', path: '/reports' },
  { icon: Settings, label: 'Admin', path: '/admin' },
  { icon: FileCheck, label: 'Audit', path: '/audit' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const { user, logout } = useAuthStore();

  return (
    <div className="flex h-screen bg-gradient-to-br from-orange-50 via-white to-cyan-50">
      {/* Premium Sidebar with Glassmorphism */}
      <aside className="w-64 glass-card flex flex-col relative overflow-hidden shadow-2xl">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100/30 via-white/50 to-cyan-100/30 -z-10"></div>
        
        {/* Logo Section */}
        <div className="p-6 border-b border-orange-100/50 relative">
          <div className="flex items-center space-x-3">
            <div className="relative animate-pulse-glow">
              <div className="absolute inset-0 bg-gradient-mixed blur-lg opacity-40"></div>
              <div className="relative bg-gradient-mixed p-2 rounded-xl">
                <Shield className="w-7 h-7 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gradient-mixed">CWRI</h1>
              <p className="text-xs text-gray-600 font-medium">Risk Intelligence</p>
            </div>
          </div>
        </div>

        {/* Premium Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 animate-slide-in-right ${
                  isActive
                    ? 'bg-gradient-mixed text-white shadow-lg transform scale-105'
                    : 'text-gray-700 hover:bg-white/70 hover:shadow-md hover:transform hover:translate-x-1'
                }`}
                style={{animationDelay: `${index * 0.05}s`, opacity: 0}}
              >
                <div className={`p-2 rounded-lg transition-all ${
                  isActive 
                    ? 'bg-white/20' 
                    : 'bg-orange-50/50 group-hover:bg-orange-100/70'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-semibold">{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-white animate-pulse"></div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-orange-100/50">
          <div className="bg-gradient-to-r from-orange-100/50 to-cyan-100/50 rounded-xl p-3">
            <p className="text-xs text-gray-600 font-medium text-center">
              <span className="text-gradient-mixed font-bold">Powered by AI</span>
              <br />
              Ministry of Home Affairs
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Premium Header with Glassmorphism */}
        <header className="glass-card border-b border-orange-100/50 px-6 py-4 shadow-lg relative">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-50/30 to-cyan-50/30 -z-10"></div>
          
          <div className="flex items-center justify-between">
            {/* Premium Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Search by complaint ID, case ID, ATM ID, UPI, phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="premium-input pl-12"
                />
              </div>
            </div>

            {/* Premium Action Buttons */}
            <div className="flex items-center space-x-3 ml-6">
              {/* Notifications */}
              <button className="relative p-3 bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 group">
                <Bell className="w-5 h-5 text-orange-600 group-hover:animate-pulse" />
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-pulse"></span>
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-orange-500 rounded-full animate-ping"></span>
              </button>
              
              {/* Help */}
              <button className="p-3 bg-gradient-to-br from-cyan-50 to-cyan-100 hover:from-cyan-100 hover:to-cyan-200 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105">
                <HelpCircle className="w-5 h-5 text-cyan-600" />
              </button>

              {/* User Profile Section */}
              <div className="flex items-center space-x-3 border-l border-orange-200/50 pl-4 ml-2">
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">{user?.name}</p>
                  <p className="text-xs font-medium">
                    <span className="badge-orange text-xs py-1 px-2">{user?.role}</span>
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {/* Avatar */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-mixed blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
                    <div className="relative w-11 h-11 bg-gradient-mixed rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                      <User className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  {/* Logout Button */}
                  <button 
                    onClick={logout} 
                    className="p-2.5 bg-gradient-to-br from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 rounded-xl transition-all duration-300 hover:shadow-lg group"
                  >
                    <LogOut className="w-5 h-5 text-red-600 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
