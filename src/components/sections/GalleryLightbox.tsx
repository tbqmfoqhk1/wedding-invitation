import { useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { IconChevronLeft, IconChevronRight, IconClose } from '../icons/UiIcons'

const SWIPE_MIN_PX = 48

type Props = {
  open: boolean
  index: number
  items: { src: string; alt: string }[]
  onClose: () => void
  onIndexChange: (index: number) => void
}

export function GalleryLightbox({
  open,
  index,
  items,
  onClose,
  onIndexChange,
}: Props) {
  const touchStartX = useRef<number | null>(null)

  const goPrev = useCallback(() => {
    if (index > 0) onIndexChange(index - 1)
  }, [index, onIndexChange])

  const goNext = useCallback(() => {
    if (index < items.length - 1) onIndexChange(index + 1)
  }, [index, items.length, onIndexChange])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose, goPrev, goNext])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  if (!open || items.length === 0) return null

  const current = items[index]
  if (!current) return null

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const endX = e.changedTouches[0].clientX
    const delta = endX - touchStartX.current
    touchStartX.current = null
    if (delta > SWIPE_MIN_PX) goPrev()
    else if (delta < -SWIPE_MIN_PX) goNext()
  }

  const node = (
    <div
      className="gallery-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="갤러리 확대 보기"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <button
        type="button"
        className="gallery-lightbox__close"
        onClick={onClose}
        aria-label="닫기"
      >
        <IconClose />
      </button>
      <div
        className="gallery-lightbox__stage"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          className="gallery-lightbox__img"
          src={current.src}
          alt={current.alt}
          draggable={false}
        />
      </div>
      <div className="gallery-lightbox__toolbar">
        <button
          type="button"
          className="gallery-lightbox__nav"
          onClick={goPrev}
          disabled={index <= 0}
          aria-label="이전 사진"
        >
          <IconChevronLeft />
        </button>
        <span className="gallery-lightbox__counter">
          {index + 1} / {items.length}
        </span>
        <button
          type="button"
          className="gallery-lightbox__nav"
          onClick={goNext}
          disabled={index >= items.length - 1}
          aria-label="다음 사진"
        >
          <IconChevronRight />
        </button>
      </div>
    </div>
  )

  return createPortal(node, document.body)
}
