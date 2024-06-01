<template lang="">
  <div class="header_wrapper h-20 bg-paletteBlack text-paletteWhite flex items-center py-4 px-8">
    <RouterLink to="/" class="logo-group mr-auto flex items-center cursor-pointer">
      <img src="@/assets/images/logo.png" class="w-10 mr-2" />
      <h1 class="text-2xl">Coding Review</h1>
    </RouterLink>
    <div class="authenticated-options flex items-center" v-if="session !== null">
      <div :class="{ active: false }" class="notification-group mr-6 relative rounded-full w-12 h-12 hover:bg-primary-gradient flex items-center justify-center cursor-pointer">
        <font-awesome-icon :icon="['fas', 'bell']" class="text-2xl header-icon" />
        <div class="notification-bubble h-3 w-3 absolute bg-paletteOrange rounded-full hidden"></div>
      </div>
      <n-popover placement="bottom" trigger="hover">
        <template #trigger>
          <div class="profile-group bg-primary-gradient h-12 w-12 rounded-full flex items-center justify-center">
            <font-awesome-icon :icon="['fas', 'user']" class="text-2xl" />
          </div>
        </template>
        <n-menu :options="menuOptions"> </n-menu>
      </n-popover>
    </div>
  </div>
</template>
<script>
import { supabase } from "@/lib/supabaseClient";
import { userStore } from "@/stores/userStore";
import { NPopover, NMenu } from "naive-ui";

export default {
  components: { NPopover, NMenu },
  data() {
    return {
      session: null,
    };
  },
  computed: {
    menuOptions() {
      return [
        {
          label: "Sign Out",
          key: "sign-out",
          onClick: () => this.signOut(),
        },
      ];
    },
  },
  methods: {
    async signOut() {
      const { error } = await supabase.auth.signOut();
      if (error) {
        window.$message.error("There was an error signing out. Please try again.");
      } else {
        this.session = null;
        window.$message.success("You have successfully signed out.");
        this.$router.push("/login");
      }
    },
  },
  mounted() {
    userStore().$subscribe((store) => {
      this.session = store.events.newValue;
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
</style>
