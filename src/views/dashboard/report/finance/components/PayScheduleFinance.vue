<script setup>
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

const load = ref({ cff: 0, cfi: 0, period: '' });

const loadData = async () => {
    const data = props.datas;
    load.value = { cff: data.cff, cfi: data.cfi, period: data.period };
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
                <span class="font-bold w-full text-[0.8vw]">Jadwal Tagihan (dlm IDR Miliar)</span>
                <button
                    @click="routerLink('cff-pay-schedule')"
                    class="animate-pulse hover:animate-none p-4 w-[1.5vw] h-[1.5vw] cursor-pointer bg-transparent text-emerald-500 rotate-180 hover:rotate-[-180] hover:bg-black hover:text-amber-500 rounded-full flex items-center justify-center transition-all duration-500"
                >
                    <i class="pi pi-external-link" style="font-weight: 600; font-size: 0.9vw"></i>
                </button>
            </div>
            <div class="flex h-full items-center gap-3">
                <div class="flex gap-1 w-full h-full">
                    <div class="flex flex-col gap-1 p-2 rounded-xl bg-black w-full">
                        <div class="flex gap-2 justify-between items-center">
                            <span class="font-bold text-[0.9vw]">CFF</span>
                            <span class="text-cyan-500 font-bold text-[0.7vw]">s/d {{ load.period }}</span>
                        </div>
                        <div class="flex gap-2 items-center text-amber-500">
                            <span class="font-bold text-[1.2vw]">{{ load.cff }}</span>
                            <!-- <i class="pi pi-sort" style="font-size: 0.8vw"></i> -->
                        </div>
                    </div>
                    <div class="flex flex-col gap-1 p-2 rounded-xl bg-black w-full">
                        <div class="flex gap-2 justify-between items-center">
                            <span class="font-bold text-[0.9vw]">CFI</span>
                        </div>
                        <div class="flex gap-2 items-center text-amber-500">
                            <span class="font-bold text-[1.2vw]">{{ load.cfi }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
