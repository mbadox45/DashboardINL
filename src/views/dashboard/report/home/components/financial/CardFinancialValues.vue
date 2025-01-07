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

const load = ref({ name: '', icon: '', nilai: 0, persen: 0, versus: '', color: '', link: null });

const loadData = async () => {
    const data = props.datas;
    load.value = { name: data.name, icon: data.icon, nilai: data.value, persen: null, versus: data.versus, color: data.color, link: data.link };
};

const routerLink = (path) => {
    const encryptedPath = CryptoJS.AES.encrypt(path, 'your-secret-key').toString();
    router.push({
        path: '/detail-dashboard',
        query: { component: encryptedPath }
    });
};

watch(() => props.datas, loadData, { immediate: true });
</script>
<template>
    <div class="bg-gray-800 p-2 rounded-xl shadow-xl min-h-[120px] flex gap-3 items-start">
        <div class="flex flex-col w-full">
            <div class="flex items-center gap-6">
                <span class="font-bold w-full text-[0.55vw]">{{ load.name }}</span>
                <button
                    v-show="load.link != null"
                    @click="routerLink(load.link)"
                    class="animate-pulse hover:animate-none p-4 w-[1.5vw] h-[1.5vw] cursor-pointer bg-transparent text-emerald-500 rotate-180 hover:rotate-[-180] hover:bg-black hover:text-amber-500 rounded-full flex items-center justify-center transition-all duration-500"
                >
                    <i class="pi pi-external-link" style="font-weight: 600; font-size: 0.9vw"></i>
                </button>
            </div>
            <div class="flex items-center gap-6">
                <img v-show="load.icon != null" :src="load.icon" alt="Icon" class="w-[3vw] h-[3vw]" />
                <div class="w-full">
                    <div v-html="load.nilai"></div>
                    <div v-html="load.versus"></div>
                </div>
            </div>
        </div>
    </div>
</template>
