<script setup>
import CryptoJS from 'crypto-js';
import { defineProps, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
    datas: {
        type: Object,
        default: () => ({})
    }
});

const load = ref({ averageAsingTotal: 0, averageKurs: 0, averageTotal: 0, latestCpoDate:'', latestCpoValue:0, latestKursDate:'', latestKursValue:0, latestAsingTotal:0 });

const loadData = async () => {
    const data = props.datas;
    load.value = { averageAsingTotal: data.averageAsingTotal, averageKurs: data.averageKurs, averageTotal: data.averageTotal, latestCpoDate:data.latestCpoDate, latestCpoValue:data.latestCpoValue, latestKursDate:data.latestKursDate, latestKursValue:data.latestKursValue , latestAsingTotal:data.latestAsingTotal };
};

const routerLink = (path) => {
    const data = JSON.stringify({ path: path, type: 'financial' });
    const encryptedPath = CryptoJS.AES.encrypt(data, 'your-secret-key').toString();
    router.push({
        path: '/detail-dashboard',
        query: { component: encryptedPath }
    });
};

watch(() => props.datas, loadData, { immediate: true });
</script>
<template>
    <div class="bg-gray-800 p-2 rounded-xl shadow-xl flex h-full gap-3 items-start">
        <div class="flex flex-col h-full w-full">
            <div class="flex items-center gap-3">
                <span class="font-bold w-full text-[0.8vw]">CPO KPBN</span>
                <button
                    @click="routerLink('revenue')"
                    class="animate-pulse hover:animate-none p-4 w-[1.5vw] h-[1.5vw] cursor-pointer bg-transparent text-emerald-500 rotate-180 hover:rotate-[-180] hover:bg-black hover:text-amber-500 rounded-full flex items-center justify-center transition-all duration-500"
                >
                    <i class="pi pi-external-link" style="font-weight: 600; font-size: 0.9vw"></i>
                </button>
            </div>
            <div class="flex flex-col h-full w-full">
                <div class="flex justify-between gap-2 items-center">
                    <span class="font-bold text-[0.7vw] text-cyan-600">Rata - Rata</span>
                    <span class="font-bold text-[0.7vw] text-cyan-600">Nilai Terakhir</span>
                </div>
                <div class="flex justify-between gap-2 items-center">
                    <span class="font-bold text-[0.8vw] text-amber-600">USD {{load.averageAsingTotal}}/MT</span>
                    <span class="font-bold text-[0.8vw] text-green-600">USD {{load.latestAsingTotal}}/MT</span>
                </div>
                <div class="flex justify-between gap-2 items-center">
                    <span class="font-bold text-[0.8vw] text-amber-600">IDR {{load.averageTotal}}/Kg</span>
                    <span class="font-bold text-[0.8vw] text-green-600">IDR {{load.latestCpoValue}}/Kg</span>
                </div>
                <div class="flex flex-col items-center">
                    <span class="text-[0.6vw] text-cyan-500 font-bold">{{load.latestKursDate}}</span>
                    <div class="flex justify-between gap-3 w-full">
                        <span class="text-[0.6vw] text-cyan-500 font-bold">Kurs : {{load.averageKurs}}</span>
                        <span class="text-[0.6vw] text-cyan-500 font-bold">Kurs : {{load.latestKursValue}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
