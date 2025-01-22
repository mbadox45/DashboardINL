<script setup>
import TopBar from '@/views/dashboard/layout/components/TopBar.vue';
import { onMounted, ref } from 'vue';

// Controller
import financeHomeController from '@/controller/home/controllerHomePage/financeHomeController';

// Components
import HomeDash from '@/controller/home/homeDash';
import CardValues from '@/views/dashboard/report/home/components/financial/CardFinancialValues.vue';
import ImagesHome from '@/views/dashboard/report/home/components/ImagesHome.vue';
import CardOperationValues from '@/views/dashboard/report/home/components/operation/CardOperationValues.vue';
import CardSales from '@/views/dashboard/report/home/components/sales/CardSalesValues.vue';
import CardScmSpotInventory from '@/views/dashboard/report/home/components/scm/CardSCMSpotInventory.vue';
import CardScmValues from '@/views/dashboard/report/home/components/scm/CardSCMValues.vue';
import CardSdm from '@/views/dashboard/report/home/components/sdm/CardSdmValues.vue';

import CardHomeFinance from '@/views/dashboard/report/finance/CardHomeFinance.vue';
// import moment from 'moment';

const listCardFinancial = ref([]);
const listCardHarga = ref([]);
const listCardOperation = ref([]);
const listCardMaterial = ref([]);
const listCardSalesPerformance = ref([]);
const listCardSCM = ref([]);
const listCardPackaging = ref([]);
const listCardSdm = ref([]);
const listDelay = ref([]);
const activePage = ref(0);

const dataRevenue = ref({});

onMounted(() => {
    loadData();
    loadAllData();
});

const loadAllData = async () => {
    const form = {
        idPmg: 1,
        idMataUang: 1,
        // tanggalAwal: moment().format('YYYY-MM-01'),
        // tanggalAkhir: moment().format('YYYY-MM-DD'),
        tanggalAwal: '2023-01-01',
        tanggalAkhir: '2024-01-31'
    };
    await loadDataControllerFinance(form);
};

const loadDataControllerFinance = async (form) => {
    const response = await financeHomeController.revenue(form);
    dataRevenue.value = response;
    console.log(response);
};

const updateDates = async (dates) => {
    const form = {
        idPmg: dates.pmg,
        idMataUang: dates.mataUang,
        tanggalAwal: dates.beforeDate,
        tanggalAkhir: dates.now
    };
    await loadDataControllerFinance(form);
};

const loadData = async () => {
    await loadDataFinance();
    await loadDataOperation();
    await loadDataSales();
    await loadDataSCM();
    await loadDataPackaging();
    await loadDelay();
    await loadDataSdm();
    await loadDataHarga();
    await loadDataMaterial();
};

const loadDataFinance = async () => {
    const list = [];
    const dataFinance = await HomeDash.cardFinancial();
    for (let i = 0; i < dataFinance.length; i++) {
        list.push({
            name: dataFinance[i].name,
            color: dataFinance[i].color,
            icon: dataFinance[i].icon,
            value: dataFinance[i].value,
            persentase: dataFinance[i].persentase,
            versus: dataFinance[i].versus,
            link: dataFinance[i].link,
            colspan: dataFinance[i].colspan
        });
    }
    listCardFinancial.value = list;
};

const loadDataOperation = async () => {
    const list = [];
    const dataOperation = await HomeDash.cardOperational();
    for (let i = 0; i < dataOperation.length; i++) {
        list.push({
            name: dataOperation[i].name,
            color: dataOperation[i].color,
            icon: dataOperation[i].icon,
            value: dataOperation[i].value,
            persentase: dataOperation[i].persentase,
            versus: dataOperation[i].versus,
            link: dataOperation[i].link,
            colspan: dataOperation[i].colspan
        });
    }
    listCardOperation.value = list;
};

const loadDataMaterial = async () => {
    const list = [];
    const dataMaterial = await HomeDash.cardOperationalMaterial();
    for (let i = 0; i < dataMaterial.length; i++) {
        list.push({
            name: dataMaterial[i].name,
            color: dataMaterial[i].color,
            icon: dataMaterial[i].icon,
            value: dataMaterial[i].value,
            persentase: dataMaterial[i].persentase,
            versus: dataMaterial[i].versus,
            link: dataMaterial[i].link,
            colspan: dataMaterial[i].colspan
        });
    }
    listCardMaterial.value = list;
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
const loadDataPackaging = async () => {
    const list = [];
    const dataSdm = await HomeDash.cardPackaging();
    for (let i = 0; i < dataSdm.length; i++) {
        list.push({
            name: dataSdm[i].name,
            color: dataSdm[i].color,
            icon: dataSdm[i].icon,
            value: dataSdm[i].value,
            persentase: dataSdm[i].persentase,
            versus: dataSdm[i].versus,
            link: dataSdm[i].link,
            colspan: dataSdm[i].colspan
        });
    }
    listCardPackaging.value = list;
};
const loadDataSdm = async () => {
    const list = [];
    const dataSdm = await HomeDash.cardSdm();
    for (let i = 0; i < dataSdm.length; i++) {
        list.push({
            name: dataSdm[i].name,
            color: dataSdm[i].color,
            icon: dataSdm[i].icon,
            value: dataSdm[i].value,
            persentase: dataSdm[i].persentase,
            versus: dataSdm[i].versus,
            link: dataSdm[i].link,
            colspan: dataSdm[i].colspan
        });
    }
    listCardSdm.value = list;
};

const loadDataSales = async () => {
    const list = [];
    const dataSales = await HomeDash.cardSalesPerformance();
    for (let i = 0; i < dataSales.length; i++) {
        list.push({
            name: dataSales[i].name,
            color: dataSales[i].color,
            icon: dataSales[i].icon,
            value: dataSales[i].value,
            versus: dataSales[i].versus,
            link: dataSales[i].link,
            colspan: dataSales[i].colspan,
            dataChart: dataSales[i].qty,
            optionsChart: dataSales[i].options
        });
    }
    listCardSalesPerformance.value = list;
};

const loadDataHarga = async () => {
    const list = [];
    const dataHarga = await HomeDash.cardHarga();
    for (let i = 0; i < dataHarga.length; i++) {
        list.push({
            name: dataHarga[i].name,
            color: dataHarga[i].color,
            icon: dataHarga[i].icon,
            value: dataHarga[i].value,
            persentase: dataHarga[i].persentase,
            versus: dataHarga[i].versus,
            link: dataHarga[i].link,
            colspan: dataHarga[i].colspan
        });
    }
    listCardHarga.value = list;
};

const loadDelay = async () => {
    const list = [];
    for (let i = 0; i < 22; i++) {
        list.push(i + 1);
    }
    listDelay.value = list;
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
                        <div class="flex flex-col gap-2">
                            <div class="grid grid-cols-1 gap-2">
                                <card-sdm v-for="(item, index) in listCardPackaging" :key="index" :datas="item" :style="`animation: fadein ${index}s ease-in-out`" />
                            </div>
                        </div>
                        <div class="flex flex-col gap-2">
                            <div class="grid grid-cols-1 gap-2">
                                <card-sales v-for="(item, index) in listCardSalesPerformance" :key="index" :datas="item" :style="`animation: fadein ${index}s ease-in-out`" />
                            </div>
                        </div>
                    </div>
                    <div class="col-span-2 flex flex-col gap-3">
                        <card-home-finance :datarevenue="dataRevenue" />
                        <div class="flex flex-col">
                            <div class="grid grid-cols-3 gap-2">
                                <card-values v-for="(item, index) in listCardFinancial" :key="index" :datas="item" :style="`animation: fadein 1s ease-in-out`" />
                            </div>
                        </div>
                        <div class="flex flex-col">
                            <div class="grid grid-cols-4 gap-2">
                                <card-scm-spot-inventory v-for="(item, index) in listCardHarga" :key="index" :datas="item" :style="`animation: fadein 1s ease-in-out`" />
                            </div>
                        </div>
                        <div class="flex flex-col gap-2">
                            <div class="grid grid-cols-2 gap-2">
                                <card-operation-values v-for="(item, index) in listCardOperation" :key="index" :datas="item" :style="`animation: fadein ${index}s ease-in-out`" />
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="grid grid-cols-3 gap-3 h-full">
                    <div class="col-span-1 flex flex-col gap-3 h-full">
                        <images-home class="h-full" />
                    </div>
                    <div class="col-span-2 flex flex-col gap-3">
                        <div class="flex flex-col gap-2">
                            <div class="grid grid-cols-3 gap-2">
                                <card-scm-values v-for="(item, index) in listCardSCM" :key="index" :datas="item" :style="`animation: fadein 1s ease-in-out`" />
                            </div>
                        </div>
                        <div class="flex flex-col gap-2">
                            <div class="grid grid-cols-1 gap-2">
                                <card-operation-values v-for="(item, index) in listCardMaterial" :key="index" :datas="item" :style="`animation: fadein ${index}s ease-in-out`" />
                            </div>
                        </div>
                        <!-- <div class="flex flex-col gap-2">
                            <div class="grid grid-cols-1 gap-2">
                                <card-sdm v-for="(item, index) in listCardSdm" :key="index" :datas="item" :style="`animation: fadein ${index}s ease-in-out`" />
                            </div>
                        </div> -->
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
