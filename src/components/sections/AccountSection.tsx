import { useCallback, useState } from 'react'
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

function copyBankLine(entry: AccountEntry): string {
  return `${entry.bank} ${entry.number}`
}

function entryTitle(entry: AccountEntry): string {
  if (entry.relation) return `${entry.relation} ${entry.holder}`
  if (entry.label) return `${entry.label} ${entry.holder}`
  return entry.holder
}

function AccountAccordion({
  sideLabel,
  entries,
  onCopy,
  open,
  onToggle,
}: {
  sideLabel: string
  entries: AccountEntry[]
  onCopy: (text: string) => void
  open: boolean
  onToggle: () => void
}) {
  const panelId = `acc-${sideLabel.replace(/\s/g, '')}`

  return (
    <div className="tm-acc-group">
      <button
        type="button"
        className="tm-acc-trigger"
        aria-expanded={open}
        aria-controls={panelId}
        id={`${panelId}-btn`}
        onClick={onToggle}
      >
        <span>{sideLabel}</span>
        <span className="tm-acc-trigger__chev" aria-hidden>
          ▼
        </span>
      </button>
      <div id={panelId} className="tm-acc-panel" role="region" hidden={!open} aria-labelledby={`${panelId}-btn`}>
        {entries.map((entry, i) => (
          <div
            key={`${entry.number}-${i}`}
            className="tm-acc-row"
            role="group"
            aria-label={`${entryTitle(entry)} 계좌`}
          >
            <button
              type="button"
              className="tm-acc-copy"
              onClick={() => onCopy(entry.number)}
              aria-label={`${entryTitle(entry)} 계좌번호 복사`}
            >
              <IconCopy className="contact-icon-link__svg" />
            </button>
            <div className="tm-acc-meta">
              <span className="tm-acc-meta__name">{entryTitle(entry)}</span>
              <span className="tm-acc-meta__bank">{copyBankLine(entry)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function AccountSection({ data }: Props) {
  const [msg, setMsg] = useState<string | null>(null)
  const [openGroom, setOpenGroom] = useState(true)
  const [openBride, setOpenBride] = useState(true)

  const couple = data.accounts.couple as AccountEntry[]
  const groomParents = data.accounts.groomParents as AccountEntry[]
  const brideParents = data.accounts.brideParents as AccountEntry[]

  const groomCouple = couple.find((c) => c.label === '신랑') ?? couple[0]
  const brideCouple = couple.find((c) => c.label === '신부') ?? couple[1]

  const groomEntries: AccountEntry[] = [groomCouple, ...groomParents].filter(
    (x): x is AccountEntry => Boolean(x),
  )
  const brideEntries: AccountEntry[] = [brideCouple, ...brideParents].filter(
    (x): x is AccountEntry => Boolean(x),
  )

  const introLines = data.accounts.introLines ?? []

  const copyNumber = useCallback(async (text: string) => {
    const ok = await copyToClipboard(text)
    setMsg(ok ? '복사했습니다.' : '복사에 실패했습니다.')
    window.setTimeout(() => setMsg(null), 2000)
  }, [])

  return (
    <FadeIn>
      <Section id="accounts" title="ACCOUNT">
        {introLines.length ? (
          <div className="tm-acc-intro">
            {introLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        ) : null}

        <AccountAccordion
          sideLabel="신랑측 계좌번호"
          entries={groomEntries}
          onCopy={copyNumber}
          open={openGroom}
          onToggle={() => setOpenGroom((v) => !v)}
        />
        <AccountAccordion
          sideLabel="신부측 계좌번호"
          entries={brideEntries}
          onCopy={copyNumber}
          open={openBride}
          onToggle={() => setOpenBride((v) => !v)}
        />

        {msg ? <p className="muted section-footnote">{msg}</p> : null}
      </Section>
    </FadeIn>
  )
}
