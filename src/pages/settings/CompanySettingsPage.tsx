import { useNavigate } from 'react-router-dom'
import { IconArrowLeft } from '../../components/Icons'

const BRANDS = ['LaserZone', 'ExitZone', 'GolfZone', 'PaintballZone', 'RallyeZone', 'BashZone', 'AxeZone', 'PixelZone', 'KaraokeZone']

export function CompanySettingsPage() {
  const navigate = useNavigate()
  return (
    <div className="page">
      <button className="detail-back" onClick={() => navigate('/verwaltung')}>
        <IconArrowLeft size={14} /> Zurück zur Verwaltung
      </button>
      <div className="page-header">
        <div>
          <h1 className="page-title">Unternehmenseinstellungen</h1>
          <p className="page-subtitle">Branding und Standard-Absenderadresse fürs Recruiting-Tool.</p>
        </div>
      </div>
      <div className="form-card">
        <div className="form-section-title">Allgemein</div>
        <div className="form-row">
          <div className="form-field full">
            <label>Firmenname</label>
            <input defaultValue="FunZone" />
          </div>
          <div className="form-field full">
            <label>Standard-Absenderadresse</label>
            <input defaultValue="bewerbung@fun-zone.de" />
          </div>
        </div>
        <div className="form-section-title">Marken mit eigenem Branding auf der Karriereseite</div>
        {BRANDS.map((b) => (
          <label className="checkbox-row" key={b}>
            <input type="checkbox" defaultChecked /> {b}
          </label>
        ))}
        <div className="form-actions">
          <button className="btn btn-primary">Speichern</button>
        </div>
      </div>
    </div>
  )
}
