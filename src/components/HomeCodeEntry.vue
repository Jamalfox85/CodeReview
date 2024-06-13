<template lang="">
  <!-- <RouterLink to="/review"> -->
  <div :class="{ active: false }" class="entry_wrapper flex flex-col rounded-lg p-4 border border-paletteBlue" @click="navToReview">
    <!-- @click.self="navToReview" -->
    <div class="entry-header flex">
      <p class="entry-title text-xl font-bold">{{ entry.title }}</p>
      <div class="profile-group ml-auto">
        <div class="default-icon bg-primary-gradient h-8 w-8 rounded-full overflow-hidden flex items-center justify-center">
          <img :src="profileImage" />
        </div>
      </div>
    </div>
    <div class="flex items-center">
      <p v-if="entry.topic" class="entry-topic mr-8 font-semibold text-paletteBlue" @click="topicSelected">{{ entry.topic }}</p>
      <EntryTag v-for="(tag, index) in entry.tags" :key="index" :label="tag" />
    </div>
    <p class="entry-description">{{ entry.description }}</p>
    <div class="entry-footer flex flex-wrap items-center mt-auto">
      <!-- <div class="filter-group flex flex-wrap mr-2">
      </div> -->
      <p class="ml-auto">
        Uploaded by <b>{{ entry.user.username ? entry.user.username : `${entry.user.first_name} ${entry.user.last_name}` }}</b> {{ formattedDate }}.
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
    profileImage() {
      return `https://ixieai-profile-photos.s3.eu-north-1.amazonaws.com/${this.entry.user.avatar_id}.jpg`;
    },
  },
  methods: {
    async navToReview() {
      this.store.setActiveQuestion(this.entry);
      this.$router.push({ name: "Review" });
    },
    topicSelected() {
      this.$emit("topicSelected", this.entry.topic);
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
  height: 150px;
  margin: 8px;
  box-shadow: 1px 2px 2px hsl(207 76% 64% / 0.44);
  transition: all 0.1s;
  &.active,
  &:hover {
    border-left: solid 12px #5da9e9;
    box-shadow: 6px 12px 12px hsl(207 76% 64% / 0.31);
  }
  .entry-description {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
  }
}
</style>
