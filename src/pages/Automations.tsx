import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAutomations } from '../api/client'
import { IconArrowLeft, IconPlus } from '../components/Icons'
import type { Automation } from '../types'

export function Automations() {
  const navigate = useNavigate()
  const [automations, setAutomations] = useState<Automation[]>([])

  useEffect(() => {
    getAutomations().then(setAutomations)
  }, [])

  const toggle = (id: string) => {
    setAutomations((list) => list.map((a) => (a.id === id ? { ...a, active: !a.active } : a)))
  }

  return (
    <div className="page">
      <button className="detail-back" onClick={() => navigate('/verwaltung')}>
        <IconArrowLeft size={14} /> Zurück zur Verwaltung
      </button>
      <div className="page-header">
        <div>
          <h1 className="page-title">Automatisierungen</h1>
          <p className="page-subtitle">Regeln aus Auslöser, Bedingung und Aktion. Ausführung ist Backend-Thema für später.</p>
        </div>
        <button className="btn btn-primary">
          <IconPlus size={14} /> Neue Regel
        </button>
      </div>

      {automations.map((a) => (
        <div className="panel" key={a.id} style={{ maxWidth: 720 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div style={{ fontWeight: 700, fontSize: 14 }}>{a.name}</div>
            <button className={'widget-toggle' + (a.active ? ' on' : '')} onClick={() => toggle(a.id)}>
              {a.active ? 'Aktiv' : 'Inaktiv'}
            </button>
          </div>
          <div className="info-row">
            <span className="k">Auslöser</span>
            <span>{a.trigger}</span>
          </div>
          {a.condition && (
            <div className="info-row">
              <span className="k">Bedingung</span>
              <span>{a.condition}</span>
            </div>
          )}
          <div className="info-row">
            <span className="k">Aktion</span>
            <span>{a.action}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
