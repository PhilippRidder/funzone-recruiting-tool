import { useNavigate } from 'react-router-dom'
import { IconArrowLeft, IconPlus } from '../../components/Icons'

const FIELDS = [
  { name: 'Führerschein', typ: 'Ja/Nein' },
  { name: 'Verfügbar ab', typ: 'Datum' },
  { name: 'Berufserfahrung', typ: 'Freitext' },
  { name: 'Gewünschte Stunden/Woche', typ: 'Zahl' },
]

export function CustomFieldsPage() {
  const navigate = useNavigate()
  return (
    <div className="page">
      <button className="detail-back" onClick={() => navigate('/verwaltung')}>
        <IconArrowLeft size={14} /> Zurück zur Verwaltung
      </button>
      <div className="page-header">
        <div>
          <h1 className="page-title">Benutzerdefinierte Felder</h1>
          <p className="page-subtitle">Zusatzfelder am Bewerberprofil (identisch mit „Felder im Kandidat*innenprofil").</p>
        </div>
        <button className="btn btn-primary">
          <IconPlus size={14} /> Feld hinzufügen
        </button>
      </div>
      <div className="panel" style={{ maxWidth: 600 }}>
        {FIELDS.map((f) => (
          <div className="info-row" key={f.name}>
            <span style={{ fontWeight: 600 }}>{f.name}</span>
            <span className="k">{f.typ}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
