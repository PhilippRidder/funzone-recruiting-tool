import type { Candidate, ScreeningCriterion } from '../types'

// Vorauswahl-Kriterien, global gepflegt unter Verwaltung → Screening-Kriterien.
// Wertet bestehende Kandidat*innen-Felder aus (kein separates Mock-Datenmodell) –
// bildet ab, was ein echtes Lebenslauf-Screening später strukturiert auslesen würde.
export const SCREENING_CRITERIA: ScreeningCriterion[] = [
  { id: 'sc1', label: 'Führerschein Klasse B', type: 'fuehrerschein', pflicht: true },
  { id: 'sc2', label: 'Deutschkenntnisse mind. Fortgeschritten', type: 'language', pflicht: true, languageName: 'Deutsch', languageMinLevel: 'Fortgeschritten' },
  { id: 'sc3', label: 'Erfahrung im Kundenservice', type: 'skill', pflicht: false, skillKeyword: 'Kundenservice' },
  { id: 'sc4', label: 'Verfügbarkeit an Wochenenden', type: 'weekendWork', pflicht: false },
]

const LANGUAGE_LEVEL_RANK: Record<string, number> = {
  Grundkenntnisse: 1,
  Fortgeschritten: 2,
  Verhandlungssicher: 3,
  Muttersprache: 4,
}

export interface CriterionResult {
  criterion: ScreeningCriterion
  passed: boolean
  note: string
}

export function evaluateCandidate(candidate: Candidate, criteria: ScreeningCriterion[] = SCREENING_CRITERIA): CriterionResult[] {
  return criteria.map((c) => {
    switch (c.type) {
      case 'fuehrerschein': {
        const passed = !!candidate.fuehrerschein
        return { criterion: c, passed, note: passed ? 'Vorhanden' : 'Nicht hinterlegt' }
      }
      case 'skill': {
        const keyword = (c.skillKeyword ?? '').toLowerCase()
        const passed = candidate.skills.some((s) => s.toLowerCase().includes(keyword))
        return { criterion: c, passed, note: passed ? 'Im Profil gefunden' : 'Nicht im Profil gefunden' }
      }
      case 'language': {
        const lang = candidate.languages.find((l) => l.name === c.languageName)
        const rank = lang ? (LANGUAGE_LEVEL_RANK[lang.level] ?? 0) : 0
        const minRank = LANGUAGE_LEVEL_RANK[c.languageMinLevel ?? ''] ?? 0
        const passed = rank >= minRank
        return { criterion: c, passed, note: lang ? `${lang.name} – ${lang.level}` : `${c.languageName} nicht hinterlegt` }
      }
      case 'weekendWork': {
        const passed = candidate.weekendWork === 'Ja'
        return { criterion: c, passed, note: candidate.weekendWork ?? 'Nicht angegeben' }
      }
      case 'availability': {
        if (!candidate.verfuegbarAb) return { criterion: c, passed: false, note: 'Keine Angabe' }
        const days = Math.round((new Date(candidate.verfuegbarAb).getTime() - Date.now()) / 86_400_000)
        const passed = days <= (c.availableWithinDays ?? 0)
        return { criterion: c, passed, note: days <= 0 ? 'Sofort verfügbar' : `Ab in ${days} Tagen` }
      }
    }
  })
}

export function screeningSummary(results: CriterionResult[]) {
  const pflicht = results.filter((r) => r.criterion.pflicht)
  const pflichtPassed = pflicht.filter((r) => r.passed).length
  const allPassed = results.filter((r) => r.passed).length
  const pflichtOk = pflichtPassed === pflicht.length
  return {
    pflichtPassed,
    pflichtTotal: pflicht.length,
    totalPassed: allPassed,
    total: results.length,
    empfehlung: pflichtOk ? ('passt' as const) : ('pruefen' as const),
  }
}
