import { defineStore } from 'pinia'

const useUserStore = defineStore('user', {
  state: () => ({
    isLogin: false,
    userName: ''
  }),

  actions: {
    login() {
      this.isLogin = true
      this.userName = 'admin'
    },
    logout() {
      this.isLogin = false
    }
  }
})

export default useUserStore
