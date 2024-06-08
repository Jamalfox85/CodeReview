<template lang="">
  <!-- <RouterLink to="/review"> -->
  <div :class="{ active: false }" class="entry_wrapper flex flex-col rounded-lg p-4 border border-paletteBlue" @click="navToReview">
    <div class="entry-header flex">
      <p class="entry-title text-xl font-bold">{{ entry.title }}</p>
      <div class="profile-group ml-auto">
        <div class="default-icon bg-primary-gradient h-12 w-12 rounded-full flex items-center justify-center">
          <font-awesome-icon :icon="['fas', 'user']" class="text-2xl text-paletteWhite" />
        </div>
      </div>
    </div>
    <p class="entry-topic mb-2 font-semibold text-paletteBlue">{{ entry.topic }}</p>
    <p class="entry-description">{{ entry.description }}</p>
    <div class="entry-footer flex flex-wrap items-center mt-auto">
      <div class="filter-group flex flex-wrap mr-2">
        <EntryTag v-for="(tag, index) in entry.tags" :key="index" :label="tag" />
      </div>
      <p class="ml-auto">
        Uploaded by <b>{{ `${entry.user.first_name} ${entry.user.last_name}` }}</b> {{ formattedDate }}.
      </p>
    </div>
  </div>
  <!-- </RouterLink> -->
</template>
<script>
import EntryTag from "@/components/EntryTag.vue";
import { userStore } from "@/stores/userStore";
import { formatDistanceToNow } from "date-fns";

export default {
  components: { EntryTag },
  props: ["entry"],
  computed: {
    formattedDate() {
      return formatDistanceToNow(new Date(this.entry.created_at), { addSuffix: true });
    },
  },
  methods: {
    async navToReview() {
      this.store.setActiveQuestion(this.entry);
      this.$router.push({ name: "Review" });
    },
  },
  setup() {
    const store = userStore();
    return { store };
  },
};
</script>
<style lang="scss">
.entry_wrapper {
  height: 225px;
  margin: 8px;
  &.active {
    border-left: solid 12px #5da9e9;
  }
  .entry-description {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
  }
}
</style>
