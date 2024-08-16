import { createRouter, createWebHistory } from "vue-router";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "home",
      path: "/",
      component: () => import("@/views/Home.vue"),
    },
    {
      name: "login",
      path: "/login",
      component: () => import("@/views/Login.vue"),
    },
    {
      name: "auto-schedule",
      path: "/auto-schedule",
      component: () => import("@/views/AutoSchedule.vue"),
    },
    {
      name: "data-entry",
      path: "/data-entry",
      component: () => import("@/views/DataEntry.vue"),
    },
    {
      name: "404",
      path: "/:catchAll(.*)",
      component: () => import("@/views/Home.vue"),
    },
  ],
});

router.beforeEach(async (to, _, next) => {
  const { useAuthStore } = await import("@/store/authStore");
  const authStore = useAuthStore();

  // 使用 Promise 包装 onAuthStateChanged
  const checkAuthState = () =>
    new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        authStore.setUser(currentUser);
        unsubscribe(); // 取消訂閱，避免多次觸發
        resolve(currentUser);
      });
    });

  try {
    await checkAuthState();

    if (!authStore.user && to.name !== "login") {
      next({ name: "login" });
    } else if (authStore.user && to.name === "login") {
      next({ name: "home" });
    } else {
      next();
    }
  } catch (error) {
    console.error("認證檢查失敗:", error);
    next({ name: "login" }); // 出錯時導航到登入頁面
  }
});

export default router;
