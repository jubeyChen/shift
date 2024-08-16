<template>
    <button :class="`${props.outline ? 'border border-custom-brown-500 text-custom-brown-500' : 'bg-custom-brown-500 text-white'} px-4 py-2 rounded-md`">
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
const props = defineProps({
    outline:{
        type: Boolean,
        default: false
    }
})
</script>