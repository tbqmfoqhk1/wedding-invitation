import { useEffect, useMemo, useState } from 'react'
import { FadeIn } from '../ui/FadeIn'
import { Section } from '../layout/Section'
import type { WeddingContent } from '../../content/schema'
import { assetUrl } from '../../lib/assetUrl'

type Props = {
  data: WeddingContent
}

export function SnapUploadSection({ data }: Props) {
  const s = data.snap
  const fq = data.footerQuote
  const opensAt = useMemo(() => new Date(data.ceremony.isoDateTime), [data.ceremony.isoDateTime])
  const [canOpen, setCanOpen] = useState(() => Date.now() >= opensAt.getTime())

  useEffect(() => {
    const t = window.setInterval(() => setCanOpen(Date.now() >= opensAt.getTime()), 60_000)
    return () => window.clearInterval(t)
  }, [opensAt])

  const url = s.uploadUrl?.trim()
  const enabled = Boolean(url) && canOpen

  const bg = s.quoteBackgroundImagePath?.trim()
  const bgUrl = bg ? assetUrl(bg) : undefined

  return (
    <FadeIn>
      <Section id="snap" title="CAPTURE OUR MOMENTS">
        <div className="tm-snap-stage">
          <div className="tm-snap-polaroids" aria-hidden>
            <div className="tm-polaroid">
              <div className="tm-polaroid__inner" />
            </div>
            <div className="tm-polaroid">
              <div className="tm-polaroid__inner" />
            </div>
            <div className="tm-polaroid">
              <div className="tm-polaroid__inner" />
            </div>
          </div>

          <p className="inv-snap__lead">{s.leadKo}</p>
          <div className="inv-snap__btn-wrap">
            <button
              type="button"
              className="inv-snap__btn"
              disabled={!enabled}
              onClick={() => {
                if (url && enabled) window.open(url, '_blank', 'noopener,noreferrer')
              }}
            >
              {s.buttonLabel}
            </button>
          </div>
          {!canOpen ? <p className="inv-snap__note">{s.closedNoteKo}</p> : null}
          {canOpen && !url ? <p className="inv-snap__note">업로드 링크는 추후 안내 예정입니다.</p> : null}
        </div>

        <svg
          className="tm-snap-wave"
          viewBox="0 0 1200 56"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path fill="#f7f7f7" d="M0,30 Q320,6 600,30 T1200,30 L1200,56 L0,56 Z" />
        </svg>

        <div
          className={['tm-snap-quote-section', bgUrl ? 'tm-snap-quote-section--photo' : ''].filter(Boolean).join(' ')}
          role="note"
        >
          {bgUrl ? (
            <div className="tm-cover__photo-area">
              <img src={bgUrl} alt="" loading="lazy" decoding="async" />
              <div className="tm-snap-quote-overlay">
                <blockquote className="inv-close__lines">
                  {fq.lines.map((line, i) => (
                    <span
                      key={`snap-quote-${i}`}
                      className={i === fq.lines.length - 1 ? 'inv-close__line--title' : undefined}
                    >
                      {line}
                    </span>
                  ))}
                </blockquote>
                {fq.attribution ? <p className="inv-close__attr">{fq.attribution}</p> : null}
              </div>
            </div>
          ) : (
            <>
              <blockquote className="inv-close__lines">
                {fq.lines.map((line, i) => (
                  <span
                    key={`snap-quote-${i}`}
                    className={i === fq.lines.length - 1 ? 'inv-close__line--title' : undefined}
                  >
                    {line}
                  </span>
                ))}
              </blockquote>
              {fq.attribution ? <p className="inv-close__attr">{fq.attribution}</p> : null}
            </>
          )}
        </div>
      </Section>
    </FadeIn>
  )
}
