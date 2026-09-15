export function StatCard(props: {
  label: string
  value: number | string
  desc: string
  action?: string
  accent?: 'orange' | 'red' | 'green' | 'blue'
}) {
  const { label, value, desc, action, accent = 'blue' } = props
  return (
    <div className={`stat-card accent-${accent}`}>
      <div className="stat-card-head">{label}</div>
      <div className="stat-card-value">{value}</div>
      <div className="stat-card-desc">{desc}</div>
      {action && <div className="stat-card-action">{action} →</div>}
    </div>
  )
}
