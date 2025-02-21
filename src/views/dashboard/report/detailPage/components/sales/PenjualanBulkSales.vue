<script setup>
// import { formatCurrency } from '@/controller/dummyController';
import { formatCurrency } from '@/controller/dummyController';
import { defineProps, onMounted, ref, watch } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

const props = defineProps({
    datas: {
        type: Object,
        default: () => {}
    }
});

const total = ref({
    percentageQtyToTargetKategori: 0,
    totalQtyKategori: 0,
    totalQtyTargetKategori: 0,
    totalValueKategori: 0
});

const bgColorMaps = ref('#00274D');

const isLoading = ref(true);
const cashBalanceThisYear = ref([]);
const cashBalanceLastYear = ref([]);
const listPackaging = ref([]);
const listChartPackaging = ref([]);

const worldChartData = ref([
    ['Country', 'Quantity (MT)']
    // ['Indonesia', 1200],
    // ['Thailand', 1600],
    // ['Singapore', 1300],
    // ['Russia', 1400],
    // ['Oman', 1600],
    // ['New Zealand', 1100],
    // ['China', 1500],
    // ['Laos', 1450]
]);

const worldChartOptions = ref({
    region: 'world',
    displayMode: 'auto',
    backgroundColor: { fill: bgColorMaps },
    datalessRegionColor: '#7b7d7d',
    colorAxis: {
        colors: ['#1dd1a1', '#feca57', '#ff6b6b'],
        format: '0 MT' // Menambahkan label "MT" pada legenda
    },
    width: '100%',
    height: 500
});

let worldChartInstance = null;

onMounted(() => {
    loadData();
});

const loadData = async () => {
    try {
        const response = props.datas;
        // console.log(response);
        if (response != null) {
            listPackaging.value = response.data;
            const responseTotal = response.total;
            total.value = {
                percentageQtyToTargetKategori: responseTotal.percentageQtyToTargetKategori,
                totalQtyKategori: responseTotal.totalQtyKategori,
                totalQtyTargetKategori: responseTotal.totalQtyTargetKategori,
                totalValueKategori: responseTotal.totalValueKategori
            };
            const lokasi = response.lokasi;
            if (lokasi.length > 0) {
                const list = [['Country', 'Quantity (MT)']];
                for (let i = 0; i < lokasi.length; i++) {
                    list.push([lokasi[i].negara, lokasi[i].qty]);
                }
                worldChartData.value = list;
            }
        }
        geoChart();
    } catch (error) {
        // console.error('Error loading data:', error);
        listPackaging.value = [];
        total.value = {
            percentageQtyToTargetKategori: 0,
            totalQtyKategori: 0,
            totalQtyTargetKategori: 0,
            totalValueKategori: 0
        };
        geoChart();
    } finally {
        isLoading.value = false; // Turn off the loading state after the data has loaded
    }
};

const geoChart = async () => {
    if (typeof google === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://www.gstatic.com/charts/loader.js';
        script.onload = () => {
            google.charts.load('current', { packages: ['geochart'] });
            google.charts.setOnLoadCallback(drawCharts);
        };
        document.head.appendChild(script);
    } else {
        google.charts.load('current', { packages: ['geochart'] });
        google.charts.setOnLoadCallback(drawCharts);
    }
};

const drawCharts = () => {
    if (google && google.visualization) {
        // Draw World Map
        const worldData = google.visualization.arrayToDataTable(worldChartData.value);
        worldChartInstance = new google.visualization.GeoChart(document.getElementById('geo-chart-world'));
        worldChartInstance.draw(worldData, worldChartOptions.value);

        // // Draw Indonesia Map
        // const indonesiaData = google.visualization.arrayToDataTable(indonesiaChartData.value);
        // indonesiaChartInstance = new google.visualization.GeoChart(document.getElementById('geo-chart-indonesia'));
        // indonesiaChartInstance.draw(indonesiaData, indonesiaChartOptions.value);
    } else {
        console.error('Google Visualization API not loaded yet!');
    }
};

watch(() => props.datas, loadData, { immediate: true });
</script>

<template>
    <div class="flex flex-col w-full items-center gap-4">
        <!-- Chart Title -->
        <span class="text-[1.3vw] font-bold uppercase">
            <!-- {{ listdata.name || 'Loading...' }} -->
            Laporan Penjualan Bulk (dlm MT)
        </span>

        <!-- Loading Indicator -->
        <div v-if="isLoading" class="flex justify-center items-center w-full h-[380px]">
            <span>Loading chart...</span>
        </div>

        <div v-else class="w-full flex flex-col gap-4">
            <Divider />
            <div class="grid grid-cols-4 gap-3">
                <div class="col-span-3 p-2 rounded-xl border-black border-4 flex justify-center" :style="`background-color:${bgColorMaps}`">
                    <div id="geo-chart-world" style="width: 80%; height: 100%; cursor: pointer; border-radius: 25px"></div>
                </div>
                <div class="p-2 rounded-xl bg-black flex justify-center">
                    <span class="font-bold text-xl">Detail Penjualan</span>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-8">
                <div class="col-span-2 flex items-center gap-3 bg-black rounded-xl py-6 px-8">
                    <div class="flex flex-col items-end w-full font-bold p-4">
                        <span class="text-[3.6vw] text-cyan-500">{{ formatCurrency(Number(total.percentageQtyToTargetKategori).toFixed(2)) }}%</span>
                        <span class="text-[0.9vw] text-cyan-700">Total Persentase Pencapaian</span>
                    </div>
                    <div class="flex flex-col items-end w-full font-bold p-4 text-amber-500">
                        <span class="text-[3.6vw] text-amber-500">{{ formatCurrency(Number(total.totalQtyTargetKategori).toFixed(2)) }}</span>
                        <span class="text-[0.9vw] text-amber-700">Total RKAP Bulk</span>
                    </div>
                    <div class="flex flex-col gap-2 w-full">
                        <div class="flex flex-col items-end w-full font-bold p-4">
                            <span class="text-[1.6vw] text-slate-300">{{ formatCurrency(Number(total.totalQtyKategori).toFixed(2)) }}</span>
                            <span class="text-[0.8vw] text-slate-500">Total Jumlah Penjualan</span>
                        </div>
                        <div class="flex flex-col items-end w-full font-bold p-4">
                            <span class="text-[1.6vw] text-emerald-500">{{ formatCurrency(Number(total.totalValueKategori).toFixed(2)) }}</span>
                            <span class="text-[0.8vw] text-emerald-700">Total Nilai Penjualan (IDR)</span>
                        </div>
                    </div>
                </div>
                <div v-if="listPackaging.length > 0" class="w-full flex flex-col gap-3 py-6 px-8 bg-black rounded-xl" v-for="(item, index) in listPackaging" :key="index">
                    <span class="text-[1.5vw] w-full text-center text-cyan-500 font-bold">{{ item.name }}</span>
                    <div class="grid grid-cols-2 items-center w-full gap-3">
                        <div class="flex flex-col justify-center items-center p-5">
                            <VueApexCharts :series="item.series" :options="item.chartData" height="200vw" class="w-auto" style="z-index: 1 !important" />
                            <span class="font-bold" style="font-size: 0.8vw">Pencapaian</span>
                        </div>
                        <div class="grid grid-cols-2 gap-2">
                            <div class="flex flex-col items-end font-bold p-2 rounded-lg bg-amber-700">
                                <span class="text-[1vw]">{{ formatCurrency(Number(item.rkap).toFixed(2)) }}</span>
                                <span class="text-[0.8vw]">RKAP</span>
                            </div>
                            <div class="flex flex-col items-end font-bold p-2 rounded-lg bg-teal-700">
                                <span class="text-[1vw]">{{ formatCurrency(Number(item.qty).toFixed(2)) }}</span>
                                <span class="text-[0.8vw]">Realisasi</span>
                            </div>
                            <div class="flex flex-col items-end font-bold p-2 rounded-lg bg-pink-700">
                                <span class="text-[1vw]">{{ formatCurrency(Number(item.hargaSatuan).toFixed(2)) }}</span>
                                <span class="text-[0.8vw]">Harga Satuan (IDR)</span>
                            </div>
                            <div class="flex flex-col items-end font-bold p-2 rounded-lg bg-cyan-700">
                                <span class="text-[1vw]">{{ formatCurrency(Number(item.total).toFixed(2)) }}</span>
                                <span class="text-[0.8vw]">Total (IDR)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
