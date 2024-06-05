<template>
  <div class="login_wrapper flex">
    <div class="page-left p-4 w-2/5 flex">
      <div class="design-block grow rounded-3xl gradient-background"></div>
    </div>
    <div class="page-right p-8 w-3/5">
      <h1 class="text-2xl font-bold">Welcome</h1>
      <p v-if="!signUpMode">New Here? <span class="font-bold underline text-paletteOrange cursor-pointer" @click="signUpMode = true">Create a free account</span> or log in to join the community!</p>
      <p v-else>Already have an account? <span class="font-bold underline text-paletteOrange cursor-pointer" @click="signUpMode = false">Log in</span> to join the community!</p>
      <div class="form-main mt-8 flex flex-col items-center">
        <div class="email-login-group w-full">
          <div class="sign-up-groups" v-if="signUpMode">
            <div class="name-input-groups flex">
              <div class="input-group grow mr-2 mb-4">
                <label for="user-firstname" class="font-semibold mb-1 text-paletteBlue">First Name</label>
                <n-input v-model:value="firstName" name="user-firstname" type="text" placeholder="John" class="border border-paletteBlue rounded-md mt-1" />
              </div>
              <div class="input-group grow ml-2 mb-4">
                <label for="user-lastname" class="font-semibold mb-1 text-paletteBlue">Last Name</label>
                <n-input v-model:value="lastName" name="user-lastname" type="text" placeholder="Doe" class="border border-paletteBlue rounded-md mt-1" />
              </div>
            </div>
            <div class="input-group mb-4">
              <label for="question-tags" class="font-semibold mb-1 text-paletteBlue">Tags</label>
              <n-select v-model:value="questionTags" name="question-tags" multiple :options="questionTagOptions" class="border rounded-md border-paletteBlue overflow-hidden mt-1" />
            </div>
          </div>
          <div class="input-group mb-4">
            <label for="user-email" class="font-semibold mb-1 text-paletteBlue">Email</label>
            <n-input v-model:value="email" name="user-email" type="text" placeholder="test@email.com" class="border border-paletteBlue rounded-md mt-1" />
          </div>
          <div class="flex">
            <div class="input-group mr-2 mb-4 grow">
              <label for="user-pass" class="font-semibold mb-1 text-paletteBlue">Password</label>
              <n-input v-model:value="password" name="user-pass" type="password" show-password-on="mousedown" placeholder="Password" class="border border-paletteBlue rounded-md mt-1" />
            </div>
            <div class="input-group ml-2 mb-4 grow" v-if="signUpMode">
              <label for="user-pass" class="font-semibold mb-1 text-paletteBlue">Confirm Password</label>
              <n-input v-model:value="confirmPassword" name="user-pass" type="password" show-password-on="mousedown" placeholder="Password" class="border border-paletteBlue rounded-md mt-1" />
            </div>
          </div>
          <n-button v-if="!signUpMode" class="w-full h-12 bg-paletteBlue rounded-md" @click="signInWithEmail"> <span class="text-paletteWhite font-bold">Login</span> </n-button>
          <n-button v-else class="w-full h-12 bg-paletteOrange rounded-md" @click="signUpNewUser"> <span class="text-paletteWhite font-bold">Sign Up</span> </n-button>
        </div>
        <div class="flex justify-center w-full my-4">OR</div>
        <div class="social-login-group w-full flex flex-wrap">
          <n-button class="w-full h-12 m-1 rounded-md" color="black" @click="ssoLoginHandler('google')">
            <img src="@/assets/images/sso-google-logo.svg" alt="Google Logo" class="h-6 mr-4 text-paletteWhite" />
            <span class="text-paletteWhite font-bold">Continue with Google</span>
          </n-button>
          <n-button class="w-full h-12 m-1 rounded-md" style="border: solid 1px rgb(204, 201, 201)" @click="ssoLoginHandler('gitlab')">
            <img src="@/assets/images/sso-gitlab-logo.png" alt="Gitlab Logo" class="h-12 mr-4 text-paletteWhite" />
            <span class="text-paletteBlack font-bold">Continue with Gitlab</span>
          </n-button>
          <n-button class="w-full h-12 m-1 rounded-md" color="#6e5494" @click="ssoLoginHandler('github')">
            <img src="@/assets/images/sso-github-logo.svg" alt="Github Logo" class="h-6 mr-4 text-paletteWhite" />
            <span class="text-paletteWhite font-bold">Continue with Github</span>
          </n-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { NInput, NButton, NSelect } from "naive-ui";
import { supabase } from "@/lib/supabaseClient";
export default {
  components: { NInput, NButton, NSelect },

  data() {
    return {
      signUpMode: false,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      questionTags: [],
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
    async signInWithEmail() {
      const { data, error } = await supabase.auth.signInWithPassword({
        first_name: this.firstName,
        last_name: this.lastName,
        email: this.email,
        password: this.password,
      });
      this.handleLoginDataAndError(data, error);
    },
    async signUpNewUser() {
      let baseUrl = window.location.origin;
      const { data, error } = await supabase.auth.signUp({
        email: this.email,
        password: this.password,
        options: {
          emailRedirectTo: baseUrl,
        },
      });
      this.handleLoginDataAndError(data, error);
    },
    async ssoLoginHandler(provider) {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
      });
      this.handleLoginDataAndError(data, error);
    },
    handleLoginDataAndError(data, error) {
      if (data.session !== null) {
        window.$message.success("Welcome! You have successfully logged in.");
        this.$router.push("/");
      } else {
        this.handleErrorMessage(error.message);
      }
    },
    handleErrorMessage(message) {
      if (message.includes("Invalid")) {
        window.$message.error("Error! Invalid email or password.");
      } else if (message.includes("already registered")) {
        window.$message.error("Error! Email already exists.");
      } else {
        window.$message.error("Error! Please try again.");
      }
    },
  },
};
</script>

<style lang="scss">
.gradient-background {
  background: linear-gradient(240deg, #5da9e9, #9bc53d);
  background-size: 120% 120%;
  animation: gradient-animation 4s ease infinite;
}

@keyframes gradient-animation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
