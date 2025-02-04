<script setup>
import { barChartOptionsApex } from '@/controller/chartStyle/chartDummy';
import { formatCurrency } from '@/controller/dummyController';
import moment from 'moment';
import { defineProps, onMounted, ref, watch } from 'vue';
import ApexCharts from 'vue3-apexcharts';

const listdata = ref({
    type: null,
    series: [],
    options: {},
    name: null
});

const chartOptions = ref({});
const chartSeries = ref([]);
const listTable = ref([]);
const isLoading = ref(true);
const monthName = ref('');
const yearName = ref('');
const showDialog = ref(false);
const optionView = ref({});
const dataView = ref({
    series: []
});

const props = defineProps({
    datas: {
        type: Array,
        default: () => []
    }
});

onMounted(() => {
    loadData();
});

// Watch untuk memantau perubahan pada props.datas

const loadData = async () => {
    try {
        isLoading.value = true;
        await loadProduct();
    } catch (error) {
        console.error('Error loading data:', error);
    } finally {
        isLoading.value = false; // Set loading state false setelah data dimuat
    }
};

const loadProduct = async () => {
    const response = props.datas;
    const labels = [];
    const dataChart = [];
    const records = [];
    if (response.length > 0) {
        for (let i = 0; i < response.length; i++) {
            labels.push(response[i].name);
            dataChart.push(formatCurrency(Number(response[i].avg).toFixed(2)));
            records.push({
                id: i,
                name: moment(response[i].name, 'MMM YYYY').format('MMMM YYYY'),
                records: response[i].records
            });
        }
        chartOptions.value = {
            chart: {
                background: '#000000',
                foreColor: '#ffffff',
                events: {
                    click: function (event, chartContext, opts) {
                        const index = opts.dataPointIndex;
                        if (index != null && index >= 0) {
                            const loadRecord = records.find((item) => item.id === index);
                            handleChartClick(loadRecord);
                        }
                    }
                },
                toolbar: {
                    show: true // menu button
                }
            },
            xaxis: {
                categories: labels
            },
            title: {
                text: `Avg CPO KPBN for ${props.year}`
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        position: 'top' // position labels inside the bars
                    }
                }
            },
            dataLabels: {
                enabled: true, // enables labels
                style: {
                    colors: ['#000'] // sets label text color to black
                },
                offsetY: -10 // moves the label above the bar
            },
            colors: ['rgba(249, 115, 22, 0.6)'],
            stroke: {
                // border
                show: true,
                width: 1,
                colors: ['rgb(249, 115, 22)']
            },
            tooltip: {
                theme: 'dark'
            }
        };
        chartSeries.value = [
            {
                name: 'AVG',
                type: 'bar',
                data: dataChart
            }
        ];
    }
};

const handleChartClick = async (data) => {
    showDialog.value = true;
    const response = data.records;
    const labels = [];
    const dataChart = [];
    const label = 'CPO KPBN';
    const color = ['rgba(255, 145, 0, 0.6)'];
    const strokeColor = ['rgb(249, 115, 22)'];
    const dataLabelStat = false;

    for (let i = 0; i < response.length; i++) {
        labels.push(moment(response[i].tanggal).format('DD'));
        dataChart.push(formatCurrency(Number(response[i].avg).toFixed(2)));
    }

    monthName.value = data.name;
    optionView.value = barChartOptionsApex(labels, color, strokeColor, dataLabelStat);
    dataView.value = {
        series: [
            {
                name: label,
                type: 'bar',
                data: dataChart
            }
        ]
    };
};

const editRow = (row) => {
    console.log('Editing row:', row);
};

watch(() => props.datas, loadData, { immediate: true });
</script>

<template>
    <div class="flex flex-col w-full items-center gap-4 min-h-screen">
        <!-- Chart Title -->
        <span class="text-[1vw] font-bold"> CPO KPBN </span>

        <!-- Loading Indicator -->
        <div v-if="isLoading" class="flex justify-center items-center w-full h-[380px]">
            <span>Loading chart...</span>
        </div>

        <div v-else class="w-full flex flex-col gap-4">
            <!-- Vue Apex Chart -->
            <ApexCharts type="line" :options="chartOptions" :series="chartSeries" class="w-full" height="400vw" />
            <!-- <VueApexCharts :type="listdata.type" :series="listdata.series" :options="listdata.options" class="w-full" height="400vw" style="z-index: 1 !important" /> -->
        </div>
    </div>
</template>
