import { useState } from 'react'
import { Play } from 'lucide-react'
import MapView from '../components/MapView'

const candidates = [
  {
    id: 1,
    name: 'MV OCEAN STAR',
    imo: '9482718',
    type: 'CRUDE OIL TANKER',
    priority: 87,
    tag: 'HIGH PROXIMITY',
    sog: '11.4 kts',
    cog: '042°',
    interceptTime: '03:52 UTC',
    flag: 'PANAMA (PA)',
    distance: '1.8 km',
    timeAlign: 'High (±8 min)',
    trajMatch: 'Very High (94.2%)',
    anomaly: 'Detected (Speed Drop)',
    aisGap: 'Present (40m Silence)'
  },
  {
    id: 2,
    name: 'MV BLUE WAVE',
    imo: '9318842',
    type: 'BULK CARRIER',
    priority: 64,
    tag: 'PARALLEL TRACK',
    sog: '12.4 kts',
    cog: '038°',
    interceptTime: '04:18 UTC',
    flag: 'LIBERIA (LR)',
    distance: '5.2 km',
    timeAlign: 'Moderate (±22 min)',
    trajMatch: 'Medium (68.1%)',
    anomaly: 'None',
    aisGap: 'Continuous'
  },
  {
    id: 3,
    name: 'MV SEA PEARL',
    imo: '9152284',
    type: 'CONTAINER SHIP',
    priority: 42,
    tag: 'PERIPHERAL',
    sog: '18.1 kts',
    cog: '074°',
    interceptTime: '04:45 UTC',
    flag: 'MARSHALL IS.',
    distance: '12.4 km',
    timeAlign: 'Low (±45 min)',
    trajMatch: 'Low (31.4%)',
    anomaly: 'None',
    aisGap: 'Continuous'
  },
]

export default function AISInvestigation() {
  const [selectedCandidate, setSelectedCandidate] = useState(candidates[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [timelineVal, setTimelineVal] = useState(40)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* Header bar */}
      <div style={{
        padding: '10px 16px', background: 'var(--bg-card)',
        borderBottom: '1px solid var(--border-primary)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div>
            <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', letterSpacing: '0.1em' }}>INVESTIGATION TARGET</span>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--accent-cyan)', fontFamily: 'JetBrains Mono' }}>
              INCIDENT #SLK-2024-884A
            </h2>
          </div>
          <span className="tag-cyan" style={{ fontSize: 9 }}>SYNTHETIC APERTURE CORRELATION ACTIVE</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: 10, fontFamily: 'JetBrains Mono' }}>
          <div><span style={{ color: 'var(--text-muted)' }}>WINDOW:</span> <span style={{ color: 'var(--text-primary)' }}>03:38 – 05:00 UTC</span></div>
          <div><span style={{ color: 'var(--text-muted)' }}>ORIGIN:</span> <span style={{ color: 'var(--text-primary)' }}>13.164° N, 80.287° E</span></div>
          <div><span style={{ color: 'var(--text-muted)' }}>EST. SLICK DRIFT:</span> <span style={{ color: 'var(--accent-amber)' }}>8.82 kts @ 048°</span></div>
        </div>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Center Map & Timeline */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
          {/* Map view */}
          <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
            <MapView
              center={[13.182, 80.314]}
              zoom={12}
              showSpill
              showVessels
              showDriftTrail
            />

            {/* Spatial Reticle Overlay */}
            <div style={{
              position: 'absolute', top: 12, left: 12, zIndex: 1000,
              background: 'rgba(2, 11, 24, 0.85)', backdropFilter: 'blur(6px)',
              border: '1px solid var(--border-primary)', padding: '8px 12px', borderRadius: 3,
              fontFamily: 'JetBrains Mono', fontSize: 10, color: 'var(--text-secondary)'
            }}>
              <div style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>SPATIAL RETICLE ACTIVE <span style={{ color: 'var(--text-muted)' }}>ZOOM: 1:25,000</span></div>
              <div>LAT: 13°09'50.4"N [13.164°]</div>
              <div>LON: 80°17'13.2"E [80.287°]</div>
              <div style={{ color: 'var(--text-muted)', marginTop: 2 }}>BATHYMETRY: -42.8m | CURRENTS: 0.8 kts NE</div>
            </div>

            {/* Legend track indicator */}
            <div style={{
              position: 'absolute', top: 12, right: 12, zIndex: 1000,
              background: 'rgba(2, 11, 24, 0.85)', backdropFilter: 'blur(6px)',
              border: '1px solid var(--border-primary)', padding: '8px 12px', borderRadius: 3,
              fontFamily: 'JetBrains Mono', fontSize: 9, display: 'flex', flexDirection: 'column', gap: 4
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 12, height: 2, background: '#00ccff' }} />
                <span>MV OCEAN STAR TRACK</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 12, height: 2, background: '#ff3355', strokeDasharray: '2 2' }} />
                <span>AIS SIGNAL GAP (40 MIN)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 6, height: 6, background: '#ffb700', borderRadius: '50%' }} />
                <span>PROBABLE SPILL ORIGIN</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 6, height: 6, background: '#00ff88', borderRadius: '50%' }} />
                <span>OBSERVED SATELLITE SLICK</span>
              </div>
            </div>
          </div>

          {/* Timeline Bar at bottom of map */}
          <div style={{
            height: 50, background: 'var(--bg-secondary)',
            borderTop: '1px solid var(--border-primary)',
            padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '16px',
            flexShrink: 0
          }}>
            <button
              className="btn-ghost"
              onClick={() => setIsPlaying(!isPlaying)}
              style={{ padding: '6px 10px' }}
            >
              <Play size={12} fill={isPlaying ? 'currentColor' : 'none'} />
            </button>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, fontFamily: 'JetBrains Mono' }}>
                <span style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>
                  RECONSTRUCTION TIMELINE: 03:52 UTC — ANOMALY WINDOW
                </span>
                <span style={{ color: 'var(--text-muted)' }}>SPEED: 1x | 03:00 UTC / 06:00 UTC</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={timelineVal}
                onChange={(e) => setTimelineVal(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-cyan)', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 8, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>
                <span>03:00 T-Entry</span>
                <span style={{ color: 'var(--accent-red)' }}>03:40–04:20 Intersect Window</span>
                <span>04:30 AIS Resume</span>
                <span>05:14 SAR Detection</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Funnel & Candidates */}
        <div style={{
          width: 360, flexShrink: 0,
          borderLeft: '1px solid var(--border-primary)',
          background: 'var(--bg-secondary)',
          display: 'flex', flexDirection: 'column',
          overflowY: 'auto'
        }}>
          {/* AIS Reconstruction Funnel */}
          <div style={{ padding: '12px', borderBottom: '1px solid var(--border-primary)' }}>
            <div style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', letterSpacing: '0.1em', marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>AIS RECONSTRUCTION FUNNEL</span>
              <span style={{ color: 'var(--accent-cyan)' }}>PASS LATENCY 1.2h</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4, background: 'var(--bg-card)', padding: '6px', borderRadius: 4, border: '1px solid var(--border-primary)' }}>
              <div className="funnel-stat">
                <span className="funnel-num" style={{ fontSize: 15, color: 'var(--text-muted)' }}>2,481</span>
                <span className="funnel-label">AIS REC</span>
              </div>
              <div className="funnel-stat">
                <span className="funnel-num" style={{ fontSize: 15, color: 'var(--text-secondary)' }}>184</span>
                <span className="funnel-label">NEARBY</span>
              </div>
              <div className="funnel-stat">
                <span className="funnel-num" style={{ fontSize: 15, color: 'var(--text-primary)' }}>27</span>
                <span className="funnel-label">MATCHED</span>
              </div>
              <div className="funnel-stat" style={{ background: 'var(--accent-cyan-dim)', borderRadius: 3 }}>
                <span className="funnel-num" style={{ fontSize: 15, color: 'var(--accent-cyan)' }}>7</span>
                <span className="funnel-label" style={{ color: 'var(--accent-cyan)' }}>CANDIDATES</span>
              </div>
            </div>
          </div>

          {/* Candidate list */}
          <div style={{ padding: '12px', borderBottom: '1px solid var(--border-primary)', flex: 1 }}>
            <div style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', letterSpacing: '0.1em', marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
              <span>FILTERED CANDIDATES (TOP 3)</span>
              <span>RANKED BY KINEMATICS</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {candidates.map((c) => {
                const isSelected = selectedCandidate.id === c.id
                return (
                  <div
                    key={c.id}
                    onClick={() => setSelectedCandidate(c)}
                    style={{
                      padding: '10px',
                      background: isSelected ? 'var(--bg-card-hover)' : 'var(--bg-card)',
                      border: `1px solid ${isSelected ? 'var(--accent-cyan)' : 'var(--border-primary)'}`,
                      borderRadius: 4,
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: isSelected ? 'var(--accent-cyan)' : 'var(--text-primary)', fontFamily: 'JetBrains Mono' }}>
                          #{c.id} {c.name}
                        </div>
                        <div style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', marginTop: 2 }}>
                          IMO {c.imo} · {c.type}
                        </div>
                      </div>
                      <span className={c.priority > 80 ? 'priority-high' : 'priority-medium'}>
                        PRIORITY: {c.priority}
                      </span>
                    </div>

                    <div className="divider" style={{ margin: '6px 0' }} />

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', fontSize: 9, fontFamily: 'JetBrains Mono', color: 'var(--text-muted)' }}>
                      <div>SOG / COG: <span style={{ color: 'var(--text-primary)' }}>{c.sog} / {c.cog}</span></div>
                      <div>INTERCEPT: <span style={{ color: 'var(--accent-cyan)' }}>{c.interceptTime}</span></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Dossier for selected candidate */}
          <div style={{ padding: '12px', background: 'var(--bg-card)' }}>
            <div style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', letterSpacing: '0.1em', marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>CORRELATED TARGET DOSSIER</span>
              <span className="tag-cyan" style={{ fontSize: 8 }}>SELECTED #{selectedCandidate.id}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 10, fontFamily: 'JetBrains Mono' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Distance from source</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{selectedCandidate.distance}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Time alignment</span>
                <span style={{ color: 'var(--accent-green)', fontWeight: 600 }}>{selectedCandidate.timeAlign}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Trajectory match</span>
                <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>{selectedCandidate.trajMatch}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Behaviour anomaly</span>
                <span style={{ color: 'var(--accent-amber)', fontWeight: 600 }}>{selectedCandidate.anomaly}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>AIS gap</span>
                <span style={{ color: 'var(--accent-red)', fontWeight: 600 }}>{selectedCandidate.aisGap}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
