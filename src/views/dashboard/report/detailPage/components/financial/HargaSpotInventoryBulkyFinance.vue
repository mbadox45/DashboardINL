<script setup>
import { cashBalance, cashBalanceData, currentYear } from '@/controller/report/FinancialReport';
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
            name: data.name || 'Harga Spot & Inventory Bulky'
        };

        const { cashBalanceThisYear: thisYearData, cashBalanceLastYear: lastYearData } = cashBalanceData();
        cashBalanceThisYear.value = thisYearData;
        cashBalanceLastYear.value = lastYearData;
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
            <VueApexCharts :type="listdata.type" :series="listdata.series" :options="listdata.options" class="w-full" height="400vw" style="z-index: 1 !important" />
            <Divider />
            <div class="flex gap-20">
                <div class="w-full flex flex-col gap-2">
                    <span class="text-lg text-sky-500 font-semibold">Cash Balance Tahun {{ currentYear }}</span>
                    <DataTable :value="cashBalanceThisYear" showGridlines removableSort tableStyle="background-color:#00000;">
                        <Column field="periode" sortable headerStyle="background-color: #1a5276;" style="background-color: black; color: white">
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center">Periode</span>
                            </template>
                        </Column>
                        <Column field="labaBersih" sortable headerStyle="background-color: #1a5276;" style="background-color: black; color: white">
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center">Laba Bersih (Bn)</span>
                            </template>
                        </Column>
                        <Column field="quantity" sortable headerStyle="background-color: #1a5276; text-align: center;" style="background-color: black; color: white">
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
                    <span class="text-lg text-green-500 font-semibold">Cash Balance Tahun {{ currentYear - 1 }}</span>
                    <DataTable :value="cashBalanceLastYear" showGridlines removableSort tableStyle="background-color:#00000;">
                        <Column field="periode" sortable headerStyle="background-color: #22C55E;" style="background-color: black; color: white">
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center">Periode</span>
                            </template>
                        </Column>
                        <Column field="labaBersih" sortable headerStyle="background-color: #22C55E;" style="background-color: black; color: white">
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center">Laba Bersih (Bn)</span>
                            </template>
                        </Column>
                        <Column field="quantity" sortable headerStyle="background-color: #22C55E; text-align: center;" style="background-color: black; color: white">
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
