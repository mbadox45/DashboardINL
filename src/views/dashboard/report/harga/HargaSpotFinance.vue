<script setup>
import { defineProps } from 'vue';

import HargaBulkyFinance from '@/views/dashboard/report/harga/components/HargaBulkyFinance.vue';
import HargaRetailFinance from '@/views/dashboard/report/harga/components/HargaRetailFinance.vue';

const props = defineProps({
    databulky: {
        type: Object,
        default: () => ({})
    },
    dataretail: {
        type: Object,
        default: () => ({})
    }
});
</script>

<template>
    <div class="grid grid-cols-2 gap-2">
        <harga-bulky-finance :datas="databulky" />
        <harga-retail-finance :datas="dataretail" />
    </div>
</template>
