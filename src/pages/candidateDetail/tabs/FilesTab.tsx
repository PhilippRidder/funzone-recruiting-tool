import { IconClipboard, IconPlus } from '../../../components/Icons'
import type { CandidateFile } from '../../../types'

export function FilesTab({ files }: { files: CandidateFile[] }) {
  return (
    <>
      <div className="panel-head" style={{ marginBottom: 16 }}>
        <span style={{ fontWeight: 700 }}>{files.length} Datei(en)</span>
        <button className="btn btn-primary">
          <IconPlus size={13} /> Datei hochladen
        </button>
      </div>

      {files.length === 0 ? (
        <div className="stat-card-desc">Noch keine Dateien hochgeladen.</div>
      ) : (
        <div className="file-grid">
          {files.map((f) => (
            <div className="file-card" key={f.id}>
              <IconClipboard size={26} />
              <div className="name">{f.name}</div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
