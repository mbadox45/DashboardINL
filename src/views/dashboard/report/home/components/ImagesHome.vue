<script setup>
import { onMounted, ref } from 'vue';

const listImages = ref([]);
const currentIndex = ref(0); // Index gambar saat ini

onMounted(() => {
    loadImage();
    startSlideshow(); // Memulai slideshow saat komponen dimuat
});

const loadImage = () => {
    listImages.value = [
        {
            src: '/images/profil/Picture1.png',
            title: 'Executive Dashboard',
            alt: 'Profil 1'
        },
        {
            src: '/images/profil/DJI_0134.JPG',
            title: 'Executive Dashboard',
            alt: 'Profil 2'
        },
        {
            src: '/images/profil/DJI_0143.JPG',
            title: 'Executive Dashboard',
            alt: 'Profil 3'
        },
        {
            src: '/images/profil/DJI_0146.JPG',
            title: 'Executive Dashboard',
            alt: 'Profil 4'
        },
        {
            src: '/images/profil/DJI_0161.JPG',
            title: 'Executive Dashboard',
            alt: 'Profil 5'
        }
    ];
};

// Fungsi untuk memulai slideshow
const startSlideshow = () => {
    setInterval(() => {
        currentIndex.value = (currentIndex.value + 1) % listImages.value.length;
    }, 5000); // Gambar berubah setiap 5 detik
};
</script>

<template>
    <div class="relative w-full h-[19vw] rounded-xl shadow-2xl overflow-hidden">
        <!-- Gambar dengan efek fade -->
        <div
            v-for="(image, index) in listImages"
            :key="index"
            class="absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out"
            :style="{
                opacity: index === currentIndex ? 1 : 0,
                zIndex: index === currentIndex ? 2 : 1,
                backgroundImage: `url(${image.src})`
            }"
        >
            <div class="w-full h-full rounded-xl flex flex-col justify-end">
                <div class="w-full bg-gradient-to-t from-amber-500 to-transparent rounded-b-xl p-6 flex flex-col justify-between">
                    <span class="text-2xl uppercase font-extrabold text-black">{{ image.title }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.relative {
    position: relative;
}

.absolute {
    position: absolute;
}
</style>
