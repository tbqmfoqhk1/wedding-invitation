import { useState } from 'react'
import { Section } from '../layout/Section'
import { FadeIn } from '../ui/FadeIn'
import type { WeddingContent } from '../../content/schema'
import { copyToClipboard } from '../../lib/clipboard'
import { IconCopy } from '../icons/UiIcons'

type Props = {
  data: WeddingContent
}

export function AccountSection({ data }: Props) {
  const [msg, setMsg] = useState<string | null>(null)

  async function copyNumber(text: string) {
    const ok = await copyToClipboard(text)
    setMsg(ok ? '계좌번호를 복사했습니다.' : '복사에 실패했습니다.')
    window.setTimeout(() => setMsg(null), 2000)
  }

  return (
    <FadeIn>
      <Section id="accounts" title="Gift account">
        <div className="account-list">
          {data.accounts.map((a) => (
            <div key={`${a.bank}-${a.number}`} className="account-card">
              <div className="account-card__meta">
                <span>
                  {a.bank} · {a.holder}
                </span>
              </div>
              <div className="account-card__row">
                <span className="account-card__number">{a.number}</span>
                <button
                  type="button"
                  className="icon-action icon-action--sm"
                  onClick={() => copyNumber(a.number)}
                  aria-label={`${a.holder} 계좌번호 복사`}
                >
                  <IconCopy className="icon-action__svg" />
                </button>
              </div>
            </div>
          ))}
        </div>
        {msg ? <p className="muted section-footnote">{msg}</p> : null}
      </Section>
    </FadeIn>
  )
}
