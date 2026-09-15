export function PlaceholderTab({ title }: { title: string }) {
  return (
    <div className="panel" style={{ maxWidth: 560 }}>
      <div style={{ fontWeight: 700, marginBottom: 8 }}>{title}</div>
      <p className="stat-card-desc" style={{ marginBottom: 0 }}>
        Für diesen Bereich liegt mir noch kein Screenshot aus Recruitee vor, deshalb ist er hier nur
        als Platzhalter angelegt. Sobald du Screenshots schickst, baue ich ihn wie die anderen Tabs nach.
      </p>
    </div>
  )
}
