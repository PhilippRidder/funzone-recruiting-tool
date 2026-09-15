import { useMemo, useState } from 'react'
import { PERMISSIONS, PERM_TABS, ROLE_PERMISSIONS, type PermTab } from '../lib/permissions'

const STANDORTE = [
  'Augsburg', 'Bielefeld', 'Düsseldorf – Verwaltung', 'Duisburg', 'Essen West – Borbeck', 'Essen Ost – Kray',
  'Freiburg-Denzlingen', 'Frankfurt am Main', 'Hamburg', 'Kiel', 'Köln', 'Mainz', 'Mönchengladbach', 'München',
]

const ROLE_INFO: { name: string; scope: string; members: string[]; standortScope: 'alle' | 'ausgewaehlt'; standorte: string[] }[] = [
  { name: 'Administrator*in', scope: 'Administrator*innen haben Zugriff auf alle Kandidat*innen, Jobs und Einstellungen und können den Unternehmens-Account und die Mitglieder vollständig verwalten. Nur Nutzer*innen mit dieser Rolle können andere Administrator*innen löschen.', members: ['PR', 'MD'], standortScope: 'alle', standorte: [] },
  { name: 'Geschäftsführung', scope: 'Vollzugriff lesend, Freigabe von Stellenanträgen und unternehmensweiten Einstellungen.', members: ['PW'], standortScope: 'alle', standorte: [] },
  { name: 'Recruiting-Manager', scope: 'Alle Stellen & Bewerber verwalten, standortübergreifend.', members: ['AB'], standortScope: 'alle', standorte: [] },
  { name: 'Head of Marketing', scope: 'Stellenanzeigen-Texte & Employer Branding, kein Bewerberzugriff.', members: ['SD'], standortScope: 'alle', standorte: [] },
  { name: 'Head of Accounting', scope: 'Nur Berichte (Kosten je Einstellung).', members: [], standortScope: 'alle', standorte: [] },
  { name: 'Head of Sales', scope: 'Bewerber & Stellen der eigenen Abteilung.', members: [], standortScope: 'alle', standorte: [] },
  { name: 'Head of Social Media', scope: 'Stellenanzeigen-Texte & Quellen-Auswertung.', members: [], standortScope: 'alle', standorte: [] },
  { name: 'Head of IT-Support', scope: 'Nur die von IT ausgeschriebenen Stellen.', members: [], standortScope: 'ausgewaehlt', standorte: ['Düsseldorf – Verwaltung'] },
  { name: 'Standortleitung', scope: 'Bewerber & Stellen des eigenen Standorts, inkl. Absagen.', members: [], standortScope: 'ausgewaehlt', standorte: ['Augsburg'] },
  { name: 'stellvertretende Standortleitung', scope: 'Wie Standortleitung, ohne Freigaberecht für Absagen.', members: [], standortScope: 'ausgewaehlt', standorte: ['Augsburg'] },
  { name: 'Recruiting-Support', scope: 'Bearbeiten (Kandidaten pflegen, Termine), keine Lösch-/Freigaberechte.', members: [], standortScope: 'alle', standorte: [] },
]

export function Roles() {
  const [selected, setSelected] = useState(0)
  const [tab, setTab] = useState<PermTab>('Allgemein')
  const [overrides, setOverrides] = useState<Record<string, string[]>>({})

  const roleInfo = ROLE_INFO[selected]
  const isAdmin = roleInfo.name === 'Administrator*in'
  const enabled = overrides[roleInfo.name] ?? ROLE_PERMISSIONS[roleInfo.name] ?? []
  const [standortScope, setStandortScope] = useState(roleInfo.standortScope)
  const [standorte, setStandorte] = useState(roleInfo.standorte)

  const selectRole = (i: number) => {
    setSelected(i)
    setStandortScope(ROLE_INFO[i].standortScope)
    setStandorte(ROLE_INFO[i].standorte)
  }

  const toggle = (id: string) => {
    if (isAdmin) return
    const current = overrides[roleInfo.name] ?? ROLE_PERMISSIONS[roleInfo.name] ?? []
    const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id]
    setOverrides((o) => ({ ...o, [roleInfo.name]: next }))
  }

  const toggleStandort = (s: string) => {
    setStandorte((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]))
  }

  const itemsInTab = useMemo(() => PERMISSIONS.filter((p) => p.tab === tab), [tab])
  let lastSection = ''

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Nutzungsrollen</h1>
          <p className="page-subtitle">
            Vollständiger Berechtigungskatalog (1:1 aus Recruitee) je Rolle, plus Standort-Einschränkung für FunZone.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 20, alignItems: 'flex-start' }}>
        <div className="panel" style={{ padding: 8 }}>
          {ROLE_INFO.map((r, i) => (
            <div
              key={r.name}
              className="settings-item"
              style={i === selected ? { borderColor: 'var(--accent)', background: 'var(--accent-bg)' } : {}}
              onClick={() => selectRole(i)}
            >
              <div>{r.name}</div>
            </div>
          ))}
        </div>

        <div>
          <div className="panel" style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{roleInfo.name}</div>
                {isAdmin && <div style={{ color: 'var(--orange)', fontSize: 12, marginTop: 2 }}>Die Rollenberechtigungen können nicht bearbeitet werden.</div>}
              </div>
            </div>
            <p className="stat-card-desc" style={{ marginTop: 8 }}>{roleInfo.scope}</p>

            <div className="form-section-title">Zugewiesene Mitglieder</div>
            <div style={{ display: 'flex', gap: 6 }}>
              {roleInfo.members.map((m) => (
                <div key={m} className="cp-avatar" style={{ width: 30, height: 30, background: 'var(--accent-bg)', color: 'var(--accent-text)', fontSize: 11 }}>
                  {m}
                </div>
              ))}
              <button className="chip-add">+</button>
            </div>

            <div className="form-section-title">Standort-Zugriff</div>
            <div className="toolbar" style={{ marginBottom: standortScope === 'ausgewaehlt' ? 10 : 0 }}>
              <button className={'toolbar-pill' + (standortScope === 'alle' ? ' active' : '')} onClick={() => setStandortScope('alle')}>
                Alle Standorte
              </button>
              <button className={'toolbar-pill' + (standortScope === 'ausgewaehlt' ? ' active' : '')} onClick={() => setStandortScope('ausgewaehlt')}>
                Ausgewählte Standorte
              </button>
            </div>
            {standortScope === 'ausgewaehlt' && (
              <div className="chip-row">
                {STANDORTE.map((s) => (
                  <button key={s} className={'job-pill' + (standorte.includes(s) ? ' active' : '')} onClick={() => toggleStandort(s)} style={{ padding: '5px 12px' }}>
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="tabbar" style={{ padding: 0, marginBottom: 4 }}>
            {PERM_TABS.map((t) => (
              <button key={t} className={'tabbar-item' + (tab === t ? ' active' : '')} onClick={() => setTab(t)}>
                {t}
              </button>
            ))}
          </div>

          <div className="panel" style={{ marginTop: 16 }}>
            {itemsInTab.map((p) => {
              const showSection = p.section && p.section !== lastSection
              lastSection = p.section ?? lastSection
              return (
                <div key={p.id}>
                  {showSection && <div className="stage-group-title">{p.section}</div>}
                  <label className="checkbox-row" style={{ alignItems: 'flex-start', opacity: isAdmin ? 0.85 : 1 }}>
                    <input type="checkbox" checked={enabled.includes(p.id)} onChange={() => toggle(p.id)} disabled={isAdmin} style={{ marginTop: 3 }} />
                    <span>
                      <div style={{ fontWeight: 600 }}>
                        {p.title}
                        {p.badge && <span className="tag" style={{ marginLeft: 6 }}>{p.badge}</span>}
                      </div>
                      <div className="stat-card-desc" style={{ marginBottom: 0 }}>{p.desc}</div>
                    </span>
                  </label>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
