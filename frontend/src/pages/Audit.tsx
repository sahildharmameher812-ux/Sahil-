import { useState } from 'react';
import { 
  Shield, FileText, Download, Filter, Search, Calendar, User, 
  Activity, AlertTriangle, CheckCircle, XCircle, Clock, MapPin,
  Database, Key, Settings, Users, Bell, TrendingUp, Lock,
  Eye, RefreshCw, Archive, Zap, Target, DollarSign, Phone,
  Mail, Upload, Edit, Trash2, Info, ExternalLink, ChevronDown,
  ChevronUp, Award, Briefcase, Building2, CreditCard, AlertCircle
} from 'lucide-react';

type AuditCategory = 'all' | 'complaint' | 'prediction' | 'alert' | 'intervention' | 'fund-blocking' | 'user' | 'system' | 'intelligence' | 'bank';
type SeverityLevel = 'critical' | 'high' | 'medium' | 'low' | 'info';

interface AuditLog {
  id: string;
  timestamp: Date;
  category: AuditCategory;
  severity: SeverityLevel;
  action: string;
  user: string;
  role: string;
  details: string;
  ipAddress: string;
  location: string;
  resource?: string;
  outcome: 'success' | 'failure' | 'pending';
  metadata?: Record<string, any>;
}

export default function Audit() {
  const [selectedCategory, setSelectedCategory] = useState<AuditCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('today');
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [expandedLogs, setExpandedLogs] = useState<Set<string>>(new Set());

  // Comprehensive audit logs for cybercrime framework
  const auditLogs: AuditLog[] = [
    {
      id: 'AUD-2025-0001',
      timestamp: new Date(Date.now() - 5 * 60000),
      category: 'prediction',
      severity: 'critical',
      action: 'AI Model Prediction Generated',
      user: 'System - ML Engine',
      role: 'Automated Service',
      details: 'ATM Withdrawal Location Predictor identified high-risk withdrawal at HDFC Bank ATM, Connaught Place, Delhi',
      ipAddress: 'Internal Service',
      location: 'National Data Center',
      resource: 'Model: ATM_Predictor_v2.3.1',
      outcome: 'success',
      metadata: {
        confidence: '94.2%',
        atmId: 'ATM-DL-1847',
        predictedAmount: '₹2,45,000',
        riskScore: 92,
        complaintId: 'CYB-2025-08456'
      }
    },
    {
      id: 'AUD-2025-0002',
      timestamp: new Date(Date.now() - 8 * 60000),
      category: 'alert',
      severity: 'critical',
      action: 'Level-5 Critical Alert Dispatched',
      user: 'Alert System',
      role: 'Automated Service',
      details: 'Multi-channel alert sent to Delhi Cyber Cell, I4C Officers, and HDFC Bank security team for immediate intervention',
      ipAddress: '10.45.23.112',
      location: 'I4C Alert Server',
      resource: 'Alert-ID: ALT-CR-7823',
      outcome: 'success',
      metadata: {
        channels: ['SMS', 'Email', 'Dashboard', 'API'],
        recipients: 8,
        smsDelivered: 8,
        emailDelivered: 8,
        responseTime: '< 5 minutes'
      }
    },
    {
      id: 'AUD-2025-0003',
      timestamp: new Date(Date.now() - 12 * 60000),
      category: 'intervention',
      severity: 'high',
      action: 'LEA Intervention Team Deployed',
      user: 'Inspector Rajesh Kumar',
      role: 'LEA Officer - Delhi Cyber Cell',
      details: 'Special intervention team dispatched to HDFC ATM location. Coordination with local police station initiated.',
      ipAddress: '103.24.156.78',
      location: 'Delhi Police HQ',
      resource: 'Case-ID: CASE-DL-2847',
      outcome: 'success',
      metadata: {
        teamSize: 4,
        arrivalTime: '18 minutes',
        atmSurveillance: 'Active',
        coordinatingStation: 'Connaught Place PS'
      }
    },
    {
      id: 'AUD-2025-0004',
      timestamp: new Date(Date.now() - 15 * 60000),
      category: 'fund-blocking',
      severity: 'critical',
      action: 'Emergency Fund Freeze Initiated',
      user: 'Anita Desai',
      role: 'Bank Coordinator - HDFC Bank',
      details: 'Account 45623XXXXXXX89 frozen. Transaction monitoring enabled. Mule account flagged in CFCFRMS system.',
      ipAddress: '202.54.12.89',
      location: 'HDFC Bank Fraud Prevention Center',
      resource: 'Account: 45623***89',
      outcome: 'success',
      metadata: {
        accountStatus: 'Frozen',
        pendingAmount: '₹2,45,000',
        cfcfrmsNotified: true,
        freezeType: 'Emergency',
        recoveryChance: 'High (89%)'
      }
    },
    {
      id: 'AUD-2025-0005',
      timestamp: new Date(Date.now() - 25 * 60000),
      category: 'complaint',
      severity: 'high',
      action: 'Complaint Auto-Enrichment Completed',
      user: 'System - AI Enrichment Engine',
      role: 'Automated Service',
      details: 'Complaint CYB-2025-08456 analyzed and enriched with AI-generated risk score, category, and priority level',
      ipAddress: 'Internal Service',
      location: 'National Cybercrime Portal',
      resource: 'Complaint: CYB-2025-08456',
      outcome: 'success',
      metadata: {
        originalCategory: 'UPI Fraud',
        aiRiskScore: 92,
        priorityLevel: 'Critical',
        victimAmount: '₹2,45,000',
        transactionTime: '2 hours ago',
        patternMatch: 'Organized Crime Network #47'
      }
    },
    {
      id: 'AUD-2025-0006',
      timestamp: new Date(Date.now() - 35 * 60000),
      category: 'intelligence',
      severity: 'high',
      action: 'Intelligence Report Generated',
      user: 'Dr. Priya Sharma',
      role: 'I4C Officer',
      details: 'Hotspot Prediction Report created for Delhi NCR region covering 12 high-risk ATM locations',
      ipAddress: '103.18.45.234',
      location: 'I4C Headquarters, New Delhi',
      resource: 'Report: INT-DL-2025-034',
      outcome: 'success',
      metadata: {
        reportType: 'Hotspot Prediction',
        coverage: 'Delhi NCR',
        atmsCovered: 12,
        sharedWith: ['Delhi Cyber Cell', 'Noida Police', 'Gurgaon Cyber Crime'],
        confidenceLevel: 'High'
      }
    },
    {
      id: 'AUD-2025-0007',
      timestamp: new Date(Date.now() - 45 * 60000),
      category: 'bank',
      severity: 'medium',
      action: 'Bank Security Alert Acknowledged',
      user: 'HDFC Security Team',
      role: 'Bank Security Officer',
      details: 'Alert received for ATM-DL-1847. CCTV monitoring activated. Security personnel en route.',
      ipAddress: '202.54.12.91',
      location: 'HDFC Bank Security Ops',
      resource: 'ATM: ATM-DL-1847',
      outcome: 'success',
      metadata: {
        cctvStatus: 'Recording Active',
        securityPersonnel: 2,
        eta: '15 minutes',
        alertAcknowledged: true
      }
    },
    {
      id: 'AUD-2025-0008',
      timestamp: new Date(Date.now() - 1 * 3600000),
      category: 'user',
      severity: 'info',
      action: 'User Login - Successful',
      user: 'Inspector Rajesh Kumar',
      role: 'LEA Officer',
      details: 'User authenticated successfully using 2FA. Session initiated for case investigation.',
      ipAddress: '103.24.156.78',
      location: 'Delhi, India',
      resource: 'User-ID: LEA-DL-0428',
      outcome: 'success',
      metadata: {
        authMethod: 'Password + OTP',
        sessionDuration: 'Active',
        lastLogin: '4 hours ago'
      }
    },
    {
      id: 'AUD-2025-0009',
      timestamp: new Date(Date.now() - 2 * 3600000),
      category: 'system',
      severity: 'info',
      action: 'ML Model Retraining Completed',
      user: 'System Administrator',
      role: 'System',
      details: 'ATM Withdrawal Predictor retrained with 15,847 new complaints. Accuracy improved to 92.4%.',
      ipAddress: 'Internal Service',
      location: 'ML Training Cluster',
      resource: 'Model: ATM_Predictor_v2.3.1',
      outcome: 'success',
      metadata: {
        previousAccuracy: '91.8%',
        newAccuracy: '92.4%',
        trainingSamples: 15847,
        trainingTime: '2.3 hours',
        deploymentStatus: 'Production'
      }
    },
    {
      id: 'AUD-2025-0010',
      timestamp: new Date(Date.now() - 3 * 3600000),
      category: 'complaint',
      severity: 'high',
      action: 'Bulk Complaint Upload',
      user: 'Data Entry Operator - Portal',
      role: 'Portal Administrator',
      details: 'CSV upload: 8,247 new complaints imported from National Cybercrime Helpline (1930)',
      ipAddress: '10.45.67.123',
      location: 'National Cybercrime Portal',
      resource: 'Batch: BATCH-2025-01-07',
      outcome: 'success',
      metadata: {
        totalComplaints: 8247,
        processedSuccessfully: 8247,
        failed: 0,
        avgProcessingTime: '0.3s per complaint',
        categories: {
          'UPI Fraud': 3421,
          'ATM Fraud': 1256,
          'Card Cloning': 987,
          'Investment Scams': 1834,
          'Phishing': 749
        }
      }
    },
    {
      id: 'AUD-2025-0011',
      timestamp: new Date(Date.now() - 4 * 3600000),
      category: 'intervention',
      severity: 'high',
      action: 'Successful Suspect Apprehension',
      user: 'Inspector Mohammed Ali',
      role: 'LEA Officer - Hyderabad Cyber Crime',
      details: 'Suspect arrested at ICICI ATM, Banjara Hills. ₹1,85,000 recovered. Evidence collected and documented.',
      ipAddress: '103.67.89.234',
      location: 'Hyderabad, Telangana',
      resource: 'Case: CASE-HYD-1923',
      outcome: 'success',
      metadata: {
        arrestLocation: 'ICICI ATM, Banjara Hills',
        recoveredAmount: '₹1,85,000',
        suspectDetails: 'Male, 28 years',
        evidenceCollected: ['ATM Card', 'Mobile Phone', 'Cash'],
        caseStatus: 'Closed - Resolved',
        predictionAccuracy: '96%'
      }
    },
    {
      id: 'AUD-2025-0012',
      timestamp: new Date(Date.now() - 5 * 3600000),
      category: 'intelligence',
      severity: 'medium',
      action: 'Cross-Jurisdiction Intelligence Shared',
      user: 'Dr. Priya Sharma',
      role: 'I4C Officer',
      details: 'Pattern Analysis Report distributed to Maharashtra, Karnataka, and Telangana cyber cells for coordinated operation',
      ipAddress: '103.18.45.234',
      location: 'I4C Headquarters',
      resource: 'Report: INT-PAT-2025-089',
      outcome: 'success',
      metadata: {
        reportType: 'Pattern Analysis',
        networkIdentified: 'Organized Fraud Network #47',
        statesInvolved: 3,
        linkedCases: 23,
        estimatedLoss: '₹42.7 Lakhs'
      }
    },
    {
      id: 'AUD-2025-0013',
      timestamp: new Date(Date.now() - 6 * 3600000),
      category: 'alert',
      severity: 'medium',
      action: 'Geofence Breach Alert',
      user: 'Alert System',
      role: 'Automated Service',
      details: 'Monitored suspect device detected within 500m radius of flagged ATM in Mumbai',
      ipAddress: '10.45.23.115',
      location: 'I4C Alert Server',
      resource: 'Geofence: GF-MUM-0847',
      outcome: 'success',
      metadata: {
        deviceId: 'IMEI-***********4782',
        distance: '320 meters',
        atmLocation: 'SBI ATM, Andheri West',
        alertLevel: 'Level-3',
        leaNotified: true
      }
    },
    {
      id: 'AUD-2025-0014',
      timestamp: new Date(Date.now() - 8 * 3600000),
      category: 'fund-blocking',
      severity: 'critical',
      action: 'Fund Recovery Successful',
      user: 'Bank Coordinator - SBI',
      role: 'Bank Coordinator',
      details: 'Blocked funds transferred back to victim account. Case marked as resolved in CFCFRMS.',
      ipAddress: '202.67.89.123',
      location: 'State Bank of India - Fraud Dept',
      resource: 'Transaction: TXN-REC-8456',
      outcome: 'success',
      metadata: {
        recoveredAmount: '₹2,45,000',
        victimAccount: '3456****2341',
        recoveryTime: '4.2 hours',
        cfcfrmsStatus: 'Closed - Recovered',
        successRate: '100%'
      }
    },
    {
      id: 'AUD-2025-0015',
      timestamp: new Date(Date.now() - 10 * 3600000),
      category: 'system',
      severity: 'low',
      action: 'Database Backup Completed',
      user: 'System - Backup Service',
      role: 'Automated Service',
      details: 'Automated daily backup of complaint database, ML models, and audit logs completed successfully',
      ipAddress: 'Internal Service',
      location: 'Backup Data Center',
      resource: 'Backup: BKP-2025-01-07',
      outcome: 'success',
      metadata: {
        dataSize: '347 GB',
        backupDuration: '42 minutes',
        compressionRatio: '65%',
        verificationStatus: 'Passed',
        retentionDays: 90
      }
    },
    {
      id: 'AUD-2025-0016',
      timestamp: new Date(Date.now() - 12 * 3600000),
      category: 'prediction',
      severity: 'high',
      action: 'Fraud Pattern Detection',
      user: 'System - Pattern Detection Engine',
      role: 'Automated Service',
      details: 'Mule account network identified with 15 linked accounts across 4 banks. Total exposure: ₹67.8 Lakhs',
      ipAddress: 'Internal Service',
      location: 'ML Inference Server',
      resource: 'Model: Pattern_Detector_v1.8.3',
      outcome: 'success',
      metadata: {
        networkId: 'NET-2025-0089',
        accountsIdentified: 15,
        banksInvolved: 4,
        totalExposure: '₹67.8 Lakhs',
        confidence: '87.6%',
        actionRequired: 'Immediate Investigation'
      }
    },
    {
      id: 'AUD-2025-0017',
      timestamp: new Date(Date.now() - 18 * 3600000),
      category: 'user',
      severity: 'medium',
      action: 'Failed Login Attempt',
      user: 'Unknown',
      role: 'N/A',
      details: 'Multiple failed login attempts detected for user account LEA-DL-0428. Account temporarily locked for security.',
      ipAddress: '45.123.67.89',
      location: 'Unknown Location',
      resource: 'User: LEA-DL-0428',
      outcome: 'failure',
      metadata: {
        attempts: 5,
        lockDuration: '30 minutes',
        securityAlert: 'Triggered',
        notificationSent: true,
        suspiciousActivity: true
      }
    },
    {
      id: 'AUD-2025-0018',
      timestamp: new Date(Date.now() - 24 * 3600000),
      category: 'bank',
      severity: 'info',
      action: 'ATM Surveillance Enhanced',
      user: 'ICICI Bank Security',
      role: 'Bank Security Officer',
      details: 'Enhanced CCTV monitoring activated for 24 high-risk ATMs in Mumbai based on AI predictions',
      ipAddress: '202.89.45.67',
      location: 'ICICI Bank Ops Center',
      resource: 'ATM Group: MUM-HIGH-RISK-24',
      outcome: 'success',
      metadata: {
        atmsMonitored: 24,
        surveillanceLevel: 'Enhanced',
        duration: '72 hours',
        securityPersonnelAlerted: true
      }
    }
  ];

  const categories = [
    { id: 'all', label: 'All Activities', icon: Activity, count: auditLogs.length, color: 'gray' },
    { id: 'complaint', label: 'Complaints', icon: FileText, count: auditLogs.filter(l => l.category === 'complaint').length, color: 'blue' },
    { id: 'prediction', label: 'AI Predictions', icon: Zap, count: auditLogs.filter(l => l.category === 'prediction').length, color: 'yellow' },
    { id: 'alert', label: 'Alerts', icon: Bell, count: auditLogs.filter(l => l.category === 'alert').length, color: 'red' },
    { id: 'intervention', label: 'LEA Interventions', icon: Shield, count: auditLogs.filter(l => l.category === 'intervention').length, color: 'purple' },
    { id: 'fund-blocking', label: 'Fund Operations', icon: DollarSign, count: auditLogs.filter(l => l.category === 'fund-blocking').length, color: 'green' },
    { id: 'intelligence', label: 'Intelligence', icon: Target, count: auditLogs.filter(l => l.category === 'intelligence').length, color: 'indigo' },
    { id: 'bank', label: 'Bank Activities', icon: Building2, count: auditLogs.filter(l => l.category === 'bank').length, color: 'emerald' },
    { id: 'user', label: 'User Actions', icon: Users, count: auditLogs.filter(l => l.category === 'user').length, color: 'cyan' },
    { id: 'system', label: 'System Events', icon: Settings, count: auditLogs.filter(l => l.category === 'system').length, color: 'slate' }
  ];

  const getSeverityColor = (severity: SeverityLevel) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-300';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'info': return 'bg-gray-100 text-gray-800 border-gray-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getOutcomeIcon = (outcome: string) => {
    switch (outcome) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'failure': return <XCircle className="w-5 h-5 text-red-600" />;
      case 'pending': return <Clock className="w-5 h-5 text-orange-600" />;
      default: return <Info className="w-5 h-5 text-gray-600" />;
    }
  };

  const getCategoryIcon = (category: AuditCategory) => {
    const cat = categories.find(c => c.id === category);
    if (!cat) return Activity;
    return cat.icon;
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesCategory = selectedCategory === 'all' || log.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleExpand = (logId: string) => {
    const newExpanded = new Set(expandedLogs);
    if (newExpanded.has(logId)) {
      newExpanded.delete(logId);
    } else {
      newExpanded.add(logId);
    }
    setExpandedLogs(newExpanded);
  };

  const stats = {
    total: auditLogs.length,
    critical: auditLogs.filter(l => l.severity === 'critical').length,
    successful: auditLogs.filter(l => l.outcome === 'success').length,
    failed: auditLogs.filter(l => l.outcome === 'failure').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-xl border-b-4 border-blue-600 p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-4">
              <div className="relative">
                <Shield className="w-10 h-10 text-blue-600" />
                <Lock className="w-5 h-5 text-green-600 absolute -bottom-1 -right-1" />
              </div>
              Audit & Compliance Logs
            </h1>
            <p className="text-base text-gray-700 mt-2 font-medium">
              Immutable blockchain-ready audit trail | Real-time activity monitoring | IT Act 2000 Compliant
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-5 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 shadow-lg transition-all hover:shadow-xl font-medium">
              <Download className="w-5 h-5" />
              Export Logs
            </button>
            <button className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 shadow-lg transition-all hover:shadow-xl font-medium">
              <Archive className="w-5 h-5" />
              Archive
            </button>
            <button className="px-5 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2 shadow-lg transition-all hover:shadow-xl font-medium">
              <RefreshCw className="w-5 h-5" />
              Refresh
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-4 gap-5">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border-2 border-blue-300 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 font-bold uppercase tracking-wide">Total Activities</p>
                <p className="text-3xl font-bold text-blue-900 mt-1">{stats.total}</p>
              </div>
              <div className="bg-blue-600 p-3 rounded-lg">
                <Activity className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="mt-3 text-sm text-blue-700 font-medium">
              Last 24 Hours
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100 p-5 rounded-xl border-2 border-red-300 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-700 font-bold uppercase tracking-wide">Critical Events</p>
                <p className="text-3xl font-bold text-red-900 mt-1">{stats.critical}</p>
              </div>
              <div className="bg-red-600 p-3 rounded-lg">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="mt-3 text-sm text-red-700 font-medium">
              Requires Attention
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-xl border-2 border-green-300 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 font-bold uppercase tracking-wide">Successful</p>
                <p className="text-3xl font-bold text-green-900 mt-1">{stats.successful}</p>
              </div>
              <div className="bg-green-600 p-3 rounded-lg">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="mt-3 text-sm text-green-700 font-medium">
              {((stats.successful / stats.total) * 100).toFixed(1)}% Success Rate
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-5 rounded-xl border-2 border-orange-300 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-700 font-bold uppercase tracking-wide">Failed/Blocked</p>
                <p className="text-3xl font-bold text-orange-900 mt-1">{stats.failed}</p>
              </div>
              <div className="bg-orange-600 p-3 rounded-lg">
                <XCircle className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="mt-3 text-sm text-orange-700 font-medium">
              Security Incidents
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="p-8">
        <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by action, user, case ID, complaint ID, or details..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              />
            </div>
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white font-medium"
            >
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="quarter">Last 90 Days</option>
              <option value="all">All Time</option>
            </select>
          </div>

          {/* Category Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as AuditCategory)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap border-2 ${
                    selectedCategory === cat.id
                      ? 'bg-blue-600 text-white border-blue-700 shadow-lg'
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.label}
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    selectedCategory === cat.id ? 'bg-white text-blue-600' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Audit Logs Timeline */}
        <div className="space-y-4">
          {filteredLogs.map((log, idx) => {
            const Icon = getCategoryIcon(log.category);
            const isExpanded = expandedLogs.has(log.id);
            
            return (
              <div key={log.id} className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden hover:shadow-xl transition-all">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Timeline Line */}
                    <div className="flex flex-col items-center">
                      <div className={`p-3 rounded-full ${
                        log.severity === 'critical' ? 'bg-red-100' :
                        log.severity === 'high' ? 'bg-orange-100' :
                        log.severity === 'medium' ? 'bg-yellow-100' :
                        'bg-blue-100'
                      }`}>
                        <Icon className={`w-6 h-6 ${
                          log.severity === 'critical' ? 'text-red-600' :
                          log.severity === 'high' ? 'text-orange-600' :
                          log.severity === 'medium' ? 'text-yellow-600' :
                          'text-blue-600'
                        }`} />
                      </div>
                      {idx < filteredLogs.length - 1 && (
                        <div className="w-0.5 h-16 bg-gray-200 mt-2"></div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold text-gray-900">{log.action}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border-2 ${getSeverityColor(log.severity)}`}>
                              {log.severity}
                            </span>
                            {getOutcomeIcon(log.outcome)}
                          </div>
                          <p className="text-gray-700 mb-3">{log.details}</p>
                          
                          <div className="flex items-center gap-6 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span className="font-medium">{log.timestamp.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-gray-400" />
                              <span className="font-medium">{log.user}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span className="font-medium">{log.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Shield className="w-4 h-4 text-gray-400" />
                              <span className="font-medium">{log.role}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-mono font-bold">
                            {log.id}
                          </span>
                          <button
                            onClick={() => toggleExpand(log.id)}
                            className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                          >
                            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      {/* Expanded Details */}
                      {isExpanded && log.metadata && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                          <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide flex items-center gap-2">
                            <Database className="w-4 h-4" />
                            Detailed Information
                          </h4>
                          <div className="grid grid-cols-2 gap-4">
                            {Object.entries(log.metadata).map(([key, value]) => (
                              <div key={key} className="bg-white p-3 rounded-lg border border-gray-200">
                                <p className="text-xs text-gray-600 font-medium uppercase tracking-wide mb-1">
                                  {key.replace(/([A-Z])/g, ' $1').trim()}
                                </p>
                                <p className="text-sm font-bold text-gray-900">
                                  {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
                                </p>
                              </div>
                            ))}
                          </div>
                          
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2 text-gray-600">
                                <Key className="w-4 h-4" />
                                <span className="font-medium">IP Address:</span>
                                <code className="px-2 py-1 bg-white rounded font-mono text-xs">{log.ipAddress}</code>
                              </div>
                              {log.resource && (
                                <div className="flex items-center gap-2 text-gray-600">
                                  <Database className="w-4 h-4" />
                                  <span className="font-medium">Resource:</span>
                                  <code className="px-2 py-1 bg-white rounded font-mono text-xs">{log.resource}</code>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredLogs.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-12 text-center">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Audit Logs Found</h3>
            <p className="text-gray-600">Try adjusting your filters or search criteria</p>
          </div>
        )}

        {/* Compliance Footer */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600 rounded-lg">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-1">Compliance & Security</h3>
              <p className="text-sm text-gray-700">
                All audit logs are immutable, encrypted, and retained for 90 days as per IT Act 2000 compliance. 
                Logs are blockchain-ready and tamper-proof with cryptographic verification.
              </p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium flex items-center gap-2">
                <Eye className="w-4 h-4" />
                View Policy
              </button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium flex items-center gap-2">
                <Download className="w-4 h-4" />
                Compliance Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
