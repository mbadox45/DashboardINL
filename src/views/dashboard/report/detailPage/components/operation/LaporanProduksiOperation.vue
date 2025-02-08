<script setup>
// import { bulkySalesChart, cashFlowData } from '@/controller/report/OperationReport';
import { formatCurrency } from '@/controller/dummyController';
import { defineProps, onMounted, ref, watch } from 'vue';
// import VueApexCharts from 'vue3-apexcharts';

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
        listdata.value = {
            name: 'Laporan Produksi'
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
            <div class="grid grid-cols-3 gap-4 w-full">
                <div class="flex flex-col gap-3 p-9 bg-black rounded-xl" v-for="(item, index) in listTable" :key="index">
                    <span class="text-[0.9vw]">{{ item.name }}</span>
                    <DataTable :value="item.data" showGridlines removableSort class="w-full rounded-xl" tableStyle="background-color:#00000;">
                        <Column field="name" sortable headerStyle="background-color: #196f3d;" style="background-color: black; color: white">
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center text-[0.8vw]">Uraian</span>
                            </template>
                            <template #body="{ data }">
                                <div class="w-full flex justify-start items-center">
                                    <span class="text-[0.6vw]">{{ data.name }}</span>
                                </div>
                            </template>
                        </Column>
                        <Column field="totalQty" sortable headerStyle="background-color: #196f3d;" style="background-color: black; color: white">
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center text-[0.8vw]">Quantity</span>
                            </template>
                            <template #body="{ data }">
                                <div class="w-full flex justify-end items-center">
                                    <span class="text-[0.6vw]" v-if="data.name.includes('Hari Olah')">{{ formatCurrency(Number(data.totalQty).toFixed(0)) }} Hari</span>
                                    <span class="text-[0.6vw]" v-else>{{ formatCurrency(Number(data.totalQty).toFixed(2)) }} Kg</span>
                                </div>
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </div>
        </div>
    </div>
</template>
