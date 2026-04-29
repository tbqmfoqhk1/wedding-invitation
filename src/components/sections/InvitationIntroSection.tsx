import { FadeIn } from '../ui/FadeIn'
import { assetUrl } from '../../lib/assetUrl'
import type { WeddingContent } from '../../content/schema'

type Props = {
  data: WeddingContent
}

/** 초대 문단 · 초상 원형 · 혼주 */
export function InvitationIntroSection({ data }: Props) {
  const inv = data.invitation
  const portraitSrc = inv.portraitImagePath?.trim()
    ? assetUrl(inv.portraitImagePath.trim())
    : assetUrl(data.cover.imagePath)
  const p = data.parentsDisplay

  return (
    <FadeIn>
      <section id="greeting" className="wedding-section wedding-section--greeting">
        <div className="wedding-section__body">
          <div className="inv-intro__badge-month">{data.invHero.monthBadgeEn}</div>
          <div className="inv-intro__deco" aria-hidden>
            <span className="inv-intro__deco-line" />
            <p className="inv-intro__eyebrow-en">{inv.eyebrowEn}</p>
            <span className="inv-intro__deco-line" />
          </div>

          <div className="tm-inv-portrait-wrap">
            <div className="tm-inv-portrait">
              <img src={portraitSrc} alt="" loading="lazy" decoding="async" />
            </div>
          </div>

          <p className="inv-intro__lead">{inv.leadKo}</p>
          <p className="inv-intro__greeting">{data.greeting}</p>

          <div className="tm-inv-parents-inline">
            <p>{p.groomLine}</p>
            <p>{p.brideLine}</p>
          </div>
        </div>
      </section>
    </FadeIn>
  )
}
