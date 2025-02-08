<script setup>
import CryptoJS from 'crypto-js';
import { computed, defineProps, onUnmounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
    datas: {
        type: Array,
        default: () => []
    }
});

const currentIndex = ref(0);
const animationClass = ref('slide-in-from-right');
const load = ref([]);

const loadData = async () => {
    load.value = props.datas.map((data) => ({
        name: data.productName || 'No Name',
        total: data.total || 0
    }));
};

const routerLink = (path) => {
    const data = JSON.stringify({ path: path, type: 'scm' });
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

watch(
    () => props.datas,
    () => {
        loadData();
    },
    { deep: true, immediate: true }
);

watch(
    () => load.value,
    (newLoad) => {
        if (newLoad.length > 0) startIndexCycle();
    },
    { deep: true, immediate: true }
);
</script>

<template>
    <div class="bg-gray-800 p-2 rounded-xl shadow-xl flex h-full gap-3 items-start">
        <div class="flex flex-col h-full w-full">
            <!-- Header -->
            <div class="flex items-center gap-3">
                <span class="font-bold w-full text-[0.8vw]">Stok Ritel (dlm Box)</span>
                <button
                    @click="routerLink('stock-ritel')"
                    class="animate-pulse hover:animate-none p-4 w-[1.5vw] h-[1.5vw] cursor-pointer bg-transparent text-emerald-500 rotate-180 hover:rotate-[-180] hover:bg-black hover:text-amber-500 rounded-full flex items-center justify-center transition-all duration-500"
                >
                    <i class="pi pi-external-link" style="font-weight: 600; font-size: 0.9vw"></i>
                </button>
            </div>

            <!-- Card Container -->
            <div class="flex items-start gap-4 h-full relative overflow-hidden">
                <div v-if="displayedCard" :class="animationClass" class="flex gap-2 transition-all duration-500 w-full">
                    <div class="flex w-full h-full justify-between items-center">
                        <span class="font-bold w-full text-[0.9vw] text-pink-400">{{ displayedCard.name }}</span>
                        <div class="flex flex-col items-end justify-center bg-black w-full h-full py-1 px-2 rounded-xl font-bold">
                            <span class="text-[0.8vw]">Aktual</span><span class="text-amber-500 text-[1.4vw]">{{ displayedCard.total }}</span>
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
