import { useState } from 'react'
import { IconPlus, IconUsers } from '../../../components/Icons'
import { formatLongRelative } from '../../../lib/relativeTime'
import type { CandidateEvaluation, EvalScore } from '../../../types'

const SCORES: EvalScore[] = ['Klares nein', 'Nein', 'Nicht sicher', 'Ja', 'Klares ja']
const SCORE_ICON: Record<EvalScore, string> = {
  'Klares nein': '👎👎',
  Nein: '👎',
  'Nicht sicher': '🤏',
  Ja: '👍',
  'Klares ja': '👍👍',
}

function Donut({ percent }: { percent: number }) {
  const size = 84
  const stroke = 9
  const r = (size - stroke) / 2
  const circumference = 2 * Math.PI * r
  const filled = (percent / 100) * circumference
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--bg-input)" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="var(--orange)"
        strokeWidth={stroke}
        strokeDasharray={`${filled} ${circumference - filled}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text x="50%" y="46%" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text)">
        {percent}%
      </text>
      <text x="50%" y="64%" textAnchor="middle" fontSize="9" fill="var(--text-faint)">
        Punktzahl
      </text>
    </svg>
  )
}

export function EvaluationTab({ evaluations }: { evaluations: CandidateEvaluation[] }) {
  const [tab, setTab] = useState<'abgeschlossen' | 'ausstehend'>('abgeschlossen')
  const [split, setSplit] = useState<'frage' | 'teammitglied'>('frage')

  const avgPercent = evaluations.length ? Math.round(evaluations.reduce((sum, e) => sum + e.scorePercent, 0) / evaluations.length) : 0
  const lastAt = evaluations[0]?.at
  const authors = new Set(evaluations.map((e) => e.authorName))

  const counts = SCORES.map((s) => evaluations.filter((e) => e.score === s).length)
  const axisMax = Math.max(2, ...counts)
  const ticks = [0, Math.round(axisMax / 2), axisMax]

  return (
    <>
      <div className="pipe-toolbar" style={{ margin: '0 0 14px' }}>
        <button className={'toolbar-pill' + (tab === 'abgeschlossen' ? ' active' : '')} onClick={() => setTab('abgeschlossen')}>
          Abgeschlossen <span className="count" style={{ marginLeft: 4 }}>{evaluations.length}</span>
        </button>
        <button className={'toolbar-pill' + (tab === 'ausstehend' ? ' active' : '')} onClick={() => setTab('ausstehend')}>
          Ausstehend <span className="count" style={{ marginLeft: 4 }}>0</span>
        </button>
        <div className="pipe-toolbar-spacer" />
        <button className="btn">
          <IconUsers size={13} /> Bewertung anfragen
        </button>
        <button className="btn btn-primary" style={{ background: '#8b5cf6', borderColor: '#8b5cf6' }}>
          <IconPlus size={13} /> Bewerten
        </button>
      </div>

      {tab === 'ausstehend' ? (
        <div className="stat-card-desc">Keine ausstehenden Bewertungsanfragen.</div>
      ) : evaluations.length === 0 ? (
        <div className="stat-card-desc">Noch keine Bewertung hinzugefügt.</div>
      ) : (
        <>
          <div className="panel">
            <div className="panel-head">
              <span className="panel-head-title">Zusammenfassung</span>
            </div>
            <div className="eval-summary-row">
              <div className="eval-summary-text">
                <div className="cal-avatar owner">MD</div>
                <div>
                  <p className="stat-card-desc">
                    {evaluations.length} Bewertung{evaluations.length === 1 ? '' : 'en'} hinzugefügt
                  </p>
                  <p className="stat-card-desc">
                    {authors.size} Teammitglied{authors.size === 1 ? ' hat' : 'er haben'} diese*n Kandidat*in bewertet
                  </p>
                  {lastAt && <p className="stat-card-desc">Zuletzt bewertet {formatLongRelative(lastAt)}</p>}
                </div>
              </div>
              <Donut percent={avgPercent} />
            </div>
          </div>

          <div className="panel">
            <div className="panel-head">
              <span className="panel-head-title">Ergebnisse aus Einstellung</span>
              <div className="tabbar" style={{ padding: 0, marginBottom: 0 }}>
                <button className={'tabbar-item' + (split === 'frage' ? ' active' : '')} onClick={() => setSplit('frage')}>
                  Nach Frage
                </button>
                <button className={'tabbar-item' + (split === 'teammitglied' ? ' active' : '')} onClick={() => setSplit('teammitglied')}>
                  Nach Teammitglied
                </button>
              </div>
            </div>
            <div className="stat-card-desc" style={{ marginTop: -4 }}>
              Bewertungsergebnis · Durchschnittlicher Score: {avgPercent}%
            </div>
            {SCORES.map((s, i) => (
              <div className="eval-bar-row" key={s}>
                <span className="eval-bar-label">
                  {s} {SCORE_ICON[s]}
                </span>
                <div className="eval-bar-track">
                  <div className="eval-bar-fill" style={{ width: `${(counts[i] / axisMax) * 100}%` }} />
                </div>
                <span className="eval-bar-count">{counts[i]}</span>
              </div>
            ))}
            <div className="eval-axis">
              <span />
              <div className="eval-axis-ticks">
                {ticks.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <span />
            </div>
          </div>
        </>
      )}
    </>
  )
}
