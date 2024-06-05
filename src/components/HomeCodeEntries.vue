<template lang="">
  <div class="home_code_entries_wrapper border rounded-md border-paletteBlue flex justify-center relative overflow-y-scroll">
    <div class="entries-group w-full grow flex flex-col absolute p-2 border">
      <n-spin v-if="entries.length == 0" />
      <HomeCodeEntry v-for="(entry, index) in filterredEntries" :key="index" :entry="entry" />
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
  props: ["mode"],
  data() {
    return {
      entries: [],
    };
  },
  computed: {
    filterredEntries() {
      const userData = this.store.getUserData;

      let entries = this.entries;
      if (this.mode == 1) {
        entries = this.entries.filter((entry) => entry.user_id === userData.id);
        return entries;
      }
      return entries;
    },
  },
  async mounted() {
    const { data: entries } = await supabase.from("questionSubmission").select("*, user(*)");
    this.entries = entries;
  },
  setup() {
    const store = userStore();
    return { store };
  },
};
</script>
<style lang="scss"></style>
