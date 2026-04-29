import { useEffect, useRef, useState } from 'react'
import { Section } from '../layout/Section'
import { FadeIn } from '../ui/FadeIn'
import type { WeddingContent } from '../../content/schema'
import { loadKakaoMaps } from '../../lib/kakao/loadKakaoMaps'
import {
  kakaoNaviOpenUrl,
  naverMapSearchUrl,
  NAV_APP_ICON_SRC,
  tmapRouteWebUrl,
} from '../../lib/kakao/mapLinks'

type Props = {
  data: WeddingContent
  kakaoKey: string
}

/** 카카오맵은 부모의 CSS transform과 함께 쓰이면 타일 영역이 깨지는 경우가 있어 relayout을 여러 번 호출 */
function scheduleMapRelayout(map: { relayout: () => void }) {
  const run = () => map.relayout()
  run()
  requestAnimationFrame(run)
  window.setTimeout(run, 0)
  window.setTimeout(run, 100)
  window.setTimeout(run, 700)
}

export function MapSection({ data, kakaoKey }: Props) {
  const mapEl = useRef<HTMLDivElement>(null)
  const [mapError, setMapError] = useState<string | null>(() =>
    kakaoKey ? null : '카카오 앱 키가 설정되지 않았습니다.',
  )
  const [showLoadHelp, setShowLoadHelp] = useState(false)

  const { venue } = data
  const naverUrl = naverMapSearchUrl(venue.placeName)
  const kakaoNaviUrl = kakaoNaviOpenUrl(venue.lat, venue.lng, venue.placeName)
  const tmapUrl = tmapRouteWebUrl(venue.lat, venue.lng, venue.placeName)
  const sketch = venue.mapSketchUrl?.trim()

  useEffect(() => {
    if (!kakaoKey) return
    const el = mapEl.current
    if (!el) return

    let cancelled = false
    let map: { relayout: () => void } | null = null
    const onResize = () => map?.relayout()

    loadKakaoMaps(kakaoKey)
      .then(() => {
        if (cancelled || !mapEl.current) return
        setMapError(null)
        setShowLoadHelp(false)
        const center = new window.kakao.maps.LatLng(venue.lat, venue.lng)
        map = new window.kakao.maps.Map(mapEl.current, {
          center,
          level: 3,
        })
        const marker = new window.kakao.maps.Marker({ position: center })
        marker.setMap(map)

        scheduleMapRelayout(map)
        window.kakao.maps.event.addListener(map, 'idle', () => map?.relayout())
        window.addEventListener('resize', onResize)
      })
      .catch(() => {
        setMapError('지도를 불러오지 못했습니다.')
        setShowLoadHelp(true)
      })

    return () => {
      cancelled = true
      map = null
      window.removeEventListener('resize', onResize)
      el.innerHTML = ''
    }
  }, [kakaoKey, venue.lat, venue.lng])

  return (
    <FadeIn className="fade-in--map">
      <Section id="map" title="LOCATION">
        <p className="tm-map-lead-ko">오시는 길</p>
        <div className="tm-map-venue">
          <p className="tm-map-venue__name">{venue.placeName}</p>
          <p className="tm-map-venue__address muted">{venue.address}</p>
          {venue.phone ? <p className="tm-map-venue__tel muted">Tel. {venue.phone}</p> : null}
        </div>
        {sketch ? (
          <div className="tm-map-sketch">
            <a className="tm-map-sketch__btn" href={sketch} target="_blank" rel="noopener noreferrer">
              약도 보기
            </a>
          </div>
        ) : null}
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
          <div
            ref={mapEl}
            className="map-box"
            role="presentation"
            style={{ height: 220, minHeight: 220, width: '100%' }}
          />
        )}

        <div className="tm-nav-apps-wrap">
          <div className="tm-nav-apps" role="group" aria-label="길찾기 앱">
            <a className="tm-nav-apps__btn" href={naverUrl} target="_blank" rel="noopener noreferrer">
              <img src={NAV_APP_ICON_SRC.naver} alt="" width={22} height={22} decoding="async" />
              <span>네이버지도</span>
            </a>
            <a className="tm-nav-apps__btn" href={tmapUrl} target="_blank" rel="noopener noreferrer">
              <img src={NAV_APP_ICON_SRC.tmap} alt="" width={22} height={22} decoding="async" />
              <span>티맵</span>
            </a>
            <a className="tm-nav-apps__btn" href={kakaoNaviUrl} target="_blank" rel="noopener noreferrer">
              <img src={NAV_APP_ICON_SRC.kakaoNavi} alt="" width={22} height={22} decoding="async" />
              <span>카카오내비</span>
            </a>
          </div>
        </div>
      </Section>
    </FadeIn>
  )
}
