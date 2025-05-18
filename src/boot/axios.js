// src/boot/axios.js
import { defineBoot } from '#q-app/wrappers'
import axios from 'axios'
import { createPinia } from 'pinia'
import { useAuthStore } from 'src/stores/auth'

// 모듈 최상위에 api 인스턴스 정의 (module scope)
const api = axios.create({
  // 환경 변수에 설정된 API URL 우선, 없으면 하드코딩된 백엔드 IP 사용
  baseURL: process.env.API_BASE_URL || 'http://100.126.147.123:8000',
})

// 요청 인터셉터: Pinia 스토어의 토큰을 헤더에 자동 추가
api.interceptors.request.use((config) => {
  const auth = useAuthStore()
  if (auth.token) {
    config.headers.Authorization = `Bearer ${auth.token}`
  }
  return config
})

// defineBoot는 파일당 한 번만 호출
export default defineBoot(({ app }) => {
  // 1) Pinia 등록
  app.use(createPinia())

  // 2) Vue 컴포넌트에서 this.$axios, this.$api로 사용
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

// 다른 파일에서 import { api } 가능
export { api }
