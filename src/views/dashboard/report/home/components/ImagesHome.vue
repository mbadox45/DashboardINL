<script setup>
import { ref, onMounted } from 'vue';

const listImages = ref([]);
const responsiveOptions = ref([
    {
        breakpoint: '1300px',
        numVisible: 4
    },
    {
        breakpoint: '575px',
        numVisible: 1
    }
]);

onMounted(() => {
    loadImage();
});

const loadImage = () => {
    const list = [];
    list.push(
        {
            src: '/images/profil/Picture1.png',
            title: 'Executive Dashboard',
            alt: 'Profil 1'
        },
        {
            src: '/images/profil/DJI_0134.JPG',
            title: 'Executive Dashboard',
            alt: 'Profil 1'
        },
        {
            src: '/images/profil/DJI_0143.JPG',
            title: 'Executive Dashboard',
            alt: 'Profil 1'
        },
        {
            src: '/images/profil/DJI_0146.JPG',
            title: 'Executive Dashboard',
            alt: 'Profil 1'
        },
        {
            src: '/images/profil/DJI_0161.JPG',
            title: 'Executive Dashboard',
            alt: 'Profil 1'
        }
    );
    listImages.value = list;
};
</script>

<template>
    <div class="w-full rounded-xl shadow-2xl flex flex-col justify-end">
        <Galleria :value="listImages" :responsiveOptions="responsiveOptions" :numVisible="5" :autoPlay="true" :circular="true" :transitionInterval="2000" containerStyle="max-height: 19vw" :showThumbnails="false">
            <template #item="slotProps">
                <img :src="slotProps.item.src" :alt="slotProps.item.alt" style="display: block" />
            </template>
        </Galleria>
    </div>
    <!-- <div class="bg-[url('/images/Picture1.png')] h-[19vw] bg-cover bg-center w-full rounded-xl shadow-2xl flex flex-col justify-end">
        <div class="w-full bg-gradient-to-t from-amber-500 to-transparent rounded-b-xl p-6 flex flex-col justify-between">
            <span class="text-2xl uppercase font-extrabold text-black">Executive Dashboard</span>
        </div>
    </div> -->
</template>
