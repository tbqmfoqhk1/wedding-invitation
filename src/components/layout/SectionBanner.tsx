type Props = {
  title: string
  subtitle?: string
}

/** 레퍼런스: 양쪽 라인 + 중앙 타이틀 (톤 통일, 배경 구분 없음) */
export function SectionBanner({ title, subtitle }: Props) {
  const stack = Boolean(subtitle)
  return (
    <header
      className={['section-banner', stack ? 'section-banner--stack' : ''].filter(Boolean).join(' ')}
      role="presentation"
    >
      <span className="section-banner__line" aria-hidden />
      {stack ? (
        <div className="section-banner__mid">
          <h2 className="section-banner__title">{title}</h2>
          <p className="section-banner__subtitle">{subtitle}</p>
        </div>
      ) : (
        <h2 className="section-banner__title">{title}</h2>
      )}
      <span className="section-banner__line" aria-hidden />
    </header>
  )
}
