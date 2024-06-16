<template lang="">
  <div class="page_wrapper bg-paletteBlack text-paletteWhite">
    <n-tabs :on-update:value="tagSelected" v-if="tags.length > 0" :key="tags[0]" :type="'card'" animated :placement="'left'">
      <n-tab-pane :name="tag" :tab="tag" v-for="tag in tags">
        <home-default />
      </n-tab-pane>
    </n-tabs>
    <n-spin v-else class="m-auto" />
  </div>
</template>
<script>
import { NTabs, NTabPane, NSpin } from "naive-ui";
import { userStore } from "@/stores/userStore";
import { contentStore } from "@/stores/contentStore";
import HomeDefault from "@/components/HomeDefault.vue";

export default {
  components: { HomeDefault, NTabs, NTabPane, NSpin },
  data() {
    return {
      tags: [],
    };
  },
  methods: {
    tagSelected(tag) {
      this.tag = tag;
      this.cStore.setActiveLanguage(tag);
    },
  },
  watch: {
    store: {
      handler() {
        let userData = this.store.getUserData;
        if (this.tags.length === 0) {
          this.tags = userData.tags;
          this.cStore.setActiveLanguage(this.tags[0]);
          return;
        }
        this.tags = userData.tags;
      },
      deep: true,
    },
  },
  setup() {
    const store = userStore();
    const cStore = contentStore();
    return { store, cStore };
  },
};
</script>
