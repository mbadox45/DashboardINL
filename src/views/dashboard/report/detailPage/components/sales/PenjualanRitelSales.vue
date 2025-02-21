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

const indonesiaChartData = ref([['Provinsi', 'Region', 'Quantity (Box)']]);
const listTable = ref([]);

const indonesiaChartOptions = ref({
    region: 'ID', // Fokus ke Indonesia
    resolution: 'provinces', // Menampilkan provinsi
    displayMode: 'auto',
    colorAxis: { colors: ['#1dd1a1', '#feca57', '#ff6b6b'] },
    backgroundColor: { fill: bgColorMaps },
    datalessRegionColor: '#7b7d7d',
    width: '100%',
    height: 520
});

let indonesiaChartInstance = null;

onMounted(() => {
    loadData();
});

const loadData = async () => {
    try {
        await geoChart();
        const response = props.datas;
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
            let list = [['Provinsi', 'Quantity (Box)']];

            // const list = [['Provinsi', 'Region', 'Quantity (Box)']];
            if (lokasi.length > 0) {
                list = [['Provinsi', 'Region', 'Quantity (Box)']];
                const datatabel = [];
                const negara = lokasi.find((item) => item.code == 'ID');
                if (negara != null) {
                    const provinsi = negara.provinsi;
                    for (let i = 0; i < provinsi.length; i++) {
                        list.push([provinsi[i].code, provinsi[i].provinsi, provinsi[i].qty]);
                        datatabel.push({
                            country: provinsi[i].provinsi,
                            code: provinsi[i].code.toLowerCase(),
                            qty: formatCurrency(Number(provinsi[i].qty).toFixed(2)),
                            value: valueToBilion(provinsi[i].value)
                        });
                    }
                }
                listTable.value = datatabel;
            }
            indonesiaChartData.value = list;
        }
    } catch (error) {
        console.error('Error loading data:', error);
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

// const drawCharts = () => {
//     if (google && google.visualization) {
//         // Draw Indonesia Map
//         const indonesiaData = google.visualization.arrayToDataTable(indonesiaChartData.value);
//         indonesiaChartInstance = new google.visualization.GeoChart(document.getElementById('geo-chart-indonesia'));
//         indonesiaChartInstance.draw(indonesiaData, indonesiaChartOptions.value);
//     } else {
//         console.error('Google Visualization API not loaded yet!');
//     }
// };

const drawCharts = () => {
    if (!google || !google.visualization) {
        console.error('Google Visualization API not loaded yet!');
        return;
    }

    const indonesiaData = google.visualization.arrayToDataTable(indonesiaChartData.value);
    indonesiaChartInstance = new google.visualization.GeoChart(document.getElementById('geo-chart-indonesia'));

    // Debugging: Cek apakah elemen grafik ada
    if (!document.getElementById('geo-chart-indonesia')) {
        console.error('Element geo-chart-indonesia tidak ditemukan!');
        return;
    }

    google.visualization.events.addListener(indonesiaChartInstance, 'regionClick', (event) => {
        const clickedRegion = event.region; // Kode negara (ISO-3166)

        if (indonesiaChartOptions.value.region === clickedRegion) {
            // Jika negara yang sama diklik dua kali, reset ke tampilan dunia
            indonesiaChartOptions.value.region = 'ID';
            indonesiaChartOptions.value.resolution = 'region';
        } else {
            // Zoom in ke negara yang diklik
            indonesiaChartOptions.value.region = 'ID';
            indonesiaChartOptions.value.resolution = 'provinces'; // Ubah resolusi ke level provinsi
        }

        setTimeout(() => drawCharts(), 200); // Beri jeda agar animasi lebih smooth
    });

    // google.visualization.events.addListener(indonesiaChartInstance, 'regionClick', (event) => {
    //     console.log('Clicked region:', event.region); // Debugging sementara

    //     if (event.region && event.region.startsWith('ID-')) {
    //         // Pastikan perubahan reaktif diperbarui dengan Vue
    //         indonesiaChartOptions.value = { ...indonesiaChartOptions.value, region: event.region };
    //     } else {
    //         indonesiaChartOptions.value = { ...indonesiaChartOptions.value, region: 'ID' };
    //     }

    //     // Redraw chart dengan opsi terbaru
    //     indonesiaChartInstance.draw(indonesiaData, indonesiaChartOptions.value);
    // });

    // Gambar chart pertama kali
    indonesiaChartInstance.draw(indonesiaData, indonesiaChartOptions.value);
};

watch(() => props.datas, loadData, { immediate: true });
</script>

<template>
    <div class="flex flex-col w-full items-center gap-4">
        <!-- Chart Title -->
        <span class="text-[1.5vw] font-bold uppercase">
            <!-- {{ listdata.name || 'Loading...' }} -->
            Laporan Penjualan Ritel (dlm Box)
        </span>

        <!-- Loading Indicator -->
        <div v-if="isLoading" class="flex justify-center items-center w-full h-[380px]">
            <span>Loading chart...</span>
        </div>

        <div v-else class="w-full flex flex-col gap-4">
            <Divider />
            <div class="grid grid-cols-4 gap-3">
                <div class="col-span-3 p-2 rounded-xl border-black border-4 flex justify-center" :style="`background-color:${bgColorMaps}`">
                    <div id="geo-chart-indonesia" style="width: 80%; height: 100%; cursor: pointer; border-radius: 25px"></div>
                </div>
                <div class="p-5 rounded-xl bg-black flex flex-col gap-5 w-full items-center">
                    <span class="font-bold text-xl">Detail Penjualan</span>
                    <div class="w-full max-h-[430px] overflow-y-auto p-3">
                        <DataView :value="listTable" class="w-full">
                            <template #list="slotProps">
                                <div class="flex flex-col gap-3 bg-black text-white w-full">
                                    <div v-for="(item, index) in slotProps.items" :key="index" class="flex items-center justify-between gap-5 w-full rounded-lg bg-slate-900 p-4">
                                        <div class="flex flex-col w-full">
                                            <span class="font-bold text-[0.7vw]">{{ item.country }}</span>
                                        </div>
                                        <div class="flex flex-col w-full items-end">
                                            <span class="text-[0.8vw] font-bold">{{ item.qty }}</span>
                                            <span class="text-[0.5vw] text-right">Jumlah (Box)</span>
                                        </div>
                                        <div class="flex flex-col w-full items-end">
                                            <div class="flex gap-2 justify-between items-center">
                                                <span class="text-[0.8vw] font-bold">Rp</span>
                                                <span class="text-[0.8vw] font-bold">{{ item.value }}</span>
                                            </div>
                                            <span class="text-[0.5vw] text-right">Nilai Penjualan (Miliar)</span>
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
                        <span class="text-[0.9vw]">Total Persentase Pencapaian</span>
                    </div>
                    <div class="flex flex-col items-end w-full font-bold p-4 text-amber-500">
                        <span class="text-[3.6vw] text-green-500">{{ formatCurrency(Number(total.totalQtyTargetKategori).toFixed(2)) }}</span>
                        <span class="text-[0.9vw] text-green-700">Total RKAP Ritel</span>
                    </div>
                    <div class="flex flex-col gap-2 w-full">
                        <div class="flex flex-col items-end w-full font-bold p-4">
                            <span class="text-[1.6vw] text-slate-300">{{ formatCurrency(Number(total.totalQtyKategori).toFixed(2)) }}</span>
                            <span class="text-[0.8vw] text-slate-500">Total Jumlah Penjualan</span>
                        </div>
                        <div class="flex flex-col items-end w-full font-bold p-4">
                            <span class="text-[1.6vw] text-slate-300">{{ formatCurrency(Number(total.totalValueKategori).toFixed(2)) }}</span>
                            <span class="text-[0.8vw] text-slate-500">Total Nilai Penjualan</span>
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
