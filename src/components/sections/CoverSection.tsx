import { assetUrl } from '../../lib/assetUrl'
import type { WeddingContent } from '../../content/schema'

type Props = {
  data: WeddingContent
}

/** 표지: 카드 토큰과 동일한 배경·타이포 — 타 섹션과 시각적 통일 */
export function CoverSection({ data }: Props) {
  const img = assetUrl(data.cover.imagePath)
  const cs = data.coverStyle

  return (
    <section className="cover tm-cover tm-cover--ref" aria-label="표지">
      <div className="tm-cover__shell">
        <div className="tm-cover__title-area">
          <p className="tm-cover__begins">{cs.lineBegins}</p>
          <div className="tm-cover__subline">
            <span className="tm-cover__on">{cs.lineOn}</span>
            <span className="tm-cover__month">{cs.monthWord}</span>
          </div>
        </div>

        <div className="tm-cover__photo-area">
          <img src={img} alt="" loading="eager" decoding="async" fetchPriority="high" />
        </div>

        <div className="tm-cover__foot tm-cover__bottom-area">
          {cs.footerLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </section>
  )
}
