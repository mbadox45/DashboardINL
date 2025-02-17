<script setup>
import CryptoJS from 'crypto-js';
import { defineProps, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
    datas: {
        type: Object,
        default: () => ({})
    }
});

const load = ref({ name: '', icon: '', nilai: 0, persen: 0, versus: '', link: null, colspan: null });

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

onMounted(() => {
    loadData();
});

const routerLink = (path) => {
    const result = path.split('-').pop();
    let data;
    if (result == 'operation') {
        data = JSON.stringify({ path: path, type: 'operation' });
    } else {
        data = JSON.stringify({ path: path, type: 'sdm' });
    }
    const encryptedPath = CryptoJS.AES.encrypt(data, 'your-secret-key').toString();
    router.push({
        path: '/detail-dashboard',
        query: { component: encryptedPath }
    });
};
</script>

<template>
    <div class="bg-gray-800 p-3 rounded-xl shadow-xl flex gap-3 items-start" :class="load.colspan">
        <div class="flex flex-col w-full h-full">
            <div class="flex items-center gap-6">
                <span class="text-[0.8vw] font-bold w-full">SDM (Up to Date)</span>
                <!-- <button
                    v-show="load.link != null"
                    @click="routerLink(load.link)"
                    class="animate-pulse hover:animate-none p-4 w-[1.5vw] h-[1.5vw] cursor-pointer bg-transparent text-emerald-500 rotate-180 hover:rotate-[-180] hover:bg-black hover:text-amber-500 rounded-full flex items-center justify-center transition-all duration-500"
                >
                    <i class="pi pi-external-link" style="font-weight: 600; font-size: 0.9vw"></i>
                </button> -->
            </div>
            <div class="flex items-center gap-4 h-full">
                <div class="w-full flex flex-col justify-between min-h-[3vw] gap-3">
                    <div class="flex flex-col w-full gap-1 h-full justify-between py-2 px-2">
                        <div class="flex gap-1 w-full bg-black p-3 rounded-lg">
                            <div class="flex gap-4 w-full items-center font-bold">
                                <img src="/images/icon/sdm/man.png" alt="Male" class="w-[3vw] h-[3vw]" />
                                <div class="flex flex-col text-blue-500">
                                    <span class="text-[1.4vw]">100</span>
                                    <span class="text-[0.8vw] text-gray-400">Pria</span>
                                </div>
                            </div>
                            <div class="flex gap-4 w-full items-center font-bold">
                                <div class="flex flex-col items-center w-full text-green-500">
                                    <span class="text-[0.8vw] text-gray-400">Total</span>
                                    <span class="text-[1.4vw]">200</span>
                                </div>
                            </div>
                            <div class="flex flex-row-reverse gap-4 w-full items-center font-bold">
                                <img src="/images/icon/sdm/woman.png" alt="Female" class="w-[3vw] h-[3vw]" />
                                <div class="flex flex-col text-pink-500">
                                    <span class="text-[1.4vw]">100</span>
                                    <span class="text-[0.8vw] text-gray-400">Wanita</span>
                                </div>
                            </div>
                        </div>
                        <div class="flex gap-2 w-full items-center text-[0.8vw] font-bold text-amber-500">
                            <span class="w-full">Tetap: 100</span>
                            <span class="w-full">Tidak Tetap: 100</span>
                            <span class="w-full">Safe Manhours: 500,000,000</span>
                        </div>
                    </div>
                </div>
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
