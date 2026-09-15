import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getRejectionReasons } from '../api/client'
import { IconArrowLeft } from '../components/Icons'
import type { RejectionReason } from '../types'

export function RejectionReasons() {
  const navigate = useNavigate()
  const [reasons, setReasons] = useState<RejectionReason[]>([])

  useEffect(() => {
    getRejectionReasons().then(setReasons)
  }, [])

  return (
    <div className="page">
      <button className="detail-back" onClick={() => navigate('/verwaltung')}>
        <IconArrowLeft size={14} /> Zurück zur Verwaltung
      </button>
      <div className="page-header">
        <div>
          <h1 className="page-title">Absagegründe</h1>
          <p className="page-subtitle">1:1 aus Recruitee übernommen. Jeder Grund kann automatisch eine Absage-Mail auslösen.</p>
        </div>
      </div>

      <div className="panel" style={{ maxWidth: 640 }}>
        {reasons.map((r) => (
          <div className="info-row" key={r.id}>
            <span>{r.name}</span>
            <span style={{ color: r.autoMail ? 'var(--green)' : 'var(--text-faint)', fontSize: 12 }}>
              {r.autoMail ? '⚡ löst Auto-Mail aus' : 'keine Auto-Mail'}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
