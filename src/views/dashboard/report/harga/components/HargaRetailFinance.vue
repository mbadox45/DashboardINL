<script setup>
import CryptoJS from 'crypto-js';
import { computed, defineProps, onUnmounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
    datas: {
        type: Object,
        default: () => []
    },
    formPush: {
        type: Object,
        default: () => ({})
    }
});

const currentIndex = ref(0);
const animationClass = ref('slide-in-from-right');
const load = ref([]);

const loadData = async () => {
    const data = props.datas;
    const list = [];
    for (let i = 0; i < data.length; i++) {
        list.push({
            title: data[i].produk,
            spotRp: data[i].spotRp,
            spotUsd: data[i].spotUsd,
            invRp: data[i].invRp,
            invUsd: data[i].invUsd
        });
    }
    load.value = list;
};

const routerLink = (path) => {
    const data = JSON.stringify({ path: path, type: 'financial', form: props.formPush });
    const encryptedPath = CryptoJS.AES.encrypt(data, 'your-secret-key').toString();
    router.push({
        path: '/detail-dashboard',
        query: { component: encryptedPath }
    });
};

const displayedCards = computed(() => {
    const versusArray = Array.isArray(load.value) ? load.value : [];
    const length = versusArray.length;
    if (length === 0) return [];
    return [versusArray[currentIndex.value], versusArray[(currentIndex.value + 1) % length]];
});

let intervalId;

const startIndexCycle = () => {
    clearInterval(intervalId);
    intervalId = setInterval(() => {
        animationClass.value = 'slide-out-to-left';
        setTimeout(() => {
            currentIndex.value = (currentIndex.value + 2) % load.value.length;
            animationClass.value = 'slide-in-from-right';
        }, 500);
    }, 5000);
};

const nextIndex = () => {
    if (load.value.length > 2) {
        animationClass.value = 'slide-out-to-left';
        setTimeout(() => {
            currentIndex.value = (currentIndex.value + 2) % load.value.length;
            animationClass.value = 'slide-in-from-right';
            startIndexCycle();
        }, 500);
    }
};

const prevIndex = () => {
    if (load.value.length > 2) {
        animationClass.value = 'slide-out-to-right';
        setTimeout(() => {
            currentIndex.value = (currentIndex.value - 2 + load.value.length) % load.value.length;
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
</script>

<template>
    <div class="bg-gray-800 p-2 rounded-xl shadow-xl min-h-[120px] flex h-full gap-3 items-start">
        <div class="flex flex-col h-full w-full">
            <div class="flex items-center gap-3">
                <span class="font-bold w-full text-[0.8vw]">Harga Spot & Inventory Retail (Harian)</span>
                <button
                    @click="routerLink('harga-spot-inventory-retail')"
                    class="animate-pulse hover:animate-none p-4 w-[1.5vw] h-[1.5vw] cursor-pointer bg-transparent text-emerald-500 rotate-180 hover:rotate-[-180] hover:bg-black hover:text-amber-500 rounded-full flex items-center justify-center transition-all duration-500"
                >
                    <i class="pi pi-external-link" style="font-weight: 600; font-size: 0.9vw"></i>
                </button>
            </div>
            <div class="flex items-center gap-4 h-full relative overflow-hidden">
                <div :class="animationClass" class="flex gap-2 transition-all duration-500 w-full">
                    <div v-for="(card, index) in displayedCards" :key="index" class="flex flex-col gap-1 p-2 bg-black rounded-xl w-full">
                        <span class="font-bold text-[0.8vw]">{{ card.title }}</span>
                        <div class="flex gap-1 w-full">
                            <div class="flex flex-col gap-1 w-full">
                                <div class="flex flex-col text-amber-600 justify-between items-end w-full">
                                    <span class="text-[0.8vw] font-bold">{{ card.spotRp }}</span>
                                    <span class="text-[0.7vw] text-cyan-500">Spot (Rp/Box)</span>
                                </div>
                                <div class="flex flex-col text-amber-600 justify-between items-end w-full">
                                    <span class="text-[0.8vw] font-bold">{{ card.spotUsd }}</span>
                                    <span class="text-[0.7vw] text-cyan-500">Spot (USD/Box)</span>
                                </div>
                            </div>
                            <div class="flex flex-col gap-1 w-full">
                                <div class="flex flex-col text-green-600 justify-between items-end w-full">
                                    <span class="text-[0.8vw] font-bold">{{ card.invRp }}</span>
                                    <span class="text-[0.7vw] text-cyan-500">Inv. (Rp/Box)</span>
                                </div>
                                <div class="flex flex-col text-green-600 justify-between items-end w-full">
                                    <span class="text-[0.8vw] font-bold">{{ card.invUsd }}</span>
                                    <span class="text-[0.7vw] text-cyan-500">Inv. (USD/Box)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="load.length > 2" class="flex justify-between mt-2">
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
