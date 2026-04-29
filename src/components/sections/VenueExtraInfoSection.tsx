import { FadeIn } from '../ui/FadeIn'
import { Section } from '../layout/Section'
import type { WeddingContent } from '../../content/schema'

type Props = {
  data: WeddingContent
}

const DOT_CLASS: Record<string, string> = {
  line1: 'tm-transport-dot--line1',
  suinBundang: 'tm-transport-dot--suin-bundang',
  cityBus: 'tm-transport-dot--bus-city',
  expressBus: 'tm-transport-dot--bus-express',
  villageBus: 'tm-transport-dot--bus-village',
}

export function VenueExtraInfoSection({ data }: Props) {
  const vi = data.venueInfo
  const subway = vi.subway ?? []
  const bus = vi.bus ?? []
  const parking = vi.parking

  if (!subway.length && !bus.length && !parking?.items?.length) return null

  return (
    <FadeIn>
      <Section id="venue-info" title="INFORMATION">
        {subway.length ? (
          <div className="tm-info-trans-group">
            <h3 className="tm-info-trans__heading">지하철</h3>
            <ul className="tm-transport-list">
              {subway.map((item) => (
                <li key={item.text}>
                  <span
                    className={[
                      'tm-transport-dot',
                      DOT_CLASS[item.dotKey] ?? 'tm-transport-dot--etc',
                    ].join(' ')}
                    aria-hidden
                  />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {bus.length ? (
          <div className="tm-info-trans-group">
            <h3 className="tm-info-trans__heading">버스</h3>
            <ul className="tm-transport-list">
              {bus.map((row) => (
                <li key={row.label}>
                  <span
                    className={[
                      'tm-transport-dot',
                      DOT_CLASS[row.dotKey] ?? 'tm-transport-dot--etc',
                    ].join(' ')}
                    aria-hidden
                  />
                  <span>
                    <strong className="tm-info-trans__label">{row.label}</strong>
                    {`: ${row.routes}`}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {parking?.items?.length ? (
          <div className="tm-info-trans-group tm-info-trans-group--parking">
            <h3 className="tm-info-trans__heading">{parking.title}</h3>
            <ul className="tm-info-trans__detail-list">
              {parking.items.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </Section>
    </FadeIn>
  )
}
