<script setup>
import { onMounted, ref } from 'vue';

// Controller
import HomeDash from '@/controller/home/homeDash';

// Components
import CardValues from '@/views/dashboard/report/home/components/financial/CardFinancialValues.vue';
import ImagesHome from '@/views/dashboard/report/home/components/ImagesHome.vue';
import CardOperationValues from '@/views/dashboard/report/home/components/operation/CardOperationValues.vue';
import CardScmValues from '@/views/dashboard/report/home/components/scm/CardSCMValues.vue';

const listCardFinancial = ref([]);
const listCardOperation = ref([]);
const listCardSalesPerformance = ref([]);
const listCardSCM = ref([]);

onMounted(() => {
    loadData();
});

const loadData = async () => {
    await loadDataFinance();
    await loadDataOperation();
    await loadDataSales();
    await loadDataSCM();
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
            link: dataFinance[i].link
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
            link: dataOperation[i].link
        });
    }
    listCardOperation.value = list;
};

const loadDataSCM = async () => {
    const list = [];
    const dataSCM = await HomeDash.cardSCM();
    console.log(dataSCM);
    for (let i = 0; i < dataSCM.length; i++) {
        list.push({
            name: dataSCM[i].name,
            color: dataSCM[i].color,
            icon: dataSCM[i].icon,
            value: dataSCM[i].value,
            persentase: dataSCM[i].persentase,
            versus: dataSCM[i].versus,
            link: dataSCM[i].link
        });
    }
    listCardSCM.value = list;
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
</script>

<template>
    <div class="bg-black text-white p-6 pb-10 mt-[-0.6vw] rounded-2xl w-full">
        <div class="grid grid-cols-3 gap-4">
            <div class="col-span-1 xl:flex xl:flex-col xl:gap-6 hidden">
                <images-home />
                <div class="flex flex-col gap-2">
                    <h3 class="text-[0.7vw] font-bold text-white">Sales & Marketing</h3>
                    <!-- <div class="grid grid-cols-4 gap-4">
                        <card-values v-for="(item, index) in listCardFinancial" :key="index" :datas="item" />
                    </div> -->
                </div>
            </div>
            <div class="lg:col-span-2 col-span-3 flex flex-col gap-5">
                <div class="flex flex-col gap-2">
                    <h3 class="text-[0.7vw] font-bold text-white">Financial</h3>
                    <div class="grid grid-cols-4 gap-4">
                        <card-values v-for="(item, index) in listCardFinancial" :key="index" :datas="item" />
                    </div>
                </div>
                <div class="flex flex-col gap-2">
                    <h3 class="text-[0.7vw] font-bold text-white">Production</h3>
                    <div class="grid grid-cols-3 gap-4">
                        <card-operation-values v-for="(item, index) in listCardOperation" :key="index" :datas="item" />
                    </div>
                </div>
                <div class="flex flex-col gap-2">
                    <h3 class="text-[0.7vw] font-bold text-white">Supply Chain</h3>
                    <div class="grid grid-cols-4 gap-4">
                        <card-scm-values v-for="(item, index) in listCardSCM" :key="index" :datas="item" />
                    </div>
                </div>
            </div>
            <div class="col-span-3 flex flex-col gap-3">
                <div class="flex flex-col gap-1">
                    <h3 class="text-[0.7vw] font-bold text-white">Sales & Marketing</h3>
                    <!-- <div class="grid grid-cols-4 gap-4 mb-2">
                        <card-sales-values v-show="listCardSalesPerformance.length > 0" v-for="(item, index) in listCardSalesPerformance" :key="index" :datas="item" />
                    </div> -->
                </div>
                <div class="flex flex-col gap-1">
                    <h3 class="text-[0.7vw] font-bold text-white">Supply Chain</h3>
                    <!-- <div class="grid grid-cols-4 gap-4 mb-2">
                        <card-values v-for="(item, index) in listCardFinancial" :key="index" :datas="item" />
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>
