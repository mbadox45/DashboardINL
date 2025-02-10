<script setup>
// import { bulkySalesChart, cashFlowData } from '@/controller/report/OperationReport';
import { defineProps, onMounted, ref, watch } from 'vue';
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
            listTable.value = response;
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
    <div class="flex flex-col w-full items-center gap-5 pb-10">
        <!-- Chart Title -->
        <!-- <span class="text-[1.5vw] font-bold uppercase">
            Stock CPO
        </span> -->
        <!-- Loading Indicator -->
        <div v-if="isLoading" class="flex justify-center items-center w-full h-[380px]">
            <span>Loading chart...</span>
        </div>

        <div v-else class="w-full flex flex-col gap-4">
            <div class="flex w-full pl-10 items-center justify-between gap-3">
                <span class="w-full text-[2.5vw] font-bold text-center">Stock CPO</span>
                <div class="w-full p-5 rounded-lg flex items-center justify-between gap-2 bg-slate-900">
                    <i class="pi-warehouse pi" style="font-size: 4.5vw"></i>
                    <div class="flex flex-col items-end">
                        <span class="text-[2.5vw] font-bold" v-if="listTable != null">{{ listTable.total }}</span>
                        <span>Total Stock</span>
                    </div>
                </div>
            </div>
            <VueApexCharts v-if="listTable != null" :series="listTable.series" :options="listTable.chart" height="380vw" class="w-auto mt-5" style="z-index: 1 !important" />
            <Divider />
            <DataTable v-if="listTable != null" :value="listTable.table" showGridlines removableSort class="w-full rounded-xl" tableStyle="background-color:#00000;">
                <Column field="tanki" sortable headerStyle="background-color: #196f3d;" style="background-color: black; color: white">
                    <template #header>
                        <span class="flex justify-center items-center w-full text-center text-[0.8vw]">Tank</span>
                    </template>
                    <template #body="{ data }">
                        <div class="w-full flex justify-start items-center">
                            <span class="text-[0.6vw]">{{ data.tanki }}</span>
                        </div>
                    </template>
                </Column>
                <Column field="lokasi" sortable headerStyle="background-color: #196f3d;" style="background-color: black; color: white">
                    <template #header>
                        <span class="flex justify-center items-center w-full text-center text-[0.8vw]">Lokasi</span>
                    </template>
                    <template #body="{ data }">
                        <div class="w-full flex justify-start items-center">
                            <span class="text-[0.6vw]">{{ data.lokasi }}</span>
                        </div>
                    </template>
                </Column>
                <Column field="umur" sortable headerStyle="background-color: #196f3d;" style="background-color: black; color: white">
                    <template #header>
                        <span class="flex justify-center items-center w-full text-center text-[0.8vw]">Umur</span>
                    </template>
                    <template #body="{ data }">
                        <div class="w-full flex justify-end items-center">
                            <span class="text-[0.6vw]">{{ data.umur }}</span>
                        </div>
                    </template>
                </Column>
                <Column field="kapasitas" sortable headerStyle="background-color: #196f3d;" style="background-color: black; color: white">
                    <template #header>
                        <span class="flex justify-center items-center w-full text-center text-[0.8vw]">Kapasitas (Ton)</span>
                    </template>
                    <template #body="{ data }">
                        <div class="w-full flex justify-end items-center">
                            <span class="text-[0.6vw]">{{ data.kapasitas }}</span>
                        </div>
                    </template>
                </Column>
                <Column field="space" sortable headerStyle="background-color: #196f3d;" style="background-color: black; color: white">
                    <template #header>
                        <span class="flex justify-center items-center w-full text-center text-[0.8vw]">Space (Ton)</span>
                    </template>
                    <template #body="{ data }">
                        <div class="w-full flex justify-end items-center">
                            <span class="text-[0.6vw]">{{ data.space }}</span>
                        </div>
                    </template>
                </Column>
                <Column field="qty" sortable headerStyle="background-color: #196f3d;" style="background-color: black; color: white">
                    <template #header>
                        <span class="flex justify-center items-center w-full text-center text-[0.8vw]">Quantity (Ton)</span>
                    </template>
                    <template #body="{ data }">
                        <div class="w-full flex justify-end items-center">
                            <span class="text-[0.6vw]">{{ data.qty }}</span>
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>
