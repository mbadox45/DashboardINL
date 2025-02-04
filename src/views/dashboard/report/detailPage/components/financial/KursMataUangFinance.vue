<script setup>
import { revenueYtd } from '@/controller/report/FinancialReport';
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
        if (response != null) {
            const chart = response.chart;
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
        }
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
        <span class="text-[1vw] font-bold"> Kurs Mata Uang </span>

        <!-- Loading Indicator -->
        <div v-if="isLoading" class="flex justify-center items-center w-full h-[380px]">
            <span>Loading chart...</span>
        </div>

        <div v-else class="w-full flex flex-col gap-4">
            <!-- Vue Apex Chart -->
            <VueApexCharts :type="listdata.type" :series="listdata.series" :options="listdata.options" class="w-full" height="600vw" style="z-index: 1 !important" />
        </div>
    </div>
</template>
