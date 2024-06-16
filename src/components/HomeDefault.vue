<template lang="">
  <div class="home_wrapper bg-paletteBlack text-paletteWhite flex flex-col grow p-4">
    <div class="home-header flex">
      <h1 class="mb-4 text-3xl fonxt-bold">Home</h1>
    </div>
    <n-tabs>
      <n-tab-pane :name="'Question'" :tab="'Question'">
        <div class="core-content_wrapper flex h-full text-paletteWhite">
          <div class="core-left flex flex-col grow py-4 md:p-4 md:min-w-[550px]">
            <n-input type="text" class="m-2 mb-4 border border-paletteBlue rounded-xl" v-model:value="searchInput" />
            <div class="flex flex-wrap justify-between items-center">
              <n-pagination v-model:page="page" :page-count="Math.ceil(count / itemsPerPage)" />
            </div>
            <HomeCodeEntries class="w-full m-2 grow" :searchInput="searchInput" :tag="tag" :topic="topic" @topicSelected="topicSelected" :page="page" :itemsPerPage="itemsPerPage" :key="page" />
          </div>
          <div class="core-right flex-col w-1/5 p-4 hidden md:flex">
            <h2 class="text-lg mb-4">Recent {{ activeLanguage }} Articles From Hacker News</h2>
            <article-block v-for="article in articles" :article="article" class="mb-4" />
          </div>
        </div>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>
<script>
import HomeCodeEntries from "@/components/HomeCodeEntries.vue";
import ArticleBlock from "@/components/ArticleBlock.vue";
import { NButton, NInput, NPagination, NCollapse, NCollapseItem, NTabs, NTabPane, NSpin } from "naive-ui";
import { supabase } from "@/lib/supabaseClient";
import { useFetch } from "@vueuse/core";
import { userStore } from "@/stores/userStore";
import { contentStore } from "@/stores/contentStore";
export default {
  components: { HomeCodeEntries, ArticleBlock, NButton, NInput, NPagination, NCollapse, NCollapseItem, NTabs, NTabPane, NSpin },
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
    activeLanguage() {
      return this.cStore.getActiveLanguage;
    },
  },
  methods: {
    topicSelected(topic) {
      this.topic = topic;
      this.tag = "";
    },
  },
  async mounted() {
    const { data, count, error } = await supabase.from("questionSubmission").select("*", { count: "exact", head: true });
    this.count = count;

    const { isFetching, error: newsError, data: newsData } = await useFetch(`https://hn.algolia.com/api/v1/search?query=${this.activeLanguage}&tags=story&hitsPerPage=15`);
    // const { isFetching, error: newsError, data: newsData } = await useFetch("https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=15");
    const parsedNewsData = JSON.parse(newsData.value);
    this.articles = parsedNewsData.hits;
  },
  setup() {
    const store = userStore();
    const cStore = contentStore();
    return { store, cStore };
  },
};
</script>
<style lang=""></style>
