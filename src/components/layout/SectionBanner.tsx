type Props = {
  title: string
}

/** 레퍼런스: 양쪽 라인 + 중앙 타이틀 (톤 통일, 배경 구분 없음) */
export function SectionBanner({ title }: Props) {
  return (
    <header className="section-banner" role="presentation">
      <span className="section-banner__line" aria-hidden />
      <h2 className="section-banner__title">{title}</h2>
      <span className="section-banner__line" aria-hidden />
    </header>
  )
}
