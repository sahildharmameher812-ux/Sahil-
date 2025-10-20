import { useState } from 'react';
import DeckGL from '@deck.gl/react';
import { ScatterplotLayer } from '@deck.gl/layers';
import { TileLayer } from '@deck.gl/geo-layers';
import { BitmapLayer } from '@deck.gl/layers';

interface Hotspot {
  id: number;
  location: string;
  lat: number;
  lng: number;
  risk: number;
  crimes: number;
  predicted: boolean;
  color: string;
}

interface Map3DProps {
  hotspots: Hotspot[];
}

export default function Map3D({ hotspots }: Map3DProps) {
  const [viewState] = useState({
    longitude: 78.9629,
    latitude: 20.5937,
    zoom: 4.5,
    pitch: 60, // 3D tilt
    bearing: 0
  });

  // Create satellite tile layer (NO API KEY NEEDED!)
  const tileLayer = new TileLayer({
    data: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    minZoom: 0,
    maxZoom: 19,
    tileSize: 256,
    renderSubLayers: props => {
      const bbox = (props.tile as any).bbox || (props.tile as any).boundingBox || {};
      const {west = -180, south = -90, east = 180, north = 90} = bbox;

      return new BitmapLayer(props, {
        data: undefined,
        image: props.data,
        bounds: [west, south, east, north]
      });
    }
  });

  // Create realistic labels overlay layer
  const labelsLayer = new TileLayer({
    id: 'labels-layer',
    data: 'https://a.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}.png',
    minZoom: 0,
    maxZoom: 19,
    tileSize: 256,
    renderSubLayers: props => {
      const bbox = (props.tile as any).bbox || (props.tile as any).boundingBox || {};
      const {west = -180, south = -90, east = 180, north = 90} = bbox;

      return new BitmapLayer(props, {
        data: undefined,
        image: props.data,
        bounds: [west, south, east, north]
      });
    }
  });

  // Create 3D markers for hotspots
  const scatterplotLayer = new ScatterplotLayer({
    id: 'hotspots',
    data: hotspots,
    getPosition: (d: Hotspot) => [d.lng, d.lat, 5000], // Elevated for 3D effect
    getRadius: (d: Hotspot) => d.risk * 1000,
    getFillColor: (d: Hotspot) => {
      if (d.risk >= 90) return [239, 68, 68, 200];
      if (d.risk >= 70) return [249, 115, 22, 200];
      if (d.risk >= 50) return [234, 179, 8, 200];
      return [59, 130, 246, 200];
    },
    pickable: true,
    opacity: 0.8,
    stroked: true,
    filled: true,
    radiusScale: 1,
    radiusMinPixels: 15,
    radiusMaxPixels: 100,
    lineWidthMinPixels: 3,
    getLineColor: [255, 255, 255],
    getLineWidth: 3
  });

  const getTooltip = ({object}: any) => {
    if (!object) return null;
    const hotspot = object as Hotspot;
    return {
      html: `
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 16px; border-radius: 10px; min-width: 220px; box-shadow: 0 8px 24px rgba(0,0,0,0.3);">
          <div style="font-weight: bold; font-size: 16px; margin-bottom: 10px; border-bottom: 2px solid rgba(255,255,255,0.4); padding-bottom: 8px;">
            ${hotspot.location}
          </div>
          <div style="font-size: 13px; line-height: 2;">
            <div>🎯 <strong>Risk Score:</strong> ${hotspot.risk}%</div>
            <div>⚠️ <strong>Predicted Crimes:</strong> ${hotspot.crimes}</div>
            ${hotspot.predicted ? '<div style="margin-top: 10px; padding: 8px; background: rgba(251, 191, 36, 0.3); border-radius: 6px; font-size: 12px; font-weight: bold;">🔮 AI Predicted Hotspot</div>' : ''}
          </div>
        </div>
      `,
      style: {
        backgroundColor: 'transparent',
        fontSize: '13px'
      }
    };
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <DeckGL
        initialViewState={viewState}
        controller={true}
        layers={[tileLayer, labelsLayer, scatterplotLayer]}
        getTooltip={getTooltip}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
