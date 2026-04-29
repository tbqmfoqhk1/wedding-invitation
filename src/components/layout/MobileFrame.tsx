import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export function MobileFrame({ children }: Props) {
  return (
    <div className="mobile-frame-outer">
      <div className="mobile-frame-inner inv-card-shell">{children}</div>
    </div>
  )
}
