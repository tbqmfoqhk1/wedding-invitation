import { MobileFrame } from '../components/layout/MobileFrame'
import { weddingJson } from '../content/schema'
import { CoverSection } from '../components/sections/CoverSection'
import { GreetingSection } from '../components/sections/GreetingSection'
import { ContactSection } from '../components/sections/ContactSection'
import { GallerySection } from '../components/sections/GallerySection'
import { VideoSection } from '../components/sections/VideoSection'
import { MapSection } from '../components/sections/MapSection'
import { AccountSection } from '../components/sections/AccountSection'
// import { GuestbookSection } from '../components/sections/GuestbookSection'
import { ShareSection } from '../components/sections/ShareSection'

const kakaoKey = import.meta.env.VITE_KAKAO_JS_KEY ?? ''

export default function App() {
  const data = weddingJson

  return (
    <MobileFrame>
      <CoverSection data={data} />
      <GreetingSection data={data} />
      <ContactSection data={data} />
      <GallerySection data={data} />
      <VideoSection data={data} />
      <MapSection data={data} kakaoKey={kakaoKey} />
      <AccountSection data={data} />
      {/* <GuestbookSection /> */}
      <ShareSection data={data} kakaoKey={kakaoKey} />
      <footer className="wedding-footer muted">
        © {new Date().getFullYear()} {data.couple.groom} · {data.couple.bride}
      </footer>
    </MobileFrame>
  )
}
