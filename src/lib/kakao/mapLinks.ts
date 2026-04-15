/**
 * 카카오맵 웹/앱 연동용 URL
 * @see https://apis.map.kakao.com/web/guide/#url
 */
export function kakaoMapWebUrl(
  placeName: string,
  lat: number,
  lng: number,
): string {
  const name = encodeURIComponent(placeName)
  return `https://map.kakao.com/link/map/${name},${lat},${lng}`
}

/** 목적지까지 길찾기(웹) */
export function kakaoRouteWebUrl(
  placeName: string,
  lat: number,
  lng: number,
): string {
  const name = encodeURIComponent(placeName)
  return `https://map.kakao.com/link/to/${name},${lat},${lng}`
}

/**
 * 카카오맵 앱에서 위치 보기 (모바일)
 * 스킴 미지원 환경에서는 브라우저가 무시하거나 스토어로 이동할 수 있음
 */
export function kakaoMapAppLookUrl(lat: number, lng: number): string {
  return `kakaomap://look?p=${lat},${lng}`
}
