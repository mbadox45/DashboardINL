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
    },
    loading: {
        type: String,
        default: ''
    }
});

const load = ref({ value: 0, labaKotor: 0, labaKotorLastMonth: 0, gpmPercent: 0, gpmPercentLastMonth: 0, totalLabaKotor: 0, targetLabaKotorRkap: 0, gpmRkapPercent: 0 });
const loading = ref('');

const loadData = async () => {
    const data = props.datas;
    loading.value = props.loading;
    load.value = {
        value: 0,
        labaKotor: data.labaKotor,
        labaKotorLastMonth: data.labaKotorLastMonth,
        totalLabaKotor: data.totalLabaKotor,
        gpmPercent: data.gpmPercent,
        gpmPercentLastMonth: data.gpmPercentLastMonth,
        targetLabaKotorRkap: data.targetLabaKotorRkap,
        gpmRkapPercent: data.gpmRkapPercent,
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
watch(() => props.loading, loadData, { immediate: true });
</script>
<template>
    <div class="bg-gray-800 rounded-xl shadow-xl min-h-[120px] flex h-full gap-3 items-start">
        <div class="flex flex-col relative h-full w-full p-2">
            <div v-if="loading == 'loading'" class="absolute flex items-center justify-center gap-2 left-0 top-0 rounded-xl w-full h-full bg-[rgba(255,255,255,0.9)]">
                <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="transparent" animationDuration=".5s" />
            </div>
            <div class="flex items-center gap-3">
                <span class="font-bold w-full text-[0.8vw]">Laba Kotor (IDR Miliar) Bulanan</span>
                <button
                    @click="routerLink('gross-profit')"
                    class="animate-pulse hover:animate-none p-4 w-[1.5vw] h-[1.5vw] cursor-pointer bg-transparent text-emerald-500 rotate-180 hover:rotate-[-180] hover:bg-black hover:text-amber-500 rounded-full flex items-center justify-center transition-all duration-500"
                >
                    <i class="pi pi-external-link" style="font-weight: 600; font-size: 0.9vw"></i>
                </button>
            </div>
            <div class="flex h-full items-center gap-3">
                <!-- <img src="/images/icon/financial/gross-profit.png" alt="Icon" class="w-[3vw] h-[3vw] mr-1" /> -->
                <div class="flex gap-1 items-center h-full mt-3 w-full">
                    <div class="font-bold flex w-full flex-col items-center">
                        <div class="flex flex-col gap-2 h-full w-full">
                            <span class="font-bold text-[1.2vw]" :class="valueColorPersenCondition(load.gpmRkapPercent)">{{ load.gpmRkapPercent }}%</span>
                            <span class="text-white text-[0.6vw]">Pencapaian {{ load.tanggal }}</span>
                        </div>
                        <div class="flex flex-col gap-2 h-full w-full">
                            <span class="font-bold text-[1.2vw]" :class="valueColorIntCondition(load.totalLabaKotor)">{{ load.totalLabaKotor }}</span>
                            <span class="text-white text-[0.6vw]">Akumulasi Tahun {{ load.year }}</span>
                        </div>
                    </div>
                    <div class="flex flex-col gap-1 w-full items-center">
                        <div class="flex gap-1 w-full items-center">
                            <div class="font-bold flex w-full flex-col-reverse items-center">
                                <span class="font-bold text-white text-[0.6vw]">RKAP {{ load.tanggal }} :</span>
                            </div>
                            <div class="font-bold flex w-full flex-col-reverse items-center">
                                <span class="font-bold text-green-500 text-[1vw]">{{ load.targetLabaKotorRkap }}</span>
                            </div>
                        </div>
                        <div class="flex gap-1 w-full items-center">
                            <div class="font-bold flex w-full flex-col-reverse items-center">
                                <div class="flex gap-1 items-center" :class="valueColorPerbandinganCondition(load.labaKotor, load.labaKotorLastMonth).color">
                                    <i :class="valueColorPerbandinganCondition(load.labaKotor, load.labaKotorLastMonth).icon" style="font-size: 0.6vw"></i>
                                    <span class="text-[0.7vw]">{{ valueColorPerbandinganCondition(load.labaKotor, load.labaKotorLastMonth).result }}</span>
                                </div>
                                <span class="text-white text-[0.6vw]">Laba Kotor</span>
                                <span class="text-[0.9vw]" :class="valueColorPerbandinganCondition(load.labaKotor, load.labaKotorLastMonth).color">{{ load.labaKotor }}</span>
                            </div>
                            <div class="font-bold flex w-full flex-col-reverse items-center">
                                <div class="flex gap-1 items-center" :class="valueColorPerbandinganCondition(load.gpmPercent, load.gpmPercentLastMonth).color">
                                    <i :class="valueColorPerbandinganCondition(load.gpmPercent, load.gpmPercentLastMonth).icon" style="font-size: 0.6vw"></i>
                                    <span class="text-[0.7vw]">{{ valueColorPerbandinganCondition(load.gpmPercent, load.gpmPercentLastMonth).result }}%</span>
                                </div>
                                <span class="text-white text-[0.6vw]">GPM%</span>
                                <span class="text-[0.9vw]" :class="valueColorPerbandinganCondition(load.gpmPercent, load.gpmPercentLastMonth).color">{{ load.gpmPercent }}%</span>
                            </div>
                        </div>
                        <div class="flex gap-1 w-full items-center">
                            <span class="font-bold text-cyan-500 text-[0.6vw]">Perbandingan dengan {{ load.lastMonth }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
