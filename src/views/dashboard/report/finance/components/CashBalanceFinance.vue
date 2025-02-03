<script setup>
import CryptoJS from 'crypto-js';
import moment from 'moment';
import { defineProps, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
    datas: {
        type: Object,
        default: () => ({})
    }
});

const load = ref({ total: 0, status: '', bulan: moment().format('MMMM YYYY') });

const loadData = async () => {
    const data = props.datas;
    load.value = { total: data.value, status: data.status, bulan: moment().format('MMMM YYYY') };
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
    <div class="bg-gray-800 p-2 rounded-xl shadow-xl flex h-full gap-3 items-start">
        <div class="flex flex-col h-full w-full">
            <div class="flex items-center gap-3">
                <span class="font-bold w-full text-[0.8vw]">Saldo Tunai (dlm IDR Miliar)</span>
                <button
                    @click="routerLink('cash-balance')"
                    class="animate-pulse hover:animate-none p-4 w-[1.5vw] h-[1.5vw] cursor-pointer bg-transparent text-emerald-500 rotate-180 hover:rotate-[-180] hover:bg-black hover:text-amber-500 rounded-full flex items-center justify-center transition-all duration-500"
                >
                    <i class="pi pi-external-link" style="font-weight: 600; font-size: 0.9vw"></i>
                </button>
            </div>
            <div class="flex h-full items-center gap-3">
                <img src="/images/icon/financial/revenue.png" alt="Icon" class="w-[3vw] h-[3vw] mr-1" />
                <div class="flex flex-col gap-2">
                    <div class="flex gap-2 items-center" :class="load.status == 'up' ? 'text-green-500' : load.status == 'down' ? 'text-red-500' : 'text-amber-500'">
                        <span class="font-bold text-[1.5vw]">{{ load.total }}</span>
                        <i :class="`pi pi-sort-${load.status}-fill`" style="font-size: 1vw" />
                    </div>
                    <div class="text-[0.8vw] flex flex-col w-full">
                        <span class="text-cyan-500 font-bold">s/d {{ load.bulan }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
