import { useState } from 'react';
import { Bell, AlertTriangle, MapPin, Clock, Filter, CheckCircle, XCircle, User, Phone, Mail, MessageSquare, Download, RefreshCw, AlertCircle, TrendingUp, Shield, Ban, Lock, Eye, Activity, Radio } from 'lucide-react';

type SecurityLevel = 'Level-1' | 'Level-2' | 'Level-3' | 'Level-4' | 'Level-5';

interface Alert {
  id: string;
  timestamp: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  securityLevel: SecurityLevel;
  type: string;
  location: string;
  atmId?: string;
  bankName?: string;
  predictedAmount: string;
  confidence: number;
  status: 'new' | 'acknowledged' | 'investigating' | 'resolved' | 'false-positive';
  assignedTo?: string;
  description: string;
  riskScore: number;
  complaintIds: string[];
  coordinates: { lat: number; lng: number };
  actionTaken?: string;
  threatCategory?: string;
  responseTime?: string;
}

export default function Alerts() {
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [showDetailsPanel, setShowDetailsPanel] = useState(false);

  // Demo alerts data based on predictive analytics
  const alerts: Alert[] = [
    {
      id: 'ALT-2025-0001',
      timestamp: '2 min ago',
      severity: 'critical',
      securityLevel: 'Level-5',
      type: 'Predicted ATM Withdrawal',
      location: 'Mumbai - Andheri East, SBI ATM',
      atmId: 'ATM-MH-001234',
      bankName: 'State Bank of India',
      predictedAmount: '₹2,45,000',
      confidence: 94,
      status: 'new',
      description: 'High-confidence prediction of fraudulent cash withdrawal based on 15 recent UPI fraud complaints. Pattern matches known mule account behavior.',
      riskScore: 95,
      complaintIds: ['CYB-2025-12345', 'CYB-2025-12340', 'CYB-2025-12338'],
      coordinates: { lat: 19.1136, lng: 72.8697 },
      threatCategory: 'Financial Fraud - ATM',
      responseTime: 'Immediate (< 5 min)'
    },
    {
      id: 'ALT-2025-0002',
      timestamp: '8 min ago',
      severity: 'critical',
      securityLevel: 'Level-5',
      type: 'Predicted ATM Withdrawal',
      location: 'Delhi - Connaught Place, HDFC ATM',
      atmId: 'ATM-DL-005678',
      bankName: 'HDFC Bank',
      predictedAmount: '₹1,85,000',
      confidence: 89,
      status: 'acknowledged',
      assignedTo: 'Inspector Rajesh Kumar (Delhi Cyber Cell)',
      description: 'Multiple complaints linked to same account. Predicted withdrawal window: Next 2-4 hours.',
      riskScore: 87,
      complaintIds: ['CYB-2025-12350', 'CYB-2025-12349'],
      coordinates: { lat: 28.6280, lng: 77.2177 },
      threatCategory: 'Organized Crime - Mule Network',
      responseTime: 'Immediate (< 5 min)'
    },
    {
      id: 'ALT-2025-0003',
      timestamp: '15 min ago',
      severity: 'high',
      securityLevel: 'Level-4',
      type: 'Suspicious Pattern Detected',
      location: 'Bangalore - MG Road, ICICI Bank Branch',
      atmId: 'ATM-KA-009876',
      bankName: 'ICICI Bank',
      predictedAmount: '₹95,000',
      confidence: 78,
      status: 'investigating',
      assignedTo: 'SI Priya Sharma (Bangalore Cyber Crime)',
      description: 'Card cloning pattern detected. Multiple small transactions followed by large withdrawal attempt predicted.',
      riskScore: 72,
      complaintIds: ['CYB-2025-12360'],
      coordinates: { lat: 12.9716, lng: 77.5946 },
      actionTaken: 'Local police alerted, ATM under surveillance',
      threatCategory: 'Card Cloning',
      responseTime: 'Urgent (< 15 min)'
    },
    {
      id: 'ALT-2025-0004',
      timestamp: '32 min ago',
      severity: 'high',
      securityLevel: 'Level-4',
      type: 'Geofence Breach Alert',
      location: 'Hyderabad - Banjara Hills, Axis Bank ATM',
      atmId: 'ATM-TG-007654',
      bankName: 'Axis Bank',
      predictedAmount: '₹1,20,000',
      confidence: 82,
      status: 'investigating',
      assignedTo: 'ASI Mohammed Ali (Hyderabad Cyber)',
      description: 'Known fraud suspect entered high-risk geofenced area. Real-time tracking active.',
      riskScore: 68,
      complaintIds: ['CYB-2025-12355'],
      coordinates: { lat: 17.4126, lng: 78.4484 },
      actionTaken: 'Suspect tracking active, backup team dispatched',
      threatCategory: 'Suspect Tracking',
      responseTime: 'Urgent (< 15 min)'
    },
    {
      id: 'ALT-2025-0005',
      timestamp: '45 min ago',
      severity: 'medium',
      securityLevel: 'Level-3',
      type: 'Multiple Withdrawal Attempts',
      location: 'Chennai - T Nagar, Punjab National Bank',
      atmId: 'ATM-TN-003421',
      bankName: 'Punjab National Bank',
      predictedAmount: '₹65,000',
      confidence: 71,
      status: 'resolved',
      assignedTo: 'Constable Ravi Kumar (Chennai Cyber)',
      description: 'Suspicious withdrawal attempts blocked by bank. Investigation completed.',
      riskScore: 55,
      complaintIds: ['CYB-2025-12365'],
      coordinates: { lat: 13.0418, lng: 80.2341 },
      actionTaken: 'Account frozen, suspect detained at ATM location',
      threatCategory: 'Suspicious Activity',
      responseTime: 'Standard (< 30 min)'
    },
    {
      id: 'ALT-2025-0006',
      timestamp: '1 hour ago',
      severity: 'low',
      securityLevel: 'Level-2',
      type: 'Low Confidence Alert',
      location: 'Pune - Koregaon Park, Bank of Baroda',
      atmId: 'ATM-MH-008765',
      bankName: 'Bank of Baroda',
      predictedAmount: '₹35,000',
      confidence: 62,
      status: 'false-positive',
      assignedTo: 'Head Constable Sunil Patil (Pune Cyber)',
      description: 'Legitimate transaction confirmed by account holder.',
      riskScore: 45,
      complaintIds: ['CYB-2025-12370'],
      coordinates: { lat: 18.5204, lng: 73.8567 },
      actionTaken: 'Verified as false positive, no action required',
      threatCategory: 'Low Priority Review',
      responseTime: 'Routine (< 2 hours)'
    }
  ];

  const filteredAlerts = alerts.filter(alert => {
    if (selectedSeverity !== 'all' && alert.severity !== selectedSeverity) return false;
    if (selectedStatus !== 'all' && alert.status !== selectedStatus) return false;
    return true;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'high': return 'bg-orange-50 text-orange-600 border-orange-200';
      case 'medium': return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'low': return 'bg-blue-100 text-blue-700 border-blue-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getSecurityLevelInfo = (level: SecurityLevel) => {
    switch (level) {
      case 'Level-5':
        return { color: 'bg-accent-600', textColor: 'text-accent-600', bgColor: 'bg-accent-50', border: 'border-accent-600', icon: AlertTriangle, desc: 'Extreme Threat - Immediate Action Required' };
      case 'Level-4':
        return { color: 'bg-accent-500', textColor: 'text-accent-500', bgColor: 'bg-accent-50', border: 'border-accent-500', icon: AlertCircle, desc: 'High Threat - Urgent Response Needed' };
      case 'Level-3':
        return { color: 'bg-primary-500', textColor: 'text-primary-500', bgColor: 'bg-primary-50', border: 'border-primary-500', icon: Shield, desc: 'Moderate Threat - Attention Required' };
      case 'Level-2':
        return { color: 'bg-primary-600', textColor: 'text-primary-600', bgColor: 'bg-primary-50', border: 'border-primary-600', icon: Eye, desc: 'Low Threat - Monitor Closely' };
      case 'Level-1':
        return { color: 'bg-blue-400', textColor: 'text-blue-400', bgColor: 'bg-blue-50', border: 'border-blue-400', icon: Activity, desc: 'Minimal Threat - Routine Check' };
      default:
        return { color: 'bg-gray-600', textColor: 'text-gray-600', bgColor: 'bg-gray-50', border: 'border-gray-600', icon: Activity, desc: 'Unknown Level' };
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <Bell className="w-4 h-4" />;
      case 'acknowledged': return <CheckCircle className="w-4 h-4" />;
      case 'investigating': return <TrendingUp className="w-4 h-4" />;
      case 'resolved': return <Shield className="w-4 h-4" />;
      case 'false-positive': return <Ban className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-purple-100 text-purple-700';
      case 'acknowledged': return 'bg-blue-100 text-blue-700';
      case 'investigating': return 'bg-yellow-100 text-yellow-700';
      case 'resolved': return 'bg-green-100 text-green-700';
      case 'false-positive': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const stats = {
    newAlerts: alerts.filter(a => a.status === 'new').length,
    inProgress: alerts.filter(a => a.status === 'investigating').length,
    resolved: alerts.filter(a => a.status === 'resolved').length,
    criticalAlerts: alerts.filter(a => a.severity === 'critical').length
  };

  return (
    <div className="min-h-screen overflow-hidden relative" style={{background: 'transparent'}}>
      {/* Header */}
      <div className="relative bg-white/95 backdrop-blur-xl shadow-2xl p-8 border-b-4 border-gradient-mixed animate-slide-in-down">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-900 via-accent-600 to-danger bg-clip-text text-transparent flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-danger blur-xl opacity-50 animate-pulse"></div>
                <Bell className="w-10 h-10 text-danger relative z-10 animate-bounce" />
                <Radio className="w-4 h-4 text-danger absolute -top-1 -right-1 animate-ping z-20" />
              </div>
              Real-Time Alert & Notification System
            </h1>
            <p className="text-base text-gray-700 mt-2 font-medium">
              Advanced Security Intelligence Platform | Multi-Level Threat Detection & Response System
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-5 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-accent-600 text-white rounded-xl hover:scale-105 flex items-center gap-2 shadow-xl transition-all hover:shadow-2xl font-bold group">
              <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              Refresh Alerts
            </button>
            <button className="px-5 py-3 bg-gradient-to-r from-success to-success-dark hover:from-success-dark hover:to-success text-white rounded-xl hover:scale-105 flex items-center gap-2 shadow-xl transition-all hover:shadow-2xl font-bold group">
              <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
              Export Report
            </button>
          </div>
        </div>

        {/* Security Level Legend */}
        <div className="mb-6 bg-gradient-to-r from-gray-50 to-blue-50 border-2 border-blue-200 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="w-6 h-6 text-blue-700" />
            <h3 className="text-lg font-bold text-gray-900">Security Threat Levels</h3>
            <span className="ml-auto text-sm text-gray-600 font-medium">National Cybercrime Alert Framework</span>
          </div>
          <div className="grid grid-cols-5 gap-3">
            {(['Level-5', 'Level-4', 'Level-3', 'Level-2', 'Level-1'] as SecurityLevel[]).map((level) => {
              const info = getSecurityLevelInfo(level);
              const Icon = info.icon;
              return (
                <div key={level} className={`${info.bgColor} border-2 ${info.border} rounded-lg p-3 transition-all hover:shadow-md`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={`w-5 h-5 ${info.textColor}`} />
                    <span className={`font-bold ${info.textColor} text-sm`}>{level}</span>
                  </div>
                  <p className="text-xs text-gray-700 font-medium leading-tight">{info.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-5">
          <div className="bg-gradient-to-br from-red-50 to-red-100 p-5 rounded-xl border-2 border-red-300 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-slide-up">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-700 font-bold uppercase tracking-wide">New Alerts</p>
                <p className="text-3xl font-bold text-red-800 mt-1">{stats.newAlerts}</p>
              </div>
              <div className="bg-gradient-to-br from-danger to-red-700 p-3 rounded-xl shadow-lg animate-pulse">
                <Bell className="w-8 h-8 text-white drop-shadow-lg" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm text-red-700 font-medium">
              <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></div>
              <span>Immediate Action Required</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-5 rounded-xl border-2 border-orange-300 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-slide-up" style={{animationDelay: '0.1s'}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-700 font-bold uppercase tracking-wide">Critical Alerts</p>
                <p className="text-3xl font-bold text-orange-800 mt-1">{stats.criticalAlerts}</p>
              </div>
              <div className="bg-gradient-to-br from-accent-600 to-orange-700 p-3 rounded-xl shadow-lg">
                <AlertTriangle className="w-8 h-8 text-white drop-shadow-lg animate-pulse" />
              </div>
            </div>
            <div className="mt-3 text-sm text-orange-700 font-medium">High Confidence Threats</div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border-2 border-blue-300 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-slide-up" style={{animationDelay: '0.2s'}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 font-bold uppercase tracking-wide">Investigating</p>
                <p className="text-3xl font-bold text-blue-800 mt-1">{stats.inProgress}</p>
              </div>
              <div className="bg-gradient-to-br from-primary-600 to-cyber-blue p-3 rounded-xl shadow-lg">
                <TrendingUp className="w-8 h-8 text-white drop-shadow-lg" />
              </div>
            </div>
            <div className="mt-3 text-sm text-blue-700 font-medium">Active LEA Involvement</div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-xl border-2 border-green-300 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-slide-up" style={{animationDelay: '0.3s'}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 font-bold uppercase tracking-wide">Resolved</p>
                <p className="text-3xl font-bold text-green-800 mt-1">{stats.resolved}</p>
              </div>
              <div className="bg-gradient-to-br from-success to-success-dark p-3 rounded-xl shadow-lg">
                <CheckCircle className="w-8 h-8 text-white drop-shadow-lg" />
              </div>
            </div>
            <div className="mt-3 text-sm text-green-700 font-medium">Successful Operations</div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-12 gap-0 min-h-[calc(100vh-340px)]">
        {/* Filters Sidebar */}
        <div className="col-span-2 bg-white shadow-xl p-6 space-y-6 overflow-y-auto border-r-2 border-gray-200">
          <div className="flex items-center gap-2 pb-4 border-b-2 border-gray-300">
            <Filter className="w-6 h-6 text-blue-700" />
            <h3 className="font-bold text-lg text-gray-900">Filter Alerts</h3>
          </div>

          {/* Severity Filter */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Severity Level
            </label>
            <select 
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Alert Status
            </label>
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="acknowledged">Acknowledged</option>
              <option value="investigating">Investigating</option>
              <option value="resolved">Resolved</option>
              <option value="false-positive">False Positive</option>
            </select>
          </div>

          {/* Quick Stats */}
          <div className="pt-3 border-t">
            <label className="text-sm font-medium text-gray-700 mb-3 block">Quick Stats</label>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                <span className="text-gray-700">Critical</span>
                <span className="font-bold text-red-700">{alerts.filter(a => a.severity === 'critical').length}</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-orange-50 rounded">
                <span className="text-gray-700">High</span>
                <span className="font-bold text-orange-700">{alerts.filter(a => a.severity === 'high').length}</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                <span className="text-gray-700">Medium</span>
                <span className="font-bold text-yellow-700">{alerts.filter(a => a.severity === 'medium').length}</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                <span className="text-gray-700">Low</span>
                <span className="font-bold text-blue-700">{alerts.filter(a => a.severity === 'low').length}</span>
              </div>
            </div>
          </div>

          {/* Notification Channels */}
          <div className="pt-3 border-t">
            <label className="text-sm font-medium text-gray-700 mb-3 block">Notification Channels</label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                <MessageSquare className="w-4 h-4 text-gray-600" />
                <span className="text-xs text-gray-700">SMS Alerts</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                <Mail className="w-4 h-4 text-gray-600" />
                <span className="text-xs text-gray-700">Email Notifications</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                <Bell className="w-4 h-4 text-gray-600" />
                <span className="text-xs text-gray-700">Dashboard Alerts</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                <span className="text-xs text-gray-700">API Push</span>
              </label>
            </div>
          </div>
        </div>

        {/* Alerts List */}
        <div className={showDetailsPanel ? 'col-span-6' : 'col-span-10'}>
          <div className="bg-gradient-to-br from-gray-50 to-white h-full overflow-y-auto p-8">
            <div className="mb-6 flex items-center justify-between bg-white p-5 rounded-xl shadow-md border-l-4 border-blue-600">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                <Activity className="w-6 h-6 text-blue-600" />
                Active Alerts ({filteredAlerts.length})
              </h2>
              <div className="flex items-center gap-3 text-sm text-gray-700 bg-green-50 px-4 py-2 rounded-lg border border-green-200">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <Clock className="w-4 h-4" />
                <span className="font-medium">Live Feed • Updated: Now</span>
              </div>
            </div>

            <div className="space-y-5">
              {filteredAlerts.map((alert) => {
                const securityInfo = getSecurityLevelInfo(alert.securityLevel);
                const SecurityIcon = securityInfo.icon;
                return (
                  <div
                    key={alert.id}
                    onClick={() => {
                      setSelectedAlert(alert);
                      setShowDetailsPanel(true);
                    }}
                    className={`bg-white p-6 rounded-xl border-2 hover:shadow-2xl transition-all cursor-pointer ${
                      selectedAlert?.id === alert.id ? 'border-blue-600 shadow-2xl ring-4 ring-blue-200' : 'border-gray-300'
                    }`}
                  >
                    {/* Security Level Banner */}
                    <div className={`${securityInfo.bgColor} border-l-4 ${securityInfo.border} px-4 py-2 rounded-lg mb-4 flex items-center justify-between`}>
                      <div className="flex items-center gap-3">
                        <SecurityIcon className={`w-6 h-6 ${securityInfo.textColor}`} />
                        <div>
                          <span className={`font-bold text-sm ${securityInfo.textColor}`}>
                            SECURITY {alert.securityLevel}
                          </span>
                          <p className="text-xs text-gray-700 mt-0.5">{securityInfo.desc}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getSeverityColor(alert.severity)}`}>
                        {alert.severity}
                      </span>
                    </div>

                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`p-3 rounded-xl ${getSeverityColor(alert.severity)} border-2`}>
                          <AlertTriangle className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-lg text-gray-900">{alert.type}</h3>
                          </div>
                          <div className="flex items-center gap-5 text-sm text-gray-700 mb-3 font-medium">
                            <span className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg">
                              <MapPin className="w-4 h-4 text-blue-600" />
                              {alert.location}
                            </span>
                            <span className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg">
                              <Clock className="w-4 h-4 text-orange-600" />
                              {alert.timestamp}
                            </span>
                          </div>
                          <p className="text-sm text-gray-800 mb-4 leading-relaxed">{alert.description}</p>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                              <span className="font-medium text-gray-700 text-xs">Predicted Amount:</span>
                              <p className="font-bold text-red-700 text-lg mt-1">{alert.predictedAmount}</p>
                            </div>
                            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                              <span className="font-medium text-gray-700 text-xs">Threat Category:</span>
                              <p className="font-bold text-blue-700 text-sm mt-1">{alert.threatCategory}</p>
                            </div>
                          </div>
                          <div className="mt-3">
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="font-medium text-gray-700 text-sm">AI Confidence Score:</span>
                              <span className="font-bold text-gray-900">{alert.confidence}%</span>
                            </div>
                            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden border border-gray-300">
                              <div 
                                className={`h-full transition-all ${alert.confidence >= 80 ? 'bg-green-500' : alert.confidence >= 60 ? 'bg-yellow-500' : 'bg-orange-500'}`}
                                style={{ width: `${alert.confidence}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(alert.status)}`}>
                          {getStatusIcon(alert.status)}
                          {alert.status.replace('-', ' ').toUpperCase()}
                        </span>
                        {alert.assignedTo && (
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <User className="w-3 h-3" />
                            <span>{alert.assignedTo.split('(')[0]}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {alert.actionTaken && (
                      <div className="mt-4 pt-4 border-t-2 border-gray-200">
                        <div className="flex items-start gap-3 text-sm bg-green-50 p-4 rounded-lg border border-green-200">
                          <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-bold text-green-800">Action Taken: </span>
                            <span className="text-gray-800">{alert.actionTaken}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="mt-4 pt-4 border-t-2 border-gray-200 flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm">
                        <span className="font-medium text-gray-700">ID: <span className="font-bold text-blue-600">{alert.id}</span></span>
                        <span className="text-gray-400">|</span>
                        <span className="font-medium text-gray-700">{alert.complaintIds.length} Linked Cases</span>
                        <span className="text-gray-400">|</span>
                        <span className={`font-bold ${securityInfo.textColor}`}>Response: {alert.responseTime}</span>
                      </div>
                      <button className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 shadow-md hover:shadow-lg transition-all">
                        View Details →
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Details Panel */}
        {showDetailsPanel && selectedAlert && (
          <div className="col-span-4 bg-gradient-to-br from-white to-gray-50 shadow-2xl overflow-y-auto border-l-4 border-blue-600">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 border-b-4 border-blue-800 p-5 flex items-center justify-between z-10 shadow-lg">
              <div>
                <h3 className="font-bold text-white text-lg flex items-center gap-2">
                  <Shield className="w-6 h-6" />
                  Alert Details
                </h3>
                <p className="text-blue-100 text-xs mt-1">Comprehensive Threat Analysis</p>
              </div>
              <button
                onClick={() => setShowDetailsPanel(false)}
                className="p-2 hover:bg-blue-500 rounded-lg transition-all"
              >
                <XCircle className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Security Level Badge */}
              {(() => {
                const secInfo = getSecurityLevelInfo(selectedAlert.securityLevel);
                const SecIcon = secInfo.icon;
                return (
                  <div className={`${secInfo.bgColor} border-2 ${secInfo.border} p-5 rounded-xl shadow-md`}>
                    <div className="flex items-center gap-3 mb-3">
                      <SecIcon className={`w-8 h-8 ${secInfo.textColor}`} />
                      <div>
                        <h4 className={`font-bold text-lg ${secInfo.textColor}`}>SECURITY {selectedAlert.securityLevel}</h4>
                        <p className="text-sm text-gray-700 font-medium">{secInfo.desc}</p>
                      </div>
                    </div>
                    <div className="bg-white bg-opacity-70 p-3 rounded-lg">
                      <p className="text-sm font-medium text-gray-700">Response Time: <span className="font-bold text-gray-900">{selectedAlert.responseTime}</span></p>
                    </div>
                  </div>
                );
              })()}

              {/* Alert Header */}
              <div className="bg-gradient-to-r from-red-50 to-orange-50 p-5 rounded-xl border-2 border-red-300 shadow-md">
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangle className="w-7 h-7 text-red-600" />
                  <h4 className="font-bold text-lg text-gray-900">{selectedAlert.type}</h4>
                </div>
                <p className="text-sm text-gray-800 leading-relaxed">{selectedAlert.description}</p>
                <div className="mt-3 pt-3 border-t border-red-200">
                  <p className="text-xs font-bold text-gray-700">Threat Category: <span className="text-red-700">{selectedAlert.threatCategory}</span></p>
                </div>
              </div>

              {/* Location Details */}
              <div className="border-b-2 pb-5 border-gray-300">
                <h5 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-base">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  Location Information
                </h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium text-gray-900">{selectedAlert.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">ATM ID:</span>
                    <span className="font-medium text-gray-900">{selectedAlert.atmId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bank:</span>
                    <span className="font-medium text-gray-900">{selectedAlert.bankName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Coordinates:</span>
                    <span className="font-medium text-gray-900 text-xs">
                      {selectedAlert.coordinates.lat}, {selectedAlert.coordinates.lng}
                    </span>
                  </div>
                </div>
              </div>

              {/* Prediction Details */}
              <div className="border-b-2 pb-5 border-gray-300">
                <h5 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-base">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  AI Prediction Analysis
                </h5>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Predicted Amount:</span>
                    <span className="font-bold text-red-600 text-lg">{selectedAlert.predictedAmount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Confidence Score:</span>
                    <span className="font-bold text-green-600">{selectedAlert.confidence}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Risk Score:</span>
                    <span className={`font-bold ${
                      selectedAlert.riskScore >= 80 ? 'text-red-600' :
                      selectedAlert.riskScore >= 60 ? 'text-orange-600' :
                      'text-yellow-600'
                    }`}>{selectedAlert.riskScore}/100</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Confidence Level:</span>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mt-2">
                      <div 
                        className={`h-full ${selectedAlert.confidence >= 80 ? 'bg-green-500' : selectedAlert.confidence >= 60 ? 'bg-yellow-500' : 'bg-orange-500'}`}
                        style={{ width: `${selectedAlert.confidence}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Linked Complaints */}
              <div className="border-b-2 pb-5 border-gray-300">
                <h5 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-base">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                  Linked Complaints
                </h5>
                <div className="space-y-2">
                  {selectedAlert.complaintIds.map((id) => (
                    <div key={id} className="bg-blue-50 p-2 rounded text-sm flex items-center justify-between">
                      <span className="text-gray-700">{id}</span>
                      <button className="text-blue-600 hover:text-blue-800 text-xs font-medium">
                        View →
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Assignment */}
              <div className="border-b-2 pb-5 border-gray-300">
                <h5 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-base">
                  <User className="w-5 h-5 text-green-600" />
                  LEA Assignment
                </h5>
                {selectedAlert.assignedTo ? (
                  <div className="bg-green-50 p-3 rounded-lg text-sm">
                    <p className="text-gray-700">
                      <span className="font-medium">Assigned to:</span><br/>
                      {selectedAlert.assignedTo}
                    </p>
                  </div>
                ) : (
                  <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
                    Assign to LEA Officer
                  </button>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all">
                  <Phone className="w-5 h-5" />
                  Send SMS Alert to LEA
                </button>
                <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all">
                  <Mail className="w-5 h-5" />
                  Send Email Notification
                </button>
                <button className="w-full py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-sm font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all">
                  <Shield className="w-5 h-5" />
                  Alert Bank/FI (CFCFRMS)
                </button>
                <button className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all">
                  <MapPin className="w-5 h-5" />
                  View on Risk Map
                </button>
              </div>

              {/* Status Update */}
              <div className="pt-5 border-t-2 border-gray-300">
                <h5 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-base">
                  <Activity className="w-5 h-5 text-indigo-600" />
                  Update Alert Status
                </h5>
                <div className="space-y-3">
                  <button className="w-full py-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm font-bold shadow-sm hover:shadow-md transition-all border-2 border-blue-300">
                    Mark as Acknowledged
                  </button>
                  <button className="w-full py-3 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 text-sm font-bold shadow-sm hover:shadow-md transition-all border-2 border-yellow-300">
                    Start Investigation
                  </button>
                  <button className="w-full py-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 text-sm font-bold shadow-sm hover:shadow-md transition-all border-2 border-green-300">
                    Mark as Resolved
                  </button>
                  <button className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-bold shadow-sm hover:shadow-md transition-all border-2 border-gray-300">
                    Flag as False Positive
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
