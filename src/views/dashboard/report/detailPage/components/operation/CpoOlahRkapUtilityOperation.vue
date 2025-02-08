<script setup>
// import { bulkySalesChart, cashFlowData } from '@/controller/report/OperationReport';
import { formatCurrency, valueColorIntCondition, valueColorPersenCondition } from '@/controller/dummyController';
import { defineProps, onMounted, ref, watch } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

const props = defineProps({
    datas: {
        type: Object,
        default: () => ({})
    }
});

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
        const response = props.datas;
        console.log(response);
        // const data = await bulkySalesChart();
        listdata.value = {
            name: 'CPO Olah vs RKAP vs Utility'
        };
        if (response != null) {
            listTable.value = response.dataTable;
            listChart.value = response.dataChart;
            bebanProduksi.value = response.total.totalCost;
            rpKgTotal.value = response.total.totalHargaSatuan;
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
        <span class="text-[1.5vw] font-bold uppercase">
            {{ listdata.name || 'Loading...' }}
        </span>

        <!-- Loading Indicator -->
        <div v-if="isLoading" class="flex justify-center items-center w-full h-[380px]">
            <span>Loading chart...</span>
        </div>

        <div v-else class="w-full flex flex-col gap-4">
            <div class="flex gap-5 items-center w-full">
                <!-- Vue Apex Chart -->
                <div class="flex gap-2 items-center w-full py-3 px-6 bg-black rounded-xl shadow-lg" v-for="(item, index) in listChart" :key="index">
                    <div class="flex flex-col w-full gap-5">
                        <div class="flex flex-col items-center font-bold w-full" :class="valueColorPersenCondition(item.persen)">
                            <span class="text-[2.5vw]">{{ item.persen.toFixed(2) }}%</span>
                            <span class="text-[0.9vw]">{{ item.name }}</span>
                        </div>
                        <div class="flex gap-6">
                            <div class="flex flex-col items-end w-full bg-neutral-800 p-3 rounded-xl">
                                <span class="text-[1.1vw] text-teal-600 font-extrabold">{{ formatCurrency(Number(item.qty[0]).toFixed(2)) }}</span>
                                <span class="text-[0.6vw] text-gray-400">Real</span>
                            </div>
                            <div class="flex flex-col items-end w-full bg-neutral-800 p-3 rounded-xl">
                                <span class="text-[1.1vw] text-cyan-600 font-extrabold">{{ formatCurrency(Number(item.qty[1]).toFixed(2)) }}</span>
                                <span class="text-[0.6vw] text-gray-400">RKAP</span>
                            </div>
                            <div class="flex flex-col items-end w-full bg-neutral-800 p-3 rounded-xl">
                                <span class="text-[1.1vw] font-extrabold" :class="valueColorIntCondition(item.qty[0] - item.qty[1])">{{ formatCurrency(item.qty[0] - item.qty[1]) }}</span>
                                <span class="text-[0.6vw] text-gray-400">DIFF</span>
                            </div>
                        </div>
                    </div>
                    <VueApexCharts :series="item.qty" :options="item.chartData" height="250vw" style="z-index: 1 !important" />
                </div>
            </div>
            <Divider />
            <div class="flex flex-col gap-4 w-full p-9 bg-black rounded-xl">
                <span class="text-[0.9vw] font-bold uppercase">Cost Production</span>
                <DataTable :value="listTable" showGridlines removableSort class="w-full" tableStyle="background-color:#00000;">
                    <Column field="uraian" sortable headerStyle="background-color: #5f6a6a;" style="background-color: black; color: white">
                        <template #header>
                            <span class="flex justify-center items-center w-full text-center text-[0.8vw]">Uraian</span>
                        </template>
                        <template #body="{ data }">
                            <div class="w-full flex justify-start items-center">
                                <span class="text-[0.8vw]">{{ data.uraian }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column field="bebanProduksi" sortable headerStyle="background-color: #5f6a6a;" style="background-color: black; color: white">
                        <template #header>
                            <span class="flex justify-center items-center w-full text-center text-[0.8vw]">Beban Produksi (Rp)</span>
                        </template>
                        <template #body="{ data }">
                            <div class="w-full flex justify-end items-center">
                                <span class="text-[0.8vw]">{{ formatCurrency(Number(data.bebanProduksi).toFixed(2)) }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column field="rpKg" sortable headerStyle="background-color: #5f6a6a;" style="background-color: black; color: white">
                        <template #header>
                            <span class="flex justify-center items-center w-full text-center text-[0.8vw]">Rp / Kg CPO Olah</span>
                        </template>
                        <template #body="{ data }">
                            <div class="w-full flex justify-end items-center">
                                <span class="text-[0.8vw]">{{ formatCurrency(Number(data.rpKg).toFixed(2)) }}</span>
                            </div>
                        </template>
                    </Column>
                    <ColumnGroup type="footer">
                        <Row>
                            <Column footer="Jumlah Beban Produksi:" footerStyle="text-align:right; background-color: #5f6a6a; color:#ffffff;" />
                            <Column :footer="formatCurrency(Number(bebanProduksi).toFixed(2))" footerStyle="text-align:right; background-color: #5f6a6a; color:#ffffff;" />
                            <Column :footer="formatCurrency(Number(rpKgTotal).toFixed(2))" footerStyle="text-align:right; background-color: #5f6a6a; color:#ffffff;" />
                        </Row>
                    </ColumnGroup>
                </DataTable>
            </div>
        </div>
    </div>
</template>
