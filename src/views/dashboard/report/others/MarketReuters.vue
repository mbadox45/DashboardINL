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
    const data = JSON.stringify({ path: path, type: 'scm' });
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
                <span class="text-[0.8vw] font-bold w-full">Market Router & Levy Duty (USD)</span>
                <button
                    @click="routerLink('reuters-levy-duty')"
                    class="animate-pulse hover:animate-none p-4 w-[1.5vw] h-[1.5vw] cursor-pointer bg-transparent text-emerald-500 rotate-180 hover:rotate-[-180] hover:bg-black hover:text-amber-500 rounded-full flex items-center justify-center transition-all duration-500"
                >
                    <i class="pi pi-external-link" style="font-weight: 600; font-size: 0.9vw"></i>
                </button>
            </div>
            <div class="flex items-center gap-4 h-full">
                <div class="flex flex-col gap-2 w-full bg-black h-full py-1 px-2 rounded-lg">
                    <div class="flex justify-between">
                        <img src="/images/icon/sales/palm-oil.png" alt="Palm Oil" width="50vw" />
                        <span class="text-[1.2vw]">RBDPO</span>
                    </div>
                    <div class="flex flex-col">
                        <div class="flex justify-between text-green-500 font-bold"><span class="text-[0.6vw]">M. Routers</span><span class="text-[1vw]">965.00</span></div>
                        <div class="flex justify-between text-amber-500 font-bold"><span class="text-[0.6vw]">Levy Duty</span><span class="text-[1vw]">78.00</span></div>
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
