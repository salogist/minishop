/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  // سایر متغیرهای محیطی را اینجا اضافه کنید
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare namespace NodeJS {
  interface ProcessEnv {
    readonly REACT_APP_API_URL: string;
    // سایر متغیرهای محیطی را اینجا اضافه کنید
  }
} 