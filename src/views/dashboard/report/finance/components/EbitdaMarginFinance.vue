<script setup>
// import { encryptQuery } from '@/controller/dummyController';
import { valueColorIntCondition, valueColorPerbandinganCondition, valueColorPersenCondition } from '@/controller/dummyController';
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

const load = ref({ total: 0, nilai1: 0, nilai2: 0, nilaiPercen1: 0, nilaiPercen2: 0, targetEbitdaRkap: 0, ebitdaRkapPercent: 0 });

const loadData = async () => {
    const data = props.datas;
    load.value = {
        total: data.totalEbitda,
        nilai1: data.ebitda,
        nilai2: data.ebitdaLastMonth,
        nilaiPercen1: data.ebitdaPercent,
        nilaiPercen2: data.ebitdaPercentLastMonth,
        targetEbitdaRkap: data.targetEbitdaRkap,
        ebitdaRkapPercent: data.ebitdaRkapPercent,
        tanggal: data.tanggal,
        year: data.year,
        lastMonth: data.lastMonth
    };
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
                <span class="font-bold w-full text-[0.8vw]">EBITDA (IDR Miliar) Bulanan</span>
                <button
                    @click="routerLink('ebitda-margin')"
                    class="animate-pulse hover:animate-none p-4 w-[1.5vw] h-[1.5vw] cursor-pointer bg-transparent text-emerald-500 rotate-180 hover:rotate-[-180] hover:bg-black hover:text-amber-500 rounded-full flex items-center justify-center transition-all duration-500"
                >
                    <i class="pi pi-external-link" style="font-weight: 600; font-size: 0.9vw"></i>
                </button>
            </div>
            <div class="flex h-full items-center gap-3">
                <div class="flex gap-1 items-center h-full mt-3 w-full">
                    <div class="font-bold flex w-full flex-col items-center">
                        <div class="flex flex-col gap-2 h-full w-full">
                            <span class="font-bold text-[1.2vw]" :class="valueColorPersenCondition(load.ebitdaRkapPercent)">{{ load.ebitdaRkapPercent }}%</span>
                            <span class="text-white text-[0.6vw]">Pencapaian {{ load.tanggal }}</span>
                        </div>
                        <div class="flex flex-col gap-2 h-full w-full">
                            <span class="font-bold text-[1.2vw]" :class="valueColorIntCondition(load.total)">{{ load.total }}</span>
                            <span class="text-white text-[0.6vw]">Akumulasi Tahun {{ load.year }}</span>
                        </div>
                    </div>
                    <div class="flex flex-col gap-1 w-full items-center">
                        <div class="flex gap-1 w-full items-center">
                            <div class="font-bold flex w-full flex-col-reverse items-center">
                                <span class="font-bold text-white text-[0.6vw]">RKAP {{ load.tanggal }} :</span>
                            </div>
                            <div class="font-bold flex w-full flex-col-reverse items-center">
                                <span class="font-bold text-green-500 text-[1vw]">{{ load.targetEbitdaRkap }}</span>
                            </div>
                        </div>
                        <div class="flex gap-1 w-full items-center">
                            <div class="font-bold flex w-full flex-col-reverse items-center">
                                <div class="flex gap-1 items-center" :class="valueColorPerbandinganCondition(load.nilai1, load.nilai2).color">
                                    <i :class="valueColorPerbandinganCondition(load.nilai1, load.nilai2).icon" style="font-size: 0.6vw"></i>
                                    <span class="text-[0.7vw]">{{ valueColorPerbandinganCondition(load.nilai1, load.nilai2).result }}</span>
                                </div>
                                <span class="text-white text-[0.6vw]">EBITDA</span>
                                <span class="text-[0.9vw]" :class="valueColorPerbandinganCondition(load.nilai1, load.nilai2).color">{{ load.nilai1 }}</span>
                            </div>
                            <div class="font-bold flex w-full flex-col-reverse items-center">
                                <div class="flex gap-1 items-center" :class="valueColorPerbandinganCondition(load.nilaiPercen1, load.nilaiPercen2).color">
                                    <i :class="valueColorPerbandinganCondition(load.nilaiPercen1, load.nilaiPercen2).icon" style="font-size: 0.6vw"></i>
                                    <span class="text-[0.7vw]">{{ valueColorPerbandinganCondition(load.nilaiPercen1, load.nilaiPercen2).result }}%</span>
                                </div>
                                <span class="text-white text-[0.6vw]">EBITDA%</span>
                                <span class="text-[0.9vw]" :class="valueColorPerbandinganCondition(load.nilaiPercen1, load.nilaiPercen2).color">{{ load.nilaiPercen1 }}%</span>
                            </div>
                        </div>
                        <div class="flex gap-1 w-full items-center">
                            <span class="font-bold text-cyan-500 text-[0.6vw]">Perbandingan dengan {{ load.lastMonth }}</span>
                        </div>
                    </div>
                </div>
                <!-- <img src="/images/icon/financial/ebitda.png" alt="Icon" class="w-[3vw] h-[3vw] mr-1" /> -->
            </div>
        </div>
    </div>
</template>
