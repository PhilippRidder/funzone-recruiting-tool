export type StageKey =
  | 'sourced'
  | 'applied'
  | 'in-review'
  | 'interview-team'
  | 'sent-to-location'
  | 'trial-work'
  | 'interview-management'
  | 'offer'
  | 'hired'

export interface Stage {
  key: StageKey
  name: string
  order: number
}

export interface Job {
  id: string
  title: string
  standort: string
  employmentType: string
  open: boolean
  qualifiziert: number
  neu: number
  ueberfaellig: number
  salaryRange?: string
}

export type CandidateStatus = 'Aktiv' | 'Abgelaufen' | 'Eingestellt' | 'Abgesagt'

export type ScreeningCriterionType = 'fuehrerschein' | 'skill' | 'language' | 'weekendWork' | 'availability'

export interface ScreeningCriterion {
  id: string
  label: string
  type: ScreeningCriterionType
  pflicht: boolean
  // je nach Typ:
  skillKeyword?: string // 'skill'
  languageName?: string // 'language'
  languageMinLevel?: string // 'language'
  availableWithinDays?: number // 'availability'
}

export interface Candidate {
  id: string
  name: string
  email: string
  phone: string
  jobId: string
  stageKey: StageKey
  inStageSince: string // ISO date
  source: string
  overdue: boolean
  rating?: number // 0-5
  fuehrerschein?: boolean
  verfuegbarAb?: string
  status: CandidateStatus
  tags: string[]
  createdAt: string // ISO date
  birthDate?: string
  salaryExpectation?: string
  address?: string
  skills: string[]
  weekendWork?: 'Ja' | 'Nein'
  languages: { name: string; level: string }[]
  cvFileName?: string
}

export interface CandidateMessage {
  id: string
  direction: 'out' | 'in'
  fromName: string
  toLabel: string
  subject?: string
  body: string
  at: string
  attachment?: string
}

export interface CandidateEvent {
  id: string
  date: string // ISO date
  time: string
  endTime: string
  title: string
  jobTitle: string
  past: boolean
  confirmed: boolean
  withName: string
}

export type EvalScore = 'Klares nein' | 'Nein' | 'Nicht sicher' | 'Ja' | 'Klares ja'

export interface CandidateEvaluation {
  id: string
  authorName: string
  score: EvalScore
  scorePercent: number
  at: string
}

export interface CandidateNote {
  id: string
  authorName: string
  text: string
  at: string
}

export interface CandidateTask {
  id: string
  text: string
  done: boolean
}

export interface CandidateFile {
  id: string
  name: string
}

export interface CandidateActivity {
  id: string
  at: string
  actor: string
  text: string
  automated?: boolean
  preview?: string
}

export interface DashboardStats {
  offeneBewerbungen: number
  ueberfaelligeBewerber: number
  anstehendeInterviews: number
  neueBewerbungenHeute: number
  offeneStellen: number
}

export interface RejectionReason {
  id: string
  name: string
  autoMail: boolean
}

export interface TalentPoolEntry {
  id: string
  name: string
  email: string
  tags: string[]
  note: string
}

export interface Appointment {
  id: string
  date: string // ISO date
  time: string
  endTime: string
  title: string
  jobTitle: string
  candidateName: string
  channel: 'Teams' | 'Vor Ort'
}

export interface OverdueCandidate extends Candidate {
  jobTitle: string
  jobStandort: string
  daysOverdue: number
}

export interface Automation {
  id: string
  name: string
  active: boolean
  trigger: string
  condition?: string
  action: string
}
