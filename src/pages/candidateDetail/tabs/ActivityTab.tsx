import { useEffect, useState } from 'react'
import { getCandidateActivity } from '../../../api/client'
import { IconBolt } from '../../../components/Icons'
import { formatRelative } from '../../../lib/relativeTime'
import type { CandidateActivity } from '../../../types'

export function ActivityTab({ candidateId }: { candidateId: string }) {
  const [activity, setActivity] = useState<CandidateActivity[]>([])
  const [filter, setFilter] = useState<'alle' | 'automatisierungen'>('alle')

  useEffect(() => {
    getCandidateActivity(candidateId).then(setActivity)
  }, [candidateId])

  const list = filter === 'automatisierungen' ? activity.filter((a) => a.automated) : activity

  const grouped = new Map<string, CandidateActivity[]>()
  list.forEach((a) => {
    const key = new Date(a.at).toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })
    grouped.set(key, [...(grouped.get(key) ?? []), a])
  })

  return (
    <>
      <div className="pipe-toolbar" style={{ margin: '0 0 14px' }}>
        <button className={'toolbar-pill' + (filter === 'alle' ? ' active' : '')} onClick={() => setFilter('alle')}>
          Alle
        </button>
        <button className={'toolbar-pill' + (filter === 'automatisierungen' ? ' active' : '')} onClick={() => setFilter('automatisierungen')}>
          <IconBolt size={12} /> Automatisierungen
        </button>
      </div>

      {list.length === 0 && <div className="stat-card-desc">Noch keine Aktivität.</div>}

      {[...grouped.entries()].map(([date, items]) => (
        <div className="activity-date-group" key={date}>
          <div className="event-group-date">{date}</div>
          {items.map((a) => (
            <div className="activity-entry" key={a.id}>
              <span className="dot2" />
              <div className="activity-entry-body">
                <span className="activity-entry-time">{formatRelative(a.at)}</span>
                <strong>{a.actor}</strong> {a.text}
                {a.preview && <div className="activity-preview">⚡ {a.preview}</div>}
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  )
}
