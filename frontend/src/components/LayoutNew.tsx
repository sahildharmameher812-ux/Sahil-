import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Map, Bell, Briefcase, FileText, Brain, Building2, 
  BarChart3, Settings, FileCheck, Search, HelpCircle, User, LogOut, Shield,
  Menu, X, ChevronRight, Globe, Phone, Mail
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/', badge: null },
  { icon: Map, label: 'Risk Heatmap', path: '/risk-map', badge: 'Live' },
  { icon: Bell, label: 'Alerts & Notifications', path: '/alerts', badge: '23' },
  { icon: Brain, label: 'Predictive Models', path: '/models', badge: 'AI' },
  { icon: Brain, label: 'Intelligence Reports', path: '/intelligence', badge: null },
  { icon: Briefcase, label: 'Cases Management', path: '/cases', badge: null },
  { icon: FileText, label: 'Complaints', path: '/complaints', badge: null },
  { icon: Building2, label: 'Banks & ATMs', path: '/banks', badge: null },
  { icon: BarChart3, label: 'Reports & Analytics', path: '/reports', badge: null },
  { icon: Settings, label: 'Administration', path: '/admin', badge: null },
  { icon: FileCheck, label: 'Audit Trail', path: '/audit', badge: null },
];

export default function LayoutNew({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const { user, logout } = useAuthStore();

  return (
    <div className="flex flex-col h-screen bg-neutral-50">
      {/* Government Header */}
      <header className="bg-white border-b-4 border-accent-500 shadow-lg relative z-50">
        <div className="bg-primary-900 px-6 py-2">
          <div className="flex items-center justify-between text-white text-sm">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span>Ministry of Home Affairs, Govt. of India</span>
              </div>
              <div className="hidden md:flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  <span>1930 (Cybercrime Helpline)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" />
                  <span>support@cybercrime.gov.in</span>
                </div>
              </div>
            </div>
            <div className="text-xs opacity-90">
              {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>
        </div>
        
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                {sidebarOpen ? <X className="w-6 h-6 text-primary-900" /> : <Menu className="w-6 h-6 text-primary-900" />}
              </button>
              
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-mixed blur-lg opacity-40 animate-pulse-glow"></div>
                  <div className="relative bg-gradient-mixed p-3 rounded-xl shadow-glow-accent">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-primary-900 font-['Poppins']">
                    CWRI Portal
                  </h1>
                  <p className="text-sm text-primary-700 font-medium">
                    Cash Withdrawal Risk Intelligence System
                  </p>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400 group-hover:text-accent-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Search by Complaint ID, Case, ATM ID, UPI, Phone Number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-accent-500 focus:ring-4 focus:ring-accent-100 outline-none transition-all text-sm"
                />
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <button className="relative p-3 bg-neutral-100 hover:bg-accent-50 rounded-xl transition-all duration-300 hover:shadow-md group">
                <Bell className="w-5 h-5 text-primary-900 group-hover:text-accent-500 transition-colors" />
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-danger rounded-full animate-pulse"></span>
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-danger rounded-full animate-ping"></span>
              </button>
              
              {/* Help */}
              <button className="p-3 bg-neutral-100 hover:bg-primary-50 rounded-xl transition-all duration-300 hover:shadow-md group">
                <HelpCircle className="w-5 h-5 text-primary-900 group-hover:text-primary-600 transition-colors" />
              </button>

              {/* User Profile */}
              <div className="flex items-center gap-3 border-l-2 border-neutral-200 pl-4 ml-2">
                <div className="text-right hidden md:block">
                  <p className="text-sm font-bold text-primary-900">{user?.name || 'Admin User'}</p>
                  <p className="text-xs">
                    <span className="inline-block px-2 py-1 bg-accent-500 text-white rounded-md font-medium text-xs">
                      {user?.role || 'I4C Admin'}
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {/* Avatar */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-primary blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
                    <div className="relative w-11 h-11 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform cursor-pointer">
                      <User className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  {/* Logout Button */}
                  <button 
                    onClick={logout} 
                    className="p-2.5 bg-danger/10 hover:bg-danger hover:text-white text-danger rounded-xl transition-all duration-300 hover:shadow-md group"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden px-6 pb-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-accent-500 focus:ring-4 focus:ring-accent-100 outline-none transition-all text-sm"
            />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-72' : 'w-0 lg:w-20'} bg-white border-r border-neutral-200 transition-all duration-300 overflow-hidden flex flex-col shadow-lg`}>
          <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group flex items-center ${sidebarOpen ? 'gap-3 px-4' : 'justify-center px-2'} py-3.5 rounded-xl transition-all duration-300 relative overflow-hidden ${
                    isActive
                      ? 'bg-gradient-mixed text-white shadow-lg'
                      : 'text-neutral-700 hover:bg-neutral-100 hover:text-primary-900'
                  }`}
                  style={{
                    animation: `slideInRight 0.5s ease-out ${index * 0.05}s forwards`,
                    opacity: 0
                  }}
                  title={!sidebarOpen ? item.label : ''}
                >
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent-500"></div>
                  )}
                  <div className={`${isActive ? 'bg-white/20' : 'bg-neutral-100 group-hover:bg-primary-100'} p-2 rounded-lg transition-all`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  {sidebarOpen && (
                    <>
                      <span className="font-semibold text-sm flex-1">{item.label}</span>
                      {item.badge && (
                        <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                          isActive 
                            ? 'bg-white/20 text-white' 
                            : item.badge === 'Live' ? 'bg-success/10 text-success' 
                            : item.badge === 'AI' ? 'bg-primary-100 text-primary-900'
                            : 'bg-danger/10 text-danger'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                      {isActive && <ChevronRight className="w-4 h-4" />}
                    </>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          {sidebarOpen && (
            <div className="p-4 border-t border-neutral-200">
              <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl p-4 text-center">
                <Shield className="w-8 h-8 text-primary-900 mx-auto mb-2" />
                <p className="text-xs text-neutral-700 font-medium">
                  <span className="block text-primary-900 font-bold">Powered by AI/ML</span>
                  Ministry of Home Affairs
                </p>
              </div>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-neutral-50 p-6">
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-primary-900 text-white px-6 py-3 border-t-4 border-accent-500">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <span>© 2025 Ministry of Home Affairs, Govt. of India</span>
            <span className="hidden md:inline text-neutral-300">|</span>
            <span className="hidden md:inline text-neutral-300">Indian Cyber Crime Coordination Centre (I4C)</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-neutral-300">
            <a href="#" className="hover:text-accent-500 transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-accent-500 transition-colors">Terms & Conditions</a>
            <span>|</span>
            <a href="#" className="hover:text-accent-500 transition-colors">Help</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
