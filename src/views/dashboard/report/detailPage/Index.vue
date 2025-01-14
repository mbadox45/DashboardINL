<script setup>
import CryptoJS from 'crypto-js';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// Components
import AppTopbar from '@/views/dashboard/layout/components/AppTopbar.vue';
// Financial
import CashBalanceFinance from '@/views/dashboard/report/detailPage/components/financial/CashBalanceFinance.vue';
import CashFlowMovementFinance from '@/views/dashboard/report/detailPage/components/financial/CashFlowMovementFinance.vue';
import CffPayScheduleFinance from '@/views/dashboard/report/detailPage/components/financial/CffPayScheduleFinance.vue';
import CfiPayScheduleFinance from '@/views/dashboard/report/detailPage/components/financial/CfiPayScheduleFinance.vue';
import EbitdaMarginFinance from '@/views/dashboard/report/detailPage/components/financial/EbitdaMarginFinance.vue';
import GrossProfitDetailFinance from '@/views/dashboard/report/detailPage/components/financial/GrossProfitDetailFinance.vue';
import HargaSpotInventoryBulkyFinance from '@/views/dashboard/report/detailPage/components/financial/HargaSpotInventoryBulkyFinance.vue';
import HargaSpotInventoryRetailFinance from '@/views/dashboard/report/detailPage/components/financial/HargaSpotInventoryRetailFinance.vue';
import NetProfitMarginFinance from '@/views/dashboard/report/detailPage/components/financial/NetProfitMarginFinance.vue';
import RevenueDetailFinance from '@/views/dashboard/report/detailPage/components/financial/RevenueDetailFinance.vue';
// Operation
import CpoOlahVsRkapOperation from '@/views/dashboard/report/detailPage/components/operation/cpoOlahRkapUtility/Index.vue';
import LaporanProduksiOperation from '@/views/dashboard/report/detailPage/components/operation/LaporanProduksiOperation.vue';
import PackagingOperation from '@/views/dashboard/report/detailPage/components/operation/PackagingOperation.vue';

const route = useRoute();
const router = useRouter();
const routeName = ref('');
const routeType = ref('');

onMounted(() => {
    funcCondition();
});

const funcCondition = () => {
    const query = route.query.component;
    if (query == null || query == '') {
        router.push({ path: '/not-found' });
    } else {
        const bytes = CryptoJS.AES.decrypt(query, 'your-secret-key');
        const jsonString = bytes.toString(CryptoJS.enc.Utf8);
        const hasil = JSON.parse(jsonString);
        routeName.value = hasil.path;
        routeType.value = hasil.type;
        console.log(hasil);
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
        <div class="bg-black w-full min-h-[30rem] p-6 rounded-xl" v-if="routeType == 'financial'">
            <revenue-detail-finance v-if="routeName == 'revenue'" />
            <gross-profit-detail-finance v-else-if="routeName == 'gross-profit'" />
            <ebitda-margin-finance v-else-if="routeName == 'ebitda-margin'" />
            <net-profit-margin-finance v-else-if="routeName == 'net-profit-margin'" />
            <cash-balance-finance v-else-if="routeName == 'cash-balance'" />
            <cash-flow-movement-finance v-else-if="routeName == 'cash-flow-movement'" />
            <cff-pay-schedule-finance v-else-if="routeName == 'cff-pay-schedule'" />
            <cfi-pay-schedule-finance v-else-if="routeName == 'cfi-pay-schedule'" />
            <harga-spot-inventory-bulky-finance v-else-if="routeName == 'harga-spot-inventory-bulky'" />
            <harga-spot-inventory-retail-finance v-else-if="routeName == 'harga-spot-inventory-retail'" />
        </div>
        <div class="min-h-[30rem] p-6 rounded-xl" v-else>
            <cpo-olah-vs-rkap-operation v-if="routeName == 'cpo-olah-vs-rkap'" />
            <packaging-operation v-else-if="routeName == 'packaging-operation'" />
            <laporan-produksi-operation v-else-if="routeName == 'laporan-produksi-operation'" />
            <div v-else class="h-[30rem] w-full flex flex-col items-center justify-center">
                <span>404 Not Found</span>
            </div>
        </div>
        <button class="fixed top-[1.5vw] left-[1.5vw] p-3 z-50 bg-amber-500 rounded-full font-extrabold border-2 hover:bg-amber-600 transition-all duration-200 flex gap-2 justify-center items-center" @click="routerLink">
            <i class="pi pi-arrow-left" style="font-size: 0.7vw"></i>
            <span class="" style="font-size: 0.7vw">Back</span>
        </button>
    </div>
</template>
