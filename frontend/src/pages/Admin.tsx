import { useState } from 'react';
import { 
  Users, Shield, Settings, Key, FileText, Globe, BarChart3, 
  Bell, Database, RefreshCw, Plus, Edit2, Trash2, Check, X, 
  Search, Filter, Download, Upload, AlertCircle, Lock, 
  UserPlus, Mail, Phone, MapPin, Calendar, Activity, 
  Eye, EyeOff, Copy, Save, RotateCw, CheckCircle, XCircle,
  Sliders, Zap, Code, Server, Briefcase, Award, Target
} from 'lucide-react';

type TabType = 'users' | 'roles' | 'config' | 'api-keys' | 'templates' | 'regions' | 'analytics' | 'audit' | 'models' | 'lea-coord' | 'geofence' | 'monitoring' | 'banks';
type UserRole = 'super-admin' | 'i4c-officer' | 'lea-officer' | 'bank-coordinator' | 'analyst' | 'viewer';
type UserStatus = 'active' | 'inactive' | 'suspended';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  region: string;
  department: string;
  lastLogin: Date;
  createdAt: Date;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
}

interface APIKey {
  id: string;
  name: string;
  key: string;
  service: string;
  status: 'active' | 'inactive';
  lastUsed: Date;
  createdAt: Date;
}

export default function Admin() {
  const [activeTab, setActiveTab] = useState<TabType>('users');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showAddAPIKeyModal, setShowAddAPIKeyModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Demo data
  const users: User[] = [
    {
      id: '1',
      name: 'Inspector Rajesh Kumar',
      email: 'rajesh.kumar@delhipolice.gov.in',
      phone: '+91-98765-43210',
      role: 'lea-officer',
      status: 'active',
      region: 'Delhi',
      department: 'Delhi Cyber Cell',
      lastLogin: new Date(Date.now() - 2 * 3600000),
      createdAt: new Date('2025-01-01')
    },
    {
      id: '2',
      name: 'Dr. Priya Sharma',
      email: 'priya.sharma@i4c.gov.in',
      phone: '+91-98765-43211',
      role: 'i4c-officer',
      status: 'active',
      region: 'National',
      department: 'I4C - Ministry of Home Affairs',
      lastLogin: new Date(Date.now() - 30 * 60000),
      createdAt: new Date('2024-12-15')
    },
    {
      id: '3',
      name: 'Mohammed Ali',
      email: 'm.ali@hyderabadpolice.gov.in',
      phone: '+91-98765-43212',
      role: 'lea-officer',
      status: 'active',
      region: 'Telangana',
      department: 'Hyderabad Cyber Crime Unit',
      lastLogin: new Date(Date.now() - 5 * 3600000),
      createdAt: new Date('2025-01-03')
    },
    {
      id: '4',
      name: 'Anita Desai',
      email: 'anita.desai@sbi.co.in',
      phone: '+91-98765-43213',
      role: 'bank-coordinator',
      status: 'active',
      region: 'Maharashtra',
      department: 'State Bank of India - Fraud Prevention',
      lastLogin: new Date(Date.now() - 1 * 3600000),
      createdAt: new Date('2025-01-05')
    },
    {
      id: '5',
      name: 'Ravi Patel',
      email: 'ravi.patel@i4c.gov.in',
      phone: '+91-98765-43214',
      role: 'analyst',
      status: 'active',
      region: 'National',
      department: 'I4C Analytics Division',
      lastLogin: new Date(Date.now() - 15 * 60000),
      createdAt: new Date('2024-12-20')
    },
    {
      id: '6',
      name: 'Constable Suresh Kumar',
      email: 'suresh.k@bangalorepolice.gov.in',
      phone: '+91-98765-43215',
      role: 'viewer',
      status: 'inactive',
      region: 'Karnataka',
      department: 'Bangalore City Police',
      lastLogin: new Date(Date.now() - 48 * 3600000),
      createdAt: new Date('2025-01-02')
    }
  ];

  const roles: Role[] = [
    {
      id: '1',
      name: 'Super Admin',
      description: 'Full system access with all permissions',
      permissions: ['all'],
      userCount: 2
    },
    {
      id: '2',
      name: 'I4C Officer',
      description: 'National level coordination and oversight',
      permissions: ['view_all', 'manage_alerts', 'manage_cases', 'view_reports', 'coordinate_lea', 'manage_banks'],
      userCount: 8
    },
    {
      id: '3',
      name: 'LEA Officer',
      description: 'State/local law enforcement investigation and response',
      permissions: ['view_regional', 'manage_alerts', 'manage_cases', 'upload_evidence', 'view_intelligence'],
      userCount: 45
    },
    {
      id: '4',
      name: 'Bank Coordinator',
      description: 'Financial institution liaison for fund blocking',
      permissions: ['view_alerts', 'fund_blocking', 'view_cases', 'update_status'],
      userCount: 23
    },
    {
      id: '5',
      name: 'Analyst',
      description: 'Data analysis and model management',
      permissions: ['view_all', 'manage_models', 'view_analytics', 'export_data'],
      userCount: 12
    },
    {
      id: '6',
      name: 'Viewer',
      description: 'Read-only access to assigned region',
      permissions: ['view_regional'],
      userCount: 18
    }
  ];

  const apiKeys: APIKey[] = [
    {
      id: '1',
      name: 'SMS Gateway - MSG91',
      key: 'msg91_*********************4a7b',
      service: 'SMS Notifications',
      status: 'active',
      lastUsed: new Date(Date.now() - 30 * 60000),
      createdAt: new Date('2024-12-01')
    },
    {
      id: '2',
      name: 'Email Service - SendGrid',
      key: 'SG.*********************x9Y2',
      service: 'Email Notifications',
      status: 'active',
      lastUsed: new Date(Date.now() - 15 * 60000),
      createdAt: new Date('2024-12-01')
    },
    {
      id: '3',
      name: 'CFCFRMS API Integration',
      key: 'cfcfrms_*********************8k3m',
      service: 'Bank Integration',
      status: 'active',
      lastUsed: new Date(Date.now() - 5 * 60000),
      createdAt: new Date('2024-12-10')
    },
    {
      id: '4',
      name: 'Google Maps Geocoding',
      key: 'AIza*********************pQr8',
      service: 'Geospatial Services',
      status: 'active',
      lastUsed: new Date(Date.now() - 2 * 3600000),
      createdAt: new Date('2024-12-05')
    },
    {
      id: '5',
      name: 'WhatsApp Business API',
      key: 'wa_*********************7n2k',
      service: 'WhatsApp Alerts',
      status: 'inactive',
      lastUsed: new Date(Date.now() - 72 * 3600000),
      createdAt: new Date('2024-11-20')
    }
  ];

  const systemConfig = {
    alertThresholds: {
      criticalRiskScore: 85,
      highRiskScore: 70,
      mediumRiskScore: 50,
      minConfidence: 60
    },
    notifications: {
      smsEnabled: true,
      emailEnabled: true,
      whatsappEnabled: false,
      pushEnabled: true
    },
    analytics: {
      predictionWindow: 24,
      dataRetention: 90,
      modelRetrainInterval: 7
    }
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'super-admin': return 'bg-red-100 text-red-700 border-red-300';
      case 'i4c-officer': return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'lea-officer': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'bank-coordinator': return 'bg-green-100 text-green-700 border-green-300';
      case 'analyst': return 'bg-indigo-100 text-indigo-700 border-indigo-300';
      case 'viewer': return 'bg-gray-100 text-gray-700 border-gray-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusColor = (status: UserStatus) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'inactive': return 'bg-gray-100 text-gray-500';
      case 'suspended': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getRoleLabel = (role: UserRole) => {
    return role.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const tabs = [
    { id: 'users' as TabType, label: 'User Management', icon: Users, color: 'blue' },
    { id: 'roles' as TabType, label: 'Roles & Permissions', icon: Shield, color: 'purple' },
    { id: 'models' as TabType, label: 'ML Models', icon: Zap, color: 'yellow' },
    { id: 'lea-coord' as TabType, label: 'LEA Coordination', icon: Briefcase, color: 'cyan' },
    { id: 'banks' as TabType, label: 'Bank Integration', icon: Award, color: 'emerald' },
    { id: 'geofence' as TabType, label: 'Geofencing', icon: Target, color: 'rose' },
    { id: 'config' as TabType, label: 'System Configuration', icon: Settings, color: 'indigo' },
    { id: 'api-keys' as TabType, label: 'API Keys', icon: Key, color: 'green' },
    { id: 'monitoring' as TabType, label: 'Live Monitoring', icon: Activity, color: 'red' },
    { id: 'templates' as TabType, label: 'Templates', icon: FileText, color: 'orange' },
    { id: 'regions' as TabType, label: 'Regional Config', icon: Globe, color: 'teal' },
    { id: 'analytics' as TabType, label: 'Analytics Settings', icon: BarChart3, color: 'pink' },
    { id: 'audit' as TabType, label: 'Audit Logs', icon: Activity, color: 'red' }
  ];

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    totalRoles: roles.length,
    activeAPIs: apiKeys.filter(k => k.status === 'active').length
  };

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-xl p-8 border-b-4 border-slate-600">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-4">
              <div className="relative">
                <Settings className="w-10 h-10 text-slate-600" />
                <Shield className="w-5 h-5 text-blue-600 absolute -bottom-1 -right-1" />
              </div>
              System Administration Panel
            </h1>
            <p className="text-base text-gray-700 mt-2 font-medium">
              User Management | Roles & Permissions | System Configuration | API Integration
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 shadow-lg transition-all hover:shadow-xl font-medium">
              <Download className="w-5 h-5" />
              Export Config
            </button>
            <button className="px-5 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 shadow-lg transition-all hover:shadow-xl font-medium">
              <RefreshCw className="w-5 h-5" />
              Sync Data
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-5">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border-2 border-blue-300 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 font-bold uppercase tracking-wide">Total Users</p>
                <p className="text-3xl font-bold text-blue-800 mt-1">{stats.totalUsers}</p>
              </div>
              <div className="bg-blue-600 p-3 rounded-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="mt-3 text-sm text-blue-700 font-medium">
              {stats.activeUsers} Active
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-xl border-2 border-purple-300 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700 font-bold uppercase tracking-wide">User Roles</p>
                <p className="text-3xl font-bold text-purple-800 mt-1">{stats.totalRoles}</p>
              </div>
              <div className="bg-purple-600 p-3 rounded-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="mt-3 text-sm text-purple-700 font-medium">
              Permission Groups
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-xl border-2 border-green-300 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 font-bold uppercase tracking-wide">Active APIs</p>
                <p className="text-3xl font-bold text-green-800 mt-1">{stats.activeAPIs}</p>
              </div>
              <div className="bg-green-600 p-3 rounded-lg">
                <Key className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="mt-3 text-sm text-green-700 font-medium">
              Integrated Services
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-5 rounded-xl border-2 border-orange-300 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-700 font-bold uppercase tracking-wide">System Status</p>
                <p className="text-2xl font-bold text-orange-800 mt-1">Healthy</p>
              </div>
              <div className="bg-orange-600 p-3 rounded-lg">
                <Activity className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm text-orange-700 font-medium">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              All Systems Operational
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white shadow-md border-b-2 border-gray-200">
        <div className="px-8 py-4">
          <div className="flex items-center gap-2 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-slate-700 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {/* User Management Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* Search and Actions Bar */}
            <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 flex items-center gap-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search users by name, email, or department..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <button className="px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center gap-2 font-medium">
                    <Filter className="w-5 h-5" />
                    Filter
                  </button>
                </div>
                <div className="flex gap-2">
                  <button className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 shadow-md font-medium">
                    <UserPlus className="w-5 h-5" />
                    Add User
                  </button>
                  <button className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 shadow-md">
                    <Upload className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-slate-700 to-slate-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">User Details</th>
                      <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Role</th>
                      <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Region</th>
                      <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Last Login</th>
                      <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.map((user, idx) => (
                      <tr key={user.id} className={`hover:bg-blue-50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <p className="font-bold text-gray-900">{user.name}</p>
                              <p className="text-sm text-gray-600">{user.department}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <p className="text-sm text-gray-800 flex items-center gap-2">
                              <Mail className="w-4 h-4 text-blue-600" />
                              {user.email}
                            </p>
                            <p className="text-sm text-gray-800 flex items-center gap-2">
                              <Phone className="w-4 h-4 text-green-600" />
                              {user.phone}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase border-2 ${getRoleColor(user.role)}`}>
                            {getRoleLabel(user.role)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <MapPin className="w-4 h-4 text-red-600" />
                            <span className="font-medium">{user.region}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase ${getStatusColor(user.status)}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-700">
                            <p className="font-medium">{new Date(user.lastLogin).toLocaleDateString()}</p>
                            <p className="text-xs text-gray-500">{new Date(user.lastLogin).toLocaleTimeString()}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Roles & Permissions Tab */}
        {activeTab === 'roles' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <Shield className="w-7 h-7 text-purple-600" />
                Role Management
              </h2>
              <button className="px-5 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2 shadow-md font-medium">
                <Plus className="w-5 h-5" />
                Create New Role
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {roles.map((role) => (
                <div key={role.id} className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200 hover:shadow-xl transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-purple-100 rounded-lg">
                        <Shield className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{role.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{role.description}</p>
                      </div>
                    </div>
                    <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                      <Edit2 className="w-4 h-4 text-gray-700" />
                    </button>
                  </div>

                  <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-blue-700">Users with this role:</span>
                      <span className="text-2xl font-bold text-blue-800">{role.userCount}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Permissions</h4>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {role.permissions.map((permission, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm text-gray-800">{permission.replace(/_/g, ' ').toUpperCase()}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium">
                      Edit Permissions
                    </button>
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm font-medium">
                      View Users
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* System Configuration Tab */}
        {activeTab === 'config' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <Sliders className="w-7 h-7 text-indigo-600" />
              System Configuration
            </h2>

            {/* Alert Thresholds */}
            <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                Alert Risk Score Thresholds
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Critical Risk Score Threshold
                  </label>
                  <input
                    type="number"
                    value={systemConfig.alertThresholds.criticalRiskScore}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Scores ≥ this value trigger critical alerts</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    High Risk Score Threshold
                  </label>
                  <input
                    type="number"
                    value={systemConfig.alertThresholds.highRiskScore}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Scores ≥ this value trigger high alerts</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Medium Risk Score Threshold
                  </label>
                  <input
                    type="number"
                    value={systemConfig.alertThresholds.mediumRiskScore}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Scores ≥ this value trigger medium alerts</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum AI Confidence (%)
                  </label>
                  <input
                    type="number"
                    value={systemConfig.alertThresholds.minConfidence}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Predictions below this are filtered out</p>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5 text-blue-600" />
                Notification Channels
              </h3>
              <div className="space-y-4">
                {[
                  { key: 'smsEnabled', label: 'SMS Alerts', icon: Phone, enabled: systemConfig.notifications.smsEnabled },
                  { key: 'emailEnabled', label: 'Email Notifications', icon: Mail, enabled: systemConfig.notifications.emailEnabled },
                  { key: 'whatsappEnabled', label: 'WhatsApp Business', icon: Phone, enabled: systemConfig.notifications.whatsappEnabled },
                  { key: 'pushEnabled', label: 'Dashboard Push Notifications', icon: Bell, enabled: systemConfig.notifications.pushEnabled }
                ].map((channel) => {
                  const Icon = channel.icon;
                  return (
                    <div key={channel.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5 text-gray-600" />
                        <span className="font-medium text-gray-900">{channel.label}</span>
                      </div>
                      <button
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          channel.enabled ? 'bg-green-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            channel.enabled ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Analytics Configuration */}
            <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-600" />
                Analytics & Model Settings
              </h3>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prediction Time Window (hours)
                  </label>
                  <input
                    type="number"
                    value={systemConfig.analytics.predictionWindow}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data Retention Period (days)
                  </label>
                  <input
                    type="number"
                    value={systemConfig.analytics.dataRetention}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Model Retrain Interval (days)
                  </label>
                  <input
                    type="number"
                    value={systemConfig.analytics.modelRetrainInterval}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium">
                Reset to Defaults
              </button>
              <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium flex items-center gap-2">
                <Save className="w-5 h-5" />
                Save Configuration
              </button>
            </div>
          </div>
        )}

        {/* API Keys Tab */}
        {activeTab === 'api-keys' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <Key className="w-7 h-7 text-green-600" />
                API Key Management
              </h2>
              <button className="px-5 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 shadow-md font-medium">
                <Plus className="w-5 h-5" />
                Add New API Key
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-green-700 to-green-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Service</th>
                      <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">API Key</th>
                      <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Purpose</th>
                      <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Last Used</th>
                      <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {apiKeys.map((apiKey, idx) => (
                      <tr key={apiKey.id} className={`hover:bg-green-50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                              <Server className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <p className="font-bold text-gray-900">{apiKey.name}</p>
                              <p className="text-xs text-gray-500">Created {new Date(apiKey.createdAt).toLocaleDateString()}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <code className="px-3 py-1.5 bg-gray-100 rounded font-mono text-sm text-gray-800">
                              {apiKey.key}
                            </code>
                            <button className="p-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                              <Copy className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                            {apiKey.service}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase ${
                            apiKey.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                          }`}>
                            {apiKey.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-700">
                            <p className="font-medium">{new Date(apiKey.lastUsed).toLocaleDateString()}</p>
                            <p className="text-xs text-gray-500">{new Date(apiKey.lastUsed).toLocaleTimeString()}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                              <RotateCw className="w-4 h-4" />
                            </button>
                            <button className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* API Integration Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-blue-600 rounded-lg">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-blue-900">SMS Gateway</h3>
                </div>
                <p className="text-sm text-blue-800 mb-4">Real-time SMS alerts to LEA officers and stakeholders</p>
                <div className="flex items-center gap-2 text-sm font-medium text-blue-700">
                  <CheckCircle className="w-4 h-4" />
                  Connected & Active
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border-2 border-green-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-green-600 rounded-lg">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-green-900">Email Service</h3>
                </div>
                <p className="text-sm text-green-800 mb-4">Detailed email notifications with intelligence reports</p>
                <div className="flex items-center gap-2 text-sm font-medium text-green-700">
                  <CheckCircle className="w-4 h-4" />
                  Connected & Active
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border-2 border-purple-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-purple-600 rounded-lg">
                    <Database className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-purple-900">CFCFRMS API</h3>
                </div>
                <p className="text-sm text-purple-800 mb-4">Integration with Citizen Financial Cyber Fraud System</p>
                <div className="flex items-center gap-2 text-sm font-medium text-purple-700">
                  <CheckCircle className="w-4 h-4" />
                  Connected & Active
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Templates Tab */}
        {activeTab === 'templates' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <FileText className="w-7 h-7 text-orange-600" />
              Template Management
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Alert Templates */}
              <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-orange-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-orange-600" />
                    Alert Notification Templates
                  </h3>
                  <button className="p-2 bg-orange-100 rounded-lg hover:bg-orange-200">
                    <Plus className="w-4 h-4 text-orange-700" />
                  </button>
                </div>
                <div className="space-y-3">
                  {['Critical Alert SMS', 'High Priority Email', 'LEA Assignment Notification', 'Bank Alert Template'].map((template, idx) => (
                    <div key={idx} className="p-4 bg-orange-50 rounded-lg border border-orange-200 hover:shadow-md transition-all cursor-pointer">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">{template}</span>
                        <div className="flex gap-2">
                          <button className="p-1 bg-white rounded hover:bg-orange-100">
                            <Edit2 className="w-4 h-4 text-orange-700" />
                          </button>
                          <button className="p-1 bg-white rounded hover:bg-orange-100">
                            <Eye className="w-4 h-4 text-orange-700" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Report Templates */}
              <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-blue-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    Report Templates
                  </h3>
                  <button className="p-2 bg-blue-100 rounded-lg hover:bg-blue-200">
                    <Plus className="w-4 h-4 text-blue-700" />
                  </button>
                </div>
                <div className="space-y-3">
                  {['Daily Intelligence Report', 'Weekly Analytics Summary', 'Case Investigation Report', 'Monthly Performance Metrics'].map((template, idx) => (
                    <div key={idx} className="p-4 bg-blue-50 rounded-lg border border-blue-200 hover:shadow-md transition-all cursor-pointer">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">{template}</span>
                        <div className="flex gap-2">
                          <button className="p-1 bg-white rounded hover:bg-blue-100">
                            <Edit2 className="w-4 h-4 text-blue-700" />
                          </button>
                          <button className="p-1 bg-white rounded hover:bg-blue-100">
                            <Download className="w-4 h-4 text-blue-700" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Regional Configuration Tab */}
        {activeTab === 'regions' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <Globe className="w-7 h-7 text-teal-600" />
              Regional Configuration
            </h2>

            <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">State/UT Coverage</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { state: 'Delhi', cases: 1247, status: 'active' },
                  { state: 'Maharashtra', cases: 2156, status: 'active' },
                  { state: 'Karnataka', cases: 987, status: 'active' },
                  { state: 'Telangana', cases: 845, status: 'active' },
                  { state: 'Tamil Nadu', cases: 1034, status: 'active' },
                  { state: 'West Bengal', cases: 756, status: 'active' },
                  { state: 'Gujarat', cases: 623, status: 'active' },
                  { state: 'Rajasthan', cases: 534, status: 'active' }
                ].map((region, idx) => (
                  <div key={idx} className="p-4 bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg border-2 border-teal-300 hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-900">{region.state}</h4>
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    </div>
                    <p className="text-sm text-gray-700">Active Cases: <span className="font-bold text-teal-700">{region.cases}</span></p>
                    <button className="mt-3 w-full py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 text-xs font-medium">
                      Configure
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Analytics Settings Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <Target className="w-7 h-7 text-pink-600" />
              Analytics & ML Configuration
            </h2>

            <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Model Parameters</h3>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confidence Threshold (%)</label>
                  <input type="number" value={85} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prediction Window (hrs)</label>
                  <input type="number" value={24} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Min Training Samples</label>
                  <input type="number" value={1000} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Audit Logs Tab */}
        {activeTab === 'audit' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <Activity className="w-7 h-7 text-red-600" />
              System Audit Logs
            </h2>

            <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6">
              <div className="space-y-3">
                {[
                  { action: 'User Login', user: 'Dr. Priya Sharma', timestamp: new Date(Date.now() - 30 * 60000), details: 'Successful login from IP 103.x.x.x' },
                  { action: 'Configuration Updated', user: 'Admin', timestamp: new Date(Date.now() - 2 * 3600000), details: 'Alert threshold changed from 80 to 85' },
                  { action: 'API Key Generated', user: 'System', timestamp: new Date(Date.now() - 5 * 3600000), details: 'New SMS gateway API key created' },
                  { action: 'Role Modified', user: 'Admin', timestamp: new Date(Date.now() - 24 * 3600000), details: 'LEA Officer permissions updated' },
                  { action: 'User Created', user: 'Admin', timestamp: new Date(Date.now() - 48 * 3600000), details: 'New user: Inspector Rajesh Kumar' }
                ].map((log, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-all">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Activity className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-gray-900">{log.action}</h4>
                        <span className="text-xs text-gray-500">{log.timestamp.toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-gray-700">{log.details}</p>
                      <p className="text-xs text-gray-500 mt-1">By: {log.user}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
