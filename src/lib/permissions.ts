// Vollständiger Berechtigungskatalog – 1:1 aus Recruitee übernommen (Screenshots der
// Administrator*in-Rolle, 5 Tabs). Jede Rolle hat denselben Katalog, nur mit weniger
// angehakten Punkten. Administrator*in hat immer alle Punkte (nicht editierbar).

export type PermTab = 'Allgemein' | 'Prozess' | 'Funktionen' | 'Unternehmen' | 'Add-ons'

export interface Permission {
  id: string
  tab: PermTab
  section?: string
  title: string
  desc: string
  badge?: string
}

export const PERMISSIONS: Permission[] = [
  // Allgemein
  { id: 'highLevel', tab: 'Allgemein', title: 'Hochranginger Datenzugang', desc: 'Kann die unternehmensweiten SSO-Einstellungen und die Liste der kürzlich gelöschten Kandidat*innen verwalten sowie alle Notizen und Bewertungen löschen, einschließlich derer, die von anderen Teammitgliedern hinzugefügt wurden. Kann auf Audit-Logs zugreifen und diese exportieren. Kann außerdem DSGVO-Automatisierungen und EEO-Compliance konfigurieren sowie EEO-Berichte exportieren.' },
  { id: 'collab', tab: 'Allgemein', section: 'Grundlegende Berechtigungen', title: 'In Bezug auf Kandidat*innen zusammenarbeiten', desc: 'Kann eingeladen werden, nicht eingestellte Kandidat*innen zu prüfen. Kann Notizen und Bewertungen zu Kandidat*innen hinzufügen, die mit ihm*ihr geteilt wurden.' },
  { id: 'joinTeams', tab: 'Allgemein', section: 'Grundlegende Berechtigungen', title: 'Recruiting-Teams anschließen', desc: 'Kann zu einem Recruiting-Team eingeladen werden, wodurch er*sie die Möglichkeit bekommt, alle Bewerber*innen in einem bestimmten Job zu prüfen.' },
  { id: 'manageCandidates', tab: 'Allgemein', section: 'Kandidat*innen', title: 'Kandidat*innen verwalten', desc: 'Kann noch nicht eingestellte Kandidat*innen verwalten: hinzufügen, bearbeiten, zusammenführen und zwischen verschiedenen Phasen verschieben. Kann Tags und Quellen hinzufügen, bevorzugte berufliche Standorte bearbeiten und Dateien hochladen. Kann Kandidat*innen zu Jobs zuordnen und den DSGVO-Status verwalten.' },
  { id: 'deleteCandidates', tab: 'Allgemein', section: 'Kandidat*innen', title: 'Kandidat*innen löschen', desc: 'Kann jede*n Kandidat*in löschen, auf den der*die Nutzer*in Zugriff hat.' },
  { id: 'shareCandidates', tab: 'Allgemein', section: 'Kandidat*innen', title: 'Kandidat*innen teilen', desc: 'Darf Kandidat*innen mit anderen Teammitgliedern teilen und öffentliche Links für nicht zu FunZone Zugehörige erstellen.' },
  { id: 'viewHired', tab: 'Allgemein', section: 'Einstellungen', title: 'Eingestellte Kandidat*innen anzeigen', desc: 'Kann Kandidat*innen anzeigen, die als eingestellt markiert wurden.' },
  { id: 'manageHired', tab: 'Allgemein', section: 'Einstellungen', title: 'Eingestellte Kandidat*innen verwalten', desc: 'Kann Kandidat*innen als eingestellt markieren, sie zwischen Phasen verschieben, Tags und Quellen hinzufügen sowie Dateien in ihre Profile hochladen.' },
  { id: 'viewAllJobs', tab: 'Allgemein', section: 'Jobs', title: 'Alle vorhandenen Jobdaten anzeigen', desc: 'Kann alle Jobs, Talent Pools und alle Kandidat*innen innerhalb des Unternehmens anzeigen.' },
  { id: 'manageJobs', tab: 'Allgemein', section: 'Jobs', title: 'Jobs verwalten', desc: 'Können neue Jobs erstellen und vorhandene, auf die sie Zugriff haben, bearbeiten, löschen, duplizieren und archivieren. Können die automatische Bestätigungs-E-Mail, das Bewerbungsformular, die Pipeline und die aktivierten Sprachen ändern sowie Dateien zu diesen Jobs hochladen.' },
  { id: 'manageMatched', tab: 'Allgemein', section: 'Jobs', title: 'Gematchte Kandidat*innen verwalten', badge: 'NEU', desc: 'Darf passende Kandidat*innen für Jobs anzeigen und verwalten.' },
  { id: 'manageAutomations', tab: 'Allgemein', section: 'Jobs', title: 'Automatisierte Aktionen verwalten', desc: 'Kann automatisierte Aktionen in jedem Job verwalten, auf den der*die Nutzer*in Zugriff hat, sowie in den Absagegründen in den Einstellungen, wenn er*sie Zugriff darauf hat.' },
  { id: 'manageJobTeam', tab: 'Allgemein', section: 'Jobs', title: 'Team verwalten (pro Job)', desc: 'Kann Teammitglieder jedem Job zuweisen, auf den der*die Nutzer*in Zugriff hat.' },
  { id: 'publishJobs', tab: 'Allgemein', section: 'Jobs', title: 'Jobs veröffentlichen', desc: 'Kann Jobs veröffentlichen und planen.' },
  { id: 'manageReferralsPerJob', tab: 'Allgemein', section: 'Jobs', title: 'Empfehlungen (pro Job) verwalten', desc: 'Kann Empfehlungen pro Job aktivieren, Empfehlungseinstellungen anpassen und Belohnungen auswählen.' },

  // Prozess
  { id: 'customFieldsCreate', tab: 'Prozess', title: 'Benutzerdefinierte Felder erstellen', desc: 'Darf neue benutzerdefinierte Felder erstellen und bearbeiten.' },
  { id: 'customFieldsAddToModules', tab: 'Prozess', title: 'Benutzerdefinierte Felder zu Modulen hinzufügen', desc: 'Kann benutzerdefinierte Felder für Jobs, Jobvorlagen und Stellenanträge hinzufügen und entfernen.' },
  { id: 'manageTemplates', tab: 'Prozess', title: 'Vorlagen verwalten', desc: 'Kann alle in den Einstellungen verfügbaren Unternehmensvorlagen erstellen und ändern.' },
  { id: 'manageRejectionReasons', tab: 'Prozess', title: 'Disqualifizierungsgrund verwalten', desc: 'Kann in den Einstellungen Absagegründe hinzufügen und ändern.' },
  { id: 'manageTagsSources', tab: 'Prozess', title: 'Tags und Quellen verwalten', desc: 'Kann Tags und Quellen erstellen, die andere Teammitglieder verwenden können.' },
  { id: 'manageProfileFieldsPerJob', tab: 'Prozess', title: 'Profilfelder verwalten (pro Job)', desc: 'Kann Profilfelder in Profilen von Kandidat*innen und allen Jobs, auf die der*die Nutzer*in Zugriff hat, hinzufügen, aktualisieren und löschen. Kann auch die Sichtbarkeit von Profilfeldern in jedem Job verwalten.' },
  { id: 'manageScreeningQuestionsPerJob', tab: 'Prozess', title: 'Auswahlfragen verwalten (pro Job)', desc: 'Kann Auswahlfragen hinzufügen, aktualisieren, löschen und die Sichtbarkeit von Auswahlfragen in allen Jobs, auf die der*die Nutzer*in Zugriff hat, verwalten.' },
  { id: 'manageReferralTemplates', tab: 'Prozess', title: 'Verwalten von Vorlagen für Empfehlungen', desc: 'Kann Empfehlungsvorlagen in den Einstellungen erstellen und ändern.' },
  { id: 'exportData', tab: 'Prozess', title: 'Daten exportieren', desc: 'Kann CSV-Dateien mit Daten zu Kandidat*innen, Jobs oder Berichten, auf die der*die Nutzer*in Zugriff hat, exportieren. Kann Kandidat*innen-Profile kopieren, ausdrucken oder als PDF-Datei herunterladen.' },

  // Funktionen
  { id: 'viewInbox', tab: 'Funktionen', section: 'Posteingang', title: 'Posteingang anzeigen', desc: 'Kann auf E-Mails von Kandidat*innen zugreifen, die an persönliche und Team-Posteingänge gesendet wurden, E-Mails als gelesen/ungelesen markieren und auf E-Mails innerhalb des Profils eines*einer Kandidat*in zugreifen.' },
  { id: 'sendEmails', tab: 'Funktionen', section: 'Posteingang', title: 'E-Mails senden', desc: 'Kann E-Mails über den Posteingang und aus dem Kandidat*innenprofil heraus versenden, archivieren, löschen, beantworten und Dateien/Vorlagen an E-Mails anhängen sowie „private" E-Mail-Vorlagen erstellen und ändern (nicht sichtbar für andere).' },
  { id: 'manageEmailIntegrations', tab: 'Funktionen', section: 'Posteingang', title: 'E-Mail-Integrationen verwalten', desc: 'Kann den eigenen E-Mail-Account (Gmail, Outlook und andere) mit dem Posteingang im Recruiting-Tool synchronisieren.' },
  { id: 'viewSms', tab: 'Funktionen', section: 'SMS', title: 'SMS anzeigen', desc: 'Kann alle SMS und den SMS-Verlauf im Profil des*der Kandidat*in sehen.' },
  { id: 'sendSms', tab: 'Funktionen', section: 'SMS', title: 'SMS senden', desc: 'Kann SMS an den*die Kandidat*in senden, Nachrichten für einen späteren Zeitpunkt planen und die Zustimmung des*der Kandidat*in für SMS verwalten.' },
  { id: 'viewCalendar', tab: 'Funktionen', section: 'Kalender', title: 'Kalender anzeigen und synchronisieren', desc: 'Kann den Teamkalender anzeigen und eigenen Kalender synchronisieren.' },
  { id: 'planEvents', tab: 'Funktionen', section: 'Kalender', title: 'Ereignisse und Videoanrufe planen', desc: 'Kann Ereignisse und Videoanrufe planen und anzeigen sowie E-Mails im Zusammenhang mit Ereignissen versenden.' },
  { id: 'viewAcquisition', tab: 'Funktionen', section: 'Bewerben', title: 'Werben-Bereich anzeigen', desc: 'Kann auf die Akquisitions-Seite zugreifen und die Registerkarte „Kampagne" in Jobs aufrufen, auf die ein*e Nutzer*in Zugriff hat, und eine Liste der aktiven Kampagnen anzeigen.' },
  { id: 'postFreeJobBoards', tab: 'Funktionen', section: 'Bewerben', title: 'Auf kostenlosen Jobbörsen posten', desc: 'Kann Jobs in kostenlosen Jobbörsen ausschreiben.' },
  { id: 'postPremiumJobBoards', tab: 'Funktionen', section: 'Bewerben', title: 'Auf Premium-Jobbörsen posten', desc: 'Kann bezahlte Kampagnen erstellen und bearbeiten sowie auf Premium-Jobbörsen veröffentlichen.' },
  { id: 'buyNowPayLater', tab: 'Funktionen', section: 'Bewerben', title: 'Use Buy Now, Pay Later', desc: 'Can use Buy Now, Pay Later to order premium job board campaigns.' },
  { id: 'manageLoginIds', tab: 'Funktionen', section: 'Bewerben', title: 'Anmelde-IDs verwalten', desc: 'Darf Anmelde-IDs für die Jobbörsen hinzufügen, löschen und bearbeiten.' },
  { id: 'manageReportDashboards', tab: 'Funktionen', section: 'Berichts-Dashboards', title: 'Berichts-Dashboards verwalten', desc: 'Kann Berichts-Boards erstellen und ändern.' },
  { id: 'manageOfferLetters', tab: 'Funktionen', section: 'Angebotsschreiben', title: 'Angebotsschreiben verwalten', desc: 'Darf personalisierte Angebotsschreiben erstellen, bearbeiten und an Kandidat*innen senden.' },

  // Unternehmen
  { id: 'manageCompany', tab: 'Unternehmen', title: 'Unternehmen verwalten', desc: 'Kann Details in den Einstellungen für das Unternehmen, die Karriereseite und die Sprachen anpassen sowie Teamkalender und Besprechungsräume verwalten.' },
  { id: 'manageBilling', tab: 'Unternehmen', title: 'Abonnement und Rechnungen verwalten', desc: 'Kann sowohl Abonnementrechnungen als auch Kreditkarten- und Rechnungsinformationen verwalten.' },
  { id: 'manageMembersRoles', tab: 'Unternehmen', title: 'Mitglieder und Rollen verwalten', desc: 'Kann neue Teammitglieder hinzufügen, sie zu Rollen zuweisen und ihren Zugang zu Jobs oder Talent Pools anpassen. Kann Einladungen verwalten, Teammitglieder löschen und Rollen erstellen, ändern oder löschen. Kann Standardbenachrichtigungen für jede Rolle definieren.' },
  { id: 'manageGdprSettings', tab: 'Unternehmen', title: 'DSGVO-Einstellungen verwalten', desc: 'Kann unternehmensweite Daten zur DSGVO-Konformität verwalten.' },
  { id: 'manageReferralsCompany', tab: 'Unternehmen', title: 'Empfehlungen verwalten', desc: 'Kann Empfehlungen aktivieren und verwalten und das Empfehlungsportal anpassen.' },
  { id: 'manageSmsSending', tab: 'Unternehmen', title: 'Senden von SMS verwalten', desc: 'Kann das Senden von SMS verwalten und aktivieren.' },
  { id: 'manageLocations', tab: 'Unternehmen', title: 'Standorte verwalten', desc: 'Kann Standorte hinzufügen, bearbeiten, archivieren, wiederherstellen und löschen.' },

  // Add-ons
  { id: 'manageIntegrations', tab: 'Add-ons', title: 'Integrationen verwalten', desc: 'Kann Integrationen aktivieren und Einstellungen anpassen.' },
  { id: 'editCareerPage', tab: 'Add-ons', title: 'Karriereseite bearbeiten', desc: 'Kann die Karriereseite über den Baukasten für Karriereseiten bearbeiten.' },
  { id: 'manageJobsWidget', tab: 'Add-ons', title: 'Jobs-Widget verwalten', desc: 'Kann die Einstellungen des Job-Widgets anpassen und Jobs auf anderen Websites veröffentlichen.' },
  { id: 'manageApiTokens', tab: 'Add-ons', title: 'API-Tokens verwalten', desc: 'Kann persönliche API-Tokens erstellen und bearbeiten.' },
  { id: 'manageWebhooks', tab: 'Add-ons', title: 'WebHooks verwalten', desc: 'Kann Unternehmen-WebHooks konfigurieren und WebHook-Logs anzeigen.' },
]

export const PERM_TABS: PermTab[] = ['Allgemein', 'Prozess', 'Funktionen', 'Unternehmen', 'Add-ons']

const ALL_IDS = PERMISSIONS.map((p) => p.id)

const CANDIDATE_BASIC = ['collab', 'joinTeams', 'manageCandidates']
const CANDIDATE_FULL = [...CANDIDATE_BASIC, 'deleteCandidates', 'shareCandidates']
const HIRED_MANAGE = ['viewHired', 'manageHired']
const JOBS_VIEW = ['viewAllJobs']
const JOBS_MANAGE = ['viewAllJobs', 'manageJobs', 'manageMatched']
const JOBS_FULL = [...JOBS_MANAGE, 'manageAutomations', 'manageJobTeam', 'publishJobs', 'manageReferralsPerJob']
const PROCESS_CORE = ['manageRejectionReasons', 'manageTagsSources', 'manageProfileFieldsPerJob', 'manageScreeningQuestionsPerJob']
const PROCESS_FULL = ['customFieldsCreate', 'customFieldsAddToModules', 'manageTemplates', 'manageRejectionReasons', 'manageTagsSources', 'manageProfileFieldsPerJob', 'manageScreeningQuestionsPerJob', 'manageReferralTemplates', 'exportData']
const COMMS = ['viewInbox', 'sendEmails', 'manageEmailIntegrations', 'viewCalendar', 'planEvents']
const COMMS_BASIC = ['viewInbox', 'sendEmails', 'viewCalendar', 'planEvents']
const ACQUISITION_FULL = ['viewAcquisition', 'postFreeJobBoards', 'postPremiumJobBoards', 'buyNowPayLater', 'manageLoginIds']
const ACQUISITION_FREE = ['viewAcquisition', 'postFreeJobBoards']

export const ROLE_PERMISSIONS: Record<string, string[]> = {
  'Administrator*in': ALL_IDS,
  'Geschäftsführung': [
    ...CANDIDATE_FULL, ...HIRED_MANAGE, ...JOBS_FULL, ...PROCESS_FULL, ...COMMS,
    'viewSms', 'sendSms', ...ACQUISITION_FULL, 'manageReportDashboards', 'manageOfferLetters',
    'manageMembersRoles', 'manageGdprSettings', 'manageReferralsCompany', 'manageLocations', 'manageCompany',
    'editCareerPage',
  ],
  'Recruiting-Manager': [
    ...CANDIDATE_FULL, ...HIRED_MANAGE, ...JOBS_FULL, ...PROCESS_FULL, ...COMMS,
    'viewSms', 'sendSms', ...ACQUISITION_FULL, 'manageReportDashboards', 'manageOfferLetters',
  ],
  'Head of Marketing': [...JOBS_MANAGE, 'publishJobs', ...ACQUISITION_FULL, 'manageReportDashboards', 'editCareerPage'],
  'Head of Accounting': ['manageReportDashboards'],
  'Head of Sales': [...CANDIDATE_BASIC, ...JOBS_MANAGE, 'viewInbox', 'sendEmails', 'viewCalendar', 'planEvents'],
  'Head of Social Media': [...JOBS_MANAGE, 'publishJobs', ...ACQUISITION_FREE, 'manageReportDashboards', 'editCareerPage'],
  'Head of IT-Support': [...JOBS_VIEW, 'manageJobs', 'viewInbox'],
  'Standortleitung': [...CANDIDATE_FULL, ...HIRED_MANAGE, ...JOBS_FULL, ...PROCESS_CORE, ...COMMS_BASIC, 'manageOfferLetters'],
  'stellvertretende Standortleitung': [
    ...CANDIDATE_BASIC, 'shareCandidates', ...HIRED_MANAGE, ...JOBS_MANAGE, 'publishJobs',
    'manageTagsSources', 'manageProfileFieldsPerJob', ...COMMS_BASIC, 'manageOfferLetters',
  ],
  'Recruiting-Support': [...CANDIDATE_BASIC, ...JOBS_VIEW, 'viewInbox', 'sendEmails', 'viewCalendar', 'planEvents'],
}
