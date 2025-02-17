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

const load = ref({ saldoTersedia: 0, saldoAwal: 0, pengiriman: 0 });

const loadData = async () => {
    const data = props.datas;
    load.value = { saldoTersedia: data.saldoTersedia, saldoAwal: data.saldoAwal, pengiriman: data.pengiriman };
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
                <span class="font-bold w-full text-[0.8vw]">Saldo Pe</span>
                <button
                    @click="routerLink('saldo-pe')"
                    class="animate-pulse hover:animate-none p-4 w-[1.5vw] h-[1.5vw] cursor-pointer bg-transparent text-emerald-500 rotate-180 hover:rotate-[-180] hover:bg-black hover:text-amber-500 rounded-full flex items-center justify-center transition-all duration-500"
                >
                    <i class="pi pi-external-link" style="font-weight: 600; font-size: 0.9vw"></i>
                </button>
            </div>
            <div class="flex h-full items-center gap-3">
                <!-- <img src="/images/icon/scm/import-export.png" alt="Icon" class="w-[3vw] h-[3vw] mr-1" /> -->
                <div class="w-full h-full">
                    <div class="flex flex-col gap-2 w-full">
                        <div class="flex justify-between gap-2 items-center">
                            <span class="font-bold text-[1.6vw] text-amber-500">{{ load.saldoTersedia }}</span>
                        </div>
                        <div class="flex flex-col w-full">
                            <div class="text-[0.7vw] flex items-center justify-between text-green-500 font-bold">
                                <span>Saldo Awal</span><span>{{ load.saldoAwal }}</span>
                            </div>
                            <div class="text-[0.7vw] flex items-center justify-between text-red-500 font-bold">
                                <span>Pengiriman</span><span>Rp {{ load.pengiriman }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
