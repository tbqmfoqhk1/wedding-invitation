import type { ReactNode } from 'react'
import { SectionBanner } from './SectionBanner'

type Props = {
  id: string
  title: string
  children: ReactNode
  variant?: 'default' | 'greeting' | 'guestbook' | 'gallery'
  banner?: boolean
}

export function Section({
  id,
  title,
  children,
  variant = 'default',
  banner = true,
}: Props) {
  const className = [
    'wedding-section',
    variant === 'greeting' ? 'wedding-section--greeting' : '',
    variant === 'guestbook' ? 'wedding-section--guestbook' : '',
    variant === 'gallery' ? 'wedding-section--gallery' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section id={id} className={className}>
      {banner ? <SectionBanner title={title} /> : null}
      <div className="wedding-section__body">{children}</div>
    </section>
  )
}
