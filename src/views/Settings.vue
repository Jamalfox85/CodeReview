<template lang="">
  <div class="page_wrapper">
    <div class="home_wrapper flex flex-col grow">
      <div class="home-header flex">
        <h1 class="mb-4 text-3xl font-bold">Settings</h1>
      </div>
      <div class="main_wrapper flex flex-col grow">
        <div class="name-inputs flex my-2">
          <div class="grow m-2">
            <label for="first_name" class="text-paletteBlack font-semibold">First Name</label>
            <n-input type="text" v-model:value="first_name" />
          </div>
          <div class="grow m-2">
            <label for="last_name" class="text-paletteBlack font-semibold">Last Name</label>
            <n-input type="text" v-model:value="last_name" />
          </div>
        </div>
        <div class="ml-auto mt-4">
          <n-button class="bg-primary-gradient text-paletteWhite rounded-lg" @click="saveChanges">Save Changes</n-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HomeCodeEntries from "@/components/HomeCodeEntries.vue";
import { NButton, NInput } from "naive-ui";
import { supabase } from "@/lib/supabaseClient";
import { userStore } from "@/stores/userStore";
export default {
  components: { HomeCodeEntries, NButton, NInput },
  data() {
    return {
      id: null,
      first_name: "",
      last_name: "",
    };
  },
  methods: {
    async saveChanges() {
      const { error } = await supabase.from("user").update({ first_name: this.first_name, last_name: this.last_name }).eq("id", this.id);
      if (error) {
        window.$message.error("Error saving changes");
        return;
      } else {
        window.$message.success("Changes Saved Successfully");
      }
    },
  },
  async mounted() {
    let userData = this.store.getUserData;
    this.id = userData.id;
    this.first_name = userData.first_name;
    this.last_name = userData.last_name;
    console.log("DATA: ", userData);
  },
  setup() {
    const store = userStore();
    return { store };
  },
};
</script>
<style lang="scss"></style>
