import { initKakao } from './initKakao'
import { SITE_URL } from '../constants'

export async function shareToKakao(params: {
  jsKey: string
  title: string
  description: string
  imageUrl: string
  linkUrl?: string
}): Promise<void> {
  const Kakao = await initKakao(params.jsKey)
  const link = params.linkUrl ?? SITE_URL

  await Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: params.title,
      description: params.description,
      imageUrl: params.imageUrl,
      link: {
        mobileWebUrl: link,
        webUrl: link,
      },
    },
    buttons: [
      {
        title: 'View invitation',
        link: {
          mobileWebUrl: link,
          webUrl: link,
        },
      },
    ],
  })
}
