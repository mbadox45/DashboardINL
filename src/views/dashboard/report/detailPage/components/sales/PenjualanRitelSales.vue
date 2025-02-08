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

const isLoading = ref(true);
const cashBalanceThisYear = ref([]);
const cashBalanceLastYear = ref([]);
const listPackaging = ref([]);
const listChartPackaging = ref([]);

onMounted(() => {
    loadData();
});

const loadData = async () => {
    try {
        const response = props.datas;
        console.log(response);
        if (response != null) {
            listPackaging.value = response.data;
            const responseTotal = response.total;
            total.value = {
                percentageQtyToTargetKategori: responseTotal.percentageQtyToTargetKategori,
                totalQtyKategori: responseTotal.totalQtyKategori,
                totalQtyTargetKategori: responseTotal.totalQtyTargetKategori,
                totalValueKategori: responseTotal.totalValueKategori
            };
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
    } finally {
        isLoading.value = false; // Turn off the loading state after the data has loaded
    }
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
            <div class="grid grid-cols-2 gap-8">
                <div class="col-span-2 flex items-center gap-3 bg-black rounded-xl py-6 px-8">
                    <div class="flex flex-col items-end w-full font-bold p-4">
                        <span class="text-[3.6vw] text-cyan-500">{{ formatCurrency(Number(total.percentageQtyToTargetKategori).toFixed(2)) }}%</span>
                        <span class="text-[0.9vw] text-cyan-700">Total Persentase Pencapaian</span>
                    </div>
                    <div class="flex flex-col items-end w-full font-bold p-4 text-amber-500">
                        <span class="text-[3.6vw] text-amber-500">{{ formatCurrency(Number(total.totalQtyTargetKategori).toFixed(2)) }}</span>
                        <span class="text-[0.9vw] text-amber-700">Total RKAP Ritel</span>
                    </div>
                    <div class="flex flex-col gap-2 w-full">
                        <div class="flex flex-col items-end w-full font-bold p-4">
                            <span class="text-[1.6vw] text-slate-300">{{ formatCurrency(Number(total.totalQtyKategori).toFixed(2)) }}</span>
                            <span class="text-[0.8vw] text-slate-500">Total Jumlah Penjualan</span>
                        </div>
                        <div class="flex flex-col items-end w-full font-bold p-4">
                            <span class="text-[1.6vw] text-emerald-500">{{ formatCurrency(Number(total.totalValueKategori).toFixed(2)) }}</span>
                            <span class="text-[0.8vw] text-emerald-700">Total Nilai Penjualan</span>
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
