<script setup>
import { grossProfit, grossProfitData, currentYear } from '@/controller/report/FinancialReport';
import { onMounted, ref } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

const listdata = ref({
    type: null,
    series: [],
    options: {},
    name: null
});

const isLoading = ref(true);
const dataGrossProfit = ref([]);

onMounted(() => {
    loadData();
});

const loadData = async () => {
    try {
        const data = await grossProfit();

        listdata.value = {
            type: data.type || 'line',
            series: data.series || [],
            options: data.chartOptions || {},
            name: data.name || 'Gross Profit Margin (in IDR Bn)'
        };

        dataGrossProfit.value = grossProfitData();
    } catch (error) {
        console.error('Error loading data:', error);
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
        <span class="text-[1vw] font-bold">
            {{ listdata.name || 'Loading...' }}
        </span>

        <!-- Loading Indicator -->
        <div v-if="isLoading" class="flex justify-center items-center w-full h-[380px]">
            <span>Loading chart...</span>
        </div>

        <div v-else class="w-full flex flex-col gap-4">
            <!-- Vue Apex Chart -->
            <VueApexCharts :type="listdata.type" :series="listdata.series" :options="listdata.options" class="w-full" height="300px" style="z-index: 1 !important" />

            <div class="flex gap-20">
                <div class="w-1/3">
                    <h2 class="text-lg text-yellow-400 font-semibold mb-2">Gross Profit Margin Tahun {{ currentYear }}</h2>
                    <table class="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr class="bg-amber-700">
                                <th class="border border-gray-300 p-2">Periode</th>
                                <th class="border border-gray-300 p-2">Laba Kotor (Bn)</th>
                                <th class="border border-gray-300 p-2">GPM (%)</th>
                                <th class="border border-gray-300 p-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="text-right" v-for="row in dataGrossProfit" :key="row.periode">
                                <td class="border border-gray-300 p-2">{{ row.periode }}</td>
                                <td class="border border-gray-300 p-2">{{ row.labakotor }}</td>
                                <td class="border border-gray-300 p-2">{{ row.gpm }}%</td>
                                <td class="border border-gray-300 p-2 text-center">
                                    <button @click="editRow(row)" class="hover:opacity-80">
                                        <img src="/images/button-icon/pen.png" alt="Edit Icon" class="w-4 h-4 inline" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
