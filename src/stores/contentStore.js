import { defineStore } from "pinia";

export const contentStore = defineStore("contentStore", {
  state: () => ({
    activeLanguage: null,
  }),
  actions: {
    setActiveLanguage(language) {
      this.activeLanguage = language;
    },
  },
  getters: {
    getActiveLanguage() {
      return this.activeLanguage;
    },
  },
});
