import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getJob } from '../../api/client'
import { CareerLayout } from '../../components/career/CareerLayout'
import type { Job } from '../../types'

export function CareerJobDetail() {
  const { jobId } = useParams()
  const navigate = useNavigate()
  const [job, setJob] = useState<Job | undefined>()
  const [tab, setTab] = useState<'details' | 'bewerbung'>('details')
  const [wantsCoverLetterText, setWantsCoverLetterText] = useState(false)

  useEffect(() => {
    if (jobId) getJob(jobId).then(setJob)
  }, [jobId])

  if (!job) {
    return (
      <CareerLayout heading="Stelle">
        <div className="cp-section">Lade…</div>
      </CareerLayout>
    )
  }

  return (
    <CareerLayout heading={job.title}>
      <div className="cp-jobhead" style={{ marginTop: -1 }}>
        <div className="cp-jobhead-meta">
          <span>vor Ort</span>
          <span>{job.standort}, Deutschland</span>
          <span>{job.salaryRange}</span>
          <span>FunZone {job.standort}</span>
        </div>
      </div>

      <div className="cp-tabs">
        <button className={tab === 'details' ? 'active' : ''} onClick={() => setTab('details')}>
          Jobdetails
        </button>
        <button className={tab === 'bewerbung' ? 'active' : ''} onClick={() => setTab('bewerbung')}>
          Bewerbung
        </button>
      </div>

      {tab === 'details' && (
        <div className="cp-jobdesc">
          <h3>Was du bei uns machst</h3>
          <p>Du bist als {job.title.split('(')[0].trim()} ein wichtiger Teil unseres Teams am Standort {job.standort} und sorgst gemeinsam mit deinen Kolleg*innen für ein unvergessliches Gästeerlebnis.</p>
          <h3>Was wir bieten</h3>
          <ul>
            <li>Feste, planbare Arbeitszeiten – Dienstplan im Voraus</li>
            <li>Mitarbeiterrabatte bei zahlreichen Partnern</li>
            <li>Kostenfreie Nutzung aller FunZone Freizeitentertainments</li>
            <li>Strukturierte Einarbeitung und Weiterentwicklungsmöglichkeiten</li>
            <li>Flache Hierarchien und kurze Entscheidungswege</li>
          </ul>
          <h3>Das bringst du mit</h3>
          <ul>
            <li>Freude am Umgang mit Menschen und Gästen</li>
            <li>Zuverlässigkeit und Teamgeist</li>
            <li>Flexibilität, auch an Wochenenden/Feiertagen zu arbeiten</li>
          </ul>
          <button className="cp-btn-black" style={{ marginTop: 20 }} onClick={() => setTab('bewerbung')}>
            Jetzt bewerben
          </button>
        </div>
      )}

      {tab === 'bewerbung' && (
        <div className="cp-apply">
          <h3>Meine Daten</h3>
          <p className="hint">Bitte geben Sie Ihre Kontaktdaten an</p>

          <div className="public-field">
            <label>
              Vor- und Nachname <span className="req">*</span>
            </label>
            <input placeholder="Vor- und Nachname" />
          </div>
          <div className="public-field">
            <label>
              E-Mail-Adresse <span className="req">*</span>
            </label>
            <input placeholder="Ihre E-Mail-Adresse" />
          </div>
          <div className="public-field">
            <label>
              Telefonnummer <span className="req">*</span>
            </label>
            <div style={{ display: 'flex', gap: 8 }}>
              <select style={{ border: '1px solid #d7d9de', borderRadius: 8, padding: '10px 8px', fontSize: 13.5 }}>
                <option>🇩🇪 Deutschland</option>
              </select>
              <input placeholder="+49" style={{ flex: 1 }} />
            </div>
          </div>

          <h3>Lebenslauf</h3>
          <p className="hint">Lebenslauf hochladen</p>
          <div className="cp-upload">
            <strong>Datei hochladen</strong> oder Datei hier hinziehen
            <br />
            Akzeptierte Dateien: PDF, DOC, DOCX, JPEG und PNG bis zu 50 MB.
          </div>

          <h3>Anschreiben</h3>
          <p className="hint">Laden Sie Ihr Anschreiben hoch</p>
          {!wantsCoverLetterText ? (
            <>
              <div className="cp-upload">
                <strong>Datei hochladen</strong> oder Datei hier hinziehen
                <br />
                Akzeptierte Dateien: PDF, DOC, DOCX, JPEG und PNG bis zu 50 MB.
              </div>
              <p className="hint">
                <a onClick={() => setWantsCoverLetterText(true)} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                  Stattdessen hier schreiben
                </a>
              </p>
            </>
          ) : (
            <textarea rows={5} placeholder="Ihr Anschreiben …" style={{ width: '100%', border: '1px solid #d7d9de', borderRadius: 8, padding: 10, fontFamily: 'inherit', fontSize: 13.5 }} />
          )}

          <p className="hint" style={{ marginTop: 20 }}>
            Alle mit <span className="req">*</span> gekennzeichneten Felder sind Pflichtfelder.
          </p>
          <button className="cp-btn-black" style={{ width: '100%', padding: 14 }} onClick={() => navigate('/karriere')}>
            Senden
          </button>
        </div>
      )}
    </CareerLayout>
  )
}
