import { useState } from 'react';
import { Shield } from 'lucide-react';
import toast from 'react-hot-toast';
import apiClient from '../api/client';
import { useAuthStore } from '../store/authStore';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      if (response.data.require2FA) {
        toast.error('2FA verification required (not implemented in UI)');
      } else {
        login(response.data.token, response.data.user);
        toast.success('Login successful!');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setEmail('admin@cwri.gov.in');
    setPassword('Admin@123');
    setLoading(true);
    try {
      const response = await apiClient.post('/auth/login', { 
        email: 'admin@cwri.gov.in', 
        password: 'Admin@123' 
      });
      if (response.data.require2FA) {
        toast.error('2FA verification required (not implemented in UI)');
      } else {
        login(response.data.token, response.data.user);
        toast.success('🎉 Demo login successful! Welcome to CWRI!');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Premium Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-primary-500 opacity-15 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-accent-500 opacity-15 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-primary-400 opacity-10 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Premium Login Card */}
      <div className="glass-card rounded-3xl p-10 w-full max-w-md relative z-10 animate-scale-in">
        {/* Logo & Title */}
        <div className="flex flex-col items-center mb-10">
          <div className="relative mb-6 animate-pulse-glow">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 blur-xl opacity-40"></div>
            <div className="relative bg-gradient-to-r from-primary-600 to-accent-500 p-4 rounded-2xl transform hover:scale-110 transition-transform duration-300">
              <Shield className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-2">CWRI</h1>
          <p className="text-gray-600 font-medium">Cash Withdrawal Risk Intelligence</p>
          <p className="text-sm text-gray-500 mt-1">Powered by AI • Ministry of Home Affairs</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="animate-fade-in-up" style={{animationDelay: '0.1s', opacity: 0}}>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="premium-input"
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div className="animate-fade-in-up" style={{animationDelay: '0.2s', opacity: 0}}>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="premium-input"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-premium-orange w-full animate-fade-in-up"
            style={{animationDelay: '0.3s', opacity: 0}}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Logging in...
              </span>
            ) : (
              'Login to Dashboard'
            )}
          </button>
        </form>

        {/* Demo Login */}
        <div className="mt-8 text-center animate-fade-in-up" style={{animationDelay: '0.4s', opacity: 0}}>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-gray-500 font-medium">or</span>
            </div>
          </div>
          
          <button
            onClick={handleDemoLogin}
            disabled={loading}
            className="mt-6 w-full btn-premium-blue relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <span>🚀</span>
              <span>Demo Login (One Click)</span>
            </span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
          </button>
          
          <p className="mt-4 text-xs text-gray-500 font-medium">
            Instant access with pre-configured credentials
          </p>
        </div>

        {/* Footer Info */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-center animate-fade-in-up" style={{animationDelay: '0.5s', opacity: 0}}>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <span className="w-2 h-2 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full animate-pulse"></span>
            <span className="font-medium">Secure Login • 256-bit Encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
}
