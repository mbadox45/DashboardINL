<script setup>
import QtyPenjualanBulkSales from '@/views/dashboard/report/sales/components/QtyPenjualanBulkSales.vue';
import QtyPenjualanRitelSales from '@/views/dashboard/report/sales/components/QtyPenjualanRitelSales.vue';

import { defineProps } from 'vue';

const props = defineProps({
    dataritel: {
        type: Object,
        default: () => ({})
    },
    databulk: {
        type: Object,
        default: () => ({})
    }
});
</script>

<template>
    <div class="grid grid-cols-1 gap-2">
        <qty-penjualan-bulk-sales :datas="databulk" />
        <qty-penjualan-ritel-sales :datas="dataritel" />
        <!-- <net-profit-margin-finance :datas="datarevenue" /> -->
    </div>
</template>
