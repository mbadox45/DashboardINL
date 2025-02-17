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

const load = ref({ totalHarga: 0, totalQty: 0, hargaSatuan: 0, tanggal: '' });

const loadData = async () => {
    const data = props.datas;
    load.value = { totalHarga: data.totalHarga, totalQty: data.totalQty, hargaSatuan: data.hargaSatuan, tanggal: data.tanggal };
};

const routerLink = (path) => {
    const data = JSON.stringify({ path: path, type: 'scm', form: props.formPush });
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
    <div class="bg-gray-800 p-2 rounded-xl shadow-xl min-h-[120px] flex h-full gap-3 items-start">
        <div class="flex flex-col h-full w-full">
            <div class="flex items-center gap-3">
                <span class="font-bold w-full text-[0.8vw]">Aktual CPO Masuk (dlm Kg)</span>
                <button
                    @click="routerLink('actual-incoming-cpo')"
                    class="animate-pulse hover:animate-none p-4 w-[1.5vw] h-[1.5vw] cursor-pointer bg-transparent text-emerald-500 rotate-180 hover:rotate-[-180] hover:bg-black hover:text-amber-500 rounded-full flex items-center justify-center transition-all duration-500"
                >
                    <i class="pi pi-external-link" style="font-weight: 600; font-size: 0.9vw"></i>
                </button>
            </div>
            <div class="flex h-full items-center gap-3">
                <!-- <img src="/images/icon/scm/on-time.png" alt="Icon" class="w-[3vw] h-[3vw] mr-1" /> -->
                <div class="w-full h-full">
                    <div class="flex flex-col gap-2 w-full">
                        <div class="w-full flex flex-col items-end font-bold">
                            <span class="text-[1vw] text-amber-500">{{ load.totalHarga }}</span>
                            <div class="text-[0.6vw] flex justify-between w-full">
                                <span class="font-normal w-full text-end text-cyan-500">{{ load.tanggal }}</span
                                ><span class="text-cyan-500 w-full text-right">Total Nilai</span>
                            </div>
                        </div>
                        <div class="flex gap-1">
                            <div class="flex flex-col-reverse items-end w-full text-cyan-500 font-bold bg-black p-2 rounded-lg">
                                <span class="text-[0.6vw]">QTY (dlm Kg)</span><span class="text-amber-500 text-[0.9vw]">{{ load.totalQty }}</span>
                            </div>
                            <div class="flex flex-col-reverse items-end w-full text-cyan-500 font-bold bg-black p-2 rounded-lg">
                                <span class="text-[0.6vw]">Harga Satuan (dlm IDR)</span><span class="text-amber-500 text-[0.9vw]">{{ load.hargaSatuan }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
