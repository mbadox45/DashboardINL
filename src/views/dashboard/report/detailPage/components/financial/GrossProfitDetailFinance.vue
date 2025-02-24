<script setup>
import { formatCurrency } from '@/controller/dummyController';
import moment from 'moment';
import { defineProps, onMounted, ref, watch } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

const isLoading = ref(true);
const listTable = ref([]);
const listChart = ref([]);
const listLatest = ref({
    chart: null,
    series: [],
    targetLabaKotorRkap: formatCurrency(Number(0).toFixed(2)),
    labaKotor: formatCurrency(Number(0).toFixed(2))
});

const formData = JSON.parse(localStorage.getItem('formData'));
const tanggalTerakhir = ref(formData == null ? moment().format('MMMM YYYY') : moment(formData.now).format('MMMM YYYY'));

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
        // console.log(response);

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
            const latest = response.latest;
            console.log(latest);
            listLatest.value = {
                chart: latest.chart,
                series: latest.series,
                targetLabaKotorRkap: formatCurrency(Number(latest.targetLabaKotorRkap).toFixed(2)),
                labaKotor: formatCurrency(Number(latest.labaKotor).toFixed(2))
            };
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
        <span class="text-[1vw] font-bold"> Gross Profit Margin (IDR Miliar) </span>

        <!-- Loading Indicator -->
        <div v-if="isLoading == true" class="flex justify-center items-center w-full h-[380px]">
            <span>Loading chart...</span>
        </div>

        <div v-else class="w-full flex flex-col gap-4">
            <div class="grid grid-cols-2 items-center justify-between gap-5">
                <div class="flex flex-col w-full">
                    <VueApexCharts v-if="listLatest.series.length > 0" :series="listLatest.series" :options="listLatest.chart" class="w-full" height="400vw" style="z-index: 1 !important" />
                    <span class="w-full text-center text-[1vw] font-bold uppercase">Target RKAP</span>
                </div>
                <div class="w-full flex item-center gap-3">
                    <div class="flex flex-col items-end w-full bg-pink-300 p-3 rounded-lg">
                        <span class="text-pink-600 text-[2vw] font-bold">{{ listLatest.labaKotor }}</span>
                        <span class="text-pink-700">Laba Kotor {{ tanggalTerakhir }}</span>
                    </div>
                    <div class="flex flex-col items-end w-full bg-amber-200 p-3 rounded-lg">
                        <span class="text-amber-600 text-[2vw] font-bold">{{ listLatest.targetLabaKotorRkap }}</span>
                        <span class="text-amber-700">Target RKAP {{ tanggalTerakhir }}</span>
                    </div>
                </div>
            </div>
            <Divider />
            <!-- Vue Apex Chart -->
            <div class="w-full grid grid-cols-2 gap-16">
                <VueApexCharts v-for="(item, index) in listChart" :key="index" :type="item.type" :series="item.series" :options="item.options" class="w-full" height="400vw" style="z-index: 1 !important" />
            </div>

            <div class="flex gap-20">
                <div class="w-full flex flex-col gap-2" v-for="(item, index) in listTable" :key="index">
                    <span class="text-lg font-semibold" :style="`color: ${item.color};`">Gross Profit Margin Tahun {{ item.year }}</span>
                    <DataTable :value="item.data" showGridlines removableSort tableStyle="background-color:#00000;">
                        <Column field="periode" sortable :headerStyle="`background-color: ${item.color};`" style="background-color: black; color: white">
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center">Periode</span>
                            </template>
                        </Column>
                        <Column field="labakotor" sortable :headerStyle="`background-color: ${item.color};`" style="background-color: black; color: white">
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center">Laba Kotor (IDR Miliar)</span>
                            </template>
                        </Column>
                        <Column field="gpm" sortable :headerStyle="`background-color: ${item.color};`" style="background-color: black; color: white">
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center">GPM (%)</span>
                            </template>
                            <template #body="{ data }">
                                <div class="w-full flex justify-center items-center">
                                    <span>{{ data.gpm }}%</span>
                                </div>
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </div>
        </div>
    </div>
</template>
