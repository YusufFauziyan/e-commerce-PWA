// src/stores/auth.ts
import { getUserInfo } from '@/services/userService'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null, // Data user, bisa diatur sesuai kebutuhan
    token: localStorage.getItem('access_token') || null,
    isAuthenticated: false,
  }),
  actions: {
    setUser({ user, accessToken }: { user: User; accessToken: string }) {
      this.user = user
      this.token = accessToken
      this.isAuthenticated = true

      //   save token to localStorage
      localStorage.setItem('access_token', accessToken)
    },
    clearUser() {
      this.user = null
      this.token = null
      this.isAuthenticated = false

      // remove token from localStorage
      localStorage.removeItem('access_token')
    },

    // initialize session
    async initializeSession() {
      const token = localStorage.getItem('access_token')
      if (token) {
        try {
          // Panggil API untuk mendapatkan data user
          const userInfo = await getUserInfo()

          // Simpan data user ke store
          this.setUser({ user: userInfo, accessToken: token })
        } catch (error) {
          console.error('Failed to fetch user info:', error)
          this.clearUser() // Jika token tidak valid, bersihkan sesi
        }
      }
    },
  },
})

interface User {
  id: string
  email: string
  username?: string
  role?: string
}
