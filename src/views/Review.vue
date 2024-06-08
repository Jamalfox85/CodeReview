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
        <p class="text-3xl font-bold">{{ entryDetails.title }}</p>
        <p class="entry-topic mb-2 font-semibold text-paletteBlue">{{ entryDetails.topic }}</p>
        <div class="filter-group flex flex-wrap mr-2">
          <EntryTag v-for="(tag, index) in entryDetails.tags" :key="index" :label="tag" />
        </div>
      </div>
      <div class="flex flex-col items-center ml-auto">
        <div class="profile-group ml-auto">
          <div class="default-icon bg-primary-gradient h-12 w-12 rounded-full flex items-center justify-center">
            <font-awesome-icon :icon="['fas', 'user']" class="text-2xl text-paletteWhite" />
          </div>
        </div>
        <div class="flex flex-col">
          <p class="text-paletteBlack font-bold">{{ `${entryDetails.user?.first_name} ${entryDetails.user?.last_name}` }}</p>
          <p class="text-paletteBlack">{{ formattedDate }}</p>
        </div>
      </div>
    </div>
    <div class="review-main mb-4 flex flex-col">
      <p class="mb-4">{{ entryDetails.description }}</p>
      <n-collapse :default-expanded-names="['Code', 'Comments']">
        <n-collapse-item title="Code Sample" name="Code">
          <div class="review-code-group relative mb-4">
            <VCodeBlock :code="entryDetails.code_sample" :browserWindow="true" highlightjs lang="javascript" theme="github-dark" />
          </div>
        </n-collapse-item>
        <n-collapse-item title="Comments" name="Comments">
          <div class="flex flex-col">
            <div class="mb-4 flex flex-col">
              <n-button @click="addCommentMode = true" color="#fff" class="text-paletteBlack h-10 rounded-lg ml-auto">
                <font-awesome-icon :icon="['fas', 'plus']" class="bg-primary-gradient text-xs p-2 rounded-lg mr-2" />
                Add Comment
              </n-button>
              <div v-if="addCommentMode" class="comment-input-group flex flex-col mt-2">
                <n-input type="textarea" v-model:value="newCommentDescription" class="w-full h-24 p-2 rounded-md border border-paletteGray" placeholder="Write a comment..." />
                <div class="flex ml-auto">
                  <n-button color="#fff" class="text-paletteBlack h-10 rounded-lg mx-2 mt-2" @click="addCommentMode = false">
                    <p class="bg-primary bg-primary-gradient p-2 rounded-lg">Close</p>
                  </n-button>
                  <n-button color="#fff" class="text-paletteBlack h-10 rounded-lg mx-2 mt-2" @click="SubmitComment">
                    <font-awesome-icon :icon="['fas', 'paper-plane']" class="bg-primary bg-primary-gradient p-2 rounded-lg" />
                  </n-button>
                </div>
              </div>
            </div>
            <div class="comment-group relative mb-4">
              <ReviewComment v-for="(comment, index) in comments" :key="index" :comment="comment" />
            </div>
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
import { userStore } from "@/stores/userStore";
import { NCollapse, NCollapseItem, NButton, NInput } from "naive-ui";
import { formatDistanceToNow } from "date-fns";

export default {
  components: { VCodeBlock, EntryTag, ReviewComment, NCollapse, NCollapseItem, NButton, NInput },
  data() {
    return {
      tags: ["JavaScript", "Vue", "PHP", "CSS"],
      entries,
      entryDetails: {},
      comments: [],
      addCommentMode: false,
      newCommentDescription: "",
    };
  },
  computed: {
    formattedDate() {
      if (this.entryDetails.created_at) {
        return formatDistanceToNow(new Date(this.entryDetails.created_at), { addSuffix: true });
      }
    },
  },
  methods: {
    async SubmitComment() {
      const session = this.store.getSession;
      const { data, error } = await supabase
        .from("comment")
        .insert([
          {
            description: this.newCommentDescription,
            questionSubmission_id: this.entryDetails.id,
            user_id: session.user.id,
          },
        ])
        .select();
      if (error) {
        window.$message.error("Error submitting comment:", error.message);
      } else {
        this.comments.push(data[0]);
        this.addCommentMode = false;
        window.$message.success("Comment submitted successfully");
      }
    },
  },
  async mounted() {
    this.entryDetails = this.store.getActiveQuestion;
    console.log("ENTRY DETAILS: ", this.entryDetails);
    const { data: comments } = await supabase.from("comment").select().eq("questionSubmission_id", this.entryDetails.id);
    this.comments = comments;
  },
  setup() {
    const store = userStore();
    return { store };
  },
};
</script>
<style lang="scss"></style>
