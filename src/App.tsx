import { HashRouter, Route, Routes, useLocation } from 'react-router-dom'
import type { Location } from 'react-router-dom'
import { Layout } from './components/Layout'
import { CandidateModal } from './pages/candidateDetail/CandidateModal'
import { Dashboard } from './pages/Dashboard'
import { Pipeline } from './pages/Pipeline'
import { Jobs } from './pages/Jobs'
import { JobEditor } from './pages/jobEditor/JobEditor'
import { TalentPools } from './pages/TalentPools'
import { Reports } from './pages/Reports'
import { Verwaltung } from './pages/Verwaltung'
import { RejectionReasons } from './pages/RejectionReasons'
import { Roles } from './pages/Roles'
import { Automations } from './pages/Automations'
import { NewCandidate } from './pages/NewCandidate'
import { CareerPageEditor } from './pages/CareerPageEditor'
import { CareerHome } from './pages/career/CareerHome'
import { CareerAbout } from './pages/career/CareerAbout'
import { CareerJobs } from './pages/career/CareerJobs'
import { CareerProcess } from './pages/career/CareerProcess'
import { CareerJobDetail } from './pages/career/CareerJobDetail'
import { StellenantraegePage } from './pages/settings/StellenantraegePage'
import { PipelinePhasesPage } from './pages/settings/PipelinePhasesPage'
import { EvaluationFormsPage } from './pages/settings/EvaluationFormsPage'
import { CustomFieldsPage } from './pages/settings/CustomFieldsPage'
import { TagsSourcesPage } from './pages/settings/TagsSourcesPage'
import { EventPlannerPage } from './pages/settings/EventPlannerPage'
import { CompanySettingsPage } from './pages/settings/CompanySettingsPage'
import { TeamMembersPage } from './pages/settings/TeamMembersPage'
import { LocationsSettingsPage } from './pages/settings/LocationsSettingsPage'
import { ReferralProgramPage } from './pages/settings/ReferralProgramPage'
import { EmailTemplatesPage } from './pages/settings/EmailTemplatesPage'
import { QuestionnairesPage } from './pages/settings/QuestionnairesPage'
import { OfferLetterTemplatesPage } from './pages/settings/OfferLetterTemplatesPage'
import { AccountProfilePage } from './pages/account/AccountProfilePage'
import { AccountNotificationsPage } from './pages/account/AccountNotificationsPage'

// Rendert die Hauptseiten unter der Hintergrund-Route, wenn die Kandidat*innen-Ansicht als
// Pop-up geöffnet ist (siehe useOpenCandidate/CandidateModal) – dadurch bleibt z. B. das
// Pipeline-Board sichtbar, während das Pop-up darüber liegt (wie in Recruitee).
function InternalRoutes() {
  const location = useLocation()
  const backgroundLocation = (location.state as { backgroundLocation?: Location } | null)?.backgroundLocation

  return (
    <>
      <Routes location={backgroundLocation ?? location}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/pipeline" element={<Pipeline />} />
        <Route path="/pipeline/neu" element={<NewCandidate />} />
        <Route path="/stellen" element={<Jobs />} />
        <Route path="/stellen/neu" element={<JobEditor />} />
        <Route path="/stellen/:jobId/bearbeiten" element={<JobEditor />} />
        <Route path="/stellen/:jobId/pipeline" element={<Pipeline />} />
        <Route path="/talentpools" element={<TalentPools />} />
        <Route path="/berichte" element={<Reports />} />
        <Route path="/verwaltung" element={<Verwaltung />} />
        <Route path="/verwaltung/mein-konto/profil" element={<AccountProfilePage />} />
        <Route path="/verwaltung/mein-konto/benachrichtigungen" element={<AccountNotificationsPage />} />
        <Route path="/verwaltung/absagegruende" element={<RejectionReasons />} />
        <Route path="/verwaltung/nutzungsrollen" element={<Roles />} />
        <Route path="/verwaltung/karriereseite" element={<CareerPageEditor />} />
        <Route path="/verwaltung/automatisierungen" element={<Automations />} />
        <Route path="/verwaltung/stellenantraege" element={<StellenantraegePage />} />
        <Route path="/verwaltung/pipeline-phasen" element={<PipelinePhasesPage />} />
        <Route path="/verwaltung/felder" element={<CustomFieldsPage />} />
        <Route path="/verwaltung/tags-quellen" element={<TagsSourcesPage />} />
        <Route path="/verwaltung/ereignis-planer" element={<EventPlannerPage />} />
        <Route path="/verwaltung/unternehmen" element={<CompanySettingsPage />} />
        <Route path="/verwaltung/team" element={<TeamMembersPage />} />
        <Route path="/verwaltung/standorte" element={<LocationsSettingsPage />} />
        <Route path="/verwaltung/empfehlungsportal" element={<ReferralProgramPage />} />
        <Route path="/verwaltung/email-vorlagen" element={<EmailTemplatesPage />} />
        <Route path="/verwaltung/bewertungsformulare" element={<EvaluationFormsPage />} />
        <Route path="/verwaltung/fragebogen" element={<QuestionnairesPage />} />
        <Route path="/verwaltung/angebotsschreiben" element={<OfferLetterTemplatesPage />} />
      </Routes>
      <Routes>
        <Route path="/kandidaten/:id" element={<CandidateModal />} />
      </Routes>
    </>
  )
}

export function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/karriere" element={<CareerHome />} />
        <Route path="/karriere/ueber-uns" element={<CareerAbout />} />
        <Route path="/karriere/offene-stellen" element={<CareerJobs />} />
        <Route path="/karriere/prozess" element={<CareerProcess />} />
        <Route path="/karriere/job/:jobId" element={<CareerJobDetail />} />
        <Route
          path="*"
          element={
            <Layout>
              <InternalRoutes />
            </Layout>
          }
        />
      </Routes>
    </HashRouter>
  )
}
