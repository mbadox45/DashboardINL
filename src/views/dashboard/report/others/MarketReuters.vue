<script setup>
import CryptoJS from 'crypto-js';
import { computed, defineProps, onUnmounted, ref, watch } from 'vue';
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

const currentIndex = ref(0);
const animationClass = ref('slide-in-from-right');
const load = ref([]);
const loading = ref('');

const loadData = async () => {
    try {
        loading.value = props.loading;
        load.value = props.datas.map((data) => ({
            name: data.name || 'No Name',
            reuters: data.reuters || 0,
            levyduty: data.levyduty || 0
        }));
    } catch (error) {
        loading.value = props.loading;
        load.value = [
            {
                name: 'No Name',
                reuters: 0,
                levyduty: 0
            }
        ];
    }
};

const routerLink = (path) => {
    const data = JSON.stringify({ path: path, type: 'scm', form: props.formPush });
    const encryptedPath = CryptoJS.AES.encrypt(data, 'your-secret-key').toString();
    router.push({
        path: '/detail-dashboard',
        query: { component: encryptedPath }
    });
};

const displayedCard = computed(() => {
    return load.value.length > 0 ? load.value[currentIndex.value] : [];
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
                <span class="font-bold w-full text-[0.8vw]">Market Router & Levy Duty (USD) Harian</span>
                <button
                    @click="routerLink('reuters-levy-duty')"
                    class="animate-pulse hover:animate-none p-4 w-[1.5vw] h-[1.5vw] cursor-pointer bg-transparent text-emerald-500 rotate-180 hover:rotate-[-180] hover:bg-black hover:text-amber-500 rounded-full flex items-center justify-center transition-all duration-500"
                >
                    <i class="pi pi-external-link" style="font-weight: 600; font-size: 0.9vw"></i>
                </button>
            </div>

            <!-- Card Container -->
            <div class="flex items-start gap-4 h-full relative overflow-hidden">
                <div v-if="displayedCard" :class="animationClass" class="flex gap-2 transition-all duration-500 w-full">
                    <div class="flex flex-col gap-2 w-full bg-black h-full py-1 px-2 rounded-lg">
                        <div class="flex justify-between">
                            <img src="/images/icon/sales/palm-oil.png" alt="Palm Oil" width="50vw" />
                            <span class="text-[1.2vw]">{{ displayedCard.name }}</span>
                        </div>
                        <div class="flex flex-col">
                            <div class="flex justify-between text-green-500 font-bold">
                                <span class="text-[0.6vw]">M. Routers</span><span class="text-[1vw]">{{ displayedCard.reuters }}</span>
                            </div>
                            <div class="flex justify-between text-amber-500 font-bold">
                                <span class="text-[0.6vw]">Levy Duty</span><span class="text-[1vw]">{{ displayedCard.levyduty }}</span>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="flex w-full h-full justify-between items-center">
                        <span class="font-bold w-full text-[0.9vw] text-pink-400">{{ displayedCard.name }}</span>
                        <div class="flex flex-col items-end justify-center bg-black w-full h-full py-1 px-2 rounded-xl font-bold">
                            <span class="text-[0.8vw]">Aktual</span><span class="text-amber-500 text-[1.4vw]">{{ displayedCard.total }}</span>
                        </div>
                    </div> -->
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
