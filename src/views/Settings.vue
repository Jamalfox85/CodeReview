<template lang="">
  <div class="page_wrapper bg-paletteBlack">
    <div class="home_wrapper flex flex-col items-center grow">
      <Particle />
      <div class="settings_form_wrapper bg-primary-gradient p-4 rounded-xl relative">
        <div class="settings_form_inner_wrapper rounded-xl p-4">
          <div class="home-header flex text-paletteWhite">
            <h1 class="mb-4 text-3xl font-bold">Settings</h1>
          </div>
          <div class="main_wrapper flex flex-col grow">
            <div class="name-inputs flex my-2">
              <div class="grow m-2">
                <label for="first_name" class="text-paletteWhite font-semibold">First Name</label>
                <n-input type="text" v-model:value="first_name" />
              </div>
              <div class="grow m-2">
                <label for="last_name" class="text-paletteWhite font-semibold">Last Name</label>
                <n-input type="text" v-model:value="last_name" />
              </div>
            </div>
            <div class="name-inputs flex my-2">
              <div class="grow m-2">
                <label for="username" class="text-paletteWhite font-semibold">Username</label>
                <n-input type="text" v-model:value="username" />
              </div>
              <div class="grow m-2">
                <label for="email" class="text-paletteWhite font-semibold">Email</label>
                <n-input type="text" v-model:value="email" />
              </div>
            </div>
            <div class="p-2">
              <label class="text-paletteWhite font-semibold">Languages</label>
              <div class="home-filter flex-wrap max-w-[85vw] flex mt-2">
                <div class="filter-pill mb-2" :class="{ active: tags.includes(questionTag.value) }" v-for="questionTag in questionTagOptions" @click="tagSelected(questionTag.value)">{{ questionTag.label }}</div>
              </div>
            </div>
            <div class="my-2 border-2 p-2">
              <label class="text-paletteWhite font-semibold">Profile</label>
              <div class="flex flex-wrap justify-evenly mt-2">
                <div class="profile-bubble rounded-full w-24 h-24 overflow-hidden" :class="{ active: profileImageId == index }" v-for="(option, index) in 10" @click="profileImageId = index">
                  <img :src="getProfileImage(index)" />
                </div>
              </div>
            </div>
            <div class="ml-auto mt-4">
              <n-button class="primary-bttn bg-primary-gradient text-paletteWhite rounded-lg" @click="saveChanges">Save Changes</n-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HomeCodeEntries from "@/components/HomeCodeEntries.vue";
import { NButton, NInput, NTag } from "naive-ui";
import { supabase } from "@/lib/supabaseClient";
import { userStore } from "@/stores/userStore";
import Particle from "@/components/Particle.vue";
export default {
  components: { HomeCodeEntries, NButton, NInput, NTag, Particle },
  data() {
    return {
      id: null,
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      profileImageId: null,
      tags: [],
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
    getProfileImage(index) {
      return `https://ixieai-profile-photos.s3.eu-north-1.amazonaws.com/${index}.jpg`;
    },
    tagSelected(tag) {
      if (this.tags.includes(tag)) {
        this.tags = this.tags.filter((t) => t !== tag);
      } else {
        this.tags.push(tag);
      }
    },
    async saveChanges() {
      const { error } = await supabase
        .from("user")
        .update({
          first_name: this.first_name,
          last_name: this.last_name,
          username: this.username,
          email: this.email,
          avatar_id: this.profileImageId,
          tags: this.tags,
        })
        .eq("id", this.id);
      const { error: authError } = await supabase.auth.updateUser({
        email: this.email,
      });
      if (error || authError) {
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
    this.username = userData?.username;
    this.email = userData?.email;
    this.profileImageId = userData?.avatar_id;
    this.tags = userData?.tags;
  },
  setup() {
    const store = userStore();
    return { store };
  },
};
</script>
<style lang="scss">
.settings_form_wrapper {
  width: 75%;
  min-width: 750px;
  .settings_form_inner_wrapper {
    background-color: black;
    .profile-bubble {
      &:hover {
        cursor: pointer;
        border: solid 4px #5da9e9;
        transition: 0.2s ease;
      }
      &.active {
        border: solid 8px #5da9e9;
      }
    }
  }
}
</style>
