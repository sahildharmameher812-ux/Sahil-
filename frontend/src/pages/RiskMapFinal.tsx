import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import L from 'leaflet';
import { 
  MapPin, AlertTriangle, TrendingUp, Filter, Layers, Target, Shield, Bell, Clock, 
  Calendar, Search, Activity, Eye, ChevronDown, ChevronUp, Zap, MapPinned
} from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix default marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const getTileLayerUrl = (view: string) => {
  switch (view) {
    case 'satellite':
      return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    case 'terrain':
      return 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
    case 'dark':
      return 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png';
    default:
      return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  }
};

export default function RiskMapFinal() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [selectedCrimeType, setSelectedCrimeType] = useState('all');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('all');
  const [mapView, setMapView] = useState('standard');
  const [mapKey, setMapKey] = useState(0);
  const [filtersExpanded, setFiltersExpanded] = useState(true);
  const [alertsExpanded, setAlertsExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState<'heatmap' | 'alerts'>('heatmap');

  useEffect(() => {
    setMapKey(prev => prev + 1);
  }, [mapView]);

  const hotspots = [
    { id: 1, location: 'Mumbai - Andheri', lat: 19.1136, lng: 72.8697, risk: 95, crimes: 23, predicted: true, color: '#DC2626', severity: 'critical', amount: '₹2.85L' },
    { id: 2, location: 'Delhi - Connaught Place', lat: 28.6280, lng: 77.2177, risk: 87, crimes: 18, predicted: true, color: '#F97316', severity: 'high', amount: '₹1.95L' },
    { id: 3, location: 'Bangalore - MG Road', lat: 12.9716, lng: 77.5946, risk: 72, crimes: 12, predicted: true, color: '#EAB308', severity: 'medium', amount: '₹1.25L' },
    { id: 4, location: 'Hyderabad - Banjara Hills', lat: 17.4126, lng: 78.4484, risk: 68, crimes: 10, predicted: false, color: '#EAB308', severity: 'medium', amount: '₹1.45L' },
    { id: 5, location: 'Chennai - T Nagar', lat: 13.0418, lng: 80.2341, risk: 55, crimes: 8, predicted: false, color: '#1E3A8A', severity: 'low', amount: '₹85K' },
  ];

  const recentAlerts = [
    { time: '2 min ago', location: 'Mumbai, Andheri', type: 'UPI Fraud Pattern', severity: 'critical', amount: '₹2.85L', confidence: 96 },
    { time: '15 min ago', location: 'Delhi, CP', type: 'ATM Skimming', severity: 'critical', amount: '₹1.95L', confidence: 92 },
    { time: '45 min ago', location: 'Bangalore, MG Road', type: 'Multiple Withdrawals', severity: 'high', amount: '₹1.25L', confidence: 84 },
    { time: '1 hr ago', location: 'Hyderabad', type: 'Suspicious Activity', severity: 'high', amount: '₹1.45L', confidence: 78 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Enhanced Page Header with Gradient Orbs */}
      <div className="bg-gradient-to-r from-primary-900 via-cyber-600 to-accent-600 text-white rounded-3xl shadow-2xl p-8 relative overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyber-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-500/15 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-white/20 backdrop-blur-xl rounded-2xl shadow-glow-cyber border border-white/30 transform hover:scale-110 transition-transform duration-300">
                <MapPin className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-5xl font-bold font-['Poppins'] mb-2 drop-shadow-lg">Predictive Risk Heatmap</h1>
                <p className="text-blue-100 text-lg flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Real-time AI Intelligence & Geospatial Analysis
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-3">
              <button className="bg-white/20 hover:bg-white/30 backdrop-blur-lg px-6 py-3 rounded-xl font-semibold transition-all hover:shadow-lg flex items-center gap-2">
                <Target className="w-5 h-5" />
                Create Geofence
              </button>
              <button className="bg-success hover:bg-green-700 px-6 py-3 rounded-xl font-semibold transition-all hover:shadow-lg flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Set Alert
              </button>
            </div>
          </div>

          {/* Enhanced Quick Stats Row with Icons */}
          <div className="grid grid-cols-4 gap-4 mt-8">
            <div className="bg-white/15 backdrop-blur-xl rounded-2xl p-5 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-danger/20 rounded-lg group-hover:scale-110 transition-transform">
                  <AlertTriangle className="w-5 h-5 text-danger" />
                </div>
                <p className="text-blue-100 text-sm font-medium">Critical Zones</p>
              </div>
              <p className="text-4xl font-black">5</p>
              <p className="text-xs text-blue-200 mt-1">↑ 2 from yesterday</p>
            </div>
            <div className="bg-white/15 backdrop-blur-xl rounded-2xl p-5 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-cyan-400/20 rounded-lg group-hover:scale-110 transition-transform">
                  <Activity className="w-5 h-5 text-cyan-200" />
                </div>
                <p className="text-blue-100 text-sm font-medium">Active Predictions</p>
              </div>
              <p className="text-4xl font-black">12</p>
              <p className="text-xs text-blue-200 mt-1">Next 24 hours</p>
            </div>
            <div className="bg-white/15 backdrop-blur-xl rounded-2xl p-5 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-400/20 rounded-lg group-hover:scale-110 transition-transform">
                  <Target className="w-5 h-5 text-purple-200" />
                </div>
                <p className="text-blue-100 text-sm font-medium">Monitored ATMs</p>
              </div>
              <p className="text-4xl font-black">847</p>
              <p className="text-xs text-blue-200 mt-1">Across 28 states</p>
            </div>
            <div className="bg-white/15 backdrop-blur-xl rounded-2xl p-5 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-400/20 rounded-lg group-hover:scale-110 transition-transform">
                  <Shield className="w-5 h-5 text-green-200" />
                </div>
                <p className="text-green-100 text-sm font-medium">Prevented Today</p>
              </div>
              <p className="text-4xl font-black text-green-100">₹42L</p>
              <p className="text-xs text-green-200 mt-1">89% success rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Tabs Navigation - Fixed Layout */}
      <div className="bg-gradient-to-br from-white via-neutral-50 to-white rounded-3xl shadow-card p-3 animate-slide-in-up border border-neutral-200" style={{animationDelay: '0.2s'}}>
        <div className="flex gap-3">
          <button
            onClick={() => setActiveTab('heatmap')}
            className={`flex-1 flex items-center justify-center gap-3 px-8 py-5 rounded-2xl font-bold text-base transition-all duration-300 relative overflow-hidden group ${
              activeTab === 'heatmap'
                ? 'bg-gradient-to-r from-primary-600 via-cyber-500 to-primary-700 text-white shadow-glow-primary'
                : 'bg-white text-neutral-700 hover:bg-neutral-50 shadow-sm hover:shadow-md'
            }`}
          >
            {activeTab === 'heatmap' && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
            )}
            <div className={`p-2 rounded-xl ${
              activeTab === 'heatmap' ? 'bg-white/20' : 'bg-primary-100'
            }`}>
              <MapPin className={`w-6 h-6 ${activeTab === 'heatmap' ? 'text-white' : 'text-primary-600'}`} />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-lg">Interactive Heatmap</span>
              {activeTab === 'heatmap' && (
                <span className="text-xs text-white/80 font-normal">Real-time Visualization</span>
              )}
            </div>
            {activeTab === 'heatmap' && (
              <div className="ml-auto px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold border border-white/30">
                Active
              </div>
            )}
          </button>
          
          <button
            onClick={() => setActiveTab('alerts')}
            className={`flex-1 flex items-center justify-center gap-3 px-8 py-5 rounded-2xl font-bold text-base transition-all duration-300 relative overflow-hidden group ${
              activeTab === 'alerts'
                ? 'bg-gradient-to-r from-danger via-red-600 to-accent-600 text-white shadow-glow-accent'
                : 'bg-white text-neutral-700 hover:bg-neutral-50 shadow-sm hover:shadow-md'
            }`}
          >
            {activeTab === 'alerts' && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
            )}
            <div className={`p-2 rounded-xl relative ${
              activeTab === 'alerts' ? 'bg-white/20' : 'bg-red-100'
            }`}>
              <Bell className={`w-6 h-6 ${activeTab === 'alerts' ? 'text-white animate-pulse' : 'text-danger'}`} />
              {activeTab !== 'alerts' && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-danger rounded-full animate-ping"></div>
              )}
            </div>
            <div className="flex flex-col items-start">
              <span className="text-lg">Live Alerts</span>
              {activeTab === 'alerts' && (
                <span className="text-xs text-white/80 font-normal">Active Monitoring</span>
              )}
            </div>
            <div className={`ml-auto px-3 py-1.5 rounded-full text-xs font-bold ${
              activeTab === 'alerts' ? 'bg-white/20 backdrop-blur-sm text-white border border-white/30' : 'bg-danger text-white shadow-lg animate-pulse'
            }`}>
              {recentAlerts.length} New
            </div>
          </button>
        </div>
      </div>

      {/* Main Content Grid - Conditional Based on Active Tab */}
      {activeTab === 'heatmap' ? (
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Enhanced Left Sidebar - Filters with Gradient */}
        <div className="xl:col-span-1">
          <div className="bg-white rounded-2xl shadow-soft-xl overflow-hidden animate-slide-in-left border border-neutral-100">
            {/* Filters Header with Gradient */}
            <div 
              className="bg-gradient-to-br from-primary-600 via-cyber-500 to-primary-700 text-white p-5 cursor-pointer flex items-center justify-between hover:from-primary-700 hover:via-cyber-600 hover:to-primary-800 transition-all duration-300 shadow-lg"
              onClick={() => setFiltersExpanded(!filtersExpanded)}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Filter className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg">Filters & Controls</h3>
              </div>
              {filtersExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>

            {filtersExpanded && (
              <div className="p-4 space-y-4">
                {/* Map View Selector */}
                <div>
                  <label className="text-sm font-semibold text-neutral-700 mb-2 block flex items-center gap-2">
                    <Layers className="w-4 h-4 text-primary-600" />
                    Map View
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['standard', 'satellite', 'terrain', 'dark'].map(view => (
                      <button
                        key={view}
                        onClick={() => setMapView(view)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          mapView === view 
                            ? 'bg-gradient-mixed text-white shadow-lg scale-105' 
                            : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                        }`}
                      >
                        {view.charAt(0).toUpperCase() + view.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Range */}
                <div>
                  <label className="text-sm font-semibold text-neutral-700 mb-2 block flex items-center gap-2">
                    <Clock className="w-4 h-4 text-accent-500" />
                    Prediction Window
                  </label>
                  <select 
                    value={selectedTimeRange}
                    onChange={(e) => setSelectedTimeRange(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all text-sm font-medium"
                  >
                    <option value="realtime">Real-time</option>
                    <option value="24h">Next 24 Hours</option>
                    <option value="48h">Next 48 Hours</option>
                    <option value="72h">Next 72 Hours</option>
                    <option value="7d">Next 7 Days</option>
                  </select>
                </div>

                {/* Crime Type */}
                <div>
                  <label className="text-sm font-semibold text-neutral-700 mb-2 block flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-danger" />
                    Crime Category
                  </label>
                  <select 
                    value={selectedCrimeType}
                    onChange={(e) => setSelectedCrimeType(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all text-sm font-medium"
                  >
                    <option value="all">All Types</option>
                    <option value="upi">UPI Fraud</option>
                    <option value="atm">ATM Fraud</option>
                    <option value="card">Card Cloning</option>
                    <option value="phishing">Phishing</option>
                    <option value="investment">Investment Scam</option>
                  </select>
                </div>

                {/* Risk Level */}
                <div>
                  <label className="text-sm font-semibold text-neutral-700 mb-2 block flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-success" />
                    Risk Level
                  </label>
                  <select 
                    value={selectedRiskLevel}
                    onChange={(e) => setSelectedRiskLevel(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all text-sm font-medium"
                  >
                    <option value="all">All Levels</option>
                    <option value="critical">Critical (90-100)</option>
                    <option value="high">High (70-89)</option>
                    <option value="medium">Medium (50-69)</option>
                    <option value="low">Low (0-49)</option>
                  </select>
                </div>

                {/* Legend */}
                <div className="pt-4 border-t border-neutral-200">
                  <h4 className="text-sm font-semibold text-neutral-700 mb-3">Risk Level Legend</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-danger"></div>
                      <span className="text-xs text-neutral-600">Critical (90-100)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-accent-500"></div>
                      <span className="text-xs text-neutral-600">High (70-89)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                      <span className="text-xs text-neutral-600">Medium (50-69)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-primary-600"></div>
                      <span className="text-xs text-neutral-600">Low (0-49)</span>
                    </div>
                  </div>
                </div>

                {/* Apply Button */}
                <button className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-4 py-3 rounded-xl font-semibold transition-all hover:shadow-lg">
                  Apply Filters
                </button>
              </div>
            )}
          </div>

          {/* Hotspot Summary Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mt-6 animate-slide-in-left" style={{animationDelay: '0.1s'}}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-accent-100 rounded-xl">
                <MapPinned className="w-6 h-6 text-accent-600" />
              </div>
              <h3 className="font-bold text-lg text-primary-900">Hotspot Summary</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-600">Total Hotspots</span>
                <span className="text-lg font-bold text-primary-900">{hotspots.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-600">Predicted</span>
                <span className="text-lg font-bold text-accent-600">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-600">Avg Confidence</span>
                <span className="text-lg font-bold text-success">86%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center - Full Width Enhanced Map with Gradient Border */}
        <div className="xl:col-span-3">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-slide-in-up border-4 border-transparent bg-gradient-to-br from-primary-100 via-white to-cyber-50 p-1">
            <div className="bg-white rounded-2xl overflow-hidden shadow-inner">
              {/* Map Container with Enhanced Styling */}
              <div className="h-[750px] relative">
              <MapContainer
                key={mapKey}
                center={[20.5937, 78.9629]}
                zoom={5}
                style={{ height: '100%', width: '100%' }}
                className="z-0"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url={getTileLayerUrl(mapView)}
                />
                {hotspots.map((hotspot) => (
                  <Circle
                    key={hotspot.id}
                    center={[hotspot.lat, hotspot.lng]}
                    radius={hotspot.risk * 500}
                    pathOptions={{
                      color: hotspot.color,
                      fillColor: hotspot.color,
                      fillOpacity: 0.3,
                      weight: 2,
                    }}
                  >
                    <Popup>
                      <div className="p-3 min-w-[250px]">
                        <h3 className="font-bold text-lg mb-2 text-primary-900">{hotspot.location}</h3>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-neutral-600">Risk Score:</span>
                            <span className="font-bold" style={{color: hotspot.color}}>{hotspot.risk}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-600">Incidents:</span>
                            <span className="font-bold text-neutral-900">{hotspot.crimes}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-600">Predicted Amount:</span>
                            <span className="font-bold text-danger">{hotspot.amount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-600">Status:</span>
                            <span className={`font-bold ${hotspot.predicted ? 'text-accent-600' : 'text-primary-600'}`}>
                              {hotspot.predicted ? 'Predicted' : 'Historical'}
                            </span>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-neutral-200">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                            hotspot.severity === 'critical' ? 'bg-danger' :
                            hotspot.severity === 'high' ? 'bg-accent-500' :
                            hotspot.severity === 'medium' ? 'bg-yellow-500' :
                            'bg-primary-600'
                          }`}>
                            {hotspot.severity.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </Popup>
                  </Circle>
                ))}
              </MapContainer>

              {/* Enhanced Map Overlay Info with Glassmorphism */}
              <div className="absolute bottom-4 left-4 bg-gradient-to-r from-white/95 to-blue-50/95 backdrop-blur-2xl rounded-2xl shadow-2xl px-5 py-3 z-[1000] border border-white/40 hover:scale-105 transition-transform duration-300">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                      <div className="absolute inset-0 w-2 h-2 bg-success rounded-full animate-ping"></div>
                    </div>
                    <span className="font-semibold text-neutral-800">Live Tracking</span>
                  </div>
                  <span className="text-neutral-300">|</span>
                  <span className="text-neutral-700 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-cyber-500" />
                    <strong>Updated:</strong> {new Date().toLocaleTimeString()}
                  </span>
                  <span className="text-neutral-300">|</span>
                  <span className="text-neutral-700 flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-success" />
                    <strong>Confidence:</strong> <span className="text-success font-bold">92%</span>
                  </span>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      ) : (
      /* Live Alerts View - Full Width */
      <div className="animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {recentAlerts.map((alert, index) => (
            <div 
              key={index}
              className={`relative bg-white rounded-3xl shadow-card hover:shadow-card-hover transition-all duration-300 p-6 border-l-4 overflow-hidden group cursor-pointer hover:scale-105 ${
                alert.severity === 'critical' ? 'border-danger' :
                alert.severity === 'high' ? 'border-accent-500' :
                'border-yellow-500'
              }`}
              style={{animation: `slideInUp 0.5s ease-out ${index * 0.1}s forwards`, opacity: 0}}
            >
              {/* Background Gradient Orb */}
              <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl ${
                alert.severity === 'critical' ? 'bg-danger/10' :
                alert.severity === 'high' ? 'bg-accent-500/10' :
                'bg-yellow-500/10'
              }`}></div>
              
              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg ${
                        alert.severity === 'critical' ? 'bg-gradient-to-r from-danger to-red-700' :
                        alert.severity === 'high' ? 'bg-gradient-to-r from-accent-500 to-orange-600' :
                        'bg-gradient-to-r from-yellow-500 to-yellow-600'
                      }`}>
                        {alert.severity.toUpperCase()}
                      </span>
                      <span className="text-xs text-neutral-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {alert.time}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-primary-900 mb-2 group-hover:text-accent-600 transition-colors">
                      {alert.type}
                    </h3>
                    <p className="text-sm text-neutral-600 flex items-center gap-2 mb-3">
                      <MapPin className="w-4 h-4 text-accent-500" />
                      {alert.location}
                    </p>
                  </div>
                </div>

                {/* Amount Display */}
                <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-4 mb-4">
                  <p className="text-xs text-neutral-600 mb-1">Predicted Amount</p>
                  <p className="text-3xl font-black bg-gradient-to-r from-danger to-accent-600 bg-clip-text text-transparent">
                    {alert.amount}
                  </p>
                </div>

                {/* Confidence Badge */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-neutral-200">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-success" />
                    <span className="text-sm font-semibold text-success">Confidence</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-neutral-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-success to-green-600 rounded-full"
                        style={{width: `${alert.confidence}%`}}
                      ></div>
                    </div>
                    <span className="text-sm font-bold text-success">{alert.confidence}%</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-cyber-600 hover:from-primary-700 hover:to-cyber-700 text-white px-4 py-3 rounded-xl text-sm font-bold transition-all shadow-lg hover:shadow-xl">
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-accent-500 to-orange-600 hover:from-accent-600 hover:to-orange-700 text-white px-4 py-3 rounded-xl text-sm font-bold transition-all shadow-lg hover:shadow-xl">
                    <Shield className="w-4 h-4" />
                    Deploy Team
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      )}
    </div>
  );
}
