<script setup>
import CryptoJS from 'crypto-js';
import { useRouter } from 'vue-router';

const router = useRouter();
const routerLink = (path) => {
    const data = JSON.stringify({ path: path, type: 'sicalrsp' });
    const encryptedPath = CryptoJS.AES.encrypt(data, 'your-secret-key').toString();
    router.push({
        path: '/simulation-calc',
        query: { component: encryptedPath }
    });
};
</script>

<template>
    <div class="bg-gray-800 p-2 rounded-xl shadow-xl flex h-full gap-3 items-start">
        <div class="flex flex-col h-full w-full">
            <!-- Header -->
            <div class="flex items-center gap-3">
                <span class="font-bold w-full text-[0.8vw]">SICAL RSP</span>
                <button
                    @click="routerLink('simulation-calc')"
                    class="animate-pulse hover:animate-none p-4 w-[1.5vw] h-[1.5vw] cursor-pointer bg-transparent text-emerald-500 rotate-180 hover:rotate-[-180] hover:bg-black hover:text-amber-500 rounded-full flex items-center justify-center transition-all duration-500"
                >
                    <i class="pi pi-external-link" style="font-weight: 600; font-size: 0.9vw"></i>
                </button>
            </div>

            <!-- Card Container -->
            <div class="flex items-start gap-4 h-full relative overflow-hidden">
                <div class="flex gap-2 transition-all duration-500 w-full">
                    <div class="flex flex-col gap-2 w-full bg-black h-full py-1 px-2 rounded-lg">
                        <div class="flex justify-center">
                            <img src="/images/icon/sicalrsp/simulation.png" alt="Simulation" width="120vw" />
                        </div>
                        <div class="flex flex-col">
                            <div class="flex justify-between text-green-500 font-bold"><span class="text-[1vw]">Simulation Calculator</span></div>
                            <div class="flex justify-between text-amber-500 font-bold"><span class="text-[1vw]">for Recommended Selling Price</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
