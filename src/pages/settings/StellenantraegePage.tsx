import { IconPlus } from '../../components/Icons'
import { Badge } from '../../components/Badge'

const ANTRAEGE = [
  { titel: 'Servicemitarbeiter (m/w/d)', standort: 'Bielefeld', anlass: 'Ersatz', start: '01.11.2026', von: 'Standortleitung Bielefeld', status: 'offen' as const },
  { titel: 'Stellv. Filialleiter (m/w/d)', standort: 'München', anlass: 'Neu', start: '01.12.2026', von: 'Recruiting-Manager', status: 'genehmigt' as const },
  { titel: 'Servicemitarbeiter Werkstudent (m/w/d)', standort: 'Duisburg', anlass: 'Wachstum', start: '15.10.2026', von: 'Standortleitung Duisburg', status: 'abgelehnt' as const },
]

const STATUS_BADGE = { offen: <Badge variant="orange">Offen</Badge>, genehmigt: <Badge variant="green">Genehmigt</Badge>, abgelehnt: <Badge variant="outline">Abgelehnt</Badge> }

export function StellenantraegePage() {
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Stellenanträge</h1>
          <p className="page-subtitle">Freigabe-Workflow: Standortleitung beantragt, Recruiting-Manager/Geschäftsführung gibt frei, bevor eine Stelle live geht.</p>
        </div>
        <button className="btn btn-primary">
          <IconPlus size={14} /> Neuer Antrag
        </button>
      </div>
      <div className="panel" style={{ maxWidth: 820 }}>
        {ANTRAEGE.map((a) => (
          <div className="info-row" key={a.titel}>
            <span style={{ fontWeight: 600 }}>{a.titel}</span>
            <span className="k">{a.standort} · {a.anlass} · ab {a.start}</span>
            <span className="k">{a.von}</span>
            {STATUS_BADGE[a.status]}
          </div>
        ))}
      </div>
    </div>
  )
}
