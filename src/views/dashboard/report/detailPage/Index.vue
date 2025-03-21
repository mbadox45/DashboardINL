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
import CpoOlahVsRkapOperation from '@/views/dashboard/report/detailPage/components/operation/CpoOlahRkapUtilityOperation.vue';
import LaporanMaterialOperation from '@/views/dashboard/report/detailPage/components/operation/LaporanMaterialOperation.vue';
import LaporanProduksiOperation from '@/views/dashboard/report/detailPage/components/operation/LaporanProduksiOperation.vue';
import PackagingOperation from '@/views/dashboard/report/detailPage/components/operation/PackagingOperation.vue';
// Sales
import PenjualanBulkSales from '@/views/dashboard/report/detailPage/components/sales/PenjualanBulkSales.vue';
import PenjualanRitelSales from '@/views/dashboard/report/detailPage/components/sales/PenjualanRitelSales.vue';
// SCM
import ActualIncomingScm from '@/views/dashboard/report/detailPage/components/scm/ActualIncomingScm.vue';
import MarketReutersScm from '@/views/dashboard/report/detailPage/components/scm/MarketReutersScm.vue';
import OutstandingCpoScm from '@/views/dashboard/report/detailPage/components/scm/OutstandingCpoScm.vue';
import SaldoPeScm from '@/views/dashboard/report/detailPage/components/scm/SaldoPeScm.vue';
import StokBulkScm from '@/views/dashboard/report/detailPage/components/scm/StokBulkScm.vue';
import StokCpoScm from '@/views/dashboard/report/detailPage/components/scm/StokCpoScm.vue';
import StokRitelScm from '@/views/dashboard/report/detailPage/components/scm/StokRitelScm.vue';

// Controller
import financeDetailController from '@/controller/home/controllerDetailPage/financeDetailController';
import hargaDetailController from '@/controller/home/controllerDetailPage/hargaDetailController';
import operationDetailController from '@/controller/home/controllerDetailPage/operationDetailController';
import salesDetailController from '@/controller/home/controllerDetailPage/salesDetailController';
import scmDetailController from '@/controller/home/controllerDetailPage/scmDetailController';

const route = useRoute();
const router = useRouter();
const routeName = ref('');
const routeType = ref('');
const listData = ref(null);
const formData = ref({
    idPmg: 1,
    idMataUang: 1,
    idPackaging: 1,
    // tanggalAwal: moment('2023-01-01').format('YYYY-MM-DD'),
    // tanggalAkhir: moment('2024-10-30').format('YYYY-MM-DD')
    tanggalAwal: moment().format('YYYY-MM-01'),
    tanggalAkhir: moment().format('YYYY-MM-DD')
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
        // Route Condition
        const pathName = hasil.path + '-' + hasil.type;
        // Load Data Condition
        // const form = hasil.form;
        const dataLocal = localStorage.getItem('formData');
        if (dataLocal != null) {
            const parsedData = JSON.parse(dataLocal);
            // console.log(parsedData);
            formData.value = {
                idPmg: parsedData.pmg,
                idMataUang: parsedData.mataUang,
                idPackaging: parsedData.packaging,
                tanggalAwal: parsedData.beforeDate,
                tanggalAkhir: parsedData.now
            };
        }
        const response = await loadFinance(pathName);
        listData.value = response;
        // console.log(response);
    }
};

const loadFinance = async (path) => {
    let result;
    // console.log(formData.value);
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
    } else if (path.toLowerCase().includes('cpo-olah-vs-rkap-operation')) {
        result = await operationDetailController.cpoOlahVsRkap(formData.value);
    } else if (path.toLowerCase().includes('laporan-produksi-operation-operation')) {
        result = await operationDetailController.laporanProduksi(formData.value);
    } else if (path.toLowerCase().includes('packaging-operation-operation')) {
        result = await operationDetailController.laporanPackaging(formData.value);
    } else if (path.toLowerCase().includes('laporan-material-operation')) {
        result = await operationDetailController.laporanMaterial(formData.value);
    } else if (path.toLowerCase().includes('gross-profit-financial')) {
        result = await financeDetailController.resultGrossProfit(formData.value);
    } else if (path.toLowerCase().includes('penjualan-bulk-sales')) {
        result = await salesDetailController.penjualanBulk(formData.value);
    } else if (path.toLowerCase().includes('penjualan-ritel-sales')) {
        result = await salesDetailController.penjualanRitel(formData.value);
    } else if (path.toLowerCase().includes('stock-ritel-scm')) {
        result = await scmDetailController.stockRitel(formData.value);
    } else if (path.toLowerCase().includes('stock-bulk-scm')) {
        result = await scmDetailController.stockBulk(formData.value);
    } else if (path.toLowerCase().includes('stock-cpo-scm')) {
        result = await scmDetailController.stockCpo(formData.value);
    } else if (path.toLowerCase().includes('saldo-pe-scm')) {
        result = await scmDetailController.saldoPe(formData.value);
    } else if (path.toLowerCase().includes('actual-incoming-cpo-scm')) {
        result = await scmDetailController.actualIncomingCpo(formData.value);
    } else if (path.toLowerCase().includes('reuters-levy-duty-scm')) {
        result = await scmDetailController.marketReuters(formData.value);
    } else if (path.toLowerCase().includes('outstanding-cpo-scm')) {
        result = await scmDetailController.outstandingCpo(formData.value);
    } else {
        result = null;
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
    // const response = await loadFinance(routeName.value + '-' + routeType.value);
    // listData.value = response;
    await funcCondition();
};
</script>

<template>
    <div class="flex flex-col gap-2 layout-scroller bg-neutral-950 min-h-screen text-white app-dark">
        <top-bar :onDateChange="updateDates"></top-bar>
        <!-- <app-topbar></app-topbar> -->
        <div class="bg-black w-full p-6 rounded-xl flex flex-col gap-3" v-if="routeType == 'financial'">
            <div class="flex justify-end items-center text-[0.9vw] font-bold gap-3">
                <i class="pi pi-calendar text-pink-700" style="font-size: 0.9vw"></i>
                <span>{{ moment(formData.tanggalAwal).format('DD MMM YYYY') }} s/d {{ moment(formData.tanggalAkhir).format('DD MMM YYYY') }}</span>
            </div>
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
        <div class="min-h-[30rem] p-6 rounded-xl flex flex-col gap-3" v-else-if="routeType == 'sales'">
            <div class="flex justify-end items-center text-[0.9vw] font-bold gap-3">
                <i class="pi pi-calendar text-pink-700" style="font-size: 0.9vw"></i>
                <span>{{ moment(formData.tanggalAwal).format('DD MMM YYYY') }} s/d {{ moment(formData.tanggalAkhir).format('DD MMM YYYY') }}</span>
            </div>
            <penjualan-bulk-sales v-if="routeName == 'penjualan-bulk'" :datas="listData" />
            <penjualan-ritel-sales v-if="routeName == 'penjualan-ritel'" :datas="listData" />
        </div>
        <div class="min-h-[30rem] p-6 rounded-xl flex flex-col gap-3" v-else-if="routeType == 'scm'">
            <div class="flex justify-end items-center text-[0.9vw] font-bold gap-3">
                <i class="pi pi-calendar text-pink-700" style="font-size: 0.9vw"></i>
                <span>{{ moment(formData.tanggalAwal).format('DD MMM YYYY') }} s/d {{ moment(formData.tanggalAkhir).format('DD MMM YYYY') }}</span>
            </div>
            <penjualan-bulk-sales v-if="routeName == 'penjualan-bulk'" :datas="listData" />
            <saldo-pe-scm v-else-if="routeName == 'saldo-pe'" :datas="listData" />
            <actual-incoming-scm v-else-if="routeName == 'actual-incoming-cpo'" :datas="listData" />
            <outstanding-cpo-scm v-else-if="routeName == 'outstanding-cpo'" :datas="listData" />
            <stok-ritel-scm v-else-if="routeName == 'stock-ritel'" :datas="listData" />
            <stok-bulk-scm v-else-if="routeName == 'stock-bulk'" :datas="listData" />
            <stok-cpo-scm v-else-if="routeName == 'stock-cpo'" :datas="listData" />
            <market-reuters-scm v-else-if="routeName == 'reuters-levy-duty'" :datas="listData" />
        </div>
        <div class="min-h-[30rem] p-6 rounded-xl flex flex-col gap-3" v-else>
            <div class="flex justify-end items-center text-[0.9vw] font-bold gap-3">
                <i class="pi pi-calendar text-pink-700" style="font-size: 0.9vw"></i>
                <span>{{ moment(formData.tanggalAwal).format('DD MMM YYYY') }} s/d {{ moment(formData.tanggalAkhir).format('DD MMM YYYY') }}</span>
            </div>
            <cpo-olah-vs-rkap-operation v-if="routeName == 'cpo-olah-vs-rkap'" :datas="listData" />
            <packaging-operation v-else-if="routeName == 'packaging-operation'" :datas="listData" />
            <laporan-produksi-operation v-else-if="routeName == 'laporan-produksi-operation'" :datas="listData" />
            <laporan-material-operation v-else-if="routeName == 'laporan-material'" :datas="listData" />
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
