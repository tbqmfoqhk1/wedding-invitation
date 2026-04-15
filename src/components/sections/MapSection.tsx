import { useEffect, useRef, useState } from 'react'
import { Section } from '../layout/Section'
import { FadeIn } from '../ui/FadeIn'
import type { WeddingContent } from '../../content/schema'
import { loadKakaoMaps } from '../../lib/kakao/loadKakaoMaps'
import { kakaoMapWebUrl } from '../../lib/kakao/mapLinks'
import { IconMapPin } from '../icons/UiIcons'

type Props = {
  data: WeddingContent
  kakaoKey: string
}

export function MapSection({ data, kakaoKey }: Props) {
  const mapEl = useRef<HTMLDivElement>(null)
  const [mapError, setMapError] = useState<string | null>(() =>
    kakaoKey ? null : '카카오 앱 키가 설정되지 않았습니다.',
  )
  const [showLoadHelp, setShowLoadHelp] = useState(false)

  const { venue } = data
  const mapWeb = kakaoMapWebUrl(venue.placeName, venue.lat, venue.lng)

  useEffect(() => {
    if (!kakaoKey) return
    const el = mapEl.current
    if (!el) return

    let cancelled = false

    loadKakaoMaps(kakaoKey)
      .then(() => {
        if (cancelled || !mapEl.current) return
        setMapError(null)
        setShowLoadHelp(false)
        const center = new window.kakao.maps.LatLng(venue.lat, venue.lng)
        const map = new window.kakao.maps.Map(mapEl.current, {
          center,
          level: 3,
        })
        const marker = new window.kakao.maps.Marker({ position: center })
        marker.setMap(map)
      })
      .catch(() => {
        setMapError('지도를 불러오지 못했습니다.')
        setShowLoadHelp(true)
      })

    return () => {
      cancelled = true
      el.innerHTML = ''
    }
  }, [kakaoKey, venue.lat, venue.lng])

  return (
    <FadeIn>
      <Section id="map" title="Directions">
        <p className="muted section-lead">
          {venue.placeName}
          <br />
          {venue.address}
        </p>
        {mapError ? (
          <div className="map-box map-fallback">
            <p style={{ margin: 0 }}>{mapError}</p>
            {showLoadHelp ? (
              <ul className="map-fallback__help">
                <li>
                  <strong>Product settings → Kakao Map</strong> must be enabled. (Common cause of
                  403)
                </li>
                <li>
                  Under <strong>App settings → Platform → Web</strong>, register{' '}
                  <code>http://localhost:YOUR_PORT</code>.
                </li>
                <li>
                  Ensure the JavaScript key in <code>.env</code> matches that app.
                </li>
              </ul>
            ) : null}
          </div>
        ) : (
          <div ref={mapEl} className="map-box" role="presentation" />
        )}
        <div className="map-icon-actions section-actions">
          <a
            className="icon-action"
            href={mapWeb}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="카카오맵에서 보기"
          >
            <IconMapPin className="icon-action__svg" />
          </a>
        </div>
      </Section>
    </FadeIn>
  )
}
