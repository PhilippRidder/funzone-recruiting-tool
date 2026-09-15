import { useNavigate } from 'react-router-dom'
import { IconArrowLeft } from '../../components/Icons'
import { Badge } from '../../components/Badge'

export function EventPlannerPage() {
  const navigate = useNavigate()
  return (
    <div className="page">
      <button className="detail-back" onClick={() => navigate('/verwaltung')}>
        <IconArrowLeft size={14} /> Zurück zur Verwaltung
      </button>
      <div className="page-header">
        <div>
          <h1 className="page-title">Ereignis-Planer</h1>
          <p className="page-subtitle">Interviewtermine werden als Teams-Meeting angelegt (Kandidat*in + Interviewer*in).</p>
        </div>
      </div>
      <div className="panel" style={{ maxWidth: 560 }}>
        <div className="info-row">
          <span style={{ fontWeight: 600 }}>Microsoft Teams / Outlook-Kalender</span>
          <Badge variant="green">Vorgesehen</Badge>
        </div>
        <div className="info-row">
          <span style={{ fontWeight: 600 }}>Google-Kalender</span>
          <Badge variant="outline">Später</Badge>
        </div>
      </div>
      <p className="stat-card-desc" style={{ maxWidth: 560 }}>
        Die eigentliche Kalender-Anbindung ist Backend-Thema (Management-Tool). Physische Raumbuchung für
        Vor-Ort-Interviews läuft separat über „Meeting-Räume".
      </p>
    </div>
  )
}
