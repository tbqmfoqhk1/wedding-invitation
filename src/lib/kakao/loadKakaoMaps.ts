/** 카카오 지도 JavaScript API */
let mapsPromise: Promise<void> | null = null

export function loadKakaoMaps(appKey: string): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('window is undefined'))
  }
  if (window.kakao?.maps) {
    return Promise.resolve()
  }
  if (!mapsPromise) {
    mapsPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script')
      // http 로컬 페이지에서 // 는 http://dapi 로 이어져 403이 날 수 있음 → 항상 https 사용
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${encodeURIComponent(appKey)}&autoload=false&libraries=services`
      script.async = true
      script.onload = () => {
        window.kakao.maps.load(() => resolve())
      }
      script.onerror = () => reject(new Error('Failed to load Kakao Maps SDK'))
      document.head.appendChild(script)
    })
  }
  return mapsPromise
}
