<template lang="">
  <div class="page_wrapper bg-paletteBlack text-paletteWhite">
    <div class="home_wrapper flex flex-col grow">
      <div class="home-header flex">
        <h1 class="mb-4 text-3xl font-bold">Home</h1>
      </div>
      <div class="home-filter flex flex-wrap">
        <div class="filter-pill mr-4 mb-2" :class="{ active: tag == 'All' }" @click="tagSelected('All')">All</div>
        <div class="filter-pill mb-2" :class="{ active: tag == questionTag.value }" v-for="questionTag in questionTagOptions" @click="tagSelected(questionTag.value)">{{ questionTag.label }}</div>
      </div>
      <div class="core-content_wrapper flex h-full">
        <div class="core-left flex flex-col grow p-4">
          <n-input type="text" class="m-2 border border-paletteBlue rounded-xl" v-model:value="searchInput" />
          <div class="flex flex-wrap justify-between items-center">
            <p class="m-2">
              Now showing results for <span class="font-bold underline">{{ tag || topic }}</span> questions.
            </p>
            <n-pagination v-model:page="page" :page-count="Math.ceil(count / itemsPerPage)" />
          </div>

          <HomeCodeEntries class="w-full m-2 grow" :searchInput="searchInput" :tag="tag" :topic="topic" @topicSelected="topicSelected" :page="page" :itemsPerPage="itemsPerPage" :key="page" />
        </div>
        <div class="core-right flex flex-col w-1/5 p-4">
          <h2 class="text-lg mb-4">Recently From Hacker News</h2>
          <article-block v-for="article in articles" :article="article" class="mb-4" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HomeCodeEntries from "@/components/HomeCodeEntries.vue";
import ArticleBlock from "@/components/ArticleBlock.vue";
import { NButton, NInput, NPagination } from "naive-ui";
import { supabase } from "@/lib/supabaseClient";
import { useFetch } from "@vueuse/core";

export default {
  components: { HomeCodeEntries, ArticleBlock, NButton, NInput, NPagination },
  data() {
    return {
      searchInput: "",
      tag: "All",
      topic: "",
      page: 1,
      count: 0,
      itemsPerPage: 10,
      articles: [],
    };
  },
  computed: {
    questionTagOptions() {
      return [
        { label: "JavaScript", value: "JavaScript" },
        { label: "TypeScript", value: "TypeScript" },
        { label: "Vue", value: "Vue" },
        { label: "React", value: "React" },
        { label: "Angular", value: "Angular" },
        { label: "PHP", value: "PHP" },
        { label: "Laravel", value: "Laravel" },
        { label: "CSS", value: "CSS" },
        { label: "Python", value: "Python" },
        { label: "Java", value: "Java" },
        { label: "C++", value: "C++" },
        { label: "C#", value: "C#" },
        { label: "Objective-C", value: "Objective-C" },
        { label: "Ruby", value: "Ruby" },
        { label: "Go", value: "Go" },
        { label: "Swift", value: "Swift" },
        { label: "Kotlin", value: "Kotlin" },
        { label: "Rust", value: "Rust" },
        { label: "Perl", value: "Perl" },
        { label: "R", value: "R" },
      ];
    },
  },
  methods: {
    topicSelected(topic) {
      this.topic = topic;
      this.tag = "";
    },
    tagSelected(tag) {
      this.topic = "";
      this.tag = tag;
    },
  },
  async mounted() {
    const { data, count, error } = await supabase.from("questionSubmission").select("*", { count: "exact", head: true });
    this.count = count;

    // const { isFetching, error: newsError, data: newsData } = await useFetch("https://hn.algolia.com/api/v1/search?query=foo&tags=story");
    const { isFetching, error: newsError, data: newsData } = await useFetch("https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=15");
    const parsedNewsData = JSON.parse(newsData.value);
    this.articles = parsedNewsData.hits;
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
  color: #fff;
  &.active {
    opacity: 1 !important;
    color: #fff;
    font-weight: bold;
  }
  &:hover {
    opacity: 0.8;
  }
}
.core-left {
  min-width: 550px;
}
</style>
