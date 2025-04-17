<script setup>
import CryptoJS from 'crypto-js';
import moment from 'moment';
import { defineProps, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
    datas: {
        type: Object,
        default: () => ({})
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

const load = ref({ total: 0, status: '', bulan: moment().format('MMMM YYYY') });
const loading = ref('');

onMounted(() => {
    loadData();
});

const loadData = async () => {
    const data = props.datas;
    loading.value = props.loading;
    load.value = { total: data.value, status: data.status, bulan: data.tanggal, difference: data.difference, lastMonth: data.lastMonth };
};

const routerLink = (path) => {
    const data = JSON.stringify({ path: path, type: 'financial', form: props.formPush });
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
            <div class="flex items-center gap-3">
                <span class="font-bold w-full text-[0.8vw]">Saldo Kas (IDR Miliar) Bulanan</span>
                <button
                    @click="routerLink('cash-balance')"
                    class="animate-pulse hover:animate-none p-4 w-[1.5vw] h-[1.5vw] cursor-pointer bg-transparent text-emerald-500 rotate-180 hover:rotate-[-180] hover:bg-black hover:text-amber-500 rounded-full flex items-center justify-center transition-all duration-500"
                >
                    <i class="pi pi-external-link" style="font-weight: 600; font-size: 0.9vw"></i>
                </button>
            </div>
            <div class="flex h-full items-center gap-3">
                <!-- <img src="/images/icon/financial/revenue.png" alt="Icon" class="w-[3vw] h-[3vw] mr-1" /> -->
                <div class="flex flex-col gap-2 w-full">
                    <div class="flex gap-2 items-center" :class="load.status == 'up' ? 'text-green-500' : load.status == 'down' ? 'text-red-500' : 'text-amber-500'">
                        <span class="font-bold text-[1.5vw]">{{ load.total }}</span>
                        <i :class="`pi pi-sort-${load.status}-fill`" style="font-size: 1vw" />
                        <span class="font-bold text-[0.5vw]">{{ load.difference }}</span>
                    </div>
                    <div class="text-[0.8vw] flex w-full justify-between">
                        <span class="font-bold text-cyan-500 text-[0.6vw]">Perbandingan dengan {{ load.lastMonth }} </span>
                        <span class="text-cyan-500 font-bold text-[0.6vw]">s/d {{ load.bulan }}</span>
                    </div>
                    <div class="text-[0.8vw] flex w-full justify-between"></div>
                </div>
            </div>
        </div>
    </div>
</template>
