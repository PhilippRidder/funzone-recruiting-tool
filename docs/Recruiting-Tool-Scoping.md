# Scoping: FunZone In-House-Recruiting-Tool (Nachbau Recruitee)

> Arbeitsdokument, Stand 2026-09-03. Wird iterativ ergänzt/korrigiert, bevor daraus
> (analog `CRM-Nachbau-Prompt.md`) ein finaler Bau-Prompt wird. Noch KEIN Code.

## Vorgehen v1 — bestätigt 2026-09-03: reines Frontend, keine Anbindung
Erster Schritt ist **ausschließlich eine Frontend-Ansicht** (klickbarer Demo-Stand mit
Mock-Daten) — **keine echten Endpunkte, keine Backend-Anbindung, keine Portal-Integration**.
Zweck: Abstimmungsgrundlage mit dem Management-Tool-Dev-Team, bevor Backend-Arbeit beauftragt
wird (exakt wie beim CRM: erst Frontend mit Mock-Client, Anbindung kommt später als eigener
Schritt). Alle Backend-/Integrations-Themen unten (Job-Portal-API, Teams-Kalender-Sync,
DSGVO-Löschjobs) bleiben als **dokumentierte Anforderung für später**, werden aber in v1
höchstens visuell/als Platzhalter dargestellt, nicht funktional gebaut.

→ **Marktplatz-Screenshot nicht mehr nötig** — da v1 keine echte Portal-Anbindung baut,
ist die Klärung des genauen Mechanismus (Feed vs. Aggregator vs. Einzel-API) erst relevant,
wenn die Backend-Anbindung ansteht.

Design: User liefert vor Baustart noch Screenshots des Management-Tools als Stilvorlage,
damit das Recruiting-Frontend optisch dazu passt (analog wie beim CRM-Layout).

## Rahmen (bestätigt)
- Löst **Recruitee** ab, analog wie das CRM Pipedrive ablöst.
- **Eigenes Modul**, gleiches Architekturmuster wie das CRM: eigenes Repo, React/Vite/
  HashRouter-Frontend, **Management-Tool liefert Backend/API** (kein eigenes Backend).
- Erster Wurf: **volle Pipeline** (Stellenausschreibung → Bewerber-Pipeline → Interviews →
  Angebot → Eingestellt), nicht nur der Kern.
- **Wichtig, neu ggü. CRM**: Anbindung an **Stellenausschreibungsportale per API**
  (Indeed, StepStone als große Portale zwingend; dazu kostenlose Portale). Stellen werden
  zentral im Tool geschaltet und dann per Anbindung extern veröffentlicht — Multiposting.

## Quellen
Screenshots des Users vom laufenden Recruitee-Account (2026-09-03):
Einstellungsmenü „Prozess" + „Allgemein", Profil/E-Mail-Einstellungen, Pipeline-Kanban
einer Stelle, Analysen/Berichte, Jobs-Board (nach Standort gruppiert), Startseite/Dashboard,
zweite Einstellungsliste (Jobs/Pipelines/Felder/Vorlagen/Formulare).

## Settings-Inventar aus den Screenshots (roh, unkommentiert)
**Menü „Prozess"**: Stellenanträge · Kandidat*innen-Bewertung · Benutzerdefinierte Felder ·
Absagegründe · Tags und Quellen · Öffentliche Links zu Kandidat*innen · Ereignis-Planer

**Menü „Allgemein"**: Unternehmenseinstellungen · Teammitglieder · Nutzungsrollen ·
Standorte · Empfehlungsportal · Meeting-Räume · Gemeinsame Posteingänge

**Zweite Liste (evtl. andere Ansicht/Scroll derselben Bereiche)**: Jobs · Pipelines ·
Felder im Kandidat*innenprofil · E-Mail-Vorlagen · Bewertungsformulare · Fragebögen ·
Angebotsschreiben · Auswahlfragen · Fragen für Empfehlungen

**Hauptnavigation**: Startseite · Kandidat*innen · Jobs · Posteingang · Analysen ·
Talent Pools · Kampagnen · Marktplatz

**Analysen-Unterpunkte**: Kandidat*innen · Jobs · Pipelines · Absagen · Einstellungen
(Hires) · Interviews · Bewertungen · Karriereseite

## Vorschlag: was in jede Einstellung gehört — **bestätigt 2026-09-03**, Rest wie vorgeschlagen

| Bereich | Vorschlag Inhalt |
|---|---|
| **Stellenanträge** | Freigabe-Workflow für neue Stellen: wer darf eine Stelle *beantragen* (Filialleiter) vs. wer *freigibt* (HR/GF) bevor sie live geht. Felder: Anlass (Ersatz/Neu/Wachstum), gewünschter Starttermin, Budget/Gehaltsrahmen, Begründung. |
| **Kandidat*innen-Bewertung** | Bewertungskriterien-Katalog (z. B. Auftreten, Verfügbarkeit, Erfahrung) mit Skala (1–5 oder Ampel), je Pipeline-Phase unterschiedliche Kriterien möglich, Pflicht vor Phasenwechsel ja/nein. |
| **Benutzerdefinierte Felder** | Zusätzliche Kandidatenfelder je nach Bedarf (z. B. Führerschein, Verfügbarkeit ab, gewünschte Stunden/Woche) — analog zu Deal-Zusatzfeldern im CRM. |
| **Absagegründe** | **Bestätigt, echte Liste aus Recruitee**: Bewerber passt nicht · Keine Rückmeldung seitens des Bewerbers · zu hohe Gehaltsvorstellungen · Nicht erschienen · Kandidat unter 18 Jahren · Keine Kontaktdaten vorhanden · Kandidat hat sich für einen anderen Job entschieden · Für einen anderen Bewerber entschieden · Kandidat hat sich anders entschieden · doppelt beworben · Absage ohne Absage E-Mail · Kündigung. Im Screenshot haben die meisten Gründe ein Blitz-Symbol (⚡) — deutet auf **automatischen Auslöser** (z. B. Absage-Mail-Versand) je Grund. Auffällig: „Absage ohne Absage E-Mail" und „Kündigung" haben **kein** Blitz-Symbol → diese zwei lösen bewusst **keine** automatische Kandidaten-Mail aus. → Datenmodell: jeder Absagegrund braucht ein Flag „löst Auto-Mail aus (ja/nein)" + optional welche Vorlage. |
| **Tags und Quellen** | Quelle = woher kam die Bewerbung (Indeed, StepStone, Empfehlung, Initiativ, kostenlose Portale …) — Pflichtfeld für Auswertung „Neueinstellungen nach Quelle". Tags = freie Kennzeichnung (z. B. „Springer", "mehrsprachig"). |
| **Öffentliche Links zu Kandidat*innen** | Read-only Freigabelink auf ein Kandidatenprofil für z. B. Standortleiter ohne vollen Tool-Zugang. |
| **Ereignis-Planer** | **Bestätigt: läuft über Microsoft Teams.** Interviewtermin anlegen/einladen (Kandidat + Interviewer) erzeugt einen Teams-Termin/-Meeting-Link, keine eigene Video-Lösung nötig → braucht Teams/Outlook-Kalender-Anbindung vom Management-Tool (ähnlich wie beim CRM die Postfach-Anbindung). „Meeting-Räume" separat bleibt für **Vor-Ort**-Interviews (physische Raumbuchung je Standort). |
| **Unternehmenseinstellungen** | Firmenname/Logo/Branding, Standard-Absenderadresse, evtl. je Marke (LaserZone/FunZone) eigenes Branding auf Karriereseite. |
| **Teammitglieder** | Nutzerliste, Standortzuordnung (wer sieht/bearbeitet welche Stellen). |
| **Nutzungsrollen** | Rechte-Stufen, z. B. Admin (alles), Recruiter (alle Stellen), Standortleiter (nur eigene Stellen/Kandidaten). |
| **Standorte** | Die FunZone-Standorte (deckt sich vermutlich mit den CRM-Standorten — ggf. dieselbe Stammdatenliste wiederverwenden statt doppelt pflegen). |
| **Empfehlungsportal** | Mitarbeiter-Empfehlungsprogramm: Mitarbeiter reicht Kandidat ein, Tracking ob eingestellt, ggf. Prämie. |
| **Meeting-Räume** | Buchbare Räume pro Standort für Vor-Ort-Interviews. |
| **Gemeinsame Posteingänge** | Team-Postfach fürs Recruiting (analog `firmenevent@fun-zone.de` beim CRM) — zentrale Bewerbungs-Adresse. |
| **E-Mail-Vorlagen** | Analog CRM-Vorlagen: Eingangsbestätigung, Einladung Interview, Zusage, Absage — mit Platzhaltern `{{candidate.*}}`, `{{job.*}}`. |
| **Bewertungsformulare** | Strukturierte Scorecards je Interview-Runde (unterscheidet sich von „Kandidat*innen-Bewertung" oben ggf. nur begrifflich — bitte klären ob 1 Konzept). |
| **Fragebögen** | Vorab-Screening-Fragen, die Bewerber beim Bewerben beantworten (z. B. Verfügbarkeit, Führerschein). |
| **Angebotsschreiben** | Vertrags-/Angebots-Vorlagen je Position, analog CRM-Angebots-Vorlagen inkl. optionaler Unterschrift. |
| **Auswahlfragen** | Vermutlich = Fragebögen, evtl. für interne Bewertung statt Bewerber-Input — bitte Unterschied klären. |
| **Fragen für Empfehlungen** | Zusatzfragen im Empfehlungsportal-Formular. |

## Scope v1 — bestätigt (2026-09-03)
Zusätzlich zur vollen Pipeline gehören folgende Bereiche gleich in den ersten Wurf
(nicht erst später wie beim CRM):
- **DSGVO-Löschfristen für Bewerberdaten** (automatische Aufbewahrungs-/Löschregeln)
- **Öffentliche Karriereseite/Bewerbungsformular** (eigene Bewerbungsseite, analog CRM `/anfrage`)
- **Automatisierungen** (Auto-Mails, Erinnerungen — analog CRM `/automatisierungen`)
- **Berichte/Analysen** (Time-to-Hire, Time-to-Start, Quellen-Performance)
- **Talent Pools** (vorgemerkte Kandidaten für später)
- **Kalender-Sync** (Interviewtermine/Teams — in v1 nur als UI/Platzhalter, echte Synchronisierung ist Backend-Thema für später)

## Job-Portal-Integration — technischer Hinweis (bitte abstimmen)
Große Portale wie Indeed/StepStone bieten selten eine „Stelle per API anlegen"-Schnittstelle
für Einzeltools direkt an — üblich ist entweder:
1. **XML/JSON-Stellenfeed**: Das Tool exportiert einen Feed aller offenen Stellen, das
   Portal liest ihn zyklisch ein (Indeed XML Feed, StepStone ist ähnlich). Kein „Schreib"-API,
   aber einfach und von vielen Portalen (auch kostenlosen) unterstützt.
2. **Multiposting-Aggregator** (z. B. Talentry, Broadbean, JOIN, Prescreen, Softgarden-Feed,
   Herausforderung: meist kostenpflichtiger Dienst): ein Aggregator verteilt eine Stelle an
   viele Portale gleichzeitig inkl. kostenloser Börsen — das ist vermutlich der Weg, wie
   Recruitee selbst das intern löst.
3. **Direkte Partner-API** einzelner Portale (z. B. Indeed Employer API) — aufwändiger,
   meist nur für sehr große Kunden/Agenturen freigeschaltet.

→ Bevor wir das ins Datenmodell/API-Vertrag aufnehmen: **Nutzt ihr aktuell in Recruitee
einen Feed/Aggregator, oder einzelne direkte Anbindungen?** Das entscheidet, ob das
Management-Tool-Team einen Feed-Export bauen muss (einfach) oder mehrere Einzel-Integrationen
(aufwändig, ggf. pro Portal eigenes Vertragsverhältnis nötig).

**Stand 2026-09-03: unbekannt.** Nutzer weiß nicht, wie Recruitee das technisch löst.
→ **Nächster Klärungsschritt**: im Recruitee-Menüpunkt **„Marktplatz"** nachsehen, welche
Portal-Integrationen dort aktiv/verfügbar sind (das ist vermutlich genau die Stelle, an der
Recruitee seine Multiposting-Partner zeigt) — Screenshot davon liefert die Antwort, ohne
Support kontaktieren zu müssen.

## Offene Punkte, die ich zusätzlich vorschlage (bitte einzeln bestätigen/verwerfen)
- **Talent Pools**: Kandidaten, die aktuell nicht passen, aber für später vorgemerkt werden —
  in v1 oder später?
- **Kalender-Sync**: Interviewtermine ins Outlook/Google-Kalender der Interviewer schreiben?

## Repo/Dokumentation
Entscheidung: **kein Extra-Punkt im CRM-Repo** (`Prozess`) — das Recruiting-Tool ist ein
eigenständiges Modul mit eigenem Backend-Anbindungspunkt, genau wie das CRM sein eigenes
Repo (`funzone-b2b-crm`) bekommen hat. Diese Scoping-Dokumente liegen daher vorerst separat
unter `Recruiting-Tool/` (lokal), bis der Bau-Prompt steht. Ein eigenes GitHub-Repo
(analog `funzone-b2b-crm`, mit eigenem Deploy-Key) legen wir erst an, wenn es an den Code
geht — das ist ein separater, expliziter Schritt (GitHub-Repo-Erstellung), den ich nicht
ungefragt anlege.

## Bau-Stand (2026-09-03) — alle v1-Seiten als reine Frontend-Ansicht fertig
Projekt liegt unter `C:\Users\Philipp Ridder\Desktop\funzone-recruiting` (eigener Ordner,
noch kein GitHub-Repo). Gleicher Stack wie CRM (React 18 + TS + Vite + HashRouter,
Mock-Client als Tauschpunkt in `src/api/client.ts` / `client.mock.ts`, echter Client wirft
aktuell bewusst „nicht implementiert" — keine Backend-Anbindung in diesem Schritt).
Start: `npm run dev` im Projektordner (Port 5174).

Gebaute Seiten:
- **Start** (`/`) — Kennzahlen-Karten
- **Bewerber-Pipeline** (`/pipeline`) — Kanban je Stelle, echte Recruitee-Phasen, Klick auf Karte → Bewerber-Detail
- **Bewerber-Detail** (`/kandidaten/:id`) — Kontakt, Zusatzfelder, Tabs Verlauf/Bewertung/Absage (echte Absagegründe-Liste), Teams-Interview-Platzhalter
- **Stellen** (`/stellen`) — Board gruppiert nach Standort, Kennzahlen je Stelle
- **Neue Stelle** (`/stellen/neu`) — Formular inkl. Stellenantrag/Freigabe-Block und Portal-Checkboxen (Indeed/StepStone vorausgewählt + kostenlose Portale)
- **Talent Pools** (`/talentpools`)
- **Berichte** (`/berichte`) — Kennzahlen + Balkendiagramme (CSS-only, keine Chart-Library)
- **Verwaltung** (`/verwaltung`) — Settings-Hub mit den zwei Gruppen Prozess/Allgemein; **Absagegründe** (`/verwaltung/absagegruende`) als ausgebautes Beispiel, Rest als Liste ohne Unterseite
- **Öffentliches Bewerbungsformular** (`/bewerben`) — eigene Route ohne Sidebar, helles Branding

Design: Sidebar/Topbar mit Icons (eigenes kleines Inline-SVG-Set, keine Icon-Library),
Farben/Kartenformen an die Management-Tool-Screenshots angenähert (dunkles Theme, blaue
Akzentfarbe, farbige linke Card-Ränder, Status-Badges). Live im Browser geprüft, keine
Konsolenfehler, `tsc --noEmit` sauber.

**Nachtrag (2026-09-03):**
- **Start-Seite hat jetzt einen Widget-Editor** (Button „Widgets bearbeiten" oben rechts,
  **nur auf dieser Seite** – andere Seiten behalten ihren normalen Haupt-Button). Panel zeigt
  alle Widgets mit Anzeigen/Verbergen-Toggle, Auswahl wird im Browser gemerkt (localStorage,
  rein clientseitiger Komfort, keine echte Persistenz/Backend).
- **Neues Standard-Widget „Kalender – diese Woche"**: Liste der Termine/Gespräche dieser
  Woche (Mock-Daten). Hinweis im Widget: Teams-/Google-Kalender-Anbindung ist Backend-Thema
  für später, aktuell nur Ansicht.
- **Neues Standard-Widget „Überfällige Kandidat*innen"**: eigene Liste (nicht nur Kennzahl),
  Klick auf Eintrag → Bewerber-Detail.
- **Nutzungsrollen** (`/verwaltung/nutzungsrollen`) gebaut: 11 Rollen 1:1 aus dem
  Recruitee-Screenshot übernommen, Rechte-Scope je Rolle als **Erstentwurf nach logischem
  Verständnis** — ausdrücklich noch mit dem User zu verfeinern, nicht final.

## Öffentliche Karriereseite (2026-09-03) — Nachbau von karriere.fun-zone.de
Auf expliziten Wunsch als eigener Baustein gebaut: **öffentliche Jobseite + Editor**, direkt
im Recruiting-Tool. Die echte Seite wurde live im Browser durchgeklickt (Homepage, Über uns,
Offene Stellen, Prozess & Stellenprofile, ein Job inkl. Bewerbungsformular) und optisch/inhaltlich
nachgebaut, inkl. echter Texte (Team-Zitate, Reviews, Prozess-Schritte, Standorte-Liste).

Seiten (öffentlich, ohne internes Sidebar-Layout, eigenes Schwarz/Weiß-Branding):
- `/karriere` — Startseite: Hero (Icons, Titel, Marken-Grid LZ/AZ/PXZ/GZ/BZ/KXZ/RZ/EXITZ/PZ),
  Grundsatz-Zitat, „Karriere"-Block, „Das sagt unser Team" (4 Personen, alternierendes
  Text/Video-Layout, Video als Platzhalter mit Play-Button), Reviews (Kununu/Indeed/Google),
  Job-Liste, Job-Alerts-CTA, Standorte-Footer
- `/karriere/ueber-uns`, `/karriere/offene-stellen`, `/karriere/prozess` (4-Schritte-Prozess +
  3 Stellenprofile) — jeweils mit denselben wiederverwendeten Bausteinen
  (`components/career/CareerLayout`, `JobListSection`, `ReviewsSection`, `StandorteFooter`)
- `/karriere/job/:jobId` — Jobdetails/Bewerbung-Tabs, Bewerbungsformular 1:1 nachgebaut
  (Vor-/Nachname, E-Mail, Telefon mit Ländervorwahl, Lebenslauf-Upload, Anschreiben-Upload
  mit Umschalter „Stattdessen hier schreiben")

**Editor** (`/verwaltung/karriereseite`, `pages/CareerPageEditor.tsx`): bearbeitbar sind aktuell
Hero-Überschrift, Zitat+Person, Karriere-Block-Text, Kontakt-Person (Über uns). Speichert in
localStorage (`lib/careerPage.ts`), Änderungen sind sofort auf `/karriere` sichtbar (live
getestet). „Live-Vorschau öffnen"-Button im Editor. **Noch nicht editierbar** (fest im Code):
Team-Zitate, Reviews, Prozess-Schritte, Stellenprofile, Standorte-Liste — bewusst als nächster
Ausbauschritt zurückgestellt, nicht stillschweigend weggelassen.

Altes einfaches `/bewerben`-Formular wurde entfernt, ersetzt durch die vollständige
Karriereseite. `vite.config.ts` musste um einen dritten Mock-Alias (`../../api/client`)
ergänzt werden, da die neuen Unterordner (`components/career/`, `pages/career/`) eine Ebene
tiefer liegen — sonst schlug die Demo-Datenanbindung dort fehl (gefunden & gefixt).

## Kandidat hinzufügen + Automatisierungen (2026-09-03)
- **Kandidat*in hinzufügen** (`/pipeline/neu`, erreichbar über den Button auf der Pipeline-Seite):
  drei Modi als Umschalter — **Manuell erfassen**, **Von LinkedIn importieren** (URL-Feld,
  Button „Profil importieren"), **Lebenslauf hochladen** (Upload-Box, Button „Lebenslauf
  analysieren"). Beide Import-Wege simulieren eine Ladezeit und befüllen danach das
  Kontaktformular automatisch, jedes befüllte Feld bekommt ein „✓ erkannt"-Label. **Wichtig:
  das ist reine Demo-Simulation mit festen Testdaten** — die echte Texterkennung
  (KI-Parsing von Lebensläufen, LinkedIn-API/Scraping) ist Backend-Thema für später; das
  UI nimmt nur vorweg, wie sich das anfühlen soll. Anlegen-Button navigiert zurück (keine
  echte Persistenz, wie bei „Neue Stelle").
- **Automatisierungen** (`/verwaltung/automatisierungen`, aus Verwaltung → Prozess verlinkt):
  5 Beispielregeln (Eingangsbestätigung, Erinnerung bei fehlender Rückmeldung, Interview-
  Erinnerung, Auto-Absage — verknüpft mit dem Auto-Mail-Flag der Absagegründe, Willkommens-
  Mail), je Regel Auslöser/Bedingung/Aktion + Aktiv-Toggle (nur UI-State, keine echte
  Ausführung). Damit sind jetzt **3 der 4 am 03.09. bestätigten Zusatzbereiche gebaut**
  (Karriereseite, Berichte, Automatisierungen) — **DSGVO-Löschfristen steht noch aus**,
  bewusst zurückgestellt für die nächste Runde zusammen mit den übrigen Verwaltungs-Platzhaltern.

## Verwaltung komplett ausgebaut (2026-09-03)
Alle bisherigen Platzhalter haben jetzt eigene Seiten (Muster: Panel + Liste, wie Absagegründe/
Nutzungsrollen). Dabei zwei offene Namensfragen aus dem Settings-Inventar aufgelöst (Entscheidung,
keine Rückfrage mehr nötig, aber änderbar):
- **Kandidat*innen-Bewertung** = Kriterien-Katalog (welche Kriterien, welche Skala) ·
  **Bewertungsformulare** = stellen daraus je Interview-Runde eine Auswahl zusammen + eine interne
  Frage für die Interviewer*innen — das deckt zugleich „Auswahlfragen" ab (kein eigener Punkt).
- **Fragebögen** = Screening-Fragen, die der/die Bewerber*in selbst auf der Karriereseite beantwortet.
- **„Fragen für Empfehlungen"** ist als Abschnitt in „Empfehlungsportal" eingebaut, kein eigener Punkt.
- Neuer Punkt **„Pipeline-Phasen"** ergänzt (aus der zweiten Recruitee-Einstellungsliste „Pipelines"
  abgeleitet) — zeigt die 9 Kanban-Phasen in Reihenfolge.
- „Felder im Kandidat*innenprofil" (zweite Liste) = inhaltlich dasselbe wie „Benutzerdefinierte
  Felder", kein Duplikat angelegt. „Jobs" (zweite Liste) = die bereits gebaute Stellen-Seite.

Neue Seiten unter `/verwaltung/…`: `stellenantraege`, `pipeline-phasen`, `bewertungskriterien`,
`felder`, `tags-quellen`, `oeffentliche-links`, `ereignis-planer`, `dsgvo`, `unternehmen`, `team`,
`standorte`, `empfehlungsportal`, `meeting-raeume`, `postfaecher`, `email-vorlagen`,
`bewertungsformulare`, `fragebogen`, `angebotsschreiben`. Damit ist **jeder Punkt aus dem
Settings-Inventar** entweder gebaut oder bewusst zusammengelegt — keine reinen Text-Platzhalter
mehr in der Verwaltung. Live geprüft (Stellenanträge, Bewertungsformulare stichprobenartig
gescreenshottet), `tsc --noEmit` sauber.

## Job-Editor „Stelle schalten" (2026-09-03) — Nachbau nach 6 Recruitee-Screenshots
Ersetzt komplett das alte einfache „Neue Stelle"-Formular. Erreichbar über „+ Stelle
ausschreiben" (`/stellen/neu`) und über Klick auf eine Stelle im Stellen-Board
(`/stellen/:jobId/bearbeiten`). Eigene Tab-Navigation + Status-Leiste, wie im Original:

- **Top-Bar**: Jobtitel + „Neueste Bearbeitung"/„Noch nicht veröffentlicht", Teilen/Vorschau,
  Veröffentlicht-Badge (nur bei bestehender Stelle), Haupt-Button „Stelle veröffentlichen"
  (neu) bzw. „Änderungen veröffentlichen" (bestehend)
- **Jobdetails**: Grundlegende Informationen (Titel, Abteilung, Tags/Portale als Chips,
  interne Priorität), Limit für Stellenausschreibungen, Beschreibung + Anforderungen,
  Standort, Arbeitsmodell (Vor Ort/Homeoffice/Hybrid als Auswahlkarten), Details zur
  Beschäftigung, Gehalt
- **Bewerbung**: Kandidat*innen-Daten-Felder, Auswahlfragen, „Nach bevorzugtem Arbeitsort
  fragen"-Toggle, Eingangsbestätigung (Toggle + Vorlage + E-Mail-Vorschau), Bewerbungs-
  einstellungen (Bewerben über LinkedIn/Indeed/XING/WhatsApp)
- **Team**: Entscheidungsträger*innen (Recruiter*in, Einstellende*r Manager*in),
  Teammitglieder-Liste + Rechte-Gruppen
- **Prozess**: Prozessautomatisierungen (leer) + Pipeline — zeigt **echte, aus den
  Pipeline-Phasen geladene** 9 Stufen, gruppiert in Bewerber*innen/Aktiver Prozess/
  Einstellungen (genau wie im Original)
- **Bewertungskit, Social Sharing, Karriereseite, Empfehlungen**: bewusst nur Platzhalter
  („noch kein Screenshot vorhanden") — Nutzer hat sich für „alle 8 Tabs anlegen" entschieden,
  Inhalt fehlt mangels Vorlage.
- Prev/Next-Navigation unten („← Team" / „Prozess →") wie im Original.

**Layout-Änderung**: „Stellenanträge" ist jetzt ein **eigener Punkt in der Haupt-Sidebar**
(nicht mehr nur unter Verwaltung), wie gewünscht.

Bug gefunden & behoben: der Prozess-Tab lädt `api/client` aus einer noch tieferen
Ordnerebene (`pages/jobEditor/tabs/`) — dritter Mock-Alias (`../../../api/client`) in
`vite.config.ts` ergänzt. Alle Tabs live geprüft, `tsc --noEmit` sauber.

## Nutzungsrollen → echte Rechte-Matrix (2026-09-03)
Auf Wunsch ausgebaut: nicht mehr nur Text-Beschreibung je Rolle, sondern konfigurierbar.
`/verwaltung/nutzungsrollen` ist jetzt eine Master-Detail-Ansicht: Rolle links anklicken,
rechts pro Rolle einstellbar:
- **Sichtbare Bereiche** — Checkboxen für alle 7 Hauptnavigationspunkte (Start,
  Bewerber-Pipeline, Stellen, Stellenanträge, Talent Pools, Berichte, Verwaltung)
- **Standort-Zugriff** — „Alle Standorte" oder „Ausgewählte Standorte" (Chip-Mehrfachauswahl
  aus den 14 FunZone-Standorten) — steuert, welche Stellen/Bewerber eine Rolle sehen würde

Vorbelegung leitet sich aus den bereits abgestimmten Rollen-Beschreibungen ab (z. B.
Standortleitung: Start/Pipeline/Stellen/Talent Pools, Standort „Ausgewählt: Augsburg" als
Platzhalter; Head of Accounting: nur Berichte, alle Standorte). Rein UI-seitig (State im
Browser) — die tatsächliche Durchsetzung (welcher Nutzer sieht was) ist Backend-Thema; hier
geht es darum, das Regelwerk zu definieren und mit dem Dev-Team abzustimmen. Live geprüft,
`tsc --noEmit` sauber.

## Nutzungsrollen → vollständiger Berechtigungskatalog (2026-09-03)
Nutzer hat klargestellt: die 5 Recruitee-Screenshots (Administrator*in, Tabs Allgemein/
Prozess/Funktionen/Unternehmen/Add-ons) zeigen **den kompletten Berechtigungskatalog** —
alle anderen Rollen nutzen denselben Katalog, nur mit weniger angehakten Punkten. Keine
weiteren Screenshots nötig, direkt umgesetzt.

- **`src/lib/permissions.ts`**: ~48 Berechtigungen 1:1 aus den Screenshots übernommen
  (Titel + vollständiger Beschreibungstext + Gruppierung in Sections), verteilt auf die
  5 Tabs. Pro Rolle ein Array aktivierter Berechtigungs-IDs, nach Scope-Logik abgeleitet
  (z. B. Head of Accounting → nur „Berichts-Dashboards verwalten"; Administrator*in → alle,
  nicht editierbar, mit dem Original-Hinweistext „Die Rollenberechtigungen können nicht
  bearbeitet werden.").
- **`/verwaltung/nutzungsrollen`** komplett umgebaut: Rolle links wählen → rechts
  Rollenkopf (Beschreibung, Mitglieder-Avatare) + **Standort-Zugriff** (FunZone-eigene
  Ergänzung, gibt es in Recruitee nicht) + 5 Permission-Tabs mit editierbaren Checkboxen
  (außer bei Administrator*in, gesperrt). Live geprüft: Head of Accounting zeigt korrekt
  nur 1 Häkchen (Funktionen-Tab), Toggle funktioniert. `tsc --noEmit` sauber.
- Die Rollen-Vorbelegung (welche der ~48 Punkte je Rolle an sind) ist weiterhin ein
  **Erstentwurf nach logischem Verständnis** — im Gegensatz zum Katalog selbst (der ist
  jetzt final/aus Recruitee), ist die Zuordnung pro Rolle noch zu prüfen.

## Kalender-Widget neu nach Recruitee-Layout (2026-09-03)
Screenshot vom echten Recruitee-Kalender-Widget bekommen — **nur das Layout übernommen,
keine Daten/Namen aus dem Foto** (ausdrücklicher Wunsch, Datenschutz). Neue Komponente
`components/CalendarWidget.tsx`, ersetzt die bisherige einfache Liste:
- Tabs „Diese Woche [N]" / „Heute [N]" / „Vergangene Ereignisse" + Filter-Dropdown
  „Alle Ereignisse" (nur optisch)
- Termin-Zeilen: Avatar mit Initialen + grünem Häkchen-Badge, Datum/Zeitspanne, Name +
  farbiger Punkt (Teams=blau, Vor Ort=orange) + Jobtitel, Beschreibungszeile, zweiter Avatar
  rechts (Recruiter, „PR")
- Rechte Spalte: **echter funktionierender Mini-Monatskalender** (Vor/Zurück-Navigation,
  heutiger Tag hervorgehoben), „Gesamten Kalender öffnen" + „Ein Ereignis einplanen" (nur
  optisch)

Mock-Termine (`Appointment` erweitert um `endTime`/`jobTitle`) auf 2 Termine „heute"
(Donnerstag) verschoben, damit der „Heute"-Tab sinnvoll befüllt ist — weiterhin nur unsere
eigenen Test-Kandidaten (Anna Berger, Tim Wagner, Sara Klein, Max Neumann, Nina Schröder),
keine echten Namen. Live geprüft (Diese Woche/Heute-Tab, Mini-Kalender korrekt: 31. August
ist im Modell ein Montag, 3. September Donnerstag markiert), `tsc --noEmit` sauber.

## Start-Widgets erweitert (2026-09-03)
Vorschlagsrunde durchgeführt (3× AskUserQuestion), User hat ausgewählt statt „Neue
Kandidat*innen (Liste)" und „Kandidat*innen im Laufe der Zeit (Trend)" folgende **10 neue
Widgets** bestätigt — alle gebaut, an den Widget-Editor angeschlossen (Anzeigen/Verbergen),
Mock-Daten in `lib/dashboardWidgets.ts`, Rendering in `components/dashboard/ExtraWidgets.tsx`:

Aufgaben/To-Dos (mit Checkbox zum Abhaken) · Anstehende Freigaben (verlinkt zu Stellen-
anträgen) · Team-Aktivität (Feed) · Jobübersicht (echte Jobs aus dem Store) · Bewertungen
ausstehend · Zuletzt bearbeitet · DSGVO-Fristen fällig · Bald startende neue Mitarbeiter*innen
· Empfehlungen · Portal-Performance (Balkendiagramm diese Woche).

Live geprüft (alle Widgets sichtbar, korrekt gerendert), `tsc --noEmit` sauber. Startseite
ist jetzt entsprechend lang — genau deshalb der Widget-Editor, damit jede Rolle sich ihre
eigene Auswahl einstellen kann.

## Kennzahlen-Kacheln nach oben + Grid-Fix (2026-09-03)
Zwei kleine, aber wichtige Layout-Korrekturen auf der Startseite:
- Die 4 KPI-Kacheln (Anstehende Interviews/Neue Bewerbungen/Offene Bewerbungen/Offene
  Stellen) stehen jetzt **ganz oben**, direkt unter der Begrüßung — vor Kalender und allen
  anderen Widgets.
- **Grid-Bug behoben**: `.stat-grid` nutzte `grid-template-columns: repeat(auto-fill, …)`,
  wodurch bei 4 Kacheln eine unsichtbare 5. Spalte reserviert wurde → Kacheln standen linksbündig
  mit Leerraum rechts. Auf `auto-fit` umgestellt → die vorhandenen Kacheln strecken sich und
  füllen die Zeile symmetrisch bis zum Rand.

Live geprüft, `tsc --noEmit` sauber.

## Navigation vereinfacht: kein eigener „Bewerber-Pipeline"-Punkt mehr (2026-09-03)
Auf Wunsch entfernt: die Sidebar hat jetzt keinen eigenständigen „Bewerber-Pipeline"-Eintrag
mehr. Stattdessen führt der Weg immer über **Stellen**:
- Klick auf eine Job-Karte im Stellen-Board → direkt in die **Bewerber-Pipeline dieser
  Stelle** (`/stellen/:jobId/pipeline`, vorbelegter Stellen-Umschalter)
- Kleiner Stift-Button auf der Job-Karte (oben rechts, eigener Klick-Bereich) → **Jobdetails
  bearbeiten** (`/stellen/:jobId/bearbeiten`, der Job-Editor)
- Auf der Pipeline-Seite selbst zusätzlich ein „Job bearbeiten"-Button neben „Kandidat*in
  hinzufügen", um jederzeit in den Editor zu wechseln
- Route `/pipeline` (ohne Job) bleibt als interner Fallback bestehen (z. B. Rücksprung-Links),
  ist aber nirgends mehr verlinkt/im Menü

Live geprüft, `tsc --noEmit` sauber.

## Pipeline-Vorlagen + Automatisierungs-Editor (2026-09-03)
Auf Screenshots basierend komplett neu gebaut, ersetzt die bisherige einfache
Phasen-Liste unter `/verwaltung/pipeline-phasen` (Verwaltungs-Label jetzt „Pipeline-Vorlagen"):

- **5 Pipeline-Vorlagen** (`lib/pipelineTemplates.ts`): Standard (Default, ⭐), **Minijob /
  Teilzeit / Werkstudent** (schlank, 5 Phasen), **Vollzeit** (7 Phasen), **Stellvertretende
  Standortleitung** (9 Phasen — identisch mit der Pipeline, die wir die ganze Zeit für Job
  „Stellv. Filialleiter … Augsburg" genutzt haben), **Standortleitung / Filialleitung**
  (10 Phasen, inkl. sowohl „Erstgespräch Team" als auch „Erstgespräch vor Ort" — anspruchsvollster
  Prozess). Jede Vorlage hat eigene Phasen in 3 Gruppen (Bewerber*innen/Aktiver Prozess/
  Einstellungen).
- **Phasen editierbar**: Name per Stift-Icon umbenennen (Inline-Eingabe), „+ Neu hinzufügen"
  je Gruppe legt eine neue Phase an. Auch der Vorlagenname selbst ist umbenennbar.
  „+ Neue Vorlage" legt eine komplett neue, leere Vorlage an.
- **Automatisierungs-Editor** (`components/AutomationEditorModal.tsx`, eigenständiges Modal,
  Klick aufs Blitz-Symbol einer Phase): Trigger-Box („Starten, wenn: Kandidat*in wurde
  verschoben" + Phase fix vorbelegt), Aktions-Auswahl (Notiz/E-Mail/Aufgabe/Bewertung
  anfragen), bei E-Mail ein voller Composer (An/Von/Betreff/Text mit Platzhaltern/Signatur-
  Checkbox), Live-Zusammenfassungssatz unten, „NEU"-Badge bei noch leerer Automatisierung.
  Speichern erhöht den Automatisierungs-Zähler an der Phase (nur UI-State, keine echte
  Ausführung — wie bei den anderen Automatisierungen im Tool).
- Job-Editor „Prozess"-Tab zeigt jetzt die echten Vorlagennamen im Auswahl-Dropdown statt
  eines Fixtextes.

Live geprüft (Vorlagenwechsel, Phasen-Zähler, Editor öffnen mit vorbelegter Phase, leere
Automatisierung mit Aktions-Auswahl), `tsc --noEmit` sauber.

## Verwaltung neu kategorisiert nach echten Recruitee-Reitern (2026-09-03)
Screenshot zeigte die 4 echten Recruitee-Einstellungsreiter (Mein Konto/Allgemein/Prozess/
Vorlagen). Verwaltung.tsx umsortiert — Zuordnung direkt aus den ursprünglichen Screenshots
abgeleitet (die erste „Prozess"- und „Allgemein"-Liste sowie die „zweite Liste" = „Vorlagen"):
- **Allgemein**: Unternehmenseinstellungen, Teammitglieder, Nutzungsrollen, Standorte,
  Empfehlungsportal, Meeting-Räume, Gemeinsame Posteingänge, Karriereseite
- **Prozess**: Kandidat*innen-Bewertung, Benutzerdefinierte Felder, Absagegründe, Tags und
  Quellen, Öffentliche Links zu Kandidat*innen, Ereignis-Planer, Automatisierungen,
  DSGVO-Löschfristen
- **Vorlagen**: Pipeline-Vorlagen, E-Mail-Vorlagen, Bewertungsformulare, Fragebögen,
  Angebotsschreiben
- **Mein Konto**: **noch leer** — entspricht den persönlichen Konto-Einstellungen
  (E-Mail-Verbindung, Signatur, Abwesenheitsnachricht, Kalender, Darstellung), die ganz am
  Anfang einmal als Screenshot kam, aber nie als eigene Seite gebaut wurde. Als Lücke
  markiert statt stillschweigend wegzulassen — Rückfrage an User, ob das noch gebaut werden soll.

Live geprüft (4-Spalten-Layout), `tsc --noEmit` sauber.

## „Mein Konto" gebaut (2026-09-03)
Lücke aus dem letzten Schritt geschlossen. Zwei neue Seiten unter `/verwaltung/mein-konto/…`,
nach Screenshots — **bewusst ohne die Recruitee-spezifischen Teile** (kein „Recruitee" als
E-Mail-Anbieter-Option, Texte generalisiert auf „aus dem Recruiting-Tool"/„deines Kontos"):

- **Profil** (`AccountProfilePage.tsx`) — Kopfbereich (Avatar, Name, Kontakt, Rolle,
  „Profil bearbeiten"/„Sicherheitseinstellungen"), 3 Tabs:
  - E-Mail-Einstellungen: E-Mail-Accounts (Google, Microsoft — verbunden, Anderer
    Posteingang), E-Mail-Signatur mit Vorschau, Abwesenheitsnachricht
  - Kalender: verbundener Kalender (Microsoft/Outlook), „+ Kalender synchronisieren"
  - Darstellung: 3 Theme-Karten (Hell/Dunkel/System), „Dunkel" vorausgewählt passend zum
    Tool-Theme
- **Benachrichtigungen** (`AccountNotificationsPage.tsx`) — Tabelle Web/Mobil/E-Mail je
  Ereignis (Grundlegende Aktionen, Gefolgte Kandidat*innen), Häkchen einzeln togglebar,
  „Bericht über eingehende Kandidat*innen" (Häufigkeit + Uhrzeit)

Live geprüft (alle 3 Profil-Tabs, Benachrichtigungs-Toggle), `tsc --noEmit` sauber.

## Bewerber-Pipeline nach Screenshot umgebaut + Job-Wechsel-Dropdown (2026-09-03)
Pipeline.tsx komplett neu, nach Screenshot des echten Job-Pipeline-Headers — **keine echten
Personendaten übernommen**, nur Layout/Struktur:
- Kopf: grüner Status-Punkt + Jobtitel + Chevron, rechts Teilen/Vorschau/„Abonniert"
  (togglebar)/Teammitglied-Icon/Avatar/Bearbeiten
- Meta-Zeile: FunZone {Standort} · 📍 Standort · 🏢 Vor Ort · #{Job-Code} · 💼 Eingestellt/Limit
- Zweite Tab-Reihe: Pipeline (aktiv) · Filter · Promoten · Aktivität · Notizen · Datei ·
  Berichte (Platzhalter-Tabs, kein Screenshot dafür vorhanden)
- Toolbar: **Qualifiziert/Ausgeschlossen**-Umschalter (Ausgeschlossen zeigt eine
  Absagegrund-Verteilung, Platzhalterzahl 263 wie im Original, keine Namen) · „+
  Kandidat*innen hinzufügen" · **Board-/Listen-Ansicht-Umschalter (funktional, nicht nur
  optisch)** · „⋯" Menü
- Kanban-Spalten: Anzahl direkt neben dem Namen, „Teilen"-Icon, und bei „Aktiver
  Prozess"-Phasen zusätzlich das **Blitz-Symbol → öffnet denselben Automatisierungs-Editor**
  wie bei den Pipeline-Vorlagen (Wiederverwendung von `AutomationEditorModal`)

**Job-Wechsel-Dropdown** (explizit gewünscht): Chevron neben dem Titel öffnet ein Panel mit
allen Jobs + Standort + „Freigabe vorhanden"-Hinweis, Klick navigiert direkt in die Pipeline
der gewählten Stelle. Vereinfachung: zeigt aktuell **alle** Jobs, keine echte
Rechte-Filterung nach Rolle/Standort (dafür bräuchten wir ein globales „aktueller
Nutzer"-Konzept, das es im Tool noch nicht gibt) — das habe ich bewusst nicht verschwiegen.

Gemeinsame Stage-Gruppen-Zuordnung (`GLOBAL_STAGE_GROUP`) aus `ProcessTab.tsx` in
`lib/pipelineTemplates.ts` ausgelagert, damit Pipeline.tsx und der Job-Editor dieselbe
Logik nutzen (keine Doppelpflege). Live geprüft (Job-Wechsel, Ausgeschlossen-Ansicht,
Automatisierungs-Editor über Blitz-Symbol), `tsc --noEmit` sauber.

## Kandidat*innen-Detailseite komplett neu gebaut (2026-09-04)
`CandidateDetail.tsx` von einem einfachen 3-Tab-Verlauf (Verlauf/Bewertung/Absage) auf die
volle Recruitee-Struktur umgebaut, nach 6 Screenshots der echten Kandidat*innen-Ansicht —
**keine echten Personendaten übernommen**, nur Layout/Struktur (Test-Kandidat aus den
Screenshots durch bestehende Mock-Personen ersetzt, z. B. Tim Wagner als Beispiel mit
vollen Daten).

- **Kopf**: großer Avatar, Name (editierbar-Icon), Status-Badge mit Dropdown
  (Aktiv/Abgelaufen/Eingestellt/Abgesagt, funktional), rechts Einplanen/Teilen/Folgen/„⋯"
- **7 Tabs mit Live-Zählern** in der Tab-Leiste (Nachrichten/Ereignisse/Bewertung/Datei):
  - **Überblick**: Tags, Kontaktdaten (E-Mail/Telefon mit Kopieren-Icon), Details
    (Erstellungsdatum, Quelle, letzte Aktivität), Profilfelder (Geburtsdatum, Adresse,
    Fähigkeiten, Arbeit an Wochenenden, Sprachfähigkeiten — alle als Chips/Felder mit
    Ein-/Ausklappen), Lebenslauf (Datei/Erfahrung-Tabs, Leerzustand), Anschreiben
  - **Nachrichten**: E-Mail-Thread mit Betreff/Absender/Empfänger/Zeit/Anhang, Ein-/
    Ausgangszähler
  - **Ereignisse**: Geplant/Vergangen-Umschalter, nach Datum gruppiert, Avatar mit
    Bestätigungs-Haken (wiederverwendet aus `CalendarWidget`-Mustern)
  - **Bewertung**: Abgeschlossen/Ausstehend-Umschalter, Zusammenfassung mit
    Donut-Diagramm (Ø-Score), Balkendiagramm „Klares nein…Klares ja" je Frage
  - **Datei**: Datei-Grid, Upload-Button (Platzhalter)
  - **Aktivität**: Alle/Automatisierungen-Filter, nach Datum gruppiert, automatisierte
    Einträge mit Blitz-Icon + E-Mail-Vorschau-Box
  - **WhatsApp**: Platzhalter (kein Screenshot vorhanden, wie bei den Job-Editor-Tabs)
- **Rechte Seitenleiste** (auf allen Tabs sichtbar): „Deine Bewertung"-Badge + Zuweisen,
  Info-Box zum zugewiesenen Job (oder „keinen Jobs zugewiesen"), Aufgaben-Liste (mit
  Erledigt-Ausblenden), Notizen-Liste (Avatar/Name/Zeit/Text/Reagieren) — beide mit
  funktionierendem Hinzufügen-Feld

Datenmodell in `types.ts` erweitert (`Candidate` um Status/Tags/Profilfelder, neue Typen
`CandidateMessage/-Event/-Evaluation/-Note/-Task/-File/-Activity`), passende Mock-Daten
+ Getter in `client.mock.ts` und Platzhalter-Signaturen in `client.ts` ergänzt (gleiches
Muster wie überall im Projekt). Alte `TimelineEntry`/`getCandidateTimeline` ersatzlos
entfernt (nur von der alten Detailseite genutzt). Neue Dateien unter
`src/pages/candidateDetail/` (Sidebar + 6 Tab-Komponenten), neue Helper
`src/lib/relativeTime.ts` für Kurz- und Langform-Zeitangaben.

Live geprüft (alle 7 Tabs, Status-Dropdown, Donut/Balkendiagramm, leerer Kandidat ohne
Zusatzdaten zeigt korrekt „Nicht bewertet"/„keinen Jobs zugewiesen"/leere Listen),
`tsc --noEmit` sauber.

## Kandidat*innen-Ansicht als Pop-up statt eigener Seite (2026-09-04)
Nach Screenshot korrigiert: die Kandidat*innen-Ansicht ist jetzt ein **Pop-up über der
aktuellen Seite** (wie in Recruitee), keine eigene Seite mehr. Technisch über das
„Hintergrund-Route"-Muster gelöst (`App.tsx`: `InternalRoutes` rendert die normalen Seiten
weiter unter der Route, aus der heraus geöffnet wurde; das Pop-up liegt als zweite,
unabhängige `<Routes>` für `/kandidaten/:id` darüber) — Pipeline-Board, Dashboard etc.
bleiben im Hintergrund sichtbar/erhalten. Öffnen erfolgt überall im Tool über den neuen Hook
`useOpenCandidate()` (`lib/candidateNav.ts`) statt direktem `navigate()`.

- **Rahmen**: dunkler Overlay-Hintergrund, große Pop-up-Fläche (fast Vollbild), Klick auf
  den Hintergrund oder Esc schließt
- **Rechte Icon-Leiste** außerhalb der Fläche: Schließen (X), Nächste*r/Vorherige*r
  Kandidat*in (← →) — wechselt innerhalb der Bewerber*innen desselben Jobs, ohne das Pop-up
  zu schließen; am Anfang/Ende der Liste deaktiviert
- **Sidebar-Job-Karte neu**: statt reinem Info-Text jetzt wie im Screenshot eine Mini-Karte
  mit Jobtitel + Link zur Pipeline, **Phasen-Dropdown** (alle Phasen der Stelle, Auswahl
  wechselt die Phase nur lokal/optisch) und **„Fortfahren"** (schiebt eine Phase weiter) /
  „Absagen" (aktuell ohne Funktion, wie andere Platzhalter-Aktionen)
- **Profilfelder ergänzt/umsortiert** nach Screenshot: Geburtsdatum, **Gehalt** (neu),
  Adresse, **Verfügbarkeit** (neu, nutzt vorhandenes `verfuegbarAb`), Sprachfähigkeiten,
  Fähigkeiten (jetzt mit „Mehr anzeigen (n)" bei vielen Chips), Arbeit an Wochenenden
- **Quelle** jetzt als entfernbarer Chip statt Klartext

**Bewusst nicht übernommen / offene Rückfrage an dich:**
- Der Screenshot zeigt unter dem Namen „Zustimmung erteilt (6M)" statt des Status-Badges
  (Aktiv/Abgelaufen/…), das ich vorher gebaut hatte — das sieht nach einer
  **DSGVO-Einwilligung mit Ablauf** aus, nicht nach Bewerbungsstatus. Habe das Status-Badge
  unverändert gelassen, bis geklärt ist, ob das ein zusätzliches Feld (Einwilligungsstatus)
  werden soll oder den Status ersetzt.
- Der eingebettete PDF-Viewer für den Lebenslauf (Zoom/Suche/Druck-Toolbar im Screenshot)
  wurde nicht gebaut — nur der bestehende Leer-/Datei-Zustand ist da.

`tsc --noEmit` sauber, live geprüft (Pop-up aus Pipeline und aus Dashboard geöffnet,
Vor/Zurück zwischen Kandidat*innen, Fortfahren-Button, Schließen kehrt korrekt zur
Hintergrundseite inkl. Scroll-Position zurück).

## Verwaltung aufgeräumt (2026-09-04)
Gemeinsam die 23 Verwaltungspunkte durchgegangen und entschieden:

- **Raus** (kein Bedarf für ein internes Team mit eigenem Standort-Vor-Ort-Betrieb):
  Meeting-Räume (Raumbuchung), Öffentliche Links zu Kandidat*innen (Read-only-Freigabe für
  Externe). Seiten + Routen entfernt.
- **Bleiben unverändert**: Angebotsschreiben, Empfehlungsportal, Unternehmenseinstellungen,
  Benutzerdefinierte Felder.
- **Intern/fest statt eigener Verwaltungspunkt**: DSGVO-Löschfristen und Gemeinsame
  Posteingänge brauchen keine eigene Seite mehr — die Werte (bewerbung@fun-zone.de /
  karriere@fun-zone.de, Löschfristen 180/365 Tage) sind jetzt fest in
  `src/lib/systemConfig.ts` hinterlegt und dort dokumentiert (Kommentar: ändert sich
  praktisch nie, wird bei Bedarf direkt im Code angepasst statt über ein UI). Seiten
  entfernt.
- **Kandidat*innen-Bewertung + Bewertungsformulare zusammengelegt**, neuer Punkt
  „Bewertungsformulare & Gesprächsvorlagen" (`EvaluationFormsPage.tsx`,
  `lib/evaluationForms.ts`) mit 3 Abschnitten:
  - Kriterien-Katalog (wie vorher)
  - Bewertungsformulare (Scorecards je Interview-Runde, wie vorher)
  - **Gesprächsvorlagen (neu)**: fertige Frageleitfäden inkl. Hinweisen für die
    interviewende Person, damit auch fachfremde Teammitglieder (z. B. ein*e Minijobber*in)
    Erstgespräche führen können. 2 Beispiele angelegt: „Erstkontakt Minijob/Teilzeit" und
    „Fachgespräch Standortleitung".
  - Diese Formulare/Vorlagen werden **je Job hinterlegt**: der bisher leere
    „Bewertungskit"-Tab im Job-Editor ist jetzt eine echte Ansicht
    (`EvaluationKitTab.tsx`) — pro Gesprächsphase der Stelle wählbar, welches
    Bewertungsformular und welche Gesprächsvorlage genutzt wird (lokale Auswahl, mit Link
    zurück zur Verwaltungsseite zum Pflegen der Kataloge).
- **„Berichte"-Navigationspunkt**: zeigt jetzt klein „(kommt ins MMT)" dahinter (Sidebar +
  Seiten-Untertitel), da Berichte/Analysen vom Management-Tool kommen, nicht von diesem
  Frontend gebaut werden.

`tsc --noEmit` sauber, live geprüft (Verwaltung-Übersicht, neue Bewertungsformulare-Seite,
Bewertungskit-Tab inkl. Dropdown-Auswahl, „Berichte (kommt ins MMT)" in der Sidebar).

## Nächster Schritt
Nutzer geht Settings-Tabelle + offene Punkte durch → daraus finales Datenmodell + Seiten
→ `Recruiting-Nachbau-Prompt.md` (analog CRM) → Bau.
