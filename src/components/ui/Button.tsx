import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'outline'
  children: ReactNode
}

export function Button({
  variant = 'primary',
  className = '',
  children,
  ...rest
}: Props) {
  const v = `btn btn--${variant}`
  return (
    <button type="button" className={`${v} ${className}`.trim()} {...rest}>
      {children}
    </button>
  )
}
