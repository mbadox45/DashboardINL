<script setup>
import CpoOlahOperation from '@/views/dashboard/report/operation/components/CpoOlahOperation.vue';
import LaporanProduksiOperation from '@/views/dashboard/report/operation/components/LaporanProduksiOperation.vue';
import { defineProps } from 'vue';

const props = defineProps({
    datacpo: {
        type: Object,
        default: () => ({})
    },
    laporanproduksi: {
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
    <div class="grid grid-cols-2 gap-2">
        <cpo-olah-operation :datas="datacpo" :formPush="formPush" />
        <laporan-produksi-operation :datas="laporanproduksi" :formPush="formPush" />
    </div>
</template>
