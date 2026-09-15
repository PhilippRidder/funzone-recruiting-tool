import { useNavigate } from 'react-router-dom'
import { IconArrowLeft, IconPlus } from '../../components/Icons'
import { EVALUATION_CRITERIA, INTERVIEW_GUIDES, SCORECARD_TEMPLATES } from '../../lib/evaluationForms'

export function EvaluationFormsPage() {
  const navigate = useNavigate()

  return (
    <div className="page">
      <button className="detail-back" onClick={() => navigate('/verwaltung')}>
        <IconArrowLeft size={14} /> Zurück zur Verwaltung
      </button>
      <div className="page-header">
        <div>
          <h1 className="page-title">Bewertungsformulare &amp; Gesprächsvorlagen</h1>
          <p className="page-subtitle">
            Formulare für die Kandidat*innen-Bewertung je Interview-Runde, sowie Gesprächsvorlagen mit fertigen
            Fragen, damit auch Teammitglieder ohne Recruiting-Erfahrung Bewerbungsgespräche führen können.
          </p>
        </div>
      </div>

      <div className="settings-group-title">Kriterien-Katalog</div>
      <div className="panel" style={{ maxWidth: 680 }}>
        {EVALUATION_CRITERIA.map((c) => (
          <div className="info-row" key={c.id}>
            <span style={{ fontWeight: 600 }}>{c.name}</span>
            <span className="k">Skala: {c.scale}</span>
            <span className="k">{c.pflicht ? 'Pflicht vor Phasenwechsel' : 'Optional'}</span>
          </div>
        ))}
        <button className="btn" style={{ marginTop: 12 }}>
          <IconPlus size={13} /> Kriterium hinzufügen
        </button>
      </div>

      <div className="settings-group-title">Bewertungsformulare</div>
      <p className="stat-card-desc" style={{ marginTop: -8, marginBottom: 12, maxWidth: 680 }}>
        Stellen je Interview-Runde eine Auswahl aus dem Kriterien-Katalog zusammen, plus eine interne Auswahlfrage
        für die Interviewer*innen.
      </p>
      {SCORECARD_TEMPLATES.map((s) => (
        <div className="panel" key={s.id} style={{ maxWidth: 680 }}>
          <div style={{ fontWeight: 700, marginBottom: 10 }}>{s.name}</div>
          <div className="pool-card-tags" style={{ marginBottom: 10 }}>
            {s.kriterien.map((k) => (
              <span className="tag" key={k}>
                {k}
              </span>
            ))}
          </div>
          {s.auswahlfrage && (
            <div className="info-row">
              <span className="k">Auswahlfrage</span>
              <span>{s.auswahlfrage}</span>
            </div>
          )}
        </div>
      ))}
      <button className="btn" style={{ marginBottom: 28 }}>
        <IconPlus size={13} /> Formular hinzufügen
      </button>

      <div className="settings-group-title">Gesprächsvorlagen</div>
      <p className="stat-card-desc" style={{ marginTop: -8, marginBottom: 12, maxWidth: 680 }}>
        Fertige Frageleitfäden für Bewerbungsgespräche – z. B. damit ein*e Minijobber*in den ersten Kontakt führen
        kann, ohne Recruiting-Erfahrung zu brauchen.
      </p>
      {INTERVIEW_GUIDES.map((g) => (
        <div className="panel" key={g.id} style={{ maxWidth: 680 }}>
          <div style={{ fontWeight: 700, marginBottom: 4 }}>{g.name}</div>
          <p className="stat-card-desc" style={{ marginTop: 0, marginBottom: 10 }}>
            {g.zielgruppe}
          </p>
          {g.fragen.map((f, i) => (
            <div className="info-row" key={i} style={{ display: 'block' }}>
              <div>{f.frage}</div>
              {f.hinweis && <div style={{ color: 'var(--text-faint)', fontSize: 12, marginTop: 2 }}>{f.hinweis}</div>}
            </div>
          ))}
        </div>
      ))}
      <button className="btn">
        <IconPlus size={13} /> Gesprächsvorlage hinzufügen
      </button>
    </div>
  )
}
