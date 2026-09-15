import { useState } from 'react'
import { IconMail, IconPaperclip, IconPencil, IconPhone, IconTrash, IconUser } from '../../../components/Icons'

const FIELDS = [
  { icon: IconUser, label: 'Vollständiger Name', editable: false },
  { icon: IconMail, label: 'E-Mail-Adresse', editable: false },
  { icon: IconPhone, label: 'Telefon', editable: true },
  { icon: IconPaperclip, label: 'Lebenslauf', editable: true },
  { icon: IconPaperclip, label: 'Anschreiben', editable: true, optional: true },
]

const PORTALS = [
  { name: 'Über LinkedIn bewerben', connected: false },
  { name: 'LinkedIn Apply Connect', connected: false },
  { name: 'Über Indeed bewerben', connected: true },
  { name: 'Bewerben mit XING', connected: false },
  { name: 'Über WhatsApp bewerben', connected: false },
]

export function ApplicationTab() {
  const [locationAsk, setLocationAsk] = useState(false)
  const [confirmationMail, setConfirmationMail] = useState(true)

  return (
    <>
      <div className="form-card" style={{ marginBottom: 16 }}>
        <div className="form-section-title" style={{ marginTop: 0 }}>Kandidat*innen-Daten</div>
        <p className="stat-card-desc" style={{ marginTop: -8, marginBottom: 10 }}>Diese Angaben geben Kandidat*innen im Bewerbungsformular ein.</p>
        {FIELDS.map((f) => (
          <div className="field-row" key={f.label}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <f.icon size={14} />
              {f.label}
              {f.optional && <span className="tag" style={{ marginLeft: 6 }}>Optional</span>}
            </span>
            {f.editable && (
              <span className="field-row-actions">
                <button><IconPencil size={14} /></button>
                <button><IconTrash size={14} /></button>
              </span>
            )}
          </div>
        ))}
        <button className="btn" style={{ marginTop: 12 }}>+ Neu hinzufügen</button>
      </div>

      <div className="form-card" style={{ marginBottom: 16 }}>
        <div className="form-section-title" style={{ marginTop: 0 }}>Auswahlfragen</div>
        <p className="stat-card-desc" style={{ marginTop: -8, marginBottom: 10 }}>Kandidat*innen beantworten diese Fragen, bevor sie sich bewerben (siehe Verwaltung → Fragebögen).</p>
        <select defaultValue="">
          <option value="">Keine</option>
          <option>Standard-Screening</option>
        </select>
        <button className="btn" style={{ marginTop: 12 }}>+ Neu hinzufügen</button>
      </div>

      <div className="toggle-card">
        <div>
          <div style={{ fontWeight: 600, fontSize: 13.5 }}>Nach dem bevorzugten Arbeitsort fragen</div>
          <div className="stat-card-desc" style={{ marginBottom: 0 }}>Kandidat*innen geben ihren bevorzugten Arbeitsort an.</div>
        </div>
        <button className={'widget-toggle' + (locationAsk ? ' on' : '')} onClick={() => setLocationAsk((v) => !v)}>
          {locationAsk ? 'Aktiv' : 'Inaktiv'}
        </button>
      </div>

      <div className="form-card" style={{ marginTop: 8, marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: 13.5 }}>Eingangsbestätigung senden</div>
            <div className="stat-card-desc">Kandidat*innen erhalten eine automatisierte E-Mail, nachdem sie sich beworben haben.</div>
          </div>
          <button className={'widget-toggle' + (confirmationMail ? ' on' : '')} onClick={() => setConfirmationMail((v) => !v)}>
            {confirmationMail ? 'Aktiv' : 'Inaktiv'}
          </button>
        </div>
        {confirmationMail && (
          <>
            <select defaultValue="Eingangsbestätigung" style={{ marginTop: 12, marginBottom: 12 }}>
              <option>Vorlage: Eingangsbestätigung + DSGVO-Hinweis</option>
            </select>
            <div className="email-preview">
              <div className="subject">Betreff: Eingangsbestätigung deiner Bewerbung</div>
              <p style={{ margin: '0 0 8px' }}>Hallo {'{{candidate.first}}'},</p>
              <p style={{ margin: '0 0 8px' }}>danke für deine Bewerbung auf die Position {'{{job.title}}'}.</p>
              <p style={{ margin: '0 0 8px' }}>Wir haben deine Unterlagen erhalten und sehen sie uns sorgfältig an. Du bekommst so bald wie möglich eine Rückmeldung.</p>
              <p style={{ margin: 0 }}>
                Viele Grüße
                <br />
                {'{{hiring_manager.full}}'}
                <br />
                FunZone-Gruppe
              </p>
            </div>
          </>
        )}
      </div>

      <div className="form-card">
        <div className="form-section-title" style={{ marginTop: 0 }}>Bewerbungseinstellungen</div>
        <p className="stat-card-desc" style={{ marginTop: -8, marginBottom: 10 }}>Plattformen, über die sich Kandidat*innen bewerben können.</p>
        {PORTALS.map((p) => (
          <div className="toggle-card" key={p.name}>
            <span style={{ fontSize: 13 }}>{p.name}</span>
            {p.connected ? <span className="widget-toggle on">Aktiviert</span> : <button className="btn">Integration hinzufügen</button>}
          </div>
        ))}
      </div>
    </>
  )
}
