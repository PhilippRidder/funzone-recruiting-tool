import type { StageKey } from '../types'

export type StageGroupTitle = 'Bewerber*innen' | 'Aktiver Prozess' | 'Einstellungen'

// Ordnet die globalen Kanban-Phasen (Pipeline.tsx, ProcessTab) den 3 Gruppen zu,
// wie in den Pipeline-Vorlagen. Gehört inhaltlich zur „Stellvertretende
// Standortleitung"-Vorlage (siehe INITIAL_TEMPLATES unten).
export const GLOBAL_STAGE_GROUP: Record<StageKey, { title: StageGroupTitle; color: string }> = {
  sourced: { title: 'Bewerber*innen', color: 'var(--text-faint)' },
  applied: { title: 'Bewerber*innen', color: 'var(--text-faint)' },
  'in-review': { title: 'Aktiver Prozess', color: 'var(--text-faint)' },
  'interview-team': { title: 'Aktiver Prozess', color: 'var(--accent)' },
  'sent-to-location': { title: 'Aktiver Prozess', color: 'var(--accent)' },
  'trial-work': { title: 'Aktiver Prozess', color: 'var(--accent)' },
  'interview-management': { title: 'Aktiver Prozess', color: 'var(--accent)' },
  offer: { title: 'Aktiver Prozess', color: '#8b5cf6' },
  hired: { title: 'Einstellungen', color: 'var(--green)' },
}

export interface TemplateStage {
  id: string
  name: string
  color: string
  automationCount: number
}

export interface StageGroup {
  title: StageGroupTitle
  stages: TemplateStage[]
}

export interface PipelineTemplate {
  id: string
  name: string
  isDefault?: boolean
  groups: StageGroup[]
}

const c = { grey: 'var(--text-faint)', blue: 'var(--accent)', teal: '#22c55e', purple: '#8b5cf6', green: 'var(--green)' }

let uid = 0
const stage = (name: string, color: string, automationCount = 0): TemplateStage => ({ id: `s${++uid}`, name, color, automationCount })

export const INITIAL_TEMPLATES: PipelineTemplate[] = [
  {
    id: 'standard',
    name: 'Standard (Standard)',
    isDefault: true,
    groups: [
      { title: 'Bewerber*innen', stages: [stage('Empfohlen', c.grey), stage('Gesourct', c.grey), stage('Beworben', c.grey)] },
      { title: 'Aktiver Prozess', stages: [stage('An Standort gesendet', c.blue), stage('Probearbeiten', c.blue), stage('Bewertung', c.teal), stage('Angebot', c.purple)] },
      { title: 'Einstellungen', stages: [stage('Eingestellt', c.green)] },
    ],
  },
  {
    id: 'minijob',
    name: 'Minijob / Teilzeit / Werkstudent',
    groups: [
      { title: 'Bewerber*innen', stages: [stage('Gesourct', c.grey), stage('Beworben', c.grey)] },
      { title: 'Aktiver Prozess', stages: [stage('Erstgespräch (Teams)', c.blue, 1), stage('Probearbeiten', c.blue)] },
      { title: 'Einstellungen', stages: [stage('Eingestellt', c.green)] },
    ],
  },
  {
    id: 'vollzeit',
    name: 'Vollzeit',
    groups: [
      { title: 'Bewerber*innen', stages: [stage('Gesourct', c.grey), stage('Beworben', c.grey)] },
      {
        title: 'Aktiver Prozess',
        stages: [
          stage('Erstgespräch (Teams)', c.blue, 1),
          stage('An Standort gesendet', c.blue),
          stage('Probearbeiten + Bewertung', c.teal),
          stage('Angebot', c.purple, 1),
        ],
      },
      { title: 'Einstellungen', stages: [stage('Eingestellt', c.green)] },
    ],
  },
  {
    id: 'stellv-leitung',
    name: 'Stellvertretende Standortleitung',
    groups: [
      { title: 'Bewerber*innen', stages: [stage('Gesourct', c.grey), stage('Beworben', c.grey)] },
      {
        title: 'Aktiver Prozess',
        stages: [
          stage('In Bearbeitung', c.blue),
          stage('Erstgespräch Team', c.blue, 2),
          stage('An Standort gesendet', c.blue, 1),
          stage('Probearbeiten + Bewertung des Kandidaten', c.teal, 1),
          stage('Drittgespräch Geschäftsführung', c.purple, 1),
          stage('Angebot', c.purple, 2),
        ],
      },
      { title: 'Einstellungen', stages: [stage('Eingestellt', c.green, 2)] },
    ],
  },
  {
    id: 'filialleitung',
    name: 'Standortleitung / Filialleitung',
    groups: [
      { title: 'Bewerber*innen', stages: [stage('Empfohlen', c.grey), stage('Gesourct', c.grey), stage('Beworben', c.grey)] },
      {
        title: 'Aktiver Prozess',
        stages: [
          stage('Erstgespräch Team', c.blue, 1),
          stage('Erstgespräch vor Ort', c.blue, 1),
          stage('An Standort gesendet', c.blue),
          stage('Probearbeiten + Bewertung', c.teal, 1),
          stage('Drittgespräch Geschäftsführung', c.purple, 1),
          stage('Angebot', c.purple, 1),
        ],
      },
      { title: 'Einstellungen', stages: [stage('Eingestellt', c.green, 1)] },
    ],
  },
]
