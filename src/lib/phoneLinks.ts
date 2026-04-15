/** 전화·문자 링크용 (숫자와 + 만 유지) */
export function phoneDigits(phone: string): string {
  return phone.replace(/[^\d+]/g, '')
}

export function telHref(phone: string): string {
  return `tel:${phoneDigits(phone)}`
}

export function smsHref(phone: string): string {
  return `sms:${phoneDigits(phone)}`
}
