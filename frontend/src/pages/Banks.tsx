import { useState } from 'react';
import { Building2, MapPin, AlertCircle, Shield, Lock, Zap, Clock, CheckCircle, XCircle, Phone, Mail, Eye, TrendingUp, DollarSign, Users, Bell, RefreshCw, Download, Target, Activity, Ban, Search, Filter } from 'lucide-react';

type BankStatus = 'active' | 'responding' | 'blocked' | 'resolved';
type ActionType = 'fund_block' | 'atm_surveillance' | 'account_freeze' | 'investigation' | 'recovery';

interface BankAlert {
  id: string;
  alertId: string;
  bankName: string;
  branchCode: string;
  accountNumber: string;
  atmLocation?: string;
  atmId?: string;
  alertType: ActionType;
  status: BankStatus;
  predictedAmount: number;
  actualAmount?: number;
  confidence: number;
  timestamp: Date;
  actionTaken?: string;
  responseTime?: number; // minutes
  complaintIds: string[];
  priority: 'critical' | 'high' | 'medium' | 'low';
  coordinates?: { lat: number; lng: number };
}

interface BankPerformance {
  bankName: string;
  totalAlerts: number;
  responded: number;
  blocked: number;
  recovered: number;
  avgResponseTime: number; // minutes
  successRate: number;
  amountBlocked: number;
  amountRecovered: number;
}

export default function Banks() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedAlert, setSelectedAlert] = useState<BankAlert | null>(null);
  const [showDetailsPanel, setShowDetailsPanel] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Demo bank alerts data
  const bankAlerts: BankAlert[] = [
    {
      id: '1',
      alertId: 'BNK-2025-0001',
      bankName: 'State Bank of India',
      branchCode: 'SBIN0000234',
      accountNumber: '****5678',
      atmLocation: 'Mumbai - Andheri East, SBI ATM',
      atmId: 'ATM-MH-001234',
      alertType: 'fund_block',
      status: 'active',
      predictedAmount: 245000,
      confidence: 94,
      timestamp: new Date('2025-01-07T14:30:00'),
      complaintIds: ['CYB-2025-12345', 'CYB-2025-12340'],
      priority: 'critical',
      coordinates: { lat: 19.1136, lng: 72.8697 }
    },
    {
      id: '2',
      alertId: 'BNK-2025-0002',
      bankName: 'HDFC Bank',
      branchCode: 'HDFC0001234',
      accountNumber: '****9012',
      atmLocation: 'Delhi - Connaught Place, HDFC ATM',
      atmId: 'ATM-DL-005678',
      alertType: 'atm_surveillance',
      status: 'responding',
      predictedAmount: 185000,
      confidence: 89,
      timestamp: new Date('2025-01-07T14:15:00'),
      actionTaken: 'Security team deployed to ATM location',
      responseTime: 12,
      complaintIds: ['CYB-2025-12350'],
      priority: 'critical',
      coordinates: { lat: 28.6280, lng: 77.2177 }
    },
    {
      id: '3',
      alertId: 'BNK-2025-0003',
      bankName: 'ICICI Bank',
      branchCode: 'ICIC0001456',
      accountNumber: '****3456',
      atmLocation: 'Bangalore - MG Road, ICICI ATM',
      atmId: 'ATM-KA-009876',
      alertType: 'account_freeze',
      status: 'blocked',
      predictedAmount: 95000,
      actualAmount: 95000,
      confidence: 78,
      timestamp: new Date('2025-01-07T13:45:00'),
      actionTaken: 'Account frozen successfully. Withdrawal attempt blocked.',
      responseTime: 8,
      complaintIds: ['CYB-2025-12360'],
      priority: 'high',
      coordinates: { lat: 12.9716, lng: 77.5946 }
    },
    {
      id: '4',
      alertId: 'BNK-2025-0004',
      bankName: 'Axis Bank',
      branchCode: 'UTIB0000789',
      accountNumber: '****7890',
      atmLocation: 'Hyderabad - Banjara Hills, Axis ATM',
      atmId: 'ATM-TG-007654',
      alertType: 'investigation',
      status: 'responding',
      predictedAmount: 120000,
      confidence: 82,
      timestamp: new Date('2025-01-07T13:20:00'),
      actionTaken: 'Internal investigation initiated. Transaction monitoring active.',
      responseTime: 25,
      complaintIds: ['CYB-2025-12355'],
      priority: 'high'
    },
    {
      id: '5',
      alertId: 'BNK-2025-0005',
      bankName: 'Punjab National Bank',
      branchCode: 'PUNB0034500',
      accountNumber: '****2345',
      atmLocation: 'Chennai - T Nagar, PNB ATM',
      atmId: 'ATM-TN-003421',
      alertType: 'recovery',
      status: 'resolved',
      predictedAmount: 65000,
      actualAmount: 65000,
      confidence: 71,
      timestamp: new Date('2025-01-07T12:00:00'),
      actionTaken: 'Funds recovered. Suspect detained at branch location.',
      responseTime: 15,
      complaintIds: ['CYB-2025-12365'],
      priority: 'medium'
    },
    {
      id: '6',
      alertId: 'BNK-2025-0006',
      bankName: 'Bank of Baroda',
      branchCode: 'BARB0PUNE12',
      accountNumber: '****6789',
      atmLocation: 'Pune - Koregaon Park, BOB ATM',
      atmId: 'ATM-MH-008765',
      alertType: 'fund_block',
      status: 'blocked',
      predictedAmount: 135000,
      actualAmount: 135000,
      confidence: 85,
      timestamp: new Date('2025-01-07T11:30:00'),
      actionTaken: 'Fund blocking successful. Account under review.',
      responseTime: 6,
      complaintIds: ['CYB-2025-12370'],
      priority: 'high'
    }
  ];

  // Bank performance metrics
  const bankPerformance: BankPerformance[] = [
    {
      bankName: 'State Bank of India',
      totalAlerts: 45,
      responded: 42,
      blocked: 38,
      recovered: 32,
      avgResponseTime: 14,
      successRate: 84.4,
      amountBlocked: 8500000,
      amountRecovered: 6800000
    },
    {
      bankName: 'HDFC Bank',
      totalAlerts: 38,
      responded: 37,
      blocked: 34,
      recovered: 29,
      avgResponseTime: 11,
      successRate: 89.5,
      amountBlocked: 7200000,
      amountRecovered: 6100000
    },
    {
      bankName: 'ICICI Bank',
      totalAlerts: 32,
      responded: 31,
      blocked: 28,
      recovered: 24,
      avgResponseTime: 9,
      successRate: 87.5,
      amountBlocked: 5800000,
      amountRecovered: 5100000
    },
    {
      bankName: 'Axis Bank',
      totalAlerts: 28,
      responded: 26,
      blocked: 23,
      recovered: 19,
      avgResponseTime: 16,
      successRate: 82.1,
      amountBlocked: 4900000,
      amountRecovered: 4000000
    },
    {
      bankName: 'Punjab National Bank',
      totalAlerts: 25,
      responded: 24,
      blocked: 21,
      recovered: 18,
      avgResponseTime: 13,
      successRate: 84.0,
      amountBlocked: 3800000,
      amountRecovered: 3200000
    }
  ];

  const filteredAlerts = bankAlerts.filter(alert => {
    if (selectedFilter !== 'all' && alert.alertType !== selectedFilter) return false;
    if (selectedStatus !== 'all' && alert.status !== selectedStatus) return false;
    if (searchQuery && !alert.bankName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !alert.alertId.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const getActionTypeLabel = (type: ActionType) => {
    switch (type) {
      case 'fund_block': return 'Fund Block';
      case 'atm_surveillance': return 'ATM Surveillance';
      case 'account_freeze': return 'Account Freeze';
      case 'investigation': return 'Investigation';
      case 'recovery': return 'Recovery';
      default: return type;
    }
  };

  const getActionTypeColor = (type: ActionType) => {
    switch (type) {
      case 'fund_block': return 'bg-red-100 text-red-700 border-red-300';
      case 'atm_surveillance': return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'account_freeze': return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'investigation': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'recovery': return 'bg-green-100 text-green-700 border-green-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusColor = (status: BankStatus) => {
    switch (status) {
      case 'active': return 'bg-yellow-100 text-yellow-700';
      case 'responding': return 'bg-blue-100 text-blue-700';
      case 'blocked': return 'bg-purple-100 text-purple-700';
      case 'resolved': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-300';
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'low': return 'bg-blue-100 text-blue-700 border-blue-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const stats = {
    activeAlerts: bankAlerts.filter(a => a.status === 'active').length,
    blocked: bankAlerts.filter(a => a.status === 'blocked').length,
    resolved: bankAlerts.filter(a => a.status === 'resolved').length,
    totalAmountBlocked: bankPerformance.reduce((sum, b) => sum + b.amountBlocked, 0)
  };

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-green-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-xl p-8 border-b-4 border-green-600">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-4">
              <div className="relative">
                <Building2 className="w-10 h-10 text-green-600" />
                <Shield className="w-4 h-4 text-green-600 absolute -top-1 -right-1" />
              </div>
              Bank & FI Coordination - CFCFRMS
            </h1>
            <p className="text-base text-gray-700 mt-2 font-medium">
              Real-Time Fund Blocking | ATM Surveillance | Financial Institution Coordination
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-5 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 shadow-lg transition-all hover:shadow-xl font-medium">
              <Bell className="w-5 h-5" />
              Send Alert to Banks
            </button>
            <button className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 shadow-lg transition-all hover:shadow-xl font-medium">
              <Download className="w-5 h-5" />
              Export Report
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-5">
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-5 rounded-xl border-2 border-yellow-300 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-700 font-bold uppercase tracking-wide">Active Alerts</p>
                <p className="text-3xl font-bold text-yellow-800 mt-1">{stats.activeAlerts}</p>
              </div>
              <div className="bg-yellow-600 p-3 rounded-lg">
                <AlertCircle className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="mt-3 text-sm text-yellow-700 font-medium">Pending Bank Action</div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-xl border-2 border-purple-300 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700 font-bold uppercase tracking-wide">Blocked/Frozen</p>
                <p className="text-3xl font-bold text-purple-800 mt-1">{stats.blocked}</p>
              </div>
              <div className="bg-purple-600 p-3 rounded-lg">
                <Lock className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="mt-3 text-sm text-purple-700 font-medium">Successful Interventions</div>
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
            <div className="mt-3 text-sm text-green-700 font-medium">Funds Recovered</div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border-2 border-blue-300 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 font-bold uppercase tracking-wide">Amount Blocked</p>
                <p className="text-2xl font-bold text-blue-800 mt-1">{formatCurrency(stats.totalAmountBlocked)}</p>
              </div>
              <div className="bg-blue-600 p-3 rounded-lg">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="mt-3 text-sm text-blue-700 font-medium">Total Protected</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-0 min-h-[calc(100vh-340px)]">
        {/* Filters Sidebar */}
        <div className="col-span-2 bg-white shadow-xl p-6 space-y-6 overflow-y-auto border-r-2 border-gray-200">
          <div className="flex items-center gap-2 pb-4 border-b-2 border-gray-300">
            <Filter className="w-6 h-6 text-green-700" />
            <h3 className="font-bold text-lg text-gray-900">Filters</h3>
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
              placeholder="Bank or Alert ID"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-sm"
            />
          </div>

          {/* Action Type Filter */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center gap-2">
              <Target className="w-4 h-4" />
              Action Type
            </label>
            <select 
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-sm"
            >
              <option value="all">All Actions</option>
              <option value="fund_block">Fund Block</option>
              <option value="atm_surveillance">ATM Surveillance</option>
              <option value="account_freeze">Account Freeze</option>
              <option value="investigation">Investigation</option>
              <option value="recovery">Recovery</option>
            </select>
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-sm"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="responding">Responding</option>
              <option value="blocked">Blocked</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          {/* Quick Actions */}
          <div className="pt-3 border-t">
            <label className="text-sm font-medium text-gray-700 mb-3 block">Quick Actions</label>
            <div className="space-y-2">
              <button className="w-full px-3 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-xs font-medium transition-all flex items-center gap-2">
                <Ban className="w-4 h-4" />
                Freeze Account
              </button>
              <button className="w-full px-3 py-2 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-lg text-xs font-medium transition-all flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Enable Surveillance
              </button>
              <button className="w-full px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-medium transition-all flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email All Banks
              </button>
            </div>
          </div>
        </div>

        {/* Alerts List */}
        <div className={showDetailsPanel ? 'col-span-6' : 'col-span-10'}>
          <div className="bg-gradient-to-br from-gray-50 to-white h-full overflow-y-auto p-8">
            <div className="mb-6 flex items-center justify-between bg-white p-5 rounded-xl shadow-md border-l-4 border-green-600">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                <Shield className="w-6 h-6 text-green-600" />
                Bank Alerts ({filteredAlerts.length})
              </h2>
              <div className="flex items-center gap-3 text-sm text-gray-700 bg-green-50 px-4 py-2 rounded-lg border border-green-200">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <Clock className="w-4 h-4" />
                <span className="font-medium">CFCFRMS Active</span>
              </div>
            </div>

            <div className="space-y-5">
              {filteredAlerts.map((alert) => (
                <div
                  key={alert.id}
                  onClick={() => {
                    setSelectedAlert(alert);
                    setShowDetailsPanel(true);
                  }}
                  className={`bg-white p-6 rounded-xl border-2 hover:shadow-2xl transition-all cursor-pointer ${
                    selectedAlert?.id === alert.id ? 'border-green-600 shadow-2xl ring-4 ring-green-200' : 'border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`p-3 rounded-xl ${getActionTypeColor(alert.alertType)} border-2`}>
                        <Building2 className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-lg text-gray-900">{alert.bankName}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border-2 ${getPriorityColor(alert.priority)}`}>
                            {alert.priority}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-700 mb-3 font-medium">
                          <span className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg">
                            <span className="font-mono">{alert.alertId}</span>
                          </span>
                          <span className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg">
                            Branch: {alert.branchCode}
                          </span>
                          <span className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg">
                            A/C: {alert.accountNumber}
                          </span>
                        </div>
                        {alert.atmLocation && (
                          <div className="flex items-center gap-2 text-sm text-gray-700 mb-3">
                            <MapPin className="w-4 h-4 text-red-600" />
                            <span className="font-medium">{alert.atmLocation}</span>
                            <span className="text-xs text-gray-500">({alert.atmId})</span>
                          </div>
                        )}
                        <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                          <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                            <span className="font-medium text-gray-700 text-xs">Predicted Amount:</span>
                            <p className="font-bold text-red-700 text-lg mt-1">{formatCurrency(alert.predictedAmount)}</p>
                          </div>
                          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                            <span className="font-medium text-gray-700 text-xs">Action Required:</span>
                            <p className="font-bold text-blue-700 text-sm mt-1">{getActionTypeLabel(alert.alertType)}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-medium text-gray-700 text-sm">AI Confidence:</span>
                          <span className="font-bold text-gray-900">{alert.confidence}%</span>
                        </div>
                        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden border border-gray-300">
                          <div 
                            className={`h-full transition-all ${alert.confidence >= 90 ? 'bg-green-500' : alert.confidence >= 70 ? 'bg-yellow-500' : 'bg-orange-500'}`}
                            style={{ width: `${alert.confidence}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                        {alert.status.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-600">
                        {alert.timestamp.toLocaleTimeString()}
                      </span>
                      {alert.responseTime && (
                        <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {alert.responseTime}min
                        </span>
                      )}
                    </div>
                  </div>

                  {alert.actionTaken && (
                    <div className="mt-4 pt-4 border-t-2 border-gray-200">
                      <div className="flex items-start gap-3 text-sm bg-green-50 p-4 rounded-lg border border-green-200">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-bold text-green-800">Action Taken: </span>
                          <span className="text-gray-800">{alert.actionTaken}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 pt-4 border-t-2 border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="font-medium text-gray-700">{alert.complaintIds.length} Linked Cases</span>
                      <span className="text-gray-400">|</span>
                      <span className="text-gray-600">
                        {new Date(alert.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <button className="px-5 py-2 bg-green-600 text-white rounded-lg text-sm font-bold hover:bg-green-700 shadow-md hover:shadow-lg transition-all">
                      View Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Details Panel */}
        {showDetailsPanel && selectedAlert && (
          <div className="col-span-4 bg-gradient-to-br from-white to-gray-50 shadow-2xl overflow-y-auto border-l-4 border-green-600">
            <div className="sticky top-0 bg-gradient-to-r from-green-600 to-green-700 border-b-4 border-green-800 p-5 flex items-center justify-between z-10 shadow-lg">
              <div>
                <h3 className="font-bold text-white text-lg flex items-center gap-2">
                  <Building2 className="w-6 h-6" />
                  Bank Alert Details
                </h3>
                <p className="text-green-100 text-xs mt-1">{selectedAlert.alertId}</p>
              </div>
              <button
                onClick={() => setShowDetailsPanel(false)}
                className="p-2 hover:bg-green-500 rounded-lg transition-all"
              >
                <XCircle className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Bank Information */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-xl border-2 border-green-300 shadow-md">
                <div className="flex items-center gap-3 mb-3">
                  <Building2 className="w-7 h-7 text-green-600" />
                  <h4 className="font-bold text-lg text-gray-900">{selectedAlert.bankName}</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Branch Code:</span>
                    <span className="font-medium text-gray-900">{selectedAlert.branchCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Account:</span>
                    <span className="font-medium text-gray-900 font-mono">{selectedAlert.accountNumber}</span>
                  </div>
                  {selectedAlert.atmId && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">ATM ID:</span>
                      <span className="font-medium text-gray-900">{selectedAlert.atmId}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Required */}
              <div className="bg-white p-5 rounded-xl border-2 border-gray-200 shadow-md">
                <h5 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-base">
                  <Target className="w-5 h-5 text-orange-600" />
                  Action Required
                </h5>
                <div className="space-y-3">
                  <div className={`px-4 py-3 rounded-lg border-2 ${getActionTypeColor(selectedAlert.alertType)}`}>
                    <p className="font-bold text-base">{getActionTypeLabel(selectedAlert.alertType)}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Priority Level:</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getPriorityColor(selectedAlert.priority)}`}>
                      {selectedAlert.priority}
                    </span>
                  </div>
                </div>
              </div>

              {/* Amount Details */}
              <div className="bg-white p-5 rounded-xl border-2 border-gray-200 shadow-md">
                <h5 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-base">
                  <DollarSign className="w-5 h-5 text-red-600" />
                  Amount Details
                </h5>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Predicted Amount:</span>
                    <span className="font-bold text-red-600 text-lg">{formatCurrency(selectedAlert.predictedAmount)}</span>
                  </div>
                  {selectedAlert.actualAmount && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Actual Amount:</span>
                      <span className="font-bold text-orange-600 text-lg">{formatCurrency(selectedAlert.actualAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Confidence:</span>
                    <span className="font-bold text-green-600">{selectedAlert.confidence}%</span>
                  </div>
                </div>
              </div>

              {/* Location */}
              {selectedAlert.atmLocation && (
                <div className="bg-white p-5 rounded-xl border-2 border-gray-200 shadow-md">
                  <h5 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-base">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    ATM Location
                  </h5>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-700 font-medium">{selectedAlert.atmLocation}</p>
                    {selectedAlert.coordinates && (
                      <p className="text-xs text-gray-600">
                        Coordinates: {selectedAlert.coordinates.lat}, {selectedAlert.coordinates.lng}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Response Time */}
              {selectedAlert.responseTime && (
                <div className="bg-green-50 p-5 rounded-xl border-2 border-green-300 shadow-md">
                  <h5 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-base">
                    <Clock className="w-5 h-5 text-green-600" />
                    Response Time
                  </h5>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 text-sm">Bank responded in:</span>
                    <span className="text-2xl font-bold text-green-700">{selectedAlert.responseTime} min</span>
                  </div>
                  <p className="text-xs text-green-600 mt-2">✓ Within acceptable response time</p>
                </div>
              )}

              {/* Linked Complaints */}
              <div className="bg-white p-5 rounded-xl border-2 border-gray-200 shadow-md">
                <h5 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-base">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                  Linked Complaints
                </h5>
                <div className="space-y-2">
                  {selectedAlert.complaintIds.map((id) => (
                    <div key={id} className="bg-orange-50 p-2 rounded text-sm flex items-center justify-between">
                      <span className="text-gray-700 font-mono">{id}</span>
                      <button className="text-orange-600 hover:text-orange-800 text-xs font-medium">
                        View →
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all">
                  <Ban className="w-5 h-5" />
                  Freeze Account Immediately
                </button>
                <button className="w-full py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-sm font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all">
                  <Eye className="w-5 h-5" />
                  Enable ATM Surveillance
                </button>
                <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all">
                  <Phone className="w-5 h-5" />
                  Call Bank Security
                </button>
                <button className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all">
                  <Mail className="w-5 h-5" />
                  Send Email Alert
                </button>
              </div>

              {/* Status Update */}
              <div className="pt-5 border-t-2 border-gray-300">
                <h5 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-base">
                  <Activity className="w-5 h-5 text-indigo-600" />
                  Update Status
                </h5>
                <div className="space-y-2">
                  <button className="w-full py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm font-bold shadow-sm hover:shadow-md transition-all border-2 border-blue-300">
                    Mark as Responding
                  </button>
                  <button className="w-full py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 text-sm font-bold shadow-sm hover:shadow-md transition-all border-2 border-purple-300">
                    Mark as Blocked
                  </button>
                  <button className="w-full py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 text-sm font-bold shadow-sm hover:shadow-md transition-all border-2 border-green-300">
                    Mark as Resolved
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bank Performance Section */}
      <div className="bg-white p-8 border-t-4 border-green-600">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <TrendingUp className="w-7 h-7 text-green-600" />
          Bank Performance Metrics - CFCFRMS Integration
        </h2>
        <div className="grid grid-cols-5 gap-5">
          {bankPerformance.map((bank) => (
            <div key={bank.bankName} className="bg-gradient-to-br from-white to-gray-50 p-5 rounded-xl border-2 border-gray-200 shadow-md hover:shadow-xl transition-all">
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="w-5 h-5 text-green-600" />
                <h3 className="font-bold text-gray-900 text-sm">{bank.bankName}</h3>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Alerts:</span>
                  <span className="font-bold text-gray-900">{bank.totalAlerts}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Responded:</span>
                  <span className="font-bold text-blue-700">{bank.responded}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Blocked:</span>
                  <span className="font-bold text-purple-700">{bank.blocked}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Success Rate:</span>
                  <span className="font-bold text-green-700">{bank.successRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg Response:</span>
                  <span className="font-bold text-orange-700">{bank.avgResponseTime}min</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="text-xs text-gray-600 mb-1">Amount Blocked:</div>
                <div className="font-bold text-green-700 text-sm">{formatCurrency(bank.amountBlocked)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
