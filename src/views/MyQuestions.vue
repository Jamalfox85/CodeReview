<template lang="">
  <div class="page_wrapper">
    <div class="home_wrapper flex flex-col grow">
      <div class="home-header flex">
        <h1 class="mb-4 text-3xl font-bold">My Questions</h1>
        <RouterLink to="/submit" class="ml-auto">
          <n-button class="bg-primary-gradient text-paletteWhite rounded-lg">Submit a Question</n-button>
        </RouterLink>
      </div>
      <div class="quesiton-filters flex mb-4">
        <div class="filter-pill" :class="{ active: mode == 0 }" @click="mode = 0">All Questions</div>
        <div class="filter-pill" :class="{ active: mode == 1 }" @click="mode = 1">My Questions</div>
      </div>
      <div class="core-content_wrapper flex grow">
        <HomeCodeEntries class="w-1/2 m-2 grow" :mode="mode" />
      </div>
    </div>
  </div>
</template>
<script>
import HomeCodeEntries from "@/components/HomeCodeEntries.vue";
import { NButton } from "naive-ui";
export default {
  components: { HomeCodeEntries, NButton },
  data() {
    return {
      mode: 0,
    };
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
