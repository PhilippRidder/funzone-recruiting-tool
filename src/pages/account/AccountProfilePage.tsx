import { useState } from 'react'
import { IconCheck, IconMail, IconPencil, IconSettings } from '../../components/Icons'

type Tab = 'email' | 'kalender' | 'darstellung'

export function AccountProfilePage() {
  const [tab, setTab] = useState<Tab>('email')
  const [theme, setTheme] = useState<'hell' | 'dunkel' | 'system'>('dunkel')

  return (
    <div className="page">
      <div className="account-header">
        <div className="account-header-left">
          <div className="account-avatar">PR</div>
          <div>
            <div className="account-name">Philipp Ridder</div>
            <div className="account-meta">+49 160 93003723 · philipp@laserzone.de · Administrator*in</div>
          </div>
        </div>
        <div className="account-actions">
          <button className="btn">
            <IconSettings size={14} /> Profil bearbeiten
          </button>
          <button className="btn">Sicherheitseinstellungen</button>
        </div>
      </div>

      <div className="tabbar" style={{ padding: 0, marginBottom: 20 }}>
        <button className={'tabbar-item' + (tab === 'email' ? ' active' : '')} onClick={() => setTab('email')}>
          E-Mail-Einstellungen
        </button>
        <button className={'tabbar-item' + (tab === 'kalender' ? ' active' : '')} onClick={() => setTab('kalender')}>
          Kalender <span className="tag" style={{ marginLeft: 4 }}>1</span>
        </button>
        <button className={'tabbar-item' + (tab === 'darstellung' ? ' active' : '')} onClick={() => setTab('darstellung')}>
          Darstellung
        </button>
      </div>

      {tab === 'email' && (
        <>
          <div className="panel" style={{ marginBottom: 16 }}>
            <div className="panel-title">E-Mail Accounts</div>
            <p className="stat-card-desc" style={{ marginTop: -6, marginBottom: 14 }}>
              Bestimme die E-Mail-Adresse, die du für das Versenden von E-Mails aus dem Recruiting-Tool verwenden möchtest.
            </p>
            <div className="provider-row">
              <div className="provider-row-left">
                <div className="provider-icon">G</div>
                <span>Google (Gmail)</span>
              </div>
              <button className="btn">Verbinden</button>
            </div>
            <div className="provider-row connected">
              <div className="provider-row-left">
                <div className="provider-icon">
                  <IconMail size={15} />
                </div>
                <div>
                  <div style={{ fontWeight: 600 }}>Microsoft (Outlook/Exchange)</div>
                  <div className="stat-card-desc" style={{ marginBottom: 0 }}>philipp@laserzone.de</div>
                </div>
              </div>
              <span style={{ color: 'var(--accent-text)', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600 }}>
                <IconCheck size={14} /> Verbunden
              </span>
            </div>
            <div className="provider-row">
              <div className="provider-row-left">
                <div className="provider-icon">@</div>
                <span>Anderer Posteingang</span>
              </div>
              <button className="btn">Verbinden</button>
            </div>
          </div>

          <div className="panel" style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="panel-title" style={{ marginBottom: 0 }}>E-Mail-Signatur</div>
              <button className="action-pill link">
                <IconPencil size={12} /> Bearbeiten
              </button>
            </div>
            <p className="stat-card-desc">Verwende deine eigene Signatur, wenn du E-Mails aus dem Tool versendest.</p>
            <div className="email-preview">
              <strong>PHILIPP RIDDER</strong>
              <br />
              Recruiter | FunZone-Gruppe
              <br />
              Tel: +49 160 93003723
              <br />
              philipp@laserzone.de
              <br />
              www.fun-zone.de
            </div>
          </div>

          <div className="panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="panel-title" style={{ marginBottom: 0 }}>Abwesenheitsnachricht</div>
              <button className="action-pill link">
                <IconPencil size={12} /> Bearbeiten
              </button>
            </div>
            <p className="stat-card-desc" style={{ marginBottom: 0 }}>Inaktiv</p>
          </div>
        </>
      )}

      {tab === 'kalender' && (
        <div className="panel">
          <div className="panel-title">Kalender</div>
          <p className="stat-card-desc" style={{ marginTop: -6, marginBottom: 14 }}>
            Verknüpfe deinen Kalender, um alle Ereignisse mit Kandidat*innen an einem Ort zu verwalten.
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span className="stat-card-desc" style={{ marginBottom: 0 }}>1 Kalender synchronisiert</span>
            <button className="btn">+ Kalender synchronisieren</button>
          </div>
          <div className="provider-row connected">
            <div className="provider-row-left">
              <div className="provider-icon">
                <IconMail size={15} />
              </div>
              <div>
                <div style={{ fontWeight: 600 }}>Microsoft (Outlook/Exchange) – Calendar</div>
                <div className="stat-card-desc" style={{ marginBottom: 0 }}>Persönlicher Kalender, synchronisiert vor 4 Minuten</div>
              </div>
            </div>
            <span style={{ color: 'var(--accent-text)', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600 }}>
              <IconCheck size={14} /> Verbunden
            </span>
          </div>
        </div>
      )}

      {tab === 'darstellung' && (
        <div className="panel">
          <div className="panel-title">Oberflächen-Theme</div>
          <p className="stat-card-desc" style={{ marginTop: -6, marginBottom: 14 }}>
            Ändere das Aussehen deines Kontos. Wechsle zwischen Hell- und Dunkelmodus oder passe die Darstellung an deine Systemeinstellungen an.
          </p>
          <div className="theme-cards">
            {[
              { key: 'hell' as const, label: 'Hell (Standard)', cls: 'light' },
              { key: 'dunkel' as const, label: 'Dunkel', cls: 'dark' },
              { key: 'system' as const, label: 'Systemeinstellungen', cls: 'system' },
            ].map((t) => (
              <div key={t.key} className={'theme-card' + (theme === t.key ? ' selected' : '')} onClick={() => setTheme(t.key)}>
                <div className={`theme-preview ${t.cls}`} />
                <span style={{ fontSize: 12.5 }}>{t.label}</span>
                {theme === t.key && (
                  <div className="theme-check">
                    <IconCheck size={12} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
