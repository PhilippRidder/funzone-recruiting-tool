import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getJobs } from '../api/client'
import { IconPencil, IconPlus } from '../components/Icons'
import type { Job } from '../types'

const VIEWS = ['Alle', 'Aktiv', 'Gefolgt', 'Archiviert']

export function Jobs() {
  const navigate = useNavigate()
  const [jobs, setJobs] = useState<Job[]>([])
  const [view, setView] = useState('Alle')

  useEffect(() => {
    getJobs().then(setJobs)
  }, [])

  const byStandort = useMemo(() => {
    const map = new Map<string, Job[]>()
    for (const j of jobs) {
      if (!map.has(j.standort)) map.set(j.standort, [])
      map.get(j.standort)!.push(j)
    }
    return Array.from(map.entries())
  }, [jobs])

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Stellen</h1>
          <p className="page-subtitle">Alle Ausschreibungen, gruppiert nach Standort.</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/stellen/neu')}>
          <IconPlus size={14} /> Stelle ausschreiben
        </button>
      </div>

      <div className="toolbar">
        {VIEWS.map((v) => (
          <button key={v} className={'toolbar-pill' + (v === view ? ' active' : '')} onClick={() => setView(v)}>
            {v}
          </button>
        ))}
      </div>

      <div className="job-board">
        {byStandort.map(([standort, list]) => (
          <div key={standort} className="job-board-col">
            <div className="job-board-col-head">
              <span>{standort}</span>
              <span>{list.length}</span>
            </div>
            {list.map((j) => (
              <div key={j.id} className="job-card" onClick={() => navigate(`/stellen/${j.id}/pipeline`)}>
                <div className="job-card-title-row">
                  <div className="job-card-title">{j.title}</div>
                  <button
                    className="job-card-edit"
                    title="Jobdetails bearbeiten"
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate(`/stellen/${j.id}/bearbeiten`)
                    }}
                  >
                    <IconPencil size={13} />
                  </button>
                </div>
                <div className="job-card-meta">
                  <span>{j.employmentType}</span>
                  <span>{j.qualifiziert} qualifiziert</span>
                  {j.neu > 0 && <span style={{ color: 'var(--accent-text)' }}>{j.neu} neu</span>}
                  {j.ueberfaellig > 0 && <span style={{ color: 'var(--red)' }}>{j.ueberfaellig} überfällig</span>}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
