import { useMemo, useState } from 'react'
import { Section } from '../layout/Section'
import { FadeIn } from '../ui/FadeIn'
import type { WeddingContent } from '../../content/schema'
import { assetUrl } from '../../lib/assetUrl'
import { GalleryLightbox } from './GalleryLightbox'

type Props = {
  data: WeddingContent
}

type GalleryItem = {
  src: string
  alt: string
}

function resolveSrc(src: string): string {
  return src.startsWith('http://') || src.startsWith('https://')
    ? src
    : assetUrl(src)
}

/** 첫 줄: 왼쪽(가로) · 가운데(세로) · 오른쪽(가로) 순으로 두려면 배열 순서대로 [L,P,L] 파일명 나열 */
function buildOrderedGallery(data: WeddingContent): GalleryItem[] {
  const gallery = data.gallery
  const row1 = 'galleryRow1' in data && Array.isArray(data.galleryRow1) ? data.galleryRow1 : undefined

  const withResolved = gallery.map((g) => ({
    src: resolveSrc(g.src),
    alt: g.alt,
    rawSrc: g.src,
  }))

  const map = new Map(withResolved.map((g) => [g.rawSrc, g]))
  if (!row1?.length) {
    return withResolved.map(({ src, alt }) => ({ src, alt }))
  }

  const head: GalleryItem[] = []
  const seen = new Set<string>()
  for (const path of row1) {
    const row = map.get(path)
    if (row) {
      head.push({ src: row.src, alt: row.alt })
      seen.add(path)
    }
  }
  const tail = withResolved
    .filter((g) => !seen.has(g.rawSrc))
    .map(({ src, alt }) => ({ src, alt }))
  return [...head, ...tail]
}

/** 라운드로빈: 인덱스 i → 열 i%3 → 첫 행은 반드시 0열·1열·2열 상단 */
function partitionIntoColumns(items: GalleryItem[], columnCount: number): GalleryItem[][] {
  const cols: GalleryItem[][] = Array.from({ length: columnCount }, () => [])
  items.forEach((item, i) => {
    cols[i % columnCount].push(item)
  })
  return cols
}

function globalIndex(columnIndex: number, rowInColumn: number, columnCount: number): number {
  return rowInColumn * columnCount + columnIndex
}

const COLS = 3
const PREVIEW_COUNT = 6

export function GallerySection({ data }: Props) {
  const items = useMemo(() => buildOrderedGallery(data), [data])

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [expanded, setExpanded] = useState(false)

  const showMore = items.length > PREVIEW_COUNT
  const sliceEnd = expanded ? items.length : Math.min(PREVIEW_COUNT, items.length)
  const visible = items.slice(0, sliceEnd)
  const columns = useMemo(() => partitionIntoColumns(visible, COLS), [visible])

  return (
    <FadeIn>
      <Section id="gallery" title="GALLERY" variant="gallery">
        <div
          className={[
            'tm-gallery-wrap gallGridWrapper ratio multiple',
            showMore && !expanded ? 'tm-gallery-wrap--fade' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <div className="tm-gallery-by-col" role="list" aria-label="웨딩 갤러리">
            {columns.map((colItems, colIdx) => (
              <div key={`col-${colIdx}`} className="tm-gallery-col">
                {colItems.map((item, rowIdx) => {
                  const gIdx = globalIndex(colIdx, rowIdx, COLS)
                  return (
                    <button
                      key={`${item.src}-${gIdx}`}
                      type="button"
                      className="gallery-strip__item tm-gallery-item item"
                      role="listitem"
                      onClick={() => setLightboxIndex(gIdx)}
                      aria-label={`${item.alt} 크게 보기`}
                    >
                      <img
                        src={item.src}
                        alt=""
                        loading={gIdx < 6 ? 'eager' : 'lazy'}
                        decoding="async"
                        draggable={false}
                      />
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        {showMore && !expanded ? (
          <div className="tm-gallery-more-row">
            <button type="button" className="tm-gallery-more" onClick={() => setExpanded(true)}>
              더보기 <span aria-hidden>∨</span>
            </button>
          </div>
        ) : null}

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
