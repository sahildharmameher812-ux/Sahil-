import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, AlertTriangle, TrendingUp, Filter, Layers, Navigation, Target, Shield, Bell, Clock, Calendar } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import Map3D from '../components/Map3D';

// Fix default marker icon issue with webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Tile layer URLs for different map views
const getTileLayerUrl = (view: string) => {
  switch (view) {
    case 'satellite':
      return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    case 'terrain':
      return 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
    case '3d':
      // For 3D, we'll use ESRI World Topo Map with relief shading
      return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}';
    case 'standard':
    default:
      return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  }
};

const getTileLayerAttribution = (view: string) => {
  switch (view) {
    case 'satellite':
      return '&copy; <a href="https://www.esri.com/">Esri</a>';
    case 'terrain':
      return '&copy; <a href="https://opentopomap.org">OpenTopoMap</a> contributors';
    case '3d':
      return 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community';
    case 'standard':
    default:
      return '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  }
};

export default function RiskMap() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [selectedCrimeType, setSelectedCrimeType] = useState('all');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('all');
  const [mapView, setMapView] = useState('standard');
  const [mapKey, setMapKey] = useState(0);

  // Refresh map when view changes
  useEffect(() => {
    setMapKey(prev => prev + 1);
  }, [mapView]);

  // Demo hotspot data based on predictive analytics
  const hotspots = [
    { id: 1, location: 'Mumbai - Andheri', lat: 19.1136, lng: 72.8697, risk: 95, crimes: 23, predicted: true, color: 'red' },
    { id: 2, location: 'Delhi - Connaught Place', lat: 28.6280, lng: 77.2177, risk: 87, crimes: 18, predicted: true, color: 'orange' },
    { id: 3, location: 'Bangalore - MG Road', lat: 12.9716, lng: 77.5946, risk: 72, crimes: 12, predicted: true, color: 'yellow' },
    { id: 4, location: 'Hyderabad - Banjara Hills', lat: 17.4126, lng: 78.4484, risk: 68, crimes: 10, predicted: false, color: 'yellow' },
    { id: 5, location: 'Chennai - T Nagar', lat: 13.0418, lng: 80.2341, risk: 55, crimes: 8, predicted: false, color: 'blue' },
  ];

  const recentAlerts = [
    { time: '2 min ago', location: 'Mumbai, Andheri', type: 'UPI Fraud Pattern', severity: 'critical' },
    { time: '15 min ago', location: 'Delhi, CP', type: 'ATM Skimming', severity: 'high' },
    { time: '45 min ago', location: 'Bangalore, MG Road', type: 'Multiple Withdrawals', severity: 'medium' },
  ];

  return (
    <div className="h-screen overflow-hidden bg-gray-900">
      {/* Header with Stats */}
      <div className="bg-white shadow-md p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-blue-600" />
              Predictive Risk Heatmap
            </h1>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Target className="w-4 h-4" />
              Create Geofence
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Set Alert
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-3">
          <div className="bg-red-50 p-3 rounded-lg border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-red-600 font-medium">Critical Hotspots</p>
                <p className="text-xl font-bold text-red-700">5</p>
              </div>
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
          </div>
          <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-orange-600 font-medium">Active Predictions</p>
                <p className="text-xl font-bold text-orange-700">12</p>
              </div>
              <TrendingUp className="w-6 h-6 text-orange-500" />
            </div>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-blue-600 font-medium">Monitored ATMs</p>
                <p className="text-xl font-bold text-blue-700">847</p>
              </div>
              <Shield className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-green-600 font-medium">Prevented Frauds</p>
                <p className="text-xl font-bold text-green-700">₹42L</p>
              </div>
              <Target className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Map Area with Filters */}
      <div className="grid grid-cols-12 gap-0 h-[calc(100vh-180px)]">
        {/* Left Sidebar - Filters */}
        <div className="col-span-2 bg-white shadow-lg p-4 space-y-3 overflow-y-auto">
          <div className="flex items-center gap-2 pb-3 border-b">
            <Filter className="w-5 h-5 text-gray-700" />
            <h3 className="font-semibold text-gray-900">Filters & Controls</h3>
          </div>

          {/* Time Range Filter */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Prediction Window
            </label>
            <select 
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="realtime">Real-time</option>
              <option value="24h">Next 24 Hours</option>
              <option value="48h">Next 48 Hours</option>
              <option value="72h">Next 72 Hours</option>
              <option value="7d">Next 7 Days</option>
            </select>
          </div>

          {/* Crime Type Filter */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Crime Category
            </label>
            <select 
              value={selectedCrimeType}
              onChange={(e) => setSelectedCrimeType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="upi">UPI Fraud</option>
              <option value="atm">ATM Fraud</option>
              <option value="card">Card Cloning</option>
              <option value="phishing">Phishing</option>
              <option value="investment">Investment Scam</option>
            </select>
          </div>

          {/* Risk Level Filter */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Risk Level
            </label>
            <select 
              value={selectedRiskLevel}
              onChange={(e) => setSelectedRiskLevel(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Levels</option>
              <option value="critical">Critical (90-100)</option>
              <option value="high">High (70-89)</option>
              <option value="medium">Medium (50-69)</option>
              <option value="low">Low (0-49)</option>
            </select>
          </div>

          {/* Map View Toggle */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Map View
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setMapView('standard')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  mapView === 'standard' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Standard
              </button>
              <button
                onClick={() => setMapView('satellite')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  mapView === 'satellite' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Satellite
              </button>
              <button
                onClick={() => setMapView('terrain')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  mapView === 'terrain' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Terrain
              </button>
              <button
                onClick={() => setMapView('3d')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  mapView === '3d' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                3D View
              </button>
            </div>
          </div>

          {/* Layer Toggles */}
          <div className="pt-3 border-t">
            <label className="text-sm font-medium text-gray-700 mb-3 block">Map Layers</label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                <span className="text-sm text-gray-700">Hotspots</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                <span className="text-sm text-gray-700">ATM Locations</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                <span className="text-sm text-gray-700">Bank Branches</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                <span className="text-sm text-gray-700">Police Stations</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                <span className="text-sm text-gray-700">Geofences</span>
              </label>
            </div>
          </div>

          {/* Recent Alerts */}
          <div className="pt-3 border-t">
            <label className="text-sm font-medium text-gray-700 mb-3 block flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Live Alerts
            </label>
            <div className="space-y-2">
              {recentAlerts.map((alert, idx) => (
                <div key={idx} className={`p-2 rounded-lg text-xs ${
                  alert.severity === 'critical' ? 'bg-red-50 border border-red-200' :
                  alert.severity === 'high' ? 'bg-orange-50 border border-orange-200' :
                  'bg-yellow-50 border border-yellow-200'
                }`}>
                  <p className="font-medium text-gray-900">{alert.type}</p>
                  <p className="text-gray-600">{alert.location}</p>
                  <p className="text-gray-500 mt-1">{alert.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Map Area */}
        <div className="col-span-10 relative">
          {/* Floating Controls */}
          <div className="absolute top-4 right-4 z-20 flex gap-2">
            <button className="px-3 py-2 bg-white shadow-lg rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
              <Navigation className="w-4 h-4" />
              Recenter
            </button>
            <button className="px-3 py-2 bg-blue-600 text-white shadow-lg rounded-lg text-sm font-medium hover:bg-blue-700">
              Export Map
            </button>
            <button className="px-3 py-2 bg-green-600 text-white shadow-lg rounded-lg text-sm font-medium hover:bg-green-700">
              Generate Report
            </button>
          </div>

          {/* Real Interactive Map - 3D or 2D based on selection */}
          <div className="relative h-full w-full overflow-hidden">
            {mapView === '3d' ? (
              <Map3D hotspots={hotspots} />
            ) : (
              <MapContainer
                key={mapKey}
                center={[20.5937, 78.9629]}
                zoom={5}
                style={{ height: '100%', width: '100%' }}
                zoomControl={true}
              >
                <TileLayer
                  url={getTileLayerUrl(mapView)}
                  attribution={getTileLayerAttribution(mapView)}
                />
                {/* Add realistic labels overlay for satellite view */}
                {mapView === 'satellite' && (
                  <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}.png"
                    attribution="&copy; CartoDB"
                  />
                )}

                {/* Hotspot Markers with Circles */}
                {hotspots.map((hotspot) => {
                  const color = 
                    hotspot.risk >= 90 ? '#ef4444' :
                    hotspot.risk >= 70 ? '#f97316' :
                    hotspot.risk >= 50 ? '#eab308' : '#3b82f6';
                  
                  return (
                    <div key={hotspot.id}>
                      {/* Risk Circle */}
                      <Circle
                        center={[hotspot.lat, hotspot.lng]}
                        radius={hotspot.risk * 100}
                        pathOptions={{
                          fillColor: color,
                          fillOpacity: 0.3,
                          color: color,
                          weight: 2,
                        }}
                      />
                      {/* Marker */}
                      <Marker position={[hotspot.lat, hotspot.lng]}>
                        <Popup>
                          <div className="p-2">
                            <h3 className="font-bold text-sm mb-1">{hotspot.location}</h3>
                            <p className="text-xs"><strong>Risk Score:</strong> {hotspot.risk}%</p>
                            <p className="text-xs"><strong>Predicted Crimes:</strong> {hotspot.crimes}</p>
                            {hotspot.predicted && (
                              <p className="text-xs text-yellow-600 mt-1">🔮 AI Predicted</p>
                            )}
                          </div>
                        </Popup>
                      </Marker>
                    </div>
                  );
                })}
              </MapContainer>
            )}

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg z-[1000]">
              <h4 className="text-sm font-bold text-gray-900 mb-2">Risk Levels</h4>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span>Critical (90-100)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span>High (70-89)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span>Medium (50-69)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span>Low (0-49)</span>
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-lg max-w-xs z-[1000]">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-gray-900">AI Predictive Model Active</h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Analyzing 8,000+ daily complaints with ML pattern detection. Real-time geospatial modeling enabled.
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-green-600">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span>Live Predictions Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map View Label */}
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-2 rounded-lg shadow-lg text-xs font-semibold text-gray-700 z-[1000]">
              {mapView === 'standard' && '🗺️ Standard Map View'}
              {mapView === 'satellite' && '🛰️ Satellite View'}
              {mapView === 'terrain' && '⛰️ Terrain View'}
              {mapView === '3d' && '🏙️ 3D View'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
