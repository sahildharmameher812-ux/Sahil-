import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon issue with Leaflet in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Demo hotspot locations across India
const hotspots = [
  {
    id: 1,
    name: 'Mumbai - Andheri East',
    position: [19.1136, 72.8697] as [number, number],
    risk: 'critical',
    predictedAmount: '₹2,45,000',
    confidence: 94,
    atmCount: 3
  },
  {
    id: 2,
    name: 'Delhi - Connaught Place',
    position: [28.6280, 77.2177] as [number, number],
    risk: 'critical',
    predictedAmount: '₹1,85,000',
    confidence: 89,
    atmCount: 5
  },
  {
    id: 3,
    name: 'Bangalore - MG Road',
    position: [12.9716, 77.5946] as [number, number],
    risk: 'high',
    predictedAmount: '₹95,000',
    confidence: 78,
    atmCount: 2
  },
  {
    id: 4,
    name: 'Hyderabad - Banjara Hills',
    position: [17.4126, 78.4484] as [number, number],
    risk: 'high',
    predictedAmount: '₹1,20,000',
    confidence: 82,
    atmCount: 4
  },
  {
    id: 5,
    name: 'Chennai - T Nagar',
    position: [13.0418, 80.2341] as [number, number],
    risk: 'medium',
    predictedAmount: '₹65,000',
    confidence: 71,
    atmCount: 2
  },
  {
    id: 6,
    name: 'Kolkata - Park Street',
    position: [22.5541, 88.3516] as [number, number],
    risk: 'medium',
    predictedAmount: '₹55,000',
    confidence: 68,
    atmCount: 3
  },
  {
    id: 7,
    name: 'Pune - Koregaon Park',
    position: [18.5204, 73.8567] as [number, number],
    risk: 'low',
    predictedAmount: '₹35,000',
    confidence: 62,
    atmCount: 1
  }
];

const getRiskColor = (risk: string) => {
  switch (risk) {
    case 'critical':
      return '#dc2626'; // red-600
    case 'high':
      return '#ea580c'; // orange-600
    case 'medium':
      return '#ca8a04'; // yellow-600
    case 'low':
      return '#2563eb'; // blue-600
    default:
      return '#6b7280'; // gray-500
  }
};

const getRiskSize = (risk: string) => {
  switch (risk) {
    case 'critical':
      return 20;
    case 'high':
      return 16;
    case 'medium':
      return 12;
    case 'low':
      return 8;
    default:
      return 10;
  }
};

// Component to set the map view to India
function SetViewOnClick() {
  const map = useMap();
  
  useEffect(() => {
    // Set initial view to center of India
    map.setView([20.5937, 78.9629], 5);
  }, [map]);

  return null;
}

export default function RiskHeatmapPreview() {
  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
        className="z-0"
      >
        <SetViewOnClick />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {hotspots.map((hotspot) => (
          <CircleMarker
            key={hotspot.id}
            center={hotspot.position}
            radius={getRiskSize(hotspot.risk)}
            pathOptions={{
              fillColor: getRiskColor(hotspot.risk),
              fillOpacity: 0.6,
              color: getRiskColor(hotspot.risk),
              weight: 2,
              opacity: 0.8
            }}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-900">{hotspot.name}</h3>
                  <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${
                    hotspot.risk === 'critical' ? 'bg-red-100 text-red-700' :
                    hotspot.risk === 'high' ? 'bg-orange-100 text-orange-700' :
                    hotspot.risk === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {hotspot.risk}
                  </span>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Predicted Amount:</span>
                    <span className="font-semibold text-red-600">{hotspot.predictedAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">AI Confidence:</span>
                    <span className="font-semibold text-blue-600">{hotspot.confidence}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">ATMs Monitored:</span>
                    <span className="font-semibold text-gray-900">{hotspot.atmCount}</span>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    Click "Expand Map" for detailed view and intervention options
                  </p>
                </div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
      
      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-3 z-10 border border-gray-200">
        <div className="text-xs font-bold text-gray-900 mb-2">Risk Levels</div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-600"></div>
            <span className="text-xs text-gray-700">Critical</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-600"></div>
            <span className="text-xs text-gray-700">High</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-600"></div>
            <span className="text-xs text-gray-700">Medium</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
            <span className="text-xs text-gray-700">Low</span>
          </div>
        </div>
        <div className="mt-2 pt-2 border-t border-gray-200 text-xs text-gray-600">
          {hotspots.length} Active Hotspots
        </div>
      </div>
    </div>
  );
}
