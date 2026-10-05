import { useState, type ReactNode } from 'react'
import { IconArrowDown, IconCheck, IconChevronUp, IconCopy, IconMail, IconPaperclip, IconPlus, IconX } from '../../../components/Icons'
import { formatLongRelative } from '../../../lib/relativeTime'
import { evaluateCandidate, screeningSummary } from '../../../lib/screening'
import type { Candidate } from '../../../types'

function SectionPanel({ title, headerRight, children }: { title: string; headerRight?: ReactNode; children: ReactNode }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="panel">
      <div className="panel-head">
        <button
          onClick={() => setOpen((o) => !o)}
          style={{ background: 'none', border: 'none', padding: 0, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}
        >
          <span className="panel-head-title">{title}</span>
          {open ? <IconChevronUp size={13} /> : <IconArrowDown size={13} />}
        </button>
        {headerRight}
      </div>
      {open && children}
    </div>
  )
}

const formatDate = (iso: string) => new Date(iso).toLocaleDateString('de-DE', { day: '2-digit', month: 'short', year: 'numeric' })

const SKILLS_COLLAPSED_COUNT = 6

export function OverviewTab({ candidate }: { candidate: Candidate }) {
  const [tags, setTags] = useState(candidate.tags)
  const [skills, setSkills] = useState(candidate.skills)
  const [skillsExpanded, setSkillsExpanded] = useState(false)
  const [languages, setLanguages] = useState(candidate.languages)
  const [weekendWork, setWeekendWork] = useState(candidate.weekendWork ?? 'Nein')
  const [cvTab, setCvTab] = useState<'datei' | 'erfahrung'>('datei')
  const [sourceRemoved, setSourceRemoved] = useState(false)

  const visibleSkills = skillsExpanded ? skills : skills.slice(0, SKILLS_COLLAPSED_COUNT)
  const hiddenSkillsCount = skills.length - visibleSkills.length

  const copy = (value: string) => navigator.clipboard?.writeText(value).catch(() => {})

  const screeningResults = evaluateCandidate(candidate)
  const summary = screeningSummary(screeningResults)

  return (
    <>
      <div className="panel screening-panel">
        <div className="panel-head">
          <span className="panel-head-title">KI-Vorauswahl</span>
          <span className={'screening-badge ' + summary.empfehlung}>
            {summary.empfehlung === 'passt' ? '✓ Passt gut' : '⚠ Bitte prüfen'}
          </span>
        </div>
        <p className="stat-card-desc" style={{ marginTop: -4 }}>
          {summary.pflichtPassed}/{summary.pflichtTotal} Pflichtkriterien erfüllt · {summary.totalPassed}/{summary.total}{' '}
          Kriterien insgesamt
        </p>
        {screeningResults.map((r) => (
          <div className="field-row" key={r.criterion.id}>
            <span className="k" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {r.passed ? <IconCheck size={13} /> : <IconX size={13} />}
              {r.criterion.label}
              {r.criterion.pflicht && <span style={{ color: 'var(--text-faint)' }}>*</span>}
            </span>
            <span className="v">{r.note}</span>
          </div>
        ))}
        <p className="screening-disclaimer">
          Automatische Vorauswahl auf Basis des Profils/Lebenslaufs (* = Pflichtkriterium) — ersetzt keine
          menschliche Prüfung. Die Entscheidung über Einladung oder Absage triffst du.
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <span style={{ fontWeight: 700, fontSize: 12.5, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Tags</span>
        <div className="chip-row" style={{ margin: 0 }}>
          {tags.map((t) => (
            <span className="chip" key={t}>
              {t}
              <button onClick={() => setTags((ts) => ts.filter((x) => x !== t))}>×</button>
            </span>
          ))}
          <button className="chip-add">
            <IconPlus size={12} />
          </button>
        </div>
      </div>

      <SectionPanel
        title="Kontaktdaten"
        headerRight={
          <button className="btn" style={{ padding: '6px 10px' }}>
            <IconMail size={13} /> Nachricht senden
          </button>
        }
      >
        <div className="field-row">
          <span className="k">E-Mail</span>
          <span className="v">
            {candidate.email}
            <button onClick={() => copy(candidate.email)} title="Kopieren">
              <IconCopy size={13} />
            </button>
          </span>
        </div>
        <div className="field-row">
          <span className="k">Telefon</span>
          <span className="v">
            {candidate.phone}
            <button onClick={() => copy(candidate.phone)} title="Kopieren">
              <IconCopy size={13} />
            </button>
          </span>
        </div>
        <div className="field-row">
          <span className="k">Socials</span>
          <span className="v">–</span>
        </div>
        <div className="field-row">
          <span className="k">Links</span>
          <span className="v">–</span>
        </div>
      </SectionPanel>

      <SectionPanel title="Details">
        <div className="field-row">
          <span className="k">Erstellungsdatum</span>
          <span className="v">
            {formatDate(candidate.createdAt)} ({formatLongRelative(candidate.createdAt)}) · Beworben über {candidate.source}
          </span>
        </div>
        <div className="field-row">
          <span className="k">Quelle</span>
          <span className="v">
            <div className="chip-row" style={{ margin: 0, justifyContent: 'flex-end' }}>
              {!sourceRemoved && (
                <span className="chip">
                  {candidate.source}
                  <button onClick={() => setSourceRemoved(true)}>×</button>
                </span>
              )}
              <button className="chip-add" style={{ width: 22, height: 22 }}>
                <IconPlus size={11} />
              </button>
            </div>
          </span>
        </div>
        <div className="field-row">
          <span className="k">Letzte Aktivität</span>
          <span className="v">{formatLongRelative(candidate.inStageSince)} · Kandidat*in wurde zuletzt kontaktiert.</span>
        </div>
      </SectionPanel>

      <SectionPanel
        title="Profilfelder"
        headerRight={
          <button className="btn" style={{ padding: '6px 10px' }}>
            <IconPlus size={13} /> Profilfeld hinzufügen
          </button>
        }
      >
        <div className="field-row">
          <span className="k">Geburtsdatum</span>
          <span className="v">
            {candidate.birthDate ?? '–'}
            {candidate.birthDate && (
              <button onClick={() => copy(candidate.birthDate!)} title="Kopieren">
                <IconCopy size={13} />
              </button>
            )}
          </span>
        </div>
        <div className="field-row">
          <span className="k">Gehalt</span>
          <span className="v">{candidate.salaryExpectation ?? '–'}</span>
        </div>
        <div className="field-row">
          <span className="k">Adresse</span>
          <span className="v">
            {candidate.address ?? '–'}
            {candidate.address && (
              <button onClick={() => copy(candidate.address!)} title="Kopieren">
                <IconCopy size={13} />
              </button>
            )}
          </span>
        </div>
        <div className="field-row">
          <span className="k">Verfügbarkeit</span>
          <span className="v">{candidate.verfuegbarAb ? `ab ${formatDate(candidate.verfuegbarAb)}` : '–'}</span>
        </div>
        <div className="field-row">
          <span className="k">Sprachfähigkeiten</span>
          <span className="v">
            <div className="chip-row" style={{ margin: 0, justifyContent: 'flex-end' }}>
              {languages.map((l) => (
                <span className="chip" key={l.name}>
                  {l.name} - {l.level}
                  <button onClick={() => setLanguages((ls) => ls.filter((x) => x.name !== l.name))}>×</button>
                </span>
              ))}
              <button className="chip-add" style={{ width: 22, height: 22 }}>
                <IconPlus size={11} />
              </button>
            </div>
          </span>
        </div>
        <div className="field-row">
          <span className="k">Fähigkeiten</span>
          <span className="v">
            <div className="chip-row" style={{ margin: 0, justifyContent: 'flex-end' }}>
              {visibleSkills.map((s) => (
                <span className="chip" key={s}>
                  {s}
                  <button onClick={() => setSkills((ss) => ss.filter((x) => x !== s))}>×</button>
                </span>
              ))}
              {hiddenSkillsCount > 0 && (
                <button className="side-link-btn" onClick={() => setSkillsExpanded(true)}>
                  Mehr anzeigen ({hiddenSkillsCount})
                </button>
              )}
              <button className="chip-add" style={{ width: 22, height: 22 }}>
                <IconPlus size={11} />
              </button>
            </div>
          </span>
        </div>
        <div className="field-row">
          <span className="k">Arbeit an Wochenenden</span>
          <span className="v">
            <select value={weekendWork} onChange={(e) => setWeekendWork(e.target.value as 'Ja' | 'Nein')} style={{ width: 'auto' }}>
              <option value="Ja">Ja</option>
              <option value="Nein">Nein</option>
            </select>
          </span>
        </div>
      </SectionPanel>

      <div className="panel">
        <div className="panel-head">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="panel-head-title" style={{ textTransform: 'none', letterSpacing: 0, fontSize: 13, color: 'var(--text)' }}>
              Lebenslauf
            </span>
            <div className="tabbar" style={{ padding: 0, marginBottom: 0 }}>
              <button className={'tabbar-item' + (cvTab === 'datei' ? ' active' : '')} onClick={() => setCvTab('datei')}>
                Datei
              </button>
              <button className={'tabbar-item' + (cvTab === 'erfahrung' ? ' active' : '')} onClick={() => setCvTab('erfahrung')}>
                Erfahrung
              </button>
            </div>
          </div>
          <button className="btn btn-primary" style={{ padding: '6px 12px' }}>
            <IconPlus size={13} /> Datei hochladen
          </button>
        </div>
        {!candidate.cvFileName ? (
          <div className="cv-empty">
            <IconPaperclip size={22} />
            <strong>Noch kein Lebenslauf</strong>
            Einen Lebenslauf für diese*n Kandidat*in hochladen.
          </div>
        ) : (
          <div className="field-row">
            <span className="k">{candidate.cvFileName}</span>
          </div>
        )}
      </div>

      <div className="panel">
        <div className="panel-head">
          <span className="panel-head-title" style={{ textTransform: 'none', letterSpacing: 0, fontSize: 13, color: 'var(--text)' }}>
            Anschreiben
          </span>
          <button className="btn" style={{ padding: '6px 10px' }}>
            <IconPlus size={13} /> Anschreiben hinzufügen
          </button>
        </div>
      </div>
    </>
  )
}
