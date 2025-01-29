<script setup>
import { defineProps } from 'vue';
import CpoOlahOperation from '@/views/dashboard/report/operation/components/CpoOlahOperation.vue';
import LaporanProduksiOperation from '@/views/dashboard/report/operation/components/LaporanProduksiOperation.vue';


const props = defineProps({
    datacpo: {
        type: Object,
        default: () => ({})
    },
    laporanproduksi: {
        type: Object,
        default: () => ({})
    }
});
</script>

<template>
    <div class="grid grid-cols-2 gap-2">
        <cpo-olah-operation :datas="datacpo" />
        <laporan-produksi-operation :datas="laporanproduksi" />
    </div>
</template>
