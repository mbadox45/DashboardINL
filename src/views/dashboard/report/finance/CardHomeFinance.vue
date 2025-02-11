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
    },
    formPush: {
        type: Object,
        default: () => ({})
    }
});
</script>

<template>
    <div class="grid grid-cols-3 gap-2">
        <revenue-finance :datas="datarevenue" :formPush="formPush" />
        <gross-profit-margin-finance :datas="datarevenue" :formPush="formPush" />
        <ebitda-margin-finance :datas="datarevenue" :formPush="formPush" />
        <net-profit-margin-finance :datas="datarevenue" :formPush="formPush" />
        <cash-balance-finance :datas="datacash.cashBalance" :formPush="formPush" />
        <cash-flow-movement-finance :datas="datacash.cashFlowMovement" :formPush="formPush" />
        <pay-schedule-finance :datas="datapayschedule" :formPush="formPush" />
        <kpbn-cpo-finance :datas="datacpokpbn" :formPush="formPush" />
        <kurs-finance :datas="datakurs" :formPush="formPush" />
        <!-- <net-profit-margin-finance :datas="datarevenue" /> -->
    </div>
</template>
