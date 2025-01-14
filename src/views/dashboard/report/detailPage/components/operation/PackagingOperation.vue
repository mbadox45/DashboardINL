<script setup>
import { chartPackaging, listTablePackaging } from '@/controller/getApiFromDaico/ProductionReport';
import { cashBalance, cashBalanceData } from '@/controller/report/FinancialReport';
import { onMounted, ref } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

const listdata = ref({
    type: null,
    series: [],
    options: {},
    name: null
});

const isLoading = ref(true);
const cashBalanceThisYear = ref([]);
const cashBalanceLastYear = ref([]);
const listPackaging = ref([]);
const listChartPackaging = ref([]);

onMounted(() => {
    loadData();
});

const loadData = async () => {
    try {
        const data = await cashBalance();

        listdata.value = {
            type: data.type || 'line',
            series: data.series || [],
            options: data.chartOptions || {},
            name: data.name || 'EBITDA Margin (in IDR BN)'
        };

        const { cashBalanceThisYear: thisYearData, cashBalanceLastYear: lastYearData } = cashBalanceData();
        cashBalanceThisYear.value = thisYearData;
        cashBalanceLastYear.value = lastYearData;

        listPackaging.value = listTablePackaging;
        const chart = (listChartPackaging.value = await chartPackaging());
    } catch (error) {
        console.error('Error loading data:', error);
        listPackaging.value = [];
    } finally {
        isLoading.value = false; // Turn off the loading state after the data has loaded
    }
};

const editRow = (row) => {
    //fungsi edit
    console.log('Editing row:', row);
};
</script>

<template>
    <div class="flex flex-col w-full items-center gap-4">
        <!-- Chart Title -->
        <span class="text-[1.5vw] font-bold uppercase">
            <!-- {{ listdata.name || 'Loading...' }} -->
            Packaging Performance
        </span>

        <!-- Loading Indicator -->
        <div v-if="isLoading" class="flex justify-center items-center w-full h-[380px]">
            <span>Loading chart...</span>
        </div>

        <div v-else class="w-full flex flex-col gap-4">
            <!-- Vue Apex Chart -->
            <!-- <VueApexCharts :type="listdata.type" :series="listdata.series" :options="listdata.options" class="w-full" height="400vw" style="z-index: 1 !important" /> -->
            <div class="flex gap-5">
                <VueApexCharts v-for="(item, index) in listChartPackaging" :key="index" :series="item.qty" :options="item.chartData" class="w-full" height="200vw" style="z-index: 1 !important" />
            </div>
            <Divider />
            <div class="grid grid-cols-2 gap-8">
                <div class="w-full flex flex-col gap-1 py-6 px-8 bg-black rounded-xl" v-for="(item, index) in listPackaging" :key="index">
                    <span class="text-[1vw] text-cyan-500 font-bold">{{ item.title }}</span>
                    <DataTable :value="item.uraian" showGridlines removableSort tableStyle="background-color:#00000;">
                        <Column field="nama" sortable headerStyle="background-color: #1a5276;" style="background-color: black; color: white">
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center text-[0.8vw]">Uraian</span>
                            </template>
                            <template #body="{ data }">
                                <div class="w-full flex justify-start items-center">
                                    <span class="text-[0.8vw]">{{ data.nama }}</span>
                                </div>
                            </template>
                        </Column>
                        <Column field="total_qty" sortable headerStyle="background-color: #1a5276;" style="background-color: black; color: white">
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center text-[0.8vw]">Quantity</span>
                            </template>
                            <template #body="{ data }">
                                <div class="w-full flex justify-end items-center">
                                    <span class="text-[0.8vw]">{{ data.qty }} {{ data.satuan }}</span>
                                </div>
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </div>
        </div>
    </div>
</template>
