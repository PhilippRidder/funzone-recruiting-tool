import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCandidateNotes, getCandidateTasks, getStages } from '../../api/client'
import { IconArrowRight, IconPlus, IconX } from '../../components/Icons'
import { formatRelative } from '../../lib/relativeTime'
import type { Candidate, CandidateEvaluation, CandidateNote, CandidateTask, Job, Stage } from '../../types'

const CURRENT_USER = 'Markus Dünzl'

const SCORE_EMOJI: Record<string, string> = {
  'Klares nein': '👎👎',
  Nein: '👎',
  'Nicht sicher': '🤏',
  Ja: '👍',
  'Klares ja': '👍👍',
}

const initials = (name: string) =>
  name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

const formatDate = (iso: string) => new Date(iso).toLocaleDateString('de-DE', { day: 'numeric', month: 'short', year: 'numeric' })

export function CandidateSidebar({ candidate, job, evaluations }: { candidate: Candidate; job?: Job; evaluations: CandidateEvaluation[] }) {
  const navigate = useNavigate()
  const [tasks, setTasks] = useState<CandidateTask[]>([])
  const [notes, setNotes] = useState<CandidateNote[]>([])
  const [stages, setStages] = useState<Stage[]>([])
  const [stageKey, setStageKey] = useState(candidate.stageKey)
  const [stageOpen, setStageOpen] = useState(false)
  const [showDone, setShowDone] = useState(false)
  const [taskInput, setTaskInput] = useState('')
  const [noteInput, setNoteInput] = useState('')

  useEffect(() => {
    getCandidateTasks(candidate.id).then(setTasks)
    getCandidateNotes(candidate.id).then(setNotes)
    getStages().then(setStages)
    setStageKey(candidate.stageKey)
    setStageOpen(false)
  }, [candidate.id, candidate.stageKey])

  const currentStage = stages.find((s) => s.key === stageKey)
  const advance = () => {
    const sorted = [...stages].sort((a, b) => a.order - b.order)
    const idx = sorted.findIndex((s) => s.key === stageKey)
    if (idx >= 0 && idx < sorted.length - 1) setStageKey(sorted[idx + 1].key)
  }

  const myEvaluation = evaluations.find((e) => e.authorName === CURRENT_USER)
  const openTasks = tasks.filter((t) => !t.done)
  const doneTasks = tasks.filter((t) => t.done)

  const addTask = () => {
    if (!taskInput.trim()) return
    setTasks((t) => [...t, { id: `local-${Date.now()}`, text: taskInput.trim(), done: false }])
    setTaskInput('')
  }

  const addNote = () => {
    if (!noteInput.trim()) return
    setNotes((n) => [{ id: `local-${Date.now()}`, authorName: CURRENT_USER, text: noteInput.trim(), at: new Date().toISOString() }, ...n])
    setNoteInput('')
  }

  return (
    <div>
      <div className="side-top-row">
        <span className={'side-rating-badge' + (myEvaluation ? '' : ' none')}>
          {myEvaluation ? <>Deine Bewertung: {SCORE_EMOJI[myEvaluation.score]}</> : 'Nicht bewertet'}
        </span>
        <button className="btn">
          <IconPlus size={13} /> Zuweisen
        </button>
      </div>

      {job ? (
        <div className="job-mini-card">
          <div className="job-mini-head">
            <span className="job-mini-dot" />
            <span className="job-mini-title" title={job.title}>
              {job.title}
            </span>
            <button title="Zur Stelle" onClick={() => navigate(`/stellen/${job.id}/pipeline`)}>
              ↗
            </button>
            <button title="Weitere Optionen">⋯</button>
          </div>

          <div className="status-pill">
            <button className="status-pill-btn aktiv" onClick={() => setStageOpen((v) => !v)}>
              {currentStage?.name ?? '…'} ▾
            </button>
            {stageOpen && (
              <div className="job-switcher-panel" style={{ width: 220 }}>
                {[...stages]
                  .sort((a, b) => a.order - b.order)
                  .map((s) => (
                    <button
                      key={s.key}
                      className={'job-switcher-item' + (s.key === stageKey ? ' active' : '')}
                      onClick={() => {
                        setStageKey(s.key)
                        setStageOpen(false)
                      }}
                    >
                      {s.name}
                    </button>
                  ))}
              </div>
            )}
          </div>

          <div className="job-mini-meta">
            Zugewiesen {formatDate(candidate.createdAt)} · {job.standort}
          </div>

          <div className="job-mini-actions">
            <button className="btn">
              <IconX size={13} /> Absagen
            </button>
            <button className="btn btn-primary" onClick={advance}>
              <IconArrowRight size={13} /> Fortfahren
            </button>
          </div>
        </div>
      ) : (
        <div className="side-info-box">Diese*r Kandidat*in wurde keinen Jobs zugewiesen.</div>
      )}

      <div className="panel">
        <div className="panel-head">
          <span className="panel-head-title">Aufgaben</span>
        </div>
        <input
          className="side-input"
          placeholder="Aufgabe hinzufügen …"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
        />
        {openTasks.map((t) => (
          <div className="info-row" key={t.id}>
            <span>{t.text}</span>
          </div>
        ))}
        {doneTasks.length > 0 && (
          <button className="side-link-btn" onClick={() => setShowDone((v) => !v)}>
            {showDone ? 'Abgeschlossene Aufgaben ausblenden' : `Abgeschlossene Aufgaben anzeigen (${doneTasks.length})`}
          </button>
        )}
        {showDone &&
          doneTasks.map((t) => (
            <div className="info-row" key={t.id} style={{ color: 'var(--text-faint)', textDecoration: 'line-through' }}>
              <span>{t.text}</span>
            </div>
          ))}
      </div>

      <div className="panel">
        <div className="panel-head">
          <span className="panel-head-title">Notizen</span>
        </div>
        <input
          className="side-input"
          placeholder="Füge eine Notiz hinzu…"
          value={noteInput}
          onChange={(e) => setNoteInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addNote()}
        />
        {notes.map((n) => (
          <div className="note-item" key={n.id}>
            <div className="note-avatar">{initials(n.authorName)}</div>
            <div className="note-body">
              <div className="note-head">
                <span>{n.authorName}</span>
                <span className="note-time">{formatRelative(n.at)}</span>
              </div>
              <div className="note-text">{n.text}</div>
              <div className="note-actions">
                <button>👍</button>
                <button>😊</button>
                <button>Antworten</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
