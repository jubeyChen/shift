<template>
  <header class="flex justify-between items-center p-4 min-h-[76px]">
    <div
      class="font-bold cursor-pointer"
      @click="router.push({ name: 'home' })"
    >
      排班系統
    </div>

    <div v-if="authLoaded" class="flex items-center gap-2">
      <div v-if="user">
        <ul class="flex items-center gap-5 mr-2">
          <li v-for="item in navData" :key="item.name">
            <router-link :to="item.path">
              {{ item.name }}
            </router-link>
          </li>
        </ul>
      </div>

      <div>
        <button v-if="!user" @click="loginWithGoogle">登入</button>

        <div v-if="user" class="flex items-center gap-2">
          <div class="w-10 h-10 rounded-full overflow-hidden">
            <img :src="user.photoURL" alt="User Profile" />
          </div>
          <button @click="logout">登出</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/store/authStore";
import { useApiStore } from "@/store/apiStore";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useGlobalStore } from "@/store/globalStore";

const apiStore = useApiStore();
const globalStore = useGlobalStore();
const { navData } = storeToRefs(globalStore);
const router = useRouter();

const authStore = useAuthStore();
const { user, authLoaded } = storeToRefs(authStore);

// 使用 Google 登入
function loginWithGoogle() {
  apiStore.loginWithGoogle().subscribe((res) => {
    user.value = res.user;
    router.push({ name: "home" });
  });
}

// 登出功能
function logout() {
  apiStore.logout().subscribe(() => {
    user.value = null;
    router.push({ name: "login" });
  });
}
</script>

<style scoped lang="scss">
header {
  background-color: #7f5539;
  color: #fff;
}

li {
  a {
    padding: 10px;
    &:hover {
      background-color: #b08968;
      border-radius: 10px;
    }
  }
}

.router-link-active {
  background-color: #b08968;
  border-radius: 10px;
}
</style>
