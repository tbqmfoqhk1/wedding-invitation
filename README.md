# 모바일 청첩장 (wedding-invitation)

React(Vite) + TypeScript로 만든 단일 페이지 모바일 청첩장입니다. GitHub Pages에 배포하기 위해 `base` 경로를 `/wedding-invitation/`로 설정했습니다.

## 로컬 실행

```bash
npm install
cp .env.example .env
# .env에 VITE_KAKAO_JS_KEY 입력 (= 뒤 공백 없이 한 줄로)
npm run dev
```

개발 서버 기본 주소는 `http://localhost:5173/` 입니다. GitHub Pages와 동일한 경로로 미리 보려면:

```bash
npm run dev -- --base /wedding-invitation/
```

## 콘텐츠 수정

[`src/content/wedding.json`](src/content/wedding.json)만 수정하면 문구·일정·주소·이미지 경로 등을 바꿀 수 있습니다.

**예식장 지도 핀**: `venue.lat` / `venue.lng`는 주소·도로 구간을 바탕으로 잡은 값입니다. 건물 입구와 완전히 일치시키려면 [카카오맵](https://map.kakao.com)에서 해당 장소를 검색한 뒤, 표시되는 위치에 맞게 두 값을 조정하면 됩니다.

## 이미지 파일

- **커버·OG·카카오 공유 썸네일**: 프로젝트 루트의 `public/og-image.png`에 두세요(또는 `wedding.json`의 `cover.imagePath` / `share.imagePath`를 수정).
- **갤러리**: [`wedding.json`](src/content/wedding.json)의 `gallery`에 `src`·`alt`를 나열합니다. 현재는 [Picsum](https://picsum.photos) 플레이스홀더 URL이 들어가 있으며, 실제 사진으로 바꿀 때 각 항목의 `src`를 로컬 경로(예: `/gallery/01.jpg`)나 외부 URL로 교체하면 됩니다. 갤러리 UI는 **위·아래 2장이 한 열**이고, 가로 스와이프로 다음 열을 봅니다(한 화면에 열 2개 = 썸네일 4장).

## 카카오 설정

`dapi.kakao.com` 요청이 **403**이면 키/도메인 문제가 아니라 **제품(카카오맵) 미사용**인 경우가 많습니다.

1. [카카오 개발자](https://developers.kakao.com)에서 애플리케이션을 연 뒤 **제품 설정 → 카카오맵**에서 사용을 **ON** 합니다. (신규 앱은 이게 꺼져 있으면 `sdk.js`가 403을 반환할 수 있습니다.)
2. **앱 설정 → 플랫폼 → Web**에 사이트 URL을 넣습니다. (플랫폼 키의 “JavaScript SDK 도메인”만으로는 부족할 수 있습니다.)
   - 로컬: `http://localhost:5173`, 사용 중이면 `http://localhost:5174` 등 **실제로 쓰는 포트**까지
   - 배포: `https://tbqmfoqhk1.github.io`
3. **앱 키** 화면의 **JavaScript 키**를 `.env`의 `VITE_KAKAO_JS_KEY`에 넣습니다 (`=` 뒤 공백 없이).
4. **플랫폼 키**를 따로 쓰는 경우, 도메인이 그 키에 묶여 있는지와 `.env` 키가 **같은 앱·같은 키**인지 맞춥니다.
5. 카카오 로그인·메시지(공유) 등 필요한 제품도 켭니다.

## 프로덕션 빌드

```bash
npm run build
```

결과물은 `dist/`에 생성됩니다.

## GitHub Pages 배포

1. 이 저장소를 GitHub에 `wedding-invitation` 이름으로 올립니다.
2. 저장소 **Settings > Pages**에서 **GitHub Actions**를 소스로 선택합니다.
3. (선택) **Settings > Secrets and variables > Actions**에 `VITE_KAKAO_JS_KEY`를 저장하면 CI 빌드에도 카카오 키가 주입됩니다. 없으면 배포된 사이트에서 지도·카카오 공유가 동작하지 않을 수 있습니다(로컬 `.env`는 Git에 올리지 마세요).
4. `main` 브랜치에 푸시하면 `.github/workflows/deploy.yml`이 빌드 후 Pages에 배포합니다.

배포 URL: `https://tbqmfoqhk1.github.io/wedding-invitation/`

## OG 이미지

미리보기용 이미지는 `public/og-image.png`입니다. 교체 후에도 `index.html`의 `og:image` 절대 URL이 실제 파일과 맞는지 확인하세요.
