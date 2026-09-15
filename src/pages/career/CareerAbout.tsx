import { useEffect, useState } from 'react'
import { CareerLayout } from '../../components/career/CareerLayout'
import { ReviewsSection } from '../../components/career/ReviewsSection'
import { StandorteFooter } from '../../components/career/StandorteFooter'
import { loadCareerPageConfig, type CareerPageConfig } from '../../lib/careerPage'

export function CareerAbout() {
  const [config, setConfig] = useState<CareerPageConfig>(loadCareerPageConfig())

  useEffect(() => {
    setConfig(loadCareerPageConfig())
  }, [])

  return (
    <CareerLayout heading="Über uns">
      <div className="cp-section">
        <div className="cp-arrow-card">
          <div>
            <h3>Unser Grundsatz</h3>
            <p>{config.quoteText}</p>
          </div>
          <div className="cp-arrow">→</div>
        </div>
        <div className="cp-arrow-card">
          <div>
            <h3>Geschäftsführende Gesellschafter</h3>
            <p>Mit Erfahrung und Leidenschaft setzt sich unsere Geschäftsführung dafür ein, die Zukunft in der Freizeitbranche zu gestalten und zu prägen.</p>
          </div>
          <div className="cp-arrow">→</div>
        </div>
        <div className="cp-arrow-card">
          <div>
            <h3>Geschichte der FunZone</h3>
            <p>Wir lassen uns von unseren Werten leiten – und werden so in allen Bereichen unseres Unternehmens hohen Ansprüchen gerecht.</p>
          </div>
          <div className="cp-arrow">→</div>
        </div>

        <div style={{ height: 30 }} />

        <h3 style={{ fontSize: 20, marginBottom: 14 }}>Fragen & Kontakt</h3>
        <div className="cp-contact-card">
          <div className="cp-avatar" style={{ width: 60, height: 60, fontSize: 18 }}>
            {config.contactName.split(' ').map((s) => s[0]).join('')}
          </div>
          <div>
            <p style={{ margin: '0 0 10px', fontSize: 13.5, color: '#333' }}>
              Du hast Fragen zu unserem Unternehmen oder benötigst eine Auskunft zu unseren offenen Stellen? Unser Ansprechpartner {config.contactName} ist für dich da und freut sich auf deinen Anruf oder deine E-Mail.
            </p>
            <div style={{ fontSize: 13.5, fontWeight: 600 }}>E-Mail: {config.contactEmail}</div>
            <div style={{ fontSize: 13.5, fontWeight: 600 }}>Telefon: {config.contactPhone}</div>
          </div>
        </div>
      </div>

      <ReviewsSection />
      <StandorteFooter />
    </CareerLayout>
  )
}
