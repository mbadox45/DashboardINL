<script setup>
import { defineProps, onMounted, ref, watch } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

const isLoading = ref(true);
const listTable = ref([]);
const listChart = ref([]);

const props = defineProps({
    datas: {
        type: Object,
        default: () => {}
    }
});

onMounted(() => {
    loadData();
});

const loadData = async () => {
    try {
        const response = props.datas || null;
        console.log(response);

        if (response != null) {
            const chart = response.chart || [];
            const list = [];
            if (chart.length > 0) {
                for (let i = 0; i < chart.length; i++) {
                    list.push({
                        type: chart[i].type || 'line',
                        series: chart[i].series || [],
                        options: chart[i].chartOptions || {},
                        name: chart[i].name || 'Gross Profit Margin (in IDR Bn)'
                    });
                }
            }
            listChart.value = list;
            listTable.value = response.table;
        }
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

watch(() => props.datas, loadData, { immediate: true });
</script>

<template>
    <div class="flex flex-col w-full items-center gap-4">
        <!-- Chart Title -->
        <span class="text-[1vw] font-bold"> Pergerakan Arus Kas (dlm IDR Miliar) </span>

        <!-- Loading Indicator -->
        <div v-if="isLoading == true" class="flex justify-center items-center w-full h-[380px]">
            <span>Loading chart...</span>
        </div>

        <div v-else class="w-full flex flex-col gap-4">
            <!-- Vue Apex Chart -->
            <div class="w-full flex gap-16">
                <VueApexCharts v-for="(item, index) in listChart" :key="index" :type="item.type" :series="item.series" :options="item.options" class="w-full" height="400vw" style="z-index: 1 !important" />
            </div>

            <div class="flex gap-20">
                <div class="w-full flex flex-col gap-2" v-for="(item, index) in listTable" :key="index">
                    <span class="text-lg font-semibold" :style="`color: ${item.color};`">Cash Flow Movement Tahun {{ item.year }}</span>
                    <DataTable :value="item.data" showGridlines removableSort tableStyle="background-color:#00000;">
                        <Column field="periode" sortable :headerStyle="`background-color: ${item.color};`" style="background-color: black; color: white">
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center">Periode</span>
                            </template>
                        </Column>
                        <Column field="cfoIn" sortable :headerStyle="`background-color: ${item.color};`" style="background-color: black; color: white">
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center">CFO In</span>
                            </template>
                            <template #body="{ data }">
                                <div class="w-full flex justify-center items-center">
                                    <span>{{ data.cfoIn }}</span>
                                </div>
                            </template>
                        </Column>
                        <Column field="cfoOut" sortable :headerStyle="`background-color: ${item.color};`" style="background-color: black; color: white">
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center">CFO Out</span>
                            </template>
                            <template #body="{ data }">
                                <div class="w-full flex justify-center items-center">
                                    <span>{{ data.cfoOut }}</span>
                                </div>
                            </template>
                        </Column>
                        <Column field="cff" sortable :headerStyle="`background-color: ${item.color};`" style="background-color: black; color: white">
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center">CFF</span>
                            </template>
                            <template #body="{ data }">
                                <div class="w-full flex justify-center items-center">
                                    <span>{{ data.cff }}</span>
                                </div>
                            </template>
                        </Column>
                        <Column field="cfi" sortable :headerStyle="`background-color: ${item.color};`" style="background-color: black; color: white">
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center">CFI</span>
                            </template>
                            <template #body="{ data }">
                                <div class="w-full flex justify-center items-center">
                                    <span>{{ data.cfi }}</span>
                                </div>
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </div>
        </div>
    </div>
</template>
