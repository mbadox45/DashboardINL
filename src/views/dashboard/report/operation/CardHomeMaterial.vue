<script setup>
import LaporanMaterialOperation from '@/views/dashboard/report/operation/components/LaporanMaterialOperation.vue';
import { defineProps } from 'vue';

const props = defineProps({
    laporanmaterial: {
        type: Object,
        default: () => ({})
    },
    formPush: {
        type: Object,
        default: () => ({})
    }
});
</script>

<template>
    <div class="w-full">
        <laporan-material-operation :datas="laporanmaterial" :formPush="formPush" />
    </div>
</template>
