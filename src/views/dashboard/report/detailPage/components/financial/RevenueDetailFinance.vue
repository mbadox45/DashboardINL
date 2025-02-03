<script setup>
import { revenueData, revenueYtd } from '@/controller/report/FinancialReport';
import { defineProps, onMounted, ref, watch } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

const listdata = ref({
    type: null,
    series: [],
    options: {},
    name: null
});

const revenueThisYear = ref([]);
const revenueLastYear = ref([]);
const listTable = ref([]);
const isLoading = ref(true);

const props = defineProps({
    datas: {
        type: Object,
        default: () => {}
    }
});

onMounted(() => {
    loadData();
});

// Watch untuk memantau perubahan pada props.datas

const loadData = async () => {
    try {
        isLoading.value = true; // Set loading state true sebelum data dimuat
        const data = await revenueYtd();
        const response = props.datas;

        const chart = response.chart || null;
        if (chart != null) {
            listdata.value = {
                type: chart.type || 'line',
                series: chart.series || [],
                options: chart.chartOptions || {},
                name: chart.name || 'Revenue YTD'
            };
        } else {
            listdata.value = {
                type: 'line',
                series: [],
                options: {},
                name: ''
            };
        }

        listTable.value = response.table;
        const { revenueThisYear: thisYearData, revenueLastYear: lastYearData } = revenueData();
        revenueThisYear.value = thisYearData;
        revenueLastYear.value = lastYearData;
    } catch (error) {
        console.error('Error loading data:', error);
    } finally {
        isLoading.value = false; // Set loading state false setelah data dimuat
    }
};

const editRow = (row) => {
    console.log('Editing row:', row);
};

watch(() => props.datas, loadData, { immediate: true });
</script>

<template>
    <div class="flex flex-col w-full items-center gap-4">
        <!-- Chart Title -->
        <span class="text-[1vw] font-bold">
            {{ listdata.name || 'Loading...' }}
        </span>

        <!-- Loading Indicator -->
        <div v-if="isLoading" class="flex justify-center items-center w-full h-[380px]">
            <span>Loading chart...</span>
        </div>

        <div v-else class="w-full flex flex-col gap-4">
            <!-- Vue Apex Chart -->
            <VueApexCharts :type="listdata.type" :series="listdata.series" :options="listdata.options" class="w-full" height="400vw" style="z-index: 1 !important" />
            <Divider />
            <div class="flex gap-20">
                <div class="w-full flex flex-col gap-2" v-for="(item, index) in listTable" :key="index">
                    <span class="text-lg text-blue-500 font-semibold">Revenue Tahun {{ item.tahun }}</span>
                    <DataTable :value="item.data" showGridlines removableSort>
                        <Column field="periode" sortable headerStyle="background-color: #1a5276;" style="background-color: black; color: white">
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center">Periode</span>
                            </template>
                        </Column>
                        <Column field="pendapatan" sortable headerStyle="background-color: #1a5276;" style="background-color: black; color: white">
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center">Pendapatan (Bn)</span>
                            </template>
                        </Column>
                        <Column field="rkap" sortable headerStyle="background-color: #1a5276;" style="background-color: black; color: white">
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center">Target RKAP (Bn)</span>
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </div>
        </div>
    </div>
</template>
