import { useEffect, useMemo, useState } from 'react'
import { FadeIn } from '../ui/FadeIn'
import { Section } from '../layout/Section'
import type { WeddingContent } from '../../content/schema'

type Props = {
  data: WeddingContent
}

function buildCalendarCells(year: number, month: number, highlightDay: number): { day: number | null; hl: boolean }[] {
  const firstDow = new Date(year, month - 1, 1).getDay()
  const lastDate = new Date(year, month, 0).getDate()
  const cells: { day: number | null; hl: boolean }[] = []
  for (let i = 0; i < firstDow; i++) cells.push({ day: null, hl: false })
  for (let d = 1; d <= lastDate; d++) cells.push({ day: d, hl: d === highlightDay })
  while (cells.length % 7 !== 0) cells.push({ day: null, hl: false })
  return cells
}

function isSunday(year: number, month: number, day: number): boolean {
  return new Date(year, month - 1, day).getDay() === 0
}

export function CeremonyHighlightSection({ data }: Props) {
  const c = data.ceremony
  const target = useMemo(() => new Date(c.isoDateTime), [c.isoDateTime])
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(t)
  }, [])

  const diffMs = Math.max(0, target.getTime() - now.getTime())
  const totalSec = Math.floor(diffMs / 1000)
  const days = Math.floor(totalSec / 86400)
  const hours = Math.floor((totalSec % 86400) / 3600)
  const mins = Math.floor((totalSec % 3600) / 60)
  const secs = totalSec % 60

  const cells = useMemo(
    () => buildCalendarCells(c.calendarYear, c.calendarMonth, c.calendarHighlightDay),
    [c.calendarYear, c.calendarMonth, c.calendarHighlightDay],
  )

  const weekdays = ['일', '월', '화', '수', '목', '금', '토']

  const calendarHead = `${c.calendarYear}.${String(c.calendarMonth).padStart(2, '0')}`

  return (
    <FadeIn>
      <Section id="ceremony" title="SAVE THE DATE">
        <div className="tm-save-strip inv-date-strip">
          <p className="tm-save-strip__ymd inv-date-strip__ymd">{c.dateLabel}</p>
          <p className="tm-save-strip__sub inv-date-strip__sub">
            {c.weekdayLabelKo} {c.timeLabel}
          </p>
        </div>

        <div className="tm-dday-wrap">
          <div className="tm-dday-circle">
            <span className="tm-dday-circle__num">{days}</span>
            <span className="tm-dday-circle__lab">DAYS</span>
          </div>
        </div>

        <div className="tm-count-inline" aria-live="polite">
          <span>{days}</span>
          <span className="tm-count-inline__sep">:</span>
          <span>{String(hours).padStart(2, '0')}</span>
          <span className="tm-count-inline__sep">:</span>
          <span>{String(mins).padStart(2, '0')}</span>
          <span className="tm-count-inline__sep">:</span>
          <span>{String(secs).padStart(2, '0')}</span>
        </div>

        <p className="inv-countdown__caption">
          {data.couple.bride}, {data.couple.groom}의 결혼식이{' '}
          {days === 0 && diffMs <= 0 ? '오늘입니다.' : `${days}일 남았습니다.`}
        </p>

        <div className="inv-cal">
          <p className="inv-cal__head">{calendarHead}</p>
          <div className="inv-cal__grid-labels">
            {weekdays.map((w, wi) => (
              <span key={w} className={wi === 0 ? 'tm-cal-wd--sun' : ''}>
                {w}
              </span>
            ))}
          </div>
          <div className="inv-cal__grid-days">
            {cells.map((cell, i) => {
              const sun =
                cell.day != null && isSunday(c.calendarYear, c.calendarMonth, cell.day)
              return (
                <div
                  key={i}
                  className={[
                    'inv-cal__cell',
                    cell.day == null ? 'inv-cal__cell--muted' : '',
                    cell.hl ? 'inv-cal__cell--hl' : '',
                    sun && cell.day != null ? 'tm-cal-cell--sun' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {cell.day ?? ''}
                </div>
              )
            })}
          </div>
        </div>
      </Section>
    </FadeIn>
  )
}
