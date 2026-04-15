/** 프로덕션 기준 사이트 절대 URL (OG·카카오 공유용) */
export const SITE_ORIGIN = 'https://tbqmfoqhk1.github.io'

export const REPO_BASE = '/wedding-invitation/'

export const SITE_URL = `${SITE_ORIGIN}${REPO_BASE}`

export function absoluteUrl(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`
  return `${SITE_ORIGIN}${REPO_BASE.replace(/\/$/, '')}${p}`
}
