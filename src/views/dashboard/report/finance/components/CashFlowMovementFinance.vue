<script setup>
import { valueColorIntCondition } from '@/controller/dummyController';
import CryptoJS from 'crypto-js';
import { defineProps, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
    datas: {
        type: Object,
        default: () => ({})
    },
    formPush: {
        type: Object,
        default: () => ({})
    }
});

const load = ref({ total: 0, cff: 0, cffStatus: '', cfi: 0, cfiStatus: '', cfoIn: 0, cfoInStatus: '', cfoOut: 0, cfoOutStatus: '' });

const loadData = async () => {
    const data = props.datas;
    load.value = { total: data.total, cff: data.cff, cffStatus: data.cffStatus, cfi: data.cfi, cfiStatus: data.cfiStatus, cfoIn: data.cfoIn, cfoInStatus: data.cfoInStatus, cfoOut: data.cfoOut, cfoOutStatus: data.cfoOutStatus };
};

const routerLink = (path) => {
    const data = JSON.stringify({ path: path, type: 'financial', form: props.formPush });
    const encryptedPath = CryptoJS.AES.encrypt(data, 'your-secret-key').toString();
    router.push({
        path: '/detail-dashboard',
        query: { component: encryptedPath }
    });
};

watch(() => props.datas, loadData, { immediate: true });
watch(() => props.formPush, loadData, { immediate: true });
</script>
<template>
    <div class="bg-gray-800 p-2 rounded-xl shadow-xl flex h-full gap-3 items-start">
        <div class="flex flex-col h-full w-full">
            <div class="flex items-center gap-3">
                <span class="font-bold w-full text-[0.8vw]">Pergerakan Arus Kas (dlm IDR Miliar)</span>
                <button
                    @click="routerLink('cash-flow-movement')"
                    class="animate-pulse hover:animate-none p-4 w-[1.5vw] h-[1.5vw] cursor-pointer bg-transparent text-emerald-500 rotate-180 hover:rotate-[-180] hover:bg-black hover:text-amber-500 rounded-full flex items-center justify-center transition-all duration-500"
                >
                    <i class="pi pi-external-link" style="font-weight: 600; font-size: 0.9vw"></i>
                </button>
            </div>
            <div class="flex h-full items-center gap-3">
                <!-- <img src="/images/icon/financial/revenue.png" alt="Icon" class="w-[3vw] h-[3vw] mr-1" /> -->
                <div class="flex flex-col gap-2 w-full">
                    <div class="flex gap-2 items-center" :class="valueColorIntCondition(load.total)">
                        <span class="font-bold text-[1.2vw]">{{ load.total }}</span>
                    </div>
                    <div class="text-[0.8vw] flex gap-3 w-full">
                        <div class="flex flex-col w-full">
                            <div class="flex gap-1 w-full items-center" :class="load.cfoInStatus == 'negative' ? 'text-red-500' : 'text-green-500'">
                                <i :class="`pi pi-sort-${load.cfoInStatus == 'negative' ? 'down' : 'up'}-fill`" style="font-size: 0.8vw"></i>
                                <div class="font-bold flex w-full">
                                    <span class="w-full">CFO In</span>
                                    <div class="w-full flex gap-2">
                                        <span class="">:</span><span class="">{{ load.cfoInStatus == 'negative' ? '-' : '' }}{{ load.cfoIn }}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="flex gap-1 w-full items-center" :class="load.cfoOutStatus == 'negative' ? 'text-red-500' : 'text-green-500'">
                                <i :class="`pi pi-sort-${load.cfoOutStatus == 'negative' ? 'down' : 'up'}-fill`" style="font-size: 0.8vw"></i>
                                <div class="font-bold flex w-full">
                                    <span class="w-full">CFO Out</span>
                                    <div class="w-full flex gap-2">
                                        <span class="">:</span><span class="">{{ load.cfoOutStatus == 'negative' ? '-' : '' }}{{ load.cfoOut }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col w-full">
                            <div class="flex gap-1 w-full items-center" :class="load.cfiStatus == 'negative' ? 'text-red-500' : 'text-green-500'">
                                <i :class="`pi pi-sort-${load.cfiStatus == 'negative' ? 'down' : 'up'}-fill`" style="font-size: 0.8vw"></i>
                                <div class="font-bold flex w-full">
                                    <span class="w-1/2">CFI</span>
                                    <div class="w-full flex gap-2">
                                        <span class="">:</span><span class="">{{ load.cfiStatus == 'negative' ? '-' : '' }}{{ load.cfi }}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="flex gap-1 w-full items-center" :class="load.cffStatus == 'negative' ? 'text-red-500' : 'text-green-500'">
                                <i :class="`pi pi-sort-${load.cffStatus == 'negative' ? 'down' : 'up'}-fill`" style="font-size: 0.8vw"></i>
                                <div class="font-bold flex w-full">
                                    <span class="w-1/2">CFF</span>
                                    <div class="w-full flex gap-2">
                                        <span class="">:</span><span class="">{{ load.cffStatus == 'negative' ? '-' : '' }}{{ load.cff }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
