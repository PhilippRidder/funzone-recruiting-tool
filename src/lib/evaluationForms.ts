export interface EvaluationCriterion {
  id: string
  name: string
  scale: string
  pflicht: boolean
}

export interface ScorecardTemplate {
  id: string
  name: string
  kriterien: string[] // Namen aus EVALUATION_CRITERIA
  auswahlfrage?: string
}

export interface GuideQuestion {
  frage: string
  hinweis?: string // worauf die interviewende Person achten soll
}

export interface InterviewGuide {
  id: string
  name: string
  zielgruppe: string // z.B. "Erstkontakt, auch ohne Recruiting-Erfahrung durchführbar"
  fragen: GuideQuestion[]
}

export const EVALUATION_CRITERIA: EvaluationCriterion[] = [
  { id: 'ec1', name: 'Auftreten', scale: '1–5', pflicht: true },
  { id: 'ec2', name: 'Erfahrung', scale: '1–5', pflicht: true },
  { id: 'ec3', name: 'Verfügbarkeit', scale: 'Ampel', pflicht: true },
  { id: 'ec4', name: 'Motivation', scale: '1–5', pflicht: false },
]

export const SCORECARD_TEMPLATES: ScorecardTemplate[] = [
  { id: 'sc1', name: 'Erstgespräch', kriterien: ['Auftreten', 'Motivation'], auswahlfrage: 'Warum möchtest du bei uns arbeiten?' },
  { id: 'sc2', name: 'Probearbeiten', kriterien: ['Auftreten', 'Erfahrung', 'Verfügbarkeit'], auswahlfrage: 'Wie ist der erste Eindruck vom Team?' },
  { id: 'sc3', name: 'Abschlussgespräch (Geschäftsführung)', kriterien: ['Erfahrung', 'Motivation'], auswahlfrage: 'Passt die Gehaltsvorstellung zum Budget?' },
]

export const INTERVIEW_GUIDES: InterviewGuide[] = [
  {
    id: 'ig1',
    name: 'Erstkontakt Minijob/Teilzeit',
    zielgruppe: 'Für kurze Erstgespräche, auch ohne Recruiting-Erfahrung durchführbar (z. B. Minijobber im Team)',
    fragen: [
      { frage: 'Ab wann bist du verfügbar?', hinweis: 'Mit Verfügbarkeit auf der Stelle abgleichen' },
      { frage: 'Kannst du auch am Wochenende arbeiten?' },
      { frage: 'Wie bist du auf die Stelle aufmerksam geworden?' },
      { frage: 'Hast du schon Erfahrung im Service/Freizeitbereich?', hinweis: 'Keine Vorerfahrung nötig – nur zur Einordnung' },
    ],
  },
  {
    id: 'ig2',
    name: 'Fachgespräch Standortleitung',
    zielgruppe: 'Für erfahrene Interviewer*innen, Fachgespräch mit Führungsverantwortung',
    fragen: [
      { frage: 'Wie würdest du ein Team von 8–10 Personen im Schichtbetrieb führen?', hinweis: 'Konkrete Beispiele aus der Vergangenheit erfragen' },
      { frage: 'Wie gehst du mit Konflikten im Team um?' },
      { frage: 'Welche Kennzahlen hast du in deiner letzten Position verantwortet?' },
      { frage: 'Wie stellst du dir die Zusammenarbeit mit der Geschäftsführung vor?' },
    ],
  },
]
