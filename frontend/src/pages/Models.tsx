import { useState } from 'react';
import { Brain, TrendingUp, Target, Cpu, BarChart3, Activity, CheckCircle, Play, RefreshCw, Database, Zap, MapPin, AlertCircle, Eye, Settings, GitBranch, Clock, Award } from 'lucide-react';

type ModelType = 'withdrawal_prediction' | 'pattern_detection' | 'risk_scoring' | 'geospatial_analysis';
type ModelStatus = 'training' | 'active' | 'testing' | 'archived';

interface MLModel {
  id: string;
  name: string;
  version: string;
  type: ModelType;
  status: ModelStatus;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  trainingDate: Date;
  lastUpdated: Date;
  trainingDataSize: number;
  features: string[];
  description: string;
  predictions24h: number;
  successRate: number;
  avgConfidence: number;
}

interface PredictionExample {
  id: string;
  input: {
    complaintId: string;
    transactionAmount: number;
    location: string;
    transactionTime: string;
    accountAge: number;
    previousFrauds: number;
  };
  prediction: {
    withdrawalLocation: string;
    probability: number;
    riskScore: number;
    timeWindow: string;
    confidence: number;
  };
  explainability: {
    topFeatures: Array<{ feature: string; importance: number }>;
  };
}

export default function Models() {
  const [models] = useState<MLModel[]>([
    {
      id: '1',
      name: 'ATM Withdrawal Location Predictor',
      version: 'v2.3.1',
      type: 'withdrawal_prediction',
      status: 'active',
      accuracy: 92.4,
      precision: 89.7,
      recall: 94.2,
      f1Score: 91.9,
      trainingDate: new Date('2025-01-01'),
      lastUpdated: new Date('2025-01-07'),
      trainingDataSize: 125000,
      features: [
        'Transaction Amount',
        'Time of Day',
        'Day of Week',
        'Geographic Location',
        'Account Age',
        'Previous Fraud History',
        'Transaction Velocity',
        'Beneficiary Bank',
        'UPI/Card Pattern',
        'Complaint Category'
      ],
      description: 'Deep learning model trained on 125K historical fraud cases to predict likely cash withdrawal locations with 92.4% accuracy. Uses ensemble of LSTM and Random Forest.',
      predictions24h: 847,
      successRate: 88.5,
      avgConfidence: 87.3
    },
    {
      id: '2',
      name: 'Fraud Pattern Detection Engine',
      version: 'v1.8.0',
      type: 'pattern_detection',
      status: 'active',
      accuracy: 87.6,
      precision: 85.3,
      recall: 89.8,
      f1Score: 87.5,
      trainingDate: new Date('2024-12-15'),
      lastUpdated: new Date('2025-01-06'),
      trainingDataSize: 98000,
      features: [
        'Transaction Sequence',
        'Multi-Account Patterns',
        'Temporal Clustering',
        'Network Analysis',
        'Mule Account Indicators',
        'Geographic Clustering',
        'Behavioral Anomalies'
      ],
      description: 'Graph neural network identifying coordinated fraud networks and mule account patterns across multiple complaints.',
      predictions24h: 156,
      successRate: 82.3,
      avgConfidence: 79.8
    },
    {
      id: '3',
      name: 'Real-Time Risk Scoring Model',
      version: 'v3.1.2',
      type: 'risk_scoring',
      status: 'active',
      accuracy: 94.8,
      precision: 93.2,
      recall: 96.1,
      f1Score: 94.6,
      trainingDate: new Date('2025-01-05'),
      lastUpdated: new Date('2025-01-07'),
      trainingDataSize: 150000,
      features: [
        'Complaint Severity',
        'Amount at Risk',
        'Response Time',
        'Historical Success Rate',
        'LEA Availability',
        'Bank Coordination Level',
        'Suspect Profile Match'
      ],
      description: 'XGBoost classifier providing real-time risk scores (0-100) for incoming complaints to prioritize LEA response.',
      predictions24h: 8247,
      successRate: 91.7,
      avgConfidence: 92.1
    },
    {
      id: '4',
      name: 'Geospatial Hotspot Analyzer',
      version: 'v2.0.5',
      type: 'geospatial_analysis',
      status: 'active',
      accuracy: 89.3,
      precision: 87.9,
      recall: 90.5,
      f1Score: 89.2,
      trainingDate: new Date('2024-12-20'),
      lastUpdated: new Date('2025-01-06'),
      trainingDataSize: 75000,
      features: [
        'ATM Density',
        'Historical Fraud Locations',
        'Population Density',
        'Bank Branch Proximity',
        'Time-Space Clustering',
        'Transit Connectivity'
      ],
      description: 'Spatial-temporal model using K-means and DBSCAN to identify high-risk geographic zones for proactive ATM surveillance.',
      predictions24h: 42,
      successRate: 85.9,
      avgConfidence: 83.4
    }
  ]);

  const [selectedModel, setSelectedModel] = useState<MLModel>(models[0]);
  const [showPredictionDemo, setShowPredictionDemo] = useState(false);

  const predictionExample: PredictionExample = {
    id: 'demo-1',
    input: {
      complaintId: 'CYB-2025-12345',
      transactionAmount: 245000,
      location: 'Mumbai, Maharashtra',
      transactionTime: '2025-01-07 18:30:00',
      accountAge: 45,
      previousFrauds: 12
    },
    prediction: {
      withdrawalLocation: 'Mumbai - Andheri East, SBI ATM (Branch Code: 00234)',
      probability: 0.94,
      riskScore: 94,
      timeWindow: '20:00 - 22:00 (Today)',
      confidence: 94.2
    },
    explainability: {
      topFeatures: [
        { feature: 'Transaction Amount (₹2,45,000)', importance: 0.28 },
        { feature: 'Previous Fraud Pattern Match', importance: 0.24 },
        { feature: 'Geographic Clustering (Andheri)', importance: 0.19 },
        { feature: 'Time Window Analysis', importance: 0.15 },
        { feature: 'Beneficiary Bank (SBI)', importance: 0.14 }
      ]
    }
  };

  const getModelTypeLabel = (type: ModelType) => {
    switch (type) {
      case 'withdrawal_prediction': return 'Withdrawal Prediction';
      case 'pattern_detection': return 'Pattern Detection';
      case 'risk_scoring': return 'Risk Scoring';
      case 'geospatial_analysis': return 'Geospatial Analysis';
      default: return type;
    }
  };

  const getModelTypeColor = (type: ModelType) => {
    switch (type) {
      case 'withdrawal_prediction': return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'pattern_detection': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'risk_scoring': return 'bg-red-100 text-red-700 border-red-300';
      case 'geospatial_analysis': return 'bg-green-100 text-green-700 border-green-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusColor = (status: ModelStatus) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'training': return 'bg-yellow-100 text-yellow-700';
      case 'testing': return 'bg-blue-100 text-blue-700';
      case 'archived': return 'bg-gray-100 text-gray-500';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getMetricColor = (value: number) => {
    if (value >= 90) return 'text-green-700';
    if (value >= 80) return 'text-blue-700';
    if (value >= 70) return 'text-yellow-700';
    return 'text-red-700';
  };

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-indigo-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-xl p-8 border-b-4 border-indigo-600">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-4">
              <div className="relative">
                <Brain className="w-10 h-10 text-indigo-600" />
                <Zap className="w-5 h-5 text-yellow-500 absolute -top-1 -right-1" />
              </div>
              Predictive Analytics Engine
            </h1>
            <p className="text-base text-gray-700 mt-2 font-medium">
              AI/ML Models | Pattern Detection | Geospatial Risk Modeling | Real-Time Predictions
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-5 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2 shadow-lg transition-all hover:shadow-xl font-medium">
              <Play className="w-5 h-5" />
              Run Prediction
            </button>
            <button className="px-5 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 shadow-lg transition-all hover:shadow-xl font-medium">
              <RefreshCw className="w-5 h-5" />
              Retrain Models
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-5">
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-5 rounded-xl border-2 border-indigo-300 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-indigo-700 font-bold uppercase tracking-wide">Active Models</p>
                <p className="text-3xl font-bold text-indigo-800 mt-1">{models.filter(m => m.status === 'active').length}</p>
              </div>
              <div className="bg-indigo-600 p-3 rounded-lg">
                <Cpu className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="mt-3 text-sm text-indigo-700 font-medium">Production Ready</div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-xl border-2 border-green-300 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 font-bold uppercase tracking-wide">Avg Accuracy</p>
                <p className="text-3xl font-bold text-green-800 mt-1">
                  {(models.reduce((sum, m) => sum + m.accuracy, 0) / models.length).toFixed(1)}%
                </p>
              </div>
              <div className="bg-green-600 p-3 rounded-lg">
                <Target className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="mt-3 text-sm text-green-700 font-medium">Model Performance</div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-xl border-2 border-purple-300 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700 font-bold uppercase tracking-wide">Predictions/Day</p>
                <p className="text-3xl font-bold text-purple-800 mt-1">
                  {models.reduce((sum, m) => sum + m.predictions24h, 0).toLocaleString()}
                </p>
              </div>
              <div className="bg-purple-600 p-3 rounded-lg">
                <Activity className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="mt-3 text-sm text-purple-700 font-medium">Real-Time Processing</div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border-2 border-blue-300 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 font-bold uppercase tracking-wide">Training Data</p>
                <p className="text-3xl font-bold text-blue-800 mt-1">
                  {(models.reduce((sum, m) => sum + m.trainingDataSize, 0) / 1000).toFixed(0)}K
                </p>
              </div>
              <div className="bg-blue-600 p-3 rounded-lg">
                <Database className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="mt-3 text-sm text-blue-700 font-medium">Historical Cases</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-6 p-8">
        {/* Models List */}
        <div className="col-span-4 space-y-4">
          <div className="bg-white p-5 rounded-xl shadow-lg border-2 border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-indigo-600" />
              ML Models ({models.length})
            </h3>
            <div className="space-y-3">
              {models.map((model) => (
                <div
                  key={model.id}
                  onClick={() => setSelectedModel(model)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedModel.id === model.id
                      ? 'border-indigo-600 bg-indigo-50 shadow-md'
                      : 'border-gray-200 hover:border-indigo-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-sm text-gray-900">{model.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(model.status)}`}>
                      {model.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                    <span className="flex items-center gap-1">
                      <GitBranch className="w-3 h-3" />
                      {model.version}
                    </span>
                    <span className={`px-2 py-1 rounded ${getModelTypeColor(model.type)}`}>
                      {getModelTypeLabel(model.type)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Accuracy:</span>
                    <span className={`text-sm font-bold ${getMetricColor(model.accuracy)}`}>
                      {model.accuracy}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Model Details */}
        <div className="col-span-8 space-y-6">
          {/* Model Info */}
          <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{selectedModel.name}</h3>
                <div className="flex items-center gap-3 mt-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border-2 ${getModelTypeColor(selectedModel.type)}`}>
                    {getModelTypeLabel(selectedModel.type)}
                  </span>
                  <span className="text-sm text-gray-600 flex items-center gap-1">
                    <GitBranch className="w-4 h-4" />
                    Version {selectedModel.version}
                  </span>
                  <span className="text-sm text-gray-600 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Updated {selectedModel.lastUpdated.toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-all flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-all">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{selectedModel.description}</p>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              Performance Metrics
            </h4>
            <div className="grid grid-cols-2 gap-6">
              {/* Accuracy */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-700 font-medium">Accuracy</span>
                  <span className={`text-xl font-bold ${getMetricColor(selectedModel.accuracy)}`}>
                    {selectedModel.accuracy}%
                  </span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-green-600"
                    style={{ width: `${selectedModel.accuracy}%` }}
                  ></div>
                </div>
              </div>

              {/* Precision */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-700 font-medium">Precision</span>
                  <span className={`text-xl font-bold ${getMetricColor(selectedModel.precision)}`}>
                    {selectedModel.precision}%
                  </span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                    style={{ width: `${selectedModel.precision}%` }}
                  ></div>
                </div>
              </div>

              {/* Recall */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-700 font-medium">Recall</span>
                  <span className={`text-xl font-bold ${getMetricColor(selectedModel.recall)}`}>
                    {selectedModel.recall}%
                  </span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-purple-600"
                    style={{ width: `${selectedModel.recall}%` }}
                  ></div>
                </div>
              </div>

              {/* F1 Score */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-700 font-medium">F1 Score</span>
                  <span className={`text-xl font-bold ${getMetricColor(selectedModel.f1Score)}`}>
                    {selectedModel.f1Score}%
                  </span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600"
                    style={{ width: `${selectedModel.f1Score}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
              <div className="text-center">
                <p className="text-2xl font-bold text-indigo-700">{selectedModel.predictions24h.toLocaleString()}</p>
                <p className="text-xs text-gray-600 mt-1">Predictions (24h)</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-700">{selectedModel.successRate}%</p>
                <p className="text-xs text-gray-600 mt-1">Success Rate</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-700">{selectedModel.avgConfidence}%</p>
                <p className="text-xs text-gray-600 mt-1">Avg Confidence</p>
              </div>
            </div>
          </div>

          {/* Model Features */}
          <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Database className="w-5 h-5 text-indigo-600" />
              Input Features ({selectedModel.features.length})
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {selectedModel.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="text-sm text-gray-800">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Live Prediction Demo */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl shadow-lg border-2 border-purple-300">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-gray-900 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                Live Prediction Demo - Explainable AI
              </h4>
              <button
                onClick={() => setShowPredictionDemo(!showPredictionDemo)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-all flex items-center gap-2"
              >
                {showPredictionDemo ? 'Hide' : 'Show'} Demo
              </button>
            </div>

            {showPredictionDemo && (
              <div className="space-y-4">
                {/* Input */}
                <div className="bg-white p-4 rounded-lg">
                  <h5 className="font-bold text-sm text-gray-900 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-blue-600" />
                    Input: Complaint Data
                  </h5>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div><span className="text-gray-600">Complaint ID:</span> <span className="font-mono font-bold">{predictionExample.input.complaintId}</span></div>
                    <div><span className="text-gray-600">Amount:</span> <span className="font-bold text-red-700">₹{predictionExample.input.transactionAmount.toLocaleString()}</span></div>
                    <div><span className="text-gray-600">Location:</span> <span className="font-medium">{predictionExample.input.location}</span></div>
                    <div><span className="text-gray-600">Time:</span> <span className="font-medium">{predictionExample.input.transactionTime}</span></div>
                    <div><span className="text-gray-600">Account Age:</span> <span className="font-medium">{predictionExample.input.accountAge} days</span></div>
                    <div><span className="text-gray-600">Prev Frauds:</span> <span className="font-bold text-orange-700">{predictionExample.input.previousFrauds} linked</span></div>
                  </div>
                </div>

                {/* Prediction */}
                <div className="bg-white p-4 rounded-lg border-2 border-green-300">
                  <h5 className="font-bold text-sm text-gray-900 mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4 text-green-600" />
                    Prediction Output
                  </h5>
                  <div className="space-y-2">
                    <div className="bg-yellow-50 p-3 rounded border border-yellow-300">
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="w-4 h-4 text-red-600" />
                        <span className="text-xs text-gray-700 font-medium">Predicted Withdrawal Location:</span>
                      </div>
                      <p className="text-sm font-bold text-gray-900">{predictionExample.prediction.withdrawalLocation}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="bg-green-50 p-2 rounded text-center">
                        <p className="text-gray-600">Probability</p>
                        <p className="text-lg font-bold text-green-700">{(predictionExample.prediction.probability * 100).toFixed(1)}%</p>
                      </div>
                      <div className="bg-red-50 p-2 rounded text-center">
                        <p className="text-gray-600">Risk Score</p>
                        <p className="text-lg font-bold text-red-700">{predictionExample.prediction.riskScore}/100</p>
                      </div>
                      <div className="bg-blue-50 p-2 rounded text-center">
                        <p className="text-gray-600">Confidence</p>
                        <p className="text-lg font-bold text-blue-700">{predictionExample.prediction.confidence}%</p>
                      </div>
                    </div>
                    <div className="bg-orange-50 p-2 rounded border border-orange-200 text-center">
                      <span className="text-xs text-gray-700">Predicted Time Window: </span>
                      <span className="text-sm font-bold text-orange-700">{predictionExample.prediction.timeWindow}</span>
                    </div>
                  </div>
                </div>

                {/* Explainability */}
                <div className="bg-white p-4 rounded-lg">
                  <h5 className="font-bold text-sm text-gray-900 mb-3 flex items-center gap-2">
                    <Award className="w-4 h-4 text-purple-600" />
                    Feature Importance (Explainable AI)
                  </h5>
                  <div className="space-y-2">
                    {predictionExample.explainability.topFeatures.map((feature, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-gray-700">{feature.feature}</span>
                          <span className="text-xs font-bold text-purple-700">{(feature.importance * 100).toFixed(0)}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 to-purple-600"
                            style={{ width: `${feature.importance * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
