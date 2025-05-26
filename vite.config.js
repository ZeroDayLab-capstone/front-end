import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      'jwt-decode': 'jwt-decode/dist/jwt-decode.esm.js', // 경로를 ESM 버전으로 지정
    },
  },
})
