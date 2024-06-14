<template lang="">
  <div class="page_wrapper bg-paletteBlack text-paletteWhite">
    <div class="home_wrapper flex flex-col grow">
      <div class="home-header flex">
        <h1 class="mb-4 text-3xl font-bold">My Questions</h1>
      </div>
      <div class="core-content_wrapper flex h-full">
        <div class="flex flex-col lg:grid grid-cols-2 grow p-4">
          <HomeCodeEntry class="" v-for="(entry, index) in entries" :key="index" :entry="entry" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { userStore } from "@/stores/userStore";
import { supabase } from "@/lib/supabaseClient";
import HomeCodeEntry from "@/components/HomeCodeEntry.vue";

export default {
  components: { HomeCodeEntry },
  data() {
    return {
      entries: [],
    };
  },
  async mounted() {
    let userId = this.store.userData.id;
    const { data: entries } = await supabase.from("questionSubmission").select("*, user(*)").eq("user_id", userId).order("created_at", { ascending: false });
    this.entries = entries;
  },
  setup() {
    const store = userStore();
    return { store };
  },
};
</script>
<style lang="scss">
.filter-pill {
  background-image: linear-gradient(45deg, #5da9e9, #9bc53d);
  opacity: 0.4;
  padding: 4px 8px;
  border-radius: 4px;
  margin-right: 8px;
  cursor: pointer;
  transition: 0.2s ease;
  color: #fff;
  &.active {
    opacity: 1 !important;
    color: #fff;
    font-weight: bold;
  }
  &:hover {
    opacity: 0.8;
  }
}
</style>
