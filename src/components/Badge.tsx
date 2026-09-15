import type { ReactNode } from 'react'

export function Badge({ variant, children }: { variant: 'red' | 'orange' | 'green' | 'outline'; children: ReactNode }) {
  return <span className={`badge badge-${variant}`}>{children}</span>
}
