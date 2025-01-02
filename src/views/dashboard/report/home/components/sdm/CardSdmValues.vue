<script setup>
import { defineProps, onMounted, onUnmounted, ref, watch } from 'vue';

const props = defineProps({
    datas: {
        type: Object,
        default: () => ({})
    }
});

const load = ref({ name: '', icon: '', nilai: 0, persen: 0, versus: '', link: null, colspan: null });
const currentIndex = ref(0);
const animationClass = ref('fade-in');

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

// Start the auto-cycling timer
const startIndexCycle = () => {
    if (load.value.versus.length <= 1) {
        animationClass.value = 'fade-in';
        return;
    }

    clearInterval(intervalId); // Clear any existing timer
    intervalId = setInterval(() => {
        animationClass.value = 'fade-out';
        setTimeout(() => {
            currentIndex.value = (currentIndex.value + 1) % load.value.versus.length;
            animationClass.value = 'fade-in';
        }, 500);
    }, 5000); // Restart with a 5-second interval
};

// Reset the timer and navigate to the next index
const nextIndex = () => {
    if (load.value.versus.length > 1) {
        animationClass.value = 'fade-out';
        setTimeout(() => {
            currentIndex.value = (currentIndex.value + 1) % load.value.versus.length;
            animationClass.value = 'fade-in';
            startIndexCycle(); // Restart the timer
        }, 500);
    }
};

// Reset the timer and navigate to the previous index
const prevIndex = () => {
    if (load.value.versus.length > 1) {
        animationClass.value = 'fade-out';
        setTimeout(() => {
            currentIndex.value = (currentIndex.value - 1 + load.value.versus.length) % load.value.versus.length;
            animationClass.value = 'fade-in';
            startIndexCycle(); // Restart the timer
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
                <span class="text-[0.55vw] font-bold w-full">{{ load.name }}</span>
                <router-link
                    v-show="load.link != null"
                    :to="load.link"
                    class="animate-pulse hover:animate-none p-4 w-[1.5vw] h-[1.5vw] cursor-pointer bg-transparent text-emerald-500 rotate-180 hover:rotate-[-180] hover:bg-black hover:text-amber-500 rounded-full flex items-center justify-center transition-all duration-500"
                >
                    <i class="pi pi-external-link" style="font-weight: 600; font-size: 0.9vw"></i>
                </router-link>
            </div>
            <div class="flex items-center gap-4 h-full">
                <img v-show="load.icon != null" :src="load.icon" alt="Icon" class="hidden lg:flex w-[3vw] h-[3vw]" />
                <div class="w-full flex flex-col justify-between min-h-[3vw] gap-3">
                    <div class="h-full" v-show="load.nilai != null" v-html="load.nilai"></div>
                    <!-- <div :class="animationClass" class="min-h-[7vw]" v-html="load.versus[currentIndex]"></div> -->
                    <div :class="animationClass" v-html="load.versus[currentIndex]"></div>
                    <!-- <div class="min-h-[7vw]" v-html="load.versus[currentIndex]"></div> -->
                </div>
            </div>
            <div v-if="load.versus.length > 1" class="flex justify-between pt-1">
                <button @click="prevIndex" class="p-1 bg-gray-700 text-white text-sm rounded hover:bg-gray-600 transition flex items-center text-[0.6vw]"><i class="pi pi-chevron-left mr-1" style="font-size: 0.6vw"></i> Prev</button>
                <button @click="nextIndex" class="p-1 bg-gray-700 text-white text-sm rounded hover:bg-gray-600 transition flex items-center text-[0.6vw]">Next <i class="pi pi-chevron-right ml-1" style="font-size: 0.6vw"></i></button>
            </div>
        </div>
    </div>
</template>

<style>
.fade-in {
    opacity: 0;
    animation: fadeIn 0.8s forwards;
}

.fade-out {
    opacity: 1;
    animation: fadeOut 0.8s forwards;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes fadeOut {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}
</style>
