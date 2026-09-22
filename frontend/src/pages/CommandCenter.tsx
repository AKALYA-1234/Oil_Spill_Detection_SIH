import { useState } from 'react'
import { Eye, Search, Map, Table2, Filter, ChevronRight } from 'lucide-react'
import MapView from '../components/MapView'
import { SAR_SEGMENTED_IMAGES, type SarSegmentedImage } from '../utils/sarImages'

const severityLevels: Record<string, { label: string; color: string; bg: string }> = {
  CRITICAL: { label: 'CRITICAL', color: '#ff3355', bg: 'rgba(255,51,85,0.15)' },
  HIGH: { label: 'HIGH', color: '#ffb700', bg: 'rgba(255,183,0,0.15)' },
  SEVERE: { label: 'SEVERE', color: '#ff6644', bg: 'rgba(255,102,68,0.15)' },
  MODERATE: { label: 'MODERATE', color: '#00ccff', bg: 'rgba(0,204,255,0.15)' },
}

function getSeverity(conf: number): string {
  if (conf >= 96) return 'CRITICAL'
  if (conf >= 93) return 'HIGH'
  if (conf >= 91) return 'SEVERE'
  return 'MODERATE'
}

function getAlertCode(id: number): string {
  const codes = ['ICG-101', 'PORT-EN-394', 'ICGS-044', 'COAST-M1-01', 'PORT-KAT-11', 'ICG-108', 'HQ-N-NV-301', 'PORT-CUD-01']
  return codes[(id - 1) % codes.length]
}

function getAlertStatus(id: number): string {
  const statuses = ['NOTIFIED', 'SENT', 'DISPATCHED', 'NOTIFIED', 'ACKNOWLEDGED', 'NOTIFIED', 'URGENT', 'SENT']
  return statuses[(id - 1) % statuses.length]
}

export default function CommandCenter() {
  const [selectedSpillIndex, setSelectedSpillIndex] = useState<number>(0)
  const [viewMode, setViewMode] = useState<'table' | 'map'>('table')
  const [severityFilter, setSeverityFilter] = useState<string>('ALL SEVERITIES')

  const selectedSpill: SarSegmentedImage = SAR_SEGMENTED_IMAGES[selectedSpillIndex]

  const totalArea = SAR_SEGMENTED_IMAGES.reduce((s, i) => s + i.slickAreaKm2, 0)
  const avgConf = SAR_SEGMENTED_IMAGES.reduce((s, i) => s + i.confidence, 0) / SAR_SEGMENTED_IMAGES.length

  const filteredImages = severityFilter === 'ALL SEVERITIES'
    ? SAR_SEGMENTED_IMAGES
    : SAR_SEGMENTED_IMAGES.filter(img => getSeverity(img.confidence) === severityFilter)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* Top Metrics Strip */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        borderBottom: '1px solid var(--border-primary)', flexShrink: 0,
      }}>
        {[
          { label: 'ACTIVE SPILLS', value: '15', unit: 'DETECTED', color: 'var(--accent-red)', unitColor: 'var(--accent-red)' },
          { label: 'TOTAL SPILL AREA', value: totalArea.toFixed(1), unit: 'km²', color: 'var(--text-primary)', unitColor: 'var(--text-secondary)' },
          { label: 'AVG CONFIDENCE', value: avgConf.toFixed(1), unit: '%', color: 'var(--text-primary)', unitColor: 'var(--text-secondary)' },
          { label: 'AIS CANDIDATES', value: '15', unit: 'INTERCEPT READY', color: 'var(--accent-cyan)', unitColor: 'var(--accent-cyan)' },
        ].map((m, i) => (
          <div key={i} style={{
            padding: '12px 16px',
            borderRight: i < 3 ? '1px solid var(--border-primary)' : 'none',
            display: 'flex', flexDirection: 'column', gap: '2px',
          }}>
            <div style={{ fontSize: 9, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'JetBrains Mono' }}>{m.label}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span className="metric-value" style={{ color: m.color }}>{m.value}</span>
              <span className="metric-unit" style={{ color: m.unitColor }}>{m.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Left: Incident Register Table */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Table Header Bar */}
          <div style={{
            padding: '10px 16px',
            borderBottom: '1px solid var(--border-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0,
            background: 'var(--bg-secondary)',
          }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', fontFamily: 'JetBrains Mono', letterSpacing: '0.04em' }}>
                SPILL DETECTION INCIDENT REGISTER (15 ENTRIES)
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>
                CLICK ANY ROW TO OPEN HIGHLIGHTED OIL SPILL IMAGE IN A NEW TAB
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {/* Search */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: 'var(--bg-card)', border: '1px solid var(--border-primary)',
                borderRadius: 3, padding: '4px 10px', fontSize: 10, fontFamily: 'JetBrains Mono', color: 'var(--text-muted)'
              }}>
                <Search size={12} />
                <span>Search date, spill, place...</span>
              </div>
              {/* Severity Filter */}
              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                style={{
                  background: 'var(--bg-card)', border: '1px solid var(--border-primary)',
                  borderRadius: 3, padding: '4px 8px', fontSize: 10, fontFamily: 'JetBrains Mono',
                  color: 'var(--text-secondary)', outline: 'none', cursor: 'pointer'
                }}
              >
                <option value="ALL SEVERITIES">ALL SEVERITIES</option>
                <option value="CRITICAL">CRITICAL</option>
                <option value="HIGH">HIGH</option>
                <option value="SEVERE">SEVERE</option>
                <option value="MODERATE">MODERATE</option>
              </select>
              {/* View Mode Toggle */}
              <div style={{ display: 'flex', gap: 2 }}>
                <button
                  onClick={() => setViewMode('table')}
                  style={{
                    background: viewMode === 'table' ? 'var(--accent-cyan-dim)' : 'var(--bg-card)',
                    border: `1px solid ${viewMode === 'table' ? 'var(--accent-cyan)' : 'var(--border-primary)'}`,
                    color: viewMode === 'table' ? 'var(--accent-cyan)' : 'var(--text-muted)',
                    padding: '4px 8px', borderRadius: 3, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
                    fontSize: 10, fontFamily: 'JetBrains Mono', fontWeight: 600
                  }}
                >
                  <Table2 size={12} /> TABLE
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  style={{
                    background: viewMode === 'map' ? 'var(--accent-cyan-dim)' : 'var(--bg-card)',
                    border: `1px solid ${viewMode === 'map' ? 'var(--accent-cyan)' : 'var(--border-primary)'}`,
                    color: viewMode === 'map' ? 'var(--accent-cyan)' : 'var(--text-muted)',
                    padding: '4px 8px', borderRadius: 3, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
                    fontSize: 10, fontFamily: 'JetBrains Mono', fontWeight: 600
                  }}
                >
                  <Map size={12} /> MAP
                </button>
              </div>
            </div>
          </div>

          {/* Table / Map Content */}
          <div style={{ flex: 1, overflow: 'auto' }}>
            {viewMode === 'table' ? (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11, fontFamily: 'JetBrains Mono' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-primary)', position: 'sticky', top: 0, zIndex: 10 }}>
                    {['SPILL_NO', 'DATE', 'TIME WITH AM/PM', 'PLACE OF SPILL', 'SEVERITY LEVEL', 'NOTIFIED ALERT', 'ACTION'].map(h => (
                      <th key={h} style={{
                        padding: '8px 12px', textAlign: 'left', fontSize: 9,
                        color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.08em',
                        borderBottom: '1px solid var(--border-primary)', background: 'var(--bg-secondary)'
                      }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredImages.map((img, idx) => {
                    const sev = getSeverity(img.confidence)
                    const sevStyle = severityLevels[sev]
                    const isSelected = SAR_SEGMENTED_IMAGES.indexOf(img) === selectedSpillIndex
                    const dateObj = new Date(2026, 8, 22 - idx)
                    const dateStr = `${dateObj.getDate()} Sep 2026`
                    const hours = [14, 11, 8, 2, 5, 10, 1, 7, 4, 9, 3, 6, 12, 15, 16]
                    const mins = [15, 42, 5, 30, 18, 22, 45, 12, 38, 10, 55, 28, 50, 35, 20]
                    const h = hours[idx % 15]
                    const m = mins[idx % 15]
                    const ampm = h >= 12 ? 'PM' : 'AM'
                    const h12 = h > 12 ? h - 12 : (h === 0 ? 12 : h)
                    const timeStr = `${String(h12).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(32 + idx).padStart(2, '0')} ${ampm}`
                    const alertCode = getAlertCode(img.id)
                    const alertStatus = getAlertStatus(img.id)
                    const realIdx = SAR_SEGMENTED_IMAGES.indexOf(img)

                    return (
                      <tr
                        key={img.id}
                        onClick={() => setSelectedSpillIndex(realIdx)}
                        style={{
                          borderBottom: '1px solid var(--border-primary)',
                          background: isSelected ? 'rgba(0, 204, 255, 0.08)' : 'transparent',
                          cursor: 'pointer',
                          transition: 'background 0.15s ease'
                        }}
                        onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.background = 'var(--bg-card-hover)' }}
                        onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.background = 'transparent' }}
                      >
                        <td style={{ padding: '8px 12px' }}>
                          <span style={{
                            background: isSelected ? 'var(--accent-red)' : 'var(--accent-cyan-dim)',
                            color: isSelected ? '#fff' : 'var(--accent-cyan)',
                            padding: '2px 8px', borderRadius: 2, fontSize: 10, fontWeight: 700,
                            border: `1px solid ${isSelected ? 'var(--accent-red)' : 'var(--accent-cyan)'}`
                          }}>
                            {img.targetCode}
                          </span>
                        </td>
                        <td style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>{dateStr}</td>
                        <td style={{ padding: '8px 12px', color: 'var(--accent-cyan)', fontWeight: 600 }}>{timeStr}</td>
                        <td style={{ padding: '8px 12px', color: 'var(--text-primary)', maxWidth: 280, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {img.locationName} ({img.coordinates.formatted})
                        </td>
                        <td style={{ padding: '8px 12px' }}>
                          <span style={{
                            background: sevStyle.bg, color: sevStyle.color,
                            border: `1px solid ${sevStyle.color}`,
                            padding: '2px 10px', borderRadius: 2, fontSize: 9, fontWeight: 700
                          }}>
                            {sevStyle.label}
                          </span>
                        </td>
                        <td style={{ padding: '8px 12px' }}>
                          <span style={{
                            background: 'rgba(0, 204, 255, 0.1)',
                            color: 'var(--accent-cyan)', border: '1px solid var(--accent-cyan-dim)',
                            padding: '2px 8px', borderRadius: 2, fontSize: 9, fontWeight: 600
                          }}>
                            ALERT #{alertCode} ({alertStatus})
                          </span>
                        </td>
                        <td style={{ padding: '8px 12px' }}>
                          <button style={{
                            background: 'var(--accent-cyan-dim)', color: 'var(--accent-cyan)',
                            border: '1px solid var(--accent-cyan)', padding: '3px 10px',
                            borderRadius: 2, fontSize: 9, fontWeight: 700, cursor: 'pointer',
                            fontFamily: 'JetBrains Mono', display: 'flex', alignItems: 'center', gap: 4
                          }}>
                            OPEN TAB <ChevronRight size={10} />
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            ) : (
              <MapView
                showSpill
                showVessels
                showDriftTrail
                center={[selectedSpill.coordinates.lat, selectedSpill.coordinates.lon]}
                zoom={11}
                highlightSpill={{ lat: selectedSpill.coordinates.lat, lng: selectedSpill.coordinates.lon }}
              />
            )}
          </div>

          {/* Environmental strip */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            borderTop: '1px solid var(--border-primary)', flexShrink: 0,
          }}>
            {[
              { label: 'METOCEAN SURFACE WIND', value: '11.8 KTS FROM 220° (SSW)', status: 'STABLE', statusColor: 'var(--accent-green)' },
              { label: 'HYCOM TIDAL CURRENT', value: '0.82 M/S @ BEARING 045°', status: 'SYNCHRONIZED', statusColor: 'var(--accent-cyan)' },
              { label: 'LAGRANGIAN DRIFT BACK-TRACE', value: 'COHERENCE RATIO 0.91', status: 'CORRELATED', statusColor: 'var(--accent-cyan)' },
            ].map((e, i) => (
              <div key={i} style={{
                padding: '8px 12px',
                borderRight: i < 2 ? '1px solid var(--border-primary)' : 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div>
                  <div style={{ fontSize: 9, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'JetBrains Mono' }}>{e.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono', marginTop: 2 }}>{e.value}</div>
                </div>
                <span className="tag-active" style={{ color: e.statusColor, borderColor: e.statusColor, background: e.statusColor + '22' }}>{e.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel: Incident Record */}
        <div style={{
          width: 310, flexShrink: 0,
          borderLeft: '1px solid var(--border-primary)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--border-primary)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-secondary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', letterSpacing: '0.1em' }}>INCIDENT RECORD (RECENT SPILL)</span>
            </div>
            <span className="tag-critical">CRITICAL SLICK</span>
          </div>

          {/* Sort Tab */}
          <div style={{ padding: '6px 12px', borderBottom: '1px solid var(--border-primary)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>▶ MOST RECENT DETECTION</span>
            <span style={{ fontSize: 10, color: 'var(--accent-cyan)', fontFamily: 'JetBrains Mono', fontWeight: 700 }}>22 Sep 2026</span>
          </div>

          <div style={{ flex: 1, overflow: 'auto', padding: '12px' }}>
            {/* Incident ID */}
            <h2 style={{ fontSize: 18, fontWeight: 800, color: '#fff', lineHeight: 1.3, fontFamily: 'JetBrains Mono', marginBottom: 4 }}>
              INCIDENT #MG-2026-01
            </h2>
            <p style={{ fontSize: 10, color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 12 }}>
              Automated Sentinel-1 Synthetic Aperture Radar detection with temporal AIS correlation.
            </p>

            <div className="divider" />

            {/* Data fields */}
            {[
              { label: 'SPILL NUMBER', value: selectedSpill.targetCode },
              { label: 'DETECTION DATE', value: '22 Sep 2026' },
              { label: 'DETECTION TIME (AM/PM)', value: selectedSpill.timestamp.split(' ').slice(3).join(' ') },
              { label: 'LOCATION', value: selectedSpill.locationName + ' (' + selectedSpill.coordinates.formatted + ')' },
              { label: 'SATELLITE SENSOR', value: selectedSpill.sensor },
              { label: 'CENTROID COORDINATES', value: selectedSpill.coordinates.formatted },
              { label: 'DISCHARGE PROBABILITY', value: `HIGH (${selectedSpill.confidence}%)`, valueColor: 'var(--accent-red)' },
              { label: 'SURFACE SLICK AREA', value: `${selectedSpill.slickAreaKm2} km²` },
              { label: 'NOTIFIED ALERT STATUS', value: `ALERT #${getAlertCode(selectedSpill.id)} (${getAlertStatus(selectedSpill.id)})`, valueColor: 'var(--accent-cyan)' },
              { label: 'SAR SEGMENTATION (SPILL AI)', value: `${selectedSpill.slickAreaKm2} km²` },
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', maxWidth: '45%', lineHeight: 1.4 }}>{f.label}</span>
                <span style={{ fontSize: 10, color: f.valueColor || 'var(--text-primary)', fontFamily: 'JetBrains Mono', textAlign: 'right', maxWidth: '52%', fontWeight: 600, lineHeight: 1.4 }}>{f.value}</span>
              </div>
            ))}

            <div className="divider" />

            {/* SAR Image */}
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', marginBottom: 6, display: 'flex', justifyContent: 'space-between' }}>
                <span>SAR SEGMENTATION FRAME #{selectedSpill.id}</span>
                <span style={{ color: 'var(--accent-cyan)' }}>{selectedSpill.slickAreaKm2} km²</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                <div style={{ height: 80, background: '#000', borderRadius: 3, overflow: 'hidden', border: '1px solid var(--border-primary)', position: 'relative' }}>
                  <img src={selectedSpill.path} alt="SAR" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }} />
                </div>
                <div style={{ height: 80, background: '#000', borderRadius: 3, overflow: 'hidden', border: '1px solid var(--accent-red-dim)', position: 'relative' }}>
                  <img src={selectedSpill.path} alt="Mask" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'radial-gradient(ellipse at 50% 50%, rgba(255,51,85,0.4) 0%, transparent 70%)',
                    pointerEvents: 'none'
                  }} />
                  <div style={{
                    position: 'absolute', bottom: 3, right: 4,
                    fontSize: 7, color: '#fff', fontFamily: 'JetBrains Mono', fontWeight: 700,
                    background: 'rgba(0,0,0,0.7)', padding: '1px 4px', borderRadius: 2
                  }}>SPILL AI MASK LOADED</div>
                </div>
              </div>
            </div>

            <div className="divider" />

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '6px', flexDirection: 'column' }}>
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
