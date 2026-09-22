import { useState } from 'react'
import { RefreshCw, Compass, Layers, Image as ImageIcon } from 'lucide-react'
import MapView from '../components/MapView'
import { SAR_SEGMENTED_IMAGES } from '../utils/sarImages'

export default function ValidationDrift() {
  const [computing, setComputing] = useState(false)
  const activeImage = SAR_SEGMENTED_IMAGES[1] // Frame #02

  const handleRecompute = () => {
    setComputing(true)
    setTimeout(() => setComputing(false), 1200)
  }

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
            <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', letterSpacing: '0.1em' }}>ENVIRONMENTAL</span>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>Validation & Drift Analysis</h2>
          </div>
          <span className="tag-critical">CRITICAL SLICK</span>
          <span style={{ fontSize: 10, color: 'var(--accent-cyan)', fontFamily: 'JetBrains Mono' }}>SAR-DET-9942</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ fontSize: 10, fontFamily: 'JetBrains Mono' }}>
            <span style={{ color: 'var(--text-muted)' }}>LIKELIHOOD: </span>
            <span style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>{activeImage.confidence}% CONFIRMED HYDROCARBON</span>
          </div>
          <div style={{ fontSize: 10, fontFamily: 'JetBrains Mono', color: 'var(--text-muted)' }}>
            WINDOW: <span style={{ color: 'var(--text-primary)' }}>03:48–04:20 UTC</span>
          </div>
          <button className="btn-primary" onClick={handleRecompute} disabled={computing}>
            <RefreshCw size={12} className={computing ? 'animate-rotate' : ''} />
            {computing ? 'RECOMPUTING...' : 'RECOMPUTE DRIFT'}
          </button>
        </div>
      </div>

      {/* Main content grid */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Map View */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          <MapView
            center={[13.182, 80.314]}
            zoom={11}
            showSpill
            showVessels={false}
            showDriftTrail
          />
        </div>

        {/* Right validation panel */}
        <div style={{
          width: 330, flexShrink: 0,
          borderLeft: '1px solid var(--border-primary)',
          background: 'var(--bg-secondary)',
          display: 'flex', flexDirection: 'column',
          overflowY: 'auto', padding: '12px', gap: '12px'
        }}>
          {/* Diagnostic synthesis */}
          <div className="glass-card" style={{ padding: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>DIAGNOSTIC SYNTHESIS</span>
              <span className="tag-active" style={{ fontSize: 9 }}>VERIFIED TARGET</span>
            </div>
            <div style={{ marginTop: 8, display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontSize: 32, fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'JetBrains Mono', lineHeight: 1 }}>{activeImage.confidence}%</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'JetBrains Mono' }}>OIL SPILL LIKELIHOOD</span>
            </div>
            <div style={{ fontSize: 9, color: 'var(--text-muted)', marginTop: 4 }}>
              Hydrocarbon film matches Marpol Ann. I
            </div>

            <div className="divider" style={{ margin: '10px 0' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 10, fontFamily: 'JetBrains Mono' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>PROBABLE ORIGIN</span>
                <span style={{ color: 'var(--text-primary)' }}>{activeImage.coordinates.formatted}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>SURFACE SLICK AREA</span>
                <span style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>{activeImage.slickAreaKm2} km²</span>
              </div>
            </div>
          </div>

          {/* SAR Segmented Image Reference */}
          <div className="glass-card" style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', display: 'flex', alignItems: 'center', gap: 4 }}>
                <ImageIcon size={12} color="var(--accent-cyan)" /> SAR SEGMENTED MASK (FRAME #{activeImage.id})
              </span>
            </div>
            <div style={{ height: 110, borderRadius: 4, overflow: 'hidden', border: '1px solid var(--border-primary)', position: 'relative' }}>
              <img src={activeImage.path} alt={activeImage.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 4, right: 6, background: 'rgba(0,0,0,0.7)', fontSize: 8, color: 'var(--accent-cyan)', padding: '2px 6px', borderRadius: 2, fontFamily: 'JetBrains Mono' }}>
                {activeImage.sensor}
              </div>
            </div>
          </div>

          {/* Environmental Evidence */}
          <div className="glass-card" style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Compass size={12} color="var(--accent-cyan)" /> ENVIRONMENTAL EVIDENCE
              </span>
              <span style={{ fontSize: 8, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>LIVE ECMWF / HYCOM</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div style={{ background: 'var(--bg-primary)', padding: '8px', borderRadius: 3, border: '1px solid var(--border-primary)' }}>
                <div style={{ fontSize: 8, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>WIND (10M)</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'JetBrains Mono', marginTop: 2 }}>14 km/h</div>
                <div style={{ fontSize: 8, color: 'var(--text-muted)', marginTop: 2 }}>NE @ 045° AZIMUTH</div>
              </div>
              <div style={{ background: 'var(--bg-primary)', padding: '8px', borderRadius: 3, border: '1px solid var(--border-primary)' }}>
                <div style={{ fontSize: 8, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>SIGNIF. WAVE</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'JetBrains Mono', marginTop: 2 }}>1.4 m</div>
                <div style={{ fontSize: 8, color: 'var(--text-muted)', marginTop: 2 }}>Hs PERIOD 6.2s</div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button className="btn-primary" style={{ justifyContent: 'center', padding: '10px' }}>
            <Layers size={14} /> CORRELATE AIS
          </button>
        </div>
      </div>
    </div>
  )
}
