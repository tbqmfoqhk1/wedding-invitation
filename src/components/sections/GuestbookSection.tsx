import { useState } from 'react'
import { Section } from '../layout/Section'
import { FadeIn } from '../ui/FadeIn'
import { IconSend } from '../icons/UiIcons'

const STORAGE_KEY = 'wedding-invitation-guestbook'

type Entry = {
  id: string
  text: string
  createdAt: number
}

function readStoredEntries(): Entry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as Entry[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function GuestbookSection() {
  const [entries, setEntries] = useState<Entry[]>(readStoredEntries)
  const [text, setText] = useState('')

  function onSubmit() {
    const t = text.trim()
    if (!t) return
    const entry: Entry = {
      id: crypto.randomUUID(),
      text: t,
      createdAt: Date.now(),
    }
    setEntries((prev) => {
      const next = [entry, ...prev]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
    setText('')
  }

  return (
    <FadeIn>
      <Section id="guestbook" title="Guestbook" variant="guestbook">
        <p className="muted section-lead">이 기기에만 저장되는 간단한 방명록입니다.</p>
        <div className="guestbook-list" aria-live="polite">
          {entries.length === 0 ? (
            <p className="muted guestbook-empty">첫 방명을 남겨 주세요.</p>
          ) : (
            entries.map((e) => (
              <div key={e.id} className="guestbook-item">
                {e.text}
              </div>
            ))
          )}
        </div>
        <div className="guestbook-form">
          <textarea
            value={text}
            onChange={(ev) => setText(ev.target.value)}
            placeholder="축하 메시지를 남겨 주세요"
            maxLength={500}
            aria-label="방명록 내용"
          />
          <div className="guestbook-form__actions">
            <button
              type="button"
              className="icon-action"
              onClick={onSubmit}
              disabled={!text.trim()}
              aria-label="방명 남기기"
            >
              <IconSend className="icon-action__svg" />
            </button>
          </div>
        </div>
      </Section>
    </FadeIn>
  )
}
