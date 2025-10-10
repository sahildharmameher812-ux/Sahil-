import { useState } from 'react';
import { BarChart3, TrendingUp, Target, Clock, DollarSign, Shield, Download, Calendar, Filter, CheckCircle, AlertCircle, Users, Building2, MapPin, Zap, Activity, FileText, PieChart, LineChart } from 'lucide-react';

type ReportPeriod = 'today' | 'week' | 'month' | 'quarter' | 'year';
type ReportCategory = 'sla' | 'recovery' | 'accuracy' | 'intervention' | 'geographic' | 'bank_performance';

interface PerformanceMetric {
  label: string;
  value: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
}

interface SLAReport {
  category: string;
  level: 'Level-5' | 'Level-4' | 'Level-3' | 'Level-2' | 'Level-1';
  targetResponseTime: number; // minutes
  actualAvgResponseTime: number;
  totalAlerts: number;
  metSLA: number;
  missedSLA: number;
  slaComplianceRate: number;
}

interface RecoveryData {
  period: string;
  totalCases: number;
  fundsAtRisk: number;
  fundsBlocked: number;
  fundsRecovered: number;
  blockingRate: number;
  recoveryRate: number;
}

interface AccuracyData {
  modelName: string;
  totalPredictions: number;
  correctPredictions: number;
  falsePositives: number;
  falseNegatives: number;
  accuracy: number;
  precision: number;
  recall: number;
}

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState<ReportPeriod>('month');
  const [selectedCategory, setSelectedCategory] = useState<ReportCategory>('sla');

  // Performance Metrics
  const performanceMetrics: PerformanceMetric[] = [
    {
      label: 'Avg Response Time',
      value: 18,
      target: 20,
      unit: 'minutes',
      trend: 'down',
      changePercent: -12.5
    },
    {
      label: 'Fund Recovery Rate',
      value: 76.8,
      target: 70,
      unit: '%',
      trend: 'up',
      changePercent: 8.3
    },
    {
      label: 'ML Model Accuracy',
      value: 91.0,
      target: 85,
      unit: '%',
      trend: 'up',
      changePercent: 3.4
    },
    {
      label: 'Intervention Success',
      value: 88.5,
      target: 80,
      unit: '%',
      trend: 'up',
      changePercent: 5.2
    }
  ];

  // SLA Reports
  const slaReports: SLAReport[] = [
    {
      category: 'Critical Threats',
      level: 'Level-5',
      targetResponseTime: 5,
      actualAvgResponseTime: 4.2,
      totalAlerts: 156,
      metSLA: 148,
      missedSLA: 8,
      slaComplianceRate: 94.9
    },
    {
      category: 'High Priority',
      level: 'Level-4',
      targetResponseTime: 15,
      actualAvgResponseTime: 12.8,
      totalAlerts: 287,
      metSLA: 271,
      missedSLA: 16,
      slaComplianceRate: 94.4
    },
    {
      category: 'Medium Priority',
      level: 'Level-3',
      targetResponseTime: 30,
      actualAvgResponseTime: 24.5,
      totalAlerts: 421,
      metSLA: 398,
      missedSLA: 23,
      slaComplianceRate: 94.5
    },
    {
      category: 'Low Priority',
      level: 'Level-2',
      targetResponseTime: 120,
      actualAvgResponseTime: 95.3,
      totalAlerts: 198,
      metSLA: 189,
      missedSLA: 9,
      slaComplianceRate: 95.5
    },
    {
      category: 'Routine Monitoring',
      level: 'Level-1',
      targetResponseTime: 240,
      actualAvgResponseTime: 180.2,
      totalAlerts: 124,
      metSLA: 121,
      missedSLA: 3,
      slaComplianceRate: 97.6
    }
  ];

  // Recovery Data
  const recoveryData: RecoveryData[] = [
    {
      period: 'Week 1',
      totalCases: 287,
      fundsAtRisk: 58500000,
      fundsBlocked: 47200000,
      fundsRecovered: 42800000,
      blockingRate: 80.7,
      recoveryRate: 73.2
    },
    {
      period: 'Week 2',
      totalCases: 312,
      fundsAtRisk: 64200000,
      fundsBlocked: 51800000,
      fundsRecovered: 48200000,
      blockingRate: 80.7,
      recoveryRate: 75.1
    },
    {
      period: 'Week 3',
      totalCases: 298,
      fundsAtRisk: 61200000,
      fundsBlocked: 49500000,
      fundsRecovered: 46800000,
      blockingRate: 80.9,
      recoveryRate: 76.5
    },
    {
      period: 'Week 4',
      totalCases: 321,
      fundsAtRisk: 67800000,
      fundsBlocked: 55200000,
      fundsRecovered: 52500000,
      blockingRate: 81.4,
      recoveryRate: 77.4
    }
  ];

  // ML Model Accuracy
  const accuracyData: AccuracyData[] = [
    {
      modelName: 'ATM Withdrawal Predictor',
      totalPredictions: 1847,
      correctPredictions: 1706,
      falsePositives: 98,
      falseNegatives: 43,
      accuracy: 92.4,
      precision: 89.7,
      recall: 94.6
    },
    {
      modelName: 'Pattern Detection Engine',
      totalPredictions: 1234,
      correctPredictions: 1081,
      falsePositives: 112,
      falseNegatives: 41,
      accuracy: 87.6,
      precision: 85.3,
      recall: 89.8
    },
    {
      modelName: 'Risk Scoring Model',
      totalPredictions: 8247,
      correctPredictions: 7818,
      falsePositives: 287,
      falseNegatives: 142,
      accuracy: 94.8,
      precision: 93.2,
      recall: 96.1
    },
    {
      modelName: 'Geospatial Analyzer',
      totalPredictions: 542,
      correctPredictions: 484,
      falsePositives: 38,
      falseNegatives: 20,
      accuracy: 89.3,
      precision: 87.9,
      recall: 90.5
    }
  ];

  // Geographic Distribution
  const geographicData = [
    { state: 'Maharashtra', cases: 1847, blocked: 1498, recovered: 1312, rate: 71.0 },
    { state: 'Delhi', cases: 1523, blocked: 1247, recovered: 1089, rate: 71.5 },
    { state: 'Karnataka', cases: 1298, blocked: 1068, recovered: 945, rate: 72.8 },
    { state: 'Tamil Nadu', cases: 987, blocked: 812, recovered: 723, rate: 73.2 },
    { state: 'Telangana', cases: 856, blocked: 701, recovered: 628, rate: 73.4 },
    { state: 'West Bengal', cases: 743, blocked: 598, recovered: 521, rate: 70.1 },
    { state: 'Gujarat', cases: 621, blocked: 512, recovered: 458, rate: 73.7 },
    { state: 'Uttar Pradesh', cases: 589, blocked: 467, recovered: 401, rate: 68.1 }
  ];

  // Bank Performance
  const bankPerformance = [
    { bank: 'SBI', alerts: 456, responded: 442, blocked: 398, avgTime: 14, successRate: 87.3 },
    { bank: 'HDFC', alerts: 387, responded: 379, blocked: 347, avgTime: 11, successRate: 89.7 },
    { bank: 'ICICI', alerts: 342, responded: 336, blocked: 301, avgTime: 9, successRate: 88.0 },
    { bank: 'Axis', alerts: 298, responded: 287, blocked: 253, avgTime: 16, successRate: 84.9 },
    { bank: 'PNB', alerts: 267, responded: 259, blocked: 231, avgTime: 13, successRate: 86.5 }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getSLAColor = (rate: number) => {
    if (rate >= 95) return 'text-green-700';
    if (rate >= 90) return 'text-blue-700';
    if (rate >= 85) return 'text-yellow-700';
    return 'text-red-700';
  };

  const totalMetrics = {
    totalAlerts: slaReports.reduce((sum, r) => sum + r.totalAlerts, 0),
    avgSLACompliance: (slaReports.reduce((sum, r) => sum + r.slaComplianceRate, 0) / slaReports.length).toFixed(1),
    totalFundsAtRisk: recoveryData.reduce((sum, r) => sum + r.fundsAtRisk, 0),
    totalFundsRecovered: recoveryData.reduce((sum, r) => sum + r.fundsRecovered, 0),
    avgRecoveryRate: (recoveryData.reduce((sum, r) => sum + r.recoveryRate, 0) / recoveryData.length).toFixed(1)
  };

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-xl p-8 border-b-4 border-blue-600">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-4">
              <div className="relative">
                <BarChart3 className="w-10 h-10 text-blue-600" />
                <Activity className="w-4 h-4 text-blue-600 absolute -top-1 -right-1" />
              </div>
              Reports & Analytics Dashboard
            </h1>
            <p className="text-base text-gray-700 mt-2 font-medium">
              SLA Reports | Recovery Rates | Alert Accuracy | Performance Metrics | Exportable Charts
            </p>
          </div>
          <div className="flex gap-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value as ReportPeriod)}
              className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-medium"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
            <button className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 shadow-lg transition-all hover:shadow-xl font-medium">
              <Download className="w-5 h-5" />
              Export All Reports
            </button>
          </div>
        </div>

        {/* Performance Metrics Cards */}
        <div className="grid grid-cols-4 gap-5">
          {performanceMetrics.map((metric, idx) => (
            <div key={idx} className="bg-gradient-to-br from-white to-gray-50 p-5 rounded-xl border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm text-gray-600 font-medium">{metric.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    {metric.value}
                    <span className="text-lg text-gray-600 ml-1">{metric.unit}</span>
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${
                  metric.trend === 'up' ? 'bg-green-100' : 
                  metric.trend === 'down' ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <TrendingUp className={`w-6 h-6 ${
                    metric.trend === 'up' ? 'text-green-600' : 
                    metric.trend === 'down' ? 'text-blue-600' : 'text-gray-600'
                  }`} />
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Target: {metric.target}{metric.unit}</span>
                <span className={`font-bold ${
                  metric.trend === 'up' ? 'text-green-600' : 
                  metric.trend === 'down' ? 'text-blue-600' : 'text-gray-600'
                }`}>
                  {metric.changePercent > 0 ? '+' : ''}{metric.changePercent}%
                </span>
              </div>
              <div className="mt-2 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${
                    metric.value >= metric.target ? 'bg-green-500' : 'bg-yellow-500'
                  }`}
                  style={{ width: `${Math.min((metric.value / metric.target) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-white shadow-md p-6 border-b-2 border-gray-200">
        <div className="flex items-center gap-3">
          <Filter className="w-5 h-5 text-gray-600" />
          <span className="font-semibold text-gray-700">Report Categories:</span>
          <div className="flex gap-2 flex-1">
            {[
              { id: 'sla', label: 'SLA Performance', icon: Clock },
              { id: 'recovery', label: 'Fund Recovery', icon: DollarSign },
              { id: 'accuracy', label: 'ML Accuracy', icon: Target },
              { id: 'intervention', label: 'Interventions', icon: Shield },
              { id: 'geographic', label: 'Geographic', icon: MapPin },
              { id: 'bank_performance', label: 'Banks', icon: Building2 }
            ].map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as ReportCategory)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
                    selectedCategory === cat.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8 space-y-8">
        {/* SLA Performance Report */}
        {selectedCategory === 'sla' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <Clock className="w-7 h-7 text-blue-600" />
                  SLA Performance Report
                </h2>
                <div className="flex items-center gap-6 text-sm">
                  <div>
                    <span className="text-gray-600">Total Alerts: </span>
                    <span className="font-bold text-gray-900">{totalMetrics.totalAlerts}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Avg SLA Compliance: </span>
                    <span className="font-bold text-green-700">{totalMetrics.avgSLACompliance}%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {slaReports.map((report, idx) => (
                  <div key={idx} className="bg-gradient-to-r from-gray-50 to-white p-5 rounded-lg border-2 border-gray-200 hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                          report.level === 'Level-5' ? 'bg-red-100 text-red-700' :
                          report.level === 'Level-4' ? 'bg-orange-100 text-orange-700' :
                          report.level === 'Level-3' ? 'bg-yellow-100 text-yellow-700' :
                          report.level === 'Level-2' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {report.level}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{report.category}</h3>
                          <p className="text-sm text-gray-600">Target: {report.targetResponseTime} min | Actual: {report.actualAvgResponseTime} min</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-2xl font-bold ${getSLAColor(report.slaComplianceRate)}`}>
                          {report.slaComplianceRate}%
                        </p>
                        <p className="text-xs text-gray-600">SLA Compliance</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div className="bg-blue-50 p-3 rounded">
                        <p className="text-gray-600">Total Alerts</p>
                        <p className="font-bold text-blue-700 text-lg">{report.totalAlerts}</p>
                      </div>
                      <div className="bg-green-50 p-3 rounded">
                        <p className="text-gray-600">Met SLA</p>
                        <p className="font-bold text-green-700 text-lg">{report.metSLA}</p>
                      </div>
                      <div className="bg-red-50 p-3 rounded">
                        <p className="text-gray-600">Missed SLA</p>
                        <p className="font-bold text-red-700 text-lg">{report.missedSLA}</p>
                      </div>
                      <div className="bg-purple-50 p-3 rounded">
                        <p className="text-gray-600">Avg Response</p>
                        <p className="font-bold text-purple-700 text-lg">{report.actualAvgResponseTime}m</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${report.slaComplianceRate >= 95 ? 'bg-green-500' : report.slaComplianceRate >= 90 ? 'bg-blue-500' : 'bg-yellow-500'}`}
                          style={{ width: `${report.slaComplianceRate}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Fund Recovery Report */}
        {selectedCategory === 'recovery' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <DollarSign className="w-7 h-7 text-green-600" />
                  Fund Recovery Analysis
                </h2>
                <div className="flex items-center gap-6 text-sm">
                  <div>
                    <span className="text-gray-600">Total at Risk: </span>
                    <span className="font-bold text-red-700">{formatCurrency(totalMetrics.totalFundsAtRisk)}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Total Recovered: </span>
                    <span className="font-bold text-green-700">{formatCurrency(totalMetrics.totalFundsRecovered)}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Avg Recovery Rate: </span>
                    <span className="font-bold text-blue-700">{totalMetrics.avgRecoveryRate}%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {recoveryData.map((data, idx) => (
                  <div key={idx} className="bg-gradient-to-r from-green-50 to-white p-5 rounded-lg border-2 border-gray-200 hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">{data.period}</h3>
                        <p className="text-sm text-gray-600">{data.totalCases} cases processed</p>
                      </div>
                      <div className="flex gap-4">
                        <div className="text-right">
                          <p className="text-xs text-gray-600">Blocking Rate</p>
                          <p className="text-xl font-bold text-purple-700">{data.blockingRate}%</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-600">Recovery Rate</p>
                          <p className="text-xl font-bold text-green-700">{data.recoveryRate}%</p>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="bg-red-50 p-4 rounded-lg">
                        <p className="text-gray-600 mb-1">Funds at Risk</p>
                        <p className="font-bold text-red-700 text-lg">{formatCurrency(data.fundsAtRisk)}</p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <p className="text-gray-600 mb-1">Funds Blocked</p>
                        <p className="font-bold text-purple-700 text-lg">{formatCurrency(data.fundsBlocked)}</p>
                        <div className="mt-2 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500" style={{ width: `${data.blockingRate}%` }}></div>
                        </div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-gray-600 mb-1">Funds Recovered</p>
                        <p className="font-bold text-green-700 text-lg">{formatCurrency(data.fundsRecovered)}</p>
                        <div className="mt-2 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500" style={{ width: `${data.recoveryRate}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ML Accuracy Report */}
        {selectedCategory === 'accuracy' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <Target className="w-7 h-7 text-purple-600" />
                  ML Model Accuracy Report
                </h2>
              </div>

              <div className="space-y-4">
                {accuracyData.map((model, idx) => (
                  <div key={idx} className="bg-gradient-to-r from-purple-50 to-white p-5 rounded-lg border-2 border-gray-200 hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">{model.modelName}</h3>
                        <p className="text-sm text-gray-600">{model.totalPredictions} total predictions</p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-purple-700">{model.accuracy}%</p>
                        <p className="text-xs text-gray-600">Overall Accuracy</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 gap-3 text-sm">
                      <div className="bg-green-50 p-3 rounded text-center">
                        <p className="text-gray-600 text-xs">Correct</p>
                        <p className="font-bold text-green-700 text-lg">{model.correctPredictions}</p>
                      </div>
                      <div className="bg-red-50 p-3 rounded text-center">
                        <p className="text-gray-600 text-xs">False +</p>
                        <p className="font-bold text-red-700 text-lg">{model.falsePositives}</p>
                      </div>
                      <div className="bg-orange-50 p-3 rounded text-center">
                        <p className="text-gray-600 text-xs">False -</p>
                        <p className="font-bold text-orange-700 text-lg">{model.falseNegatives}</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded text-center">
                        <p className="text-gray-600 text-xs">Precision</p>
                        <p className="font-bold text-blue-700 text-lg">{model.precision}%</p>
                      </div>
                      <div className="bg-indigo-50 p-3 rounded text-center">
                        <p className="text-gray-600 text-xs">Recall</p>
                        <p className="font-bold text-indigo-700 text-lg">{model.recall}%</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-purple-500 to-purple-600" style={{ width: `${model.accuracy}%` }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Geographic Distribution */}
        {selectedCategory === 'geographic' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <MapPin className="w-7 h-7 text-red-600" />
                  State-wise Performance Analysis
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {geographicData.map((state, idx) => (
                  <div key={idx} className="bg-gradient-to-r from-blue-50 to-white p-5 rounded-lg border-2 border-gray-200 hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-gray-900 text-lg">{state.state}</h3>
                      <span className="text-xl font-bold text-green-700">{state.rate}%</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="bg-blue-50 p-2 rounded text-center">
                        <p className="text-gray-600">Cases</p>
                        <p className="font-bold text-blue-700">{state.cases}</p>
                      </div>
                      <div className="bg-purple-50 p-2 rounded text-center">
                        <p className="text-gray-600">Blocked</p>
                        <p className="font-bold text-purple-700">{state.blocked}</p>
                      </div>
                      <div className="bg-green-50 p-2 rounded text-center">
                        <p className="text-gray-600">Recovered</p>
                        <p className="font-bold text-green-700">{state.recovered}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: `${state.rate}%` }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Bank Performance */}
        {selectedCategory === 'bank_performance' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <Building2 className="w-7 h-7 text-green-600" />
                  Bank Response Performance
                </h2>
              </div>

              <div className="space-y-4">
                {bankPerformance.map((bank, idx) => (
                  <div key={idx} className="bg-gradient-to-r from-green-50 to-white p-5 rounded-lg border-2 border-gray-200 hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">{bank.bank}</h3>
                        <p className="text-sm text-gray-600">{bank.alerts} alerts received</p>
                      </div>
                      <div className="flex gap-4">
                        <div className="text-right">
                          <p className="text-xs text-gray-600">Success Rate</p>
                          <p className="text-2xl font-bold text-green-700">{bank.successRate}%</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-600">Avg Response</p>
                          <p className="text-2xl font-bold text-blue-700">{bank.avgTime}m</p>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="bg-blue-50 p-3 rounded">
                        <p className="text-gray-600">Responded</p>
                        <p className="font-bold text-blue-700 text-lg">{bank.responded}/{bank.alerts}</p>
                        <div className="mt-2 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500" style={{ width: `${(bank.responded/bank.alerts)*100}%` }}></div>
                        </div>
                      </div>
                      <div className="bg-purple-50 p-3 rounded">
                        <p className="text-gray-600">Blocked</p>
                        <p className="font-bold text-purple-700 text-lg">{bank.blocked}/{bank.alerts}</p>
                        <div className="mt-2 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500" style={{ width: `${(bank.blocked/bank.alerts)*100}%` }}></div>
                        </div>
                      </div>
                      <div className="bg-green-50 p-3 rounded">
                        <p className="text-gray-600">Success Rate</p>
                        <p className="font-bold text-green-700 text-lg">{bank.successRate}%</p>
                        <div className="mt-2 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500" style={{ width: `${bank.successRate}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Export Options */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <h3 className="text-xl font-bold mb-2">Export Reports</h3>
              <p className="text-blue-100">Download comprehensive reports in multiple formats</p>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 font-bold shadow-lg transition-all flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Export PDF
              </button>
              <button className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 font-bold shadow-lg transition-all flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Export Excel
              </button>
              <button className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 font-bold shadow-lg transition-all flex items-center gap-2">
                <Download className="w-5 h-5" />
                Export CSV
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
