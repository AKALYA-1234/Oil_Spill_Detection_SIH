import { Eye, Search, BarChart2 } from 'lucide-react'
import MapView from '../components/MapView'
import { SAR_SEGMENTED_IMAGES } from '../utils/sarImages'

const metrics = [
  { label: 'Active Spills', value: '01', unit: 'CRITICAL', color: 'var(--accent-red)', unitColor: 'var(--accent-red)' },
  { label: 'Spill Area', value: '12.8', unit: 'km²', color: 'var(--text-primary)', unitColor: 'var(--text-secondary)' },
  { label: 'Confidence', value: '94', unit: '%', color: 'var(--text-primary)', unitColor: 'var(--text-secondary)' },
  { label: 'AIS Candidates', value: '07', unit: 'INTERCEPT READY', color: 'var(--accent-cyan)', unitColor: 'var(--accent-cyan)' },
]

const envData = [
  { label: 'METOCEAN SURFACE WIND', value: '11.8 KTS FROM 220° (SSW)', status: 'STABLE', statusColor: 'var(--accent-green)' },
  { label: 'HYCOM TIDAL CURRENT', value: '0.82 M/S @ BEARING 045°', status: 'SYNCHRONIZED', statusColor: 'var(--accent-cyan)' },
  { label: 'LAGRANGIAN DRIFT BACK-TRACE', value: 'COHERENCE RATIO 0.91', status: 'CORRELATED', statusColor: 'var(--accent-cyan)' },
]

export default function CommandCenter() {
  const activeSarImage = SAR_SEGMENTED_IMAGES[0]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* Metrics strip */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        borderBottom: '1px solid var(--border-primary)',
        flexShrink: 0,
      }}>
        {metrics.map((m, i) => (
          <div key={i} style={{
            padding: '12px 16px',
            borderRight: i < 3 ? '1px solid var(--border-primary)' : 'none',
            display: 'flex', flexDirection: 'column', gap: '4px',
          }}>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'JetBrains Mono', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              {m.label}
              <BarChart2 size={10} color="var(--text-muted)" />
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span className="metric-value" style={{ color: m.color }}>{m.value}</span>
              <span className="metric-unit" style={{ color: m.unitColor }}>{m.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main content area */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Map area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <MapView
            showSpill
            showVessels
            showDriftTrail
            highlightSpill={{ lat: 13.182, lng: 80.314 }}
          />

          {/* Environmental strip */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            borderTop: '1px solid var(--border-primary)',
            flexShrink: 0,
          }}>
            {envData.map((e, i) => (
              <div key={i} style={{
                padding: '8px 12px',
                borderRight: i < 2 ? '1px solid var(--border-primary)' : 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div>
                  <div style={{ fontSize: 9, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'JetBrains Mono' }}>
                    {e.label}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono', marginTop: 2 }}>
                    {e.value}
                  </div>
                </div>
                <span className="tag-active" style={{ color: e.statusColor, borderColor: e.statusColor, background: e.statusColor + '22' }}>
                  {e.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel - Incident Record */}
        <div style={{
          width: 300, flexShrink: 0,
          borderLeft: '1px solid var(--border-primary)',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--border-primary)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Incident Record</span>
            <span className="tag-critical">LIKELY OIL SPILL</span>
          </div>

          <div style={{ flex: 1, overflow: 'auto', padding: '12px' }}>
            {/* Incident ID */}
            <div style={{ marginBottom: 12 }}>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2, fontFamily: 'JetBrains Mono' }}>
                INCIDENT #MG-2026-<br />0921-001
              </h2>
              <p style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 6, lineHeight: 1.5 }}>
                Automated Sentinel-1 Synthetic Aperture Radar detection with temporal AIS correlation.
              </p>
            </div>

            <div className="divider" />

            {/* Data fields */}
            {[
              { label: 'CENTROID COORDINATES', value: activeSarImage.coordinates.formatted },
              { label: 'DETECTION TIMESTAMP', value: activeSarImage.timestamp },
              { label: 'SATELLITE SENSOR', value: activeSarImage.sensor },
              { label: 'DISCHARGE PROBABILITY', value: `HIGH (${activeSarImage.confidence}%)`, valueColor: 'var(--accent-red)' },
              { label: 'CURRENT DRIFT BEARING', value: '048° @ 1.4 kts' },
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', letterSpacing: '0.08em', maxWidth: '45%', lineHeight: 1.4 }}>
                  {f.label}
                </span>
                <span style={{ fontSize: 11, color: f.valueColor || 'var(--text-primary)', fontFamily: 'JetBrains Mono', textAlign: 'right', maxWidth: '50%' }}>
                  {f.value}
                </span>
              </div>
            ))}

            <div className="divider" />

            {/* SAR visualization with REAL SAR Segmented Image */}
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6, display: 'flex', justifyContent: 'space-between' }}>
                <span>SAR SEGMENTATION FRAME #1</span>
                <span style={{ color: 'var(--accent-cyan)' }}>12.8 km²</span>
              </div>
              <div style={{
                height: 100, background: '#010a14',
                borderRadius: 4, border: '1px solid var(--accent-cyan-dim)',
                position: 'relative', overflow: 'hidden'
              }}>
                <img
                  src={activeSarImage.path}
                  alt={activeSarImage.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute', bottom: 4, right: 6,
                  background: 'rgba(0,0,0,0.7)', padding: '2px 6px', borderRadius: 2,
                  fontSize: 8, color: 'var(--accent-cyan)', fontFamily: 'JetBrains Mono'
                }}>
                  SEGMENTED MASK ACTIVE
                </div>
              </div>
            </div>

            <div className="divider" />

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
              <button className="btn-primary" style={{ justifyContent: 'center' }}>
                <Eye size={13} /> VIEW DETECTION
              </button>
              <button className="btn-ghost" style={{ justifyContent: 'center' }}>
                <Search size={13} /> INVESTIGATE VESSELS
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
