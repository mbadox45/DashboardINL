<script setup>
// import { bulkySalesChart, cashFlowData } from '@/controller/report/OperationReport';
import { formatCurrency } from '@/controller/dummyController';
import moment from 'moment';
import { defineProps, onMounted, ref, watch } from 'vue';
// import VueApexCharts from 'vue3-apexcharts';

const props = defineProps({
    datas: {
        type: Object,
        default: () => {}
    }
});

const listdata = ref({
    type: null,
    series: [],
    options: {},
    name: null
});

const listChart = ref(null);
const listTable = ref(null);
const bebanProduksi = ref(0);
const rpKgTotal = ref(0);

const isLoading = ref(true);
// const dataCashFlow = ref([]);

onMounted(() => {
    loadData();
});

const loadData = async () => {
    try {
        const response = props.datas;
        listdata.value = {
            name: 'Laporan Material'
        };
        if (response != null) {
            listTable.value = response;
        }

        // dataCashFlow.value = cashFlowData();
    } catch (error) {
        console.error('Error loading data:', error);
    } finally {
        isLoading.value = false; // Turn off the loading state after the data has loaded
    }
};

watch(() => props.datas, loadData, { immediate: true });
</script>

<template>
    <div class="flex flex-col w-full items-center gap-5 pb-10">
        <!-- Chart Title -->
        <span class="text-[1.5vw] font-bold uppercase">
            <!-- {{ listdata.name || 'Loading...' }} -->
            Market Reuters & Levy Duty
        </span>
        <!-- Loading Indicator -->
        <div v-if="isLoading" class="flex justify-center items-center w-full h-[380px]">
            <span>Loading chart...</span>
        </div>

        <div v-else class="w-full flex flex-col gap-4">
            <div v-if="listTable != null" v-for="(item, index) in listTable" :key="index" class="flex flex-col gap-3 w-full">
                <div class="flex w-full gap-3 p-5 rounded-lg bg-slate-900 items-center">
                    <span class="w-full text-[1.4vw]">Rata-rata Kurs</span>
                    <div class="flex-col w-full items-end flex gap-1">
                        <span class="text-[1.4vw]">{{ item.averageKurs }}</span>
                        <span>Rata-rata untuk periode {{ item.year }}</span>
                    </div>
                </div>
                <div class="flex gap-3 items-center w-full">
                    <div class="p-5 rounded-lg bg-teal-900 flex flex-col w-full gap-2">
                        <span class="text-center w-full font-bold text-[1vw]">Market (USD) Excluded Tax</span>
                        <div class="flex flex-col w-full pb-2 border-b" v-for="(usd, indexes) in item.averageMarketUsd" :key="indexes">
                            <span class="font-bold">{{ usd.product }}</span>
                            <div class="flex gap-3 justify-between items-center text-[0.9vw]">
                                <span>USD</span>
                                <span class="font-bold">{{ usd.avg }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="p-5 rounded-lg bg-amber-900 flex flex-col w-full gap-2">
                        <span class="text-center w-full font-bold text-[1vw]">Market (IDR) Excluded Tax</span>
                        <div class="flex flex-col w-full pb-2 border-b" v-for="(usd, indexes) in item.averageMarketIdr" :key="indexes">
                            <span class="font-bold">{{ usd.product }}</span>
                            <div class="flex gap-3 justify-between items-center text-[0.9vw]">
                                <span>Rp</span>
                                <span class="font-bold">{{ usd.avg }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <VueApexCharts :series="item.series" :options="item.chart" height="380vw" class="w-auto mt-5" style="z-index: 1 !important" /> -->
                <Divider />
                <DataTable v-if="item.dataTable != null" :value="item.dataTable" showGridlines scrollHeight="550px" dataKey="id" scrollable :globalFilterFields="['date']">
                    <template #empty> No customers found. </template>
                    <template #loading> Loading customers data. Please wait. </template>

                    <ColumnGroup type="header">
                        <Row>
                            <Column header="Date" :rowspan="2" frozen sortable />

                            <!-- Looping Produk -->
                            <Column v-for="product in item.productList" :key="product.name" :colspan="3" :headerStyle="`background-color: ${product.color}; border-color:white;`">
                                <template #header>
                                    <div class="text-center w-full flex justify-center font-bold">
                                        <span>{{ product.name }}</span>
                                    </div>
                                </template>
                            </Column>
                            <Column header="Kurs (Jisdor)" :rowspan="2" sortable />
                            <Column :colspan="item.productList.length">
                                <template #header>
                                    <div class="text-center w-full flex justify-center font-bold">
                                        <span>Market (IDR)</span>
                                    </div>
                                </template>
                            </Column>
                        </Row>

                        <!-- Looping Sub-Kolom -->
                        <Row>
                            <template v-for="(product, index) in item.productList" :key="index">
                                <Column :headerStyle="`background-color: ${product.color}; border-color:white;`">
                                    <template #header>
                                        <div class="text-center w-full flex justify-center font-bold">
                                            <small>Market Reuters (USD)</small>
                                        </div>
                                    </template>
                                </Column>
                                <Column :headerStyle="`background-color: ${product.color}; border-color:white;`">
                                    <template #header>
                                        <div class="text-center w-full flex justify-center font-bold">
                                            <small>Levy Duty</small>
                                        </div>
                                    </template>
                                </Column>
                                <Column :headerStyle="`background-color: ${product.color}; border-color:white;`">
                                    <template #header>
                                        <div class="text-center w-full flex justify-center font-bold">
                                            <small>Market Excld Levy & Duty (USD)</small>
                                        </div>
                                    </template>
                                </Column>
                            </template>

                            <template v-for="(product, index) in item.productList" :key="index">
                                <Column :headerStyle="`background-color: ${product.color}; border-color:white;`">
                                    <template #header>
                                        <div class="text-center w-full flex justify-center font-bold">
                                            <small>{{ product.name }}</small>
                                        </div>
                                    </template>
                                </Column>
                            </template>
                        </Row>
                    </ColumnGroup>

                    <Column field="tanggal" style="min-width: 13rem" frozen bodyClass="text-white" bodyStyle="background-color:black;">
                        <template #body="{ data }">
                            <div class="flex justify-between items-center gap-2">
                                <strong class="text-sm w-full">{{ moment(data.tanggal).format('DD MMM YYYY') }}</strong>
                                <!-- <Button icon="pi pi-pencil" severity="warning" text /> -->
                            </div>
                        </template>
                    </Column>

                    <!-- Looping Data -->
                    <template v-for="product in item.productList" :key="product.id">
                        <Column style="min-width: 13rem" bodyClass="text-white" bodyStyle="background-color:black;">
                            <template #body="{ data }">
                                <div class="flex justify-between">
                                    <small>USD</small>
                                    <small>{{ formatCurrency(Number(data.productData?.[product.id]?.reuters).toFixed(2)) ?? '-' }}</small>
                                </div>
                            </template>
                        </Column>

                        <Column style="min-width: 13rem" bodyClass="text-white" bodyStyle="background-color:black;">
                            <template #body="{ data }">
                                <div class="flex justify-between">
                                    <small>USD</small>
                                    <small>{{ formatCurrency(Number(data.productData?.[product.id]?.levy).toFixed(2)) ?? '-' }}</small>
                                </div>
                            </template>
                        </Column>
                        <Column style="min-width: 13rem" bodyClass="text-white" bodyStyle="background-color:black;">
                            <template #body="{ data }">
                                <div class="flex justify-between">
                                    <small>USD</small>
                                    <small>{{ formatCurrency(Number(data.productData?.[product.id]?.excld).toFixed(2)) ?? '-' }}</small>
                                </div>
                            </template>
                        </Column>
                    </template>

                    <Column field="value" style="min-width: 13rem" bodyClass="text-white" bodyStyle="background-color:black;">
                        <template #body="{ data }">
                            <div class="flex w-full justify-end items-center gap-2">
                                <strong class="text-sm w-full text-right">{{ formatCurrency(Number(data.value).toFixed(2)) }}</strong>
                            </div>
                        </template>
                    </Column>

                    <template v-for="product in item.productList" :key="product.id">
                        <Column style="min-width: 13rem" bodyClass="text-white" bodyStyle="background-color:black;">
                            <template #body="{ data }">
                                <div class="flex justify-between">
                                    <small>Rp.</small>
                                    <small>{{ formatCurrency(Number(data.productData?.[product.id]?.idr).toFixed(2)) ?? '-' }}</small>
                                </div>
                            </template>
                        </Column>
                    </template>
                </DataTable>
            </div>
        </div>
    </div>
</template>
