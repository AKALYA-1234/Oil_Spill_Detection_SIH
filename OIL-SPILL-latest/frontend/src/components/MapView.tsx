import { MapContainer, TileLayer, Polygon, Polyline, CircleMarker, Popup, Marker } from 'react-leaflet'
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
          background: rgba(2, 11, 24, 0.85);
          color: ${color};
          border: 1px solid ${color};
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          font-weight: 700;
          padding: 1px 4px;
          border-radius: 2px;
          margin-top: 2px;
          white-space: nowrap;
        ">${label}</div>
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0]
  })
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
  center = [13.0827, 80.2707], // Chennai waters
  zoom = 11,
  showSpill = true,
  showVessels = true,
  showDriftTrail = true,
  height = '100%'
}: MapViewProps) {
  // Spill polygon around Chennai coastal channel
  const spillPolygon: [number, number][] = [
    [13.195, 80.325],
    [13.185, 80.335],
    [13.170, 80.320],
    [13.165, 80.300],
    [13.180, 80.295],
    [13.192, 80.310],
  ]

  // Backtrack drift trail (probable origin)
  const driftTrail: [number, number][] = [
    [13.164, 80.287], // Origin
    [13.172, 80.298],
    [13.182, 80.314], // Current centroid
    [13.238, 80.368], // Forward predicted
  ]

  const vessels = [
    { name: 'SUSPECT #01: TANKER "OCEAN VANGUARD"', lat: 13.192, lng: 80.320, color: '#00ccff', mmsi: '563094820', speed: '14.1 KTS', status: 'CRITICAL SUSPECT' },
    { name: 'CARGO "PACIFIC GLORY"', lat: 13.155, lng: 80.340, color: '#7ab8d4', mmsi: '413298110', speed: '12.4 KTS', status: 'TRAVERSED WINDOW' },
    { name: 'BULK "ASIAN PIONEER"', lat: 13.130, lng: 80.270, color: '#3d6a82', mmsi: '352001920', speed: '10.2 KTS', status: 'PERIPHERAL' },
    { name: 'ICGS VAJRA (RESPONSE)', lat: 13.060, lng: 80.290, color: '#00ff88', mmsi: '419000112', speed: '18.5 KTS', status: 'INTERCEPT READY' },
  ]

  return (
    <div style={{ height, width: '100%', position: 'relative', background: '#020b18', overflow: 'hidden' }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%', background: '#020b18' }}
        zoomControl={false}
      >
        {/* Public dark-styled OpenStreetMap tile layer without API key requirement */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />

        {/* Oil Spill Polygon */}
        {showSpill && (
          <Polygon
            positions={spillPolygon}
            pathOptions={{
              color: '#ff3355',
              fillColor: '#ff3355',
              fillOpacity: 0.45,
              weight: 2,
              dashArray: '4, 4'
            }}
          >
            <Popup>
              <div style={{ fontFamily: 'JetBrains Mono', color: '#fff' }}>
                <strong style={{ color: '#ff3355' }}>OIL SPILL DETECTED</strong><br />
                Area: 12.8 km²<br />
                Confidence: 94%<br />
                Centroid: 13.182° N, 80.314° E
              </div>
            </Popup>
          </Polygon>
        )}

        {/* Drift Backtrack / Forward trajectory line */}
        {showDriftTrail && (
          <>
            <Polyline
              positions={driftTrail}
              pathOptions={{
                color: '#00ccff',
                weight: 2,
                dashArray: '6, 6'
              }}
            />
            {/* Origin marker */}
            <CircleMarker
              center={[13.164, 80.287]}
              radius={6}
              pathOptions={{ color: '#ffb700', fillColor: '#ffb700', fillOpacity: 0.8 }}
            >
              <Popup>
                <div style={{ fontFamily: 'JetBrains Mono' }}>
                  <strong>PROBABLE ORIGIN</strong><br />
                  13.164° N, 80.287° E<br />
                  Est. Discharge: T-04:22 HRS
                </div>
              </Popup>
            </CircleMarker>
          </>
        )}

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

      {/* Tactical HUD Overlay Elements */}
      <div style={{
        position: 'absolute', top: 12, left: 12, zIndex: 1000,
        background: 'rgba(4, 21, 37, 0.85)',
        backdropFilter: 'blur(8px)',
        border: '1px solid var(--border-primary)',
        padding: '8px 12px',
        borderRadius: 4,
        fontFamily: 'JetBrains Mono',
        fontSize: 10,
        color: 'var(--text-secondary)'
      }}>
        <div style={{ color: 'var(--accent-cyan)', fontWeight: 700, marginBottom: 2 }}>
          RADAR CONVERGENCE: 13.182° N, 80.314° E
        </div>
        <div>SWATH: SENTINEL-1A C-SAR IW MODE (VV/VH)</div>
        <div style={{ color: 'var(--accent-amber)', marginTop: 2 }}>
          DRIFT VELOCITY: 1.4 KTS @ 048°
        </div>
      </div>

      {/* Legend at bottom left */}
      <div style={{
        position: 'absolute', bottom: 12, left: 12, zIndex: 1000,
        background: 'rgba(4, 21, 37, 0.85)',
        backdropFilter: 'blur(8px)',
        border: '1px solid var(--border-primary)',
        padding: '6px 12px',
        borderRadius: 4,
        display: 'flex', alignItems: 'center', gap: '16px',
        fontFamily: 'JetBrains Mono', fontSize: 9
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 12, height: 2, background: '#00ccff', border: '1px dashed #00ccff' }} />
          <span>SHIPPING CHANNEL</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 10, height: 10, background: '#ff335588', border: '1px solid #ff3355', borderRadius: 2 }} />
          <span>DISCHARGE TRAIL</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 8, height: 8, background: '#00ff88', borderRadius: '50%' }} />
          <span>RESPONSE ASSET</span>
        </div>
      </div>
    </div>
  )
}
