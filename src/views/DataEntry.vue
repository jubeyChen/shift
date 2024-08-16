<template>
  <div class="container mx-auto">
    <h1 class="text-2xl font-bold text-center">資料建檔</h1>

    <div class="mt-10 flex justify-end">
      <button class="bg-custom-brown-500 text-white px-4 py-2 rounded-md" @click="showForm = true">
        新增
      </button>
    </div>

    <table class="mt-5">
      <thead>
        <tr>
          <th v-for="column in columns" :key="column">{{ column }}</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in fakeData" :key="item.name">
          <td>{{ item.name }}</td>
          <td>{{ item.age }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <DataForm v-if="showForm" @close="showForm = false" @save="showForm = false"/>
</template>

<script setup lang="ts">
import { ref } from "vue";
import DataForm from "@/components/DataForm.vue";

const showForm = ref(false);
const columns = ref(["姓名", "請假"]);
const fakeData = ref([
  {
    name: "A",
    age: 20,
  },
]);
</script>

<style scoped lang="scss">
table {
  width: 100%;
  border-collapse: collapse;
  overflow-x: auto;

  thead {
    background-color: #7f5539;
    color: #fff;
  }

  tbody {
    background-color: #e6ccb2;
    text-align: center;
  }

  th,
  td {
    padding: 10px;
  }
}
</style>
