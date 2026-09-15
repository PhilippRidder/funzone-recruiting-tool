import { Fragment, useState } from 'react'
import { IconCheck } from '../../components/Icons'

interface NotifRow {
  id: string
  text: string
  note?: string
  web: boolean
  mobile: boolean
  email: boolean
}

const INITIAL: { group: string; rows: NotifRow[] }[] = [
  {
    group: 'Grundlegende Aktionen',
    rows: [
      { id: 'n1', text: 'Wenn ich in Notizen und Bewertungen erwähnt werde', web: true, mobile: true, email: false },
      { id: 'n2', text: 'Wenn ich Jobs, Talent Pools, Bewertungsanfragen, Aufgaben, Ereignissen oder Kandidat*innen zugewiesen werde oder diese Zuweisung aufgehoben wird', web: true, mobile: false, email: false },
      { id: 'n3', text: 'Wenn meine Aufgaben heute fällig oder überfällig sind', note: 'Wir benachrichtigen dich jeden Morgen.', web: true, mobile: true, email: false },
      { id: 'n4', text: 'Wenn jemand auf meine Notizen reagiert oder antwortet', web: false, mobile: false, email: false },
    ],
  },
  {
    group: 'Gefolgte Kandidat*innen',
    rows: [
      { id: 'n5', text: 'Aktionen werden im Profil des*der Kandidat*in durchgeführt', web: false, mobile: false, email: false },
      { id: 'n6', text: 'Gefolgte Kandidat*innen sind überfällig', note: 'Wir benachrichtigen dich jeden Morgen.', web: true, mobile: false, email: false },
      { id: 'n7', text: 'Gefolgte Kandidat*innen werden als Eingestellt markiert', web: true, mobile: false, email: false },
      { id: 'n8', text: 'Gefolgte Kandidat*innen laufen in 14 Tagen ab', web: false, mobile: false, email: false },
    ],
  },
]

export function AccountNotificationsPage() {
  const [groups, setGroups] = useState(INITIAL)

  const toggle = (rowId: string, col: 'web' | 'mobile' | 'email') => {
    setGroups((gs) => gs.map((g) => ({ ...g, rows: g.rows.map((r) => (r.id === rowId ? { ...r, [col]: !r[col] } : r)) })))
  }

  const reset = () => setGroups(INITIAL)

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Benachrichtigungseinstellungen</h1>
          <p className="page-subtitle">Wähle aus, welche Benachrichtigungen du wo erhalten möchtest.</p>
        </div>
        <button className="btn" onClick={reset}>
          ↺ Auf die Standardeinstellungen zurücksetzen
        </button>
      </div>

      <div className="panel" style={{ maxWidth: 820 }}>
        <table className="notif-table">
          <thead>
            <tr>
              <th></th>
              <th>Web</th>
              <th>Mobil</th>
              <th>E-Mail</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((g) => (
              <Fragment key={g.group}>
                <tr className="notif-group-row">
                  <td colSpan={4}>{g.group}</td>
                </tr>
                {g.rows.map((r) => (
                  <tr key={r.id}>
                    <td>
                      {r.text}
                      {r.note && <div className="notif-note">{r.note}</div>}
                    </td>
                    {(['web', 'mobile', 'email'] as const).map((col) => (
                      <td className="center" key={col}>
                        <button className={'notif-dot' + (r[col] ? ' on' : '')} onClick={() => toggle(r.id, col)}>
                          {r[col] && <IconCheck size={11} />}
                        </button>
                      </td>
                    ))}
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className="panel" style={{ maxWidth: 820, marginTop: 16 }}>
        <div className="panel-title">Bericht über eingehende Kandidat*innen</div>
        <p className="stat-card-desc" style={{ marginTop: -6, marginBottom: 12 }}>
          Lege die Häufigkeit von Berichten über Kandidat*innen fest, die sich beworben haben oder empfohlen wurden.
        </p>
        <div style={{ display: 'flex', gap: 10 }}>
          <select defaultValue="taeglich" style={{ maxWidth: 220 }}>
            <option value="taeglich">Tägliche Zusammenfassung</option>
            <option value="woechentlich">Wöchentliche Zusammenfassung</option>
            <option value="aus">Aus</option>
          </select>
          <select defaultValue="8" style={{ maxWidth: 100 }}>
            <option value="8">8:00</option>
            <option value="9">9:00</option>
          </select>
        </div>
      </div>
    </div>
  )
}
