<script setup>
import TopBar from '@/views/dashboard/layout/components/TopBar.vue';
import { onMounted, ref } from 'vue';

// Controller
import financeHomeController from '@/controller/home/controllerHomePage/financeHomeController';
import operationHomeController from '@/controller/home/controllerHomePage/operationHomeController';
import salesHomeController from '@/controller/home/controllerHomePage/salesHomeController';
import supplyChainHomeController from '@/controller/home/controllerHomePage/supplyChainHomeController';

// Components
import HomeDash from '@/controller/home/homeDash';
import ImagesHome from '@/views/dashboard/report/home/components/ImagesHome.vue';
import CardScmValues from '@/views/dashboard/report/home/components/scm/CardSCMValues.vue';

import CardHomeFinance from '@/views/dashboard/report/finance/CardHomeFinance.vue';
import HargaSpotFinance from '@/views/dashboard/report/harga/HargaSpotFinance.vue';
import CardHomeMaterial from '@/views/dashboard/report/operation/CardHomeMaterial.vue';
import CardHomeOperation from '@/views/dashboard/report/operation/CardHomeOperation.vue';
import SdmView from '@/views/dashboard/report/others/SdmView.vue';
import CardHomePackaging from '@/views/dashboard/report/packaging/CardHomePackaging.vue';
import CardHomeSales from '@/views/dashboard/report/sales/CardHomeSales.vue';
import CardHomeSupplyChain from '@/views/dashboard/report/scm/CardHomeSupplyChain.vue';

// import moment from 'moment';

const listCardSCM = ref([]);
const activePage = ref(0);

// Finance Var Data
const dataRevenue = ref({});
const dataCbDanCfm = ref({});
const dataPaySchedule = ref({});
const dataCpoKpbn = ref({});
const dataKurs = ref({});
const dataHargaSpotInvBulk = ref([]);
const dataHargaSpotInvRitel = ref([]);

// Operation Var Data
const dataCpoOlah = ref({});
const dataLaporanProduksi = ref([]);
const dataLaporanMaterial = ref([]);
const dataLaporanPackaging = ref([]);

// SCM Var Data
const dataSaldoPe = ref({});
const dataStockBulk = ref([]);
const dataStockRetail = ref([]);
const dataActualIncoming = ref({});
const dataOutstanding = ref({});
const dataStockCpo = ref({});

// Sales Var Data
const dataPenjualanBulk = ref({});
const dataPenjualanRitel = ref({});

onMounted(() => {
    loadData();
    loadAllData();
});

const loadAllData = async () => {
    const form = {
        idPmg: 1,
        idMataUang: 1,
        idPackaging: 1,
        // tanggalAwal: moment().format('YYYY-MM-01'),
        // tanggalAkhir: moment().format('YYYY-MM-DD'),
        tanggalAwal: '2023-01-01',
        tanggalAkhir: '2024-02-28'
    };
    await loadDataControllerFinance(form);
    await loadDataControllerOperation(form);
    await loadDataControllerSCM(form);
    await loadDataControllerSales(form);
};

const loadDataControllerFinance = async (form) => {
    // Profitability
    const revenue = await financeHomeController.revenue(form);
    dataRevenue.value = revenue;

    // Cash Balance & Cash Flow Movement
    const cashBalance = await financeHomeController.cashBalance(form);
    dataCbDanCfm.value = cashBalance;

    // Pay Schedule
    const paySchedule = await financeHomeController.paySchedule(form);
    dataPaySchedule.value = paySchedule;

    const cpoKpbn = await financeHomeController.cpoKpbn(form);
    dataCpoKpbn.value = cpoKpbn;

    const kursMataUang = await financeHomeController.kursMataUang(form);
    dataKurs.value = kursMataUang;

    const hargaSpotInvBulk = await financeHomeController.hargaSpotInvBulk(form);
    dataHargaSpotInvBulk.value = hargaSpotInvBulk;

    const hargaSpotInvRitel = await financeHomeController.hargaSpotInvRitel(form);
    dataHargaSpotInvRitel.value = hargaSpotInvRitel;
};

const loadDataControllerOperation = async (form) => {
    const cpoOlah = await operationHomeController.cpoOlah(form);
    dataCpoOlah.value = cpoOlah;

    const laporanProduksi = await operationHomeController.laporanProduksi(form);
    dataLaporanProduksi.value = laporanProduksi;

    const laporanMaterial = await operationHomeController.laporanMaterial(form);
    dataLaporanMaterial.value = laporanMaterial;

    const laporanPackaging = await operationHomeController.laporanPackaging(form);
    dataLaporanPackaging.value = laporanPackaging;
    // console.log(laporanPackaging);
};

const loadDataControllerSCM = async (form) => {
    const saldoPe = await supplyChainHomeController.saldoPe(form);
    dataSaldoPe.value = saldoPe;
    // console.log(saldoPe);

    const stokBulky = await supplyChainHomeController.stokBulky(form);
    dataStockBulk.value = stokBulky;

    const stokRitel = await supplyChainHomeController.stokRitel(form);
    dataStockRetail.value = stokRitel;

    const actualIncoming = await supplyChainHomeController.actualIncomingCpo(form);
    dataActualIncoming.value = actualIncoming;

    const outstanding = await supplyChainHomeController.outstandingCpo();
    dataOutstanding.value = outstanding;

    const stokCpo = await supplyChainHomeController.stokCpo(form);
    dataStockCpo.value = stokCpo;
    // console.log(outstanding);
};

const loadDataControllerSales = async (form) => {
    const penjualanSalesRitel = await salesHomeController.laporanPenjualanRitel(form);
    dataPenjualanRitel.value = penjualanSalesRitel;
    const penjualanSalesBulk = await salesHomeController.laporanPenjualanBulk(form);
    dataPenjualanBulk.value = penjualanSalesBulk;
};

const updateDates = async (dates) => {
    const form = {
        idPmg: dates.pmg,
        idMataUang: dates.mataUang,
        idPackaging: dates.packaging,
        tanggalAwal: dates.beforeDate,
        tanggalAkhir: dates.now
    };
    await loadDataControllerFinance(form);
    await loadDataControllerOperation(form);
    await loadDataControllerSCM(form);
};

const loadData = async () => {
    await loadDataSCM();
};
const loadDataSCM = async () => {
    const list = [];
    const dataSCM = await HomeDash.cardSCM();
    for (let i = 0; i < dataSCM.length; i++) {
        list.push({
            name: dataSCM[i].name,
            color: dataSCM[i].color,
            icon: dataSCM[i].icon,
            value: dataSCM[i].value,
            persentase: dataSCM[i].persentase,
            versus: dataSCM[i].versus,
            link: dataSCM[i].link,
            colspan: dataSCM[i].colspan
        });
    }
    listCardSCM.value = list;
};
</script>

<template>
    <div class="flex flex-col gap-2 layout-scroller bg-neutral-950 min-h-screen text-white app-dark">
        <top-bar :onDateChange="updateDates"></top-bar>
        <div class="px-4 pt-2">
            <div class="flex flex-col gap-3 p-6 rounded-2xl w-full h-full bg-black text-white font-mono">
                <div v-if="activePage == 0" class="grid grid-cols-3 gap-2">
                    <div class="col-span-1 flex flex-col gap-2">
                        <images-home />
                        <card-home-packaging :laporanpackaging="dataLaporanPackaging" />
                        <span class="font-bold w-full text-[0.8vw]">Sales & Marketing</span>
                        <card-home-sales :dataritel="dataPenjualanRitel" :databulk="dataPenjualanBulk" />
                    </div>
                    <div class="col-span-2 flex flex-col gap-3">
                        <span class="font-bold w-full text-[0.8vw]">Financial</span>
                        <card-home-finance :datarevenue="dataRevenue" :datacash="dataCbDanCfm" :datapayschedule="dataPaySchedule" :datacpokpbn="dataCpoKpbn" :datakurs="dataKurs" />
                        <harga-spot-finance :databulky="dataHargaSpotInvBulk" :dataretail="dataHargaSpotInvRitel" />
                        <span class="font-bold w-full text-[0.8vw]">Production</span>
                        <card-home-operation :datacpo="dataCpoOlah" :laporanproduksi="dataLaporanProduksi" />
                    </div>
                </div>
                <div v-else class="grid grid-cols-3 gap-3 h-full">
                    <div class="col-span-1 flex flex-col gap-3 h-full">
                        <!-- <images-home /> -->
                        <images-home class="h-full" />
                    </div>
                    <div class="col-span-2 flex flex-col gap-3">
                        <span class="font-bold w-full text-[0.8vw]">Supply Chain</span>
                        <card-home-supply-chain :stokcpo="dataStockCpo" :stokbulk="dataStockBulk" :stokritel="dataStockRetail" :actualincoming="dataActualIncoming" :outstanding="dataOutstanding" :saldope="dataSaldoPe" />
                        <div class="grid grid-cols-3 gap-2">
                            <card-scm-values v-for="(item, index) in listCardSCM" :key="index" :datas="item" :style="`animation: fadein 1s ease-in-out`" />
                            <sdm-view class="col-span-2" />
                        </div>
                        <card-home-material :laporanmaterial="dataLaporanMaterial" />
                    </div>
                </div>
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
