<template lang="">
  <div class="header_wrapper h-20 bg-paletteBlack text-paletteWhite border-b border-b-paletteGray flex items-center py-4 px-8">
    <RouterLink to="/" class="logo-group mr-auto flex items-center cursor-pointer">
      <img src="@/assets/images/logo.png" class="w-10 mr-2" />
      <h1 class="text-2xl">Ixie AI</h1>
    </RouterLink>
    <div class="authenticated-options flex items-center" v-if="userData !== null">
      <!-- <div :class="{ active: false }" class="notification-group mr-6 relative rounded-full w-12 h-12 hover:bg-primary-gradient flex items-center justify-center cursor-pointer">
        <font-awesome-icon :icon="['fas', 'bell']" class="text-2xl header-icon" />
        <div class="notification-bubble h-3 w-3 absolute bg-paletteOrange rounded-full hidden"></div>
      </div> -->
      <RouterLink class="header-link mx-4 items-center hidden lg:flex" to="/"> Home </RouterLink>
      <RouterLink class="header-link mx-4 items-center hidden lg:flex" to="/mysamples"> My Samples </RouterLink>
      <RouterLink to="/submit" class="mr-16 hidden lg:block">
        <n-button class="primary-bttn bg-primary-gradient text-paletteWhite rounded-lg p-2">Submit a Sample</n-button>
      </RouterLink>
      <n-popover placement="bottom" trigger="hover" class="mx-4 flex items-center">
        <template #trigger>
          <div class="profile-group ml-auto">
            <div class="default-icon bg-primary-gradient h-12 w-12 rounded-full flex items-center justify-center overflow-hidden border-2 border-paletteBlue">
              <img :src="profileImage" />
            </div>
          </div>
        </template>
        <div class="flex flex-col">
          <b>{{ userData.username ? userData.username : `${userData.first_name} ${userData.last_name}` }}</b>
          <small>{{ userData.email }}</small>
        </div>
        <n-menu :options="menuOptions"> </n-menu>
      </n-popover>
      <font-awesome-icon :icon="['fas', 'bars']" class="text-2xl ml-8 cursor-pointer lg:hidden" @click="showDrawer = true" />
      <n-drawer v-model:show="showDrawer" :width="'50%'" :placement="'right'" class="bg-paletteBlack text-paletteWhite">
        <n-drawer-content title="Navigation">
          <RouterLink class="header-link mx-4 flex items-center" to="/"> Home </RouterLink>
          <RouterLink class="header-link mx-4 flex items-center" to="/mysamples"> My Samples </RouterLink>
          <RouterLink to="/submit" class="mr-16">
            <n-button class="primary-bttn bg-primary-gradient text-paletteWhite rounded-lg p-2">Submit a Sample</n-button>
          </RouterLink>
        </n-drawer-content>
      </n-drawer>
    </div>
  </div>
</template>
<script>
import { supabase } from "@/lib/supabaseClient";
import { userStore } from "@/stores/userStore";
import { NPopover, NMenu, NButton, NDrawer, NDrawerContent } from "naive-ui";

export default {
  components: { NPopover, NMenu, NButton, NDrawer, NDrawerContent },
  data() {
    return {
      userData: null,
      showDrawer: false,
    };
  },
  computed: {
    menuOptions() {
      return [
        {
          label: "Settings",
          key: "settings",
          onClick: () => this.$router.push({ name: "Settings" }),
        },
        {
          label: "Sign Out",
          key: "sign-out",
          onClick: () => this.signOut(),
        },
      ];
    },
    profileImage() {
      return `https://ixieai-profile-photos.s3.eu-north-1.amazonaws.com/${this.userData.avatar_id}.jpg`;
    },
  },
  methods: {
    async signOut() {
      const { error } = await supabase.auth.signOut();
      if (error) {
        window.$message.error("There was an error signing out. Please try again.");
      } else {
        this.userData = null;
        userStore().clearSession();
        window.$message.success("You have successfully signed out.");
        this.$router.push("/login");
      }
    },
  },
  mounted() {
    userStore().$subscribe(async (store) => {
      const storeData = await userStore();
      this.userData = await storeData.getUserData;
    });
  },
};
</script>
<style lang="scss">
.notification-group {
  &.active {
    .notification-bubble {
      top: 10px;
      right: 10px;
      display: block !important;
    }
  }
}
.header-link {
  &:hover {
    text-decoration: underline;
  }
}
.n-drawer {
  .n-drawer-header {
    .n-drawer-header__main {
      color: #fff;
    }
  }
  .n-drawer-body-content-wrapper {
    display: flex;
    flex-direction: column;
    margin-top: 2em;
    & > * {
      margin: 0 0 1em 0 !important;
      font-size: 1.4em;
    }
  }
}
</style>
