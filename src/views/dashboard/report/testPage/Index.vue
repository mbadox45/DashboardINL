<script setup>
import { onMounted, ref } from 'vue';

const chartData = ref([
    ['Country', 'Popularity'],
    ['ID', 200],
    ['TH', 600],
    ['SG', 300],
    ['RU', 400]
    // ['Province', 'Popularity', { role: 'tooltip', p: { html: true } }],
    // ['ID-JK', 200, '<div style="padding:5px"><b>Jakarta</b><br>Popularity: 200</div>'],
    // ['ID-JK', 600, '<div style="padding:5px"><b>DKI Jakarta</b><br>Popularity: 600</div>'],
    // ['ID-YO', 300, '<div style="padding:5px"><b>Yogyakarta</b><br>Popularity: 300</div>'],
    // ['ID-BT', 400, '<div style="padding:5px"><b>Banten</b><br>Popularity: 400</div>']
]);

const chartOptions = ref({
    region: 'world',
    // region: 'ID',
    // resolution: 'provinces',
    displayMode: 'auto',
    colorAxis: {
        colors: ['#1dd1a1', '#feca57', '#ff6b6b']
    },
    tooltip: {
        isHtml: true
    },
    magnifyingGlass: {
        enable: true,
        zoomFactor: 10
    },
    enableRegionInteractivity: true,
    backgroundColor: {
        fill: '#006994',
        stroke: 'yellow',
        strokeWidth: 20
    },
    datalessRegionColor: '#D3D3D3'
    // sizeAxis: { minValue: 0, maxValue: 700 },
});

// Load Google Charts
onMounted(() => {
    if (typeof google === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://www.gstatic.com/charts/loader.js';
        script.onload = () => {
            google.charts.load('current', { packages: ['geochart'] });
            google.charts.setOnLoadCallback(drawChart);
        };
        document.head.appendChild(script);
    } else {
        google.charts.load('current', { packages: ['geochart'] });
        google.charts.setOnLoadCallback(drawChart);
    }
});

// Function to draw the chart
const drawChart = () => {
    if (google && google.visualization) {
        const data = google.visualization.arrayToDataTable(chartData.value);
        const options = chartOptions.value;

        const chart = new google.visualization.GeoChart(document.getElementById('geo-chart'));

        // Event listener for clicking a province to "zoom in"
        google.visualization.events.addListener(chart, 'regionClick', (event) => {
            // alert(`You clicked on ${event.region}`);
        });

        chart.draw(data, options);
    } else {
        console.error('Google Visualization API not loaded yet!');
    }
};
</script>

<template>
    <div class="flex flex-col gap-3 w-full h-screen items-center justify-center p-3 bg-slate-950 text-white">
        <span class="font-bold text-3xl">Peta Wilayah Provinsi di Indonesia</span>
        <div id="geo-chart" style="width: 100%; height: 600px"></div>
    </div>
</template>

<style>
h2 {
    text-align: center;
    margin-bottom: 20px;
}
</style>
