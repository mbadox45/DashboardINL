<script setup>
import { revenueData, revenueYtd } from '@/controller/report/FinancialReport';
import moment from 'moment';
import { onMounted, ref } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

const listdata = ref({
    type: null,
    series: [],
    options: {},
    name: null
});

const revenueThisYear = ref([]);
const revenueLastYear = ref([]);
const currentYear = ref(moment().format('yyyy'));
const isLoading = ref(true);

onMounted(() => {
    loadData();
});

const loadData = async () => {
    try {
        const data = await revenueYtd();

        listdata.value = {
            type: data.type || 'line',
            series: data.series || [],
            options: data.chartOptions || {},
            name: data.name || 'Revenue YTD'
        };

        const { revenueThisYear: thisYearData, revenueLastYear: lastYearData } = revenueData();
        revenueThisYear.value = thisYearData;
        revenueLastYear.value = lastYearData;
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
            <Divider />
            <div class="flex gap-20">
                <div class="w-full flex flex-col gap-2">
                    <span class="text-lg text-green-500 font-semibold">Revenue Tahun 2024</span>
                    <DataTable :value="revenueThisYear" showGridlines removableSort tableStyle="background-color:#00000;">
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
                    <span class="text-lg text-green-500 font-semibold">Revenue Tahun 2023</span>
                    <DataTable :value="revenueLastYear" showGridlines removableSort tableStyle="background-color:#00000;">
                        <Column field="periode" sortable headerStyle="background-color: #af601a;" style="background-color: black; color: white">
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center">Periode</span>
                            </template>
                        </Column>
                        <Column field="pendapatan" sortable headerStyle="background-color: #af601a;" style="background-color: black; color: white">
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center">Pendapatan (Bn)</span>
                            </template>
                        </Column>
                        <Column field="rkap" sortable headerStyle="background-color: #af601a;" style="background-color: black; color: white">
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center">Target RKAP (Bn)</span>
                            </template>
                        </Column>
                        <Column field="quantity" sortable headerStyle="background-color: #af601a; text-align: center;" style="background-color: black; color: white">
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
                <!-- <div class="w-1/2">
                    <h2 class="text-lg text-green-500 font-semibold mb-2">Revenue Tahun {{ currentYear }}</h2>
                    <table class="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr class="bg-cyan-700">
                                <th class="border border-gray-300 p-2">Periode</th>
                                <th class="border border-gray-300 p-2">Pendapatan (Bn)</th>
                                <th class="border border-gray-300 p-2">Target RKAP (Bn)</th>
                                <th class="border border-gray-300 p-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="text-right" v-for="row in revenueThisYear" :key="row.periode">
                                <td class="border border-gray-300 p-2">{{ row.periode }}</td>
                                <td class="border border-gray-300 p-2">{{ row.pendapatan }}</td>
                                <td class="border border-gray-300 p-2">{{ row.rkap }}</td>
                                <td class="border border-gray-300 p-2 text-center">
                                    <button @click="editRow(row)" class="hover:opacity-80">
                                        <img src="/images/button-icon/pen.png" alt="Edit Icon" class="w-4 h-4 inline" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="w-1/2">
                    <h2 class="text-lg text-green-500 font-semibold mb-2">Revenue Tahun {{ currentYear - 1 }}</h2>
                    <table class="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr class="bg-amber-700">
                                <th class="border border-gray-300 p-2">Periode</th>
                                <th class="border border-gray-300 p-2">Pendapatan (Bn)</th>
                                <th class="border border-gray-300 p-2">Target RKAP (Bn)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="text-right" v-for="row in revenueLastYear" :key="row.periode">
                                <td class="border border-gray-300 p-2">{{ row.periode }}</td>
                                <td class="border border-gray-300 p-2">{{ row.pendapatan }}</td>
                                <td class="border border-gray-300 p-2">{{ row.rkap }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div> -->
            </div>
        </div>
    </div>
</template>
