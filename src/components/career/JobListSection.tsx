import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getJobs } from '../../api/client'
import type { Job } from '../../types'

export function JobListSection() {
  const navigate = useNavigate()
  const [jobs, setJobs] = useState<Job[]>([])

  useEffect(() => {
    getJobs().then(setJobs)
  }, [])

  const byStandort = useMemo(() => {
    const map = new Map<string, Job[]>()
    for (const j of jobs.filter((j) => j.open)) {
      if (!map.has(j.standort)) map.set(j.standort, [])
      map.get(j.standort)!.push(j)
    }
    return Array.from(map.entries())
  }, [jobs])

  return (
    <div>
      <div className="cp-filterbar">
        <input placeholder="Angebote suchen…" />
        <select defaultValue="">
          <option value="">Alle Abteilungen</option>
        </select>
        <select defaultValue="">
          <option value="">Alle Länder</option>
        </select>
        <select defaultValue="">
          <option value="">Alle Städte</option>
        </select>
        <select defaultValue="">
          <option value="">Alle Tags</option>
        </select>
        <select defaultValue="">
          <option value="">Alle Sprachen</option>
        </select>
      </div>
      <div className="cp-jobcount">
        <span>{jobs.filter((j) => j.open).length} Jobs</span>
        <span>Teilen</span>
      </div>

      {byStandort.map(([standort, list]) => (
        <div key={standort}>
          <div className="cp-city-heading">{standort}</div>
          {list.map((j) => (
            <div className="cp-job-row" key={j.id}>
              <div>
                <div className="cp-job-row-title">{j.title}</div>
                <div className="cp-job-row-meta">
                  <span>vor Ort</span>
                  <span>{j.standort}, Deutschland</span>
                </div>
              </div>
              <button className="cp-btn-black" onClick={() => navigate(`/karriere/job/${j.id}`)}>
                Job ansehen
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
