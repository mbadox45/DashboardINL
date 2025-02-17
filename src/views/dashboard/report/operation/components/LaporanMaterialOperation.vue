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
    }
});

const currentIndex = ref(0);
const animationClass = ref('slide-in-from-right');
const load = ref([]);

const loadData = async () => {
    load.value = props.datas.map((data) => ({
        name: data.jenisMaterial || 'No Name',
        incoming: data.incoming || [],
        outgoing: data.outgoing || [],
        totalPemakaian: data.totalPemakaian || 0,
        selisih: data.selisih || 0
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
</script>

<template>
    <div class="bg-gray-800 p-2 rounded-xl shadow-xl min-h-[120px] flex h-full gap-3 items-start">
        <div class="flex flex-col h-full w-full">
            <!-- Header -->
            <div class="flex items-center gap-3">
                <span class="font-bold w-full text-[0.8vw]">Pemakaian Material (Akumulasi Harian)</span>
                <button
                    @click="routerLink('laporan-material')"
                    class="animate-pulse hover:animate-none p-4 w-[1.5vw] h-[1.5vw] cursor-pointer bg-transparent text-emerald-500 rotate-180 hover:rotate-[-180] hover:bg-black hover:text-amber-500 rounded-full flex items-center justify-center transition-all duration-500"
                >
                    <i class="pi pi-external-link" style="font-weight: 600; font-size: 0.9vw"></i>
                </button>
            </div>

            <!-- Card Container -->
            <div class="flex items-start gap-4 h-full relative overflow-hidden">
                <div v-if="displayedCard" :class="animationClass" class="flex gap-2 transition-all duration-500 w-full">
                    <!-- Format Laporan Material -->
                    <div class="w-full flex items-end gap-2 mt-2">
                        <div class="flex flex-col w-full gap-2">
                            <span class="text-[0.8vw] font-bold">{{ displayedCard.name }}</span>
                            <div class="flex flex-col w-full gap-2 text-amber-500">
                                <div class="py-[0.9px] px-3 rounded-xl flex flex-col gap-1 bg-black">
                                    <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full">
                                        <span class="text-[0.8vw] font-bold text-white">{{ displayedCard.totalPemakaian }}</span>
                                        <span class="font-bold text-[0.7vw] uppercase text-cyan-500">Total Pemakaian</span>
                                    </div>
                                </div>
                                <div class="flex flex-col gap-2 w-full">
                                    <div v-if="displayedCard.incoming.length > 0" class="py-[0.9px] px-3 rounded-xl flex flex-col w-full gap-1 bg-black">
                                        <span class="text-[0.7vw] text-cyan-500">Incoming</span>
                                        <div v-for="(item, index) in displayedCard.incoming" :key="index" class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                                            <span class="text-[0.8vw] font-bold">{{ item.value }}</span>
                                            <span class="text-[0.7vw] text-white">{{ item.name }}</span>
                                        </div>
                                    </div>
                                    <div v-if="displayedCard.outgoing.length > 0" class="py-[0.9px] px-3 rounded-xl flex flex-col w-full gap-1 bg-black">
                                        <div class="flex items-center justify-between w-full text-amber-600">
                                            <div class="flex flex-col gap-1 w-full">
                                                <span class="text-[0.7vw] w-full border-b pb-1 border-neutral-800 text-cyan-500">{{ displayedCard.incoming.length > 0 ? 'Outgoing' : 'Detail' }}</span>
                                                <span class="text-[0.7vw] w-full text-white" v-for="(item, index) in displayedCard.outgoing" :key="index">{{ item.name }}</span>
                                            </div>
                                            <div class="flex flex-col gap-1 w-1/2">
                                                <span class="text-[0.7vw] w-full text-right border-b pb-1 border-neutral-800 text-cyan-500">Quantity</span>
                                                <span class="text-[0.7vw] w-full text-right font-bold text-cyan-500" v-for="(item, index) in displayedCard.outgoing" :key="index">{{ item.value }}</span>
                                            </div>
                                            <div class="flex flex-col gap-1 w-1/4">
                                                <span class="text-[0.7vw] w-full text-right border-b pb-1 border-neutral-800 text-cyan-500">Norma</span>
                                                <span class="text-[0.7vw] w-full text-right font-bold text-green-500" v-for="(item, index) in displayedCard.outgoing" :key="index">{{ item.norma }}</span>
                                            </div>
                                            <div class="flex flex-col gap-1 w-1/4">
                                                <span class="text-[0.7vw] w-full text-right border-b pb-1 border-neutral-800 text-cyan-500">Usage</span>
                                                <span class="text-[0.7vw] w-full text-right font-bold" v-for="(item, index) in displayedCard.outgoing" :key="index" :class="`text-${item.color}-500`">{{ item.usage }}</span>
                                            </div>
                                        </div>
                                        <!-- <div v-for="(item, index) in displayedCard.outgoing" :key="index" class="flex items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                                            <span class="text-[0.7vw]">{{ item.name }}</span>
                                            <span class="text-[0.8vw] font-bold">{{ item.value }}</span>
                                            <span class="text-[0.8vw] font-bold">{{ item.norma }}</span>
                                        </div> -->
                                    </div>
                                </div>
                                <div class="col-span-2 py-[0.9px] px-3 rounded-xl flex items-center justify-between bg-black text-red-500">
                                    <span class="font-bold text-[0.7vw] uppercase">Selisih</span>
                                    <span class="text-[0.8vw] font-bold">{{ displayedCard.selisih }}</span>
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
