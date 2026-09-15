import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { IconBriefcase, IconChart, IconGlobe, IconHome, IconMail, IconSettings, IconUsers } from '../Icons'

const HERO_ICONS = [IconBriefcase, IconUsers, IconSettings, IconGlobe, IconMail, IconChart, IconHome]

const NAV = [
  { to: '/karriere/ueber-uns', label: 'Über uns' },
  { to: '/karriere/offene-stellen', label: 'Offene Stellen' },
  { to: '/karriere/prozess', label: 'Prozess & Stellenprofile' },
]

export function CareerLayout({ heading, children }: { heading: string; children: ReactNode }) {
  const navigate = useNavigate()

  return (
    <div className="cp-page">
      <div className="cp-nav">
        <div className="cp-logo" style={{ cursor: 'pointer' }} onClick={() => navigate('/karriere')}>
          <span className="word">
            FUN<span className="zone">ZONE</span>
          </span>
          <span className="tag">Einfach Spaß haben!</span>
        </div>
        <div className="cp-navlinks">
          {NAV.map((n) => (
            <a key={n.to} onClick={() => navigate(n.to)}>
              {n.label}
            </a>
          ))}
        </div>
        <button className="cp-navcta">Job-Alerts</button>
      </div>

      <div className="cp-hero">
        <div className="cp-hero-icons">
          {HERO_ICONS.map((Icon, i) => (
            <Icon key={i} size={30} />
          ))}
        </div>
        <h1>{heading}</h1>
        <div className="cp-brand-grid">
          <div>
            LASER<span className="zone">ZONE</span>
          </div>
          <div>
            AXE<span className="zone">ZONE</span>
          </div>
          <div>
            PIXEL<span className="zone">ZONE</span>
          </div>
          <div>
            GOLF<span className="zone">ZONE</span>
          </div>
          <div>
            BASH<span className="zone">ZONE</span>
          </div>
          <div>
            KARAOKE<span className="zone">ZONE</span>
          </div>
          <div>
            RALLYE<span className="zone">ZONE</span>
          </div>
          <div>
            EXIT<span className="zone">ZONE</span>
          </div>
          <div>
            PAINTBALL<span className="zone">ZONE</span>
          </div>
        </div>
      </div>

      {children}
    </div>
  )
}
