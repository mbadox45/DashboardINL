<script setup>
import CryptoJS from 'crypto-js';
import { defineProps, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
    datas: {
        type: Object,
        default: () => ({})
    }
});

const load = ref({ total: 0, cpoIn: 0, cpoFeed: 0, tanggal: '' });

const loadData = async () => {
    const data = props.datas;
    load.value = { total: data.total, cpoIn: data.cpoIn, cpoFeed: data.cpoFeed, tanggal: data.tanggal };
};

const routerLink = (path) => {
    const data = JSON.stringify({ path: path, type: 'scm' });
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
                <span class="font-bold w-full text-[0.8vw]">Stok CPO (dlm MT)</span>
                <button
                    @click="routerLink('stock-cpo')"
                    class="animate-pulse hover:animate-none p-4 w-[1.5vw] h-[1.5vw] cursor-pointer bg-transparent text-emerald-500 rotate-180 hover:rotate-[-180] hover:bg-black hover:text-amber-500 rounded-full flex items-center justify-center transition-all duration-500"
                >
                    <i class="pi pi-external-link" style="font-weight: 600; font-size: 0.9vw"></i>
                </button>
            </div>
            <div class="flex h-full items-center gap-3">
                <img src="/images/icon/scm/silo.png" alt="Icon" class="w-[3vw] h-[3vw] mr-1" />
                <div class="w-full h-full">
                    <div class="flex flex-col gap-2 w-full">
                        <div class="flex flex-row-reverse justify-between items-center">
                            <span class="font-bold text-[1.5vw] text-green-600">{{ load.total }}</span>
                            <span class="font-bold text-[0.8vw] text-cyan-600">{{ load.tanggal }}</span>
                        </div>
                        <div class="flex gap-2 w-full">
                            <div class="flex flex-col-reverse items-end w-full text-cyan-500 font-bold">
                                <span class="text-[0.8vw]">CPO in</span><span class="text-amber-500 text-[1vw]">{{ load.cpoIn }}</span>
                            </div>
                            <div class="flex flex-col-reverse items-end w-full text-cyan-500 font-bold">
                                <span class="text-[0.8vw]">CPO feed</span><span class="text-amber-500 text-[1vw]">{{ load.cpoFeed }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
