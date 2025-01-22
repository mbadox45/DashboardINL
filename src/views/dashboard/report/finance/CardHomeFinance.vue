<script setup>
import EbitdaMarginFinance from '@/views/dashboard/report/finance/components/EbitdaMarginFinance.vue';
import GrossProfitMarginFinance from '@/views/dashboard/report/finance/components/GrossProfitMarginFinance.vue';
import RevenueFinance from '@/views/dashboard/report/finance/components/RevenueFinance.vue';
</script>

<template>
    <div class="grid grid-cols-3 gap-2">
        <revenue-finance />
        <gross-profit-margin-finance />
        <ebitda-margin-finance />
    </div>
</template>
