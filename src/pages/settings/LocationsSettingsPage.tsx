import { useNavigate } from 'react-router-dom'
import { IconArrowLeft, IconPlus } from '../../components/Icons'
import { Badge } from '../../components/Badge'

const STANDORTE = [
  'Augsburg', 'Bielefeld', 'Düsseldorf', 'Duisburg', 'Essen West – Borbeck', 'Essen Ost – Kray',
  'Freiburg-Denzlingen', 'Frankfurt am Main', 'Hamburg', 'Kiel', 'Köln', 'Mainz', 'Mönchengladbach', 'München',
]

export function LocationsSettingsPage() {
  const navigate = useNavigate()
  return (
    <div className="page">
      <button className="detail-back" onClick={() => navigate('/verwaltung')}>
        <IconArrowLeft size={14} /> Zurück zur Verwaltung
      </button>
      <div className="page-header">
        <div>
          <h1 className="page-title">Standorte</h1>
          <p className="page-subtitle">Die 14 FunZone-Standorte – identisch mit der Liste auf der Karriereseite.</p>
        </div>
        <button className="btn btn-primary">
          <IconPlus size={14} /> Standort hinzufügen
        </button>
      </div>
      <div className="panel" style={{ maxWidth: 600 }}>
        {STANDORTE.map((s) => (
          <div className="info-row" key={s}>
            <span style={{ fontWeight: 600 }}>Funzone {s}</span>
            <Badge variant="green">Aktiv</Badge>
          </div>
        ))}
      </div>
    </div>
  )
}
