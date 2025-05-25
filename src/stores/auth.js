// src/stores/auth.js
import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === 'admin',
  },
  actions: {
    async login(email, password) {
      if (email === 'admin' && password === '1234') {
        // 프론트엔드에서만 처리하는 관리자 로그인
        this.user = { role: 'admin' }
        this.token = 'fake-admin-token' // 실제 서버에서는 사용하지 않지만, 예시로 토큰을 설정
        localStorage.setItem('token', this.token)
        return
      }

      const res = await api.post('/auth/login', { email, password })
      this.token = res.data.token
      localStorage.setItem('token', this.token)
      await this.fetchUser()
    },
    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
    },
    async fetchUser() {
      if (!this.token) return
      const res = await api.get('/auth/me', {
        headers: { Authorization: `Bearer ${this.token}` },
      })
      this.user = res.data
    },
  },
})
