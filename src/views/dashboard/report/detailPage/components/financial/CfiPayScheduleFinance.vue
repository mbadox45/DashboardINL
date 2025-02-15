<script setup>
import { cfiPayment, cfiPaymentData, currentYear } from '@/controller/report/FinancialReport';
import { onMounted, ref } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

const listdata = ref({
    type: null,
    series: [],
    options: {},
    name: null
});

const isLoading = ref(true);
const dataCfiPayment = ref([]);

onMounted(() => {
    loadData();
});

const loadData = async () => {
    try {
        const data = await cfiPayment();

        listdata.value = {
            type: data.type || 'line',
            series: data.series || [],
            options: data.chartOptions || {},
            name: data.name || 'CFI Payment Schedule (in IDR Bn)'
        };

        dataCfiPayment.value = cfiPaymentData();
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
            <VueApexCharts :type="listdata.type" :series="listdata.series" :options="listdata.options" class="w-full" height="400px" style="z-index: 1 !important" />

            <div class="flex gap-20">
                <div class="w-full flex flex-col gap-2">
                    <span class="text-lg text-green-500 font-semibold">CFI Payment Schedule Tahun {{ currentYear }}</span>
                    <DataTable :value="dataCfiPayment" showGridlines removableSort tableStyle="background-color:#00000;">
                        <Column field="cfi" headerStyle="background-color: #1a5276;" style="background-color: black; color: white">
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center">CFI</span>
                            </template>
                            <template #body="{ data }">
                                <div class="w-full flex items-center">
                                    <span>{{ data.cfi }}</span>
                                </div>
                            </template>
                        </Column>
                        <Column field="jan" sortable headerStyle="background-color: #1a5276;" style="background-color: black; color: white">
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center">Jan</span>
                            </template>
                            <template #body="{ data }">
                                <div class="w-full flex justify-end items-center">
                                    <span>{{ data.jan }}</span>
                                </div>
                            </template>
                        </Column>
                        <Column field="feb" sortable headerStyle="background-color: #1a5276;" style="background-color: black; color: white">
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center">Feb</span>
                            </template>
                            <template #body="{ data }">
                                <div class="w-full flex justify-end items-center">
                                    <span>{{ data.feb }}</span>
                                </div>
                            </template>
                        </Column>
                        <Column field="mar" sortable headerStyle="background-color: #1a5276;" style="background-color: black; color: white">
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center">Mar</span>
                            </template>
                            <template #body="{ data }">
                                <div class="w-full flex justify-end items-center">
                                    <span>{{ data.mar }}</span>
                                </div>
                            </template>
                        </Column>
                        <Column field="apr" sortable headerStyle="background-color: #1a5276;" style="background-color: black; color: white">
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center">Apr</span>
                            </template>
                            <template #body="{ data }">
                                <div class="w-full flex justify-end items-center">
                                    <span>{{ data.apr }}</span>
                                </div>
                            </template>
                        </Column>
                        <Column field="mei" sortable headerStyle="background-color: #1a5276;" style="background-color: black; color: white">
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center">Mei</span>
                            </template>
                            <template #body="{ data }">
                                <div class="w-full flex justify-end items-center">
                                    <span>{{ data.mei }}</span>
                                </div>
                            </template>
                        </Column>
                        <Column field="jun" sortable headerStyle="background-color: #1a5276;" style="background-color: black; color: white">
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center">Jun</span>
                            </template>
                            <template #body="{ data }">
                                <div class="w-full flex justify-end items-center">
                                    <span>{{ data.jun }}</span>
                                </div>
                            </template>
                        </Column>
                        <Column field="jul" sortable headerStyle="background-color: #1a5276;" style="background-color: black; color: white">
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center">Jul</span>
                            </template>
                            <template #body="{ data }">
                                <div class="w-full flex justify-end items-center">
                                    <span>{{ data.jul }}</span>
                                </div>
                            </template>
                        </Column>
                        <Column field="aug" sortable headerStyle="background-color: #1a5276;" style="background-color: black; color: white">
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center">Aug</span>
                            </template>
                            <template #body="{ data }">
                                <div class="w-full flex justify-end items-center">
                                    <span>{{ data.aug }}</span>
                                </div>
                            </template>
                        </Column>
                        <Column field="sep" sortable headerStyle="background-color: #1a5276;" style="background-color: black; color: white">
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center">Sep</span>
                            </template>
                            <template #body="{ data }">
                                <div class="w-full flex justify-end items-center">
                                    <span>{{ data.sep }}</span>
                                </div>
                            </template>
                        </Column>
                        <Column field="oct" sortable headerStyle="background-color: #1a5276;" style="background-color: black; color: white">
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center">Oct</span>
                            </template>
                            <template #body="{ data }">
                                <div class="w-full flex justify-end items-center">
                                    <span>{{ data.oct }}</span>
                                </div>
                            </template>
                        </Column>
                        <Column field="nov" sortable headerStyle="background-color: #1a5276;" style="background-color: black; color: white">
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center">Nov</span>
                            </template>
                            <template #body="{ data }">
                                <div class="w-full flex justify-end items-center">
                                    <span>{{ data.nov }}</span>
                                </div>
                            </template>
                        </Column>
                        <Column field="des" sortable headerStyle="background-color: #1a5276;" style="background-color: black; color: white">
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center">Des</span>
                            </template>
                            <template #body="{ data }">
                                <div class="w-full flex justify-end items-center">
                                    <span>{{ data.des }}</span>
                                </div>
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
            </div>
        </div>
    </div>
</template>
