<script setup>
import { revenueYtd } from '@/controller/report/FinancialReport';
import { onMounted, ref } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

const listdata = ref({
    type: null,
    series: [],
    options: {},
    name: null
});

const isLoading = ref(true); // State untuk loading

onMounted(() => {
    loadData();
});

const loadData = async () => {
    try {
        const data = await revenueYtd();

        listdata.value = {
            type: data.type || 'line', // Default tipe chart
            series: data.series || [],
            options: data.chartOptions || {}, // Default opsi
            name: data.name || 'Revenue YTD'
        };
    } catch (error) {
        console.error('Error loading data:', error);
    } finally {
        isLoading.value = false; // Matikan loading state setelah selesai
    }
};
</script>

<template>
    <div class="flex flex-col items-center gap-2">
        <span class="text-[1vw] font-bold">
            {{ listdata.name || 'Loading...' }}
        </span>

        <!-- Indikator loading -->
        <div v-if="isLoading" class="flex justify-center items-center w-full h-[380px]">
            <span>Loading chart...</span>
        </div>

        <!-- Chart -->
        <div v-else>
            <VueApexCharts :type="listdata.type" :series="listdata.series" :options="listdata.options" class="w-full" height="380" style="z-index: 1 !important" />
        </div>
    </div>
</template>
