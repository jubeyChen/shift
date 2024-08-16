<template>
  <div class="relative w-full">
    <select :name="name" :id="id" class="input" :class="{'error-input': errorMessage}" :value="modelValue">
      <option
        v-for="(opt, index) in options"
        :key="index"
        :value="opt.value"
      >
        {{ opt.label }}
      </option>
    </select>
    <span v-if="errorMessage" class="error-message">{{ errorMessage }}</span>
  </div>
</template>

<script setup lang="ts">
import { Option } from "@/interface/interface";
import { computed } from "vue";
const props = defineProps({
  modelValue: {},
  options: {
    type: Array<Option>,
    default: [{
        value: "",
        label: ""
    }],
  },
  name: {
    type: String,
    default: "",
  },
  id: {
    type: String,
    required: true,
  },
  errorMessage: {
    type: String,
    default: "",
  },
});

const options = computed(() => {
  return props.options.map((option) => {
    return {
      value: option.value,
      label: option.label,
    };
  });
});
</script>
