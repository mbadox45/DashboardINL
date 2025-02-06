<script setup>
import CryptoJS from 'crypto-js';
import moment from 'moment';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// Components
import TopBar from '@/views/dashboard/layout/components/TopBar.vue';
// Financial
import CashBalanceFinance from '@/views/dashboard/report/detailPage/components/financial/CashBalanceFinance.vue';
import CashFlowMovementFinance from '@/views/dashboard/report/detailPage/components/financial/CashFlowMovementFinance.vue';
import CffPayScheduleFinance from '@/views/dashboard/report/detailPage/components/financial/CffPayScheduleFinance.vue';
import CfiPayScheduleFinance from '@/views/dashboard/report/detailPage/components/financial/CfiPayScheduleFinance.vue';
import CpoKpbnDetailFinance from '@/views/dashboard/report/detailPage/components/financial/CpoKpbnDetailFinance.vue';
import EbitdaMarginFinance from '@/views/dashboard/report/detailPage/components/financial/EbitdaMarginFinance.vue';
import GrossProfitDetailFinance from '@/views/dashboard/report/detailPage/components/financial/GrossProfitDetailFinance.vue';
import HargaSpotInventoryBulkyFinance from '@/views/dashboard/report/detailPage/components/financial/HargaSpotInventoryBulkyFinance.vue';
import HargaSpotInventoryRetailFinance from '@/views/dashboard/report/detailPage/components/financial/HargaSpotInventoryRetailFinance.vue';
import KursMataUangFinance from '@/views/dashboard/report/detailPage/components/financial/KursMataUangFinance.vue';
import NetProfitMarginFinance from '@/views/dashboard/report/detailPage/components/financial/NetProfitMarginFinance.vue';
import RevenueDetailFinance from '@/views/dashboard/report/detailPage/components/financial/RevenueDetailFinance.vue';
// Operation
import CpoOlahVsRkapOperation from '@/views/dashboard/report/detailPage/components/operation/cpoOlahRkapUtility/Index.vue';
import LaporanProduksiOperation from '@/views/dashboard/report/detailPage/components/operation/LaporanProduksiOperation.vue';
import PackagingOperation from '@/views/dashboard/report/detailPage/components/operation/PackagingOperation.vue';

// Controller
import financeDetailController from '@/controller/home/controllerDetailPage/financeDetailController';
import hargaDetailController from '@/controller/home/controllerDetailPage/hargaDetailController';

const route = useRoute();
const router = useRouter();
const routeName = ref('');
const routeType = ref('');
const listData = ref(null);
const formData = ref({
    idPmg: 1,
    idMataUang: 1,
    idPackaging: 1,
    tanggalAwal: moment('2023-01-01').format('YYYY-MM-DD'),
    tanggalAkhir: moment('2024-03-31').format('YYYY-MM-DD')
    // tanggalAwal: moment().format('YYYY-MM-01'),
    // tanggalAkhir: moment().format('YYYY-MM-DD')
});

onMounted(() => {
    funcCondition();
});

const funcCondition = async () => {
    const query = route.query.component;
    if (query == null || query == '') {
        router.push({ path: '/not-found' });
    } else {
        const bytes = CryptoJS.AES.decrypt(query, 'your-secret-key');
        const jsonString = bytes.toString(CryptoJS.enc.Utf8);
        const hasil = JSON.parse(jsonString);
        routeName.value = hasil.path;
        routeType.value = hasil.type;
        console.log(hasil.path + '-' + hasil.type);
        const pathName = hasil.path + '-' + hasil.type;
        const response = await loadFinance(pathName);
        console.log(response);
        listData.value = response;
    }
};

const loadFinance = async (path) => {
    let result;
    if (path.toLowerCase().includes('revenue-financial')) {
        result = await financeDetailController.resultRevenue(formData.value);
    } else if (path.toLowerCase().includes('ebitda-margin-financial')) {
        result = await financeDetailController.resultEbitda(formData.value);
    } else if (path.toLowerCase().includes('net-profit-margin-financial')) {
        result = await financeDetailController.resultNetProfit(formData.value);
    } else if (path.toLowerCase().includes('cash-balance-financial')) {
        result = await financeDetailController.resultCashBalanced(formData.value);
    } else if (path.toLowerCase().includes('cash-flow-movement-financial')) {
        result = await financeDetailController.resultCashFlowMovement(formData.value);
    } else if (path.toLowerCase().includes('cff-pay-schedule-financial')) {
        result = await financeDetailController.resultPaySchedule(formData.value);
    } else if (path.toLowerCase().includes('cpo-kpbn-financial')) {
        result = await financeDetailController.cpoKpbn(formData.value);
    } else if (path.toLowerCase().includes('kurs-mata-uang-financial')) {
        result = await financeDetailController.resultKursMataUang(formData.value);
    } else if (path.toLowerCase().includes('harga-spot-inventory-bulky-financial')) {
        result = await hargaDetailController.hargaSpotInventoryBulk(formData.value);
    } else if (path.toLowerCase().includes('harga-spot-inventory-retail-financial')) {
        result = await hargaDetailController.hargaSpotInventoryRetail(formData.value);
    } else {
        result = await financeDetailController.resultGrossProfit(formData.value);
    }
    return result;
};

const updateDates = async (dates) => {
    const form = {
        idPmg: dates.pmg,
        idMataUang: dates.mataUang,
        idPackaging: dates.packaging,
        tanggalAwal: dates.beforeDate,
        tanggalAkhir: dates.now
    };
    formData.value = form;
    const response = await loadFinance(routeName.value + '-' + routeType.value);
    listData.value = response;
};
</script>

<template>
    <div class="flex flex-col gap-2 layout-scroller bg-neutral-950 min-h-screen text-white app-dark">
        <top-bar :onDateChange="updateDates"></top-bar>
        <!-- <app-topbar></app-topbar> -->
        <div class="bg-black w-full p-6 rounded-xl" v-if="routeType == 'financial'">
            <revenue-detail-finance v-if="routeName == 'revenue'" :datas="listData" />
            <gross-profit-detail-finance v-else-if="routeName == 'gross-profit'" :datas="listData" />
            <ebitda-margin-finance v-else-if="routeName == 'ebitda-margin'" :datas="listData" />
            <net-profit-margin-finance v-else-if="routeName == 'net-profit-margin'" :datas="listData" />
            <cash-balance-finance v-else-if="routeName == 'cash-balance'" :datas="listData" />
            <cash-flow-movement-finance v-else-if="routeName == 'cash-flow-movement'" :datas="listData" />
            <cff-pay-schedule-finance v-else-if="routeName == 'cff-pay-schedule'" :datas="listData" />
            <cfi-pay-schedule-finance v-else-if="routeName == 'cfi-pay-schedule'" />
            <harga-spot-inventory-bulky-finance v-else-if="routeName == 'harga-spot-inventory-bulky'" :sell="listData" />
            <harga-spot-inventory-retail-finance v-else-if="routeName == 'harga-spot-inventory-retail'" :sell="listData" />
            <cpo-kpbn-detail-finance v-else-if="routeName == 'cpo-kpbn'" :datas="listData" />
            <kurs-mata-uang-finance v-else-if="routeName == 'kurs-mata-uang'" :datas="listData" />
        </div>
        <div class="min-h-[30rem] p-6 rounded-xl" v-else>
            <cpo-olah-vs-rkap-operation v-if="routeName == 'cpo-olah-vs-rkap'" />
            <packaging-operation v-else-if="routeName == 'packaging-operation'" />
            <laporan-produksi-operation v-else-if="routeName == 'laporan-produksi-operation'" />
            <div v-else class="h-[30rem] w-full flex flex-col items-center justify-center">
                <span>404 Not Found</span>
            </div>
        </div>
    </div>
</template>

<style>
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>
