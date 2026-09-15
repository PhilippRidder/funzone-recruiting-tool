import { useNavigate } from 'react-router-dom'

// Kategorisierung 1:1 nach den 4 echten Recruitee-Einstellungsreitern
// (Mein Konto / Allgemein / Prozess / Vorlagen).

const MEIN_KONTO = [
  { name: 'Profil', sub: 'E-Mail-Einstellungen, Kalender, Darstellung', to: '/verwaltung/mein-konto/profil' },
  { name: 'Benachrichtigungen', sub: 'Web/Mobil/E-Mail je Ereignis', to: '/verwaltung/mein-konto/benachrichtigungen' },
]

const ALLGEMEIN = [
  { name: 'Unternehmenseinstellungen', sub: 'Branding, Absenderadresse', to: '/verwaltung/unternehmen' },
  { name: 'Teammitglieder', sub: 'Nutzer & Standortzuordnung', to: '/verwaltung/team' },
  { name: 'Nutzungsrollen', sub: '11 Rollen, Erstentwurf', to: '/verwaltung/nutzungsrollen' },
  { name: 'Standorte', sub: 'FunZone-Standorte', to: '/verwaltung/standorte' },
  { name: 'Empfehlungsportal', sub: 'Mitarbeiter-Empfehlungsprogramm + Fragen', to: '/verwaltung/empfehlungsportal' },
  { name: 'Karriereseite', sub: 'Öffentliche Jobseite (karriere.fun-zone.de), Editor', to: '/verwaltung/karriereseite' },
]

const PROZESS = [
  { name: 'Benutzerdefinierte Felder', sub: 'Zusatzfelder am Bewerberprofil', to: '/verwaltung/felder' },
  { name: 'Absagegründe', sub: '12 Gründe, teils mit Auto-Mail', to: '/verwaltung/absagegruende' },
  { name: 'Tags und Quellen', sub: 'Herkunft & freie Kennzeichnung', to: '/verwaltung/tags-quellen' },
  { name: 'Ereignis-Planer', sub: 'Interviews über Microsoft Teams', to: '/verwaltung/ereignis-planer' },
  { name: 'Automatisierungen', sub: 'Auto-Mails, Erinnerungen', to: '/verwaltung/automatisierungen' },
]

const VORLAGEN = [
  { name: 'Pipeline-Vorlagen', sub: 'Mehrere Pipelines je Job-Kategorie, Phasen + Automatisierungen', to: '/verwaltung/pipeline-phasen' },
  { name: 'E-Mail-Vorlagen', sub: 'Eingang, Einladung, Zu-/Absage', to: '/verwaltung/email-vorlagen' },
  { name: 'Bewertungsformulare & Gesprächsvorlagen', sub: 'Kriterien-Katalog, Scorecards je Interview-Runde, Frageleitfäden für Interviews', to: '/verwaltung/bewertungsformulare' },
  { name: 'Fragebögen', sub: 'Screening-Fragen für Bewerber', to: '/verwaltung/fragebogen' },
  { name: 'Angebotsschreiben', sub: 'Vertrags-/Angebots-Vorlagen', to: '/verwaltung/angebotsschreiben' },
]

export function Verwaltung() {
  const navigate = useNavigate()

  const renderGroup = (title: string, items: typeof PROZESS) => (
    <div>
      <div className="settings-group-title">{title}</div>
      {items.length === 0 ? (
        <div className="settings-item" style={{ cursor: 'default', opacity: 0.7 }}>
          <div>
            Noch nicht angelegt
            <span className="sub">Persönliche Konto-Einstellungen (E-Mail-Verbindung, Signatur, Abwesenheitsnachricht, Kalender, Darstellung)</span>
          </div>
        </div>
      ) : (
        items.map((item) => (
          <div className="settings-item" key={item.name} onClick={() => item.to && navigate(item.to)}>
            <div>
              {item.name}
              <span className="sub">{item.sub}</span>
            </div>
          </div>
        ))
      )}
    </div>
  )

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Verwaltung</h1>
          <p className="page-subtitle">Stammdaten & Einstellungen des Recruiting-Tools, kategorisiert wie in Recruitee (Mein Konto / Allgemein / Prozess / Vorlagen).</p>
        </div>
      </div>
      <div className="settings-groups">
        {renderGroup('Mein Konto', MEIN_KONTO)}
        {renderGroup('Allgemein', ALLGEMEIN)}
        {renderGroup('Prozess', PROZESS)}
        {renderGroup('Vorlagen', VORLAGEN)}
      </div>
    </div>
  )
}
