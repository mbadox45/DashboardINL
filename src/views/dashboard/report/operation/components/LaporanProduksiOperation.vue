<script setup>
import CryptoJS from 'crypto-js';
import { computed, defineProps, onUnmounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
    datas: {
        type: Array,
        default: () => []
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

const currentIndex = ref(0);
const animationClass = ref('slide-in-from-right');
const load = ref([]);
const loading = ref('');

const loadData = async () => {
    loading.value = props.loading;
    load.value = props.datas.map((data) => ({
        jenisProduksi: data.jenisProduksi || '',
        losses: data.losses || 0,
        lossesPercentage: data.lossesPercentage || 0,
        bahanOlah: data.bahanOlah || [],
        items: data.items || []
    }));
};

const routerLink = (path) => {
    const data = JSON.stringify({ path: path, type: 'operation', form: props.formPush });
    const encryptedPath = CryptoJS.AES.encrypt(data, 'your-secret-key').toString();
    router.push({
        path: '/detail-dashboard',
        query: { component: encryptedPath }
    });
};

const displayedCard = computed(() => {
    return load.value.length > 0 ? load.value[currentIndex.value] : null;
});

let intervalId;

const startIndexCycle = () => {
    clearInterval(intervalId);
    if (load.value.length > 1) {
        intervalId = setInterval(() => {
            animationClass.value = 'slide-out-to-left';
            setTimeout(() => {
                currentIndex.value = (currentIndex.value + 1) % load.value.length;
                animationClass.value = 'slide-in-from-right';
            }, 500);
        }, 5000);
    }
};

const nextIndex = () => {
    if (load.value.length > 1) {
        animationClass.value = 'slide-out-to-left';
        setTimeout(() => {
            currentIndex.value = (currentIndex.value + 1) % load.value.length;
            animationClass.value = 'slide-in-from-right';
            startIndexCycle();
        }, 500);
    }
};

const prevIndex = () => {
    if (load.value.length > 1) {
        animationClass.value = 'slide-out-to-right';
        setTimeout(() => {
            currentIndex.value = (currentIndex.value - 1 + load.value.length) % load.value.length;
            animationClass.value = 'slide-in-from-left';
            startIndexCycle();
        }, 500);
    }
};

onUnmounted(() => {
    clearInterval(intervalId);
});

watch(() => props.datas, loadData, { immediate: true });
watch(() => props.formPush, loadData, { immediate: true });
watch(() => load.value, startIndexCycle, { immediate: true });
watch(() => props.loading, loadData, { immediate: true });
</script>

<template>
    <div class="bg-gray-800 rounded-xl shadow-xl min-h-[120px] flex h-full gap-3 items-start">
        <div class="flex flex-col relative h-full w-full p-2">
            <div v-if="loading == 'loading'" class="absolute flex items-center justify-center gap-2 left-0 top-0 rounded-xl w-full h-full bg-[rgba(255,255,255,0.9)]">
                <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="transparent" animationDuration=".5s" />
            </div>
            <!-- Header -->
            <div class="flex items-center gap-3">
                <span class="font-bold w-full text-[0.8vw]">Laporan Produksi (Kg) Akumulasi Harian</span>
                <button
                    @click="routerLink('laporan-produksi-operation')"
                    class="animate-pulse hover:animate-none p-4 w-[1.5vw] h-[1.5vw] cursor-pointer bg-transparent text-emerald-500 rotate-180 hover:rotate-[-180] hover:bg-black hover:text-amber-500 rounded-full flex items-center justify-center transition-all duration-500"
                >
                    <i class="pi pi-external-link" style="font-weight: 600; font-size: 0.9vw"></i>
                </button>
            </div>

            <!-- Card Container -->
            <div class="flex items-start gap-4 h-full relative overflow-hidden">
                <div v-if="displayedCard" :class="animationClass" class="flex gap-2 transition-all duration-500 w-full">
                    <div class="w-full flex items-end gap-2 mt-2">
                        <div class="flex flex-col w-full gap-2">
                            <span class="text-[0.8vw] font-bold text-green-500">{{ displayedCard.jenisProduksi }}</span>
                            <div class="flex flex-col w-full gap-2 text-amber-500">
                                <div class="flex w-full items-center gap-2">
                                    <div v-if="displayedCard.bahanOlah.length > 0" v-for="(item, index) in displayedCard.bahanOlah" :key="index" class="py-[0.9px] px-3 rounded-xl flex w-full items-center justify-between bg-black">
                                        <span class="font-bold text-[0.8vw]">{{ item.name }} Produksi</span>
                                        <span class="text-[0.9vw] font-bold">{{ item.totalQty }}</span>
                                    </div>
                                </div>
                                <div class="flex w-full items-center gap-2">
                                    <div v-if="displayedCard.items.length > 0" v-for="(item, index) in displayedCard.items" :key="index" class="py-[0.9px] px-3 rounded-xl flex flex-col w-full gap-1 items-end bg-black">
                                        <div class="flex flex-col items-end">
                                            <span class="text-[0.9vw] font-bold">{{ item.totalQty }}</span>
                                            <span class="text-[0.8vw]">{{ item.name }}</span>
                                        </div>
                                        <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                                            <span class="text-[0.8vw]">Yield</span>
                                            <span class="text-[0.9vw] font-bold">{{ item.yieldPercentage }}%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="displayedCard.jenisProduksi == 'Refinery'" class="flex flex-col gap-3 justify-start h-full">
                                <div class="px-3 py-1 flex flex-row-reverse justify-between w-full font-bold items-end bg-cyan-500 text-black rounded-xl">
                                    <span class="text-[0.7vw]">{{ displayedCard.losses }}</span>
                                    <span class="text-[0.65vw]">Losses</span>
                                </div>
                                <div class="px-3 py-1 flex flex-row-reverse justify-between w-full font-bold items-end bg-cyan-500 text-black rounded-xl">
                                    <span class="text-[0.7vw]">{{ displayedCard.lossesPercentage }}%</span>
                                    <span class="text-[0.65vw]">Losses (%)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else class="text-white">No data available</div>
            </div>

            <!-- Navigation -->
            <div v-if="load.length > 1" class="flex justify-between mt-2">
                <button @click="prevIndex" class="p-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition flex items-center text-[0.6vw] w-[1vw] h-[1vw] justify-center">
                    <i class="pi pi-chevron-left mr-1" style="font-size: 0.5vw"></i>
                </button>
                <button @click="nextIndex" class="p-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition flex items-center text-[0.6vw] w-[1vw] h-[1vw] justify-center">
                    <i class="pi pi-chevron-right ml-1" style="font-size: 0.5vw"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<style>
.slide-in-from-right {
    transform: translateX(100%);
    animation: slideInFromRight 0.5s forwards;
}

.slide-out-to-left {
    transform: translateX(0);
    animation: slideOutToLeft 0.5s forwards;
}

.slide-in-from-left {
    transform: translateX(-100%);
    animation: slideInFromLeft 0.5s forwards;
}

.slide-out-to-right {
    transform: translateX(0);
    animation: slideOutToRight 0.5s forwards;
}

@keyframes slideInFromRight {
    from {
        transform: translateX(100%);
    }
    to {
        transform: translateX(0);
    }
}

@keyframes slideOutToLeft {
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(-100%);
    }
}

@keyframes slideInFromLeft {
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(0);
    }
}

@keyframes slideOutToRight {
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(100%);
    }
}
</style>
