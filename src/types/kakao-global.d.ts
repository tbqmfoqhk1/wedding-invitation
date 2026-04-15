export {}

declare global {
  interface Window {
    Kakao: KakaoNamespace
    kakao: KakaoMapsRoot
  }
}

interface KakaoNamespace {
  init: (key: string) => void
  isInitialized: () => boolean
  Share: {
    sendDefault: (options: KakaoFeedOptions) => Promise<void>
  }
}

interface KakaoFeedOptions {
  objectType: 'feed'
  content: {
    title: string
    description: string
    imageUrl: string
    link: { mobileWebUrl: string; webUrl: string }
  }
  buttons: Array<{
    title: string
    link: { mobileWebUrl: string; webUrl: string }
  }>
}

interface KakaoMapsRoot {
  maps: {
    load: (callback: () => void) => void
    Map: new (
      container: HTMLElement,
      options: { center: KakaoLatLng; level: number },
    ) => KakaoMap
    LatLng: new (lat: number, lng: number) => KakaoLatLng
    Marker: new (options: { position: KakaoLatLng }) => KakaoMarker
  }
}

type KakaoLatLng = object

type KakaoMap = object

type KakaoMarker = {
  setMap: (map: KakaoMap | null) => void
}
