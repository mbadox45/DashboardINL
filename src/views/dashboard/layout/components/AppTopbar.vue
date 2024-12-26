<script setup>
import { useLayout } from '@/views/dashboard/layout/components/layout';
import moment from 'moment';
import { onMounted, ref } from 'vue';

const { toggleMenu, toggleDarkMode, isDarkTheme } = useLayout();

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

onMounted(() => {
    toggleDarkMode();
});
</script>

<template>
    <div class="fixed flex justify-between gap-3 w-full px-10 py-3 bg-neutral-950 z-30">
        <div class="flex gap-8 items-center w-full">
            <button class="flex items-center justify-center w-[35px] h-[35px] bg-white text-black hover:rotate-180 hover:bg-amber-500 transition-all duration-700 rounded-full" @click="toggleMenu">
                <i class="pi pi-bars text-3xl font-bold"></i>
            </button>
            <router-link to="/" class="flex items-center gap-8">
                <!-- <img src="/images/inl.png" alt="PT INL" class="w-[40px] md:w-[65px]" /> -->
                <div class="flex flex-col">
                    <span class="font-bold text-xl">INL EDGE</span>
                    <small class="text-[8px] uppercase text-gray-500 font-extrabold">Empowering Decisions & Growth Excellence</small>
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
</template>
