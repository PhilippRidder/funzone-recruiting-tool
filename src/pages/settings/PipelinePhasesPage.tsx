import { useMemo, useState } from 'react'
import { AutomationEditorModal } from '../../components/AutomationEditorModal'
import { IconBolt, IconPencil, IconPlus, IconStar } from '../../components/Icons'
import { INITIAL_TEMPLATES, type PipelineTemplate, type StageGroupTitle, type TemplateStage } from '../../lib/pipelineTemplates'

export function PipelinePhasesPage() {
  const [templates, setTemplates] = useState<PipelineTemplate[]>(INITIAL_TEMPLATES)
  const [selectedId, setSelectedId] = useState(INITIAL_TEMPLATES[0].id)
  const [editingStageId, setEditingStageId] = useState<string | null>(null)
  const [editingTemplateName, setEditingTemplateName] = useState(false)
  const [modalStage, setModalStage] = useState<TemplateStage | null>(null)
  const [search, setSearch] = useState('')

  const selected = useMemo(() => templates.find((t) => t.id === selectedId)!, [templates, selectedId])
  const filtered = templates.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()))

  const updateTemplate = (id: string, updater: (t: PipelineTemplate) => PipelineTemplate) => {
    setTemplates((ts) => ts.map((t) => (t.id === id ? updater(t) : t)))
  }

  const renameStage = (stageId: string, name: string) => {
    updateTemplate(selected.id, (t) => ({
      ...t,
      groups: t.groups.map((g) => ({ ...g, stages: g.stages.map((s) => (s.id === stageId ? { ...s, name } : s)) })),
    }))
  }

  const addStage = (groupTitle: StageGroupTitle) => {
    updateTemplate(selected.id, (t) => ({
      ...t,
      groups: t.groups.map((g) =>
        g.title === groupTitle
          ? { ...g, stages: [...g.stages, { id: `s${Date.now()}`, name: 'Neue Phase', color: 'var(--text-faint)', automationCount: 0 }] }
          : g,
      ),
    }))
  }

  const renameTemplate = (name: string) => {
    updateTemplate(selected.id, (t) => ({ ...t, name }))
  }

  const addTemplate = () => {
    const newT: PipelineTemplate = {
      id: `t${Date.now()}`,
      name: 'Neue Vorlage',
      groups: [
        { title: 'Bewerber*innen', stages: [] },
        { title: 'Aktiver Prozess', stages: [] },
        { title: 'Einstellungen', stages: [] },
      ],
    }
    setTemplates((ts) => [...ts, newT])
    setSelectedId(newT.id)
  }

  const saveAutomation = () => {
    if (!modalStage) return
    updateTemplate(selected.id, (t) => ({
      ...t,
      groups: t.groups.map((g) => ({
        ...g,
        stages: g.stages.map((s) => (s.id === modalStage.id ? { ...s, automationCount: Math.max(1, s.automationCount) } : s)),
      })),
    }))
    setModalStage(null)
  }

  const deleteAutomation = () => {
    if (!modalStage) return
    updateTemplate(selected.id, (t) => ({
      ...t,
      groups: t.groups.map((g) => ({
        ...g,
        stages: g.stages.map((s) => (s.id === modalStage.id ? { ...s, automationCount: 0 } : s)),
      })),
    }))
    setModalStage(null)
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Pipeline-Vorlagen</h1>
          <p className="page-subtitle">
            Richte je Job-Kategorie eine eigene Recruiting-Pipeline ein (Phasen + Automatisierungen) und verwende sie für Jobs.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 20, alignItems: 'flex-start' }}>
        <div>
          <button className="btn btn-primary" style={{ width: '100%', marginBottom: 10 }} onClick={addTemplate}>
            <IconPlus size={14} /> Neue Vorlage
          </button>
          <div className="sidebar-search" style={{ marginBottom: 10 }}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Suche"
              style={{ background: 'none', border: 'none', color: 'var(--text)', width: '100%', outline: 'none' }}
            />
          </div>
          <div className="settings-group-title">Allgemein</div>
          <div className="panel" style={{ padding: 8 }}>
            {filtered.map((t) => (
              <div
                key={t.id}
                className="settings-item"
                style={t.id === selectedId ? { borderColor: 'var(--accent)', background: 'var(--accent-bg)' } : {}}
                onClick={() => setSelectedId(t.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {t.isDefault && <IconStar size={12} />}
                  {t.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="panel" style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              {editingTemplateName ? (
                <input
                  autoFocus
                  defaultValue={selected.name}
                  onBlur={(e) => {
                    renameTemplate(e.target.value || selected.name)
                    setEditingTemplateName(false)
                  }}
                  style={{ fontWeight: 700, fontSize: 15, background: 'var(--bg-input)', border: '1px solid var(--border)', borderRadius: 6, padding: '4px 8px' }}
                />
              ) : (
                <div style={{ fontWeight: 700, fontSize: 15, display: 'flex', alignItems: 'center', gap: 8 }}>
                  {selected.name}
                  <button className="field-row-actions" style={{ background: 'none', border: 'none', color: 'var(--text-faint)', cursor: 'pointer' }} onClick={() => setEditingTemplateName(true)}>
                    <IconPencil size={13} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {selected.groups.map((group) => (
            <div key={group.title} style={{ marginBottom: 16 }}>
              <div className="stage-group-title" style={{ marginTop: 0 }}>{group.title}</div>
              {group.stages.map((s) => (
                <div className="toggle-card" key={s.id}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
                    <span className="dot3" style={{ background: s.color }} />
                    {editingStageId === s.id ? (
                      <input
                        autoFocus
                        defaultValue={s.name}
                        onBlur={(e) => {
                          renameStage(s.id, e.target.value || s.name)
                          setEditingStageId(null)
                        }}
                        style={{ background: 'var(--bg-input)', border: '1px solid var(--border)', borderRadius: 6, padding: '4px 8px', fontSize: 13 }}
                      />
                    ) : (
                      <span style={{ fontWeight: 600, fontSize: 13 }}>{s.name}</span>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <button
                      title="Automatisierungen"
                      style={{ background: 'none', border: 'none', color: s.automationCount > 0 ? 'var(--accent-text)' : 'var(--text-faint)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
                      onClick={() => setModalStage(s)}
                    >
                      <IconBolt size={14} />
                      {s.automationCount > 0 && <span className="count">{s.automationCount}</span>}
                    </button>
                    <button style={{ background: 'none', border: 'none', color: 'var(--text-faint)', cursor: 'pointer' }} onClick={() => setEditingStageId(s.id)}>
                      <IconPencil size={13} />
                    </button>
                  </div>
                </div>
              ))}
              <button className="btn" style={{ width: '100%' }} onClick={() => addStage(group.title)}>
                + Neu hinzufügen
              </button>
            </div>
          ))}
        </div>
      </div>

      {modalStage && (
        <AutomationEditorModal
          stage={modalStage}
          isNew={modalStage.automationCount === 0}
          onClose={() => setModalStage(null)}
          onSave={saveAutomation}
          onDelete={deleteAutomation}
        />
      )}
    </div>
  )
}
