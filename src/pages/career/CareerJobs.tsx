import { CareerLayout } from '../../components/career/CareerLayout'
import { JobListSection } from '../../components/career/JobListSection'
import { StandorteFooter } from '../../components/career/StandorteFooter'

export function CareerJobs() {
  return (
    <CareerLayout heading="Offene Stellen">
      <div className="cp-section">
        <JobListSection />
      </div>
      <StandorteFooter />
    </CareerLayout>
  )
}
