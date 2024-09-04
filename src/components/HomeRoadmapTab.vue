<template lang="">
  <div class="py-4">
    <n-tree block-line :data="roadmap" :default-expanded-keys="roadmapDefaultExpandedNames" key-field="name" label-field="name" children-field="RoadmapMinorTopics" />
  </div>
</template>
<script>
import { NTree } from "naive-ui";
import { contentStore } from "@/stores/contentStore";
export default {
  components: { NTree },
  data() {
    return {
      roadmap: [],
    };
  },
  computed: {
    roadmapDefaultExpandedNames() {
      return this.roadmap.map((topic) => topic.name);
    },
  },
  watch: {
    cStore: {
      handler() {
        let roadmap = this.cStore.getRoadmap;
        this.roadmap = roadmap;
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
<style lang="scss"></style>
