<template>
  <div class="app_wrapper h-screen flex flex-col">
    <TheHeader />
    <RouterView class="page_wrapper flex grow p-8" />
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";

export default {
  components: { TheHeader },
};
</script>

<style lang="scss"></style>
