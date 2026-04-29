import { MobileFrame } from '../components/layout/MobileFrame'
import { weddingJson } from '../content/schema'
import { CoverSection } from '../components/sections/CoverSection'
import { InvitationIntroSection } from '../components/sections/InvitationIntroSection'
import { ContactSection } from '../components/sections/ContactSection'
import { CeremonyHighlightSection } from '../components/sections/CeremonyHighlightSection'
import { GallerySection } from '../components/sections/GallerySection'
import { VideoSection } from '../components/sections/VideoSection'
import { MapSection } from '../components/sections/MapSection'
import { VenueExtraInfoSection } from '../components/sections/VenueExtraInfoSection'
import { AccountSection } from '../components/sections/AccountSection'
import { SnapUploadSection } from '../components/sections/SnapUploadSection'
import { ShareSection } from '../components/sections/ShareSection'

const kakaoKey = import.meta.env.VITE_KAKAO_JS_KEY ?? ''

export default function App() {
  const data = weddingJson

  return (
    <MobileFrame>
      <CoverSection data={data} />
      <InvitationIntroSection data={data} />
      <ContactSection data={data} />
      <CeremonyHighlightSection data={data} />
      <GallerySection data={data} />
      <VideoSection data={data} />
      <MapSection data={data} kakaoKey={kakaoKey} />
      <VenueExtraInfoSection data={data} />
      <AccountSection data={data} />
      <SnapUploadSection data={data} />
      <ShareSection data={data} kakaoKey={kakaoKey} />
      <footer className="wedding-footer muted tm-footer">
        Copyrightⓒ{new Date().getFullYear()} {data.couple.groom} · {data.couple.bride}. All rights reserved.
      </footer>
    </MobileFrame>
  )
}
