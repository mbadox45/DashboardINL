<script setup>
// import { bulkySalesChart, cashFlowData } from '@/controller/report/OperationReport';
import { formatCurrency } from '@/controller/dummyController';
import { chartLaporanProduksi, cpoOlah, listTableCPOOlah, packagingData } from '@/controller/getApiFromDaico/ProductionReport';
import { onMounted, ref } from 'vue';
// import VueApexCharts from 'vue3-apexcharts';

const listdata = ref({
    type: null,
    series: [],
    options: {},
    name: null
});

const listChart = ref([]);
const listTable = ref([]);
const bebanProduksi = ref(0);
const rpKgTotal = ref(0);

const isLoading = ref(true);
// const dataCashFlow = ref([]);

onMounted(() => {
    loadData();
});

const loadData = async () => {
    try {
        const chart = await chartLaporanProduksi();

        listdata.value = {
            type: chart.type || 'line',
            series: chart.series || [],
            options: chart.chartOptions || {},
            name: chart.name || 'Laporan Produksi'
        };
        const cpo = await cpoOlah();
        listChart.value = cpo.data;
        // listTable.value = listTableCPOOlah;

        let totalBeban = 0;
        let totalRpKg = 0;
        for (let i = 0; i < listTableCPOOlah.length; i++) {
            totalBeban += listTableCPOOlah[i].bebanProduksi;
            totalRpKg += listTableCPOOlah[i].rpKg;
        }
        bebanProduksi.value = totalBeban;
        rpKgTotal.value = totalRpKg;

        const load = await packagingData();
        const data = load.data;
        listTable.value = data;

        // dataCashFlow.value = cashFlowData();
    } catch (error) {
        console.error('Error loading data:', error);
    } finally {
        isLoading.value = false; // Turn off the loading state after the data has loaded
    }
};
</script>

<template>
    <div class="flex flex-col w-full items-center gap-5">
        <!-- Chart Title -->
        <span class="text-[1.5vw] font-bold uppercase">
            {{ listdata.name || 'Loading...' }}
        </span>

        <!-- Loading Indicator -->
        <div v-if="isLoading" class="flex justify-center items-center w-full h-[380px]">
            <span>Loading chart...</span>
        </div>

        <div v-else class="w-full flex flex-col gap-4">
            <!-- <div class="flex gap-5 items-center w-full">
                <VueApexCharts :type="listdata.type" :series="listdata.series" :options="listdata.options" class="w-full" height="400vw" style="z-index: 1 !important" />
            </div>
            <Divider /> -->
            <div class="grid grid-cols-3 gap-4 w-full">
                <div class="flex flex-col gap-3 p-9 bg-black rounded-xl" v-for="(item, index) in listTable" :key="index">
                    <span class="text-[0.9vw]">{{ item.nama }}</span>
                    <DataTable :value="item.uraian" showGridlines removableSort class="w-full rounded-xl" tableStyle="background-color:#00000;">
                        <Column field="nama" sortable headerStyle="background-color: #196f3d;" style="background-color: black; color: white">
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center text-[0.8vw]">Uraian</span>
                            </template>
                            <template #body="{ data }">
                                <div class="w-full flex justify-start items-center">
                                    <span class="text-[0.6vw]">{{ data.nama }}</span>
                                </div>
                            </template>
                        </Column>
                        <Column field="total_qty" sortable headerStyle="background-color: #196f3d;" style="background-color: black; color: white">
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center text-[0.8vw]">Quantity</span>
                            </template>
                            <template #body="{ data }">
                                <div class="w-full flex justify-end items-center">
                                    <span class="text-[0.6vw]" v-if="data.nama.includes('Hari Olah')">{{ formatCurrency(Number(data.total_qty).toFixed(0)) }} {{ data.satuan }}</span>
                                    <span class="text-[0.6vw]" v-else>{{ formatCurrency(Number(data.total_qty).toFixed(2)) }} {{ data.satuan }}</span>
                                </div>
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </div>
        </div>
    </div>
</template>
