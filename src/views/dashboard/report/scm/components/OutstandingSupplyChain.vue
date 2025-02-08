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

const load = ref({ total: 0, supplier: [] });

const loadData = async () => {
    const data = props.datas;
    load.value = { total: data.total, supplier: data.supplier };
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
                <span class="font-bold w-full text-[0.8vw]">CPO yang belum dikirim (in Kg)</span>
                <button
                    @click="routerLink('outstanding-cpo')"
                    class="animate-pulse hover:animate-none p-4 w-[1.5vw] h-[1.5vw] cursor-pointer bg-transparent text-emerald-500 rotate-180 hover:rotate-[-180] hover:bg-black hover:text-amber-500 rounded-full flex items-center justify-center transition-all duration-500"
                >
                    <i class="pi pi-external-link" style="font-weight: 600; font-size: 0.9vw"></i>
                </button>
            </div>
            <div class="flex h-full items-center gap-3">
                <div class="flex flex-col items-end w-full gap-1">
                    <div class="flex justify-between items-center gap-2 w-full">
                        <span class="text-[1vw] font-bold">Total</span>
                        <span class="text-[1.4vw] text-amber-500 font-bold">{{ load.total }}</span>
                    </div>
                    <div class="flex gap-1 w-full">
                        <div class="flex flex-col w-full p-2 bg-black rounded-lg" v-for="(item, index) in load.supplier" :key="index">
                            <span class="text-[0.7vw] text-amber-500 font-extrabold w-full text-right">{{ item.value }}</span>
                            <div class="text-[0.6vw] text-cyan-500 flex gap-2 justify-end font-bold">
                                <span class="text-cyan-500">{{ item.supplier }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
