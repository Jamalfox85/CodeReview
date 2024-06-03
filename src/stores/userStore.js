import { defineStore } from "pinia";

export const userStore = defineStore("userStore", {
  state: () => ({
    session: null,
    activeQuestion: null,
  }),
  actions: {
    setSession(session) {
      this.session = session;
    },
    setActiveQuestion(question) {
      this.activeQuestion = question;
    },
  },
  getters: {
    getSession() {
      return this.session;
    },
    getActiveQuestion() {
      return this.activeQuestion;
    },
  },
});
