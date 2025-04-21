<script setup>
import TopBar from '@/views/dashboard/layout/components/TopBar.vue';
import moment from 'moment';
import { onMounted, ref } from 'vue';

// Controller
import financeHomeController from '@/controller/home/controllerHomePage/financeHomeController';
import operationHomeController from '@/controller/home/controllerHomePage/operationHomeController';
import salesHomeController from '@/controller/home/controllerHomePage/salesHomeController';
import sdmHomeController from '@/controller/home/controllerHomePage/sdmHomeController';
import supplyChainHomeController from '@/controller/home/controllerHomePage/supplyChainHomeController';

// Components
import ImagesHome from '@/views/dashboard/report/home/components/ImagesHome.vue';

// import CardHomeFinance from '@/views/dashboard/report/finance/CardHomeFinance.vue';

// Finance Components
import CashBalanceFinance from '@/views/dashboard/report/finance/components/CashBalanceFinance.vue';
import CashFlowMovementFinance from '@/views/dashboard/report/finance/components/CashFlowMovementFinance.vue';
import EbitdaMarginFinance from '@/views/dashboard/report/finance/components/EbitdaMarginFinance.vue';
import GrossProfitMarginFinance from '@/views/dashboard/report/finance/components/GrossProfitMarginFinance.vue';
import KpbnCpoFinance from '@/views/dashboard/report/finance/components/KpbnCpoFinance.vue';
import KursFinance from '@/views/dashboard/report/finance/components/KursFinance.vue';
import NetProfitMarginFinance from '@/views/dashboard/report/finance/components/NetProfitMarginFinance.vue';
import PayScheduleFinance from '@/views/dashboard/report/finance/components/PayScheduleFinance.vue';
import RevenueFinance from '@/views/dashboard/report/finance/components/RevenueFinance.vue';
import HargaBulkyFinance from '@/views/dashboard/report/harga/components/HargaBulkyFinance.vue';
import HargaRetailFinance from '@/views/dashboard/report/harga/components/HargaRetailFinance.vue';

// Operation Components
import CpoOlahOperation from '@/views/dashboard/report/operation/components/CpoOlahOperation.vue';
import LaporanProduksiOperation from '@/views/dashboard/report/operation/components/LaporanProduksiOperation.vue';
import LaporanPackaging from '@/views/dashboard/report/packaging/components/LaporanPackaging.vue';

// Sales Components
import QtyPenjualanBulkSales from '@/views/dashboard/report/sales/components/QtyPenjualanBulkSales.vue';
import QtyPenjualanRitelSales from '@/views/dashboard/report/sales/components/QtyPenjualanRitelSales.vue';

// SCM Components
import ActualIncomingSupplyChain from '@/views/dashboard/report/scm/components/ActualIncomingSupplyChain.vue';
import OutstandingSupplyChain from '@/views/dashboard/report/scm/components/OutstandingSupplyChain.vue';
import SaldoPeSupplyChain from '@/views/dashboard/report/scm/components/SaldoPeSupplyChain.vue';
import StokBulkSupplyChain from '@/views/dashboard/report/scm/components/StokBulkSupplyChain.vue';
import StokCpoSupplyChain from '@/views/dashboard/report/scm/components/StokCpoSupplyChain.vue';
import StokRitelSupplyChain from '@/views/dashboard/report/scm/components/StokRitelSupplyChain.vue';

// Others Components
import CardHomeMaterial from '@/views/dashboard/report/operation/CardHomeMaterial.vue';
import MarketReuters from '@/views/dashboard/report/others/MarketReuters.vue';
import SdmView from '@/views/dashboard/report/others/SdmView.vue';
import SicalRsp from '@/views/dashboard/report/others/SicalRsp.vue';

// import HargaSpotFinance from '@/views/dashboard/report/harga/HargaSpotFinance.vue';
// import CardHomeOperation from '@/views/dashboard/report/operation/CardHomeOperation.vue';
// import CardHomePackaging from '@/views/dashboard/report/packaging/CardHomePackaging.vue';
// import CardHomeSales from '@/views/dashboard/report/sales/CardHomeSales.vue';
// import CardHomeSupplyChain from '@/views/dashboard/report/scm/CardHomeSupplyChain.vue';

const listCardSCM = ref([]);
const activePage = ref(0);

// Finance Var Data
const dataRevenue = ref({});
const loadingRevenue = ref('');
const dataCbDanCfm = ref({});
const loadingCbDanCfm = ref('');
const dataPaySchedule = ref({});
const loadingPaySchedule = ref('');
const dataCpoKpbn = ref({});
const loadingCpoKpbn = ref('');
const dataKurs = ref({});
const loadingKurs = ref('');
const dataHargaSpotInvBulk = ref([]);
const loadingHargaSpotInvBulk = ref('');
const dataHargaSpotInvRitel = ref([]);
const loadingHargaSpotInvRitel = ref('');

// Operation Var Data
const dataCpoOlah = ref({});
const loadingCpoOlah = ref('');
const dataLaporanProduksi = ref([]);
const loadingLaporanProduksi = ref('');
const dataLaporanMaterial = ref([]);
const loadingLaporanMaterial = ref('');
const dataLaporanPackaging = ref([]);
const loadingLaporanPackaging = ref('');

// SCM Var Data
const dataSaldoPe = ref({});
const loadingSaldoPe = ref('');
const dataStockBulk = ref([]);
const loadingStockBulk = ref('');
const dataStockRetail = ref([]);
const loadingStockRetail = ref('');
const dataActualIncoming = ref({});
const loadingActualIncoming = ref('');
const dataOutstanding = ref({});
const loadingOutstanding = ref('');
const dataStockCpo = ref({});
const loadingStockCpo = ref('');
const dataMarketReuters = ref({});
const loadingMarketReuters = ref('');

// Sales Var Data
const dataPenjualanBulk = ref({});
const loadingPenjualanBulk = ref('');
const dataPenjualanRitel = ref({});
const loadingPenjualanRitel = ref('');

// SDM
const dataSDM = ref({});
const loadingSDM = ref('');

const loadingButton = ref('');

const formData = ref({
    idPmg: 1,
    idMataUang: 1,
    idPackaging: 1,
    tanggalAwal: moment().format('YYYY-MM-01'),
    tanggalAkhir: moment().format('YYYY-MM-DD')
});

onMounted(() => {
    loadData();
    loadAllData();
});

const loadAllData = async () => {
    const dataLocal = localStorage.getItem('formData');
    if (dataLocal != null) {
        const parsedData = JSON.parse(dataLocal);
        formData.value = {
            idPmg: parsedData.pmg,
            idMataUang: parsedData.mataUang,
            idPackaging: parsedData.packaging,
            tanggalAwal: parsedData.beforeDate,
            tanggalAkhir: parsedData.now
        };
    }

    // Loading Data
    // loadingRevenue.value = 'loading';
    // loadingCbDanCfm.value = 'loading';
    // loadingPaySchedule.value = 'loading';
    // loadingCpoKpbn.value = 'loading';
    // loadingKurs.value = 'loading';
    // loadingHargaSpotInvBulk.value = 'loading';
    // loadingHargaSpotInvRitel.value = 'loading';

    // loadingCpoOlah.value = 'loading';
    // loadingLaporanProduksi.value = 'loading';
    // loadingLaporanMaterial.value = 'loading';
    // loadingLaporanPackaging.value = 'loading';

    // loadingPenjualanBulk.value = 'loading';
    // loadingPenjualanRitel.value = 'loading';
    // loadingSDM.value = 'loading';

    // loadingSaldoPe.value = 'loading';
    // loadingStockBulk.value = 'loading';
    // loadingStockRetail.value = 'loading';
    // loadingOutstanding.value = 'loading';
    // loadingActualIncoming.value = 'loading';
    // loadingStockCpo.value = 'loading';
    // loadingMarketReuters.value = 'loading';
    // loadingButton.value = 'loading';

    await loadDataControllerFinance(formData.value);
    await loadDataControllerSales(formData.value);
    await loadDataControllerOperation(formData.value);
    await loadDataControllerSCM(formData.value);

    loadingButton.value = '';
};

const loadDataControllerFinance = async (form) => {
    // Profitability
    await loadProfitability(form);
    // Cash Balance & Cash Flow Movement
    await loadCashBalance(form);
    // Pay Schedule
    await loadPaySchedule(form);
    await loadCpoKpbn(form);
    await loadKursMataUang(form);

    // Harga Spot Inventory
    await loadHargaSpotIvnBulk(form);
    await loadHargaSpotIvnRitel(form);
};
const loadDataControllerOperation = async (form) => {
    await loadCpoOlah(form);
    await loadLaporanProduksi(form);
    await loadLaporanMaterial(form);
    await loadLaporanPackaging(form);
};
const loadDataControllerSales = async (form) => {
    await loadPenjualanSalesRitel(form);
    await loadPenjualanSalesBulk(form);
    await loadSDM(form);
};
const loadDataControllerSCM = async (form) => {
    await loadSaldoPe(form);
    await loadStokBulky(form);
    await loadStokRitel(form);
    await loadOutstanding(form);
    await loadActualIncoming(form);
    await loadStokCpo(form);
    await loadMarketReuters(form);
};

// Finance Function
const loadProfitability = async (form) => {
    // loadingRevenue.value = 'loading';
    try {
        const revenue = await financeHomeController.revenue(form);
        dataRevenue.value = revenue;
        loadingRevenue.value = '';
    } catch (error) {
        loadingRevenue.value = 'error';
    }
};
const loadCashBalance = async (form) => {
    // loadingCbDanCfm.value = 'loading';
    try {
        const cashBalance = await financeHomeController.cashBalance(form);
        dataCbDanCfm.value = cashBalance;
        loadingCbDanCfm.value = '';
    } catch (error) {
        loadingCbDanCfm.value = 'error';
    }
};
const loadPaySchedule = async (form) => {
    // loadingPaySchedule.value = 'loading';
    try {
        const paySchedule = await financeHomeController.paySchedule(form);
        dataPaySchedule.value = paySchedule;
        loadingPaySchedule.value = '';
    } catch (error) {
        loadingPaySchedule.value = 'error';
    }
};
const loadCpoKpbn = async (form) => {
    // loadingCpoKpbn.value = 'loading';
    try {
        const cpoKpbn = await financeHomeController.cpoKpbn(form);
        dataCpoKpbn.value = cpoKpbn;
        loadingCpoKpbn.value = '';
    } catch (error) {
        loadingCpoKpbn.value = 'error';
    }
};
const loadKursMataUang = async (form) => {
    // loadingKurs.value = 'loading';
    try {
        const kursMataUang = await financeHomeController.kursMataUang(form);
        dataKurs.value = kursMataUang;
        loadingKurs.value = '';
    } catch (error) {
        loadingKurs.value = 'error';
    }
};
const loadHargaSpotIvnBulk = async (form) => {
    // loadingHargaSpotInvBulk.value = 'loading';
    try {
        const hargaSpotInvBulk = await financeHomeController.hargaSpotInvBulk(form);
        dataHargaSpotInvBulk.value = hargaSpotInvBulk;
        loadingHargaSpotInvBulk.value = '';
    } catch (error) {
        loadingHargaSpotInvBulk.value = 'error';
    }
};
const loadHargaSpotIvnRitel = async (form) => {
    // loadingHargaSpotInvRitel.value = 'loading';
    try {
        const hargaSpotInvRitel = await financeHomeController.hargaSpotInvRitel(form);
        dataHargaSpotInvRitel.value = hargaSpotInvRitel;
        loadingHargaSpotInvRitel.value = '';
    } catch (error) {
        loadingHargaSpotInvRitel.value = 'error';
    }
};

// Operation Function
const loadCpoOlah = async (form) => {
    // loadingCpoOlah.value = 'loading';
    try {
        const cpoOlah = await operationHomeController.cpoOlah(form);
        dataCpoOlah.value = cpoOlah;
        loadingCpoOlah.value = '';
    } catch (error) {
        loadingCpoOlah.value = 'error';
    }
};
const loadLaporanProduksi = async (form) => {
    // loadingLaporanProduksi.value = 'loading';
    try {
        const laporanProduksi = await operationHomeController.laporanProduksi(form);
        dataLaporanProduksi.value = laporanProduksi;
        loadingLaporanProduksi.value = '';
    } catch (error) {
        loadingLaporanProduksi.value = 'error';
    }
};
const loadLaporanMaterial = async (form) => {
    // loadingLaporanProduksi.value = 'loading';
    try {
        const laporanMaterial = await operationHomeController.laporanMaterial(form);
        dataLaporanMaterial.value = laporanMaterial;
        loadingLaporanProduksi.value = '';
    } catch (error) {
        loadingLaporanProduksi.value = 'error';
    }
};
const loadLaporanPackaging = async (form) => {
    // loadingLaporanPackaging.value = 'loading';
    try {
        const laporanPackaging = await operationHomeController.laporanPackaging(form);
        dataLaporanPackaging.value = laporanPackaging;
        loadingLaporanPackaging.value = '';
    } catch (error) {
        loadingLaporanPackaging.value = 'error';
    }
};

// Sales Function
const loadPenjualanSalesRitel = async (form) => {
    // loadingPenjualanRitel.value = 'loading';
    try {
        const penjualanSalesRitel = await salesHomeController.laporanPenjualanRitel(form);
        dataPenjualanRitel.value = penjualanSalesRitel;
        loadingPenjualanRitel.value = '';
    } catch (error) {
        loadingPenjualanRitel.value = 'error';
    }
};
const loadPenjualanSalesBulk = async (form) => {
    // loadingPenjualanBulk.value = 'loading';
    try {
        const penjualanSalesBulk = await salesHomeController.laporanPenjualanBulk(form);
        dataPenjualanBulk.value = penjualanSalesBulk;
        loadingPenjualanBulk.value = '';
    } catch (error) {
        loadingPenjualanBulk.value = 'error';
    }
};

// SDM Function
const loadSDM = async (form) => {
    // loadingSDM.value = 'loading';
    try {
        const sdm = await sdmHomeController.sdm(form);
        dataSDM.value = sdm;
        loadingSDM.value = '';
    } catch (error) {
        loadingSDM.value = 'error';
    }
};

// SCM Function
const loadStokBulky = async (form) => {
    // loadingStockBulk.value = 'loading';
    try {
        const stokBulky = await supplyChainHomeController.stokBulky(form);
        dataStockBulk.value = stokBulky;
        loadingStockBulk.value = '';
    } catch (error) {
        loadingStockBulk.value = 'error';
    }
};
const loadSaldoPe = async (form) => {
    // loadingSaldoPe.value = 'loading';
    try {
        const saldoPe = await supplyChainHomeController.saldoPe(form);
        dataSaldoPe.value = saldoPe;
        loadingSaldoPe.value = '';
    } catch (error) {
        loadingSaldoPe.value = 'error';
    }
};
const loadStokRitel = async (form) => {
    // loadingStockRetail.value = 'loading';
    try {
        const stokRitel = await supplyChainHomeController.stokRitel(form);
        dataStockRetail.value = stokRitel;
        loadingStockRetail.value = '';
    } catch (error) {
        loadingStockRetail.value = 'error';
    }
};
const loadStokCpo = async (form) => {
    // loadingStockCpo.value = 'loading';
    try {
        const stokCpo = await supplyChainHomeController.stokCpo(form);
        dataStockCpo.value = stokCpo;
        loadingStockCpo.value = '';
    } catch (error) {
        loadingStockCpo.value = 'error';
    }
};
const loadActualIncoming = async (form) => {
    // loadingActualIncoming.value = 'loading';
    try {
        const actualIncoming = await supplyChainHomeController.actualIncomingCpo(form);
        dataActualIncoming.value = actualIncoming;
        loadingActualIncoming.value = '';
    } catch (error) {
        loadingActualIncoming.value = 'error';
    }
};
const loadOutstanding = async (form) => {
    // loadingOutstanding.value = 'loading';
    try {
        const outstanding = await supplyChainHomeController.outstandingCpo();
        dataOutstanding.value = outstanding;
        loadingOutstanding.value = '';
    } catch (error) {
        loadingOutstanding.value = 'error';
    }
};
const loadMarketReuters = async (form) => {
    // loadingMarketReuters.value = 'loading';
    try {
        const levyDutyMarketReuter = await supplyChainHomeController.marketReutersLevyDuty(form);
        dataMarketReuters.value = levyDutyMarketReuter;
        loadingMarketReuters.value = '';
    } catch (error) {
        loadingMarketReuters.value = 'error';
    }
};

const updateDates = async (dates) => {
    formData.value = {
        idPmg: dates.pmg,
        idMataUang: dates.mataUang,
        idPackaging: dates.packaging,
        tanggalAwal: dates.beforeDate,
        tanggalAkhir: dates.now
    };
    // console.log(formData.value);
    // await loadDataControllerFinance(form);
    // await loadDataControllerOperation(form);
    // await loadDataControllerSCM(form);
    // await loadDataControllerSales(form);
    await loadAllData();
};

const loadData = async () => {};
</script>

<template>
    <div class="flex flex-col gap-2 layout-scroller bg-neutral-950 min-h-screen text-white app-dark">
        <top-bar :onDateChange="updateDates"></top-bar>
        <div class="px-4 pt-2">
            <div class="flex flex-col gap-3 p-6 rounded-2xl w-full h-full bg-black text-white font-mono">
                <div v-if="activePage == 0" class="grid grid-cols-1 xl:grid-cols-3 gap-2">
                    <images-home class="col-span-1 xl:hidden relative w-full row-start-1 mt-10" />
                    <div class="xl:col-span-1 xl:row-start-1 col-span-1 row-start-3 flex flex-col gap-2">
                        <images-home class="xl:flex hidden" />
                        <span class="font-bold w-full text-[0.8vw]">Sales & Marketing</span>
                        <div class="grid grid-cols-1 gap-2">
                            <qty-penjualan-bulk-sales :datas="dataPenjualanBulk" :formPush="formData" :loading="loadingPenjualanBulk" />
                            <qty-penjualan-ritel-sales :datas="dataPenjualanRitel" :formPush="formData" :loading="loadingPenjualanRitel" />
                            <laporan-packaging :datas="dataLaporanPackaging" :formPush="formData" :loading="loadingLaporanPackaging" />
                        </div>
                    </div>
                    <div class="xl:col-span-2 xl:row-start-1 col-span-2 row-start-2 flex flex-col gap-3">
                        <div class="flex justify-between items-center">
                            <span class="font-bold w-full text-[0.8vw]">Financial</span>
                            <span class="font-bold w-full text-[0.8vw] text-right flex gap-3 items-center justify-end">
                                <i class="pi pi-calendar text-pink-700" style="font-size: 0.8vw"></i>
                                <span>{{ moment(formData.tanggalAwal).format('DD MMM YYYY') }} s/d {{ moment(formData.tanggalAkhir).format('DD MMM YYYY') }}</span>
                            </span>
                        </div>
                        <div class="grid grid-cols-1 xl:grid-cols-3 gap-2">
                            <revenue-finance :datas="dataRevenue" :formPush="formData" :loading="loadingRevenue" />
                            <gross-profit-margin-finance :datas="dataRevenue" :formPush="formData" :loading="loadingRevenue" />
                            <ebitda-margin-finance :datas="dataRevenue" :formPush="formData" :loading="loadingRevenue" />
                            <net-profit-margin-finance :datas="dataRevenue" :formPush="formData" :loading="loadingRevenue" />
                            <cash-flow-movement-finance :datas="dataCbDanCfm.cashFlowMovement" :formPush="formData" :loading="loadingCbDanCfm" />
                            <cash-balance-finance :datas="dataCbDanCfm.cashBalance" :formPush="formData" :loading="loadingCbDanCfm" />
                            <pay-schedule-finance :datas="dataPaySchedule" :formPush="formData" :loading="loadingPaySchedule" />
                            <kpbn-cpo-finance :datas="dataCpoKpbn" :formPush="formData" :loading="loadingCpoKpbn" />
                            <kurs-finance :datas="dataKurs" :formPush="formData" :loading="loadingKurs" />
                        </div>
                        <div class="grid grid-cols-1 xl:grid-cols-2 gap-2">
                            <harga-bulky-finance :datas="dataHargaSpotInvBulk" :formPush="formData" :loading="loadingHargaSpotInvBulk" />
                            <harga-retail-finance :datas="dataHargaSpotInvRitel" :formPush="formData" :loading="loadingHargaSpotInvRitel" />
                        </div>
                        <span class="font-bold w-full text-[0.8vw]">Production</span>
                        <div class="grid grid-cols-1 xl:grid-cols-2 gap-2">
                            <cpo-olah-operation :datas="dataCpoOlah" :formPush="formData" :loading="loadingCpoOlah" />
                            <laporan-produksi-operation :datas="dataLaporanProduksi" :formPush="formData" :loading="loadingLaporanProduksi" />
                        </div>
                    </div>
                </div>
                <div v-else class="grid grid-cols-1 xl:grid-cols-3 gap-3 h-full">
                    <div class="col-span-1 flex flex-col gap-3 h-full">
                        <images-home class="h-full" />
                    </div>
                    <div class="col-span-2 flex flex-col gap-3">
                        <div class="flex justify-between items-center">
                            <span class="font-bold w-full text-[0.8vw]">Supply Chain</span>
                            <span class="font-bold w-full text-[0.8vw] text-right flex gap-3 items-center justify-end">
                                <i class="pi pi-calendar text-pink-700" style="font-size: 0.8vw"></i>
                                <span>{{ moment(formData.tanggalAwal).format('DD MMM YYYY') }} s/d {{ moment(formData.tanggalAkhir).format('DD MMM YYYY') }}</span>
                            </span>
                        </div>
                        <div class="grid grid-cols-1 xl:grid-cols-3 gap-2">
                            <stok-cpo-supply-chain :datas="dataStockCpo" :formPush="formData" :loading="loadingStockCpo" />
                            <stok-bulk-supply-chain :datas="dataStockBulk" :formPush="formData" :loading="loadingStockBulk" />
                            <stok-ritel-supply-chain :datas="dataStockRetail" :formPush="formData" :loading="loadingStockRetail" />
                            <actual-incoming-supply-chain :datas="dataActualIncoming" :formPush="formData" :loading="loadingActualIncoming" />
                            <outstanding-supply-chain :datas="dataOutstanding" :formPush="formData" :loading="loadingOutstanding" />
                            <saldo-pe-supply-chain :datas="dataSaldoPe" :formPush="formData" :loading="loadingSaldoPe" />
                        </div>
                        <div class="grid grid-cols-1 xl:grid-cols-3 gap-2">
                            <market-reuters :formPush="formData" :datas="dataMarketReuters" :loading="loadingOutstanding" />
                            <sdm-view class="col-span-2" :datas="dataSDM" :loading="loadingOutstanding" />
                        </div>
                        <div class="grid grid-cols-1 xl:grid-cols-3 gap-2">
                            <card-home-material class="col-span-2" :formPush="formData" :laporanmaterial="dataLaporanMaterial" :loading="loadingOutstanding" />
                            <sical-rsp />
                        </div>
                    </div>
                </div>
                <!-- <div v-if="loadingButton != 'loading'" class="flex gap-2 justify-center">
                    <button class="py-2 px-3 rounded-full border-2 hover:bg-white hover:text-black transition-all" :class="activePage == 0 ? 'bg-white text-black' : 'bg-transparent'" @click="activePage = 0">Page 1</button>
                    <button class="py-2 px-3 rounded-full border-2 hover:bg-white hover:text-black transition-all" :class="activePage == 1 ? 'bg-white text-black' : 'bg-transparent'" @click="activePage = 1">Page 2</button>
                </div> -->
                <div class="flex gap-2 justify-center">
                    <button class="py-2 px-3 rounded-full border-2 hover:bg-white hover:text-black transition-all" :class="activePage == 0 ? 'bg-white text-black' : 'bg-transparent'" @click="activePage = 0">Page 1</button>
                    <button class="py-2 px-3 rounded-full border-2 hover:bg-white hover:text-black transition-all" :class="activePage == 1 ? 'bg-white text-black' : 'bg-transparent'" @click="activePage = 1">Page 2</button>
                </div>
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
