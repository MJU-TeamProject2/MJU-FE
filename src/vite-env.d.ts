/// <reference types="vite/client" />
interface ImportMetaEnv {
  VITE_API_BASE_URL: string // 환경 변수 타입 선언
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
