<template>
  <div class="login_wrapper flex justify-center bg-paletteBlack">
    <div class="p-4 flex justify-center w-full">
      <particle class="particle-bg" />
      <div class="design-block flex rounded-3xl gradient-background p-4 w-2/5">
        <div class="login-card bg-paletteBlack text-paletteWhite h-full w-full rounded-3xl p-8">
          <h1 class="text-2xl font-bold">Welcome</h1>
          <p v-if="!signUpMode">New Here? <span class="font-bold underline text-paletteBlue hover:text-paletteGreen cursor-pointer" @click="signUpMode = true">Create a free account</span> or log in to join the community!</p>
          <p v-else>Already have an account? <span class="font-bold underline text-paletteGreen hover:text-paletteBlue cursor-pointer" @click="signUpMode = false">Log in</span> to join the community!</p>
          <div class="form-main mt-8 flex flex-col items-center">
            <div class="email-login-group w-full">
              <div class="sign-up-groups" v-if="signUpMode">
                <div class="name-input-groups flex">
                  <div class="input-group grow mr-2 mb-4">
                    <label for="user-firstname" class="font-semibold mb-1 text-paletteGreen">First Name</label>
                    <n-input v-model:value="firstName" name="user-firstname" type="text" placeholder="John" class="border border-paletteGreen rounded-md mt-1" />
                  </div>
                  <div class="input-group grow ml-2 mb-4">
                    <label for="user-lastname" class="font-semibold mb-1 text-paletteGreen">Last Name</label>
                    <n-input v-model:value="lastName" name="user-lastname" type="text" placeholder="Doe" class="border border-paletteGreen rounded-md mt-1" />
                  </div>
                </div>
                <div class="input-group grow mr-2 mb-4">
                  <label for="user-username" class="font-semibold mb-1 text-paletteGreen">Username</label>
                  <n-input v-model:value="userName" name="user-username" type="text" placeholder="User1234" class="border border-paletteGreen rounded-md mt-1" />
                </div>
                <div class="input-group mb-4">
                  <label for="question-tags" class="font-semibold mb-1 text-paletteGreen">Languages</label>
                  <n-select v-model:value="questionTags" name="question-tags" multiple :options="questionTagOptions" class="border rounded-md border-paletteGreen overflow-hidden mt-1" />
                </div>
              </div>
              <div class="input-group mb-4">
                <label for="user-email" class="font-semibold mb-" :class="!signUpMode ? 'text-paletteBlue' : 'text-paletteGreen'">Email</label>
                <n-input v-model:value="email" name="user-email" type="text" placeholder="test@email.com" class="border rounded-md mt-1" :class="!signUpMode ? 'border-paletteBlue' : 'border-paletteGreen'" />
              </div>
              <div class="flex mb-4">
                <div class="input-group mr-2 mb-4 grow">
                  <label for="user-pass" class="font-semibold mb-1" :class="!signUpMode ? 'text-paletteBlue' : 'text-paletteGreen'">Password</label>
                  <n-input v-model:value="password" name="user-pass" type="password" show-password-on="mousedown" placeholder="Password" class="border rounded-md mt-1" :class="!signUpMode ? 'border-paletteBlue' : 'border-paletteGreen'" />
                </div>
                <div class="input-group ml-2 mb-4 grow" v-if="signUpMode">
                  <label for="user-pass" class="font-semibold mb-1 text-paletteGreen">Confirm Password</label>
                  <n-input v-model:value="confirmPassword" name="user-pass" type="password" show-password-on="mousedown" placeholder="Password" class="border border-paletteGreen rounded-md mt-1" />
                </div>
              </div>
              <button v-if="!signUpMode" class="signin-bttn w-full h-12 bg-paletteBlue rounded-md" @click="signInWithEmail"><span class="text-paletteWhite font-bold">Login</span></button>
              <button v-else class="signup-bttn w-full h-12 bg-paletteGreen rounded-md" @click="signUpNewUser"><span class="text-paletteWhite font-bold">Sign Up</span></button>
            </div>
            <div class="flex justify-center w-full my-4">OR</div>
            <div class="social-login-group flex w-full justify-center mt-4">
              <div class="sso-block border border-paletteGray" @click="ssoLoginHandler('google')">
                <img src="@/assets/images/sso-google-logo.svg" alt="Google Logo" />
              </div>
              <div class="sso-block github" @click="ssoLoginHandler('github')" style="background-color: #6e5494">
                <img src="@/assets/images/sso-github-logo.svg" alt="Github Logo" />
              </div>
              <div class="sso-block border border-paletteGray" @click="ssoLoginHandler('gitlab')">
                <img src="@/assets/images/sso-gitlab-logo.png" alt="Gitlab Logo" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { NInput, NButton, NSelect } from "naive-ui";
import { supabase } from "@/lib/supabaseClient";
import Particle from "@/components/Particle.vue";
export default {
  components: { NInput, NButton, NSelect, Particle },

  data() {
    return {
      signUpMode: false,
      userName: "",
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
    async signInWithEmail() {
      const { data, error } = await supabase.auth.signInWithPassword({
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
      if (!error) {
        this.createUserEntry(data.user.id);
      }
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
        const navigationResult = this.$router.push("/");
        if (!navigationResult) {
          this.$router.push("/login");
        }
      } else {
        this.handleErrorMessage(error.message);
      }
    },
    handleErrorMessage(message) {
      if (message.includes("Invalid")) {
        window.$message.error("Error! Invalid email or password.");
      } else if (message.includes("already registered")) {
        window.$message.error("Error! Email already exists.");
      } else if (message.includes("Password should be")) {
        window.$message.error("Error! Password should be at least 6 characters long.");
      } else {
        window.$message.error("Error! Please try again.");
      }
    },
    async createUserEntry(userId) {
      const { data, error } = await supabase
        .from("user")
        .insert([
          {
            id: userId,
            first_name: this.firstName,
            last_name: this.lastName,
            username: this.userName,
            email: this.email,
            avatar_id: Math.floor(Math.random() * 8),
            tags: this.questionTags,
          },
        ])
        .select();
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
.particle-bg {
  position: absolute;
  // z-index: -1;
}
.design-block {
  min-width: 600px;
  position: relative;
  // z-index: 999;
}
.signin-bttn {
  transition: 0.1s ease;
  &:hover,
  &:active {
    border: solid 1px #5da9e9;
    background-color: black;
  }
}
.signup-bttn {
  transition: 0.1s ease;
  &:hover,
  &:active {
    border: solid 1px #9bc53d;
    background-color: black;
  }
}
.sso-block {
  height: 80px;
  width: 80px;
  margin: 0 2em;
  display: flex;
  justify-content: center;
  align-self: center;
  padding: 1em;
  border-radius: 1em;
  cursor: pointer;
  transition: 0.1s ease;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  &.github {
    &:hover {
      background-color: #7c6a96 !important;
    }
  }
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
