<script setup>
import { currentYear, grossProfit, grossProfitData, grossProfitLastYear } from '@/controller/report/FinancialReport';
import { onMounted, ref } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

const listdata = ref({
    type: null,
    series: [],
    options: {},
    name: null
});
const listdata2 = ref({
    type: null,
    series: [],
    options: {},
    name: null
});

const isLoading = ref(true);
const dataGrossProfitThisYear = ref([]);
const dataGrossProfitLastYear = ref([]);

onMounted(() => {
    loadData();
});

const loadData = async () => {
    try {
        const data = await grossProfit();
        const data2 = await grossProfitLastYear();

        listdata.value = {
            type: data.type || 'line',
            series: data.series || [],
            options: data.chartOptions || {},
            name: data.name || 'Gross Profit Margin (in IDR Bn)'
        };

        listdata2.value = {
            type: data2.type || 'line',
            series: data2.series || [],
            options: data2.chartOptions || {},
            name: data2.name || 'Gross Profit Margin (in IDR Bn)'
        };

        const { grossProfitThisYear: thisYearData, grossProfitLastYear: lastYearData } = grossProfitData();

        dataGrossProfitThisYear.value = thisYearData;
        dataGrossProfitLastYear.value = lastYearData;
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
            <div class="w-full flex gap-16">
                <VueApexCharts :type="listdata.type" :series="listdata.series" :options="listdata.options" class="w-full" height="300px" style="z-index: 1 !important" />
                <VueApexCharts :type="listdata2.type" :series="listdata2.series" :options="listdata2.options" class="w-full" height="300px" style="z-index: 1 !important" />
            </div>

            <div class="flex gap-20">
                <div class="w-full flex flex-col gap-2">
                    <span class="text-lg text-cyan-400 font-semibold">Gross Profit Margin Tahun {{ currentYear }}</span>
                    <DataTable :value="dataGrossProfitThisYear" showGridlines removableSort tableStyle="background-color:#00000;">
                        <Column field="periode" sortable headerStyle="background-color: #d946ef;" style="background-color: black; color: white">
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center">Periode</span>
                            </template>
                        </Column>
                        <Column field="labakotor" sortable headerStyle="background-color: #d946ef;" style="background-color: black; color: white">
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center">Laba Kotor (Bn)</span>
                            </template>
                        </Column>
                        <Column field="gpm" sortable headerStyle="background-color: #d946ef;" style="background-color: black; color: white">
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center">GPM (%)</span>
                            </template>
                            <template #body="{ data }">
                                <div class="w-full flex justify-center items-center">
                                    <span>{{ data.gpm }}%</span>
                                </div>
                            </template>
                        </Column>
                        <Column field="periode" sortable headerStyle="background-color: #d946ef; text-align: center;" style="background-color: black; color: white">
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
                <div class="w-full flex flex-col gap-2">
                    <span class="text-lg text-yellow-500 font-semibold">Gross Profit Margin Tahun {{ currentYear - 1 }}</span>
                    <DataTable :value="dataGrossProfitLastYear" showGridlines removableSort tableStyle="background-color:#00000;">
                        <Column field="periode" sortable headerStyle="background-color: #2d3748;" style="background-color: black; color: white">
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center">Periode</span>
                            </template>
                        </Column>
                        <Column field="labakotor" sortable headerStyle="background-color: #2d3748;" style="background-color: black; color: white">
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center">Laba Kotor (Bn)</span>
                            </template>
                        </Column>
                        <Column field="gpm" sortable headerStyle="background-color: #2d3748;" style="background-color: black; color: white">
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center">GPM (%)</span>
                            </template>
                            <template #body="{ data }">
                                <div class="w-full flex justify-center items-center">
                                    <span>{{ data.gpm }}%</span>
                                </div>
                            </template>
                        </Column>
                        <Column field="periode" sortable headerStyle="background-color: #2d3748; text-align: center;" style="background-color: black; color: white">
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
            </div>
        </div>
    </div>
</template>
