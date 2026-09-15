import { useNavigate } from 'react-router-dom'
import { IconArrowLeft, IconPlus } from '../../components/Icons'

const TEMPLATES = [
  { name: 'Eingangsbestätigung', kategorie: 'Automatik' },
  { name: 'Einladung Erstgespräch (Teams)', kategorie: 'Manuell' },
  { name: 'Zusage', kategorie: 'Manuell' },
  { name: 'Absage – allgemein', kategorie: 'Automatik' },
  { name: 'Absage – ohne Absage-Mail (intern)', kategorie: 'Automatik' },
  { name: 'Willkommen im Team', kategorie: 'Automatik' },
]

export function EmailTemplatesPage() {
  const navigate = useNavigate()
  return (
    <div className="page">
      <button className="detail-back" onClick={() => navigate('/verwaltung')}>
        <IconArrowLeft size={14} /> Zurück zur Verwaltung
      </button>
      <div className="page-header">
        <div>
          <h1 className="page-title">E-Mail-Vorlagen</h1>
          <p className="page-subtitle">Mit Platzhaltern wie {'{{candidate.name}}'}, {'{{job.title}}'}.</p>
        </div>
        <button className="btn btn-primary">
          <IconPlus size={14} /> Neue Vorlage
        </button>
      </div>
      <div className="panel" style={{ maxWidth: 620 }}>
        {TEMPLATES.map((t) => (
          <div className="info-row" key={t.name}>
            <span style={{ fontWeight: 600 }}>{t.name}</span>
            <span className="tag">{t.kategorie}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
