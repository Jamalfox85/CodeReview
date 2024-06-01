<template lang="">
  <div class="page_wrapper">
    <div class="home_wrapper flex flex-col grow">
      <div class="home-header flex">
        <h1 class="mb-4 text-3xl font-bold">All Questions</h1>
        <RouterLink to="/submit" class="ml-auto">
          <n-button class="bg-primary-gradient text-paletteWhite rounded-lg">Submit a Question</n-button>
        </RouterLink>
      </div>
      <div class="core-content_wrapper flex grow">
        <HomeCodeEntries class="w-1/2 m-2 grow" />
      </div>
    </div>
  </div>
</template>
<script>
import HomeCodeEntries from "@/components/HomeCodeEntries.vue";
import { NButton } from "naive-ui";
export default {
  components: { HomeCodeEntries, NButton },
};
</script>
<style lang="scss"></style>
