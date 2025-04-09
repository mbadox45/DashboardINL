<script setup>
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

const listTable = ref(null);
const totalQty = ref(0);
const totalValue = ref(0);
const isLoading = ref(true);

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
            totalQty.value = response.totalQty;
            totalValue.value = response.totalValue;
        }
    } catch (error) {
        console.error('Error loading data:', error);
    } finally {
        isLoading.value = false;
    }
};

watch(() => props.datas, loadData, { immediate: true });
</script>

<template>
    <div class="flex flex-col w-full items-center gap-3 pb-10">
        <span class="text-[1vw] font-bold uppercase"> Top 15 Outstanding CPO </span>
        <div v-if="isLoading" class="flex justify-center items-center w-full h-[380px]">
            <span>Loading chart...</span>
        </div>

        <div v-else class="w-full flex flex-col gap-4">
            <VueApexCharts v-if="listTable != null" :series="listTable.series" :options="listTable.chart" height="760vw" class="w-auto mt-5" style="z-index: 1 !important" />
            <Divider />
            <div class="flex flex-row justify-end px-3 text-sm text-white font-semibold gap-x-8">
                <div class="flex items-center gap-1">
                    <span class="text-[0.7vw]">Total Quantity (Kg):</span>
                    <span class="text-[1vw] text-amber-400">{{ totalQty }}</span>
                </div>
                <div class="flex items-center gap-1">
                    <span class="text-[0.7vw]">Total Value (Rp):</span>
                    <span class="text-[1vw] text-amber-400">{{ totalValue }}</span>
                </div>
            </div>
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
                        <span class="flex justify-center items-center w-full text-center text-[0.8vw]">Harga (Rp/Kg)</span>
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
                        <span class="flex justify-center items-center w-full text-center text-[0.8vw]">Nilai (Rp)</span>
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
