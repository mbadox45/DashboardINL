<script setup>
import { onMounted, ref } from 'vue';

const worldChartData = ref([
    ['Country', 'Quantity (MT)'],
    ['Indonesia', 1200],
    ['Thailand', 1600],
    ['Singapore', 1300],
    ['Russia', 1400],
    ['Oman', 1600],
    ['New Zealand', 1100],
    ['China', 1500],
    ['Laos', 1450]
]);

const indonesiaChartData = ref([
    ['Province', 'Sales'],
    ['ID-JK', 200], // DKI Jakarta
    ['ID-BT', 150], // Banten
    ['ID-YO', 100], // Yogyakarta
    ['ID-JI', 180], // Jawa Timur
    ['ID-JB', 250] // Jawa Barat
]);

const worldChartOptions = ref({
    region: 'world',
    displayMode: 'auto',
    backgroundColor: { fill: '#0F172A' },
    datalessRegionColor: '#7b7d7d',
    colorAxis: {
        colors: ['#1dd1a1', '#feca57', '#ff6b6b'],
        format: '0 MT' // Menambahkan label "MT" pada legenda
    },
    width: '100%',
    height: 700
});

const indonesiaChartOptions = ref({
    region: 'ID', // Fokus ke Indonesia
    resolution: 'provinces', // Menampilkan provinsi
    displayMode: 'regions',
    colorAxis: { colors: ['#1dd1a1', '#feca57', '#ff6b6b'] },
    backgroundColor: { fill: '#0F172A' },
    datalessRegionColor: '#7b7d7d',
    width: '100%',
    height: 700
});

let worldChartInstance = null;
let indonesiaChartInstance = null;

// Load Google Charts
onMounted(() => {
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
});

// Function to draw both charts
const drawCharts = () => {
    if (google && google.visualization) {
        // Draw World Map
        const worldData = google.visualization.arrayToDataTable(worldChartData.value);
        worldChartInstance = new google.visualization.GeoChart(document.getElementById('geo-chart-world'));
        worldChartInstance.draw(worldData, worldChartOptions.value);

        // Draw Indonesia Map
        const indonesiaData = google.visualization.arrayToDataTable(indonesiaChartData.value);
        indonesiaChartInstance = new google.visualization.GeoChart(document.getElementById('geo-chart-indonesia'));
        indonesiaChartInstance.draw(indonesiaData, indonesiaChartOptions.value);
    } else {
        console.error('Google Visualization API not loaded yet!');
    }
};
</script>

<template>
    <div class="flex flex-col gap-3 w-full h-screen items-center justify-center p-3 bg-slate-900 text-white">
        <span class="font-bold text-3xl">Peta Penjualan</span>
        <div class="grid grid-cols-2 w-full gap-3">
            <div class="flex flex-col relative items-center w-full p-3 rounded-xl border-4 border-amber-400">
                <span class="font-bold absolute z-20 text-xl mb-2">Penjualan Bulky</span>
                <div id="geo-chart-world" style="width: 90%; height: 700px; cursor: pointer"></div>
                <!-- <div class="legend-container">
                    <span style="color: #1dd1a1">100 MT</span>
                    <span style="color: #feca57">300 MT</span>
                    <span style="color: #ff6b6b">600 MT</span>
                </div> -->
            </div>
            <div class="flex flex-col relative items-center w-full p-3 rounded-xl border-4 border-amber-400">
                <span class="font-bold absolute z-20 text-xl mb-2">Penjualan Ritel di Indonesia</span>
                <div id="geo-chart-indonesia" style="width: 90%; height: 700px; cursor: pointer"></div>
            </div>
        </div>
    </div>
</template>

<style>
.legend-container {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 10px;
    font-weight: bold;
}
</style>

<!-- // ['Province', 'Popularity', { role: 'tooltip', p: { html: true } }],
// ['ID-JK', 200, '<div style="padding:5px"><b>Jakarta</b><br>Popularity: 200</div>'],
// ['ID-JK', 600, '<div style="padding:5px"><b>DKI Jakarta</b><br>Popularity: 600</div>'],
// ['ID-YO', 300, '<div style="padding:5px"><b>Yogyakarta</b><br>Popularity: 300</div>'],
// ['ID-BT', 400, '<div style="padding:5px"><b>Banten</b><br>Popularity: 400</div>']
]);

const chartOptions = ref({
region: 'world',
// region: 'ID',
// resolution: 'provinces', -->
