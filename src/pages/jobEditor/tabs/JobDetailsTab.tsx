import { useState } from 'react'
import { IconPencil } from '../../../components/Icons'

const INITIAL_TAGS = ['Indeed', 'LinkedIn', 'Meta', 'Indeed - Premium']
const MODELS = [
  { key: 'vor-ort', title: 'Vor Ort', desc: 'Mitarbeiter*innen arbeiten von einem dafür vorgesehenen Arbeitsplatz aus.' },
  { key: 'homeoffice', title: 'Homeoffice', desc: 'Mitarbeiter*innen können von überall aus arbeiten.' },
  { key: 'hybrid', title: 'Hybrid', desc: 'Mitarbeiter*innen arbeiten teils Homeoffice und teils in einem Büro.' },
]

export function JobDetailsTab() {
  const [tags, setTags] = useState(INITIAL_TAGS)
  const [model, setModel] = useState('vor-ort')

  return (
    <>
      <div className="form-card" style={{ marginBottom: 16 }}>
        <div className="form-section-title">Grundlegende Informationen</div>
        <p className="stat-card-desc" style={{ marginTop: -8, marginBottom: 14 }}>Gib die grundlegenden Informationen zum Job an.</p>
        <div className="form-row">
          <div className="form-field">
            <label>Jobtitel</label>
            <input defaultValue="Stellv. Filialleiter Freizeitbranche Vollzeit (m/w/d)" />
          </div>
          <div className="form-field">
            <label>Abteilung</label>
            <select defaultValue="Augsburg">
              <option>FunZone Augsburg</option>
              <option>FunZone Hamburg</option>
              <option>FunZone Köln</option>
            </select>
          </div>
        </div>
        <div className="form-field full" style={{ marginTop: 6 }}>
          <label>Tags (Portale/Kanäle)</label>
          <div className="chip-row">
            {tags.map((t) => (
              <span className="chip" key={t}>
                {t}
                <button onClick={() => setTags((ts) => ts.filter((x) => x !== t))}>×</button>
              </span>
            ))}
            <button className="chip-add">+</button>
          </div>
        </div>
        <div className="form-section-title" style={{ marginTop: 22 }}>Zur internen Verwendung</div>
        <div className="form-field">
          <label>Priorität</label>
          <select defaultValue="hoch" style={{ maxWidth: 200 }}>
            <option value="hoch">🚩 Hoch</option>
            <option value="mittel">Mittel</option>
            <option value="niedrig">Niedrig</option>
          </select>
        </div>
      </div>

      <div className="form-card" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div className="form-section-title" style={{ marginTop: 0 }}>Begrenze die Anzahl der Stellenausschreibungen</div>
            <p className="stat-card-desc" style={{ marginTop: -8 }}>Wenn das Limit erreicht wird, werden zukünftige Einstellungen blockiert.</p>
          </div>
          <button className="widget-toggle on">Aktiv</button>
        </div>
        <div className="form-field" style={{ maxWidth: 160 }}>
          <label>Anzahl der Stellenausschreibungen</label>
          <input type="number" defaultValue={1} />
        </div>
      </div>

      <div className="form-card" style={{ marginBottom: 16 }}>
        <div className="form-section-title" style={{ marginTop: 0 }}>Über diese Stelle</div>
        <p className="stat-card-desc" style={{ marginTop: -8, marginBottom: 14 }}>Beschreibung der Stelle und der Verantwortungsbereiche.</p>
        <div className="form-field full">
          <label>Beschreibung</label>
          <textarea
            rows={10}
            defaultValue={`WAS DU BEI UNS MACHST\nSchlägt dein Herz für Führung und Service? Du bist nicht nur stellvertretender Filialleiter (m/w/d), sondern begleitest dein Team als Vorbild auf dem Weg zum Erfolg.\n\nWAS WIR BIETEN\n– Feste, planbare Arbeitszeiten\n– Mitarbeiterrabatte bei zahlreichen Partnern\n– Kostenfreie Nutzung aller FunZone Freizeitentertainments\n– Strukturierte Einarbeitung und Weiterentwicklungsmöglichkeiten`}
          />
        </div>
        <div className="form-field full">
          <label>Anforderungen</label>
          <textarea
            rows={6}
            defaultValue={`WAS DU MITBRINGST\n– Abgeschlossene Berufsausbildung oder Studium\n– Erfahrung im Einzelhandel oder als Kassierer*in\n– Gültiger PKW-Führerschein\n– Freude am Umgang mit Menschen`}
          />
        </div>
      </div>

      <div className="form-card" style={{ marginBottom: 16 }}>
        <div className="form-section-title" style={{ marginTop: 0 }}>Standort</div>
        <p className="stat-card-desc" style={{ marginTop: -8, marginBottom: 12 }}>Zugeordnete Standorte werden auf der Karriereseite angezeigt.</p>
        <div className="field-row">
          <div>
            <div style={{ fontWeight: 600 }}>Augsburg</div>
            <div className="stat-card-desc" style={{ marginBottom: 0 }}>Deutschland, Bayern, Augsburg, 86165, Brienner Str. 8</div>
          </div>
          <div className="field-row-actions">
            <button><IconPencil size={14} /></button>
          </div>
        </div>
      </div>

      <div className="form-card" style={{ marginBottom: 16 }}>
        <div className="form-section-title" style={{ marginTop: 0 }}>Arbeitsmodell</div>
        <div className="model-cards">
          {MODELS.map((m) => (
            <div key={m.key} className={'model-card' + (model === m.key ? ' selected' : '')} onClick={() => setModel(m.key)}>
              <div className="model-card-title">{m.title}</div>
              <div className="model-card-desc">{m.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="form-card" style={{ marginBottom: 16 }}>
        <div className="form-section-title" style={{ marginTop: 0 }}>Details zur Beschäftigung</div>
        <div className="form-row">
          <div className="form-field">
            <label>Beschäftigungsverhältnis</label>
            <select defaultValue="Vollzeit, Befristet">
              <option>Vollzeit, Befristet</option>
              <option>Vollzeit, Unbefristet</option>
              <option>Teilzeit</option>
              <option>Minijob</option>
              <option>Werkstudent</option>
            </select>
          </div>
          <div className="form-field">
            <label>Kategorie</label>
            <select defaultValue="Freizeit">
              <option>Freizeit</option>
              <option>Verwaltung</option>
            </select>
          </div>
          <div className="form-field">
            <label>Erforderliche Ausbildung</label>
            <select defaultValue="Sekundarstufe">
              <option value="Sekundarstufe">Sekundarstufe oder gleichwertig</option>
              <option value="keine">Keine Anforderung</option>
            </select>
          </div>
          <div className="form-field">
            <label>Erforderliche Erfahrung</label>
            <select defaultValue="Erfahren">
              <option>Erfahren</option>
              <option>Berufseinsteiger*in</option>
            </select>
          </div>
          <div className="form-field">
            <label>Stunden pro Woche (Min – Max)</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input placeholder="Min" style={{ width: 80 }} />
              <input placeholder="Max" style={{ width: 80 }} />
            </div>
          </div>
        </div>
      </div>

      <div className="form-card">
        <div className="form-section-title" style={{ marginTop: 0 }}>Gehalt</div>
        <p className="stat-card-desc" style={{ marginTop: -8, marginBottom: 12 }}>Sichtbar für Kandidat*innen auf der Karriereseite und in Jobbörsen.</p>
        <div className="form-row">
          <div className="form-field">
            <label>Min.</label>
            <input defaultValue="33.000,00" />
          </div>
          <div className="form-field">
            <label>Max.</label>
            <input defaultValue="38.000,00" />
          </div>
          <div className="form-field">
            <label>Gehaltsperiode</label>
            <select defaultValue="Jährlich">
              <option>Jährlich</option>
              <option>Monatlich</option>
              <option>Stündlich</option>
            </select>
          </div>
          <div className="form-field">
            <label>Währung</label>
            <select defaultValue="EUR">
              <option value="EUR">Euro (EUR)</option>
            </select>
          </div>
        </div>
      </div>
    </>
  )
}
