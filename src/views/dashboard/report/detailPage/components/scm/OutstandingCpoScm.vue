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
        <span class="text-[1.5vw] font-bold uppercase">
            <!-- {{ listdata.name || 'Loading...' }} -->
            Outstanding CPO
        </span>
        <!-- Loading Indicator -->
        <div v-if="isLoading" class="flex justify-center items-center w-full h-[380px]">
            <span>Loading chart...</span>
        </div>

        <div v-else class="w-full flex flex-col gap-4">
            <VueApexCharts v-if="listTable != null" :series="listTable.series" :options="listTable.chart" height="380vw" class="w-auto mt-5" style="z-index: 1 !important" />
            <Divider />
            <DataTable v-if="listTable != null" :value="listTable.table" showGridlines removableSort class="w-full rounded-xl" tableStyle="background-color:#00000;">
                <Column field="kontrak" sortable headerStyle="background-color: #196f3d;" style="background-color: black; color: white">
                    <template #header>
                        <span class="flex justify-center items-center w-full text-center text-[0.8vw]">Kontrak</span>
                    </template>
                    <template #body="{ data }">
                        <div class="w-full flex justify-start items-center">
                            <span class="text-[0.6vw]">{{ data.kontrak }}</span>
                        </div>
                    </template>
                </Column>
                <Column field="supplier" sortable headerStyle="background-color: #196f3d;" style="background-color: black; color: white">
                    <template #header>
                        <span class="flex justify-center items-center w-full text-center text-[0.8vw]">Supplier</span>
                    </template>
                    <template #body="{ data }">
                        <div class="w-full flex justify-end items-center">
                            <span class="text-[0.6vw]">{{ data.supplier }}</span>
                        </div>
                    </template>
                </Column>
                <Column field="harga" sortable headerStyle="background-color: #196f3d;" style="background-color: black; color: white">
                    <template #header>
                        <span class="flex justify-center items-center w-full text-center text-[0.8vw]">Harga (Rp)</span>
                    </template>
                    <template #body="{ data }">
                        <div class="w-full flex justify-end items-center">
                            <span class="text-[0.6vw]">{{ data.harga }}</span>
                        </div>
                    </template>
                </Column>
                <Column field="qty" sortable headerStyle="background-color: #196f3d;" style="background-color: black; color: white">
                    <template #header>
                        <span class="flex justify-center items-center w-full text-center text-[0.8vw]">Quantity (Kg)</span>
                    </template>
                    <template #body="{ data }">
                        <div class="w-full flex justify-end items-center">
                            <span class="text-[0.6vw]">{{ data.qty }}</span>
                        </div>
                    </template>
                </Column>
                <Column field="value" sortable headerStyle="background-color: #196f3d;" style="background-color: black; color: white">
                    <template #header>
                        <span class="flex justify-center items-center w-full text-center text-[0.8vw]">Total Harga (Rp)</span>
                    </template>
                    <template #body="{ data }">
                        <div class="w-full flex justify-end items-center">
                            <span class="text-[0.6vw]">{{ data.value }}</span>
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>
