import { NavLink } from 'react-router-dom'
import type { ReactNode } from 'react'
import { IconBell, IconBriefcase, IconChart, IconHome, IconMail, IconSearch, IconSettings, IconUsers } from './Icons'

const STRIPE_COLORS = ['#ef4444', '#f5a524', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6']

const NAV_ITEMS = [
  { to: '/', label: 'Start', icon: IconHome },
  { to: '/stellen', label: 'Stellen', icon: IconBriefcase },
  { to: '/verwaltung/stellenantraege', label: 'Stellenanträge', icon: IconMail },
  { to: '/talentpools', label: 'Talent Pools', icon: IconUsers },
  { to: '/berichte', label: 'Berichte', icon: IconChart, note: 'kommt ins MMT' },
  { to: '/verwaltung', label: 'Verwaltung', icon: IconSettings },
]

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-brand-name">FUNZONE Recruiting</div>
          <div className="sidebar-brand-stripe">
            {STRIPE_COLORS.map((c) => (
              <span key={c} style={{ background: c }} />
            ))}
          </div>
        </div>
        <div className="sidebar-search">
          <IconSearch size={14} />
          Alle Ansichten durchsuchen…
        </div>
        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => 'sidebar-link' + (isActive ? ' active' : '')}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Icon size={16} />
                  {item.label}
                  {item.note && <span className="sidebar-link-note">({item.note})</span>}
                </span>
              </NavLink>
            )
          })}
        </nav>
      </aside>
      <div className="main">
        <div className="topbar">
          <div className="topbar-title">Recruiting</div>
          <div className="topbar-search">
            <IconSearch size={14} />
            Bewerber &amp; Stellen (Name, E-Mail, Job)
          </div>
          <div className="topbar-icon">
            <IconBell size={16} />
          </div>
          <div className="topbar-user">
            <div className="topbar-avatar">PR</div>
            Philipp Ridder
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}
