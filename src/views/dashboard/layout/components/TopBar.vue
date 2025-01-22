<script setup>
import pmgMasterController from '@/controller/getApiFromThisApp/master/pmgMasterController';
import mataUangKursController from '@/controller/getApiFromThisApp/kurs/mataUangKursController';
import moment from 'moment';
import { onMounted, ref, provide, defineProps } from 'vue';
import { useRouter } from 'vue-router';

const icon = ref(null);
const showMenu = ref(true);
const visibleTop = ref(false);
const router = useRouter();

const selectedRegion = ref(1);
const selectedMataUang = ref(1);
const listPmg = ref([]);
const listMatauang = ref([]);

// const beforeDate = ref(moment().format('YYYY-MM-01'));
// const now = ref(moment().format('YYYY-MM-DD'));
const beforeDate = ref('2023-01-01');
const now = ref('2024-01-31');
const dates = ref([moment(beforeDate.value).toDate(), moment(now.value).toDate()]);
const getToken = ref(localStorage.getItem('usertoken'));

const { onDateChange } = defineProps({
    onDateChange: Function // Make sure `onDateChange` is a function passed from the parent
});

onMounted(() => {
    loadPmg();
    loadCurrency();
});

const loadPmg = async () => {
    const response = await pmgMasterController.getAll();
    listPmg.value = response;
};

const loadCurrency = async () => {
    const loadMataUang = await mataUangKursController.getAll();
    const list = [];
    for (let i = 0; i < loadMataUang.length; i++) {
        list.push({
            id: loadMataUang[i].id,
            name: `${loadMataUang[i].symbol}_${loadMataUang[i].name} - ${loadMataUang[i].remark}`
        });
    }
    listMatauang.value = list;
};

const test = () => {
    // showMenu.value = !showMenu.value;
    visibleTop.value = true;
};

const changeDate = () => {
    const list = dates.value;
    let start = beforeDate.value;
    let end = now.value;

    if (list?.length > 1) {
        start = moment(list[0], 'YYYY-MM-DD').format('YYYY-MM-DD');
        end = moment(list[1], 'YYYY-MM-DD').format('YYYY-MM-DD');
    }

    // Check if onDateChange is a function before calling it
    if (typeof onDateChange === 'function') {
        onDateChange({ beforeDate: start, now: end, pmg: selectedRegion.value, mataUang: selectedMataUang.value });
    } else {
        console.error('onDateChange is not a function or is undefined');
    }
};

const convertDate = (dateString) => {
    const date = moment(dateString).toDate();
    return date;
};

const goToLogin = () => {
    const token = getToken.value;
    if (token != null) {
        // window.location.replace(`${URL_WEB}dashboard`);
        router.push('/dashboard');
    } else {
        window.open('http://36.92.181.10:8585/', '_blank');
    }
};
</script>

<template>
    <div class="relative text-white">
        <div class="justify-start px-4 fixed w-1/2 z-20">
            <button class="bg-amber-500 px-3 py-4 rounded-b-xl hover:bg-amber-600 transition-all duration-300" @click="test">
                <div class="p-1 bg-white rounded-lg animate-pulse">
                    <img src="/images/inl.png" alt="PT INL" width="60px" class="" />
                </div>
                <!-- <i ref="icon" :class="`pi ${showMenu == true ? 'pi-chevron-down' : 'pi-chevron-up'}`" style="font-size: 0.7vw"></i> -->
            </button>
        </div>
        <Drawer v-model:visible="visibleTop" class="!w-full md:!w-[30rem]" style="background-color: black; border: none">
            <template #header>
                <div class="flex flex-col text-white">
                    <span class="font-extrabold text-xl">INL EDGE</span>
                    <small class="text-[8px] uppercase text-gray-500 font-extrabold"> Empowering Decisions & Growth Excellence </small>
                </div>
            </template>
            <template #footer>
                <div class="flex flex-col gap-5">
                    <button
                        @click="goToLogin"
                        class="pl-5 pr-10 hover:pr-5 py-3 border-2 w-full flex justify-between items-center gap-3 font-bold bg-gray-950 text-white rounded-full hover:bg-white hover:text-black uppercase shadow-none hover:shadow-sm shadow-gray-800 transition-all duration-300"
                    >
                        <span v-if="getToken != null">Admin Dashboard</span>
                        <span v-else>Login</span>
                        <i class="pi pi-sign-in"></i>
                    </button>
                    <div class="flex gap-2 justify-center border-t-2 pt-3 text-white font-mono">
                        <span class="text-[0.7vw] text-teal-600 font-bold">Software Developer Team</span>
                        <span class="text-[0.7vw]">-</span>
                        <span class="text-[0.7vw]">PT Industri Nabati Lestari</span>
                    </div>
                </div>
            </template>
            <div class="flex flex-col gap-8">
                <div class="flex flex-col gap-2 border border-gray-900 p-4 rounded-xl">
                    <div class="flex flex-col gap-1">
                        <label for="PMG" class="text-[0.6vw]">Select by PMG</label>
                        <Select v-model="selectedRegion" :options="listPmg" optionLabel="nama" optionValue="id" placeholder="Pilih PMG" class="w-full" />
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="PMG" class="text-[0.6vw]">Select by Mata Uang</label>
                        <Select v-model="selectedMataUang" :options="listMatauang" optionLabel="name" optionValue="id" placeholder="Pilih Mata Uang" class="w-full" />
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="PMG" class="text-[0.6vw]">Select by PMG</label>
                        <DatePicker v-model="dates" selectionMode="range" showIcon iconDisplay="input" dateFormat="yy-mm-dd" :manualInput="false" placeholder="Select Date Range" class="w-full" style="background-color: black" />
                    </div>
                    <button class="w-full p-3 rounded-lg bg-white shadow-none hover:bg-gray-300 hover:shadow transition-all duration-700 text-black flex gap-3 items-center justify-center" @click="changeDate">
                        <i class="pi pi-search" style="font-size: 12px"></i>
                        <span class="text-[0.6vw] font-bold">Submit</span>
                    </button>
                </div>
            </div>
        </Drawer>
    </div>
</template>
