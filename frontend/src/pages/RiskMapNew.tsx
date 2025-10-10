import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import { 
  MapPin, AlertTriangle, TrendingUp, Filter, Layers, Navigation, Target, Shield, Bell, Clock, 
  Calendar, Search, ZoomIn, ZoomOut, Maximize, X, ChevronDown, ChevronUp, Activity, Eye,
  AlertCircle, CheckCircle
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

export default function RiskMapNew() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [selectedCrimeType, setSelectedCrimeType] = useState('all');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('all');
  const [mapView, setMapView] = useState('standard');
  const [mapKey, setMapKey] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [alertsPanelOpen, setAlertsPanelOpen] = useState(true);
  const [selectedHotspot, setSelectedHotspot] = useState<any>(null);

  useEffect(() => {
    setMapKey(prev => prev + 1);
  }, [mapView]);

  const hotspots = [
    { id: 1, location: 'Mumbai - Andheri', lat: 19.1136, lng: 72.8697, risk: 95, crimes: 23, predicted: true, color: '#DC2626', severity: 'critical' },
    { id: 2, location: 'Delhi - Connaught Place', lat: 28.6280, lng: 77.2177, risk: 87, crimes: 18, predicted: true, color: '#F97316', severity: 'high' },
    { id: 3, location: 'Bangalore - MG Road', lat: 12.9716, lng: 77.5946, risk: 72, crimes: 12, predicted: true, color: '#EAB308', severity: 'medium' },
    { id: 4, location: 'Hyderabad - Banjara Hills', lat: 17.4126, lng: 78.4484, risk: 68, crimes: 10, predicted: false, color: '#EAB308', severity: 'medium' },
    { id: 5, location: 'Chennai - T Nagar', lat: 13.0418, lng: 80.2341, risk: 55, crimes: 8, predicted: false, color: '#1E3A8A', severity: 'low' },
  ];

  const recentAlerts = [
    { time: '2 min ago', location: 'Mumbai, Andheri', type: 'UPI Fraud Pattern', severity: 'critical', amount: '₹2.85L' },
    { time: '15 min ago', location: 'Delhi, CP', type: 'ATM Skimming', severity: 'critical', amount: '₹1.95L' },
    { time: '45 min ago', location: 'Bangalore, MG Road', type: 'Multiple Withdrawals', severity: 'high', amount: '₹1.25L' },
    { time: '1 hr ago', location: 'Hyderabad', type: 'Suspicious Activity', severity: 'high', amount: '₹1.45L' },
  ];

  return (
    <div className="fixed inset-0 bg-neutral-900 flex flex-col overflow-hidden">
      {/* Top Control Bar */}
      <div className="bg-gradient-to-r from-primary-900 via-primary-800 to-accent-600 text-white px-6 py-4 shadow-2xl z-50 relative">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl">
                <MapPin className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-2xl font-bold font-['Poppins']">Predictive Risk Heatmap</h1>
                <p className="text-primary-100 text-sm">Real-time Intelligence & Prediction</p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex gap-4">
            <div className="bg-white/10 backdrop-blur-lg px-4 py-2 rounded-xl">
              <p className="text-xs text-primary-200">Critical Zones</p>
              <p className="text-2xl font-bold">5</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg px-4 py-2 rounded-xl">
              <p className="text-xs text-primary-200">Active Predictions</p>
              <p className="text-2xl font-bold">12</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg px-4 py-2 rounded-xl">
              <p className="text-xs text-primary-200">Monitored ATMs</p>
              <p className="text-2xl font-bold">847</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg px-4 py-2 rounded-xl">
              <p className="text-xs text-success">Prevented</p>
              <p className="text-2xl font-bold">₹42L</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button className="bg-accent-500 hover:bg-accent-600 px-5 py-2.5 rounded-xl font-semibold transition-all hover:shadow-lg flex items-center gap-2">
              <Target className="w-5 h-5" />
              Geofence
            </button>
            <button className="bg-success hover:bg-green-700 px-5 py-2.5 rounded-xl font-semibold transition-all hover:shadow-lg flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Set Alert
            </button>
          </div>
        </div>
      </div>

      {/* Main Map Container */}
      <div className="flex-1 relative">
        {/* Map */}
        <MapContainer
          key={mapKey}
          center={[20.5937, 78.9629]}
          zoom={5}
          style={{ height: '100%', width: '100%' }}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
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
              }}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold text-lg mb-2">{hotspot.location}</h3>
                  <p className="text-sm"><strong>Risk Score:</strong> {hotspot.risk}%</p>
                  <p className="text-sm"><strong>Crimes:</strong> {hotspot.crimes}</p>
                  <p className="text-sm"><strong>Status:</strong> {hotspot.predicted ? 'Predicted' : 'Historical'}</p>
                </div>
              </Popup>
            </Circle>
          ))}
        </MapContainer>

        {/* Floating Left Sidebar - Filters */}
        <div className={`absolute left-6 top-6 bottom-6 ${filtersOpen ? 'w-80' : 'w-16'} transition-all duration-300 z-40`}>
          <div className="h-full bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-900 to-primary-700 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                {filtersOpen && <h3 className="font-bold">Filters & Controls</h3>}
              </div>
              <button onClick={() => setFiltersOpen(!filtersOpen)} className="hover:bg-white/20 p-1 rounded-lg transition-colors">
                {filtersOpen ? <X className="w-5 h-5" /> : <Filter className="w-5 h-5" />}
              </button>
            </div>

            {filtersOpen && (
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
                            ? 'bg-primary-600 text-white shadow-lg' 
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

                {/* Apply Filters Button */}
                <button className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-4 py-3 rounded-xl font-semibold transition-all hover:shadow-lg">
                  Apply Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Floating Right Sidebar - Recent Alerts */}
        <div className={`absolute right-6 top-6 bottom-6 ${alertsPanelOpen ? 'w-96' : 'w-16'} transition-all duration-300 z-40`}>
          <div className="h-full bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-danger to-red-700 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 animate-pulse" />
                {alertsPanelOpen && <h3 className="font-bold">Live Alerts</h3>}
              </div>
              <button onClick={() => setAlertsPanelOpen(!alertsPanelOpen)} className="hover:bg-white/20 p-1 rounded-lg transition-colors">
                {alertsPanelOpen ? <X className="w-5 h-5" /> : <Bell className="w-5 h-5" />}
              </button>
            </div>

            {alertsPanelOpen && (
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {recentAlerts.map((alert, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-xl border-l-4 ${
                      alert.severity === 'critical' ? 'border-danger bg-red-50' :
                      alert.severity === 'high' ? 'border-accent-500 bg-orange-50' :
                      'border-yellow-500 bg-yellow-50'
                    } hover:shadow-lg transition-all cursor-pointer group`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                            alert.severity === 'critical' ? 'bg-danger text-white' :
                            alert.severity === 'high' ? 'bg-accent-500 text-white' :
                            'bg-yellow-500 text-white'
                          }`}>
                            {alert.severity.toUpperCase()}
                          </span>
                          <span className="text-xs text-neutral-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {alert.time}
                          </span>
                        </div>
                        <h4 className="font-bold text-sm text-primary-900 mb-1">{alert.type}</h4>
                        <p className="text-xs text-neutral-600 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {alert.location}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-neutral-500">Amount</p>
                        <p className="text-lg font-bold text-danger">{alert.amount}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-all">
                        View
                      </button>
                      <button className="flex-1 bg-accent-500 hover:bg-accent-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-all">
                        Deploy
                      </button>
                    </div>
                  </div>
                ))}

                <button className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-4 py-3 rounded-xl font-semibold transition-all mt-4">
                  View All Alerts
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Floating Bottom Info Panel */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl px-6 py-4 z-40 animate-slide-in-up">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-neutral-700">System Active</span>
            </div>
            <div className="text-sm text-neutral-600">
              <strong>Last Updated:</strong> {new Date().toLocaleTimeString()}
            </div>
            <div className="text-sm text-neutral-600">
              <strong>Hotspots Tracked:</strong> {hotspots.length}
            </div>
            <div className="text-sm text-neutral-600">
              <strong>Confidence:</strong> <span className="text-success font-bold">92%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
