import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getJobs } from '../../api/client'
import { useOpenCandidate } from '../../lib/candidateNav'
import {
  ACTIVITY_FEED,
  GDPR_DUE,
  PENDING_APPROVALS,
  PENDING_EVALUATIONS,
  PORTAL_PERFORMANCE,
  RECENTLY_VIEWED,
  REFERRALS,
  STARTING_SOON,
  TASKS,
  type TaskItem,
} from '../../lib/dashboardWidgets'
import type { Job } from '../../types'

export function TasksWidget() {
  const [tasks, setTasks] = useState<TaskItem[]>(TASKS)
  const toggle = (id: string) => setTasks((t) => t.map((x) => (x.id === id ? { ...x, done: !x.done } : x)))
  return (
    <div className="panel" style={{ marginBottom: 16 }}>
      <div className="panel-title">Aufgaben / To-Dos</div>
      {tasks.map((t) => (
        <label className="checkbox-row" key={t.id} style={{ justifyContent: 'space-between' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} />
            <span style={{ textDecoration: t.done ? 'line-through' : 'none', color: t.done ? 'var(--text-faint)' : 'var(--text)' }}>{t.text}</span>
          </span>
          <span className="k">{t.due}</span>
        </label>
      ))}
    </div>
  )
}

export function ApprovalsWidget() {
  const navigate = useNavigate()
  return (
    <div className="panel" style={{ marginBottom: 16 }}>
      <div className="panel-title">Anstehende Freigaben</div>
      {PENDING_APPROVALS.map((a) => (
        <div className="info-row" key={a.id} style={{ cursor: 'pointer' }} onClick={() => navigate('/verwaltung/stellenantraege')}>
          <span style={{ fontWeight: 600 }}>{a.title}</span>
          <span className="k">{a.standort}</span>
          <span className="k">{a.von}</span>
        </div>
      ))}
    </div>
  )
}

export function ActivityWidget() {
  return (
    <div className="panel" style={{ marginBottom: 16 }}>
      <div className="panel-title">Team-Aktivität</div>
      {ACTIVITY_FEED.map((a) => (
        <div className="timeline-item" key={a.id}>
          <span className="dot2" />
          <div>
            <div>{a.text}</div>
            <div className="t">{a.when}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function JobsOverviewWidget() {
  const navigate = useNavigate()
  const [jobs, setJobs] = useState<Job[]>([])
  useEffect(() => {
    getJobs().then(setJobs)
  }, [])
  return (
    <div className="panel" style={{ marginBottom: 16 }}>
      <div className="panel-title">Jobübersicht</div>
      {jobs.map((j) => (
        <div className="info-row" key={j.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/stellen/${j.id}/bearbeiten`)}>
          <span style={{ fontWeight: 600 }}>{j.title}</span>
          <span className="k">{j.standort}</span>
          <span className="k">{j.qualifiziert} qualifiziert</span>
        </div>
      ))}
    </div>
  )
}

export function EvaluationsWidget() {
  const openCandidate = useOpenCandidate()
  return (
    <div className="panel" style={{ marginBottom: 16 }}>
      <div className="panel-title">Bewertungen ausstehend</div>
      {PENDING_EVALUATIONS.map((e) => (
        <div className="info-row" key={e.id} style={{ cursor: 'pointer' }} onClick={() => openCandidate(e.candidateId)}>
          <span style={{ fontWeight: 600 }}>{e.name}</span>
          <span className="k">{e.stage}</span>
        </div>
      ))}
    </div>
  )
}

export function RecentlyViewedWidget() {
  const navigate = useNavigate()
  const openCandidate = useOpenCandidate()
  const open = (to: string) => {
    if (to.startsWith('/kandidaten/')) openCandidate(to.replace('/kandidaten/', ''))
    else navigate(to)
  }
  return (
    <div className="panel" style={{ marginBottom: 16 }}>
      <div className="panel-title">Zuletzt bearbeitet</div>
      {RECENTLY_VIEWED.map((r) => (
        <div className="info-row" key={r.id} style={{ cursor: 'pointer' }} onClick={() => open(r.to)}>
          <span className="tag">{r.type}</span>
          <span style={{ fontWeight: 600 }}>{r.label}</span>
        </div>
      ))}
    </div>
  )
}

export function GdprDueWidget() {
  return (
    <div className="panel" style={{ marginBottom: 16 }}>
      <div className="panel-title">DSGVO-Fristen fällig</div>
      {GDPR_DUE.map((g) => (
        <div className="info-row" key={g.id}>
          <span>{g.name}</span>
          <span style={{ color: 'var(--orange)' }}>Löschung in {g.tage} Tagen</span>
        </div>
      ))}
    </div>
  )
}

export function StartingSoonWidget() {
  return (
    <div className="panel" style={{ marginBottom: 16 }}>
      <div className="panel-title">Bald startende neue Mitarbeiter*innen</div>
      {STARTING_SOON.map((s) => (
        <div className="info-row" key={s.id}>
          <span style={{ fontWeight: 600 }}>{s.name}</span>
          <span className="k">{s.jobTitle} · {s.standort}</span>
          <span style={{ color: 'var(--green)' }}>Start {s.start}</span>
        </div>
      ))}
    </div>
  )
}

export function ReferralsWidget() {
  return (
    <div className="panel" style={{ marginBottom: 16 }}>
      <div className="panel-title">Empfehlungen</div>
      {REFERRALS.map((r) => (
        <div className="info-row" key={r.id}>
          <span style={{ fontWeight: 600 }}>{r.name}</span>
          <span className="k">empfohlen von {r.von}</span>
          <span className="tag">{r.status}</span>
        </div>
      ))}
    </div>
  )
}

export function PortalPerformanceWidget() {
  const max = Math.max(...PORTAL_PERFORMANCE.map((p) => p.value))
  return (
    <div className="panel" style={{ marginBottom: 16 }}>
      <div className="panel-title">Portal-Performance (diese Woche)</div>
      {PORTAL_PERFORMANCE.map((p) => (
        <div className="hbar-row" key={p.label}>
          <div className="label">{p.label}</div>
          <div className="track">
            <div className="fill" style={{ width: `${(p.value / max) * 100}%` }} />
          </div>
          <div className="val">{p.value}</div>
        </div>
      ))}
    </div>
  )
}
