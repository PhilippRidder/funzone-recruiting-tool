import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getCandidates, getJobs, getRejectionReasons, getStages } from '../api/client'
import { AutomationEditorModal } from '../components/AutomationEditorModal'
import { IconBolt, IconPencil, IconPlus } from '../components/Icons'
import { useOpenCandidate } from '../lib/candidateNav'
import { GLOBAL_STAGE_GROUP, type TemplateStage } from '../lib/pipelineTemplates'
import type { Candidate, Job, RejectionReason, Stage } from '../types'

const EXCLUDED_SPLIT = [0.8, 0.11, 0.09] // grobe Verteilung auf die ersten 3 Absagegründe, nur zur Veranschaulichung

export function Pipeline() {
  const navigate = useNavigate()
  const openCandidate = useOpenCandidate()
  const { jobId: jobIdParam } = useParams()
  const [jobs, setJobs] = useState<Job[]>([])
  const [stages, setStages] = useState<Stage[]>([])
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [reasons, setReasons] = useState<RejectionReason[]>([])
  const [jobId, setJobId] = useState<string | null>(null)
  const [switcherOpen, setSwitcherOpen] = useState(false)
  const [subscribed, setSubscribed] = useState(true)
  const [toolbarTab, setToolbarTab] = useState<'qualifiziert' | 'ausgeschlossen'>('qualifiziert')
  const [viewMode, setViewMode] = useState<'kanban' | 'liste'>('kanban')
  const [automationStage, setAutomationStage] = useState<TemplateStage | null>(null)

  useEffect(() => {
    getJobs().then((j) => {
      setJobs(j)
      const initial = jobIdParam && j.some((job) => job.id === jobIdParam) ? jobIdParam : j[0]?.id
      if (initial) setJobId(initial)
    })
    getStages().then(setStages)
    getRejectionReasons().then(setReasons)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobIdParam])

  useEffect(() => {
    if (jobId) getCandidates(jobId).then(setCandidates)
  }, [jobId])

  const activeJob = useMemo(() => jobs.find((j) => j.id === jobId), [jobs, jobId])
  const overdueCount = candidates.filter((c) => c.overdue).length
  const hiredCount = candidates.filter((c) => c.stageKey === 'hired').length
  const excludedCount = activeJob ? 263 : 0 // Platzhalter-Zahl wie im Original, nur zur Veranschaulichung

  const daysInStage = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime()
    return Math.max(0, Math.round(diff / 86_400_000))
  }

  const switchJob = (id: string) => {
    setSwitcherOpen(false)
    navigate(`/stellen/${id}/pipeline`)
  }

  const openAutomation = (stage: Stage) => {
    const g = GLOBAL_STAGE_GROUP[stage.key]
    setAutomationStage({ id: stage.key, name: stage.name, color: g.color, automationCount: 0 })
  }

  return (
    <div className="page">
      <div className="pipe-header">
        <div className="pipe-title-row">
          <div className="pipe-title-left">
            <span className="pipe-status-dot" />
            <span className="pipe-title">{activeJob?.title ?? 'Lade…'}</span>
            <button className="pipe-chevron" onClick={() => setSwitcherOpen((v) => !v)} title="Zu anderem Job wechseln">
              ▾
            </button>
            {switcherOpen && (
              <div className="job-switcher-panel">
                {jobs.map((j) => (
                  <button key={j.id} className={'job-switcher-item' + (j.id === jobId ? ' active' : '')} onClick={() => switchJob(j.id)}>
                    {j.title}
                    <span className="sub">{j.standort} · Freigabe vorhanden</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="pipe-actions">
            <button className="btn">⇗ Teilen</button>
            <button className="btn">Vorschau</button>
            <button className={'btn' + (subscribed ? '' : '')} style={subscribed ? { color: 'var(--green)', borderColor: 'var(--green)' } : {}} onClick={() => setSubscribed((v) => !v)}>
              {subscribed ? '🚩 Abonniert' : 'Abonnieren'}
            </button>
            <button className="pipe-icon-btn" title="Teammitglied hinzufügen">
              +
            </button>
            <div className="cal-avatar" title="Markus Dünzl">
              MD
            </div>
            {jobId && (
              <button className="btn" onClick={() => navigate(`/stellen/${jobId}/bearbeiten`)}>
                <IconPencil size={14} /> Bearbeiten
              </button>
            )}
          </div>
        </div>
        {activeJob && (
          <div className="pipe-meta">
            <span>FunZone {activeJob.standort}</span>
            <span className="sep">·</span>
            <span>📍 {activeJob.standort}</span>
            <span className="sep">·</span>
            <span>🏢 Vor Ort</span>
            <span className="sep">·</span>
            <span>#{activeJob.id.toUpperCase()}</span>
            <span className="sep">·</span>
            <span>💼 {hiredCount}/1</span>
          </div>
        )}
      </div>

      <div className="tabbar" style={{ padding: 0, marginBottom: 4 }}>
        <button className="tabbar-item active">Pipeline</button>
        <button className="tabbar-item">Filter</button>
        <button className="tabbar-item">Promoten</button>
        <button className="tabbar-item">Aktivität</button>
        <button className="tabbar-item">Notizen</button>
        <button className="tabbar-item">Datei</button>
        <button className="tabbar-item">Berichte</button>
      </div>

      <div className="pipe-toolbar">
        <button className={'toolbar-pill' + (toolbarTab === 'qualifiziert' ? ' active' : '')} onClick={() => setToolbarTab('qualifiziert')}>
          Qualifiziert <span className="count" style={{ marginLeft: 4 }}>{candidates.length}</span>
        </button>
        <button className={'toolbar-pill' + (toolbarTab === 'ausgeschlossen' ? ' active' : '')} onClick={() => setToolbarTab('ausgeschlossen')}>
          Ausgeschlossen <span className="count" style={{ marginLeft: 4 }}>{excludedCount}</span>
        </button>
        <div className="pipe-toolbar-spacer" />
        <button className="btn btn-primary" onClick={() => navigate('/pipeline/neu')}>
          <IconPlus size={14} /> Kandidat*innen hinzufügen
        </button>
        <div className="pipe-view-icons">
          <button className={'toolbar-pill' + (viewMode === 'kanban' ? ' active' : '')} onClick={() => setViewMode('kanban')} title="Board-Ansicht">
            ▤
          </button>
          <button className={'toolbar-pill' + (viewMode === 'liste' ? ' active' : '')} onClick={() => setViewMode('liste')} title="Listen-Ansicht">
            ≡
          </button>
        </div>
        <button className="btn" title="Weitere Optionen">
          ⋯
        </button>
      </div>

      {toolbarTab === 'ausgeschlossen' ? (
        <div className="panel">
          <p className="stat-card-desc" style={{ marginTop: -4 }}>
            {excludedCount} Kandidat*innen wurden für diese Stelle ausgeschlossen (automatisch oder manuell abgesagt) — Verteilung nach Absagegrund:
          </p>
          {reasons.slice(0, 3).map((r, i) => (
            <div className="excluded-row" key={r.id}>
              <span>{r.name}</span>
              <span className="k">{Math.round(excludedCount * EXCLUDED_SPLIT[i])}</span>
            </div>
          ))}
        </div>
      ) : (
        <>
          {overdueCount > 0 && (
            <div className="banner">
              Achtung: {overdueCount} Bewerber {overdueCount === 1 ? 'ist' : 'sind'} überfällig und benötigen Aufmerksamkeit.
            </div>
          )}

          {viewMode === 'kanban' ? (
            <div className="kanban">
              {stages.map((stage) => {
                const stageCandidates = candidates.filter((c) => c.stageKey === stage.key)
                const isActiveProcess = GLOBAL_STAGE_GROUP[stage.key].title === 'Aktiver Prozess'
                return (
                  <div key={stage.key} className="kanban-col">
                    <div className="kanban-col-head">
                      <span>
                        {stage.name} <span className="count">{stageCandidates.length}</span>
                      </span>
                      <div className="kanban-col-head-icons">
                        <button title="Teilen">⇗</button>
                        {isActiveProcess && (
                          <button title="Automatisierungen" onClick={() => openAutomation(stage)}>
                            <IconBolt size={13} />
                          </button>
                        )}
                      </div>
                    </div>
                    {stageCandidates.map((c) => (
                      <div key={c.id} className={'kanban-card' + (c.overdue ? ' overdue' : '')} onClick={() => openCandidate(c.id)}>
                        <div className="kanban-card-name">{c.name}</div>
                        <div className="kanban-card-meta">
                          <span>{c.source}</span>
                          <span>{daysInStage(c.inStageSince)} Tage</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="panel">
              {candidates.map((c) => {
                const stage = stages.find((s) => s.key === c.stageKey)
                return (
                  <div className="info-row" key={c.id} style={{ cursor: 'pointer' }} onClick={() => openCandidate(c.id)}>
                    <span style={{ fontWeight: 600 }}>{c.name}</span>
                    <span className="k">{stage?.name}</span>
                    <span className="k">{c.source}</span>
                    <span className="k">{daysInStage(c.inStageSince)} Tage</span>
                  </div>
                )
              })}
            </div>
          )}
        </>
      )}

      {automationStage && (
        <AutomationEditorModal
          stage={automationStage}
          isNew
          onClose={() => setAutomationStage(null)}
          onSave={() => setAutomationStage(null)}
          onDelete={() => setAutomationStage(null)}
        />
      )}
    </div>
  )
}
