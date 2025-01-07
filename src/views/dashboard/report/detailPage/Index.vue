<script setup>
import CryptoJS from 'crypto-js';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// Components
import AppTopbar from '@/views/dashboard/layout/components/AppTopbar.vue';
import CashBalanceFinance from '@/views/dashboard/report/detailPage/components/financial/CashBalanceFinance.vue';
import CashFlowMovementFinance from '@/views/dashboard/report/detailPage/components/financial/CashFlowMovementFinance.vue';
import CffPayScheduleFinance from '@/views/dashboard/report/detailPage/components/financial/CffPayScheduleFinance.vue';
import CfiPayScheduleFinance from '@/views/dashboard/report/detailPage/components/financial/CfiPayScheduleFinance.vue';
import EbitdaMarginFinance from '@/views/dashboard/report/detailPage/components/financial/EbitdaMarginFinance.vue';
import GrossProfitDetailFinance from '@/views/dashboard/report/detailPage/components/financial/GrossProfitDetailFinance.vue';
import NetProfitMarginFinance from '@/views/dashboard/report/detailPage/components/financial/NetProfitMarginFinance.vue';
import RevenueDetailFinance from '@/views/dashboard/report/detailPage/components/financial/RevenueDetailFinance.vue';

const route = useRoute();
const router = useRouter();
const routeName = ref('');

onMounted(() => {
    funcCondition();
});

const funcCondition = () => {
    const query = route.query.component;
    if (query == null || query == '') {
        router.push({ path: '/not-found' });
    } else {
        routeName.value = query;
        const bytes = CryptoJS.AES.decrypt(query, 'your-secret-key');
        routeName.value = bytes.toString(CryptoJS.enc.Utf8);
    }
};

const routerLink = () => {
    // const encryptedQuery = encryptQuery(JSON.stringify(path));
    window.history.back();
};
</script>

<template>
    <div class="p-3 bg-neutral-950 min-h-screen text-white">
        <app-topbar></app-topbar>
        <div class="bg-black w-full min-h-[30rem] p-6 rounded-xl">
            <revenue-detail-finance v-if="routeName == 'revenue'" />
            <gross-profit-detail-finance v-if="routeName == 'gross-profit'" />
            <ebitda-margin-finance v-if="routeName == 'ebitda-margin'" />
            <net-profit-margin-finance v-if="routeName == 'net-profit-margin'" />
            <cash-balance-finance v-if="routeName == 'cash-balance'" />
            <cash-flow-movement-finance v-if="routeName == 'cash-flow-movement'" />
            <cff-pay-schedule-finance v-if="routeName == 'cff-pay-schedule'" />
            <cfi-pay-schedule-finance v-if="routeName == 'cfi-pay-schedule'" />
            <button class="fixed top-[1.5vw] left-[1.5vw] p-3 z-50 bg-amber-500 rounded-full font-extrabold border-2 hover:bg-amber-600 transition-all duration-200 flex gap-2 justify-center items-center" @click="routerLink">
                <i class="pi pi-arrow-left" style="font-size: 0.7vw"></i>
                <span class="" style="font-size: 0.7vw">Back</span>
            </button>
        </div>
    </div>
</template>
