import { useState } from 'react'
import {
  Ship, AlertTriangle, Wifi, Eye, TrendingUp, Calendar,
  Play, ChevronRight, Clock
} from 'lucide-react'

const vesselTabs = ['Map View', 'Tracks', 'Anomalies', 'AIS Gaps', 'Density', 'Playback']

interface Vessel {
  rank: number
  name: string
  imo: string
  type: string
  closestDist: string
  timeMatch: string
  behaviorScore: number
  overallScore: number
  flag: string
  mmsi: string
  lastPosition: string
  speed: string
  course: string
  lastSignal: string
  status: 'SUSPICIOUS' | 'CLEARED' | 'UNKNOWN'
}

const vessels: Vessel[] = [
  { rank: 1, name: 'MV OCEAN STAR', imo: '9482718', type: 'Crude Oil Tanker', closestDist: '12.4 km', timeMatch: '92%', behaviorScore: 0.87, overallScore: 87, flag: 'Marshall Islands', mmsi: '563210060', lastPosition: '13.248° N, 80.612° E', speed: '3.1 knots', course: '68° (ENE)', lastSignal: '2025-06-02 03:48 UTC', status: 'SUSPICIOUS' },
  { rank: 2, name: 'MV BLUE WAVE', imo: '8513842', type: 'Bulk Carrier', closestDist: '28.7 km', timeMatch: '74%', behaviorScore: 0.64, overallScore: 64, flag: 'Panama', mmsi: '371200015', lastPosition: '13.189° N, 80.450° E', speed: '8.4 knots', course: '120° (SE)', lastSignal: '2025-06-02 04:12 UTC', status: 'CLEARED' },
  { rank: 3, name: 'MV SEA PEARL', imo: '9153204', type: 'Container Ship', closestDist: '46.1 km', timeMatch: '58%', behaviorScore: 0.42, overallScore: 42, flag: 'Singapore', mmsi: '563041290', lastPosition: '13.120° N, 80.380° E', speed: '12.6 knots', course: '205° (SW)', lastSignal: '2025-06-02 04:30 UTC', status: 'CLEARED' },
  { rank: 4, name: 'MV HORIZON', imo: '9722103', type: 'Cargo Vessel', closestDist: '62.3 km', timeMatch: '31%', behaviorScore: 0.28, overallScore: 28, flag: 'Liberia', mmsi: '636016789', lastPosition: '13.065° N, 80.290° E', speed: '9.8 knots', course: '340° (NW)', lastSignal: '2025-06-02 05:15 UTC', status: 'CLEARED' },
  { rank: 5, name: 'MV EASTERN', imo: '9256714', type: 'Chemical Tanker', closestDist: '88.9 km', timeMatch: '24%', behaviorScore: 0.21, overallScore: 21, flag: 'Hong Kong', mmsi: '477821340', lastPosition: '12.950° N, 80.200° E', speed: '11.2 knots', course: '175° (S)', lastSignal: '2025-06-02 05:42 UTC', status: 'CLEARED' },
]

export default function AISInvestigation() {
  const [activeTab, setActiveTab] = useState<string>('Map View')
  const [selectedVessel, setSelectedVessel] = useState<number>(0)
  const [vesselDetailTab, setVesselDetailTab] = useState<string>('Overview')

  const vessel = vessels[selectedVessel]

  return (
    <div style={{
      padding: '16px 20px',
      display: 'flex', flexDirection: 'column',
      gap: '14px', height: '100%', overflowY: 'auto',
      background: 'var(--bg-primary)'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
        <div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', marginBottom: 2 }}>
            Home &gt; <span style={{ color: 'var(--accent-cyan)' }}>AIS Investigation</span>
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: '#fff', margin: 0 }}>AIS Investigation</h1>
          <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
            Analyze vessel activities, correlate with satellite detections and identify potential responsible vessels.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'var(--bg-card)', border: '1px solid var(--border-primary)',
            borderRadius: 4, padding: '6px 12px', fontSize: 10, fontFamily: 'JetBrains Mono', color: 'var(--text-secondary)'
          }}>
            <Calendar size={13} color="var(--text-muted)" />
            2025-06-01 00:00 → 2025-06-03 23:59
          </div>
          <button className="btn-primary" style={{ padding: '7px 14px' }}>
            <Play size={13} fill="#000" />
            Run Analysis
          </button>
        </div>
      </div>

      {/* KPI Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
        {[
          { icon: Ship, label: 'TOTAL VESSELS IN AOI', value: '142', sub: '+12% vs. previous window', color: '#fff' },
          { icon: AlertTriangle, label: 'SUSPICIOUS VESSELS', value: '7', sub: 'Anomalous behavior', color: 'var(--accent-amber)' },
          { icon: Eye, label: 'VESSELS NEAR SPILL', value: '23', sub: 'within 50 km', color: 'var(--accent-green)' },
          { icon: Wifi, label: 'AIS GAPS DETECTED', value: '5', sub: 'in selected vessels', color: 'var(--accent-red)' },
          { icon: TrendingUp, label: 'COVERAGE', value: '96.4%', sub: 'AIS data availability', color: 'var(--accent-green)' },
        ].map((m, i) => (
          <div key={i} className="glass-card" style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <m.icon size={16} color={m.color} />
              <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', letterSpacing: '0.08em' }}>{m.label}</span>
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, color: m.color, fontFamily: 'JetBrains Mono' }}>{m.value}</div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{m.sub}</div>
          </div>
        ))}
      </div>

      {/* Tab Bar */}
      <div style={{ display: 'flex', gap: 2, borderBottom: '2px solid var(--border-primary)' }}>
        {vesselTabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '8px 16px', fontSize: 11, fontFamily: 'JetBrains Mono',
              fontWeight: activeTab === tab ? 700 : 500,
              color: activeTab === tab ? 'var(--accent-cyan)' : 'var(--text-muted)',
              background: activeTab === tab ? 'var(--accent-cyan-dim)' : 'transparent',
              border: 'none', borderBottom: activeTab === tab ? '2px solid var(--accent-cyan)' : '2px solid transparent',
              cursor: 'pointer', marginBottom: -2
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Content: Table + Vessel Details */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 12, minHeight: 380 }}>
        {/* Left: Vessel Candidates Table */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{
            padding: '10px 14px', borderBottom: '1px solid var(--border-primary)',
            background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0
          }}>
            <span style={{ fontSize: 12, fontWeight: 700, fontFamily: 'JetBrains Mono', color: '#fff', letterSpacing: '0.04em' }}>
              VESSEL CANDIDATES (RANKED BY PROBABILITY)
            </span>
            <button className="btn-ghost" style={{ padding: '3px 10px', fontSize: 9 }}>View All Vessels</button>
          </div>

          <div style={{ flex: 1, overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 10, fontFamily: 'JetBrains Mono' }}>
              <thead>
                <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-primary)', position: 'sticky', top: 0, zIndex: 10 }}>
                  {['#', 'VESSEL NAME', 'IMO', 'TYPE', 'CLOSEST DISTANCE', 'TIME MATCH', 'BEHAVIOR SCORE', 'OVERALL SCORE', 'ACTIONS'].map(h => (
                    <th key={h} style={{
                      padding: '6px 8px', textAlign: 'left', fontSize: 8,
                      color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.06em',
                      background: 'var(--bg-secondary)'
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {vessels.map((v, idx) => {
                  const isSelected = idx === selectedVessel
                  return (
                    <tr
                      key={idx}
                      onClick={() => setSelectedVessel(idx)}
                      style={{
                        borderBottom: '1px solid var(--border-primary)',
                        background: isSelected ? 'rgba(0, 204, 255, 0.08)' : 'transparent',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.background = 'var(--bg-card-hover)' }}
                      onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.background = isSelected ? 'rgba(0, 204, 255, 0.08)' : 'transparent' }}
                    >
                      <td style={{ padding: '8px', color: 'var(--text-muted)', fontWeight: 700 }}>{v.rank}</td>
                      <td style={{ padding: '8px', color: isSelected ? 'var(--accent-cyan)' : '#fff', fontWeight: 700 }}>{v.name}</td>
                      <td style={{ padding: '8px', color: 'var(--text-secondary)' }}>{v.imo}</td>
                      <td style={{ padding: '8px', color: 'var(--text-secondary)' }}>{v.type}</td>
                      <td style={{ padding: '8px', color: 'var(--accent-cyan)' }}>{v.closestDist}</td>
                      <td style={{ padding: '8px', color: v.rank === 1 ? 'var(--accent-green)' : 'var(--text-secondary)' }}>{v.timeMatch}</td>
                      <td style={{ padding: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 60, height: 5, background: 'var(--bg-primary)', borderRadius: 3, overflow: 'hidden' }}>
                            <div style={{
                              height: '100%', width: `${v.behaviorScore * 100}%`,
                              background: v.behaviorScore >= 0.8 ? 'var(--accent-red)' : v.behaviorScore >= 0.5 ? 'var(--accent-amber)' : 'var(--accent-green)',
                              transition: 'width 0.3s ease'
                            }} />
                          </div>
                          <span style={{ color: 'var(--text-secondary)' }}>{v.behaviorScore}</span>
                        </div>
                      </td>
                      <td style={{ padding: '8px' }}>
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                          width: 32, height: 20, borderRadius: 3, fontSize: 10, fontWeight: 800,
                          background: v.overallScore >= 80 ? 'var(--accent-red)' : v.overallScore >= 50 ? 'var(--accent-amber)' : 'var(--accent-green)',
                          color: '#000'
                        }}>
                          {v.overallScore}
                        </span>
                      </td>
                      <td style={{ padding: '8px' }}>
                        <button style={{
                          background: 'transparent', border: '1px solid var(--border-primary)',
                          color: 'var(--text-muted)', padding: '2px 4px', borderRadius: 2, cursor: 'pointer',
                          display: 'flex', alignItems: 'center', gap: 2
                        }}>
                          <Eye size={11} /> <ChevronRight size={10} />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* AIS Playback Timeline */}
          <div style={{
            padding: '10px 14px', borderTop: '1px solid var(--border-primary)',
            background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', whiteSpace: 'nowrap' }}>
              <Clock size={12} /> AIS PLAYBACK TIMELINE
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>2025-06-02 01:48:00 UTC</span>
            </div>
            <div style={{ flex: 1, position: 'relative' }}>
              <div style={{ height: 6, background: 'var(--bg-primary)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '42%', background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-green))', borderRadius: 3 }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 8, color: 'var(--text-muted)', marginTop: 2, fontFamily: 'JetBrains Mono' }}>
                <span>Jun 01 00:00</span>
                <span>Jun 03 23:59</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Selected Vessel Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Vessel Card */}
          <div className="glass-card" style={{ padding: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 11, fontWeight: 700, fontFamily: 'JetBrains Mono', color: '#fff' }}>
                SELECTED VESSEL DETAILS
              </span>
              <span style={{
                background: vessel.status === 'SUSPICIOUS' ? 'var(--accent-red)' : 'var(--accent-green)',
                color: vessel.status === 'SUSPICIOUS' ? '#fff' : '#000',
                padding: '2px 8px', borderRadius: 2, fontSize: 9, fontWeight: 700, fontFamily: 'JetBrains Mono'
              }}>
                {vessel.status}
              </span>
            </div>

            {/* Vessel Info Block */}
            <div style={{
              display: 'flex', gap: 10, marginBottom: 12,
              background: 'var(--bg-primary)', border: '1px solid var(--border-primary)',
              borderRadius: 4, padding: '10px'
            }}>
              <div style={{
                width: 60, height: 60, borderRadius: 4,
                background: 'var(--bg-card)', border: '1px solid var(--border-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Ship size={28} color="var(--accent-cyan)" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#fff', fontFamily: 'JetBrains Mono' }}>{vessel.name}</div>
                <div style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', marginTop: 2 }}>
                  IMO: {vessel.imo} &nbsp; MMSI: {vessel.mmsi}
                </div>
                <div style={{ fontSize: 9, color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono', marginTop: 2 }}>
                  Type: {vessel.type} &nbsp; Flag: {vessel.flag}
                </div>
              </div>
            </div>

            {/* Detail Tabs */}
            <div style={{ display: 'flex', gap: 2, marginBottom: 10 }}>
              {['Overview', 'Trajectory', 'Behavior', 'AIS Gaps', 'Events'].map(t => (
                <button
                  key={t}
                  onClick={() => setVesselDetailTab(t)}
                  style={{
                    padding: '3px 8px', fontSize: 8, fontFamily: 'JetBrains Mono', fontWeight: vesselDetailTab === t ? 700 : 500,
                    color: vesselDetailTab === t ? 'var(--accent-cyan)' : 'var(--text-muted)',
                    background: vesselDetailTab === t ? 'var(--accent-cyan-dim)' : 'transparent',
                    border: 'none', borderBottom: vesselDetailTab === t ? '2px solid var(--accent-cyan)' : '2px solid transparent',
                    cursor: 'pointer'
                  }}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Vessel Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 10, fontFamily: 'JetBrains Mono' }}>
              {[
                { label: 'Last Known Position', value: vessel.lastPosition },
                { label: 'Speed', value: vessel.speed },
                { label: 'Course', value: vessel.course },
                { label: 'Last AIS Signal', value: vessel.lastSignal },
              ].map((f, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-primary)', paddingBottom: 4 }}>
                  <span style={{ color: 'var(--text-muted)' }}>{f.label}</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{f.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Anomaly Analysis Card */}
          <div className="glass-card" style={{ padding: '14px', flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 700, fontFamily: 'JetBrains Mono', color: '#fff', marginBottom: 10 }}>
              ANOMALY ANALYSIS
            </div>
            <div style={{ fontSize: 9, fontFamily: 'JetBrains Mono', display: 'flex', gap: 12, marginBottom: 10, color: 'var(--text-muted)' }}>
              <span>● <span style={{ color: 'var(--accent-green)' }}>Speed (kts)</span></span>
              <span>● <span style={{ color: 'var(--accent-amber)' }}>Course (°)</span></span>
              <span>● <span style={{ color: 'var(--accent-red)' }}>Anomaly</span></span>
            </div>

            {/* Simple Chart Visualization */}
            <div style={{
              height: 100, background: 'var(--bg-primary)', border: '1px solid var(--border-primary)',
              borderRadius: 4, padding: '8px', position: 'relative', overflow: 'hidden'
            }}>
              {/* Grid Lines */}
              {[0, 1, 2, 3].map(i => (
                <div key={i} style={{
                  position: 'absolute', left: 0, right: 0,
                  top: `${25 * i}%`, height: 1,
                  background: 'var(--border-primary)', opacity: 0.5
                }} />
              ))}
              {/* Speed Line (Green) */}
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <polyline
                  points="10,60 50,55 90,58 130,70 170,42 210,45 250,80 290,75"
                  fill="none" stroke="var(--accent-green)" strokeWidth="1.5"
                />
                {/* Anomaly Highlight Region */}
                <rect x="160" y="10" width="50" height="80" fill="rgba(255,51,85,0.1)" stroke="var(--accent-red)" strokeWidth="0.5" strokeDasharray="3,3" rx="3" />
                <text x="165" y="25" fill="var(--accent-red)" fontSize="7" fontFamily="JetBrains Mono">Speed Drop + Loitering</text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
