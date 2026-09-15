import { useNavigate } from 'react-router-dom'
import { IconArrowLeft, IconPlus } from '../../components/Icons'

const QUESTIONNAIRES = [
  { name: 'Standard-Screening', fragen: ['Führerschein vorhanden?', 'Verfügbar ab wann?', 'Sprachkenntnisse?'] },
  { name: 'IT-Support-Screening', fragen: ['Englischkenntnisse?', 'Erfahrung mit Ticketsystemen?'] },
]

export function QuestionnairesPage() {
  const navigate = useNavigate()
  return (
    <div className="page">
      <button className="detail-back" onClick={() => navigate('/verwaltung')}>
        <IconArrowLeft size={14} /> Zurück zur Verwaltung
      </button>
      <div className="page-header">
        <div>
          <h1 className="page-title">Fragebögen</h1>
          <p className="page-subtitle">Screening-Fragen, die Bewerber*innen auf der Karriereseite beim Bewerben beantworten.</p>
        </div>
        <button className="btn btn-primary">
          <IconPlus size={14} /> Fragebogen hinzufügen
        </button>
      </div>
      {QUESTIONNAIRES.map((q) => (
        <div className="panel" key={q.name} style={{ maxWidth: 620 }}>
          <div style={{ fontWeight: 700, marginBottom: 10 }}>{q.name}</div>
          {q.fragen.map((f) => (
            <div className="info-row" key={f}>
              <span>{f}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
