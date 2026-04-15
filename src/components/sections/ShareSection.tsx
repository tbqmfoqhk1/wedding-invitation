import { useState } from 'react'
import { Section } from '../layout/Section'
import { FadeIn } from '../ui/FadeIn'
import type { WeddingContent } from '../../content/schema'
import { SITE_URL, absoluteUrl } from '../../lib/constants'
import { copyToClipboard } from '../../lib/clipboard'
import { shareToKakao } from '../../lib/kakao/share'
import { IconChatBubble, IconLink } from '../icons/UiIcons'

type Props = {
  data: WeddingContent
  kakaoKey: string
}

export function ShareSection({ data, kakaoKey }: Props) {
  const [status, setStatus] = useState<string | null>(null)
  const imageUrl = absoluteUrl(data.share.imagePath.replace(/^\//, ''))

  async function onCopyLink() {
    const ok = await copyToClipboard(SITE_URL)
    setStatus(ok ? 'Link copied.' : 'Copy failed.')
    window.setTimeout(() => setStatus(null), 2000)
  }

  async function onKakaoShare() {
    if (!kakaoKey) {
      setStatus('Set the Kakao app key.')
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
      setStatus('Could not open Kakao share.')
      window.setTimeout(() => setStatus(null), 2500)
    }
  }

  return (
    <FadeIn>
      <Section id="share" title="Share">
        <div className="share-icon-row" role="group" aria-label="Share actions">
          <button
            type="button"
            className="icon-action"
            disabled={!kakaoKey}
            onClick={onKakaoShare}
            aria-label="Share via KakaoTalk"
          >
            <IconChatBubble className="icon-action__svg" />
          </button>
          <button type="button" className="icon-action" onClick={onCopyLink} aria-label="Copy link">
            <IconLink className="icon-action__svg" />
          </button>
        </div>
        {status ? <p className="muted section-footnote">{status}</p> : null}
        {!kakaoKey ? (
          <p className="muted section-footnote">
            For local dev, set <code>VITE_KAKAO_JS_KEY</code> in <code>.env</code>.
          </p>
        ) : null}
      </Section>
    </FadeIn>
  )
}
