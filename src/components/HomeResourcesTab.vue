<template lang="">
  <div class="p-2 text-paletteWhite h-full">
    <div class="flex p-4">
      <div class="col-left grow">
        <h1 class="text-2xl">{{ dailyFocus.focus }}</h1>
      </div>
      <div class="col-right w-1/2 ml-auto">
        <div class="video-group mb-2">
          <h2>Video Resource</h2>
          <iframe width="100%" height="315" :src="dailyFocus.video_link" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <div class="article-group">
          <h2>Article Resource</h2>
          <n-card title="Small Card" size="small" class="bg-paletteBlue text-paletteWhite">
            <a :href="dailyFocus.article_link" target="_blank"><n-button>Read Now</n-button></a></n-card
          >
        </div>
      </div>
    </div>
    {{ dailyFocus }}
  </div>
</template>
<script>
import { contentStore } from "@/stores/contentStore";
import { NCard, NButton } from "naive-ui";
export default {
  components: { NCard, NButton },
  data() {
    return {
      dailyFocus: {},
    };
  },
  mounted() {
    let dailyFocus = this.cStore.getDailyFocus;
    this.dailyFocus = dailyFocus;
  },
  watch: {
    cStore: {
      handler() {
        let dailyFocus = this.cStore.getDailyFocus;
        this.dailyFocus = dailyFocus;
      },
      deep: true,
    },
  },
  setup() {
    const cStore = contentStore();
    return { cStore };
  },
};
</script>
<style lang=""></style>
