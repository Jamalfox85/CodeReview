<template lang="">
  <div class="tag_wrapper px-2 rounded-md bg-paletteBlue">{{ label }}</div>
</template>
<script>
export default {
  props: ["label"],
};
</script>
<style lang="scss">
.tag_wrapper {
  margin: 4px;
}
</style>
