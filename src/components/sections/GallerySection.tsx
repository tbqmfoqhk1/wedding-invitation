import { useMemo, useState } from 'react'
import { Section } from '../layout/Section'
import { FadeIn } from '../ui/FadeIn'
import type { WeddingContent } from '../../content/schema'
import { assetUrl } from '../../lib/assetUrl'
import { GalleryLightbox } from './GalleryLightbox'

type Props = {
  data: WeddingContent
}

function resolveSrc(src: string): string {
  return src.startsWith('http://') || src.startsWith('https://')
    ? src
    : assetUrl(src)
}

export function GallerySection({ data }: Props) {
  const items = useMemo(
    () =>
      data.gallery.map((item) => ({
        src: resolveSrc(item.src),
        alt: item.alt,
      })),
    [data.gallery],
  )

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  return (
    <FadeIn>
      <Section id="gallery" title="Gallery" variant="gallery">
        <div className="gallery-strip" role="list" aria-label="웨딩 갤러리">
          {items.map((item, globalIndex) => (
            <button
              key={`${item.src}-${globalIndex}`}
              type="button"
              className="gallery-strip__item"
              role="listitem"
              onClick={() => setLightboxIndex(globalIndex)}
              aria-label={`${item.alt} 크게 보기`}
            >
              <img
                src={item.src}
                alt=""
                loading={globalIndex < 4 ? 'eager' : 'lazy'}
                decoding="async"
                draggable={false}
              />
            </button>
          ))}
        </div>
        <GalleryLightbox
          open={lightboxIndex !== null}
          index={lightboxIndex ?? 0}
          items={items}
          onClose={() => setLightboxIndex(null)}
          onIndexChange={setLightboxIndex}
        />
      </Section>
    </FadeIn>
  )
}
