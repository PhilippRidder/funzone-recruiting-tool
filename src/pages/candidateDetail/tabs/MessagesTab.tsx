import { IconPaperclip, IconPlus, IconReply } from '../../../components/Icons'
import { formatLongRelative } from '../../../lib/relativeTime'
import type { CandidateMessage } from '../../../types'

const initials = (name: string) =>
  name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

export function MessagesTab({ messages }: { messages: CandidateMessage[] }) {
  const outgoing = messages.filter((m) => m.direction === 'out').length
  const incoming = messages.filter((m) => m.direction === 'in').length

  return (
    <>
      <div className="panel-head" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontWeight: 700 }}>E-Mail</span>
          <span style={{ color: 'var(--text-faint)', fontSize: 12.5 }}>↗ {outgoing}</span>
          <span style={{ color: 'var(--text-faint)', fontSize: 12.5 }}>↙ {incoming}</span>
        </div>
        <button className="btn btn-primary">
          <IconPlus size={13} /> Neue E-Mail
        </button>
      </div>

      {messages.length === 0 && <div className="stat-card-desc">Noch keine E-Mails.</div>}

      {messages.map((m) => (
        <div className="msg-card" key={m.id}>
          {m.subject && <div className="msg-subject">{m.subject}</div>}
          <div className="msg-head">
            <div className="msg-from">
              <div className="note-avatar">{initials(m.fromName)}</div>
              {m.fromName}
              <span className="msg-to">To: {m.toLabel}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span className="msg-time">{formatLongRelative(m.at)}</span>
              <IconReply size={13} />
            </div>
          </div>
          <div className="msg-body">{m.body}</div>
          {m.attachment && (
            <div className="msg-attachment">
              <IconPaperclip size={14} /> {m.attachment}
            </div>
          )}
        </div>
      ))}
    </>
  )
}
