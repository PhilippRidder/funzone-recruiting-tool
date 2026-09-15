# FunZone Recruiting-Tool

In-House-Recruiting-Tool für die FunZone-Gruppe, das **Recruitee** ablöst. Eigenständiges
Frontend-Modul nach demselben Muster wie das FunZone-CRM: React 18 + TypeScript + Vite,
`HashRouter` (iframe-fähig), kein UI-Framework — eigene `styles.css` mit CSS-Variablen,
dunkles Theme passend zum Management-Tool.

## Stand: reines Frontend, keine Backend-Anbindung

Dieser Stand ist ein **klickbarer Demo-Stand mit Mock-Daten** — es gibt noch keine echte
API/Datenbank. Zweck: Abstimmungsgrundlage, bevor das Management-Tool-Team die
Backend-Anbindung baut.

- `src/api/client.ts` — echter Client, wirft aktuell bewusst „Backend-Anbindung noch nicht
  implementiert" (Tauschpunkt für später).
- `src/api/client.mock.ts` — In-Memory-Mock mit denselben Funktionssignaturen; liefert alle
  Demo-Daten. Ein Vite-Alias biegt Importe von `../api/client` im Dev-/Demo-Modus automatisch
  auf diese Datei um (siehe `vite.config.ts`).

Zum Nachbauen/Anbinden ans echte Backend: `client.ts` mit echten `fetch`-Aufrufen füllen,
`client.mock.ts` als Referenz für die erwarteten Datenformen/Funktionen nutzen.

## Starten

```bash
npm install
npm run dev
```

Läuft standardmäßig auf Port 5174.

## Dokumentation für den Nachbau

- **[`docs/Recruiting-Tool-Scoping.md`](docs/Recruiting-Tool-Scoping.md)** — Entscheidungs-Log:
  was wurde gebaut, warum, welche Punkte sind noch offen/zu klären.
- **[`docs/Recruiting-Tool-Schulung.md`](docs/Recruiting-Tool-Schulung.md)** — Nutzer-Handbuch:
  was sieht man auf jeder Seite, wie bedient man die Funktionen, was ist je Rolle relevant.

## Struktur

- `src/pages/` — eine Datei/Ordner je Hauptseite (Dashboard, Stellen, Pipeline, Verwaltung, …)
- `src/pages/jobEditor/` — Stellen-Editor mit Tabs
- `src/pages/candidateDetail/` — Kandidat*innen-Ansicht (Pop-up), mit Tabs
- `src/pages/career/` — öffentliche Karriereseite (kein Login, eigenes Branding)
- `src/pages/settings/` — Unterseiten der Verwaltung
- `src/components/` — geteilte UI-Bausteine
- `src/lib/` — Mock-Daten-Kataloge und kleine Helfer (Formatierung, Berechtigungen, …)
- `src/types.ts` — zentrale TypeScript-Datenmodelle
