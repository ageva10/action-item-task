import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  state: () => ({
    user: null,
    users: []
  }),
  getters: {
    getUser: (state) => state.user,
    getUsers: (state) => state.users
  },
  actions: {

  }
})
