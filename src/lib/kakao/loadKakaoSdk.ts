/** 카카오 JavaScript SDK (공유 등) */
let kakaoJsPromise: Promise<typeof window.Kakao> | null = null

export function loadKakaoJsSdk(): Promise<typeof window.Kakao> {
  if (typeof window !== 'undefined' && window.Kakao) {
    return Promise.resolve(window.Kakao)
  }
  if (!kakaoJsPromise) {
    kakaoJsPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector<HTMLScriptElement>(
        'script[data-kakao-js-sdk]',
      )
      if (existing) {
        existing.addEventListener('load', () => {
          if (window.Kakao) resolve(window.Kakao)
          else reject(new Error('Kakao SDK not available'))
        })
        return
      }
      const script = document.createElement('script')
      script.src =
        'https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js'
      script.async = true
      script.dataset.kakaoJsSdk = 'true'
      script.onload = () => {
        if (window.Kakao) resolve(window.Kakao)
        else reject(new Error('Kakao SDK not available'))
      }
      script.onerror = () => reject(new Error('Failed to load Kakao JS SDK'))
      document.head.appendChild(script)
    })
  }
  return kakaoJsPromise
}
