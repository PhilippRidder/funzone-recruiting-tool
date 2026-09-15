import { useNavigate } from 'react-router-dom'
import { IconArrowLeft, IconPlus } from '../../components/Icons'

const MEMBERS = [
  { name: 'Philipp Ridder', email: 'philipp@laserzone.de', rolle: 'Administrator*in', standort: 'Alle' },
  { name: 'Patrick Wrobel', email: 'patrick@laserzone.de', rolle: 'Geschäftsführung', standort: 'Alle' },
  { name: 'Stefan Dickhäuser', email: 'stefan@laserzone.de', rolle: 'Head of Marketing', standort: 'Alle' },
  { name: 'Svenja Eikelmann', email: 'svenja@laserzone.de', rolle: 'Recruiting-Support', standort: 'Alle' },
  { name: 'Adrian Mustermann', email: 'adrian@laserzone.de', rolle: 'Standortleitung', standort: 'Augsburg' },
]

export function TeamMembersPage() {
  const navigate = useNavigate()
  return (
    <div className="page">
      <button className="detail-back" onClick={() => navigate('/verwaltung')}>
        <IconArrowLeft size={14} /> Zurück zur Verwaltung
      </button>
      <div className="page-header">
        <div>
          <h1 className="page-title">Teammitglieder</h1>
          <p className="page-subtitle">Nutzerliste mit Rolle (siehe Nutzungsrollen) und Standortzuordnung.</p>
        </div>
        <button className="btn btn-primary">
          <IconPlus size={14} /> Mitglied einladen
        </button>
      </div>
      <div className="panel" style={{ maxWidth: 780 }}>
        {MEMBERS.map((m) => (
          <div className="info-row" key={m.email}>
            <span style={{ fontWeight: 600 }}>{m.name}</span>
            <span className="k">{m.email}</span>
            <span className="k">{m.rolle}</span>
            <span className="k">{m.standort}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
