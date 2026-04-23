import { Fragment, useState } from 'react'
import { Section } from '../layout/Section'
import { FadeIn } from '../ui/FadeIn'
import type { WeddingContent } from '../../content/schema'
import { copyToClipboard } from '../../lib/clipboard'
import { IconCopy } from '../icons/UiIcons'

type Props = {
  data: WeddingContent
}

type AccountEntry = {
  holder: string
  bank: string
  number: string
  label?: string
  relation?: string
}

function copyLabel(entry: AccountEntry): string {
  if (entry.relation) return `${entry.relation} ${entry.holder} 계좌번호 복사`
  if (entry.label) return `${entry.label} ${entry.holder} 계좌번호 복사`
  return `${entry.holder} 계좌번호 복사`
}

function BankCopyRow({ entry, onCopy }: { entry: AccountEntry; onCopy: (text: string) => void }) {
  return (
    <div className="account-card__bank-row" role="group" aria-label={`${entry.holder} ${entry.bank} 계좌`}>
      <span className="account-card__bank">{entry.bank}</span>
      <div className="contact-actions account-card__actions">
        <button
          type="button"
          className="contact-icon-link"
          onClick={() => onCopy(entry.number)}
          aria-label={copyLabel(entry)}
        >
          <IconCopy className="contact-icon-link__svg" />
        </button>
      </div>
    </div>
  )
}

function AccountCardCouple({
  entry,
  onCopy,
}: {
  entry: AccountEntry
  onCopy: (text: string) => void
}) {
  return (
    <div className="contact-card contact-card--couple account-card">
      <p className="contact-card__role">{entry.label ?? ''}</p>
      <p className="contact-card__name">{entry.holder}</p>
      <BankCopyRow entry={entry} onCopy={onCopy} />
      <span className="visually-hidden">
        {entry.holder} {entry.bank} 계좌번호 {entry.number}
      </span>
    </div>
  )
}

function AccountCardParent({
  entry,
  onCopy,
}: {
  entry: AccountEntry
  onCopy: (text: string) => void
}) {
  return (
    <div className="contact-card contact-card--parent account-card">
      <p className="contact-card__identity">
        <span className="contact-card__rel">{entry.relation}</span>{' '}
        <span className="contact-card__nm">{entry.holder}</span>
      </p>
      <BankCopyRow entry={entry} onCopy={onCopy} />
      <span className="visually-hidden">
        {entry.holder} {entry.bank} 계좌번호 {entry.number}
      </span>
    </div>
  )
}

export function AccountSection({ data }: Props) {
  const [msg, setMsg] = useState<string | null>(null)
  const couple = data.accounts.couple as AccountEntry[]
  const groomParents = data.accounts.groomParents as AccountEntry[]
  const brideParents = data.accounts.brideParents as AccountEntry[]

  const showPairedParents = groomParents.length > 0 && brideParents.length > 0

  async function copyNumber(text: string) {
    const ok = await copyToClipboard(text)
    setMsg(ok ? '계좌번호를 복사했습니다.' : '복사에 실패했습니다.')
    window.setTimeout(() => setMsg(null), 2000)
  }

  return (
    <FadeIn>
      <Section id="accounts" title="Gift account">
        <div className="contact-board">
          <div className="contact-board__grid">
            {couple.map((entry, i) => (
              <AccountCardCouple key={`couple-${entry.number}-${i}`} entry={entry} onCopy={copyNumber} />
            ))}

            {showPairedParents ? (
              <div className="contact-honju">
                <span className="contact-honju__side">신랑 측 혼주</span>
                <span className="contact-honju__mark" aria-hidden>
                  ▲
                </span>
                <span className="contact-honju__side">신부 측 혼주</span>
              </div>
            ) : null}

            {showPairedParents
              ? groomParents.map((p, i) => {
                  const bp = brideParents[i]
                  if (!bp) return null
                  return (
                    <Fragment key={`${p.relation}-${p.holder}-${p.number}-${bp.holder}`}>
                      <AccountCardParent entry={p} onCopy={copyNumber} />
                      <AccountCardParent entry={bp} onCopy={copyNumber} />
                    </Fragment>
                  )
                })
              : null}
          </div>
        </div>
        {msg ? <p className="muted section-footnote">{msg}</p> : null}
      </Section>
    </FadeIn>
  )
}
