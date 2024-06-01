<template lang="">
  <div class="home_code_entries_wrapper border rounded-md border-paletteBlue flex justify-center relative overflow-y-scroll">
    <div class="entries-group grow flex flex-col absolute p-4">
      <n-spin v-if="entries.length == 0" />
      <HomeCodeEntry v-for="(entry, index) in entries" :key="index" :entry="entry" />
    </div>
  </div>
</template>
<script>
import HomeCodeEntry from "@/components/HomeCodeEntry.vue";
import { supabase } from "@/lib/supabaseClient";
import { NSpin } from "naive-ui";
export default {
  components: { HomeCodeEntry, NSpin },
  data() {
    return {
      entries: [],
    };
  },
  async mounted() {
    const { data: entries } = await supabase.from("questionSubmission").select();
    this.entries = entries;
  },
};
</script>
<style lang="scss"></style>
