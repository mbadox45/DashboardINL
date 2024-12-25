<script setup>
import moment from 'moment';
import { ref } from 'vue';

const beforeDate = ref(moment().format('YYYY-MM-01'));
const now = ref(moment().format('YYYY-MM-DD'));
const dates = ref([moment(beforeDate.value).toDate(), moment(now.value).toDate()]);
const selectedRegion = ref('pmg1');
const region = ref([
    { name: 'PMG 1', code: 'pmg1' },
    { name: 'PMG 2', code: 'pmg2' }
]);

const changeDate = () => {
    const list = dates.value;
    const listdate = [];
    let start, end;

    if (list != null) {
        if (list.length > 1) {
            start = moment(list[0], 'YYYY-MM-DD').format('YYYY-MM-DD');
            end = moment(list[1], 'YYYY-MM-DD').format('YYYY-MM-DD');
        } else {
            start = beforeDate.value;
            end = now.value;
        }
    } else {
        start = beforeDate.value;
        end = now.value;
    }
    listdate.push(convertDate(start), convertDate(end));
    console.log(listdate);
};

const convertDate = (dateString) => {
    const date = moment(dateString).toDate();
    return date;
};
</script>

<template>
    <div class="bg-black text-white p-6 pb-10">
        <div class="flex justify-between items-center mb-6">
            <div class="flex flex-col gap-2 w-full">
                <span class="text-2xl uppercase font-bold">Executive Dashboard</span>
                <!-- <span class="font-bold uppercase text-gray-400 text-sm">Empowering Decisions & Growth Excellence</span> -->
            </div>
            <div class="flex items-center gap-3">
                <div class="flex p-2 bg-gray-800 border rounded border-gray-600">
                    <Select v-model="selectedRegion" :options="region" optionLabel="name" optionValue="code" placeholder="Select a Region" class="bg-gray-800 w-30" />
                </div>
                <!-- <select class="p-2 bg-gray-800 border border-gray-600 rounded text-white cursor-pointer">
                    <option>PMG 1</option>
                    <option>PMG 2</option>
                </select> -->
                <div class="flex items-center gap-3 p-2 bg-gray-800 border border-gray-600 rounded text-white w-96">
                    <DatePicker v-model="dates" selectionMode="range" showIcon iconDisplay="input" dateFormat="yy-mm-dd" :manualInput="false" placeholder="Select Date Range" class="w-full" />
                    <button class="w-[30px] h-[30px] p-3 rounded-lg bg-white shadow-none hover:shadow-white hover:shadow transition-all duration-700 text-black flex items-center justify-center" @click="changeDate">
                        <i class="pi pi-search text-2xl"></i>
                    </button>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-3 gap-4">
            <div class="col-span-1">
                <img src="/images/Picture1.png" alt="Image" class="w-full rounded-xl shadow-2xl h-auto" />
            </div>
            <div class="col-span-2">
                <div class="mb-4">
                    <h3 class="text-xl font-bold text-white">Financial</h3>
                </div>
                <div class="grid grid-cols-4 gap-4 mb-2">
                    <div class="bg-gray-800 p-2 rounded-xl shadow-xl min-h-[120px]">
                        <span class="text-l font-bold">Revenue</span>
                        <h2 class="text-2xl font-bold mt-1">37,328</h2>
                        <span class="text-sm text-red-500">73.57% VS RKAP</span>
                    </div>
                    <div class="bg-gray-800 p-2 rounded-xl shadow-xl min-h-[120px]">
                        <span class="text-l font-bold">Gross Profit Margin</span>
                        <h2 class="text-2xl font-bold mt-1">8,343</h2>
                        <span class="text-sm text-green-500">102.34% VS 2023</span>
                    </div>
                    <div class="bg-gray-800 p-2 rounded-xl shadow-xl min-h-[120px]">
                        <span class="text-l font-bold">EBITDA Margin</span>
                        <h2 class="text-2xl font-bold mt-1">1,554</h2>
                        <span class="text-sm text-yellow-500">95.96% VS 2023</span>
                    </div>
                    <div class="bg-gray-800 p-2 rounded-xl shadow-xl min-h-[120px]">
                        <span class="text-l font-bold">NET Profit Margin</span>
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
                <div class="mb-4">
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
