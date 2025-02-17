<script setup>
import moment from 'moment';
import { ref } from 'vue';

const beforeDate = ref(moment().format('YYYY-MM-01'));
const now = ref(moment().format('YYYY-MM-DD'));
const dates = ref([moment(beforeDate.value).toDate(), moment(now.value).toDate()]);
const users = ref(JSON.parse(localStorage.getItem('payload')));
</script>

<template>
    <div class="flex flex-col w-full h-[35vw] gap-8">
        <!-- <div class="flex gap-2 items-center w-full font-bold">
            <span class="text-5xl w-full">Dashboard</span>
            <div class="w-full flex flex-col items-end">
                <label for="period">Select by Period</label>
                <DatePicker v-model="dates" selectionMode="range" showIcon iconDisplay="input" dateFormat="yy-mm-dd" :manualInput="false" placeholder="Select Date Range" class="w-1/2" />
            </div>
        </div> -->
        <div class="grid grid-cols-3 p-1 gap-4 w-full h-full">
            <div class="col-span-3 p-3 flex justify-center items-center flex-col gap-3">
                <span class="text-5xl font-bold">Selamat Datang di Dashboard INL Edge</span>
                <span class="text-xl">{{ users.name }} - {{ users.jabatan }}</span>
            </div>
            <!-- <div class="w-full h-[10rem] bg-slate-600 rounded-xl p-3 text-white font-bold" v-for="index in 6" :key="index">
                <span class="text-[1vw]">Card {{ index }}</span>
            </div> -->
        </div>
        <!-- <div class="w-full h-[25rem] bg-slate-600 rounded-xl p-3 text-white font-bold">
            <span class="text-[1vw]">Chart</span>
        </div> -->
    </div>
</template>
