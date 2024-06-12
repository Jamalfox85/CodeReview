<template lang="">
  <div class="submit_wrapper flex flex-col bg-paletteBlack text-paletteWhite">
    <router-link to="/" class="text-paletteWhite font-bold flex items-center">
      <n-button type="text" class="primary-bttn text-paletteWhite text-left mb-4 bg-primary-gradient w-fit p-2 rounded-md">
        <font-awesome-icon :icon="['fas', 'chevron-left']" class="mr-2" />
        Back to Home
      </n-button>
    </router-link>
    <div class="submit-header flex mb-4">
      <p class="text-3xl font-bold">Submit a Code Sample</p>
    </div>
    <div class="submit-main flex flex-col p-2">
      <div class="flex">
        <div class="input-column w-1/2 p-2">
          <div class="input-group mb-4">
            <label for="question-title" class="font-semibold mb-1 text-paletteBlue">Title</label>
            <n-input v-model:value="questionTitle" name="question-title" type="text" placeholder="Is there a better way to set up this Vue function?" class="border border-paletteBlue rounded-md mt-1" />
          </div>
          <div class="input-group mb-4">
            <label for="question-tags" class="font-semibold mb-1 text-paletteBlue">Tags</label>
            <n-select v-model:value="questionTags" name="question-tags" multiple :options="questionTagOptions" class="border rounded-md border-paletteBlue overflow-hidden mt-1" />
          </div>
          <div class="input-group mb-4">
            <label for="question-topic" class="font-semibold mb-1 text-paletteBlue">Topic</label>
            <n-input v-model:value="questionTopic" name="question-topic" type="text" placeholder="Vue Router" class="border border-paletteBlue rounded-md mt-1" />
          </div>
          <div class="input-group mb-4">
            <label for="question-details" class="font-semibold mb-1 text-paletteBlue">Details</label>
            <n-input v-model:value="questionDescription" name="question-details" type="textarea" placeholder="I'm trying to create a function to..." class="border border-paletteBlue rounded-md mt-1" />
          </div>
        </div>
        <div class="code-column flex flex-col p-2 w-1/2">
          <div class="input-group flex flex-col grow mb-4">
            <label for="code-input" class="font-semibold mb-1 text-paletteBlue">Code Input</label>
            <n-input v-model:value="codeInput" name="code-input" type="textarea" placeholder="I'm trying to create a function to..." class="border border-paletteBlue rounded-md mt-1 grow" />
          </div>
          <div class="submit-footer flex justify-end ml-auto">
            <n-spin class="mr-2" v-if="submitting" />
            <n-button class="primary-bttn bg-primary-gradient text-paletteWhite rounded-lg" @click="submitQuestion" :disabled="submitting">Submit</n-button>
          </div>
        </div>
      </div>
      <div class="input-group mb-4">
        <label for="code-sample" class="font-semibold mb-1 text-paletteBlue">Code Preview</label>
        <v-code-block :code="codeInput" :browserWindow="true" highlightjs lang="javascript" theme="nnfx-light" class="mt-1" />
      </div>
    </div>
  </div>
</template>
<script>
import { NButton, NInput, NSelect, NSpin } from "naive-ui";
import { entries } from "@/dummydata/codeEntries.js";
import { supabase } from "@/lib/supabaseClient";
import { userStore } from "@/stores/userStore";
import { openAiCodeReviewResponse } from "@/services/openai_service.js";

export default {
  components: { NButton, NInput, NSelect, NSpin },
  data() {
    return {
      entries,
      questionTitle: "",
      questionTopic: "",
      questionDescription: "",
      questionTags: [],
      codeInput: "<h1>Your Code Will Show Here</h1>",
      submitting: false,
    };
  },
  computed: {
    questionTagOptions() {
      return [
        { label: "JavaScript", value: "JavaScript" },
        { label: "Vue", value: "Vue" },
        { label: "PHP", value: "PHP" },
        { label: "CSS", value: "CSS" },
        { label: "Python", value: "Python" },
        { label: "Java", value: "Java" },
        { label: "C++", value: "C++" },
        { label: "C#", value: "C#" },
        { label: "Ruby", value: "Ruby" },
        { label: "Go", value: "Go" },
        { label: "TypeScript", value: "TypeScript" },
        { label: "Swift", value: "Swift" },
        { label: "Kotlin", value: "Kotlin" },
        { label: "Rust", value: "Rust" },
        { label: "Perl", value: "Perl" },
        { label: "Objective-C", value: "Objective-C" },
        { label: "Scala", value: "Scala" },
        { label: "Shell", value: "Shell" },
        { label: "R", value: "R" },
        { label: "Matlab", value: "Matlab" },
      ];
    },
  },
  methods: {
    async submitQuestion() {
      this.submitting = true;
      const session = this.store.getSession;
      const { data: questionData, error } = await supabase
        .from("questionSubmission")
        .insert({
          title: this.questionTitle,
          topic: this.questionTopic,
          description: this.questionDescription,
          tags: this.questionTags,
          code_sample: this.codeInput,
          user_id: session.user.id,
        })
        .select();
      if (error) {
        window.$message.error("Error submitting question:", error.message);
      } else {
        window.$message.success("Question submitted successfully!");
        let tokens = this.store.userData.questionTokens;
        if (tokens > 0) {
          tokens -= 1;
          await supabase.from("user").update({ questionTokens: tokens }).eq("id", session.user.id);
          await supabase.from("comment").insert([
            {
              description: await openAiCodeReviewResponse(this.codeInput, this.questionTags),
              questionSubmission_id: questionData[0].id,
              user_id: null,
            },
          ]);
        } else {
          window.$message.warning("You have no more tokens for an AI review! This app is still super new, so for now we're limiting each user to 3 AI reviews at this time. We will still submit your question for community feedback, but you will not receive an AI review.");
        }
        this.$router.push("/");
      }
      this.submitting = false;
    },
  },
  setup() {
    const store = userStore();
    return { store };
  },
};
</script>
