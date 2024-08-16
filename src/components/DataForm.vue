<template>
  <Teleport to="body">
    <div class="mask">
      <div class="mask-content">
        <h1 class="text-2xl font-bold text-center mb-5">
          {{ props.operationType === Operation.Add ? "新增" : "編輯" }}
        </h1>

        <div class="mb-5">
          <Form
            :initial-values="initialValues"
            :validation-schema="schema"
            @submit="handleSubmit"
            @invalid-submit="handleInvalidSubmit"
            class="grid grid-cols-1 gap-8"
          >
            <div class="flex items-center gap-5">
              <label for="num" class="w-1/4">番號</label>
              <Field
                v-slot="{ errors, field, value }"
                v-model="initialValues.num"
                name="num"
                class="w-3/4"
              >
                <Select
                  v-bind="field"
                  :model-value="value"
                  :options="nums"
                  :error-message="errors[0]"
                  id="num"
                />
              </Field>
            </div>

            <div class="flex items-center gap-5">
              <label for="name" class="w-1/4">姓名</label>
              <Field v-slot="{ errors, field, value }" name="name" v-model="initialValues.name" class="w-3/4">
                <Input
                  v-bind="field"
                  :model-value="value"
                  :error-message="errors[0]"
                />
              </Field>
            </div>

            <div class="flex items-center gap-5">
              <label for="job" class="w-1/4">職稱</label>
              <Field
                v-slot="{ errors, field, value }"
                v-model="initialValues.job"
                name="job"
                class="w-3/4"
              >
                <Select
                  v-bind="field"
                  :model-value="value"
                  :options="jobs"
                  :error-message="errors[0]"
                  id="job"
                />
              </Field>
            </div>

            <div class="flex justify-center gap-4">
              <Button outline @click="emits('close')">取消</Button>
              <Button default type="submit">儲存</Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import Button from "@/components/Button.vue";
import { Operation, Job } from "@/enums/enums";
import { Form, Field } from "vee-validate";
import { computed, onMounted, ref } from "vue";
import * as yup from "yup";
import Input from "@/components/Input.vue";
import Select from "@/components/Select.vue";

const props = defineProps({
  operationType: {
    type: String,
    default: Operation.Add,
  },
  editData: {
    type: Object,
    default: null,
  },
});

const emits = defineEmits(["close", "save", "edit"]);
const nums = computed(() => {
  return Array.from({ length: 39 }, (_, index) => ({
    value: index + 1,
    label: (index + 1).toString(),
  }));
});

const jobs = ref([
  { value: Job.TeamLeader, label: Job.TeamLeader },
  { value: Job.ActingSquadLeader, label: Job.ActingSquadLeader },
  { value: Job.NonBusinessSquadLeader, label: Job.NonBusinessSquadLeader },
  { value: Job.BusinessSquadLeader, label: Job.BusinessSquadLeader },
  { value: Job.BusinessOfficer, label: Job.BusinessOfficer },
  { value: Job.NonBusinessOfficer, label: Job.NonBusinessOfficer },
  { value: Job.PhotoTestOfficer, label: Job.PhotoTestOfficer },
]);

const initialValues = ref({
  num: "",
  name: "",
  job: "",
});

const schema = yup.object().shape({
  num: yup.string().required("請選擇番號"),
  name: yup.string().required("請輸入姓名"),
  job: yup.string().required("請選擇職稱"),
});

const editData = computed(() => {
  return props.editData;
});

onMounted(() => {
  if (props.operationType === Operation.Edit) {
    initialValues.value.num = editData.value.num;
    initialValues.value.name = editData.value.name;
    initialValues.value.job = editData.value.job;
  }
});

function handleSubmit(values: any) {
  switch (props.operationType) {
    case Operation.Add:
      emits("save", { ...values, id: Date.now().toString() });
      emits("close");
      break;

    case Operation.Edit:
      emits("edit", { ...values, id: editData.value.id });
      emits("close");
      break;
  }
}

function handleInvalidSubmit(values: any) {
  console.log(values);
}
</script>
