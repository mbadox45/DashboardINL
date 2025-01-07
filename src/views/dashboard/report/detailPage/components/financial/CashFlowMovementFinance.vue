<script setup>
import { cashFlow, cashFlowData, currentYear } from '@/controller/report/FinancialReport';
import { onMounted, ref } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

const listdata = ref({
    type: null,
    series: [],
    options: {},
    name: null
});

const isLoading = ref(true);
const dataCashFlow = ref([]);

onMounted(() => {
    loadData();
});

const loadData = async () => {
    try {
        const data = await cashFlow();

        listdata.value = {
            type: data.type || 'line',
            series: data.series || [],
            options: data.chartOptions || {},
            name: data.name || 'Cash Flow Movement (YTD Jun-24; in IDR Bn)'
        };

        dataCashFlow.value = cashFlowData();
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
            <VueApexCharts :type="listdata.type" :series="listdata.series" :options="listdata.options" class="w-full" height="450px" style="z-index: 1 !important" />

            <div class="flex gap-20">
                <div class="w-full flex flex-col gap-2">
                    <span class="text-lg text-green-500 font-semibold">Cash Flow Movement Tahun {{ currentYear }}</span>
                    <DataTable :value="dataCashFlow" showGridlines removableSort tableStyle="background-color:#00000;">
                        <Column field="periode" headerStyle="background-color: #1a5276;" style="background-color: black; color: white">
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center">Periode</span>
                            </template>
                            <template #body="{ data }">
                                <div class="w-full flex justify-center items-center">
                                    <span>{{ data.periode }}</span>
                                </div>
                            </template>
                        </Column>
                        <Column field="cfoin" sortable headerStyle="background-color: #1a5276;" style="background-color: black; color: white">
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center">CFO In</span>
                            </template>
                        </Column>
                        <Column field="cfoout" sortable headerStyle="background-color: #1a5276;" style="background-color: black; color: white">
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center">CFO Out</span>
                            </template>
                        </Column>
                        <Column field="cfi" sortable headerStyle="background-color: #1a5276;" style="background-color: black; color: white">
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center">CFI</span>
                            </template>
                        </Column>
                        <Column field="cff" sortable headerStyle="background-color: #1a5276;" style="background-color: black; color: white">
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center">CFF</span>
                            </template>
                        </Column>
                        <Column field="periode" headerStyle="background-color: #1a5276; text-align: center;" style="background-color: black; color: white">
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center">Action</span>
                            </template>
                            <template #body="{ data }">
                                <div class="w-full flex justify-center items-center">
                                    <button @click="editRow(data)" class="hover:opacity-80 flex justify-center items-center p-2 rounded-full w-[1.3vw] h-[1.3vw] bg-cyan-900">
                                        <i class="pi pi-pencil" style="font-size: 0.7vw"></i>
                                        <!-- <img src="/images/button-icon/pen.png" alt="Edit Icon" class="w-4 h-4 inline" /> -->
                                    </button>
                                </div>
                            </template>
                        </Column>
                    </DataTable>
                </div>
                <div class="w-full flex flex-col gap-2"></div>
            </div>
        </div>
    </div>
</template>
