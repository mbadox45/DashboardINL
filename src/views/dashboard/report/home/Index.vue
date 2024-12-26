<script setup>
import { onMounted, ref } from 'vue';

// Controller
import financialHomeDash from '@/controller/home/financialHomeDash';

// Components
import CardValues from '@/views/dashboard/report/home/components/CardValues.vue';
import ImagesHome from '@/views/dashboard/report/home/components/ImagesHome.vue';

const listCardFinancial = ref([]);

onMounted(() => {
    loadData();
});

const loadData = async () => {
    const list = [];
    const data = await financialHomeDash.cardFinancial();
    for (let i = 0; i < data.length; i++) {
        list.push({
            name: data[i].name,
            color: data[i].color,
            icon: data[i].icon,
            value: data[i].value,
            persentase: data[i].persentase,
            versus: data[i].versus,
            link: data[i].link
        });
    }
    listCardFinancial.value = list;
};
</script>

<template>
    <div class="bg-black text-white p-6 pb-10 mt-3 rounded-2xl">
        <!-- <div class="flex justify-between items-center mb-6">
            <div class="flex flex-col gap-2 w-full">
                <span class="text-2xl uppercase font-bold">Executive Dashboard</span>
            </div>
        </div> -->

        <div class="grid grid-cols-3 gap-4">
            <div class="col-span-1">
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
                    <h3 class="text-xl font-bold text-white">Operational</h3>
                </div>
                <div class="grid grid-cols-4 gap-4 mb-2">
                    <div class="bg-gray-800 p-2 rounded-xl shadow-xl min-h-[120px]">
                        <span class="text-l font-bold">CPO Olah vs Utility</span>
                        <h2 class="text-2xl font-bold mt-1">37,328</h2>
                        <span class="text-sm text-red-500">73.57% VS RKAP</span>
                    </div>
                    <div class="bg-gray-800 p-2 rounded-xl shadow-xl min-h-[120px]">
                        <span class="text-l font-bold">CPO Olah vs RKAP</span>
                        <h2 class="text-2xl font-bold mt-1">8,343</h2>
                        <span class="text-sm text-green-500">102.34% VS 2023</span>
                    </div>
                    <div class="bg-gray-800 p-2 rounded-xl shadow-xl min-h-[120px]">
                        <span class="text-l font-bold">CPO KPBN</span>
                        <h2 class="text-2xl font-bold mt-1">1,554</h2>
                        <span class="text-sm text-yellow-500">95.96% VS 2023</span>
                    </div>
                    <div class="bg-gray-800 p-2 rounded-xl shadow-xl min-h-[120px]">
                        <span class="text-l font-bold">CPO Sourcing Schedule</span>
                        <h2 class="text-2xl font-bold mt-1">1,554</h2>
                        <span class="text-sm text-yellow-500">95.96% VS 2023</span>
                    </div>
                </div>
                <div class="grid grid-cols-4 gap-4 mb-2">
                    <div class="bg-gray-800 p-2 rounded-xl shadow-xl min-h-[120px]">
                        <span class="text-l font-bold">Cash Balance</span>
                        <h2 class="text-2xl font-bold mt-1">37,328</h2>
                        <span class="text-sm text-red-500">73.57% VS RKAP</span>
                    </div>
                    <div class="bg-gray-800 p-2 rounded-xl shadow-xl min-h-[120px]">
                        <span class="text-l font-bold">Cash Flow Movement</span>
                        <h2 class="text-2xl font-bold mt-1">8,343</h2>
                        <span class="text-sm text-green-500">102.34% VS 2023</span>
                    </div>
                    <div class="bg-gray-800 p-2 rounded-xl shadow-xl min-h-[120px]">
                        <span class="text-l font-bold">CFI Payment Schedule</span>
                        <h2 class="text-2xl font-bold mt-1">1,554</h2>
                        <span class="text-sm text-yellow-500">95.96% VS 2023</span>
                    </div>
                    <div class="bg-gray-800 p-2 rounded-xl shadow-xl min-h-[120px]">
                        <span class="text-l font-bold">CFF Payment Schedule</span>
                        <h2 class="text-2xl font-bold mt-1">1,554</h2>
                        <span class="text-sm text-yellow-500">95.96% VS 2023</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
