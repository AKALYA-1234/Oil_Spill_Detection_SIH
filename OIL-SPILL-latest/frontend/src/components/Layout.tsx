import type { ReactNode } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Satellite, Wind, Ship, AlertTriangle,
  Shield, Clock, Wifi, User, ChevronRight
} from 'lucide-react'
import { useLiveTime } from '../hooks/useLiveTime'

const navItems = [
  { path: '/command-center', label: 'Command Center', icon: LayoutDashboard },
  { path: '/satellite-detection', label: 'Satellite Detection', icon: Satellite },
  { path: '/validation-drift', label: 'Validation & Drift', icon: Wind },
  { path: '/ais-investigation', label: 'AIS Investigation', icon: Ship },
  { path: '/emergency-response', label: 'Emergency Response', icon: AlertTriangle },
]

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation()
  const time = useLiveTime()
  const currentPage = navItems.find(n => n.path === location.pathname)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--bg-primary)' }}>
      {/* Top Header */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 16px', height: '44px', flexShrink: 0,
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-primary)',
      }}>
        {/* Left: Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'var(--accent-cyan-dim)',
            border: '1px solid var(--accent-cyan)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative'
          }}>
            <Shield size={16} color="var(--accent-cyan)" />
            <div style={{
              position: 'absolute', inset: -3,
              borderRadius: '50%',
              border: '1px solid var(--accent-cyan)',
              opacity: 0.3,
              animation: 'pulse-ring 2s infinite'
            }} />
          </div>
          <div>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 13, fontWeight: 700, color: 'var(--accent-cyan)', lineHeight: 1 }}>
              MARINEGUARD AI
            </div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>
              SATELLITE INTEL V2.4
            </div>
          </div>
        </div>

        {/* Center: Page info */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono', letterSpacing: '0.1em' }}>
            TACTICAL OPERATIONS PLATFORM
          </div>
          <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>
            Autonomous Maritime Slick Detection & AIS Intercept
          </div>
        </div>

        {/* Right: Status bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="status-dot animate-blink" style={{ background: 'var(--accent-green)' }} />
            <span style={{ fontSize: 10, color: 'var(--accent-green)', fontFamily: 'JetBrains Mono', fontWeight: 600 }}>SYSTEM OPERATIONAL</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-secondary)', fontSize: 11, fontFamily: 'JetBrains Mono' }}>
            <Clock size={12} />
            <span>UTC {time}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-secondary)', fontSize: 11, fontFamily: 'JetBrains Mono' }}>
            <Wifi size={12} color="var(--accent-cyan)" />
            <span style={{ color: 'var(--accent-cyan)' }}>OPSEC LEVEL 3</span>
          </div>
          <div style={{
            width: 28, height: 28, borderRadius: '50%',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer'
          }}>
            <User size={13} color="var(--text-secondary)" />
          </div>
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar */}
        <aside style={{
          width: 200, flexShrink: 0,
          background: 'var(--bg-secondary)',
          borderRight: '1px solid var(--border-primary)',
          display: 'flex', flexDirection: 'column',
          padding: '12px 8px',
        }}>
          <div style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', letterSpacing: '0.12em', padding: '0 4px 8px', textTransform: 'uppercase' }}>
            Mission Modules
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {navItems.map(({ path, label, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              >
                <Icon size={14} />
                <span style={{ flex: 1 }}>{label}</span>
                {location.pathname === path && <ChevronRight size={10} />}
              </NavLink>
            ))}
          </nav>

          <div style={{ flex: 1 }} />

          {/* Bottom status */}
          <div style={{ padding: '8px 4px', borderTop: '1px solid var(--border-primary)' }}>
            <div style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', letterSpacing: '0.12em', marginBottom: '6px' }}>
              DEFENSE APERTURE
            </div>
            <div style={{ fontSize: 10, color: 'var(--accent-cyan)', fontFamily: 'JetBrains Mono', fontWeight: 600 }}>
              SAR CONSTELLATION
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '4px' }}>
              <span className="status-dot animate-blink" style={{ background: 'var(--accent-green)', width: 5, height: 5 }} />
              <span style={{ fontSize: 9, color: 'var(--accent-green)', fontFamily: 'JetBrains Mono' }}>SENTINEL-1A ACTIVE</span>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {/* Sub-header */}
          <div style={{
            padding: '8px 16px',
            borderBottom: '1px solid var(--border-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexShrink: 0,
          }}>
            <div>
              <div style={{ fontSize: 9, color: 'var(--accent-cyan)', fontFamily: 'JetBrains Mono', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                {currentPage ? 'Live Maritime Dispatch Feed' : ''}
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginTop: 2 }}>
                {currentPage?.label || ''}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 10, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>
              <Wifi size={10} color="var(--accent-cyan)" />
              <span style={{ color: 'var(--accent-cyan)' }}>RADAR COMPOSITE ACQUISITION</span>
              <span>·</span>
              <span>AIS SYNC ACTIVE</span>
            </div>
          </div>

          {/* Page content */}
          <div style={{ flex: 1, overflow: 'hidden' }}>
            {children}
          </div>
        </main>
      </div>

      {/* Footer bar */}
      <div style={{
        height: 24,
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-primary)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 16px',
        fontSize: 10,
        color: 'var(--text-muted)',
        fontFamily: 'JetBrains Mono',
        flexShrink: 0,
      }}>
        <span>DEMONSTRATION DATA — NOT FOR OPERATIONAL USE</span>
        <span>LAT 24°41'12"N · LON 058°19'40"E · FEED: COPERNICUS SENTINEL-1A</span>
      </div>
    </div>
  )
}
