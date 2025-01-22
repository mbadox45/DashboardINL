<script setup>
// import { encryptQuery } from '@/controller/dummyController';
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

const load = ref({ ebitda: 0, ebitdaPercent: 0, value: 0, });

const loadData = async () => {
    const data = props.datas;
    load.value = { ebitda: data.ebitda, ebitdaPercent: data.ebitdaPercent, value: data.value,  };
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
                <span class="font-bold w-full text-[0.8vw]">EBITDA Margin (dlm IDR Miliar)</span>
                <button
                    @click="routerLink('ebitda-margin')"
                    class="animate-pulse hover:animate-none p-4 w-[1.5vw] h-[1.5vw] cursor-pointer bg-transparent text-emerald-500 rotate-180 hover:rotate-[-180] hover:bg-black hover:text-amber-500 rounded-full flex items-center justify-center transition-all duration-500"
                >
                    <i class="pi pi-external-link" style="font-weight: 600; font-size: 0.9vw"></i>
                </button>
            </div>
            <div class="flex h-full items-center gap-3 w-full">
                <img src="/images/icon/financial/ebitda.png" alt="Icon" class="w-[3vw] h-[3vw] mr-1" />
                <div class="flex gap-1 items-center h-full mt-3 w-full">
                    <div class="flex gap-2 items-center h-full ${valueColorIntCondition(16.82)}">
                        <span class="font-bold text-[1vw]">16.82</span>
                    </div>
                    <div class="flex gap-1 w-full items-end">
                        <div class="font-bold flex w-full flex-col-reverse items-center">
                            <!-- <div class="flex gap-1 items-center text-green-600">
                                <i class="pi pi-sort-up-fill" style="0.6vw"></i>
                                <span class="text-[0.6vw]">Rp 8.26</span>
                            </div> -->
                            <span class="text-white text-[0.6vw]">EBITDA</span>
                            <span class="text-green-600 text-[0.8vw]">{{load.ebitda}}</span>
                        </div>
                        <div class="font-bold flex w-full flex-col-reverse items-center">
                            <!-- <div class="flex gap-1 items-center text-green-600">
                                <i class="pi pi-sort-up-fill" style="0.6vw"></i>
                                <span class="text-[0.6vw]">3.57%</span>
                            </div> -->
                            <span class="text-white text-[0.6vw]">EBITDA%</span>
                            <span class="text-green-600 text-[0.8vw]">{{load.ebitdaPercent}}%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
