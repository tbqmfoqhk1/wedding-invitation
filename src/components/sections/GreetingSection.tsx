import { FadeIn } from '../ui/FadeIn'
import type { WeddingContent } from '../../content/schema'

type Props = {
  data: WeddingContent
}

export function GreetingSection({ data }: Props) {
  return (
    <FadeIn>
      <section id="greeting" className="wedding-section wedding-section--greeting">
        <div className="greeting-deco" aria-hidden>
          <span className="greeting-deco__line" />
          <span className="greeting-deco__label">Invitation</span>
          <span className="greeting-deco__line" />
        </div>
        <div className="wedding-section__body">
          <p className="greeting-text">{data.greeting}</p>
        </div>
      </section>
    </FadeIn>
  )
}
