import { useState } from 'react'
import { IconArrowDown, IconClipboard, IconMail, IconStar, IconTrash } from './Icons'
import type { TemplateStage } from '../lib/pipelineTemplates'

type ActionType = 'none' | 'note' | 'email' | 'task' | 'evaluation'

const ACTION_LABELS: Record<Exclude<ActionType, 'none'>, string> = {
  note: 'Eine Notiz hinzufügen',
  email: 'Eine E-Mail senden',
  task: 'Eine Aufgabe hinzufügen',
  evaluation: 'Eine Bewertung anfragen',
}

export function AutomationEditorModal({
  stage,
  isNew,
  onClose,
  onSave,
  onDelete,
}: {
  stage: TemplateStage
  isNew: boolean
  onClose: () => void
  onSave: () => void
  onDelete: () => void
}) {
  const [actionType, setActionType] = useState<ActionType>(isNew ? 'none' : 'email')
  const [subject, setSubject] = useState(`[job_offer] – Einladung zum Kennenlerngespräch bei FunZone Erlebniswelten`)
  const [body, setBody] = useState(
    `Hallo {{candidate.first}},\n\nvielen Dank für deine Bewerbung.\n\nGerne würde ich dich persönlich kennenlernen und lade dich deshalb zu einem ersten Gespräch bei uns ein.\n\nViele Grüße`,
  )

  const summary =
    actionType === 'none'
      ? `Wenn ein*e Kandidat*in in die Phase ${stage.name} verschoben wird, passiert noch nichts – wähle eine Aktion.`
      : `Wenn ein*e Kandidat*in in die Phase ${stage.name} verschoben wird, dann ${ACTION_LABELS[actionType]}.`

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2>
              Automatisierung bearbeiten
              {isNew && <span className="tag">NEU</span>}
            </h2>
            <p>Nimm Änderungen an der Funktionsweise dieser Automatisierung vor.</p>
          </div>
          <div className="modal-header-actions">
            <button className="action-pill link">Feedback teilen</button>
            <button className="btn btn-primary" onClick={onSave}>
              Änderungen speichern
            </button>
            <button className="btn" onClick={onDelete}>
              <IconTrash size={13} /> Löschen
            </button>
            <button className="modal-close" onClick={onClose}>
              ×
            </button>
          </div>
        </div>

        <div className="modal-body">
          <div className="trigger-tag">Wenn das passiert</div>
          <div className="panel">
            <div className="form-row">
              <div className="form-field">
                <label>Starten, wenn</label>
                <select defaultValue="verschoben">
                  <option value="verschoben">Kandidat*in wurde verschoben</option>
                </select>
              </div>
              <div className="form-field">
                <label>Phase</label>
                <select defaultValue={stage.id}>
                  <option value={stage.id}>{stage.name}</option>
                </select>
              </div>
            </div>
            <button className="action-pill link" style={{ padding: '4px 0' }}>
              ⓘ Bedingung hinzufügen
            </button>
          </div>

          <div className="modal-arrow">
            <IconArrowDown size={18} />
          </div>

          <div className="trigger-tag" style={{ background: 'var(--bg-card-hover)', color: 'var(--text-muted)' }}>
            Dann führe dies aus …
          </div>

          {actionType === 'none' ? (
            <div className="panel">
              <p className="stat-card-desc" style={{ marginTop: -4 }}>Wähle eine auszuführende Aktion</p>
              <div className="action-picker">
                <button className="action-pill" onClick={() => setActionType('note')}>
                  <IconClipboard size={14} /> Eine Notiz hinzufügen
                </button>
                <button className="action-pill" onClick={() => setActionType('email')}>
                  <IconMail size={14} /> Eine E-Mail senden
                </button>
                <button className="action-pill" onClick={() => setActionType('task')}>
                  <IconClipboard size={14} /> Eine Aufgabe hinzufügen
                </button>
                <button className="action-pill" onClick={() => setActionType('evaluation')}>
                  <IconStar size={14} /> Eine Bewertung anfragen
                </button>
              </div>
            </div>
          ) : (
            <div className="panel">
              <div className="action-card-head">
                <span className="title">
                  {actionType === 'email' && <IconMail size={15} />}
                  {actionType === 'note' && <IconClipboard size={15} />}
                  {actionType === 'task' && <IconClipboard size={15} />}
                  {actionType === 'evaluation' && <IconStar size={15} />}
                  {ACTION_LABELS[actionType]}
                </span>
                <button className="modal-close" onClick={() => setActionType('none')}>
                  ×
                </button>
              </div>

              {actionType === 'email' && (
                <>
                  <div className="form-row">
                    <div className="form-field">
                      <label>An</label>
                      <div className="chip-row">
                        <span className="chip">
                          Kandidat*in <button>×</button>
                        </span>
                      </div>
                    </div>
                    <div className="form-field">
                      <label>Von</label>
                      <select defaultValue="owner">
                        <option value="owner">Durchführende*r Nutzer*in</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-field full">
                    <label>Betreff</label>
                    <input value={subject} onChange={(e) => setSubject(e.target.value)} />
                  </div>
                  <div className="editor-toolbar-row">B · I · U · Aa · 🔗 · ⌗ · 🖼</div>
                  <div className="form-field full">
                    <textarea rows={8} value={body} onChange={(e) => setBody(e.target.value)} />
                  </div>
                  <label className="checkbox-row">
                    <input type="checkbox" defaultChecked /> Signatur des Absenders einfügen
                  </label>
                  <div className="chip-row" style={{ marginTop: 8 }}>
                    <span className="tag">Kandidat*in</span>
                    <span className="tag">[job_offer]</span>
                    <span className="tag">[company]</span>
                    <span className="tag">… Mehr</span>
                  </div>
                </>
              )}

              {actionType === 'note' && (
                <div className="form-field full">
                  <label>Notiz-Text</label>
                  <textarea rows={4} defaultValue="Automatisch erstellte Notiz beim Phasenwechsel." />
                </div>
              )}

              {actionType === 'task' && (
                <div className="form-row">
                  <div className="form-field full">
                    <label>Betreff der Aufgabe</label>
                    <input defaultValue="Kandidat*in kontaktieren" />
                  </div>
                  <div className="form-field">
                    <label>Fällig</label>
                    <input placeholder="z. B. in 2 Tagen" />
                  </div>
                </div>
              )}

              {actionType === 'evaluation' && (
                <div className="form-field">
                  <label>Bewertung anfragen bei</label>
                  <select defaultValue="team">
                    <option value="team">Recruiting-Team dieser Stelle</option>
                  </select>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="modal-footer">
          <IconClipboard size={12} /> {summary}
        </div>
      </div>
    </div>
  )
}
