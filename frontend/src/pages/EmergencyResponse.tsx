import { useState } from 'react'
import { AlertOctagon, Send, Radio, Share2, FileText, ArrowRight } from 'lucide-react'
import MapView from '../components/MapView'

export default function EmergencyResponse() {
  const [notified, setNotified] = useState(false)
  const [alerted, setAlerted] = useState(false)
  const [shared, setShared] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* Top Banner */}
      <div style={{
        padding: '8px 16px', background: 'var(--bg-card)',
        borderBottom: '1px solid var(--border-primary)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-red)' }} className="animate-blink" />
          <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent-red)', fontFamily: 'JetBrains Mono' }}>
            INCIDENT TIER-2 ACTIVE
          </span>
          <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>
            SECTOR: COROMANDEL EAST (CHENNAI DEEPWATER)
          </span>
        </div>

        {/* Pipeline breadcrumbs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 9, fontFamily: 'JetBrains Mono' }}>
          <span style={{ color: 'var(--accent-green)' }}>✓ DETECTED</span>
          <span style={{ color: 'var(--text-muted)' }}>→</span>
          <span style={{ color: 'var(--accent-green)' }}>✓ VALIDATED</span>
          <span style={{ color: 'var(--text-muted)' }}>→</span>
          <span style={{ color: 'var(--accent-green)' }}>✓ SOURCE ESTIMATED</span>
          <span style={{ color: 'var(--text-muted)' }}>→</span>
          <span style={{ color: 'var(--accent-green)' }}>✓ AIS ANALYZED</span>
          <span style={{ color: 'var(--text-muted)' }}>→</span>
          <span style={{ color: 'var(--accent-red)', fontWeight: 700 }}>● ALERT READY</span>
        </div>

        <div style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>
          SAR PLATFORM: SENTINEL-1B (PASS #8841)
        </div>
      </div>

      {/* Main split view */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Map & ocean metrics */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Map view */}
          <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
            <MapView
              center={[13.182, 80.314]}
              zoom={11}
              showSpill
              showVessels
              showDriftTrail
            />

            {/* Sector Grid Overlay */}
            <div style={{
              position: 'absolute', top: 12, left: 12, zIndex: 1000,
              background: 'rgba(2, 11, 24, 0.85)', backdropFilter: 'blur(6px)',
              border: '1px solid var(--border-primary)', padding: '6px 10px', borderRadius: 3,
              fontFamily: 'JetBrains Mono', fontSize: 9, color: 'var(--text-secondary)'
            }}>
              <div style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>OFFSHORE SECTOR MAP GRID</div>
              <div>13°10'55"N — 088°10'50"E</div>
              <div style={{ color: 'var(--text-muted)' }}>DATUM: WGS84 / HYD-COROMANDEL</div>
            </div>
          </div>

          {/* Ocean sensor readings grid */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px',
            background: 'var(--border-primary)', borderTop: '1px solid var(--border-primary)',
            flexShrink: 0
          }}>
            {[
              { label: 'SEA SURFACE TEMP', val: '28.4 °C', sub: 'Evaporation rate: Mod' },
              { label: 'SURFACE WIND', val: '11.2 kts ENE', sub: 'Bearing 048°' },
              { label: 'CURRENT VELOCITY', val: '0.68 m/s', sub: 'Coastal drift northward' },
              { label: 'WAVE SIGNIFICANT HT', val: '1.1 m', sub: 'Boom deployable' },
            ].map((s, idx) => (
              <div key={idx} style={{ background: 'var(--bg-secondary)', padding: '8px 12px' }}>
                <div style={{ fontSize: 8, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>{s.label}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'JetBrains Mono', marginTop: 2 }}>{s.val}</div>
                <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Action Panel */}
        <div style={{
          width: 360, flexShrink: 0,
          borderLeft: '1px solid var(--border-primary)',
          background: 'var(--bg-secondary)',
          display: 'flex', flexDirection: 'column',
          overflowY: 'auto', padding: '12px', gap: '12px'
        }}>
          {/* Critical Alert Banner */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(255, 51, 85, 0.2) 0%, rgba(255, 51, 85, 0.05) 100%)',
            border: '1px solid var(--accent-red)', borderRadius: 4, padding: '12px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--accent-red)', fontWeight: 700, fontSize: 11, fontFamily: 'JetBrains Mono' }}>
                <AlertOctagon size={16} /> MARITIME OIL SPILL ALERT
              </div>
              <span className="tag-critical">CRITICAL</span>
            </div>
            <div style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', marginTop: 4 }}>
              INCIDENT REF: INC-2026-09-0911
            </div>
          </div>

          {/* Incident Details Summary */}
          <div className="glass-card" style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: 6, fontSize: 10, fontFamily: 'JetBrains Mono' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>LOCATION (CENTROID)</span>
              <span style={{ color: 'var(--text-primary)' }}>13.182° N, 80.314° E</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>SPILL AREA EXTENT</span>
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>12.8 km² (~1,420 bbl)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>AI MODEL CONFIDENCE</span>
              <span style={{ color: 'var(--accent-green)', fontWeight: 700 }}>94%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>PROBABLE ORIGIN</span>
              <span style={{ color: 'var(--text-primary)' }}>13.164° N, 80.287° E</span>
            </div>
          </div>

          {/* Calculated Intercept Corridor */}
          <div className="glass-card" style={{ padding: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>CALCULATED INTERCEPT CORRIDOR</span>
              <span style={{ fontSize: 8, color: 'var(--accent-cyan)', fontFamily: 'JetBrains Mono' }}>A* / DIJKSTRA</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, background: 'var(--bg-primary)', padding: '8px', borderRadius: 3, border: '1px solid var(--border-primary)' }}>
              <div>
                <div style={{ fontSize: 8, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>SHORTEST DIST</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'JetBrains Mono' }}>18.4 km</div>
                <div style={{ fontSize: 8, color: 'var(--text-muted)' }}>9.93 NM</div>
              </div>
              <div>
                <div style={{ fontSize: 8, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>EST. TRANSIT</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-cyan)', fontFamily: 'JetBrains Mono' }}>31 min</div>
                <div style={{ fontSize: 8, color: 'var(--text-muted)' }}>@ 18.5 kts</div>
              </div>
              <div>
                <div style={{ fontSize: 8, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>OPTIMAL VESSEL</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent-green)', fontFamily: 'JetBrains Mono' }}>ICGS VAJRA</div>
                <div style={{ fontSize: 8, color: 'var(--text-muted)' }}>Boom Ready</div>
              </div>
            </div>

            <div style={{ marginTop: 8, fontSize: 9, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
              <span>CG BASE CHENNAI</span>
              <ArrowRight size={10} color="var(--accent-cyan)" />
              <span>WAYPOINT ALPHA</span>
              <ArrowRight size={10} color="var(--accent-cyan)" />
              <span style={{ color: 'var(--accent-red)' }}>SPILL FLANK</span>
            </div>
          </div>

          {/* Response Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', letterSpacing: '0.1em' }}>
              EXECUTE EMERGENCY RESPONSE PROTOCOL
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <button
                className="btn-critical"
                onClick={() => setNotified(true)}
                style={{ padding: '12px', justifyContent: 'center', height: '100%' }}
              >
                <Send size={14} /> {notified ? 'NOTIFIED ✓' : 'NOTIFY AUTHORITY'}
              </button>

              <button
                className="btn-ghost"
                onClick={() => setAlerted(true)}
                style={{ padding: '12px', justifyContent: 'center', height: '100%', borderColor: 'var(--accent-amber)', color: 'var(--accent-amber)' }}
              >
                <Radio size={14} /> {alerted ? 'BROADCASTED ✓' : 'ALERT NEARBY VESSELS'}
              </button>

              <button
                className="btn-ghost"
                onClick={() => setShared(true)}
                style={{ padding: '12px', justifyContent: 'center', height: '100%' }}
              >
                <Share2 size={14} /> {shared ? 'SHARED ✓' : 'SHARE LOCATION'}
              </button>

              <button
                className="btn-primary"
                style={{ padding: '12px', justifyContent: 'center', height: '100%' }}
              >
                <FileText size={14} /> GENERATE REPORT
              </button>
            </div>
          </div>

          {/* Dispatch Registry Footer */}
          <div style={{ marginTop: 'auto', paddingTop: 8, borderTop: '1px solid var(--border-primary)', fontSize: 9, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', display: 'flex', justifyContent: 'space-between' }}>
            <span>DISPATCH REGISTRY: DG SHIPPING / MRCC CHENNAI</span>
            <span>ENCRYPTION: AES-256 GCM</span>
          </div>
        </div>
      </div>
    </div>
  )
}
