import { useState } from 'react'
import {
  AlertTriangle, Share2, FileDown, ChevronRight,
  Anchor, Radio, Shield, Droplets, Wind, Thermometer, Clock
} from 'lucide-react'
import MapView from '../components/MapView'
import { SAR_SEGMENTED_IMAGES } from '../utils/sarImages'

const currentSpill = SAR_SEGMENTED_IMAGES[0]

const statusPipeline = [
  { label: 'Detected', done: true },
  { label: 'Validated', done: true },
  { label: 'Source Estimated', done: true },
  { label: 'AIS Analyzed', done: true },
  { label: 'Alert Ready', done: true },
  { label: 'Response Active', done: false },
]

const responseAssets = [
  { name: 'ICGS Vajra', status: 'On Route', statusColor: 'var(--accent-green)', eta: '1.8 hrs', dist: '13 km', icon: Anchor },
  { name: 'ICGS Samudra Prahari', status: 'Standby', statusColor: 'var(--accent-amber)', eta: '4.2 hrs', dist: '42 km', icon: Shield },
  { name: 'DRS Station', status: 'Available', statusColor: 'var(--accent-green)', eta: '1 hrs', dist: '15 km', icon: Radio },
  { name: 'Air Surveillance (Do-228)', status: 'Available', statusColor: 'var(--accent-green)', eta: 'Ready', dist: '0.1 km', icon: Shield },
]

const impactZones = [
  { zone: 'Chennai Coastline', time: '~ 24 hours', risk: 'High', riskColor: 'var(--accent-red)' },
  { zone: 'Ennore Port', time: '~ 38 hours', risk: 'Moderate', riskColor: 'var(--accent-amber)' },
  { zone: 'Pulicat Lake (Sensitive)', time: '~ 52 hours', risk: 'Moderate', riskColor: 'var(--accent-amber)' },
  { zone: 'Fisheries Zone', time: '~ 84 hours', risk: 'Low', riskColor: 'var(--accent-green)' },
]

export default function EmergencyResponse() {
  const [mapLayers, setMapLayers] = useState({
    satelliteImagery: true,
    detectedSpill: true,
    driftPrediction24h: true,
    driftPrediction48h: true,
    driftPrediction72h: true,
    vesselSuspicious: true,
    vesselOther: true,
    responseVessel: true,
    coastlinePorts: true,
    sensitiveAreas: false,
    eezBoundary: false,
  })

  return (
    <div style={{
      padding: '16px 20px', display: 'flex', flexDirection: 'column',
      gap: '14px', height: '100%', overflowY: 'auto', background: 'var(--bg-primary)'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
        <div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', marginBottom: 2 }}>
            Home &gt; <span style={{ color: 'var(--accent-cyan)' }}>Emergency Response</span>
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: '#fff', margin: 0 }}>Emergency Response</h1>
          <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
            Take action on confirmed or high-probability oil spills with real-time situational awareness and coordination tools.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button className="btn-critical" style={{ padding: '7px 14px' }}>
            <AlertTriangle size={13} /> Escalate to Tier 3
          </button>
          <button className="btn-ghost" style={{ padding: '7px 14px' }}>
            <Share2 size={13} /> Share
          </button>
          <button className="btn-primary" style={{ padding: '7px 14px' }}>
            <FileDown size={13} /> Generate Report
          </button>
        </div>
      </div>

      {/* Incident Banner + Status Pipeline */}
      <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border-primary)',
        borderRadius: 4, padding: '10px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="tag-critical" style={{ fontSize: 10 }}>INCIDENT TIER 2 : ACTIVE</span>
          <span style={{ fontSize: 10, color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono' }}>
            Ref: NTC-2026-09-0911 | Sector: Coromandel East (Chennai Deepwater)
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {statusPipeline.map((step, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{
                fontSize: 9, fontFamily: 'JetBrains Mono', fontWeight: 600,
                color: step.done ? 'var(--accent-green)' : 'var(--text-muted)'
              }}>
                {step.done ? '●' : '○'} {step.label}
              </span>
              {i < statusPipeline.length - 1 && (
                <ChevronRight size={10} color="var(--text-muted)" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content: Map + Alert Panel */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 370px', gap: 12, minHeight: 380 }}>
        {/* Left: Map */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
          <div style={{ flex: 1, position: 'relative', minHeight: 340 }}>
            <MapView
              center={[currentSpill.coordinates.lat, currentSpill.coordinates.lon]}
              zoom={11}
              showSpill showVessels showDriftTrail
              highlightSpill={{ lat: currentSpill.coordinates.lat, lng: currentSpill.coordinates.lon }}
            />

            {/* Map Layers Panel */}
            <div style={{
              position: 'absolute', top: 14, left: 14, zIndex: 1000,
              background: 'rgba(4, 21, 37, 0.92)', backdropFilter: 'blur(8px)',
              border: '1px solid var(--border-primary)', borderRadius: 4,
              padding: '10px 12px', width: 200, boxShadow: '0 4px 16px rgba(0,0,0,0.5)'
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, fontFamily: 'JetBrains Mono', color: 'var(--text-secondary)', marginBottom: 8 }}>Map Layers</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5, fontSize: 10, fontFamily: 'JetBrains Mono' }}>
                {Object.entries(mapLayers).map(([key, val]) => (
                  <label key={key} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', color: val ? '#fff' : 'var(--text-muted)' }}>
                    <input
                      type="checkbox" checked={val}
                      onChange={() => setMapLayers(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))}
                      style={{ accentColor: 'var(--accent-cyan)', cursor: 'pointer' }}
                    />
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()).replace(/(\d+)/, ' ($1)')}
                  </label>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div style={{
              position: 'absolute', top: 14, right: 14, zIndex: 1000,
              background: 'rgba(4, 21, 37, 0.92)', backdropFilter: 'blur(8px)',
              border: '1px solid var(--border-primary)', borderRadius: 4,
              padding: '8px 12px', fontSize: 9, fontFamily: 'JetBrains Mono', color: 'var(--text-secondary)'
            }}>
              {[
                { color: '#ff3355', label: 'Current Spill' },
                { color: '#00ccff', label: '24h Drift' },
                { color: '#0088bb', label: '48h Drift' },
                { color: '#006699', label: '72h Drift' },
                { color: '#ff3355', label: 'Vessel (Suspicious)' },
                { color: '#7ab8d4', label: 'Vessel (Other)' },
                { color: '#00ff88', label: 'Response Vessel' },
                { color: '#fff', label: 'Port' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>
                  <span style={{ width: 8, height: 8, background: item.color, borderRadius: 2 }} />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

            {/* Coordinates Overlay */}
            <div style={{
              position: 'absolute', bottom: 8, left: 14, zIndex: 1000,
              fontSize: 9, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono'
            }}>
              {currentSpill.coordinates.formatted}
            </div>
          </div>
        </div>

        {/* Right: Alert Panel + Weather + Recommendations */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Maritime Oil Spill Alert */}
          <div className="glass-card" style={{ padding: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <AlertTriangle size={14} color="var(--accent-red)" />
                <span style={{ fontSize: 12, fontWeight: 700, fontFamily: 'JetBrains Mono', color: '#fff' }}>
                  MARITIME OIL SPILL ALERT
                </span>
              </div>
              <span className="tag-critical">CRITICAL</span>
            </div>

            <div style={{ fontSize: 10, fontFamily: 'JetBrains Mono', display: 'flex', flexDirection: 'column', gap: 5 }}>
              {[
                { label: 'Incident Ref', value: 'NTC-2026-09-0911' },
                { label: 'Detected', value: '2026-09-21 05:31 UTC (16 Min ago)' },
                { label: 'Location (Centroid)', value: currentSpill.coordinates.formatted },
                { label: 'Confidence', value: `${currentSpill.confidence}%`, valueColor: 'var(--accent-red)' },
                { label: 'Probable Origin', value: `${(currentSpill.coordinates.lat - 0.018).toFixed(3)}°N, ${(currentSpill.coordinates.lon - 0.025).toFixed(3)}°E` },
                { label: 'Sector', value: 'Coromandel East (Chennai Deepwater)' },
              ].map((f, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>{f.label}</span>
                  <span style={{ color: f.valueColor || 'var(--text-primary)', fontWeight: 600 }}>{f.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Weather & Ocean Conditions */}
          <div className="glass-card" style={{ padding: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 11, fontWeight: 700, fontFamily: 'JetBrains Mono', color: '#fff' }}>
                WEATHER &amp; OCEAN CONDITIONS
              </span>
              <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>Last Updated: 13:50 UTC</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {[
                { icon: Wind, label: 'Wind', value: '11.2 kts', sub: 'SE (140°)' },
                { icon: Droplets, label: 'Wave Height', value: '1.1 m', sub: 'Moderate' },
                { icon: Clock, label: 'Sea Current', value: '0.68 m/s', sub: '' },
                { icon: Thermometer, label: 'Sea Surface Temp', value: '28.4 °C', sub: '' },
              ].map((item, i) => (
                <div key={i} style={{
                  background: 'var(--bg-primary)', border: '1px solid var(--border-primary)',
                  borderRadius: 3, padding: '8px', display: 'flex', flexDirection: 'column', gap: 3
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <item.icon size={11} color="var(--accent-cyan)" />
                    <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>{item.label}</span>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: '#fff', fontFamily: 'JetBrains Mono' }}>{item.value}</div>
                  {item.sub && <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>{item.sub}</div>}
                </div>
              ))}
            </div>
          </div>

          {/* Response Recommendations */}
          <div className="glass-card" style={{ padding: '14px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, fontFamily: 'JetBrains Mono', color: '#fff', marginBottom: 8 }}>
              RESPONSE RECOMMENDATIONS
            </div>
            <div style={{ fontSize: 9, color: 'var(--accent-cyan)', fontFamily: 'JetBrains Mono', marginBottom: 8 }}>
              Priority Actions (AI Suggested):
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 10, fontFamily: 'JetBrains Mono' }}>
              {[
                'Deploy surveillance vessel for visual confirmation',
                'Alert nearest response vessels (ICGS)',
                'Prepare containment boom (estimated 2 km)',
              ].map((action, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--accent-red)', fontWeight: 700, flexShrink: 0 }}>●</span>
                  <span>{action}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Drift Forecast + Impact Zones + Response Assets */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
        {/* Drift Forecast */}
        <div className="glass-card" style={{ padding: '14px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, fontFamily: 'JetBrains Mono', color: '#fff', marginBottom: 10 }}>
            DRIFT FORECAST (AREA IMPACT)
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {[
              { time: '24 HOURS', dist: '28.7 km²', sub: '+ Tidal Coastline', distColor: '#fff' },
              { time: '48 HOURS', dist: '46.1 km²', sub: '+ Tidal / Creek Zone', distColor: 'var(--accent-amber)' },
              { time: '72 HOURS', dist: '78.4 km²', sub: '+ High Risk Coastline', distColor: 'var(--accent-red)' },
            ].map((item, i) => (
              <div key={i} style={{
                background: 'var(--bg-primary)', border: '1px solid var(--border-primary)',
                borderRadius: 3, padding: '8px', textAlign: 'center'
              }}>
                <div style={{ fontSize: 8, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', letterSpacing: '0.08em', marginBottom: 4 }}>{item.time}</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: item.distColor, fontFamily: 'JetBrains Mono' }}>{item.dist}</div>
                <div style={{ fontSize: 8, color: 'var(--text-muted)', marginTop: 2 }}>{item.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Potential Impact Zones */}
        <div className="glass-card" style={{ padding: '14px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, fontFamily: 'JetBrains Mono', color: '#fff', marginBottom: 10 }}>
            POTENTIAL IMPACT ZONES
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {impactZones.map((zone, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                fontSize: 10, fontFamily: 'JetBrains Mono',
                padding: '4px 0', borderBottom: i < impactZones.length - 1 ? '1px dashed var(--border-primary)' : 'none'
              }}>
                <span style={{ color: 'var(--text-secondary)' }}>{zone.zone}</span>
                <span style={{ color: 'var(--text-muted)' }}>{zone.time}</span>
                <span style={{
                  background: zone.riskColor + '22', color: zone.riskColor,
                  border: `1px solid ${zone.riskColor}`,
                  padding: '1px 8px', borderRadius: 2, fontSize: 9, fontWeight: 700
                }}>
                  {zone.risk}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Available Response Assets */}
        <div className="glass-card" style={{ padding: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: 11, fontWeight: 700, fontFamily: 'JetBrains Mono', color: '#fff' }}>
              AVAILABLE RESPONSE ASSETS
            </span>
            <span style={{ fontSize: 9, color: 'var(--accent-cyan)', fontFamily: 'JetBrains Mono', cursor: 'pointer' }}>View All</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {responseAssets.map((asset, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                fontSize: 10, fontFamily: 'JetBrains Mono',
                padding: '4px 0', borderBottom: i < responseAssets.length - 1 ? '1px dashed var(--border-primary)' : 'none'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <asset.icon size={12} color="var(--accent-cyan)" />
                  <span style={{ color: '#fff', fontWeight: 600 }}>{asset.name}</span>
                </div>
                <span style={{ color: asset.statusColor, fontSize: 9 }}>● {asset.status}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: 9 }}>{asset.dist} · {asset.eta}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
