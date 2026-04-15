import { assetUrl } from '../../lib/assetUrl'
import type { WeddingContent } from '../../content/schema'

type Props = {
  data: WeddingContent
}

export function CoverSection({ data }: Props) {
  const img = assetUrl(data.cover.imagePath)
  const { groom, bride } = data.couple

  return (
    <section className="cover" aria-label="표지">
      <div className="cover__image-wrap">
        <img
          className="cover__image"
          src={img}
          alt=""
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="cover__overlay" aria-hidden />
        <div className="cover__content">
          <p className="cover__name cover__name--bride">{bride}</p>
          <p className="cover__name cover__name--groom">{groom}</p>
        </div>
      </div>
    </section>
  )
}
