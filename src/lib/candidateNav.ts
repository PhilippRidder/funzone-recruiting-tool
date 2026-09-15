import { useLocation, useNavigate } from 'react-router-dom'

// Öffnet die Kandidat*innen-Ansicht als Pop-up über der aktuellen Seite (wie in Recruitee),
// statt auf eine eigene Seite zu navigieren. Die aktuelle Route wird als „Hintergrund"
// mitgegeben, damit sie sichtbar bleibt (siehe App.tsx).
export function useOpenCandidate() {
  const navigate = useNavigate()
  const location = useLocation()
  return (id: string) => navigate(`/kandidaten/${id}`, { state: { backgroundLocation: location } })
}
