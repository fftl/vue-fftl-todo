import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    username: '',
    accessToken: '',
    refreshToken: '',
  }),

  actions: {
    setToken(access: string, refresh: string, username: string) {
      this.accessToken = access
      this.refreshToken = refresh
      this.username = username
    },
    clearTokens() {
      this.accessToken = ''
      this.refreshToken = ''
      this.username = ''
    },
  },

  persist: true,
})
