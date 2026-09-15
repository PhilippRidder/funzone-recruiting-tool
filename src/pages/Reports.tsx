const BY_MONTH = [
  { m: 'Mär', v: 7 },
  { m: 'Apr', v: 15 },
  { m: 'Mai', v: 12 },
  { m: 'Jun', v: 10 },
  { m: 'Jul', v: 7 },
  { m: 'Aug', v: 16 },
]

const BY_SOURCE = [
  { label: 'Indeed: sponsored', v: 53 },
  { label: 'Nicht zugeteilt', v: 10 },
  { label: 'Indeed: organic', v: 4 },
  { label: 'google.com', v: 2 },
  { label: 'fun-zone.de', v: 1 },
]

export function Reports() {
  const maxMonth = Math.max(...BY_MONTH.map((b) => b.v))
  const maxSource = Math.max(...BY_SOURCE.map((b) => b.v))

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Berichte</h1>
          <p className="page-subtitle">
            Zeitraum: 01. März 2026 – 25. Aug 2026 (Platzhalter-Daten) — <span style={{ color: 'var(--text-faint)' }}>kommt ins MMT</span>
          </p>
        </div>
      </div>

      <div className="stat-grid" style={{ marginBottom: 16 }}>
        <div className="stat-card accent-blue">
          <div className="stat-card-head">Einstellungen</div>
          <div className="stat-card-value">73</div>
        </div>
        <div className="stat-card accent-blue">
          <div className="stat-card-head">Time-to-Hire</div>
          <div className="stat-card-value">22 Tage</div>
        </div>
        <div className="stat-card accent-blue">
          <div className="stat-card-head">Time-to-Start</div>
          <div className="stat-card-value">–</div>
        </div>
      </div>

      <div className="chart-panel">
        <div className="chart-title">Einstellungen im Laufe der Zeit</div>
        <div className="bar-chart">
          {BY_MONTH.map((b) => (
            <div className="bar-col" key={b.m}>
              <div className="bar" style={{ height: `${(b.v / maxMonth) * 100}px` }} />
              <div className="bar-label">{b.m}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="chart-panel">
        <div className="chart-title">Neueinstellungen nach Quelle</div>
        {BY_SOURCE.map((s) => (
          <div className="hbar-row" key={s.label}>
            <div className="label">{s.label}</div>
            <div className="track">
              <div className="fill" style={{ width: `${(s.v / maxSource) * 100}%` }} />
            </div>
            <div className="val">{s.v}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
