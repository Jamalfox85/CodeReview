import { createMemoryHistory, createRouter } from "vue-router";
import { supabase } from "@/lib/supabaseClient";
import { userStore } from "@/stores/userStore";

import Home from "@/views/Home.vue";
import Review from "@/views/Review.vue";
import Submit from "@/views/Submit.vue";
import Settings from "@/views/Settings.vue";
import Login from "@/views/Login.vue";
import MyQuestions from "@/views/MyQuestions.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/review", name: "Review", component: Review },
  { path: "/submit", name: "Submit", component: Submit },
  { path: "/settings", name: "Settings", component: Settings },
  { path: "/login", name: "Login", component: Login },
  { path: "/myquestions", name: "MyQuestions", component: MyQuestions },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const { data, error } = await supabase.auth.getSession();
  if (data.session == null && to.path !== "/login") {
    next({ name: "Login" });
    return false;
  } else {
    userStore().setSession(data.session);
    next();
  }
});

export default router;
