<script setup>
import { formatCurrency, valueColorPersenCondition } from '@/controller/dummyController';
import CryptoJS from 'crypto-js';
import { defineProps, onMounted, ref, watch } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
// import { pieChartApex } from '@/controller/chartStyle/radialBarDummy';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
    datas: {
        type: Object,
        default: () => {}
    },
    formPush: {
        type: Object,
        default: () => ({})
    },
    loading: {
        type: String,
        default: ''
    }
});

const load = ref({ tanggal: '', real: 0, rkap: 0, persen: 0, dataChart: [] });
const loading = ref('');

onMounted(() => {
    loadData();
});

const loadData = async () => {
    try {
        const data = props.datas;
        loading.value = props.loading;
        if (data != null) {
            load.value.tanggal = data.tanggal;
            load.value.real = formatCurrency(Number(data.real).toFixed(2)) || 0;
            load.value.rkap = formatCurrency(Number(data.rkap).toFixed(2)) || 0;
            load.value.persen = formatCurrency(Number(data.persen).toFixed(2)) || 0;
            load.value.dataChart = data.listChart || [];
        }
    } catch (error) {
        loading.value = props.loading;
        load.value.tanggal = '';
        load.value.real = 0;
        load.value.rkap = 0;
        load.value.persen = 0;
        load.value.dataChart = [];
    }
};

const routerLink = (path) => {
    const data = JSON.stringify({ path: path, type: 'sales', form: props.formPush });
    const encryptedPath = CryptoJS.AES.encrypt(data, 'your-secret-key').toString();
    router.push({
        path: '/detail-dashboard',
        query: { component: encryptedPath }
    });
};

watch(() => props.datas, loadData, { immediate: true });
watch(() => props.formPush, loadData, { immediate: true });
watch(() => props.loading, loadData, { immediate: true });
</script>

<template>
    <div class="bg-gray-800 rounded-xl shadow-xl min-h-[120px] flex h-full gap-3 items-start">
        <div class="flex flex-col relative h-full w-full p-2">
            <div v-if="loading == 'loading'" class="absolute flex items-center justify-center gap-2 left-0 top-0 rounded-xl w-full h-full bg-[rgba(255,255,255,0.9)]">
                <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="transparent" animationDuration=".5s" />
            </div>
            <div class="flex items-center gap-6 h-full">
                <span class="text-[0.8vw] font-bold w-full">Qty Penjualan Bulk (MT) Akumulasi Harian</span>
                <button
                    @click="routerLink('penjualan-bulk')"
                    class="animate-pulse hover:animate-none p-4 w-[1.5vw] h-[1.5vw] cursor-pointer bg-transparent text-emerald-500 rotate-180 hover:rotate-[-180] hover:bg-black hover:text-amber-500 rounded-full flex items-center justify-center transition-all duration-500"
                >
                    <i class="pi pi-external-link" style="font-weight: 600; font-size: 0.9vw"></i>
                </button>
            </div>
            <div class="grid grid-cols-1 xl:grid-cols-3 gap-4 w-full h-full">
                <div class="col-span-2 w-full flex flex-col justify-between min-h-[3vw] gap-1 h-full">
                    <div class="flex w-full gap-2 h-full items-center py-1 px-1">
                        <div class="flex flex-col gap-2 w-full bg-black h-full py-2 px-3 rounded-lg">
                            <div class="flex gap-2 justify-between items-center">
                                <span class="text-[1.7vw] font-bold" :class="valueColorPersenCondition(load.persen)">{{ load.persen }}%</span>
                                <span class="text-[0.5vw] font-bold text-cyan-600">s/d {{ load.tanggal }}</span>
                            </div>
                            <div class="flex gap-2 h-full">
                                <div class="flex w-full flex-col-reverse items-end justify-center font-bold" :class="valueColorPersenCondition(load.persen)">
                                    <span class="text-[0.5vw]">Real</span><span class="text-[0.7vw]">{{ load.real }}</span>
                                </div>
                                <div class="flex w-full flex-col-reverse items-end justify-center text-green-500 font-bold">
                                    <span class="text-[0.5vw]">RKAP</span><span class="text-[0.7vw]">{{ load.rkap }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <VueApexCharts
                    v-if="load.dataChart.length > 0"
                    v-for="(item, index) in load.dataChart"
                    :key="`${index}-${JSON.stringify(item.series)}`"
                    :series="item.series"
                    :options="item.options"
                    height="135vw"
                    class="w-auto flex justify-center col-span-1"
                    style="z-index: 1 !important"
                />
                <!-- <VueApexCharts v-if="load.dataChart.length > 0" v-for="(item, index) in load.dataChart" :key="index" :series="item.series" :options="item.options" class="w-full" height="200vw" style="z-index: 1 !important" /> -->
            </div>
        </div>
    </div>
</template>
