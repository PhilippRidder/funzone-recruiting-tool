import { useEffect, useMemo, useState } from 'react'
import { getDashboardStats, getOverdueCandidates, getUpcomingAppointments } from '../api/client'
import { StatCard } from '../components/StatCard'
import { CalendarWidget } from '../components/CalendarWidget'
import {
  ActivityWidget,
  ApprovalsWidget,
  EvaluationsWidget,
  GdprDueWidget,
  JobsOverviewWidget,
  PortalPerformanceWidget,
  RecentlyViewedWidget,
  ReferralsWidget,
  StartingSoonWidget,
  TasksWidget,
} from '../components/dashboard/ExtraWidgets'
import { IconSliders } from '../components/Icons'
import { useOpenCandidate } from '../lib/candidateNav'
import type { Appointment, DashboardStats, OverdueCandidate } from '../types'

type WidgetId =
  | 'calendar'
  | 'overdue'
  | 'offeneBewerbungen'
  | 'offeneStellen'
  | 'neueBewerbungenHeute'
  | 'anstehendeInterviews'
  | 'tasks'
  | 'approvals'
  | 'activity'
  | 'jobsOverview'
  | 'evaluations'
  | 'recentlyViewed'
  | 'gdprDue'
  | 'startingSoon'
  | 'referrals'
  | 'portalPerformance'

const WIDGET_CATALOG: { id: WidgetId; title: string; desc: string }[] = [
  { id: 'calendar', title: 'Kalender – diese Woche', desc: 'Alle geplanten Termine/Gespräche dieser Woche.' },
  { id: 'overdue', title: 'Überfällige Kandidat*innen', desc: 'Bewerber, die auf Rückmeldung warten.' },
  { id: 'anstehendeInterviews', title: 'Anstehende Interviews (Kennzahl)', desc: 'Anzahl geplanter Interviews.' },
  { id: 'neueBewerbungenHeute', title: 'Neue Bewerbungen heute', desc: 'Seit Mitternacht eingegangen.' },
  { id: 'offeneBewerbungen', title: 'Offene Bewerbungen', desc: 'Über alle Stellen, noch nicht entschieden.' },
  { id: 'offeneStellen', title: 'Offene Stellen', desc: 'Aktuell ausgeschrieben.' },
  { id: 'tasks', title: 'Aufgaben / To-Dos', desc: 'Offene Aufgaben mit Fälligkeit.' },
  { id: 'approvals', title: 'Anstehende Freigaben', desc: 'Stellenanträge, die auf Freigabe warten.' },
  { id: 'activity', title: 'Team-Aktivität', desc: 'Wer hat zuletzt was gemacht.' },
  { id: 'jobsOverview', title: 'Jobübersicht', desc: 'Aktive Stellen mit Kennzahlen auf einen Blick.' },
  { id: 'evaluations', title: 'Bewertungen ausstehend', desc: 'Kandidat*innen ohne abgeschlossene Bewertung.' },
  { id: 'recentlyViewed', title: 'Zuletzt bearbeitet', desc: 'Zuletzt angesehene Kandidat*innen/Stellen.' },
  { id: 'gdprDue', title: 'DSGVO-Fristen fällig', desc: 'Löschfristen, die diese Woche erreicht werden.' },
  { id: 'startingSoon', title: 'Bald startende neue Mitarbeiter*innen', desc: 'Eingestellte Kandidat*innen mit anstehendem Start.' },
  { id: 'referrals', title: 'Empfehlungen', desc: 'Neu eingereichte Mitarbeiter-Empfehlungen.' },
  { id: 'portalPerformance', title: 'Portal-Performance', desc: 'Bewerbungen je Portal diese Woche.' },
]

const STORAGE_KEY = 'recruiting.dashboard.widgets'

const loadVisible = (): Record<WidgetId, boolean> => {
  const defaults = Object.fromEntries(WIDGET_CATALOG.map((w) => [w.id, true])) as Record<WidgetId, boolean>
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? { ...defaults, ...JSON.parse(raw) } : defaults
  } catch {
    return defaults
  }
}

export function Dashboard() {
  const openCandidate = useOpenCandidate()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [overdue, setOverdue] = useState<OverdueCandidate[]>([])
  const [visible, setVisible] = useState<Record<WidgetId, boolean>>(loadVisible)
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    getDashboardStats().then(setStats)
    getUpcomingAppointments().then(setAppointments)
    getOverdueCandidates().then(setOverdue)
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(visible))
    } catch {
      // ignore – reine Komfortfunktion, kein Fehler nötig
    }
  }, [visible])

  const toggle = (id: WidgetId) => setVisible((v) => ({ ...v, [id]: !v[id] }))

  const statWidgets = useMemo(
    () =>
      !stats
        ? []
        : ([
            { id: 'anstehendeInterviews' as const, accent: 'blue' as const, label: 'Anstehende Interviews', value: stats.anstehendeInterviews, desc: 'Geplante Interviews diese Woche.', action: 'Öffnen' },
            { id: 'neueBewerbungenHeute' as const, accent: 'green' as const, label: 'Neue Bewerbungen heute', value: stats.neueBewerbungenHeute, desc: 'Seit Mitternacht eingegangen.', action: 'Öffnen' },
            { id: 'offeneBewerbungen' as const, accent: 'blue' as const, label: 'Offene Bewerbungen', value: stats.offeneBewerbungen, desc: 'Über alle Stellen, noch nicht entschieden.', action: 'Zur Pipeline' },
            { id: 'offeneStellen' as const, accent: 'blue' as const, label: 'Offene Stellen', value: stats.offeneStellen, desc: 'Aktuell ausgeschrieben.', action: 'Stellen ansehen' },
          ].filter((w) => visible[w.id])),
    [stats, visible],
  )

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Guten Tag, Philipp 👋</h1>
          <p className="page-subtitle">
            {new Date().toLocaleDateString('de-DE', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <div style={{ position: 'relative' }}>
          <button className="btn" onClick={() => setEditing((e) => !e)}>
            <IconSliders size={14} /> Widgets bearbeiten
          </button>
          {editing && (
            <div className="widget-panel">
              {WIDGET_CATALOG.map((w) => (
                <div className="widget-panel-item" key={w.id}>
                  <div>
                    <div className="widget-panel-title">{w.title}</div>
                    <div className="widget-panel-desc">{w.desc}</div>
                  </div>
                  <button className={'widget-toggle' + (visible[w.id] ? ' on' : '')} onClick={() => toggle(w.id)}>
                    {visible[w.id] ? 'Verbergen' : 'Anzeigen'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {!stats ? (
        <div className="stat-card-desc">Lade…</div>
      ) : (
        <>
          {statWidgets.length > 0 && (
            <div className="stat-grid" style={{ marginBottom: 16 }}>
              {statWidgets.map((w) => (
                <StatCard key={w.id} accent={w.accent} label={w.label} value={w.value} desc={w.desc} action={w.action} />
              ))}
            </div>
          )}

          {visible.calendar && <CalendarWidget appointments={appointments} />}
          {visible.tasks && <TasksWidget />}
          {visible.approvals && <ApprovalsWidget />}

          {visible.overdue && (
            <div className="panel" style={{ marginBottom: 16 }}>
              <div className="panel-title">Überfällige Kandidat*innen</div>
              {overdue.length === 0 && <div className="stat-card-desc">Aktuell keine überfälligen Bewerber.</div>}
              {overdue.map((c) => (
                <div className="info-row" key={c.id} style={{ cursor: 'pointer' }} onClick={() => openCandidate(c.id)}>
                  <span className="k">{c.name}</span>
                  <span>
                    {c.jobTitle} · {c.jobStandort}
                  </span>
                  <span style={{ color: 'var(--red)' }}>{c.daysOverdue} Tage überfällig</span>
                </div>
              ))}
            </div>
          )}

          {visible.jobsOverview && <JobsOverviewWidget />}
          {visible.evaluations && <EvaluationsWidget />}
          {visible.activity && <ActivityWidget />}
          {visible.recentlyViewed && <RecentlyViewedWidget />}
          {visible.startingSoon && <StartingSoonWidget />}
          {visible.referrals && <ReferralsWidget />}
          {visible.gdprDue && <GdprDueWidget />}
          {visible.portalPerformance && <PortalPerformanceWidget />}
        </>
      )}
    </div>
  )
}
