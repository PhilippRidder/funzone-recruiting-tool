const STANDORTE = [
  'Funzone Augsburg',
  'Funzone Bielefeld',
  'Funzone Düsseldorf',
  'Funzone Duisburg',
  'Funzone Essen West – Borbeck',
  'Funzone Essen Ost – Kray',
  'Funzone Freiburg-Denzlingen',
  'Funzone Frankfurt am Main',
  'Funzone Hamburg',
  'Funzone Kiel',
  'Funzone Köln',
  'Funzone Mainz',
  'Funzone Mönchengladbach',
  'Funzone München',
]

export function StandorteFooter() {
  return (
    <div className="cp-locations">
      <div className="cp-h2">Unsere Standorte</div>
      <ul>
        {STANDORTE.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </div>
  )
}
