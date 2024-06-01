<template lang="">
  <div class="submit_wrapper flex flex-col">
    <n-button type="text" class="text-left mb-4 bg-primary-gradient w-fit p-2 rounded-md">
      <router-link to="/" class="text-paletteWhite font-bold flex items-center">
        <font-awesome-icon :icon="['fas', 'chevron-left']" class="mr-2" />
        Back to Home
      </router-link>
    </n-button>
    <div class="submit-header flex mb-4">
      <p class="text-3xl font-bold">Submit a Question</p>
      <div class="submit-footer flex justify-end ml-auto">
        <n-button class="bg-primary-gradient text-paletteWhite rounded-lg">Submit</n-button>
      </div>
    </div>
    <div class="submit-main flex flex-col p-2">
      <div class="flex">
        <div class="input-column w-1/2 p-2">
          <div class="input-group mb-4">
            <label for="question-title" class="font-semibold mb-1 text-paletteBlue">Question?</label>
            <n-input v-model:value="questionTitle" name="question-title" type="text" placeholder="Is there a better way to set up this Vue function?" class="border border-paletteBlue rounded-md mt-1" />
          </div>
          <div class="input-group mb-4">
            <label for="question-topic" class="font-semibold mb-1 text-paletteBlue">Topic</label>
            <n-input v-model:value="questionTopic" name="question-topic" type="text" placeholder="Vue Router" class="border border-paletteBlue rounded-md mt-1" />
          </div>
        </div>
        <div class="code-column p-2 w-1/2">
          <div class="input-group mb-4">
            <label for="question-tags" class="font-semibold mb-1 text-paletteBlue">Tags</label>
            <n-select v-model:value="questionTags" name="question-tags" multiple :options="questionTagOptions" class="border rounded-md border-paletteBlue overflow-hidden mt-1" />
          </div>
          <div class="input-group mb-4">
            <label for="question-details" class="font-semibold mb-1 text-paletteBlue">Details</label>
            <n-input v-model:value="questionTitle" name="question-details" type="textarea" placeholder="I'm trying to create a function to..." class="border border-paletteBlue rounded-md mt-1" />
          </div>
        </div>
      </div>
      <div class="input-group mb-4">
        <label for="code-input" class="font-semibold mb-1 text-paletteBlue">Code Input</label>
        <n-input v-model:value="codeInput" name="code-input" type="textarea" placeholder="I'm trying to create a function to..." class="border border-paletteBlue rounded-md mt-1" />
      </div>
      <div class="input-group mb-4">
        <label for="code-sample" class="font-semibold mb-1 text-paletteBlue">Code Preview</label>
        <v-code-block :code="codeInput" :browserWindow="true" highlightjs lang="javascript" theme="github-dark" class="mt-1" />
      </div>
    </div>
  </div>
</template>
<script>
import { NButton, NInput, NSelect } from "naive-ui";
import { entries } from "@/dummydata/codeEntries.js";

export default {
  components: { NButton, NInput, NSelect },
  data() {
    return {
      entries,
      questionTitle: "",
      questionTopic: "",
      questionDescription: "",
      questionTags: [],
      codeInput: "<h1>Your Code Will Show Here</h1>",
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
};
</script>
