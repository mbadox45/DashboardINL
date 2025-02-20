<script setup>
import { onMounted, ref } from 'vue';

const chartData = ref([
    ['Province', 'Popularity', { role: 'tooltip', p: { html: true } }],
    ['ID-JK', 200, '<div style="padding:5px"><b>Jakarta</b><br>Popularity: 200</div>'],
    ['ID-YO', 300, '<b>Yogyakarta</b><br>300'],
    ['ID-BT', 400, '<b>Banten</b><br>400'],
    ['ID-SS', 500, '<b>Sumatera Selatan</b><br>500'],
    ['ID-JT', 600, '<b>Jawa Tengah</b><br>600'],
    ['ID-AC', 700, '<b>Aceh</b><br>700']
]);

const chartOptions = ref({
    region: 'ID',
    resolution: 'provinces',
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
    <div class="flex flex-col gap-3 w-full h-screen items-center justify-center p-3">
        <h2>Peta Wilayah Provinsi di Indonesia</h2>
        <div id="geo-chart" style="width: 100%; height: 600px"></div>
    </div>
</template>

<style>
h2 {
    text-align: center;
    margin-bottom: 20px;
}
</style>
