import { Section } from '../layout/Section'
import { FadeIn } from '../ui/FadeIn'
import type { WeddingContent } from '../../content/schema'

type Props = {
  data: WeddingContent
}

function youtubeEmbedUrl(id: string): string {
  return `https://www.youtube.com/embed/${encodeURIComponent(id)}`
}

export function VideoSection({ data }: Props) {
  const id = data.video?.youtubeId?.trim()
  if (!id) return null

  return (
    <FadeIn>
      <Section id="video" title="VIDEO">
        <div className="video-wrap">
          <iframe
            title="청첩장 동영상"
            src={youtubeEmbedUrl(id)}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </Section>
    </FadeIn>
  )
}
