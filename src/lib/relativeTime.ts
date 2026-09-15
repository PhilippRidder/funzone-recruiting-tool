// Kurzformat wie im echten Tool (1s / 5M / 17T / 4M / 2J) statt ausgeschriebener Zeitangaben.
export function formatRelative(iso: string): string {
  const diffMs = Math.max(0, Date.now() - new Date(iso).getTime())
  const seconds = Math.round(diffMs / 1000)
  if (seconds < 60) return `${seconds}s`
  const minutes = Math.round(seconds / 60)
  if (minutes < 60) return `${minutes}M`
  const hours = Math.round(minutes / 60)
  if (hours < 24) return `${hours}Std`
  const days = Math.round(hours / 24)
  if (days < 31) return `${days}T`
  const months = Math.round(days / 30)
  if (months < 12) return `${months}M`
  const years = Math.round(months / 12)
  return `${years}J`
}

// Ausgeschriebene Variante ("vor 17 Tagen", "vor einem Monat") für Fließtext.
export function formatLongRelative(iso: string): string {
  const days = Math.round((Date.now() - new Date(iso).getTime()) / 86_400_000)
  if (days < 1) return 'gerade eben'
  if (days === 1) return 'vor 1 Tag'
  if (days < 31) return `vor ${days} Tagen`
  const months = Math.round(days / 30)
  if (months === 1) return 'vor einem Monat'
  if (months < 12) return `vor ${months} Monaten`
  const years = Math.round(months / 12)
  return years === 1 ? 'vor einem Jahr' : `vor ${years} Jahren`
}
