<script setup>
import { defineProps, ref, watch } from 'vue';
import EbitdaMarginFinance from '@/views/dashboard/report/finance/components/EbitdaMarginFinance.vue';
import GrossProfitMarginFinance from '@/views/dashboard/report/finance/components/GrossProfitMarginFinance.vue';
import RevenueFinance from '@/views/dashboard/report/finance/components/RevenueFinance.vue';

const props = defineProps({
    datarevenue: {
        type: Object,
        default: () => ({})
    }
});
</script>

<template>
    <div class="grid grid-cols-3 gap-2">
        <revenue-finance :datas="datarevenue" />
        <gross-profit-margin-finance />
        <ebitda-margin-finance />
    </div>
</template>
