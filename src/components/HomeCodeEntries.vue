<template lang="">
  <div class="home_code_entries_wrapper flex justify-center relative overflow-y-scroll">
    <div class="entries-group w-full grow flex flex-col absolute p-2">
      <n-spin v-if="loading" />
      <p v-if="!loading && entries.length == 0" class="mx-auto">No submissions match your search criteria.</p>
      <HomeCodeEntry v-for="(entry, index) in filteredEntries" :key="index" :entry="entry" @topicSelected="topicSelected" />
    </div>
  </div>
</template>
<script>
import HomeCodeEntry from "@/components/HomeCodeEntry.vue";
import { userStore } from "@/stores/userStore";
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
      if (this.searchInput) {
        entries = his.entries.filter((entry) => {
          return entry?.topic.toLowerCase().includes(this.searchInput.toLowerCase()) || entry.title.toLowerCase().includes(this.searchInput.toLowerCase());
        });
      }
      if (this.tag && this.tag !== "All") {
        entries = entries.filter((entry) => entry.tags.includes(this.tag));
      }
      if (this.topic) {
        entries = entries.filter((entry) => entry.topic === this.topic);
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
    return { store };
  },
};
</script>
<style lang="scss"></style>
