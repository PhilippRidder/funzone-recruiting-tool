import { useEffect, useState } from 'react'
import { getTalentPool } from '../api/client'
import { IconPlus } from '../components/Icons'
import type { TalentPoolEntry } from '../types'

export function TalentPools() {
  const [entries, setEntries] = useState<TalentPoolEntry[]>([])

  useEffect(() => {
    getTalentPool().then(setEntries)
  }, [])

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Talent Pools</h1>
          <p className="page-subtitle">Kandidat*innen, die aktuell nicht passen, aber vorgemerkt sind.</p>
        </div>
        <button className="btn btn-primary">
          <IconPlus size={14} /> Zum Pool hinzufügen
        </button>
      </div>

      <div className="pool-grid">
        {entries.map((e) => (
          <div className="pool-card" key={e.id}>
            <div className="pool-card-name">{e.name}</div>
            <div className="stat-card-desc">{e.email}</div>
            <p className="stat-card-desc" style={{ marginTop: 8 }}>{e.note}</p>
            <div className="pool-card-tags">
              {e.tags.map((t) => (
                <span className="tag" key={t}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
