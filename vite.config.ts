import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // @를 src 폴더로 매핑
    },
  },
  server: {
    port: 5174, // 포트 5174로 명시적으로 설정
  },
})
