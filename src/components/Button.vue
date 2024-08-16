<template>
    <button :type="type" class="px-4 py-2 rounded-md" :class="{'border border-custom-brown-500 text-custom-brown-500 bg-white': props.outline, 'bg-custom-brown-500 text-white': props.default, 'bg-red-500 text-white': props.delete}">
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

const props = defineProps({
    type:{
        type: String as PropType<"button" | "submit" | "reset" | undefined>,
        default: "button"
    },
    outline:{
        type: Boolean,
        default: false
    },
    default:{
        type: Boolean,
        default: false
    },
    delete:{
        type: Boolean,
        default: false
    }
})
</script>