import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { Shield, Lock, User, Eye, EyeOff, ArrowRight, Zap, CheckCircle2, TrendingUp, BarChart3, Globe2 } from 'lucide-react';

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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const token = 'auth-token-' + Date.now() + '-' + Math.random().toString(36);
      const user = {
        id: '1',
        email: username,
        name: username === 'admin' ? 'System Administrator' : username,
        role: 'I4C_ADMIN',
      };
      
      login(token, user);
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setError('');
    setIsLoading(true);
    setUsername('admin');
    setPassword('admin123');

    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const token = 'demo-auth-token-' + Date.now() + '-' + Math.random().toString(36);
      const user = {
        id: 'demo-1',
        email: 'admin@cwri.gov.in',
        name: 'Demo Administrator',
        role: 'I4C_ADMIN',
      };
      
      console.log('Demo login - calling login with:', { token, user });
      login(token, user);
      console.log('Demo login - login called successfully');
      
      // Force a small delay to ensure state is updated
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (err) {
      console.error('Demo login error:', err);
      setError('Demo login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:block text-white space-y-8">
          {/* Logo & Title */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 blur-xl opacity-50 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-blue-500 to-indigo-600 p-4 rounded-xl">
                  <Shield className="w-12 h-12 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold tracking-tight">CWRI</h1>
                <p className="text-blue-200 text-sm">Cash Withdrawal Risk Intelligence</p>
              </div>
            </div>
            <p className="text-lg text-blue-100 leading-relaxed">
              Advanced AI-powered platform for real-time cybercrime detection and prevention
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white/90">Platform Features</h3>
            <div className="grid gap-3">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-500/20 p-2 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-blue-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Real-time Analytics</h4>
                    <p className="text-sm text-blue-200">Monitor threats as they emerge</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all">
                <div className="flex items-start gap-3">
                  <div className="bg-purple-500/20 p-2 rounded-lg">
                    <BarChart3 className="w-5 h-5 text-purple-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Predictive Intelligence</h4>
                    <p className="text-sm text-blue-200">AI-driven risk assessment</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all">
                <div className="flex items-start gap-3">
                  <div className="bg-indigo-500/20 p-2 rounded-lg">
                    <Globe2 className="w-5 h-5 text-indigo-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Geographic Mapping</h4>
                    <p className="text-sm text-blue-200">Visual risk heatmaps</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Status Bar */}
          <div className="flex items-center gap-6 text-sm text-blue-200">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>All Systems Operational</span>
            </div>
            <span>•</span>
            <span>Secured by MHA</span>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to access your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Username or Email
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all text-gray-900"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all text-gray-900"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium">
                {error}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-4 rounded-xl font-semibold text-lg transition-all hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">or</span>
              </div>
            </div>

            {/* Demo Login Button */}
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 py-4 rounded-xl font-semibold text-lg transition-all hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
            >
              <Zap className="w-5 h-5" />
              <span>Quick Demo Login</span>
              <CheckCircle2 className="w-5 h-5" />
            </button>

            {/* Demo Info */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Demo Account
              </p>
              <div className="space-y-1 text-xs text-blue-700">
                <p><span className="font-semibold">Username:</span> admin</p>
                <p><span className="font-semibold">Password:</span> admin123</p>
                <p className="text-blue-600 mt-2">Click "Quick Demo Login" for instant access</p>
              </div>
            </div>
          </form>

          {/* Footer Info */}
          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500">
              Protected by 256-bit encryption • Ministry of Home Affairs, Government of India
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
