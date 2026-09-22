import { useState } from 'react'
import { Play, Image as ImageIcon } from 'lucide-react'
import { SAR_SEGMENTED_IMAGES, type SarSegmentedImage } from '../utils/sarImages'

export default function SatelliteDetection() {
  const [animating, setAnimating] = useState(false)
  const [activeStage, setActiveStage] = useState(2)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0)

  const currentImage: SarSegmentedImage = SAR_SEGMENTED_IMAGES[selectedImageIndex] || SAR_SEGMENTED_IMAGES[0]

  const handleAnimate = () => {
    setAnimating(true)
    let s = 1
    const interval = setInterval(() => {
      setActiveStage(s)
      s++
      if (s > 3) {
        clearInterval(interval)
        setAnimating(false)
      }
    }, 1500)
  }

  return (
    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px', height: '100%', overflowY: 'auto' }}>
      {/* Header bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="tag-cyan">PIPELINE VERIFICATION</span>
            <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>
              {currentImage.orbitPass}
            </span>
          </div>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', marginTop: 4 }}>
            Autonomous Slick Identification & SAR Segmentation
          </h1>
          <p style={{ fontSize: 11, color: 'var(--text-muted)', maxWidth: 680, marginTop: 4, lineHeight: 1.4 }}>
            High-resolution C-Band radar decodes sea surface capillary wave dampening, isolating hydrocarbon signatures through deep neural segmentation models.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>ACTIVE FRAME</div>
            <div style={{ fontSize: 11, color: 'var(--accent-cyan)', fontFamily: 'JetBrains Mono', fontWeight: 600 }}>
              FRAME #{currentImage.id} / 15
            </div>
          </div>
          <button
            className="btn-primary"
            onClick={handleAnimate}
            disabled={animating}
            style={{ opacity: animating ? 0.6 : 1 }}
          >
            <Play size={12} /> {animating ? 'PROCESSING...' : 'ANIMATE PIPELINE'}
          </button>
        </div>
      </div>

      {/* 3 Pipeline Stages Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
        {/* STAGE 01 */}
        <div className={`glass-card ${activeStage === 1 ? 'glass-card-bright' : ''}`} style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 10, fontFamily: 'JetBrains Mono', color: 'var(--text-secondary)', fontWeight: 600 }}>
              STAGE 01 // SAR SATELLITE IMAGE
            </span>
            <span className="tag-cyan" style={{ fontSize: 9 }}>{currentImage.polarization}</span>
          </div>

          <div style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>
            {currentImage.coordinates.formatted}
          </div>

          {/* SAR Real Segmented Image View */}
          <div style={{
            height: 170, background: '#010a14',
            border: '1px solid var(--border-primary)',
            borderRadius: 4,
            position: 'relative', overflow: 'hidden',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <img 
              src={currentImage.path} 
              alt={currentImage.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.9) contrast(110%)' }}
            />
            <div style={{
              position: 'absolute', top: 6, left: 6,
              background: 'rgba(0, 0, 0, 0.65)', border: '1px solid var(--border-primary)',
              borderRadius: 2, padding: '2px 6px', fontSize: 8, color: '#fff', fontFamily: 'JetBrains Mono'
            }}>
              RAW GRD INGESTION
            </div>
            <div style={{ position: 'absolute', bottom: 4, left: 6, fontSize: 9, color: 'rgba(255,255,255,0.8)', fontFamily: 'JetBrains Mono', textShadow: '0 1px 2px #000' }}>
              σ° -21.4 dB | {currentImage.sensor}
            </div>
            {activeStage === 1 && <div className="scan-line" />}
          </div>

          <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>
            Specular ocean reflection <span style={{ color: 'var(--text-secondary)' }}>LEVEL-1 GRD</span>
          </div>
        </div>

        {/* STAGE 02 */}
        <div className={`glass-card ${activeStage === 2 ? 'glass-card-bright' : ''}`} style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 10, fontFamily: 'JetBrains Mono', color: 'var(--text-secondary)', fontWeight: 600 }}>
              STAGE 02 // AI SEGMENTATION
            </span>
            <span className="tag-critical" style={{ fontSize: 9 }}>{currentImage.confidence}% CONF</span>
          </div>

          <div style={{ fontSize: 9, color: 'var(--accent-cyan)', fontFamily: 'JetBrains Mono', display: 'flex', justifyContent: 'space-between' }}>
            <span>U-NET RESNET-50</span>
            <span>IoU: 0.884</span>
          </div>

          {/* AI Segmentation Visual with Real Segmented Image Overlay */}
          <div style={{
            height: 170, background: '#010f1e',
            border: '1px solid var(--accent-cyan-dim)',
            borderRadius: 4,
            position: 'relative', overflow: 'hidden',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <img 
              src={currentImage.path} 
              alt={currentImage.title}
              style={{ 
                width: '100%', height: '100%', objectFit: 'cover',
                filter: 'hue-rotate(180deg) saturate(200%) contrast(130%)'
              }}
            />
            {/* Anomaly Highlight Overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              boxShadow: 'inset 0 0 30px rgba(0, 204, 255, 0.4)',
              pointerEvents: 'none'
            }} />
            <div style={{
              position: 'absolute', top: 8, right: 8,
              background: 'rgba(239, 68, 68, 0.85)', border: '1px solid var(--accent-red)',
              color: '#fff', padding: '2px 8px', fontSize: 8, fontFamily: 'JetBrains Mono', fontWeight: 700, borderRadius: 2
            }}>
              SEGMENTATION MASK ACTIVE
            </div>
            {activeStage === 2 && <div className="scan-line" />}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 10, fontFamily: 'JetBrains Mono' }}>
            <span style={{ color: 'var(--text-muted)' }}>Convolutional feature map</span>
            <span style={{ color: 'var(--accent-cyan)' }}>DETECTED SLICK</span>
          </div>
        </div>

        {/* STAGE 03 */}
        <div className={`glass-card ${activeStage === 3 ? 'glass-card-bright' : ''}`} style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 10, fontFamily: 'JetBrains Mono', color: 'var(--text-secondary)', fontWeight: 600 }}>
              STAGE 03 // SPILL MASK VECTOR
            </span>
            <span className="tag-cyan" style={{ fontSize: 9 }}>GEOJSON VECTOR</span>
          </div>

          <div style={{ fontSize: 9, color: 'var(--accent-green)', fontFamily: 'JetBrains Mono', textAlign: 'right' }}>
            {currentImage.slickAreaKm2} km² AREA
          </div>

          {/* GeoJSON Contour Visual */}
          <div style={{
            height: 170, background: '#020b18',
            border: '1px solid var(--border-primary)',
            borderRadius: 4,
            position: 'relative', overflow: 'hidden',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <svg width="180" height="120" viewBox="0 0 180 120">
              <path
                d="M 20 60 Q 40 20, 90 35 T 160 50 Q 150 90, 100 85 T 20 60 Z"
                fill="rgba(0, 204, 255, 0.18)"
                stroke="var(--accent-cyan)"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              <circle cx="90" cy="55" r="4" fill="var(--accent-red)" />
              <text x="98" y="58" fill="var(--text-muted)" fontSize="8" fontFamily="JetBrains Mono">CENTROID</text>
            </svg>
            <div style={{ position: 'absolute', bottom: 4, left: 6, fontSize: 9, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>
              POLYGON VERTICES: 312
            </div>
            {activeStage === 3 && <div className="scan-line" />}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 10, fontFamily: 'JetBrains Mono' }}>
            <span style={{ color: 'var(--text-muted)' }}>Calibrated contour bound</span>
            <span style={{ color: 'var(--accent-green)' }}>READY FOR DRIFT</span>
          </div>
        </div>
      </div>

      {/* Model Performance Banner */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px',
        padding: '12px', background: 'var(--bg-card)', border: '1px solid var(--border-primary)', borderRadius: 4
      }}>
        {[
          { label: 'AI ARCHITECTURE', value: 'U-Net ResNet-50 backbone', sub: 'PyTorch CUDA Accelerated' },
          { label: 'PREDICTION CONFIDENCE', value: `${currentImage.confidence}%`, sub: '±1.2% dev', color: 'var(--accent-cyan)' },
          { label: 'CALCULATED SURFACE SLICK', value: `${currentImage.slickAreaKm2} km²`, sub: currentImage.sensor },
          { label: 'GEOGRAPHIC CENTROID', value: currentImage.coordinates.formatted, sub: 'WGS84 Datum' },
        ].map((item, idx) => (
          <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', letterSpacing: '0.08em' }}>{item.label}</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: item.color || 'var(--text-primary)', fontFamily: 'JetBrains Mono' }}>{item.value}</span>
            <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{item.sub}</span>
          </div>
        ))}
      </div>

      {/* SAR Segmented Images Gallery (15 Images) */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-primary)', padding: '14px', borderRadius: 6, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ImageIcon size={16} style={{ color: 'var(--accent-cyan)' }} />
            <span style={{ fontSize: 12, fontWeight: 700, fontFamily: 'JetBrains Mono', color: 'var(--text-primary)', letterSpacing: '0.05em' }}>
              SAR SEGMENTED IMAGES DATASET GALLERY (15 FRAMES)
            </span>
          </div>
          <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>
            CLICK ANY FRAME TO INSPECT SEGMENTATION
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '10px'
        }}>
          {SAR_SEGMENTED_IMAGES.map((img, idx) => {
            const isSelected = selectedImageIndex === idx
            return (
              <div
                key={img.id}
                onClick={() => setSelectedImageIndex(idx)}
                style={{
                  border: isSelected ? '2px solid var(--accent-cyan)' : '1px solid var(--border-primary)',
                  borderRadius: 4,
                  overflow: 'hidden',
                  background: 'var(--bg-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  transform: isSelected ? 'scale(1.02)' : 'none',
                  boxShadow: isSelected ? '0 0 12px rgba(0, 204, 255, 0.3)' : 'none'
                }}
              >
                <div style={{ height: 95, position: 'relative', overflow: 'hidden', background: '#000' }}>
                  <img
                    src={img.path}
                    alt={img.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute', top: 4, left: 4,
                    background: isSelected ? 'var(--accent-cyan)' : 'rgba(0,0,0,0.7)',
                    color: isSelected ? '#000' : '#fff',
                    fontSize: 9, fontWeight: 800, padding: '1px 5px', borderRadius: 2, fontFamily: 'JetBrains Mono'
                  }}>
                    #{img.id}
                  </div>
                  <div style={{
                    position: 'absolute', bottom: 4, right: 4,
                    background: 'rgba(0,0,0,0.75)', color: 'var(--accent-cyan)',
                    fontSize: 8, padding: '1px 4px', borderRadius: 2, fontFamily: 'JetBrains Mono'
                  }}>
                    {img.slickAreaKm2} km²
                  </div>
                </div>
                <div style={{ padding: '6px 8px' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: isSelected ? 'var(--accent-cyan)' : 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    Frame #{img.id}
                  </div>
                  <div style={{ fontSize: 8, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', marginTop: 2 }}>
                    Conf: {img.confidence}% | {img.status}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
