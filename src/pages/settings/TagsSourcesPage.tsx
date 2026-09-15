import { useNavigate } from 'react-router-dom'
import { IconArrowLeft, IconPlus } from '../../components/Icons'

const SOURCES = ['Indeed', 'StepStone', 'Empfehlung', 'Initiativ', 'kostenlose Portale', 'LinkedIn']
const TAGS = ['Springer', 'mehrsprachig', 'Wochenende']

export function TagsSourcesPage() {
  const navigate = useNavigate()
  return (
    <div className="page">
      <button className="detail-back" onClick={() => navigate('/verwaltung')}>
        <IconArrowLeft size={14} /> Zurück zur Verwaltung
      </button>
      <div className="page-header">
        <div>
          <h1 className="page-title">Tags und Quellen</h1>
          <p className="page-subtitle">Quelle = Pflichtfeld für Auswertungen (z. B. „Neueinstellungen nach Quelle"). Tags = freie Kennzeichnung.</p>
        </div>
        <button className="btn btn-primary">
          <IconPlus size={14} /> Hinzufügen
        </button>
      </div>
      <div className="settings-groups">
        <div>
          <div className="settings-group-title">Quellen</div>
          <div className="panel">
            {SOURCES.map((s) => (
              <div className="info-row" key={s}>
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="settings-group-title">Tags</div>
          <div className="pool-card-tags">
            {TAGS.map((t) => (
              <span className="tag" key={t}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
