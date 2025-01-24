<script setup>
import CashBalanceFinance from '@/views/dashboard/report/finance/components/CashBalanceFinance.vue';
import CashFlowMovementFinance from '@/views/dashboard/report/finance/components/CashFlowMovementFinance.vue';
import EbitdaMarginFinance from '@/views/dashboard/report/finance/components/EbitdaMarginFinance.vue';
import GrossProfitMarginFinance from '@/views/dashboard/report/finance/components/GrossProfitMarginFinance.vue';
import KpbnCpoFinance from '@/views/dashboard/report/finance/components/KpbnCpoFinance.vue';
import KursFinance from '@/views/dashboard/report/finance/components/KursFinance.vue';
import NetProfitMarginFinance from '@/views/dashboard/report/finance/components/NetProfitMarginFinance.vue';
import PayScheduleFinance from '@/views/dashboard/report/finance/components/PayScheduleFinance.vue';
import RevenueFinance from '@/views/dashboard/report/finance/components/RevenueFinance.vue';
import { defineProps } from 'vue';

const props = defineProps({
    datarevenue: {
        type: Object,
        default: () => ({})
    },
    datacash: {
        type: Object,
        default: () => ({})
    },
    datapayschedule: {
        type: Object,
        default: () => ({})
    },
    datacpokpbn: {
        type: Object,
        default: () => ({})
    },
    datakurs: {
        type: Object,
        default: () => ({})
    }
});
</script>

<template>
    <div class="grid grid-cols-3 gap-2">
        <revenue-finance :datas="datarevenue" />
        <gross-profit-margin-finance :datas="datarevenue" />
        <ebitda-margin-finance :datas="datarevenue" />
        <net-profit-margin-finance :datas="datarevenue" />
        <cash-balance-finance :datas="datacash.cashBalance" />
        <cash-flow-movement-finance :datas="datacash.cashFlowMovement" />
        <pay-schedule-finance :datas="datapayschedule" />
        <kpbn-cpo-finance :datas="datacpokpbn" />
        <kurs-finance :datas="datakurs" />
        <!-- <net-profit-margin-finance :datas="datarevenue" /> -->
    </div>
</template>
