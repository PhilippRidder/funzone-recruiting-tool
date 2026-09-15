import { useNavigate } from 'react-router-dom'
import { IconArrowLeft, IconPlus } from '../../components/Icons'

const TEMPLATES = [
  { name: 'Servicemitarbeiter – Vertrag', sprache: 'DE' },
  { name: 'Servicemitarbeiter – Contract', sprache: 'EN' },
  { name: 'Standortleitung – Vertrag', sprache: 'DE' },
  { name: 'Minijob – Vertrag', sprache: 'DE' },
]

export function OfferLetterTemplatesPage() {
  const navigate = useNavigate()
  return (
    <div className="page">
      <button className="detail-back" onClick={() => navigate('/verwaltung')}>
        <IconArrowLeft size={14} /> Zurück zur Verwaltung
      </button>
      <div className="page-header">
        <div>
          <h1 className="page-title">Angebotsschreiben</h1>
          <p className="page-subtitle">Vertrags-/Angebots-Vorlagen je Position, optional mit digitaler Unterschrift.</p>
        </div>
        <button className="btn btn-primary">
          <IconPlus size={14} /> Vorlage hinzufügen
        </button>
      </div>
      <div className="panel" style={{ maxWidth: 600 }}>
        {TEMPLATES.map((t) => (
          <div className="info-row" key={t.name}>
            <span style={{ fontWeight: 600 }}>{t.name}</span>
            <span className="tag">{t.sprache}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
