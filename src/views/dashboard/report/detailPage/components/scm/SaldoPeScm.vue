<script setup>
// import { bulkySalesChart, cashFlowData } from '@/controller/report/OperationReport';
import { defineProps, onMounted, ref, watch } from 'vue';
// import VueApexCharts from 'vue3-apexcharts';
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

const listChart = ref(null);
const listTable = ref(null);
const bebanProduksi = ref(0);
const rpKgTotal = ref(0);

const isLoading = ref(true);
// const dataCashFlow = ref([]);

onMounted(() => {
    loadData();
});

const loadData = async () => {
    try {
        const response = props.datas;
        listdata.value = {
            name: 'Laporan Material'
        };
        if (response != null) {
            listChart.value = response;
        }

        // dataCashFlow.value = cashFlowData();
    } catch (error) {
        console.error('Error loading data:', error);
    } finally {
        isLoading.value = false; // Turn off the loading state after the data has loaded
    }
};

watch(() => props.datas, loadData, { immediate: true });
</script>

<template>
    <div class="flex flex-col w-full items-center gap-5">
        <!-- Chart Title -->
        <!-- Loading Indicator -->
        <div v-if="isLoading" class="flex justify-center items-center w-full h-[380px]">
            <span>Loading chart...</span>
        </div>

        <div v-else class="w-full flex flex-col gap-4">
            <div v-if="listChart != null" class="flex w-full bg-slate-900 justify-between rounded-lg p-5">
                <span class="text-[2.5vw] font-bold">Laporan Material</span>
                <span v-if="listChart.table != null" class="text-[2.5vw] font-bold">Update Terakhir: {{ listChart.table.tanggal }}</span>
            </div>
            <div v-if="listChart != null" class="flex gap-5 items-center w-full">
                <div v-if="listChart.table != null" class="flex flex-col items-end w-full bg-slate-900 rounded-lg p-5">
                    <span class="text-[2.5vw]">{{ listChart.table.saldo_awal }}</span>
                    <span>Saldo Awal</span>
                </div>
                <div v-if="listChart.table != null" class="flex flex-col items-end w-full bg-slate-900 rounded-lg p-5">
                    <span class="text-[2.5vw]">{{ listChart.table.saldo_pakai }}</span>
                    <span>Saldo Terpakai</span>
                </div>
                <div v-if="listChart.table != null" class="flex flex-col items-end w-full bg-slate-900 rounded-lg p-5">
                    <span class="text-[2.5vw]">{{ listChart.table.saldo_tersedia }}</span>
                    <span>Saldo Tersedia</span>
                </div>
            </div>
            <VueApexCharts v-if="listChart != null" :series="listChart.series" :options="listChart.chartOptions" height="380vw" class="w-auto mt-5" style="z-index: 1 !important" />
        </div>
    </div>
</template>
