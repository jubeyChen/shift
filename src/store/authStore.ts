import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("authStore", () => {
  const user = ref<any>();
  const authLoaded = ref(false);

  function setUser(currentUser: any) {
    user.value = currentUser;
    authLoaded.value = true;
  }

  return {
    user,
    authLoaded,
    setUser,
  };
});