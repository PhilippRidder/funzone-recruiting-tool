import { useEffect, useState } from 'react'
import { getStages } from '../../../api/client'
import { GLOBAL_STAGE_GROUP, INITIAL_TEMPLATES } from '../../../lib/pipelineTemplates'
import type { Stage } from '../../../types'

const GROUP_FOR = GLOBAL_STAGE_GROUP

export function ProcessTab() {
  const [stages, setStages] = useState<Stage[]>([])

  useEffect(() => {
    getStages().then(setStages)
  }, [])

  let lastGroup = ''

  return (
    <>
      <div className="form-card" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div className="form-section-title" style={{ marginTop: 0 }}>
              Prozessautomatisierungen <span className="tag" style={{ marginLeft: 6 }}>NEU</span>
            </div>
            <p className="stat-card-desc" style={{ marginTop: -8 }}>Lege fest, was passieren soll, wenn wichtige Ereignisse eintreten (siehe Verwaltung → Automatisierungen).</p>
          </div>
          <button className="btn">+ Neue Automatisierung</button>
        </div>
        <div className="stat-card-desc">Noch keine Automatisierungen (0)</div>
      </div>

      <div className="form-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <div className="form-section-title" style={{ marginTop: 0 }}>Pipeline</div>
          <select defaultValue="stellv-leitung">
            {INITIAL_TEMPLATES.map((t) => (
              <option key={t.id} value={t.id}>
                Vorlage: {t.name}
              </option>
            ))}
          </select>
        </div>
        <p className="stat-card-desc" style={{ marginTop: -4, marginBottom: 4 }}>Recruiting-Pipeline zur einfachen Verwaltung von Kandidat*innen (siehe Verwaltung → Pipeline-Vorlagen).</p>

        {stages.map((s) => {
          const g = GROUP_FOR[s.key]
          const showHeading = g?.title !== lastGroup
          lastGroup = g?.title ?? lastGroup
          return (
            <div key={s.key}>
              {showHeading && <div className="stage-group-title">{g.title}</div>}
              <div className="stage-row">
                <span className="dot3" style={{ background: g?.color }} />
                <span className="name">{s.name}</span>
                <span className="days">3 Tage</span>
                <IconPencilMini />
              </div>
            </div>
          )
        })}
        <button className="btn" style={{ marginTop: 12 }}>+ Neu hinzufügen</button>
      </div>
    </>
  )
}

function IconPencilMini() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-faint)', flexShrink: 0 }}>
      <path d="M4 20h4L18.5 9.5a2.1 2.1 0 0 0-3-3L5 17v3Z" />
      <path d="m14.5 6 3 3" />
    </svg>
  )
}
