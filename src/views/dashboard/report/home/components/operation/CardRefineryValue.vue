<script setup>
import { onMounted, ref } from 'vue';

const colors = ref('');

onMounted(() => {});

const loadData = () => {};
</script>

<template>
    <div class="text-xs flex gap-3 w-full mt-3">
        <span class="text-center rounded-full w-full font-bold bg-black flex flex-col-reverse text-[10px] py-2 px-3"><span class="w-full">CPO Olah</span><span class="border-b pb-1 border-neutral-900"> 8.860.560</span> </span>
        <span class="text-center rounded-full w-full font-bold bg-black flex flex-col-reverse text-[10px] py-2 px-3"><span class="w-full">RKAP</span><span class="border-b pb-1 border-neutral-900"> 52.800.000</span> </span>
        <span class="text-center rounded-full w-full font-bold bg-black flex flex-col-reverse text-[10px] py-2 px-3"><span class="w-full">Utility</span><span class="border-b pb-1 border-neutral-900"> 66.000.000</span> </span>
    </div>
</template>
