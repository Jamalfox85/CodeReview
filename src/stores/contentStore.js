import { defineStore } from "pinia";
import { supabase } from "@/lib/supabaseClient";
import { userStore } from "./userStore";
import { getDailyVideo, getDailyArticle } from "@/services/daily_focus_service";

export const contentStore = defineStore("contentStore", {
  state: () => ({
    activeLanguage: null,
    dailyFocusInfo: {},
    roadmap: null,
  }),
  actions: {
    setActiveLanguage(language) {
      this.activeLanguage = language;
      this.setDailyFocus(language);
      this.setRoadmap(language);
    },
    async setDailyFocus(language) {
      let focusObject = {};
      const store = userStore();
      try {
        const { data, error } = await supabase.from("dailyFocus").select("*").eq("user_id", store.userData.id).eq("language", language);
        // Case #1 - Daily focus found for user and language
        if (data.length > 0) {
          focusObject = data[0];
          this.dailyFocusInfo = focusObject;
        } else if (data.length === 0) {
          // Case #2 - No daily focus found for user and language
          focusObject = this.setNewDailyFocus();
        }
      } catch (error) {
        // Case #3 - Error fetching daily focus
        window.$message.error("Error fetching daily focus");
        throw new Error(error.message);
      }
    },
    async setNewDailyFocus() {
      const store = userStore();
      let focus = "Vue Router";
      const videoLink = await getDailyVideo(focus);
      const articleLink = await getDailyArticle(focus);
      const { data, error } = await supabase
        .from("dailyFocus")
        .insert([
          {
            user_id: store.userData.id,
            language: this.activeLanguage,
            video_link: videoLink,
            article_link: articleLink,
            focus: focus,
          },
        ])
        .select();

      if (data) {
        this.dailyFocusInfo = data[0];
        return data[0];
      }

      if (error) {
        window.$message.error(error.message);
        return error;
      }
    },
    async setRoadmap() {
      let { data, error } = await supabase.from("RoadmapMajorTopics").select("*, RoadmapMinorTopics(*)").eq("language_id", 3);
      if (data) {
        this.roadmap = data;
      }
    },
  },
  getters: {
    getActiveLanguage() {
      return this.activeLanguage;
    },
    getDailyFocus() {
      // console.log("Daily Focus Info:", this.dailyFocusInfo);
      return this.dailyFocusInfo;
    },
    getRoadmap() {
      return this.roadmap;
    },
  },
});
