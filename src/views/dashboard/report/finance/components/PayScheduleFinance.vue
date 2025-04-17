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
    },
    loading: {
        type: String,
        default: ''
    }
});

const load = ref({ cff: 0, cfi: 0, period: '', cfo: 0 });
const loading = ref('');

const loadData = async () => {
    const data = props.datas;
    loading.value = props.loading;
    load.value = { cff: data.cff, cfi: data.cfi, period: data.period, cfo: data.cfo || 0 };
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
watch(() => props.loading, loadData, { immediate: true });
</script>
<template>
    <div class="bg-gray-800 rounded-xl shadow-xl min-h-[120px] flex h-full gap-3 items-start">
        <div class="flex flex-col relative h-full w-full p-2">
            <div v-if="loading == 'loading'" class="absolute flex items-center justify-center gap-2 left-0 top-0 rounded-xl w-full h-full bg-[rgba(255,255,255,0.9)]">
                <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="transparent" animationDuration=".5s" />
            </div>
            <div class="flex items-center gap-3">
                <span class="font-bold w-full text-[0.8vw]">Jadwal Tagihan (IDR Miliar)</span>
                <button
                    @click="routerLink('cff-pay-schedule')"
                    class="animate-pulse hover:animate-none p-4 w-[1.5vw] h-[1.5vw] cursor-pointer bg-transparent text-emerald-500 rotate-180 hover:rotate-[-180] hover:bg-black hover:text-amber-500 rounded-full flex items-center justify-center transition-all duration-500"
                >
                    <i class="pi pi-external-link" style="font-weight: 600; font-size: 0.9vw"></i>
                </button>
            </div>
            <div class="flex h-full items-center gap-3">
                <div class="flex gap-1 flex-col w-full h-full">
                    <div class="flex justify-between items-center gap-1 p-2 rounded-xl bg-black w-full">
                        <div class="flex gap-2 justify-between items-center">
                            <span class="font-bold text-[0.7vw]">CFF</span>
                        </div>
                        <div class="flex gap-2 items-center text-amber-500">
                            <span class="font-bold text-[1vw]">{{ load.cff }}</span>
                        </div>
                    </div>
                    <div class="flex justify-between items-center gap-1 p-2 rounded-xl bg-black w-full">
                        <div class="flex gap-2 justify-between items-center">
                            <span class="font-bold text-[0.7vw]">CFI</span>
                        </div>
                        <div class="flex gap-2 items-center text-amber-500">
                            <span class="font-bold text-[1vw]">{{ load.cfi }}</span>
                        </div>
                    </div>
                </div>
                <div class="flex gap-1 flex-col w-full h-full">
                    <div class="flex justify-between items-center gap-1 p-2 rounded-xl bg-black w-full">
                        <div class="flex gap-2 justify-between items-center">
                            <span class="font-bold text-[0.7vw]">CFO</span>
                        </div>
                        <div class="flex gap-2 items-center text-amber-500">
                            <span class="font-bold text-[1vw]">{{ load.cfo }}</span>
                        </div>
                    </div>
                    <div class="text-cyan-500 font-bold text-[0.7vw] w-full h-full flex items-center justify-center">
                        <span>s/d {{ load.period }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
