// Mock-Inhalte für die zusätzlichen Start-Widgets. Rein illustrativ (keine echten
// Daten/Namen von außen), analog zu den bereits vorhandenen Test-Kandidaten.

export interface TaskItem {
  id: string
  text: string
  due: string
  done: boolean
}

export const TASKS: TaskItem[] = [
  { id: 't1', text: 'Rückruf bei Jonas Fischer einplanen', due: 'Heute', done: false },
  { id: 't2', text: 'Vertrag an Max Neumann senden', due: 'Morgen', done: false },
  { id: 't3', text: 'Bewerbungsunterlagen von Nina Schröder prüfen', due: 'Diese Woche', done: false },
  { id: 't4', text: 'Feedback von Standort Köln einholen', due: 'Erledigt', done: true },
]

export const PENDING_APPROVALS = [
  { id: 'pa1', title: 'Servicemitarbeiter (m/w/d)', standort: 'Bielefeld', von: 'Standortleitung Bielefeld' },
  { id: 'pa2', title: 'Servicemitarbeiter Werkstudent (m/w/d)', standort: 'Duisburg', von: 'Standortleitung Duisburg' },
]

export const ACTIVITY_FEED = [
  { id: 'ac1', text: 'Anna Berger hat Lea Hoffmann in Phase „In Bearbeitung" verschoben', when: 'vor 25 Min.' },
  { id: 'ac2', text: 'Philipp Ridder hat eine neue Stelle „Servicemitarbeiter (m/w/d) Bielefeld" beantragt', when: 'vor 2 Std.' },
  { id: 'ac3', text: 'Automatisierung „Eingangsbestätigung" hat eine E-Mail an Max Neumann gesendet', when: 'vor 3 Std.' },
  { id: 'ac4', text: 'Anna Berger hat Tim Wagner abgesagt (Grund: zu hohe Gehaltsvorstellungen)', when: 'gestern' },
]

export const PENDING_EVALUATIONS = [
  { id: 'pe1', candidateId: 'c3', name: 'Lea Hoffmann', stage: 'In Bearbeitung' },
  { id: 'pe2', candidateId: 'c5', name: 'Sara Klein', stage: 'Probearbeiten + Bewertung' },
]

export const RECENTLY_VIEWED = [
  { id: 'rv1', type: 'Kandidat*in', label: 'Tim Wagner', to: '/kandidaten/c4' },
  { id: 'rv2', type: 'Stelle', label: 'Stellv. Filialleiter Freizeitbranche Vollzeit (m/w/d)', to: '/stellen/j1/bearbeiten' },
  { id: 'rv3', type: 'Kandidat*in', label: 'Max Neumann', to: '/kandidaten/c6' },
]

export const GDPR_DUE = [
  { id: 'gd1', name: 'Ehemalige Bewerbung (abgesagt)', tage: 5 },
  { id: 'gd2', name: 'Ehemalige Bewerbung (abgesagt)', tage: 12 },
]

export const STARTING_SOON = [
  { id: 'ss1', name: 'Paul Weber', jobTitle: 'Servicemitarbeiter Freizeitbranche 603 Euro (m/w/d)', standort: 'Hamburg', start: '15.09.2026' },
]

export const REFERRALS = [
  { id: 'rf1', name: 'Julia Krause', von: 'Max Montag', status: 'In Prüfung' },
  { id: 'rf2', name: 'David Otto', von: 'Anna Berger', status: 'Eingestellt' },
]

export const PORTAL_PERFORMANCE = [
  { label: 'Indeed', value: 12 },
  { label: 'StepStone', value: 5 },
  { label: 'Empfehlung', value: 3 },
  { label: 'Initiativ', value: 2 },
]
