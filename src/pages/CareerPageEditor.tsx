import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IconArrowLeft } from '../components/Icons'
import { loadCareerPageConfig, saveCareerPageConfig, type CareerPageConfig } from '../lib/careerPage'

export function CareerPageEditor() {
  const navigate = useNavigate()
  const [config, setConfig] = useState<CareerPageConfig>(loadCareerPageConfig())
  const [saved, setSaved] = useState(false)

  const set = <K extends keyof CareerPageConfig>(key: K, value: CareerPageConfig[K]) => {
    setConfig((c) => ({ ...c, [key]: value }))
    setSaved(false)
  }

  const save = () => {
    saveCareerPageConfig(config)
    setSaved(true)
  }

  return (
    <div className="page">
      <button className="detail-back" onClick={() => navigate('/verwaltung')}>
        <IconArrowLeft size={14} /> Zurück zur Verwaltung
      </button>
      <div className="page-header">
        <div>
          <h1 className="page-title">Karriereseite</h1>
          <p className="page-subtitle">
            Nachgebaut nach karriere.fun-zone.de. Bearbeitbar sind aktuell die Hero-Texte und der
            Kontaktblock; Team-Stimmen, Bewertungen und Prozess-Schritte sind vorerst fest hinterlegt.
          </p>
        </div>
        <button className="btn" onClick={() => window.open('#/karriere', '_blank')}>
          Live-Vorschau öffnen ↗
        </button>
      </div>

      <div className="form-card">
        <div className="form-section-title">Startseite – Hero</div>
        <div className="form-row">
          <div className="form-field full">
            <label>Überschrift</label>
            <input value={config.heroTitle} onChange={(e) => set('heroTitle', e.target.value)} />
          </div>
          <div className="form-field full">
            <label>Zitat</label>
            <textarea value={config.quoteText} onChange={(e) => set('quoteText', e.target.value)} />
          </div>
          <div className="form-field">
            <label>Zitat-Person</label>
            <input value={config.quotePerson} onChange={(e) => set('quotePerson', e.target.value)} />
          </div>
          <div className="form-field">
            <label>Rolle</label>
            <input value={config.quoteRole} onChange={(e) => set('quoteRole', e.target.value)} />
          </div>
        </div>

        <div className="form-section-title">Startseite – Karriere-Block</div>
        <div className="form-row">
          <div className="form-field full">
            <label>Titel</label>
            <input value={config.careerBlockTitle} onChange={(e) => set('careerBlockTitle', e.target.value)} />
          </div>
          <div className="form-field full">
            <label>Text</label>
            <textarea value={config.careerBlockText} onChange={(e) => set('careerBlockText', e.target.value)} />
          </div>
        </div>

        <div className="form-section-title">Über uns – Kontakt</div>
        <div className="form-row">
          <div className="form-field">
            <label>Name</label>
            <input value={config.contactName} onChange={(e) => set('contactName', e.target.value)} />
          </div>
          <div className="form-field">
            <label>E-Mail</label>
            <input value={config.contactEmail} onChange={(e) => set('contactEmail', e.target.value)} />
          </div>
          <div className="form-field full">
            <label>Telefon</label>
            <input value={config.contactPhone} onChange={(e) => set('contactPhone', e.target.value)} />
          </div>
        </div>

        <div className="form-actions">
          <button className="btn btn-primary" onClick={save}>
            Speichern
          </button>
          {saved && <span className="stat-card-desc" style={{ alignSelf: 'center' }}>Gespeichert.</span>}
        </div>
      </div>
    </div>
  )
}
