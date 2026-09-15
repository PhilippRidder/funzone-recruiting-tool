import { useNavigate } from 'react-router-dom'
import { IconArrowLeft } from '../../components/Icons'

export function ReferralProgramPage() {
  const navigate = useNavigate()
  return (
    <div className="page">
      <button className="detail-back" onClick={() => navigate('/verwaltung')}>
        <IconArrowLeft size={14} /> Zurück zur Verwaltung
      </button>
      <div className="page-header">
        <div>
          <h1 className="page-title">Empfehlungsportal</h1>
          <p className="page-subtitle">Mitarbeiter reichen Kandidat*innen ein, Tracking ob eingestellt, inkl. Prämie.</p>
        </div>
      </div>
      <div className="form-card">
        <div className="form-section-title">Programm</div>
        <label className="checkbox-row">
          <input type="checkbox" defaultChecked /> Empfehlungsportal aktiv
        </label>
        <div className="form-row">
          <div className="form-field">
            <label>Prämienhöhe</label>
            <input defaultValue="250 €" />
          </div>
          <div className="form-field">
            <label>Auszahlung nach</label>
            <input defaultValue="Ablauf der Probezeit" />
          </div>
        </div>

        <div className="form-section-title">Fragen für Empfehlungen</div>
        <p className="stat-card-desc" style={{ marginTop: -6, marginBottom: 10 }}>
          Zusatzfragen im Formular, wenn ein Mitarbeiter jemanden empfiehlt.
        </p>
        <div className="form-field full">
          <label>Frage 1</label>
          <input defaultValue="Woher kennst du die Person?" />
        </div>
        <div className="form-field full">
          <label>Frage 2</label>
          <input defaultValue="Für welche Stelle empfiehlst du sie?" />
        </div>

        <div className="form-actions">
          <button className="btn btn-primary">Speichern</button>
        </div>
      </div>
    </div>
  )
}
