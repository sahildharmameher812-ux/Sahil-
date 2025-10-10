import { useState, useEffect } from 'react';
import { FileText, Users, Clock, MapPin, Shield, AlertTriangle, CheckCircle, TrendingUp, Link2, Paperclip, Building, CreditCard, Eye, Plus, Filter, Search, Ban, Lock, DollarSign, Phone, User, Mail, Calendar, Activity, XCircle } from 'lucide-react';
import apiClient from '../api/client';

type CaseStatus = 'open' | 'investigating' | 'fund_blocked' | 'resolved' | 'closed';
type CasePriority = 'low' | 'medium' | 'high' | 'critical';

interface CaseData {
  _id: string;
  caseId: string;
  title: string;
  description: string;
  status: CaseStatus;
  priority: CasePriority;
  linkedComplaints: any[];
  linkedAlerts: any[];
  assignedTo: any[];
  leadInvestigator: any;
  timeline: Array<{
    event: string;
    description: string;
    performedBy: any;
    timestamp: Date;
    metadata?: any;
  }>;
  evidence: Array<{
    type: 'document' | 'image' | 'video' | 'audio' | 'link' | 'note';
    title: string;
    description?: string;
    url?: string;
    uploadedBy: any;
    uploadedAt: Date;
  }>;
  suspects: Array<{
    name?: string;
    phone?: string;
    upi?: string;
    accountNumber?: string;
    bankName?: string;
    notes?: string;
  }>;
  fundBlockRequests: Array<{
    bankName: string;
    accountNumber: string;
    amount: number;
    requestedAt: Date;
    requestedBy: any;
    status: 'pending' | 'approved' | 'rejected' | 'completed';
    responseAt?: Date;
    notes?: string;
  }>;
  recoveredAmount: number;
  totalLossAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

export default function Cases() {
  const [cases, setCases] = useState<CaseData[]>([]);
  const [selectedCase, setSelectedCase] = useState<CaseData | null>(null);
  const [showDetailsPanel, setShowDetailsPanel] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Demo data for demonstration
  const demoCases: CaseData[] = [
    {
      _id: '1',
      caseId: 'CASE-2025-001',
      title: 'Mumbai ATM Fraud Network - High Value Withdrawal Prediction',
      description: 'Coordinated fraud case involving 15+ complaints with predicted cash withdrawal at Andheri East SBI ATM. AI model detected pattern of mule accounts and suspicious transaction timing.',
      status: 'investigating',
      priority: 'critical',
      linkedComplaints: [
        { complaintId: 'CYB-2025-12345', amount: 45000 },
        { complaintId: 'CYB-2025-12340', amount: 85000 },
        { complaintId: 'CYB-2025-12338', amount: 115000 }
      ],
      linkedAlerts: [
        { alertId: 'ALT-2025-0001', severity: 'critical', location: 'Mumbai - Andheri East' }
      ],
      assignedTo: [],
      leadInvestigator: { name: 'Inspector Priya Sharma', email: 'priya.sharma@cybercell.gov.in' },
      timeline: [
        { event: 'Case Created', description: 'Case initiated from high-confidence alert', performedBy: { name: 'System' }, timestamp: new Date('2025-01-07T08:30:00'), metadata: {} },
        { event: 'Alert Linked', description: 'Linked ALT-2025-0001 - Predicted ATM Withdrawal', performedBy: { name: 'System' }, timestamp: new Date('2025-01-07T08:32:00'), metadata: {} },
        { event: 'Team Deployed', description: 'Special intervention team dispatched to ATM location', performedBy: { name: 'Inspector Priya Sharma' }, timestamp: new Date('2025-01-07T09:15:00'), metadata: {} },
        { event: 'Bank Notified', description: 'SBI branch and ATM operations alerted for monitoring', performedBy: { name: 'Inspector Priya Sharma' }, timestamp: new Date('2025-01-07T09:45:00'), metadata: {} }
      ],
      evidence: [
        { type: 'document', title: 'Transaction Analysis Report', description: 'ML-generated transaction pattern analysis', uploadedBy: { name: 'System' }, uploadedAt: new Date('2025-01-07T08:35:00') },
        { type: 'document', title: 'Geospatial Risk Heatmap', description: 'Location-based risk assessment showing ATM hotspot', uploadedBy: { name: 'System' }, uploadedAt: new Date('2025-01-07T08:40:00') },
        { type: 'note', title: 'Witness Statement - ATM Security Guard', description: 'Suspicious individual loitering near ATM reported', uploadedBy: { name: 'Constable Ravi Kumar' }, uploadedAt: new Date('2025-01-07T10:30:00') }
      ],
      suspects: [
        { name: 'Unknown Male (CCTV Footage)', phone: '+91-XXXXXXXXX', accountNumber: 'XXXX-XXXX-8765', bankName: 'State Bank of India', notes: 'Primary suspect identified via predictive model' },
        { name: 'Rajesh Kumar Alias', phone: '+91-9876543210', upi: 'rajesh@paytm', accountNumber: 'XXXX-XXXX-4321', bankName: 'Punjab National Bank', notes: 'Linked mule account holder' }
      ],
      fundBlockRequests: [
        { bankName: 'State Bank of India', accountNumber: 'XXXX-XXXX-8765', amount: 245000, requestedAt: new Date('2025-01-07T09:50:00'), requestedBy: { name: 'Inspector Priya Sharma' }, status: 'pending', notes: 'High priority - predicted withdrawal in progress' },
        { bankName: 'Punjab National Bank', accountNumber: 'XXXX-XXXX-4321', amount: 85000, requestedAt: new Date('2025-01-07T10:00:00'), requestedBy: { name: 'Inspector Priya Sharma' }, status: 'approved', responseAt: new Date('2025-01-07T10:15:00'), notes: 'Account frozen by bank' }
      ],
      recoveredAmount: 85000,
      totalLossAmount: 245000,
      createdAt: new Date('2025-01-07T08:30:00'),
      updatedAt: new Date('2025-01-07T11:00:00')
    },
    {
      _id: '2',
      caseId: 'CASE-2025-002',
      title: 'Delhi UPI Fraud Ring - Proactive Intervention Success',
      description: 'Multi-state UPI fraud operation dismantled through predictive analytics. Fund recovery in progress with coordination between Delhi and UP cyber cells.',
      status: 'fund_blocked',
      priority: 'high',
      linkedComplaints: [
        { complaintId: 'CYB-2025-12350', amount: 125000 },
        { complaintId: 'CYB-2025-12349', amount: 60000 }
      ],
      linkedAlerts: [
        { alertId: 'ALT-2025-0002', severity: 'critical', location: 'Delhi - Connaught Place' }
      ],
      assignedTo: [],
      leadInvestigator: { name: 'Inspector Rajesh Kumar', email: 'rajesh.k@cybercell.gov.in' },
      timeline: [
        { event: 'Case Opened', description: 'Predictive alert triggered case creation', performedBy: { name: 'System' }, timestamp: new Date('2025-01-06T14:00:00'), metadata: {} },
        { event: 'Suspect Identified', description: 'Cross-jurisdiction data analysis revealed suspect location', performedBy: { name: 'Inspector Rajesh Kumar' }, timestamp: new Date('2025-01-06T15:30:00'), metadata: {} },
        { event: 'Fund Blocked', description: 'HDFC Bank blocked ₹185,000 following request', performedBy: { name: 'HDFC Response Team' }, timestamp: new Date('2025-01-06T16:45:00'), metadata: {} },
        { event: 'Suspect Apprehended', description: 'Suspect detained at ATM location during withdrawal attempt', performedBy: { name: 'Inspector Rajesh Kumar' }, timestamp: new Date('2025-01-06T18:20:00'), metadata: {} }
      ],
      evidence: [
        { type: 'image', title: 'Suspect CCTV Footage', description: 'ATM camera capture during withdrawal attempt', uploadedBy: { name: 'Inspector Rajesh Kumar' }, uploadedAt: new Date('2025-01-06T18:30:00') },
        { type: 'document', title: 'Bank Transaction Records', description: 'Complete transaction trail from fraud to recovery', uploadedBy: { name: 'HDFC Compliance' }, uploadedAt: new Date('2025-01-06T19:00:00') },
        { type: 'audio', title: 'Suspect Interrogation Recording', uploadedBy: { name: 'Inspector Rajesh Kumar' }, uploadedAt: new Date('2025-01-07T10:00:00') }
      ],
      suspects: [
        { name: 'Amit Verma', phone: '+91-9123456789', accountNumber: 'XXXX-XXXX-9012', bankName: 'HDFC Bank', notes: 'Arrested - Main accused' }
      ],
      fundBlockRequests: [
        { bankName: 'HDFC Bank', accountNumber: 'XXXX-XXXX-9012', amount: 185000, requestedAt: new Date('2025-01-06T16:00:00'), requestedBy: { name: 'Inspector Rajesh Kumar' }, status: 'completed', responseAt: new Date('2025-01-06T16:45:00'), notes: 'Funds frozen and recovered' }
      ],
      recoveredAmount: 185000,
      totalLossAmount: 185000,
      createdAt: new Date('2025-01-06T14:00:00'),
      updatedAt: new Date('2025-01-07T10:00:00')
    },
    {
      _id: '3',
      caseId: 'CASE-2025-003',
      title: 'Bangalore Card Cloning Network Investigation',
      description: 'Organized card cloning operation detected through pattern analysis. Multiple ATMs compromised. Coordinating with banks for enhanced surveillance.',
      status: 'investigating',
      priority: 'high',
      linkedComplaints: [
        { complaintId: 'CYB-2025-12360', amount: 95000 }
      ],
      linkedAlerts: [
        { alertId: 'ALT-2025-0003', severity: 'high', location: 'Bangalore - MG Road' }
      ],
      assignedTo: [],
      leadInvestigator: { name: 'SI Priya Sharma', email: 'priya.s@bangalorecyber.gov.in' },
      timeline: [
        { event: 'Alert Generated', description: 'Predictive model detected card cloning pattern', performedBy: { name: 'System' }, timestamp: new Date('2025-01-07T07:00:00'), metadata: {} },
        { event: 'Case Assigned', description: 'Assigned to Bangalore Cyber Crime division', performedBy: { name: 'System' }, timestamp: new Date('2025-01-07T07:30:00'), metadata: {} },
        { event: 'ATM Surveillance Activated', description: 'ICICI Bank activated enhanced monitoring at 5 ATM locations', performedBy: { name: 'SI Priya Sharma' }, timestamp: new Date('2025-01-07T09:00:00'), metadata: {} }
      ],
      evidence: [
        { type: 'document', title: 'Pattern Analysis Report', description: 'ML-detected cloning signatures across transactions', uploadedBy: { name: 'System' }, uploadedAt: new Date('2025-01-07T07:15:00') },
        { type: 'link', title: 'ATM Location Dashboard', description: 'Real-time monitoring of suspected ATM locations', uploadedBy: { name: 'SI Priya Sharma' }, uploadedAt: new Date('2025-01-07T09:30:00') }
      ],
      suspects: [
        { notes: 'Investigation in progress - suspects being identified' }
      ],
      fundBlockRequests: [],
      recoveredAmount: 0,
      totalLossAmount: 95000,
      createdAt: new Date('2025-01-07T07:00:00'),
      updatedAt: new Date('2025-01-07T11:00:00')
    },
    {
      _id: '4',
      caseId: 'CASE-2025-004',
      title: 'Hyderabad Geofence Alert - Suspect Tracking Operation',
      description: 'Known fraud suspect entered high-risk geofenced area near Banjara Hills ATMs. Real-time tracking and intervention team deployed.',
      status: 'investigating',
      priority: 'medium',
      linkedComplaints: [
        { complaintId: 'CYB-2025-12355', amount: 120000 }
      ],
      linkedAlerts: [
        { alertId: 'ALT-2025-0004', severity: 'high', location: 'Hyderabad - Banjara Hills' }
      ],
      assignedTo: [],
      leadInvestigator: { name: 'ASI Mohammed Ali', email: 'mohammed.ali@hydcyber.gov.in' },
      timeline: [
        { event: 'Geofence Breach', description: 'Suspect entered monitored high-risk zone', performedBy: { name: 'System' }, timestamp: new Date('2025-01-07T09:30:00'), metadata: {} },
        { event: 'Backup Team Dispatched', description: 'Additional officers deployed to location', performedBy: { name: 'ASI Mohammed Ali' }, timestamp: new Date('2025-01-07T10:00:00'), metadata: {} }
      ],
      evidence: [
        { type: 'document', title: 'Geospatial Tracking Data', description: 'Real-time location tracking of suspect movement', uploadedBy: { name: 'System' }, uploadedAt: new Date('2025-01-07T09:35:00') }
      ],
      suspects: [
        { name: 'Suspect (Under Surveillance)', notes: 'Active tracking in progress' }
      ],
      fundBlockRequests: [],
      recoveredAmount: 0,
      totalLossAmount: 120000,
      createdAt: new Date('2025-01-07T09:30:00'),
      updatedAt: new Date('2025-01-07T11:00:00')
    },
    {
      _id: '5',
      caseId: 'CASE-2025-005',
      title: 'Chennai Multiple Withdrawal Attempts - Successfully Blocked',
      description: 'Suspicious withdrawal attempts at T Nagar PNB ATM. Bank intervention successful, suspect detained. Case moving to closure.',
      status: 'resolved',
      priority: 'medium',
      linkedComplaints: [
        { complaintId: 'CYB-2025-12365', amount: 65000 }
      ],
      linkedAlerts: [
        { alertId: 'ALT-2025-0005', severity: 'medium', location: 'Chennai - T Nagar' }
      ],
      assignedTo: [],
      leadInvestigator: { name: 'Constable Ravi Kumar', email: 'ravi.k@chennaicyber.gov.in' },
      timeline: [
        { event: 'Alert Triggered', description: 'Multiple failed withdrawal attempts detected', performedBy: { name: 'System' }, timestamp: new Date('2025-01-06T16:00:00'), metadata: {} },
        { event: 'Account Frozen', description: 'PNB froze account preventing further attempts', performedBy: { name: 'PNB Response Team' }, timestamp: new Date('2025-01-06T16:30:00'), metadata: {} },
        { event: 'Suspect Detained', description: 'Suspect apprehended at ATM location', performedBy: { name: 'Constable Ravi Kumar' }, timestamp: new Date('2025-01-06T17:00:00'), metadata: {} },
        { event: 'Case Resolved', description: 'Investigation completed, charges filed', performedBy: { name: 'Constable Ravi Kumar' }, timestamp: new Date('2025-01-07T09:00:00'), metadata: {} }
      ],
      evidence: [
        { type: 'image', title: 'Suspect ATM Photo', description: 'Clear capture of suspect at ATM', uploadedBy: { name: 'Constable Ravi Kumar' }, uploadedAt: new Date('2025-01-06T17:15:00') },
        { type: 'document', title: 'Arrest Report', uploadedBy: { name: 'Constable Ravi Kumar' }, uploadedAt: new Date('2025-01-06T18:00:00') }
      ],
      suspects: [
        { name: 'Suresh Kumar', phone: '+91-9988776655', accountNumber: 'XXXX-XXXX-5544', bankName: 'Punjab National Bank', notes: 'Arrested and charged' }
      ],
      fundBlockRequests: [
        { bankName: 'Punjab National Bank', accountNumber: 'XXXX-XXXX-5544', amount: 65000, requestedAt: new Date('2025-01-06T16:15:00'), requestedBy: { name: 'Constable Ravi Kumar' }, status: 'completed', responseAt: new Date('2025-01-06T16:30:00'), notes: 'Account frozen, no loss incurred' }
      ],
      recoveredAmount: 65000,
      totalLossAmount: 65000,
      createdAt: new Date('2025-01-06T16:00:00'),
      updatedAt: new Date('2025-01-07T09:00:00')
    }
  ];

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      // Try to fetch from API, fallback to demo data
      const response = await apiClient.get('/cases');
      if (response.data.cases && response.data.cases.length > 0) {
        setCases(response.data.cases);
      } else {
        // If API returns empty, use demo data
        setCases(demoCases);
      }
    } catch (error) {
      // Use demo data if API fails
      console.log('Using demo data for cases');
      setCases(demoCases);
    } finally {
      setLoading(false);
    }
  };

  const filteredCases = cases.filter(caseData => {
    if (selectedStatus !== 'all' && caseData.status !== selectedStatus) return false;
    if (selectedPriority !== 'all' && caseData.priority !== selectedPriority) return false;
    if (searchQuery && !caseData.title.toLowerCase().includes(searchQuery.toLowerCase()) && !caseData.caseId.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const getStatusColor = (status: CaseStatus) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'investigating': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'fund_blocked': return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'resolved': return 'bg-green-100 text-green-700 border-green-300';
      case 'closed': return 'bg-gray-100 text-gray-700 border-gray-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getPriorityColor = (priority: CasePriority) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-300';
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'low': return 'bg-blue-100 text-blue-700 border-blue-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusIcon = (status: CaseStatus) => {
    switch (status) {
      case 'open': return <FileText className="w-4 h-4" />;
      case 'investigating': return <TrendingUp className="w-4 h-4" />;
      case 'fund_blocked': return <Lock className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      case 'closed': return <Ban className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const stats = {
    totalCases: cases.length,
    investigating: cases.filter(c => c.status === 'investigating').length,
    resolved: cases.filter(c => c.status === 'resolved').length,
    totalRecovered: cases.reduce((sum, c) => sum + c.recoveredAmount, 0)
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-xl p-8 border-b-4 border-blue-600">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-4">
              <div className="relative">
                <Shield className="w-10 h-10 text-blue-600" />
              </div>
              Law Enforcement Interface - Investigation Workspace
            </h1>
            <p className="text-base text-gray-700 mt-2 font-medium">
              Case Management | Evidence Documentation | Fund Recovery Coordination
            </p>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 shadow-lg transition-all hover:shadow-xl font-medium"
          >
            <Plus className="w-5 h-5" />
            Create New Case
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-5">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border-2 border-blue-300 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 font-bold uppercase tracking-wide">Total Cases</p>
                <p className="text-3xl font-bold text-blue-800 mt-1">{stats.totalCases}</p>
              </div>
              <div className="bg-blue-600 p-3 rounded-lg">
                <FileText className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="mt-3 text-sm text-blue-700 font-medium">Active Investigations</div>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-5 rounded-xl border-2 border-yellow-300 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-700 font-bold uppercase tracking-wide">Investigating</p>
                <p className="text-3xl font-bold text-yellow-800 mt-1">{stats.investigating}</p>
              </div>
              <div className="bg-yellow-600 p-3 rounded-lg">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="mt-3 text-sm text-yellow-700 font-medium">In Progress</div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-xl border-2 border-green-300 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 font-bold uppercase tracking-wide">Resolved</p>
                <p className="text-3xl font-bold text-green-800 mt-1">{stats.resolved}</p>
              </div>
              <div className="bg-green-600 p-3 rounded-lg">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="mt-3 text-sm text-green-700 font-medium">Successful Closures</div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-xl border-2 border-purple-300 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700 font-bold uppercase tracking-wide">Recovered</p>
                <p className="text-2xl font-bold text-purple-800 mt-1">{formatCurrency(stats.totalRecovered)}</p>
              </div>
              <div className="bg-purple-600 p-3 rounded-lg">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="mt-3 text-sm text-purple-700 font-medium">Total Fund Recovery</div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-12 gap-0 min-h-[calc(100vh-340px)]">
        {/* Filters Sidebar */}
        <div className="col-span-2 bg-white shadow-xl p-6 space-y-6 overflow-y-auto border-r-2 border-gray-200">
          <div className="flex items-center gap-2 pb-4 border-b-2 border-gray-300">
            <Filter className="w-6 h-6 text-blue-700" />
            <h3 className="font-bold text-lg text-gray-900">Filter Cases</h3>
          </div>

          {/* Search */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center gap-2">
              <Search className="w-4 h-4" />
              Search
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Case ID or Title"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* Status Filter */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Status
            </label>
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="investigating">Investigating</option>
              <option value="fund_blocked">Fund Blocked</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          {/* Priority Filter */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Priority
            </label>
            <select 
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="all">All Priorities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          {/* Quick Stats */}
          <div className="pt-3 border-t">
            <label className="text-sm font-medium text-gray-700 mb-3 block">Status Breakdown</label>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                <span className="text-gray-700">Open</span>
                <span className="font-bold text-blue-700">{cases.filter(c => c.status === 'open').length}</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                <span className="text-gray-700">Investigating</span>
                <span className="font-bold text-yellow-700">{cases.filter(c => c.status === 'investigating').length}</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-orange-50 rounded">
                <span className="text-gray-700">Fund Blocked</span>
                <span className="font-bold text-orange-700">{cases.filter(c => c.status === 'fund_blocked').length}</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                <span className="text-gray-700">Resolved</span>
                <span className="font-bold text-green-700">{cases.filter(c => c.status === 'resolved').length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cases List */}
        <div className={showDetailsPanel ? 'col-span-6' : 'col-span-10'}>
          <div className="bg-gradient-to-br from-gray-50 to-white h-full overflow-y-auto p-8">
            <div className="mb-6 flex items-center justify-between bg-white p-5 rounded-xl shadow-md border-l-4 border-blue-600">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                <Activity className="w-6 h-6 text-blue-600" />
                Investigation Cases ({filteredCases.length})
              </h2>
              <div className="flex items-center gap-3 text-sm text-gray-700 bg-green-50 px-4 py-2 rounded-lg border border-green-200">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <Clock className="w-4 h-4" />
                <span className="font-medium">Real-Time Updates</span>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="text-gray-600 mt-4">Loading cases...</p>
              </div>
            ) : filteredCases.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-md">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">No cases found</p>
                <p className="text-gray-500 text-sm mt-2">Try adjusting your filters or create a new case</p>
              </div>
            ) : (
              <div className="space-y-5">
                {filteredCases.map((caseData) => (
                  <div
                    key={caseData._id}
                    onClick={() => {
                      setSelectedCase(caseData);
                      setShowDetailsPanel(true);
                    }}
                    className={`bg-white p-6 rounded-xl border-2 hover:shadow-2xl transition-all cursor-pointer ${
                      selectedCase?._id === caseData._id ? 'border-blue-600 shadow-2xl ring-4 ring-blue-200' : 'border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`p-3 rounded-xl ${getPriorityColor(caseData.priority)} border-2`}>
                          <Shield className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-bold text-lg text-gray-900">{caseData.title}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getPriorityColor(caseData.priority)}`}>
                              {caseData.priority}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{caseData.description}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-600">
                            <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                              <User className="w-3 h-3" />
                              {caseData.leadInvestigator?.name || 'Unassigned'}
                            </span>
                            <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                              <Calendar className="w-3 h-3" />
                              {formatDate(caseData.createdAt)}
                            </span>
                            <span className="flex items-center gap-1 bg-blue-100 px-2 py-1 rounded text-blue-700">
                              <Link2 className="w-3 h-3" />
                              {caseData.linkedComplaints.length} Complaints
                            </span>
                            <span className="flex items-center gap-1 bg-red-100 px-2 py-1 rounded text-red-700">
                              <AlertTriangle className="w-3 h-3" />
                              {caseData.linkedAlerts.length} Alerts
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(caseData.status)}`}>
                        {getStatusIcon(caseData.status)}
                        {caseData.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t">
                      <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                        <span className="text-xs text-gray-700">Total Loss</span>
                        <p className="font-bold text-blue-700 text-sm mt-1">{formatCurrency(caseData.totalLossAmount)}</p>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                        <span className="text-xs text-gray-700">Recovered</span>
                        <p className="font-bold text-green-700 text-sm mt-1">{formatCurrency(caseData.recoveredAmount)}</p>
                      </div>
                      <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                        <span className="text-xs text-gray-700">Recovery Rate</span>
                        <p className="font-bold text-purple-700 text-sm mt-1">
                          {caseData.totalLossAmount > 0 ? Math.round((caseData.recoveredAmount / caseData.totalLossAmount) * 100) : 0}%
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-xs text-gray-600">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Paperclip className="w-3 h-3" />
                          {caseData.evidence.length} Evidence
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {caseData.suspects.length} Suspects
                        </span>
                        <span className="flex items-center gap-1">
                          <Building className="w-3 h-3" />
                          {caseData.fundBlockRequests.length} Fund Requests
                        </span>
                      </div>
                      <button className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-all">
                        View Details →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Details Panel */}
        {showDetailsPanel && selectedCase && (
          <div className="col-span-4 bg-gradient-to-br from-white to-gray-50 shadow-2xl overflow-y-auto border-l-4 border-blue-600">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 border-b-4 border-blue-800 p-5 flex items-center justify-between z-10 shadow-lg">
              <div>
                <h3 className="font-bold text-white text-lg flex items-center gap-2">
                  <Eye className="w-6 h-6" />
                  Case Details
                </h3>
                <p className="text-blue-100 text-xs mt-1">{selectedCase.caseId}</p>
              </div>
              <button
                onClick={() => setShowDetailsPanel(false)}
                className="p-2 hover:bg-blue-500 rounded-lg transition-all"
              >
                <XCircle className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Case Info */}
              <div className="bg-white p-5 rounded-xl border-2 border-gray-200 shadow-md">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Case Information
                </h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-600">Title:</span>
                    <p className="font-medium text-gray-900 mt-1">{selectedCase.title}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Description:</span>
                    <p className="text-gray-800 mt-1 leading-relaxed">{selectedCase.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <div>
                      <span className="text-gray-600">Status:</span>
                      <p className={`inline-block px-2 py-1 rounded text-xs font-medium mt-1 ${getStatusColor(selectedCase.status)}`}>
                        {selectedCase.status.replace('_', ' ').toUpperCase()}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600">Priority:</span>
                      <p className={`inline-block px-2 py-1 rounded text-xs font-medium mt-1 ${getPriorityColor(selectedCase.priority)}`}>
                        {selectedCase.priority.toUpperCase()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lead Investigator */}
              <div className="bg-white p-5 rounded-xl border-2 border-gray-200 shadow-md">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Lead Investigator
                </h4>
                <div className="space-y-2 text-sm">
                  <p className="font-medium text-gray-900">{selectedCase.leadInvestigator?.name || 'Unassigned'}</p>
                  {selectedCase.leadInvestigator?.email && (
                    <p className="text-gray-600 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {selectedCase.leadInvestigator.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Financial Summary */}
              <div className="bg-white p-5 rounded-xl border-2 border-gray-200 shadow-md">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                  Financial Summary
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="text-sm text-gray-700">Total Loss:</span>
                    <span className="font-bold text-red-700">{formatCurrency(selectedCase.totalLossAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm text-gray-700">Recovered:</span>
                    <span className="font-bold text-green-700">{formatCurrency(selectedCase.recoveredAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm text-gray-700">Recovery Rate:</span>
                    <span className="font-bold text-blue-700">
                      {selectedCase.totalLossAmount > 0 ? Math.round((selectedCase.recoveredAmount / selectedCase.totalLossAmount) * 100) : 0}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Linked Items */}
              <div className="bg-white p-5 rounded-xl border-2 border-gray-200 shadow-md">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Link2 className="w-5 h-5 text-blue-600" />
                  Linked Entities
                </h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-600 font-medium">Complaints:</span>
                    <div className="mt-2 space-y-1">
                      {selectedCase.linkedComplaints.map((complaint: any, idx) => (
                        <div key={idx} className="bg-blue-50 p-2 rounded text-xs flex justify-between items-center">
                          <span className="font-medium text-blue-700">{complaint.complaintId}</span>
                          {complaint.amount && <span className="text-gray-700">{formatCurrency(complaint.amount)}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600 font-medium">Alerts:</span>
                    <div className="mt-2 space-y-1">
                      {selectedCase.linkedAlerts.map((alert: any, idx) => (
                        <div key={idx} className="bg-red-50 p-2 rounded text-xs flex justify-between items-center">
                          <span className="font-medium text-red-700">{alert.alertId}</span>
                          {alert.severity && (
                            <span className={`px-2 py-0.5 rounded ${getPriorityColor(alert.severity as any)}`}>
                              {alert.severity}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Suspects */}
              {selectedCase.suspects.length > 0 && (
                <div className="bg-white p-5 rounded-xl border-2 border-gray-200 shadow-md">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    Suspects ({selectedCase.suspects.length})
                  </h4>
                  <div className="space-y-3">
                    {selectedCase.suspects.map((suspect, idx) => (
                      <div key={idx} className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-sm">
                        {suspect.name && <p className="font-medium text-gray-900">{suspect.name}</p>}
                        {suspect.phone && (
                          <p className="text-gray-600 text-xs flex items-center gap-1 mt-1">
                            <Phone className="w-3 h-3" /> {suspect.phone}
                          </p>
                        )}
                        {suspect.accountNumber && (
                          <p className="text-gray-600 text-xs flex items-center gap-1 mt-1">
                            <CreditCard className="w-3 h-3" /> {suspect.accountNumber}
                          </p>
                        )}
                        {suspect.bankName && (
                          <p className="text-gray-600 text-xs flex items-center gap-1 mt-1">
                            <Building className="w-3 h-3" /> {suspect.bankName}
                          </p>
                        )}
                        {suspect.notes && (
                          <p className="text-gray-700 text-xs mt-2 italic">{suspect.notes}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Fund Block Requests */}
              {selectedCase.fundBlockRequests.length > 0 && (
                <div className="bg-white p-5 rounded-xl border-2 border-gray-200 shadow-md">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-blue-600" />
                    Fund Block Requests ({selectedCase.fundBlockRequests.length})
                  </h4>
                  <div className="space-y-3">
                    {selectedCase.fundBlockRequests.map((request, idx) => (
                      <div key={idx} className="bg-orange-50 p-3 rounded-lg border border-orange-200 text-sm">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium text-gray-900">{request.bankName}</p>
                            <p className="text-xs text-gray-600">Acc: {request.accountNumber}</p>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-bold ${
                            request.status === 'completed' ? 'bg-green-100 text-green-700' :
                            request.status === 'approved' ? 'bg-blue-100 text-blue-700' :
                            request.status === 'rejected' ? 'bg-red-100 text-red-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {request.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="font-bold text-orange-700 mb-1">{formatCurrency(request.amount)}</p>
                        <p className="text-xs text-gray-600">Requested: {formatDate(request.requestedAt)}</p>
                        {request.responseAt && (
                          <p className="text-xs text-gray-600">Response: {formatDate(request.responseAt)}</p>
                        )}
                        {request.notes && (
                          <p className="text-xs text-gray-700 mt-2 italic">{request.notes}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Evidence */}
              {selectedCase.evidence.length > 0 && (
                <div className="bg-white p-5 rounded-xl border-2 border-gray-200 shadow-md">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Paperclip className="w-5 h-5 text-blue-600" />
                    Evidence ({selectedCase.evidence.length})
                  </h4>
                  <div className="space-y-2">
                    {selectedCase.evidence.map((evidence, idx) => (
                      <div key={idx} className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-sm">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{evidence.title}</p>
                            {evidence.description && (
                              <p className="text-xs text-gray-600 mt-1">{evidence.description}</p>
                            )}
                            <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded">{evidence.type}</span>
                              <span>{formatDate(evidence.uploadedAt)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Timeline */}
              <div className="bg-white p-5 rounded-xl border-2 border-gray-200 shadow-md">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  Investigation Timeline
                </h4>
                <div className="space-y-3">
                  {selectedCase.timeline.map((event, idx) => (
                    <div key={idx} className="relative pl-6 pb-4 border-l-2 border-blue-300 last:border-l-0 last:pb-0">
                      <div className="absolute left-0 top-0 w-3 h-3 bg-blue-600 rounded-full -translate-x-[7px]"></div>
                      <div className="text-sm">
                        <p className="font-medium text-gray-900">{event.event}</p>
                        <p className="text-xs text-gray-600 mt-1">{event.description}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {event.performedBy?.name || 'System'}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatDate(event.timestamp)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
