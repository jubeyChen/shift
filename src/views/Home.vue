<template>
  <ul class="grid grid-cols-3 gap-10 container mx-auto mt-10">
    <li v-for="item in navData" :key="item.name">
      <router-link :to="item.path">
        {{ item.name }}
      </router-link>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useGlobalStore } from "@/store/globalStore";
import { storeToRefs } from "pinia";

const globalStore = useGlobalStore();
const { navData } = storeToRefs(globalStore);
</script>

<style scoped lang="scss">
li {
  width: 50%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e6ccb2;
  border-radius: 16px;

  a {
    width: 100%;
    padding: 25px;
    border-radius: 16px;
    text-align: center;
  }

  &:hover {
    background-color: #b08968;
    color: #fff;
    cursor: pointer;
    transition: all 0.3s ease;
  }
}
</style>
