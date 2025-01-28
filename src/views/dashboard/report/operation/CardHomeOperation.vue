<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    datacpo: {
        type: Object,
        default: () => ({})
    }
});
</script>

<template>
    <div class="grid grid-cols-3 gap-2">
        <div></div>
    </div>
</template>
