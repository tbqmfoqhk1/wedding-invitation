import { useEffect, useRef, useState } from 'react'
import { Section } from '../layout/Section'
import { FadeIn } from '../ui/FadeIn'
import type { WeddingContent } from '../../content/schema'
import { copyToClipboard } from '../../lib/clipboard'
import { loadKakaoMaps } from '../../lib/kakao/loadKakaoMaps'
import { kakaoMapWebUrl } from '../../lib/kakao/mapLinks'
import { IconCopy, IconMapPin } from '../icons/UiIcons'

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
  const mapWeb = kakaoMapWebUrl(venue.placeName, venue.lat, venue.lng)
  const [copyMsg, setCopyMsg] = useState<string | null>(null)

  async function copyAddressForDirections() {
    const ok = await copyToClipboard(venue.address)
    setCopyMsg(ok ? '주소를 복사했습니다.' : '복사에 실패했습니다.')
    window.setTimeout(() => setCopyMsg(null), 2000)
  }

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
      <Section id="map" title="Directions">
        <div className="map-section__lead-scroll">
          <p className="muted section-lead map-section__lead-line">
            {venue.placeLabel ?? venue.placeName}
          </p>
        </div>
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
          <button
            type="button"
            className="icon-action"
            onClick={copyAddressForDirections}
            aria-label="주소 복사"
          >
            <IconCopy className="icon-action__svg" />
          </button>
        </div>
        {copyMsg ? <p className="muted section-footnote">{copyMsg}</p> : null}
      </Section>
    </FadeIn>
  )
}
