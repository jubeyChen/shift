<template>
  <Teleport to="body">
    <div class="mask">
      <div class="mask-content">
        dkd

        <div class="flex justify-center gap-4">
          <Button outline @click="emits('close')">取消</Button>
          <Button @click="emits('save')">儲存</Button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import Button from "@/components/Button.vue";

const emits = defineEmits(['close', 'save']);
</script>
