import { defineStore } from "pinia";
import { supabase } from "@/lib/supabaseClient";

export const userStore = defineStore("userStore", {
  state: () => ({
    session: null,
    userData: null,
    activeQuestion: null,
  }),
  actions: {
    setSession(session) {
      this.session = session;
      this.checkUserProfile();
    },
    setActiveQuestion(question) {
      this.activeQuestion = question;
    },
    async checkUserProfile() {
      if (!this.session) return;

      let userId = this.session.user.id;
      const { data: user } = await supabase.from("user").select().eq("id", userId);
      if (user.length > 0) {
        this.userData = user[0];
      } else {
        const { data: newUser } = await supabase
          .from("user")
          .insert([{ id: userId, first_name: this.session.user?.user_metadata?.name, last_name: "", email: this.session.user?.email, avatar_url: this.session.user?.user_metadata?.avatar_url }])
          .select();
        this.userData = newUser[0];
      }
    },
  },
  getters: {
    getSession() {
      return this.session;
    },
    getUserData() {
      return this.userData;
    },
    getActiveQuestion() {
      return this.activeQuestion;
    },
  },
});
