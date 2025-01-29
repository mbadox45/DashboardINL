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

const load = ref({
    rkapPercentage: 0,
    kapasitasUtilityPercentage: 0,
    cpoOlah: 0,
    kapasitasUtility: 0,
    rkap: 0,
    totalCost: 0,
    totalHargaSatuan: 0,
});

const loadData = async () => {
    const data = props.datas;
    load.value = {
        rkapPercentage: parseFloat(data.rkapPercentage) || 0,
        kapasitasUtilityPercentage: parseFloat(data.kapasitasUtilityPercentage) || 0,
        cpoOlah: data.cpoOlah || 0,
        kapasitasUtility: data.kapasitasUtility || 0,
        rkap: data.rkap || 0,
        totalCost: data.totalCost || 0,
        totalHargaSatuan: data.totalHargaSatuan || 0,
    };
};

const routerLink = (path) => {
    const data = JSON.stringify({ path: path, type: 'operation' });
    const encryptedPath = CryptoJS.AES.encrypt(data, 'your-secret-key').toString();
    router.push({
        path: '/detail-dashboard',
        query: { component: encryptedPath },
    });
};

watch(() => props.datas, loadData, { immediate: true });
</script>

<template>
    <div class="bg-gray-800 p-2 rounded-xl shadow-xl flex h-full gap-3 items-start">
        <div class="flex flex-col h-full w-full">
            <!-- Header Section -->
            <div class="flex items-center gap-3">
                <span class="font-bold w-full text-[0.8vw]">CPO Olah vs RKAP vs Utility (in Kg)</span>
                <button
                    @click="routerLink('cpo-olah-vs-rkap')"
                    class="animate-pulse hover:animate-none p-4 w-[1.5vw] h-[1.5vw] cursor-pointer bg-transparent text-emerald-500 rotate-180 hover:rotate-[-180] hover:bg-black hover:text-amber-500 rounded-full flex items-center justify-center transition-all duration-500"
                >
                    <i class="pi pi-external-link" style="font-weight: 600; font-size: 0.9vw"></i>
                </button>
            </div>
            <!-- Data Section -->
            <div class="flex h-full w-full items-center gap-3">
                <div class="flex flex-col h-full w-full justify-between gap-3">
                    <!-- Percentages Section -->
                    <div class="flex gap-2 items-center w-full h-full">
                        <span
                            class="font-bold w-full flex flex-col"
                            :class="{ 'text-green-500': load.rkapPercentage > 15, 'text-red-500': load.rkapPercentage <= 15 }"
                        >
                            <span class="text-[1.3vw]">{{ load.rkapPercentage }}%</span>
                            <small class="text-[0.6vw]">RKAP</small>
                        </span>
                        <span
                            class="font-bold w-full flex flex-col"
                            :class="{ 'text-green-500': load.kapasitasUtilityPercentage > 12, 'text-red-500': load.kapasitasUtilityPercentage <= 12 }"
                        >
                            <span class="text-[1.3vw]">{{ load.kapasitasUtilityPercentage }}%</span>
                            <small class="text-[0.6vw]">Utility</small>
                        </span>
                    </div>
                    <!-- Data Summary Section -->
                    <div class="flex flex-col gap-1 w-full h-full">
                        <span class="items-center rounded-xl w-full font-bold bg-black flex py-1.5 px-3">
                            <span class="text-green-500 w-full text-[0.8vw]">CPO Olah</span>
                            <span class="text-pink-600 text-[0.9vw]">{{ load.cpoOlah }}</span>
                        </span>
                        <span class="items-center rounded-xl w-full font-bold bg-black flex py-1.5 px-3">
                            <span class="text-green-500 w-full text-[0.8vw]">RKAP</span>
                            <span class="text-pink-600 text-[0.9vw]">{{ load.rkap }}</span>
                        </span>
                        <span class="items-center rounded-xl w-full font-bold bg-black flex py-1.5 px-3">
                            <span class="text-green-500 w-full text-[0.8vw]">Utility</span>
                            <span class="text-pink-600 text-[0.9vw]">{{ load.kapasitasUtility }}</span>
                        </span>
                        <!-- Cost Section -->
                        <div class="flex gap-2 w-full">
                            <div class="w-full p-2 flex flex-row items-end justify-between font-bold bg-black rounded-xl">
                                <span class="text-[0.7vw] text-cyan-600">Beban Produksi</span>
                                <span class="text-[0.8vw] text-amber-600">{{ load.totalCost }}</span>
                            </div>
                            <div class="w-full p-2 flex flex-row items-end justify-between font-bold bg-black rounded-xl">
                                <span class="text-[0.7vw] text-cyan-600">Rp/Kg CPO Olah</span>
                                <span class="text-[0.8vw] text-amber-600">{{ load.totalHargaSatuan }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
