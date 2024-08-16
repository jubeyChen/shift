<template>
  <div class="relative w-full">
    <input :type="props.type" class="input" :class="{'error-input': errorMessage}"  :value="modelValue" @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"/>
    <span v-if="errorMessage" class="error-message">{{ errorMessage }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
  },
  type: {
    type: String,
    default: "text",
  },
  errorMessage: {
    type: String,
    default: "",
  },
});
</script>
