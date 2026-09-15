import { useState } from 'react'
import { IconPlus } from '../../../components/Icons'
import type { CandidateEvent } from '../../../types'

const initials = (name: string) =>
  name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

export function EventsTab({ events, candidateName }: { events: CandidateEvent[]; candidateName: string }) {
  const [tab, setTab] = useState<'geplant' | 'vergangen'>('geplant')

  const geplant = events.filter((e) => !e.past)
  const vergangen = events.filter((e) => e.past)
  const list = tab === 'geplant' ? geplant : vergangen

  const grouped = new Map<string, CandidateEvent[]>()
  list.forEach((e) => {
    const key = new Date(e.date).toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })
    grouped.set(key, [...(grouped.get(key) ?? []), e])
  })

  return (
    <>
      <div className="pipe-toolbar" style={{ margin: '0 0 14px' }}>
        <button className={'toolbar-pill' + (tab === 'geplant' ? ' active' : '')} onClick={() => setTab('geplant')}>
          Geplant <span className="count" style={{ marginLeft: 4 }}>{geplant.length}</span>
        </button>
        <button className={'toolbar-pill' + (tab === 'vergangen' ? ' active' : '')} onClick={() => setTab('vergangen')}>
          Vergangene Ereignisse <span className="count" style={{ marginLeft: 4 }}>{vergangen.length}</span>
        </button>
        <div className="pipe-toolbar-spacer" />
        <button className="btn btn-primary">
          <IconPlus size={13} /> Ereignis planen
        </button>
      </div>

      {list.length === 0 && <div className="stat-card-desc">Keine Ereignisse in dieser Ansicht.</div>}

      {[...grouped.entries()].map(([date, items]) => (
        <div key={date}>
          <div className="event-group-date">{date}</div>
          {items.map((e) => (
            <div className="cal-event-row" key={e.id} style={{ cursor: 'default' }}>
              <div className="cal-avatar" title={candidateName}>
                {initials(candidateName)}
                {e.confirmed && <span className="cal-check">✓</span>}
              </div>
              <div className="cal-event-body">
                <div className="cal-event-date">
                  {e.time} - {e.endTime}
                </div>
                <div className="cal-event-title">
                  {e.title} <span className="cal-dot" style={{ background: 'var(--accent)' }} /> {e.jobTitle}
                </div>
                <div className="cal-event-sub">{e.title}</div>
              </div>
              <div className="cal-avatar owner" title={e.withName}>
                {initials(e.withName)}
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  )
}
