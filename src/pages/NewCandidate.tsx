import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getJobs } from '../api/client'
import { IconArrowLeft } from '../components/Icons'
import type { Job } from '../types'

type Mode = 'manual' | 'linkedin' | 'upload'

interface FormState {
  name: string
  email: string
  phone: string
  jobId: string
  source: string
  fuehrerschein: boolean
  verfuegbarAb: string
  erfahrung: string
}

const EMPTY: FormState = { name: '', email: '', phone: '', jobId: '', source: 'Initiativ', fuehrerschein: false, verfuegbarAb: '', erfahrung: '' }

// Simuliert, was ein Lebenslauf-Parser (Backend/KI) liefern würde – hier nur als Demo.
const PARSED_FROM_CV: FormState = {
  name: 'Kevin Brandt',
  email: 'kevin.brandt@example.com',
  phone: '+49 151 22334455',
  jobId: '',
  source: 'Lebenslauf-Upload',
  fuehrerschein: true,
  verfuegbarAb: new Date(Date.now() + 14 * 86_400_000).toISOString().slice(0, 10),
  erfahrung: '3 Jahre Erfahrung im Gastronomie-/Servicebereich, zuletzt als Teamleiter in einem Freizeitpark.',
}

const PARSED_FROM_LINKEDIN: FormState = {
  name: 'Melina Sauer',
  email: 'melina.sauer@example.com',
  phone: '+49 160 9988771',
  jobId: '',
  source: 'LinkedIn',
  fuehrerschein: false,
  verfuegbarAb: new Date(Date.now() + 30 * 86_400_000).toISOString().slice(0, 10),
  erfahrung: 'Aktuell Werkstudentin im Eventmanagement, sucht Werkstudentenstelle in der Freizeitbranche.',
}

export function NewCandidate() {
  const navigate = useNavigate()
  const [jobs, setJobs] = useState<Job[]>([])
  const [mode, setMode] = useState<Mode>('manual')
  const [linkedinUrl, setLinkedinUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<FormState>(EMPTY)
  const [autoFilled, setAutoFilled] = useState(false)

  useEffect(() => {
    getJobs().then(setJobs)
  }, [])

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((f) => ({ ...f, [key]: value }))

  const switchMode = (m: Mode) => {
    setMode(m)
    setForm(EMPTY)
    setAutoFilled(false)
  }

  const runImport = (source: 'upload' | 'linkedin') => {
    setLoading(true)
    setTimeout(() => {
      setForm(source === 'upload' ? PARSED_FROM_CV : PARSED_FROM_LINKEDIN)
      setAutoFilled(true)
      setLoading(false)
    }, 1400)
  }

  const Recognized = () =>
    autoFilled ? <span style={{ marginLeft: 8, fontSize: 11, color: 'var(--green)', fontWeight: 600 }}>✓ erkannt</span> : null

  return (
    <div className="page">
      <button className="detail-back" onClick={() => navigate('/pipeline')}>
        <IconArrowLeft size={14} /> Zurück zur Pipeline
      </button>
      <div className="page-header">
        <div>
          <h1 className="page-title">Kandidat*in hinzufügen</h1>
          <p className="page-subtitle">Manuell erfassen, per LinkedIn importieren oder Lebenslauf hochladen und automatisch auslesen lassen.</p>
        </div>
      </div>

      <div className="job-select" style={{ marginBottom: 20 }}>
        <button className={'job-pill' + (mode === 'manual' ? ' active' : '')} onClick={() => switchMode('manual')}>
          Manuell erfassen
        </button>
        <button className={'job-pill' + (mode === 'linkedin' ? ' active' : '')} onClick={() => switchMode('linkedin')}>
          Von LinkedIn importieren
        </button>
        <button className={'job-pill' + (mode === 'upload' ? ' active' : '')} onClick={() => switchMode('upload')}>
          Lebenslauf hochladen
        </button>
      </div>

      <div className="form-card">
        {mode === 'linkedin' && (
          <>
            <div className="form-section-title">LinkedIn-Import</div>
            <div className="form-row">
              <div className="form-field full">
                <label>LinkedIn-Profil-URL</label>
                <input value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} placeholder="https://www.linkedin.com/in/…" />
              </div>
            </div>
            <button className="btn btn-primary" disabled={loading} onClick={() => runImport('linkedin')}>
              {loading ? 'Importiere…' : 'Profil importieren'}
            </button>
            <p className="stat-card-desc" style={{ marginTop: 10 }}>
              Simuliert im Demo-Stand – der echte Import (LinkedIn-API/Scraping-Freigabe) ist ein Backend-Thema für später.
            </p>
          </>
        )}

        {mode === 'upload' && (
          <>
            <div className="form-section-title">Lebenslauf hochladen</div>
            <div className="cp-upload" style={{ borderColor: 'var(--border-strong)', color: 'var(--text-muted)' }}>
              <strong style={{ color: 'var(--text)' }}>Datei hochladen</strong> oder Datei hier hinziehen
              <br />
              Akzeptierte Dateien: PDF, DOC, DOCX bis 20 MB.
            </div>
            <button className="btn btn-primary" style={{ marginTop: 14 }} disabled={loading} onClick={() => runImport('upload')}>
              {loading ? 'Lebenslauf wird analysiert…' : 'Lebenslauf analysieren'}
            </button>
            <p className="stat-card-desc" style={{ marginTop: 10 }}>
              Simuliert im Demo-Stand – die echte Texterkennung (z. B. KI-Parsing von Name, Kontakt, Erfahrung) ist ein
              Backend-Thema für später und wird hier nur als Ansicht vorweggenommen.
            </p>
          </>
        )}

        {(mode === 'manual' || autoFilled) && (
          <>
            <div className="form-section-title">Kontaktdaten</div>
            <div className="form-row">
              <div className="form-field full">
                <label>
                  Name <Recognized />
                </label>
                <input value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Vor- und Nachname" />
              </div>
              <div className="form-field">
                <label>
                  E-Mail <Recognized />
                </label>
                <input value={form.email} onChange={(e) => set('email', e.target.value)} />
              </div>
              <div className="form-field">
                <label>
                  Telefon <Recognized />
                </label>
                <input value={form.phone} onChange={(e) => set('phone', e.target.value)} />
              </div>
            </div>

            <div className="form-section-title">Zuordnung</div>
            <div className="form-row">
              <div className="form-field">
                <label>Stelle</label>
                <select value={form.jobId} onChange={(e) => set('jobId', e.target.value)}>
                  <option value="">Keiner Stelle zuordnen (Talent Pool)</option>
                  {jobs.map((j) => (
                    <option key={j.id} value={j.id}>
                      {j.title} · {j.standort}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-field">
                <label>
                  Quelle <Recognized />
                </label>
                <input value={form.source} onChange={(e) => set('source', e.target.value)} />
              </div>
              <div className="form-field">
                <label>
                  Verfügbar ab <Recognized />
                </label>
                <input type="date" value={form.verfuegbarAb} onChange={(e) => set('verfuegbarAb', e.target.value)} />
              </div>
              <div className="form-field">
                <label>
                  Führerschein <Recognized />
                </label>
                <select value={form.fuehrerschein ? 'ja' : 'nein'} onChange={(e) => set('fuehrerschein', e.target.value === 'ja')}>
                  <option value="nein">Nein</option>
                  <option value="ja">Ja</option>
                </select>
              </div>
              {form.erfahrung && (
                <div className="form-field full">
                  <label>
                    Berufserfahrung <Recognized />
                  </label>
                  <textarea value={form.erfahrung} onChange={(e) => set('erfahrung', e.target.value)} />
                </div>
              )}
            </div>

            <div className="form-actions">
              <button className="btn btn-primary" onClick={() => navigate('/pipeline')}>
                Kandidat*in anlegen
              </button>
              <button className="btn" onClick={() => navigate('/pipeline')}>
                Abbrechen
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
