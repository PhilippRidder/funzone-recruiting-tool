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

export const STAGES: Stage[] = [
  { key: 'sourced', name: 'Gesourct', order: 0 },
  { key: 'applied', name: 'Beworben', order: 1 },
  { key: 'in-review', name: 'In Bearbeitung', order: 2 },
  { key: 'interview-team', name: 'Erstgespräch Team', order: 3 },
  { key: 'sent-to-location', name: 'An Standort gesendet', order: 4 },
  { key: 'trial-work', name: 'Probearbeiten + Bewertung', order: 5 },
  { key: 'interview-management', name: 'Drittgespräch Geschäftsführung', order: 6 },
  { key: 'offer', name: 'Angebot', order: 7 },
  { key: 'hired', name: 'Eingestellt', order: 8 },
]

export const REJECTION_REASONS: RejectionReason[] = [
  { id: 'r1', name: 'Bewerber passt nicht', autoMail: true },
  { id: 'r2', name: 'Keine Rückmeldung seitens des Bewerbers', autoMail: true },
  { id: 'r3', name: 'zu hohe Gehaltsvorstellungen', autoMail: true },
  { id: 'r4', name: 'Nicht erschienen', autoMail: true },
  { id: 'r5', name: 'Kandidat unter 18 Jahren', autoMail: true },
  { id: 'r6', name: 'Keine Kontaktdaten vorhanden', autoMail: true },
  { id: 'r7', name: 'Kandidat hat sich für einen anderen Job entschieden', autoMail: true },
  { id: 'r8', name: 'Für einen anderen Bewerber entschieden', autoMail: true },
  { id: 'r9', name: 'Kandidat hat sich anders entschieden', autoMail: true },
  { id: 'r10', name: 'doppelt beworben', autoMail: true },
  { id: 'r11', name: 'Absage ohne Absage E-Mail', autoMail: false },
  { id: 'r12', name: 'Kündigung', autoMail: false },
]

const JOBS: Job[] = [
  { id: 'j1', title: 'Stellv. Filialleiter Freizeitbranche Vollzeit (m/w/d)', standort: 'Augsburg', employmentType: 'Vollzeit', open: true, qualifiziert: 4, neu: 3, ueberfaellig: 0, salaryRange: '33.000 € – 38.000 € pro Jahr' },
  { id: 'j2', title: 'Servicemitarbeiter Freizeitbranche 603 Euro (m/w/d)', standort: 'Hamburg', employmentType: 'Minijob', open: true, qualifiziert: 8, neu: 0, ueberfaellig: 0, salaryRange: '603 € pro Monat' },
  { id: 'j3', title: 'Servicemitarbeiter Freizeitbranche Werkstudent (m/w/d)', standort: 'Köln', employmentType: 'Werkstudent', open: true, qualifiziert: 10, neu: 2, ueberfaellig: 0, salaryRange: 'nach Vereinbarung' },
  { id: 'j4', title: 'IT-Support/IT-Helpdesk, First(1st) Level (m/w/d)', standort: 'Düsseldorf – Verwaltung', employmentType: 'Vollzeit', open: true, qualifiziert: 2, neu: 0, ueberfaellig: 1, salaryRange: 'nach Vereinbarung' },
  { id: 'j5', title: 'Servicemitarbeiter Freizeitbranche Teilzeit (m/w/d)', standort: 'Mainz', employmentType: 'Teilzeit', open: true, qualifiziert: 15, neu: 0, ueberfaellig: 0, salaryRange: 'nach Vereinbarung' },
]

const daysAgo = (n: number) => {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toISOString().slice(0, 10)
}

// Montag der aktuellen Woche, als Basis für die Kalender-Mockdaten.
const startOfWeek = () => {
  const d = new Date()
  const day = d.getDay() || 7
  d.setDate(d.getDate() - day + 1)
  return d
}

const weekDate = (offset: number) => {
  const d = startOfWeek()
  d.setDate(d.getDate() + offset)
  return d.toISOString().slice(0, 10)
}

const CANDIDATES: Candidate[] = [
  { id: 'c1', name: 'Anna Berger', email: 'anna.berger@example.com', phone: '+49 151 00000001', jobId: 'j1', stageKey: 'applied', inStageSince: daysAgo(2), source: 'Indeed', overdue: false, rating: 4, fuehrerschein: true, verfuegbarAb: daysAgo(-14), status: 'Aktiv', tags: ['Indeed'], createdAt: daysAgo(2), birthDate: '1997-03-11', salaryExpectation: '34.000 € / Jahr', address: 'Musterstraße 4, 86150 Augsburg', skills: ['Verkauf', 'Kundenservice'], weekendWork: 'Ja', languages: [{ name: 'Deutsch', level: 'Muttersprache' }] },
  { id: 'c2', name: 'Jonas Fischer', email: 'jonas.fischer@example.com', phone: '+49 151 00000002', jobId: 'j1', stageKey: 'applied', inStageSince: daysAgo(1), source: 'StepStone', overdue: false, rating: 3, fuehrerschein: false, verfuegbarAb: daysAgo(-30), status: 'Aktiv', tags: ['StepStone'], createdAt: daysAgo(1), skills: ['Teamarbeit'], weekendWork: 'Ja', languages: [{ name: 'Deutsch', level: 'Muttersprache' }] },
  { id: 'c3', name: 'Lea Hoffmann', email: 'lea.hoffmann@example.com', phone: '+49 151 00000003', jobId: 'j1', stageKey: 'in-review', inStageSince: daysAgo(6), source: 'Indeed', overdue: false, rating: 4, fuehrerschein: true, verfuegbarAb: daysAgo(0), status: 'Aktiv', tags: ['Indeed'], createdAt: daysAgo(6), skills: ['Verwaltung'], weekendWork: 'Nein', languages: [{ name: 'Deutsch', level: 'Muttersprache' }, { name: 'Englisch', level: 'Fortgeschritten' }] },
  { id: 'c4', name: 'Tim Wagner', email: 'tim.wagner@example.com', phone: '+49 151 00000004', jobId: 'j4', stageKey: 'interview-team', inStageSince: daysAgo(20), source: 'Empfehlung', overdue: true, rating: 5, fuehrerschein: true, verfuegbarAb: daysAgo(0), status: 'Abgelaufen', tags: ['Empfehlung'], createdAt: daysAgo(37), birthDate: '1998-06-07', salaryExpectation: '38.000 € / Jahr', address: 'Antoniustraße 8, 47877 Willich', skills: ['IT-Support', 'Netzwerktechnik', 'Windows-Server', 'Active Directory', 'Ticketsysteme'], weekendWork: 'Nein', languages: [{ name: 'Deutsch', level: 'Muttersprache' }, { name: 'Englisch', level: 'Fortgeschritten' }] },
  { id: 'c5', name: 'Sara Klein', email: 'sara.klein@example.com', phone: '+49 151 00000005', jobId: 'j4', stageKey: 'trial-work', inStageSince: daysAgo(4), source: 'kostenlose Portale', overdue: false, rating: 3, fuehrerschein: false, verfuegbarAb: daysAgo(-7), status: 'Aktiv', tags: ['kostenlose Portale'], createdAt: daysAgo(4), skills: ['IT-Support'], weekendWork: 'Nein', languages: [{ name: 'Deutsch', level: 'Muttersprache' }] },
  { id: 'c6', name: 'Max Neumann', email: 'max.neumann@example.com', phone: '+49 151 00000006', jobId: 'j2', stageKey: 'offer', inStageSince: daysAgo(3), source: 'Indeed', overdue: false, rating: 5, fuehrerschein: true, verfuegbarAb: daysAgo(0), status: 'Aktiv', tags: ['Indeed'], createdAt: daysAgo(3), skills: ['Service'], weekendWork: 'Ja', languages: [{ name: 'Deutsch', level: 'Muttersprache' }] },
  { id: 'c7', name: 'Nina Schröder', email: 'nina.schroeder@example.com', phone: '+49 151 00000007', jobId: 'j3', stageKey: 'sourced', inStageSince: daysAgo(1), source: 'Initiativ', overdue: false, rating: 2, fuehrerschein: false, verfuegbarAb: daysAgo(-21), status: 'Aktiv', tags: ['Initiativbewerbung'], createdAt: daysAgo(1), skills: ['Eventmanagement'], weekendWork: 'Ja', languages: [{ name: 'Deutsch', level: 'Muttersprache' }] },
  { id: 'c8', name: 'Paul Weber', email: 'paul.weber@example.com', phone: '+49 151 00000008', jobId: 'j2', stageKey: 'hired', inStageSince: daysAgo(31), source: 'Indeed', overdue: false, rating: 5, fuehrerschein: true, verfuegbarAb: daysAgo(0), status: 'Eingestellt', tags: ['Indeed'], createdAt: daysAgo(60), skills: ['Service', 'Kasse'], weekendWork: 'Ja', languages: [{ name: 'Deutsch', level: 'Muttersprache' }] },
]

const MESSAGES: Record<string, CandidateMessage[]> = {
  c4: [
    {
      id: 'm1',
      direction: 'out',
      fromName: 'Markus Dünzl',
      toLabel: 'Tim Wagner',
      subject: 'IT-Support/IT-Helpdesk (m/w/d) – Einladung zum Kennenlerngespräch bei FunZone',
      body: 'Hallo Tim,\n\nvielen Dank für deine Bewerbung.\n\nGerne würde ich dich persönlich kennenlernen und lade dich deshalb zu einem ersten Gespräch bei uns vor Ort ein.\n\nÜber folgenden Link kannst du dir einen passenden Termin auswählen und diesen direkt buchen.\n\nDas Gespräch findet bei uns vor Ort statt und dauert etwa 15 Minuten.\n\nViele Grüße\nMARKUS DÜNZL\nRecruiter | FunZone-Gruppe',
      at: daysAgo(20),
    },
    {
      id: 'm2',
      direction: 'in',
      fromName: 'Tim Wagner',
      toLabel: 'Markus Dünzl',
      subject: 'Re: IT-Support/IT-Helpdesk (m/w/d) – Einladung zum Kennenlerngespräch bei FunZone',
      body: 'Hallo Herr Dünzl,\n\nvielen Dank für die Einladung, ich habe mir bereits einen Termin gebucht und freue mich auf das Gespräch.\n\nViele Grüße\nTim Wagner',
      at: daysAgo(19),
    },
    {
      id: 'm3',
      direction: 'out',
      fromName: 'Markus Dünzl',
      toLabel: 'Tim Wagner',
      subject: 'Erinnerung: Dein Termin bei FunZone',
      body: 'Hallo Tim,\n\nkurze Erinnerung an unseren Termin morgen. Bitte bring gerne deinen Lebenslauf sowie ein Ausweisdokument mit.\n\nBis morgen!',
      at: daysAgo(1),
    },
  ],
  c1: [
    {
      id: 'm4',
      direction: 'out',
      fromName: 'Markus Dünzl',
      toLabel: 'Anna Berger',
      subject: 'Deine Bewerbung bei FunZone Augsburg',
      body: 'Hallo Anna,\n\nvielen Dank für deine Bewerbung als Stellv. Filialleitung. Wir melden uns in Kürze mit weiteren Infos.\n\nViele Grüße',
      at: daysAgo(2),
    },
  ],
}

const EVENTS: Record<string, CandidateEvent[]> = {
  c4: [
    { id: 'e1', date: daysAgo(-33), time: '18:00', endTime: '20:00', title: 'Interview vor Ort', jobTitle: 'IT-Support/IT-Helpdesk, First(1st) Level (m/w/d) Düsseldorf', past: false, confirmed: true, withName: 'Markus Dünzl' },
    { id: 'e2', date: daysAgo(-35), time: '16:00', endTime: '16:30', title: 'Interview vor Ort', jobTitle: 'IT-Support/IT-Helpdesk, First(1st) Level (m/w/d) Düsseldorf', past: false, confirmed: true, withName: 'Markus Dünzl' },
  ],
}

const EVALUATIONS: Record<string, CandidateEvaluation[]> = {
  c4: [{ id: 'ev1', authorName: 'Markus Dünzl', score: 'Nicht sicher', scorePercent: 50, at: daysAgo(0) }],
}

const NOTES: Record<string, CandidateNote[]> = {
  c4: [
    { id: 'n1', authorName: 'Markus Dünzl', text: 'Hat 2 Kinder', at: daysAgo(0) },
    { id: 'n2', authorName: 'Markus Dünzl', text: 'Auf Führerschein-Klasse achten', at: daysAgo(0) },
  ],
}

const TASKS: Record<string, CandidateTask[]> = {
  c4: [
    { id: 'tk1', text: 'Referenzen anfragen', done: true },
    { id: 'tk2', text: 'Zeugnis nachreichen lassen', done: true },
  ],
}

const FILES: Record<string, CandidateFile[]> = {
  c4: [{ id: 'f1', name: 'Bewerbungsunterlagen_Scan.pdf' }],
}

const ACTIVITY: Record<string, CandidateActivity[]> = {
  c4: [
    { id: 'ac1', at: daysAgo(0), actor: 'Markus Dünzl', text: 'hat den/die Kandidat*in evaluiert und „Nicht sicher" gegeben.' },
    { id: 'ac2', at: daysAgo(17), actor: 'Kandidat*in', text: 'hat eine E-Mail gesendet.' },
    { id: 'ac3', at: daysAgo(20), actor: 'Markus Dünzl', text: 'hat einen Ereignis-Planer-Link an Kandidat*in gesendet.' },
    {
      id: 'ac4',
      at: daysAgo(20),
      actor: 'Markus Dünzl',
      text: 'Eine E-Mail wurde automatisch an den/die Kandidat*in gesendet.',
      automated: true,
      preview: 'Hallo Tim, vielen Dank für deine Bewerbung. Gerne würde ich dich persönlich kennenlernen und lade dich deshalb zu einem ersten Ge…',
    },
    { id: 'ac5', at: daysAgo(20), actor: 'Markus Dünzl', text: 'hat den/die Kandidat*in aus der Phase Beworben nach Erstgespräch Team in dem Job IT-Support/IT-Helpdesk, First(1st) Level (m/w/d) verschoben.' },
    { id: 'ac6', at: daysAgo(37), actor: 'Markus Dünzl', text: 'hat den/die Kandidat*in zum Job IT-Support/IT-Helpdesk, First(1st) Level (m/w/d) hinzugefügt.' },
  ],
}

const AUTOMATIONS: Automation[] = [
  { id: 'au1', name: 'Eingangsbestätigung', active: true, trigger: 'Bewerbung eingegangen (Phase „Beworben")', action: 'E-Mail-Vorlage „Eingangsbestätigung" senden' },
  { id: 'au2', name: 'Erinnerung bei fehlender Rückmeldung', active: true, trigger: 'Deal liegt seit X Tagen in Phase', condition: '14 Tage ohne Aktivität in „Beworben"', action: 'Aufgabe erstellen: „Bewerber kontaktieren"' },
  { id: 'au3', name: 'Interview-Erinnerung', active: true, trigger: '1 Tag vor Termin', condition: 'Termin ist Teams-Interview', action: 'E-Mail-Erinnerung an Kandidat*in und Interviewer*in' },
  { id: 'au4', name: 'Auto-Absage', active: true, trigger: 'Absage mit Grund erfasst', condition: 'Absagegrund hat „löst Auto-Mail aus" = Ja', action: 'Passende Absage-Vorlage automatisch versenden' },
  { id: 'au5', name: 'Willkommens-Mail', active: false, trigger: 'Phasenwechsel auf „Eingestellt"', action: 'E-Mail-Vorlage „Willkommen im Team" senden' },
]

const APPOINTMENTS: Appointment[] = [
  { id: 'a1', date: weekDate(0), time: '09:30', endTime: '10:00', title: 'Erstgespräch (Teams)', jobTitle: 'Stellv. Filialleiter Freizeitbranche Vollzeit (m/w/d) Augsburg', candidateName: 'Anna Berger', channel: 'Teams' },
  { id: 'a2', date: weekDate(1), time: '14:00', endTime: '14:30', title: 'Erstgespräch (Teams)', jobTitle: 'IT-Support/IT-Helpdesk, First(1st) Level (m/w/d)', candidateName: 'Tim Wagner', channel: 'Teams' },
  { id: 'a3', date: weekDate(3), time: '12:30', endTime: '13:00', title: 'Probearbeiten', jobTitle: 'IT-Support/IT-Helpdesk, First(1st) Level (m/w/d)', candidateName: 'Sara Klein', channel: 'Vor Ort' },
  { id: 'a4', date: weekDate(3), time: '16:30', endTime: '17:00', title: 'Drittgespräch GF (Teams)', jobTitle: 'Servicemitarbeiter Freizeitbranche 603 Euro (m/w/d) Hamburg', candidateName: 'Max Neumann', channel: 'Teams' },
  { id: 'a5', date: weekDate(4), time: '10:00', endTime: '10:30', title: 'Erstgespräch (Teams)', jobTitle: 'Servicemitarbeiter Freizeitbranche Werkstudent (m/w/d) Köln', candidateName: 'Nina Schröder', channel: 'Teams' },
]

const POOL: TalentPoolEntry[] = [
  { id: 'p1', name: 'Julia Krause', email: 'julia.krause@example.com', tags: ['mehrsprachig', 'Springer'], note: 'Hat sich initiativ beworben, aktuell keine passende Stelle offen.' },
  { id: 'p2', name: 'David Otto', email: 'david.otto@example.com', tags: ['Wochenende'], note: 'Verfügbarkeit erst ab Januar, danach anfragen.' },
]

const wait = <T,>(value: T) => new Promise<T>((resolve) => setTimeout(() => resolve(value), 150))

export async function getDashboardStats(): Promise<DashboardStats> {
  return wait({
    offeneBewerbungen: CANDIDATES.filter((c) => c.stageKey !== 'hired').length,
    ueberfaelligeBewerber: CANDIDATES.filter((c) => c.overdue).length,
    anstehendeInterviews: CANDIDATES.filter((c) => c.stageKey === 'interview-team' || c.stageKey === 'interview-management').length,
    neueBewerbungenHeute: 3,
    offeneStellen: JOBS.filter((j) => j.open).length,
  })
}

export async function getJobs(): Promise<Job[]> {
  return wait(JOBS)
}

export async function getStages(): Promise<Stage[]> {
  return wait(STAGES)
}

export async function getCandidates(jobId: string): Promise<Candidate[]> {
  return wait(CANDIDATES.filter((c) => c.jobId === jobId))
}

export async function getCandidate(id: string): Promise<Candidate | undefined> {
  return wait(CANDIDATES.find((c) => c.id === id))
}

export async function getCandidateMessages(id: string): Promise<CandidateMessage[]> {
  return wait(MESSAGES[id] ?? [])
}

export async function getCandidateEvents(id: string): Promise<CandidateEvent[]> {
  return wait(EVENTS[id] ?? [])
}

export async function getCandidateEvaluations(id: string): Promise<CandidateEvaluation[]> {
  return wait(EVALUATIONS[id] ?? [])
}

export async function getCandidateNotes(id: string): Promise<CandidateNote[]> {
  return wait(NOTES[id] ?? [])
}

export async function getCandidateTasks(id: string): Promise<CandidateTask[]> {
  return wait(TASKS[id] ?? [])
}

export async function getCandidateFiles(id: string): Promise<CandidateFile[]> {
  return wait(FILES[id] ?? [])
}

export async function getCandidateActivity(id: string): Promise<CandidateActivity[]> {
  return wait(ACTIVITY[id] ?? [])
}

export async function getJob(id: string): Promise<Job | undefined> {
  return wait(JOBS.find((j) => j.id === id))
}

export async function getRejectionReasons(): Promise<RejectionReason[]> {
  return wait(REJECTION_REASONS)
}

export async function getTalentPool(): Promise<TalentPoolEntry[]> {
  return wait(POOL)
}

export async function getAutomations(): Promise<Automation[]> {
  return wait(AUTOMATIONS)
}

export async function getUpcomingAppointments(): Promise<Appointment[]> {
  return wait([...APPOINTMENTS].sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time)))
}

export async function getOverdueCandidates(): Promise<OverdueCandidate[]> {
  const jobById = new Map(JOBS.map((j) => [j.id, j]))
  const result = CANDIDATES.filter((c) => c.overdue).map((c) => {
    const job = jobById.get(c.jobId)
    return {
      ...c,
      jobTitle: job?.title ?? '',
      jobStandort: job?.standort ?? '',
      daysOverdue: Math.round((Date.now() - new Date(c.inStageSince).getTime()) / 86_400_000),
    }
  })
  return wait(result)
}
