<template>
  <Header />
  <main>
    <router-view />
  </main>
  <Loading v-if="loading" />
</template>

<script setup lang="ts">
import Header from "@/components/Header.vue";
import Loading from "@/components/Loading.vue";
import { useGlobalStore } from "@/store/globalStore";
import { storeToRefs } from "pinia";

const globalStore = useGlobalStore();
const { loading } = storeToRefs(globalStore);
</script>

<style scoped lang="scss">
main{
  padding: 20px;
  height: calc(100vh - 76px);
}
</style>
