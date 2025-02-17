<script setup>
import { valueColorPersenCondition } from '@/controller/dummyController';
import CryptoJS from 'crypto-js';
import { defineProps, ref, watch } from 'vue';
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
    }
});

const load = ref({ persen: 0, pendapatan: 0, rkap: 0, tanggal: '' });

const loadData = async () => {
    const data = props.datas;
    load.value = { persen: data.persenPendapatan, pendapatan: data.pendapatan, rkap: data.targetPendapatanRkap, tanggal: data.tanggal };
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
</script>
<template>
    <div class="bg-gray-800 p-2 rounded-xl shadow-xl min-h-[120px] flex h-full gap-3 items-start">
        <div class="flex flex-col h-full w-full">
            <div class="flex items-center gap-3">
                <span class="font-bold w-full text-[0.8vw]">Pendapatan (dlm IDR Miliar)</span>
                <button
                    @click="routerLink('revenue')"
                    class="animate-pulse hover:animate-none p-4 w-[1.5vw] h-[1.5vw] cursor-pointer bg-transparent text-emerald-500 rotate-180 hover:rotate-[-180] hover:bg-black hover:text-amber-500 rounded-full flex items-center justify-center transition-all duration-500"
                >
                    <i class="pi pi-external-link" style="font-weight: 600; font-size: 0.9vw"></i>
                </button>
            </div>
            <div class="flex h-full items-center gap-3">
                <!-- <img src="/images/icon/financial/revenue.png" alt="Icon" class="w-[3vw] h-[3vw] mr-1" /> -->
                <div class="w-full h-full">
                    <div class="flex gap-1 items-center h-full">
                        <div class="flex gap-2 items-center mb-3">
                            <span class="font-bold text-[2vw]" :class="valueColorPersenCondition(load.persen)">{{ load.persen }}%</span>
                        </div>
                        <div class="flex flex-col gap-1 w-full items-end">
                            <div class="font-bold flex flex-col-reverse items-end">
                                <span class="text-white text-[0.6vw]">Pendapatan</span>
                                <span class="text-[0.8vw]" :class="valueColorPersenCondition(load.persen)">{{ load.pendapatan }}</span>
                            </div>
                            <div class="font-bold flex flex-col-reverse items-end">
                                <span class="text-white text-[0.6vw]">RKAP {{ load.tanggal }}</span>
                                <span class="text-amber-600 text-[0.8vw]">{{ load.rkap }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
