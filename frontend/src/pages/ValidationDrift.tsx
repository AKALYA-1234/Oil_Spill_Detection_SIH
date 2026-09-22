import { useState } from 'react'
import {
  Droplets, ShieldCheck, Wind, Compass, Clock, AlertTriangle,
  RefreshCw, ChevronDown
} from 'lucide-react'
import MapView from '../components/MapView'
import { SAR_SEGMENTED_IMAGES, type SarSegmentedImage } from '../utils/sarImages'

const tabs = ['Overview', 'Drift Simulation', 'Environmental Data', 'Validation Results', 'What-If Analysis']

export default function ValidationDrift() {
  const [selectedTargetCode, setSelectedTargetCode] = useState<string>('SPILL-01')
  const [activeTab, setActiveTab] = useState<string>('Overview')
  const [driftTimeframe, setDriftTimeframe] = useState<string>('48h')
  const [driftDetailTab, setDriftDetailTab] = useState<'trajectory' | 'impact'>('trajectory')

  const currentData: SarSegmentedImage = SAR_SEGMENTED_IMAGES.find(
    img => img.targetCode === selectedTargetCode
  ) || SAR_SEGMENTED_IMAGES[0]

  const lat = currentData.coordinates.lat
  const lng = currentData.coordinates.lon

  // Drift prediction rows (hardcoded)
  const driftRows = [
    { horizon: 'Current', distance: '-', direction: '-', estPosition: `${lat.toFixed(3)}° N, ${lng.toFixed(3)}° E` },
    { horizon: '24 hours', distance: '12.4 km', direction: '62° (ENE)', estPosition: `${(lat + 0.035).toFixed(3)}° N, ${(lng + 0.098).toFixed(3)}° E` },
    { horizon: '48 hours', distance: '28.7 km', direction: '68° (ENE)', estPosition: `${(lat + 0.068).toFixed(3)}° N, ${(lng + 0.211).toFixed(3)}° E` },
    { horizon: '72 hours', distance: '46.1 km', direction: '77° (ENE)', estPosition: `${(lat + 0.092).toFixed(3)}° N, ${(lng + 0.340).toFixed(3)}° E` },
  ]

  // Map layer toggles
  const [mapLayers, setMapLayers] = useState({
    satelliteImagery: true,
    detectedSpill: true,
    driftPrediction24h: true,
    driftPrediction48h: true,
    driftPrediction72h: true,
    uncertaintyCone: true,
    vesselAIS: true,
    coastlinePorts: true,
    environmentalVectors: true,
    protectedAreas: false,
  })

  return (
    <div style={{
      padding: '16px 20px',
      display: 'flex', flexDirection: 'column',
      gap: '14px', height: '100%', overflowY: 'auto',
      background: 'var(--bg-primary)'
    }}>
      {/* Header Bar */}
      <div style={{
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10
      }}>
        <div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', marginBottom: 2 }}>
            Home &gt; <span style={{ color: 'var(--accent-cyan)' }}>Validation &amp; Drift</span>
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: '#fff', margin: 0 }}>
            Validation &amp; Drift
          </h1>
          <p style={{ fontSize: 12, color: 'var(--accent-cyan)', marginTop: 2, fontWeight: 600 }}>
            Verify detected slicks, analyze environment and predict movement
          </p>
          <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
            Combine satellite analysis with environmental data to validate oil spills and simulate drift trajectory.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          {/* Target Selector */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'var(--bg-card)', border: '1px solid var(--border-primary)',
            borderRadius: 4, padding: '6px 12px', fontSize: 11, fontFamily: 'JetBrains Mono'
          }}>
            <Compass size={13} color="var(--accent-cyan)" />
            <select
              value={selectedTargetCode}
              onChange={(e) => setSelectedTargetCode(e.target.value)}
              style={{
                background: 'transparent', border: 'none', color: 'var(--accent-cyan)',
                fontFamily: 'JetBrains Mono', fontSize: 11, fontWeight: 700, outline: 'none', cursor: 'pointer'
              }}
            >
              {SAR_SEGMENTED_IMAGES.map(img => (
                <option key={img.id} value={img.targetCode} style={{ background: '#041525', color: '#e0f4ff' }}>
                  {img.targetCode} (22 Sep 2026 - {img.locationName})
                </option>
              ))}
            </select>
          </div>
          {/* Date Range */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'var(--bg-card)', border: '1px solid var(--border-primary)',
            borderRadius: 4, padding: '6px 12px', fontSize: 10, fontFamily: 'JetBrains Mono', color: 'var(--text-secondary)'
          }}>
            <Clock size={13} color="var(--text-muted)" />
            2025-06-01 00:00 → 2025-06-03 23:59
          </div>
          {/* Recompute Button */}
          <button className="btn-primary" style={{ padding: '7px 14px' }}>
            <RefreshCw size={13} />
            Recompute Drift
          </button>
        </div>
      </div>

      {/* Tab Bar */}
      <div style={{
        display: 'flex', gap: 2, borderBottom: '2px solid var(--border-primary)', paddingBottom: 0
      }}>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '8px 16px', fontSize: 11,
              fontFamily: 'JetBrains Mono', fontWeight: activeTab === tab ? 700 : 500,
              color: activeTab === tab ? 'var(--accent-cyan)' : 'var(--text-muted)',
              background: 'transparent', border: 'none',
              borderBottom: activeTab === tab ? '2px solid var(--accent-cyan)' : '2px solid transparent',
              cursor: 'pointer', transition: 'all 0.15s ease', marginBottom: -2
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* KPI Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
        {[
          { icon: Droplets, label: 'SPILL AREA', value: `${currentData.slickAreaKm2} km²`, sub: `↑ 13%`, subColor: 'var(--accent-green)', color: 'var(--accent-cyan)' },
          { icon: ShieldCheck, label: 'CONFIDENCE', value: `${currentData.confidence}%`, sub: currentData.validation.status, subColor: 'var(--accent-green)', color: '#fff' },
          { icon: Wind, label: 'DRIFT SPEED (AVG)', value: '1.4 knots', sub: '±0.3 kts', subColor: 'var(--text-muted)', color: '#fff' },
          { icon: Compass, label: 'PREDICTED DISACT', value: '28.7 km', sub: 'Coastline in 48h', subColor: 'var(--accent-amber)', color: 'var(--accent-cyan)' },
          { icon: Clock, label: 'TIME TO COAST', value: '34 hours', sub: 'Estimated arrival', subColor: 'var(--text-muted)', color: '#fff' },
        ].map((card, i) => (
          <div key={i} className="glass-card" style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <card.icon size={16} color="var(--accent-cyan)" />
              <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', letterSpacing: '0.08em' }}>{card.label}</span>
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: card.color, fontFamily: 'JetBrains Mono' }}>{card.value}</div>
            <div style={{ fontSize: 10, color: card.subColor, fontWeight: 600 }}>{card.sub}</div>
          </div>
        ))}
      </div>

      {/* Main Content: Map & Environmental Panel */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 12, minHeight: 420 }}>
        {/* Left: Map */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{
            padding: '10px 14px', borderBottom: '1px solid var(--border-primary)',
            background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0
          }}>
            <div style={{ fontSize: 12, fontWeight: 700, fontFamily: 'JetBrains Mono', color: '#fff', letterSpacing: '0.04em' }}>
              SPILL VALIDATION &amp; DRIFT PREDICTION MAP
            </div>
            {/* Timeframe Buttons */}
            <div style={{ display: 'flex', gap: 2 }}>
              {['Live', '24h', '48h', '72h'].map(tf => (
                <button
                  key={tf}
                  onClick={() => setDriftTimeframe(tf)}
                  style={{
                    padding: '3px 10px', fontSize: 10, fontFamily: 'JetBrains Mono', fontWeight: 600,
                    background: driftTimeframe === tf ? 'var(--accent-cyan)' : 'var(--bg-card)',
                    color: driftTimeframe === tf ? '#000' : 'var(--text-muted)',
                    border: `1px solid ${driftTimeframe === tf ? 'var(--accent-cyan)' : 'var(--border-primary)'}`,
                    borderRadius: 2, cursor: 'pointer'
                  }}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* Map Body */}
          <div style={{ flex: 1, position: 'relative', minHeight: 340 }}>
            <MapView
              center={[lat, lng]}
              zoom={11}
              showSpill showVessels showDriftTrail
              highlightSpill={{ lat, lng }}
            />

            {/* Map Layers Panel */}
            <div style={{
              position: 'absolute', top: 14, left: 14, zIndex: 1000,
              background: 'rgba(4, 21, 37, 0.92)', backdropFilter: 'blur(8px)',
              border: '1px solid var(--border-primary)', borderRadius: 4,
              padding: '10px 12px', width: 195, boxShadow: '0 4px 16px rgba(0,0,0,0.5)'
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

            {/* Drift Legend */}
            <div style={{
              position: 'absolute', top: 14, right: 14, zIndex: 1000,
              background: 'rgba(4, 21, 37, 0.92)', backdropFilter: 'blur(8px)',
              border: '1px solid var(--border-primary)', borderRadius: 4,
              padding: '8px 12px', fontSize: 9, fontFamily: 'JetBrains Mono', color: 'var(--text-secondary)'
            }}>
              <div style={{ fontWeight: 700, marginBottom: 4, color: '#fff' }}>Legend</div>
              {[
                { color: '#ff3355', label: 'Current Spill', dash: false },
                { color: '#00ccff', label: '24h Drift', dash: true },
                { color: '#00aadd', label: '48h Drift', dash: true },
                { color: '#0088bb', label: '72h Drift', dash: true },
                { color: 'rgba(0,204,255,0.2)', label: 'Uncertainty Cone', dash: false },
                { color: '#00ff88', label: 'Vessel (AIS)', dash: false },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>
                  <span style={{
                    width: item.dash ? 14 : 8, height: item.dash ? 2 : 8,
                    background: item.color, borderRadius: item.dash ? 0 : 2,
                    border: item.dash ? `1px dashed ${item.color}` : 'none'
                  }} />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Environmental + Drift Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Environmental Conditions Card */}
          <div className="glass-card" style={{ padding: '14px' }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12
            }}>
              <span style={{ fontSize: 12, fontWeight: 700, fontFamily: 'JetBrains Mono', color: '#fff', letterSpacing: '0.04em' }}>
                ENVIRONMENTAL CONDITIONS
              </span>
              <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>2025-06-02 12:09 UTC</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { icon: Wind, label: 'Wind Speed', value: currentData.validation.windSpeed, extra: 'Wind Direction', extraVal: 'NE (46°)' },
                { icon: Droplets, label: 'Wave Height', value: currentData.validation.waveHeight, extra: 'Ocean Current', extraVal: `${currentData.validation.oceanCurrent} (NE)` },
              ].map((item, i) => (
                <div key={i} style={{
                  background: 'var(--bg-primary)', border: '1px solid var(--border-primary)',
                  borderRadius: 3, padding: '10px', display: 'flex', flexDirection: 'column', gap: 6
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <item.icon size={13} color="var(--accent-cyan)" />
                    <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>{item.label}</span>
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: '#fff', fontFamily: 'JetBrains Mono' }}>{item.value}</div>
                  <div style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>
                    {item.extra}: <span style={{ color: 'var(--accent-cyan)' }}>{item.extraVal}</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              marginTop: 10, padding: '8px 10px', background: 'var(--bg-primary)',
              border: '1px solid var(--border-primary)', borderRadius: 3
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Droplets size={13} color="var(--accent-cyan)" />
                <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>Sea Surface Temp</span>
              </div>
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent-cyan)', fontFamily: 'JetBrains Mono' }}>28.5 °C</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>Weather Conditions</span>
                <span style={{ fontSize: 10, color: 'var(--accent-green)', fontFamily: 'JetBrains Mono', fontWeight: 700 }}>Clear</span>
              </div>
            </div>
          </div>

          {/* Drift Prediction Details Card */}
          <div className="glass-card" style={{ padding: '14px', flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 12, fontWeight: 700, fontFamily: 'JetBrains Mono', color: '#fff', letterSpacing: '0.04em' }}>
                DRIFT PREDICTION DETAILS
              </span>
              <div style={{ display: 'flex', gap: 2 }}>
                {['trajectory', 'impact'].map(t => (
                  <button
                    key={t}
                    onClick={() => setDriftDetailTab(t as any)}
                    style={{
                      padding: '3px 10px', fontSize: 9, fontFamily: 'JetBrains Mono', fontWeight: 600,
                      background: driftDetailTab === t ? 'var(--accent-cyan)' : 'var(--bg-card)',
                      color: driftDetailTab === t ? '#000' : 'var(--text-muted)',
                      border: `1px solid ${driftDetailTab === t ? 'var(--accent-cyan)' : 'var(--border-primary)'}`,
                      borderRadius: 2, cursor: 'pointer', textTransform: 'capitalize'
                    }}
                  >
                    {t === 'trajectory' ? 'Trajectory' : 'Impact Analysis'}
                  </button>
                ))}
              </div>
            </div>

            {/* Drift Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 10, fontFamily: 'JetBrains Mono' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-primary)' }}>
                  {['HORIZON', 'DISTANCE', 'DIRECTION', 'EST. POSITION'].map(h => (
                    <th key={h} style={{ padding: '6px 8px', textAlign: 'left', fontSize: 8, color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.08em' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {driftRows.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border-primary)' }}>
                    <td style={{ padding: '6px 8px', color: '#fff', fontWeight: 600 }}>{row.horizon}</td>
                    <td style={{ padding: '6px 8px', color: i === 0 ? 'var(--text-muted)' : 'var(--accent-cyan)' }}>{row.distance}</td>
                    <td style={{ padding: '6px 8px', color: 'var(--text-secondary)' }}>{row.direction}</td>
                    <td style={{ padding: '6px 8px', color: 'var(--text-secondary)', fontSize: 9 }}>{row.estPosition}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Potential Coastal Impact Alert */}
            <div style={{
              marginTop: 14, padding: '10px 12px',
              background: 'rgba(255, 183, 0, 0.08)', border: '1px solid rgba(255, 183, 0, 0.3)',
              borderRadius: 4, display: 'flex', alignItems: 'flex-start', gap: 8
            }}>
              <AlertTriangle size={16} color="var(--accent-amber)" style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent-amber)', fontFamily: 'JetBrains Mono', marginBottom: 2 }}>
                  Potential Coastal Impact
                </div>
                <div style={{ fontSize: 10, color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  The spill is likely to reach the coastline within 34 hours.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
