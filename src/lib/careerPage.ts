export interface CareerPageConfig {
  heroTitle: string
  quoteText: string
  quotePerson: string
  quoteRole: string
  careerBlockTitle: string
  careerBlockText: string
  contactName: string
  contactEmail: string
  contactPhone: string
}

// Inhalte 1:1 von https://karriere.fun-zone.de/ übernommen als Startbefüllung.
export const DEFAULT_CAREER_PAGE: CareerPageConfig = {
  heroTitle: 'Karriere bei der FunZone',
  quoteText: 'Wir glauben daran, dass Menschen echte Erlebnisse brauchen, um sich lebendig zu fühlen.',
  quotePerson: 'Patrick Wrobel',
  quoteRole: 'CEO & Founder',
  careerBlockTitle: 'Karriere',
  careerBlockText: 'Wir schaffen eine Arbeitsumgebung, in der sich alle zugehörig fühlen und ihre individuellen Stärken einbringen können.',
  contactName: 'Philipp Ridder',
  contactEmail: 'philipp@laserzone.de',
  contactPhone: '+49 160 93003723',
}

const STORAGE_KEY = 'recruiting.careerpage.config'

export function loadCareerPageConfig(): CareerPageConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? { ...DEFAULT_CAREER_PAGE, ...JSON.parse(raw) } : DEFAULT_CAREER_PAGE
  } catch {
    return DEFAULT_CAREER_PAGE
  }
}

export function saveCareerPageConfig(config: CareerPageConfig) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
  } catch {
    // ignore – reine Komfortfunktion im Demo-Modus
  }
}
