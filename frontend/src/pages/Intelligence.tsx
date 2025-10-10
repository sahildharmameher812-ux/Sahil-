import { useState } from 'react';
import { FileText, Download, Eye, Share2, MapPin, TrendingUp, AlertCircle, Shield, Users, Building, Clock, Filter, Search, Plus, ChevronRight, Mail, MessageSquare, Bell, Target, BarChart3, Calendar } from 'lucide-react';

type ReportType = 'hotspot_prediction' | 'pattern_analysis' | 'threat_intelligence' | 'recovery_report' | 'coordination_brief';
type ReportStatus = 'draft' | 'published' | 'shared' | 'archived';

interface IntelligenceReport {
  id: string;
  reportId: string;
  title: string;
  type: ReportType;
  description: string;
  status: ReportStatus;
  priority: 'low' | 'medium' | 'high' | 'critical';
  generatedBy: string;
  generatedAt: Date;
  targetAudience: string[];
  keyFindings: string[];
  recommendations: string[];
  affectedLocations: string[];
  linkedCases: string[];
  predictedHotspots: Array<{
    location: string;
    riskScore: number;
    predictedAmount: number;
    confidence: number;
  }>;
  sharedWith: Array<{
    organization: string;
    timestamp: Date;
  }>;
}

export default function Intelligence() {
  const [reports, setReports] = useState<IntelligenceReport[]>([
    {
      id: '1',
      reportId: 'INTEL-2025-001',
      title: 'Mumbai-Delhi Corridor: High-Risk ATM Withdrawal Predictions',
      type: 'hotspot_prediction',
      description: 'AI-generated intelligence report identifying 12 high-risk ATM locations across Mumbai-Delhi corridor with predicted fraudulent withdrawal attempts in next 24-48 hours.',
      status: 'published',
      priority: 'critical',
      generatedBy: 'Predictive Analytics Engine',
      generatedAt: new Date('2025-01-07T08:00:00'),
      targetAudience: ['Mumbai Cyber Cell', 'Delhi Police', 'I4C Coordination', 'SBI Regional Security', 'HDFC Fraud Prevention'],
      keyFindings: [
        '15 linked UPI fraud complaints showing coordinated mule account behavior',
        'Transaction pattern analysis reveals withdrawal window: 6 PM - 10 PM',
        'Suspect accounts linked to Punjab National Bank and SBI branches',
        'Geospatial clustering indicates Andheri East and Connaught Place as primary targets'
      ],
      recommendations: [
        'Deploy special intervention teams to identified ATM locations',
        'Alert bank security teams for enhanced surveillance during predicted time window',
        'Coordinate with local police stations for rapid response capability',
        'Implement temporary fund-freeze protocols for flagged accounts',
        'Share intelligence with neighboring jurisdictions for coordinated action'
      ],
      affectedLocations: ['Mumbai - Andheri East', 'Delhi - Connaught Place', 'Mumbai - Bandra West', 'Delhi - Dwarka'],
      linkedCases: ['CASE-2025-001', 'CASE-2025-002'],
      predictedHotspots: [
        { location: 'Mumbai - Andheri East, SBI ATM', riskScore: 94, predictedAmount: 245000, confidence: 94 },
        { location: 'Delhi - Connaught Place, HDFC ATM', riskScore: 89, predictedAmount: 185000, confidence: 89 }
      ],
      sharedWith: [
        { organization: 'Mumbai Cyber Cell', timestamp: new Date('2025-01-07T08:30:00') },
        { organization: 'I4C National Coordination', timestamp: new Date('2025-01-07T08:35:00') },
        { organization: 'State Bank of India - Security', timestamp: new Date('2025-01-07T08:40:00') }
      ]
    },
    {
      id: '2',
      reportId: 'INTEL-2025-002',
      title: 'Card Cloning Network: Bangalore-Hyderabad Fraud Ring Analysis',
      type: 'pattern_analysis',
      description: 'Comprehensive analysis of organized card cloning operation spanning Bangalore and Hyderabad, with identified ATM compromise patterns and suspect network mapping.',
      status: 'published',
      priority: 'high',
      generatedBy: 'Pattern Detection System',
      generatedAt: new Date('2025-01-06T14:00:00'),
      targetAudience: ['Karnataka Cyber Crime', 'Telangana Cyber Security', 'ICICI Bank', 'Axis Bank'],
      keyFindings: [
        'Card skimming devices detected at 8 ATM locations in Bangalore',
        '23 complaints showing similar modus operandi and timing patterns',
        'Cross-state coordination between fraud operators identified',
        'Total estimated loss: ₹12.5 lakhs across 45 victims'
      ],
      recommendations: [
        'Conduct physical inspection of all flagged ATM locations',
        'Deploy anti-skimming technology at high-risk ATMs',
        'Coordinate inter-state task force for suspect apprehension',
        'Issue public awareness advisory about card security'
      ],
      affectedLocations: ['Bangalore - MG Road', 'Bangalore - Koramangala', 'Hyderabad - Banjara Hills', 'Hyderabad - Gachibowli'],
      linkedCases: ['CASE-2025-003'],
      predictedHotspots: [
        { location: 'Bangalore - MG Road, ICICI ATM', riskScore: 78, predictedAmount: 95000, confidence: 78 },
        { location: 'Hyderabad - Banjara Hills, Axis ATM', riskScore: 82, predictedAmount: 120000, confidence: 82 }
      ],
      sharedWith: [
        { organization: 'Karnataka Cyber Crime', timestamp: new Date('2025-01-06T14:30:00') },
        { organization: 'Telangana Police', timestamp: new Date('2025-01-06T14:35:00') }
      ]
    },
    {
      id: '3',
      reportId: 'INTEL-2025-003',
      title: 'Weekly Threat Intelligence: UPI Fraud Trends & Emerging Patterns',
      type: 'threat_intelligence',
      description: 'Weekly consolidated threat intelligence covering emerging UPI fraud tactics, new phishing campaigns, and evolving mule account strategies observed across India.',
      status: 'shared',
      priority: 'medium',
      generatedBy: 'Threat Intelligence Team',
      generatedAt: new Date('2025-01-05T10:00:00'),
      targetAudience: ['All State Cyber Cells', 'I4C', 'NPCI', 'Major Banks'],
      keyFindings: [
        '34% increase in fake payment link scams targeting UPI users',
        'New social engineering tactic: Impersonating bank customer care',
        '128 new mule accounts identified this week across 6 states',
        'Average fraud amount per incident: ₹45,000'
      ],
      recommendations: [
        'Launch targeted awareness campaign on UPI safety',
        'Banks to implement additional verification for high-value UPI transactions',
        'Monitor and freeze identified mule accounts proactively',
        'Coordinate with telecom providers to block fraudulent SMS sources'
      ],
      affectedLocations: ['Pan India'],
      linkedCases: ['CASE-2025-001', 'CASE-2025-002', 'CASE-2025-004'],
      predictedHotspots: [],
      sharedWith: [
        { organization: 'All State Cyber Cells', timestamp: new Date('2025-01-05T11:00:00') },
        { organization: 'I4C National', timestamp: new Date('2025-01-05T11:05:00') },
        { organization: 'NPCI', timestamp: new Date('2025-01-05T11:10:00') }
      ]
    },
    {
      id: '4',
      reportId: 'INTEL-2025-004',
      title: 'Fund Recovery Success Report: Chennai-Pune Intervention Operations',
      type: 'recovery_report',
      description: 'Detailed report on successful proactive intervention leading to fund recovery and suspect apprehension in Chennai and Pune cases.',
      status: 'published',
      priority: 'medium',
      generatedBy: 'Case Management Team',
      generatedAt: new Date('2025-01-07T09:00:00'),
      targetAudience: ['Tamil Nadu Police', 'Maharashtra Police', 'I4C', 'Punjab National Bank'],
      keyFindings: [
        'Predictive alert system enabled intervention before withdrawal attempt',
        '₹1.3 lakhs successfully recovered from frozen accounts',
        '2 suspects detained at ATM locations based on intelligence',
        'Average response time: 18 minutes from alert to intervention'
      ],
      recommendations: [
        'Replicate intervention model in other high-risk jurisdictions',
        'Strengthen real-time coordination protocols between LEAs and banks',
        'Document best practices for rapid response operations',
        'Provide training to local police on predictive intelligence utilization'
      ],
      affectedLocations: ['Chennai - T Nagar', 'Pune - Koregaon Park'],
      linkedCases: ['CASE-2025-005'],
      predictedHotspots: [],
      sharedWith: [
        { organization: 'Tamil Nadu Police', timestamp: new Date('2025-01-07T09:30:00') },
        { organization: 'Maharashtra Police', timestamp: new Date('2025-01-07T09:35:00') }
      ]
    },
    {
      id: '5',
      reportId: 'INTEL-2025-005',
      title: 'I4C Coordination Brief: Cross-Jurisdictional Fraud Network Mapping',
      type: 'coordination_brief',
      description: 'Strategic coordination brief for I4C officers detailing multi-state fraud network operations requiring coordinated law enforcement response.',
      status: 'draft',
      priority: 'high',
      generatedBy: 'I4C Intelligence Division',
      generatedAt: new Date('2025-01-07T11:00:00'),
      targetAudience: ['I4C Officers', 'State Nodal Officers', 'CBI Cyber Crime'],
      keyFindings: [
        'Identified organized fraud network operating across 8 states',
        'Central coordination hub traced to NCR region',
        'Estimated network involvement in ₹5.2 crore fraud cases',
        'International money laundering connections suspected'
      ],
      recommendations: [
        'Form joint task force with representatives from all affected states',
        'Request CBI assistance for inter-state coordination',
        'Coordinate with financial intelligence unit for transaction tracing',
        'Plan synchronized raids across multiple locations'
      ],
      affectedLocations: ['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Jaipur'],
      linkedCases: ['CASE-2025-001', 'CASE-2025-002', 'CASE-2025-003'],
      predictedHotspots: [],
      sharedWith: []
    }
  ]);

  const [selectedReport, setSelectedReport] = useState<IntelligenceReport | null>(null);
  const [showDetailsPanel, setShowDetailsPanel] = useState(false);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredReports = reports.filter(report => {
    if (selectedType !== 'all' && report.type !== selectedType) return false;
    if (selectedStatus !== 'all' && report.status !== selectedStatus) return false;
    if (searchQuery && !report.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !report.reportId.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const getTypeLabel = (type: ReportType) => {
    switch (type) {
      case 'hotspot_prediction': return 'Hotspot Prediction';
      case 'pattern_analysis': return 'Pattern Analysis';
      case 'threat_intelligence': return 'Threat Intelligence';
      case 'recovery_report': return 'Recovery Report';
      case 'coordination_brief': return 'Coordination Brief';
      default: return type;
    }
  };

  const getTypeColor = (type: ReportType) => {
    switch (type) {
      case 'hotspot_prediction': return 'bg-red-100 text-red-700 border-red-300';
      case 'pattern_analysis': return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'threat_intelligence': return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'recovery_report': return 'bg-green-100 text-green-700 border-green-300';
      case 'coordination_brief': return 'bg-blue-100 text-blue-700 border-blue-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusColor = (status: ReportStatus) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-700';
      case 'published': return 'bg-blue-100 text-blue-700';
      case 'shared': return 'bg-green-100 text-green-700';
      case 'archived': return 'bg-gray-100 text-gray-500';
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

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const stats = {
    totalReports: reports.length,
    published: reports.filter(r => r.status === 'published').length,
    shared: reports.filter(r => r.status === 'shared').length,
    critical: reports.filter(r => r.priority === 'critical').length
  };

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-purple-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-xl p-8 border-b-4 border-purple-600">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-4">
              <div className="relative">
                <Shield className="w-10 h-10 text-purple-600" />
              </div>
              Actionable Intelligence Reports
            </h1>
            <p className="text-base text-gray-700 mt-2 font-medium">
              Real-Time Intelligence Sharing | LEA Coordination | Proactive Intervention Support
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-5 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2 shadow-lg transition-all hover:shadow-xl font-medium">
              <Plus className="w-5 h-5" />
              Generate Report
            </button>
            <button className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 shadow-lg transition-all hover:shadow-xl font-medium">
              <Download className="w-5 h-5" />
              Export All
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-5">
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-xl border-2 border-purple-300 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700 font-bold uppercase tracking-wide">Total Reports</p>
                <p className="text-3xl font-bold text-purple-800 mt-1">{stats.totalReports}</p>
              </div>
              <div className="bg-purple-600 p-3 rounded-lg">
                <FileText className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="mt-3 text-sm text-purple-700 font-medium">Intelligence Database</div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border-2 border-blue-300 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 font-bold uppercase tracking-wide">Published</p>
                <p className="text-3xl font-bold text-blue-800 mt-1">{stats.published}</p>
              </div>
              <div className="bg-blue-600 p-3 rounded-lg">
                <Eye className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="mt-3 text-sm text-blue-700 font-medium">Available to LEAs</div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-xl border-2 border-green-300 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 font-bold uppercase tracking-wide">Shared</p>
                <p className="text-3xl font-bold text-green-800 mt-1">{stats.shared}</p>
              </div>
              <div className="bg-green-600 p-3 rounded-lg">
                <Share2 className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="mt-3 text-sm text-green-700 font-medium">Cross-Jurisdiction</div>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100 p-5 rounded-xl border-2 border-red-300 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-700 font-bold uppercase tracking-wide">Critical</p>
                <p className="text-3xl font-bold text-red-800 mt-1">{stats.critical}</p>
              </div>
              <div className="bg-red-600 p-3 rounded-lg">
                <AlertCircle className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="mt-3 text-sm text-red-700 font-medium">Immediate Action</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-0 min-h-[calc(100vh-340px)]">
        {/* Filters Sidebar */}
        <div className="col-span-2 bg-white shadow-xl p-6 space-y-6 overflow-y-auto border-r-2 border-gray-200">
          <div className="flex items-center gap-2 pb-4 border-b-2 border-gray-300">
            <Filter className="w-6 h-6 text-purple-700" />
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
              placeholder="Report ID or Title"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
            />
          </div>

          {/* Type Filter */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Report Type
            </label>
            <select 
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
            >
              <option value="all">All Types</option>
              <option value="hotspot_prediction">Hotspot Prediction</option>
              <option value="pattern_analysis">Pattern Analysis</option>
              <option value="threat_intelligence">Threat Intelligence</option>
              <option value="recovery_report">Recovery Report</option>
              <option value="coordination_brief">Coordination Brief</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Status
            </label>
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="shared">Shared</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          {/* Quick Actions */}
          <div className="pt-3 border-t">
            <label className="text-sm font-medium text-gray-700 mb-3 block">Distribution</label>
            <div className="space-y-2">
              <button className="w-full px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-medium transition-all flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email to LEAs
              </button>
              <button className="w-full px-3 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg text-xs font-medium transition-all flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                SMS Alert
              </button>
              <button className="w-full px-3 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg text-xs font-medium transition-all flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Push Notification
              </button>
            </div>
          </div>
        </div>

        {/* Reports List */}
        <div className={showDetailsPanel ? 'col-span-6' : 'col-span-10'}>
          <div className="bg-gradient-to-br from-gray-50 to-white h-full overflow-y-auto p-8">
            <div className="mb-6 flex items-center justify-between bg-white p-5 rounded-xl shadow-md border-l-4 border-purple-600">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                <Shield className="w-6 h-6 text-purple-600" />
                Intelligence Reports ({filteredReports.length})
              </h2>
              <div className="flex items-center gap-3 text-sm text-gray-700 bg-green-50 px-4 py-2 rounded-lg border border-green-200">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <Target className="w-4 h-4" />
                <span className="font-medium">Actionable Intel</span>
              </div>
            </div>

            <div className="space-y-5">
              {filteredReports.map((report) => (
                <div
                  key={report.id}
                  onClick={() => {
                    setSelectedReport(report);
                    setShowDetailsPanel(true);
                  }}
                  className={`bg-white p-6 rounded-xl border-2 hover:shadow-2xl transition-all cursor-pointer ${
                    selectedReport?.id === report.id ? 'border-purple-600 shadow-2xl ring-4 ring-purple-200' : 'border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`p-3 rounded-xl ${getTypeColor(report.type)} border-2`}>
                        <Shield className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-lg text-gray-900">{report.reportId}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getPriorityColor(report.priority)}`}>
                            {report.priority}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(report.type)}`}>
                            {getTypeLabel(report.type)}
                          </span>
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">{report.title}</h4>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{report.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-600">
                          <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                            <Users className="w-3 h-3" />
                            {report.targetAudience.length} Recipients
                          </span>
                          <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                            <MapPin className="w-3 h-3" />
                            {report.affectedLocations.length} Locations
                          </span>
                          <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                            <Calendar className="w-3 h-3" />
                            {formatDate(report.generatedAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                      {report.status.toUpperCase()}
                    </span>
                  </div>

                  {report.predictedHotspots.length > 0 && (
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex items-center gap-2 mb-3">
                        <Target className="w-4 h-4 text-red-600" />
                        <span className="text-sm font-bold text-gray-900">Predicted Hotspots:</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {report.predictedHotspots.map((hotspot, idx) => (
                          <div key={idx} className="bg-red-50 p-3 rounded-lg border border-red-200">
                            <div className="flex justify-between items-start mb-2">
                              <span className="text-xs font-medium text-gray-700">{hotspot.location}</span>
                              <span className="text-xs font-bold text-red-700">{hotspot.confidence}%</span>
                            </div>
                            <p className="text-sm font-bold text-red-700">{formatCurrency(hotspot.predictedAmount)}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-gray-600">
                      <span className="flex items-center gap-1">
                        <Share2 className="w-3 h-3" />
                        Shared with {report.sharedWith.length} organizations
                      </span>
                    </div>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-xs font-bold hover:bg-purple-700 transition-all flex items-center gap-1">
                      View Full Report
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Details Panel */}
        {showDetailsPanel && selectedReport && (
          <div className="col-span-4 bg-gradient-to-br from-white to-gray-50 shadow-2xl overflow-y-auto border-l-4 border-purple-600">
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-purple-700 border-b-4 border-purple-800 p-5 flex items-center justify-between z-10 shadow-lg">
              <div>
                <h3 className="font-bold text-white text-lg">Report Details</h3>
                <p className="text-purple-100 text-xs mt-1">{selectedReport.reportId}</p>
              </div>
              <button
                onClick={() => setShowDetailsPanel(false)}
                className="p-2 hover:bg-purple-500 rounded-lg transition-all">
                <span className="text-white text-2xl">&times;</span>
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Report Info */}
              <div className="bg-white p-5 rounded-xl border-2 border-gray-200 shadow-md">
                <h4 className="font-bold text-gray-900 mb-3">{selectedReport.title}</h4>
                <p className="text-sm text-gray-700 leading-relaxed mb-4">{selectedReport.description}</p>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className={`px-2 py-1 rounded ${getTypeColor(selectedReport.type)}`}>
                      {getTypeLabel(selectedReport.type)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Priority:</span>
                    <span className={`px-2 py-1 rounded ${getPriorityColor(selectedReport.priority)}`}>
                      {selectedReport.priority.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Generated By:</span>
                    <span className="font-medium text-gray-900">{selectedReport.generatedBy}</span>
                  </div>
                </div>
              </div>

              {/* Key Findings */}
              <div className="bg-white p-5 rounded-xl border-2 border-gray-200 shadow-md">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  Key Findings
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  {selectedReport.keyFindings.map((finding, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>{finding}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommendations */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-xl border-2 border-green-300 shadow-md">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-600" />
                  Recommendations
                </h4>
                <ul className="space-y-2 text-sm text-gray-800">
                  {selectedReport.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-white p-2 rounded">
                      <span className="text-green-600 font-bold">{idx + 1}.</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Target Audience */}
              <div className="bg-white p-5 rounded-xl border-2 border-gray-200 shadow-md">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  Target Audience
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedReport.targetAudience.map((audience, idx) => (
                    <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                      {audience}
                    </span>
                  ))}
                </div>
              </div>

              {/* Affected Locations */}
              <div className="bg-white p-5 rounded-xl border-2 border-gray-200 shadow-md">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-red-600" />
                  Affected Locations
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedReport.affectedLocations.map((location, idx) => (
                    <span key={idx} className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">
                      {location}
                    </span>
                  ))}
                </div>
              </div>

              {/* Shared With */}
              {selectedReport.sharedWith.length > 0 && (
                <div className="bg-white p-5 rounded-xl border-2 border-gray-200 shadow-md">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Share2 className="w-5 h-5 text-green-600" />
                    Distribution History
                  </h4>
                  <div className="space-y-2">
                    {selectedReport.sharedWith.map((share, idx) => (
                      <div key={idx} className="flex justify-between items-center p-2 bg-gray-50 rounded text-xs">
                        <span className="font-medium text-gray-900">{share.organization}</span>
                        <span className="text-gray-600">{formatDate(share.timestamp)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="space-y-2">
                <button className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-all flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Full Report
                </button>
                <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share with LEAs
                </button>
                <button className="w-full px-4 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all flex items-center justify-center gap-2">
                  <Bell className="w-4 h-4" />
                  Send Alert Notification
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
