<script setup>
import { defineProps, onMounted, ref, watch } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

const isLoading = ref(true);
const listTable1 = ref(null);
const listTable2 = ref([]);
const listTable3 = ref([]);
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
        // console.log(response);

        if (response != null) {
            const chart = response.chart || [];
            console.log(chart);
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
            const table = response.table || null;
            listTable1.value = table == null ? null : table.find((item) => item.name.includes('Cash Flow Funding'));
            listTable2.value = table == null ? null : table.find((item) => item.name.includes('Cash Flow Investment'));
            listTable3.value = table == null ? null : table.find((item) => item.name.includes('Cash Flow Operation'));
            console.log(listTable1.value);
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
        <span class="text-[1vw] font-bold"> Jadwal Tagihan (dlm IDR Miliar) </span>

        <!-- Loading Indicator -->
        <div v-if="isLoading == true" class="flex justify-center items-center w-full h-[380px]">
            <span>Loading chart...</span>
        </div>

        <div v-else class="w-full flex flex-col gap-4">
            <!-- Vue Apex Chart -->
            <div class="w-full grid grid-cols-2 gap-16">
                <div class="flex flex-col gap-2 items-center w-full" v-for="(item, index) in listChart" :key="index" :class="index == listChart.length - 1 ? 'col-span-2' : ''">
                    <span>{{ item.name }}</span>
                    <VueApexCharts :type="item.type" :series="item.series" :options="item.options" class="w-full" height="400vw" style="z-index: 1 !important" />
                </div>
            </div>

            <div class="flex flex-col gap-10">
                <div class="w-full flex flex-col gap-2" v-if="listTable1 != null">
                    <span class="text-lg font-semibold" :style="`color: ${listTable1.color};`">{{ listTable1.name }}</span>
                    <DataTable :value="listTable1.data" showGridlines removableSort tableStyle="background-color:#00000;">
                        <Column field="periode" sortable :headerStyle="`background-color: ${listTable1.color};`" style="background-color: black; color: white">
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center">Periode</span>
                            </template>
                        </Column>
                        <Column field="value" sortable :headerStyle="`background-color: ${listTable1.color};`" style="background-color: black; color: white">
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center">Pembayaran</span>
                            </template>
                            <template #body="{ data }">
                                <div class="w-full flex justify-center items-center">
                                    <span>{{ data.value }}</span>
                                </div>
                            </template>
                        </Column>
                        <Column field="pay_status" sortable :headerStyle="`background-color: ${listTable1.color};`" style="background-color: black; color: white">
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center">Status</span>
                            </template>
                            <template #body="{ data }">
                                <div class="w-full flex justify-center items-center">
                                    <span>{{ data.pay_status }}</span>
                                </div>
                            </template>
                        </Column>
                    </DataTable>
                </div>
                <div class="w-full flex flex-col gap-2" v-if="listTable2 != null">
                    <span class="text-lg font-semibold" :style="`color: ${listTable2.color};`">{{ listTable2.name }}</span>
                    <DataTable :value="listTable2.dataTable" showGridlines removableSort tableStyle="background-color:#00000;" scrollable scrollHeight="400px">
                        <Column field="name" sortable :headerStyle="`background-color: ${listTable2.color};`" style="background-color: black; color: white">
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center">Nama</span>
                            </template>
                        </Column>

                        <Column
                            v-for="month in ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']"
                            :key="month"
                            :field="month"
                            :headerStyle="`background-color: ${listTable2.color};`"
                            style="background-color: black; color: white"
                        >
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center">{{ month.toUpperCase() }}</span>
                            </template>
                            <template #body="{ data }">
                                <div class="w-full flex flex-col justify-center items-center">
                                    <span>{{ data[month]?.value || '0.00' }}</span>
                                    <small class="text-gray-400">{{ data[month]?.status || 'Unknown' }}</small>
                                </div>
                            </template>
                        </Column>
                    </DataTable>
                    <!-- <div class="flex flex-col gap-2">
                        <div class="border rounded-lg p-3 flex flex-col gap-2" v-for="(item, index) in listTable2.dataTable" :key="index">
                            <span>{{ item.name }}</span>
                            <div class="flex w-full">
                                <div class="flex flex-col w-full justify-center items-center" v-for="(data, items) in item.data" :key="items">
                                    <div class="border text-center p-2 w-full" :style="`background-color: ${listTable2.color};`">{{ data.periode }}</div>
                                    <div class="border text-center p-2 w-full">{{ data.value }}</div>
                                </div>
                            </div>
                        </div>
                    </div> -->
                </div>
                <div class="w-full flex flex-col gap-2" v-if="listTable3 != null">
                    <span class="text-lg font-semibold" :style="`color: ${listTable3.color};`">{{ listTable3.name }}</span>
                    <DataTable :value="listTable3.dataTable" showGridlines removableSort tableStyle="background-color:#00000;" scrollable scrollHeight="400px">
                        <Column field="name" sortable :headerStyle="`background-color: ${listTable3.color};`" style="background-color: black; color: white">
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center">Nama</span>
                            </template>
                        </Column>

                        <Column
                            v-for="month in ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']"
                            :key="month"
                            :field="month"
                            :headerStyle="`background-color: ${listTable3.color};`"
                            style="background-color: black; color: white"
                        >
                            <template #header>
                                <span class="flex justify-center items-center w-full text-center">{{ month.toUpperCase() }}</span>
                            </template>
                            <template #body="{ data }">
                                <div class="w-full flex flex-col justify-center items-center">
                                    <span>{{ data[month]?.value || '0.00' }}</span>
                                    <small class="text-gray-400">{{ data[month]?.status || 'Unknown' }}</small>
                                </div>
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </div>
        </div>
    </div>
</template>
