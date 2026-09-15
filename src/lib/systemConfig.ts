// Feste interne System-Konfiguration statt eigener Verwaltungsseite. Diese Werte ändern
// sich praktisch nie und werden bei Bedarf direkt hier im Code angepasst statt über ein UI.
// Entscheidung 2026-09-04: Gemeinsame Posteingänge + DSGVO-Löschfristen brauchen keinen
// eigenen Punkt in der Verwaltung.

export const SHARED_INBOXES = [
  { adresse: 'bewerbung@fun-zone.de', zweck: 'Zentrales Bewerbungspostfach (Karriereseite)' },
  { adresse: 'karriere@fun-zone.de', zweck: 'Allgemeine Karriere-Anfragen' },
]

export const GDPR_RETENTION_RULES = [
  { name: 'Abgesagte Bewerbungen', tage: 180 },
  { name: 'Nicht kontaktierte Initiativbewerbungen', tage: 365 },
]
