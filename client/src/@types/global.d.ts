// src/types/global.d.ts
export {}

declare global {
  interface Window {
    google: any // Anda bisa mengganti `any` dengan tipe yang lebih spesifik jika diketahui
  }
}
