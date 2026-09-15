import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getJob } from '../../api/client'
import { Badge } from '../../components/Badge'
import { IconEye } from '../../components/Icons'
import type { Job } from '../../types'
import { JobDetailsTab } from './tabs/JobDetailsTab'
import { ApplicationTab } from './tabs/ApplicationTab'
import { TeamTab } from './tabs/TeamTab'
import { ProcessTab } from './tabs/ProcessTab'
import { CareerPageTab } from './tabs/CareerPageTab'
import { PlaceholderTab } from './tabs/PlaceholderTab'

const TABS = [
  { key: 'jobdetails', label: 'Jobdetails' },
  { key: 'bewerbung', label: 'Bewerbung' },
  { key: 'team', label: 'Team' },
  { key: 'prozess', label: 'Prozess' },
  { key: 'karriereseite', label: 'Karriereseite' },
  { key: 'empfehlungen', label: 'Empfehlungen' },
] as const

type TabKey = (typeof TABS)[number]['key']

export function JobEditor() {
  const { jobId } = useParams()
  const navigate = useNavigate()
  const [job, setJob] = useState<Job | undefined>()
  const [tab, setTab] = useState<TabKey>('jobdetails')

  useEffect(() => {
    if (jobId) getJob(jobId).then(setJob)
  }, [jobId])

  const isNew = !jobId
  const idx = TABS.findIndex((t) => t.key === tab)
  const goto = (i: number) => setTab(TABS[Math.max(0, Math.min(TABS.length - 1, i))].key)

  return (
    <div className="page" style={{ padding: 0, display: 'flex', flexDirection: 'column' }}>
      <div className="editor-topbar">
        <div>
          <div className="editor-topbar-title">{isNew ? 'Neue Stelle' : job?.title ?? 'Lade…'}</div>
          <div className="editor-topbar-meta">{isNew ? 'Noch nicht veröffentlicht' : 'Neueste Bearbeitung vor 15 Stunden'}</div>
        </div>
        <div className="editor-topbar-actions">
          {!isNew && <button className="btn">Teilen ▾</button>}
          <button className="btn">
            <IconEye size={14} /> Vorschau
          </button>
          {!isNew && <Badge variant="green">● Veröffentlicht</Badge>}
          <button className="btn btn-primary" onClick={() => navigate('/stellen')}>
            {isNew ? 'Stelle veröffentlichen' : 'Änderungen veröffentlichen'}
          </button>
        </div>
      </div>

      <div className="editor-body">
        <div className="editor-subnav">
          {TABS.map((t) => (
            <button key={t.key} className={tab === t.key ? 'active' : ''} onClick={() => setTab(t.key)}>
              {t.label}
            </button>
          ))}
        </div>
        <div className="editor-content">
          {tab === 'jobdetails' && <JobDetailsTab />}
          {tab === 'bewerbung' && <ApplicationTab />}
          {tab === 'team' && <TeamTab />}
          {tab === 'prozess' && <ProcessTab />}
          {tab === 'karriereseite' && <CareerPageTab job={job} />}
          {tab === 'empfehlungen' && <PlaceholderTab title="Empfehlungen" />}

          <div className="editor-nav-buttons">
            <button className="btn" disabled={idx === 0} onClick={() => goto(idx - 1)}>
              ← {idx > 0 ? TABS[idx - 1].label : ''}
            </button>
            <button className="btn" disabled={idx === TABS.length - 1} onClick={() => goto(idx + 1)}>
              {idx < TABS.length - 1 ? TABS[idx + 1].label : ''} →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
