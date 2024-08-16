import { defineStore } from "pinia";
import { ref } from "vue";

export const useGlobalStore = defineStore("globalStore", () => {
  const navData =ref([
    {
        name: "自動排班",
        path: "/auto-schedule",
    },
    {
        name: "資料建檔",
        path: "/data-entry",
    },
    {
        name: "預覽",
        path: "/",
    },
  ]);

  const loading = ref(false);

  function setLoading(value: boolean) {
    loading.value = value;
  }

  return { 
    navData,
    loading,
    setLoading
 };
});