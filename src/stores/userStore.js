import { defineStore } from "pinia";

export const userStore = defineStore("userStore", {
  state: () => ({
    session: null,
  }),
  actions: {
    setSession(session) {
      this.session = session;
    },
  },
  getters: {
    getSession() {
      return this.session;
    },
  },
});
