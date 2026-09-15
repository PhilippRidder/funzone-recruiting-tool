# Schulungsunterlage: FunZone Recruiting-Tool

> Diese Unterlage beschreibt das Recruiting-Tool aus Anwender*innen-Sicht: was man auf jeder
> Seite sieht, wie man die Funktionen bedient, und was in welcher Rolle sichtbar/erlaubt ist.
> Sie wird laufend mitgepflegt, während neue Bereiche gebaut werden — Stand entspricht immer
> dem aktuellen Bau-Stand (siehe `Recruiting-Tool-Scoping.md` für die Entscheidungs-Historie).
>
> **Wichtig für die Schulung:** Der aktuelle Stand ist eine reine Frontend-Ansicht mit
> Beispieldaten (Demo-/Mock-Modus), es gibt noch keine echte Backend-Anbindung. Das heißt:
> Eingaben, Phasenwechsel, Häkchen etc. sehen im Moment der Eingabe echt aus, werden aber
> **nicht dauerhaft gespeichert** — nach einem Neuladen der Seite ist wieder der Ausgangsstand
> da. Für die Schulung selbst ist das aber genau das, was am Ende im echten Tool passieren
> soll — es lohnt sich also, es genau so zu zeigen.

---

## 1. Rollen im Tool

Unter **Verwaltung → Nutzungsrollen** ist ein vollständiger Rechte-Katalog hinterlegt
(ca. 48 Einzelrechte in 5 Themen-Reitern: Allgemein, Prozess, Funktionen, Unternehmen,
Add-ons). Jede der folgenden 11 Rollen hat eine eigene Auswahl daraus angehakt — die
Administrator*in-Rolle hat immer alles und lässt sich nicht bearbeiten.

| Rolle | Worauf sie sich in etwa beschränkt |
|---|---|
| **Administrator*in** | Voller Zugriff auf alles, inkl. Abrechnung, Sicherheitseinstellungen, Audit-Log. |
| **Geschäftsführung** | Fast alles außer reinen Admin-Themen (Abrechnung/API/WebHooks) — sieht alle Kandidat*innen, Jobs, Berichte, kann Karriereseite/Standorte/Rollen verwalten. |
| **Recruiting-Manager** | Voller operativer Zugriff auf Kandidat*innen, Jobs, Vorlagen, Postfach, Kalender, Jobbörsen, Angebotsschreiben — aber keine Unternehmens-/Rollen-Verwaltung. |
| **Standortleitung** | Voller Zugriff auf Kandidat*innen und Jobs (vermutlich nur die eigenen Standorte), Kern-Prozesseinstellungen, Posteingang/Kalender, Angebotsschreiben. |
| **stellvertretende Standortleitung** | Wie Standortleitung, aber ohne „Kandidat*innen löschen" und mit weniger Prozess-Einstellungen. |
| **Recruiting-Support** | Nur einfache Kandidat*innen-Mitarbeit (keine Löschung/Freigabe), Jobs nur ansehen, Posteingang/Kalender. |
| **Head of Marketing** | Jobs verwalten + veröffentlichen, Jobbörsen-Kampagnen, Berichts-Dashboards, Karriereseite bearbeiten. |
| **Head of Social Media** | Wie Marketing, aber nur kostenlose Jobbörsen (keine bezahlten Kampagnen). |
| **Head of Sales** | Nur einfache Kandidat*innen-Mitarbeit + Jobs ansehen/verwalten, Posteingang/Kalender — kein Prozess-/Unternehmens-Zugriff. |
| **Head of IT-Support** | Nur Jobs ansehen + verwalten, Posteingang ansehen. |
| **Head of Accounting** | Nur Berichts-Dashboards. |

**Hinweis für die Schulung:** Diese Demo-Ansicht simuliert aktuell **kein** Einloggen als
bestimmte Rolle — man sieht immer alles, unabhängig von der Rolle. Die Rollen-Tabelle oben
beschreibt, was **später im echten Tool** je nach Rolle sichtbar/erlaubt sein wird. Für die
Schulung heißt das: bei jedem Feature kurz sagen, welche Rolle(n) es typischerweise nutzen
(steht bei den einzelnen Abschnitten unten in Klammern).

---

## 2. Allgemeine Navigation

**Linke Sidebar** (immer sichtbar):
- **Start** — Dashboard mit Kennzahlen und Widgets
- **Stellen** — Übersicht aller offenen/archivierten Stellen
- **Stellenanträge** — Freigabe-Workflow für neue Stellen (bevor sie live gehen)
- **Talent Pools** — vorgemerkte Kandidat*innen, aktuell ohne passende Stelle
- **Berichte** *(kommt später aus dem Management-Tool, nicht aus diesem Frontend)*
- **Verwaltung** — alle Einstellungen/Stammdaten

**Obere Leiste**: Suchfeld („Bewerber & Stellen") und Glocke (Benachrichtigungen) — in
diesem Demo-Stand nur als Platzhalter ohne Funktion, kein Schulungsinhalt nötig.

---

## 3. Start (Dashboard)

*(alle Rollen — Inhalt der Widgets sollte sich später nach Rolle/Standort filtern)*

Die Startseite zeigt oben 4 Kennzahlen-Kacheln (Offene Bewerbungen, Überfällige
Kandidat*innen, Anstehende Interviews, Neue Bewerbungen heute) und darunter frei
zusammenstellbare **Widgets**. Über den Button „Widgets bearbeiten" oben rechts lässt sich
festlegen, welche der folgenden Widgets angezeigt werden (Auswahl wird im Browser gemerkt):

- **Kalender – diese Woche**: alle geplanten Termine/Gespräche dieser Woche, mit Mini-Monatskalender
- **Überfällige Kandidat*innen**: Liste der Bewerber*innen, die auf Rückmeldung warten
- **Aufgaben / To-Dos**: offene Aufgaben mit Fälligkeitsdatum
- **Anstehende Freigaben**: Stellenanträge, die auf Freigabe warten
- **Team-Aktivität**: Feed, wer zuletzt was gemacht hat
- **Jobübersicht**: aktive Stellen mit Kennzahlen auf einen Blick
- **Bewertungen ausstehend**: Kandidat*innen ohne abgeschlossene Bewertung
- **Zuletzt bearbeitet**: zuletzt angesehene Kandidat*innen/Stellen
- **DSGVO-Fristen fällig**, **Bald startende neue Mitarbeiter*innen**, **Empfehlungen**,
  **Portal-Performance** — jeweils eigene Kennzahl/Liste

---

## 4. Stellen

*(Recruiting-Manager, Standortleitung, Marketing/Social Media für Veröffentlichung)*

**Stellen-Board** (`/stellen`): alle Stellen als Karten, gruppiert nach Standort, mit
Filterreitern Alle/Aktiv/Gefolgt/Archiviert. Klick auf eine Karte öffnet die
**Bewerber-Pipeline** dieser Stelle; das Stift-Icon auf der Karte öffnet stattdessen direkt
den **Job-Editor**.

### Job-Editor (`/stellen/neu` bzw. „Bearbeiten")
Eine Stelle wird in 6 Reitern gepflegt:
1. **Jobdetails** — Titel, Abteilung/Standort, Tags/Portale, interne Priorität, Limit für
   Bewerbungen, Beschreibung/Anforderungen, Standort, Arbeitsmodell
2. **Bewerbung** — welche Felder das Bewerbungsformular abfragt, Pflicht/optional
3. **Team** — wer intern für diese Stelle zuständig ist (Entscheider*innen)
4. **Prozess** — welche Pipeline-Vorlage diese Stelle nutzt, mit allen Phasen im Überblick
5. **Karriereseite** — reine Information: die Stelle wird automatisch veröffentlicht,
   solange sie aktiv ist (keine Ein/Aus-Einstellung nötig), plus Button „Live-Ansicht
   öffnen" (springt zur echten öffentlichen Job-Seite)
6. **Empfehlungen** — *(Platzhalter, noch kein Screenshot vorhanden)*

Oben im Editor: „Teilen", „Vorschau", Veröffentlicht-Status und der Haupt-Button
„Stelle veröffentlichen" / „Änderungen veröffentlichen".

---

## 5. Bewerber-Pipeline

*(alle mit Kandidaten-Zugriff — Recruiting-Manager, Standortleitung, Support)*

Öffnet sich beim Klick auf eine Stelle als Kanban-Board mit den **9 Standard-Phasen**:
Gesourct → Beworben → In Bearbeitung → Erstgespräch Team → An Standort gesendet →
Probearbeiten + Bewertung → Drittgespräch Geschäftsführung → Angebot → Eingestellt.
(Je nach Pipeline-Vorlage der Stelle können es auch andere/weniger Phasen sein, siehe
Abschnitt „Pipeline-Vorlagen" unten.)

- **Kopfzeile**: Jobtitel mit Chevron zum schnellen **Wechsel in eine andere Stelle**
  (zeigt alle Stellen, zu denen man Freigabe hat), rechts Teilen/Vorschau/Abonnieren
- **Umschalter Qualifiziert/Ausgeschlossen**: Ausgeschlossen zeigt die Verteilung nach
  Absagegrund statt der Kanban-Spalten
- **Board-/Listen-Ansicht** umschaltbar
- Jede Spalte hat ein Blitz-Symbol (⚡) für die dort hinterlegte **Automatisierung** (z. B.
  „bei Verschieben in diese Phase automatisch eine E-Mail senden")
- Klick auf eine Bewerber-Karte öffnet die **Kandidat*innen-Ansicht** als Pop-up (siehe unten)

---

## 6. Kandidat*innen-Ansicht

*(alle mit Kandidaten-Zugriff)*

Öffnet sich als **Pop-up über der aktuellen Seite** (nicht als eigene Seite) — dahinter
bleibt z. B. das Pipeline-Board sichtbar. Oben rechts außerhalb des Pop-ups: Schließen (X)
und Vor/Zurück-Pfeile, um direkt zur nächsten/vorherigen Person **in derselben Stelle** zu
wechseln, ohne das Pop-up zu schließen.

**Kopf**: Avatar, Name, Status-Badge (Aktiv/Abgelaufen/Eingestellt/Abgesagt, per Klick
umschaltbar), Aktionen Einplanen/Teilen/Folgen.

**7 Reiter:**
1. **Überblick** — Tags, Kontaktdaten (mit Kopieren-Icon), Details (Erstellungsdatum,
   Quelle, letzte Aktivität), Profilfelder (Geburtsdatum, Gehalt, Adresse, Verfügbarkeit,
   Sprachen, Fähigkeiten, Wochenendarbeit), Lebenslauf-Upload, Anschreiben
2. **Nachrichten** — E-Mail-Verlauf mit der Person
3. **Ereignisse** — geplante/vergangene Termine (Interviews)
4. **Bewertung** — Zusammenfassung mit Punktzahl-Diagramm, Detailauswertung je Bewertungsfrage
5. **Datei** — hochgeladene Dokumente
6. **Aktivität** — kompletter Verlauf aller Aktionen (auch automatisierte), chronologisch
7. **WhatsApp** — *(Platzhalter, noch kein Screenshot vorhanden)*

**Rechte Seitenleiste** (auf allen Reitern gleich sichtbar):
- Eigene Bewertung + „Zuweisen"-Button
- **Job-Karte**: zeigt die aktuelle Pipeline-Phase als Dropdown (umschaltbar) sowie die
  Buttons **„Absagen"** und **„Fortfahren"** (schiebt eine Phase weiter)
- **Aufgaben**-Liste (mit erledigt/offen)
- **Notizen**-Liste (Team-Kommentare)

---

## 7. Kandidat*in hinzufügen

*(alle mit „Kandidat*innen verwalten"-Recht)*

Über den Button auf der Pipeline-Seite, drei Modi zum Umschalten:
1. **Manuell erfassen** — normales Formular
2. **Von LinkedIn importieren** — URL eingeben, „Profil importieren" füllt die Felder
   automatisch (simuliert; echtes Auslesen ist ein späteres Backend-Thema)
3. **Lebenslauf hochladen** — Datei hochladen, „Lebenslauf analysieren" liest die Felder
   automatisch aus (ebenfalls simuliert) — erkannte Felder bekommen ein grünes „✓ erkannt"

---

## 8. Talent Pools

*(Recruiting-Manager, Standortleitung)*

Sammlung von Kandidat*innen, die aktuell zu keiner offenen Stelle passen, aber für später
vorgemerkt sind (mit Tags und eigener Notiz je Eintrag).

---

## 9. Stellenanträge

*(Standortleitung beantragt, Geschäftsführung/HR gibt frei)*

Freigabe-Workflow, bevor eine neue Stelle live geht: wer eine Stelle beantragen darf
(Standortleitung) vs. wer sie freigibt (HR/Geschäftsführung), inkl. Anlass
(Ersatz/Neu/Wachstum), gewünschtem Starttermin und Budget-/Gehaltsrahmen.

---

## 10. Verwaltung

*(je nach Punkt unterschiedliche Rollen — siehe Abschnitt 1)*

Vier Reiter, analog zu den echten Recruitee-Einstellungen:

**Mein Konto** *(jede Person für sich selbst)*
- **Profil** — E-Mail-Einstellungen, Kalender-Verbindung, Darstellung (Hell/Dunkel/System)
- **Benachrichtigungen** — Web/Mobil/E-Mail je Ereignis-Typ

**Allgemein** *(v. a. Geschäftsführung/Recruiting-Manager)*
- **Unternehmenseinstellungen** — Branding, Absenderadresse
- **Teammitglieder** — Nutzerliste, Standortzuordnung
- **Nutzungsrollen** — die 11 Rollen aus Abschnitt 1, Rechte je Rolle an-/abhakbar
- **Standorte** — die FunZone-Standorte
- **Empfehlungsportal** — Mitarbeiter-Empfehlungsprogramm
- **Karriereseite** — Editor für die öffentliche Jobseite (siehe Abschnitt 11)

**Prozess** *(Recruiting-Manager)*
- **Benutzerdefinierte Felder** — zusätzliche Kandidat*innen-Felder
- **Absagegründe** — 12 Gründe, je mit Flag „löst automatische Absage-Mail aus"
- **Tags und Quellen** — freie Kennzeichnung + Herkunft der Bewerbung (fürs Reporting)
- **Ereignis-Planer** — Interviews laufen über Microsoft Teams
- **Automatisierungen** — Auto-Mails/Erinnerungen bei bestimmten Auslösern

**Vorlagen** *(Recruiting-Manager)*
- **Pipeline-Vorlagen** — mehrere Pipeline-Varianten je Job-Kategorie (Minijob/Teilzeit,
  Vollzeit, Stellv. Standortleitung, Standortleitung/Filialleitung), Phasen frei anpassbar,
  je Phase eine eigene Automatisierung hinterlegbar
- **E-Mail-Vorlagen** — Eingang, Einladung, Zu-/Absage
- **Bewertungsformulare & Gesprächsvorlagen** — Kriterien-Katalog (Auftreten, Erfahrung,
  Verfügbarkeit, Motivation), Scorecards je Interview-Runde, sowie **Gesprächsvorlagen**:
  fertige Frageleitfäden, damit auch fachfremde Teammitglieder (z. B. Minijobber*innen)
  Erstgespräche führen können
- **Fragebögen** — Screening-Fragen, die Bewerber*innen beim Bewerben beantworten
- **Angebotsschreiben** — Vertrags-/Angebotsvorlagen je Position

---

## 11. Öffentliche Karriereseite

*(Marketing/Social Media pflegen die Inhalte, alle Bewerber*innen als Besucher)*

Eigenständiger öffentlicher Bereich unter `/karriere` (kein Login, eigenes helles
Branding, kein internes Menü) — Nachbau von karriere.fun-zone.de:
- **Startseite**: Hero, Marken-Grid aller Entertainment-Marken, Team-Zitate, Bewertungen
  (Kununu/Indeed/Google), offene Stellen, Standorte
- **Über uns**, **Offene Stellen**, **Prozess & Stellenprofile**
- **Job-Detailseite** je Stelle mit Bewerbungsformular (Kontaktdaten, Lebenslauf-/
  Anschreiben-Upload)

Über **Verwaltung → Karriereseite** lassen sich aktuell Hero-Überschrift, Zitat+Person,
Karriere-Block-Text und die Kontaktperson bearbeiten — Team-Zitate, Bewertungen,
Prozess-Schritte, Stellenprofile und Standorte-Liste sind aktuell noch fest hinterlegt.
