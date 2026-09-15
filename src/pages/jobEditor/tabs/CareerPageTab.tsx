import { IconEye, IconGlobe } from '../../../components/Icons'
import type { Job } from '../../../types'

// Keine Sichtbarkeits-Einstellung nötig: eine Stelle wird automatisch auf der Karriereseite
// veröffentlicht, solange sie bei FunZone live/aktiv ist – kein separates Ein/Aus dafür.
export function CareerPageTab({ job }: { job?: Job }) {
  return (
    <div className="form-card" style={{ maxWidth: 560 }}>
      <div className="form-section-title" style={{ marginTop: 0 }}>
        Karriereseite
      </div>
      <p className="stat-card-desc" style={{ marginTop: -8, display: 'flex', alignItems: 'flex-start', gap: 8 }}>
        <IconGlobe size={15} />
        <span>
          Diese Stelle wird automatisch auf{' '}
          <strong style={{ color: 'var(--text)' }}>karriere.fun-zone.de</strong> veröffentlicht, solange sie bei uns
          live ist – dafür gibt es keine gesonderte Einstellung.
        </span>
      </p>
      {job && (
        <a href={`#/karriere/job/${job.id}`} target="_blank" rel="noreferrer" className="btn" style={{ marginTop: 4, display: 'inline-flex' }}>
          <IconEye size={14} /> Live-Ansicht öffnen
        </a>
      )}
    </div>
  )
}
