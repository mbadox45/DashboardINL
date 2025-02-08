<script setup>
import { formatCurrency } from '@/controller/dummyController';
import { chartPackaging } from '@/controller/getApiFromDaico/ProductionReport';
import { cashBalance, cashBalanceData } from '@/controller/report/FinancialReport';
import { defineProps, onMounted, ref, watch } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

const props = defineProps({
    datas: {
        type: Object,
        default: () => {}
    }
});

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
        const response = props.datas;
        if (response != null) {
            listPackaging.value = response;
        }

        const { cashBalanceThisYear: thisYearData, cashBalanceLastYear: lastYearData } = cashBalanceData();
        cashBalanceThisYear.value = thisYearData;
        cashBalanceLastYear.value = lastYearData;

        // listPackaging.value = listTablePackaging;
        const chart = (listChartPackaging.value = await chartPackaging());
    } catch (error) {
        console.error('Error loading data:', error);
        listPackaging.value = [];
    } finally {
        isLoading.value = false; // Turn off the loading state after the data has loaded
    }
};

watch(() => props.datas, loadData, { immediate: true });
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
            <Divider />
            <div class="grid grid-cols-2 gap-8">
                <div v-if="listPackaging.length > 0" class="w-full flex flex-col gap-3 py-6 px-8 bg-black rounded-xl" v-for="(item, index) in listPackaging" :key="index">
                    <span class="text-[1vw] text-cyan-500 font-bold">{{ item.name }}</span>
                    <div class="grid grid-cols-3 w-full gap-3">
                        <div class="flex flex-col gap-2 justify-center p-5 bg-slate-950" v-for="(chart, index) in item.chart" :key="index">
                            <VueApexCharts :series="chart.series" :options="chart.chartData" height="170vw" class="w-auto" style="z-index: 1 !important" />
                            <div class="flex flex-col">
                                <div class="flex justify-between text-gray-400" style="font-size: 0.8vw">
                                    <span>Real</span>
                                    <span class="font-bold text-white">{{ chart.real }}</span>
                                </div>
                                <div class="flex justify-between text-gray-400" style="font-size: 0.8vw">
                                    <span>{{ chart.chartData.labels[0] }}</span>
                                    <span class="font-bold text-white">{{ chart.qty }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <DataTable :value="item.data" showGridlines removableSort tableStyle="background-color:#00000;">
                        <Column field="name" sortable headerStyle="background-color: #1a5276;" style="background-color: black; color: white">
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center text-[0.8vw]">Uraian</span>
                            </template>
                            <template #body="{ data }">
                                <div class="w-full flex justify-start items-center">
                                    <span class="text-[0.8vw]">{{ data.name }}</span>
                                </div>
                            </template>
                        </Column>
                        <Column field="totalQty" sortable headerStyle="background-color: #1a5276;" style="background-color: black; color: white">
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center text-[0.8vw]">Quantity</span>
                            </template>
                            <template #body="{ data }">
                                <div class="w-full flex justify-end items-center">
                                    <span class="text-[0.8vw]">{{ data.name.toLowerCase().includes('roll') ? formatCurrency(Number(data.totalQty).toFixed(0)) : formatCurrency(Number(data.totalQty).toFixed(2)) }}</span>
                                </div>
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </div>
        </div>
    </div>
</template>
