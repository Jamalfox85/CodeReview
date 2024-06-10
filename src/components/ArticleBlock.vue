<template lang="">
  <div class="article_block_wrapper border-2 rounded-md border-paletteGreen p-2">
    <p class="font-bold mb-2">{{ article.title }}</p>
    <n-button class="primary-bttn bg-primary-gradient text-paletteWhite" @click="openLink">Visit</n-button>
  </div>
</template>
<script>
import { NButton } from "naive-ui";
export default {
  props: ["article"],
  components: { NButton },
  methods: {
    openLink() {
      window.open(this.article.url, "_blank");
    },
  },
};
</script>
<style lang=""></style>
