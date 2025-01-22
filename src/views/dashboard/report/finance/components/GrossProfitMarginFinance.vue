<script setup>
// import { encryptQuery } from '@/controller/dummyController';
import CryptoJS from 'crypto-js';
import { defineProps, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
// import

const router = useRouter();

const props = defineProps({
    datas: {
        type: Object,
        default: () => ({})
    }
});

const load = ref({ value: 0, laba_kotor: '', nilai: 0, persen: 0, versus: '', color: '', link: null, colspan: null });

const loadData = async () => {
    const data = props.datas;
    load.value = { name: data.name, icon: data.icon, nilai: data.value, persen: null, versus: data.versus, color: data.color, link: data.link, colspan: data.colspan };
};

const routerLink = (path) => {
    const data = JSON.stringify({ path: path, type: 'financial' });
    const encryptedPath = CryptoJS.AES.encrypt(data, 'your-secret-key').toString();
    router.push({
        path: '/detail-dashboard',
        query: { component: encryptedPath }
    });
};

watch(() => props.datas, loadData, { immediate: true });
</script>
<template>
    <div class="bg-gray-800 p-2 rounded-xl shadow-xl min-h-[120px] flex h-full gap-3 items-start">
        <div class="flex flex-col h-full w-full">
            <div class="flex items-center gap-3">
                <span class="font-bold w-full text-[0.8vw]">Margin Laba Kotor (dlm IDR Miliar)</span>
                <button
                    @click="routerLink('gross-profit')"
                    class="animate-pulse hover:animate-none p-4 w-[1.5vw] h-[1.5vw] cursor-pointer bg-transparent text-emerald-500 rotate-180 hover:rotate-[-180] hover:bg-black hover:text-amber-500 rounded-full flex items-center justify-center transition-all duration-500"
                >
                    <i class="pi pi-external-link" style="font-weight: 600; font-size: 0.9vw"></i>
                </button>
            </div>
            <div class="flex h-full items-center gap-3">
                <img src="/images/icon/financial/gross-profit.png" alt="Icon" class="w-[3vw] h-[3vw] mr-1" />
                <div class="flex gap-1 items-center h-full mt-3 w-full">
                    <div class="flex gap-2 items-center h-full w-full">
                        <span class="font-bold text-[1vw]">79.5</span>
                    </div>
                    <div class="flex gap-1 w-full items-end">
                        <div class="font-bold flex w-full flex-col-reverse items-center">
                            <div class="flex gap-1 items-center text-green-600">
                                <i class="pi pi-sort-up-fill" style="font-size: 0.6vw"></i>
                                <span class="text-[0.6vw]">Rp 1.2</span>
                            </div>
                            <span class="text-white text-[0.6vw]">Laba Kotor</span>
                            <span class="text-green-600 text-[0.8vw]">Rp 11.8</span>
                        </div>
                        <div class="font-bold flex w-full flex-col-reverse items-center">
                            <div class="flex gap-1 items-center text-red-600">
                                <i class="pi pi-sort-down-fill" style="font-size: 0.6vw"></i>
                                <span class="text-[0.6vw]">-0.58%</span>
                            </div>
                            <span class="text-white text-[0.6vw]">GPM</span>
                            <span class="text-red-600 text-[0.8vw]">4.85%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
