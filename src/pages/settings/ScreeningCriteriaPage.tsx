import { useNavigate } from 'react-router-dom'
import { IconArrowLeft, IconPlus } from '../../components/Icons'
import { SCREENING_CRITERIA } from '../../lib/screening'

const TYPE_LABEL: Record<string, string> = {
  fuehrerschein: 'Ja/Nein-Feld',
  skill: 'Stichwort in Fähigkeiten',
  language: 'Sprachniveau',
  weekendWork: 'Ja/Nein-Feld',
  availability: 'Verfügbarkeit',
}

export function ScreeningCriteriaPage() {
  const navigate = useNavigate()
  return (
    <div className="page">
      <button className="detail-back" onClick={() => navigate('/verwaltung')}>
        <IconArrowLeft size={14} /> Zurück zur Verwaltung
      </button>
      <div className="page-header">
        <div>
          <h1 className="page-title">Screening-Kriterien</h1>
          <p className="page-subtitle">
            Parameter für die automatische Vorauswahl eingehender Bewerbungen (siehe Kandidat*innen-Profil, Reiter
            „Überblick"). Die Vorauswahl ersetzt keine menschliche Prüfung — sie markiert nur, welche Profile
            genauer angesehen werden sollten. Die endgültige Entscheidung über Einladung oder Absage bleibt immer
            bei einem Menschen.
          </p>
        </div>
        <button className="btn btn-primary">
          <IconPlus size={14} /> Kriterium hinzufügen
        </button>
      </div>
      <div className="panel" style={{ maxWidth: 700 }}>
        {SCREENING_CRITERIA.map((c) => (
          <div className="info-row" key={c.id}>
            <span style={{ fontWeight: 600 }}>{c.label}</span>
            <span className="k">{TYPE_LABEL[c.type]}</span>
            <span className="k">{c.pflicht ? 'Pflicht' : 'Wünschenswert'}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
