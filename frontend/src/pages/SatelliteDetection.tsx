import { useState } from 'react'
import {
  CheckCircle2, AlertTriangle, Play, Calendar, ChevronDown,
  Layers, Info, Search, RefreshCw, Zap
} from 'lucide-react'
import MapView from '../components/MapView'
import { SAR_SEGMENTED_IMAGES, getSarImage, type SarSegmentedImage } from '../utils/sarImages'

export default function SatelliteDetection() {
  const [selectedTargetCode, setSelectedTargetCode] = useState<string>('SPILL-01')
  const [dateRange, setDateRange] = useState<string>('2026-08-27 — 2026-09-22')
  const [activeTab, setActiveTab] = useState<'overview' | 'model' | 'environmental' | 'metadata'>('overview')
  const [isRunningDetection, setIsRunningDetection] = useState<boolean>(false)
  const [detectionProgress, setDetectionProgress] = useState<number>(100)

  // Map layer toggle states
  const [layers, setLayers] = useState({
    satelliteBasemap: true,
    spillPolygon: true,
    centroid: true,
    vesselTracks: true,
    predictedDrift: true,
    coastline: false,
    ports: false,
  })

  const currentData: SarSegmentedImage = getSarImage(selectedTargetCode)

  const toggleLayer = (key: keyof typeof layers) => {
    setLayers(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleRunDetection = () => {
    setIsRunningDetection(true)
    setDetectionProgress(15)

    const timer1 = setTimeout(() => setDetectionProgress(45), 400)
    const timer2 = setTimeout(() => setDetectionProgress(80), 900)
    const timer3 = setTimeout(() => {
      setDetectionProgress(100)
      setIsRunningDetection(false)
    }, 1400)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }

  return (
    <div style={{
      padding: '16px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      height: '100%',
      overflowY: 'auto',
      background: 'var(--bg-primary)',
      color: 'var(--text-primary)'
    }}>
      {/* Page Header & Controls Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justify: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div>
          {/* Breadcrumb */}
          <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', marginBottom: 4 }}>
            Home &gt; <span style={{ color: 'var(--accent-cyan)' }}>Satellite Detection</span>
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', margin: 0 }}>
            Satellite Detection
          </h1>
          <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontWeight: 700, color: 'var(--accent-cyan)' }}>Autonomous Slick Identification &amp; SAR Segmentation</span>
            <span>•</span>
            <span>Process Sentinel-1 SAR imagery with AI to detect potential oil spills in near real-time.</span>
          </p>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {/* Target Dropdown Selector */}
          <div style={{ position: 'relative' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'var(--bg-card)',
              border: '1px solid var(--border-primary)',
              borderRadius: 4,
              padding: '6px 12px',
              fontSize: 12,
              fontFamily: 'JetBrains Mono',
              color: 'var(--text-primary)',
              cursor: 'pointer'
            }}>
              <Search size={13} color="var(--accent-cyan)" />
              <select
                value={selectedTargetCode}
                onChange={(e) => setSelectedTargetCode(e.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--accent-cyan)',
                  fontFamily: 'JetBrains Mono',
                  fontSize: 12,
                  fontWeight: 700,
                  outline: 'none',
                  cursor: 'pointer',
                  paddingRight: 16,
                  appearance: 'none'
                }}
              >
                {SAR_SEGMENTED_IMAGES.map((img) => (
                  <option key={img.id} value={img.targetCode} style={{ background: '#041525', color: '#e0f4ff' }}>
                    {img.targetCode} (22 Sep 2026 - {img.locationName})
                  </option>
                ))}
              </select>
              <ChevronDown size={12} color="var(--text-muted)" style={{ pointerEvents: 'none', marginLeft: -18 }} />
            </div>
          </div>

          {/* Date Picker Range */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'var(--bg-card)',
            border: '1px solid var(--border-primary)',
            borderRadius: 4,
            padding: '6px 12px',
            fontSize: 11,
            fontFamily: 'JetBrains Mono',
            color: 'var(--text-secondary)'
          }}>
            <Calendar size={13} color="var(--text-muted)" />
            <span>{dateRange}</span>
          </div>

          {/* Run Detection Button */}
          <button
            onClick={handleRunDetection}
            disabled={isRunningDetection}
            className="btn-primary"
            style={{
              padding: '8px 16px',
              fontSize: 11,
              fontWeight: 700,
              boxShadow: isRunningDetection ? '0 0 15px rgba(0,204,255,0.4)' : 'none'
            }}
          >
            {isRunningDetection ? (
              <>
                <RefreshCw size={13} className="animate-rotate" />
                RUNNING AI MODEL... ({detectionProgress}%)
              </>
            ) : (
              <>
                <Play size={13} fill="#000" />
                Run Detection
              </>
            )}
          </button>
        </div>
      </div>

      {/* Row 1: 4 Tactical Processing Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '12px'
      }}>
        {/* CARD 01: SAR ACQUISITION */}
        <div className="glass-card" style={{ padding: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: 'var(--accent-cyan)', fontFamily: 'JetBrains Mono', fontSize: 11, fontWeight: 800 }}>01</span>
                <span style={{ fontSize: 11, fontWeight: 700, fontFamily: 'JetBrains Mono', color: '#fff', letterSpacing: '0.05em' }}>
                  SAR ACQUISITION
                </span>
              </div>
              <CheckCircle2 size={14} color="var(--accent-green)" />
            </div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', marginBottom: 10 }}>
              Sentinel-1 VV/VH Imagery
            </div>

            {/* Side-by-side Dual Image Preview */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: 10 }}>
              {/* VV Polarization Image */}
              <div style={{ position: 'relative', height: 110, background: '#000', borderRadius: 3, overflow: 'hidden', border: '1px solid var(--border-primary)' }}>
                <img
                  src={currentData.path}
                  alt="VV Polarization"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%) contrast(120%)' }}
                />
                <div style={{
                  position: 'absolute', bottom: 4, left: 4,
                  background: 'rgba(0,0,0,0.75)', color: '#fff',
                  fontSize: 8, fontWeight: 700, padding: '1px 5px', borderRadius: 2, fontFamily: 'JetBrains Mono'
                }}>
                  VV Polarization
                </div>
              </div>

              {/* VH Polarization Image */}
              <div style={{ position: 'relative', height: 110, background: '#000', borderRadius: 3, overflow: 'hidden', border: '1px solid var(--border-primary)' }}>
                <img
                  src={currentData.path}
                  alt="VH Polarization"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%) brightness(0.85) contrast(140%)' }}
                />
                <div style={{
                  position: 'absolute', bottom: 4, left: 4,
                  background: 'rgba(0,0,0,0.75)', color: '#fff',
                  fontSize: 8, fontWeight: 700, padding: '1px 5px', borderRadius: 2, fontFamily: 'JetBrains Mono'
                }}>
                  VH Polarization
                </div>
              </div>
            </div>
          </div>

          {/* Footer Specs */}
          <div style={{ fontSize: 10, fontFamily: 'JetBrains Mono', display: 'flex', flexDirection: 'column', gap: 4, color: 'var(--text-muted)', borderTop: '1px dashed var(--border-primary)', paddingTop: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Satellite</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{currentData.sensor}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Acquisition</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{currentData.timestamp}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Product Type</span>
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>{currentData.productType}</span>
            </div>
          </div>
        </div>

        {/* CARD 02: AI SEGMENTATION */}
        <div className="glass-card" style={{ padding: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: 'var(--accent-cyan)', fontFamily: 'JetBrains Mono', fontSize: 11, fontWeight: 800 }}>02</span>
                <span style={{ fontSize: 11, fontWeight: 700, fontFamily: 'JetBrains Mono', color: '#fff', letterSpacing: '0.05em' }}>
                  AI SEGMENTATION
                </span>
              </div>
              <CheckCircle2 size={14} color="var(--accent-green)" />
            </div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', marginBottom: 10 }}>
              U-Net (Oil Spill Detection)
            </div>

            {/* Raw vs Red Overlay Segmentation View */}
            <div style={{ position: 'relative', height: 110, background: '#000', borderRadius: 3, overflow: 'hidden', border: '1px solid var(--accent-red-dim)', marginBottom: 10 }}>
              <img
                src={currentData.path}
                alt="AI Segmentation"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {/* Highlight Red Slick Overlay Effect */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse at 45% 50%, rgba(255,51,85,0.45) 0%, rgba(255,51,85,0.15) 50%, transparent 80%)',
                mixBlendMode: 'screen', pointerEvents: 'none'
              }} />

              {/* Detected Legend Tag */}
              <div style={{
                position: 'absolute', top: 6, right: 6,
                background: 'rgba(4, 21, 37, 0.85)',
                border: '1px solid var(--border-primary)',
                padding: '2px 6px', borderRadius: 2, fontSize: 8, fontFamily: 'JetBrains Mono', color: 'var(--text-secondary)'
              }}>
                <span style={{ color: 'var(--accent-red)', fontWeight: 700 }}>■</span> Detected Spill &nbsp;
                <span style={{ color: '#666' }}>■</span> Background
              </div>

              {/* Confidence Overlay Bar */}
              <div style={{
                position: 'absolute', bottom: 6, left: 6, right: 6,
                background: 'rgba(2, 11, 24, 0.85)', backdropFilter: 'blur(4px)',
                border: '1px solid var(--accent-cyan-dim)', borderRadius: 2, padding: '3px 8px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between'
              }}>
                <span style={{ fontSize: 8, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>Model Confidence</span>
                <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'JetBrains Mono' }}>
                  {currentData.confidence}%
                </span>
              </div>
            </div>
          </div>

          {/* Footer Specs */}
          <div style={{ fontSize: 10, fontFamily: 'JetBrains Mono', display: 'flex', flexDirection: 'column', gap: 4, color: 'var(--text-muted)', borderTop: '1px dashed var(--border-primary)', paddingTop: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Model</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{currentData.model}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Input</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{currentData.input}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Image Size</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{currentData.imageSize}</span>
            </div>
          </div>
        </div>

        {/* CARD 03: SPILL MASK VECTOR */}
        <div className="glass-card" style={{ padding: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: 'var(--accent-cyan)', fontFamily: 'JetBrains Mono', fontSize: 11, fontWeight: 800 }}>03</span>
                <span style={{ fontSize: 11, fontWeight: 700, fontFamily: 'JetBrains Mono', color: '#fff', letterSpacing: '0.05em' }}>
                  SPILL MASK VECTOR
                </span>
              </div>
              <CheckCircle2 size={14} color="var(--accent-green)" />
            </div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', marginBottom: 10 }}>
              Polygon Extraction
            </div>

            {/* Tactical Vector Canvas Representation */}
            <div style={{
              position: 'relative', height: 110, background: '#020b18',
              borderRadius: 3, border: '1px solid var(--border-primary)', overflow: 'hidden',
              display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10
            }}>
              {/* Tactical grid background */}
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'radial-gradient(rgba(0,204,255,0.15) 1px, transparent 1px)',
                backgroundSize: '12px 12px'
              }} />

              {/* Vector SVG Graphic */}
              <svg width="100%" height="100%" viewBox="0 0 200 120" style={{ position: 'relative', zIndex: 1 }}>
                <polygon
                  points="30,65 55,30 110,25 170,45 160,85 105,95 45,85"
                  fill="rgba(255, 51, 85, 0.25)"
                  stroke="#ff3355"
                  strokeWidth="1.5"
                  strokeDasharray="4, 3"
                />
                <circle cx="102" cy="58" r="3.5" fill="#ffffff" stroke="#ff3355" strokeWidth="1" />
                <circle cx="102" cy="58" r="8" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" strokeDasharray="2 2" />
                <text x="114" y="61" fill="var(--text-muted)" fontSize="8" fontFamily="JetBrains Mono">Centroid</text>
              </svg>

              {/* Vector Legend */}
              <div style={{
                position: 'absolute', top: 6, right: 6,
                background: 'rgba(4, 21, 37, 0.85)', border: '1px solid var(--border-primary)',
                padding: '2px 6px', borderRadius: 2, fontSize: 8, fontFamily: 'JetBrains Mono', color: 'var(--text-secondary)'
              }}>
                <span style={{ color: 'var(--accent-red)' }}>■</span> Spill Polygon &nbsp;
                <span style={{ color: '#fff' }}>●</span> Centroid
              </div>
            </div>
          </div>

          {/* Footer Specs */}
          <div style={{ fontSize: 10, fontFamily: 'JetBrains Mono', display: 'flex', flexDirection: 'column', gap: 4, color: 'var(--text-muted)', borderTop: '1px dashed var(--border-primary)', paddingTop: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Area</span>
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>{currentData.slickAreaKm2} km²</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Centroid</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{currentData.coordinates.formatted}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Perimeter / Vertices</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{currentData.perimeterKm} km / {currentData.vertices}</span>
            </div>
          </div>
        </div>

        {/* CARD 04: VALIDATION EVIDENCE */}
        <div className="glass-card" style={{ padding: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: 'var(--accent-amber)', fontFamily: 'JetBrains Mono', fontSize: 11, fontWeight: 800 }}>04</span>
                <span style={{ fontSize: 11, fontWeight: 700, fontFamily: 'JetBrains Mono', color: '#fff', letterSpacing: '0.05em' }}>
                  VALIDATION EVIDENCE
                </span>
              </div>
              <AlertTriangle size={14} color="var(--accent-amber)" />
            </div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', marginBottom: 8 }}>
              Multi-source Analysis
            </div>

            {/* Badge Indicator */}
            <div style={{
              background: 'rgba(0, 255, 136, 0.08)',
              border: '1px solid var(--accent-green)',
              borderRadius: 3,
              padding: '6px 10px',
              display: 'flex',
              alignItems: 'center',
              justify: 'space-between',
              marginBottom: 8
            }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent-green)', fontFamily: 'JetBrains Mono', display: 'flex', alignItems: 'center', gap: 6 }}>
                <CheckCircle2 size={13} color="var(--accent-green)" />
                {currentData.validation.status}
              </span>
              <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--accent-green)', fontFamily: 'JetBrains Mono' }}>
                Confidence: {currentData.validation.confidence}%
              </span>
            </div>

            {/* Environmental List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 10, fontFamily: 'JetBrains Mono', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Wind Speed</span>
                <span>{currentData.validation.windSpeed} <span style={{ color: 'var(--accent-green)' }}>✓ {currentData.validation.windStatus}</span></span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Ocean Current</span>
                <span>{currentData.validation.oceanCurrent} <span style={{ color: 'var(--accent-green)' }}>✓ {currentData.validation.currentStatus}</span></span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Wave Height</span>
                <span>{currentData.validation.waveHeight} <span style={{ color: 'var(--accent-green)' }}>✓ {currentData.validation.waveStatus}</span></span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Sentinel-3 (Chl-a)</span>
                <span>{currentData.validation.sentinel3Chla} <span style={{ color: 'var(--accent-cyan)' }}>✓ {currentData.validation.chlaStatus}</span></span>
              </div>
            </div>
          </div>

          {/* Footer Specs */}
          <div style={{ fontSize: 10, fontFamily: 'JetBrains Mono', display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', borderTop: '1px dashed var(--border-primary)', paddingTop: 6 }}>
            <span>Look-alike Check</span>
            <span style={{ color: 'var(--accent-green)', fontWeight: 600 }}>{currentData.validation.lookAlikeCheck}</span>
          </div>
        </div>
      </div>

      {/* Row 2: 6 Metric Cards Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gap: '10px'
      }}>
        {/* Metric 1 */}
        <div className="glass-card" style={{ padding: '10px 12px' }}>
          <div style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            MODEL CONFIDENCE
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'JetBrains Mono', marginTop: 4, display: 'flex', alignItems: 'baseline', gap: 6 }}>
            {currentData.confidence}%
            <span style={{ fontSize: 10, color: 'var(--accent-green)', fontWeight: 600 }}>+5.1%</span>
          </div>
          <div style={{ fontSize: 9, color: 'var(--text-muted)', marginTop: 2 }}>U-Net Segmentation</div>
        </div>

        {/* Metric 2 */}
        <div className="glass-card" style={{ padding: '10px 12px' }}>
          <div style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            SPILL AREA
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#fff', fontFamily: 'JetBrains Mono', marginTop: 4 }}>
            {currentData.slickAreaKm2} <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>km²</span>
          </div>
          <div style={{ fontSize: 9, color: 'var(--text-muted)', marginTop: 2 }}>From vector polygon</div>
        </div>

        {/* Metric 3 */}
        <div className="glass-card" style={{ padding: '10px 12px' }}>
          <div style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            ACQUISITION TIME
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#fff', fontFamily: 'JetBrains Mono', marginTop: 6 }}>
            22 Sep 2026
          </div>
          <div style={{ fontSize: 9, color: 'var(--text-muted)', marginTop: 2 }}>04:15:32 PM</div>
        </div>

        {/* Metric 4 */}
        <div className="glass-card" style={{ padding: '10px 12px' }}>
          <div style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            GEOGRAPHIC CENTROID
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent-cyan)', fontFamily: 'JetBrains Mono', marginTop: 6, whiteSpace: 'nowrap' }}>
            {currentData.coordinates.formatted}
          </div>
          <div style={{ fontSize: 9, color: 'var(--text-muted)', marginTop: 2 }}>WGS84 Datum</div>
        </div>

        {/* Metric 5 */}
        <div className="glass-card" style={{ padding: '10px 12px' }}>
          <div style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            POLARIZATION CHANNELS
          </div>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#fff', fontFamily: 'JetBrains Mono', marginTop: 4 }}>
            VV + VH
          </div>
          <div style={{ fontSize: 9, color: 'var(--text-muted)', marginTop: 2 }}>IW_GRDH_1S</div>
        </div>

        {/* Metric 6 */}
        <div className="glass-card" style={{ padding: '10px 12px' }}>
          <div style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            VALIDATION STATE
          </div>
          <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--accent-green)', fontFamily: 'JetBrains Mono', marginTop: 6 }}>
            {currentData.validation.status}
          </div>
          <div style={{ fontSize: 9, color: 'var(--text-muted)', marginTop: 2 }}>Conf: {currentData.validation.confidence}%</div>
        </div>
      </div>

      {/* Row 3: Detection Map & Evidence Overlay Split */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 340px',
        gap: '12px',
        minHeight: 460
      }}>
        {/* Left Span: Map & Evidence Overlay */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
          {/* Header Bar on Map */}
          <div style={{
            padding: '10px 14px',
            borderBottom: '1px solid var(--border-primary)',
            background: 'var(--bg-secondary)',
            display: 'flex',
            alignItems: 'center',
            justify: 'space-between',
            flexShrink: 0
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Layers size={14} color="var(--accent-cyan)" />
              <span style={{ fontSize: 12, fontWeight: 700, fontFamily: 'JetBrains Mono', color: '#fff', letterSpacing: '0.05em' }}>
                DETECTION MAP &amp; EVIDENCE OVERLAY
              </span>
            </div>
            <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono', color: 'var(--accent-cyan)', fontWeight: 600 }}>
              {currentData.coordinates.formatted}
            </div>
          </div>

          {/* Map Container View */}
          <div style={{ flex: 1, position: 'relative', minHeight: 380 }}>
            <MapView
              center={[currentData.coordinates.lat, currentData.coordinates.lon]}
              zoom={12}
              showSpill={layers.spillPolygon}
              showVessels={layers.vesselTracks}
              showDriftTrail={layers.predictedDrift}
              highlightSpill={{ lat: currentData.coordinates.lat, lng: currentData.coordinates.lon }}
            />

            {/* Layer Control Panel (Top-Left Map Overlay) */}
            <div style={{
              position: 'absolute', top: 14, left: 14, zIndex: 1000,
              background: 'rgba(4, 21, 37, 0.9)',
              backdropFilter: 'blur(8px)',
              border: '1px solid var(--border-primary)',
              borderRadius: 4,
              padding: '10px 14px',
              width: 200,
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, fontFamily: 'JetBrains Mono', color: 'var(--text-secondary)', marginBottom: 8, letterSpacing: '0.05em' }}>
                MAP LAYERS CONTROLS
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 10, fontFamily: 'JetBrains Mono' }}>
                {[
                  { key: 'satelliteBasemap', label: 'Satellite Basemap' },
                  { key: 'spillPolygon', label: 'Spill Polygon' },
                  { key: 'centroid', label: 'Centroid' },
                  { key: 'vesselTracks', label: 'Vessel Tracks (AIS)' },
                  { key: 'predictedDrift', label: 'Predicted Drift (24h)' },
                  { key: 'coastline', label: 'Coastline' },
                  { key: 'ports', label: 'Ports' },
                ].map(({ key, label }) => {
                  const isChecked = layers[key as keyof typeof layers]
                  return (
                    <label key={key} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: isChecked ? '#fff' : 'var(--text-muted)' }}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleLayer(key as keyof typeof layers)}
                        style={{ accentColor: 'var(--accent-cyan)', cursor: 'pointer' }}
                      />
                      <span>{label}</span>
                    </label>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar Span: Detection Evidence Details */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Header & Tabs */}
          <div style={{
            padding: '10px 14px',
            borderBottom: '1px solid var(--border-primary)',
            background: 'var(--bg-secondary)',
            flexShrink: 0
          }}>
            <div style={{ fontSize: 12, fontWeight: 700, fontFamily: 'JetBrains Mono', color: '#fff', letterSpacing: '0.05em', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Info size={14} color="var(--accent-cyan)" />
              DETECTION EVIDENCE
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 4, background: 'var(--bg-primary)', padding: 2, borderRadius: 3, border: '1px solid var(--border-primary)' }}>
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'model', label: 'Model vs Validation' },
                { id: 'environmental', label: 'Environmental' },
                { id: 'metadata', label: 'Metadata' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  style={{
                    flex: 1,
                    padding: '4px 6px',
                    fontSize: 9,
                    fontFamily: 'JetBrains Mono',
                    fontWeight: activeTab === tab.id ? 700 : 500,
                    color: activeTab === tab.id ? 'var(--accent-cyan)' : 'var(--text-muted)',
                    background: activeTab === tab.id ? 'var(--bg-card-hover)' : 'transparent',
                    border: 'none',
                    borderRadius: 2,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content Body */}
          <div style={{ flex: 1, padding: '14px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {activeTab === 'overview' && (
              <>
                {/* Bar 1: Model Confidence */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, fontFamily: 'JetBrains Mono', color: '#fff' }}>
                      Model Confidence (Segmentation)
                    </span>
                    <span style={{ fontSize: 14, fontWeight: 800, color: 'var(--accent-red)', fontFamily: 'JetBrains Mono' }}>
                      {currentData.confidence}%
                    </span>
                  </div>
                  {/* Progress Bar Container */}
                  <div style={{ height: 8, background: '#0a2236', borderRadius: 4, overflow: 'hidden', border: '1px solid var(--border-primary)' }}>
                    <div style={{
                      height: '100%',
                      width: `${currentData.confidence}%`,
                      background: 'linear-gradient(90deg, #ff3355, #ff6688)',
                      boxShadow: '0 0 10px rgba(255, 51, 85, 0.5)',
                      transition: 'width 0.4s ease'
                    }} />
                  </div>
                  <p style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 6, lineHeight: 1.4 }}>
                    Confidence that the detected pixels are an oil-like slick based on SAR image features (U-Net).
                  </p>
                </div>

                <div className="divider" style={{ margin: '2px 0' }} />

                {/* Bar 2: Validation Confidence */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, fontFamily: 'JetBrains Mono', color: '#fff' }}>
                      Validation Confidence
                    </span>
                    <span style={{ fontSize: 14, fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'JetBrains Mono' }}>
                      {currentData.validation.confidence}%
                    </span>
                  </div>
                  {/* Progress Bar Container */}
                  <div style={{ height: 8, background: '#0a2236', borderRadius: 4, overflow: 'hidden', border: '1px solid var(--border-primary)' }}>
                    <div style={{
                      height: '100%',
                      width: `${currentData.validation.confidence}%`,
                      background: 'linear-gradient(90deg, #00ccff, #00ff88)',
                      boxShadow: '0 0 10px rgba(0, 204, 255, 0.5)',
                      transition: 'width 0.4s ease'
                    }} />
                  </div>
                  <p style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 6, lineHeight: 1.4 }}>
                    Confidence after multi-source analysis (weather, ocean conditions, Sentinel-3, look-alike check).
                  </p>
                </div>

                <div className="divider" style={{ margin: '2px 0' }} />

                {/* Tactical Alert Banner */}
                <div style={{
                  background: 'rgba(255, 51, 85, 0.08)',
                  border: '1px solid var(--accent-red-dim)',
                  borderRadius: 4,
                  padding: '10px 12px'
                }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--accent-red)', fontFamily: 'JetBrains Mono', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <Zap size={13} color="var(--accent-red)" />
                    MARITIME DISPATCH RECOMMENDATION
                  </div>
                  <p style={{ fontSize: 10, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
                    Primary slick identified at {currentData.coordinates.formatted} with area of {currentData.slickAreaKm2} km². High probability of active bilge/bunker discharge.
                  </p>
                </div>
              </>
            )}

            {activeTab === 'model' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 11, fontFamily: 'JetBrains Mono' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-primary)', paddingBottom: 6 }}>
                  <span style={{ color: 'var(--text-muted)' }}>Backbone Model</span>
                  <span style={{ color: '#fff' }}>U-Net ResNet-50</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-primary)', paddingBottom: 6 }}>
                  <span style={{ color: 'var(--text-muted)' }}>Intersection over Union (IoU)</span>
                  <span style={{ color: 'var(--accent-cyan)' }}>0.884</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-primary)', paddingBottom: 6 }}>
                  <span style={{ color: 'var(--text-muted)' }}>Dice Similarity Coefficient</span>
                  <span style={{ color: 'var(--accent-green)' }}>0.912</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-primary)', paddingBottom: 6 }}>
                  <span style={{ color: 'var(--text-muted)' }}>SAR Backscatter Dampening</span>
                  <span style={{ color: 'var(--accent-red)' }}>-21.4 dB</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Feature Extraction Channels</span>
                  <span style={{ color: '#fff' }}>Dual VV / VH</span>
                </div>
              </div>
            )}

            {activeTab === 'environmental' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 11, fontFamily: 'JetBrains Mono' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-primary)', paddingBottom: 6 }}>
                  <span style={{ color: 'var(--text-muted)' }}>Surface Wind Vector</span>
                  <span style={{ color: '#fff' }}>{currentData.validation.windSpeed} @ 220° (SSW)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-primary)', paddingBottom: 6 }}>
                  <span style={{ color: 'var(--text-muted)' }}>HYCOM Surface Current</span>
                  <span style={{ color: '#fff' }}>{currentData.validation.oceanCurrent} @ 045° (NE)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-primary)', paddingBottom: 6 }}>
                  <span style={{ color: 'var(--text-muted)' }}>Significant Wave Height</span>
                  <span style={{ color: '#fff' }}>{currentData.validation.waveHeight}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-primary)', paddingBottom: 6 }}>
                  <span style={{ color: 'var(--text-muted)' }}>Sentinel-3 OLCI (Chl-a)</span>
                  <span style={{ color: 'var(--accent-cyan)' }}>{currentData.validation.sentinel3Chla}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Sea Surface Temp</span>
                  <span style={{ color: '#fff' }}>28.4 °C</span>
                </div>
              </div>
            )}

            {activeTab === 'metadata' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 10, fontFamily: 'JetBrains Mono' }}>
                <div style={{ color: 'var(--text-muted)', marginBottom: 2 }}>GRANULE METADATA JSON:</div>
                <pre style={{
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-primary)',
                  padding: '8px',
                  borderRadius: 3,
                  color: 'var(--accent-cyan)',
                  fontSize: 9,
                  overflowX: 'auto',
                  lineHeight: 1.4
                }}>
                  {JSON.stringify({
                    target: currentData.targetCode,
                    location: currentData.locationName,
                    granule: currentData.originalFilename,
                    orbit: currentData.orbitPass,
                    sensor: currentData.sensor,
                    polarization: currentData.polarization,
                    bbox: [currentData.coordinates.lat, currentData.coordinates.lon]
                  }, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
