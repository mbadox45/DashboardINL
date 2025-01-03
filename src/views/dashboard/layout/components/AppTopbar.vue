<script setup>
import gsap from 'gsap';
import moment from 'moment';
import { onMounted, ref } from 'vue';

const showMenu = ref(false); // Nilai awal hidden
const menuRef = ref(null); // Ref untuk elemen menu
const beforeDate = ref(moment().format('YYYY-MM-01'));
const now = ref(moment().format('YYYY-MM-DD'));
const dates = ref([moment(beforeDate.value).toDate(), moment(now.value).toDate()]);
const selectedRegion = ref('pmg1');
const region = ref([
    { name: 'PMG 1', code: 'pmg1' },
    { name: 'PMG 2', code: 'pmg2' }
]);

const changeDate = () => {
    const list = dates.value;
    const listdate = [];
    let start, end;

    if (list != null) {
        if (list.length > 1) {
            start = moment(list[0], 'YYYY-MM-DD').format('YYYY-MM-DD');
            end = moment(list[1], 'YYYY-MM-DD').format('YYYY-MM-DD');
        } else {
            start = beforeDate.value;
            end = now.value;
        }
    } else {
        start = beforeDate.value;
        end = now.value;
    }
    listdate.push(convertDate(start), convertDate(end));
    console.log(listdate);
};

const convertDate = (dateString) => {
    const date = moment(dateString).toDate();
    return date;
};

// Fungsi animasi toggle menu
const toggleMenu = () => {
    if (showMenu.value) {
        // Hide menu animasi
        gsap.to(menuRef.value, {
            height: 0,
            opacity: 0,
            duration: 0.5,
            ease: 'power1.inOut',
            onComplete: () => {
                showMenu.value = false; // Pastikan state diubah setelah animasi selesai
            }
        });
    } else {
        // Show menu animasi
        showMenu.value = true; // Set state sebelum animasi
        gsap.fromTo(
            menuRef.value,
            { height: 0, opacity: 0 },
            {
                height: 'auto',
                opacity: 1,
                duration: 0.5,
                ease: 'power1.inOut'
            }
        );
    }
};

// Inisialisasi animasi awal
onMounted(() => {
    gsap.set(menuRef.value, { height: 0, opacity: 0 }); // Topbar disembunyikan saat load
});
</script>
<template>
    <div class="fixed flex-col gap-1 w-full z-30">
        <!-- Bagian yang akan dianimasikan -->
        <div ref="menuRef" class="flex overflow-hidden justify-between gap-3 w-full px-10 py-3 bg-neutral-950">
            <div class="flex gap-8 items-center w-full">
                <router-link to="/" class="flex items-center gap-8">
                    <div class="flex flex-col">
                        <span class="font-bold text-xl">INL EDGE</span>
                        <small class="text-[8px] uppercase text-gray-500 font-extrabold"> Empowering Decisions & Growth Excellence </small>
                    </div>
                </router-link>
            </div>

            <div class="flex gap-3">
                <div class="flex p-2 bg-gray-800 border rounded border-gray-600">
                    <Select v-model="selectedRegion" :options="region" optionLabel="name" optionValue="code" size="small" placeholder="Select a Region" class="bg-gray-800 w-30" />
                </div>
                <div class="flex items-center gap-3 p-2 bg-gray-800 border border-gray-600 rounded text-white w-96">
                    <DatePicker v-model="dates" size="small" selectionMode="range" showIcon iconDisplay="input" dateFormat="yy-mm-dd" :manualInput="false" placeholder="Select Date Range" class="w-full" />
                    <button class="w-[28px] h-[28px] p-3 rounded-lg bg-white shadow-none hover:shadow-white hover:shadow transition-all duration-700 text-black flex items-center justify-center" @click="changeDate">
                        <i class="pi pi-search" style="font-size: 12px"></i>
                    </button>
                </div>
            </div>
        </div>

        <!-- Tombol untuk toggle menu -->
        <div class="flex justify-end px-4 py-1">
            <button class="bg-white text-black animate-bounce hover:bg-amber-600 hover:text-white transition-all duration-500 p-2 h-[1.6vw] w-[1.6vw] rounded-full flex items-center justify-center" @click="toggleMenu">
                <i :class="`pi ${showMenu ? 'pi-angle-double-up' : 'pi-angle-double-down'}`" style="font-size: 0.7vw"></i>
            </button>
        </div>
    </div>
</template>

<style>
.overflow-hidden {
    overflow: hidden;
}
</style>
