import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Appointment } from '../types'

const WEEKDAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']
const MONTH_NAMES = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']

const initials = (name: string) =>
  name
    .split(' ')
    .map((s) => s[0])
    .join('')
    .slice(0, 2)

const isSameDay = (iso: string, d: Date) => iso === d.toISOString().slice(0, 10)

function buildMonthGrid(year: number, month: number) {
  const first = new Date(year, month, 1)
  const startWeekday = (first.getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrevMonth = new Date(year, month, 0).getDate()
  const cells: { day: number; current: boolean }[] = []
  for (let i = startWeekday; i > 0; i--) cells.push({ day: daysInPrevMonth - i + 1, current: false })
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, current: true })
  while (cells.length % 7 !== 0) cells.push({ day: cells.length - startWeekday - daysInMonth + 1, current: false })
  return cells
}

export function CalendarWidget({ appointments }: { appointments: Appointment[] }) {
  const navigate = useNavigate()
  const today = new Date()
  const [tab, setTab] = useState<'woche' | 'heute' | 'vergangen'>('woche')
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())

  const weekList = appointments
  const todayList = useMemo(() => appointments.filter((a) => isSameDay(a.date, today)), [appointments])
  const pastList: Appointment[] = []

  const list = tab === 'woche' ? weekList : tab === 'heute' ? todayList : pastList

  const grid = useMemo(() => buildMonthGrid(viewYear, viewMonth), [viewYear, viewMonth])

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear((y) => y - 1)
    } else {
      setViewMonth((m) => m - 1)
    }
  }
  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear((y) => y + 1)
    } else {
      setViewMonth((m) => m + 1)
    }
  }

  return (
    <div className="cal-widget">
      <div className="cal-events">
        <div className="cal-tabs">
          <button className={'cal-tab' + (tab === 'woche' ? ' active' : '')} onClick={() => setTab('woche')}>
            Diese Woche <span className="count">{weekList.length}</span>
          </button>
          <button className={'cal-tab' + (tab === 'heute' ? ' active' : '')} onClick={() => setTab('heute')}>
            Heute <span className="count">{todayList.length}</span>
          </button>
          <button className={'cal-tab' + (tab === 'vergangen' ? ' active' : '')} onClick={() => setTab('vergangen')}>
            Vergangene Ereignisse
          </button>
          <select className="cal-filter" defaultValue="alle">
            <option value="alle">Alle Ereignisse</option>
            <option value="interviews">Nur Interviews</option>
          </select>
        </div>

        {list.length === 0 ? (
          <div className="stat-card-desc" style={{ padding: '14px 4px' }}>Keine Ereignisse.</div>
        ) : (
          list.map((a) => (
            <div
              className="cal-event-row"
              key={a.id}
              onClick={() => navigate('/pipeline')}
            >
              <div className="cal-avatar">
                {initials(a.candidateName)}
                <span className="cal-check">✓</span>
              </div>
              <div className="cal-event-body">
                <div className="cal-event-date">
                  {new Date(a.date).toLocaleDateString('de-DE', { weekday: 'short', day: 'numeric', month: 'short' })} · {a.time} - {a.endTime}
                </div>
                <div className="cal-event-title">
                  {a.candidateName} <span className="cal-dot" style={{ background: a.channel === 'Teams' ? 'var(--accent)' : 'var(--orange)' }} /> {a.jobTitle}
                </div>
                <div className="cal-event-sub">
                  {a.title === 'Probearbeiten' ? 'Probearbeiten' : `Interview ${a.channel === 'Vor Ort' ? 'vor Ort' : '(Teams)'}`} für {a.jobTitle} – {a.candidateName}
                </div>
              </div>
              <div className="cal-avatar owner">PR</div>
            </div>
          ))
        )}

        {tab === 'heute' && <div className="stat-card-desc" style={{ marginTop: 8 }}>Du hast heute {todayList.length} Ereignisse</div>}
      </div>

      <div className="cal-mini">
        <div className="cal-mini-header">
          <button onClick={prevMonth}>‹</button>
          <span>
            {MONTH_NAMES[viewMonth]}, {viewYear}
          </span>
          <button onClick={nextMonth}>›</button>
        </div>
        <div className="cal-mini-grid">
          {WEEKDAYS.map((w) => (
            <div className="cal-mini-wd" key={w}>{w}</div>
          ))}
          {grid.map((c, i) => {
            const isToday = c.current && viewYear === today.getFullYear() && viewMonth === today.getMonth() && c.day === today.getDate()
            return (
              <div key={i} className={'cal-mini-day' + (c.current ? '' : ' other') + (isToday ? ' today' : '')}>
                {c.day}
              </div>
            )
          })}
        </div>
        <button className="btn" style={{ width: '100%', marginTop: 14 }}>
          Gesamten Kalender öffnen
        </button>
        <button className="btn btn-primary" style={{ width: '100%', marginTop: 8 }}>
          Ein Ereignis einplanen
        </button>
      </div>
    </div>
  )
}
