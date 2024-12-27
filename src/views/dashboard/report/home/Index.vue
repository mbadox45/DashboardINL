<script setup>
import { onMounted, ref } from 'vue';

// Controller
import HomeDash from '@/controller/home/homeDash';

// Components
import CardValues from '@/views/dashboard/report/home/components/CardValues.vue';
import ImagesHome from '@/views/dashboard/report/home/components/ImagesHome.vue';
import CardOperationValues from '@/views/dashboard/report/home/components/operation/CardOperationValues.vue';

const listCardFinancial = ref([]);
const listCardOperation = ref([]);

onMounted(() => {
    loadData();
});

const loadData = async () => {
    await loadDataFinance();
    await loadDataOperation();
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
</script>

<template>
    <div class="bg-black text-white p-6 pb-10 mt-2 rounded-2xl">
        <div class="grid grid-cols-3 gap-4">
            <div class="col-span-1 min-h-[650px]">
                <images-home />
            </div>
            <div class="col-span-2">
                <div class="mb-2">
                    <h3 class="text-xl font-bold text-white">Financial</h3>
                </div>
                <div class="grid grid-cols-4 gap-4 mb-2">
                    <card-values v-for="(item, index) in listCardFinancial" :key="index" :datas="item" />
                </div>
                <div class="grid grid-cols-4 gap-4 mb-2"></div>
                <div class="mb-2">
                    <h3 class="text-xl font-bold text-white">Production</h3>
                </div>
                <div class="grid grid-cols-3 gap-4 mb-2">
                    <card-operation-values v-for="(item, index) in listCardOperation" :key="index" :datas="item" />
                </div>
            </div>
        </div>
    </div>
</template>
