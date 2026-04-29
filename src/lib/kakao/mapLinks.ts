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

/** 네이버 지도 웹 검색(목적지 검색) */
export function naverMapSearchUrl(searchQuery: string): string {
  return `https://map.naver.com/v5/search/${encodeURIComponent(searchQuery)}`
}

/** T map 웹 길찾기 (목적지 좌표·이름) — 모바일 브라우저에서 앱 연동에 사용되는 패턴 */
export function tmapRouteWebUrl(lat: number, lng: number, destinationName: string): string {
  const name = encodeURIComponent(destinationName)
  return `https://tmap.co.kr/tmap3/mobile/WebSite/webroutes/route.jsp?goalname=${name}&goalx=${lng}&goaly=${lat}`
}

/** 카카오내비 웹에서 목적지 길안내 열기 (WGS84) */
export function kakaoNaviOpenUrl(lat: number, lng: number, placeName: string): string {
  const goal_name = encodeURIComponent(placeName)
  return `https://www.kakaonavi.com/open/navigate?goal_y=${lat}&goal_x=${lng}&goal_name=${goal_name}`
}

/** 길찾기 버튼 아이콘 (레퍼런스 이미지) — 카카오내비·티맵·네이버지도 */
export const NAV_APP_ICON_SRC = {
  kakaoNavi: 'https://w.theirmood.com/src/img/card/ico_nav01.png',
  tmap: 'https://w.theirmood.com/src/img/card/ico_nav02.png',
  naver: 'https://w.theirmood.com/src/img/card/ico_nav03.png',
} as const
