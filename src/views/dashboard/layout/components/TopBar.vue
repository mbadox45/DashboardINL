<script setup>
import gsap from 'gsap';
import { onMounted, ref } from 'vue';

const icon = ref(null);
const showMenu = ref(true);

onMounted(() => {
    gsap.to(icon.value, {
        opacity: 0, // Ubah opacity menjadi 0
        duration: 0.5, // Durasi animasi 0.5 detik
        repeat: -1, // Animasi berulang terus menerus
        yoyo: true, // Membuat animasi bolak-balik
        ease: 'power1.inOut' // Efek easing
    });
});

const test = () => {
    showMenu.value = !showMenu.value;
};
</script>

<template>
    <div class="fixed flex-col w-full">
        <div :class="`${showMenu == true ? 'hidden' : 'flex'}`" class="w-full text-white bg-neutral-950 py-3 border-b px-4">
            <span>Test</span>
        </div>
        <div class="flex justify-end px-4">
            <button class="bg-neutral-950 border-x border-b px-3 py-1 rounded-b-xl" @click="test">
                <i ref="icon" :class="`pi ${showMenu == true ? 'pi-chevron-down' : 'pi-chevron-up'}`" style="font-size: 0.7vw"></i>
            </button>
        </div>
    </div>
</template>
