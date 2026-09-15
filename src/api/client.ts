// Tausch-Punkt zur echten Management-Tool-API (gleiches Muster wie im CRM-Repo:
// src/api/client.ts). Solange nur die Frontend-Ansicht entsteht, ist dies ein
// Platzhalter mit identischen Funktionssignaturen wie client.mock.ts – die
// eigentliche Anbindung (fetch gegen /api/v1/recruiting/…) ist ein späterer,
// separater Schritt.
import type {
  Appointment,
  Automation,
  Candidate,
  CandidateActivity,
  CandidateEvaluation,
  CandidateEvent,
  CandidateFile,
  CandidateMessage,
  CandidateNote,
  CandidateTask,
  DashboardStats,
  Job,
  OverdueCandidate,
  RejectionReason,
  Stage,
  TalentPoolEntry,
} from '../types'

const notImplemented = (): never => {
  throw new Error('Backend-Anbindung noch nicht implementiert – Recruiting-Tool läuft aktuell nur mit Mock-Daten (Demo-Modus).')
}

export async function getDashboardStats(): Promise<DashboardStats> {
  return notImplemented()
}

export async function getJobs(): Promise<Job[]> {
  return notImplemented()
}

export async function getStages(): Promise<Stage[]> {
  return notImplemented()
}

export async function getCandidates(_jobId: string): Promise<Candidate[]> {
  return notImplemented()
}

export async function getCandidate(_id: string): Promise<Candidate | undefined> {
  return notImplemented()
}

export async function getCandidateMessages(_id: string): Promise<CandidateMessage[]> {
  return notImplemented()
}

export async function getCandidateEvents(_id: string): Promise<CandidateEvent[]> {
  return notImplemented()
}

export async function getCandidateEvaluations(_id: string): Promise<CandidateEvaluation[]> {
  return notImplemented()
}

export async function getCandidateNotes(_id: string): Promise<CandidateNote[]> {
  return notImplemented()
}

export async function getCandidateTasks(_id: string): Promise<CandidateTask[]> {
  return notImplemented()
}

export async function getCandidateFiles(_id: string): Promise<CandidateFile[]> {
  return notImplemented()
}

export async function getCandidateActivity(_id: string): Promise<CandidateActivity[]> {
  return notImplemented()
}

export async function getJob(_id: string): Promise<Job | undefined> {
  return notImplemented()
}

export async function getRejectionReasons(): Promise<RejectionReason[]> {
  return notImplemented()
}

export async function getTalentPool(): Promise<TalentPoolEntry[]> {
  return notImplemented()
}

export async function getAutomations(): Promise<Automation[]> {
  return notImplemented()
}

export async function getUpcomingAppointments(): Promise<Appointment[]> {
  return notImplemented()
}

export async function getOverdueCandidates(): Promise<OverdueCandidate[]> {
  return notImplemented()
}
