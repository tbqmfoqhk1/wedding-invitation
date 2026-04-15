import { loadKakaoJsSdk } from './loadKakaoSdk'

export async function initKakao(jsKey: string): Promise<typeof window.Kakao> {
  const Kakao = await loadKakaoJsSdk()
  if (!jsKey) {
    throw new Error('Kakao JS key is empty')
  }
  if (!Kakao.isInitialized()) {
    Kakao.init(jsKey)
  }
  return Kakao
}
