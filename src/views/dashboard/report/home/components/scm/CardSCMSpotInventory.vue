<script setup>
import { defineProps, onMounted, onUnmounted, ref, watch } from 'vue';

const props = defineProps({
    datas: {
        type: Object,
        default: () => ({})
    }
});

const load = ref({
    name: '',
    icon: '',
    nilai: 0,
    persen: 0,
    versus: [],
    link: null,
    colspan: null
});

const currentIndex = ref(0);
const animationClass = ref('slide-in-from-right');

const loadData = async () => {
    const data = props.datas;
    load.value = {
        name: data.name,
        icon: data.icon,
        nilai: data.value,
        persen: null,
        versus: data.versus,
        link: data.link,
        colspan: data.colspan
    };
};

watch(() => props.datas, loadData, { immediate: true });

let intervalId;

const startIndexCycle = () => {
    if (load.value.versus.length <= 2) {
        animationClass.value = 'slide-in-from-right';
        return;
    }

    clearInterval(intervalId);
    intervalId = setInterval(() => {
        animationClass.value = 'slide-out-to-left';
        setTimeout(() => {
            currentIndex.value = (currentIndex.value + 2) % load.value.versus.length;
            animationClass.value = 'slide-in-from-right';
        }, 500);
    }, 5000);
};

const nextIndex = () => {
    if (load.value.versus.length > 2) {
        animationClass.value = 'slide-out-to-left';
        setTimeout(() => {
            currentIndex.value = (currentIndex.value + 2) % load.value.versus.length;
            animationClass.value = 'slide-in-from-right';
            startIndexCycle();
        }, 500);
    }
};

const prevIndex = () => {
    if (load.value.versus.length > 2) {
        animationClass.value = 'slide-out-to-right';
        setTimeout(() => {
            currentIndex.value = (currentIndex.value - 2 + load.value.versus.length) % load.value.versus.length;
            animationClass.value = 'slide-in-from-left';
            startIndexCycle();
        }, 500);
    }
};

onMounted(() => {
    loadData();
    startIndexCycle();
});

onUnmounted(() => {
    clearInterval(intervalId);
});
</script>

<template>
    <div class="bg-gray-800 p-3 rounded-xl shadow-xl flex gap-3 items-start" :class="load.colspan">
        <div class="flex flex-col w-full h-full">
            <div class="flex items-center gap-6">
                <span class="text-[0.8vw] font-bold w-full">{{ load.name }}</span>
            </div>
            <div class="flex items-center gap-4 h-full relative overflow-hidden">
                <div :class="animationClass" class="flex transition-all duration-500 w-full">
                    <div v-for="(item, index) in [load.versus[currentIndex], load.versus[(currentIndex + 1) % load.versus.length]]" :key="index" class="w-1/2 text-center" v-html="item"></div>
                </div>
            </div>
            <div v-if="load.versus.length > 2" class="flex justify-between mt-2">
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
