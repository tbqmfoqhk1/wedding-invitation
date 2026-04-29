import { useState } from 'react'
import { FadeIn } from '../ui/FadeIn'
import type { WeddingContent } from '../../content/schema'
import { SITE_URL, absoluteUrl } from '../../lib/constants'
import { assetUrl } from '../../lib/assetUrl'
import { shareToKakao } from '../../lib/kakao/share'

type Props = {
  data: WeddingContent
  kakaoKey: string
}

const KAKAO_INVITE_ICON = assetUrl('/kakao-talk-invite.png')

export function ShareSection({ data, kakaoKey }: Props) {
  const [status, setStatus] = useState<string | null>(null)
  const imageUrl = absoluteUrl(data.share.imagePath.replace(/^\//, ''))

  async function onKakaoShare() {
    if (!kakaoKey) {
      setStatus('카카오 앱 키가 필요합니다.')
      window.setTimeout(() => setStatus(null), 2500)
      return
    }
    try {
      await shareToKakao({
        jsKey: kakaoKey,
        title: data.share.title,
        description: data.share.description,
        imageUrl,
        linkUrl: SITE_URL,
      })
    } catch {
      setStatus('카카오톡 공유를 열 수 없습니다.')
      window.setTimeout(() => setStatus(null), 2500)
    }
  }

  return (
    <FadeIn>
      <div className="inv-share-kakao-block" id="share">
        <button
          type="button"
          className="inv-share-kakao-row"
          disabled={!kakaoKey}
          onClick={onKakaoShare}
        >
          <img
            className="inv-share-kakao-row__icon"
            src={KAKAO_INVITE_ICON}
            alt=""
            decoding="async"
          />
          <span>카카오톡으로 초대장 보내기</span>
        </button>
        {status ? <p className="muted inv-share-kakao-status">{status}</p> : null}
        {!kakaoKey ? (
          <p className="muted inv-share-kakao-hint">
            로컬 개발 시 <code>.env</code>에 <code>VITE_KAKAO_JS_KEY</code>를 설정해 주세요.
          </p>
        ) : null}
      </div>
    </FadeIn>
  )
}
