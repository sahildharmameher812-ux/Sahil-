import { useState, useEffect } from 'react';
import { Upload, FileText, Search, Filter, Download, RefreshCw, AlertCircle, CheckCircle, Clock, MapPin, User, Phone, CreditCard, Calendar, TrendingUp, DollarSign, Building } from 'lucide-react';
import apiClient from '../api/client';

type ComplaintStatus = 'pending' | 'under_investigation' | 'resolved' | 'closed';
type ComplaintCategory = 'UPI Fraud' | 'Card Fraud' | 'ATM Fraud' | 'Net Banking' | 'Mobile Banking' | 'Other';

interface Complaint {
  _id: string;
  complaintId: string;
  complainantName: string;
  complainantPhone: string;
  complainantEmail?: string;
  category: ComplaintCategory;
  subCategory: string;
  description: string;
  transactionDetails: {
    amount: number;
    date: Date;
    transactionId?: string;
    upiId?: string;
    accountNumber?: string;
    bankName?: string;
  };
  suspectDetails?: {
    name?: string;
    phone?: string;
    upiId?: string;
    accountNumber?: string;
    bankName?: string;
  };
  location: {
    state: string;
    district: string;
    pincode?: string;
  };
  status: ComplaintStatus;
  priority: 'low' | 'medium' | 'high' | 'critical';
  aiEnrichment?: {
    riskScore: number;
    predictedWithdrawalLocation?: string;
    linkedComplaints: string[];
    suspiciousPatterns: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

export default function Complaints() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [showDetailsPanel, setShowDetailsPanel] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Demo complaints data
  const demoComplaints: Complaint[] = [
    {
      _id: '1',
      complaintId: 'CYB-2025-12345',
      complainantName: 'Rajesh Kumar',
      complainantPhone: '+91-9876543210',
      complainantEmail: 'rajesh.k@email.com',
      category: 'UPI Fraud',
      subCategory: 'Unauthorized Transaction',
      description: 'Unauthorized UPI transaction of ₹45,000 debited from my account. I received a fake payment link via SMS claiming to be from my bank.',
      transactionDetails: {
        amount: 45000,
        date: new Date('2025-01-07T10:30:00'),
        transactionId: 'TXN20250107103045',
        upiId: 'fraud@paytm',
        accountNumber: 'XXXX-XXXX-1234',
        bankName: 'State Bank of India'
      },
      suspectDetails: {
        upiId: 'suspect123@paytm',
        accountNumber: 'XXXX-XXXX-8765',
        bankName: 'Punjab National Bank'
      },
      location: {
        state: 'Maharashtra',
        district: 'Mumbai',
        pincode: '400001'
      },
      status: 'under_investigation',
      priority: 'critical',
      aiEnrichment: {
        riskScore: 94,
        predictedWithdrawalLocation: 'Mumbai - Andheri East, SBI ATM',
        linkedComplaints: ['CYB-2025-12340', 'CYB-2025-12338'],
        suspiciousPatterns: ['Same suspect UPI ID in 12 complaints', 'Transaction timing pattern detected', 'Mule account behavior']
      },
      createdAt: new Date('2025-01-07T11:00:00'),
      updatedAt: new Date('2025-01-07T11:30:00')
    },
    {
      _id: '2',
      complaintId: 'CYB-2025-12350',
      complainantName: 'Priya Sharma',
      complainantPhone: '+91-9123456789',
      category: 'ATM Fraud',
      subCategory: 'Card Cloning',
      description: 'My ATM card was cloned and ₹85,000 was withdrawn from an ATM in Bangalore. I still have my physical card.',
      transactionDetails: {
        amount: 85000,
        date: new Date('2025-01-06T18:15:00'),
        accountNumber: 'XXXX-XXXX-5678',
        bankName: 'HDFC Bank'
      },
      location: {
        state: 'Karnataka',
        district: 'Bangalore',
        pincode: '560001'
      },
      status: 'under_investigation',
      priority: 'high',
      aiEnrichment: {
        riskScore: 89,
        predictedWithdrawalLocation: 'Delhi - Connaught Place, HDFC ATM',
        linkedComplaints: ['CYB-2025-12349'],
        suspiciousPatterns: ['Card cloning device detected in area', 'Multiple withdrawals from same ATM']
      },
      createdAt: new Date('2025-01-06T19:00:00'),
      updatedAt: new Date('2025-01-07T08:00:00')
    },
    {
      _id: '3',
      complaintId: 'CYB-2025-12360',
      complainantName: 'Amit Verma',
      complainantPhone: '+91-9988776655',
      category: 'Net Banking',
      subCategory: 'Account Takeover',
      description: 'My net banking account was hacked and ₹1,20,000 was transferred to an unknown account.',
      transactionDetails: {
        amount: 120000,
        date: new Date('2025-01-07T14:20:00'),
        transactionId: 'NEFT2025010714200',
        accountNumber: 'XXXX-XXXX-9012',
        bankName: 'ICICI Bank'
      },
      suspectDetails: {
        accountNumber: 'XXXX-XXXX-3456',
        bankName: 'Axis Bank'
      },
      location: {
        state: 'Delhi',
        district: 'New Delhi',
        pincode: '110001'
      },
      status: 'pending',
      priority: 'critical',
      aiEnrichment: {
        riskScore: 92,
        predictedWithdrawalLocation: 'Hyderabad - Banjara Hills, Axis Bank ATM',
        linkedComplaints: ['CYB-2025-12355'],
        suspiciousPatterns: ['Phishing link traced', 'Suspect account linked to fraud network']
      },
      createdAt: new Date('2025-01-07T15:00:00'),
      updatedAt: new Date('2025-01-07T15:00:00')
    },
    {
      _id: '4',
      complaintId: 'CYB-2025-12365',
      complainantName: 'Sunita Patel',
      complainantPhone: '+91-9876512345',
      category: 'Mobile Banking',
      subCategory: 'SIM Swap Fraud',
      description: 'My mobile number was ported without my consent and ₹65,000 was withdrawn from my mobile banking app.',
      transactionDetails: {
        amount: 65000,
        date: new Date('2025-01-06T16:30:00'),
        accountNumber: 'XXXX-XXXX-7890',
        bankName: 'Punjab National Bank'
      },
      location: {
        state: 'Tamil Nadu',
        district: 'Chennai',
        pincode: '600001'
      },
      status: 'resolved',
      priority: 'high',
      aiEnrichment: {
        riskScore: 78,
        predictedWithdrawalLocation: 'Chennai - T Nagar, PNB ATM',
        linkedComplaints: [],
        suspiciousPatterns: ['SIM swap detected', 'Multiple login attempts from new device']
      },
      createdAt: new Date('2025-01-06T17:00:00'),
      updatedAt: new Date('2025-01-07T09:00:00')
    },
    {
      _id: '5',
      complaintId: 'CYB-2025-12370',
      complainantName: 'Karan Singh',
      complainantPhone: '+91-9123987654',
      category: 'Card Fraud',
      subCategory: 'Online Shopping Fraud',
      description: 'Unauthorized online transactions totaling ₹35,000 on my credit card from unknown merchant.',
      transactionDetails: {
        amount: 35000,
        date: new Date('2025-01-07T09:45:00'),
        accountNumber: 'XXXX-XXXX-4567',
        bankName: 'Bank of Baroda'
      },
      location: {
        state: 'Rajasthan',
        district: 'Jaipur',
        pincode: '302001'
      },
      status: 'pending',
      priority: 'medium',
      aiEnrichment: {
        riskScore: 65,
        linkedComplaints: [],
        suspiciousPatterns: ['Card details leaked from e-commerce site']
      },
      createdAt: new Date('2025-01-07T10:30:00'),
      updatedAt: new Date('2025-01-07T10:30:00')
    }
  ];

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await apiClient.get('/complaints');
      if (response.data.complaints && response.data.complaints.length > 0) {
        setComplaints(response.data.complaints);
      } else {
        setComplaints(demoComplaints);
      }
    } catch (error) {
      console.log('Using demo data for complaints');
      setComplaints(demoComplaints);
    } finally {
      setLoading(false);
    }
  };

  const filteredComplaints = complaints.filter(complaint => {
    if (selectedCategory !== 'all' && complaint.category !== selectedCategory) return false;
    if (selectedStatus !== 'all' && complaint.status !== selectedStatus) return false;
    if (searchQuery && !complaint.complaintId.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !complaint.complainantName.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const getStatusColor = (status: ComplaintStatus) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'under_investigation': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'resolved': return 'bg-green-100 text-green-700 border-green-300';
      case 'closed': return 'bg-gray-100 text-gray-700 border-gray-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
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

  const getStatusIcon = (status: ComplaintStatus) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'under_investigation': return <TrendingUp className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      case 'closed': return <FileText className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const stats = {
    totalComplaints: complaints.length,
    pending: complaints.filter(c => c.status === 'pending').length,
    investigating: complaints.filter(c => c.status === 'under_investigation').length,
    resolved: complaints.filter(c => c.status === 'resolved').length,
    totalAmount: complaints.reduce((sum, c) => sum + c.transactionDetails.amount, 0)
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
                <FileText className="w-10 h-10 text-blue-600" />
              </div>
              National Cybercrime Complaint Portal
            </h1>
            <p className="text-base text-gray-700 mt-2 font-medium">
              Centralized Complaint Ingestion | CSV Upload | AI-Powered Auto-Enrichment
            </p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setShowUploadModal(true)}
              className="px-5 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 shadow-lg transition-all hover:shadow-xl font-medium"
            >
              <Upload className="w-5 h-5" />
              Import CSV
            </button>
            <button 
              onClick={fetchComplaints}
              className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 shadow-lg transition-all hover:shadow-xl font-medium"
            >
              <RefreshCw className="w-5 h-5" />
              Refresh
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-5">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border-2 border-blue-300 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 font-bold uppercase tracking-wide">Total Complaints</p>
                <p className="text-3xl font-bold text-blue-800 mt-1">{stats.totalComplaints}</p>
              </div>
              <div className="bg-blue-600 p-3 rounded-lg">
                <FileText className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="mt-3 text-sm text-blue-700 font-medium">Received Today</div>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-5 rounded-xl border-2 border-yellow-300 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-700 font-bold uppercase tracking-wide">Pending</p>
                <p className="text-3xl font-bold text-yellow-800 mt-1">{stats.pending}</p>
              </div>
              <div className="bg-yellow-600 p-3 rounded-lg">
                <Clock className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="mt-3 text-sm text-yellow-700 font-medium">Awaiting Action</div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border-2 border-blue-300 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 font-bold uppercase tracking-wide">Investigating</p>
                <p className="text-3xl font-bold text-blue-800 mt-1">{stats.investigating}</p>
              </div>
              <div className="bg-blue-600 p-3 rounded-lg">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="mt-3 text-sm text-blue-700 font-medium">Under Review</div>
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
            <div className="mt-3 text-sm text-green-700 font-medium">Successfully Closed</div>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100 p-5 rounded-xl border-2 border-red-300 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-700 font-bold uppercase tracking-wide">Total Loss</p>
                <p className="text-2xl font-bold text-red-800 mt-1">{formatCurrency(stats.totalAmount)}</p>
              </div>
              <div className="bg-red-600 p-3 rounded-lg">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="mt-3 text-sm text-red-700 font-medium">Reported Amount</div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-12 gap-0 min-h-[calc(100vh-340px)]">
        {/* Filters Sidebar */}
        <div className="col-span-2 bg-white shadow-xl p-6 space-y-6 overflow-y-auto border-r-2 border-gray-200">
          <div className="flex items-center gap-2 pb-4 border-b-2 border-gray-300">
            <Filter className="w-6 h-6 text-blue-700" />
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
              placeholder="Complaint ID or Name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Category
            </label>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="all">All Categories</option>
              <option value="UPI Fraud">UPI Fraud</option>
              <option value="Card Fraud">Card Fraud</option>
              <option value="ATM Fraud">ATM Fraud</option>
              <option value="Net Banking">Net Banking</option>
              <option value="Mobile Banking">Mobile Banking</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Status
            </label>
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="under_investigation">Under Investigation</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          {/* Quick Actions */}
          <div className="pt-3 border-t">
            <label className="text-sm font-medium text-gray-700 mb-3 block">Quick Actions</label>
            <div className="space-y-2">
              <button className="w-full px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-medium transition-all flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export Filtered Data
              </button>
              <button className="w-full px-3 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg text-xs font-medium transition-all flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Bulk Upload CSV
              </button>
            </div>
          </div>
        </div>

        {/* Complaints List */}
        <div className={showDetailsPanel ? 'col-span-6' : 'col-span-10'}>
          <div className="bg-gradient-to-br from-gray-50 to-white h-full overflow-y-auto p-8">
            <div className="mb-6 flex items-center justify-between bg-white p-5 rounded-xl shadow-md border-l-4 border-blue-600">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                <FileText className="w-6 h-6 text-blue-600" />
                Cybercrime Complaints ({filteredComplaints.length})
              </h2>
              <div className="flex items-center gap-3 text-sm text-gray-700 bg-green-50 px-4 py-2 rounded-lg border border-green-200">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <Clock className="w-4 h-4" />
                <span className="font-medium">Live Feed</span>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="text-gray-600 mt-4">Loading complaints...</p>
              </div>
            ) : filteredComplaints.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-md">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">No complaints found</p>
                <p className="text-gray-500 text-sm mt-2">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="space-y-5">
                {filteredComplaints.map((complaint) => (
                  <div
                    key={complaint._id}
                    onClick={() => {
                      setSelectedComplaint(complaint);
                      setShowDetailsPanel(true);
                    }}
                    className={`bg-white p-6 rounded-xl border-2 hover:shadow-2xl transition-all cursor-pointer ${
                      selectedComplaint?._id === complaint._id ? 'border-blue-600 shadow-2xl ring-4 ring-blue-200' : 'border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`p-3 rounded-xl ${getPriorityColor(complaint.priority)} border-2`}>
                          <AlertCircle className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-bold text-lg text-gray-900">{complaint.complaintId}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getPriorityColor(complaint.priority)}`}>
                              {complaint.priority}
                            </span>
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                              {complaint.category}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{complaint.description}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-600">
                            <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                              <User className="w-3 h-3" />
                              {complaint.complainantName}
                            </span>
                            <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                              <Phone className="w-3 h-3" />
                              {complaint.complainantPhone}
                            </span>
                            <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                              <MapPin className="w-3 h-3" />
                              {complaint.location.district}, {complaint.location.state}
                            </span>
                            <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                              <Calendar className="w-3 h-3" />
                              {formatDate(complaint.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(complaint.status)}`}>
                        {getStatusIcon(complaint.status)}
                        {complaint.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t">
                      <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                        <span className="text-xs text-gray-700">Transaction Amount</span>
                        <p className="font-bold text-red-700 text-sm mt-1">{formatCurrency(complaint.transactionDetails.amount)}</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                        <span className="text-xs text-gray-700">Bank</span>
                        <p className="font-bold text-blue-700 text-sm mt-1">{complaint.transactionDetails.bankName}</p>
                      </div>
                      {complaint.aiEnrichment && (
                        <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                          <span className="text-xs text-gray-700">AI Risk Score</span>
                          <p className="font-bold text-green-700 text-sm mt-1">{complaint.aiEnrichment.riskScore}%</p>
                        </div>
                      )}
                    </div>

                    {complaint.aiEnrichment?.predictedWithdrawalLocation && (
                      <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-yellow-700" />
                          <span className="font-medium text-yellow-900">Predicted Withdrawal:</span>
                          <span className="text-yellow-700">{complaint.aiEnrichment.predictedWithdrawalLocation}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Details Panel */}
        {showDetailsPanel && selectedComplaint && (
          <div className="col-span-4 bg-gradient-to-br from-white to-gray-50 shadow-2xl overflow-y-auto border-l-4 border-blue-600">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 border-b-4 border-blue-800 p-5 flex items-center justify-between z-10 shadow-lg">
              <div>
                <h3 className="font-bold text-white text-lg">Complaint Details</h3>
                <p className="text-blue-100 text-xs mt-1">{selectedComplaint.complaintId}</p>
              </div>
              <button
                onClick={() => setShowDetailsPanel(false)}
                className="p-2 hover:bg-blue-500 rounded-lg transition-all"
              >
                <span className="text-white text-2xl">&times;</span>
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Complainant Info */}
              <div className="bg-white p-5 rounded-xl border-2 border-gray-200 shadow-md">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Complainant Information
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium text-gray-900">{selectedComplaint.complainantName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium text-gray-900">{selectedComplaint.complainantPhone}</span>
                  </div>
                  {selectedComplaint.complainantEmail && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium text-gray-900 text-xs">{selectedComplaint.complainantEmail}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium text-gray-900">
                      {selectedComplaint.location.district}, {selectedComplaint.location.state}
                    </span>
                  </div>
                </div>
              </div>

              {/* Transaction Details */}
              <div className="bg-white p-5 rounded-xl border-2 border-gray-200 shadow-md">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  Transaction Details
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-bold text-red-700 text-lg">
                      {formatCurrency(selectedComplaint.transactionDetails.amount)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium text-gray-900">
                      {formatDate(selectedComplaint.transactionDetails.date)}
                    </span>
                  </div>
                  {selectedComplaint.transactionDetails.transactionId && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Transaction ID:</span>
                      <span className="font-medium text-gray-900 text-xs">
                        {selectedComplaint.transactionDetails.transactionId}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bank:</span>
                    <span className="font-medium text-gray-900">
                      {selectedComplaint.transactionDetails.bankName}
                    </span>
                  </div>
                  {selectedComplaint.transactionDetails.accountNumber && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Account:</span>
                      <span className="font-medium text-gray-900">
                        {selectedComplaint.transactionDetails.accountNumber}
                      </span>
                    </div>
                  )}
                  {selectedComplaint.transactionDetails.upiId && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">UPI ID:</span>
                      <span className="font-medium text-gray-900 text-xs">
                        {selectedComplaint.transactionDetails.upiId}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* AI Enrichment */}
              {selectedComplaint.aiEnrichment && (
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-xl border-2 border-purple-300 shadow-md">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                    AI-Powered Enrichment
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded-lg">
                      <span className="text-sm text-gray-600">Risk Score:</span>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${selectedComplaint.aiEnrichment.riskScore >= 80 ? 'bg-red-500' : selectedComplaint.aiEnrichment.riskScore >= 60 ? 'bg-yellow-500' : 'bg-green-500'}`}
                            style={{ width: `${selectedComplaint.aiEnrichment.riskScore}%` }}
                          ></div>
                        </div>
                        <span className="font-bold text-gray-900">{selectedComplaint.aiEnrichment.riskScore}%</span>
                      </div>
                    </div>
                    
                    {selectedComplaint.aiEnrichment.predictedWithdrawalLocation && (
                      <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-300">
                        <span className="text-sm font-medium text-yellow-900">Predicted Withdrawal:</span>
                        <p className="text-sm text-yellow-700 mt-1 font-semibold">
                          {selectedComplaint.aiEnrichment.predictedWithdrawalLocation}
                        </p>
                      </div>
                    )}

                    {selectedComplaint.aiEnrichment.linkedComplaints.length > 0 && (
                      <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                        <span className="text-sm font-medium text-blue-900">Linked Complaints:</span>
                        <div className="mt-2 space-y-1">
                          {selectedComplaint.aiEnrichment.linkedComplaints.map((id, idx) => (
                            <div key={idx} className="text-xs bg-white px-2 py-1 rounded font-mono text-blue-700">
                              {id}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedComplaint.aiEnrichment.suspiciousPatterns.length > 0 && (
                      <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                        <span className="text-sm font-medium text-red-900">Suspicious Patterns:</span>
                        <ul className="mt-2 space-y-1 text-xs text-red-700">
                          {selectedComplaint.aiEnrichment.suspiciousPatterns.map((pattern, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-red-500">•</span>
                              <span>{pattern}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Suspect Details */}
              {selectedComplaint.suspectDetails && (
                <div className="bg-white p-5 rounded-xl border-2 border-gray-200 shadow-md">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    Suspect Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    {selectedComplaint.suspectDetails.name && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span className="font-medium text-gray-900">{selectedComplaint.suspectDetails.name}</span>
                      </div>
                    )}
                    {selectedComplaint.suspectDetails.phone && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phone:</span>
                        <span className="font-medium text-gray-900">{selectedComplaint.suspectDetails.phone}</span>
                      </div>
                    )}
                    {selectedComplaint.suspectDetails.upiId && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">UPI ID:</span>
                        <span className="font-medium text-gray-900 text-xs">{selectedComplaint.suspectDetails.upiId}</span>
                      </div>
                    )}
                    {selectedComplaint.suspectDetails.accountNumber && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Account:</span>
                        <span className="font-medium text-gray-900">{selectedComplaint.suspectDetails.accountNumber}</span>
                      </div>
                    )}
                    {selectedComplaint.suspectDetails.bankName && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bank:</span>
                        <span className="font-medium text-gray-900">{selectedComplaint.suspectDetails.bankName}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="bg-white p-5 rounded-xl border-2 border-gray-200 shadow-md">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Complaint Description
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed">{selectedComplaint.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
