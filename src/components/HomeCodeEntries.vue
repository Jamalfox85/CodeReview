<template lang="">
  <div class="home_code_entries_wrapper flex justify-center relative overflow-y-scroll">
    <div class="entries-group w-full grow flex flex-col absolute p-2">
      <n-spin v-if="loading" />
      <p v-if="!loading && filteredEntries.length == 0" class="mx-auto">No submissions match the current search criteria.</p>
      <HomeCodeEntry v-for="(entry, index) in filteredEntries" :key="index" :entry="entry" @topicSelected="topicSelected" />
    </div>
  </div>
</template>
<script>
import HomeCodeEntry from "@/components/HomeCodeEntry.vue";
import { userStore } from "@/stores/userStore";
import { contentStore } from "@/stores/contentStore";
import { supabase } from "@/lib/supabaseClient";
import { NSpin } from "naive-ui";
export default {
  components: { HomeCodeEntry, NSpin },
  props: ["searchInput", "tag", "topic", "page", "itemsPerPage"],
  data() {
    return {
      entries: [],
      loading: true,
    };
  },
  computed: {
    filteredEntries() {
      let entries = this.entries;
      let currentLanguage = this.cStore.getActiveLanguage;
      if (this.searchInput) {
        entries = his.entries.filter((entry) => {
          return entry?.topic.toLowerCase().includes(this.searchInput.toLowerCase()) || entry.title.toLowerCase().includes(this.searchInput.toLowerCase());
        });
      }
      if (this.tag) {
        entries = entries.filter((entry) => entry.tags.includes(currentLanguage));
      }
      return entries;
    },
  },
  methods: {
    topicSelected(topic) {
      this.$emit("topicSelected", topic);
    },
  },
  async mounted() {
    const itemsPerPage = this.itemsPerPage;
    const start = (this.page - 1) * itemsPerPage;
    const end = start + itemsPerPage - 1;
    const { data: entries } = await supabase.from("questionSubmission").select("*, user(*)").range(start, end).order("created_at", { ascending: false });
    this.entries = entries;
    this.loading = false;
  },
  setup() {
    const store = userStore();
    const cStore = contentStore();
    return { store, cStore };
  },
};
</script>
<style lang="scss"></style>
