import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getCandidate, getCandidateEvaluations, getCandidateEvents, getCandidateFiles, getCandidateMessages, getCandidates, getJob } from '../../api/client'
import { IconArrowLeft, IconArrowRight, IconCalendar, IconPencil, IconX } from '../../components/Icons'
import { PlaceholderTab } from '../jobEditor/tabs/PlaceholderTab'
import { CandidateSidebar } from './CandidateSidebar'
import { ActivityTab } from './tabs/ActivityTab'
import { EvaluationTab } from './tabs/EvaluationTab'
import { EventsTab } from './tabs/EventsTab'
import { FilesTab } from './tabs/FilesTab'
import { MessagesTab } from './tabs/MessagesTab'
import { OverviewTab } from './tabs/OverviewTab'
import type { Candidate, CandidateEvaluation, CandidateEvent, CandidateFile, CandidateMessage, CandidateStatus, Job } from '../../types'

type Tab = 'ueberblick' | 'nachrichten' | 'ereignisse' | 'bewertung' | 'datei' | 'aktivitaet' | 'whatsapp'

const STATUSES: CandidateStatus[] = ['Aktiv', 'Abgelaufen', 'Eingestellt', 'Abgesagt']

const initials = (name: string) =>
  name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

export function CandidateModal() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [candidate, setCandidate] = useState<Candidate | undefined>()
  const [job, setJob] = useState<Job | undefined>()
  const [siblingIds, setSiblingIds] = useState<string[]>([])
  const [messages, setMessages] = useState<CandidateMessage[]>([])
  const [events, setEvents] = useState<CandidateEvent[]>([])
  const [evaluations, setEvaluations] = useState<CandidateEvaluation[]>([])
  const [files, setFiles] = useState<CandidateFile[]>([])
  const [tab, setTab] = useState<Tab>('ueberblick')
  const [status, setStatus] = useState<CandidateStatus>('Aktiv')
  const [statusOpen, setStatusOpen] = useState(false)
  const [following, setFollowing] = useState(false)

  const close = () => navigate(-1)

  useEffect(() => {
    if (!id) return
    getCandidate(id).then((c) => {
      setCandidate(c)
      if (c) setStatus(c.status)
    })
    getCandidateMessages(id).then(setMessages)
    getCandidateEvents(id).then(setEvents)
    getCandidateEvaluations(id).then(setEvaluations)
    getCandidateFiles(id).then(setFiles)
    setTab('ueberblick')
    setStatusOpen(false)
    setFollowing(false)
  }, [id])

  useEffect(() => {
    if (!candidate) return
    getJob(candidate.jobId).then(setJob)
    getCandidates(candidate.jobId).then((list) => setSiblingIds(list.map((c) => c.id)))
  }, [candidate])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!id) return null

  const index = siblingIds.indexOf(id)
  const prevId = index > 0 ? siblingIds[index - 1] : undefined
  const nextId = index >= 0 && index < siblingIds.length - 1 ? siblingIds[index + 1] : undefined

  const goTo = (targetId?: string) => {
    if (!targetId) return
    navigate(`/kandidaten/${targetId}`, { replace: true, state: location.state })
  }

  return (
    <div className="modal-overlay candidate-modal-overlay" onClick={(e) => e.target === e.currentTarget && close()}>
      <div className="candidate-modal-rail">
        <button onClick={close} title="Schließen (Esc)">
          <IconX size={18} />
        </button>
        <button onClick={() => goTo(nextId)} disabled={!nextId} title="Nächste*r Kandidat*in">
          <IconArrowRight size={18} />
        </button>
        <button onClick={() => goTo(prevId)} disabled={!prevId} title="Vorherige*r Kandidat*in">
          <IconArrowLeft size={18} />
        </button>
      </div>

      <div className="candidate-modal-panel" onClick={(e) => e.stopPropagation()}>
        {!candidate ? (
          <div className="stat-card-desc">Lade…</div>
        ) : (
          <>
            <div className="cand-header">
              <div className="cand-header-left">
                <div className="cand-avatar">{initials(candidate.name)}</div>
                <div className="cand-name-col">
                  <div className="cand-name-row">
                    {candidate.name}
                    <button title="Namen bearbeiten">
                      <IconPencil size={14} />
                    </button>
                  </div>
                  <div className="status-pill">
                    <button className={'status-pill-btn ' + status.toLowerCase()} onClick={() => setStatusOpen((v) => !v)}>
                      <span className="status-dot-sm" /> {status} ▾
                    </button>
                    {statusOpen && (
                      <div className="job-switcher-panel" style={{ width: 180 }}>
                        {STATUSES.map((s) => (
                          <button
                            key={s}
                            className={'job-switcher-item' + (s === status ? ' active' : '')}
                            onClick={() => {
                              setStatus(s)
                              setStatusOpen(false)
                            }}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="pipe-actions">
                <button className="btn">
                  <IconCalendar size={14} /> Einplanen
                </button>
                <button className="btn">⇗ Teilen</button>
                <button className="btn" style={following ? { color: 'var(--green)', borderColor: 'var(--green)' } : {}} onClick={() => setFollowing((v) => !v)}>
                  {following ? '🚩 Gefolgt' : 'Folgen'}
                </button>
                <button className="pipe-icon-btn" title="Weitere Optionen">
                  ⋯
                </button>
              </div>
            </div>

            <div className="tabbar cand-tabbar">
              <button className={'tabbar-item' + (tab === 'ueberblick' ? ' active' : '')} onClick={() => setTab('ueberblick')}>
                Überblick
              </button>
              <button className={'tabbar-item' + (tab === 'nachrichten' ? ' active' : '')} onClick={() => setTab('nachrichten')}>
                Nachrichten <span className="count">{messages.length}</span>
              </button>
              <button className={'tabbar-item' + (tab === 'ereignisse' ? ' active' : '')} onClick={() => setTab('ereignisse')}>
                Ereignisse <span className="count">{events.length}</span>
              </button>
              <button className={'tabbar-item' + (tab === 'bewertung' ? ' active' : '')} onClick={() => setTab('bewertung')}>
                Bewertung <span className="count">{evaluations.length}</span>
              </button>
              <button className={'tabbar-item' + (tab === 'datei' ? ' active' : '')} onClick={() => setTab('datei')}>
                Datei <span className="count">{files.length}</span>
              </button>
              <button className={'tabbar-item' + (tab === 'aktivitaet' ? ' active' : '')} onClick={() => setTab('aktivitaet')}>
                Aktivität
              </button>
              <button className={'tabbar-item' + (tab === 'whatsapp' ? ' active' : '')} onClick={() => setTab('whatsapp')}>
                WhatsApp
              </button>
            </div>

            <div className="cand-layout">
              <div key={candidate.id}>
                {tab === 'ueberblick' && <OverviewTab candidate={candidate} />}
                {tab === 'nachrichten' && <MessagesTab messages={messages} />}
                {tab === 'ereignisse' && <EventsTab events={events} candidateName={candidate.name} />}
                {tab === 'bewertung' && <EvaluationTab evaluations={evaluations} />}
                {tab === 'datei' && <FilesTab files={files} />}
                {tab === 'aktivitaet' && <ActivityTab candidateId={candidate.id} />}
                {tab === 'whatsapp' && <PlaceholderTab title="WhatsApp" />}
              </div>

              <CandidateSidebar candidate={candidate} job={job} evaluations={evaluations} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
