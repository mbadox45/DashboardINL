<script setup>
import { onMounted, ref } from 'vue';

// Controller
import HomeDash from '@/controller/home/homeDash';

// Components
import CardValues from '@/views/dashboard/report/home/components/financial/CardFinancialValues.vue';
import ImagesHome from '@/views/dashboard/report/home/components/ImagesHome.vue';
import CardOperationValues from '@/views/dashboard/report/home/components/operation/CardOperationValues.vue';
import CardSales from '@/views/dashboard/report/home/components/sales/CardSalesValues.vue';
import CardScmValues from '@/views/dashboard/report/home/components/scm/CardSCMValues.vue';
import CardSdm from '@/views/dashboard/report/home/components/sdm/CardSdmValues.vue';

const listCardFinancial = ref([]);
const listCardOperation = ref([]);
const listCardSalesPerformance = ref([]);
const listCardSCM = ref([]);
const listCardSdm = ref([]);
const listDelay = ref([]);

onMounted(() => {
    loadData();
});

const loadData = async () => {
    await loadDataFinance();
    await loadDataOperation();
    await loadDataSales();
    await loadDataSCM();
    await loadDataSdm();
    await loadDelay();
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
            link: dataSales[i].link
        });
    }
    listCardSalesPerformance.value = list;
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
    <div class="bg-black text-white p-6 pb-10 rounded-2xl w-full">
        <div class="grid grid-cols-3 gap-4">
            <div class="col-span-1 xl:flex xl:flex-col xl:gap-6 hidden">
                <images-home />
                <div class="flex flex-col gap-2">
                    <div class="grid grid-cols-1 gap-2">
                        <card-sdm v-for="(item, index) in listCardSdm" :key="index" :datas="item" :style="`animation: fadein ${index}s ease-in-out`" />
                    </div>
                </div>
                <div class="flex flex-col gap-2">
                    <!-- <h3 class="text-[0.7vw] font-bold text-white">Sales & Marketing</h3> -->
                    <div class="grid grid-cols-1 gap-2">
                        <card-sales v-for="(item, index) in listCardSalesPerformance" :key="index" :datas="item" :style="`animation: fadein ${index}s ease-in-out`" />
                    </div>
                </div>
            </div>
            <div class="lg:col-span-2 col-span-3 flex flex-col gap-5">
                <div class="flex flex-col gap-2">
                    <!-- <h3 class="text-[0.7vw] font-bold text-white">Financial</h3> -->
                    <div class="grid grid-cols-4 gap-2">
                        <card-values v-for="(item, index) in listCardFinancial" :key="index" :datas="item" :style="`animation: fadein 1s ease-in-out`" />
                    </div>
                </div>
                <div class="flex flex-col gap-2">
                    <!-- <h3 class="text-[0.7vw] font-bold text-white">Production</h3> -->
                    <div class="grid grid-cols-3 gap-2">
                        <card-operation-values v-for="(item, index) in listCardOperation" :key="index" :datas="item" :style="`animation: fadein ${index}s ease-in-out`" />
                    </div>
                </div>
                <div class="flex flex-col gap-2">
                    <!-- <h3 class="text-[0.7vw] font-bold text-white">Supply Chain</h3> -->
                    <div class="grid grid-cols-4 gap-2">
                        <card-scm-values v-for="(item, index) in listCardSCM" :key="index" :datas="item" :style="`animation: fadein 1s ease-in-out`" />
                    </div>
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
