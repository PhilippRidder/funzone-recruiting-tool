import { CareerLayout } from '../../components/career/CareerLayout'
import { JobListSection } from '../../components/career/JobListSection'
import { StandorteFooter } from '../../components/career/StandorteFooter'

const STEPS = [
  { title: 'Erstgespräch', text: 'Im Erstgespräch lernen sich Bewerber und Unternehmen kennen. Es geht darum, einander vorzustellen, die Stelle und die Erwartungen zu besprechen und einen ersten persönlichen Eindruck zu gewinnen.' },
  { title: 'Probearbeiten', text: 'Beim Probearbeiten können Bewerber einen Einblick in den Arbeitsalltag bekommen und zeigen, wie sie Aufgaben praktisch umsetzen. Gleichzeitig kann das Team die Zusammenarbeit und Passung besser einschätzen.' },
  { title: 'Abschlussgespräch', text: 'Im Abschlussgespräch wird das Probearbeiten reflektiert. Bewerber erhalten Feedback und können offene Fragen stellen. Es wird besprochen, ob beide Seiten sich eine Zusammenarbeit vorstellen können.' },
  { title: 'Einstellung', text: 'Wenn beide Seiten überzeugt sind, folgt die Einstellung: Vertragsunterzeichnung, Klärung organisatorischer Punkte und Vorbereitung auf den Start im Unternehmen.' },
]

const PROFILES = [
  { title: 'Standortleitung', bullets: ['Gesamtverantwortung für einen Standort: Betrieb, Teamleitung, Gästeerlebnis und Ergebnisverantwortung', 'Nachhaltige Ausrichtung der Qualität, des Services und der Sicherheitsstandards', 'Steuerung und Optimierung aller Ablaufprozesse: Personal, Finanzen, Gästezufriedenheit', 'Entwicklung und Umsetzung von Standortstrategien und lokalen Marketingaktivitäten'] },
  { title: 'Stellv. Standortleitung', bullets: ['Unterstützung der Standortleitung bei allen betrieblichen und organisatorischen Aufgaben', 'Mitarbeit bei Personalverantwortung: Einsatzplanung, Mitarbeitermotivation und Förderung', 'Sicherstellung der Servicequalität und Einhaltung von Sicherheitsstandards', 'Vertretung der Standortleitung in ihrer Abwesenheit'] },
  { title: 'Servicemitarbeiter', bullets: ['Ansprechpartner*in für unsere Gäste – vor Ort, telefonisch und per E-Mail', 'Beratung zu Angeboten, Erlebnispaketen, Buchungen und Zusatzleistungen', 'Sicherstellung eines hervorragenden Gästeservices', 'Pflege der Feedback-Prozesse, Erfassung von Gästewünschen'] },
]

export function CareerProcess() {
  return (
    <CareerLayout heading="Prozess & Stellenprofile">
      <div className="cp-section">
        <div className="cp-h2">Wie wir einstellen</div>
        {STEPS.map((s, i) => (
          <div className="cp-step" key={s.title}>
            <div className="cp-step-num">{i + 1}</div>
            <div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          </div>
        ))}

        <div style={{ height: 30 }} />

        {PROFILES.map((p) => (
          <div className="cp-profile-card" key={p.title}>
            <h3>{p.title}</h3>
            <ul>
              {p.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        ))}

        <div style={{ height: 20 }} />
        <JobListSection />
      </div>
      <StandorteFooter />
    </CareerLayout>
  )
}
