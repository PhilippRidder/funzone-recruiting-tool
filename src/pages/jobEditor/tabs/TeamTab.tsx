const DECISION_MAKERS = [
  { role: 'Recruiter*in', name: 'Anna Berger' },
  { role: 'Einstellende*r Manager*in', name: 'Philipp Ridder' },
]

const MEMBERS = [
  { name: 'Philipp Ridder', badge: 'Einstellende*r Manager*in', rolle: 'Administrator*in' },
  { name: 'Anna Berger', badge: 'Recruiter*in', rolle: 'Standortleitung' },
]

const GROUPS = [
  { name: 'Administrator*in', count: 6 },
  { name: 'Geschäftsführung', count: 2 },
]

export function TeamTab() {
  return (
    <>
      <div className="form-card" style={{ marginBottom: 16 }}>
        <div className="form-section-title" style={{ marginTop: 0 }}>Entscheidungsträger*innen</div>
        <p className="stat-card-desc" style={{ marginTop: -8, marginBottom: 10 }}>Teammitglieder, die für den Recruiting-Prozess und die Stellenanforderungen verantwortlich sind.</p>
        <div className="form-row">
          {DECISION_MAKERS.map((d) => (
            <div className="form-field" key={d.role}>
              <label>{d.role}</label>
              <div className="chip-row">
                <span className="chip">
                  {d.name}
                  <button>×</button>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="form-card">
        <div className="form-section-title" style={{ marginTop: 0 }}>Teammitglieder</div>
        <p className="stat-card-desc" style={{ marginTop: -8, marginBottom: 10 }}>Haben Zugriff auf diesen Job und alle Kandidat*innen in der Pipeline.</p>
        {MEMBERS.map((m) => (
          <div className="field-row" key={m.name}>
            <span>
              <span style={{ fontWeight: 600 }}>{m.name}</span>{' '}
              <span className="tag">{m.badge}</span>
              <div className="stat-card-desc" style={{ marginTop: 2, marginBottom: 0 }}>{m.rolle}</div>
            </span>
            <span className="field-row-actions">×</span>
          </div>
        ))}
        {GROUPS.map((g) => (
          <div className="field-row" key={g.name}>
            <span>
              <span style={{ fontWeight: 600 }}>{g.name}</span>
              <div className="stat-card-desc" style={{ marginTop: 2, marginBottom: 0 }}>{g.count} Teammitglieder können auf alle Jobs zugreifen</div>
            </span>
          </div>
        ))}
        <button className="btn" style={{ marginTop: 12 }}>+ Teammitglied hinzufügen</button>
      </div>
    </>
  )
}
