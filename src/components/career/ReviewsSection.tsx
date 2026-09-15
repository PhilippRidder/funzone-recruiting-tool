const REVIEWS = [
  {
    source: 'Kununu',
    color: '#f5c518',
    text: 'Auf Kununu wird FunZone für das tolle Teamgefühl, die abwechslungsreiche Arbeit und die gute Einarbeitung besonders positiv hervorgehoben.',
  },
  {
    source: 'Indeed',
    color: '#2164f3',
    text: 'Bei Indeed loben Mitarbeitende vor allem die lockere Arbeitsatmosphäre, die flexiblen Einsatzmöglichkeiten und die fairen Vorgesetzten.',
  },
  {
    source: 'Google',
    color: '#34a853',
    text: 'In den Google-Bewertungen loben Gäste die spannenden Erlebnisse und das freundliche Personal – ein Hinweis auf ein motiviertes Team und positives Arbeitsumfeld.',
  },
]

export function ReviewsSection() {
  return (
    <div className="cp-reviews">
      <div className="cp-h2" style={{ color: '#fff' }}>
        Was andere über uns sagen
      </div>
      <div className="cp-reviews-grid">
        {REVIEWS.map((r) => (
          <div className="cp-review-card" key={r.source}>
            <p>„{r.text}"</p>
            <div className="cp-review-source">
              <span className="cp-review-badge" style={{ background: r.color }} />
              {r.source}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
