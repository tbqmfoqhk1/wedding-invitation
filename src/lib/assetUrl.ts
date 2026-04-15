/** Vite base 경로를 반영한 정적 자산 URL */
export function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL
  const p = path.startsWith('/') ? path.slice(1) : path
  return `${base}${p}`
}
