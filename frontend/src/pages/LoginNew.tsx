import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { Shield, Lock, User, Eye, EyeOff, ArrowRight, Globe, Phone, Mail } from 'lucide-react';
import apiClient from '../api/client';
import toast from 'react-hot-toast';

export default function LoginNew() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Use real API authentication
      const response = await apiClient.post('/auth/login', { 
        email: username.includes('@') ? username : `${username}@cwri.gov.in`,
        password: password 
      });
      
      if (response.data.require2FA) {
        toast.error('2FA verification required (not implemented in UI)');
        setError('2FA verification required');
      } else {
        login(response.data.token, response.data.user, response.data.refreshToken);
        toast.success('Login successful!');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Invalid credentials. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setError('');
    setIsLoading(true);
    
    // Auto-fill demo credentials
    setUsername('admin@cwri.gov.in');
    setPassword('Admin@123');

    try {
      console.log('Attempting demo login...');
      console.log('API URL:', apiClient.defaults.baseURL);
      
      const response = await apiClient.post('/auth/login', { 
        email: 'admin@cwri.gov.in',
        password: 'Admin@123'
      });
      
      console.log('Login response:', response.data);
      
      if (response.data.require2FA) {
        toast.error('2FA verification required (not implemented in UI)');
        setError('2FA verification required');
      } else {
        login(response.data.token, response.data.user, response.data.refreshToken);
        toast.success('🎉 Demo login successful! Welcome to CWRI Dashboard!');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      console.error('Error response:', err.response);
      console.error('Error message:', err.message);
      
      let errorMessage = 'Demo login failed. ';
      if (err.response) {
        errorMessage += err.response.data?.message || `Server error: ${err.response.status}`;
      } else if (err.request) {
        errorMessage += 'Cannot connect to server. Please check if backend is running.';
      } else {
        errorMessage += err.message;
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-accent-600 relative overflow-hidden flex items-center justify-center p-4 animate-gradient-shift">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-cyber rounded-full blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-accent rounded-full blur-3xl opacity-20 animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-gradient-primary rounded-full blur-3xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-white/5 rounded-full blur-2xl animate-pulse"></div>
      </div>

      {/* Government Header Bar */}
      <div className="absolute top-0 left-0 right-0 bg-white/10 backdrop-blur-xl border-b border-white/20 px-6 py-3 z-50 shadow-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-white">
          <div className="flex items-center gap-2 text-sm">
            <Globe className="w-4 h-4" />
            <span className="font-medium">Ministry of Home Affairs, Government of India</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              <span>1930 (Cybercrime Helpline)</span>
            </div>
            <div className="flex items-center gap-1">
              <Mail className="w-3 h-3" />
              <span>support@cybercrime.gov.in</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Login Container */}
      <div className="relative z-10 w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="text-white space-y-6 animate-slide-in-left">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-cyber blur-2xl opacity-60 animate-pulse"></div>
              <div className="relative bg-white/20 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/30 hover:scale-110 transition-transform duration-500">
                <Shield className="w-20 h-20 drop-shadow-2xl animate-glow" />
              </div>
            </div>
            <div>
              <h1 className="text-5xl font-bold font-['Poppins'] mb-2">CWRI Portal</h1>
              <p className="text-xl text-primary-100">Cash Withdrawal Risk Intelligence</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-2xl hover:bg-white/15 transition-all duration-500">
            <h2 className="text-2xl font-bold mb-4">Protecting India's Digital Economy</h2>
            <p className="text-primary-100 mb-4">
              Advanced AI-powered predictive analytics framework for proactive cybercrime intervention.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>Real-time threat detection & prediction</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>GIS-enabled risk heatmap visualization</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>Automated alerts & intelligence reports</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>Cross-jurisdiction coordination</span>
              </li>
            </ul>
          </div>

          <div className="flex items-center gap-4 text-sm text-primary-200">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
              <span>System Active</span>
            </div>
            <span>•</span>
            <span>24/7 Monitoring</span>
            <span>•</span>
            <span>Secured by MHA</span>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 animate-slide-in-right border border-white/50 hover:shadow-[0_0_50px_rgba(59,130,246,0.3)] transition-all duration-500">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 rounded-2xl mb-4 shadow-2xl animate-bounce-in hover:scale-110 transition-transform duration-300">
              <Lock className="w-8 h-8 text-white animate-pulse" />
            </div>
            <h2 className="text-3xl font-bold text-primary-900 mb-2">Secure Login</h2>
            <p className="text-neutral-600">Enter your credentials to access the portal</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Username / Email
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all text-neutral-900 font-medium"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-3.5 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all text-neutral-900 font-medium"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500" />
                <span className="text-sm text-neutral-600">Remember me</span>
              </label>
              <button type="button" className="text-sm text-primary-600 hover:text-primary-800 font-semibold transition-colors">
                Forgot Password?
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-danger/10 border border-danger/20 text-danger px-4 py-3 rounded-xl text-sm font-medium animate-fade-in">
                {error}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="relative w-full bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 hover:from-primary-700 hover:via-accent-600 hover:to-primary-900 text-white px-6 py-4 rounded-xl font-bold text-lg transition-all hover:shadow-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In Securely</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {/* Quick Demo Login Button */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-neutral-500 font-medium">or</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={isLoading}
              className="relative w-full bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white px-6 py-3.5 rounded-xl font-bold text-base transition-all hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group mt-4"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <span>🚀</span>
                  <span>Quick Demo Access</span>
                </>
              )}
            </button>

            {/* Demo Credentials Info */}
            <div className="bg-accent-50 border border-accent-200 rounded-xl p-3 mt-4">
              <p className="text-xs font-semibold text-accent-900 mb-1">Demo Account Info:</p>
              <p className="text-xs text-accent-700">Click "Quick Demo Access" for instant login with admin privileges</p>
            </div>
          </form>

          {/* Additional Info */}
          <div className="mt-6 pt-6 border-t border-neutral-200 text-center">
            <p className="text-xs text-neutral-500">
              By logging in, you agree to comply with the IT Act 2000 and Official Secrets Act 1923.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-lg border-t border-white/20 px-6 py-4 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-white text-sm">
          <span>© 2025 Ministry of Home Affairs, Govt. of India</span>
          <div className="flex items-center gap-4 text-xs">
            <a href="#" className="hover:text-accent-300 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-accent-300 transition-colors">Terms & Conditions</a>
            <span>•</span>
            <a href="#" className="hover:text-accent-300 transition-colors">Help</a>
          </div>
        </div>
      </div>
    </div>
  );
}
