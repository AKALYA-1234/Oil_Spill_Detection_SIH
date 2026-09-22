import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Polygon, Polyline, CircleMarker, Popup, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Custom vessel marker icon
const createVesselIcon = (color: string, label: string) => {
  return L.divIcon({
    className: 'custom-vessel-marker',
    html: `
      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        transform: translate(-50%, -50%);
      ">
        <div style="
          width: 14px;
          height: 14px;
          background: ${color};
          border: 2px solid #000;
          border-radius: 50%;
          box-shadow: 0 0 10px ${color};
        "></div>
        <div style="
          background: rgba(2, 11, 24, 0.9);
          color: ${color};
          border: 1px solid ${color};
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          font-weight: 700;
          padding: 1px 5px;
          border-radius: 2px;
          margin-top: 2px;
          white-space: nowrap;
          box-shadow: 0 2px 6px rgba(0,0,0,0.6);
        ">${label}</div>
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0]
  })
}

// Component to dynamically re-center map when props change
function MapRecenter({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center, zoom)
  }, [center, zoom, map])
  return null
}

interface MapViewProps {
  center?: [number, number]
  zoom?: number
  showSpill?: boolean
  showVessels?: boolean
  showDriftTrail?: boolean
  highlightSpill?: { lat: number; lng: number }
  height?: string
}

export default function MapView({
  center = [13.182, 80.314], // Chennai / Ennore waters
  zoom = 12,
  showSpill = true,
  showVessels = true,
  showDriftTrail = true,
  height = '100%'
}: MapViewProps) {
  const [mapCenter, setMapCenter] = useState<[number, number]>(center)

  useEffect(() => {
    setMapCenter(center)
  }, [center[0], center[1]])

  // Calculate slick polygon points around centroid
  const [lat, lng] = mapCenter
  const spillPolygon: [number, number][] = [
    [lat + 0.015, lng - 0.008],
    [lat + 0.022, lng + 0.012],
    [lat + 0.005, lng + 0.025],
    [lat - 0.012, lng + 0.018],
    [lat - 0.018, lng - 0.005],
    [lat - 0.008, lng - 0.022],
    [lat + 0.008, lng - 0.015],
  ]

  // Drift trajectory line
  const driftTrail: [number, number][] = [
    [lat - 0.018, lng - 0.025], // Origin
    [lat - 0.008, lng - 0.012],
    [lat, lng],                 // Current centroid
    [lat + 0.025, lng + 0.032], // Forward 24h drift prediction
  ]

  const vessels = [
    { name: 'SUSPECT #01: TANKER "OCEAN VANGUARD"', lat: lat + 0.008, lng: lng + 0.006, color: '#ff3355', mmsi: '563094820', speed: '14.1 KTS', status: 'CRITICAL SUSPECT' },
    { name: 'CARGO "PACIFIC GLORY"', lat: lat - 0.018, lng: lng + 0.028, color: '#00ccff', mmsi: '413298110', speed: '12.4 KTS', status: 'TRAVERSED WINDOW' },
    { name: 'BULK "ASIAN PIONEER"', lat: lat - 0.025, lng: lng - 0.015, color: '#7ab8d4', mmsi: '352001920', speed: '10.2 KTS', status: 'PERIPHERAL' },
    { name: 'ICGS VAJRA (RESPONSE)', lat: lat - 0.045, lng: lng + 0.002, color: '#00ff88', mmsi: '419000112', speed: '18.5 KTS', status: 'INTERCEPT READY' },
  ]

  return (
    <div style={{ height, width: '100%', position: 'relative', background: '#020b18', overflow: 'hidden' }}>
      <MapContainer
        center={mapCenter}
        zoom={zoom}
        style={{ height: '100%', width: '100%', background: '#020b18' }}
        zoomControl={false}
      >
        <MapRecenter center={mapCenter} zoom={zoom} />

        {/* Free Esri World Imagery Satellite Tile Layer (NO API KEY REQUIRED, NO WATERMARK) */}
        <TileLayer
          attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          maxZoom={18}
        />

        {/* Dark Tactical Overlay Filter for Tactical Operations Aesthetic */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(2, 11, 24, 0.45)',
          mixBlendMode: 'multiply',
          pointerEvents: 'none',
          zIndex: 400
        }} />

        {/* Oil Spill Polygon */}
        {showSpill && (
          <Polygon
            positions={spillPolygon}
            pathOptions={{
              color: '#ff3355',
              fillColor: '#ff3355',
              fillOpacity: 0.55,
              weight: 2,
              dashArray: '5, 5'
            }}
          >
            <Popup>
              <div style={{ fontFamily: 'JetBrains Mono', color: '#fff', fontSize: 11 }}>
                <strong style={{ color: '#ff3355' }}>OIL SPILL ANOMALY</strong><br />
                Centroid: {lat.toFixed(3)}° N, {lng.toFixed(3)}° E<br />
                Status: HIGH RISK SLICK
              </div>
            </Popup>
          </Polygon>
        )}

        {/* Drift Backtrack / Forward Trajectory Vector */}
        {showDriftTrail && (
          <>
            <Polyline
              positions={driftTrail}
              pathOptions={{
                color: '#00ccff',
                weight: 2.5,
                dashArray: '6, 6'
              }}
            />
            {/* Predicted 24h Position Marker */}
            <CircleMarker
              center={[lat + 0.025, lng + 0.032]}
              radius={6}
              pathOptions={{ color: '#ffb700', fillColor: '#ffb700', fillOpacity: 0.9 }}
            >
              <Popup>
                <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11 }}>
                  <strong style={{ color: '#ffb700' }}>PREDICTED 24H DRIFT POSITION</strong><br />
                  Est. Position: {(lat + 0.025).toFixed(3)}° N, {(lng + 0.032).toFixed(3)}° E
                </div>
              </Popup>
            </CircleMarker>
          </>
        )}

        {/* Centroid Marker */}
        <CircleMarker
          center={mapCenter}
          radius={5}
          pathOptions={{ color: '#ffffff', fillColor: '#ff3355', fillOpacity: 1, weight: 2 }}
        >
          <Popup>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11 }}>
              <strong style={{ color: '#ffffff' }}>SPILL CENTROID</strong><br />
              {lat.toFixed(3)}° N, {lng.toFixed(3)}° E
            </div>
          </Popup>
        </CircleMarker>

        {/* AIS Vessels */}
        {showVessels && vessels.map((v, idx) => (
          <Marker
            key={idx}
            position={[v.lat, v.lng]}
            icon={createVesselIcon(v.color, v.name.split(' ')[0] + ' ' + (v.name.split(' ')[1] || ''))}
          >
            <Popup>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#e0f4ff' }}>
                <strong style={{ color: v.color }}>{v.name}</strong><br />
                MMSI: {v.mmsi}<br />
                Speed: {v.speed}<br />
                Status: {v.status}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Legend overlay at bottom right */}
      <div style={{
        position: 'absolute', bottom: 12, right: 12, zIndex: 1000,
        background: 'rgba(4, 21, 37, 0.9)',
        backdropFilter: 'blur(8px)',
        border: '1px solid var(--border-primary)',
        padding: '6px 12px',
        borderRadius: 4,
        display: 'flex', alignItems: 'center', gap: '14px',
        fontFamily: 'JetBrains Mono', fontSize: 9,
        color: 'var(--text-secondary)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 10, height: 10, background: 'rgba(255,51,85,0.6)', border: '1px solid #ff3355', borderRadius: 2 }} />
          <span>SPILL POLYGON</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 12, height: 2, background: '#00ccff', border: '1px dashed #00ccff' }} />
          <span>PREDICTED DRIFT</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 7, height: 7, background: '#00ff88', borderRadius: '50%' }} />
          <span>AIS ASSETS</span>
        </div>
      </div>
    </div>
  )
}
