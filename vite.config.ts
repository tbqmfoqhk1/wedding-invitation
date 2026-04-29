import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// 로컬 dev: base '/' → public 이미지가 /og-image.png 등으로 바로 열림
// 빌드·preview: GitHub Pages용 /wedding-invitation/
export default defineConfig(({ command, mode }) => ({
  base: command === 'serve' && mode === 'development' ? '/' : '/wedding-invitation/',
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
  },
}))
