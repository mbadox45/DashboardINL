<script setup>
import { onMounted, ref } from 'vue';

const chartData = ref([
    ['Province', 'Popularity', { role: 'tooltip' }],
    ['ID-JK', 200, 'Jakarta'], // Jakarta
    ['ID-YO', 300, 'Yogyakarta'], // Yogyakarta
    ['ID-BT', 400, 'Banten'], // Banten
    ['ID-SN', 500, 'South Sumatra'], // South Sumatra
    ['ID-JT', 600, 'Central Java'], // Central Java
    ['ID-AC', 700, 'Aceh'] // Aceh
]);

const chartOptions = ref({
    region: 'ID', // Country code for Indonesia
    displayMode: 'markers', // Display the provinces as markers
    colorAxis: { colors: ['#e0f7fa', '#00796b'] }, // Color scale
    sizeAxis: { minValue: 0, maxValue: 700 }, // Adjust the size scale
    tooltip: { trigger: 'selection' } // Show tooltips when hovering over markers
});

// Load Google Charts
onMounted(() => {
    // Dynamically load Google Charts library if not already loaded
    if (typeof google === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://www.gstatic.com/charts/loader.js'; // Correct URL for Google Charts
        script.onload = () => {
            // Once the script is loaded, load the GeoChart package
            google.charts.load('current', {
                packages: ['geochart']
            });

            // Now that Google Charts is loaded, set the callback to draw the chart
            google.charts.setOnLoadCallback(drawChart);
        };
        document.head.appendChild(script);
    } else {
        console.log('Google Visualization is already loaded');
        google.charts.load('current', {
            packages: ['geochart']
        });
        google.charts.setOnLoadCallback(drawChart); // Call drawChart if already loaded
    }
});

// Function to draw the chart
const drawChart = () => {
    // Ensure google.visualization is available
    if (google && google.visualization) {
        const data = google.visualization.arrayToDataTable(chartData.value);
        const options = chartOptions.value;

        // Render the GeoChart
        const chart = new google.visualization.GeoChart(document.getElementById('geo-chart'));
        chart.draw(data, options);
    } else {
        console.error('Google Visualization API not loaded yet!');
    }
};
</script>

<template>
    <div class="flex flex-col gap-3 w-full h-screen items-center justify-center p-3">
        <h2>Peta Wilayah Provinsi di Indonesia</h2>
        <!-- Create a div for the Google GeoChart -->
        <div id="geo-chart" style="width: 100%; height: 600px"></div>
    </div>
</template>

<style>
h2 {
    text-align: center;
    margin-bottom: 20px;
}
</style>
