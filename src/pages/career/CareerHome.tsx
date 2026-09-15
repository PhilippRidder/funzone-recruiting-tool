import { useEffect, useState } from 'react'
import { CareerLayout } from '../../components/career/CareerLayout'
import { JobListSection } from '../../components/career/JobListSection'
import { ReviewsSection } from '../../components/career/ReviewsSection'
import { StandorteFooter } from '../../components/career/StandorteFooter'
import { loadCareerPageConfig, type CareerPageConfig } from '../../lib/careerPage'

const TEAM = [
  { role: 'Recruiting', name: 'Philipp Ridder', quote: 'Geil. Geiler. Am geilsten.', text: 'Philipp ist Recruiter bei FunZone Erlebniswelten und unterstützt dabei, dass unser Team stetig wächst und wir die passenden Talente finden. Er begleitet den gesamten Bewerbungsprozess, steht im engen Austausch mit den Standorten, prüft Bewerbungen, führt Gespräche mit Kandidaten und sorgt für eine positive Candidate Experience.', mediaLeft: false },
  { role: 'Marketing', name: 'Stefan Dickhäuser', quote: 'Wir sind ein Safe-Space untereinander.', text: 'Stefan ist Head of Marketing bei FunZone Erlebniswelten und verantwortet die Markenstrategie sowie alle Kommunikations- und Kampagnenaktivitäten. Mit seiner Erfahrung im Freizeitmarketing stärkt er die Markenpräsenz und sorgt dafür, dass FunZone erlebbar bleibt – online wie offline.', mediaLeft: true },
  { role: 'Firmenevents & Sales', name: 'Svenja Eikelmann', quote: 'Wir sind alles FunZone-Mäuse.', text: 'Svenja ist bei FunZone Erlebniswelten im Bereich Firmenkunden und Sales tätig. Sie entwickelt individuelle Angebote für Unternehmen, plant Events passgenau nach den Bedürfnissen der Kunden und sorgt dafür, dass jedes Teamerlebnis zu einem vollen Erfolg wird.', mediaLeft: true },
]

export function CareerHome() {
  const [config, setConfig] = useState<CareerPageConfig>(loadCareerPageConfig())

  useEffect(() => {
    setConfig(loadCareerPageConfig())
  }, [])

  return (
    <CareerLayout heading={config.heroTitle}>
      <div className="cp-section">
        <p className="cp-quote">"{config.quoteText}"</p>
        <div className="cp-quote-person">
          <div className="cp-avatar">{config.quotePerson.split(' ').map((s) => s[0]).join('')}</div>
          <div>
            <div className="name">{config.quotePerson}</div>
            <div className="role">{config.quoteRole}</div>
          </div>
        </div>
      </div>

      <div className="cp-section" style={{ paddingTop: 0 }}>
        <div className="cp-split">
          <div className="cp-split-card">
            <h2>{config.careerBlockTitle}</h2>
            <p>{config.careerBlockText}</p>
          </div>
          <div className="cp-media-placeholder" />
        </div>
      </div>

      <div className="cp-section">
        <div className="cp-h2">Das sagt unser Team</div>
        {TEAM.map((t) => (
          <div className="cp-team-row" key={t.name}>
            {t.mediaLeft ? (
              <>
                <TeamMedia quote={t.quote} name={t.name} role={t.role} />
                <TeamText role={t.role} text={t.text} />
              </>
            ) : (
              <>
                <TeamText role={t.role} text={t.text} />
                <TeamMedia quote={t.quote} name={t.name} role={t.role} />
              </>
            )}
          </div>
        ))}
      </div>

      <ReviewsSection />

      <div className="cp-section">
        <JobListSection />
      </div>

      <div className="cp-alerts">
        <h2>Job-Alerts</h2>
        <p>Du hast aktuell keinen passenden Job gefunden? Kein Problem! Melde dich für unseren Job-Newsletter an und verpasse keine Chance mehr auf neue Stellenangebote in deiner Umgebung.</p>
        <button className="cp-btn-white">Subscribe</button>
      </div>

      <StandorteFooter />
    </CareerLayout>
  )
}

function TeamText({ role, text }: { role: string; text: string }) {
  return (
    <div className="cp-team-text">
      <h3>{role}</h3>
      <p>{text}</p>
    </div>
  )
}

function TeamMedia({ quote, name, role }: { quote: string; name: string; role: string }) {
  return (
    <div className="cp-team-media">
      <div className="quote">„{quote}"</div>
      <div className="cp-play">▶</div>
      <div className="who">
        {name}
        <br />
        {role}
      </div>
    </div>
  )
}
