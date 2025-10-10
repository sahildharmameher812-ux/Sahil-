import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

// ============================================
// PREMIUM CARD COMPONENTS
// ============================================

interface PremiumCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: 'orange' | 'blue' | 'mixed' | 'none';
}

export function PremiumCard({ children, className = '', hover = true, gradient = 'none' }: PremiumCardProps) {
  const gradientClass = {
    orange: 'border-orange-200/50 hover:border-orange-300',
    blue: 'border-cyan-200/50 hover:border-cyan-300',
    mixed: 'border-orange-200/30 hover:border-cyan-300/50',
    none: 'border-gray-200'
  }[gradient];

  return (
    <div className={`premium-card ${gradientClass} ${hover ? 'hover:shadow-2xl' : ''} ${className}`}>
      {children}
    </div>
  );
}

export function GlassCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`glass-card rounded-2xl p-6 ${className}`}>
      {children}
    </div>
  );
}

// ============================================
// PREMIUM STAT CARD
// ============================================

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  changeType?: 'increase' | 'decrease' | 'neutral';
  gradient?: 'orange' | 'blue' | 'mixed';
  className?: string;
}

export function StatCard({ title, value, icon: Icon, change, changeType = 'neutral', gradient = 'orange', className = '' }: StatCardProps) {
  const gradientBg = {
    orange: 'from-orange-50 to-orange-100',
    blue: 'from-cyan-50 to-cyan-100',
    mixed: 'from-orange-50 via-white to-cyan-50'
  }[gradient];

  const iconBg = {
    orange: 'bg-gradient-orange',
    blue: 'bg-gradient-blue',
    mixed: 'bg-gradient-mixed'
  }[gradient];

  return (
    <div className={`premium-card bg-gradient-to-br ${gradientBg} border-none animate-scale-in ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-bold text-gray-600 uppercase tracking-wide mb-2">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
          {change && (
            <div className="flex items-center gap-2">
              <span className={`text-sm font-semibold ${
                changeType === 'increase' ? 'text-green-600' : 
                changeType === 'decrease' ? 'text-red-600' : 
                'text-gray-600'
              }`}>
                {change}
              </span>
            </div>
          )}
        </div>
        <div className={`${iconBg} p-4 rounded-2xl shadow-lg transform hover:scale-110 transition-transform`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
      </div>
    </div>
  );
}

// ============================================
// PREMIUM BUTTONS
// ============================================

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'orange' | 'blue' | 'white' | 'outline-orange' | 'outline-blue';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function PremiumButton({ 
  children, 
  onClick, 
  variant = 'orange', 
  size = 'md', 
  icon: Icon, 
  iconPosition = 'left',
  disabled = false,
  className = '',
  type = 'button'
}: ButtonProps) {
  const variantClasses = {
    orange: 'btn-premium-orange',
    blue: 'btn-premium-blue',
    white: 'bg-white text-gray-900 border-2 border-gray-200 hover:border-orange-300 hover:shadow-lg',
    'outline-orange': 'bg-transparent border-2 border-orange-500 text-orange-600 hover:bg-orange-50 hover:shadow-lg',
    'outline-blue': 'bg-transparent border-2 border-cyan-500 text-cyan-600 hover:bg-cyan-50 hover:shadow-lg'
  }[variant];

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }[size];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${variantClasses} ${sizeClasses} ${className} disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300`}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-5 h-5" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="w-5 h-5" />}
    </button>
  );
}

// ============================================
// PREMIUM BADGE
// ============================================

interface BadgeProps {
  children: ReactNode;
  variant?: 'orange' | 'blue' | 'green' | 'red' | 'yellow' | 'gray';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  pulse?: boolean;
}

export function PremiumBadge({ children, variant = 'orange', size = 'md', icon: Icon, pulse = false }: BadgeProps) {
  const variantClasses = {
    orange: 'badge-orange',
    blue: 'badge-blue',
    green: 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg',
    red: 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg',
    yellow: 'bg-gradient-to-r from-yellow-500 to-amber-600 text-white shadow-lg',
    gray: 'bg-gradient-to-r from-gray-400 to-gray-600 text-white shadow-lg'
  }[variant];

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2'
  }[size];

  return (
    <span className={`${variantClasses} ${sizeClasses} ${pulse ? 'animate-pulse' : ''} inline-flex items-center gap-1.5 rounded-full font-bold`}>
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </span>
  );
}

// ============================================
// PREMIUM INPUT
// ============================================

interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  icon?: LucideIcon;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export function PremiumInput({ 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  label, 
  icon: Icon, 
  error,
  required = false,
  disabled = false,
  className = ''
}: InputProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-bold text-gray-700">
          {label} {required && <span className="text-orange-500">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`premium-input ${Icon ? 'pl-12' : ''} ${error ? 'border-red-500' : ''}`}
        />
      </div>
      {error && (
        <p className="text-sm text-red-600 font-medium">{error}</p>
      )}
    </div>
  );
}

// ============================================
// PREMIUM LOADING SPINNER
// ============================================

export function PremiumSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  }[size];

  return (
    <div className="flex items-center justify-center">
      <div className={`${sizeClasses} relative`}>
        <div className="absolute inset-0 border-4 border-orange-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-t-orange-600 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-0 border-4 border-t-transparent border-r-cyan-600 border-b-transparent border-l-transparent rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
      </div>
    </div>
  );
}

// ============================================
// PREMIUM ALERT/TOAST
// ============================================

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  icon?: LucideIcon;
}

export function PremiumAlert({ type, title, message, icon: Icon }: AlertProps) {
  const typeStyles = {
    success: 'from-green-50 to-emerald-50 border-green-300 text-green-800',
    error: 'from-red-50 to-rose-50 border-red-300 text-red-800',
    warning: 'from-yellow-50 to-amber-50 border-yellow-300 text-yellow-800',
    info: 'from-cyan-50 to-blue-50 border-cyan-300 text-cyan-800'
  }[type];

  const iconColors = {
    success: 'text-green-600',
    error: 'text-red-600',
    warning: 'text-yellow-600',
    info: 'text-cyan-600'
  }[type];

  return (
    <div className={`bg-gradient-to-r ${typeStyles} border-2 rounded-xl p-4 shadow-lg animate-fade-in-down`}>
      <div className="flex items-start gap-3">
        {Icon && <Icon className={`w-6 h-6 ${iconColors} flex-shrink-0`} />}
        <div className="flex-1">
          <h4 className="font-bold text-sm mb-1">{title}</h4>
          {message && <p className="text-sm opacity-90">{message}</p>}
        </div>
      </div>
    </div>
  );
}

// ============================================
// PREMIUM SECTION HEADER
// ============================================

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  action?: ReactNode;
}

export function SectionHeader({ title, subtitle, icon: Icon, action }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6 animate-fade-in-down">
      <div className="flex items-center gap-4">
        {Icon && (
          <div className="bg-gradient-mixed p-3 rounded-xl shadow-lg">
            <Icon className="w-6 h-6 text-white" />
          </div>
        )}
        <div>
          <h2 className="text-2xl font-bold text-gradient-mixed">{title}</h2>
          {subtitle && <p className="text-sm text-gray-600 mt-1 font-medium">{subtitle}</p>}
        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

// ============================================
// PREMIUM TABS
// ============================================

interface TabsProps {
  tabs: Array<{ id: string; label: string; icon?: LucideIcon }>;
  activeTab: string;
  onChange: (tabId: string) => void;
}

export function PremiumTabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <div className="flex gap-2 p-2 bg-gradient-to-r from-orange-50/50 to-cyan-50/50 rounded-xl border-2 border-gray-200">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = tab.id === activeTab;
        
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
              isActive
                ? 'bg-gradient-mixed text-white shadow-lg transform scale-105'
                : 'text-gray-700 hover:bg-white/70 hover:shadow-md'
            }`}
          >
            {Icon && <Icon className="w-4 h-4" />}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

// ============================================
// PREMIUM PROGRESS BAR
// ============================================

interface ProgressBarProps {
  value: number;
  max?: number;
  variant?: 'orange' | 'blue' | 'green';
  showLabel?: boolean;
  label?: string;
}

export function PremiumProgressBar({ value, max = 100, variant = 'orange', showLabel = true, label }: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);
  
  const variantGradient = {
    orange: 'from-orange-500 to-orange-600',
    blue: 'from-cyan-500 to-cyan-600',
    green: 'from-green-500 to-emerald-600'
  }[variant];

  return (
    <div className="space-y-2">
      {showLabel && (
        <div className="flex justify-between text-sm font-bold text-gray-700">
          <span>{label || 'Progress'}</span>
          <span>{percentage.toFixed(0)}%</span>
        </div>
      )}
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
        <div 
          className={`h-full bg-gradient-to-r ${variantGradient} rounded-full transition-all duration-500 ease-out shadow-lg`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
