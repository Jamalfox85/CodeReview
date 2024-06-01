<template lang="">
  <div class="review_wrapper flex flex-col rounded-md p-4">
    <n-button type="text" class="text-left mb-4 bg-primary-gradient w-fit p-2 rounded-md">
      <router-link to="/" class="text-paletteWhite font-bold flex items-center">
        <font-awesome-icon :icon="['fas', 'chevron-left']" class="mr-2" />
        Back to Home
      </router-link>
    </n-button>
    <div class="review-header flex mb-4">
      <div>
        <p class="text-3xl font-bold">Am I using Vue Router correctly?</p>
        <p class="entry-topic mb-2 font-semibold text-paletteBlue">Vue Router</p>
        <div class="filter-group flex flex-wrap mr-2">
          <EntryTag v-for="(tag, index) in tags" :key="index" :label="tag" />
        </div>
      </div>
      <div class="profile-group bg-primary-gradient h-16 w-16 rounded-full flex items-center justify-center ml-auto">
        <font-awesome-icon :icon="['fas', 'user']" class="text-2xl text-paletteWhite" />
      </div>
    </div>
    <div class="review-main mb-4 flex flex-col">
      <p class="mb-4">I’m utilizing vue router to manage the routing in vue application, but I’m not sure if there’s a better way to set it up for the project. I’m hoping I could get some thoughts on my implementation and advice.</p>
      <n-collapse :default-expanded-names="['Code']">
        <n-collapse-item title="Code Sample" name="Code">
          <div class="review-code-group relative mb-4">
            <VCodeBlock :code="entries[0].codeSample" :browserWindow="true" highlightjs lang="javascript" theme="github-dark" />
          </div>
        </n-collapse-item>
        <n-collapse-item title="Comments" name="Comments">
          <div class="comment-group relative mb-4">
            <ReviewComment v-for="(comment, index) in comments" :key="index" :comment="comment" />
          </div>
        </n-collapse-item>
      </n-collapse>
    </div>
  </div>
</template>
<script>
import VCodeBlock from "@wdns/vue-code-block";
import EntryTag from "@/components/EntryTag.vue";
import ReviewComment from "@/components/ReviewComment.vue";
import { entries } from "@/dummydata/codeEntries.js";
import { supabase } from "@/lib/supabaseClient";
import { NCollapse, NCollapseItem, NButton } from "naive-ui";
export default {
  components: { VCodeBlock, EntryTag, ReviewComment, NCollapse, NCollapseItem, NButton },
  data() {
    return {
      tags: ["JavaScript", "Vue", "PHP", "CSS"],
      entries,
      comments: [],
    };
  },
  async mounted() {
    const { data: comments } = await supabase.from("comment").select();
    this.comments = comments;
  },
};
</script>
<style lang="scss">
.review_wrapper {
}
</style>
