<template>
  <div class="container mx-auto">
    <h1 class="text-2xl font-bold text-center">資料建檔</h1>

    <div class="mt-10 flex justify-end">
      <button
        class="bg-custom-brown-500 text-white px-4 py-2 rounded-md"
        @click="
          showForm = true;
          operationType = Operation.Add;
        "
      >
        新增
      </button>
    </div>

    <table class="mt-5">
      <thead>
        <tr>
          <th v-for="column in columns" :key="column" class="w-20">{{ column }}</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in peopleData" :key="item.name">
          <td>{{ item.num }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.job }}</td>
          <td>
            <Button outline class="mr-2" @click="edit(item)">編輯</Button>
            <Button delete @click="handleDelete(item)">刪除</Button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <DataForm
    v-if="showForm"
    :operationType="operationType"
    :editData="editData"
    @close="showForm = false"
    @save="handleSave"
    @edit="handleEdit"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import DataForm from "@/components/DataForm.vue";
import Button from "@/components/Button.vue";
import { Operation } from "@/enums/enums";
import { useApiStore } from "@/store/apiStore";
import { PeopleData } from "@/interface/interface";
import { db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useGlobalStore } from "@/store/globalStore";

const globalStore = useGlobalStore();
const apiStore = useApiStore();

const operationType = ref(Operation.Add);
const showForm = ref(false);
const editData = ref<PeopleData>({ id: "", num: "", name: "", job: "" });
const columns = ref(["番號", "姓名", "職稱", "操作"]);
const peopleData = ref<PeopleData[]>([]);
onMounted(() => {
  getData();
});

async function handleSave(addData: PeopleData) {
  globalStore.setLoading(true);
  const newData = {
    data: [...peopleData.value, addData],
  };
  const docRef = doc(db, "people-data", "yRz4x8hNBVSVicNecMdc");
  await setDoc(docRef, newData);
  getData();
  globalStore.setLoading(false);
}

function getData() {
  globalStore.setLoading(true);
  apiStore.getData().subscribe((res) => {
    peopleData.value = res.data;
    globalStore.setLoading(false);
  });
}

function edit(data: PeopleData) {
  operationType.value = Operation.Edit;
  showForm.value = true;
  editData.value = data;
}

async function handleEdit(data: PeopleData) {
  globalStore.setLoading(true);
  const id = data.id;
  const item = peopleData.value.find((item) => item.id === id);
  if (item) {
    item.num = data.num;
    item.name = data.name;
    item.job = data.job;
  }
  setData();
  globalStore.setLoading(false);
}

async function handleDelete(data: PeopleData) {
  globalStore.setLoading(true);
  const id = data.id;
  peopleData.value = peopleData.value.filter(
    (item: PeopleData) => item.id !== id
  );
  setData();
  globalStore.setLoading(false);
}

async function setData() {
  const newData = {
    data: peopleData.value,
  };
  const docRef = doc(db, "people-data", "yRz4x8hNBVSVicNecMdc");
  await setDoc(docRef, newData);
  getData();
}
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
