<script setup>
import { formatCurrency, valueColorPersenCondition, valueToBilion } from '@/controller/dummyController';
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
const listPackaging = ref([]);

const worldChartData = ref([['Country', 'Quantity (MT)']]);
const listTable = ref([]);

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
    height: 520
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
            // console.log(lokasi);
            if (lokasi.length > 0) {
                const list = [['Country', 'Quantity (MT)']];
                const datatabel = [];
                for (let i = 0; i < lokasi.length; i++) {
                    list.push([lokasi[i].negara, lokasi[i].qty]);
                    datatabel.push({
                        country: lokasi[i].negara,
                        code: lokasi[i].code.toLowerCase(),
                        qty: formatCurrency(Number(lokasi[i].qty).toFixed(2)),
                        value: valueToBilion(lokasi[i].value)
                    });
                }
                listTable.value = datatabel;
                worldChartData.value = list;
            }
        }
        await geoChart();
    } catch (error) {
        // console.error('Error loading data:', error);
        listPackaging.value = [];
        total.value = {
            percentageQtyToTargetKategori: 0,
            totalQtyKategori: 0,
            totalQtyTargetKategori: 0,
            totalValueKategori: 0
        };
        await geoChart();
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
        const worldData = google.visualization.arrayToDataTable(worldChartData.value);
        worldChartInstance = new google.visualization.GeoChart(document.getElementById('geo-chart-world'));

        // Tambahkan event listener untuk zoom-in dan zoom-out
        google.visualization.events.addListener(worldChartInstance, 'regionClick', (event) => {
            const clickedRegion = event.region; // Kode negara (ISO-3166)

            if (worldChartOptions.value.region === clickedRegion) {
                // Jika negara yang sama diklik dua kali, reset ke tampilan dunia
                worldChartOptions.value.region = 'world';
                worldChartOptions.value.resolution = 'countries';
            } else {
                // Zoom in ke negara yang diklik
                worldChartOptions.value.region = clickedRegion;
                worldChartOptions.value.resolution = 'region'; // Ubah resolusi ke level provinsi
            }

            setTimeout(() => drawCharts(), 200); // Beri jeda agar animasi lebih smooth
        });

        worldChartInstance.draw(worldData, worldChartOptions.value);
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
                <div class="p-5 rounded-xl bg-black flex flex-col gap-5 w-full items-center">
                    <span class="font-bold text-xl">Detail Penjualan</span>
                    <div class="w-full max-h-[430px] overflow-y-auto p-3">
                        <DataView :value="listTable" class="w-full">
                            <template #list="slotProps">
                                <div class="flex flex-col gap-3 bg-black text-white w-full">
                                    <div v-for="(item, index) in slotProps.items" :key="index" class="flex items-center justify-between gap-2 w-full rounded-lg bg-slate-900 p-4">
                                        <div class="flex flex-col items-center w-1/3 gap-1">
                                            <img :src="`https://flagcdn.com/w80/${item.code.toLowerCase()}.png`" :alt="item.country" />
                                            <span class="font-bold text-[0.6vw]">{{ item.country }}</span>
                                        </div>
                                        <div class="flex w-full gap-3">
                                            <div class="flex flex-col w-full items-end">
                                                <span class="text-[0.8vw] font-bold">{{ item.qty }}</span>
                                                <span class="text-[0.6vw] text-right">Jumlah (MT)</span>
                                            </div>
                                            <div class="flex flex-col w-full items-end">
                                                <div class="flex gap-2 justify-between items-center">
                                                    <span class="text-[0.8vw] font-bold">Rp</span>
                                                    <span class="text-[0.8vw] font-bold">{{ item.value }}</span>
                                                </div>
                                                <span class="text-[0.6vw] text-right">Nilai Penjualan (Miliar)</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </DataView>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-8">
                <div class="col-span-2 flex items-center gap-3 bg-black rounded-xl py-6 px-8">
                    <div class="flex flex-col items-end w-full font-bold p-4">
                        <span class="text-[3.6vw]" :class="valueColorPersenCondition(Number(total.percentageQtyToTargetKategori))">{{ formatCurrency(Number(total.percentageQtyToTargetKategori).toFixed(2)) }}%</span>
                        <span class="text-[0.9vw]">Persentase Pencapaian</span>
                    </div>
                    <div class="flex flex-col items-end w-full font-bold p-4 text-amber-500">
                        <span class="text-[3.6vw] text-green-500">{{ formatCurrency(Number(total.totalQtyTargetKategori).toFixed(2)) }}</span>
                        <span class="text-[0.9vw] text-green-700">Target RKAP Penjualan Bulk (MT)</span>
                    </div>
                    <div class="flex flex-col gap-2 w-full">
                        <div class="flex flex-col items-end w-full font-bold p-4">
                            <span class="text-[1.6vw] text-slate-300">{{ formatCurrency(Number(total.totalQtyKategori).toFixed(2)) }}</span>
                            <span class="text-[0.8vw] text-slate-500">Total Jumlah Penjualan (MT)</span>
                        </div>
                        <div class="flex flex-col items-end w-full font-bold p-4">
                            <span class="text-[1.6vw] text-slate-300">IDR {{ formatCurrency(Number(total.totalValueKategori).toFixed(2)) }}</span>
                            <span class="text-[0.8vw] text-slate-500">Total Nilai Penjualan (IDR)</span>
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
                                <span class="text-[0.8vw]">RKAP (MT)</span>
                            </div>
                            <div class="flex flex-col items-end font-bold p-2 rounded-lg bg-teal-700">
                                <span class="text-[1vw]">{{ formatCurrency(Number(item.qty).toFixed(2)) }}</span>
                                <span class="text-[0.8vw]">Realisasi (MT)</span>
                            </div>
                            <div class="flex flex-col items-end font-bold p-2 rounded-lg bg-pink-700">
                                <span class="text-[1vw]">IDR {{ formatCurrency(Number(item.hargaSatuan).toFixed(2)) }}</span>
                                <span class="text-[0.8vw]">Harga / Kg</span>
                            </div>
                            <div class="flex flex-col items-end font-bold p-2 rounded-lg bg-cyan-700">
                                <span class="text-[1vw]">IDR {{ formatCurrency(Number(item.total).toFixed(2)) }}</span>
                                <span class="text-[0.8vw]">Nilai</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
